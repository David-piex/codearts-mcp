import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListGroupMergeRequestCanBeAssignedReviewersInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listGroupMergeRequestCanBeAssignedReviewers: (input: {
    group_id: string;
  }) => Promise<{ users: RepoMergeRequestCandidateUser[]; total?: number }>;
};

export function createRepoListGroupMergeRequestCanBeAssignedReviewersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupMergeRequestCanBeAssignedReviewersInput.parse(input);
    const response = await client.listGroupMergeRequestCanBeAssignedReviewers(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} group merge request reviewer candidates found`,
      response.users,
      1,
      response.users.length || 20,
      response.total ?? response.users.length
    );
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

