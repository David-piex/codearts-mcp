import type { RepoReviewUserBasic } from "../client.js";
import { repoListRepositoryReviewAuthorsInput } from "../schemas.js";
import { mapRepositoryReviewAuthors } from "./repository-browse-result.js";

type RepoListRepositoryReviewAuthorsClient = {
  listRepositoryReviewAuthors: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    noteable_type: "Commit" | "MergeRequest";
    resolved_status: "resolved" | "unresolved" | "all";
    reviewers_filter?: string;
  }) => Promise<{
    authors: RepoReviewUserBasic[];
    total?: number;
  }>;
};

export function createRepoListRepositoryReviewAuthorsHandler(client: RepoListRepositoryReviewAuthorsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryReviewAuthorsInput.parse(input);
    const response = await client.listRepositoryReviewAuthors(parsed);
    const result = mapRepositoryReviewAuthors(response.authors, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
