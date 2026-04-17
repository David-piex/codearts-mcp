# CodeArts MCP Phase 1 Design

## Overview

This document defines the first implementation phase for `codearts-mcp`, an MCP server for Huawei Cloud China CodeArts services. Phase 1 focuses on the core development workflow across:

- CodeArts Req / ProjectMan
- CodeArts Repo
- CodeArts Pipeline

The server is externally presented as one MCP endpoint, while internally organized by product domain so later phases can add Build, Check, Deploy, and TestPlan without destabilizing the core architecture.

## Goals

- Provide one MCP server for the most common CodeArts product domains.
- Keep the implementation aligned with Huawei Cloud product boundaries.
- Expose a stable, predictable tool surface for conversational use.
- Centralize authentication, HTTP transport, config, pagination, and error handling.
- Support safe read operations first, with a small set of high-value write actions.

## Non-Goals

- Full OpenAPI coverage for all CodeArts services in phase 1.
- Cross-product orchestration workflows in a single tool.
- High-risk destructive actions such as deleting projects, repositories, or pipelines.
- Long-running watch or polling-heavy automation behaviors.
- Phase 1 support for Build, Check, Deploy, or TestPlan as first-class modules.

## Product Scope

### Req

Phase 1 Req tools:

- `req_list_projects`
- `req_get_project`
- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`
- `req_list_iterations`
- `req_list_project_members`

These cover the core project and work item flows needed for conversational project tracking.

### Repo

Phase 1 Repo tools:

- `repo_list_repositories`
- `repo_get_repository`
- `repo_list_branches`
- `repo_list_commits`
- `repo_get_commit`
- `repo_get_file`
- `repo_list_merge_requests`
- `repo_get_merge_request`

These prioritize repository visibility and code navigation over high-risk write actions.

### Pipeline

Phase 1 Pipeline tools:

- `pipeline_list_pipelines`
- `pipeline_get_pipeline`
- `pipeline_list_runs`
- `pipeline_get_run`
- `pipeline_run_pipeline`
- `pipeline_list_templates`

These cover pipeline discovery, execution history, and manual trigger scenarios.

## Architecture

### Top-Level Shape

The implementation is a single MCP server process with shared infrastructure and product-specific modules.

- One MCP server process handles protocol lifecycle and tool registration.
- Shared core modules handle authentication, config loading, HTTP execution, retries, pagination helpers, and error normalization.
- Product modules own API clients, schema mapping, tool logic, and product-specific validation.

### Internal Module Boundaries

Recommended structure:

```text
src/
  server/
    index.ts
    register-tools.ts
  core/
    config/
    auth/
    http/
    errors/
    pagination/
  contracts/
    tool-result.ts
    common-schemas.ts
  products/
    req/
      client.ts
      schemas.ts
      tools/
    repo/
      client.ts
      schemas.ts
      tools/
    pipeline/
      client.ts
      schemas.ts
      tools/
```

### Design Rules

- Tool naming must be product-prefixed to avoid collisions and make ownership obvious.
- Product modules must not implement their own ad hoc HTTP or auth stacks.
- Shared contracts should capture stable MCP-facing shapes, while product modules remain free to adapt upstream API changes internally.

## Tool Contract Design

### Naming

All tools use the format `<product>_<action>`:

- `req_list_projects`
- `repo_get_file`
- `pipeline_run_pipeline`

This keeps product ownership obvious and reduces ambiguity in mixed conversations.

### Inputs

Input names should follow business meaning rather than raw HTTP parameter names whenever possible.

Examples:

- `project_id`
- `work_item_id`
- `repository_id`
- `pipeline_id`

List-style tools should support a shared, consistent filter vocabulary when meaningful:

- `page`
- `page_size`
- `keyword`
- `sort_by`
- `sort_order`

When Huawei Cloud APIs differ, the adapter layer handles translation or omits unsupported options safely.

### Outputs

Each tool should return a stable MCP-facing envelope:

- `summary`: short readable summary of the result
- `item` or `items`: normalized core fields
- `page_info`: pagination metadata for list results
- `raw`: optional upstream payload subset when needed for debugging or advanced use

This keeps output useful for both end users and models without overexposing noisy provider-specific fields by default.

## Authentication and Configuration

Authentication is centralized and configured at server startup, not per tool invocation.

Phase 1 requirements:

- Load Huawei Cloud China credentials and service base configuration from environment or startup config.
- Expose a single initialized client factory to product modules.
- Keep auth implementation replaceable so future provider-specific differences can be handled in the shared layer.

Tool callers should not repeatedly provide credentials. Authentication concerns stay below the MCP tool surface.

## Error Handling

All provider and validation failures should be normalized into four stable categories:

- `auth_error`
- `not_found`
- `validation_error`
- `provider_error`

Each error response should include:

- a short user-readable message
- normalized error category
- upstream error code when available
- upstream request identifier when available

This keeps the user experience predictable while preserving enough context for debugging.

## Safety Model

Write operations in phase 1 should support `dry_run` by default when the underlying action is meaningful to preview.

Initial write operations:

- `req_create_work_item`
- `req_update_work_item`
- `pipeline_run_pipeline`

Safety expectations:

- validate required fields before execution
- resolve referenced resources where feasible
- clearly state whether the action was simulated or executed
- avoid destructive operations entirely in phase 1

## Data Mapping Strategy

Each product module is responsible for translating provider-specific payloads into stable MCP-facing shapes.

Mapping priorities:

1. Preserve core product semantics.
2. Normalize common list and detail results for conversational use.
3. Keep product-specific advanced fields available behind `raw` if needed.

The MCP contract should remain steady even if upstream field names differ between products.

## Extensibility

This design intentionally leaves room for later modules:

- `products/build`
- `products/check`
- `products/deploy`
- `products/testplan`

Future modules must follow the same architecture:

- shared auth and HTTP stack
- product-owned adapters and tools
- normalized MCP result envelope
- product-prefixed tool naming

## Open Questions Resolved for Phase 1

- Phase 1 is not a full-codearts universal agent. It is a stable product-oriented MCP foundation.
- The recommended first implementation set is Req, Repo, and Pipeline.
- Cross-product workflow composition is deferred until the product modules are individually stable.
- Safety is prioritized over broad write coverage.

## Implementation Readiness

The design is ready to transition into an implementation plan with these workstreams:

- bootstrap the MCP server and shared core
- implement Req module and tools
- implement Repo module and tools
- implement Pipeline module and tools
- add config, auth, validation, and normalized error handling
- add verification coverage for contract stability and adapter behavior
