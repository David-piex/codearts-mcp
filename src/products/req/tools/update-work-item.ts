import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateWorkItemInput } from "../schemas.js";

export function previewUpdateWorkItem(input: {
  project_id: string;
  work_item_id: string;
  title?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Updated";

  return asItemResult(`${mode}: update work item ${input.work_item_id}`, {
    id: input.work_item_id,
    projectId: input.project_id,
    title: input.title,
    executed: !input.dry_run
  });
}

export function mapUpdatedWorkItem(input: {
  id: number | string;
  name: string;
  description?: string;
  status?: { id?: number; name?: string };
  tracker?: { id?: number; name?: string };
}) {
  return asItemResult(`Updated work item ${input.id}`, {
    id: String(input.id),
    title: input.name,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    executed: true
  });
}

type ReqUpdateWorkItemClient = {
  updateWorkItem: (input: {
    project_id: string;
    work_item_id: string;
    title?: string;
    work_item_type?: string;
    description?: string;
    status_id?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
};

export function createReqUpdateWorkItemHandler(client: ReqUpdateWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateWorkItem(parsed);
    const result = mapUpdatedWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
