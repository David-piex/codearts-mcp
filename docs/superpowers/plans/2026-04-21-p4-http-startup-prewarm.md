# P4 HTTP Startup Prewarm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce first-request latency in shared HTTP mode by prewarming only local startup dependencies, without making any upstream Huawei Cloud API calls.

**Architecture:** Keep the scope narrow. Add a local `prewarm()` path to the file-backed auth repository so it can hydrate cached file contents and indexes during startup, then expose an HTTP app-level prewarm hook that the HTTP server runs before listening. Startup prewarm should stay local-only and safe to run repeatedly.

**Tech Stack:** TypeScript, Node.js HTTP server, file-backed auth repository, Vitest

---

### Task 1: Add failing regression tests

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\auth-repository.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\http.test.ts`

- [ ] Add a repository test proving `prewarm()` hydrates cached data so the first lookup after prewarm does not re-read the file.
- [ ] Add an HTTP server test proving `startHttpServer()` awaits the app prewarm hook before it starts listening.
- [ ] Run both targeted tests and confirm the new expectations fail before implementation.

### Task 2: Implement repository and app prewarm hooks

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\auth-repository.ts`
- Modify: `D:\Code\codearts-mcp\src\server\http-app.ts`

- [ ] Add a repository `prewarm()` method that loads file contents and builds indexes without mutating persisted data.
- [ ] Expose an HTTP app `prewarm()` hook that warms local auth persistence when HTTP auth is enabled.
- [ ] Keep the hook a no-op when auth persistence is not configured.

### Task 3: Wire startup prewarm into the HTTP entrypoint

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\http.ts`

- [ ] Detect and await the app prewarm hook before `listen()`.
- [ ] Emit a structured startup log describing prewarm completion and duration.

### Task 4: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\server\auth-repository.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\server\http.test.ts`

- [ ] Run targeted tests for repository and HTTP startup prewarm.
- [ ] Run `npm test`.
