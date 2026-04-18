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
            description: "production app",
            arrange_infos: [{ id: "task-1", state: "Available", deploy_system: "deployTemplate" }]
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 deploy applications");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      deployType: "docker",
      description: "production app",
      taskCount: 1,
      taskIds: ["task-1"],
      tasks: [{ id: "task-1", state: "Available", deploySystem: "deployTemplate" }]
    });
  });

  it("exposes disable and execution-state fields in the MCP application list output", async () => {
    const handler = createDeployListAppsHandler({
      listApps: async () => ({
        applications: [
          {
            application_id: "app-1",
            name: "gateway-prod",
            project_id: "project-1",
            deploy_type: "docker",
            description: "production app",
            execution_state: "running",
            can_execute: true,
            can_modify: true,
            can_delete: false,
            can_view: true,
            can_manage: false,
            can_create_env: true,
            can_disable: true,
            is_disable: false,
            arrange_infos: [{ id: "task-1", state: "Available", deploy_system: "deployTemplate" }]
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      deployType: "docker",
      description: "production app",
      executionState: "running",
      canExecute: true,
      canModify: true,
      canDelete: false,
      canView: true,
      canManage: false,
      canCreateEnv: true,
      canDisable: true,
      disabled: false,
      taskCount: 1,
      taskIds: ["task-1"],
      tasks: [{ id: "task-1", state: "Available", deploySystem: "deployTemplate" }]
    });
  });

  it("falls back to requested project_id and carries applicationId into nested tasks", async () => {
    const handler = createDeployListAppsHandler({
      listApps: async () => ({
        applications: [
          {
            application_id: "app-2",
            name: "gateway-staging",
            deploy_type: "docker",
            arrange_infos: [{ id: "task-2", state: "Draft", deploy_system: "deployTemplate" }]
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "app-2",
      name: "gateway-staging",
      projectId: "project-1",
      taskIds: ["task-2"],
      tasks: [
        {
          id: "task-2",
          applicationId: "app-2",
          state: "Draft",
          deploySystem: "deployTemplate"
        }
      ]
    });
  });
});
