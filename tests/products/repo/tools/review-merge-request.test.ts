import { describe, expect, it } from "vitest";
import {
  mapReviewedMergeRequest,
  previewReviewMergeRequest
} from "../../../../src/products/repo/tools/review-merge-request.js";

describe("previewReviewMergeRequest", () => {
  it("returns a dry-run summary for reviewing a merge request", () => {
    const result = previewReviewMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "12",
      action_type: "approve",
      approver_comment: "LGTM",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "12",
      actionType: "approve",
      approverComment: "LGTM",
      executed: false
    });
  });
});

describe("mapReviewedMergeRequest", () => {
  it("returns normalized reviewed merge request data", () => {
    const result = mapReviewedMergeRequest(
      {
        repository_id: "repo-1",
        merge_request_iid: "12",
        action_type: "approve",
        approver_comment: "LGTM"
      },
      [
        {
          id: 1,
          name: "Alice",
          nick_name: "alice",
          state: "approved",
          updated_at: "2026-04-17T08:30:00Z",
          approver_comment: "LGTM"
        }
      ]
    );

    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "12",
      actionType: "approve",
      approverComment: "LGTM",
      reviewerCount: 1,
      reviewers: [
        {
          id: "1",
          name: "Alice",
          nickName: "alice",
          state: "approved",
          updatedAt: "2026-04-17T08:30:00Z",
          approverComment: "LGTM"
        }
      ],
      executed: true
    });
  });
});
