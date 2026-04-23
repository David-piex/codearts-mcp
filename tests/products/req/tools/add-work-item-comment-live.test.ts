import { describe, expect, it } from "vitest";
import { createReqAddWorkItemCommentHandler } from "../../../../src/products/req/tools/add-work-item-comment.js";

describe("createReqAddWorkItemCommentHandler", () => {
  it("maps provider comment add result into MCP output", async () => {
    const handler = createReqAddWorkItemCommentHandler({
      addWorkItemComment: async () => ({
        work_item_id: "101",
        content: "Live style comment"
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "101",
      content: "Live style comment",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      workItemId: "101",
      content: "Live style comment",
      executed: true
    });
  });
});
