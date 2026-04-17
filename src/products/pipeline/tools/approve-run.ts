import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineApproveRunInput } from "../schemas.js";

export function previewApproveRun(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: approve pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    executed: !input.dry_run
  });
}

export function mapApproveRunResult(input: {
  project_id: string;
  pipeline_id: string;
  pipeline_run_id: string;
  job_id?: string;
  step_id?: string;
  status?: string;
}) {
  return asItemResult(`Approved pipeline run ${input.pipeline_run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.pipeline_run_id,
    jobId: input.job_id,
    stepId: input.step_id,
    status: input.status,
    executed: true
  });
}

type PipelineApproveRunClient = {
  approveRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
    job_id?: string;
    step_id?: string;
    status?: string;
  }>;
};

export function createPipelineApproveRunHandler(client: PipelineApproveRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineApproveRunInput.parse(input);

    if (parsed.dry_run) {
      const result = previewApproveRun(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.approveRun(parsed);
    const result = mapApproveRunResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      pipeline_run_id: response.pipeline_run_id ?? parsed.run_id,
      job_id: response.job_id ?? parsed.job_id,
      step_id: response.step_id ?? parsed.step_id,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
