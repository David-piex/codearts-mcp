# P0 Health And Tempfile Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a readiness health endpoint for shared HTTP deployments and tighten temporary-file ignore rules so the repo stays clean by default.

**Architecture:** Extend the HTTP app with a dedicated `/health/ready` response that reports basic readiness status without changing existing `/health` semantics. Keep the tempfile cleanup small and explicit by adding ignore coverage for the currently observed `tmp-*` artifact families and validating it with a bootstrap test.

**Tech Stack:** TypeScript, Node.js HTTP server, Vitest, Markdown docs

---

### Task 1: Add failing readiness tests

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\http-app.test.ts`
- Modify: `D:\Code\codearts-mcp\src\server\http-app.ts`

- [ ] Add a test that requests `GET /health/ready` with a valid auth config and expects `200` plus a readiness payload.
- [ ] Add a second test that points `authDataPath` at an invalid parent path and expects `503` plus a `not_ready` style payload.
- [ ] Run only `tests/server/http-app.test.ts` and confirm the new tests fail before implementation.

### Task 2: Add failing tempfile ignore test

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\bootstrap\project-layout.test.ts`
- Modify: `D:\Code\codearts-mcp\.gitignore`

- [ ] Add a bootstrap test that reads `.gitignore` and expects a generic `tmp-*` ignore rule.
- [ ] Run only `tests/bootstrap/project-layout.test.ts` and confirm the new test fails before implementation.

### Task 3: Implement readiness endpoint and tempfile ignore rule

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\http-app.ts`
- Modify: `D:\Code\codearts-mcp\.gitignore`

- [ ] Implement `/health/ready` without changing current `/health` and `/` behavior.
- [ ] Make readiness return `200` when the auth persistence target is usable and `503` when it is clearly invalid.
- [ ] Add a repo-wide `tmp-*` ignore rule while preserving existing ignore coverage.

### Task 4: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\server\http-app.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\bootstrap\project-layout.test.ts`

- [ ] Run `npm test -- tests/server/http-app.test.ts`.
- [ ] Run `npm test -- tests/bootstrap/project-layout.test.ts`.
- [ ] Run `npm test`.
