import { buildListBuildInfoRecordsV3Input } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listBuildInfoRecordsV3: (input: {
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

export function createBuildListBuildInfoRecordsV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListBuildInfoRecordsV3Input.parse(input);
    const response = await client.listBuildInfoRecordsV3(parsed);
    const result = mapBuildRecordList(
      response.records,
      response.total,
      "Build v3 build-info records",
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
