import { describe, expect, it } from "vitest";
import { reqAddWorkItemCommentInput as reqAddWorkItemCommentInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqAddWorkItemCommentInput } from "../../../../src/products/req/schemas/comment.js";
import {
  createReqAddWorkItemCommentHandler,
  mapAddedWorkItemComment,
  previewAddWorkItemComment
} from "../../../../src/products/req/tools/add-work-item-comment.js";

describe("previewAddWorkItemComment", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewAddWorkItemComment({
      project_id: "p-1",
      work_item_id: "wi-9",
      content: "First comment",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      content: "First comment",
      executed: false
    });
  });
});

describe("mapAddedWorkItemComment", () => {
  it("returns normalized added comment data without inventing a comment id", () => {
    const result = mapAddedWorkItemComment({
      work_item_id: "wi-9",
      content: "First comment"
    });

    expect(result.item).toEqual({
      workItemId: "wi-9",
      content: "First comment",
      executed: true
    });
  });
});

describe("reqAddWorkItemCommentInput exports", () => {
  it("keeps the barrel export compatible with the comment schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      content: "First comment"
    };

    expect(reqAddWorkItemCommentInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqAddWorkItemCommentInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqAddWorkItemCommentHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqAddWorkItemCommentHandler({
      addWorkItemComment: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      content: "First comment",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      content: "First comment",
      executed: false
    });
  });

  it("maps added work item comment into MCP output", async () => {
    const handler = createReqAddWorkItemCommentHandler({
      addWorkItemComment: async () => ({
        work_item_id: "wi-9",
        content: "First comment"
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      content: "First comment",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      workItemId: "wi-9",
      content: "First comment",
      executed: true
    });
  });
});
