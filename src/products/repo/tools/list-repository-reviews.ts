import type { RepoRepositoryReview } from "../client.js";
import { repoListRepositoryReviewsInput } from "../schemas.js";
import { mapRepositoryReviews } from "./repository-browse-result.js";

type RepoListRepositoryReviewsClient = {
  listRepositoryReviews: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    noteable_type: "Commit" | "MergeRequest";
    search?: string;
    start_date?: string;
    end_date?: string;
    only_count?: boolean;
    review_categories?: string;
    review_modules?: string;
    severity?: string;
    assignee_id?: string | number;
    proposer_id?: string | number;
    target_branch?: string;
    include_reply?: boolean;
    order_by?: "created" | "updated";
    sort?: "asc" | "desc";
  }) => Promise<{
    reviews: RepoRepositoryReview[];
    total?: number;
  }>;
};

export function createRepoListRepositoryReviewsHandler(client: RepoListRepositoryReviewsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryReviewsInput.parse(input);
    const response = await client.listRepositoryReviews(parsed);
    const result = mapRepositoryReviews(response.reviews, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
