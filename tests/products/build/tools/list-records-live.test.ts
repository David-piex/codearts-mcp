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
});
