import { describe, expect, it } from "vitest";
import {
  createDeployCreateApplicationGroupHandler,
  createDeployDeleteApplicationGroupHandler,
  createDeployMoveApplicationGroupHandler,
  createDeployMoveApplicationsToGroupHandler,
  createDeployUpdateApplicationGroupHandler
} from "../../../../src/products/deploy/tools/application-groups-write.js";

describe("deploy application group write handlers", () => {
  it("previews application group creation by default", async () => {
    const handler = createDeployCreateApplicationGroupHandler({
      createApplicationGroup: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({ project_id: "project-1", name: "group-a" });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      name: "group-a",
      parentId: undefined,
      executed: false
    });
  });

  it("maps created application group into MCP output", async () => {
    const handler = createDeployCreateApplicationGroupHandler({
      createApplicationGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        name: "group-a",
        parent_id: "parent-1",
        status: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      name: "group-a",
      parent_id: "parent-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "group-1",
      groupId: "group-1",
      projectId: "project-1",
      name: "group-a",
      parentId: "parent-1",
      status: "success",
      executed: true
    });
  });

  it("maps updated application group into MCP output", async () => {
    const handler = createDeployUpdateApplicationGroupHandler({
      updateApplicationGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        name: "group-b",
        status: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      group_id: "group-1",
      name: "group-b",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "group-1",
      groupId: "group-1",
      projectId: "project-1",
      name: "group-b",
      status: "success",
      executed: true
    });
  });

  it("maps deleted application group into MCP output", async () => {
    const handler = createDeployDeleteApplicationGroupHandler({
      deleteApplicationGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        status: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      group_id: "group-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "group-1",
      groupId: "group-1",
      projectId: "project-1",
      status: "success",
      executed: true
    });
  });

  it("maps moved application group into MCP output", async () => {
    const handler = createDeployMoveApplicationGroupHandler({
      moveApplicationGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        movement: -1,
        status: "success"
      })
    });

    const result = await handler({
      project_id: "project-1",
      id: "group-1",
      movement: -1,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "group-1",
      groupId: "group-1",
      projectId: "project-1",
      movement: -1,
      status: "success",
      executed: true
    });
  });

  it("maps moved applications result into MCP output", async () => {
    const handler = createDeployMoveApplicationsToGroupHandler({
      moveApplicationsToGroup: async () => ({
        project_id: "project-1",
        group_id: "group-1",
        application_ids: ["app-1", "app-2"],
        result: [
          {
            code: "failed",
            application_id: "app-2",
            application_name: "billing",
            error_code: "403",
            error_msg: "permission denied"
          }
        ],
        status: "success",
        raw: { result: [] }
      })
    });

    const result = await handler({
      project_id: "project-1",
      group_id: "group-1",
      application_ids: ["app-1", "app-2"],
      dry_run: false
    });
    const structured = result.structuredContent as {
      items: Array<{
        id: string;
        applicationId?: string;
        applicationName?: string;
        code?: string;
        errorCode?: string;
        errorMessage?: string;
      }>;
      projectId: string;
      groupId: string;
      applicationIds: string[];
    };

    expect(structured.items).toEqual([
      {
        id: "app-2",
        applicationId: "app-2",
        applicationName: "billing",
        code: "failed",
        errorCode: "403",
        errorMessage: "permission denied"
      }
    ]);
    expect(structured.projectId).toBe("project-1");
    expect(structured.groupId).toBe("group-1");
    expect(structured.applicationIds).toEqual(["app-1", "app-2"]);
  });
});
