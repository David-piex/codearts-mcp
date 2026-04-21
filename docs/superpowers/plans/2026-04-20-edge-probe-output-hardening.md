# Edge Probe Output Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `probe:edge` usable for long-running live diagnosis by adding machine-readable output modes, iteration-aware failure classification, and sampling pauses.

**Architecture:** Extend `src/server/edge-probe.ts` so each sampling pass produces iteration metadata in addition to the existing aggregate summary. Keep the default JSON output backward compatible, then add formatter helpers for `summary` and `ndjson` output without changing the probe request flow.

**Tech Stack:** TypeScript, Node.js fetch/CLI, Vitest

---

### Task 1: Add failing tests for iteration classification and output formatting

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\edge-probe.test.ts`
- Test: `D:\Code\codearts-mcp\tests\server\edge-probe.test.ts`

- [ ] **Step 1: Write the failing tests**

Add tests that assert:
- `summarizeProbeIteration()` marks an iteration as `likely_edge` when `health` succeeds and `initialize` fails with `502`, `network_error`, or `timeout`.
- `formatProbeReport(..., "ndjson")` emits newline-delimited machine-readable records including an iteration record and a final summary record.
- `formatProbeReport(..., "summary")` emits compact human-readable output that includes totals and likely-origin counts.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/server/edge-probe.test.ts`
Expected: FAIL because the new formatter/classification helpers do not exist yet.

### Task 2: Implement iteration-aware probe reporting

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\edge-probe.ts`
- Test: `D:\Code\codearts-mcp\tests\server\edge-probe.test.ts`

- [ ] **Step 1: Write minimal implementation**

Implement:
- `ProbeIterationSummary`
- `summarizeProbeIteration()`
- `formatProbeReport()`
- CLI parsing for `--output` and `--sleep-ms`
- `runEdgeProbe()` iteration tracking with optional pause between iterations

- [ ] **Step 2: Run targeted tests to verify they pass**

Run: `npm test -- tests/server/edge-probe.test.ts`
Expected: PASS

### Task 3: Verify no regression in the surrounding server test surface

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\edge-probe.ts`
- Test: `D:\Code\codearts-mcp\tests\server\edge-probe.test.ts`

- [ ] **Step 1: Run focused verification**

Run: `npm test -- tests/server/edge-probe.test.ts tests/server/http-app.test.ts`
Expected: PASS

- [ ] **Step 2: Run build verification**

Run: `npm run build`
Expected: PASS
