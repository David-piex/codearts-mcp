import { describe, expect, it } from "vitest";
import { createRepoListTagsHandler } from "../../../../src/products/repo/tools/list-tags.js";

describe("createRepoListTagsHandler", () => {
  it("maps repository tags into MCP output", async () => {
    const handler = createRepoListTagsHandler({
      listTags: async () => ({
        tags: [
          {
            name: "v1.0.0",
            is_double_name: false
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "v1.0.0",
      name: "v1.0.0",
      doubleName: false
    });
  });
});
