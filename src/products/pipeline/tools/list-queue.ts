import { pipelineListQueueInput } from "../schemas.js";
import { formatPipelineRawListText, mapPipelineRawList } from "./pipeline-raw-result.js";

type Client = {
  listQueue: (input: { project_id: string; pipeline_id: string }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineListQueueHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineListQueueInput.parse(input);
    const response = await client.listQueue(parsed);
    const result = mapPipelineRawList(
      response.records,
      response.total,
      "queued pipeline records",
      "queueRecord"
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent: {
        ...result,
        queue: response.raw
      }
    };
  };
}
