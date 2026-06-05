import type { RepoCommentPath } from "../client.js";
import { repoShowMergeRequestCommentsByLineInput } from "../schemas.js";
import { mapCommentsByLine } from "./merge-request-read-result.js";

type RepoShowMergeRequestCommentsByLineClient = {
  showMergeRequestCommentsByLine: (input: {
    repository_id: string;
    merge_request_iid: string;
    line?: number;
    with_commit_comments?: boolean;
    path?: string;
    view?: "basic" | "sample";
    base_sha?: string;
    start_sha?: string;
    head_sha?: string;
  }) => Promise<{
    comments: RepoCommentPath[];
    total?: number;
  }>;
};

export function createRepoShowMergeRequestCommentsByLineHandler(
  client: RepoShowMergeRequestCommentsByLineClient
) {
  return async (input: unknown) => {
    const parsed = repoShowMergeRequestCommentsByLineInput.parse(input);
    const response = await client.showMergeRequestCommentsByLine(parsed);
    const result = mapCommentsByLine(response.comments, 1, response.comments.length || 1, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
