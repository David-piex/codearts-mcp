import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateWorkItemFlowInput } from "../schemas.js";

export function previewUpdateWorkItemFlow(input: {
  project_id: string;
  work_item_id: string;
  status_id: number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update work item flow ${input.work_item_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    statusId: input.status_id,
    executed: false
  });
}

export function mapUpdatedWorkItemFlow(input: {
  work_item_id: string;
  title?: string;
  status_id: number;
  status_name?: string;
  type_id?: number;
  type_name?: string;
  updated_on?: string;
}) {
  return asItemResult(`Updated work item flow ${input.work_item_id}`, {
    workItemId: input.work_item_id,
    title: input.title,
    statusId: input.status_id,
    status: input.status_name,
    typeId: input.type_id,
    type: input.type_name,
    updatedOn: input.updated_on,
    executed: true
  });
}

type ReqUpdateWorkItemFlowClient = {
  updateWorkItemFlow: (input: {
    project_id: string;
    work_item_id: string;
    status_id: number;
  }) => Promise<{
    work_item_id: string;
    title?: string;
    status_id: number;
    status_name?: string;
    type_id?: number;
    type_name?: string;
    updated_on?: string;
  }>;
};

export function createReqUpdateWorkItemFlowHandler(client: ReqUpdateWorkItemFlowClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateWorkItemFlowInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateWorkItemFlow(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateWorkItemFlow(parsed);
    const result = mapUpdatedWorkItemFlow(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
