import { describe, expect, it } from "vitest";
import { createBuildGetRealTimeLogHandler } from "../../../../src/products/build/tools/get-real-time-log.js";

describe("createBuildGetRealTimeLogHandler", () => {
  it("maps build real-time log into MCP output", async () => {
    const handler = createBuildGetRealTimeLogHandler({
      getRealTimeLog: async () => ({
        job_id: "job-1",
        build_no: 33,
        content: "[INFO] build success",
        has_more_data: true,
        offset: 126548,
        current_offset: 121768
      })
    });

    const result = await handler({ job_id: "job-1", build_no: 33, offset: 0 });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      buildNo: 33,
      content: "[INFO] build success",
      hasMoreData: true,
      offset: 126548,
      currentOffset: 121768
    });
  });
});
