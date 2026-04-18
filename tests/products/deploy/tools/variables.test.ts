import { describe, expect, it } from "vitest";
import { createDeployGetRuntimeVariablesHandler } from "../../../../src/products/deploy/tools/get-runtime-variables.js";
import { createDeployQueryVariablesHandler } from "../../../../src/products/deploy/tools/query-variables.js";
import { deployListVariableHistoryInput, deployListVariablesInput } from "../../../../src/products/deploy/schemas.js";

describe("deploy variable handlers", () => {
  it("maps runtime variables into MCP output", async () => {
    const handler = createDeployGetRuntimeVariablesHandler({
      getRuntimeVariables: async () => ({
        project_id: "project-1",
        app_id: "app-1",
        variables: [
          {
            name: "env",
            type: "host_group",
            value: "group-1",
            static_status: 0,
            is_dynamic: true
          }
        ],
        raw: {
          variables: [
            {
              name: "env",
              type: "host_group",
              value: "group-1",
              staticStatus: 0,
              is_dynamic: true
            }
          ]
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      app_id: "app-1"
    });

    expect(result.structuredContent.summary).toContain("1 deploy runtime variables found");
    expect(result.structuredContent.scope).toEqual({
      projectId: "project-1",
      appId: "app-1"
    });
    expect(result.structuredContent.items).toEqual([
      {
        id: "env",
        projectId: "project-1",
        appId: "app-1",
        name: "env",
        type: "host_group",
        value: "group-1",
        staticStatus: false,
        dynamic: true
      }
    ]);
  });

  it("maps queried variables into MCP output", async () => {
    const handler = createDeployQueryVariablesHandler({
      queryVariables: async () => ({
        project_id: "project-1",
        level: "env",
        env_id: "env-1",
        variables: [
          {
            name: "region",
            type: "text",
            value: "cn-north-4",
            static_status: 1
          }
        ],
        raw: {
          level: "env",
          variables: [
            {
              name: "region",
              type: "text",
              value: "cn-north-4",
              staticStatus: 1
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

    expect(result.structuredContent.summary).toContain("1 deploy variables found");
    expect(result.structuredContent.scope).toEqual({
      projectId: "project-1",
      level: "env",
      appId: undefined,
      envId: "env-1"
    });
    expect(result.structuredContent.items).toEqual([
      {
        id: "region",
        projectId: "project-1",
        level: "env",
        appId: undefined,
        envId: "env-1",
        name: "region",
        type: "text",
        value: "cn-north-4",
        staticStatus: true,
        dynamic: undefined
      }
    ]);
  });

  it("validates v4 variable list scope input", () => {
    expect(() =>
      deployListVariablesInput.parse({
        project_id: "project-1",
        level: "app"
      })
    ).toThrow(/app_id is required/);

    expect(() =>
      deployListVariableHistoryInput.parse({
        project_id: "project-1",
        level: "env"
      })
    ).toThrow(/env_id is required/);
  });
});
