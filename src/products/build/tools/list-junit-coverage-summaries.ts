import { buildListJunitCoverageSummariesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listJunitCoverageSummaries: (input: { job_id: string; build_no: number }) => Promise<{
    summaries: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListJunitCoverageSummariesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJunitCoverageSummariesInput.parse(input);
    const response = await client.listJunitCoverageSummaries(parsed);
    const result = mapBuildRecordList(response.summaries, response.total, "Junit coverage summaries", "summary");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
