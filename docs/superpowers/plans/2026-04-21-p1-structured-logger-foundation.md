# P1 Structured Logger Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a shared structured logger utility and route the HTTP server's default request logging through it so logging becomes consistent and extensible.

**Architecture:** Add a small server-side logger module that emits JSON lines with stable envelope fields such as timestamp, level, component, and event. Keep the first integration narrow: HTTP server startup and default HTTP request completion logging should use the logger, while custom request loggers remain supported unchanged.

**Tech Stack:** TypeScript, Node.js, Vitest, JSON logging

---

### Task 1: Add failing logger unit tests

**Files:**
- Create: `D:\Code\codearts-mcp\tests\server\logger.test.ts`
- Create: `D:\Code\codearts-mcp\src\server\logger.ts`

- [ ] Write a test that creates the structured logger with a fake sink and expects a single JSON line containing `timestamp`, `level`, `component`, and `event`.
- [ ] Run `npm test -- tests/server/logger.test.ts` and confirm it fails because the logger module does not exist yet.

### Task 2: Add failing HTTP integration test

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\http.test.ts`
- Modify: `D:\Code\codearts-mcp\src\server\http.ts`

- [ ] Add a test that starts the HTTP server without a custom `requestLogger`, injects a fake structured logger, and asserts:
  - startup emits an `http_server_listening` log
  - the generated default request logger emits an `http_request_completed` log
- [ ] Run `npm test -- tests/server/http.test.ts` and confirm the new test fails before implementation.

### Task 3: Implement the shared logger and wire HTTP defaults to it

**Files:**
- Create: `D:\Code\codearts-mcp\src\server\logger.ts`
- Modify: `D:\Code\codearts-mcp\src\server\http.ts`

- [ ] Implement a minimal structured logger with:
  - `info`
  - `error`
  - stable envelope fields
- [ ] Keep `requestLogger` dependency override behavior unchanged.
- [ ] When no custom `requestLogger` is supplied, wrap HTTP request entries with the shared logger.
- [ ] Emit one startup log after the server begins listening.

### Task 4: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\server\logger.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\server\http.test.ts`

- [ ] Run `npm test -- tests/server/logger.test.ts`.
- [ ] Run `npm test -- tests/server/http.test.ts`.
- [ ] Run `npm test`.
