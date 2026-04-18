import { describe, expect, it } from "vitest";
import { createDeployModifyApplicationHandler } from "../../../../src/products/deploy/tools/modify-application.js";

describe("createDeployModifyApplicationHandler", () => {
  it("returns a real dry-run preview by default", async () => {
    const handler = createDeployModifyApplicationHandler({
      getApp: async () => ({
        application_id: "app-1",
        name: "App-20260418",
        project_id: "project-1",
        create_type: "template",
        can_modify: true,
        arrange_infos: [
          {
            id: "task-1",
            template_id: "template-1",
            steps: {}
          }
        ]
      }),
      modifyApplication: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      id: "app-1",
      project_id: "project-1",
      name: "App-20260418-updated",
      arrange_infos: [
        {
          id: "task-1",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });

    expect(result.structuredContent.item).toEqual({
      id: "app-1",
      projectId: "project-1",
      name: "App-20260418-updated",
      createType: "template",
      isDraft: false,
      arrangeInfoCount: 1,
      operationCount: 1,
      currentName: "App-20260418",
      currentArrangeInfoCount: 1,
      canModify: true,
      executed: false
    });
  });

  it("fails in dry-run mode when the application does not exist", async () => {
    const handler = createDeployModifyApplicationHandler({
      getApp: async () => {
        const error = new Error("application not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      modifyApplication: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      handler({
        id: "app-1",
        project_id: "project-1",
        name: "App-20260418-updated",
        arrange_infos: [
          {
            id: "task-1",
            template_id: "template-1",
            operation_list: [{ name: "deploy" }]
          }
        ]
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps modify application response into MCP output", async () => {
    let receivedInput: unknown;
    const handler = createDeployModifyApplicationHandler({
      getApp: async () => {
        throw new Error("should not preview");
      },
      modifyApplication: async (input) => {
        receivedInput = input;
        return {
          application_id: "app-1",
          name: "App-20260418-updated",
          task_id: "task-1"
        };
      }
    });

    const result = await handler({
      id: "app-1",
      project_id: "project-1",
      name: "App-20260418-updated",
      arrange_infos: [
        {
          id: "task-1",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ],
      dry_run: false
    });

    expect(receivedInput).toEqual({
      id: "app-1",
      project_id: "project-1",
      name: "App-20260418-updated",
      description: "",
      trigger: {
        trigger_source: "0",
        artifact_source_system: "",
        artifact_type: ""
      },
      slave_cluster_id: "",
      slave_resource_type: "",
      create_type: "template",
      is_draft: false,
      arrange_infos: [
        {
          id: "task-1",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "app-1",
      name: "App-20260418-updated",
      taskId: "task-1",
      executed: true
    });
  });
});
