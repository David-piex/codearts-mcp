import { describe, expect, it } from "vitest";
import {
  createRepoListBranchesHandler,
  mapRepoBranches
} from "../../../../src/products/repo/tools/list-branches.js";

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

  it("renders readable preview text in MCP content", async () => {
    const handler = createRepoListBranchesHandler({
      listBranches: async () => ({
        branches: [{ name: "main", commit: { id: "abc123" }, protected: true }],
        total: 1
      })
    });

    const result = await handler({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("name: main");
    expect(result.content[0]?.text).toContain("commitId: abc123");
    expect(result.content[0]?.text).toContain("protected: true");
  });
});
