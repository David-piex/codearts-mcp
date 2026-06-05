import type { RepoRepositoryReview } from "../client.js";
import { repoListCommitDiscussionsInput } from "../schemas.js";
import { mapRepositoryReviews } from "./repository-browse-result.js";

type Client = {
  listCommitDiscussions: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reviews: RepoRepositoryReview[];
    total?: number;
  }>;
};

export function createRepoListCommitDiscussionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListCommitDiscussionsInput.parse(input);
    const response = await client.listCommitDiscussions(parsed);
    const result = mapRepositoryReviews(response.reviews, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
