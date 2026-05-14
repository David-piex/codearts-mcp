import { buildListReportBranchesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildStringList } from "./generic-read-tools.js";

type Client = {
  listReportBranches: (input: { job_id: string; repository_name: string }) => Promise<{
    branches: string[];
  }>;
};

export function createBuildListReportBranchesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListReportBranchesInput.parse(input);
    const response = await client.listReportBranches(parsed);
    const result = mapBuildStringList(response.branches, "report branches", "branch");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
