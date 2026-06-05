import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListProjectMergeRequestCanBeAssignedReviewersInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listProjectMergeRequestCanBeAssignedReviewers: (input: {
    project_id: string;
  }) => Promise<{ users: RepoMergeRequestCandidateUser[]; total?: number }>;
};

export function createRepoListProjectMergeRequestCanBeAssignedReviewersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListProjectMergeRequestCanBeAssignedReviewersInput.parse(input);
    const response = await client.listProjectMergeRequestCanBeAssignedReviewers(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} project merge request reviewer candidates found`,
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

