import { describe, expect, it } from "vitest";
import { createDeployCreateTaskByTemplateHandler } from "../../../../src/products/deploy/tools/create-task-by-template.js";

describe("createDeployCreateTaskByTemplateHandler", () => {
  it("returns a real dry-run preview by default", async () => {
    const handler = createDeployCreateTaskByTemplateHandler({
      getTemplateDetail: async () => ({
        template_id: "template-1",
        name: "node-template",
        operation_list: [{ id: "op-1" }, { id: "op-2" }],
        raw: {}
      }),
      createTaskByTemplate: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      project_name: "Codearts-mcp",
      template_id: "template-1",
      task_name: "deploy-demo",
      configs: [
        {
          name: "deployEnv",
          type: "enum",
          description: "runtime env selector",
          value: "prod",
          static_status: 0,
          limits: [{ name: "dev" }, { name: "prod" }]
        }
      ]
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      projectName: "Codearts-mcp",
      templateId: "template-1",
      templateName: "node-template",
      templateOperationCount: 2,
      taskName: "deploy-demo",
      configCount: 1,
      executed: false
    });
  });

  it("fails in dry-run mode when the template does not exist", async () => {
    const handler = createDeployCreateTaskByTemplateHandler({
      getTemplateDetail: async () => {
        const error = new Error("template not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      createTaskByTemplate: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      handler({
        project_id: "project-1",
        project_name: "Codearts-mcp",
        template_id: "template-1",
        task_name: "deploy-demo",
        configs: []
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps create-by-template response into MCP output", async () => {
    let receivedInput: unknown;
    const handler = createDeployCreateTaskByTemplateHandler({
      getTemplateDetail: async () => {
        throw new Error("should not preview");
      },
      createTaskByTemplate: async (input) => {
        receivedInput = input;
        return {
        task_name: "Deploytest",
        task_id: "140ca97e701d4c4c93c59ffd5bdb32ec"
        };
      }
    });

    const result = await handler({
      project_id: "project-1",
      project_name: "Codearts-mcp",
      template_id: "template-1",
      task_name: "Deploytest",
      configs: [
        {
          name: "deployEnv",
          type: "enum",
          description: "runtime env selector",
          value: "prod",
          static_status: 0,
          limits: [{ name: "dev" }, { name: "prod" }]
        }
      ],
      dry_run: false
    });

    expect(receivedInput).toEqual({
      project_id: "project-1",
      project_name: "Codearts-mcp",
      template_id: "template-1",
      task_name: "Deploytest",
      configs: [
        {
          name: "deployEnv",
          type: "enum",
          description: "runtime env selector",
          value: "prod",
          static_status: 0,
          limits: [{ name: "dev" }, { name: "prod" }]
        }
      ],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "140ca97e701d4c4c93c59ffd5bdb32ec",
      name: "Deploytest",
      executed: true
    });
  });
});
