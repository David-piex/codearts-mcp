import { repoListGroupProtectedRefsUserGroupsInput } from "../schemas.js";
import { mapProtectedRefsUserGroups } from "./protected-refs-user-group-result.js";

type RepoListGroupProtectedRefsUserGroupsClient = {
  listGroupProtectedRefsUserGroups: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: Array<{ id: number | string; name?: string }>;
    total?: number;
  }>;
};

export function createRepoListGroupProtectedRefsUserGroupsHandler(client: RepoListGroupProtectedRefsUserGroupsClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupProtectedRefsUserGroupsInput.parse(input);
    const response = await client.listGroupProtectedRefsUserGroups(parsed);
    const result = mapProtectedRefsUserGroups(
      `${response.groups.length} group protected refs user groups found`,
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
