import { describe, expect, it } from "vitest";
import { createDeployListV4EnvironmentsHandler } from "../../../../src/products/deploy/tools/list-v4-environments.js";

describe("createDeployListV4EnvironmentsHandler", () => {
  it("maps v4 environments into MCP output", async () => {
    const handler = createDeployListV4EnvironmentsHandler({
      listV4Environments: async () => ({
        project_id: "project-1",
        total: 1,
        environments: [
          {
            environment_id: "env-1",
            name: "prod",
            project_id: "project-1",
            os: "linux",
            description: "demo"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.summary).toContain("1 v4 environments");
    expect(result.structuredContent.items).toEqual([
      {
        id: "env-1",
        name: "prod",
        projectId: "project-1",
        os: "linux",
        description: "demo"
      }
    ]);
  });

  it("falls back to response project_id for v4 environment items", async () => {
    const handler = createDeployListV4EnvironmentsHandler({
      listV4Environments: async () => ({
        project_id: "project-1",
        total: 1,
        environments: [
          {
            environment_id: "env-2",
            name: "staging",
            os: "linux",
            description: "demo-2"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.items).toEqual([
      {
        id: "env-2",
        name: "staging",
        projectId: "project-1",
        os: "linux",
        description: "demo-2"
      }
    ]);
  });
});
