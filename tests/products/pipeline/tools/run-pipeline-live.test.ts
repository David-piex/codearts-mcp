import { describe, expect, it } from "vitest";
import { createPipelineRunPipelineHandler } from "../../../../src/products/pipeline/tools/run-pipeline.js";

describe("createPipelineRunPipelineHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createPipelineRunPipelineHandler({
      runPipeline: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      branch: "main",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      branch: "main",
      executed: false
    });
  });

  it("maps pipeline run result into MCP output", async () => {
    const handler = createPipelineRunPipelineHandler({
      runPipeline: async () => ({
        pipeline_run_id: "run-1"
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      branch: "main",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      branch: "main",
      executed: true
    });
  });
});
