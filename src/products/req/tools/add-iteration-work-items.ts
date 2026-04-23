import { asItemResult } from "../../../contracts/tool-result.js";
import { reqAddIterationWorkItemsInput } from "../schemas.js";

export function previewAddIterationWorkItems(input: {
  project_id: string;
  iteration_id: string;
  work_item_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: add ${input.work_item_ids.length} work items to iteration ${input.iteration_id}`,
    {
      projectId: input.project_id,
      iterationId: input.iteration_id,
      workItemIds: input.work_item_ids,
      addedCount: 0,
      executed: false
    }
  );
}

export function mapAddedIterationWorkItems(input: {
  project_id: string;
  iteration_id: string;
  work_item_ids: string[];
  addedCount: number;
}) {
  return asItemResult(
    `Added ${input.addedCount} work items to iteration ${input.iteration_id}`,
    {
      projectId: input.project_id,
      iterationId: input.iteration_id,
      workItemIds: input.work_item_ids,
      addedCount: input.addedCount,
      executed: true
    }
  );
}

type ReqAddIterationWorkItemsClient = {
  batchUpdateWorkItems: (input: {
    project_id: string;
    iteration_id: string;
    work_item_ids: string[];
  }) => Promise<{
    project_id: string;
    iteration_id?: string;
    work_item_ids: string[];
    updatedCount: number;
  }>;
};

export function createReqAddIterationWorkItemsHandler(client: ReqAddIterationWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqAddIterationWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddIterationWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateWorkItems(parsed);
    const result = mapAddedIterationWorkItems({
      project_id: response.project_id,
      iteration_id: response.iteration_id ?? parsed.iteration_id,
      work_item_ids: response.work_item_ids,
      addedCount: response.updatedCount
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
