import { pipelineListSystemVarsInput } from "../schemas.js";
import { formatPipelineRawListText, mapPipelineRawList } from "./pipeline-raw-result.js";

type Client = {
  listSystemVars: (input: { project_id: string; pipeline_id: string }) => Promise<{
    variables: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineListSystemVarsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineListSystemVarsInput.parse(input);
    const response = await client.listSystemVars(parsed);
    const result = mapPipelineRawList(
      response.variables,
      response.total,
      "pipeline system variables",
      "variable"
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent: {
        ...result,
        variables: response.raw
      }
    };
  };
}
