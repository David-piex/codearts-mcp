import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListMergeRequestReviewersInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listMergeRequestReviewers: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    search?: string;
    target_branch?: string;
    source_branch?: string;
    merge_request_iid?: string;
    target_repository_id?: string;
  }) => Promise<{ users: RepoMergeRequestCandidateUser[]; total?: number }>;
};

export function createRepoListMergeRequestReviewersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestReviewersInput.parse(input);
    const response = await client.listMergeRequestReviewers(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} merge request reviewers found`,
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

