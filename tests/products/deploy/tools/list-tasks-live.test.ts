import { describe, expect, it } from "vitest";
import { createDeployListTasksHandler } from "../../../../src/products/deploy/tools/list-tasks.js";

describe("createDeployListTasksHandler", () => {
  it("maps deploy task list into MCP output", async () => {
    const handler = createDeployListTasksHandler({
      listTasks: async () => ({
        tasks: [
          {
            task_id: "task-1",
            application_id: "app-1",
            application_name: "gateway-prod",
            project_id: "project-1",
            status: "available",
            deploy_type: "docker"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 deploy tasks");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "task-1",
      applicationId: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      status: "available",
      deployType: "docker"
    });
  });
});
