import type { RepoRepositoryReview } from "../client.js";
import { repoListMergeRequestSystemNotesInput } from "../schemas.js";
import { mapRepositoryReviews } from "./repository-browse-result.js";

type Client = {
  listMergeRequestSystemNotes: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reviews: RepoRepositoryReview[];
    total?: number;
  }>;
};

export function createRepoListMergeRequestSystemNotesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestSystemNotesInput.parse(input);
    const response = await client.listMergeRequestSystemNotes(parsed);
    const result = mapRepositoryReviews(response.reviews, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
