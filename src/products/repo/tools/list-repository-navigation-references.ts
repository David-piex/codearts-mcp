import type { RepoNavigationReferences } from "../client.js";
import { repoListRepositoryNavigationReferencesInput } from "../schemas.js";
import { mapNavigationReferences } from "./repository-navigation-result.js";

type RepoListRepositoryNavigationReferencesClient = {
  listRepositoryNavigationReferences: (input: {
    repository_id: string;
    symbol: string;
    language: string;
    blob: string;
    file_path: string;
    path?: string;
    revision?: string;
    ref?: string;
  }) => Promise<RepoNavigationReferences>;
};

export function createRepoListRepositoryNavigationReferencesHandler(
  client: RepoListRepositoryNavigationReferencesClient
) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryNavigationReferencesInput.parse(input);
    const response = await client.listRepositoryNavigationReferences(parsed);
    const result = mapNavigationReferences(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
