import { describe, expect, it } from "vitest";
import { createRepoListMergeRequestDiscussionsHandler } from "../../../../src/products/repo/tools/list-merge-request-discussions.js";

describe("createRepoListMergeRequestDiscussionsHandler", () => {
  it("maps merge request discussions into MCP output", async () => {
    const handler = createRepoListMergeRequestDiscussionsHandler({
      listMergeRequestDiscussions: async () => ({
        discussions: [
          {
            discussion_id: "d-1",
            body: "Please check this file rename.",
            created_at: "2026-04-15T21:00:00+08:00",
            author: { name: "yao", nick_name: "Yao" }
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", merge_request_iid: "7", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "d-1",
      body: "Please check this file rename.",
      createdAt: "2026-04-15T21:00:00+08:00",
      authorName: "yao",
      authorNickName: "Yao"
    });
  });
});
