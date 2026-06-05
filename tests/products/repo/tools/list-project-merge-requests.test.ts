import { describe, expect, it } from "vitest";
import { createRepoListProjectMergeRequestsHandler } from "../../../../src/products/repo/tools/list-project-merge-requests.js";

describe("createRepoListProjectMergeRequestsHandler", () => {
  it("lists project merge requests", async () => {
    const handler = createRepoListProjectMergeRequestsHandler({
      listProjectMergeRequests: async () => ({
        merge_requests: [
          {
            id: 101,
            iid: 7,
            title: "demo",
            state: "opened",
            source_branch: "feature/demo",
            target_branch: "main",
            author: { name: "Alice", nick_name: "alice" }
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        id: "101",
        iid: 7,
        title: "demo",
        state: "opened",
        sourceBranch: "feature/demo",
        targetBranch: "main"
      })
    ]);
  });
});
