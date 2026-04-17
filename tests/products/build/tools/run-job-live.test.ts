import { describe, expect, it } from "vitest";
import { createBuildRunJobHandler } from "../../../../src/products/build/tools/run-job.js";

describe("createBuildRunJobHandler", () => {
  it("maps build run result into MCP output", async () => {
    const handler = createBuildRunJobHandler({
      runJob: async () => ({
        job_id: "job-1",
        record_id: "record-1",
        status: "RUNNING"
      })
    });

    const result = await handler({ job_id: "job-1", dry_run: false });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      recordId: "record-1",
      status: "RUNNING",
      executed: true
    });
  });
});
