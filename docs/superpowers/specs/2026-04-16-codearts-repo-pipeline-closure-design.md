# CodeArts Repo + Pipeline Closure Design

## Goal

Extend the existing CodeArts MCP server in two parallel directions:

1. deepen the existing `Repo` and `Pipeline` modules with a focused high-frequency closure package;
2. produce a completion assessment for the 11 current technical modules so the team can distinguish "implemented", "usable but incomplete", and "needs strengthening".

This work explicitly stays inside existing product boundaries. It does not add any new CodeArts product module, does not add a synthetic aggregate `CodeArts` module, and does not modify transport or authentication architecture.

## In Scope

### Repo closure package

The Repo enhancement scope is limited to the following tool capabilities that already belong to the current product direction and support a realistic merge-request workflow:

- `repo_list_merge_request_changes`
- `repo_list_merge_request_discussions`
- `repo_create_merge_request_discussion`
- `repo_review_merge_request`
- `repo_merge_merge_request`
- `repo_list_protected_branches`
- `repo_list_repository_labels`
- `repo_create_tag`
- `repo_delete_tag`

### Pipeline closure package

The Pipeline enhancement scope is limited to the following tool capabilities that complete the common execution and approval workflow:

- `pipeline_get_run_detail`
- `pipeline_get_step_outputs`
- `pipeline_list_artifacts`
- `pipeline_approve_run`
- `pipeline_reject_run`
- `pipeline_retry_run`
- `pipeline_stop_run`

### Completion assessment scope

Assess the current 11 technical modules:

- `req`
- `repo`
- `pipeline`
- `check`
- `testplan`
- `deploy`
- `build`
- `artifact`
- `govern`
- `inspector`
- `perftest`

The assessment is not just a module existence check. It must evaluate each module against the same completion rubric and produce actionable gaps.

## Out of Scope

- `CAE`
- any non-CodeArts product not already in the repository
- a synthetic top-level `CodeArts` aggregate product module
- transport changes for `stdio` or `http`
- authentication model changes, including session model redesign
- orchestration tools that combine multiple products into one MCP tool
- expansion into unrelated products while implementing this package

## User-Facing Outcome

After this work:

- the existing CodeArts MCP server exposes a more complete `Repo + Pipeline` workflow for day-to-day engineering usage;
- the team has a written, evidence-based matrix of the 11 technical modules with completion grades and identified gaps;
- future development priorities can be chosen from explicit module gaps rather than from ad hoc impressions.

## Functional Design

### Repo behavior

The Repo module should support a complete MR-centered collaboration loop:

- inspect MR changes;
- inspect MR discussions;
- create new discussion comments;
- review an MR through the supported review action;
- merge an MR through the supported merge action;
- inspect protected branch rules;
- inspect repository labels;
- create and delete tags with write-safety semantics consistent with the current tool family.

Write operations must continue to align with the existing repository conventions, especially `dry_run` behavior where already established by the product.

### Pipeline behavior

The Pipeline module should support a complete run-observation and manual-gate loop:

- inspect detailed run information;
- inspect step outputs;
- inspect produced artifacts;
- approve a manual review node;
- reject a manual review node;
- retry a run;
- stop an in-flight run.

The resulting tool outputs should remain normalized for LLM usage and should match current repository conventions for summaries, structured content, and safe write semantics.

### Module completion assessment behavior

Each of the 11 modules is assessed across six dimensions:

1. module skeleton
2. tool registration
3. read/write capability depth
4. test coverage
5. shared-session support
6. documentation closure

Each module receives one grade:

- `A`: essentially complete across the six dimensions
- `B`: usable, but with clear feature or validation gaps
- `C`: connected and partially functional, but still requiring visible strengthening

The assessment must identify both strengths and concrete missing areas. It should not use vague labels without evidence.

## Architecture and Code Boundaries

### Existing patterns to preserve

All implementation should follow the current repository structure:

- product-local `client.ts`
- product-local `schemas.ts`
- product-local `tools/*.ts`
- product-local `tools/index.ts`
- central registration through `src/server/register-tools.ts`
- server wiring through `src/server/create-server.ts`
- coverage through product tests, server tests, and contract tests where relevant

### No architectural drift

This package is intentionally incremental. It should reuse the same product-module pattern already used in the repository instead of introducing:

- a new abstraction layer just for this package;
- a generic meta-tool framework;
- cross-product orchestration handlers;
- special-case transport behavior.

## Execution Plan Shape

Implementation should run in parallel across three threads of work:

1. Repo enhancement track
2. Pipeline enhancement track
3. 11-module completion assessment track

The controller thread is responsible for:

- keeping scope aligned with this spec;
- integrating non-conflicting results;
- resolving any cross-cutting omissions;
- running final verification;
- ensuring code and documentation stay consistent.

## Testing Requirements

The work is not complete without fresh verification evidence.

Expected verification includes:

- product-level tests for newly added or strengthened Repo and Pipeline tools
- server registration coverage for any tool list or registration change
- contract-level coverage where tool counts or exposed names change
- final full test run
- final build run

If live tests already exist for a tool family, new behavior should follow the same live-test pattern where feasible. If a live test is not added, that omission should be explicit rather than accidental.

## Documentation Requirements

Documentation should stay aligned with actual tool coverage.

At minimum, this package must leave behind:

- an updated capability description if exposed tools change materially;
- updated examples for any newly documented high-frequency tools;
- a completion assessment document or section that captures the 11-module matrix and gaps.

Documentation must not claim a module is complete without the rubric-backed assessment.

## Risks and Guardrails

### Main risk

The main delivery risk is mixing together three different goals:

- "module exists"
- "tool exists"
- "workflow is complete"

This spec separates them intentionally so implementation can avoid false completion claims.

### Guardrails

- do not add new products;
- do not expand scope beyond the listed Repo and Pipeline capabilities in this package;
- do not invent an aggregate `CodeArts` module;
- do not weaken current safe-write conventions;
- do not mark any module complete without evidence from the six-dimension rubric.

## Acceptance Criteria

This package is successful when all of the following are true:

- the Repo closure package capabilities listed in this spec are implemented or verified as already complete;
- the Pipeline closure package capabilities listed in this spec are implemented or verified as already complete;
- all 11 technical modules are assessed using the agreed six-dimension rubric;
- the assessment clearly states which modules are `A`, `B`, or `C`, with evidence-backed gaps;
- repository tests pass;
- repository build passes;
- documentation is aligned with the resulting system state.
