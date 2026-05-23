import { pipelineGetNoticeInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getNoticeStatus: (input: { project_id: string; pipeline_id: string }) => Promise<{
    status: Record<string, unknown>;
  }>;
};

export function createPipelineGetNoticeStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetNoticeInput.parse(input);
    const response = await client.getNoticeStatus(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline notice status",
      parsed.pipeline_id,
      "noticeStatus",
      response.status
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
