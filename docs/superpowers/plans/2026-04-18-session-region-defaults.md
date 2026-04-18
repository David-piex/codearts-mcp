# Session Region Defaults Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let shared HTTP users configure a session with `AK/SK + region` by default while still allowing optional per-product endpoint overrides.

**Architecture:** Add a small server-side region registry that expands `region` into the full CodeArts endpoint set during `auth_configure_session`. Keep the stored session shape unchanged so downstream client construction and session-aware tools continue to work without behavioral changes.

**Tech Stack:** TypeScript, Zod, Vitest, existing MCP server/session-store code

---

## File Map

- Create: `src/server/region-defaults.ts`
  - Owns the supported region registry and the merge helper that expands defaults plus optional overrides.
- Modify: `src/server/create-server.ts`
  - Loosens `auth_configure_session` input from “all URLs required” to “region required, URLs optional”, resolves defaults, and stores the expanded config.
- Modify: `src/server/session-store.ts`
  - Keep stored expanded config unchanged; only touch if helper types need reuse or clearer naming.
- Create: `tests/server/region-defaults.test.ts`
  - Covers default endpoint expansion, override merge behavior, and unsupported-region rejection.
- Modify: `tests/server/create-server-tools.test.ts`
  - Covers `auth_configure_session` with region-only input and with partial override input.
- Modify: `docs/quickstart.md`
  - Update shared HTTP onboarding to say `AK/SK + region` is enough for standard regions.
- Modify: `README.md`
  - Align high-level shared deployment instructions with the new configuration flow.
- Modify: `.env.example`
  - Keep startup env examples intact for stdio mode, but add a comment that HTTP shared mode can resolve endpoints from region defaults.

### Task 1: Add Region Registry and Merge Helper

**Files:**
- Create: `src/server/region-defaults.ts`
- Test: `tests/server/region-defaults.test.ts`

- [ ] **Step 1: Write the failing tests for region expansion**

```ts
import { describe, expect, it } from "vitest";
import {
  resolveRegionDefaults,
  mergeSessionEndpointOverrides
} from "../../src/server/region-defaults.js";

describe("resolveRegionDefaults", () => {
  it("returns the standard Beijing 4 CodeArts endpoints", () => {
    expect(resolveRegionDefaults("cn-north-4")).toEqual({
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
      pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
      check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
      testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
      build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
      artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn"
    });
  });

  it("throws for unsupported regions", () => {
    expect(() => resolveRegionDefaults("cn-south-9")).toThrowError(
      /Unsupported CodeArts region/
    );
  });
});

describe("mergeSessionEndpointOverrides", () => {
  it("keeps defaults when no overrides are provided", () => {
    const defaults = resolveRegionDefaults("cn-north-4");
    expect(mergeSessionEndpointOverrides(defaults, {})).toEqual(defaults);
  });

  it("overrides only the provided endpoint fields", () => {
    const defaults = resolveRegionDefaults("cn-north-4");
    expect(
      mergeSessionEndpointOverrides(defaults, {
        deploy_base_url: "https://custom-deploy.example.com"
      })
    ).toEqual({
      ...defaults,
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/region-defaults.test.ts
```

Expected: FAIL because `src/server/region-defaults.ts` and its exports do not exist yet.

- [ ] **Step 3: Implement the minimal region registry**

```ts
const REGION_DEFAULTS = {
  "cn-north-4": {
    req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
    repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
    pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
    check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
    testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
    deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
    build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
    artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn"
  }
} as const;

export type SessionEndpointDefaults = (typeof REGION_DEFAULTS)["cn-north-4"];

export function resolveRegionDefaults(region: string): SessionEndpointDefaults {
  const defaults = REGION_DEFAULTS[region as keyof typeof REGION_DEFAULTS];

  if (!defaults) {
    throw new Error(`Unsupported CodeArts region: ${region}`);
  }

  return defaults;
}

export function mergeSessionEndpointOverrides(
  defaults: SessionEndpointDefaults,
  overrides: Partial<SessionEndpointDefaults>
): SessionEndpointDefaults {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined)
    )
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/region-defaults.test.ts
```

Expected: PASS with `4` tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/server/region-defaults.ts tests/server/region-defaults.test.ts
git commit -m "feat: add session region endpoint defaults"
```

### Task 2: Make Session Configuration Resolve Defaults

**Files:**
- Modify: `src/server/create-server.ts`
- Test: `tests/server/create-server-tools.test.ts`

- [ ] **Step 1: Write the failing tests for region-only session config**

```ts
import { describe, expect, it } from "vitest";
import {
  createConfigureSessionHandler
} from "../../src/server/create-server.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("createConfigureSessionHandler", () => {
  it("expands standard endpoints from region-only input", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await handler(
      {
        access_key: "ak",
        secret_key: "sk",
        region: "cn-north-4"
      },
      { sessionId: "session-1" }
    );

    expect(store.get("session-1")).toMatchObject({
      access_key: "ak",
      secret_key: "sk",
      region: "cn-north-4",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com"
    });
  });

  it("applies explicit endpoint overrides on top of region defaults", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await handler(
      {
        access_key: "ak",
        secret_key: "sk",
        region: "cn-north-4",
        deploy_base_url: "https://custom-deploy.example.com"
      },
      { sessionId: "session-2" }
    );

    expect(store.get("session-2")).toMatchObject({
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });

  it("rejects unsupported regions", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await expect(
      handler(
        {
          access_key: "ak",
          secret_key: "sk",
          region: "cn-south-9"
        },
        { sessionId: "session-3" }
      )
    ).rejects.toThrow(/Unsupported CodeArts region/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- tests/server/create-server-tools.test.ts
```

Expected: FAIL because the current schema still requires every `*_base_url`.

- [ ] **Step 3: Implement region-aware session configuration**

```ts
const configureSessionInputSchema = z.object({
  access_key: z.string().min(1),
  secret_key: z.string().min(1),
  region: z.string().min(1),
  req_base_url: z.string().url().optional(),
  repo_base_url: z.string().url().optional(),
  pipeline_base_url: z.string().url().optional(),
  check_base_url: z.string().url().optional(),
  testplan_base_url: z.string().url().optional(),
  deploy_base_url: z.string().url().optional(),
  build_base_url: z.string().url().optional(),
  artifact_base_url: z.string().url().optional()
});

const defaults = resolveRegionDefaults(parsed.region);
const endpoints = mergeSessionEndpointOverrides(defaults, {
  req_base_url: parsed.req_base_url,
  repo_base_url: parsed.repo_base_url,
  pipeline_base_url: parsed.pipeline_base_url,
  check_base_url: parsed.check_base_url,
  testplan_base_url: parsed.testplan_base_url,
  deploy_base_url: parsed.deploy_base_url,
  build_base_url: parsed.build_base_url,
  artifact_base_url: parsed.artifact_base_url
});

store.set(sessionId, {
  access_key: parsed.access_key,
  secret_key: parsed.secret_key,
  region: parsed.region,
  ...endpoints,
  updated_at: new Date().toISOString()
});
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm test -- tests/server/create-server-tools.test.ts
```

Expected: PASS and the new tests confirm region-only setup works.

- [ ] **Step 5: Commit**

```bash
git add src/server/create-server.ts tests/server/create-server-tools.test.ts
git commit -m "feat: resolve session endpoints from region defaults"
```

### Task 3: Keep Backward Compatibility Explicit

**Files:**
- Modify: `tests/server/create-server-tools.test.ts`
- Modify: `src/server/create-server.ts`

- [ ] **Step 1: Add a compatibility test for full explicit endpoint input**

```ts
it("still accepts callers that provide every endpoint explicitly", async () => {
  const store = createSessionCredentialStore();
  const handler = createConfigureSessionHandler(store);

  await handler(
    {
      access_key: "ak",
      secret_key: "sk",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com"
    },
    { sessionId: "session-4" }
  );

  expect(store.get("session-4")).toMatchObject({
    req_base_url: "https://req.example.com",
    repo_base_url: "https://repo.example.com",
    pipeline_base_url: "https://pipeline.example.com",
    check_base_url: "https://check.example.com",
    testplan_base_url: "https://testplan.example.com",
    deploy_base_url: "https://deploy.example.com",
    build_base_url: "https://build.example.com",
    artifact_base_url: "https://artifact.example.com"
  });
});
```

- [ ] **Step 2: Run test to verify it fails if merge behavior regresses**

Run:

```bash
npm test -- tests/server/create-server-tools.test.ts
```

Expected: FAIL if the handler accidentally overwrites explicit URLs with defaults.

- [ ] **Step 3: Adjust merge order only if needed**

```ts
const endpoints = mergeSessionEndpointOverrides(defaults, {
  req_base_url: parsed.req_base_url,
  repo_base_url: parsed.repo_base_url,
  pipeline_base_url: parsed.pipeline_base_url,
  check_base_url: parsed.check_base_url,
  testplan_base_url: parsed.testplan_base_url,
  deploy_base_url: parsed.deploy_base_url,
  build_base_url: parsed.build_base_url,
  artifact_base_url: parsed.artifact_base_url
});
```

- [ ] **Step 4: Run the focused tests again**

Run:

```bash
npm test -- tests/server/region-defaults.test.ts tests/server/create-server-tools.test.ts
```

Expected: PASS with all region-resolution and compatibility tests green.

- [ ] **Step 5: Commit**

```bash
git add src/server/create-server.ts tests/server/create-server-tools.test.ts
git commit -m "test: cover session endpoint override compatibility"
```

### Task 4: Update Shared-Mode Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/quickstart.md`
- Modify: `.env.example`

- [ ] **Step 1: Write the doc updates**

```md
Shared `http + session` mode:

1. connect to the remote MCP server
2. run `auth_configure_session`
3. provide:
   - `access_key`
   - `secret_key`
   - `region`
4. optionally override any product `*_base_url`

For `cn-north-4`, the server fills the standard CodeArts endpoints automatically.
```

- [ ] **Step 2: Run a docs sanity scan**

Run:

```bash
Get-Content README.md
Get-Content docs/quickstart.md
Get-Content .env.example
```

Expected: shared-mode instructions consistently say “`AK/SK + region` is enough for standard regions”.

- [ ] **Step 3: Keep stdio examples explicit**

```md
Note:

- `stdio` mode still uses startup environment variables
- shared `http + session` mode can resolve endpoints from region defaults
- explicit endpoint overrides remain supported
```

- [ ] **Step 4: Run the full verification command**

Run:

```bash
npm test -- tests/server/region-defaults.test.ts tests/server/create-server-tools.test.ts tests/server/register-tools.test.ts
npm run build
```

Expected:

- all listed tests PASS
- TypeScript build exits with code `0`

- [ ] **Step 5: Commit**

```bash
git add README.md docs/quickstart.md .env.example tests/server/region-defaults.test.ts tests/server/create-server-tools.test.ts src/server/region-defaults.ts src/server/create-server.ts
git commit -m "docs: simplify shared session region configuration"
```

## Self-Review

- Spec coverage:
  - region-only session config is implemented in Task 2
  - optional endpoint overrides are covered in Tasks 1-3
  - backward compatibility is explicitly covered in Task 3
  - docs are updated in Task 4
- Placeholder scan:
  - no `TODO` / `TBD` / “similar to above” placeholders remain
- Type consistency:
  - endpoint keys are consistently `req_base_url`, `repo_base_url`, `pipeline_base_url`, `check_base_url`, `testplan_base_url`, `deploy_base_url`, `build_base_url`, `artifact_base_url`

