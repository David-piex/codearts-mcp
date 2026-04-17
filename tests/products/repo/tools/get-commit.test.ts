import { describe, expect, it } from "vitest";
import { mapRepoCommit } from "../../../../src/products/repo/tools/get-commit.js";

describe("mapRepoCommit", () => {
  it("returns normalized commit detail data", () => {
    const result = mapRepoCommit({
      id: "abc123",
      short_id: "abc123",
      title: "fix: normalize refs",
      author_name: "Alice",
      message: "fix: normalize refs\n\nMore details"
    });

    expect(result.item).toEqual({
      id: "abc123",
      shortId: "abc123",
      title: "fix: normalize refs",
      authorName: "Alice",
      message: "fix: normalize refs\n\nMore details"
    });
  });
});
