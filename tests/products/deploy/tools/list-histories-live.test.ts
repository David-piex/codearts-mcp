import { describe, expect, it } from "vitest";
import { createDeployListHistoriesHandler } from "../../../../src/products/deploy/tools/list-histories.js";

describe("createDeployListHistoriesHandler", () => {
  it("maps deploy history list into MCP output", async () => {
    const handler = createDeployListHistoriesHandler({
      listHistories: async () => ({
        histories: [
          {
            id: "history-1",
            task_id: "task-1",
            operator_name: "yao",
            status: "SUCCESS"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 deploy histories");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "history-1",
      taskId: "task-1",
      operatorName: "yao",
      status: "SUCCESS"
    });
  });
});
