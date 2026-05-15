import type { RepoRepositoryLanguages } from "../client.js";
import { repoListRepositoryLanguagesInput } from "../schemas.js";
import { mapRepositoryLanguages } from "./repository-content-result.js";

type RepoListRepositoryLanguagesClient = {
  listRepositoryLanguages: (input: { repository_id: string }) => Promise<RepoRepositoryLanguages>;
};

export function createRepoListRepositoryLanguagesHandler(client: RepoListRepositoryLanguagesClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryLanguagesInput.parse(input);
    const response = await client.listRepositoryLanguages(parsed);
    const result = mapRepositoryLanguages(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
