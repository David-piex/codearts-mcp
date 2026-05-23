import { pipelineListPipelineVarsInput } from "../schemas.js";
import { formatPipelineRawListText, mapPipelineRawList } from "./pipeline-raw-result.js";

type Client = {
  listPipelineVars: (input: { project_id: string; pipeline_id: string }) => Promise<{
    project_id: string;
    pipeline_id: string;
    variables: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineListPipelineVarsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineListPipelineVarsInput.parse(input);
    const response = await client.listPipelineVars(parsed);
    const result = mapPipelineRawList(
      response.variables,
      response.total,
      "pipeline variables",
      "variable"
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent: {
        ...result,
        projectId: response.project_id,
        pipelineId: response.pipeline_id,
        variables: response.raw
      }
    };
  };
}
