import { describe, expect, it } from "vitest";
import { createRepoCompareRefsHandler } from "../../../../src/products/repo/tools/compare-refs.js";

describe("createRepoCompareRefsHandler", () => {
  it("maps ref comparison into MCP output", async () => {
    const handler = createRepoCompareRefsHandler({
      compareRefs: async () => ({
        from: "main",
        to: "release/1.2.0",
        compare_type: "direct",
        compare_timeout: false,
        compare_same_ref: false,
        commits: [{ id: "c1", short_id: "c1", title: "fix bug" }],
        diffs: [{ old_path: "a.ts", new_path: "a.ts", diff: "@@ -1 +1 @@" }]
      })
    });

    const result = await handler({
      repository_id: "repo-1",
      from: "main",
      to: "release/1.2.0"
    });

    expect(result.structuredContent.item?.from).toBe("main");
    expect(result.structuredContent.item?.to).toBe("release/1.2.0");
    expect(result.structuredContent.item?.compareType).toBe("direct");
    expect(result.structuredContent.item?.commitCount).toBe(1);
    expect(result.structuredContent.item?.fileCount).toBe(1);
  });
});
