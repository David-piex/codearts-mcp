import { describe, expect, it } from "vitest";
import {
  mapMergedMergeRequest,
  previewMergeMergeRequest
} from "../../../../src/products/repo/tools/merge-merge-request.js";

describe("previewMergeMergeRequest", () => {
  it("returns a dry-run summary for merging a merge request", () => {
    const result = previewMergeMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "12",
      squash: true,
      force_merge: false,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "12",
      squash: true,
      forceMerge: false,
      executed: false
    });
  });
});

describe("mapMergedMergeRequest", () => {
  it("returns normalized merged merge request data", () => {
    const result = mapMergedMergeRequest({
      id: 101,
      iid: 12,
      repository_id: 7,
      title: "Add demo",
      state: "merged",
      source_branch: "feature/demo",
      target_branch: "main",
      web_url: "https://example.com/mr/12"
    });

    expect(result.item).toEqual({
      id: "101",
      iid: 12,
      repositoryId: "7",
      title: "Add demo",
      state: "merged",
      sourceBranch: "feature/demo",
      targetBranch: "main",
      webUrl: "https://example.com/mr/12",
      executed: true
    });
  });
});
