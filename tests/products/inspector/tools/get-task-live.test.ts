import { describe, expect, it } from "vitest";
import { createInspectorGetTaskHandler } from "../../../../src/products/inspector/tools/get-task.js";

describe("createInspectorGetTaskHandler", () => {
  it("maps inspector task into MCP output", async () => {
    const handler = createInspectorGetTaskHandler({
      getTask: async () => ({
        task_id: "task-1",
        task_name: "scan-main",
        task_status: "success",
        score: 100
      })
    });

    const result = await handler({ project_id: "project-1", task_id: "task-1" });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      score: 100
    });
  });
});
