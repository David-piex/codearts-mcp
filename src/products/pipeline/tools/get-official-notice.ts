import { pipelineGetNoticeInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getOfficialNotice: (input: { project_id: string; pipeline_id: string }) => Promise<{
    notice: Record<string, unknown>;
  }>;
};

export function createPipelineGetOfficialNoticeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetNoticeInput.parse(input);
    const response = await client.getOfficialNotice(parsed);
    const result = mapPipelineRawItem(
      "Loaded pipeline official notice",
      parsed.pipeline_id,
      "notice",
      response.notice
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
