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

  it("keeps task name and status when client returns the normalized documented shape", async () => {
    const handler = createDeployListTasksHandler({
      listTasks: async () => ({
        tasks: [
          {
            task_id: "task-1",
            application_id: "app-1",
            application_name: "gateway-prod",
            project_id: "project-1",
            status: "Available",
            deploy_type: "docker"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "task-1",
      applicationId: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      status: "Available",
      deployType: "docker"
    });
  });

  it("exposes execution and permission fields in the MCP task list output", async () => {
    const handler = createDeployListTasksHandler({
      listTasks: async () => ({
        tasks: [
          {
            task_id: "task-1",
            application_id: "app-1",
            application_name: "gateway-prod",
            project_id: "project-1",
            status: "Available",
            deploy_type: "docker",
            execution_state: "succeeded",
            can_execute: true,
            can_modify: true,
            can_delete: false,
            can_view: true,
            can_manage: false,
            can_disable: true,
            is_disable: false
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "task-1",
      applicationId: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      status: "Available",
      deployType: "docker",
      executionState: "succeeded",
      canExecute: true,
      canModify: true,
      canDelete: false,
      canView: true,
      canManage: false,
      canDisable: true,
      disabled: false
    });
  });

  it("falls back to requested project_id for task items", async () => {
    const handler = createDeployListTasksHandler({
      listTasks: async () => ({
        tasks: [
          {
            task_id: "task-2",
            application_id: "app-2",
            application_name: "gateway-staging",
            status: "Draft",
            deploy_type: "docker"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "task-2",
      applicationId: "app-2",
      name: "gateway-staging",
      projectId: "project-1",
      status: "Draft",
      deployType: "docker"
    });
  });

  it("adds a project-scoped hint when the deploy task list is empty", async () => {
    const handler = createDeployListTasksHandler({
      listTasks: async () => ({
        tasks: [],
        total: 0
      })
    });

    const result = await handler({ project_id: "project-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 deploy tasks found");
    expect(result.content[0]?.text).toContain("If you expected deploy tasks here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
