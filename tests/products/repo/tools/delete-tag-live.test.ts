import { describe, expect, it } from "vitest";
import { createRepoDeleteTagHandler } from "../../../../src/products/repo/tools/delete-tag.js";

describe("createRepoDeleteTagHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoDeleteTagHandler({
      deleteTag: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      tag_name: "v1.0.0",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      tagName: "v1.0.0",
      executed: false
    });
  });

  it("maps deleted tag into MCP output", async () => {
    const handler = createRepoDeleteTagHandler({
      deleteTag: async () => ({
        tag_name: "v1.0.0",
        deleted: true
      })
    });

    const result = await handler({
      repository_id: "1001",
      tag_name: "v1.0.0",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "v1.0.0",
      tagName: "v1.0.0",
      deleted: true,
      executed: true
    });
  });
});
