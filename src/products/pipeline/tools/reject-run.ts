import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineRejectRunInput } from "../schemas.js";

export function previewRejectRun(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: reject pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    executed: !input.dry_run
  });
}

export function mapRejectRunResult(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  success?: boolean;
}) {
  return asItemResult(`Rejected pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineRejectRunClient = {
  rejectRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
};

export function createPipelineRejectRunHandler(client: PipelineRejectRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineRejectRunInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRejectRun(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.rejectRun(parsed);
    const result = mapRejectRunResult({
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
