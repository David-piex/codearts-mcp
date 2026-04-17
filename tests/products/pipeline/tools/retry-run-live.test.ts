import { describe, expect, it } from "vitest";
import { createPipelineRetryRunHandler } from "../../../../src/products/pipeline/tools/retry-run.js";

describe("createPipelineRetryRunHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createPipelineRetryRunHandler({
      retryRun: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      executed: false
    });
  });

  it("maps retried pipeline run into MCP output", async () => {
    const handler = createPipelineRetryRunHandler({
      retryRun: async () => ({
        pipeline_run_id: "run-2"
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      sourceRunId: "run-1",
      pipelineRunId: "run-2",
      executed: true
    });
  });
});
