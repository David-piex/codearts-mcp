import { describe, expect, it } from "vitest";
import { reqUpdateWorkItemCommentInput as reqUpdateWorkItemCommentInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateWorkItemCommentInput } from "../../../../src/products/req/schemas/comment.js";
import {
  createReqUpdateWorkItemCommentHandler,
  mapUpdatedWorkItemComment,
  previewUpdateWorkItemComment
} from "../../../../src/products/req/tools/update-work-item-comment.js";

describe("previewUpdateWorkItemComment", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateWorkItemComment({
      project_id: "p-1",
      work_item_id: "wi-9",
      comment_id: "comment-1",
      content: "Updated comment",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      commentId: "comment-1",
      content: "Updated comment",
      executed: false
    });
  });
});

describe("mapUpdatedWorkItemComment", () => {
  it("returns normalized updated comment data", () => {
    const result = mapUpdatedWorkItemComment({
      work_item_id: "wi-9",
      comment_id: "comment-1",
      content: "Updated comment",
      status: "success"
    });

    expect(result.item).toEqual({
      workItemId: "wi-9",
      commentId: "comment-1",
      content: "Updated comment",
      status: "success",
      executed: true
    });
  });
});

describe("reqUpdateWorkItemCommentInput exports", () => {
  it("keeps the barrel export compatible with the comment schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      comment_id: "comment-1",
      content: "Updated comment"
    };

    expect(reqUpdateWorkItemCommentInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateWorkItemCommentInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateWorkItemCommentHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqUpdateWorkItemCommentHandler({
      updateWorkItemComment: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      comment_id: "comment-1",
      content: "Updated comment",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      commentId: "comment-1",
      content: "Updated comment",
      executed: false
    });
  });

  it("maps updated work item comment into MCP output", async () => {
    const handler = createReqUpdateWorkItemCommentHandler({
      updateWorkItemComment: async () => ({
        work_item_id: "wi-9",
        comment_id: "comment-1",
        content: "Updated comment",
        status: "success"
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      comment_id: "comment-1",
      content: "Updated comment",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      workItemId: "wi-9",
      commentId: "comment-1",
      content: "Updated comment",
      status: "success",
      executed: true
    });
  });
});
