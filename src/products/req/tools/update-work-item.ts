import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateWorkItemInput } from "../schemas.js";

export function previewUpdateWorkItem(input: {
  project_id: string;
  work_item_id: string;
  title?: string;
  iteration_id?: string;
  module_id?: string;
  severity_id?: number;
  assigned_id?: string;
  done_ratio?: number;
  expected_work_hours?: number;
  start_date?: number;
  due_date?: number;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Updated";

  return asItemResult(`${mode}: update work item ${input.work_item_id}`, {
    id: input.work_item_id,
    projectId: input.project_id,
    title: input.title,
    iterationId: input.iteration_id,
    moduleId: input.module_id,
    severityId: input.severity_id,
    assignedId: input.assigned_id,
    doneRatio: input.done_ratio,
    expectedWorkHours: input.expected_work_hours,
    startDate: input.start_date,
    dueDate: input.due_date,
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
    priority_id?: number;
    iteration_id?: string;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
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
