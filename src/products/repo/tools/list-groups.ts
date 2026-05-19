import type { RepoRepositorySummary } from "../client.js";
import { repoListGroupsInput } from "../schemas.js";
import { mapRepositorySummaryList } from "./repository-list-result.js";

type Client = {
  listGroups: (input: {
    page: number;
    page_size: number;
    search?: string;
    all_available?: boolean;
    order_by?: "id" | "name" | "path" | "created_at" | "updated_at";
    sort?: "asc" | "desc";
    starred?: boolean;
    owned?: boolean;
  }) => Promise<{
    groups: RepoRepositorySummary[];
    total?: number;
  }>;
};

export function createRepoListGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListGroupsInput.parse(input);
    const response = await client.listGroups(parsed);
    const result = mapRepositorySummaryList(
      `${response.groups.length} groups found`,
      response.groups,
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
