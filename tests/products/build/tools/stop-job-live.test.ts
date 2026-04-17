import { describe, expect, it } from "vitest";
import { createBuildStopJobHandler } from "../../../../src/products/build/tools/stop-job.js";

describe("createBuildStopJobHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createBuildStopJobHandler({
      stopJob: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      job_id: "job-1",
      build_no: 20,
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      buildNo: 20,
      executed: false
    });
  });

  it("maps build stop result into MCP output", async () => {
    const handler = createBuildStopJobHandler({
      stopJob: async () => ({
        job_id: "job-1",
        build_no: 20,
        result: true
      })
    });

    const result = await handler({ job_id: "job-1", build_no: 20, dry_run: false });

    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      buildNo: 20,
      stopped: true,
      executed: true
    });
  });
});
