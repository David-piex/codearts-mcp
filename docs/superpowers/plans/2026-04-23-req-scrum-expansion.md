# Req Scrum Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Req MCP module from the current 8-tool core into a Scrum-focused requirement-management surface covering project, member, iteration, and work-item collaboration flows.

**Architecture:** Keep the existing Req module shape (`client.ts`, `tools/*`, `register-req-tools.ts`) and extend it by resource domain. Split schema definitions by domain, add one tool file per endpoint, keep normalized MCP outputs stable, and preserve dry-run-first behavior for risky writes.

**Tech Stack:** TypeScript, Zod, Vitest, MCP server tool registry, existing Req HTTP client wrappers

---

## File Map

### Existing files to modify

- `src/products/req/client.ts`
- `src/products/req/schemas.ts`
- `src/products/req/tools/index.ts`
- `src/server/register-req-tools.ts`
- `tests/products/req/client.test.ts`
- `tests/products/req/client-live-smoke.test.ts`
- `tests/server/register-req-tools.test.ts`
- `tests/server/expected-tool-names.ts`
- `docs/wiki/Module-Functions-Overview.md`
- `docs/wiki/Capability-Matrix.md`
- `docs/wiki/Module-Live-Readiness.md`
- `docs/wiki/Official-API-Alignment.md`
- `README.md`

### New schema files

- `src/products/req/schemas/project.ts`
- `src/products/req/schemas/member.ts`
- `src/products/req/schemas/iteration.ts`
- `src/products/req/schemas/work-item.ts`
- `src/products/req/schemas/comment.ts`

### New project tool files

- `src/products/req/tools/create-project.ts`
- `src/products/req/tools/update-project.ts`
- `src/products/req/tools/delete-project.ts`
- `src/products/req/tools/check-project-name.ts`
- `src/products/req/tools/list-not-added-projects.ts`

### New member tool files

- `src/products/req/tools/add-project-member.ts`
- `src/products/req/tools/batch-add-project-members.ts`
- `src/products/req/tools/batch-delete-project-members.ts`
- `src/products/req/tools/update-project-member-role.ts`
- `src/products/req/tools/leave-project.ts`

### New iteration tool files

- `src/products/req/tools/get-iteration.ts`
- `src/products/req/tools/create-iteration.ts`
- `src/products/req/tools/update-iteration.ts`
- `src/products/req/tools/delete-iteration.ts`
- `src/products/req/tools/batch-delete-iterations.ts`
- `src/products/req/tools/update-iteration-state.ts`
- `src/products/req/tools/query-iteration-immovable-issues.ts`

### New work-item collaboration tool files

- `src/products/req/tools/delete-work-item.ts`
- `src/products/req/tools/batch-update-work-items.ts`
- `src/products/req/tools/list-work-item-records.ts`
- `src/products/req/tools/list-work-item-comments.ts`
- `src/products/req/tools/add-work-item-comment.ts`
- `src/products/req/tools/update-work-item-comment.ts`
- `src/products/req/tools/list-associated-issues.ts`
- `src/products/req/tools/list-associated-commits.ts`
- `src/products/req/tools/list-associated-test-cases.ts`
- `src/products/req/tools/list-related-users.ts`
- `src/products/req/tools/update-work-item-flow.ts`

### New unit tests

- `tests/products/req/tools/create-project.test.ts`
- `tests/products/req/tools/update-project.test.ts`
- `tests/products/req/tools/delete-project.test.ts`
- `tests/products/req/tools/check-project-name.test.ts`
- `tests/products/req/tools/list-not-added-projects.test.ts`
- `tests/products/req/tools/add-project-member.test.ts`
- `tests/products/req/tools/batch-add-project-members.test.ts`
- `tests/products/req/tools/batch-delete-project-members.test.ts`
- `tests/products/req/tools/update-project-member-role.test.ts`
- `tests/products/req/tools/leave-project.test.ts`
- `tests/products/req/tools/get-iteration.test.ts`
- `tests/products/req/tools/create-iteration.test.ts`
- `tests/products/req/tools/update-iteration.test.ts`
- `tests/products/req/tools/delete-iteration.test.ts`
- `tests/products/req/tools/batch-delete-iterations.test.ts`
- `tests/products/req/tools/update-iteration-state.test.ts`
- `tests/products/req/tools/query-iteration-immovable-issues.test.ts`
- `tests/products/req/tools/delete-work-item.test.ts`
- `tests/products/req/tools/batch-update-work-items.test.ts`
- `tests/products/req/tools/list-work-item-records.test.ts`
- `tests/products/req/tools/list-work-item-comments.test.ts`
- `tests/products/req/tools/add-work-item-comment.test.ts`
- `tests/products/req/tools/update-work-item-comment.test.ts`
- `tests/products/req/tools/list-associated-issues.test.ts`
- `tests/products/req/tools/list-associated-commits.test.ts`
- `tests/products/req/tools/list-associated-test-cases.test.ts`
- `tests/products/req/tools/list-related-users.test.ts`
- `tests/products/req/tools/update-work-item-flow.test.ts`

### New integration and live tests

- `tests/products/req/tools/create-project-live.test.ts`
- `tests/products/req/tools/create-iteration-live.test.ts`
- `tests/products/req/tools/add-work-item-comment-live.test.ts`
- `tests/products/req/tools/delete-work-item-live.test.ts`
- `tests/products/req/tools/update-work-item-flow-live.test.ts`

### New docs

- `docs/wiki/Req-Live-Validated.md`

## Task 1: Split Req Schemas by Resource Domain

**Files:**
- Create: `src/products/req/schemas/project.ts`
- Create: `src/products/req/schemas/member.ts`
- Create: `src/products/req/schemas/iteration.ts`
- Create: `src/products/req/schemas/work-item.ts`
- Create: `src/products/req/schemas/comment.ts`
- Modify: `src/products/req/schemas.ts`
- Test: `tests/products/req/tools/create-work-item.test.ts`
- Test: `tests/products/req/tools/update-work-item.test.ts`

- [ ] **Step 1: Write a failing schema import compatibility test**

```ts
import { describe, expect, it } from "vitest";
import {
  reqCreateWorkItemInput,
  reqUpdateWorkItemInput,
  reqListProjectsInput
} from "../../../../src/products/req/schemas.js";

describe("req schema barrel exports", () => {
  it("keeps existing work-item schemas available from schemas.ts", () => {
    expect(reqCreateWorkItemInput.safeParse({
      project_id: "p-1",
      title: "Add login audit trail",
      work_item_type: "task"
    }).success).toBe(true);

    expect(reqUpdateWorkItemInput.safeParse({
      project_id: "p-1",
      work_item_id: "101",
      title: "Rename login task"
    }).success).toBe(true);

    expect(reqListProjectsInput.safeParse({
      page: 1,
      page_size: 20
    }).success).toBe(true);
  });
});
```

- [ ] **Step 2: Run the focused Req tool tests**

Run: `npx vitest run tests/products/req/tools/create-work-item.test.ts tests/products/req/tools/update-work-item.test.ts`

Expected: PASS before the schema split so we have a clean baseline.

- [ ] **Step 3: Create domain schema files and keep `schemas.ts` as a barrel**

```ts
// src/products/req/schemas/project.ts
import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const reqListProjectsInput = pagingSchema.extend({
  organization_id: idSchema.optional()
});

export const reqGetProjectInput = z.object({
  project_id: idSchema
});

export const reqCreateProjectInput = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqUpdateProjectInput = z.object({
  project_id: idSchema,
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});

export const reqDeleteProjectInput = z.object({
  project_id: idSchema,
  dry_run: z.boolean().default(true)
});

export const reqCheckProjectNameInput = z.object({
  name: z.string().min(1)
});

export const reqListNotAddedProjectsInput = pagingSchema;
```

```ts
// src/products/req/schemas.ts
export * from "./schemas/project.js";
export * from "./schemas/member.js";
export * from "./schemas/iteration.js";
export * from "./schemas/work-item.js";
export * from "./schemas/comment.js";
```

- [ ] **Step 4: Run the compatibility tests after the split**

Run: `npx vitest run tests/products/req/tools/create-work-item.test.ts tests/products/req/tools/update-work-item.test.ts`

Expected: PASS with unchanged behavior for existing tools.

- [ ] **Step 5: Commit the schema split**

```bash
git add src/products/req/schemas.ts src/products/req/schemas/*.ts tests/products/req/tools/create-work-item.test.ts tests/products/req/tools/update-work-item.test.ts
git commit -m "refactor: split req schemas by resource domain"
```

## Task 2: Add Project Management Tools

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Modify: `tests/server/register-req-tools.test.ts`
- Modify: `tests/server/expected-tool-names.ts`
- Create: `src/products/req/tools/create-project.ts`
- Create: `src/products/req/tools/update-project.ts`
- Create: `src/products/req/tools/delete-project.ts`
- Create: `src/products/req/tools/check-project-name.ts`
- Create: `src/products/req/tools/list-not-added-projects.ts`
- Create: `tests/products/req/tools/create-project.test.ts`
- Create: `tests/products/req/tools/update-project.test.ts`
- Create: `tests/products/req/tools/delete-project.test.ts`
- Create: `tests/products/req/tools/check-project-name.test.ts`
- Create: `tests/products/req/tools/list-not-added-projects.test.ts`
- Test: `tests/products/req/client.test.ts`

- [ ] **Step 1: Write failing unit tests for the project tools**

```ts
import { describe, expect, it } from "vitest";
import { createReqCreateProjectHandler } from "../../../../src/products/req/tools/create-project.js";

describe("createReqCreateProjectHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createReqCreateProjectHandler({
      createProject: async () => {
        throw new Error("should not run during dry_run");
      }
    });

    const result = await handler({
      name: "payments-scrum",
      description: "Payment refactor",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      name: "payments-scrum",
      description: "Payment refactor",
      executed: false
    });
  });
});
```

- [ ] **Step 2: Run the new project-tool tests to confirm they fail**

Run: `npx vitest run tests/products/req/tools/create-project.test.ts tests/products/req/tools/update-project.test.ts tests/products/req/tools/delete-project.test.ts tests/products/req/tools/check-project-name.test.ts tests/products/req/tools/list-not-added-projects.test.ts`

Expected: FAIL because the new tool files do not exist yet.

- [ ] **Step 3: Implement project client methods and MCP handlers**

```ts
// src/products/req/client.ts
export type ReqClient = {
  createProject: (input: { name: string; description?: string }) => Promise<{
    project_id: string;
    name: string;
    description?: string;
  }>;
  updateProject: (input: { project_id: string; name?: string; description?: string }) => Promise<{
    project_id: string;
    name: string;
    description?: string;
  }>;
  deleteProject: (input: { project_id: string }) => Promise<{ project_id: string; deleted: true }>;
  checkProjectName: (input: { name: string }) => Promise<{ available: boolean; name: string }>;
  listNotAddedProjects: (input: { page: number; page_size: number; keyword?: string }) => Promise<{
    projects: Array<{ project_id: string; name: string }>;
    total?: number;
  }>;
};
```

```ts
// src/products/req/tools/create-project.ts
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateProjectInput } from "../schemas.js";

export function createReqCreateProjectHandler(client: {
  createProject: (input: { name: string; description?: string }) => Promise<{
    project_id: string;
    name: string;
    description?: string;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = reqCreateProjectInput.parse(input);

    if (parsed.dry_run) {
      return {
        content: [{ type: "text" as const, text: `Dry run: create project ${parsed.name}` }],
        structuredContent: asItemResult(`Dry run: create project ${parsed.name}`, {
          name: parsed.name,
          description: parsed.description,
          executed: false
        })
      };
    }

    const response = await client.createProject(parsed);
    return {
      content: [{ type: "text" as const, text: `Created project ${response.project_id}` }],
      structuredContent: asItemResult(`Created project ${response.project_id}`, {
        id: response.project_id,
        name: response.name,
        description: response.description,
        executed: true
      })
    };
  };
}
```

- [ ] **Step 4: Register the new project tools and update server expectations**

```ts
// src/products/req/tools/index.ts
export const reqToolNames = [
  "req_list_projects",
  "req_get_project",
  "req_create_project",
  "req_update_project",
  "req_delete_project",
  "req_check_project_name",
  "req_list_not_added_projects",
  // existing work-item, iteration, and member tools stay below
];
```

```ts
// tests/server/expected-tool-names.ts
"req_check_project_name",
"req_create_project",
"req_delete_project",
"req_list_not_added_projects",
"req_update_project",
```

- [ ] **Step 5: Run the project test slice**

Run: `npx vitest run tests/products/req/tools/create-project.test.ts tests/products/req/tools/update-project.test.ts tests/products/req/tools/delete-project.test.ts tests/products/req/tools/check-project-name.test.ts tests/products/req/tools/list-not-added-projects.test.ts tests/server/register-req-tools.test.ts`

Expected: PASS with the new tools registered and mapped.

- [ ] **Step 6: Commit the project tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/create-project.ts src/products/req/tools/update-project.ts src/products/req/tools/delete-project.ts src/products/req/tools/check-project-name.ts src/products/req/tools/list-not-added-projects.ts tests/products/req/tools/create-project.test.ts tests/products/req/tools/update-project.test.ts tests/products/req/tools/delete-project.test.ts tests/products/req/tools/check-project-name.test.ts tests/products/req/tools/list-not-added-projects.test.ts tests/server/register-req-tools.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req project management tools"
```

## Task 3: Add Project Member Management Tools

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Create: `src/products/req/tools/add-project-member.ts`
- Create: `src/products/req/tools/batch-add-project-members.ts`
- Create: `src/products/req/tools/batch-delete-project-members.ts`
- Create: `src/products/req/tools/update-project-member-role.ts`
- Create: `src/products/req/tools/leave-project.ts`
- Create: `tests/products/req/tools/add-project-member.test.ts`
- Create: `tests/products/req/tools/batch-add-project-members.test.ts`
- Create: `tests/products/req/tools/batch-delete-project-members.test.ts`
- Create: `tests/products/req/tools/update-project-member-role.test.ts`
- Create: `tests/products/req/tools/leave-project.test.ts`
- Test: `tests/products/req/client.test.ts`

- [ ] **Step 1: Add failing member-tool tests**

```ts
import { describe, expect, it } from "vitest";
import { createReqAddProjectMemberHandler } from "../../../../src/products/req/tools/add-project-member.js";

describe("createReqAddProjectMemberHandler", () => {
  it("returns a dry-run preview for member add", async () => {
    const handler = createReqAddProjectMemberHandler({
      addProjectMember: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "p-1",
      user_id: "u-1",
      role_id: 7,
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      userId: "u-1",
      roleId: 7,
      executed: false
    });
  });
});
```

- [ ] **Step 2: Run the member-tool tests to verify they fail**

Run: `npx vitest run tests/products/req/tools/add-project-member.test.ts tests/products/req/tools/batch-add-project-members.test.ts tests/products/req/tools/batch-delete-project-members.test.ts tests/products/req/tools/update-project-member-role.test.ts tests/products/req/tools/leave-project.test.ts`

Expected: FAIL because the member tools are not implemented yet.

- [ ] **Step 3: Implement member client methods and handlers**

```ts
// src/products/req/client.ts
addProjectMember: (input: { project_id: string; user_id: string; role_id: number }) => Promise<{ user_id: string; role_id: number }>;
batchAddProjectMembers: (input: { project_id: string; members: Array<{ user_id: string; role_id: number }> }) => Promise<{ added: number }>;
batchDeleteProjectMembers: (input: { project_id: string; user_ids: string[] }) => Promise<{ removed: number }>;
updateProjectMemberRole: (input: { project_id: string; user_id: string; role_id: number }) => Promise<{ user_id: string; role_id: number }>;
leaveProject: (input: { project_id: string }) => Promise<{ project_id: string; left: true }>;
```

```ts
// src/products/req/tools/update-project-member-role.ts
return {
  content: [{ type: "text" as const, text: `Updated member role ${parsed.user_id}` }],
  structuredContent: asItemResult(`Updated member role ${parsed.user_id}`, {
    projectId: parsed.project_id,
    userId: parsed.user_id,
    roleId: response.role_id,
    executed: true
  })
};
```

- [ ] **Step 4: Register member tools and update tool-name expectations**

Run: `npx vitest run tests/server/register-req-tools.test.ts`

Expected: FAIL until the new member tool names are added to `src/products/req/tools/index.ts`, `src/server/register-req-tools.ts`, and `tests/server/expected-tool-names.ts`.

- [ ] **Step 5: Run the member tool slice after implementation**

Run: `npx vitest run tests/products/req/tools/add-project-member.test.ts tests/products/req/tools/batch-add-project-members.test.ts tests/products/req/tools/batch-delete-project-members.test.ts tests/products/req/tools/update-project-member-role.test.ts tests/products/req/tools/leave-project.test.ts tests/server/register-req-tools.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the member-management tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/add-project-member.ts src/products/req/tools/batch-add-project-members.ts src/products/req/tools/batch-delete-project-members.ts src/products/req/tools/update-project-member-role.ts src/products/req/tools/leave-project.ts tests/products/req/tools/add-project-member.test.ts tests/products/req/tools/batch-add-project-members.test.ts tests/products/req/tools/batch-delete-project-members.test.ts tests/products/req/tools/update-project-member-role.test.ts tests/products/req/tools/leave-project.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req project member management tools"
```

## Task 4: Add Iteration Management Tools

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Create: `src/products/req/tools/get-iteration.ts`
- Create: `src/products/req/tools/create-iteration.ts`
- Create: `src/products/req/tools/update-iteration.ts`
- Create: `src/products/req/tools/delete-iteration.ts`
- Create: `src/products/req/tools/batch-delete-iterations.ts`
- Create: `src/products/req/tools/update-iteration-state.ts`
- Create: `src/products/req/tools/query-iteration-immovable-issues.ts`
- Create: `tests/products/req/tools/get-iteration.test.ts`
- Create: `tests/products/req/tools/create-iteration.test.ts`
- Create: `tests/products/req/tools/update-iteration.test.ts`
- Create: `tests/products/req/tools/delete-iteration.test.ts`
- Create: `tests/products/req/tools/batch-delete-iterations.test.ts`
- Create: `tests/products/req/tools/update-iteration-state.test.ts`
- Create: `tests/products/req/tools/query-iteration-immovable-issues.test.ts`

- [ ] **Step 1: Write a failing iteration-detail test**

```ts
import { describe, expect, it } from "vitest";
import { createReqGetIterationHandler } from "../../../../src/products/req/tools/get-iteration.js";

describe("createReqGetIterationHandler", () => {
  it("maps iteration detail into normalized MCP output", async () => {
    const handler = createReqGetIterationHandler({
      getIteration: async () => ({
        id: 1001,
        name: "Sprint 24",
        status: "Doing",
        begin_time: "1710000000000",
        end_time: "1710600000000"
      })
    });

    const result = await handler({ iteration_id: "1001" });

    expect(result.structuredContent.item).toEqual({
      id: "1001",
      name: "Sprint 24",
      status: "Doing",
      beginTime: "1710000000000",
      endTime: "1710600000000"
    });
  });
});
```

- [ ] **Step 2: Run the iteration tests to confirm they fail**

Run: `npx vitest run tests/products/req/tools/get-iteration.test.ts tests/products/req/tools/create-iteration.test.ts tests/products/req/tools/update-iteration.test.ts tests/products/req/tools/delete-iteration.test.ts tests/products/req/tools/batch-delete-iterations.test.ts tests/products/req/tools/update-iteration-state.test.ts tests/products/req/tools/query-iteration-immovable-issues.test.ts`

Expected: FAIL because the iteration tools do not exist yet.

- [ ] **Step 3: Implement iteration client methods from the documented Req URIs**

```ts
// src/products/req/client.ts
getIteration: (input: { iteration_id: string }) => Promise<{ id: number | string; name: string; status?: string; begin_time?: string; end_time?: string; description?: string }>;
createIteration: (input: { project_id: string; name: string; begin_time?: string; end_time?: string; description?: string }) => Promise<{ id: number | string; name: string }>;
updateIteration: (input: { iteration_id: string; name?: string; begin_time?: string; end_time?: string; description?: string }) => Promise<{ id: number | string; name: string }>;
deleteIteration: (input: { iteration_id: string }) => Promise<{ iteration_id: string; deleted: true }>;
batchDeleteIterations: (input: { project_id: string; iteration_ids: string[] }) => Promise<{ deleted: number }>;
updateIterationState: (input: { project_id: string; iteration_id: string; action: "start" | "close" }) => Promise<{ iteration_id: string; action: string }>;
queryIterationImmovableIssues: (input: { project_id: string; iteration_id: string; page: number; page_size: number }) => Promise<{ issues: Array<{ id: number | string; subject: string }>; total?: number }>;
```

- [ ] **Step 4: Implement iteration handlers with the same normalized list/item style as the existing Req tools**

```ts
// src/products/req/tools/query-iteration-immovable-issues.ts
return {
  content: [{ type: "text" as const, text: `${items.length} immovable issues found` }],
  structuredContent: asListResult(
    `${items.length} immovable issues found`,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject
    })),
    toPageInfo(parsed.page, parsed.page_size, response.total)
  )
};
```

- [ ] **Step 5: Run the iteration test slice**

Run: `npx vitest run tests/products/req/tools/get-iteration.test.ts tests/products/req/tools/create-iteration.test.ts tests/products/req/tools/update-iteration.test.ts tests/products/req/tools/delete-iteration.test.ts tests/products/req/tools/batch-delete-iterations.test.ts tests/products/req/tools/update-iteration-state.test.ts tests/products/req/tools/query-iteration-immovable-issues.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the iteration tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/get-iteration.ts src/products/req/tools/create-iteration.ts src/products/req/tools/update-iteration.ts src/products/req/tools/delete-iteration.ts src/products/req/tools/batch-delete-iterations.ts src/products/req/tools/update-iteration-state.ts src/products/req/tools/query-iteration-immovable-issues.ts tests/products/req/tools/get-iteration.test.ts tests/products/req/tools/create-iteration.test.ts tests/products/req/tools/update-iteration.test.ts tests/products/req/tools/delete-iteration.test.ts tests/products/req/tools/batch-delete-iterations.test.ts tests/products/req/tools/update-iteration-state.test.ts tests/products/req/tools/query-iteration-immovable-issues.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req iteration management tools"
```

## Task 5: Add Work-Item Delete, Batch Update, and Records

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Create: `src/products/req/tools/delete-work-item.ts`
- Create: `src/products/req/tools/batch-update-work-items.ts`
- Create: `src/products/req/tools/list-work-item-records.ts`
- Create: `tests/products/req/tools/delete-work-item.test.ts`
- Create: `tests/products/req/tools/batch-update-work-items.test.ts`
- Create: `tests/products/req/tools/list-work-item-records.test.ts`
- Modify: `tests/products/req/client.test.ts`

- [ ] **Step 1: Add failing tests for work-item delete, batch update, and records**

```ts
import { describe, expect, it } from "vitest";
import { createReqListWorkItemRecordsHandler } from "../../../../src/products/req/tools/list-work-item-records.js";

describe("createReqListWorkItemRecordsHandler", () => {
  it("maps work-item records into a normalized list result", async () => {
    const handler = createReqListWorkItemRecordsHandler({
      listWorkItemRecords: async () => ({
        records: [
          { id: 1, field: "status", old_value: "To Do", new_value: "Doing" }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "101",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "1",
        field: "status",
        oldValue: "To Do",
        newValue: "Doing"
      }
    ]);
  });
});
```

- [ ] **Step 2: Run the new work-item management tests**

Run: `npx vitest run tests/products/req/tools/delete-work-item.test.ts tests/products/req/tools/batch-update-work-items.test.ts tests/products/req/tools/list-work-item-records.test.ts`

Expected: FAIL because the files do not exist yet.

- [ ] **Step 3: Add client methods using the Req work-item endpoints**

```ts
// src/products/req/client.ts
deleteWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{ work_item_id: string; deleted: true }>;
batchUpdateWorkItems: (input: { project_id: string; work_item_ids: string[]; status_id?: number; priority_id?: number }) => Promise<{ updated: number }>;
listWorkItemRecords: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{
  records: Array<{ id: number | string; field?: string; old_value?: string; new_value?: string }>;
  total?: number;
}>;
```

- [ ] **Step 4: Implement dry-run-first delete and batch-update handlers**

```ts
// src/products/req/tools/delete-work-item.ts
if (parsed.dry_run) {
  return {
    content: [{ type: "text" as const, text: `Dry run: delete work item ${parsed.work_item_id}` }],
    structuredContent: asItemResult(`Dry run: delete work item ${parsed.work_item_id}`, {
      id: parsed.work_item_id,
      projectId: parsed.project_id,
      executed: false
    })
  };
}
```

- [ ] **Step 5: Run the work-item management test slice**

Run: `npx vitest run tests/products/req/tools/delete-work-item.test.ts tests/products/req/tools/batch-update-work-items.test.ts tests/products/req/tools/list-work-item-records.test.ts tests/products/req/client.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the work-item management tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/delete-work-item.ts src/products/req/tools/batch-update-work-items.ts src/products/req/tools/list-work-item-records.ts tests/products/req/tools/delete-work-item.test.ts tests/products/req/tools/batch-update-work-items.test.ts tests/products/req/tools/list-work-item-records.test.ts tests/products/req/client.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req work-item management tools"
```

## Task 6: Add Work-Item Comments

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Create: `src/products/req/tools/list-work-item-comments.ts`
- Create: `src/products/req/tools/add-work-item-comment.ts`
- Create: `src/products/req/tools/update-work-item-comment.ts`
- Create: `tests/products/req/tools/list-work-item-comments.test.ts`
- Create: `tests/products/req/tools/add-work-item-comment.test.ts`
- Create: `tests/products/req/tools/update-work-item-comment.test.ts`
- Create: `tests/products/req/tools/add-work-item-comment-live.test.ts`

- [ ] **Step 1: Write failing comment-tool tests**

```ts
import { describe, expect, it } from "vitest";
import { createReqAddWorkItemCommentHandler } from "../../../../src/products/req/tools/add-work-item-comment.js";

describe("createReqAddWorkItemCommentHandler", () => {
  it("returns a dry-run preview before executing comment creation", async () => {
    const handler = createReqAddWorkItemCommentHandler({
      addWorkItemComment: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "101",
      content: "Please re-check the acceptance criteria.",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "101",
      content: "Please re-check the acceptance criteria.",
      executed: false
    });
  });
});
```

- [ ] **Step 2: Run the comment-tool tests to verify failure**

Run: `npx vitest run tests/products/req/tools/list-work-item-comments.test.ts tests/products/req/tools/add-work-item-comment.test.ts tests/products/req/tools/update-work-item-comment.test.ts`

Expected: FAIL because the tools are not implemented yet.

- [ ] **Step 3: Add comment client methods and normalized mappings**

```ts
// src/products/req/client.ts
listWorkItemComments: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{
  comments: Array<{ id: number | string; content?: string; author?: { user_name?: string }; created_on?: string }>;
  total?: number;
}>;
addWorkItemComment: (input: { project_id: string; work_item_id: string; content: string }) => Promise<{ id: number | string; content?: string }>;
updateWorkItemComment: (input: { project_id: string; work_item_id: string; comment_id: string; content: string }) => Promise<{ id: number | string; content?: string }>;
```

- [ ] **Step 4: Add live coverage for comment creation on a writable Req sample**

```ts
// tests/products/req/tools/add-work-item-comment-live.test.ts
it("adds a real comment to a writable live work item", async () => {
  const result = await handler({
    project_id: writableProjectId,
    work_item_id: writableWorkItemId,
    content: `req-live-comment-${Date.now()}`,
    dry_run: false
  });

  expect(result.structuredContent.item.executed).toBe(true);
});
```

- [ ] **Step 5: Run the comment-tool slice**

Run: `npx vitest run tests/products/req/tools/list-work-item-comments.test.ts tests/products/req/tools/add-work-item-comment.test.ts tests/products/req/tools/update-work-item-comment.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the comment tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/list-work-item-comments.ts src/products/req/tools/add-work-item-comment.ts src/products/req/tools/update-work-item-comment.ts tests/products/req/tools/list-work-item-comments.test.ts tests/products/req/tools/add-work-item-comment.test.ts tests/products/req/tools/update-work-item-comment.test.ts tests/products/req/tools/add-work-item-comment-live.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req work-item comment tools"
```

## Task 7: Add Associations, Related Users, and Flow Transition

**Files:**
- Modify: `src/products/req/client.ts`
- Modify: `src/products/req/tools/index.ts`
- Modify: `src/server/register-req-tools.ts`
- Create: `src/products/req/tools/list-associated-issues.ts`
- Create: `src/products/req/tools/list-associated-commits.ts`
- Create: `src/products/req/tools/list-associated-test-cases.ts`
- Create: `src/products/req/tools/list-related-users.ts`
- Create: `src/products/req/tools/update-work-item-flow.ts`
- Create: `tests/products/req/tools/list-associated-issues.test.ts`
- Create: `tests/products/req/tools/list-associated-commits.test.ts`
- Create: `tests/products/req/tools/list-associated-test-cases.test.ts`
- Create: `tests/products/req/tools/list-related-users.test.ts`
- Create: `tests/products/req/tools/update-work-item-flow.test.ts`
- Create: `tests/products/req/tools/update-work-item-flow-live.test.ts`

- [ ] **Step 1: Write failing tests for associations and flow transition**

```ts
import { describe, expect, it } from "vitest";
import { createReqUpdateWorkItemFlowHandler } from "../../../../src/products/req/tools/update-work-item-flow.js";

describe("createReqUpdateWorkItemFlowHandler", () => {
  it("returns a dry-run preview for flow transitions", async () => {
    const handler = createReqUpdateWorkItemFlowHandler({
      updateWorkItemFlow: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "101",
      status_id: 3,
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "101",
      statusId: 3,
      executed: false
    });
  });
});
```

- [ ] **Step 2: Run the failing association and flow tests**

Run: `npx vitest run tests/products/req/tools/list-associated-issues.test.ts tests/products/req/tools/list-associated-commits.test.ts tests/products/req/tools/list-associated-test-cases.test.ts tests/products/req/tools/list-related-users.test.ts tests/products/req/tools/update-work-item-flow.test.ts`

Expected: FAIL because the tool files do not exist yet.

- [ ] **Step 3: Add association and flow client methods**

```ts
// src/products/req/client.ts
listAssociatedIssues: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{ issues: Array<{ id: number | string; subject?: string }>; total?: number }>;
listAssociatedCommits: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{ commits: Array<{ id?: string; message?: string; branch?: string }>; total?: number }>;
listAssociatedTestCases: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{ test_cases: Array<{ id: number | string; name?: string }>; total?: number }>;
listRelatedUsers: (input: { project_id: string; work_item_id: string; page: number; page_size: number }) => Promise<{ users: Array<{ user_id?: string; user_name?: string }>; total?: number }>;
updateWorkItemFlow: (input: { project_id: string; work_item_id: string; status_id: number }) => Promise<{ id: number | string; status?: { id?: number; name?: string } }>;
```

- [ ] **Step 4: Add a real live test for work-item flow transition**

```ts
// tests/products/req/tools/update-work-item-flow-live.test.ts
it("transitions a live work item through the writable Req sample", async () => {
  const result = await handler({
    project_id: writableProjectId,
    work_item_id: writableWorkItemId,
    status_id: targetStatusId,
    dry_run: false
  });

  expect(result.structuredContent.item.executed).toBe(true);
  expect(result.structuredContent.item.statusId).toBe(targetStatusId);
});
```

- [ ] **Step 5: Run the association and flow slice**

Run: `npx vitest run tests/products/req/tools/list-associated-issues.test.ts tests/products/req/tools/list-associated-commits.test.ts tests/products/req/tools/list-associated-test-cases.test.ts tests/products/req/tools/list-related-users.test.ts tests/products/req/tools/update-work-item-flow.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the association and flow tools**

```bash
git add src/products/req/client.ts src/products/req/tools/index.ts src/server/register-req-tools.ts src/products/req/tools/list-associated-issues.ts src/products/req/tools/list-associated-commits.ts src/products/req/tools/list-associated-test-cases.ts src/products/req/tools/list-related-users.ts src/products/req/tools/update-work-item-flow.ts tests/products/req/tools/list-associated-issues.test.ts tests/products/req/tools/list-associated-commits.test.ts tests/products/req/tools/list-associated-test-cases.test.ts tests/products/req/tools/list-related-users.test.ts tests/products/req/tools/update-work-item-flow.test.ts tests/products/req/tools/update-work-item-flow-live.test.ts tests/server/expected-tool-names.ts
git commit -m "feat: add req work-item collaboration tools"
```

## Task 8: Update Live Coverage, Docs, and Generated Stats

**Files:**
- Modify: `tests/products/req/client-live-smoke.test.ts`
- Create: `docs/wiki/Req-Live-Validated.md`
- Modify: `docs/wiki/Module-Functions-Overview.md`
- Modify: `docs/wiki/Capability-Matrix.md`
- Modify: `docs/wiki/Module-Live-Readiness.md`
- Modify: `docs/wiki/Official-API-Alignment.md`
- Modify: `README.md`

- [ ] **Step 1: Extend the Req live smoke to cover the new phase-1 critical paths**

```ts
it("covers the project and iteration live loop on the writable sample", async () => {
  const createdProject = await client.createProject({
    name: `req-live-${Date.now()}`,
    description: "Req live project"
  });

  expect(createdProject.project_id).toBeTruthy();

  const createdIteration = await client.createIteration({
    project_id: createdProject.project_id,
    name: `sprint-${Date.now()}`
  });

  expect(createdIteration.id).toBeTruthy();
});
```

- [ ] **Step 2: Add the missing Req status page and update the docs**

```md
# Req Live Validated

- Current Req tools: project, member, iteration, and work-item core plus phase-1 collaboration tools
- Live-validated write paths: create/update project, create/update iteration, create/update/delete work item, add comment, selected flow transition
- Pending deeper live coverage: member-management and selected batch operations
```

- [ ] **Step 3: Run docs and stats checks**

Run:

```bash
npm run stats:sync-docs
npm run stats:check-docs
```

Expected:

- `stats:sync-docs` updates generated counts if needed
- `stats:check-docs` passes with no drift

- [ ] **Step 4: Run the Req-focused verification sweep**

Run:

```bash
npx vitest run tests/products/req
npx vitest run tests/server/register-req-tools.test.ts tests/server/create-server-tools.test.ts tests/server/write-path-integration.test.ts tests/server/write-path-rate-limit-core.test.ts
npm run lint
npm run build
```

Expected:

- All Req unit tests pass
- Server registration and write-path tests stay green
- Lint passes
- TypeScript build passes

- [ ] **Step 5: Commit docs and verification updates**

```bash
git add tests/products/req/client-live-smoke.test.ts docs/wiki/Req-Live-Validated.md docs/wiki/Module-Functions-Overview.md docs/wiki/Capability-Matrix.md docs/wiki/Module-Live-Readiness.md docs/wiki/Official-API-Alignment.md README.md
git commit -m "docs: update req scrum expansion coverage and validation"
```

## Self-Review

### Spec coverage check

- Project management from the spec is covered by Task 2
- Member management from the spec is covered by Task 3
- Iteration management from the spec is covered by Task 4
- Work-item delete, batch update, and records from the spec are covered by Task 5
- Work-item comments from the spec are covered by Task 6
- Associations, related users, and flow transitions from the spec are covered by Task 7
- Documentation and live-validation updates from the spec are covered by Task 8

### Placeholder scan

No forbidden placeholder phrases remain in the task steps. The task bodies use concrete file paths, commands, and code snippets instead of deferred follow-up language.

### Type consistency check

- Existing `project_id`, `work_item_id`, and `iteration_id` naming is preserved
- New dry-run write tools consistently expose `executed: false` for previews and `executed: true` for live writes
- Resource-domain tool names follow the existing `req_<verb>_<resource>` naming style
