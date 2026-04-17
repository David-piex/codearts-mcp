import { describe, expect, it } from "vitest";
import { createGovernListOsiItemDependencyHandler } from "../../../../src/products/govern/tools/list-osi-item-dependency.js";

describe("createGovernListOsiItemDependencyHandler", () => {
  it("maps govern osi item dependency into MCP output", async () => {
    const handler = createGovernListOsiItemDependencyHandler({
      listOsiItemDependency: async () => ({
        items: [
          {
            software_name: "zlib",
            software_version: "1.3.1",
            provider: "madler",
            language: "C/C++",
            relation: "direct"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      software_name: "openssl",
      software_version: "openssl-3.0.19"
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "zlib@1.3.1",
      softwareName: "zlib",
      relation: "direct"
    });
  });
});
