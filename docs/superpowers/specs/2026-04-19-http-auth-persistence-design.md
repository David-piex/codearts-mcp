# HTTP Auth Persistence Design

## Overview

This document defines the next-generation HTTP authentication model for `codearts-mcp`.

Today shared HTTP mode binds Huawei Cloud credentials to a transient MCP `sessionId`. That model is workable for a single uninterrupted connection, but it breaks down in real clients such as Cursor because the client frequently disconnects and reconnects. When the MCP transport closes, the current server clears the in-memory session credentials, so the next reconnect loses `AK/SK` and every business tool falls back to `auth_error`.

The new design keeps the existing `auth_configure_session` entrypoint, but changes its meaning in HTTP mode:

- the first successful configuration creates a stable authenticated identity
- the server encrypts and persists Huawei Cloud credentials at rest
- the server issues a durable HTTP auth cookie and an optional bearer token
- later MCP reconnects resolve credentials from the durable auth identity instead of the transient MCP session

This is the first version intended for long-running shared server deployment.

## Goals

- Preserve `auth_configure_session` as the primary first-time onboarding flow.
- Stop losing Huawei Cloud credentials when Cursor or another MCP client reconnects.
- Persist per-user credential state across MCP transport restarts and service process restarts.
- Encrypt `AK/SK` at rest with a server-side master key.
- Support both cookie-based browser-style reuse and token-based non-browser clients.
- Keep users isolated from each other in shared HTTP mode.
- Maintain compatibility with the existing session-aware business tool surface.

## Non-Goals

- Building a separate `/auth` web onboarding page in this iteration.
- Adding a pre-login portal, SSO, enterprise identity provider, or invitation workflow.
- Introducing a full external secret manager such as Vault or KMS.
- Sharing one global Huawei Cloud credential across all users.
- Changing CodeArts tool business logic beyond how credentials are resolved.

## Current Problem

The current HTTP flow looks like this:

1. a client connects to `/mcp`
2. the server creates a transport-level `sessionId`
3. `auth_configure_session` stores `AK/SK/region/base_urls` in an in-memory map keyed by `sessionId`
4. every session-aware tool rebuilds provider clients from that `sessionId`
5. when the transport closes, the server clears the session credentials

This creates four failures in shared deployment:

- reconnects create a new MCP session and lose credentials
- process restarts lose all credentials
- credentials cannot be resumed across tabs or clients
- transport lifetime and auth lifetime are coupled even though they should be independent

## High-Level Approach

Introduce a durable HTTP auth layer that sits above MCP session lifetime.

The server will manage two separate identities:

- `mcp_session_id`
  - short-lived transport identity used by the MCP protocol implementation
- `auth_id`
  - stable user auth identity used to resolve Huawei Cloud credentials

The binding becomes:

- `cookie or bearer token -> auth_id -> encrypted credential record`

and only secondarily:

- `mcp_session_id -> auth_id`

That means a reconnect may change the MCP session, but it does not change the durable auth identity.

## User Experience

### First-Time Configuration

The user still calls `auth_configure_session` with:

- `access_key`
- `secret_key`
- `region`
- optional per-product `*_base_url` overrides

On success the server:

1. validates the input
2. resolves base URLs from region defaults plus overrides
3. encrypts `access_key` and `secret_key`
4. upserts a durable auth record
5. issues:
   - an `HttpOnly` auth cookie for browser-like clients
   - a token value in structured output for clients that can persist tokens
6. binds the current MCP session to that auth identity

### Reconnect

When the client reconnects to `/mcp`:

1. the HTTP app reads the auth cookie or bearer token
2. the server validates the token and resolves `auth_id`
3. the new MCP session is associated with that `auth_id`
4. subsequent tool requests reuse the stored credentials automatically

The user does not need to re-run `auth_configure_session` after normal reconnects.

### Explicit Logout or Reset

`auth_clear_session` changes meaning in HTTP mode:

- clears the durable auth record for the current authenticated identity
- clears the current MCP session binding
- expires the auth cookie
- invalidates the bearer token hash

After that, future requests must configure credentials again.

## Data Model

Introduce a durable auth record with fields similar to:

- `auth_id`
- `token_id`
- `token_hash`
- `encrypted_access_key`
- `encrypted_secret_key`
- `region`
- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `check_base_url`
- `testplan_base_url`
- `deploy_base_url`
- `build_base_url`
- `artifact_base_url`
- `created_at`
- `updated_at`
- `last_used_at`
- `expires_at`
- `revoked_at`

Introduce a lightweight session binding record:

- `mcp_session_id`
- `auth_id`
- `bound_at`
- `last_seen_at`

The session binding can stay in memory because it is only an optimization and transport convenience. The durable auth record must be persisted.

## Storage Model

Use a local persistent store owned by the server process.

Recommended first implementation:

- a JSON file or lightweight file-backed store under a dedicated data directory

Recommended record layout:

- one auth record collection
- optional metadata version for future migrations

The storage layer should be abstracted behind a dedicated repository interface so it can later move to SQLite or Redis without touching the HTTP auth flow.

The first version should not spread persistence concerns into `http-app.ts` or individual product tool handlers.

## Encryption Model

Credentials must be encrypted before persistence.

Use a service-level master key supplied by environment variable, for example:

- `MCP_AUTH_MASTER_KEY`

Requirements:

- the key must be required in shared HTTP mode
- encryption must use authenticated encryption
- ciphertext must include per-record random IV or nonce
- only encrypted `AK/SK` is stored on disk
- plaintext `AK/SK` is only held in memory long enough to validate and build clients

Recommended shape for encrypted fields:

- `scheme`
- `iv`
- `ciphertext`
- `auth_tag`

The encryption helper should be isolated in a small server-side module so the repository stores opaque encrypted payloads rather than owning cryptographic details.

## Token and Cookie Model

### Stable Auth Token

The server generates a random bearer token when credentials are configured or rotated.

The raw token is:

- returned once to the caller in structured output
- set in an `HttpOnly` cookie
- never stored in plaintext on disk

Only a secure hash of the token is persisted.

### Cookie

Recommended cookie behavior:

- `HttpOnly`
- `Path=/`
- `SameSite=Lax`
- `Secure` configurable by environment and enabled in HTTPS deployments
- explicit max age

Cookie name should be server-specific, for example:

- `codearts_mcp_auth`

### Bearer Token

For clients that cannot or do not keep cookies stable, the same raw token can be supplied as:

- `Authorization: Bearer <token>`

The HTTP auth resolver should support either transport:

- bearer token takes priority if present
- otherwise cookie is used

## HTTP Request Resolution Flow

Before handling MCP business requests, the HTTP app resolves auth context:

1. read `Authorization` header
2. if not present, read auth cookie
3. hash the presented token
4. load the durable auth record by token hash
5. reject if:
   - token not found
   - token expired
   - auth record revoked
6. attach `auth_id` to request context
7. if the MCP request initializes a new transport, bind `mcp_session_id -> auth_id`

This request auth resolution must be independent from whether the current transport already exists.

## MCP Tool Execution Model

The business tools should stop resolving credentials from transient session storage directly.

Instead, HTTP mode should resolve clients from an auth context:

- `buildClientsForAuth(store, authId)`

Session-aware handlers can remain structurally similar, but they should consume:

- `extra.authId`
  or
- a request-bound resolver that falls back from `sessionId -> auth_id`

This lets existing tools keep the same business behavior while changing only the credential lookup source.

## Backward Compatibility

### Existing Tool Name

- keep `auth_configure_session`
- keep `auth_clear_session`

The names stay stable so existing clients do not lose discovery compatibility.

### Existing Inputs

Keep the current `auth_configure_session` input shape:

- `access_key`
- `secret_key`
- `region`
- optional `*_base_url` overrides

### Existing Output

Expand the response to include additional structured fields such as:

- `session_id`
- `auth_id`
- `configured`
- `region`
- `token_issued`
- `token_preview`
- `cookie_expected`

The text response should stay human-readable and not print secrets.

### Existing Session Store

The current in-memory session store can remain temporarily for:

- `mcp_session_id -> auth_id` bindings
- current-session short-lived cache

But it should no longer be the source of truth for persisted credentials.

## Error Handling

`auth_configure_session` should reject:

- missing `access_key`
- missing `secret_key`
- missing `region`
- unsupported `region`
- malformed `*_base_url`
- missing or invalid master encryption key in HTTP mode
- storage write failures

Business tools in HTTP mode should return auth errors that clearly distinguish:

- no auth token presented
- invalid or expired auth token
- credentials were cleared or revoked
- auth context exists but encrypted credential load failed

The service should not silently fall back to any global `AK/SK` in shared HTTP mode.

## Security Considerations

This design improves usability but changes the server's trust boundary.

Important rules:

- never log plaintext `AK/SK`
- never return decrypted credentials from any tool
- store only token hashes, not raw tokens
- expire auth cookies and persisted tokens on `auth_clear_session`
- support future token rotation without rewriting the credential storage shape
- separate encryption and persistence responsibilities

Because this iteration does not include a pre-login portal, anyone who can reach the server can create their own stored auth context. That is acceptable for the current stated scope, but it should be documented as an operational tradeoff for public internet deployment.

## Proposed Server Structure Changes

Recommended new server-side modules:

```text
src/server/
  auth-crypto.ts
  auth-cookie.ts
  auth-repository.ts
  auth-token.ts
  auth-context.ts
  http-app.ts
  create-server.ts
  session-store.ts
```

Responsibilities:

- `auth-crypto.ts`
  - encrypt and decrypt credential payloads
- `auth-cookie.ts`
  - parse and serialize auth cookies
- `auth-repository.ts`
  - persist durable auth records
- `auth-token.ts`
  - generate tokens and hash presented tokens
- `auth-context.ts`
  - resolve request auth context and bind MCP sessions to auth identities
- `http-app.ts`
  - integrate HTTP auth resolution with MCP transport lifecycle
- `create-server.ts`
  - adapt auth tools and business tool client resolution
- `session-store.ts`
  - keep short-lived `mcp_session_id -> auth_id` bindings

## Testing Scope

Add focused tests for:

- encryption and decryption round-trip
- repository persistence and reload across process recreation
- token hashing and lookup
- `auth_configure_session` issuing durable auth state
- `auth_clear_session` revoking durable auth state
- HTTP app setting auth cookies on successful configure
- HTTP reconnect resolving auth context from cookie without reconfiguration
- HTTP reconnect resolving auth context from bearer token without cookie
- expired token rejection
- invalid token rejection
- no fallback to global env credentials in HTTP mode
- unchanged stdio mode behavior

## Migration Strategy

Implement in the following order:

1. add crypto and durable auth repository primitives
2. add token issuance and cookie helpers
3. extend HTTP app with auth context resolution
4. update `auth_configure_session` to write durable auth records
5. update `auth_clear_session` to revoke durable auth records
6. switch HTTP business tools from session credentials to auth-context credentials
7. keep temporary `sessionId -> auth_id` bindings for transport glue
8. add reconnect and restart-focused tests

This order keeps the existing tool surface stable while progressively changing the source of truth.

## Success Criteria

This change is complete when:

- a user can configure HTTP shared mode once with `auth_configure_session`
- reconnecting Cursor does not require re-entering `AK/SK`
- restarting the service does not lose durable auth state
- persisted Huawei Cloud credentials are encrypted at rest
- the server can resolve business tool credentials from cookie or bearer token
- `auth_clear_session` fully revokes the stored auth context
- stdio mode remains unchanged
