import { describe, expect, it } from "vitest";
import { createRepoUpdateMergeRequestHandler } from "../../../../src/products/repo/tools/update-merge-request.js";

describe("createRepoUpdateMergeRequestHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoUpdateMergeRequestHandler({
      updateMergeRequest: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      title: "Merge feature/login into main",
      work_item_ids: ["70824317"],
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      mergeRequestIid: "7",
      title: "Merge feature/login into main",
      workItemIds: ["70824317"],
      executed: false
    });
  });

  it("maps updated merge request into MCP output", async () => {
    const handler = createRepoUpdateMergeRequestHandler({
      updateMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        description: "merge feature/login into main",
        state: "opened",
        source_branch: "feature/login",
        target_branch: "main",
        web_url: "https://example.com/mr/7"
      })
    });

    const result = await handler({
      repository_id: "1001",
      merge_request_iid: "7",
      title: "Merge feature/login into main",
      work_item_ids: ["70824317"],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "47858",
      iid: 7,
      repositoryId: "2111983939",
      title: "Merge feature/login into main",
      description: "merge feature/login into main",
      state: "opened",
      sourceBranch: "feature/login",
      targetBranch: "main",
      webUrl: "https://example.com/mr/7",
      executed: true
    });
  });
});
