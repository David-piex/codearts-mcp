import { checkGetTaskResourcePoolInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskResourcePool: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskResourcePoolHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskResourcePoolInput.parse(input);
    const response = await client.getTaskResourcePool(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task resource pool ${parsed.task_id}`,
      parsed.task_id,
      "resourcePool",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
