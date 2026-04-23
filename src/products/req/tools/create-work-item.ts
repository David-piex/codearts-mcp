import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateWorkItemInput } from "../schemas.js";

export function previewCreateWorkItem(input: {
  project_id: string;
  title: string;
  work_item_type: string;
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
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
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

export function mapCreatedWorkItem(input: {
  id: number | string;
  name: string;
  description?: string;
  status?: { id?: number; name?: string };
  tracker?: { id?: number; name?: string };
}) {
  return asItemResult(`Created work item ${input.name}`, {
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

type ReqCreateWorkItemClient = {
  createWorkItem: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    description?: string;
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

export function createReqCreateWorkItemHandler(client: ReqCreateWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItem(parsed);
    const result = mapCreatedWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
