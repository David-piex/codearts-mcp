import { describe, expect, it } from "vitest";
import { createRepoReviewMergeRequestHandler } from "../../../../src/products/repo/tools/review-merge-request.js";

describe("createRepoReviewMergeRequestHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoReviewMergeRequestHandler({
      reviewMergeRequest: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      action_type: "approve",
      approver_comment: "LGTM",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      actionType: "approve",
      approverComment: "LGTM",
      executed: false
    });
  });

  it("maps review result into MCP output", async () => {
    const handler = createRepoReviewMergeRequestHandler({
      reviewMergeRequest: async () => ({
        reviewers: [
          {
            id: 10311,
            name: "dev1",
            nick_name: "dev1_nick",
            state: "approve",
            updated_at: "2025-04-27T19:35:16.708+08:00",
            approver_comment: "LGTM"
          }
        ]
      })
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      action_type: "approve",
      approver_comment: "LGTM",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      actionType: "approve",
      approverComment: "LGTM",
      reviewerCount: 1,
      reviewers: [
        {
          id: "10311",
          name: "dev1",
          nickName: "dev1_nick",
          state: "approve",
          updatedAt: "2025-04-27T19:35:16.708+08:00",
          approverComment: "LGTM"
        }
      ],
      executed: true
    });
  });
});
