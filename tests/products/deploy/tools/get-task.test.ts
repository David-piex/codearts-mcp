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
        state: "Draft",
        can_execute: true,
        can_create_env: false,
        can_modify: true,
        can_delete: true,
        can_view: true,
        can_manage: true,
        is_disable: false,
        create_time: "2026-04-17 17:26:47",
        update_time: "2026-04-17 17:26:47",
        template_id: "template-1",
        release_id: 0,
        app_component_list: [],
        steps: {
          step1: {
            name: "download",
            enable: true,
            params: [
              {
                name: "env",
                type: "host_group",
                required: true
              }
            ]
          },
          step2: {
            name: "start",
            enable: true,
            params: {
              deploy_mode: {
                key: "deploy_mode",
                type: "enum",
                limits: [{ name: "gray" }, { name: "production" }]
              }
            }
          }
        },
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
      state: "Draft",
      status: "available",
      canExecute: true,
      canCreateEnv: false,
      canModify: true,
      canDelete: true,
      canView: true,
      canManage: true,
      disabled: false,
      createdTime: "2026-04-17 17:26:47",
      updatedTime: "2026-04-17 17:26:47",
      templateId: "template-1",
      releaseId: 0,
      componentCount: 0,
      components: [],
      stepCount: 2,
      parameterCount: 2,
      parameterNames: ["env", "deploy_mode"],
      parameters: [
        {
          name: "env",
          type: "host_group",
          required: true,
          stepId: "step1",
          stepName: "download",
          options: []
        },
        {
          name: "deploy_mode",
          type: "enum",
          required: undefined,
          stepId: "step2",
          stepName: "start",
          options: ["gray", "production"]
        }
      ],
      stepNames: ["download", "start"],
      steps: {
        step1: {
          name: "download",
          enable: true,
          params: [
            {
              name: "env",
              type: "host_group",
              required: true
            }
          ]
        },
        step2: {
          name: "start",
          enable: true,
          params: {
            deploy_mode: {
              key: "deploy_mode",
              type: "enum",
              limits: [{ name: "gray" }, { name: "production" }]
            }
          }
        }
      },
      deployType: "docker",
      description: "production task"
    });
  });
});
