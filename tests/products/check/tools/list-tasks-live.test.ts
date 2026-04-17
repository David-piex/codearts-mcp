import { describe, expect, it } from "vitest";
import { createCheckListTasksHandler } from "../../../../src/products/check/tools/list-tasks.js";

describe("createCheckListTasksHandler", () => {
  it("maps check task list responses into MCP output", async () => {
    const handler = createCheckListTasksHandler({
      listTasks: async () => ({
        tasks: [
          {
            task_id: "task-1",
            task_name: "gateway-main",
            project_name: "Alpha",
            repository_name: "gateway",
            branch_name: "main",
            language: "java",
            status: "finished"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 20, project_id: "project-1" });

    expect(result.structuredContent.summary).toContain("1 check tasks");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "task-1",
      name: "gateway-main",
      projectName: "Alpha",
      repositoryName: "gateway",
      branchName: "main",
      language: "java",
      status: "finished"
    });
  });
});
