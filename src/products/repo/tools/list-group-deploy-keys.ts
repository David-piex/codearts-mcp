import type { RepoRepositoryDeployKey } from "../client.js";
import { repoListGroupDeployKeysInput } from "../schemas.js";
import { mapRepositoryDeployKeys } from "./list-repository-deploy-keys.js";

type RepoListGroupDeployKeysClient = {
  listGroupDeployKeys: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
};

export function createRepoListGroupDeployKeysHandler(client: RepoListGroupDeployKeysClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupDeployKeysInput.parse(input);
    const response = await client.listGroupDeployKeys(parsed);
    const result = mapRepositoryDeployKeys(
      response.keys,
      parsed.page,
      parsed.page_size,
      response.total,
      "group"
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
