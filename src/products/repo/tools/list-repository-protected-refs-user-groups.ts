import { repoListRepositoryProtectedRefsUserGroupsInput } from "../schemas.js";
import { mapProtectedRefsUserGroups } from "./protected-refs-user-group-result.js";

type RepoListRepositoryProtectedRefsUserGroupsClient = {
  listRepositoryProtectedRefsUserGroups: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: Array<{ id: number | string; name?: string }>;
    total?: number;
  }>;
};

export function createRepoListRepositoryProtectedRefsUserGroupsHandler(
  client: RepoListRepositoryProtectedRefsUserGroupsClient
) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryProtectedRefsUserGroupsInput.parse(input);
    const response = await client.listRepositoryProtectedRefsUserGroups(parsed);
    const result = mapProtectedRefsUserGroups(
      `${response.groups.length} repository protected refs user groups found`,
      response.groups,
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
