# CodeArts MCP Project Handoff Brief

## Summary

`codearts-mcp` is a TypeScript/Node.js MCP server for Huawei CodeArts China. It exposes CodeArts product capabilities as MCP tools.

The server supports two runtime modes:

- `stdio`: local, single-user usage. Credentials come from process environment.
- `http`: shared service usage. Each user binds their own AK/SK through session auth, while the service provides product-scoped MCP entrypoints.

The default application HTTP port is `3000`. The Docker Compose setup exposes Nginx on host port `80`.

Current Gitee state after the July 2026 merge:

- `origin/master` and `origin/split-mcp-product` both point at `02d4a94a`.
- The shared HTTP `/mcp` endpoint has been removed; use `/mcp/<family>`.
- `req_list_work_item_queries` was fixed to send only the documented `projectId` query parameter, avoiding duplicate `projectId` / `project_id` signing failures.
- The latest full local gate passed with `452` test files and `2629` tests.

## Architecture

The main entrypoint is `src/server/index.ts`. It chooses the runtime mode from `MCP_TRANSPORT`:

- `MCP_TRANSPORT=http` starts `startHttpServer()`.
- Any other value starts `startStdioServer()`.

HTTP mode is built around `src/server/http.ts` and `src/server/http-app.ts`:

- `http.ts` starts the Node HTTP server.
- `http-app.ts` handles `/health`, `/mcp/<family>`, request logging, auth token and cookie handling, session recovery, and MCP transport lifecycle.

MCP server creation is centralized in `src/server/create-server.ts`:

- Creates the `McpServer`.
- Registers auth/session tools.
- Registers the scaffold tool.
- Registers product tools.
- Applies write-path rate limiting.

Tool metadata and product registration are split across:

- `src/server/tool-manifest.ts`: canonical metadata for tool names, product module, family, read/write access, dry-run support, live status, doc grouping, and risk level.
- `src/server/register-product-tools.ts`: routes each product tool to the correct product-specific registrar.
- `src/server/product-tool-registry.ts`: turns product tool definitions into actual MCP registrations and wraps common error formatting.

Each product module follows the same broad layout:

- `client.ts`: CodeArts HTTP API wrapper.
- `schemas.ts`: Zod input/output schemas.
- `tools/*.ts`: MCP tool handlers.

The product domains are:

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## Key Design Points

Shared HTTP mode does not share one global CodeArts credential. Users call `auth_configure_session` to store encrypted credentials, and later tool calls recover credentials from cookie/token/session context.

HTTP MCP is split by product family. Each `/mcp/<family>` route creates a route-specific MCP session and registers only that product's tools plus `auth_configure_session` and `auth_clear_session`. Auth cookies or bearer tokens can be reused across product routes, but `mcp-session-id` values are route-scoped and cannot be reused between paths.

The project has explicit consistency checks around tool metadata and docs:

- `npm run tool-manifest:check`
- `npm run function-api:check`
- `npm run stats:check-docs`

The full quality gate is `npm run check`, which runs linting, type checking, manifest checks, Function API checks, stats-doc checks, tests, and build.

Large-maintenance areas are concentrated in:

- Product clients, especially Req, TestPlan, Deploy, Pipeline, and Repo.
- Product registration files.
- Generated or synchronized docs.
- Live-test and write-path coverage.

## Current State Notes

Current module scale:

- Product modules: `8`
- Product tools: `2334`
- Product reads: `1351`
- Product writes: `983`
- Shared HTTP total with auth tools: `2336`

Current HTTP product routes:

- `/mcp/req`
- `/mcp/repo`
- `/mcp/pipeline`
- `/mcp/check`
- `/mcp/testplan`
- `/mcp/deploy`
- `/mcp/build`
- `/mcp/artifact`

The official endpoint coverage audit currently reports `0` weak client/tool matches and `0` low-confidence semantic matches across all products. Repo explicitly ignores one deprecated raw-private-key endpoint.

The docs include generated sections. When changing tool names, schemas, manifest metadata, or module counts, run the synchronization/check commands before committing.

## Risks

HTTP runtime state needs long-running service attention. Session store, transport registry, client cache, and rate limiter state should have clear TTL and capacity boundaries before relying on the service for sustained public/shared traffic.

Live tests may touch real CodeArts resources. Treat any live write path as unsafe unless it has explicit opt-in variables and known disposable resource IDs.

Production deployment should prefer HTTPS. Public HTTP examples are risky when auth cookies or bearer tokens are involved.

The repository contains large generated/reference docs and large product files. Small tool changes can require updates across manifests, docs, registrations, and tests.

Generated official endpoint tools can still fail at runtime if an upstream route is unpublished, if a product is not enabled for the tenant, or if a path/query parameter mapping is wrong. Treat repeated provider errors with stable parameters as candidates for focused client tests.

## Verification Commands

Use these commands to verify the project after changes:

```bash
npm run lint
npm run build
npm test
npm run tool-manifest:check
```

Use the full gate before release or handoff:

```bash
npm run check
```

For HTTP shared-mode smoke after deployment, verify:

- `GET /health`
- `POST /mcp/req` initialize
- `auth_configure_session`
- `req_list_projects`
- `tools/list` on each product route
- one low-risk read per enabled product route

## Assumptions

This brief describes the current Gitee `master` and `split-mcp-product` state after the July 2026 merge.

This document is a handoff aid. It does not implement runtime fixes, refactors, cleanup, service startup, or deployment changes.
