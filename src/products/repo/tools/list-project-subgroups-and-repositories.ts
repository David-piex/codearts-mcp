import type { RepoProjectSubgroupOrRepository } from "../client.js";
import { repoListProjectSubgroupsAndRepositoriesInput } from "../schemas.js";
import { mapProjectSubgroupsAndRepositoriesList } from "./project-settings-result.js";

type RepoListProjectSubgroupsAndRepositoriesClient = {
  listProjectSubgroupsAndRepositories: (input: {
    project_id: string;
    page: number;
    page_size: number;
    filter?: string | number;
    order_by?: string;
    sort?: string;
    archived?: boolean;
  }) => Promise<{
    items: RepoProjectSubgroupOrRepository[];
    total?: number;
  }>;
};

export function createRepoListProjectSubgroupsAndRepositoriesHandler(
  client: RepoListProjectSubgroupsAndRepositoriesClient
) {
  return async (input: unknown) => {
    const parsed = repoListProjectSubgroupsAndRepositoriesInput.parse(input);
    const response = await client.listProjectSubgroupsAndRepositories(parsed);
    const result = mapProjectSubgroupsAndRepositoriesList(
      `${response.items.length} project subgroups or repositories found`,
      response.items,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
