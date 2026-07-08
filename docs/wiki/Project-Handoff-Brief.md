# CodeArts MCP Project Handoff Brief

## Summary

`codearts-mcp` is a TypeScript/Node.js MCP server for Huawei CodeArts China. It exposes CodeArts product capabilities as MCP tools.

The server supports two runtime modes:

- `stdio`: local, single-user usage. Credentials come from process environment.
- `http`: shared service usage. Each user binds their own AK/SK through session auth, while the service provides product-scoped MCP entrypoints.

The default application HTTP port is `3000`. The Docker Compose setup exposes Nginx on host port `80`.

The current working tree is not clean. Repo-related changes are present, including a new `associate-branch-work-items` tool and related docs, manifest, registration, and tests. Treat those changes as part of the current project state unless explicitly reviewing only `origin/master`.

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

The working tree currently contains uncommitted Repo module work. Before modifying Repo-related files, inspect the local diff and preserve existing changes.

Important affected areas include:

- Repo client and schema changes.
- Repo tool index and registration.
- Tool manifest and expected tool list.
- Function API docs and module stats docs.
- Repo client/tool tests.

The docs currently show encoding issues when read from the local terminal. Code structure remains readable, but any future documentation work should explicitly preserve UTF-8 and avoid accidental newline or encoding churn.

## Risks

HTTP runtime state needs long-running service attention. Session store, transport registry, client cache, and rate limiter state should have clear TTL and capacity boundaries before relying on the service for sustained public/shared traffic.

Live tests may touch real CodeArts resources. Treat any live write path as unsafe unless it has explicit opt-in variables and known disposable resource IDs.

Production deployment should prefer HTTPS. Public HTTP examples are risky when auth cookies or bearer tokens are involved.

The repository contains large generated/reference docs and large product files. Small tool changes can require updates across manifests, docs, registrations, and tests.

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

When validating the current Repo tool work, verify:

- Repo client method behavior.
- Repo schema exports.
- Repo tool index and server registration.
- Tool manifest entry.
- Expected tool names.
- Repo client/tool tests.
- Function API reference synchronization.

## Assumptions

This brief describes the current working tree state, not only `origin/master`.

This document is a handoff aid. It does not implement runtime fixes, refactors, cleanup, service startup, or deployment changes.

Existing uncommitted changes are treated as user work and must not be overwritten without explicit instruction.
