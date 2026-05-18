import type { RepoDefaultReviewCategories } from "../client.js";
import { repoListDefaultReviewCategoriesInput } from "../schemas.js";
import { mapDefaultReviewCategories } from "./repository-browse-result.js";

type RepoListDefaultReviewCategoriesClient = {
  listDefaultReviewCategories: () => Promise<RepoDefaultReviewCategories>;
};

export function createRepoListDefaultReviewCategoriesHandler(client: RepoListDefaultReviewCategoriesClient) {
  return async (input: unknown) => {
    repoListDefaultReviewCategoriesInput.parse(input);
    const response = await client.listDefaultReviewCategories();
    const result = mapDefaultReviewCategories(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
