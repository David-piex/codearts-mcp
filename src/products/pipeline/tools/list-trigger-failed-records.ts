import { pipelineListTriggerFailedRecordsInput } from "../schemas.js";
import { formatPipelineRawListText, mapPipelineRawList } from "./pipeline-raw-result.js";

type Client = {
  listTriggerFailedRecords: (input: {
    project_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineListTriggerFailedRecordsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineListTriggerFailedRecordsInput.parse(input);
    const response = await client.listTriggerFailedRecords(parsed);
    const result = mapPipelineRawList(
      response.records,
      response.total,
      "pipeline trigger failed records",
      "triggerFailedRecord",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent: {
        ...result,
        triggerFailedRecords: response.raw
      }
    };
  };
}
