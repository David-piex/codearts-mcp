# Shared HTTP Performance Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce shared HTTP mode tail latency and improve observability by deduplicating concurrent list reads, surfacing cache/upstream timing in request logs, and adding safe read-only timeout/retry behavior.

**Architecture:** Keep the existing product-client and session-aware tool model intact, but add two focused shared primitives: a request-scoped diagnostics context for HTTP requests and a reusable read-cache helper with TTL plus in-flight dedupe. Apply the new cache helper only to the current high-frequency list endpoints, and keep retry behavior restricted to idempotent reads in the base HTTP client.

**Tech Stack:** TypeScript, Node `AsyncLocalStorage`, existing HTTP client wrapper, Vitest, MCP streamable HTTP transport

---

## File Map

- Create: `src/server/request-context.ts`
  - Owns request-scoped diagnostics collection for a single incoming HTTP MCP request.
- Create: `tests/server/request-context.test.ts`
  - Verifies request diagnostics lifecycle, aggregation, and default no-context behavior.
- Create: `src/core/cache/read-through-cache.ts`
  - Provides a tiny reusable TTL cache with in-flight promise dedupe and cache-hit reporting.
- Create: `tests/core/cache/read-through-cache.test.ts`
  - Covers dedupe, expiry, and stale entry replacement.
- Modify: `src/core/http/client.ts`
  - Adds read-only timeout/retry policy and reports upstream request diagnostics into the request context.
- Modify: `src/server/http-app.ts`
  - Wraps each MCP HTTP request in a diagnostics scope and enriches request logs with cache/upstream fields.
- Modify: `src/products/req/client.ts`
  - Migrates `listProjects` cache to the shared helper and reports cache-hit metadata.
- Modify: `src/products/repo/client.ts`
  - Migrates `listRepositories` cache to the shared helper and reports cache-hit metadata.
- Modify: `src/products/pipeline/client.ts`
  - Migrates `listPipelines` cache to the shared helper and reports cache-hit metadata.
- Modify: `src/products/build/client.ts`
  - Migrates `listJobs` cache to the shared helper and reports cache-hit metadata.
- Modify: `tests/products/req/client.test.ts`
  - Verifies dedupe and cache invalidation for Req list reads.
- Modify: `tests/products/repo/client.test.ts`
  - Verifies dedupe and cache invalidation for Repo list reads.
- Modify: `tests/products/pipeline/client.test.ts`
  - Verifies dedupe and cache invalidation for Pipeline list reads.
- Modify: `tests/products/build/client-list-jobs.test.ts`
  - Verifies dedupe and cache invalidation for Build list reads.
- Modify: `tests/server/http-app.test.ts`
  - Verifies the enriched request log fields.
- Modify: `tests/server/http.test.ts`
  - Verifies the HTTP entrypoint still applies keep-alive settings after diagnostics changes.
- Modify: `README.md`
  - Refreshes the performance conclusions to mention request diagnostics and concurrent read dedupe.
- Modify: `docs/service-profile.md`
  - Documents the new request diagnostics and read cache behavior.
- Modify: `docs/wiki/Testing-and-Live-Ops.md`
  - Documents the new regression coverage and how to interpret the added log fields.

### Task 1: Add Request-Scoped Diagnostics Context

**Files:**
- Create: `src/server/request-context.ts`
- Test: `tests/server/request-context.test.ts`

- [x] **Step 1: Write the failing diagnostics context tests**

```ts
import { describe, expect, it } from "vitest";
import {
  getCurrentRequestDiagnostics,
  recordRequestCacheHit,
  recordUpstreamRequest,
  runWithRequestDiagnostics
} from "../../src/server/request-context.js";

describe("request diagnostics context", () => {
  it("aggregates upstream timing and cache hits inside a request scope", async () => {
    const result = await runWithRequestDiagnostics(async () => {
      recordRequestCacheHit("req_list_projects");
      recordUpstreamRequest({
        toolName: "req_list_projects",
        method: "GET",
        path: "/v4/projects",
        statusCode: 200,
        durationMs: 18
      });

      return getCurrentRequestDiagnostics();
    });

    expect(result).toMatchObject({
      cacheHits: ["req_list_projects"],
      upstreamRequestCount: 1,
      upstreamDurationMs: 18,
      upstreamStatusCodes: [200]
    });
  });

  it("returns undefined outside a request scope", () => {
    expect(getCurrentRequestDiagnostics()).toBeUndefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npx vitest run tests/server/request-context.test.ts
```

Expected: FAIL because `request-context.ts` does not exist yet.

- [x] **Step 3: Implement the minimal request diagnostics context**

```ts
import { AsyncLocalStorage } from "node:async_hooks";

export type UpstreamRequestDiagnostic = {
  toolName?: string;
  method: string;
  path: string;
  statusCode?: number;
  durationMs: number;
};

export type RequestDiagnostics = {
  cacheHits: string[];
  upstreamRequestCount: number;
  upstreamDurationMs: number;
  upstreamStatusCodes: number[];
};

const storage = new AsyncLocalStorage<RequestDiagnostics>();

export function runWithRequestDiagnostics<T>(work: () => T | Promise<T>) {
  return storage.run(
    {
      cacheHits: [],
      upstreamRequestCount: 0,
      upstreamDurationMs: 0,
      upstreamStatusCodes: []
    },
    work
  );
}

export function getCurrentRequestDiagnostics() {
  return storage.getStore();
}

export function recordRequestCacheHit(toolName: string) {
  const current = storage.getStore();

  if (!current) {
    return;
  }

  current.cacheHits.push(toolName);
}

export function recordUpstreamRequest(input: UpstreamRequestDiagnostic) {
  const current = storage.getStore();

  if (!current) {
    return;
  }

  current.upstreamRequestCount += 1;
  current.upstreamDurationMs += input.durationMs;

  if (input.statusCode !== undefined) {
    current.upstreamStatusCodes.push(input.statusCode);
  }
}
```

- [x] **Step 4: Run test to verify it passes**

Run:

```bash
npx vitest run tests/server/request-context.test.ts
```

Expected: PASS with both diagnostics context tests green.

- [ ] **Step 5: Commit**

```bash
git add src/server/request-context.ts tests/server/request-context.test.ts
git commit -m "feat: add request-scoped diagnostics context"
```

### Task 2: Enrich HTTP Request Logs With Cache and Upstream Diagnostics

**Files:**
- Modify: `src/server/http-app.ts`
- Modify: `tests/server/http-app.test.ts`

- [x] **Step 1: Write the failing HTTP app diagnostics log test**

```ts
import { describe, expect, it, vi } from "vitest";
import { createHttpApp } from "../../src/server/http-app.js";
import { runWithRequestDiagnostics, recordRequestCacheHit, recordUpstreamRequest } from "../../src/server/request-context.js";

describe("http app request logging", () => {
  it("includes cache-hit and upstream timing fields in request logs", async () => {
    const requestLogger = vi.fn();
    const app = createHttpApp(
      {
        serverName: "codearts-mcp",
        serverVersion: "0.1.0",
        httpPort: 3000
      },
      undefined,
      { requestLogger }
    );

    await runWithRequestDiagnostics(async () => {
      recordRequestCacheHit("req_list_projects");
      recordUpstreamRequest({
        toolName: "req_list_projects",
        method: "GET",
        path: "/v4/projects",
        statusCode: 200,
        durationMs: 12
      });
    });

    expect(requestLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        cacheHits: ["req_list_projects"],
        upstreamRequestCount: 1,
        upstreamDurationMs: 12,
        upstreamStatusCodes: [200]
      })
    );
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npx vitest run tests/server/http-app.test.ts
```

Expected: FAIL because `HttpRequestLogEntry` does not expose the new diagnostics fields.

- [x] **Step 3: Implement diagnostics-aware logging in the HTTP app**

```ts
import {
  getCurrentRequestDiagnostics,
  runWithRequestDiagnostics
} from "./request-context.js";
```

```ts
export type HttpRequestLogEntry = {
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  sessionId?: string;
  mcpMethod?: string;
  toolName?: string;
  cacheHits?: string[];
  upstreamRequestCount?: number;
  upstreamDurationMs?: number;
  upstreamStatusCodes?: number[];
};
```

```ts
requestLogger({
  ...details,
  method: req.method ?? "UNKNOWN",
  path: pathname,
  statusCode: res.statusCode,
  durationMs: Date.now() - startedAt,
  cacheHits: diagnostics?.cacheHits,
  upstreamRequestCount: diagnostics?.upstreamRequestCount,
  upstreamDurationMs: diagnostics?.upstreamDurationMs,
  upstreamStatusCodes: diagnostics?.upstreamStatusCodes
});
```

```ts
return await runWithRequestDiagnostics(async () => {
  // existing request body / transport / auth handling logic stays here
});
```

- [x] **Step 4: Run test to verify it passes**

Run:

```bash
npx vitest run tests/server/http-app.test.ts tests/server/http.test.ts
```

Expected: PASS and the existing keep-alive coverage remains green.

- [ ] **Step 5: Commit**

```bash
git add src/server/http-app.ts tests/server/http-app.test.ts tests/server/http.test.ts
git commit -m "feat: log cache and upstream diagnostics for shared HTTP requests"
```

### Task 3: Add a Shared Read Cache With In-Flight Dedupe

**Files:**
- Create: `src/core/cache/read-through-cache.ts`
- Test: `tests/core/cache/read-through-cache.test.ts`

- [x] **Step 1: Write the failing shared cache tests**

```ts
import { describe, expect, it, vi } from "vitest";
import { createReadThroughCache } from "../../../src/core/cache/read-through-cache.js";

describe("read-through cache", () => {
  it("deduplicates concurrent reads for the same key", async () => {
    let calls = 0;
    const cache = createReadThroughCache<string, number>({
      ttlMs: 15_000,
      now: () => 1_000
    });

    const loader = vi.fn(async () => {
      calls += 1;
      return 42;
    });

    const [left, right] = await Promise.all([
      cache.getOrLoad("projects", loader),
      cache.getOrLoad("projects", loader)
    ]);

    expect(left.value).toBe(42);
    expect(right.value).toBe(42);
    expect(calls).toBe(1);
  });

  it("serves cached values until ttl expiry", async () => {
    let currentTime = 1_000;
    const cache = createReadThroughCache<string, number>({
      ttlMs: 50,
      now: () => currentTime
    });

    const loader = vi.fn(async () => 7);

    await cache.getOrLoad("projects", loader);
    currentTime = 1_020;
    const cached = await cache.getOrLoad("projects", loader);

    expect(cached.cacheHit).toBe(true);
    expect(loader).toHaveBeenCalledTimes(1);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npx vitest run tests/core/cache/read-through-cache.test.ts
```

Expected: FAIL because the shared cache helper does not exist yet.

- [x] **Step 3: Implement the minimal shared cache helper**

```ts
export function createReadThroughCache<TKey, TValue>(options: {
  ttlMs: number;
  now?: () => number;
}) {
  const now = options.now ?? Date.now;
  const valueCache = new Map<TKey, { expiresAt: number; value: TValue }>();
  const inFlight = new Map<TKey, Promise<TValue>>();

  return {
    clear(key?: TKey) {
      if (key === undefined) {
        valueCache.clear();
        inFlight.clear();
        return;
      }

      valueCache.delete(key);
      inFlight.delete(key);
    },

    async getOrLoad(key: TKey, loader: () => Promise<TValue>) {
      const cached = valueCache.get(key);

      if (cached && cached.expiresAt > now()) {
        return {
          cacheHit: true,
          value: cached.value
        };
      }

      const existing = inFlight.get(key);

      if (existing) {
        return {
          cacheHit: false,
          value: await existing
        };
      }

      const promise = loader().then((value) => {
        valueCache.set(key, {
          expiresAt: now() + options.ttlMs,
          value
        });
        inFlight.delete(key);
        return value;
      });

      inFlight.set(key, promise);

      return {
        cacheHit: false,
        value: await promise
      };
    }
  };
}
```

- [x] **Step 4: Run test to verify it passes**

Run:

```bash
npx vitest run tests/core/cache/read-through-cache.test.ts
```

Expected: PASS with concurrent dedupe and TTL behavior covered.

- [ ] **Step 5: Commit**

```bash
git add src/core/cache/read-through-cache.ts tests/core/cache/read-through-cache.test.ts
git commit -m "feat: add shared read-through cache with inflight dedupe"
```

### Task 4: Migrate High-Frequency List Clients to the Shared Cache Helper

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/repo/client.ts`
- Modify: `src/products/pipeline/client.ts`
- Modify: `src/products/build/client.ts`
- Modify: `tests/products/req/client.test.ts`
- Modify: `tests/products/repo/client.test.ts`
- Modify: `tests/products/pipeline/client.test.ts`
- Modify: `tests/products/build/client-list-jobs.test.ts`

- [x] **Step 1: Write the failing dedupe regression tests**

```ts
it("deduplicates concurrent listProjects calls for the same key", async () => {
  const http = {
    get: vi.fn(async () => ({
      projects: [{ project_id: "project-1", name: "Core" }],
      total: 1
    }))
  };
  const client = createReqClient(http as never, {
    listCacheTtlMs: 15_000,
    now: () => 1_000
  });

  const [left, right] = await Promise.all([
    client.listProjects({ page: 1, page_size: 20 }),
    client.listProjects({ page: 1, page_size: 20 })
  ]);

  expect(left.total).toBe(1);
  expect(right.total).toBe(1);
  expect(http.get).toHaveBeenCalledTimes(1);
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npx vitest run tests/products/req/client.test.ts tests/products/repo/client.test.ts tests/products/pipeline/client.test.ts tests/products/build/client-list-jobs.test.ts
```

Expected: FAIL because the current per-client caches do not deduplicate concurrent misses.

- [x] **Step 3: Replace per-client ad hoc caches with the shared helper**

```ts
import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
```

```ts
const listProjectsCache = createReadThroughCache<
  string,
  {
    projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
    total?: number;
  }
>({
  ttlMs: listCacheTtlMs,
  now
});
```

```ts
const cached = await listProjectsCache.getOrLoad(cacheKey, async () => {
  const response = (await _http.get(`/v4/projects?page=${input.page}&page_size=${input.page_size}`)) as {
    projects?: Array<{ project_id: string; name: string; project_num_id?: number }>;
    total?: number;
  };

  return {
    projects: response.projects ?? [],
    total: response.total
  };
});

if (cached.cacheHit) {
  recordRequestCacheHit("req_list_projects");
}

return cached.value;
```

- [x] **Step 4: Run test to verify it passes**

Run:

```bash
npx vitest run tests/products/req/client.test.ts tests/products/repo/client.test.ts tests/products/pipeline/client.test.ts tests/products/build/client-list-jobs.test.ts
```

Expected: PASS and concurrent identical list requests now collapse to one upstream call.

- [ ] **Step 5: Commit**

```bash
git add src/products/req/client.ts src/products/repo/client.ts src/products/pipeline/client.ts src/products/build/client.ts tests/products/req/client.test.ts tests/products/repo/client.test.ts tests/products/pipeline/client.test.ts tests/products/build/client-list-jobs.test.ts
git commit -m "feat: dedupe concurrent list reads across product clients"
```

### Task 5: Add Read-Only Timeout and Limited Retry in the Base HTTP Client

**Files:**
- Modify: `src/core/http/client.ts`
- Modify: `tests/core/http/client.test.ts`

- [x] **Step 1: Write the failing HTTP client resilience tests**

```ts
import { describe, expect, it, vi } from "vitest";
import { createHttpClient } from "../../../src/core/http/client.js";

describe("http client read resilience", () => {
  it("retries a transient GET once before succeeding", async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("socket hang up"))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" }
        })
      );

    const client = createHttpClient({
      baseUrl: "https://example.com",
      authHeaders: async () => ({ authorization: "Bearer test" }),
      fetcher
    });

    await expect(client.get("/health")).resolves.toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("does not retry write requests", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("socket hang up"));
    const client = createHttpClient({
      baseUrl: "https://example.com",
      authHeaders: async () => ({ authorization: "Bearer test" }),
      fetcher
    });

    await expect(client.post("/projects", { name: "demo" })).rejects.toThrow("socket hang up");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npx vitest run tests/core/http/client.test.ts
```

Expected: FAIL because the base HTTP client does not retry transient read errors yet.

- [x] **Step 3: Implement read-only timeout and one-shot retry**

```ts
const READ_REQUEST_TIMEOUT_MS = 8_000;
const READ_REQUEST_RETRY_COUNT = 1;
```

```ts
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  fetcher: typeof fetch
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetcher(url, {
      ...init,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}
```

```ts
async function fetchResponse(method: string, path: string, body?: unknown) {
  const url = new URL(path, input.baseUrl).toString();
  const prepared = await prepareRequestBody(url, method, body);
  const headers = await input.authHeaders({
    method,
    url,
    body: prepared.signedBody,
    headers: prepared.headers
  });

  const maxAttempts = method === "GET" ? READ_REQUEST_RETRY_COUNT + 1 : 1;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const startedAt = Date.now();

    try {
      const response =
        method === "GET"
          ? await fetchWithTimeout(
              url,
              { method, headers, body: prepared.body },
              READ_REQUEST_TIMEOUT_MS,
              fetcher
            )
          : await fetcher(url, { method, headers, body: prepared.body });

      recordUpstreamRequest({
        method,
        path,
        statusCode: response.status,
        durationMs: Date.now() - startedAt
      });

      if (!response.ok) {
        throw normalizeProviderError(await readProviderError(response));
      }

      return response;
    } catch (error) {
      lastError = error;

      if (method !== "GET" || attempt >= maxAttempts) {
        throw error;
      }
    }
  }

  throw lastError;
}
```

- [x] **Step 4: Run test to verify it passes**

Run:

```bash
npx vitest run tests/core/http/client.test.ts
```

Expected: PASS and the retry logic remains limited to reads.

- [ ] **Step 5: Commit**

```bash
git add src/core/http/client.ts tests/core/http/client.test.ts
git commit -m "feat: add read-only timeout and retry to base HTTP client"
```

### Task 6: Refresh Performance Docs and Run Full Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/service-profile.md`
- Modify: `docs/wiki/Testing-and-Live-Ops.md`

- [x] **Step 1: Update the performance narrative in the docs**

```md
- shared HTTP mode now records per-request `cacheHits`, `upstreamRequestCount`, `upstreamDurationMs`, and `upstreamStatusCodes`
- high-frequency list reads now use shared TTL caches with in-flight dedupe, reducing concurrent cache-miss fanout
- base read requests now use bounded timeout and a single retry for transient transport failures
```

- [x] **Step 2: Add troubleshooting guidance for the new log fields**

```md
If `durationMs` is high but `upstreamDurationMs` is low, investigate entry-network or transport overhead.
If `cacheHits` is populated and `upstreamRequestCount` is `0`, the handler stayed fully in-process.
If `upstreamStatusCodes` contains `502` or repeated `5xx`, investigate upstream provider instability before changing MCP handlers.
```

- [x] **Step 3: Run focused regression verification**

Run:

```bash
npx vitest run tests/server/request-context.test.ts tests/core/cache/read-through-cache.test.ts tests/core/http/client.test.ts tests/products/req/client.test.ts tests/products/repo/client.test.ts tests/products/pipeline/client.test.ts tests/products/build/client-list-jobs.test.ts tests/server/http-app.test.ts tests/server/http.test.ts
```

Expected: PASS across the new diagnostics, cache, resilience, and HTTP app coverage.

- [x] **Step 4: Run full repository verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- `vitest` exits with all tests green
- `eslint` exits with code `0`
- TypeScript build exits with code `0`

- [ ] **Step 5: Commit**

```bash
git add README.md docs/service-profile.md docs/wiki/Testing-and-Live-Ops.md src/server/request-context.ts src/core/cache/read-through-cache.ts src/core/http/client.ts src/server/http-app.ts src/products/req/client.ts src/products/repo/client.ts src/products/pipeline/client.ts src/products/build/client.ts tests/server/request-context.test.ts tests/core/cache/read-through-cache.test.ts tests/core/http/client.test.ts tests/products/req/client.test.ts tests/products/repo/client.test.ts tests/products/pipeline/client.test.ts tests/products/build/client-list-jobs.test.ts tests/server/http-app.test.ts tests/server/http.test.ts
git commit -m "feat: harden shared http performance and observability"
```

## Self-Review

- Spec coverage:
  - concurrent list-read dedupe is implemented in Tasks 3-4
  - shared HTTP request diagnostics are implemented in Tasks 1-2
  - read-only timeout/retry behavior is implemented in Task 5
  - docs and full verification are handled in Task 6
- Placeholder scan:
  - no placeholder markers or empty implementation steps remain
  - every task includes file paths, example code, commands, and expected outcomes
- Type consistency:
  - request diagnostics fields are consistently named `cacheHits`, `upstreamRequestCount`, `upstreamDurationMs`, and `upstreamStatusCodes`
  - the shared cache contract consistently returns `{ cacheHit, value }`
  - retry behavior is consistently scoped to `GET` requests only
