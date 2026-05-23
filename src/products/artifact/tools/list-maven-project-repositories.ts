import { artifactListMavenProjectRepositoriesInput } from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listMavenProjectRepositories: (input: {
    page: number;
    page_size: number;
    search_name?: string;
    repo_id?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createArtifactListMavenProjectRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListMavenProjectRepositoriesInput.parse(input);
    const response = await client.listMavenProjectRepositories(parsed);
    const result = mapArtifactRecordList(
      response.repositories,
      response.total,
      "Maven project repositories",
      "repository"
    );

    return {
      content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
      structuredContent: result
    };
  };
}
