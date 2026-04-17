# CodeArts MCP HTTP Shared Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared HTTP MCP deployment mode with per-session Huawei Cloud credentials while preserving local stdio mode.

**Architecture:** Split server creation from transport startup, introduce an in-memory session credential store, add session auth tools, and create a shared HTTP endpoint using Streamable HTTP transport. Live CodeArts tools will resolve clients from the current session in HTTP mode and from startup env credentials in stdio mode.

**Tech Stack:** Node.js, TypeScript, Express, `@modelcontextprotocol/sdk`, `zod`, `vitest`

---

## File Structure

- `src/server/create-server.ts`
  shared server and tool registration
- `src/server/session-store.ts`
  in-memory session credential store
- `src/server/http-app.ts`
  express app with `/health` and `/mcp`
- `src/server/http.ts`
  HTTP bootstrap
- `src/server/stdio.ts`
  stdio bootstrap
- `src/server/index.ts`
  entrypoint and mode selection
- `tests/server/session-store.test.ts`
  session store coverage
- `tests/server/http-app.test.ts`
  health endpoint coverage
- `tests/server/auth-tools.test.ts`
  configure and clear session behavior

### Task 1: Add Session Store and Session Auth Tool Tests

**Files:**
- Create: `D:\Code\codearts-mcp\tests\server\session-store.test.ts`
- Create: `D:\Code\codearts-mcp\tests\server\auth-tools.test.ts`

- [ ] **Step 1: Write the failing tests**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement session store and auth handlers**
- [ ] **Step 4: Run tests to verify they pass**

### Task 2: Split Server Creation from Transport Startup

**Files:**
- Create: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Create: `D:\Code\codearts-mcp\src\server\stdio.ts`
- Modify: `D:\Code\codearts-mcp\src\server\index.ts`

- [ ] **Step 1: Write the failing tests**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement transport split**
- [ ] **Step 4: Run tests to verify they pass**

### Task 3: Add Shared HTTP App and Health Endpoint

**Files:**
- Create: `D:\Code\codearts-mcp\src\server\http-app.ts`
- Create: `D:\Code\codearts-mcp\src\server\http.ts`
- Create: `D:\Code\codearts-mcp\tests\server\http-app.test.ts`
- Modify: `D:\Code\codearts-mcp\package.json`

- [ ] **Step 1: Write the failing tests**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement HTTP app and startup**
- [ ] **Step 4: Run tests to verify they pass**

### Task 4: Switch Live Tools to Session-Scoped Credentials

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\req\tools\list-projects.ts`
- Modify: `D:\Code\codearts-mcp\src\products\repo\tools\list-repositories.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-runs.ts`
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`

- [ ] **Step 1: Write the failing tests**
- [ ] **Step 2: Run tests to verify they fail**
- [ ] **Step 3: Implement session-scoped client resolution**
- [ ] **Step 4: Run tests to verify they pass**

### Task 5: Verify Shared and Local Modes

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`
- Modify: `D:\Code\codearts-mcp\.env.example`

- [ ] **Step 1: Update docs for stdio and HTTP modes**
- [ ] **Step 2: Run `npm test`**
- [ ] **Step 3: Run `npm run build`**

## Self-Review

### Spec Coverage

- HTTP shared deployment is covered by Tasks 2 and 3.
- Session credential isolation is covered by Tasks 1 and 4.
- New auth tools are covered by Task 1 and Task 4.
- Stdio preservation is covered by Tasks 2 and 5.

### Placeholder Scan

- No placeholder sections remain.
- Tasks are constrained to this iteration's scope.

### Type Consistency

- Session credential fields remain aligned with the approved design.
- Shared tools keep using normalized MCP result envelopes.
