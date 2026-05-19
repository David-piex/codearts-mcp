import { checkGetTaskCronInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskCron: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskCronHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskCronInput.parse(input);
    const response = await client.getTaskCron(parsed);
    const result = mapCheckRecordItem(
      "Loaded Check task cron",
      response.task_id,
      "cron",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
