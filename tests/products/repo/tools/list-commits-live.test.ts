import { describe, expect, it } from "vitest";
import { createRepoListCommitsHandler } from "../../../../src/products/repo/tools/list-commits.js";

describe("createRepoListCommitsHandler", () => {
  it("maps commit list responses into MCP output", async () => {
    const handler = createRepoListCommitsHandler({
      listCommits: async () => ({
        commits: [
          {
            id: "abc123",
            short_id: "abc123",
            title: "feat: add login",
            author_name: "Yao"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "repo-1", page: 1, page_size: 20, ref_name: "main" });

    expect(result.structuredContent.summary).toContain("1 commits");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "abc123",
      shortId: "abc123",
      title: "feat: add login",
      authorName: "Yao"
    });
  });
});
