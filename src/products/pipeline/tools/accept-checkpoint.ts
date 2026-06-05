import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCheckpointInput } from "../schemas.js";

export function previewAcceptCheckpoint(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  step_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: accept checkpoint for pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    stepId: input.step_id,
    executed: false
  });
}

export function mapAcceptCheckpointResult(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  step_id: string;
  success?: boolean;
}) {
  return asItemResult(`Accepted checkpoint for pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    stepId: input.step_id,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineAcceptCheckpointClient = {
  acceptCheckpoint: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
};

export function createPipelineAcceptCheckpointHandler(client: PipelineAcceptCheckpointClient) {
  return async (input: unknown) => {
    const parsed = pipelineCheckpointInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAcceptCheckpoint(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.acceptCheckpoint(request);
    const result = mapAcceptCheckpointResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      run_id: parsed.run_id,
      step_id: parsed.step_id,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
