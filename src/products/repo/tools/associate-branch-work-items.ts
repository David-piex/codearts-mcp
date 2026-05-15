import { asItemResult } from "../../../contracts/tool-result.js";
import { repoAssociateBranchWorkItemsInput } from "../schemas.js";

export function previewAssociateBranchWorkItems(input: {
  project_id: string;
  repository_id: string;
  branch: string;
  work_item_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: associate ${input.work_item_ids.length} work item(s) with branch ${input.branch}`, {
    projectId: input.project_id,
    repositoryId: input.repository_id,
    branch: input.branch,
    workItemIds: input.work_item_ids,
    executed: !input.dry_run
  });
}

export function mapAssociatedBranchWorkItems(input: {
  status?: string;
  project_id: string;
  repository_id: string;
  branch: string;
  work_item_ids: string[];
}) {
  const success = input.status === undefined || input.status.toLowerCase() === "success";

  return asItemResult(
    success
      ? `Associated ${input.work_item_ids.length} work item(s) with branch ${input.branch}`
      : `Branch work item association returned status ${input.status}`,
    {
      projectId: input.project_id,
      repositoryId: input.repository_id,
      branch: input.branch,
      workItemIds: input.work_item_ids,
      status: input.status,
      success,
      executed: true
    }
  );
}

type RepoAssociateBranchWorkItemsClient = {
  associateBranchWorkItems: (input: {
    project_id: string;
    repository_id: string;
    branch: string;
    work_item_ids: string[];
  }) => Promise<{
    status?: string;
    project_id: string;
    repository_id: string;
    branch: string;
    work_item_ids: string[];
  }>;
};

export function createRepoAssociateBranchWorkItemsHandler(client: RepoAssociateBranchWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = repoAssociateBranchWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAssociateBranchWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.associateBranchWorkItems(parsed);
    const result = mapAssociatedBranchWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
