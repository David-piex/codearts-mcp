import type { RepoResourcePermissionInfo } from "../client.js";
import { repoListRepositoryResourcePermissionsInput } from "../schemas.js";
import { mapResourcePermissionList } from "./resource-permission-result.js";

type RepoListRepositoryResourcePermissionsClient = {
  listRepositoryResourcePermissions: (input: {
    repository_id: string;
    resource_name: string;
    page: number;
    page_size: number;
  }) => Promise<{
    permissions: RepoResourcePermissionInfo[];
    total?: number;
  }>;
};

export function createRepoListRepositoryResourcePermissionsHandler(
  client: RepoListRepositoryResourcePermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryResourcePermissionsInput.parse(input);
    const response = await client.listRepositoryResourcePermissions(parsed);
    const result = mapResourcePermissionList(
      `${response.permissions.length} repository resource permission roles found`,
      response.permissions,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
