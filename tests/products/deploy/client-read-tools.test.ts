import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

function createClient(transport: Record<string, unknown>) {
  return createDeployClient(transport as never);
}

describe("createDeployClient read-only Deploy endpoints", () => {
  it("lists v2 host groups with optional query values", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [{ id: "group-1", name: "prod", project_id: "project-1" }],
          total: 1
        };
      }
    });

    const result = await client.listHostGroupsV2({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      keyword: "prod",
      query: { os: "linux" }
    });

    expect(requestedPath).toBe("/v2/host-groups?page_index=1&page_size=20&project_id=project-1&name=prod&os=linux");
    expect(result.host_groups[0]).toEqual({
      id: "group-1",
      group_id: "group-1",
      name: "prod",
      project_id: "project-1"
    });
    expect(result.total).toBe(1);
  });

  it("gets v2 host group detail", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: { id: "group-1", name: "prod" } };
      }
    });

    const result = await client.getHostGroupV2({ group_id: "group-1" });

    expect(requestedPath).toBe("/v2/host-groups/group-1");
    expect(result.group_id).toBe("group-1");
    expect(result.name).toBe("prod");
  });

  it("lists v2 host group hosts", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: [{ uuid: "host-1", host_name: "ecs-1", ip: "1.1.1.1" }], total_num: 1 };
      }
    });

    const result = await client.listHostGroupHostsV2({
      group_id: "group-1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v2/host-groups/group-1/hosts?page_index=2&page_size=10");
    expect(result.hosts[0]?.host_id).toBe("host-1");
    expect(result.total).toBe(1);
  });

  it("gets v1 and v2 host group host details", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        return { result: { uuid: "host-1", host_name: "ecs-1", ip: "1.1.1.1" } };
      }
    });

    const v1 = await client.getHostGroupHost({ group_id: "group-1", host_id: "host-1" });
    const v2 = await client.getHostGroupHostV2({ group_id: "group-1", host_id: "host-1" });

    expect(paths).toEqual([
      "/v1/resources/host-groups/group-1/hosts/host-1",
      "/v2/host-groups/group-1/hosts/host-1"
    ]);
    expect(v1.host_id).toBe("host-1");
    expect(v2.host_id).toBe("host-1");
  });

  it("gets host group and environment permissions", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        return { status: "success", result: [{ role_id: "0", can_view: true }] };
      }
    });

    const hostGroup = await client.getHostGroupPermissions({ group_id: "group-1" });
    const environment = await client.getEnvironmentPermissions({
      application_id: "app-1",
      environment_id: "env-1"
    });

    expect(paths).toEqual([
      "/v2/host-groups/group-1/permissions",
      "/v2/applications/app-1/environments/env-1/permissions"
    ]);
    expect(hostGroup.permissions[0]?.can_view).toBe(true);
    expect(environment.permissions[0]?.can_view).toBe(true);
  });

  it("gets application messages and groups", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        return { status: "success", result: [{ id: "item-1", name: "item" }] };
      }
    });

    const messages = await client.getApplicationMessages({
      project_id: "project-1",
      app_id: "app-1",
      query: { type: "notice" }
    });
    const groups = await client.listApplicationGroups({ project_id: "project-1" });

    expect(paths).toEqual([
      "/v2/projects/project-1/applications/app-1/messages?type=notice",
      "/v1/projects/project-1/applications/groups"
    ]);
    expect(messages.messages[0]?.id).toBe("item-1");
    expect(groups.groups[0]?.id).toBe("item-1");
  });

  it("gets success rate metrics", async () => {
    const requests: Array<{ path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push({ path });
        return { status: "success", result: { success_rate: 95 } };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        return { status: "success", result: { success_rate: 80 } };
      }
    });

    const projectMetrics = await client.getSuccessRateMetrics({
      project_id: "project-1",
      query: { start_time: "2026-05-01" }
    });
    const taskMetrics = await client.getTaskSuccessRateMetrics({
      project_id: "project-1",
      body: { task_ids: ["task-1"] }
    });

    expect(requests).toEqual([
      { path: "/v2/project-1/metrics/success-rate?start_time=2026-05-01" },
      { path: "/v2/project-1/tasks/metrics/success-rate", body: { task_ids: ["task-1"] } }
    ]);
    expect(projectMetrics.metrics.success_rate).toBe(95);
    expect(taskMetrics.metrics.success_rate).toBe(80);
  });

  it("gets application environment detail", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: {
            id: "env-1",
            name: "prod",
            description: "demo",
            os: "linux",
            project_id: "project-1",
            nick_name: "alice"
          }
        };
      }
    });

    const result = await client.getApplicationEnvironment({
      application_id: "app-1",
      environment_id: "env-1"
    });

    expect(requestedPath).toBe("/v1/applications/app-1/environments/env-1");
    expect(result).toEqual({
      application_id: "app-1",
      environment_id: "env-1",
      environment: {
        id: "env-1",
        name: "prod",
        description: "demo",
        os: "linux",
        project_id: "project-1",
        nick_name: "alice",
        deploy_type: undefined,
        instance_count: undefined,
        created_time: undefined,
        created_by: undefined,
        permission: undefined
      },
      status: "success",
      raw: {
        id: "env-1",
        name: "prod",
        description: "demo",
        os: "linux",
        project_id: "project-1",
        nick_name: "alice"
      }
    });
  });
});
