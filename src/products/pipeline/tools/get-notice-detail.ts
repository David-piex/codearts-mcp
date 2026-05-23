import { pipelineGetNoticeDetailInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getNoticeDetail: (input: {
    project_id: string;
    pipeline_id: string;
    type?: string;
  }) => Promise<{
    detail: Record<string, unknown>;
  }>;
};

export function createPipelineGetNoticeDetailHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetNoticeDetailInput.parse(input);
    const response = await client.getNoticeDetail(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline notice detail",
      parsed.pipeline_id,
      "noticeDetail",
      response.detail
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
