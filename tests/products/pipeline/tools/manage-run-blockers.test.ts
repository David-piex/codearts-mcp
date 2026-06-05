import { describe, expect, it, vi } from "vitest";
import {
  createPipelineAcceptCheckpointHandler,
  mapAcceptCheckpointResult,
  previewAcceptCheckpoint
} from "../../../../src/products/pipeline/tools/accept-checkpoint.js";
import {
  createPipelineAcceptDelayJobHandler,
  mapAcceptDelayJobResult,
  previewAcceptDelayJob
} from "../../../../src/products/pipeline/tools/accept-delay-job.js";
import {
  createPipelineContinueDelayJobHandler,
  mapContinueDelayJobResult,
  previewContinueDelayJob
} from "../../../../src/products/pipeline/tools/continue-delay-job.js";
import {
  createPipelineGetExecLogHandler,
  mapPipelineExecLog
} from "../../../../src/products/pipeline/tools/get-exec-log.js";
import {
  createPipelineRejectCheckpointHandler,
  mapRejectCheckpointResult,
  previewRejectCheckpoint
} from "../../../../src/products/pipeline/tools/reject-checkpoint.js";
import {
  createPipelineRejectDelayJobHandler,
  mapRejectDelayJobResult,
  previewRejectDelayJob
} from "../../../../src/products/pipeline/tools/reject-delay-job.js";
import {
  createPipelineResumePipelineHandler,
  mapResumePipelineResult,
  previewResumePipeline
} from "../../../../src/products/pipeline/tools/resume-pipeline.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("pipeline run blocker previews and mappings", () => {
  it("maps execution log payload as an item result", () => {
    const result = mapPipelineExecLog({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      log: "line1\nline2",
      has_more: true,
      start_offset: "0",
      end_offset: "42"
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      log: "line1\nline2",
      hasMore: true,
      startOffset: "0",
      endOffset: "42"
    });
  });

  it("returns dry-run previews for write tools", () => {
    expectDryRunPreview(
      previewAcceptDelayJob({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        executed: false
      }
    );

    expectDryRunPreview(
      previewRejectDelayJob({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        executed: false
      }
    );

    expectDryRunPreview(
      previewContinueDelayJob({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        executed: false
      }
    );

    expectDryRunPreview(
      previewAcceptCheckpoint({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        stepId: "step-1",
        executed: false
      }
    );

    expectDryRunPreview(
      previewRejectCheckpoint({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        stepId: "step-1",
        executed: false
      }
    );

    expectDryRunPreview(
      previewResumePipeline({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        executed: false
      }
    );
  });

  it("maps executed results for write tools", () => {
    expectMappedItem(
      mapAcceptDelayJobResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );

    expectMappedItem(
      mapRejectDelayJobResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );

    expectMappedItem(
      mapContinueDelayJobResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );

    expectMappedItem(
      mapAcceptCheckpointResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );

    expectMappedItem(
      mapRejectCheckpointResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );

    expectMappedItem(
      mapResumePipelineResult({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        success: true
      }),
      {
        projectId: "project-1",
        pipelineId: "pipe-1",
        pipelineRunId: "run-1",
        jobId: "job-1",
        stepId: "step-1",
        success: true,
        executed: true
      }
    );
  });
});

describe("pipeline run blocker handlers", () => {
  it("maps execution log handler output", async () => {
    const getExecLog = vi.fn().mockResolvedValue({
      log: "hello",
      has_more: false,
      start_offset: "0",
      end_offset: "5"
    });
    const handler = createPipelineGetExecLogHandler({ getExecLog });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      limit: 500,
      sort: "asc"
    });

    expect(getExecLog).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      limit: 500,
      sort: "asc"
    });
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      log: "hello",
      hasMore: false,
      startOffset: "0",
      endOffset: "5"
    });
  });

  it("keeps write handlers in dry-run mode by default", async () => {
    const acceptDelayJob = vi.fn();
    const rejectDelayJob = vi.fn();
    const continueDelayJob = vi.fn();
    const acceptCheckpoint = vi.fn();
    const rejectCheckpoint = vi.fn();
    const resumePipeline = vi.fn();

    const dryRunCases = [
      {
        handler: createPipelineAcceptDelayJobHandler({ acceptDelayJob }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          job_id: "job-1",
          step_id: "step-1"
        }
      },
      {
        handler: createPipelineRejectDelayJobHandler({ rejectDelayJob }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          job_id: "job-1",
          step_id: "step-1"
        }
      },
      {
        handler: createPipelineContinueDelayJobHandler({ continueDelayJob }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          job_id: "job-1",
          step_id: "step-1"
        }
      },
      {
        handler: createPipelineAcceptCheckpointHandler({ acceptCheckpoint }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          step_id: "step-1"
        }
      },
      {
        handler: createPipelineRejectCheckpointHandler({ rejectCheckpoint }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          step_id: "step-1"
        }
      },
      {
        handler: createPipelineResumePipelineHandler({ resumePipeline }),
        input: {
          project_id: "project-1",
          pipeline_id: "pipe-1",
          run_id: "run-1",
          job_id: "job-1",
          step_id: "step-1"
        }
      }
    ];

    for (const testCase of dryRunCases) {
      const result = await testCase.handler(testCase.input);
      expect(result.structuredContent.item?.executed).toBe(false);
    }

    expect(acceptDelayJob).not.toHaveBeenCalled();
    expect(rejectDelayJob).not.toHaveBeenCalled();
    expect(continueDelayJob).not.toHaveBeenCalled();
    expect(acceptCheckpoint).not.toHaveBeenCalled();
    expect(rejectCheckpoint).not.toHaveBeenCalled();
    expect(resumePipeline).not.toHaveBeenCalled();
  });

  it("executes write handlers when dry_run is false", async () => {
    const acceptDelayJob = vi.fn().mockResolvedValue({ success: true });
    const rejectDelayJob = vi.fn().mockResolvedValue({ success: true });
    const continueDelayJob = vi.fn().mockResolvedValue({ success: true });
    const acceptCheckpoint = vi.fn().mockResolvedValue({ success: true });
    const rejectCheckpoint = vi.fn().mockResolvedValue({ success: true });
    const resumePipeline = vi.fn().mockResolvedValue({ success: true });

    const acceptDelayResult = await createPipelineAcceptDelayJobHandler({
      acceptDelayJob
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: false
    });

    const rejectDelayResult = await createPipelineRejectDelayJobHandler({
      rejectDelayJob
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: false
    });

    const continueDelayResult = await createPipelineContinueDelayJobHandler({
      continueDelayJob
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: false
    });

    const acceptCheckpointResult = await createPipelineAcceptCheckpointHandler({
      acceptCheckpoint
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_id: "step-1",
      dry_run: false
    });

    const rejectCheckpointResult = await createPipelineRejectCheckpointHandler({
      rejectCheckpoint
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_id: "step-1",
      dry_run: false
    });

    const resumePipelineResult = await createPipelineResumePipelineHandler({
      resumePipeline
    })({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      dry_run: false
    });

    expect(acceptDelayJob).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });
    expect(rejectDelayJob).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });
    expect(continueDelayJob).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });
    expect(acceptCheckpoint).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_id: "step-1"
    });
    expect(rejectCheckpoint).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      step_id: "step-1"
    });
    expect(resumePipeline).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });

    expect(acceptDelayResult.structuredContent.item?.executed).toBe(true);
    expect(rejectDelayResult.structuredContent.item?.executed).toBe(true);
    expect(continueDelayResult.structuredContent.item?.executed).toBe(true);
    expect(acceptCheckpointResult.structuredContent.item?.executed).toBe(true);
    expect(rejectCheckpointResult.structuredContent.item?.executed).toBe(true);
    expect(resumePipelineResult.structuredContent.item?.executed).toBe(true);
  });
});
