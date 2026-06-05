import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDelayJobInput } from "../schemas.js";

export function previewResumePipeline(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: resume pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    executed: false
  });
}

export function mapResumePipelineResult(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  success?: boolean;
}) {
  return asItemResult(`Resumed pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineResumePipelineClient = {
  resumePipeline: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
};

export function createPipelineResumePipelineHandler(client: PipelineResumePipelineClient) {
  return async (input: unknown) => {
    const parsed = pipelineDelayJobInput.parse(input);

    if (parsed.dry_run) {
      const result = previewResumePipeline(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.resumePipeline(request);
    const result = mapResumePipelineResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      run_id: parsed.run_id,
      job_id: parsed.job_id,
      step_id: parsed.step_id,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
