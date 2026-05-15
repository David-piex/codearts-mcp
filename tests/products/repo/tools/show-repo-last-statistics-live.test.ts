import { describe, expect, it } from "vitest";
import { createRepoShowRepoLastStatisticsHandler } from "../../../../src/products/repo/tools/show-repo-last-statistics.js";

describe("createRepoShowRepoLastStatisticsHandler", () => {
  it("maps repository last statistics into MCP output", async () => {
    const handler = createRepoShowRepoLastStatisticsHandler({
      showRepoLastStatistics: async () => ({
        total: 1,
        statistics: [{ id: 1, branch: "master", user_name: "dev", commit_count: 2 }],
        codelines: [{ additions: 12, deletions: 3, date: "20260515" }],
        count: 8,
        all_branch_commits_count: 10
      })
    });

    const result = await handler({ repository_id: "100", branch_name: "master" });

    expect(result.structuredContent.item).toMatchObject({
      total: 1,
      statistics: [{ id: "1", branch: "master", userName: "dev", commitCount: 2 }],
      codelines: [{ additions: 12, deletions: 3, date: "20260515" }],
      count: 8,
      allBranchCommitsCount: 10
    });
  });
});
