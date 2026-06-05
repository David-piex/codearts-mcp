import { repoListCommitAssociatedMergeRequestsInput } from "../schemas.js";
import { mapMergeRequests } from "./list-merge-requests.js";

type RepoListCommitAssociatedMergeRequestsClient = {
  listCommitAssociatedMergeRequests: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
  }) => Promise<{
    merge_requests: Array<{
      id: number | string;
      iid?: number;
      title?: string;
      state?: string;
      source_branch?: string;
      target_branch?: string;
      created_at?: string;
      updated_at?: string;
      author?: { name?: string; nick_name?: string };
      web_url?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListCommitAssociatedMergeRequestsHandler(client: RepoListCommitAssociatedMergeRequestsClient) {
  return async (input: unknown) => {
    const parsed = repoListCommitAssociatedMergeRequestsInput.parse(input);
    const response = await client.listCommitAssociatedMergeRequests(parsed);
    const result = mapMergeRequests(response.merge_requests, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
