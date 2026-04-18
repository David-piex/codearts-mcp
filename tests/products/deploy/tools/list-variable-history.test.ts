import { describe, expect, it } from "vitest";
import { createDeployListVariableHistoryHandler } from "../../../../src/products/deploy/tools/list-variable-history.js";

describe("createDeployListVariableHistoryHandler", () => {
  it("maps variable history into MCP output", async () => {
    const handler = createDeployListVariableHistoryHandler({
      listVariableHistory: async () => ({
        project_id: "project-1",
        level: "env",
        env_id: "env-1",
        histories: [
          {
            id: "hist-1",
            name: "region",
            type: "text",
            value: "cn-north-4",
            static_status: 1,
            created_at: "2026-04-18T00:00:00Z",
            updated_at: "2026-04-18T01:00:00Z"
          }
        ],
        raw: {
          histories: [
            {
              id: "hist-1",
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

    expect(result.structuredContent.summary).toContain("1 deploy variable history records");
    expect(result.structuredContent.items).toEqual([
      {
        id: "hist-1",
        projectId: "project-1",
        level: "env",
        appId: undefined,
        envId: "env-1",
        name: "region",
        type: "text",
        value: "cn-north-4",
        staticStatus: 1,
        isDynamic: undefined,
        createdAt: "2026-04-18T00:00:00Z",
        updatedAt: "2026-04-18T01:00:00Z"
      }
    ]);
  });
});
