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
});
