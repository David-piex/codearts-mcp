import { describe, expect, it } from "vitest";
import { createDeployCreateApplicationHandler } from "../../../../src/products/deploy/tools/create-application.js";

describe("createDeployCreateApplicationHandler", () => {
  it("returns a dry-run preview by default", async () => {
    const handler = createDeployCreateApplicationHandler({
      createApplication: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      name: "App-20260418",
      arrange_infos: [
        {
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      name: "App-20260418",
      createType: "template",
      isDraft: false,
      arrangeInfoCount: 1,
      operationCount: 1,
      executed: false
    });
  });

  it("maps create application response into MCP output", async () => {
    let receivedInput: unknown;
    const handler = createDeployCreateApplicationHandler({
      createApplication: async (input) => {
        receivedInput = input;
        return {
          application_id: "app-1",
          name: "App-20260418",
          task_id: "task-1"
        };
      }
    });

    const result = await handler({
      project_id: "project-1",
      name: "App-20260418",
      arrange_infos: [
        {
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ],
      dry_run: false
    });

    expect(receivedInput).toEqual({
      project_id: "project-1",
      name: "App-20260418",
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
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "app-1",
      name: "App-20260418",
      taskId: "task-1",
      executed: true
    });
  });
});
