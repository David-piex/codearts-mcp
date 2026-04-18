import { describe, expect, it } from "vitest";
import { createDeployGetHostGroupHandler } from "../../../../src/products/deploy/tools/get-host-group.js";
import { createDeployListHostGroupEnvironmentsHandler } from "../../../../src/products/deploy/tools/list-host-group-environments.js";
import { createDeployListHostGroupHostsHandler } from "../../../../src/products/deploy/tools/list-host-group-hosts.js";
import { createDeployListHostGroupsHandler } from "../../../../src/products/deploy/tools/list-host-groups.js";

describe("deploy host group handlers", () => {
  it("maps deploy host groups into MCP output", async () => {
    const handler = createDeployListHostGroupsHandler({
      listHostGroups: async () => ({
        host_groups: [
          {
            group_id: "group-1",
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
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 deploy host groups found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "group-1",
        name: "111",
        projectId: "project-1",
        os: "linux",
        hostCount: 1,
        environmentCount: 0,
        description: undefined,
        ownerNickname: "readyrunning",
        proxyMode: false
      }
    ]);
  });

  it("falls back to requested project_id for host group items", async () => {
    const handler = createDeployListHostGroupsHandler({
      listHostGroups: async () => ({
        host_groups: [
          {
            group_id: "group-2",
            name: "222",
            os: "linux",
            host_count: 2,
            env_count: 1
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "group-2",
        name: "222",
        projectId: "project-1",
        os: "linux",
        hostCount: 2,
        environmentCount: 1,
        description: undefined,
        ownerNickname: undefined,
        proxyMode: false
      }
    ]);
  });

  it("maps deploy host group detail into MCP output", async () => {
    const handler = createDeployGetHostGroupHandler({
      getHostGroup: async () => ({
        group_id: "group-1",
        name: "111",
        os: "linux",
        description: "",
        nick_name: "readyrunning",
        is_proxy_mode: 0,
        created_time: "2026-04-17 17:21:35",
        updated_time: "2026-04-17 17:21:35"
      })
    });

    const result = await handler({ group_id: "group-1" });

    expect(result.structuredContent.item).toEqual({
      id: "group-1",
      name: "111",
      os: "linux",
      description: "",
      ownerNickname: "readyrunning",
      proxyMode: false,
      createdTime: "2026-04-17 17:21:35",
      updatedTime: "2026-04-17 17:21:35"
    });
  });

  it("maps deploy host group hosts into MCP output", async () => {
    const handler = createDeployListHostGroupHostsHandler({
      listHostGroupHosts: async () => ({
        hosts: [
          {
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
          }
        ],
        total: 1
      })
    });

    const result = await handler({ group_id: "group-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "host-1",
        groupId: "group-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        port: 22,
        asProxy: false,
        connectionStatus: "success",
        connectionResult: "ok",
        environmentCount: 0,
        latestConnectionTime: "2026-04-17 17:31:15"
      }
    ]);
  });

  it("maps deploy host group environments into MCP output", async () => {
    const handler = createDeployListHostGroupEnvironmentsHandler({
      listHostGroupEnvironments: async () => ({
        environments: [
          {
            environment_id: "env-1",
            application_id: "app-1",
            application_name: "demo-app",
            name: "prod-env",
            os: "linux",
            host_count: 1
          }
        ],
        total: 1
      })
    });

    const result = await handler({ group_id: "group-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "env-1",
        groupId: "group-1",
        name: "prod-env",
        applicationId: "app-1",
        applicationName: "demo-app",
        os: "linux",
        hostCount: 1
      }
    ]);
  });
});
