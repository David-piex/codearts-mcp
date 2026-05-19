import { describe, expect, it } from "vitest";
import {
  mapCreatedMergeRequest,
  previewCreateMergeRequest
} from "../../../../src/products/repo/tools/create-merge-request.js";

describe("previewCreateMergeRequest", () => {
  it("returns a dry-run summary for creating a merge request", () => {
    const result = previewCreateMergeRequest({
      repository_id: "repo-1",
      source_branch: "feature/demo",
      target_branch: "main",
      title: "Add demo",
      work_item_ids: ["70824317"],
      target_project_id: "target-project-1",
      assignee_id: 1001,
      reviewer_ids: [1002, "1003"],
      remove_source_branch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestone_id: 7,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      sourceBranch: "feature/demo",
      targetBranch: "main",
      title: "Add demo",
      workItemIds: ["70824317"],
      targetProjectId: "target-project-1",
      assigneeId: 1001,
      reviewerIds: [1002, "1003"],
      removeSourceBranch: true,
      squash: true,
      draft: false,
      labels: ["feat", "api"],
      milestoneId: 7,
      executed: false
    });
  });
});

describe("mapCreatedMergeRequest", () => {
  it("returns normalized created merge request data", () => {
    const result = mapCreatedMergeRequest({
      id: 101,
      iid: 12,
      repository_id: 7,
      title: "Add demo",
      description: "Demo change",
      state: "opened",
      source_branch: "feature/demo",
      target_branch: "main",
      web_url: "https://example.com/mr/12"
    });

    expect(result.item).toEqual({
      id: "101",
      iid: 12,
      repositoryId: "7",
      title: "Add demo",
      description: "Demo change",
      state: "opened",
      sourceBranch: "feature/demo",
      targetBranch: "main",
      webUrl: "https://example.com/mr/12",
      executed: true
    });
  });
});
