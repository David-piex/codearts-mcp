import { describe, expect, it } from "vitest";
import { createDeployGetAppHandler } from "../../../../src/products/deploy/tools/get-app.js";

describe("createDeployGetAppHandler", () => {
  it("maps deploy application detail into MCP output", async () => {
    const handler = createDeployGetAppHandler({
      getApp: async () => ({
        application_id: "app-1",
        name: "gateway-prod",
        project_id: "project-1",
        create_type: "template",
        can_execute: true,
        can_create_env: true,
        can_modify: true,
        can_delete: false,
        can_view: true,
        can_manage: true,
        can_disable: true,
        is_disable: false,
        create_time: "2026-04-17 17:26:47.0",
        update_time: "2026-04-17 17:26:47.0",
        deploy_type: "docker",
        description: "production app",
        arrange_infos: [
          {
            id: "task-1",
            state: "Available",
            deploy_system: "deployTemplate",
            template_id: "template-1",
            release_id: 0,
            app_component_list: [
              {
                task_id: "task-1",
                app_id: "app-1",
                app_name: "gateway-prod",
                comp_id: "component-1",
                comp_name: "gateway",
                region: "cn-north-4",
                state: "RUNNING"
              }
            ],
            can_execute: true,
            can_create_env: false,
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
                params: JSON.stringify([
                  {
                    key: "deploy_mode",
                    type: "enum",
                    limits: [{ name: "gray" }, { name: "production" }]
                  }
                ])
              }
            }
          }
        ]
      })
    });

    const result = await handler({ application_id: "app-1" });

    expect(result.structuredContent.item).toEqual({
      id: "app-1",
      name: "gateway-prod",
      projectId: "project-1",
      createType: "template",
      canExecute: true,
      canCreateEnv: true,
      canModify: true,
      canDelete: false,
      canView: true,
      canManage: true,
      canDisable: true,
      disabled: false,
      createdTime: "2026-04-17 17:26:47.0",
      updatedTime: "2026-04-17 17:26:47.0",
      deployType: "docker",
      description: "production app",
      taskCount: 1,
      taskIds: ["task-1"],
      tasks: [
        {
          id: "task-1",
          state: "Available",
          deploySystem: "deployTemplate",
          templateId: "template-1",
          releaseId: 0,
          componentCount: 1,
          components: [
            {
              taskId: "task-1",
              appId: "app-1",
              appName: "gateway-prod",
              componentId: "component-1",
              componentName: "gateway",
              region: "cn-north-4",
              state: "RUNNING"
            }
          ],
          canExecute: true,
          canCreateEnv: false,
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
              params: JSON.stringify([
                {
                  key: "deploy_mode",
                  type: "enum",
                  limits: [{ name: "gray" }, { name: "production" }]
                }
              ])
            }
          }
        }
      ]
    });
  });
});
