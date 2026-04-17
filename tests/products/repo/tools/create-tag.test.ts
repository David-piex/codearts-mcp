import { describe, expect, it } from "vitest";
import {
  mapCreatedTag,
  previewCreateTag
} from "../../../../src/products/repo/tools/create-tag.js";

describe("previewCreateTag", () => {
  it("returns a dry-run summary for creating a tag", () => {
    const result = previewCreateTag({
      repository_id: "repo-1",
      tag_name: "v1.0.0",
      ref: "main",
      message: "release",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      tagName: "v1.0.0",
      ref: "main",
      message: "release",
      executed: false
    });
  });
});

describe("mapCreatedTag", () => {
  it("returns normalized created tag data", () => {
    const result = mapCreatedTag({
      tag_name: "v1.0.0",
      ref: "main",
      message: "release"
    });

    expect(result.item).toEqual({
      id: "v1.0.0",
      tagName: "v1.0.0",
      ref: "main",
      message: "release",
      executed: true
    });
  });
});
