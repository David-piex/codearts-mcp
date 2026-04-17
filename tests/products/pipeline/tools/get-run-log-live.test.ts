import { describe, expect, it } from "vitest";
import { createPipelineGetRunLogHandler } from "../../../../src/products/pipeline/tools/get-run-log.js";

describe("createPipelineGetRunLogHandler", () => {
  it("maps step log payload into MCP output", async () => {
    const handler = createPipelineGetRunLogHandler({
      getRunLog: async () => ({
        log: "line1\nline2",
        status: "SUCCESS",
        truncated: false
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });

    expect(result.structuredContent.item).toEqual({
      pipelineRunId: "run-1",
      log: "line1\nline2",
      size: 11,
      truncated: false,
      status: "SUCCESS"
    });
  });
});
