import { describe, expect, it } from "vitest";
import { createRepoGetBranchHandler } from "../../../../src/products/repo/tools/get-branch.js";

describe("createRepoGetBranchHandler", () => {
  it("maps branch detail into MCP output", async () => {
    const handler = createRepoGetBranchHandler({
      getBranch: async () => ({
        name: "release/1.2.0",
        protected: true,
        default: false,
        can_push: false,
        web_url: "https://example.com/release/1.2.0",
        commit: {
          id: "abc123",
          short_id: "abc123",
          title: "release commit",
          author_name: "Alice",
          created_at: "2026-04-16T10:00:00Z"
        }
      })
    });

    const result = await handler({
      repository_id: "repo-1",
      branch_name: "release/1.2.0"
    });

    expect(result.structuredContent.item).toEqual({
      id: "release/1.2.0",
      name: "release/1.2.0",
      protected: true,
      default: false,
      canPush: false,
      webUrl: "https://example.com/release/1.2.0",
      commit: {
        id: "abc123",
        shortId: "abc123",
        title: "release commit",
        authorName: "Alice",
        createdAt: "2026-04-16T10:00:00Z"
      }
    });
  });
});
