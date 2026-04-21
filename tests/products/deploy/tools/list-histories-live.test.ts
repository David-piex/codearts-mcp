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
      projectId: "project-1",
      taskId: "task-1",
      operatorName: "yao",
      status: "SUCCESS"
    });
  });

  it("falls back to requested task_id for deploy history items", async () => {
    const handler = createDeployListHistoriesHandler({
      listHistories: async () => ({
        histories: [
          {
            id: "history-2",
            operator_name: "yao",
            status: "RUNNING"
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

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "history-2",
      projectId: "project-1",
      taskId: "task-1",
      operatorName: "yao",
      status: "RUNNING"
    });
  });

  it("adds a project-scoped hint when the deploy history list is empty", async () => {
    const handler = createDeployListHistoriesHandler({
      listHistories: async () => ({
        histories: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 deploy histories found");
    expect(result.content[0]?.text).toContain("If you expected deploy histories here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
