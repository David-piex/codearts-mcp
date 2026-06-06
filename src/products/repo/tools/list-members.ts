import type { RepoRepositoryMember } from "../client.js";
import { repoListMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listMembers: (input: {
    x_auth_token: string;
    repository_id?: string;
    repository_uuid?: string;
    search?: string;
    page: number;
    page_size: number;
    subject?: string;
    permission?: "repository" | "code" | "member" | "branch" | "tag" | "mr" | "label";
    action?: string;
    offset?: number;
    limit?: number;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListMembersInput.parse(input);
    const pageSize = parsed.limit ?? parsed.page_size;
    const page = parsed.offset !== undefined ? Math.floor(parsed.offset / pageSize) + 1 : parsed.page;
    const response = await client.listMembers(parsed);
    const result = mapRepositoryMembers(
      response.members,
      page,
      pageSize,
      response.total,
      `${response.members.length} repository members found`
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
