import { describe, expect, it } from "vitest";
import { mapBuildProjectRecordStatistics } from "../../../../src/products/build/tools/get-project-record-statistics.js";

describe("mapBuildProjectRecordStatistics", () => {
  it("returns normalized build statistics", () => {
    const result = mapBuildProjectRecordStatistics("project-1", undefined, {
      total: 12,
      success: 8,
      failed: 2,
      aborted: 1,
      running: 1
    });

    expect(result.item?.projectId).toBe("project-1");
    expect(result.item?.success).toBe(8);
  });
});
