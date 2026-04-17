import { describe, expect, it } from "vitest";
import {
  mapDeletedTag,
  previewDeleteTag
} from "../../../../src/products/repo/tools/delete-tag.js";

describe("previewDeleteTag", () => {
  it("returns a dry-run summary for deleting a tag", () => {
    const result = previewDeleteTag({
      repository_id: "repo-1",
      tag_name: "v1.0.0",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      repositoryId: "repo-1",
      tagName: "v1.0.0",
      executed: false
    });
  });
});

describe("mapDeletedTag", () => {
  it("returns normalized deleted tag data", () => {
    const result = mapDeletedTag({
      tag_name: "v1.0.0",
      deleted: true
    });

    expect(result.item).toEqual({
      id: "v1.0.0",
      tagName: "v1.0.0",
      deleted: true,
      executed: true
    });
  });
});
