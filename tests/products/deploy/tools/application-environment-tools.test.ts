import { describe, expect, it } from "vitest";
import { createDeployBatchDeleteApplicationsHandler } from "../../../../src/products/deploy/tools/batch-delete-applications.js";
import { createDeployDeleteApplicationEnvironmentHandler } from "../../../../src/products/deploy/tools/delete-application-environment.js";
import { createDeployGetApplicationEnvironmentHandler } from "../../../../src/products/deploy/tools/get-application-environment.js";
import { createDeployUpdateApplicationEnvironmentHandler } from "../../../../src/products/deploy/tools/update-application-environment.js";
import { createDeployUpdateApplicationPermissionLevelHandler } from "../../../../src/products/deploy/tools/update-application-permission-level.js";

describe("deploy application environment handlers", () => {
  it("maps application environment detail into MCP output", async () => {
    const handler = createDeployGetApplicationEnvironmentHandler({
      getApplicationEnvironment: async () => ({
        application_id: "app-1",
        environment_id: "env-1",
        environment: {
          id: "env-1",
          name: "prod",
          description: "demo",
          os: "linux",
          project_id: "project-1",
          nick_name: "alice",
          deploy_type: 0,
          instance_count: 2,
          created_time: "2026-06-06 10:00:00",
          created_by: {
            user_id: "user-1",
            user_name: "alice"
          },
          permission: {
            can_modify: true
          }
        },
        status: "success",
        raw: { id: "env-1" }
      })
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "env-1",
      applicationId: "app-1",
      environmentId: "env-1",
      projectId: "project-1",
      name: "prod",
      description: "demo",
      os: "linux",
      nickName: "alice",
      deployType: 0,
      instanceCount: 2,
      createdTime: "2026-06-06 10:00:00",
      createdBy: {
        user_id: "user-1",
        user_name: "alice"
      },
      permission: {
        can_modify: true
      },
      status: "success"
    });
  });

  it("previews application environment update by default", async () => {
    const handler = createDeployUpdateApplicationEnvironmentHandler({
      updateApplicationEnvironment: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      name: "prod-new"
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      environmentId: "env-1",
      name: "prod-new",
      description: undefined,
      executed: false
    });
  });

  it("maps updated application environment into MCP output", async () => {
    const handler = createDeployUpdateApplicationEnvironmentHandler({
      updateApplicationEnvironment: async (input) => ({
        application_id: input.application_id,
        environment_id: input.environment_id,
        status: "success"
      })
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1",
      name: "prod-new",
      description: "new desc",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "env-1",
      applicationId: "app-1",
      environmentId: "env-1",
      name: "prod-new",
      description: "new desc",
      status: "success",
      executed: true
    });
  });

  it("previews application environment deletion by default", async () => {
    const handler = createDeployDeleteApplicationEnvironmentHandler({
      deleteApplicationEnvironment: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      application_id: "app-1",
      environment_id: "env-1"
    });

    expect(result.structuredContent.item).toEqual({
      applicationId: "app-1",
      environmentId: "env-1",
      executed: false
    });
  });

  it("maps batch delete applications into MCP output", async () => {
    const handler = createDeployBatchDeleteApplicationsHandler({
      batchDeleteApplications: async () => ({
        project_id: "project-1",
        total_num: 2,
        result: [
          {
            application_id: "app-1",
            application_name: "gateway",
            status: "success",
            error_reason: ""
          },
          {
            application_id: "app-2",
            application_name: "billing",
            status: "error",
            error_reason: "permission denied"
          }
        ],
        raw: { total_num: 2 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      application_ids: ["app-1", "app-2"],
      dry_run: false
    });
    const structured = result.structuredContent as {
      items: Array<{
        id: string;
        applicationId: string;
        applicationName?: string;
        status?: string;
        errorReason?: string;
      }>;
      projectId: string;
      totalNum?: number;
      executed: boolean;
    };

    expect(structured.items).toEqual([
      {
        id: "app-1",
        applicationId: "app-1",
        applicationName: "gateway",
        status: "success",
        errorReason: ""
      },
      {
        id: "app-2",
        applicationId: "app-2",
        applicationName: "billing",
        status: "error",
        errorReason: "permission denied"
      }
    ]);
    expect(structured.projectId).toBe("project-1");
    expect(structured.totalNum).toBe(2);
    expect(structured.executed).toBe(true);
  });

  it("previews application permission level update by default", async () => {
    const handler = createDeployUpdateApplicationPermissionLevelHandler({
      updateApplicationPermissionLevel: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      application_ids: ["app-1"],
      permission_level: "instance"
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      applicationIds: ["app-1"],
      permissionLevel: "instance",
      executed: false
    });
  });

  it("maps updated application permission level into MCP output", async () => {
    const handler = createDeployUpdateApplicationPermissionLevelHandler({
      updateApplicationPermissionLevel: async () => ({
        status: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      application_ids: ["app-1", "app-2"],
      permission_level: "project",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      applicationIds: ["app-1", "app-2"],
      permissionLevel: "project",
      status: "success",
      executed: true
    });
  });
});
