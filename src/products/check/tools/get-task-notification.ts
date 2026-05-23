import { checkGetTaskNotificationInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskNotification: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskNotificationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskNotificationInput.parse(input);
    const response = await client.getTaskNotification(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task notification ${parsed.task_id}`,
      parsed.task_id,
      "notification",
      response.raw,
      { taskId: response.task_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
