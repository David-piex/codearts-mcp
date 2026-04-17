import { describe, expect, it } from "vitest";
import { createPerfTestListProjectsHandler } from "../../../../src/products/perftest/tools/list-projects.js";

describe("createPerfTestListProjectsHandler", () => {
  it("maps perftest projects into MCP output", async () => {
    const handler = createPerfTestListProjectsHandler({
      listProjects: async () => ({
        total: 1,
        projects: [{ id: 1, name: "demo", description: "desc", source: 0 }]
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "1", name: "demo" });
  });
});
