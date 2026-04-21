# P5 Server Registration Plan Caching Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce shared HTTP initialize latency by capturing the full tool registration plan once per app instance, then replaying that plan into each new `McpServer` instead of rebuilding handlers and re-dispatching all tools on every transport initialization.

**Architecture:** Keep MCP session semantics unchanged. Introduce a `createServerFactory()` helper that prepares shared dependencies, captures tool registrations with a lightweight in-memory server, and returns a function that creates fresh `McpServer` instances from the cached plan. Use the factory inside the HTTP app so repeated `initialize` requests reuse the same registration plan.

**Tech Stack:** TypeScript, MCP SDK server, Vitest

---

### Task 1: Add failing regression tests

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\create-server-tools.test.ts`

- [ ] Add a test proving `createServerFactory()` captures tool registrations only once even when it creates multiple server instances.
- [ ] Verify each produced server still receives the expected registered tools.
- [ ] Run the targeted test and confirm it fails before implementation.

### Task 2: Implement server registration-plan caching

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Modify: `D:\Code\codearts-mcp\src\server\http-app.ts`

- [ ] Add a capturing server that records `registerTool()` calls as reusable plan entries.
- [ ] Build a `createServerFactory()` helper that prepares shared dependencies once and replays the captured plan into fresh `McpServer` instances.
- [ ] Switch shared HTTP initialize flow to use the cached server factory instead of rebuilding the whole registration path each time.
- [ ] Keep existing `createServer()` API behavior intact for direct callers.

### Task 3: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\server\create-server-tools.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\server\http-app.test.ts`

- [ ] Run targeted server-registration and HTTP app tests.
- [ ] Run `npm test`.
