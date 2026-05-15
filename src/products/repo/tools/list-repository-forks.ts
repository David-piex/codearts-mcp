import type { RepoForkRepository } from "../client.js";
import { repoListRepositoryForksInput } from "../schemas.js";
import { mapRepositoryForks } from "./repository-content-result.js";

type RepoListRepositoryForksClient = {
  listRepositoryForks: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    order_by?: "created_at" | "updated_at";
    sort?: "asc" | "desc";
    view?: "basic" | "least";
  }) => Promise<{
    repositories: RepoForkRepository[];
    total?: number;
  }>;
};

export function createRepoListRepositoryForksHandler(client: RepoListRepositoryForksClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryForksInput.parse(input);
    const response = await client.listRepositoryForks(parsed);
    const result = mapRepositoryForks(response.repositories, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
