import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetRunInput } from "../schemas.js";

export function mapPipelineRunDetail(input: {
  pipeline_run_id: string;
  status?: string;
  executor_name?: string;
  trigger_type?: string;
}) {
  return asItemResult(`Loaded pipeline run ${input.pipeline_run_id}`, {
    id: input.pipeline_run_id,
    status: input.status,
    executorName: input.executor_name,
    triggerType: input.trigger_type
  });
}

type PipelineGetRunClient = {
  getRun: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    pipeline_run_id: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
  }>;
};

export function createPipelineGetRunHandler(client: PipelineGetRunClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetRunInput.parse(input);
    const response = await client.getRun(parsed);
    const result = mapPipelineRunDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
