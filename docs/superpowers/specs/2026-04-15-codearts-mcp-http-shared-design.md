# CodeArts MCP HTTP Shared Mode Design

## Overview

This document defines the shared HTTP deployment mode for `codearts-mcp`.

The new mode allows multiple users to connect to one shared MCP service while keeping Huawei Cloud credentials isolated per MCP session. Each user configures their own CodeArts credentials at runtime, and business tools execute with the credentials bound to the current session.

## Goals

- Add a deployable HTTP MCP mode for shared use.
- Preserve the existing local `stdio` workflow for single-user development.
- Isolate Huawei Cloud credentials per MCP session.
- Avoid global service-level `AK/SK` in shared mode.
- Support the existing real tools with per-session credentials.

## Non-Goals

- Persistent credential storage in Redis or a database.
- Enterprise SSO or external secret vault integration.
- Converting all scaffolded tools to live mode in this iteration.
- Encrypting credentials at rest, since the first version uses in-memory storage only.

## Runtime Modes

### Stdio Mode

- Used for local development and single-user workflows.
- Continues to use startup environment variables for Huawei Cloud credentials.
- Remains compatible with the current local setup.

### HTTP Mode

- Used for shared deployment.
- Exposes `/health` and `/mcp`.
- Requires session-level credential configuration.
- Does not require global `HUAWEICLOUD_AK` or `HUAWEICLOUD_SK`.

## Session Credential Model

Each MCP session in shared HTTP mode owns one credential object:

- `access_key`
- `secret_key`
- `region`
- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `updated_at`

The server stores credentials in an in-memory map keyed by MCP `session_id`.

When a business tool runs:

1. read the current session ID from tool execution context
2. load that session's credential config
3. return `auth_error` if no credentials are configured
4. create signed Huawei Cloud clients for that session
5. execute the tool with that user's own credentials

## New Tools

### `auth_configure_session`

Accepts:

- `access_key`
- `secret_key`
- `region`
- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`

Behavior:

- requires a valid MCP session ID
- stores the credential config for that session
- returns a summary confirming the session is configured

### `auth_clear_session`

Behavior:

- requires a valid MCP session ID
- clears the stored credential config for that session
- returns a summary confirming the session is cleared

## Tool Execution Model

The following live tools switch from startup-scoped credentials to session-scoped credentials:

- `req_list_projects`
- `repo_list_repositories`
- `pipeline_list_runs`

The remaining scaffolded tools can stay stateless for now because they do not call live provider APIs yet.

## Server Structure

Recommended files:

```text
src/server/
  create-server.ts
  stdio.ts
  http.ts
  http-app.ts
  session-store.ts
  index.ts
```

Responsibilities:

- `create-server.ts`: create an MCP server instance and register tools
- `stdio.ts`: start local stdio mode with env credentials
- `http.ts`: start the shared HTTP service
- `http-app.ts`: build express app and MCP routes
- `session-store.ts`: manage in-memory session credentials
- `index.ts`: mode-aware entrypoint

## HTTP Endpoints

- `GET /health`
  - returns service health status
- `POST /mcp`
  - MCP request endpoint
- `GET /mcp`
  - SSE / streamable HTTP follow-up requests for existing sessions
- `DELETE /mcp`
  - terminate a session transport

## Error Handling

Business tools in shared mode must return `auth_error` when:

- no session ID is present in shared mode
- no credentials are configured for the session

The service should not silently fall back to any global credentials in shared mode.

## Verification Scope

This iteration is complete when:

- session store behavior is tested
- `auth_configure_session` and `auth_clear_session` are tested
- HTTP app exposes `/health`
- shared mode can create and reuse MCP sessions
- the three live tools resolve credentials from the current session
