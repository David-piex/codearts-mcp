# CodeArts Repo + Pipeline Release Collaboration Pack Design

## Goal

Extend the existing `Repo` and `Pipeline` product modules with a small, high-signal release collaboration pack that helps an MCP client answer three practical questions during release work:

1. what changed between two refs;
2. what exact branch or tag is being released;
3. what parameters, logs, and manual review context exist for a pipeline run.

This package stays inside the current product boundaries and preserves the existing server, auth, session, and tool registration architecture.

## In Scope

### Repo tools

- `repo_get_branch`
- `repo_compare_refs`
- `repo_get_tag`

### Pipeline tools

- `pipeline_get_run_parameters`
- `pipeline_get_run_log`
- `pipeline_get_manual_review_context`

## Out Of Scope

- `CAE`
- new product modules
- cross-product orchestration tools
- transport changes
- auth or session model redesign
- broad pipeline execution authoring features
- generic log streaming or cursor state

## User-Facing Outcome

After this package:

- a caller can inspect one branch in detail rather than only listing branches;
- a caller can compare two refs and summarize release delta without manually stitching commit lists;
- a caller can inspect one tag in detail rather than only listing tags;
- a caller can inspect the runtime variables used by one pipeline run;
- a caller can fetch one pipeline run log payload for diagnosis;
- a caller can ask for a normalized "manual review context" object that surfaces the actionable review node identifiers required by the existing approve/reject tools.

## Functional Design

### Repo behavior

#### `repo_get_branch`

Load one branch by exact branch name and normalize the response into a single MCP item result.

Expected caller value:

- inspect the target branch of a release or merge;
- confirm head commit;
- inspect protection and default-branch flags if present.

Normalized output should include:

- `id`
- `name`
- `protected`
- `default`
- `canPush`
- `webUrl`
- `commit`
  - `id`
  - `shortId`
  - `title`
  - `authorName`
  - `createdAt`

#### `repo_compare_refs`

Compare two refs inside one repository and return a normalized comparison result suitable for release notes, merge validation, and branch drift checks.

Expected caller value:

- compare `release/x` against `main`;
- compare a tag against a branch;
- inspect whether the compare is empty or ahead/behind.

Normalized output should include:

- `id`
- `from`
- `to`
- `compareType`
- `commitCount`
- `fileCount`
- `diffTooLarge`
- `sameRef`
- `commits`
- `diffs`

We should expose only the query controls that materially improve agent usefulness without turning the tool into a thin API mirror:

- required: `repository_id`, `from`, `to`
- optional: `straight`, `ignore_whitespace_change`, `view`

We should not expose low-signal or hard-to-explain fields unless verification proves they are needed for real scenarios:

- `target_id`
- other compare-mode variants beyond a stable default

#### `repo_get_tag`

Load one tag by exact tag name and normalize tag metadata plus target commit identity.

Expected caller value:

- confirm which commit a release tag points at;
- inspect annotated tag message when present;
- distinguish protected or lightweight metadata where available.

Normalized output should include:

- `id`
- `name`
- `message`
- `target`
- `commit`
  - `id`
  - `shortId`
  - `title`
  - `authorName`
  - `createdAt`

### Pipeline behavior

#### `pipeline_get_run_parameters`

Load runtime variables for one pipeline run and normalize them into a list result.

Expected caller value:

- inspect effective release parameters;
- confirm branch, environment, or version inputs;
- support debugging when a run used unexpected variables.

Normalized output should include:

- `pipelineRunId`
- `parameterCount`
- `parameters`
  - `name`
  - `value`
  - `type`
  - `runtime`

#### `pipeline_get_run_log`

Load the pipeline log payload for one pipeline step inside a run and return a normalized item result optimized for diagnostic retrieval instead of terminal streaming.

Expected caller value:

- inspect the latest available log body for one failed or blocked run;
- summarize run failure cause inside an MCP client;
- pair log content with run detail and artifacts already supported by the module.

Normalized output should include:

- `pipelineRunId`
- `jobId`
- `stepId`
- `log`
- `size`
- `truncated`

If the upstream API already returns partial or truncated content, surface that fact explicitly instead of pretending full coverage.

Because the official log API is scoped to `pipeline_run_id + job_run_id + step_run_id`, this MCP tool should expose `job_id` and `step_id` explicitly instead of inventing a non-existent run-wide aggregate log API.

#### `pipeline_get_manual_review_context`

Return a normalized manual-review context object for one pipeline run.

This is a product capability, not necessarily a one-to-one upstream API. If official verification confirms there is no dedicated manual-review-context endpoint, this tool should derive its result from the official run-detail structure and the documented approve/reject identifiers.

Expected caller value:

- find the actionable `job_id` and `step_id` needed by `pipeline_approve_run`;
- find the same identifiers needed by `pipeline_reject_run`;
- inspect review node labels, status, and stage placement without manually parsing the full run-detail payload.

Normalized output should include:

- `pipelineRunId`
- `pendingReviewCount`
- `reviews`
  - `jobId`
  - `jobName`
  - `stepId`
  - `stepName`
  - `stageId`
  - `stageName`
  - `status`
  - `type`

If no pending or reviewable node exists, the tool should return an empty review list rather than fail.

## Data And API Boundary Decisions

### Official API verification requirement

The HTTP paths and request shapes for all six capabilities must be validated against official Huawei Cloud documentation before coding. Do not infer new endpoints from naming patterns alone.

### Manual review context is allowed to be derived

`pipeline_get_manual_review_context` may be implemented as a normalized derivative tool if:

- the underlying source fields come from official pipeline run detail APIs; and
- the returned `jobId` and `stepId` map directly to the documented manual review approval/rejection APIs.

This is the only intentionally derived tool in scope.

### Keep the current architecture

Implementation should continue to use:

- `src/products/<product>/schemas.ts`
- `src/products/<product>/client.ts`
- `src/products/<product>/tools/*.ts`
- `src/products/<product>/tools/index.ts`
- `src/server/create-server.ts`
- `src/server/register-tools.ts`

No new abstraction layer should be introduced for this pack.

## Testing Requirements

This package is not complete without both focused unit coverage and normal repository verification.

Required test outcomes:

- each new tool has at least one focused unit test covering normalized mapping or dry-run behavior where relevant;
- `tests/server/register-tools.test.ts` includes the six new tool names;
- `tests/e2e/tool-contracts.test.ts` reflects the new tool count;
- full test suite passes;
- build passes.

Live tests are desirable if the repository already follows that pattern for the surrounding tool family, but unit coverage is the minimum requirement for this pack.

## Documentation Requirements

At minimum:

- update `README.md` if Repo/Pipeline capability summaries change materially;
- update `docs/product-overview.md` if product capability bullets lag behind;
- add high-frequency examples for the six new tools in `docs/tool-examples.md`.

## Risks And Guardrails

### Main risk

The main risk is exposing a brittle tool that mirrors undocumented nested pipeline structures too closely.

### Guardrails

- validate all upstream paths against official docs first;
- keep `manual_review_context` intentionally small and stable;
- do not expose every optional compare query field without a clear user value;
- preserve current result-shaping conventions and dry-run semantics;
- avoid unrelated refactors while touching Repo and Pipeline modules.

## Acceptance Criteria

This package is successful when all of the following are true:

- the six scoped tools are implemented;
- `pipeline_get_manual_review_context` clearly documents whether it is direct or derived;
- the six new tools are registered in both stdio and session-aware HTTP modes;
- focused tests exist for the new mappings or behaviors;
- Repo and Pipeline docs/examples are updated;
- repository tests pass;
- repository build passes.
