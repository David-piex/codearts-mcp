import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateMergeRequestReviewersInput } from "../schemas.js";

type Client = {
  updateMergeRequestReviewers: (input: {
    repository_id: string;
    merge_request_iid: string;
    reviewer_ids: string | string[];
  }) => Promise<{
    updated: boolean;
    repository_id: string;
    merge_request_iid: string;
    reviewer_ids: string[];
  }>;
};

export function createRepoUpdateMergeRequestReviewersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestReviewersInput.parse(input);
    const reviewerIds = Array.isArray(parsed.reviewer_ids) ? parsed.reviewer_ids.map(String) : parsed.reviewer_ids.split(",").map((item) => item.trim()).filter(Boolean);
    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update merge request reviewers for ${parsed.merge_request_iid}`, {
        repositoryId: parsed.repository_id,
        mergeRequestIid: parsed.merge_request_iid,
        reviewerIds,
        executed: false
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }
    const response = await client.updateMergeRequestReviewers(parsed);
    const result = asItemResult(`Updated merge request reviewers for ${parsed.merge_request_iid}`, {
      repositoryId: response.repository_id,
      mergeRequestIid: response.merge_request_iid,
      reviewerIds: response.reviewer_ids,
      executed: response.updated
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
