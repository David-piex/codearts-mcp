import { checkDetectTaskLanguageInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  detectTaskLanguage: (input: { task_id: string; scan_file: boolean }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckDetectTaskLanguageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkDetectTaskLanguageInput.parse(input);
    const response = await client.detectTaskLanguage(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task language detection ${parsed.task_id}`,
      parsed.task_id,
      "languageDetection",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
