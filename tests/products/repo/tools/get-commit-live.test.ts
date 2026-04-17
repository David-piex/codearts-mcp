import { describe, expect, it } from "vitest";
import { createRepoGetCommitHandler } from "../../../../src/products/repo/tools/get-commit.js";

describe("createRepoGetCommitHandler", () => {
  it("maps commit detail into MCP output", async () => {
    const handler = createRepoGetCommitHandler({
      getCommit: async () => ({
        id: "abc123",
        short_id: "abc123",
        title: "feat: add login",
        author_name: "Yao",
        message: "feat: add login"
      })
    });

    const result = await handler({ repository_id: "repo-1", commit_sha: "abc123" });

    expect(result.structuredContent.item).toEqual({
      id: "abc123",
      shortId: "abc123",
      title: "feat: add login",
      authorName: "Yao",
      message: "feat: add login"
    });
  });
});
