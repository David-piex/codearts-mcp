import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient template detail", () => {
  it("loads deploy template detail from the frontend-observed route", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            id: "template-1",
            name: "SpringBoot",
            operation_list: [
              {
                name: "Deploy",
                params: [
                  {
                    name: "env",
                    type: "host_group",
                    required: true
                  }
                ]
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.getTemplateDetail({
      template_id: "template-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v1/deploytemplate/template/template-1/getTemplate?taskId=task-1");
    expect(result).toEqual({
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
            }
          ]
        }
      ],
      raw: {
        result: {
          id: "template-1",
          name: "SpringBoot",
          operation_list: [
            {
              name: "Deploy",
              params: [
                {
                  name: "env",
                  type: "host_group",
                  required: true
                }
              ]
            }
          ]
        }
      }
    });
  });

  it("sends an empty taskId query value when task_id is omitted", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          operation_list: []
        };
      }
    } as never);

    await client.getTemplateDetail({
      template_id: "template-1"
    });

    expect(requestedPath).toBe("/v1/deploytemplate/template/template-1/getTemplate?taskId=");
  });
});
