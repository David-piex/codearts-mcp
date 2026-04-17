# CodeArts Repo + Pipeline Release Collaboration Pack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six Repo/Pipeline tools that support release comparison, run diagnosis, and manual review coordination in the existing CodeArts MCP server.

**Architecture:** Reuse the existing product-local module pattern. Add validated schemas and client methods first, then implement one focused tool file per capability, wire them into server registration, and finish with unit tests, registration assertions, contract count updates, and docs.

**Tech Stack:** TypeScript, Zod, Vitest, MCP server registration, Huawei Cloud CodeArts HTTP APIs, Markdown docs

---

## File Structure

- Create: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-16-codearts-repo-pipeline-release-collab-pack-design.md`
  Release collaboration pack design spec.
- Create: `D:\Code\codearts-mcp\docs\superpowers\plans\2026-04-16-codearts-repo-pipeline-release-collab-pack.md`
  This implementation plan.
- Modify: `D:\Code\codearts-mcp\src\products\repo\schemas.ts`
  Add input schemas for branch detail, ref compare, and tag detail.
- Modify: `D:\Code\codearts-mcp\src\products\repo\client.ts`
  Add official HTTP client methods for branch detail, ref compare, and tag detail.
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\get-branch.ts`
  Repo branch detail mapping and handler.
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\compare-refs.ts`
  Repo ref comparison mapping and handler.
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\get-tag.ts`
  Repo tag detail mapping and handler.
- Modify: `D:\Code\codearts-mcp\src\products\repo\tools\index.ts`
  Export three new Repo tool names.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
  Add input schemas for run parameters, run log, and manual review context.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
  Add official HTTP client methods for runtime vars and logs, and expand run-detail typing needed for manual-review derivation.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-run-parameters.ts`
  Pipeline runtime variable mapping and handler.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-run-log.ts`
  Pipeline log mapping and handler.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-manual-review-context.ts`
  Derived manual review context mapping and handler.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`
  Export three new Pipeline tool names.
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`
  Register the six new tools in stdio and session-aware modes.
- Modify: `D:\Code\codearts-mcp\src\server\register-tools.ts`
  Tool collection updates automatically via product indexes, but this file is still part of verification scope.
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\get-branch.test.ts`
  Unit coverage for normalized Repo branch mapping.
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\compare-refs.test.ts`
  Unit coverage for normalized Repo compare mapping.
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\get-tag.test.ts`
  Unit coverage for normalized Repo tag mapping.
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-run-parameters.test.ts`
  Unit coverage for normalized runtime variable mapping.
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-run-log.test.ts`
  Unit coverage for normalized log mapping.
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-manual-review-context.test.ts`
  Unit coverage for derived manual review extraction.
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
  Assert the new tool names are present.
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`
  Update the total tool count.
- Modify: `D:\Code\codearts-mcp\README.md`
  Update Repo/Pipeline capability summary if needed.
- Modify: `D:\Code\codearts-mcp\docs\product-overview.md`
  Update Repo/Pipeline capability bullets if needed.
- Modify: `D:\Code\codearts-mcp\docs\tool-examples.md`
  Add usage examples for the six new tools.

### Task 1: Lock API Shapes And Write The First Failing Repo Tests

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\repo\schemas.ts`
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\get-branch.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\compare-refs.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\get-tag.test.ts`

- [ ] **Step 1: Add Repo input schemas before implementation**

Use these definitions:

```ts
export const repoGetBranchInput = z.object({
  repository_id: idSchema,
  branch_name: z.string().min(1)
});

export const repoCompareRefsInput = z.object({
  repository_id: idSchema,
  from: z.string().min(1),
  to: z.string().min(1),
  straight: z.boolean().optional(),
  ignore_whitespace_change: z.boolean().optional(),
  view: z.string().min(1).optional()
});

export const repoGetTagInput = z.object({
  repository_id: idSchema,
  tag_name: z.string().min(1)
});
```

- [ ] **Step 2: Write the failing branch mapping test**

Create `tests/products/repo/tools/get-branch.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapRepoBranch } from "../../../../src/products/repo/tools/get-branch.js";

describe("mapRepoBranch", () => {
  it("returns normalized branch detail metadata", () => {
    const result = mapRepoBranch({
      name: "release/1.2.0",
      protected: true,
      default: false,
      can_push: false,
      web_url: "https://example.com/release/1.2.0",
      commit: {
        id: "abc123",
        short_id: "abc123",
        title: "release commit",
        author_name: "Alice",
        created_at: "2026-04-16T10:00:00Z"
      }
    });

    expect(result.item?.id).toBe("release/1.2.0");
    expect(result.item?.protected).toBe(true);
    expect(result.item?.commit?.id).toBe("abc123");
  });
});
```

- [ ] **Step 3: Run the branch test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools/get-branch.test.ts
```

Expected: FAIL because `get-branch.ts` and `mapRepoBranch` do not exist yet.

- [ ] **Step 4: Write the failing compare mapping test**

Create `tests/products/repo/tools/compare-refs.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapRepoRefComparison } from "../../../../src/products/repo/tools/compare-refs.js";

describe("mapRepoRefComparison", () => {
  it("returns normalized ref comparison data", () => {
    const result = mapRepoRefComparison({
      from: "main",
      to: "release/1.2.0",
      commits: [{ id: "c1", short_id: "c1", title: "fix bug" }],
      diffs: [{ old_path: "a.ts", new_path: "a.ts", diff: "@@ -1 +1 @@" }],
      compare_timeout: false,
      compare_same_ref: false
    });

    expect(result.item?.from).toBe("main");
    expect(result.item?.to).toBe("release/1.2.0");
    expect(result.item?.commitCount).toBe(1);
    expect(result.item?.fileCount).toBe(1);
  });
});
```

- [ ] **Step 5: Run the compare test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools/compare-refs.test.ts
```

Expected: FAIL because `compare-refs.ts` and `mapRepoRefComparison` do not exist yet.

- [ ] **Step 6: Write the failing tag mapping test**

Create `tests/products/repo/tools/get-tag.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapRepoTag } from "../../../../src/products/repo/tools/get-tag.js";

describe("mapRepoTag", () => {
  it("returns normalized tag detail metadata", () => {
    const result = mapRepoTag({
      name: "v1.2.0",
      message: "release",
      target: "abc123",
      commit: {
        id: "abc123",
        short_id: "abc123",
        title: "release commit"
      }
    });

    expect(result.item?.id).toBe("v1.2.0");
    expect(result.item?.target).toBe("abc123");
    expect(result.item?.commit?.title).toBe("release commit");
  });
});
```

- [ ] **Step 7: Run the tag test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools/get-tag.test.ts
```

Expected: FAIL because `get-tag.ts` and `mapRepoTag` do not exist yet.

### Task 2: Implement Repo Client Methods And Repo Tool Handlers

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\repo\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\get-branch.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\compare-refs.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\get-tag.ts`
- Modify: `D:\Code\codearts-mcp\src\products\repo\tools\index.ts`

- [ ] **Step 1: Add Repo client methods with official paths**

Add method signatures to `RepoClient` and implement them in `createRepoClient(...)`:

```ts
getBranch: (input: { repository_id: string; branch_name: string }) => Promise<...>;
compareRefs: (input: {
  repository_id: string;
  from: string;
  to: string;
  straight?: boolean;
  ignore_whitespace_change?: boolean;
  view?: string;
}) => Promise<...>;
getTag: (input: { repository_id: string; tag_name: string }) => Promise<...>;
```

Use the validated official endpoints from the spec-review step and normalize undefined values the same way the existing client does.

- [ ] **Step 2: Implement `get-branch.ts`**

Create a handler that follows the existing item-result pattern:

```ts
const parsed = repoGetBranchInput.parse(input);
const response = await client.getBranch(parsed);
const result = mapRepoBranch(response);
```

The mapper should set:

```ts
{
  id: input.name,
  name: input.name,
  protected: input.protected,
  default: input.default,
  canPush: input.can_push,
  webUrl: input.web_url,
  commit: {
    id: input.commit?.id,
    shortId: input.commit?.short_id,
    title: input.commit?.title,
    authorName: input.commit?.author_name,
    createdAt: input.commit?.created_at
  }
}
```

- [ ] **Step 3: Implement `compare-refs.ts`**

Create a handler that maps the comparison response to one item result:

```ts
{
  id: `${input.from}...${input.to}`,
  from: input.from,
  to: input.to,
  compareType: input.compare_type,
  commitCount: input.commits?.length ?? 0,
  fileCount: input.diffs?.length ?? 0,
  diffTooLarge: input.compare_timeout,
  sameRef: input.compare_same_ref,
  commits: ...,
  diffs: ...
}
```

- [ ] **Step 4: Implement `get-tag.ts`**

Create a handler that maps tag detail to one item result:

```ts
{
  id: input.name,
  name: input.name,
  message: input.message,
  target: input.target,
  commit: {
    id: input.commit?.id,
    shortId: input.commit?.short_id,
    title: input.commit?.title,
    authorName: input.commit?.author_name,
    createdAt: input.commit?.created_at
  }
}
```

- [ ] **Step 5: Export the new Repo tool names**

Append to `src/products/repo/tools/index.ts`:

```ts
"repo_compare_refs",
"repo_get_branch",
"repo_get_tag"
```

- [ ] **Step 6: Run the Repo unit tests and verify GREEN**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools/get-branch.test.ts tests/products/repo/tools/compare-refs.test.ts tests/products/repo/tools/get-tag.test.ts
```

Expected: PASS.

### Task 3: Lock Pipeline Shapes And Write The First Failing Pipeline Tests

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-run-parameters.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-run-log.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\get-manual-review-context.test.ts`

- [ ] **Step 1: Add Pipeline input schemas before implementation**

Use these definitions:

```ts
export const pipelineGetRunParametersInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});

export const pipelineGetRunLogInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema,
  job_id: idSchema,
  step_id: idSchema
});

export const pipelineGetManualReviewContextInput = z.object({
  project_id: idSchema,
  pipeline_id: idSchema,
  run_id: idSchema
});
```

- [ ] **Step 2: Write the failing runtime parameter test**

Create `tests/products/pipeline/tools/get-run-parameters.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapPipelineRunParameters } from "../../../../src/products/pipeline/tools/get-run-parameters.js";

describe("mapPipelineRunParameters", () => {
  it("returns normalized runtime variables", () => {
    const result = mapPipelineRunParameters("run-1", [
      { name: "branch", value: "main", value_type: "string", is_runtime: true }
    ]);

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.name).toBe("branch");
    expect(result.items[0]?.runtime).toBe(true);
  });
});
```

- [ ] **Step 3: Run the runtime parameter test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/pipeline/tools/get-run-parameters.test.ts
```

Expected: FAIL because `get-run-parameters.ts` does not exist yet.

- [ ] **Step 4: Write the failing run log test**

Create `tests/products/pipeline/tools/get-run-log.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapPipelineRunLog } from "../../../../src/products/pipeline/tools/get-run-log.js";

describe("mapPipelineRunLog", () => {
  it("returns normalized log payload metadata", () => {
    const result = mapPipelineRunLog("run-1", "line1\nline2");

    expect(result.item?.pipelineRunId).toBe("run-1");
    expect(result.item?.size).toBe(11);
    expect(result.item?.truncated).toBe(false);
  });
});
```

- [ ] **Step 5: Run the run log test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/pipeline/tools/get-run-log.test.ts
```

Expected: FAIL because `get-run-log.ts` does not exist yet.

- [ ] **Step 6: Write the failing manual review context test**

Create `tests/products/pipeline/tools/get-manual-review-context.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { mapPipelineManualReviewContext } from "../../../../src/products/pipeline/tools/get-manual-review-context.js";

describe("mapPipelineManualReviewContext", () => {
  it("extracts actionable manual review nodes from run detail", () => {
    const result = mapPipelineManualReviewContext("run-1", {
      stages: [
        {
          id: "stage-1",
          name: "gate",
          jobs: [
            {
              id: "job-1",
              name: "manual approval",
              steps: [
                {
                  id: "step-1",
                  name: "approve release",
                  task_type: "manual_review",
                  status: "PENDING"
                }
              ]
            }
          ]
        }
      ]
    });

    expect(result.item?.pendingReviewCount).toBe(1);
    expect(result.item?.reviews?.[0]?.jobId).toBe("job-1");
    expect(result.item?.reviews?.[0]?.stepId).toBe("step-1");
  });
});
```

- [ ] **Step 7: Run the manual review context test and verify RED**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/pipeline/tools/get-manual-review-context.test.ts
```

Expected: FAIL because `get-manual-review-context.ts` does not exist yet.

### Task 4: Implement Pipeline Client Methods And Pipeline Tool Handlers

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-run-parameters.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-run-log.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-manual-review-context.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`

- [ ] **Step 1: Add Pipeline client methods with official paths**

Add method signatures:

```ts
getRunParameters: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<...>;
getRunLog: (input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
}) => Promise<...>;
```

Also expand `getRunDetail(...)` typing so the returned value can carry nested `stages -> jobs -> steps` fields used by the manual review mapper.

- [ ] **Step 2: Implement `get-run-parameters.ts`**

Map runtime vars to a list result:

```ts
{
  id: item.name ?? "",
  name: item.name,
  value: item.value,
  type: item.value_type,
  runtime: item.is_runtime
}
```

Summary should mention the run id and the number of parameters returned.

- [ ] **Step 3: Implement `get-run-log.ts`**

Map the log payload to an item result:

```ts
{
  pipelineRunId: runId,
  log,
  size: log.length,
  truncated
}
```

If the official response structure is nested, normalize it here instead of leaking upstream shape into the rest of the codebase.

- [ ] **Step 4: Implement `get-manual-review-context.ts`**

Use `client.getRunDetail(...)` as the data source and extract only reviewable steps:

```ts
const reviews = (detail.stages ?? []).flatMap((stage) =>
  (stage.jobs ?? []).flatMap((job) =>
    (job.steps ?? [])
      .filter((step) => step.task_type === "manual_review" || step.type === "manual_review")
      .map((step) => ({
        jobId: job.id,
        jobName: job.name,
        stepId: step.id,
        stepName: step.name,
        stageId: stage.id,
        stageName: stage.name,
        status: step.status,
        type: step.task_type ?? step.type
      }))
  )
);
```

- [ ] **Step 5: Export the new Pipeline tool names**

Append to `src/products/pipeline/tools/index.ts`:

```ts
"pipeline_get_manual_review_context",
"pipeline_get_run_log",
"pipeline_get_run_parameters"
```

- [ ] **Step 6: Run the Pipeline unit tests and verify GREEN**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/pipeline/tools/get-run-parameters.test.ts tests/products/pipeline/tools/get-run-log.test.ts tests/products/pipeline/tools/get-manual-review-context.test.ts
```

Expected: PASS.

### Task 5: Register The Six New Tools And Verify Server Contracts

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`

- [ ] **Step 1: Add imports and session-aware handlers in `create-server.ts`**

Follow the same pattern already used by existing Repo and Pipeline tools:

```ts
options.mode === "http"
  ? createSessionAwareXHandler(options.sessionStore)
  : createXHandler(stdioClients!.repoClient)
```

and

```ts
options.mode === "http"
  ? createSessionAwareYHandler(options.sessionStore)
  : createYHandler(stdioClients!.pipelineClient)
```

- [ ] **Step 2: Add the six tool names to the registration snapshot test**

Update `tests/server/register-tools.test.ts` so it expects:

```ts
"pipeline_get_manual_review_context",
"pipeline_get_run_log",
"pipeline_get_run_parameters",
"repo_compare_refs",
"repo_get_branch",
"repo_get_tag",
```

- [ ] **Step 3: Update the contract count**

Change `tests/e2e/tool-contracts.test.ts`:

```ts
expect(collectToolNames()).toHaveLength(118);
```

- [ ] **Step 4: Run the registration and contract tests**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/server/register-tools.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: PASS.

### Task 6: Update Docs And Run Full Verification

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`
- Modify: `D:\Code\codearts-mcp\docs\product-overview.md`
- Modify: `D:\Code\codearts-mcp\docs\tool-examples.md`

- [ ] **Step 1: Add the six new tool examples**

Add one practical example block for each of:

```text
repo_get_branch
repo_compare_refs
repo_get_tag
pipeline_get_run_parameters
pipeline_get_run_log
pipeline_get_manual_review_context
```

Use the existing example style in `docs/tool-examples.md`.

- [ ] **Step 2: Update Repo/Pipeline capability summaries if they are now stale**

Adjust `README.md` and `docs/product-overview.md` only where the exposed tool surface is summarized.

- [ ] **Step 3: Run the targeted tests for new units plus server coverage**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools/get-branch.test.ts tests/products/repo/tools/compare-refs.test.ts tests/products/repo/tools/get-tag.test.ts tests/products/pipeline/tools/get-run-parameters.test.ts tests/products/pipeline/tools/get-run-log.test.ts tests/products/pipeline/tools/get-manual-review-context.test.ts tests/server/register-tools.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: PASS.

- [ ] **Step 4: Run the full test suite**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test
```

Expected: PASS.

- [ ] **Step 5: Run the full build**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' run build
```

Expected: PASS.

## Self-Review

### Spec coverage

- Repo branch, compare, and tag support are covered by Tasks 1-2.
- Pipeline parameters, logs, and manual review context are covered by Tasks 3-4.
- Registration and tool-surface changes are covered by Task 5.
- Docs and repository verification are covered by Task 6.

No spec requirement is left without a task.

### Placeholder scan

- Removed `TODO`, `TBD`, and vague implementation phrasing.
- Each task lists concrete files, code shapes, commands, and expected outcomes.
- The only variable left for implementation is the exact official endpoint string, which must be copied from verified documentation before coding.

### Type consistency

- Tool names are consistent between the spec and the plan.
- Repo schemas and handler names align with the intended file names.
- Pipeline manual review context is consistently treated as a derived tool over official run-detail data.
