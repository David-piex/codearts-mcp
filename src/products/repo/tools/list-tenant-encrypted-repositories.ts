import type { RepoTenantEncryptedRepository } from "../client.js";
import { repoListTenantEncryptedRepositoriesInput } from "../schemas.js";
import { mapTenantEncryptedRepositoriesList } from "./tenant-result.js";

type RepoListTenantEncryptedRepositoriesClient = {
  listTenantEncryptedRepositories: (input: {
    tenant_id: string;
    offset: number;
    limit: number;
  }) => Promise<{
    repositories: RepoTenantEncryptedRepository[];
    total?: number;
  }>;
};

export function createRepoListTenantEncryptedRepositoriesHandler(
  client: RepoListTenantEncryptedRepositoriesClient
) {
  return async (input: unknown) => {
    const parsed = repoListTenantEncryptedRepositoriesInput.parse(input);
    const response = await client.listTenantEncryptedRepositories(parsed);
    const result = mapTenantEncryptedRepositoriesList(
      `${response.repositories.length} tenant encrypted repositories found${response.total !== undefined ? ` (total: ${response.total})` : ""}`,
      response.repositories,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
