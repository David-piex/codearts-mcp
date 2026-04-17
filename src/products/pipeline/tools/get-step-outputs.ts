import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineGetStepOutputsInput } from "../schemas.js";

export function mapPipelineStepOutputs(
  items: Array<{
    step_run_id?: string;
    output_result?: Array<{ key?: string; value?: string }>;
  }>
) {
  return asListResult(
    `${items.length} pipeline step outputs found`,
    items.map((item) => ({
      id: item.step_run_id ?? "",
      stepRunId: item.step_run_id,
      outputCount: item.output_result?.length ?? 0,
      outputs: item.output_result ?? []
    }))
  );
}

type PipelineGetStepOutputsClient = {
  getStepOutputs: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_run_ids: string[];
  }) => Promise<{
    step_outputs: Array<{
      step_run_id?: string;
      output_result?: Array<{ key?: string; value?: string }>;
    }>;
    current_system_time?: number;
  }>;
};

export function createPipelineGetStepOutputsHandler(client: PipelineGetStepOutputsClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetStepOutputsInput.parse(input);
    const response = await client.getStepOutputs(parsed);
    const result = mapPipelineStepOutputs(response.step_outputs);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
