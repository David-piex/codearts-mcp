import { describe, expect, it } from "vitest";
import {
  mapClosedMergeRequest,
  previewCloseMergeRequest
} from "../../../../src/products/repo/tools/close-merge-request.js";

describe("previewCloseMergeRequest", () => {
  it("returns a dry-run summary for closing a merge request", () => {
    const result = previewCloseMergeRequest({
      repository_id: "repo-1",
      merge_request_iid: "12",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "12",
      stateEvent: "close",
      executed: false
    });
  });
});

describe("mapClosedMergeRequest", () => {
  it("returns normalized closed merge request data", () => {
    const result = mapClosedMergeRequest({
      id: 101,
      iid: 12,
      repository_id: 7,
      title: "Release 1.2.0",
      state: "closed",
      source_branch: "release/1.2.0",
      target_branch: "main",
      web_url: "https://example.com/mr/12"
    });

    expect(result.item).toEqual({
      id: "101",
      iid: 12,
      repositoryId: "7",
      title: "Release 1.2.0",
      state: "closed",
      sourceBranch: "release/1.2.0",
      targetBranch: "main",
      webUrl: "https://example.com/mr/12",
      executed: true
    });
  });
});
