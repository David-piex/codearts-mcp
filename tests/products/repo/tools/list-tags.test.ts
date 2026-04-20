import { describe, expect, it } from "vitest";
import {
  createRepoListTagsHandler,
  mapRepoTags
} from "../../../../src/products/repo/tools/list-tags.js";

describe("mapRepoTags", () => {
  it("returns normalized tags with pagination", () => {
    const result = mapRepoTags([{ name: "v1.0.0", is_double_name: false }], 1, 20, 1);

    expect(result.items).toEqual([
      {
        id: "v1.0.0",
        name: "v1.0.0",
        doubleName: false
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });

  it("renders readable preview text in MCP content", async () => {
    const handler = createRepoListTagsHandler({
      listTags: async () => ({
        tags: [{ name: "v1.0.0", is_double_name: false }],
        total: 1
      })
    });

    const result = await handler({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("id: v1.0.0");
    expect(result.content[0]?.text).toContain("name: v1.0.0");
    expect(result.content[0]?.text).toContain("doubleName: false");
  });
});
