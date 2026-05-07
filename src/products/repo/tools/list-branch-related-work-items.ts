import type { RepoRelatedWorkItem } from "../client.js";
import { repoListBranchRelatedWorkItemsInput } from "../schemas.js";
import { mapRelatedWorkItemsList } from "./work-item-result.js";

type RepoListBranchRelatedWorkItemsClient = {
  listBranchRelatedWorkItems: (input: {
    repository_id: string;
    branch_name: string;
  }) => Promise<{
    work_items: RepoRelatedWorkItem[];
    total?: number;
  }>;
};

export function createRepoListBranchRelatedWorkItemsHandler(
  client: RepoListBranchRelatedWorkItemsClient
) {
  return async (input: unknown) => {
    const parsed = repoListBranchRelatedWorkItemsInput.parse(input);
    const response = await client.listBranchRelatedWorkItems(parsed);
    const result = mapRelatedWorkItemsList(
      `${response.work_items.length} branch related work items found`,
      response.work_items,
      1,
      response.work_items.length || response.total || 0,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
