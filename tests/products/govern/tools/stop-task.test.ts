import { describe, expect, it } from "vitest";
import { createGovernStopTaskHandler } from "../../../../src/products/govern/tools/stop-task.js";

describe("createGovernStopTaskHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernStopTaskHandler({
      stopTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      projectId: "project-1",
      executed: false
    });
  });

  it("maps stopped govern task into MCP output", async () => {
    const handler = createGovernStopTaskHandler({
      stopTask: async () => ({
        id: "task-1",
        result: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      result: "success",
      executed: true
    });
  });
});
