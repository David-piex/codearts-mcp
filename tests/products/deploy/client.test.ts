import { describe, expect, it } from "vitest";
import { AppError } from "../../../src/core/errors/app-error.js";
import { createDeployClient } from "../../../src/products/deploy/client.js";

function createClient(transport: Record<string, unknown>) {
  return createDeployClient(transport as never);
}

function createProjectInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
} & T {
  return {
    project_id: "project-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
  } & T;
}

function createProjectPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createApplicationInput<T extends Record<string, unknown>>(overrides?: T): {
  application_id: string;
} & T {
  return {
    application_id: "app-1",
    ...(overrides ?? {})
  } as {
    application_id: string;
  } & T;
}

function createApplicationProjectInput<T extends Record<string, unknown>>(overrides?: T): {
  application_id: string;
  project_id: string;
} & T {
  return {
    application_id: "app-1",
    project_id: "project-1",
    ...(overrides ?? {})
  } as {
    application_id: string;
    project_id: string;
  } & T;
}

function createApplicationProjectPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  application_id: string;
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    application_id: "app-1",
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    application_id: string;
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createGroupPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  group_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    group_id: "group-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    group_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createGroupInput<T extends Record<string, unknown>>(overrides?: T): {
  group_id: string;
} & T {
  return {
    group_id: "group-1",
    ...(overrides ?? {})
  } as {
    group_id: string;
  } & T;
}

function createEnvironmentPageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  application_id: string;
  environment_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    application_id: "app-1",
    environment_id: "env-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    application_id: string;
    environment_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createProjectAppInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  app_id: string;
} & T {
  return {
    project_id: "project-1",
    app_id: "app-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    app_id: string;
  } & T;
}

function createProjectLimitOffsetInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  limit: number;
  offset: number;
} & T {
  return {
    project_id: "project-1",
    limit: 20,
    offset: 0,
    ...(overrides ?? {})
  } as {
    project_id: string;
    limit: number;
    offset: number;
  } & T;
}

function createProjectAppLimitOffsetInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  app_id: string;
  limit: number;
  offset: number;
} & T {
  return {
    project_id: "project-1",
    app_id: "app-1",
    limit: 20,
    offset: 0,
    ...(overrides ?? {})
  } as {
    project_id: string;
    app_id: string;
    limit: number;
    offset: number;
  } & T;
}

function createProjectEnvironmentLimitOffsetInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  environment_id: string;
  limit: number;
  offset: number;
} & T {
  return {
    project_id: "project-1",
    environment_id: "env-1",
    limit: 20,
    offset: 0,
    ...(overrides ?? {})
  } as {
    project_id: string;
    environment_id: string;
    limit: number;
    offset: number;
  } & T;
}

function createProjectRecordInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  record_id: string;
} & T {
  return {
    project_id: "project-1",
    record_id: "rec-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    record_id: string;
  } & T;
}

function createProjectEnvironmentInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  environment_id: string;
} & T {
  return {
    project_id: "project-1",
    environment_id: "env-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    environment_id: string;
  } & T;
}

function createProjectClusterInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  cluster_id: string;
} & T {
  return {
    project_id: "project-1",
    cluster_id: "cluster-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    cluster_id: string;
  } & T;
}

function createProjectClusterHostInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  cluster_id: string;
  host_id: string;
} & T {
  return {
    project_id: "project-1",
    cluster_id: "cluster-1",
    host_id: "host-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    cluster_id: string;
    host_id: string;
  } & T;
}

function createApplicationRecordInput<T extends Record<string, unknown>>(overrides?: T): {
  application_id: string;
  record_id: string;
} & T {
  return {
    application_id: "app-1",
    record_id: "record-1",
    ...(overrides ?? {})
  } as {
    application_id: string;
    record_id: string;
  } & T;
}

function createTaskInput<T extends Record<string, unknown>>(overrides?: T): {
  task_id: string;
} & T {
  return {
    task_id: "task-1",
    ...(overrides ?? {})
  } as {
    task_id: string;
  } & T;
}

function createTaskRecordInput<T extends Record<string, unknown>>(overrides?: T): {
  task_id: string;
  record_id: string;
} & T {
  return {
    task_id: "task-1",
    record_id: "record-1",
    ...(overrides ?? {})
  } as {
    task_id: string;
    record_id: string;
  } & T;
}

describe("createDeployClient", () => {
  it("lists host groups available to an application", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [{ id: "group-1", name: "111", os: "linux", host_count: 1, env_count: 0 }],
          total: 1
        };
      }
    });

    const result = await client.listAppHostGroups(createApplicationProjectPageInput());

    expect(requestedPath).toContain(
      "/v1/applications/app-1/host-groups/base/infos?project_uuid=project-1&page_index=1&page_size=20"
    );
    expect(result.host_groups[0]).toEqual({
      group_id: "group-1",
      name: "111",
      project_id: undefined,
      os: "linux",
      host_count: 1,
      env_count: 0,
      description: undefined
    });
  });

  it("lists deploy host groups from the host group resource endpoint", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            {
              id: "group-1",
              name: "111",
              project_id: "project-1",
              os: "linux",
              host_count: 1,
              env_count: 0,
              nick_name: "readyrunning",
              is_proxy_mode: 0
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listHostGroups(createProjectPageInput());

    expect(requestedPath).toContain(
      "/v1/resources/host-groups?project_id=project-1&page_index=1&page_size=20"
    );
    expect(result).toEqual({
      host_groups: [
        {
          group_id: "group-1",
          name: "111",
          project_id: "project-1",
          os: "linux",
          host_count: 1,
          env_count: 0,
          description: undefined,
          nick_name: "readyrunning",
          is_proxy_mode: 0
        }
      ],
      total: 1
    });
  });

  it("gets deploy host group detail from the resource endpoint", async () => {
    const client = createClient({
      get: async () => ({
        result: {
          id: "group-1",
          name: "111",
          os: "linux",
          description: "",
          nick_name: "readyrunning",
          is_proxy_mode: 0,
          created_time: "2026-04-17 17:21:35",
          updated_time: "2026-04-17 17:21:35"
        }
      })
    });

    const result = await client.getHostGroup(createGroupInput());

    expect(result).toEqual({
      group_id: "group-1",
      name: "111",
      os: "linux",
      description: "",
      nick_name: "readyrunning",
      is_proxy_mode: 0,
      created_time: "2026-04-17 17:21:35",
      updated_time: "2026-04-17 17:21:35"
    });
  });

  it("lists hosts inside a deploy host group", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            {
              uuid: "host-1",
              host_name: "ecs-1",
              ip: "1.1.1.1",
              os: "linux",
              port: 22,
              as_proxy: false,
              connection_status: "success",
              connection_result: "ok",
              env_count: 0,
              lastest_connection_time: "2026-04-17 17:31:15"
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listHostGroupHosts({
      group_id: "group-1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toContain("/v1/resources/host-groups/group-1/hosts?page_index=2&page_size=10");
    expect(result.hosts[0]).toEqual({
      host_id: "host-1",
      host_name: "ecs-1",
      ip: "1.1.1.1",
      os: "linux",
      port: 22,
      as_proxy: false,
      connection_status: "success",
      connection_result: "ok",
      env_count: 0,
      lastest_connection_time: "2026-04-17 17:31:15"
    });
  });

  it("lists environments linked to a deploy host group", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            {
              id: "env-1",
              application_id: "app-1",
              application_name: "demo-app",
              name: "prod-env",
              os: "linux",
              host_count: 1
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listHostGroupEnvironments(createGroupPageInput());

    expect(requestedPath).toContain(
      "/v1/resources/host-groups/group-1/environments/infos?page_index=1&page_size=20"
    );
    expect(result.environments).toEqual([
      {
        environment_id: "env-1",
        application_id: "app-1",
        application_name: "demo-app",
        name: "prod-env",
        os: "linux",
        host_count: 1
      }
    ]);
  });

  it("creates a deploy environment from the application environments endpoint", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { id: "env-1" };
      }
    });

    const result = await client.createEnvironment(createApplicationProjectInput({
      name: "temp-env",
      os: "linux",
      deploy_type: 0,
      description: "test"
    }));

    expect(requestedPath).toBe("/v1/applications/app-1/environments");
    expect(requestedBody).toEqual({
      project_id: "project-1",
      name: "temp-env",
      os: "linux",
      deploy_type: 0,
      description: "test"
    });
    expect(result.environment_id).toBe("env-1");
  });

  it("lists hosts inside a deploy environment", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            {
              uuid: "host-1",
              host_name: "ecs-1",
              ip: "1.1.1.1",
              os: "linux",
              port: 22,
              connection_status: "success",
              connection_result: "ok"
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listEnvironmentHosts(createEnvironmentPageInput());

    expect(requestedPath).toContain("/v1/applications/app-1/environments/env-1/hosts?page_index=1&page_size=20");
    expect(result.hosts[0]).toEqual({
      host_id: "host-1",
      host_name: "ecs-1",
      ip: "1.1.1.1",
      os: "linux",
      port: 22,
      connection_status: "success",
      connection_result: "ok"
    });
  });

  it("imports hosts into a deploy environment", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "success" };
      }
    });

    const result = await client.importHostsToEnvironment({
      application_id: "app-1",
      environment_id: "env-1",
      group_id: "group-1",
      host_ids: ["host-1"]
    });

    expect(requestedPath).toBe("/v1/applications/app-1/environments/env-1/hosts/import");
    expect(requestedBody).toEqual({
      group_id: "group-1",
      host_ids: ["host-1"]
    });
    expect(result).toEqual({
      application_id: "app-1",
      environment_id: "env-1",
      group_id: "group-1",
      host_ids: ["host-1"],
      imported: true
    });
  });

  it("lists deploy environments from the application environments endpoint", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: [
            {
              id: "env-1",
              name: "prod-env",
              os_type: "linux",
              category: "host",
              host_count: 2
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listEnvironments(
      createApplicationProjectPageInput({
        page: 2
      })
    );

    expect(requestedPath).toContain(
      "/v1/applications/app-1/environments?project_id=project-1&page_index=2&page_size=20"
    );
    expect(result).toEqual({
      environments: [
        {
          environment_id: "env-1",
          name: "prod-env",
          os_type: "linux",
          category: "host",
          instance_count: 2
        }
      ],
      total: 1
    });
  });

  it("maps execution params list responses", async () => {
    const client = createClient({
      get: async () => [{ name: "service_port", type: "text", value: "8080" }]
    });

    const result = await client.getExecutionParams(createTaskRecordInput());

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      params: [{ name: "service_port", type: "text", value: "8080" }]
    });
  });

  it("maps app log responses with nested result", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            has_more: true,
            text: "[INFO] ok",
            offset: "0",
            end_offset: "42"
          },
          status: "success"
        };
      }
    });

    const result = await client.getAppLog(createApplicationRecordInput({
      offset: "0",
      end_offset: "0"
    }));

    expect(result).toEqual({
      application_id: "app-1",
      record_id: "record-1",
      status: "success",
      has_more: true,
      text: "[INFO] ok",
      offset: "0",
      end_offset: "42"
    });
    expect(requestedPath).toContain("/v1/applications/app-1/records/record-1/logs?");
  });

  it("passes optional step_id when loading app log", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return { status: "success" };
      }
    });

    await client.getAppLog(createApplicationRecordInput({
      step_id: "step-1",
      offset: "0",
      end_offset: "100"
    }));

    expect(requestedPath).toContain("step_id=step-1");
  });

  it("uses page and size when listing deploy applications", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body: unknown) => {
        requestedBody = body;
        return {
          applications: [{ application_id: "app-1", name: "gateway-prod" }],
          total_num: 1
        };
      }
    });

    const result = await client.listApps(
      createProjectPageInput({
        page: 2
      })
    );

    expect(requestedBody).toEqual({
      project_id: "project-1",
      page: 2,
      size: 20
    });
    expect(result.total).toBe(1);
  });

  it("ignores keyword when listing deploy applications because the live API rejects name filtering", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body: unknown) => {
        requestedBody = body;
        return {
          applications: [{ application_id: "app-1", name: "gateway-prod" }],
          total_num: 1
        };
      }
    });

    const result = await client.listApps(
      createProjectPageInput({
        keyword: "gateway"
      })
    );

    expect(requestedBody).toEqual({
      project_id: "project-1",
      page: 1,
      size: 20
    });
    expect(result.total).toBe(1);
  });

  it("maps deploy applications with disable and execution-state fields from the documented shape", async () => {
    const client = createClient({
      post: async () => ({
        result: [
          {
            id: "app-1",
            application_name: "gateway-prod",
            project_id: "project-1",
            deploy_type: "docker",
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
        total_num: 1
      })
    });

    const result = await client.listApps(createProjectPageInput());

    expect(result).toEqual({
      applications: [
        {
          application_id: "app-1",
          name: "gateway-prod",
          project_id: "project-1",
          deploy_type: "docker",
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
    });
  });

  it("uses page and size when listing deploy tasks", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          tasks: [{ task_id: "task-1", application_name: "gateway-prod" }],
          total_count: 1
        };
      }
    });

    const result = await client.listTasks(
      createProjectPageInput({
        page: 2
      })
    );

    expect(requestedPath).toContain("/v2/project-1/tasks/list?page=2&size=20");
    expect(result.total).toBe(1);
  });

  it("maps deploy task list from the documented name/state shape", async () => {
    const client = createClient({
      get: async () => ({
        result: [
          {
            id: "task-1",
            application_id: "app-1",
            name: "gateway-prod",
            project_id: "project-1",
            state: "Available",
            deploy_type: "docker"
          }
        ],
        total_num: 1
      })
    });

    const result = await client.listTasks(createProjectPageInput());

    expect(result).toEqual({
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
    });
  });

  it("maps deploy task permissions and execution state from the documented shape", async () => {
    const client = createClient({
      get: async () => ({
        result: [
          {
            id: "task-1",
            application_id: "app-1",
            name: "gateway-prod",
            project_id: "project-1",
            state: "Available",
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
        total_num: 1
      })
    });

    const result = await client.listTasks(createProjectPageInput());

    expect(result).toEqual({
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
    });
  });

  it("maps deploy application detail including can_disable", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            id: "app-1",
            application_name: "gateway-prod",
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
            arrange_infos: []
          }
        };
      }
    });

    const result = await client.getApp(createApplicationInput());

    expect(requestedPath).toBe("/v1/applications/app-1/info");
    expect(result).toEqual({
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
      arrange_infos: []
    });
  });

  it("prefers new execution params endpoint and falls back compatibly", async () => {
    const seen: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        seen.push(path);
        if (path.includes("/v2/history/tasks/")) {
          return [{ name: "service_port", type: "text", value: "8080" }];
        }

        throw new Error("unexpected fallback");
      }
    });

    const result = await client.getExecutionParams(createTaskRecordInput());

    expect(seen[0]).toContain("/v2/history/tasks/task-1/params?record_id=record-1");
    expect(result.params).toEqual([{ name: "service_port", type: "text", value: "8080" }]);
  });

  it("does not mask provider errors from the new execution params endpoint", async () => {
    const seen: string[] = [];
    const providerError = new AppError(
      "provider_error",
      "No execution record",
      "Deploy.00011303"
    );
    const client = createClient({
      get: async (path: string) => {
        seen.push(path);
        if (path.includes("/v2/history/tasks/")) {
          throw providerError;
        }

        throw new Error("unexpected fallback");
      }
    });

    await expect(
      client.getExecutionParams(createTaskRecordInput())
    ).rejects.toBe(providerError);
    expect(seen).toEqual(["/v2/history/tasks/task-1/params?record_id=record-1"]);
  });

  it("maps runtime variables responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          variables: [
            {
              name: "env",
              type: "host_group",
              value: "group-1",
              staticStatus: 0,
              is_dynamic: true
            }
          ]
        };
      }
    });

    const result = await client.getRuntimeVariables(createProjectInput());

    expect(requestedPath).toBe("/v4/projects/project-1/runtime-variables");
    expect(result).toEqual({
      project_id: "project-1",
      app_id: undefined,
      variables: [
        {
          name: "env",
          type: "host_group",
          value: "group-1",
          static_status: 0,
          is_dynamic: true
        }
      ],
      raw: {
        variables: [
          {
            name: "env",
            type: "host_group",
            value: "group-1",
            staticStatus: 0,
            is_dynamic: true
          }
        ]
      }
    });
  });

  it("passes app_id when reading runtime variables", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return { variables: [] };
      }
    });

    await client.getRuntimeVariables({
      project_id: "project-1",
      app_id: "app-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/runtime-variables?app_id=app-1");
  });

  it("maps runtime variables when provider wraps items under result", async () => {
    const client = createClient({
      get: async () => ({
        result: [
          {
            name: "APP_VERSION",
            type: "text",
            value: "1.2.3",
            staticStatus: 1,
            is_dynamic: false
          }
        ]
      })
    });

    const result = await client.getRuntimeVariables({
      project_id: "project-1",
      app_id: "app-1"
    });

    expect(result).toEqual({
      project_id: "project-1",
      app_id: "app-1",
      variables: [
        {
          name: "APP_VERSION",
          type: "text",
          value: "1.2.3",
          static_status: 1,
          is_dynamic: false
        }
      ],
      raw: {
        result: [
          {
            name: "APP_VERSION",
            type: "text",
            value: "1.2.3",
            staticStatus: 1,
            is_dynamic: false
          }
        ]
      }
    });
  });

  it("maps query variables responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          level: "env",
          variables: [
            {
              name: "region",
              type: "text",
              value: "cn-north-4",
              staticStatus: 1
            }
          ]
        };
      }
    });

    const result = await client.queryVariables({
      project_id: "project-1",
      level: "env",
      env_id: "env-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/variables/query?level=env&env_id=env-1");
    expect(result).toEqual({
      project_id: "project-1",
      level: "env",
      app_id: undefined,
      env_id: "env-1",
      variables: [
        {
          name: "region",
          type: "text",
          value: "cn-north-4",
          static_status: 1
        }
      ],
      raw: {
        level: "env",
        variables: [
          {
            name: "region",
            type: "text",
            value: "cn-north-4",
            staticStatus: 1
          }
        ]
      }
    });
  });

  it("maps query variables when provider wraps items under result", async () => {
    const client = createClient({
      get: async () => ({
        result: [
          {
            name: "region",
            type: "text",
            value: "cn-north-4",
            staticStatus: 1,
            is_dynamic: false
          }
        ]
      })
    });

    const result = await client.queryVariables({
      project_id: "project-1",
      level: "env",
      env_id: "env-1"
    });

    expect(result).toEqual({
      project_id: "project-1",
      level: "env",
      app_id: undefined,
      env_id: "env-1",
      variables: [
        {
          name: "region",
          type: "text",
          value: "cn-north-4",
          static_status: 1,
          is_dynamic: false
        }
      ],
      raw: {
        result: [
          {
            name: "region",
            type: "text",
            value: "cn-north-4",
            staticStatus: 1,
            is_dynamic: false
          }
        ]
      }
    });
  });

  it("maps variables list responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          variables: [
            {
              variable_id: "var-1",
              key: "region",
              type: "text",
              value: "cn-north-4",
              staticStatus: 1
            }
          ]
        };
      }
    });

    const result = await client.listVariables({
      project_id: "project-1",
      level: "env",
      env_id: "env-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/variables?level=env&env_id=env-1");
    expect(result).toEqual({
      project_id: "project-1",
      level: "env",
      app_id: undefined,
      env_id: "env-1",
      variables: [
        {
          id: "var-1",
          name: "region",
          type: "text",
          value: "cn-north-4",
          static_status: 1,
          is_dynamic: undefined
        }
      ],
      raw: {
        variables: [
          {
            variable_id: "var-1",
            key: "region",
            type: "text",
            value: "cn-north-4",
            staticStatus: 1
          }
        ]
      }
    });
  });

  it("maps variable history responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          histories: [
            {
              id: "hist-1",
              name: "region",
              type: "text",
              value: "cn-north-4",
              static_status: 1,
              createdAt: "2026-04-18T00:00:00Z",
              updatedAt: "2026-04-18T01:00:00Z"
            }
          ]
        };
      }
    });

    const result = await client.listVariableHistory({
      project_id: "project-1",
      level: "env",
      env_id: "env-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/variables/history?level=env&env_id=env-1");
    expect(result).toEqual({
      project_id: "project-1",
      level: "env",
      app_id: undefined,
      env_id: "env-1",
      histories: [
        {
          id: "hist-1",
          name: "region",
          type: "text",
          value: "cn-north-4",
          static_status: 1,
          is_dynamic: undefined,
          created_at: "2026-04-18T00:00:00Z",
          updated_at: "2026-04-18T01:00:00Z"
        }
      ],
      raw: {
        histories: [
          {
            id: "hist-1",
            name: "region",
            type: "text",
            value: "cn-north-4",
            static_status: 1,
            createdAt: "2026-04-18T00:00:00Z",
            updatedAt: "2026-04-18T01:00:00Z"
          }
        ]
      }
    });
  });

  it("maps deploy source detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          trigger_source: "1",
          artifact_source_system: "Artifact",
          artifact_type: "generic"
        };
      }
    });

    const result = await client.getDeploySourceDetail({ task_id: "task-1" });

    expect(requestedPath).toBe("/v2/task/trigger/detail?task_id=task-1");
    expect(result).toEqual({
      task_id: "task-1",
      trigger_source: "1",
      artifact_source_system: "Artifact",
      artifact_type: "generic"
    });
  });

  it("maps v4 applications list responses", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe("/v4/applications/list");
        requestedBody = body;
        return {
          total: 1,
          resources: [
            {
              id: "v4-app-1",
              name: "codex-v4-app",
              project_id: "project-1",
              description: "demo"
            }
          ]
        };
      }
    });

    const result = await client.listV4Applications(
      createProjectLimitOffsetInput({
        keyword: "codex"
      })
    );

    expect(requestedBody).toEqual({
      project_id: "project-1",
      limit: 20,
      offset: 0,
      keyword: "codex"
    });
    expect(result).toEqual({
      project_id: "project-1",
      total: 1,
      applications: [
        {
          app_id: "v4-app-1",
          name: "codex-v4-app",
          project_id: "project-1",
          description: "demo"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "v4-app-1",
            name: "codex-v4-app",
            project_id: "project-1",
            description: "demo"
          }
        ]
      }
    });
  });

  it("maps v4 environments list responses", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe("/v4/projects/project-1/environments/list");
        requestedBody = body;
        return {
          total: 1,
          resources: [
            {
              id: "env-v4-1",
              name: "prod",
              project_id: "project-1",
              os: "linux",
              description: "demo env"
            }
          ]
        };
      }
    });

    const result = await client.listV4Environments(createProjectLimitOffsetInput());

    expect(requestedBody).toEqual({
      limit: 20,
      offset: 0
    });
    expect(result).toEqual({
      project_id: "project-1",
      total: 1,
      environments: [
        {
          environment_id: "env-v4-1",
          name: "prod",
          project_id: "project-1",
          os: "linux",
          description: "demo env"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "env-v4-1",
            name: "prod",
            project_id: "project-1",
            os: "linux",
            description: "demo env"
          }
        ]
      }
    });
  });

  it("maps v4 environment applications responses", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe(
          "/v4/projects/project-1/environments/env-1/applications-list"
        );
        requestedBody = body;
        return {
          total: 1,
          resources: [
            {
              id: "v4-app-1",
              name: "demo-app",
              project_id: "project-1",
              description: "demo"
            }
          ]
        };
      }
    });

    const result = await client.listV4EnvironmentApplications(
      createProjectEnvironmentLimitOffsetInput()
    );

    expect(requestedBody).toEqual({
      limit: 20,
      offset: 0
    });
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      total: 1,
      applications: [
        {
          app_id: "v4-app-1",
          name: "demo-app",
          project_id: "project-1",
          description: "demo"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "v4-app-1",
            name: "demo-app",
            project_id: "project-1",
            description: "demo"
          }
        ]
      }
    });
  });

  it("maps deployment units responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return [
          {
            id: "du-1",
            environment_id: "env-1",
            environment_name: "prod",
            cluster_id: "cluster-1",
            cluster_name: "cce-1",
            namespace: "default"
          }
        ];
      }
    });

    const result = await client.listDeploymentUnits(createProjectAppInput());

    expect(requestedPath).toBe("/v4/projects/project-1/applications/app-1/deployment-units");
    expect(result).toEqual({
      project_id: "project-1",
      app_id: "app-1",
      deployment_units: [
        {
          id: "du-1",
          environment_id: "env-1",
          environment_name: "prod",
          cluster_id: "cluster-1",
          cluster_name: "cce-1",
          namespace: "default"
        }
      ],
      raw: [
        {
          id: "du-1",
          environment_id: "env-1",
          environment_name: "prod",
          cluster_id: "cluster-1",
          cluster_name: "cce-1",
          namespace: "default"
        }
      ]
    });
  });

  it("maps v4 orchestrations responses", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe("/v4/projects/project-1/orchestrations/list");
        requestedBody = body;
        return {
          total: 1,
          resources: [{ id: "orch-1", name: "demo", state: "Available", description: "x" }]
        };
      }
    });

    const result = await client.listV4Orchestrations(createProjectAppLimitOffsetInput());

    expect(requestedBody).toEqual({ app_id: "app-1", limit: 20, offset: 0 });
    expect(result.orchestrations).toEqual([
      { id: "orch-1", name: "demo", state: "Available", description: "x" }
    ]);
  });

  it("maps v4 deploy records responses", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe("/v4/projects/project-1/deploy-records");
        requestedBody = body;
        return {
          total: 1,
          resources: [
            { id: "rec-1", state: "success", orchestration_id: "orch-1", start_time: "a", end_time: "b" }
          ]
        };
      }
    });

    const result = await client.listV4DeployRecords(createProjectLimitOffsetInput());

    expect(requestedBody).toEqual({ limit: 20, offset: 0 });
    expect(result.records).toEqual([
      { id: "rec-1", state: "success", orchestration_id: "orch-1", start_time: "a", end_time: "b" }
    ]);
  });

  it("treats null v4 deploy records responses as empty", async () => {
    const client = createClient({
      post: async (path: string, body: unknown) => {
        expect(path).toBe("/v4/projects/project-1/deploy-records");
        expect(body).toEqual({ limit: 20, offset: 0 });
        return null;
      }
    });

    const result = await client.listV4DeployRecords(createProjectLimitOffsetInput());

    expect(result).toEqual({
      project_id: "project-1",
      total: undefined,
      records: [],
      raw: null
    });
  });

  it("maps last record detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {};
      }
    });

    const result = await client.getLastRecordDetail({
      project_id: "project-1",
      orchestration_id: "orch-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/orchestrations/orch-1/last-record-detail");
    expect(result).toEqual({
      project_id: "project-1",
      orchestration_id: "orch-1",
      raw: {}
    });
  });

  it("maps v4 deploy record detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {};
      }
    });

    const result = await client.getV4DeployRecord(
      createProjectRecordInput({
        step_id: "step-1"
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1?step_id=step-1");
    expect(result).toEqual({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "step-1",
      raw: {}
    });
  });

  it("maps v4 deploy record step detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {};
      }
    });

    const result = await client.getV4DeployRecordStepDetail(createProjectRecordInput());

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1/step-detail");
    expect(result).toEqual({
      project_id: "project-1",
      record_id: "rec-1",
      raw: {}
    });
  });

  it("maps v4 deploy record step logs responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {};
      }
    });

    const result = await client.getV4DeployRecordStepLogs(
      createProjectRecordInput({
        step_id: "11111111111111111111111111111111",
        offset: 128,
        limit: 200,
        start_time: "2026-04-25T00:00:00Z",
        end_time: "2026-04-25T01:00:00Z",
        body: { keyword: "deploy" }
      })
    );

    expect(requestedPath).toBe(
      "/v4/projects/project-1/deploy-records/rec-1/step/11111111111111111111111111111111/logs"
    );
    expect(requestedBody).toEqual({
      keyword: "deploy",
      offset: 128,
      limit: 200,
      start_time: "2026-04-25T00:00:00Z",
      end_time: "2026-04-25T01:00:00Z"
    });
    expect(result).toEqual({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "11111111111111111111111111111111",
      raw: {}
    });
  });

  it("maps v4 clusters responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          total: 1,
          resources: [
            {
              id: "cluster-1",
              name: "111",
              cluster_type: "host",
              description: "demo"
            }
          ]
        };
      }
    });

    const result = await client.listV4Clusters({
      project_id: "project-1",
      cluster_type: "host",
      body: {}
    });

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/list");
    expect(requestedBody).toEqual({
      cluster_type: "host"
    });
    expect(result).toEqual({
      project_id: "project-1",
      cluster_type: "host",
      total: 1,
      clusters: [
        {
          cluster_id: "cluster-1",
          name: "111",
          cluster_type: "host",
          description: "demo"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "cluster-1",
            name: "111",
            cluster_type: "host",
            description: "demo"
          }
        ]
      }
    });
  });

  it("maps v4 cluster detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "cluster-1",
          name: "111",
          cluster_type: "host",
          description: "demo"
        };
      }
    });

    const result = await client.getV4Cluster(
      createProjectClusterInput({
        cluster_type: "host"
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/cluster-1?cluster_type=host");
    expect(result).toEqual({
      project_id: "project-1",
      cluster_id: "cluster-1",
      cluster_type: "host",
      cluster: {
        cluster_id: "cluster-1",
        name: "111",
        cluster_type: "host",
        description: "demo"
      },
      raw: {
        id: "cluster-1",
        name: "111",
        cluster_type: "host",
        description: "demo"
      }
    });
  });

  it("maps v4 cluster hosts responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          total: 1,
          resources: [
            {
              id: "host-1",
              name: "ecs-1",
              ip: "1.1.1.1",
              os: "linux",
              connection_status: "online"
            }
          ]
        };
      }
    });

    const result = await client.listV4ClusterHosts(
      createProjectClusterInput({
        limit: 10,
        offset: 0,
        ip: "10.0.0.1",
        os: "linux",
        connection_status: "online",
        body: { name: "ecs" }
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/cluster-1/hosts/list");
    expect(requestedBody).toEqual({
      name: "ecs",
      limit: 10,
      offset: 0,
      ip: "10.0.0.1",
      os: "linux",
      connection_status: "online"
    });
    expect(result).toEqual({
      project_id: "project-1",
      cluster_id: "cluster-1",
      total: 1,
      hosts: [
        {
          host_id: "host-1",
          name: "ecs-1",
          ip: "1.1.1.1",
          os: "linux",
          connection_status: "online"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "host-1",
            name: "ecs-1",
            ip: "1.1.1.1",
            os: "linux",
            connection_status: "online"
          }
        ]
      }
    });
  });

  it("maps v4 cluster host detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "host-1",
          name: "ecs-1",
          ip: "1.1.1.1",
          os: "linux",
          connection_status: "online"
        };
      }
    });

    const result = await client.getV4ClusterHost(createProjectClusterHostInput());

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/cluster-1/hosts/host-1");
    expect(result).toEqual({
      project_id: "project-1",
      cluster_id: "cluster-1",
      host_id: "host-1",
      host: {
        host_id: "host-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        connection_status: "online"
      },
      raw: {
        id: "host-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        connection_status: "online"
      }
    });
  });

  it("maps v4 environment hosts responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 1,
          resources: [
            {
              id: "host-1",
              name: "ecs-1",
              ip: "1.1.1.1",
              os: "linux",
              connection_status: "online"
            }
          ]
        };
      }
    });

    const result = await client.listV4EnvironmentHosts(
      createProjectEnvironmentInput({
        query: {
          offset: 0,
          limit: 20
        }
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/environments/env-1/hosts?offset=0&limit=20");
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      total: 1,
      hosts: [
        {
          host_id: "host-1",
          name: "ecs-1",
          ip: "1.1.1.1",
          os: "linux",
          connection_status: "online"
        }
      ],
      raw: {
        total: 1,
        resources: [
          {
            id: "host-1",
            name: "ecs-1",
            ip: "1.1.1.1",
            os: "linux",
            connection_status: "online"
          }
        ]
      }
    });
  });

  it("maps v4 cluster count responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          ecs: 2,
          third_party: 1
        };
      }
    });

    const result = await client.getV4ClusterCount({
      project_id: "project-1",
      cluster_type: "host"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/count?cluster_type=host");
    expect(result).toEqual({
      project_id: "project-1",
      cluster_type: "host",
      counts: {
        ecs: 2,
        third_party: 1
      },
      raw: {
        ecs: 2,
        third_party: 1
      }
    });
  });

  it("maps v4 environment detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "env-1",
          name: "prod",
          description: "demo"
        };
      }
    });

    const result = await client.getV4Environment(createProjectEnvironmentInput());

    expect(requestedPath).toBe("/v4/projects/project-1/environments/env-1");
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      environment: {
        environment_id: "env-1",
        name: "prod",
        description: "demo"
      },
      raw: {
        id: "env-1",
        name: "prod",
        description: "demo"
      }
    });
  });

  it("maps v4 environment resource detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          host_num: 2,
          cluster_num: 1
        };
      }
    });

    const result = await client.getV4EnvironmentResourceDetail(createProjectEnvironmentInput());

    expect(requestedPath).toBe("/v4/projects/project-1/environments/env-1/resource-detail");
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      raw: {
        host_num: 2,
        cluster_num: 1
      }
    });
  });

  it("maps add environment hosts responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "success" };
      }
    });

    const result = await client.addV4EnvironmentHosts(
      createProjectEnvironmentInput({
        cluster_id: "cluster-1",
        host_ids: ["host-1"]
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/environments/env-1/hosts");
    expect(requestedBody).toEqual({
      cluster_id: "cluster-1",
      host_ids: ["host-1"]
    });
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      cluster_id: "cluster-1",
      host_ids: ["host-1"],
      status: "success",
      raw: { status: "success" }
    });
  });

  it("maps delete environment hosts responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      delete: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "success" };
      }
    });

    const result = await client.deleteV4EnvironmentHosts(
      createProjectEnvironmentInput({
        host_ids: ["host-1"]
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/environments/env-1/hosts");
    expect(requestedBody).toEqual(["host-1"]);
    expect(result).toEqual({
      project_id: "project-1",
      environment_id: "env-1",
      host_ids: ["host-1"],
      status: "success",
      raw: { status: "success" }
    });
  });

  it("maps delete v4 cluster hosts responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      delete: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "success" };
      }
    });

    const result = await client.deleteV4ClusterHosts(
      createProjectClusterInput({
        host_ids: ["host-1"]
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/clusters/cluster-1/hosts/batch-delete");
    expect(requestedBody).toEqual(["host-1"]);
    expect(result).toEqual({
      project_id: "project-1",
      cluster_id: "cluster-1",
      host_ids: ["host-1"],
      status: "success",
      raw: { status: "success" }
    });
  });

  it("maps cancel v4 deploy record responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return { status: "canceled" };
      }
    });

    const result = await client.cancelV4DeployRecord(
      createProjectRecordInput({
        body: {}
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1/cancel");
    expect(requestedBody).toEqual({});
    expect(result).toEqual({
      project_id: "project-1",
      record_id: "rec-1",
      status: "canceled",
      raw: { status: "canceled" }
    });
  });

  it("maps rerun v4 deploy record responses", async () => {
    let requestedPath = "";
    const client = createClient({
      post: async (path: string) => {
        requestedPath = path;
        return { status: "rerun" };
      }
    });

    const result = await client.rerunV4DeployRecord(
      createProjectRecordInput({
        body: {}
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1/rerun");
    expect(result.status).toBe("rerun");
  });

  it("maps retry v4 deploy record responses", async () => {
    let requestedPath = "";
    const client = createClient({
      post: async (path: string) => {
        requestedPath = path;
        return { status: "retry" };
      }
    });

    const result = await client.retryV4DeployRecord(
      createProjectRecordInput({
        body: {}
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1/retry");
    expect(result.status).toBe("retry");
  });

  it("maps rollback v4 deploy record responses", async () => {
    let requestedPath = "";
    const client = createClient({
      post: async (path: string) => {
        requestedPath = path;
        return { status: "rollback" };
      }
    });

    const result = await client.rollbackV4DeployRecord(
      createProjectRecordInput({
        body: {}
      })
    );

    expect(requestedPath).toBe("/v4/projects/project-1/deploy-records/rec-1/rollback");
    expect(result.status).toBe("rollback");
  });

  it("maps pass manual check responses", async () => {
    let requestedPath = "";
    const client = createClient({
      post: async (path: string) => {
        requestedPath = path;
        return { status: "passed" };
      }
    });

    const result = await client.passV4ManualCheck(
      createProjectRecordInput({
        step_id: "11111111111111111111111111111111"
      })
    );

    expect(requestedPath).toBe(
      "/v4/projects/project-1/deploy-records/rec-1/step/11111111111111111111111111111111/pass"
    );
    expect(result.status).toBe("passed");
  });

  it("maps refuse manual check responses", async () => {
    let requestedPath = "";
    const client = createClient({
      post: async (path: string) => {
        requestedPath = path;
        return { status: "refused" };
      }
    });

    const result = await client.refuseV4ManualCheck(
      createProjectRecordInput({
        step_id: "11111111111111111111111111111111"
      })
    );

    expect(requestedPath).toBe(
      "/v4/projects/project-1/deploy-records/rec-1/step/11111111111111111111111111111111/refuse"
    );
    expect(result.status).toBe("refused");
  });

  it("prefers new histories endpoint when date filters are provided", async () => {
    const seen: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        seen.push(path);
        return {
          result: [
            {
              execution_id: "record-1",
              task_id: "task-1",
              operator_name: "yao",
              state: "success"
            }
          ],
          total_num: 1
        };
      }
    });

    const result = await client.listHistories({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20,
      start_date: "2026-04-01",
      end_date: "2026-04-16"
    });

    expect(seen[0]).toContain("/v2/project-1/task/task-1/history?page=1&size=20");
    expect(seen[0]).toContain("start_date=2026-04-01");
    expect(seen[0]).toContain("end_date=2026-04-16");
    expect(result.histories).toEqual([
      {
        id: "record-1",
        task_id: "task-1",
        operator_name: "yao",
        status: "success"
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("requires start_date and end_date when listing histories", async () => {
    const client = createClient({
      get: async (path: string) => {
        throw new Error(`unexpected request: ${path}`);
      }
    });

    await expect(
      client.listHistories({
        project_id: "project-1",
        task_id: "task-1",
        page: 2,
        page_size: 20
      })
    ).rejects.toEqual(
      new AppError(
        "validation_error",
        "Deploy history queries require both start_date and end_date."
      )
    );
  });

  it("passes optional date filters when listing histories", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: [], total_num: 0 };
      }
    });

    await client.listHistories({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20,
      start_date: "2026-04-01",
      end_date: "2026-04-16"
    });

    expect(requestedPath).toContain("start_date=2026-04-01");
    expect(requestedPath).toContain("end_date=2026-04-16");
  });

  it("passes record_id when loading deploy status", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            status: "RUNNING",
            elapsed_time: 50,
            step_state: [{ name: "deploy" }]
          }
        };
      }
    });

    const result = await client.getStatus(createTaskRecordInput());

    expect(requestedPath).toContain("/v2/tasks/task-1/state?record_id=record-1");
    expect(result.state).toBe("RUNNING");
    expect(result.elapsed_time).toBe(50);
    expect(result.step_states).toEqual([{ name: "deploy" }]);
  });

  it("preserves richer live step-state fields when loading deploy status", async () => {
    const client = createClient({
      get: async () => ({
        task_id: "task-1",
        status: "initial",
        elapsed_time: 0,
        step_state: [
          {
            name: "瀹夎Node.js",
            region: "cn-north-4",
            id: 0,
            offset: 0,
            current_offset: 0,
            elapsed_time: 0,
            enable: true,
            faq_url: "https://support.huaweicloud.com/example"
          }
        ]
      })
    });

    const result = await client.getStatus(createTaskInput());

    expect(result).toEqual({
      task_id: "task-1",
      state: "initial",
      percentage: undefined,
      elapsed_time: 0,
      step_states: [
        {
          name: "瀹夎Node.js",
          region: "cn-north-4",
          id: 0,
          offset: 0,
          current_offset: 0,
          elapsed_time: 0,
          enable: true,
          faq_url: "https://support.huaweicloud.com/example"
        }
      ]
    });
  });

  it("accepts the documented step_states field when loading deploy status", async () => {
    const client = createClient({
      get: async () => ({
        result: {
          task_id: "task-1",
          state: "running",
          percentage: 80,
          elapsed_time: 12,
          step_states: [
            {
              name: "deploy",
              status: "running",
              region: "cn-north-4"
            }
          ]
        }
      })
    });

    const result = await client.getStatus(createTaskInput());

    expect(result).toEqual({
      task_id: "task-1",
      state: "running",
      percentage: 80,
      elapsed_time: 12,
      step_states: [
        {
          name: "deploy",
          status: "running",
          region: "cn-north-4"
        }
      ]
    });
  });

  it("maps history detail from the documented state response shape", async () => {
    const client = createClient({
      get: async () => ({
        status: "success",
        result: {
          record_id: "record-1",
          task_id: "task-1",
          nick_name: "creator",
          status: "succeeded",
          step: "finish",
          start_time: "2025-07-09 11:36:28",
          end_time: "2025-07-09 11:36:43",
          executor: "deployer",
          task_name: "demo-task",
          step_state: [
            {
              name: "瀹夎Node.js",
              region: "cn-north-4",
              elapsed_time: 1200,
              enable: true
            }
          ]
        }
      })
    });

    const result = await client.getHistoryDetail(createTaskRecordInput());

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      state: "succeeded",
      percentage: undefined,
      operator_name: "deployer",
      start_time: "2025-07-09 11:36:28",
      end_time: "2025-07-09 11:36:43",
      step_states: [
        {
          name: "瀹夎Node.js",
          region: "cn-north-4",
          elapsed_time: 1200,
          enable: true
        }
      ]
    });
  });

  it("sends an empty object body when starting a deploy task", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            task_id: "task-1",
            job_id: "job-1",
            status: "RUNNING"
          }
        };
      }
    });

    const result = await client.startApp(createTaskInput());

    expect(requestedPath).toBe("/v2/tasks/task-1/start");
    expect(requestedBody).toEqual({});
    expect(result).toEqual({
      task_id: "task-1",
      record_id: undefined,
      job_name: "job-1",
      status: "RUNNING",
      app_component_list: undefined
    });
  });

  it("passes params and trigger_source when starting a deploy task", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          id: "record-1",
          task_id: "task-1",
          job_name: "demo-task",
          app_component_list: [],
          status: "RUNNING"
        };
      }
    });

    const result = await client.startApp(createTaskInput({
      trigger_source: 1,
      params: [
        {
          name: "CODEARTS_ARTIFACT_APPLICATION",
          type: "text",
          value: "codearts-mcp.tar.gz"
        }
      ]
    }));

    expect(requestedPath).toBe("/v2/tasks/task-1/start");
    expect(requestedBody).toEqual({
      params: [
        {
          key: "CODEARTS_ARTIFACT_APPLICATION",
          type: "text",
          value: "codearts-mcp.tar.gz"
        }
      ],
      trigger_source: 1
    });
    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      job_name: "demo-task",
      status: "RUNNING",
      app_component_list: []
    });
  });

  it("maps record_id when the start response uses record_id instead of id", async () => {
    const client = createClient({
      post: async () => ({
        result: {
          task_id: "task-1",
          record_id: "record-1",
          job_name: "demo-task",
          status: "RUNNING",
          app_component_list: []
        }
      })
    });

    const result = await client.startApp(createTaskInput({
      trigger_source: "1"
    }));

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      job_name: "demo-task",
      status: "RUNNING",
      app_component_list: []
    });
  });

  it("creates a deploy task from a template", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          task_name: "Deploytest",
          task_id: "140ca97e701d4c4c93c59ffd5bdb32ec"
        };
      }
    });

    const result = await client.createTaskByTemplate({
      project_id: "6039d4480efc4dddb178abff98719913",
      project_name: "Deploy",
      template_id: "6efb0b24e2e9489eb0e53ee12904a19e",
      task_name: "Deploytest",
        configs: [
          {
            name: "serviceName",
            type: "text",
            value: "SpringBoot-Demo"
          },
          {
            name: "deployEnv",
            type: "enum",
            description: "runtime env selector",
            value: "prod",
            static_status: 0,
            limits: [{ name: "dev" }, { name: "prod" }]
          }
        ]
      });

    expect(requestedPath).toBe("/v2/tasks/template-task");
    expect(requestedBody).toEqual({
      project_id: "6039d4480efc4dddb178abff98719913",
      project_name: "Deploy",
      template_id: "6efb0b24e2e9489eb0e53ee12904a19e",
      task_name: "Deploytest",
      configs: [
        {
          name: "serviceName",
          type: "text",
          value: "SpringBoot-Demo"
        },
        {
          name: "deployEnv",
          type: "enum",
          description: "runtime env selector",
          value: "prod",
          static_status: 0,
          limits: [{ name: "dev" }, { name: "prod" }]
        }
      ]
    });
    expect(result).toEqual({
      task_name: "Deploytest",
      task_id: "140ca97e701d4c4c93c59ffd5bdb32ec"
    });
  });

  it("lists deploy system configs from the v3 endpoint", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return [
          {
            name: "CODEARTS_ARTIFACT_FILE",
            type: "text",
            description: "Top-level directory in the deployment source release repository",
            static_status: false,
            pipeline_source: "Artifact",
            pipeline_source_type: "generic"
          }
        ];
      }
    });

    const result = await client.listSystemConfigs();

    expect(requestedPath).toBe("/v3/system/configs");
    expect(result).toEqual({
      configs: [
        {
          name: "CODEARTS_ARTIFACT_FILE",
          type: "text",
          description: "Top-level directory in the deployment source release repository",
          static_status: false,
          pipeline_source: "Artifact",
          pipeline_source_type: "generic"
        }
      ]
    });
  });

  it("uses the start endpoint with record_id body when rolling back a deploy task", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            task_id: "task-1",
            job_id: "job-2",
            status: "RUNNING"
          }
        };
      }
    });

    const result = await client.rollbackApp(createTaskRecordInput());

    expect(requestedPath).toBe("/v2/tasks/task-1/start");
    expect(requestedBody).toEqual({
      record_id: "record-1"
    });
    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      status: "RUNNING"
    });
  });

  it("maps rollback record id when the rollback response uses id instead of record_id", async () => {
    const client = createClient({
      post: async () => ({
        result: {
          task_id: "task-1",
          id: "record-2",
          status: "RUNNING"
        }
      })
    });

    const result = await client.rollbackApp(createTaskRecordInput());

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-2",
      status: "RUNNING"
    });
  });

  it("maps stop record id when the stop response uses id instead of record_id", async () => {
    const client = createClient({
      put: async () => ({
        result: {
          task_id: "task-1",
          id: "record-1",
          status: "STOPPED"
        }
      })
    });

    const result = await client.stopApp(createTaskRecordInput());

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      status: "STOPPED"
    });
  });
});


