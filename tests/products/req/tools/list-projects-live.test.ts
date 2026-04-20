import { describe, expect, it } from "vitest";
import { createReqListProjectsHandler } from "../../../../src/products/req/tools/list-projects.js";

describe("createReqListProjectsHandler", () => {
  it("maps provider projects into MCP text and structured data", async () => {
    const handler = createReqListProjectsHandler({
      listProjects: async () => ({
        projects: [{ project_id: "p1", name: "Alpha", project_num_id: 7 }],
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 projects");
    expect(result.structuredContent.items![0]).toEqual({ id: "p1", name: "Alpha", numberId: 7 });
    expect(result.content[0]?.text).toContain("project_id: p1");
    expect(result.content[0]?.text).toContain("name: Alpha");
    expect(result.content[0]?.text).toContain("numberId: 7");
  });
});
