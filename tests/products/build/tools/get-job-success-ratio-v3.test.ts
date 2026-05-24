import { describe, expect, it } from "vitest";
import { createBuildGetJobSuccessRatioV3Handler } from "../../../../src/products/build/tools/get-job-success-ratio-v3.js";

describe("createBuildGetJobSuccessRatioV3Handler", () => {
  it("maps v3 job success ratio into MCP output", async () => {
    const handler = createBuildGetJobSuccessRatioV3Handler({
      getJobSuccessRatioV3: async () => ({
        job_id: "job-1",
        start_time: "2026-05-01",
        end_time: "2026-05-24",
        raw: {
          success_count: 2,
          total_count: 3,
          success_ratio: 0.67
        }
      })
    });

    const result = await handler({
      job_id: "job-1",
      start_time: "2026-05-01",
      end_time: "2026-05-24"
    });

    expect(result.content[0]?.text).toContain("Loaded Build v3 job success ratio");
    expect(result.structuredContent.item).toMatchObject({
      id: "job-1",
      jobId: "job-1",
      startTime: "2026-05-01",
      endTime: "2026-05-24",
      ratio: {
        success_count: 2,
        total_count: 3,
        success_ratio: 0.67
      }
    });
  });
});
