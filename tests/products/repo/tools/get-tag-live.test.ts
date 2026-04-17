import { describe, expect, it } from "vitest";
import { createRepoGetTagHandler } from "../../../../src/products/repo/tools/get-tag.js";

describe("createRepoGetTagHandler", () => {
  it("maps tag detail into MCP output", async () => {
    const handler = createRepoGetTagHandler({
      getTag: async () => ({
        name: "v1.2.0",
        message: "release",
        target: "abc123",
        commit: {
          id: "abc123",
          short_id: "abc123",
          title: "release commit"
        }
      })
    });

    const result = await handler({
      repository_id: "repo-1",
      tag_name: "v1.2.0"
    });

    expect(result.structuredContent.item).toEqual({
      id: "v1.2.0",
      name: "v1.2.0",
      message: "release",
      target: "abc123",
      commit: {
        id: "abc123",
        shortId: "abc123",
        title: "release commit",
        authorName: undefined,
        createdAt: undefined
      }
    });
  });
});
