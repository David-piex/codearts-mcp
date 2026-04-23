import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchUpdateWorkItemsInput } from "../schemas.js";

export function previewBatchUpdateWorkItems(input: {
  project_id: string;
  work_item_ids: string[];
  status_id?: number;
  priority_id?: number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: batch update ${input.work_item_ids.length} work items`, {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    statusId: input.status_id,
    priorityId: input.priority_id,
    updatedCount: 0,
    executed: false
  });
}

export function mapBatchUpdatedWorkItems(input: {
  project_id: string;
  work_item_ids: string[];
  status_id?: number;
  priority_id?: number;
  updatedCount: number;
}) {
  return asItemResult(`Updated ${input.updatedCount} work items`, {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    statusId: input.status_id,
    priorityId: input.priority_id,
    updatedCount: input.updatedCount,
    executed: true
  });
}

type ReqBatchUpdateWorkItemsClient = {
  batchUpdateWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
    updatedCount: number;
  }>;
};

export function createReqBatchUpdateWorkItemsHandler(client: ReqBatchUpdateWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqBatchUpdateWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchUpdateWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateWorkItems(parsed);
    const result = mapBatchUpdatedWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
