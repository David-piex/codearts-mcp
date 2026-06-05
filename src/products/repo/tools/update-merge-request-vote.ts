import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoMergeRequestVoteResult } from "../client.js";
import { repoUpdateMergeRequestVoteInput } from "../schemas.js";
import { mapMergeRequestVoteResult } from "./merge-request-read-result.js";

export function previewUpdateMergeRequestVote(input: {
  repository_id: string;
  merge_request_iid: string;
  score: number;
  action: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update merge request vote ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    score: input.score,
    action: input.action,
    executed: !input.dry_run
  });
}

type RepoUpdateMergeRequestVoteClient = {
  updateMergeRequestVote: (input: {
    repository_id: string;
    merge_request_iid: string;
    score: number;
    action: string;
  }) => Promise<RepoMergeRequestVoteResult>;
};

export function createRepoUpdateMergeRequestVoteHandler(client: RepoUpdateMergeRequestVoteClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestVoteInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateMergeRequestVote(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateMergeRequestVote(parsed);
    const result = mapMergeRequestVoteResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
