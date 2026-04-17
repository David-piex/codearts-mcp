import { describe, expect, it } from "vitest";
import { mapRepoBranches } from "../../../../src/products/repo/tools/list-branches.js";

describe("mapRepoBranches", () => {
  it("returns normalized branches with pagination", () => {
    const result = mapRepoBranches(
      [{ name: "main", commit: { id: "abc123" }, protected: true }],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        name: "main",
        commitId: "abc123",
        protected: true
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
