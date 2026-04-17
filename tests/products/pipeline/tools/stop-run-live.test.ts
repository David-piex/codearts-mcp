import { describe, expect, it } from "vitest";
import { createPipelineStopRunHandler } from "../../../../src/products/pipeline/tools/stop-run.js";

describe("createPipelineStopRunHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createPipelineStopRunHandler({
      stopRun: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      executed: false
    });
  });

  it("maps stopped pipeline run into MCP output", async () => {
    const handler = createPipelineStopRunHandler({
      stopRun: async () => ({
        pipeline_id: "pipe-1",
        pipeline_name: "release-main"
      })
    });

    const result = await handler({
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      pipelineId: "pipe-1",
      pipelineName: "release-main",
      pipelineRunId: "run-1",
      executed: true
    });
  });
});
