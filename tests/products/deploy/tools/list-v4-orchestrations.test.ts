import { describe, expect, it } from "vitest";
import { createDeployListV4OrchestrationsHandler } from "../../../../src/products/deploy/tools/list-v4-orchestrations.js";

describe("createDeployListV4OrchestrationsHandler", () => {
  it("maps v4 orchestrations into MCP output", async () => {
    const handler = createDeployListV4OrchestrationsHandler({
      listV4Orchestrations: async () => ({
        project_id: "project-1",
        app_id: "app-1",
        total: 1,
        orchestrations: [{ id: "orch-1", name: "demo", state: "Available", description: "x" }],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      app_id: "app-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.summary).toContain("1 v4 orchestrations");
    expect(result.structuredContent.items).toEqual([
      {
        id: "orch-1",
        projectId: "project-1",
        appId: "app-1",
        name: "demo",
        state: "Available",
        description: "x"
      }
    ]);
  });

  it("adds a project-scoped hint when the v4 orchestration list is empty on the first page", async () => {
    const handler = createDeployListV4OrchestrationsHandler({
      listV4Orchestrations: async () => ({
        project_id: "project-empty",
        app_id: "app-empty",
        total: 0,
        orchestrations: [],
        raw: { total: 0 }
      })
    });

    const result = await handler({
      project_id: "project-empty",
      app_id: "app-empty",
      limit: 20,
      offset: 0
    });

    expect(result.content[0]?.text).toContain("Loaded 0 v4 orchestrations");
    expect(result.content[0]?.text).toContain("If you expected v4 orchestrations here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
