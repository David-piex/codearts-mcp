import { describe, expect, it } from "vitest";
import { mapBuildProjectRecords } from "../../../../src/products/build/tools/list-project-records.js";

describe("mapBuildProjectRecords", () => {
  it("returns normalized project build records", () => {
    const result = mapBuildProjectRecords([
      {
        record_id: "record-1",
        job_id: "job-1",
        job_name: "release-build",
        status: "SUCCESS",
        trigger_type: "Manual",
        branch: "main",
        commit_id: "abc123",
        executor: "yao",
        start_time: 1710000000000
      }
    ]);

    expect(result.items?.[0]?.recordId).toBe("record-1");
    expect(result.items?.[0]?.jobName).toBe("release-build");
  });
});
