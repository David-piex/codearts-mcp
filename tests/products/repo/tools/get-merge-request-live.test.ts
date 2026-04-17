import { describe, expect, it } from "vitest";
import { createRepoGetMergeRequestHandler } from "../../../../src/products/repo/tools/get-merge-request.js";

describe("createRepoGetMergeRequestHandler", () => {
  it("maps merge request detail into MCP output", async () => {
    const handler = createRepoGetMergeRequestHandler({
      getMergeRequest: async () => ({
        id: 47858,
        iid: 1,
        repository_id: 2111983939,
        title: "新建文件 d",
        description: "merge feature/login into main",
        state: "opened",
        source_branch: "feature/login",
        target_branch: "main",
        created_at: "2024-11-30T17:47:53.000+08:00",
        updated_at: "2025-03-06T17:43:39.000+08:00",
        author: { name: "yao", nick_name: "Yao" },
        web_url: "https://example.com/mr/1"
      })
    });

    const result = await handler({ repository_id: "1001", merge_request_iid: "1" });

    expect(result.structuredContent.item).toEqual({
      id: "47858",
      iid: 1,
      repositoryId: "2111983939",
      title: "新建文件 d",
      description: "merge feature/login into main",
      state: "opened",
      sourceBranch: "feature/login",
      targetBranch: "main",
      createdAt: "2024-11-30T17:47:53.000+08:00",
      updatedAt: "2025-03-06T17:43:39.000+08:00",
      authorName: "yao",
      authorNickName: "Yao",
      webUrl: "https://example.com/mr/1"
    });
  });
});
