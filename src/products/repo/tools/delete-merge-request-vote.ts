import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteMergeRequestVoteInput } from "../schemas.js";

export function previewDeleteMergeRequestVote(input: {
  repository_id: string;
  merge_request_iid: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete merge request vote ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    deleted: false,
    executed: !input.dry_run
  });
}

type RepoDeleteMergeRequestVoteClient = {
  deleteMergeRequestVote: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    repository_id: string;
    merge_request_iid: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteMergeRequestVoteHandler(client: RepoDeleteMergeRequestVoteClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteMergeRequestVoteInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteMergeRequestVote(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMergeRequestVote(parsed);
    const result = asItemResult(`Deleted merge request vote ${response.merge_request_iid}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
