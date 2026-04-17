import { describe, expect, it } from "vitest";
import { createReqGetProjectHandler } from "../../../../src/products/req/tools/get-project.js";

describe("createReqGetProjectHandler", () => {
  it("maps provider project detail into MCP output", async () => {
    const handler = createReqGetProjectHandler({
      getProject: async () => ({
        project_id: "p-1",
        name: "Alpha",
        project_num_id: 7,
        description: "Core project"
      })
    });

    const result = await handler({ project_id: "p-1" });

    expect(result.structuredContent.item).toEqual({
      id: "p-1",
      name: "Alpha",
      numberId: 7,
      description: "Core project"
    });
  });
});
