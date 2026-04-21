import { describe, expect, it } from "vitest";
import { createBuildListRecordsHandler } from "../../../../src/products/build/tools/list-records.js";

describe("createBuildListRecordsHandler", () => {
  it("maps build records into MCP output", async () => {
    const handler = createBuildListRecordsHandler({
      listRecords: async () => ({
        records: [
          {
            record_id: "record-1",
            job_id: "job-1",
            status: "SUCCESS",
            trigger_type: "MANUAL"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ job_id: "job-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 build records");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "record-1",
      jobId: "job-1",
      status: "SUCCESS",
      triggerType: "MANUAL"
    });
  });

  it("adds a job-scoped hint when the build record list is empty", async () => {
    const handler = createBuildListRecordsHandler({
      listRecords: async () => ({
        records: [],
        total: 0
      })
    });

    const result = await handler({ job_id: "job-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 build records found");
    expect(result.content[0]?.text).toContain("If you expected build records here");
    expect(result.content[0]?.text).toContain("job-empty");
  });
});
