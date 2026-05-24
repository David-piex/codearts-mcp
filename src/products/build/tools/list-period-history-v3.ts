import { buildListPeriodHistoryV3Input } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listPeriodHistoryV3: (input: {
    job_id: string;
    start_time: string;
    end_time: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildListPeriodHistoryV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListPeriodHistoryV3Input.parse(input);
    const response = await client.listPeriodHistoryV3(parsed);
    const result = mapBuildRecordList(
      response.records,
      response.total,
      "Build v3 period history records",
      "record",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
