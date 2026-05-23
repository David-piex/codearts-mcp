import type { RepoProjectSubgroupOrRepository } from "../client.js";
import { repoListGroupSubgroupsAndRepositoriesInput } from "../schemas.js";
import { mapProjectSubgroupsAndRepositoriesList } from "./project-settings-result.js";

type Client = {
  listGroupSubgroupsAndRepositories: (input: {
    group_id: string;
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

export function createRepoListGroupSubgroupsAndRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupSubgroupsAndRepositoriesInput.parse(input);
    const response = await client.listGroupSubgroupsAndRepositories(parsed);
    const result = mapProjectSubgroupsAndRepositoriesList(
      `${response.items.length} group subgroups or repositories found`,
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
