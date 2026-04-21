import { describe, expect, it } from "vitest";
import { createRepoListMergeRequestsHandler } from "../../../../src/products/repo/tools/list-merge-requests.js";

describe("createRepoListMergeRequestsHandler", () => {
  it("maps merge request list into MCP output", async () => {
    const handler = createRepoListMergeRequestsHandler({
      listMergeRequests: async () => ({
        merge_requests: [
          {
            id: 72674,
            iid: 7,
            title: "新建文件",
            state: "opened",
            source_branch: "feature/login",
            target_branch: "main",
            created_at: "2025-05-21T12:03:32.000+08:00",
            updated_at: "2025-06-17T15:30:02.000+08:00",
            author: { name: "yao", nick_name: "Yao" },
            web_url: "https://example.com/mr/7"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "72674",
        iid: 7,
        title: "新建文件",
        state: "opened",
        sourceBranch: "feature/login",
        targetBranch: "main",
        createdAt: "2025-05-21T12:03:32.000+08:00",
        updatedAt: "2025-06-17T15:30:02.000+08:00",
        authorName: "yao",
        authorNickName: "Yao",
        webUrl: "https://example.com/mr/7"
      }
    ]);
  });

  it("adds a repository-scoped hint when the merge request list is empty", async () => {
    const handler = createRepoListMergeRequestsHandler({
      listMergeRequests: async () => ({
        merge_requests: [],
        total: 0
      })
    });

    const result = await handler({ repository_id: "repo-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 merge requests found");
    expect(result.content[0]?.text).toContain("If you expected merge requests here");
    expect(result.content[0]?.text).toContain("repo-empty");
  });
});
