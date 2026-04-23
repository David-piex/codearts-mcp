import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteWorkItemInput } from "../schemas.js";

export function previewDeleteWorkItem(input: {
  project_id: string;
  work_item_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete work item ${input.work_item_id}`, {
    id: input.work_item_id,
    projectId: input.project_id,
    deleted: false,
    executed: false
  });
}

export function mapDeletedWorkItem(input: {
  project_id: string;
  work_item_id: string;
}) {
  return asItemResult(`Deleted work item ${input.work_item_id}`, {
    id: input.work_item_id,
    projectId: input.project_id,
    deleted: true,
    executed: true
  });
}

type ReqDeleteWorkItemClient = {
  deleteWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    project_id: string;
    work_item_id: string;
    deleted: true;
  }>;
};

export function createReqDeleteWorkItemHandler(client: ReqDeleteWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteWorkItem(parsed);
    const result = mapDeletedWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
