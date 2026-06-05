import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListGroupMergeRequestValidAssignedCandidatesInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listGroupMergeRequestValidAssignedCandidates: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ users: RepoMergeRequestCandidateUser[]; total?: number }>;
};

export function createRepoListGroupMergeRequestValidAssignedCandidatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupMergeRequestValidAssignedCandidatesInput.parse(input);
    const response = await client.listGroupMergeRequestValidAssignedCandidates(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} group merge request assignee candidates found`,
      response.users,
      parsed.page,
      parsed.page_size,
      response.total
    );
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

