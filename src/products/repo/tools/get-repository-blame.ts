import type { RepoBlame } from "../client.js";
import { repoGetRepositoryBlameInput } from "../schemas.js";
import { mapRepositoryBlame } from "./repository-browse-result.js";

type Client = {
  getRepositoryBlame: (input: {
    repository_id: string;
    file_path: string;
    sha: string;
  }) => Promise<{
    blames: RepoBlame[];
    total?: number;
  }>;
};

export function createRepoGetRepositoryBlameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryBlameInput.parse(input);
    const response = await client.getRepositoryBlame(parsed);
    const result = mapRepositoryBlame(response.blames, 1, response.blames.length || response.total || 0, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
