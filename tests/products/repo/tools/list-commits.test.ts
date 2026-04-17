import { describe, expect, it } from "vitest";
import { mapRepoCommits } from "../../../../src/products/repo/tools/list-commits.js";

describe("mapRepoCommits", () => {
  it("returns normalized commits with pagination", () => {
    const result = mapRepoCommits(
      [{ id: "abc123", short_id: "abc123", title: "fix bug", author_name: "Alice" }],
      2,
      10,
      21
    );

    expect(result.items).toEqual([
      {
        id: "abc123",
        shortId: "abc123",
        title: "fix bug",
        authorName: "Alice"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 21
    });
  });
});
