import { describe, expect, it } from "vitest";
import { createRepoCreateTagHandler } from "../../../../src/products/repo/tools/create-tag.js";

describe("createRepoCreateTagHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createRepoCreateTagHandler({
      createTag: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      repository_id: "1001",
      tag_name: "v1.0.0",
      ref: "main",
      message: "first release",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      repositoryId: "1001",
      tagName: "v1.0.0",
      ref: "main",
      message: "first release",
      executed: false
    });
  });

  it("maps created tag into MCP output", async () => {
    const handler = createRepoCreateTagHandler({
      createTag: async () => ({
        tag_name: "v1.0.0",
        ref: "main",
        message: "first release"
      })
    });

    const result = await handler({
      repository_id: "1001",
      tag_name: "v1.0.0",
      ref: "main",
      message: "first release",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "v1.0.0",
      tagName: "v1.0.0",
      ref: "main",
      message: "first release",
      executed: true
    });
  });
});
