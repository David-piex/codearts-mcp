import { pipelineListModifyHistoryInput } from "../schemas.js";
import { formatPipelineRawListText, mapPipelineRawList } from "./pipeline-raw-result.js";

type Client = {
  listModifyHistory: (input: { project_id: string; pipeline_id: string }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineListModifyHistoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineListModifyHistoryInput.parse(input);
    const response = await client.listModifyHistory(parsed);
    const result = mapPipelineRawList(
      response.records,
      response.total,
      "pipeline modify history records",
      "modifyHistory"
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent: {
        ...result,
        modifyHistory: response.raw
      }
    };
  };
}
