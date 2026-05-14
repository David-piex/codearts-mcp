import { checkGetTaskSettingsInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskSettings: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskSettingsInput.parse(input);
    const response = await client.getTaskSettings(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task settings ${parsed.task_id}`,
      parsed.task_id,
      "settings",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
