import { describe, expect, it } from "vitest";
import { createDeployCheckApplicationCreatableHandler } from "../../../../src/products/deploy/tools/check-application-creatable.js";
import { createDeployCheckApplicationExistsHandler } from "../../../../src/products/deploy/tools/check-application-exists.js";
import {
  createDeployListApplicationPermissionsHandler,
  mapDeployApplicationPermissions
} from "../../../../src/products/deploy/tools/list-application-permissions.js";

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
});
