import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type { RepoRepositoryDeployKey } from "../client.js";
import { repoListRepositoryDeployKeysInput } from "../schemas.js";

export function mapRepositoryDeployKeys(
  items: RepoRepositoryDeployKey[],
  page: number,
  pageSize: number,
  total?: number,
  scope = "repository"
) {
  return asListResult(
    `${items.length} ${scope} deploy keys found`,
    items.map((item) => ({
      id: String(item.id),
      title: item.title,
      fingerprint: item.fingerprint,
      createdAt: item.created_at
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListRepositoryDeployKeysClient = {
  listRepositoryDeployKeys: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    keys: RepoRepositoryDeployKey[];
    total?: number;
  }>;
};

export function createRepoListRepositoryDeployKeysHandler(client: RepoListRepositoryDeployKeysClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryDeployKeysInput.parse(input);
    const response = await client.listRepositoryDeployKeys(parsed);
    const result = mapRepositoryDeployKeys(response.keys, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
