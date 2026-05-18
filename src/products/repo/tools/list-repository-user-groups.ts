import type { RepoRepositoryUserGroup } from "../client.js";
import { repoListRepositoryUserGroupsInput } from "../schemas.js";
import { mapRepositoryUserGroups } from "./repository-list-result.js";

type RepoListRepositoryUserGroupsClient = {
  listRepositoryUserGroups: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    groups: RepoRepositoryUserGroup[];
    total?: number;
  }>;
};

export function createRepoListRepositoryUserGroupsHandler(client: RepoListRepositoryUserGroupsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryUserGroupsInput.parse(input);
    const response = await client.listRepositoryUserGroups(parsed);
    const result = mapRepositoryUserGroups(response.groups, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
