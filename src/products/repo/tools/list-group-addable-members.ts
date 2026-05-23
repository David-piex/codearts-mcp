import type { RepoRepositoryMember } from "../client.js";
import { repoListGroupAddableMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listGroupAddableMembers: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListGroupAddableMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupAddableMembersInput.parse(input);
    const response = await client.listGroupAddableMembers(parsed);
    const result = mapRepositoryMembers(
      response.members,
      parsed.page,
      parsed.page_size,
      response.total,
      `${response.members.length} group addable members found`
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
