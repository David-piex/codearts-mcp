import { describe, expect, it } from "vitest";
import { createRepoListBranchesHandler } from "../../../../src/products/repo/tools/list-branches.js";

describe("createRepoListBranchesHandler", () => {
  it("maps branch list responses into MCP output", async () => {
    const handler = createRepoListBranchesHandler({
      listBranches: async () => ({
        branches: [{ name: "main", commit: { id: "abc123" }, protected: true }],
        total: 1
      })
    });

    const result = await handler({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 branches");
    expect(result.structuredContent.items?.[0]).toEqual({
      name: "main",
      commitId: "abc123",
      protected: true
    });
  });

  it("adds a repository-scoped hint when the branch list is empty", async () => {
    const handler = createRepoListBranchesHandler({
      listBranches: async () => ({
        branches: [],
        total: 0
      })
    });

    const result = await handler({ repository_id: "repo-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 branches found");
    expect(result.content[0]?.text).toContain("If you expected branches here");
    expect(result.content[0]?.text).toContain("repo-empty");
  });
});
