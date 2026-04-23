import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchDeleteWorkItemsInput } from "../schemas.js";

export function previewBatchDeleteWorkItems(input: {
  project_id: string;
  work_item_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: batch delete ${input.work_item_ids.length} work items`, {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    deletedCount: 0,
    executed: false
  });
}

export function mapBatchDeletedWorkItems(input: {
  project_id: string;
  work_item_ids: string[];
}) {
  return asItemResult(`Deleted ${input.work_item_ids.length} work items`, {
    projectId: input.project_id,
    workItemIds: input.work_item_ids,
    deletedCount: input.work_item_ids.length,
    executed: true
  });
}

type ReqBatchDeleteWorkItemsClient = {
  batchDeleteWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    deletedCount: number;
  }>;
};

export function createReqBatchDeleteWorkItemsHandler(client: ReqBatchDeleteWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteWorkItems(parsed);
    const result = mapBatchDeletedWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
