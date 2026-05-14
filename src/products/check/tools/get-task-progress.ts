import { checkGetTaskProgressInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskProgress: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskProgressHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskProgressInput.parse(input);
    const response = await client.getTaskProgress(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task progress ${parsed.task_id}`,
      parsed.task_id,
      "progress",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
