import { buildListRecyclingJobsInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listRecyclingJobs: (input: {
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    keep_time?: unknown;
  }>;
};

export function createBuildListRecyclingJobsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListRecyclingJobsInput.parse(input);
    const response = await client.listRecyclingJobs(parsed);
    const result = mapBuildRecordList(
      response.jobs,
      response.total,
      "recycling jobs",
      "job",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
