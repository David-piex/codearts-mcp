import type { RepoRepositorySummary } from "../client.js";
import { repoListManageableGroupsInput } from "../schemas.js";
import { mapRepositorySummaryList } from "./repository-list-result.js";

type Client = {
  listManageableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    scope?: "group" | "repository";
  }) => Promise<{
    groups: RepoRepositorySummary[];
    total?: number;
  }>;
};

export function createRepoListManageableGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoListManageableGroupsInput.parse(input);
    const response = await client.listManageableGroups(parsed);
    const result = mapRepositorySummaryList(
      `${response.groups.length} manageable groups found`,
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
