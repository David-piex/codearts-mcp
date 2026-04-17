import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineGetRunParametersInput } from "../schemas.js";

export function mapPipelineRunParameters(
  runId: string,
  items: Array<{
    name?: string;
    value?: string;
    value_type?: string;
    is_runtime?: boolean;
  }>
) {
  return asListResult(
    `${items.length} runtime parameters found for pipeline run ${runId}`,
    items.map((item) => ({
      id: item.name ?? "",
      name: item.name,
      value: item.value,
      type: item.value_type,
      runtime: item.is_runtime
    }))
  );
}

type PipelineGetRunParametersClient = {
  getRunParameters: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    parameters: Array<{
      name?: string;
      value?: string;
      value_type?: string;
      is_runtime?: boolean;
    }>;
  }>;
};

export function createPipelineGetRunParametersHandler(client: PipelineGetRunParametersClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetRunParametersInput.parse(input);
    const response = await client.getRunParameters(parsed);
    const result = mapPipelineRunParameters(parsed.run_id, response.parameters);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
