import { describe, expect, it } from "vitest";
import { createDeployListVariablesHandler } from "../../../../src/products/deploy/tools/list-variables.js";

describe("createDeployListVariablesHandler", () => {
  it("maps variables into MCP output", async () => {
    const handler = createDeployListVariablesHandler({
      listVariables: async () => ({
        project_id: "project-1",
        level: "env",
        env_id: "env-1",
        variables: [
          {
            id: "var-1",
            name: "region",
            type: "text",
            value: "cn-north-4",
            static_status: 1
          }
        ],
        raw: {
          variables: [
            {
              id: "var-1",
              name: "region"
            }
          ]
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      level: "env",
      env_id: "env-1"
    });

    expect(result.structuredContent.summary).toContain("1 deploy variables for env scope");
    expect(result.structuredContent.items).toEqual([
      {
        id: "var-1",
        projectId: "project-1",
        level: "env",
        appId: undefined,
        envId: "env-1",
        name: "region",
        type: "text",
        value: "cn-north-4",
        staticStatus: 1,
        isDynamic: undefined
      }
    ]);
  });
});
