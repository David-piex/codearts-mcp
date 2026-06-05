import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteMergeRequestDiscussionInput } from "../schemas.js";

function previewDeleteMergeRequestDiscussion(input: {
  repository_id: string;
  merge_request_iid: string;
  discussion_id: string;
  note_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete merge request discussion note ${input.note_id}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    discussionId: input.discussion_id,
    noteId: input.note_id,
    deleted: false,
    executed: !input.dry_run
  });
}

type Client = {
  deleteMergeRequestDiscussion: (input: {
    repository_id: string;
    merge_request_iid: string;
    discussion_id: string;
    note_id: string;
  }) => Promise<{
    repository_id: string;
    merge_request_iid: string;
    discussion_id: string;
    note_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteMergeRequestDiscussionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoDeleteMergeRequestDiscussionInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteMergeRequestDiscussion(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMergeRequestDiscussion(parsed);
    const result = asItemResult(`Deleted merge request discussion note ${response.note_id}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      discussionId: response.discussion_id,
      noteId: response.note_id,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
