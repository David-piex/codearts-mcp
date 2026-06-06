import { describe, expect, it } from "vitest";
import { createTestPlanCopyTaskRelationsHandler } from "../../../../src/products/testplan/tools/copy-task-relations.js";

describe("testplan copy task relations handler", () => {
  it("returns dry-run preview by default", async () => {
    const handler = createTestPlanCopyTaskRelationsHandler({
      copyTaskRelations: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      original_task_uri: "task-a",
      dest_task_uri: "task-b"
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      originalTaskUri: "task-a",
      destTaskUri: "task-b",
      executed: false
    });
  });

  it("copies task relations when dry_run is false", async () => {
    const handler = createTestPlanCopyTaskRelationsHandler({
      copyTaskRelations: async (input) => ({
        project_id: input.project_id,
        value: "relation-copy-1",
        raw: { value: "relation-copy-1" }
      })
    });

    const result = await handler({
      project_id: "project-1",
      original_task_uri: "task-a",
      dest_task_uri: "task-b",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "relation-copy-1",
      projectId: "project-1",
      originalTaskUri: "task-a",
      destTaskUri: "task-b",
      value: "relation-copy-1",
      executed: true
    });
  });
});
