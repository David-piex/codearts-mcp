import type { RepoRepositoryReview } from "../client.js";
import { repoShowMergeRequestDiscussionInput } from "../schemas.js";
import { mapRepositoryReviewItem } from "./repository-browse-result.js";

type Client = {
  showMergeRequestDiscussion: (input: {
    repository_id: string;
    merge_request_iid: string;
    discussion_id: string;
  }) => Promise<RepoRepositoryReview>;
};

export function createRepoShowMergeRequestDiscussionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowMergeRequestDiscussionInput.parse(input);
    const response = await client.showMergeRequestDiscussion(parsed);
    const result = mapRepositoryReviewItem(`Fetched merge request discussion ${parsed.discussion_id}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
