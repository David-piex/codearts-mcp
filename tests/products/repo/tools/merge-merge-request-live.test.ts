import { describe, expect, it } from "vitest";
import { createRepoMergeMergeRequestHandler } from "../../../../src/products/repo/tools/merge-merge-request.js";

describe("createRepoMergeMergeRequestHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoMergeMergeRequestHandler({
      mergeMergeRequest: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      squash: true,
      force_merge: false,
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      squash: true,
      forceMerge: false,
      executed: false
    });
  });

  it("maps merged merge request into MCP output", async () => {
    const handler = createRepoMergeMergeRequestHandler({
      mergeMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        state: "merged",
        source_branch: "feature/login",
        target_branch: "main",
        web_url: "https://example.com/mr/7"
      })
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      squash: true,
      force_merge: false,
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "47858",
      iid: 7,
      repositoryId: "2111983939",
      title: "Merge feature/login into main",
      state: "merged",
      sourceBranch: "feature/login",
      targetBranch: "main",
      webUrl: "https://example.com/mr/7",
      executed: true
    });
  });
});
