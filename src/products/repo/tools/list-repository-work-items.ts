import type { RepoRelatedWorkItem } from "../client.js";
import { repoListRepositoryWorkItemsInput } from "../schemas.js";
import { mapRelatedWorkItemsList } from "./work-item-result.js";

type RepoListRepositoryWorkItemsClient = {
  listRepositoryWorkItems: (input: {
    repository_id: string;
    project_id: string;
    is_ipd: boolean;
    page: number;
    page_size: number;
    subject?: string;
  }) => Promise<{
    work_items: RepoRelatedWorkItem[];
    total?: number;
  }>;
};

export function createRepoListRepositoryWorkItemsHandler(
  client: RepoListRepositoryWorkItemsClient
) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryWorkItemsInput.parse(input);
    const response = await client.listRepositoryWorkItems(parsed);
    const result = mapRelatedWorkItemsList(
      `${response.work_items.length} repository work items found`,
      response.work_items,
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
