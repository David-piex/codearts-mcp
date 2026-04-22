# Repo Create Repository Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `repo_create_repository` MCP tool that creates a repository through the official CodeArts Repo CreateRepository API and supports the current project-wide `dry_run` pattern.

**Architecture:** Extend the Repo client with a `createRepository` write method mapped to `POST /v1/repositories`, add a focused tool handler with preview + normalized result mapping, then register the tool in both stdio and session-aware HTTP flows. Keep the first implementation aligned to the official API surface and the repo module's existing write-tool shape.

**Tech Stack:** TypeScript, Zod, Vitest, MCP server tool registry

---

### Task 1: Lock File Boundaries

**Files:**
- Create: `D:/Code/codearts-mcp/src/products/repo/tools/create-repository.ts`
- Create: `D:/Code/codearts-mcp/tests/products/repo/tools/create-repository.test.ts`
- Modify: `D:/Code/codearts-mcp/src/products/repo/client.ts`
- Modify: `D:/Code/codearts-mcp/src/products/repo/schemas.ts`
- Modify: `D:/Code/codearts-mcp/src/products/repo/tools/index.ts`
- Modify: `D:/Code/codearts-mcp/src/server/register-repo-tools.ts`
- Modify: `D:/Code/codearts-mcp/src/server/session-aware-product-handlers.ts`
- Modify: `D:/Code/codearts-mcp/tests/products/repo/client.test.ts`

- [ ] Step 1: Add the new task plan file and confirm the implementation only needs Repo module changes plus optional doc updates.
- [ ] Step 2: Keep the new behavior in the existing Repo tool layout instead of restructuring the Repo module.

### Task 2: Write the Failing Tool Tests

**Files:**
- Create: `D:/Code/codearts-mcp/tests/products/repo/tools/create-repository.test.ts`

- [ ] Step 1: Write a dry-run test for `previewCreateRepository` that expects the new tool to echo official input fields and `executed: false`.
- [ ] Step 2: Write a mapping test for `mapCreatedRepository` that expects normalized result fields such as `repositoryUuid`, `projectUuid`, and `executed: true`.
- [ ] Step 3: Run `npx vitest tests/products/repo/tools/create-repository.test.ts` and confirm it fails because the new tool file does not exist yet.

### Task 3: Write the Failing Client Test

**Files:**
- Modify: `D:/Code/codearts-mcp/tests/products/repo/client.test.ts`

- [ ] Step 1: Add a client test that calls `createRepository` with official request fields and asserts the HTTP client posts to `/v1/repositories`.
- [ ] Step 2: Assert the request body includes `project_uuid`, `name`, and the supported optional initialization fields.
- [ ] Step 3: Assert the normalized response reads `repository_uuid` and `project_uuid` from the provider payload.
- [ ] Step 4: Run `npx vitest tests/products/repo/client.test.ts` and confirm the new test fails because `createRepository` is not implemented.

### Task 4: Implement the Minimal Client and Schema Support

**Files:**
- Modify: `D:/Code/codearts-mcp/src/products/repo/client.ts`
- Modify: `D:/Code/codearts-mcp/src/products/repo/schemas.ts`

- [ ] Step 1: Add `repoCreateRepositoryInput` in the Repo schema file with official fields plus `dry_run`.
- [ ] Step 2: Add a `createRepository` method to the Repo client type.
- [ ] Step 3: Implement the client call against `POST /v1/repositories` with a minimal normalized response shape.
- [ ] Step 4: Re-run `npx vitest tests/products/repo/client.test.ts` and confirm the new client test passes.

### Task 5: Implement the Tool Handler

**Files:**
- Create: `D:/Code/codearts-mcp/src/products/repo/tools/create-repository.ts`
- Modify: `D:/Code/codearts-mcp/src/products/repo/tools/index.ts`

- [ ] Step 1: Add `previewCreateRepository` using the existing Repo write-tool preview style.
- [ ] Step 2: Add `mapCreatedRepository` using the existing normalized item result style.
- [ ] Step 3: Add `createRepoCreateRepositoryHandler` with `dry_run` preview support and live execution path.
- [ ] Step 4: Export the new tool name from the Repo tool index.
- [ ] Step 5: Re-run `npx vitest tests/products/repo/tools/create-repository.test.ts` and confirm the tool tests pass.

### Task 6: Register the Tool in Both Transports

**Files:**
- Modify: `D:/Code/codearts-mcp/src/server/register-repo-tools.ts`
- Modify: `D:/Code/codearts-mcp/src/server/session-aware-product-handlers.ts`

- [ ] Step 1: Register `repo_create_repository` in the Repo tool registry with a concise user-facing description.
- [ ] Step 2: Add the session-aware HTTP handler wiring so shared `http` mode can call the new tool.
- [ ] Step 3: Verify the new tool name is included in the normal Repo tool collection flow.

### Task 7: Refresh Alignment Docs

**Files:**
- Modify: `D:/Code/codearts-mcp/docs/wiki/Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
- Modify: `D:/Code/codearts-mcp/docs/wiki/Official-PDF-MCP-Coverage-Summary.md`

- [ ] Step 1: Add `repo_create_repository` to the Repo endpoint mapping page with the official CreateRepository path.
- [ ] Step 2: Refresh the Repo coverage summary so the new capability is listed under the already-MCPized surface.

### Task 8: Verify

**Files:**
- Test: `D:/Code/codearts-mcp/tests/products/repo/tools/create-repository.test.ts`
- Test: `D:/Code/codearts-mcp/tests/products/repo/client.test.ts`

- [ ] Step 1: Run `npx vitest tests/products/repo/tools/create-repository.test.ts tests/products/repo/client.test.ts`
- [ ] Step 2: Run `npx vitest tests/products/repo`
- [ ] Step 3: If doc files changed, run `npm run stats:check-docs`
- [ ] Step 4: Review the final diff to ensure only Repo-related code and the intended doc pages changed.
