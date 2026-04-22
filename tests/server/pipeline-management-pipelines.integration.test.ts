import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineDeletePipelineHandler,
  createSessionAwarePipelineDisablePipelineHandler,
  createSessionAwarePipelineEnablePipelineHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_delete_pipeline through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeletePipelineHandler,
      input: {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        dry_run: false
      },
      responsePayload: {
        pipeline_id: "pipeline-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "pipeline-1",
          projectId: "project-1",
          pipelineId: "pipeline-1",
          deleted: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipelines/pipeline-1");
    expect(request.init.method).toBe("DELETE");
  });


  it("executes pipeline_disable_pipeline through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDisablePipelineHandler,
      input: {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "pipeline-1",
          projectId: "project-1",
          pipelineId: "pipeline-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipelines/pipeline-1/ban");
    expect(request.init.method).toBe("PUT");
  });


  it("executes pipeline_enable_pipeline through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineEnablePipelineHandler,
      input: {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "pipeline-1",
          projectId: "project-1",
          pipelineId: "pipeline-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipelines/pipeline-1/unban");
    expect(request.init.method).toBe("PUT");
  });

});
