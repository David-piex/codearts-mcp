import type { RepoRepositoryUserGroup } from "../client.js";
import { repoListGroupAddableUserGroupsInput } from "../schemas.js";
import { mapRepositoryUserGroups } from "./repository-list-result.js";

type Client = {
  listGroupAddableUserGroups: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
};

export function createRepoListGroupAddableUserGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupAddableUserGroupsInput.parse(input);
    const response = await client.listGroupAddableUserGroups(parsed);
    const result = mapRepositoryUserGroups(response.groups, parsed.page, parsed.page_size, response.total);
    const summary = `${response.groups.length} group addable user groups found`;

    return {
      content: [{ type: "text" as const, text: summary }],
      structuredContent: {
        ...result,
        summary
      }
    };
  };
}
