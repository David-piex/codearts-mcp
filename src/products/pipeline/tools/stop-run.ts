import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineStopRunInput } from "../schemas.js";

export function previewStopRun(input: {
  pipeline_id: string;
  run_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop pipeline run ${input.run_id}`, {
    pipelineId: input.pipeline_id,
    pipelineRunId: input.run_id,
    executed: !input.dry_run
  });
}

export function mapStopRunResult(input: {
  pipeline_id?: string;
  pipeline_name?: string;
  run_id: string;
}) {
  return asItemResult(`Stopped pipeline run ${input.run_id}`, {
    pipelineId: input.pipeline_id,
    pipelineName: input.pipeline_name,
    pipelineRunId: input.run_id,
    executed: true
  });
}

type PipelineStopRunClient = {
  stopRun: (input: {
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    pipeline_id?: string;
    pipeline_name?: string;
  }>;
};

export function createPipelineStopRunHandler(client: PipelineStopRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineStopRunInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStopRun(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopRun(parsed);
    const result = mapStopRunResult({
      pipeline_id: response.pipeline_id ?? parsed.pipeline_id,
      pipeline_name: response.pipeline_name,
      run_id: parsed.run_id
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
