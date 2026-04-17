import { describe, expect, it } from "vitest";
import { mapRepoRefComparison } from "../../../../src/products/repo/tools/compare-refs.js";

describe("mapRepoRefComparison", () => {
  it("returns normalized ref comparison data", () => {
    const result = mapRepoRefComparison({
      from: "main",
      to: "release/1.2.0",
      commits: [{ id: "c1", short_id: "c1", title: "fix bug" }],
      diffs: [{ old_path: "a.ts", new_path: "a.ts", diff: "@@ -1 +1 @@" }],
      compare_timeout: false,
      compare_same_ref: false
    });

    expect(result.item?.from).toBe("main");
    expect(result.item?.to).toBe("release/1.2.0");
    expect(result.item?.commitCount).toBe(1);
    expect(result.item?.fileCount).toBe(1);
  });
});
