import type { RepoNavigationOutline } from "../client.js";
import { repoShowRepositoryNavigationOutlineInput } from "../schemas.js";
import { mapNavigationOutline } from "./repository-navigation-result.js";

type RepoShowRepositoryNavigationOutlineClient = {
  showRepositoryNavigationOutline: (input: {
    repository_id: string;
    language: string;
    blob: string;
    file_path: string;
    revision?: string;
    ref?: string;
  }) => Promise<RepoNavigationOutline>;
};

export function createRepoShowRepositoryNavigationOutlineHandler(
  client: RepoShowRepositoryNavigationOutlineClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryNavigationOutlineInput.parse(input);
    const response = await client.showRepositoryNavigationOutline(parsed);
    const result = mapNavigationOutline(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
