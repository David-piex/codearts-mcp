import type { RepoRepositoryUserGroup } from "../client.js";
import { repoListGroupUserGroupsInput } from "../schemas.js";
import { mapRepositoryUserGroups } from "./repository-list-result.js";

type Client = {
  listGroupUserGroups: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    project_id?: string;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
};

export function createRepoListGroupUserGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupUserGroupsInput.parse(input);
    const response = await client.listGroupUserGroups(parsed);
    const result = mapRepositoryUserGroups(response.groups, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
