import { describe, expect, it } from "vitest";
import { mapRepoBranch } from "../../../../src/products/repo/tools/get-branch.js";

describe("mapRepoBranch", () => {
  it("returns normalized branch detail metadata", () => {
    const result = mapRepoBranch({
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
    });

    expect(result.item?.id).toBe("release/1.2.0");
    expect(result.item?.protected).toBe(true);
    expect(result.item?.commit?.id).toBe("abc123");
  });
});
