import { describe, expect, it } from "vitest";
import { createPerfTestGetTaskHandler } from "../../../../src/products/perftest/tools/get-task.js";

describe("createPerfTestGetTaskHandler", () => {
  it("maps perftest task into MCP output", async () => {
    const handler = createPerfTestGetTaskHandler({
      getTask: async () => ({
        id: 11,
        name: "task-a",
        run_status: 2,
        related_temp_running_data: [{ task_run_info_id: 99, related_temp_running_id: 101 }]
      })
    });

    const result = await handler({ project_id: "project-1", task_id: 11 });

    expect(result.structuredContent.item).toMatchObject({ id: "11", runStatus: 2 });
  });
});
