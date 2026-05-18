import type { RepoRepositorySummary } from "../client.js";
import { repoListCurrentUserRepositoriesInput } from "../schemas.js";
import { mapCurrentUserRepositories } from "./repository-list-result.js";

type RepoListCurrentUserRepositoriesClient = {
  listCurrentUserRepositories: (input: {
    page: number;
    page_size: number;
    order_by?: "created_at" | "updated_at";
    sort?: "asc" | "desc";
    archived?: boolean;
    search?: string;
    starred?: boolean;
    membership?: boolean;
    user_created?: boolean;
    include_abnormal?: boolean;
  }) => Promise<{
    repositories: RepoRepositorySummary[];
    total?: number;
  }>;
};

export function createRepoListCurrentUserRepositoriesHandler(client: RepoListCurrentUserRepositoriesClient) {
  return async (input: unknown) => {
    const parsed = repoListCurrentUserRepositoriesInput.parse(input);
    const response = await client.listCurrentUserRepositories(parsed);
    const result = mapCurrentUserRepositories(response.repositories, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
