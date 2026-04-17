import { describe, expect, it } from "vitest";
import { createBuildListProjectRecordsHandler } from "../../../../src/products/build/tools/list-project-records.js";

describe("createBuildListProjectRecordsHandler", () => {
  it("maps project build records into MCP output", async () => {
    const handler = createBuildListProjectRecordsHandler({
      listProjectRecords: async () => ({
        records: [
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
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      build_project_id: "build-project-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]?.recordId).toBe("record-1");
    expect(result.structuredContent.items?.[0]?.jobName).toBe("release-build");
    expect(result.structuredContent.page_info?.page).toBe(1);
  });
});
