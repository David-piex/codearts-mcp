import type { RepoRepositoryMember } from "../client.js";
import { repoListGroupMembersInput } from "../schemas.js";
import { mapRepositoryMembers } from "./repository-list-result.js";

type Client = {
  listGroupMembers: (input: {
    group_id: string;
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
    join_way?: "domain" | "normal" | "inherit";
    access_level?: string | number;
  }) => Promise<{
    members: RepoRepositoryMember[];
    total?: number;
  }>;
};

export function createRepoListGroupMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupMembersInput.parse(input);
    const response = await client.listGroupMembers(parsed);
    const result = mapRepositoryMembers(response.members, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
