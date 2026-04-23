import { asItemResult } from "../../../contracts/tool-result.js";
import { reqAddPlanWorkItemsInput } from "../schemas.js";

export function previewAddPlanWorkItems(input: {
  project_id: string;
  plan_id: string;
  work_item_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: add ${input.work_item_ids.length} work items to plan ${input.plan_id}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    workItemIds: input.work_item_ids,
    addedCount: 0,
    executed: false
  });
}

export function mapAddedPlanWorkItems(input: {
  project_id: string;
  plan_id: string;
  work_item_ids: string[];
  addedCount: number;
}) {
  return asItemResult(`Added ${input.addedCount} work items to plan ${input.plan_id}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    workItemIds: input.work_item_ids,
    addedCount: input.addedCount,
    executed: true
  });
}

type ReqAddPlanWorkItemsClient = {
  addPlanWorkItems: (input: {
    project_id: string;
    plan_id: string;
    work_item_ids: string[];
  }) => Promise<{
    project_id: string;
    plan_id: string;
    work_item_ids: string[];
    addedCount: number;
  }>;
};

export function createReqAddPlanWorkItemsHandler(client: ReqAddPlanWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqAddPlanWorkItemsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddPlanWorkItems(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addPlanWorkItems(parsed);
    const result = mapAddedPlanWorkItems(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
