import { describe, expect, it } from "vitest";
import { createDeployGetApplicationMessagesHandler } from "../../../../src/products/deploy/tools/get-application-messages.js";
import { createDeployGetEnvironmentPermissionsHandler } from "../../../../src/products/deploy/tools/get-environment-permissions.js";
import { createDeployGetHostGroupHostHandler } from "../../../../src/products/deploy/tools/get-host-group-host.js";
import { createDeployGetHostGroupHostV2Handler } from "../../../../src/products/deploy/tools/get-host-group-host-v2.js";
import { createDeployGetHostGroupPermissionsHandler } from "../../../../src/products/deploy/tools/get-host-group-permissions.js";
import { createDeployGetHostGroupV2Handler } from "../../../../src/products/deploy/tools/get-host-group-v2.js";
import { createDeployGetSuccessRateMetricsHandler } from "../../../../src/products/deploy/tools/get-success-rate-metrics.js";
import { createDeployGetTaskSuccessRateMetricsHandler } from "../../../../src/products/deploy/tools/get-task-success-rate-metrics.js";
import { createDeployListApplicationGroupsHandler } from "../../../../src/products/deploy/tools/list-application-groups.js";
import { createDeployListHostGroupHostsV2Handler } from "../../../../src/products/deploy/tools/list-host-group-hosts-v2.js";
import { createDeployListHostGroupsV2Handler } from "../../../../src/products/deploy/tools/list-host-groups-v2.js";

describe("Deploy read-only dedicated tools", () => {
  it("maps v2 host groups", async () => {
    const handler = createDeployListHostGroupsV2Handler({
      listHostGroupsV2: async () => ({
        host_groups: [{ group_id: "group-1", name: "prod", project_id: "project-1" }],
        total: 1,
        raw: [{ group_id: "group-1" }]
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("1 deploy v2 host groups found");
    expect(result.structuredContent.items?.[0]?.id).toBe("group-1");
  });

  it("maps v2 host group detail", async () => {
    const handler = createDeployGetHostGroupV2Handler({
      getHostGroupV2: async () => ({ group_id: "group-1", name: "prod", raw: { id: "group-1" } })
    });

    const result = await handler({ group_id: "group-1" });

    expect(result.structuredContent.item?.id).toBe("group-1");
    expect(result.structuredContent.item?.raw).toEqual({ id: "group-1" });
  });

  it("maps v2 host group hosts", async () => {
    const handler = createDeployListHostGroupHostsV2Handler({
      listHostGroupHostsV2: async () => ({
        group_id: "group-1",
        hosts: [{ host_id: "host-1", host_name: "ecs-1", ip: "1.1.1.1" }],
        total: 1,
        raw: [{ host_id: "host-1" }]
      })
    });

    const result = await handler({ group_id: "group-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "host-1",
      groupId: "group-1",
      name: "ecs-1",
      ip: "1.1.1.1",
      host: { host_id: "host-1", host_name: "ecs-1", ip: "1.1.1.1" }
    });
  });

  it("maps host detail tools", async () => {
    const v1 = createDeployGetHostGroupHostHandler({
      getHostGroupHost: async () => ({
        group_id: "group-1",
        host_id: "host-1",
        host_name: "ecs-1",
        raw: { uuid: "host-1" }
      })
    });
    const v2 = createDeployGetHostGroupHostV2Handler({
      getHostGroupHostV2: async () => ({
        group_id: "group-1",
        host_id: "host-1",
        host_name: "ecs-1",
        raw: { uuid: "host-1" }
      })
    });

    expect((await v1({ group_id: "group-1", host_id: "host-1" })).structuredContent.item?.id).toBe("host-1");
    expect((await v2({ group_id: "group-1", host_id: "host-1" })).structuredContent.item?.id).toBe("host-1");
  });

  it("maps permission tools", async () => {
    const hostGroup = createDeployGetHostGroupPermissionsHandler({
      getHostGroupPermissions: async () => ({
        group_id: "group-1",
        permissions: [{ role_id: "0", can_view: true }],
        status: "success",
        raw: [{ role_id: "0", can_view: true }]
      })
    });
    const environment = createDeployGetEnvironmentPermissionsHandler({
      getEnvironmentPermissions: async () => ({
        application_id: "app-1",
        environment_id: "env-1",
        permissions: [{ role_id: "1", can_execute: true }],
        status: "success",
        raw: [{ role_id: "1", can_execute: true }]
      })
    });

    expect((await hostGroup({ group_id: "group-1" })).structuredContent.items?.[0]?.canView).toBe(true);
    expect((await environment({ application_id: "app-1", environment_id: "env-1" })).structuredContent.items?.[0]?.canExecute).toBe(true);
  });

  it("maps application messages and groups", async () => {
    const messages = createDeployGetApplicationMessagesHandler({
      getApplicationMessages: async () => ({
        project_id: "project-1",
        app_id: "app-1",
        messages: [{ id: "msg-1", title: "notice" }],
        status: "success",
        raw: [{ id: "msg-1" }]
      })
    });
    const groups = createDeployListApplicationGroupsHandler({
      listApplicationGroups: async () => ({
        project_id: "project-1",
        groups: [{ id: "group-1", name: "default" }],
        status: "success",
        raw: [{ id: "group-1" }]
      })
    });

    expect((await messages({ project_id: "project-1", app_id: "app-1" })).structuredContent.items?.[0]?.id).toBe("msg-1");
    expect((await groups({ project_id: "project-1" })).structuredContent.items?.[0]?.name).toBe("default");
  });

  it("maps success rate metrics", async () => {
    const projectMetrics = createDeployGetSuccessRateMetricsHandler({
      getSuccessRateMetrics: async () => ({
        project_id: "project-1",
        metrics: { success_rate: 95 },
        status: "success",
        raw: { success_rate: 95 }
      })
    });
    const taskMetrics = createDeployGetTaskSuccessRateMetricsHandler({
      getTaskSuccessRateMetrics: async () => ({
        project_id: "project-1",
        metrics: { success_rate: 80 },
        status: "success",
        raw: { success_rate: 80 }
      })
    });

    expect((await projectMetrics({ project_id: "project-1" })).structuredContent.item?.metrics).toEqual({ success_rate: 95 });
    expect((await taskMetrics({ project_id: "project-1" })).structuredContent.item?.metrics).toEqual({ success_rate: 80 });
  });
});
