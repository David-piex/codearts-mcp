import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateIterationWorkItemInput } from "../schemas.js";

export function previewCreateIterationWorkItem(input: {
  project_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id?: string;
  developer_id?: string;
  iteration_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create iteration work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
    parentWorkItemId: input.parent_work_item_id,
    iterationId: input.iteration_id,
    developerId: input.developer_id,
    executed: false
  });
}

export function mapCreatedIterationWorkItem(
  input: {
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
    project_id: string;
    iteration_id: string;
  }
) {
  return asItemResult(`Created iteration work item ${input.name}`, {
    id: String(input.id),
    title: input.name,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    projectId: input.project_id,
    iterationId: input.iteration_id,
    executed: true
  });
}

type ReqCreateIterationWorkItemClient = {
  createWorkItem: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id?: string;
    description?: string;
    iteration_id: string;
    priority_id?: number;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    expected_work_hours?: number;
    start_date?: number;
    due_date?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
    project_id?: string;
    iteration_id?: string;
  }>;
};

export function createReqCreateIterationWorkItemHandler(client: ReqCreateIterationWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqCreateIterationWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateIterationWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItem(parsed);
    const result = mapCreatedIterationWorkItem({
      ...response,
      project_id: response.project_id ?? parsed.project_id,
      iteration_id: response.iteration_id ?? parsed.iteration_id
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
