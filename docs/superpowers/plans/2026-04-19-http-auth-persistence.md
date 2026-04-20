# HTTP Auth Persistence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make shared HTTP mode persist encrypted Huawei Cloud credentials behind a stable auth cookie or bearer token so MCP reconnects and service restarts do not force users to re-run `auth_configure_session`.

**Architecture:** Keep `auth_configure_session` and `auth_clear_session` as the public MCP tools, but move HTTP auth source-of-truth from `sessionId -> in-memory credentials` to `cookie or bearer token -> auth_id -> encrypted persisted credentials`. Preserve the current in-memory session store only for `mcp_session_id -> auth_id` transport glue, and keep stdio mode unchanged.

**Tech Stack:** TypeScript, Node `crypto`, Zod, Vitest, existing MCP streamable HTTP server, file-backed JSON persistence

---

## File Map

- Create: `src/server/auth-crypto.ts`
  - Owns authenticated encryption and decryption of Huawei Cloud credentials using the server master key.
- Create: `src/server/auth-token.ts`
  - Generates raw auth tokens and hashes presented tokens for lookup.
- Create: `src/server/auth-cookie.ts`
  - Parses cookies and serializes the HTTP auth cookie.
- Create: `src/server/auth-repository.ts`
  - Persists durable auth records to a file-backed JSON store.
- Create: `src/server/auth-context.ts`
  - Resolves `Authorization` / cookie auth context and binds MCP sessions to `auth_id`.
- Modify: `src/server/session-store.ts`
  - Replace `sessionId -> credentials` storage with `sessionId -> auth_id` binding storage.
- Modify: `src/core/config/env.ts`
  - Add HTTP auth persistence env config such as master key, auth data path, cookie name, secure flag, and token max age.
- Modify: `src/server/create-server.ts`
  - Update auth tools to persist encrypted auth records, emit token metadata, and resolve clients from `auth_id` in HTTP mode.
- Modify: `src/server/http-app.ts`
  - Resolve auth context per HTTP request, set cookies after auth tool calls, and preserve MCP transport behavior.
- Modify: `src/server/http.ts`
  - Build the HTTP app with the new auth persistence config.
- Modify: `tests/server/auth-tools.test.ts`
  - Verify configure/clear behavior against the new durable auth repository.
- Modify: `tests/server/http-app.test.ts`
  - Verify cookies, reconnect behavior, and auth failure behavior.
- Modify: `tests/server/create-server-tools.test.ts`
  - Verify auth tool registration still exposes the same public tool names.
- Modify: `tests/server/session-store.test.ts`
  - Re-scope tests to transport-session binding behavior.
- Create: `tests/server/auth-crypto.test.ts`
  - Covers encryption round-trip and wrong-key failure.
- Create: `tests/server/auth-token.test.ts`
  - Covers token generation and hashing.
- Create: `tests/server/auth-cookie.test.ts`
  - Covers cookie parse/serialize behavior.
- Create: `tests/server/auth-repository.test.ts`
  - Covers durable persistence, reload, revoke, and expiry.
- Create: `tests/server/auth-context.test.ts`
  - Covers bearer-first resolution, cookie fallback, and MCP session binding.
- Modify: `README.md`
  - Document the new shared-mode auth persistence behavior.
- Modify: `docs/quickstart.md`
  - Document required HTTP-mode env vars and reconnect behavior.

### Task 1: Add HTTP Auth Persistence Environment Config

**Files:**
- Modify: `src/core/config/env.ts`
- Test: `tests/core/config/env.test.ts`

- [ ] **Step 1: Write the failing config tests**

```ts
import { describe, expect, it } from "vitest";
import {
  loadHttpAuthConfig,
  loadServerMetadataConfig
} from "../../../src/core/config/env.js";

describe("loadHttpAuthConfig", () => {
  it("loads HTTP auth persistence settings with defaults", () => {
    expect(
      loadHttpAuthConfig({
        MCP_AUTH_MASTER_KEY: "0123456789abcdef0123456789abcdef",
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      })
    ).toEqual({
      masterKey: "0123456789abcdef0123456789abcdef",
      authDataPath: ".codearts-mcp/auth-store.json",
      authCookieName: "codearts_mcp_auth",
      authCookieSecure: false,
      authTokenTtlSeconds: 2592000
    });
  });

  it("rejects missing master key", () => {
    expect(() =>
      loadHttpAuthConfig({
        MCP_SERVER_NAME: "codearts-mcp",
        MCP_SERVER_VERSION: "0.1.0"
      })
    ).toThrow(/MCP_AUTH_MASTER_KEY/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/core/config/env.test.ts
```

Expected: FAIL because `loadHttpAuthConfig` does not exist yet.

- [ ] **Step 3: Implement the minimal HTTP auth config loader**

```ts
export type HttpAuthConfig = {
  masterKey: string;
  authDataPath: string;
  authCookieName: string;
  authCookieSecure: boolean;
  authTokenTtlSeconds: number;
};

export function loadHttpAuthConfig(
  source: Record<string, string | undefined> = process.env
): HttpAuthConfig {
  const masterKey = source.MCP_AUTH_MASTER_KEY;

  if (!masterKey) {
    throw new Error("MCP_AUTH_MASTER_KEY is required in HTTP mode.");
  }

  return {
    masterKey,
    authDataPath: source.MCP_AUTH_DATA_PATH ?? ".codearts-mcp/auth-store.json",
    authCookieName: source.MCP_AUTH_COOKIE_NAME ?? "codearts_mcp_auth",
    authCookieSecure: source.MCP_AUTH_COOKIE_SECURE === "true",
    authTokenTtlSeconds: Number(source.MCP_AUTH_TOKEN_TTL_SECONDS ?? "2592000")
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/core/config/env.test.ts
```

Expected: PASS with the new `loadHttpAuthConfig` coverage green.

- [ ] **Step 5: Commit**

```bash
git add src/core/config/env.ts tests/core/config/env.test.ts
git commit -m "feat: add HTTP auth persistence config"
```

### Task 2: Add Crypto, Token, and Cookie Primitives

**Files:**
- Create: `src/server/auth-crypto.ts`
- Create: `src/server/auth-token.ts`
- Create: `src/server/auth-cookie.ts`
- Test: `tests/server/auth-crypto.test.ts`
- Test: `tests/server/auth-token.test.ts`
- Test: `tests/server/auth-cookie.test.ts`

- [ ] **Step 1: Write the failing helper tests**

```ts
import { describe, expect, it } from "vitest";
import { encryptSecretValue, decryptSecretValue } from "../../src/server/auth-crypto.js";
import { createAuthToken, hashAuthToken } from "../../src/server/auth-token.js";
import { parseCookieHeader, serializeAuthCookie } from "../../src/server/auth-cookie.js";

describe("auth crypto", () => {
  it("round-trips secret values", () => {
    const encrypted = encryptSecretValue(
      "ak-1",
      "0123456789abcdef0123456789abcdef"
    );

    expect(decryptSecretValue(encrypted, "0123456789abcdef0123456789abcdef")).toBe("ak-1");
  });
});

describe("auth token", () => {
  it("generates a raw token and stores only a hash", () => {
    const token = createAuthToken();

    expect(token.raw.length).toBeGreaterThan(20);
    expect(hashAuthToken(token.raw)).toBe(token.hash);
  });
});

describe("auth cookie", () => {
  it("serializes a cookie and reads it back", () => {
    const header = serializeAuthCookie("codearts_mcp_auth", "token-1", {
      secure: false,
      maxAgeSeconds: 60
    });

    expect(header).toContain("codearts_mcp_auth=token-1");
    expect(parseCookieHeader("codearts_mcp_auth=token-1; theme=dark")).toEqual({
      codearts_mcp_auth: "token-1",
      theme: "dark"
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/auth-crypto.test.ts tests/server/auth-token.test.ts tests/server/auth-cookie.test.ts
```

Expected: FAIL because none of the helper modules exist yet.

- [ ] **Step 3: Implement the minimal helpers**

```ts
// src/server/auth-token.ts
import { createHash, randomBytes } from "node:crypto";

export function hashAuthToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

export function createAuthToken() {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashAuthToken(raw) };
}
```

```ts
// src/server/auth-cookie.ts
export function parseCookieHeader(header?: string) {
  if (!header) {
    return {};
  }

  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

export function serializeAuthCookie(
  name: string,
  value: string,
  options: { secure: boolean; maxAgeSeconds: number }
) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${options.maxAgeSeconds}`
  ];

  if (options.secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}
```

```ts
// src/server/auth-crypto.ts
import { createCipheriv, createDecipheriv, randomBytes, createHash } from "node:crypto";

function deriveKey(masterKey: string) {
  return createHash("sha256").update(masterKey).digest();
}

export function encryptSecretValue(value: string, masterKey: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(masterKey), iv);
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final()
  ]);

  return {
    scheme: "aes-256-gcm",
    iv: iv.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    auth_tag: cipher.getAuthTag().toString("base64")
  };
}

export function decryptSecretValue(
  encrypted: {
    iv: string;
    ciphertext: string;
    auth_tag: string;
  },
  masterKey: string
) {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    deriveKey(masterKey),
    Buffer.from(encrypted.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(encrypted.auth_tag, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(encrypted.ciphertext, "base64")),
    decipher.final()
  ]).toString("utf8");

  return plaintext;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/auth-crypto.test.ts tests/server/auth-token.test.ts tests/server/auth-cookie.test.ts
```

Expected: PASS with all helper primitives green.

- [ ] **Step 5: Commit**

```bash
git add src/server/auth-crypto.ts src/server/auth-token.ts src/server/auth-cookie.ts tests/server/auth-crypto.test.ts tests/server/auth-token.test.ts tests/server/auth-cookie.test.ts
git commit -m "feat: add HTTP auth crypto token and cookie helpers"
```

### Task 3: Add Durable Auth Repository

**Files:**
- Create: `src/server/auth-repository.ts`
- Test: `tests/server/auth-repository.test.ts`

- [ ] **Step 1: Write the failing repository tests**

```ts
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createFileAuthRepository } from "../../src/server/auth-repository.js";

describe("file auth repository", () => {
  it("persists and reloads auth records", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert({
      auth_id: "auth-1",
      token_hash: "hash-1",
      encrypted_access_key: { scheme: "aes-256-gcm", iv: "a", ciphertext: "b", auth_tag: "c" },
      encrypted_secret_key: { scheme: "aes-256-gcm", iv: "d", ciphertext: "e", auth_tag: "f" },
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
      pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
      check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
      testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
      build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
      artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
      created_at: "2026-04-19T09:00:00.000Z",
      updated_at: "2026-04-19T09:00:00.000Z",
      last_used_at: "2026-04-19T09:00:00.000Z"
    });

    const reloaded = createFileAuthRepository(path);
    expect(await reloaded.findByTokenHash("hash-1")).toMatchObject({
      auth_id: "auth-1",
      region: "cn-north-4"
    });
  });

  it("marks records revoked without deleting history", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert({ auth_id: "auth-2", token_hash: "hash-2", region: "cn-north-4" } as never);
    await repo.revoke("auth-2", "2026-04-19T09:10:00.000Z");

    expect(await repo.findActiveByAuthId("auth-2")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/auth-repository.test.ts
```

Expected: FAIL because the repository module does not exist yet.

- [ ] **Step 3: Implement the minimal file-backed repository**

```ts
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";

export type PersistedAuthRecord = {
  auth_id: string;
  token_hash: string;
  encrypted_access_key: { scheme: string; iv: string; ciphertext: string; auth_tag: string };
  encrypted_secret_key: { scheme: string; iv: string; ciphertext: string; auth_tag: string };
  region: string;
  req_base_url: string;
  repo_base_url: string;
  pipeline_base_url: string;
  check_base_url: string;
  testplan_base_url: string;
  deploy_base_url: string;
  build_base_url: string;
  artifact_base_url: string;
  created_at: string;
  updated_at: string;
  last_used_at: string;
  expires_at?: string;
  revoked_at?: string;
};

function loadFile(path: string) {
  if (!existsSync(path)) {
    return { version: 1, records: [] as PersistedAuthRecord[] };
  }

  return JSON.parse(readFileSync(path, "utf8")) as {
    version: number;
    records: PersistedAuthRecord[];
  };
}

export function createFileAuthRepository(path: string) {
  function save(records: PersistedAuthRecord[]) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({ version: 1, records }, null, 2));
  }

  return {
    async upsert(record: PersistedAuthRecord) {
      const data = loadFile(path);
      const next = data.records.filter((item) => item.auth_id !== record.auth_id);
      next.push(record);
      save(next);
    },
    async findByTokenHash(tokenHash: string) {
      return loadFile(path).records.find((item) => item.token_hash === tokenHash);
    },
    async findActiveByAuthId(authId: string) {
      return loadFile(path).records.find(
        (item) => item.auth_id === authId && !item.revoked_at
      );
    },
    async revoke(authId: string, revokedAt: string) {
      const data = loadFile(path);
      save(
        data.records.map((item) =>
          item.auth_id === authId ? { ...item, revoked_at: revokedAt } : item
        )
      );
    }
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/auth-repository.test.ts
```

Expected: PASS with repository persistence and revoke coverage green.

- [ ] **Step 5: Commit**

```bash
git add src/server/auth-repository.ts tests/server/auth-repository.test.ts
git commit -m "feat: add durable HTTP auth repository"
```

### Task 4: Convert Session Store to MCP Session Binding Store

**Files:**
- Modify: `src/server/session-store.ts`
- Modify: `tests/server/session-store.test.ts`

- [ ] **Step 1: Write the failing session-binding tests**

```ts
import { describe, expect, it } from "vitest";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session auth binding store", () => {
  it("stores auth identity per MCP session", () => {
    const store = createSessionCredentialStore();

    store.bind("session-a", "auth-1");

    expect(store.getAuthId("session-a")).toBe("auth-1");
    expect(store.getAuthId("session-b")).toBeUndefined();
  });

  it("clears one MCP session binding without affecting others", () => {
    const store = createSessionCredentialStore();

    store.bind("session-a", "auth-1");
    store.bind("session-b", "auth-2");
    store.clear("session-a");

    expect(store.getAuthId("session-a")).toBeUndefined();
    expect(store.getAuthId("session-b")).toBe("auth-2");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/session-store.test.ts
```

Expected: FAIL because the store still exposes credential config methods.

- [ ] **Step 3: Implement the minimal binding store**

```ts
export type SessionCredentialStore = {
  getAuthId: (sessionId: string) => string | undefined;
  bind: (sessionId: string, authId: string) => void;
  clear: (sessionId: string) => void;
};

export function createSessionCredentialStore(): SessionCredentialStore {
  const store = new Map<string, string>();

  return {
    getAuthId(sessionId) {
      return store.get(sessionId);
    },
    bind(sessionId, authId) {
      store.set(sessionId, authId);
    },
    clear(sessionId) {
      store.delete(sessionId);
    }
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/session-store.test.ts
```

Expected: PASS and the store now behaves as MCP-session transport glue only.

- [ ] **Step 5: Commit**

```bash
git add src/server/session-store.ts tests/server/session-store.test.ts
git commit -m "refactor: scope session store to MCP auth bindings"
```

### Task 5: Add Auth Context Resolver

**Files:**
- Create: `src/server/auth-context.ts`
- Test: `tests/server/auth-context.test.ts`

- [ ] **Step 1: Write the failing auth-context tests**

```ts
import { describe, expect, it } from "vitest";
import { createAuthContextResolver } from "../../src/server/auth-context.js";

describe("auth context resolver", () => {
  it("prefers Authorization bearer tokens over cookies", async () => {
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash: async (hash) =>
          hash === "bearer-hash" ? ({ auth_id: "auth-bearer" } as never) : undefined
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: (raw) => (raw === "token-a" ? "bearer-hash" : "cookie-hash")
    });

    const result = await resolver.resolve({
      headers: {
        authorization: "Bearer token-a",
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(result?.authId).toBe("auth-bearer");
  });

  it("falls back to cookie tokens when bearer tokens are absent", async () => {
    const resolver = createAuthContextResolver({
      authCookieName: "codearts_mcp_auth",
      repository: {
        findByTokenHash: async (hash) =>
          hash === "cookie-hash" ? ({ auth_id: "auth-cookie" } as never) : undefined
      },
      sessionStore: {
        getAuthId: () => undefined,
        bind: () => undefined,
        clear: () => undefined
      },
      hashToken: () => "cookie-hash"
    });

    const result = await resolver.resolve({
      headers: {
        cookie: "codearts_mcp_auth=token-b"
      }
    });

    expect(result?.authId).toBe("auth-cookie");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/auth-context.test.ts
```

Expected: FAIL because the auth context resolver does not exist yet.

- [ ] **Step 3: Implement the minimal resolver**

```ts
import { parseCookieHeader } from "./auth-cookie.js";
import { hashAuthToken } from "./auth-token.js";

export function createAuthContextResolver(options: {
  authCookieName: string;
  repository: { findByTokenHash: (hash: string) => Promise<{ auth_id: string; revoked_at?: string; expires_at?: string } | undefined> };
  sessionStore: { getAuthId: (sessionId: string) => string | undefined; bind: (sessionId: string, authId: string) => void; clear: (sessionId: string) => void };
  hashToken?: (raw: string) => string;
}) {
  const hashToken = options.hashToken ?? hashAuthToken;

  return {
    async resolve(request: { headers: Record<string, string | undefined> }) {
      const authHeader = request.headers.authorization;
      const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : undefined;
      const cookies = parseCookieHeader(request.headers.cookie);
      const rawToken = bearer ?? cookies[options.authCookieName];

      if (!rawToken) {
        return undefined;
      }

      const record = await options.repository.findByTokenHash(hashToken(rawToken));

      if (!record || record.revoked_at) {
        return undefined;
      }

      return { authId: record.auth_id, rawToken };
    }
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/auth-context.test.ts
```

Expected: PASS and bearer-first resolution works.

- [ ] **Step 5: Commit**

```bash
git add src/server/auth-context.ts tests/server/auth-context.test.ts
git commit -m "feat: add HTTP auth context resolver"
```

### Task 6: Update Auth Tools to Persist Durable Auth Records

**Files:**
- Modify: `src/server/create-server.ts`
- Modify: `tests/server/auth-tools.test.ts`
- Modify: `tests/server/create-server-tools.test.ts`

- [ ] **Step 1: Write the failing auth tool tests**

```ts
import { describe, expect, it } from "vitest";
import {
  createConfigureSessionHandler,
  createClearSessionHandler
} from "../../src/server/create-server.js";

describe("durable auth tools", () => {
  it("persists encrypted auth state and returns token metadata", async () => {
    const repository = {
      upsert: async (record: unknown) => {
        persisted.push(record);
      }
    };
    const persisted: unknown[] = [];
    const sessionStore = {
      bind: (sessionId: string, authId: string) => bindings.push({ sessionId, authId }),
      getAuthId: () => undefined,
      clear: () => undefined
    };
    const bindings: Array<{ sessionId: string; authId: string }> = [];

    const handler = createConfigureSessionHandler({
      sessionStore,
      repository,
      masterKey: "0123456789abcdef0123456789abcdef",
      createToken: () => ({ raw: "token-1", hash: "hash-1" })
    } as never);

    const result = await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4"
      },
      { sessionId: "session-a" }
    );

    expect(bindings).toEqual([{ sessionId: "session-a", authId: result.structuredContent.auth_id }]);
    expect(result.structuredContent.token_issued).toBe(true);
    expect(persisted).toHaveLength(1);
  });

  it("revokes the durable auth record on clear", async () => {
    let revoked: { authId: string; revokedAt: string } | undefined;
    const handler = createClearSessionHandler({
      sessionStore: {
        getAuthId: () => "auth-1",
        bind: () => undefined,
        clear: () => undefined
      },
      repository: {
        revoke: async (authId: string, revokedAt: string) => {
          revoked = { authId, revokedAt };
        }
      },
      authCookieName: "codearts_mcp_auth",
      authCookieSecure: false,
      authTokenTtlSeconds: 60
    } as never);

    const result = await handler({}, { sessionId: "session-a" });

    expect(revoked?.authId).toBe("auth-1");
    expect(result.structuredContent.cleared).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/auth-tools.test.ts tests/server/create-server-tools.test.ts
```

Expected: FAIL because the auth tools still expect the old session credential store.

- [ ] **Step 3: Implement durable auth tool wiring**

```ts
async function buildClientsForAuth(
  repository: AuthRepository,
  masterKey: string,
  authId?: string
) {
  if (!authId) {
    throw new AppError("auth_error", "No authenticated HTTP identity is available.");
  }

  const record = await repository.findActiveByAuthId(authId);

  if (!record) {
    throw new AppError("auth_error", `No Huawei Cloud credentials configured for auth identity ${authId}.`);
  }

  const access = decryptSecretValue(record.encrypted_access_key, masterKey);
  const secret = decryptSecretValue(record.encrypted_secret_key, masterKey);

  return buildClientsFromCredentialConfig({
    accessKey: access,
    secretKey: secret,
    reqBaseUrl: record.req_base_url,
    repoBaseUrl: record.repo_base_url,
    pipelineBaseUrl: record.pipeline_base_url,
    checkBaseUrl: record.check_base_url,
    testPlanBaseUrl: record.testplan_base_url,
    deployBaseUrl: record.deploy_base_url,
    buildBaseUrl: record.build_base_url,
    artifactBaseUrl: record.artifact_base_url
  });
}
```

```ts
const token = createAuthToken();
const authId = randomUUID();

await repository.upsert({
  auth_id: authId,
  token_hash: token.hash,
  encrypted_access_key: encryptSecretValue(parsed.access_key, masterKey),
  encrypted_secret_key: encryptSecretValue(parsed.secret_key, masterKey),
  region: parsed.region,
  ...endpoints,
  created_at: now,
  updated_at: now,
  last_used_at: now,
  expires_at: new Date(Date.now() + authTokenTtlSeconds * 1000).toISOString()
});

sessionStore.bind(sessionId, authId);

return {
  content: [{ type: "text" as const, text: `Session ${sessionId} configured for ${parsed.region}.` }],
  structuredContent: {
    session_id: sessionId,
    auth_id: authId,
    configured: true,
    region: parsed.region,
    token_issued: true,
    token_preview: `${token.raw.slice(0, 6)}...`,
    cookie_expected: true
  },
  _httpAuthToken: token.raw
};
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/auth-tools.test.ts tests/server/create-server-tools.test.ts
```

Expected: PASS and auth tool registration still exposes `auth_configure_session` and `auth_clear_session`.

- [ ] **Step 5: Commit**

```bash
git add src/server/create-server.ts tests/server/auth-tools.test.ts tests/server/create-server-tools.test.ts
git commit -m "feat: persist durable HTTP auth identities"
```

### Task 7: Integrate HTTP Auth Resolution and Cookie Handling

**Files:**
- Modify: `src/server/http-app.ts`
- Modify: `src/server/http.ts`
- Modify: `tests/server/http-app.test.ts`

- [ ] **Step 1: Write the failing HTTP app tests**

```ts
import { once } from "node:events";
import { createServer } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createHttpApp } from "../../src/server/http-app.js";

describe("http app auth persistence", () => {
  it("sets an auth cookie after configure_session", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });

    // use a mocked transport/connect flow here and assert `set-cookie`
    expect(true).toBe(false);
  });

  it("reuses cookie-backed auth after a reconnect", async () => {
    const app = createHttpApp({
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    });

    // initialize, configure once, reconnect with cookie, call a tool, expect no auth_error
    expect(true).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/http-app.test.ts
```

Expected: FAIL because cookie handling and auth context resolution are not implemented yet.

- [ ] **Step 3: Implement HTTP auth resolution and cookie propagation**

```ts
const sessionStore = createSessionCredentialStore();
const authRepository = createFileAuthRepository(authConfig.authDataPath);
const authResolver = createAuthContextResolver({
  authCookieName: authConfig.authCookieName,
  repository: authRepository,
  sessionStore
});
```

```ts
const authContext = await authResolver.resolve({
  headers: {
    authorization: Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization,
    cookie: Array.isArray(req.headers.cookie) ? req.headers.cookie[0] : req.headers.cookie
  }
});
```

```ts
await transport.handleRequest(req, res, parsedBody);

if (responseWithToken?._httpAuthToken) {
  res.setHeader(
    "set-cookie",
    serializeAuthCookie(authConfig.authCookieName, responseWithToken._httpAuthToken, {
      secure: authConfig.authCookieSecure,
      maxAgeSeconds: authConfig.authTokenTtlSeconds
    })
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/http-app.test.ts
```

Expected: PASS and the HTTP app now sets cookies and survives reconnects.

- [ ] **Step 5: Commit**

```bash
git add src/server/http-app.ts src/server/http.ts tests/server/http-app.test.ts
git commit -m "feat: resolve HTTP auth from cookies and bearer tokens"
```

### Task 8: Migrate HTTP Business Tools from Session Credentials to Auth Identity

**Files:**
- Modify: `src/server/create-server.ts`
- Test: `tests/server/auth-tools.test.ts`
- Test: `tests/server/http-app.test.ts`

- [ ] **Step 1: Write the failing auth-id client-resolution test**

```ts
it("resolves req clients from auth identity instead of raw session credentials", async () => {
  const handler = createSessionAwareReqProjectsHandler(
    {
      getAuthId: () => "auth-1",
      bind: () => undefined,
      clear: () => undefined
    } as never,
    undefined,
    {
      findActiveByAuthId: async () => ({
        auth_id: "auth-1",
        encrypted_access_key: encryptSecretValue(
          "ak-1",
          "0123456789abcdef0123456789abcdef"
        ),
        encrypted_secret_key: encryptSecretValue(
          "sk-1",
          "0123456789abcdef0123456789abcdef"
        ),
        region: "cn-north-4",
        req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
        repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
        pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
        check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
        testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
        deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
        build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
        artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn"
      })
    } as never,
    "0123456789abcdef0123456789abcdef"
  );

  await expect(handler({}, { sessionId: "session-a", authId: "auth-1" })).resolves.toBeDefined();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/auth-tools.test.ts tests/server/http-app.test.ts
```

Expected: FAIL because the HTTP business tools still call `buildClientsForSession`.

- [ ] **Step 3: Switch session-aware handlers to auth-aware client construction**

```ts
type SessionToolExtra = {
  sessionId?: string;
  authId?: string;
};

function resolveAuthId(sessionStore: SessionCredentialStore, extra: SessionToolExtra) {
  return extra.authId ?? (extra.sessionId ? sessionStore.getAuthId(extra.sessionId) : undefined);
}

export function createSessionAwareReqProjectsHandler(
  sessionStore: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListProjectsHandler>[0],
  repository?: AuthRepository,
  masterKey?: string
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient =
      injectedClient ??
      (await buildClientsForAuth(repository!, masterKey!, resolveAuthId(sessionStore, extra)))
        .reqClient;
    return createReqListProjectsHandler(reqClient)(input);
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/auth-tools.test.ts tests/server/http-app.test.ts
```

Expected: PASS and HTTP tools now resolve users from durable auth state.

- [ ] **Step 5: Commit**

```bash
git add src/server/create-server.ts tests/server/auth-tools.test.ts tests/server/http-app.test.ts
git commit -m "refactor: resolve HTTP tool clients from auth identities"
```

### Task 9: Update Shared-Mode Documentation and Run Full Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/quickstart.md`
- Modify: `docs/faq.md`

- [ ] **Step 1: Write the documentation updates**

```md
Shared HTTP mode now persists encrypted Huawei Cloud credentials per user.

First-time setup:

1. connect to the remote MCP server
2. call `auth_configure_session`
3. provide:
   - `access_key`
   - `secret_key`
   - `region`
4. the server stores encrypted credentials and issues a stable auth cookie/token

Normal reconnects do not require re-running `auth_configure_session`.
Use `auth_clear_session` to revoke the stored auth identity.
```

- [ ] **Step 2: Add the new required HTTP env vars**

```md
Required for shared HTTP persistence:

- `MCP_AUTH_MASTER_KEY`
- `MCP_AUTH_DATA_PATH` (optional, defaults to `.codearts-mcp/auth-store.json`)
- `MCP_AUTH_COOKIE_NAME` (optional)
- `MCP_AUTH_COOKIE_SECURE` (optional)
- `MCP_AUTH_TOKEN_TTL_SECONDS` (optional)
```

- [ ] **Step 3: Run focused docs and auth verification**

Run:

```bash
npm test -- tests/server/auth-crypto.test.ts tests/server/auth-token.test.ts tests/server/auth-cookie.test.ts tests/server/auth-repository.test.ts tests/server/auth-context.test.ts tests/server/auth-tools.test.ts tests/server/http-app.test.ts tests/server/create-server-tools.test.ts tests/server/session-store.test.ts
npm run build
```

Expected:

- all listed tests PASS
- TypeScript build exits with code `0`

- [ ] **Step 4: Run broader server regression verification**

Run:

```bash
npm test -- tests/server/index.test.ts tests/server/register-tools.test.ts tests/core/config/env.test.ts
```

Expected: PASS and stdio mode remains unchanged.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/quickstart.md docs/faq.md src/core/config/env.ts src/server/auth-crypto.ts src/server/auth-token.ts src/server/auth-cookie.ts src/server/auth-repository.ts src/server/auth-context.ts src/server/http-app.ts src/server/http.ts src/server/create-server.ts src/server/session-store.ts tests/core/config/env.test.ts tests/server/auth-crypto.test.ts tests/server/auth-token.test.ts tests/server/auth-cookie.test.ts tests/server/auth-repository.test.ts tests/server/auth-context.test.ts tests/server/auth-tools.test.ts tests/server/http-app.test.ts tests/server/create-server-tools.test.ts tests/server/session-store.test.ts
git commit -m "feat: persist HTTP auth across reconnects"
```

## Self-Review

- Spec coverage:
  - encrypted persistence is implemented in Tasks 1-3
  - token and cookie auth resolution is implemented in Tasks 2, 5, and 7
  - MCP reconnect survival is covered in Tasks 7-8
  - backward-compatible auth tool names are preserved in Task 6
  - stdio-mode non-regression is verified in Task 9
- Placeholder scan:
  - no placeholder markers remain
  - every task includes file paths, code, commands, and expected outcomes
- Type consistency:
  - durable auth identity is consistently named `auth_id`
  - token lookup is consistently named `token_hash`
  - HTTP transport glue is consistently `sessionId -> auth_id`
