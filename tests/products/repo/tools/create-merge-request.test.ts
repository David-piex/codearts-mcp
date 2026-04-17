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
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      sourceBranch: "feature/demo",
      targetBranch: "main",
      title: "Add demo",
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
