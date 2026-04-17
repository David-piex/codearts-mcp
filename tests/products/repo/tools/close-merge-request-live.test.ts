import { describe, expect, it } from "vitest";
import { createRepoCloseMergeRequestHandler } from "../../../../src/products/repo/tools/close-merge-request.js";

describe("createRepoCloseMergeRequestHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoCloseMergeRequestHandler({
      closeMergeRequest: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      stateEvent: "close",
      executed: false
    });
  });

  it("maps closed merge request into MCP output", async () => {
    const handler = createRepoCloseMergeRequestHandler({
      closeMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        state: "closed",
        source_branch: "feature/login",
        target_branch: "main",
        web_url: "https://example.com/mr/7"
      })
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "47858",
      iid: 7,
      repositoryId: "2111983939",
      title: "Merge feature/login into main",
      state: "closed",
      sourceBranch: "feature/login",
      targetBranch: "main",
      webUrl: "https://example.com/mr/7",
      executed: true
    });
  });
});
