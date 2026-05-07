import type { RepoTenantRepository } from "../client.js";
import { repoListTenantRepositoriesInput } from "../schemas.js";
import { mapTenantRepositoriesList } from "./tenant-result.js";

type RepoListTenantRepositoriesClient = {
  listTenantRepositories: (input: {
    repository_name?: string;
    member_number?: number;
    status?: 0 | 3 | 4 | 5 | 7;
    owner?: string;
    created_after?: string;
    created_before?: string;
    sort?: "asc" | "desc";
    sort_field?: "owner" | "capacity" | "status" | "create_time" | "member_number" | "repository_name";
    locked?: boolean;
    offset: number;
    limit: number;
  }) => Promise<{
    repositories: RepoTenantRepository[];
    total?: number;
  }>;
};

export function createRepoListTenantRepositoriesHandler(client: RepoListTenantRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListTenantRepositoriesInput.parse(input);
    const response = await client.listTenantRepositories(parsed);
    const result = mapTenantRepositoriesList(
      `${response.repositories.length} tenant repositories found${response.total !== undefined ? ` (total: ${response.total})` : ""}`,
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
