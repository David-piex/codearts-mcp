import { describe, expect, it } from "vitest";
import { createDeployListV4ApplicationsHandler } from "../../../../src/products/deploy/tools/list-v4-applications.js";

describe("createDeployListV4ApplicationsHandler", () => {
  it("maps v4 applications list into MCP output", async () => {
    const handler = createDeployListV4ApplicationsHandler({
      listV4Applications: async () => ({
        project_id: "project-1",
        total: 1,
        applications: [
          {
            app_id: "v4-app-1",
            name: "codex-v4-app",
            project_id: "project-1",
            description: "demo"
          }
        ],
        raw: {
          total: 1,
          resources: [
            {
              id: "v4-app-1",
              name: "codex-v4-app",
              project_id: "project-1",
              description: "demo"
            }
          ]
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      limit: 20,
      offset: 0,
      keyword: "codex"
    });

    expect(result.structuredContent.summary).toContain("1 deploy v4 applications found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "v4-app-1",
        name: "codex-v4-app",
        projectId: "project-1",
        description: "demo"
      }
    ]);
    expect(result.structuredContent.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });

  it("falls back to response project_id for v4 application items", async () => {
    const handler = createDeployListV4ApplicationsHandler({
      listV4Applications: async () => ({
        project_id: "project-1",
        total: 1,
        applications: [
          {
            app_id: "v4-app-2",
            name: "codex-v4-app-2",
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
        id: "v4-app-2",
        name: "codex-v4-app-2",
        projectId: "project-1",
        description: "demo-2"
      }
    ]);
  });
});
