import { describe, expect, it } from "vitest";
import { createRepoCreateMergeRequestHandler } from "../../../../src/products/repo/tools/create-merge-request.js";

describe("createRepoCreateMergeRequestHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoCreateMergeRequestHandler({
      createMergeRequest: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      source_branch: "feature/login",
      target_branch: "main",
      title: "Merge feature/login into main",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      sourceBranch: "feature/login",
      targetBranch: "main",
      title: "Merge feature/login into main",
      executed: false
    });
  });

  it("maps created merge request into MCP output", async () => {
    const handler = createRepoCreateMergeRequestHandler({
      createMergeRequest: async () => ({
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
      source_branch: "feature/login",
      target_branch: "main",
      title: "Merge feature/login into main",
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
