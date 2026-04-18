# Session Region Defaults Design

## Overview

This document defines a better shared-session configuration flow for `codearts-mcp`.

Today each HTTP session must provide `AK/SK`, `region`, and every product `*_base_url`. That works, but it is too heavy for normal users and locks onboarding to copy-pasting a long Beijing 4 endpoint list.

The new design keeps session-scoped credentials, but adds region-based default endpoint resolution. A user should be able to configure a session with:

- `access_key`
- `secret_key`
- `region`

and have the server fill the standard CodeArts product endpoints for that region automatically. Advanced users can still override one or more endpoints manually.

## Goals

- Keep per-session credential isolation in shared HTTP mode.
- Let normal users configure a session with `AK/SK + region` only.
- Preserve support for Beijing 4 as the default and best-validated region.
- Allow other CodeArts regions through a selectable region map.
- Allow per-product endpoint override when a tenant uses a non-standard route.

## Non-Goals

- Auto-discovering endpoints from Huawei Cloud APIs.
- Supporting arbitrary unknown regions without a maintained region map.
- Persisting session credentials across process restarts.
- Changing tool business logic outside session configuration and client construction.

## User Experience

### Normal Mode

The user calls `auth_configure_session` with:

- `access_key`
- `secret_key`
- `region`

The server resolves the standard product endpoints for that region and stores the full expanded config in the session.

### Advanced Override Mode

The user may also pass any subset of:

- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `check_base_url`
- `testplan_base_url`
- `deploy_base_url`
- `build_base_url`
- `artifact_base_url`

When present, those values override the region defaults for that session only.

## Region Default Model

Introduce a small server-side region registry such as:

- `cn-north-4`
- future additional China regions that expose the same CodeArts products

Each region entry contains the default base URLs for:

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

If a region is not in the registry, `auth_configure_session` should fail with a clear validation-style error instead of silently storing partial config.

## Session Storage Model

The stored session object remains expanded and explicit:

- `access_key`
- `secret_key`
- `region`
- `req_base_url`
- `repo_base_url`
- `pipeline_base_url`
- `check_base_url`
- `testplan_base_url`
- `deploy_base_url`
- `build_base_url`
- `artifact_base_url`
- `updated_at`

This keeps downstream client construction unchanged. Resolution happens once during session configuration, not every time a tool runs.

## Server-Side Flow

When `auth_configure_session` runs:

1. validate `access_key`, `secret_key`, and `region`
2. load the region defaults from the registry
3. merge any explicitly provided `*_base_url` overrides on top of the defaults
4. store the fully expanded session config
5. return the configured region and a summary of whether defaults or overrides were used

## Backward Compatibility

- Existing clients that already send all `*_base_url` fields continue to work.
- Existing session storage shape stays the same.
- Existing tool handlers do not need behavioral changes if they already consume the stored expanded config.

## Error Handling

`auth_configure_session` should reject:

- missing `access_key`
- missing `secret_key`
- missing `region`
- unsupported `region`
- malformed override URL

The response should make it clear whether the failure is:

- invalid input
- unsupported region
- malformed endpoint override

## Testing Scope

Add focused tests for:

- region default expansion for `cn-north-4`
- override merge behavior for one or more products
- unsupported region rejection
- backward compatibility when the caller supplies all product URLs directly
- unchanged downstream client construction from stored session config

## Success Criteria

This change is complete when:

- a user can configure shared HTTP mode with only `AK/SK + region`
- Beijing 4 works without manually entering all product URLs
- explicit endpoint overrides still work
- existing session-aware tools continue to use the correct per-session credentials
