import { describe, expect, it } from "vitest";
import { createGovernGetTaskStatusHandler } from "../../../../src/products/govern/tools/get-task-status.js";

describe("createGovernGetTaskStatusHandler", () => {
  it("maps govern task status into MCP output", async () => {
    const handler = createGovernGetTaskStatusHandler({
      getTaskStatus: async () => ({
        id: "task-1",
        status: "R"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      status: "R"
    });
  });
});
