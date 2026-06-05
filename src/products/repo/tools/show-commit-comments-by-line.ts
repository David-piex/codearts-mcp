import type { RepoCommentPath } from "../client.js";
import { repoShowCommitCommentsByLineInput } from "../schemas.js";
import { mapCommentsByLine } from "./merge-request-read-result.js";

type RepoShowCommitCommentsByLineClient = {
  showCommitCommentsByLine: (input: {
    repository_id: string;
    sha: string;
  }) => Promise<{
    comments: RepoCommentPath[];
    total?: number;
  }>;
};

export function createRepoShowCommitCommentsByLineHandler(
  client: RepoShowCommitCommentsByLineClient
) {
  return async (input: unknown) => {
    const parsed = repoShowCommitCommentsByLineInput.parse(input);
    const response = await client.showCommitCommentsByLine(parsed);
    const result = mapCommentsByLine(response.comments, 1, response.comments.length || 1, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
