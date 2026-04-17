import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateMergeRequestDiscussionInput } from "../schemas.js";

export function previewCreateMergeRequestDiscussion(input: {
  repository_id: string;
  merge_request_iid: string;
  body: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create discussion on merge request ${input.merge_request_iid}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    body: input.body,
    executed: !input.dry_run
  });
}

export function mapCreatedMergeRequestDiscussion(input: {
  discussion_id: string;
  body?: string;
  created_at?: string;
  author?: { name?: string; nick_name?: string };
}) {
  return asItemResult(`Created discussion ${input.discussion_id}`, {
    id: input.discussion_id,
    body: input.body,
    createdAt: input.created_at,
    authorName: input.author?.name,
    authorNickName: input.author?.nick_name,
    executed: true
  });
}

type RepoCreateMergeRequestDiscussionClient = {
  createMergeRequestDiscussion: (input: {
    repository_id: string;
    merge_request_iid: string;
    body: string;
  }) => Promise<{
    discussion_id: string;
    body?: string;
    created_at?: string;
    author?: { name?: string; nick_name?: string };
  }>;
};

export function createRepoCreateMergeRequestDiscussionHandler(
  client: RepoCreateMergeRequestDiscussionClient
) {
  return async (input: unknown) => {
    const parsed = repoCreateMergeRequestDiscussionInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateMergeRequestDiscussion(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createMergeRequestDiscussion(parsed);
    const result = mapCreatedMergeRequestDiscussion(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
