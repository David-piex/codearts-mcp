import { describe, expect, it } from "vitest";
import { mapRepoTag } from "../../../../src/products/repo/tools/get-tag.js";

describe("mapRepoTag", () => {
  it("returns normalized tag detail metadata", () => {
    const result = mapRepoTag({
      name: "v1.2.0",
      message: "release",
      target: "abc123",
      commit: {
        id: "abc123",
        short_id: "abc123",
        title: "release commit"
      }
    });

    expect(result.item?.id).toBe("v1.2.0");
    expect(result.item?.target).toBe("abc123");
    expect(result.item?.commit?.title).toBe("release commit");
  });
});
