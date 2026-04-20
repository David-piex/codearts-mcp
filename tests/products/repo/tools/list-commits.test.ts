import { describe, expect, it } from "vitest";
import {
  createRepoListCommitsHandler,
  mapRepoCommits
} from "../../../../src/products/repo/tools/list-commits.js";

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

  it("renders readable preview text in MCP content", async () => {
    const handler = createRepoListCommitsHandler({
      listCommits: async () => ({
        commits: [{ id: "abc123", short_id: "abc123", title: "fix bug", author_name: "Alice" }],
        total: 1
      })
    });

    const result = await handler({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("id: abc123");
    expect(result.content[0]?.text).toContain("title: fix bug");
    expect(result.content[0]?.text).toContain("authorName: Alice");
  });
});
