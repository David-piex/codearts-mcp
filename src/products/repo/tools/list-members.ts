import type { RepoRepositoryMember } from "../client.js";
import { repoListMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listMembers: (input: {
    x_auth_token: string;
    repository_uuid: string;
    page: number;
    page_size: number;
    subject?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListMembersInput.parse(input);
    const response = await client.listMembers(parsed);
    const result = mapRepositoryMembers(
      response.members,
      parsed.page,
      parsed.page_size,
      response.total,
      `${response.members.length} repository members found`
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
