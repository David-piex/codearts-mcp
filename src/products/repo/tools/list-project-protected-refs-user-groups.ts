import { repoListProjectProtectedRefsUserGroupsInput } from "../schemas.js";
import { mapProtectedRefsUserGroups } from "./protected-refs-user-group-result.js";

type RepoListProjectProtectedRefsUserGroupsClient = {
  listProjectProtectedRefsUserGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: Array<{ id: number | string; name?: string }>;
    total?: number;
  }>;
};

export function createRepoListProjectProtectedRefsUserGroupsHandler(
  client: RepoListProjectProtectedRefsUserGroupsClient
) {
  return async (input: unknown) => {
    const parsed = repoListProjectProtectedRefsUserGroupsInput.parse(input);
    const response = await client.listProjectProtectedRefsUserGroups(parsed);
    const result = mapProtectedRefsUserGroups(
      `${response.groups.length} project protected refs user groups found`,
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
