import { describe, expect, it } from "vitest";
import { createDeployListAppsHandler } from "../../../../src/products/deploy/tools/list-apps.js";

describe("createDeployListAppsHandler", () => {
  it("maps deploy application list into MCP output", async () => {
    const handler = createDeployListAppsHandler({
      listApps: async () => ({
        applications: [
          {
            application_id: "app-1",
            name: "gateway-prod",
            project_id: "project-1",
            deploy_type: "docker",
            arrange_infos: [{ id: "task-1", state: "Available", deploy_system: "deployTemplate" }]
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 deploy applications");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      deployType: "docker",
      taskCount: 1,
      taskIds: ["task-1"]
    });
  });
});
