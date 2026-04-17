import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetRunDetailInput } from "../schemas.js";

export function mapPipelineRunExecutionDetail(input: {
  id: string;
  pipeline_id?: string;
  name?: string;
  status?: string;
  executor_name?: string;
  trigger_type?: string;
  run_number?: number;
  detail_url?: string;
  stages?: Array<{ id?: string }>;
}) {
  return asItemResult(`Loaded pipeline run detail ${input.id}`, {
    id: input.id,
    pipelineId: input.pipeline_id,
    name: input.name,
    status: input.status,
    executorName: input.executor_name,
    triggerType: input.trigger_type,
    runNumber: input.run_number,
    detailUrl: input.detail_url,
    stageCount: input.stages?.length ?? 0
  });
}

type PipelineGetRunDetailClient = {
  getRunDetail: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    id: string;
    pipeline_id?: string;
    name?: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
    run_number?: number;
    detail_url?: string;
    stages?: Array<{ id?: string }>;
  }>;
};

export function createPipelineGetRunDetailHandler(client: PipelineGetRunDetailClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetRunDetailInput.parse(input);
    const response = await client.getRunDetail(parsed);
    const result = mapPipelineRunExecutionDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
