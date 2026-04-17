# CodeArts Build + Artifact Traceability Pack Design

## Goal

Extend the existing `Build` and `Artifact` product modules with a focused traceability pack that helps an MCP client answer three release follow-up questions:

1. what project-level build runs happened recently;
2. how one build run is structured and how healthy the project-level build trend is;
3. what artifact versions and repository file layout exist for downstream delivery.

This package stays inside current product boundaries and reuses the existing server, auth, session, and tool registration architecture.

## In Scope

### Build tools

- `build_list_project_records`
- `build_get_project_record_statistics`
- `build_get_record_flow_graph`

### Artifact tools

- `artifact_list_versions`
- `artifact_get_file_tree`
- `artifact_list_latest_version_files`

## Out Of Scope

- `CAE`
- new product modules
- cross-product orchestration tools
- binary download streaming changes in the shared HTTP client
- upload or publish actions
- deploy action expansion in this pack

## User-Facing Outcome

After this package:

- a caller can inspect recent build records at the project level instead of only per job;
- a caller can inspect project-level build statistics for trend and release readiness checks;
- a caller can inspect the DAG or node graph for one build flow record;
- a caller can inspect artifact version history for a project;
- a caller can inspect repository folder structure inside Artifact;
- a caller can inspect the latest file versions in a project repository without manually traversing per-file metadata.

## Functional Design

### Build behavior

#### `build_list_project_records`

Load recent build records by project and return a normalized list result.

Expected caller value:

- inspect recent builds across jobs before release;
- find the latest record ids without already knowing the job id;
- summarize project build activity in one MCP call.

Normalized output should include:

- `id`
- `recordId`
- `jobId`
- `jobName`
- `status`
- `triggerType`
- `branch`
- `commitId`
- `executor`
- `startTime`

#### `build_get_project_record_statistics`

Load project-level build statistics from the build history page API and return a normalized item result.

Expected caller value:

- inspect build totals before release;
- summarize success/failure trend;
- support quick health checks without listing every record.

Normalized output should include:

- `id`
- `projectId`
- `total`
- `success`
- `failed`
- `aborted`
- `running`

If the upstream payload uses different names, normalize them here and keep the MCP result stable.

#### `build_get_record_flow_graph`

Load the build flow graph for one build record and return a normalized item result.

Expected caller value:

- inspect build stage topology;
- identify failed nodes;
- support richer reasoning than the current flattened stages endpoint.

Normalized output should include:

- `id`
- `recordId`
- `nodeCount`
- `edgeCount`
- `nodes`
  - `id`
  - `name`
  - `status`
  - `type`
- `edges`
  - `source`
  - `target`

### Artifact behavior

#### `artifact_list_versions`

Load version history for one project and return a normalized list result.

Expected caller value:

- inspect what package versions already exist before promoting a release;
- verify release version naming;
- support artifact traceability across repositories.

Normalized output should include:

- `id`
- `version`
- `repoName`
- `artifactName`
- `createdAt`
- `updatedAt`
- `downloads`

#### `artifact_get_file_tree`

Load repository folder structure for one Artifact repo and return a normalized item result.

Expected caller value:

- inspect repository layout before querying single files;
- understand whether release assets are organized as expected;
- support agent navigation inside large artifact repositories.

Normalized output should include:

- `id`
- `repoName`
- `rootPath`
- `nodeCount`
- `nodes`
  - `path`
  - `name`
  - `type`

#### `artifact_list_latest_version_files`

Load the latest file versions for a project and return a normalized list result.

Expected caller value:

- inspect newest deliverables at a glance;
- find current downloadable package versions;
- support traceability from build output to artifact repository state.

Normalized output should include:

- `id`
- `path`
- `name`
- `version`
- `repoName`
- `size`
- `modifiedAt`

## Data And API Boundary Decisions

### Official API verification requirement

All six capabilities must be validated against official Huawei Cloud documentation before coding.

Validated source pages for this pack are:

- Build `ListRecords`: `GET /v1/record/{build_project_id}/records`
- Build `ShowJobTotal`: `GET /v1/record/{build_project_id}/statistics`
- Build `ShowBuildRecordFlowGraph`: `GET /v1/record/{build_flow_record_id}/flow-graph`
- Artifact `ShowVersionList`: `GET /v5/{project_id}/versions`
- Artifact `ShowFileTree`: `GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-tree`
- Artifact `ListLatestVersionFiles`: `GET /devreposerver/v5/{project_id}/files/version`

### Keep current architecture

Implementation should continue to use:

- `src/products/<product>/schemas.ts`
- `src/products/<product>/client.ts`
- `src/products/<product>/tools/*.ts`
- `src/products/<product>/tools/index.ts`
- `src/server/create-server.ts`
- `src/server/register-tools.ts`

No new abstraction layer should be introduced.

## Testing Requirements

Required outcomes:

- each new tool has focused unit coverage for normalized mapping or handler output;
- product-level handler tests follow the repository's existing `*-live.test.ts` style where relevant;
- `tests/server/register-tools.test.ts` includes the six new tool names;
- `tests/e2e/tool-contracts.test.ts` reflects the new tool count;
- full test suite passes;
- build passes.

## Documentation Requirements

At minimum:

- update `README.md` if Build/Artifact capability summaries change materially;
- update `docs/product-overview.md` if product counts or summaries change;
- add high-frequency examples for the six new tools in `docs/tool-examples.md`.

## Risks And Guardrails

### Main risk

The main risk is overfitting to unstable upstream response shapes for graph and version APIs.

### Guardrails

- validate official paths before coding;
- keep normalized outputs intentionally small and stable;
- do not add upload or delete semantics in this pack;
- avoid shared HTTP client changes for binary downloads;
- avoid unrelated refactors while touching Build and Artifact modules.

## Acceptance Criteria

This package is successful when all of the following are true:

- the six scoped tools are implemented;
- the six tools are registered in stdio and session-aware HTTP modes;
- focused unit and handler tests exist;
- Build and Artifact docs/examples are updated;
- repository tests pass;
- repository build passes.
