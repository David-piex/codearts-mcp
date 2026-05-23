import { artifactListChildProxyRepositoriesInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listChildProxyRepositories: (input: { repo_id: string; type?: string }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListChildProxyRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListChildProxyRepositoriesInput.parse(input);
    const response = await client.listChildProxyRepositories(parsed);
    const result = mapArtifactRecordList(response.repositories, response.total, "child proxy repositories", "repository");

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
