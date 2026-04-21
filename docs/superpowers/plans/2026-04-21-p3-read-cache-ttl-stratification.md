# P3 Read Cache TTL Stratification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce repeated list-call latency in both stdio and shared HTTP mode by giving stable list endpoints a longer cache window and volatile list endpoints a shorter one, while keeping the values overridable from environment configuration.

**Architecture:** Introduce one shared read-cache TTL config shape with sensible defaults, load optional per-tool overrides from environment variables, and feed that config through the existing client-construction path. Keep the implementation narrow: no cache algorithm changes, only TTL selection and propagation.

**Tech Stack:** TypeScript, Node.js, Vitest, existing read-through cache helper

---

### Task 1: Add failing regression tests

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\core\config\env.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\auth-session-runtime.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\req\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\repo\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\build\client-list-jobs.test.ts`

- [ ] Add env-loader coverage for default TTL values and env overrides.
- [ ] Add a runtime test that verifies tiered TTLs are passed into downstream product-client builders.
- [ ] Add client-level tests proving stable lists stay cached beyond the old `15s` window and volatile lists refresh before it.
- [ ] Run the targeted test files and confirm the new expectations fail before implementation.

### Task 2: Implement shared TTL defaults and config wiring

**Files:**
- Create: `D:\Code\codearts-mcp\src\core\cache\read-cache-ttl.ts`
- Modify: `D:\Code\codearts-mcp\src\core\config\env.ts`
- Modify: `D:\Code\codearts-mcp\src\server\auth-session-runtime.ts`
- Modify: `D:\Code\codearts-mcp\src\server\build-stdio-clients.ts`
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`

- [ ] Define shared default TTLs for `req_list_projects`, `repo_list_repositories`, `pipeline_list_pipelines`, and `build_list_jobs`.
- [ ] Load optional env overrides into both stdio and HTTP server config shapes.
- [ ] Pass the resolved TTL config through shared client-construction helpers.

### Task 3: Apply the tiered defaults in product clients

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\req\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\repo\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\client.ts`

- [ ] Switch each high-frequency list cache to the shared per-tool default.
- [ ] Preserve explicit `listCacheTtlMs` overrides for tests and future tuning.

### Task 4: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\core\config\env.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\server\auth-session-runtime.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\products\req\client.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\products\repo\client.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\products\build\client-list-jobs.test.ts`

- [ ] Run targeted tests for env, runtime, and the four product clients.
- [ ] Run `npm test`.
