import type { RepoMergeRequestCandidateUser } from "../client.js";
import { repoListMergeRequestValidAssignedCandidatesInput } from "../schemas.js";
import { mapMergeRequestCandidates } from "./merge-request-read-result.js";

type Client = {
  listMergeRequestValidAssignedCandidates: (input: {
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

export function createRepoListMergeRequestValidAssignedCandidatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestValidAssignedCandidatesInput.parse(input);
    const response = await client.listMergeRequestValidAssignedCandidates(parsed);
    const result = mapMergeRequestCandidates(
      `${response.users.length} merge request assignee candidates found`,
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

