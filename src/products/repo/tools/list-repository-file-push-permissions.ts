import type { RepoRepositoryFilePushPermission } from "../client.js";
import { repoListRepositoryFilePushPermissionsInput } from "../schemas.js";
import { mapFilePushPermissionList } from "./file-push-permission-result.js";

type RepoListRepositoryFilePushPermissionsClient = {
  listRepositoryFilePushPermissions: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    permissions: RepoRepositoryFilePushPermission[];
    total?: number;
  }>;
};

export function createRepoListRepositoryFilePushPermissionsHandler(
  client: RepoListRepositoryFilePushPermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryFilePushPermissionsInput.parse(input);
    const response = await client.listRepositoryFilePushPermissions(parsed);
    const result = mapFilePushPermissionList(
      `${response.permissions.length} repository file push permissions found`,
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
