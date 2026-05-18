import type { RepoNavigationSchema } from "../client.js";
import { repoShowRepositoryNavigationSchemaInput } from "../schemas.js";
import { mapNavigationSchema } from "./repository-navigation-result.js";

type RepoShowRepositoryNavigationSchemaClient = {
  showRepositoryNavigationSchema: (input: { repository_id: string }) => Promise<RepoNavigationSchema>;
};

export function createRepoShowRepositoryNavigationSchemaHandler(client: RepoShowRepositoryNavigationSchemaClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryNavigationSchemaInput.parse(input);
    const response = await client.showRepositoryNavigationSchema(parsed);
    const result = mapNavigationSchema(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
