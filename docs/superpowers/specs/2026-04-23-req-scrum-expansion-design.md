# Req Scrum Expansion Design

Date: 2026-04-23
Branch: Dev
Status: Draft for review

## 1. Goal

Expand the current `Req` MCP surface from the existing 8-tool core into a broader, day-to-day usable Scrum-focused requirement management surface.

This phase does not aim to mirror the full CodeArts Req API PDF. It focuses on the high-frequency Scrum project, member, iteration, and work-item collaboration flows that are most likely to be used by agents and human operators in real workflows.

## 2. Current State

The current `Req` implementation exposes these 8 tools:

- `req_list_projects`
- `req_get_project`
- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`
- `req_list_iterations`
- `req_list_project_members`

The current module is already live-validated for the project and work-item core loop, but it does not yet cover most of the management and collaboration endpoints described in the official Req API documentation.

## 3. Phase 1 Scope

Phase 1 targets the Scrum common surface only.

Included:

- Project management
- Project member management
- Iteration management
- Work-item collaboration and workflow helpers

Explicitly excluded from Phase 1:

- IPD APIs
- Requirement pool APIs
- Program/project-space APIs
- Kanban project APIs
- Field management
- Module management
- Domain management
- Status configuration management
- Work-hour management
- File upload/download style attachment APIs

## 4. Approach Options

### Option A: Thin and wide

Implement many Req APIs quickly with minimal shaping, prioritizing coverage count.

Pros:

- Coverage number grows quickly
- Easier to claim broad API alignment

Cons:

- Higher risk of inconsistent schemas and output formats
- Lower confidence in live usability
- Greater cleanup and refactor cost later

### Option B: Resource-domain expansion

Expand the Req module by resource domain: projects, members, iterations, and work-item collaboration.

Pros:

- Fits the existing code structure
- Easier to test and document
- Produces usable slices incrementally
- Keeps implementation boundaries clear

Cons:

- Coverage count grows more slowly than a broad sweep

### Option C: Strict PDF order expansion

Implement endpoints in the same order as the official Req PDF.

Pros:

- Easy to cross-check against the document

Cons:

- Mixes high-value and low-value APIs
- Pushes low-frequency configuration and edge-case APIs into the critical path
- Slows delivery of the most useful workflows

### Recommendation

Use Option B: resource-domain expansion.

It aligns with the current repo structure and keeps the first phase focused on usable Scrum workflows rather than PDF parity for its own sake.

## 5. Phase 1 Feature Set

### 5.1 Project management

Existing:

- `req_list_projects`
- `req_get_project`

New tools:

- `req_create_project`
- `req_update_project`
- `req_delete_project`
- `req_check_project_name`
- `req_list_not_added_projects`

Outcome:

- Projects move from read-only to manageable resources

### 5.2 Project member management

Existing:

- `req_list_project_members`

New tools:

- `req_add_project_member`
- `req_batch_add_project_members`
- `req_batch_delete_project_members`
- `req_update_project_member_role`
- `req_leave_project`

Outcome:

- The module gains basic project collaboration administration

### 5.3 Iteration management

Existing:

- `req_list_iterations`

New tools:

- `req_get_iteration`
- `req_create_iteration`
- `req_update_iteration`
- `req_delete_iteration`
- `req_batch_delete_iterations`
- `req_update_iteration_state`
- `req_query_iteration_immovable_issues`

Outcome:

- Scrum iteration operations become manageable instead of list-only

### 5.4 Work-item collaboration

Existing:

- `req_list_work_items`
- `req_get_work_item`
- `req_create_work_item`
- `req_update_work_item`

New tools:

- `req_delete_work_item`
- `req_batch_update_work_items`
- `req_list_work_item_records`
- `req_list_work_item_comments`
- `req_add_work_item_comment`
- `req_update_work_item_comment`
- `req_list_associated_issues`
- `req_list_associated_commits`
- `req_list_associated_test_cases`
- `req_list_related_users`
- `req_update_work_item_flow`

Outcome:

- The module supports practical collaboration and traceability, not just CRUD

## 6. Naming and Behavior Rules

### Naming

New tools will follow the existing MCP naming style:

- `req_<verb>_<resource>`

Examples:

- `req_create_project`
- `req_update_iteration`
- `req_add_work_item_comment`

### Write safety

High-risk write tools should continue the current dry-run-first model where practical.

Default `dry_run=true` is recommended for:

- Project create/update/delete
- Member batch operations
- Iteration create/update/delete
- Work-item delete
- Batch work-item updates
- Work-item flow transitions

If an endpoint cannot support a meaningful dry-run preview, the tool should still return a clearly structured preview-style description whenever possible before the first live execution path is promoted in docs.

## 7. Code Structure

### 7.1 Keep the current top-level module layout

Continue using:

- `src/products/req/client.ts`
- `src/products/req/tools/*`
- `src/server/register-req-tools.ts`

This preserves consistency with other modules.

### 7.2 Split schemas by resource domain

Current `src/products/req/schemas.ts` should be split into smaller files:

- `src/products/req/schemas/project.ts`
- `src/products/req/schemas/member.ts`
- `src/products/req/schemas/iteration.ts`
- `src/products/req/schemas/work-item.ts`
- `src/products/req/schemas/comment.ts`

These may be re-exported from a small shared entrypoint for compatibility.

Rationale:

- Easier navigation
- Lower merge conflict risk
- Better long-term maintainability as the tool surface grows

### 7.3 Evolve `client.ts` in staged fashion

Phase 1 should keep a single Req client file but organize methods into clear sections:

- project methods
- member methods
- iteration methods
- work-item methods
- work-item collaboration methods

If the file becomes too large after Phase 1, then split it into sub-clients in Phase 2. Do not pay that refactor cost before the first expansion lands.

### 7.4 Tool file convention

Each MCP tool should keep the current one-file-per-tool convention in:

- `src/products/req/tools/`

This keeps output mapping, previews, and tool-specific behavior easy to test.

## 8. Testing Strategy

### 8.1 Unit tests

Every new tool must include unit coverage for:

- input parsing behavior
- output mapping behavior
- dry-run vs executed behavior when applicable

### 8.2 Resource-domain integration tests

Instead of deep integration coverage for every single tool, add one representative lifecycle flow per resource domain:

- project: create -> get -> update -> delete
- member: add -> list -> update-role -> remove
- iteration: create -> get/list -> update -> delete
- comment: add -> list -> update

This keeps test cost reasonable while still validating handler wiring and client integration.

### 8.3 Live validation priorities

Phase 1 live coverage should prioritize the most useful and realistic write paths:

- project create/update
- iteration create/update
- work-item comment add
- work-item delete or flow transition
- existing work-item create/get/update/list loop remains green

Some member-management and batch operations may remain unit/integration-only until stable live samples and permissions are available.

## 9. Documentation Updates

Phase 1 must update:

- `docs/wiki/Module-Functions-Overview.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Official-API-Alignment.md`

Also add a real Req-specific status page so the README no longer points to a missing Req validation page.

Recommended new page:

- `docs/wiki/Req-Live-Validated.md`

## 10. Delivery Plan

Phase 1 should be delivered in two waves.

### Wave 1: Resource core

- Project management
- Member management
- Iteration management
- Work-item delete, batch update, records

### Wave 2: Work-item collaboration

- Comments
- Associations
- Related users
- Flow transitions

This split creates a clear milestone after the core resource model is complete, before collaboration helpers are layered on.

## 11. Definition of Done

Phase 1 is complete when:

1. All planned tools are registered and discoverable through MCP
2. Each new tool has unit coverage
3. Each resource domain has at least one representative integration flow
4. Priority write paths have either controlled live coverage or clearly documented dry-run-first behavior
5. Documentation and generated stats are updated to match the new surface

## 12. Risks and Non-Goals

Main risks:

- Req APIs have broad surface area and inconsistent payload shapes
- Member and batch APIs may depend on tenant permissions and live samples
- Large numbers of new tools can bloat `schemas.ts`, `client.ts`, and registry code if not staged carefully

Non-goals for this phase:

- Full Req PDF parity
- IPD parity
- Requirement pool parity
- Attachment/file transport parity
- Kanban/project-space parity

## 13. Summary

This phase intentionally expands `Req` from a proven 8-tool core into a Scrum-focused operational surface rather than attempting full Req API parity. The emphasis is on usable workflows, safe write behavior, clear boundaries, and testable incremental delivery.
