import type { RepoRepositoryMember } from "../client.js";
import { repoListProjectMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listProjectMembers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListProjectMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListProjectMembersInput.parse(input);
    const response = await client.listProjectMembers(parsed);
    const result = mapRepositoryMembers(
      response.members,
      parsed.page,
      parsed.page_size,
      response.total,
      `${response.members.length} project members found`
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
