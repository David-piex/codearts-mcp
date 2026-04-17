import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineRetryRunInput } from "../schemas.js";

export function previewRetryRun(input: {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: retry pipeline run ${input.run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    executed: !input.dry_run
  });
}

export function mapRetryRunResult(input: {
  project_id: string;
  pipeline_id: string;
  source_run_id: string;
  pipeline_run_id?: string;
}) {
  return asItemResult(`Retried pipeline run ${input.source_run_id}`, {
    projectId: input.project_id,
    pipelineId: input.pipeline_id,
    sourceRunId: input.source_run_id,
    pipelineRunId: input.pipeline_run_id,
    executed: true
  });
}

type PipelineRetryRunClient = {
  retryRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
};

export function createPipelineRetryRunHandler(client: PipelineRetryRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineRetryRunInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRetryRun(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.retryRun(parsed);
    const result = mapRetryRunResult({
      project_id: parsed.project_id,
      pipeline_id: parsed.pipeline_id,
      source_run_id: parsed.run_id,
      pipeline_run_id: response.pipeline_run_id
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
