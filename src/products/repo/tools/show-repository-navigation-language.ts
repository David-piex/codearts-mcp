import type { RepoNavigationLanguageInfo } from "../client.js";
import { repoShowRepositoryNavigationLanguageInput } from "../schemas.js";
import { mapNavigationLanguage } from "./repository-navigation-result.js";

type RepoShowRepositoryNavigationLanguageClient = {
  showRepositoryNavigationLanguage: (input: { repository_id: string }) => Promise<RepoNavigationLanguageInfo>;
};

export function createRepoShowRepositoryNavigationLanguageHandler(
  client: RepoShowRepositoryNavigationLanguageClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryNavigationLanguageInput.parse(input);
    const response = await client.showRepositoryNavigationLanguage(parsed);
    const result = mapNavigationLanguage(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
