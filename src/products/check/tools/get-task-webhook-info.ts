import { checkGetTaskWebhookInfoInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskWebhookInfo: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskWebhookInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskWebhookInfoInput.parse(input);
    const response = await client.getTaskWebhookInfo(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task webhook info ${response.task_id}`,
      response.task_id,
      "taskWebhookInfo",
      response.raw,
      { taskId: response.task_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
