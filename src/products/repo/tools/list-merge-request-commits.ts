import type { RepoMergeRequestCommit } from "../client.js";
import { repoListMergeRequestCommitsInput } from "../schemas.js";
import { mapMergeRequestCommits } from "./merge-request-read-result.js";

type RepoListMergeRequestCommitsClient = {
  listMergeRequestCommits: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
    view?: "simple";
  }) => Promise<{
    commits: RepoMergeRequestCommit[];
    total?: number;
  }>;
};

export function createRepoListMergeRequestCommitsHandler(client: RepoListMergeRequestCommitsClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestCommitsInput.parse(input);
    const response = await client.listMergeRequestCommits(parsed);
    const result = mapMergeRequestCommits(response.commits, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
