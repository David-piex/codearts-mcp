import { describe, expect, it } from "vitest";
import { createDeployGetTemplateDetailHandler } from "../../../../src/products/deploy/tools/get-template-detail.js";

describe("createDeployGetTemplateDetailHandler", () => {
  it("maps deploy template detail into MCP output", async () => {
    const handler = createDeployGetTemplateDetailHandler({
      getTemplateDetail: async () => ({
        template_id: "template-1",
        task_id: "task-1",
        name: "SpringBoot",
        operation_list: [
          {
            name: "Deploy",
            params: [
              {
                name: "env",
                type: "host_group",
                required: true
              },
              {
                key: "deploy_mode",
                type: "enum",
                limits: [{ name: "gray" }, { name: "production" }]
              }
            ]
          }
        ],
        raw: {
          result: {
            id: "template-1"
          }
        }
      })
    });

    const result = await handler({
      template_id: "template-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "template-1",
      templateId: "template-1",
      taskId: "task-1",
      name: "SpringBoot",
      operationCount: 1,
      operationNames: ["Deploy"],
      parameterCount: 2,
      parameterNames: ["env", "deploy_mode"],
      parameters: [
        {
          name: "env",
          type: "host_group",
          required: true,
          operationIndex: 0,
          operationName: "Deploy",
          options: []
        },
        {
          name: "deploy_mode",
          type: "enum",
          required: undefined,
          operationIndex: 0,
          operationName: "Deploy",
          options: ["gray", "production"]
        }
      ],
      operations: [
        {
          name: "Deploy",
          params: [
            {
              name: "env",
              type: "host_group",
              required: true
            },
            {
              key: "deploy_mode",
              type: "enum",
              limits: [{ name: "gray" }, { name: "production" }]
            }
          ]
        }
      ]
    });
  });
});
