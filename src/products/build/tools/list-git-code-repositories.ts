import { buildListGitCodeRepositoriesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listGitCodeRepositories: (input: { endpoint_id: string }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListGitCodeRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListGitCodeRepositoriesInput.parse(input);
    const response = await client.listGitCodeRepositories(parsed);
    const result = mapBuildRecordList(response.repositories, response.total, "Git Code repositories", "repository");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
