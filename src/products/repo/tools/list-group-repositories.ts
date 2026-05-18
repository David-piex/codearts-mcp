import type { RepoRepositorySummary } from "../client.js";
import { repoListGroupRepositoriesInput } from "../schemas.js";
import { mapGroupRepositories } from "./repository-list-result.js";

type RepoListGroupRepositoriesClient = {
  listGroupRepositories: (input: {
    group_id: string;
    page: number;
    page_size: number;
    search?: string;
    order_by?: "id" | "name" | "created_at" | "updated_at";
    sort?: "asc" | "desc";
  }) => Promise<{
    repositories: RepoRepositorySummary[];
    total?: number;
  }>;
};

export function createRepoListGroupRepositoriesHandler(client: RepoListGroupRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListGroupRepositoriesInput.parse(input);
    const response = await client.listGroupRepositories(parsed);
    const result = mapGroupRepositories(response.repositories, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
