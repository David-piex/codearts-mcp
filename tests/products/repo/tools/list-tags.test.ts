import { describe, expect, it } from "vitest";
import { mapRepoTags } from "../../../../src/products/repo/tools/list-tags.js";

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
});
