import type { RepoRepositoryMember } from "../client.js";
import { repoListProductPermissionResourcesGrantedUsersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listProductPermissionResourcesGrantedUsers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListProductPermissionResourcesGrantedUsersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListProductPermissionResourcesGrantedUsersInput.parse(input);
    const response = await client.listProductPermissionResourcesGrantedUsers(parsed);
    const result = mapRepositoryMembers(
      response.members,
      parsed.page,
      parsed.page_size,
      response.total,
      `${response.members.length} granted users found`
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
