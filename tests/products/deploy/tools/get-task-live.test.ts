import { describe, expect, it } from "vitest";
import { createDeployGetTaskHandler } from "../../../../src/products/deploy/tools/get-task.js";

describe("createDeployGetTaskHandler", () => {
  it("maps deploy task detail into MCP output", async () => {
    const handler = createDeployGetTaskHandler({
      getTask: async () => ({
        task_id: "task-1",
        application_id: "app-1",
        name: "gateway-prod",
        project_id: "project-1",
        status: "available",
        deploy_type: "docker",
        description: "production task"
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      applicationId: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      status: "available",
      deployType: "docker",
      description: "production task"
    });
  });
});
