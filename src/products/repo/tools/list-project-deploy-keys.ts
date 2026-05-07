import type { RepoRepositoryDeployKey } from "../client.js";
import { repoListProjectDeployKeysInput } from "../schemas.js";
import { mapRepositoryDeployKeys } from "./list-repository-deploy-keys.js";

type RepoListProjectDeployKeysClient = {
  listProjectDeployKeys: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
};

export function createRepoListProjectDeployKeysHandler(client: RepoListProjectDeployKeysClient) {
  return async (input: unknown) => {
    const parsed = repoListProjectDeployKeysInput.parse(input);
    const response = await client.listProjectDeployKeys(parsed);
    const result = mapRepositoryDeployKeys(
      response.keys,
      parsed.page,
      parsed.page_size,
      response.total,
      "project"
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
