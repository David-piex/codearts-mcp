import { checkGetConsoleLogInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getConsoleLog: (input: {
    job_id: string;
    start_offset?: number;
    end_offset?: number;
    size?: number;
    sort?: "asc" | "desc";
  }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetConsoleLogHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetConsoleLogInput.parse(input);
    const response = await client.getConsoleLog(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check console log ${parsed.job_id}`,
      response.job_id,
      "console_log",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
