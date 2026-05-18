import type { RepoRepositoryMember } from "../client.js";
import { repoListRepositoryMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type RepoListRepositoryMembersClient = {
  listRepositoryMembers: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
    permission?: "repository" | "code" | "member" | "branch" | "tag" | "mr" | "label";
    action?: string;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListRepositoryMembersHandler(client: RepoListRepositoryMembersClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryMembersInput.parse(input);
    const response = await client.listRepositoryMembers(parsed);
    const result = mapRepositoryMembers(response.members, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
