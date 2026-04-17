import { describe, expect, it } from "vitest";
import { createBuildGetInfoRecordHandler } from "../../../../src/products/build/tools/get-info-record.js";

describe("createBuildGetInfoRecordHandler", () => {
  it("maps build info record into MCP output", async () => {
    const handler = createBuildGetInfoRecordHandler({
      getInfoRecord: async () => ({
        number: 5,
        job_running_status: "Finished",
        state: "FAILURE",
        executor: "readyrunning",
        trigger_type: "MANUAL",
        cost_time: 9132,
        scm_type: "codehub"
      })
    });

    const result = await handler({ job_id: "job-1", build_no: 5 });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      buildNo: 5,
      runningStatus: "Finished",
      state: "FAILURE",
      executor: "readyrunning",
      triggerType: "MANUAL",
      costTime: 9132,
      scmType: "codehub"
    });
  });
});
