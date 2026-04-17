import { describe, expect, it } from "vitest";
import { createBuildGetRecordHandler } from "../../../../src/products/build/tools/get-record.js";

describe("createBuildGetRecordHandler", () => {
  it("maps build record detail into MCP output", async () => {
    const handler = createBuildGetRecordHandler({
      getRecord: async () => ({
        record_id: "record-1",
        job_id: "job-1",
        status: "SUCCESS",
        trigger_type: "MANUAL",
        commit_id: "abc123"
      })
    });

    const result = await handler({ record_id: "record-1" });

    expect(result.structuredContent.item).toEqual({
      id: "record-1",
      jobId: "job-1",
      status: "SUCCESS",
      triggerType: "MANUAL",
      commitId: "abc123"
    });
  });
});
