import { buildListGitCodeBranchesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listGitCodeBranches: (input: { endpoint_id: string; repository_name?: string }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListGitCodeBranchesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListGitCodeBranchesInput.parse(input);
    const response = await client.listGitCodeBranches(parsed);
    const result = mapBuildRecordList(response.branches, response.total, "Git Code branches", "branch");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
