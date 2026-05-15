import type { RepoContributor } from "../client.js";
import { repoListRepositoryContributorsInput } from "../schemas.js";
import { mapRepositoryContributors } from "./repository-content-result.js";

type RepoListRepositoryContributorsClient = {
  listRepositoryContributors: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    order_by?: "name" | "email" | "commits";
    sort?: "asc" | "desc";
    ref_name?: string;
    skip_merge?: boolean;
    author?: string;
  }) => Promise<{
    contributors: RepoContributor[];
    total?: number;
  }>;
};

export function createRepoListRepositoryContributorsHandler(client: RepoListRepositoryContributorsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryContributorsInput.parse(input);
    const response = await client.listRepositoryContributors(parsed);
    const result = mapRepositoryContributors(response.contributors, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
