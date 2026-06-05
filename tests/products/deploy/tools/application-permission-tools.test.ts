import { describe, expect, it } from "vitest";
import { createDeployCheckApplicationCreatableHandler } from "../../../../src/products/deploy/tools/check-application-creatable.js";
import { createDeployCheckHostGroupCreatableHandler } from "../../../../src/products/deploy/tools/check-host-group-creatable.js";
import { createDeployCheckApplicationExistsHandler } from "../../../../src/products/deploy/tools/check-application-exists.js";
import {
  createDeployListApplicationPermissionsHandler,
  mapDeployApplicationPermissions
} from "../../../../src/products/deploy/tools/list-application-permissions.js";
import { createDeployUpdateEnvironmentPermissionsHandler } from "../../../../src/products/deploy/tools/update-environment-permissions.js";
import { createDeployUpdateHostGroupPermissionsHandler } from "../../../../src/products/deploy/tools/update-host-group-permissions.js";

describe("Deploy application permission tools", () => {
  it("maps application permissions with camelCase fields", () => {
    const result = mapDeployApplicationPermissions([
      {
        role_id: "0",
        role_type: "project",
        name: "developer",
        can_modify: true,
        can_delete: false,
        can_create_env: true,
        can_disable: false
      }
    ]);

    expect(result.items?.[0]).toEqual({
      id: "0",
      roleId: "0",
      roleType: "project",
      name: "developer",
      region: undefined,
      canModify: true,
      canDelete: false,
      canView: undefined,
      canExecute: undefined,
      canCopy: undefined,
      canManage: undefined,
      canCreateEnv: true,
      canDisable: false,
      permission: {
        role_id: "0",
        role_type: "project",
        name: "developer",
        can_modify: true,
        can_delete: false,
        can_create_env: true,
        can_disable: false
      }
    });
  });

  it("checks whether an application name exists", async () => {
    const handler = createDeployCheckApplicationExistsHandler({
      checkApplicationExists: async () => ({
        project_id: "project-1",
        name: "gateway-prod",
        exists: false,
        status: "success",
        raw: false
      })
    });

    const result = await handler({ project_id: "project-1", name: "gateway-prod" });

    expect(result.content[0]?.text).toContain("Checked deploy application name gateway-prod");
    expect(result.structuredContent.item?.exists).toBe(false);
    expect(result.structuredContent.item?.projectId).toBe("project-1");
  });

  it("checks whether application creation is allowed", async () => {
    const handler = createDeployCheckApplicationCreatableHandler({
      checkApplicationCreatable: async () => ({
        project_id: "project-1",
        creatable: true,
        status: "success",
        raw: { creatable: true }
      })
    });

    const result = await handler({ project_id: "project-1" });

    expect(result.content[0]?.text).toContain("Checked deploy application creatable permission");
    expect(result.structuredContent.item?.creatable).toBe(true);
    expect(result.structuredContent.item?.raw).toEqual({ creatable: true });
  });

  it("checks whether host group creation is allowed", async () => {
    const handler = createDeployCheckHostGroupCreatableHandler({
      checkHostGroupCreatable: async () => ({
        project_id: "project-1",
        can_created: true,
        raw: { can_created: true }
      })
    });

    const result = await handler({ project_id: "project-1" });

    expect(result.content[0]?.text).toContain("Checked deploy host group creatable permission");
    expect(result.structuredContent.item?.canCreated).toBe(true);
  });

  it("lists application permissions and keeps the raw response", async () => {
    const handler = createDeployListApplicationPermissionsHandler({
      listApplicationPermissions: async () => ({
        project_id: "project-1",
        permissions: [{ role_id: "0", can_modify: true }],
        status: "success",
        raw: [{ role_id: "0", can_modify: true }]
      })
    });

    const result = await handler({ project_id: "project-1" });

    expect(result.content[0]?.text).toContain("1 deploy application permissions found");
    expect(result.structuredContent.items?.[0]?.canModify).toBe(true);
    expect(result.structuredContent.projectId).toBe("project-1");
    expect(result.structuredContent.raw).toEqual([{ role_id: "0", can_modify: true }]);
  });

  it("previews host group permission update by default", async () => {
    const handler = createDeployUpdateHostGroupPermissionsHandler({
      updateHostGroupPermissions: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      group_id: "group-1",
      project_id: "project-1",
      role_id: "role-1",
      permission_name: "can_copy",
      permission_value: true
    });

    expect(result.structuredContent.item).toEqual({
      groupId: "group-1",
      projectId: "project-1",
      roleId: "role-1",
      permissionName: "can_copy",
      permissionValue: true,
      executed: false
    });
  });

  it("maps updated host group permission into MCP output", async () => {
    const handler = createDeployUpdateHostGroupPermissionsHandler({
      updateHostGroupPermissions: async () => ({
        group_id: "group-1",
        permission: {
          role_id: "role-1",
          role_type: "cluster-creator",
          can_add_host: true,
          can_manage: true
        },
        raw: { ok: true }
      })
    });

    const result = await handler({
      group_id: "group-1",
      project_id: "project-1",
      role_id: "role-1",
      permission_name: "can_add_host",
      permission_value: true,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "role-1",
      roleId: "role-1",
      roleType: "cluster-creator",
      canAddHost: true,
      canManage: true,
      groupId: "group-1",
      executed: true
    });
  });

  it("previews environment permission update by default", async () => {
    const handler = createDeployUpdateEnvironmentPermissionsHandler({
      updateEnvironmentPermissions: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      permission_name: "can_deploy",
      permission_value: true
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      environmentId: "env-1",
      roleId: undefined,
      permissionName: "can_deploy",
      permissionValue: true,
      executed: false
    });
  });

  it("maps updated environment permission into MCP output", async () => {
    const handler = createDeployUpdateEnvironmentPermissionsHandler({
      updateEnvironmentPermissions: async () => ({
        application_id: "app-1",
        environment_id: "env-1",
        permission: {
          role_id: "role-1",
          role_type: "environment-creator",
          can_deploy: true,
          can_manage: true
        },
        status: "success",
        raw: { ok: true }
      })
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      permission_name: "can_deploy",
      permission_value: true,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "role-1",
      roleId: "role-1",
      roleType: "environment-creator",
      canDeploy: true,
      canManage: true,
      applicationId: "app-1",
      environmentId: "env-1",
      status: "success",
      executed: true
    });
  });
});
