import { checkGetTaskPreCheckScriptInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskPreCheckScript: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskPreCheckScriptHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskPreCheckScriptInput.parse(input);
    const response = await client.getTaskPreCheckScript(parsed);
    const result = mapCheckRecordItem(
      "Loaded Check task pre-check script",
      response.task_id,
      "script",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
