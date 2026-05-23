import { checkGetTaskLogDetailInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTaskLogDetail: (input: { project_id: string; task_id: string; execute_id?: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTaskLogDetailHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskLogDetailInput.parse(input);
    const response = await client.getTaskLogDetail(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check task log detail ${parsed.task_id}`,
      response.task_id,
      "log_detail",
      response.raw,
      { project_id: parsed.project_id, execute_id: parsed.execute_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
