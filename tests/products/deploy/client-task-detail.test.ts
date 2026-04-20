import { describe, expect, it } from "vitest";
import { AppError } from "../../../src/core/errors/app-error.js";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient task detail", () => {
  it("maps legacy deploy task detail responses", async () => {
    const client = createDeployClient({
      get: async () => ({
        result: {
          task_id: "task-1",
          application_id: "app-1",
          application_name: "gateway-prod",
          project_id: "project-1",
          status: "available",
          deploy_type: "docker",
          description: "production task"
        }
      })
    } as never);

    const result = await client.getTask({ task_id: "task-1" });

    expect(result).toEqual({
      task_id: "task-1",
      application_id: "app-1",
      name: "gateway-prod",
      project_id: "project-1",
      state: "available",
      can_execute: undefined,
      can_create_env: undefined,
      can_modify: undefined,
      can_delete: undefined,
      can_view: undefined,
      can_manage: undefined,
      is_disable: undefined,
      create_time: undefined,
      update_time: undefined,
      steps: undefined,
      template_id: undefined,
      release_id: undefined,
      app_component_list: undefined,
      status: "available",
      deploy_type: "docker",
      description: "production task"
    });
  });

  it("falls back to /v2/task/detail/{id} when the primary task detail has empty steps", async () => {
    const requestedPaths: string[] = [];
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPaths.push(path);

        if (path === "/v2/tasks/task-1") {
          return {
            result: {
              task_id: "task-1",
              application_id: "app-1",
              application_name: "gateway-prod",
              project_id: "project-1",
              status: "available",
              template_id: "template-primary",
              steps: {}
            }
          };
        }

        if (path === "/v2/task/detail/task-1") {
          return {
            result: {
              task_id: "task-1",
              template_id: "template-detail",
              steps: {
                step1: {
                  id: "step1",
                  name: "download",
                  enable: true,
                  params: [{ name: "env", type: "host_group" }]
                }
              },
              description: "recovered detail"
            }
          };
        }

        throw new Error(`unexpected request: ${path}`);
      }
    } as never);

    const result = await client.getTask({ task_id: "task-1" });

    expect(requestedPaths).toEqual(["/v2/tasks/task-1", "/v2/task/detail/task-1"]);
    expect(result).toEqual({
      task_id: "task-1",
      application_id: "app-1",
      name: "gateway-prod",
      project_id: "project-1",
      state: "available",
      can_execute: undefined,
      can_create_env: undefined,
      can_modify: undefined,
      can_delete: undefined,
      can_view: undefined,
      can_manage: undefined,
      is_disable: undefined,
      create_time: undefined,
      update_time: undefined,
      steps: {
        step1: {
          id: "step1",
          name: "download",
          enable: true,
          params: [{ name: "env", type: "host_group" }]
        }
      },
      template_id: "template-detail",
      release_id: undefined,
      app_component_list: undefined,
      status: "available",
      deploy_type: undefined,
      description: "recovered detail"
    });
  });

  it("throws a provider error when the primary task detail is empty", async () => {
    const client = createDeployClient({
      get: async () => null
    } as never);

    await expect(client.getTask({ task_id: "task-1" })).rejects.toMatchObject({
      name: "AppError",
      category: "provider_error",
      message: "Deploy task task-1 returned an empty or invalid response."
    } satisfies Partial<AppError>);
  });
});
