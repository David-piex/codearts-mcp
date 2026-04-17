# CodeArts Build + Artifact Traceability Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six Build and Artifact tools that improve release traceability in the existing CodeArts MCP server.

**Architecture:** Reuse the existing product-local module pattern. Add validated schemas and client methods first, then implement one focused tool file per capability, wire them into server registration, and finish with unit tests, handler tests, registration assertions, contract count updates, and docs.

**Tech Stack:** TypeScript, Zod, Vitest, MCP server registration, Huawei Cloud CodeArts HTTP APIs, Markdown docs

---

## File Structure

- Create: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-16-codearts-build-artifact-traceability-pack-design.md`
- Create: `D:\Code\codearts-mcp\docs\superpowers\plans\2026-04-16-codearts-build-artifact-traceability-pack.md`
- Modify: `D:\Code\codearts-mcp\src\products\build\schemas.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\list-project-records.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\get-project-record-statistics.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\get-record-flow-graph.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\tools\index.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\schemas.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\list-versions.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\get-file-tree.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\list-latest-version-files.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\index.ts`
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\list-project-records.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-project-record-statistics.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-record-flow-graph.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\list-project-records-live.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-project-record-statistics-live.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-record-flow-graph-live.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-versions.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\get-file-tree.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-latest-version-files.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-versions-live.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\get-file-tree-live.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-latest-version-files-live.test.ts`
- Modify: `D:\Code\codearts-mcp\README.md`
- Modify: `D:\Code\codearts-mcp\docs\product-overview.md`
- Modify: `D:\Code\codearts-mcp\docs\tool-examples.md`

### Task 1: Add Build Schemas And First Failing Tests

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\build\schemas.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\list-project-records.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-project-record-statistics.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\build\tools\get-record-flow-graph.test.ts`

- [ ] **Step 1: Add Build input schemas**

```ts
export const buildListProjectRecordsInput = pagingSchema.extend({
  project_id: idSchema
});

export const buildGetProjectRecordStatisticsInput = z.object({
  project_id: idSchema
});

export const buildGetRecordFlowGraphInput = z.object({
  record_id: idSchema
});
```

- [ ] **Step 2: Write the failing project-record list mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapBuildProjectRecords } from "../../../../src/products/build/tools/list-project-records.js";

describe("mapBuildProjectRecords", () => {
  it("returns normalized project build records", () => {
    const result = mapBuildProjectRecords([
      {
        record_id: "record-1",
        job_id: "job-1",
        job_name: "release-build",
        status: "SUCCESS",
        trigger_type: "Manual",
        branch: "main",
        commit_id: "abc123",
        executor: "yao",
        start_time: 1710000000000
      }
    ]);

    expect(result.items?.[0]?.recordId).toBe("record-1");
    expect(result.items?.[0]?.jobName).toBe("release-build");
  });
});
```

- [ ] **Step 3: Run the project-record list test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/build/tools/list-project-records.test.ts
```

Expected: FAIL because `list-project-records.ts` does not exist yet.

- [ ] **Step 4: Write the failing project statistics mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapBuildProjectRecordStatistics } from "../../../../src/products/build/tools/get-project-record-statistics.js";

describe("mapBuildProjectRecordStatistics", () => {
  it("returns normalized build statistics", () => {
    const result = mapBuildProjectRecordStatistics("project-1", {
      total: 12,
      success: 8,
      failed: 2,
      aborted: 1,
      running: 1
    });

    expect(result.item?.projectId).toBe("project-1");
    expect(result.item?.success).toBe(8);
  });
});
```

- [ ] **Step 5: Run the project statistics test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/build/tools/get-project-record-statistics.test.ts
```

Expected: FAIL because `get-project-record-statistics.ts` does not exist yet.

- [ ] **Step 6: Write the failing flow graph mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapBuildRecordFlowGraph } from "../../../../src/products/build/tools/get-record-flow-graph.js";

describe("mapBuildRecordFlowGraph", () => {
  it("returns normalized build flow graph data", () => {
    const result = mapBuildRecordFlowGraph("record-1", {
      nodes: [{ id: "n1", name: "compile", status: "SUCCESS", type: "task" }],
      edges: [{ source: "n1", target: "n2" }]
    });

    expect(result.item?.recordId).toBe("record-1");
    expect(result.item?.nodeCount).toBe(1);
    expect(result.item?.edgeCount).toBe(1);
  });
});
```

- [ ] **Step 7: Run the flow graph test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/build/tools/get-record-flow-graph.test.ts
```

Expected: FAIL because `get-record-flow-graph.ts` does not exist yet.

### Task 2: Implement Build Client Methods And Tool Handlers

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\build\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\list-project-records.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\get-project-record-statistics.ts`
- Create: `D:\Code\codearts-mcp\src\products\build\tools\get-record-flow-graph.ts`
- Modify: `D:\Code\codearts-mcp\src\products\build\tools\index.ts`

- [ ] **Step 1: Add Build client methods with validated official paths**

Add methods for:

```ts
listProjectRecords
getProjectRecordStatistics
getRecordFlowGraph
```

Use:

- `GET /v1/record/{build_project_id}/records`
- `GET /v1/record/{build_project_id}/statistics`
- `GET /v1/record/{build_flow_record_id}/flow-graph`

- [ ] **Step 2: Implement `list-project-records.ts`**

Normalize:

```ts
{
  id: item.record_id ?? "",
  recordId: item.record_id,
  jobId: item.job_id,
  jobName: item.job_name,
  status: item.status,
  triggerType: item.trigger_type,
  branch: item.branch,
  commitId: item.commit_id,
  executor: item.executor,
  startTime: item.start_time
}
```

- [ ] **Step 3: Implement `get-project-record-statistics.ts`**

Normalize:

```ts
{
  id: projectId,
  projectId,
  total: input.total,
  success: input.success,
  failed: input.failed,
  aborted: input.aborted,
  running: input.running
}
```

- [ ] **Step 4: Implement `get-record-flow-graph.ts`**

Normalize:

```ts
{
  id: recordId,
  recordId,
  nodeCount: nodes.length,
  edgeCount: edges.length,
  nodes: ...,
  edges: ...
}
```

- [ ] **Step 5: Export the three Build tool names**

Add:

```ts
"build_get_project_record_statistics",
"build_get_record_flow_graph",
"build_list_project_records"
```

- [ ] **Step 6: Run the Build unit tests and verify GREEN**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/build/tools/list-project-records.test.ts tests/products/build/tools/get-project-record-statistics.test.ts tests/products/build/tools/get-record-flow-graph.test.ts
```

Expected: PASS.

### Task 3: Add Artifact Schemas And First Failing Tests

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\artifact\schemas.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-versions.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\get-file-tree.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\artifact\tools\list-latest-version-files.test.ts`

- [ ] **Step 1: Add Artifact input schemas**

```ts
export const artifactListVersionsInput = pagingSchema.extend({
  project_id: idSchema
});

export const artifactGetFileTreeInput = z.object({
  tenant_id: idSchema,
  project_id: idSchema,
  repo_name: z.string().min(1)
});

export const artifactListLatestVersionFilesInput = pagingSchema.extend({
  project_id: idSchema
});
```

- [ ] **Step 2: Write the failing version-list mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapArtifactVersions } from "../../../../src/products/artifact/tools/list-versions.js";

describe("mapArtifactVersions", () => {
  it("returns normalized artifact versions", () => {
    const result = mapArtifactVersions([
      {
        version: "1.2.0",
        repo_name: "release",
        artifact_name: "service-a",
        created_at: "2026-04-16T10:00:00Z"
      }
    ]);

    expect(result.items?.[0]?.version).toBe("1.2.0");
    expect(result.items?.[0]?.repoName).toBe("release");
  });
});
```

- [ ] **Step 3: Run the version-list test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/artifact/tools/list-versions.test.ts
```

Expected: FAIL because `list-versions.ts` does not exist yet.

- [ ] **Step 4: Write the failing file-tree mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapArtifactFileTree } from "../../../../src/products/artifact/tools/get-file-tree.js";

describe("mapArtifactFileTree", () => {
  it("returns normalized repository tree nodes", () => {
    const result = mapArtifactFileTree("release", "/",
      [{ path: "/releases", name: "releases", type: "folder" }]
    );

    expect(result.item?.repoName).toBe("release");
    expect(result.item?.nodeCount).toBe(1);
  });
});
```

- [ ] **Step 5: Run the file-tree test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/artifact/tools/get-file-tree.test.ts
```

Expected: FAIL because `get-file-tree.ts` does not exist yet.

- [ ] **Step 6: Write the failing latest-version-files mapping test**

```ts
import { describe, expect, it } from "vitest";
import { mapArtifactLatestVersionFiles } from "../../../../src/products/artifact/tools/list-latest-version-files.js";

describe("mapArtifactLatestVersionFiles", () => {
  it("returns normalized latest version file data", () => {
    const result = mapArtifactLatestVersionFiles([
      {
        path: "/releases/a.jar",
        name: "a.jar",
        version: "1.2.0",
        repo_name: "release",
        size: "1024"
      }
    ]);

    expect(result.items?.[0]?.path).toBe("/releases/a.jar");
    expect(result.items?.[0]?.version).toBe("1.2.0");
  });
});
```

- [ ] **Step 7: Run the latest-version-files test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/artifact/tools/list-latest-version-files.test.ts
```

Expected: FAIL because `list-latest-version-files.ts` does not exist yet.

### Task 4: Implement Artifact Client Methods And Tool Handlers

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\artifact\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\list-versions.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\get-file-tree.ts`
- Create: `D:\Code\codearts-mcp\src\products\artifact\tools\list-latest-version-files.ts`
- Modify: `D:\Code\codearts-mcp\src\products\artifact\tools\index.ts`

- [ ] **Step 1: Add Artifact client methods with validated official paths**

Add:

```ts
listVersions
getFileTree
listLatestVersionFiles
```

Use:

- `GET /v5/{project_id}/versions`
- `GET /cloudartifact/v5/{tenant_id}/{project_id}/{repo_name}/file-tree`
- `GET /devreposerver/v5/{project_id}/files/version`

- [ ] **Step 2: Implement `list-versions.ts`**

Normalize:

```ts
{
  id: item.version ?? "",
  version: item.version,
  repoName: item.repo_name,
  artifactName: item.artifact_name,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
  downloads: item.downloads
}
```

- [ ] **Step 3: Implement `get-file-tree.ts`**

Normalize:

```ts
{
  id: repoName,
  repoName,
  rootPath,
  nodeCount: nodes.length,
  nodes: ...
}
```

- [ ] **Step 4: Implement `list-latest-version-files.ts`**

Normalize:

```ts
{
  id: item.path ?? item.name ?? "",
  path: item.path,
  name: item.name,
  version: item.version,
  repoName: item.repo_name,
  size: item.size,
  modifiedAt: item.modified_at
}
```

- [ ] **Step 5: Export the three Artifact tool names**

Add:

```ts
"artifact_get_file_tree",
"artifact_list_latest_version_files",
"artifact_list_versions"
```

- [ ] **Step 6: Run the Artifact unit tests and verify GREEN**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/artifact/tools/list-versions.test.ts tests/products/artifact/tools/get-file-tree.test.ts tests/products/artifact/tools/list-latest-version-files.test.ts
```

Expected: PASS.

### Task 5: Add Handler Tests, Registration, Contracts, And Docs

**Files:**
- Create: Build and Artifact `*-live.test.ts` files listed above
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`
- Modify: `D:\Code\codearts-mcp\README.md`
- Modify: `D:\Code\codearts-mcp\docs\product-overview.md`
- Modify: `D:\Code\codearts-mcp\docs\tool-examples.md`

- [ ] **Step 1: Add handler-style tests for the six new tools**

Follow the repository's current handler test style so each new tool verifies MCP output wrapping.

- [ ] **Step 2: Register the six new tools in stdio and session-aware modes**

Update imports, session-aware wrappers, and per-tool registration branches in `create-server.ts`.

- [ ] **Step 3: Update tool registration assertions**

Add the six new tool names to `tests/server/register-tools.test.ts` and update `tests/e2e/tool-contracts.test.ts` count from `118` to `124`.

- [ ] **Step 4: Update docs**

Add six new examples to `docs/tool-examples.md` and update Build/Artifact counts or capability summaries in `README.md` and `docs/product-overview.md`.

- [ ] **Step 5: Run targeted verification**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/build/tools tests/products/artifact/tools tests/server/register-tools.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: PASS.

### Task 6: Run Full Verification

- [ ] **Step 1: Run the full test suite**

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test
```

Expected: PASS.

- [ ] **Step 2: Run the full build**

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' run build
```

Expected: PASS.

## Self-Review

### Spec coverage

- Build project records, statistics, and graph support are covered by Tasks 1-2.
- Artifact versions, file tree, and latest-version files are covered by Tasks 3-4.
- Registration, docs, and verification are covered by Tasks 5-6.

### Placeholder scan

- Removed `TODO`, `TBD`, and vague implementation phrasing.
- Each task lists concrete files, code shapes, commands, and expected outcomes.

### Type consistency

- Tool names are consistent between the spec and the plan.
- The package stays inside Build and Artifact without introducing cross-product orchestration.
