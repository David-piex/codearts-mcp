import { describe, expect, it } from "vitest";
import { createDeployGetAppHandler } from "../../../../src/products/deploy/tools/get-app.js";

describe("createDeployGetAppHandler", () => {
  it("maps deploy application detail into MCP output", async () => {
    const handler = createDeployGetAppHandler({
      getApp: async () => ({
        application_id: "app-1",
        name: "gateway-prod",
        project_id: "project-1",
        deploy_type: "docker",
        description: "production app",
        arrange_infos: [{ id: "task-1", state: "Available", deploy_system: "deployTemplate" }]
      })
    });

    const result = await handler({ application_id: "app-1" });

    expect(result.structuredContent.item).toEqual({
      id: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      deployType: "docker",
      description: "production app",
      taskCount: 1,
      taskIds: ["task-1"]
    });
  });
});
