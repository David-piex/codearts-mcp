import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryReview } from "../client.js";
import { repoUpdateMergeRequestDiscussionInfoInput } from "../schemas.js";
import { mapRepositoryReviewItem } from "./repository-browse-result.js";

function preview(input: {
  repository_id: string;
  merge_request_iid: string;
  discussion_id: string;
  body?: string;
  severity?: string;
  assignee_id?: string;
  review_categories?: string;
  review_modules?: string;
  proposer_id?: string;
  resolved?: boolean;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update discussion info ${input.discussion_id}`, {
    repositoryId: input.repository_id,
    mergeRequestIid: input.merge_request_iid,
    discussionId: input.discussion_id,
    body: input.body,
    severity: input.severity,
    assigneeId: input.assignee_id,
    reviewCategories: input.review_categories,
    reviewModules: input.review_modules,
    proposerId: input.proposer_id,
    resolved: input.resolved,
    executed: !input.dry_run
  });
}

type Client = {
  updateMergeRequestDiscussionInfo: (input: {
    repository_id: string;
    merge_request_iid: string;
    discussion_id: string;
    body?: string;
    severity?: "suggestion" | "minor" | "major" | "fatal";
    assignee_id?: string;
    review_categories?: string;
    review_modules?: string;
    proposer_id?: string;
    resolved?: boolean;
  }) => Promise<RepoRepositoryReview>;
};

export function createRepoUpdateMergeRequestDiscussionInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestDiscussionInfoInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateMergeRequestDiscussionInfo(parsed);
    const result = mapRepositoryReviewItem(`Updated merge request discussion ${parsed.discussion_id}`, response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
