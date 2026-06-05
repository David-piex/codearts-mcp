import type { RepoMergeRequestChangesTrees } from "../client.js";
import { repoListMergeRequestChangesTreesInput } from "../schemas.js";
import { mapMergeRequestChangesTrees } from "./merge-request-read-result.js";

type RepoListMergeRequestChangesTreesClient = {
  listMergeRequestChangesTrees: (input: {
    repository_id: string;
    merge_request_iid: string;
    approval_user_id?: string;
    commit_id?: string;
    from_diff_id?: string;
    to_diff_id?: string;
    page: number;
    page_size: number;
  }) => Promise<RepoMergeRequestChangesTrees>;
};

export function createRepoListMergeRequestChangesTreesHandler(client: RepoListMergeRequestChangesTreesClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestChangesTreesInput.parse(input);
    const response = await client.listMergeRequestChangesTrees(parsed);
    const result = mapMergeRequestChangesTrees(response, parsed.page, parsed.page_size);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
