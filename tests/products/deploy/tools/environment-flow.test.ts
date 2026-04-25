import { describe, expect, it } from "vitest";
import { createDeployCreateEnvironmentHandler } from "../../../../src/products/deploy/tools/create-environment.js";
import { createDeployImportHostsToEnvironmentHandler } from "../../../../src/products/deploy/tools/import-hosts-to-environment.js";
import { createDeployListAppHostGroupsHandler } from "../../../../src/products/deploy/tools/list-app-host-groups.js";
import { createDeployListEnvironmentHostsHandler } from "../../../../src/products/deploy/tools/list-environment-hosts.js";

describe("deploy environment flow handlers", () => {
  it("maps application host groups into MCP output", async () => {
    const handler = createDeployListAppHostGroupsHandler({
      listAppHostGroups: async () => ({
        host_groups: [{ group_id: "group-1", name: "111", os: "linux", host_count: 1, env_count: 0 }],
        total: 1
      })
    });

    const result = await handler({
      application_id: "app-1",
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "group-1",
        applicationId: "app-1",
        name: "111",
        projectId: "project-1",
        os: "linux",
        hostCount: 1,
        environmentCount: 0,
        description: undefined
      }
    ]);
  });

  it("previews environment creation by default", async () => {
    const handler = createDeployCreateEnvironmentHandler({
      createEnvironment: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      application_id: "app-1",
      project_id: "project-1",
      name: "temp-env",
      os: "linux"
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      projectId: "project-1",
      name: "temp-env",
      os: "linux",
      deployType: 0,
      description: undefined,
      executed: false
    });
  });

  it("maps created environment into MCP output", async () => {
    const handler = createDeployCreateEnvironmentHandler({
      createEnvironment: async () => ({
        application_id: "app-1",
        environment_id: "env-1",
        name: "temp-env",
        project_id: "project-1",
        os: "linux",
        deploy_type: 0,
        description: "test"
      })
    });

    const result = await handler({
      application_id: "app-1",
      project_id: "project-1",
      name: "temp-env",
      os: "linux",
      deploy_type: 0,
      description: "test",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "env-1",
      applicationId: "app-1",
      projectId: "project-1",
      name: "temp-env",
      os: "linux",
      deployType: 0,
      description: "test",
      executed: true
    });
  });

  it("maps environment hosts into MCP output", async () => {
    const handler = createDeployListEnvironmentHostsHandler({
      listEnvironmentHosts: async (input) => {
        expect(input).toMatchObject({ key_field: "ecs", as_proxy: false });
        return {
        hosts: [
          {
            host_id: "host-1",
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

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      page: 1,
      page_size: 20,
      key_field: "ecs",
      as_proxy: false
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "host-1",
        applicationId: "app-1",
        environmentId: "env-1",
        name: "ecs-1",
        ip: "1.1.1.1",
        os: "linux",
        port: 22,
        connectionStatus: "success",
        connectionResult: "ok"
      }
    ]);
  });

  it("previews host import by default", async () => {
    const handler = createDeployImportHostsToEnvironmentHandler({
      importHostsToEnvironment: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      group_id: "group-1",
      host_ids: ["host-1"]
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      environmentId: "env-1",
      groupId: "group-1",
      hostIds: ["host-1"],
      executed: false
    });
  });

  it("maps imported hosts into MCP output", async () => {
    const handler = createDeployImportHostsToEnvironmentHandler({
      importHostsToEnvironment: async () => ({
        application_id: "app-1",
        environment_id: "env-1",
        group_id: "group-1",
        host_ids: ["host-1"],
        imported: true
      })
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      group_id: "group-1",
      host_ids: ["host-1"],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      environmentId: "env-1",
      groupId: "group-1",
      hostIds: ["host-1"],
      imported: true,
      executed: true
    });
  });
});
