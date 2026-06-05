import { describe, expect, it } from "vitest";
import { createRepoDeleteMergeRequestDiscussionHandler } from "../../../../src/products/repo/tools/delete-merge-request-discussion.js";

describe("createRepoDeleteMergeRequestDiscussionHandler", () => {
  it("returns dry-run preview", async () => {
    const handler = createRepoDeleteMergeRequestDiscussionHandler({
      deleteMergeRequestDiscussion: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      repository_id: "100",
      merge_request_iid: "7",
      discussion_id: "discussion-1",
      note_id: "99",
      dry_run: true
    });

    expect(result.structuredContent.summary).toBe("Dry run: delete merge request discussion note 99");
  });

  it("deletes merge request discussion note", async () => {
    const handler = createRepoDeleteMergeRequestDiscussionHandler({
      deleteMergeRequestDiscussion: async () => ({
        repository_id: "100",
        merge_request_iid: "7",
        discussion_id: "discussion-1",
        note_id: "99",
        deleted: true
      })
    });

    const result = await handler({
      repository_id: "100",
      merge_request_iid: "7",
      discussion_id: "discussion-1",
      note_id: "99",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      repositoryId: "100",
      mergeRequestIid: "7",
      discussionId: "discussion-1",
      noteId: "99",
      deleted: true,
      executed: true
    });
  });
});
