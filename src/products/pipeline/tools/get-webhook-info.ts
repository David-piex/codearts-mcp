import { pipelineGetWebhookInfoInput } from "../schemas.js";
import { formatPipelineRawItemText, mapPipelineRawItem } from "./pipeline-raw-result.js";

type Client = {
  getWebhookInfo: (input: { project_id: string; pipeline_id: string }) => Promise<{
    project_id: string;
    pipeline_id: string;
    webhook: Record<string, unknown>;
  }>;
};

export function createPipelineGetWebhookInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetWebhookInfoInput.parse(input);
    const response = await client.getWebhookInfo(parsed);
    const result = mapPipelineRawItem(
      `Loaded pipeline webhook info ${response.pipeline_id}`,
      response.pipeline_id,
      "webhook",
      response.webhook
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: {
        ...result,
        projectId: response.project_id,
        pipelineId: response.pipeline_id
      }
    };
  };
}
