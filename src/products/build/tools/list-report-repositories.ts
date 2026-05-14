import { buildListReportRepositoriesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildStringList } from "./generic-read-tools.js";

type Client = {
  listReportRepositories: (input: { job_id: string }) => Promise<{
    latest?: string;
    repositories: string[];
    raw: Record<string, unknown>;
  }>;
};

export function createBuildListReportRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListReportRepositoriesInput.parse(input);
    const response = await client.listReportRepositories(parsed);
    const result = mapBuildStringList(response.repositories, "report repositories", "repository");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: {
        ...result,
        latest: response.latest,
        raw: response.raw
      }
    };
  };
}
