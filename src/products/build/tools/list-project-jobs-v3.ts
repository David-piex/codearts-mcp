import { buildListProjectJobsV3Input } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listProjectJobsV3: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildListProjectJobsV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListProjectJobsV3Input.parse(input);
    const response = await client.listProjectJobsV3(parsed);
    const result = mapBuildRecordList(response.jobs, response.total, "Build v3 project jobs", "job", parsed.page, parsed.page_size);

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: {
        ...result,
        raw: response.raw
      }
    };
  };
}
