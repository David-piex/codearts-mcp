import { describe, expect, it } from "vitest";
import { createCheckGetTaskHandler } from "../../../../src/products/check/tools/get-task.js";

describe("createCheckGetTaskHandler", () => {
  it("maps check task detail into MCP output", async () => {
    const handler = createCheckGetTaskHandler({
      getTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-main",
        project_name: "Alpha",
        repository_name: "gateway",
        branch_name: "main",
        language: "java",
        status: "finished",
        last_check_time: "2026-04-15T09:00:00Z"
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      name: "gateway-main",
      projectName: "Alpha",
      repositoryName: "gateway",
      branchName: "main",
      language: "java",
      status: "finished",
      lastCheckTime: "2026-04-15T09:00:00Z"
    });
  });
});
