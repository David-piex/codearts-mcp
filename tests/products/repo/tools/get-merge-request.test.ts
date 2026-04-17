import { describe, expect, it } from "vitest";
import { mapMergeRequestDetail } from "../../../../src/products/repo/tools/get-merge-request.js";

describe("mapMergeRequestDetail", () => {
  it("returns normalized merge request detail data", () => {
    const result = mapMergeRequestDetail({
      id: 101,
      iid: 12,
      repository_id: 33,
      title: "Release 1.2.0",
      description: "Prepare release",
      state: "opened",
      source_branch: "release/1.2.0",
      target_branch: "main",
      created_at: "2026-04-16T10:00:00Z",
      updated_at: "2026-04-16T10:30:00Z",
      author: { name: "Alice", nick_name: "alice" },
      web_url: "https://example.com/mr/12"
    });

    expect(result.item).toEqual({
      id: "101",
      iid: 12,
      repositoryId: "33",
      title: "Release 1.2.0",
      description: "Prepare release",
      state: "opened",
      sourceBranch: "release/1.2.0",
      targetBranch: "main",
      createdAt: "2026-04-16T10:00:00Z",
      updatedAt: "2026-04-16T10:30:00Z",
      authorName: "Alice",
      authorNickName: "alice",
      webUrl: "https://example.com/mr/12"
    });
  });
});
