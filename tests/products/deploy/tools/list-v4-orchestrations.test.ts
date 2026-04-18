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
});
