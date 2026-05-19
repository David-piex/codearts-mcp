import { describe, expect, it } from "vitest";
import {
  mapUpdatedMergeRequest,
  previewUpdateMergeRequest
} from "../../../../src/products/repo/tools/update-merge-request.js";

describe("previewUpdateMergeRequest", () => {
  it("returns a dry-run summary for updating a merge request", () => {
    const result = previewUpdateMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "2",
      title: "Update demo",
      state_event: "reopen",
      assignee_ids: [1001, "1002"],
      reviewer_ids: [1003, "1004"],
      description: "Updated demo",
      milestone_id: 7,
      labels: ["feat", "api"],
      force_remove_source_branch: true,
      squash: true,
      squash_commit_message: "Squash demo",
      work_item_ids: ["70824317"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "2",
      title: "Update demo",
      stateEvent: "reopen",
      assigneeIds: [1001, "1002"],
      reviewerIds: [1003, "1004"],
      description: "Updated demo",
      milestoneId: 7,
      labels: ["feat", "api"],
      forceRemoveSourceBranch: true,
      squash: true,
      squashCommitMessage: "Squash demo",
      workItemIds: ["70824317"],
      executed: false
    });
  });
});

describe("mapUpdatedMergeRequest", () => {
  it("returns normalized updated merge request data", () => {
    const result = mapUpdatedMergeRequest({
      id: 101,
      iid: 12,
      repository_id: 7,
      title: "Update demo",
      description: "Updated demo",
      state: "opened",
      source_branch: "feature/demo",
      target_branch: "main",
      web_url: "https://example.com/mr/12"
    });

    expect(result.item).toEqual({
      id: "101",
      iid: 12,
      repositoryId: "7",
      title: "Update demo",
      description: "Updated demo",
      state: "opened",
      sourceBranch: "feature/demo",
      targetBranch: "main",
      webUrl: "https://example.com/mr/12",
      executed: true
    });
  });
});
