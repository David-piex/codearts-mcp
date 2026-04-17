import { describe, expect, it } from "vitest";
import { createRepoCreateMergeRequestDiscussionHandler } from "../../../../src/products/repo/tools/create-merge-request-discussion.js";

describe("createRepoCreateMergeRequestDiscussionHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoCreateMergeRequestDiscussionHandler({
      createMergeRequestDiscussion: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      body: "Please check this file rename.",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      body: "Please check this file rename.",
      executed: false
    });
  });

  it("maps created merge request discussion into MCP output", async () => {
    const handler = createRepoCreateMergeRequestDiscussionHandler({
      createMergeRequestDiscussion: async () => ({
        discussion_id: "d-1",
        body: "Please check this file rename.",
        created_at: "2026-04-15T21:00:00+08:00",
        author: { name: "yao", nick_name: "Yao" }
      })
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      body: "Please check this file rename.",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "d-1",
      body: "Please check this file rename.",
      createdAt: "2026-04-15T21:00:00+08:00",
      authorName: "yao",
      authorNickName: "Yao",
      executed: true
    });
  });
});
