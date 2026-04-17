import { describe, expect, it } from "vitest";
import {
  mapCreatedMergeRequestDiscussion,
  previewCreateMergeRequestDiscussion
} from "../../../../src/products/repo/tools/create-merge-request-discussion.js";

describe("previewCreateMergeRequestDiscussion", () => {
  it("returns a dry-run summary for creating a merge request discussion", () => {
    const result = previewCreateMergeRequestDiscussion({
      repository_id: "repo-1",
      merge_request_iid: "12",
      body: "Looks good",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      mergeRequestIid: "12",
      body: "Looks good",
      executed: false
    });
  });
});

describe("mapCreatedMergeRequestDiscussion", () => {
  it("returns normalized created discussion data", () => {
    const result = mapCreatedMergeRequestDiscussion({
      discussion_id: "d-1",
      body: "Looks good",
      created_at: "2026-04-17T08:00:00Z",
      author: { name: "Alice", nick_name: "alice" }
    });

    expect(result.item).toEqual({
      id: "d-1",
      body: "Looks good",
      createdAt: "2026-04-17T08:00:00Z",
      authorName: "Alice",
      authorNickName: "alice",
      executed: true
    });
  });
});
