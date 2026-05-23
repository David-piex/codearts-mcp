import { checkGetDefectTaskStatisticsInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getDefectTaskStatistics: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetDefectTaskStatisticsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetDefectTaskStatisticsInput.parse(input);
    const response = await client.getDefectTaskStatistics(parsed);
    const result = mapCheckRecordItem(
      `Loaded Check defect task statistics ${parsed.task_id}`,
      parsed.task_id,
      "statistics",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
