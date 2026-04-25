import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreatePlanWorkItemInput } from "../schemas.js";

export function previewCreatePlanWorkItem(input: {
  project_id: string;
  plan_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id?: string;
  developer_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create plan work item ${input.title}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    title: input.title,
    workItemType: input.work_item_type,
    parentWorkItemId: input.parent_work_item_id,
    developerId: input.developer_id,
    executed: false
  });
}

export function mapCreatedPlanWorkItem(input: {
  id: number | string;
  name: string;
  number?: number | string;
  description?: string;
  status?: { id?: number | string; name?: string };
  tracker?: { id?: number | string; name?: string };
  project_id?: string;
  plan_id: string;
}) {
  return asItemResult(`Created plan work item ${input.name}`, {
    id: String(input.id),
    number: input.number ? String(input.number) : undefined,
    title: input.name,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    projectId: input.project_id,
    planId: input.plan_id,
    executed: true
  });
}

type ReqCreatePlanWorkItemClient = {
  createPlanWorkItem: (input: {
    project_id: string;
    plan_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id?: string;
    description?: string;
    iteration_id?: string;
    module_id?: string;
    priority_id?: number;
    severity_id?: number;
    status_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    expected_work_hours?: number;
    start_date?: number;
    due_date?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    number?: number | string;
    description?: string;
    status?: { id?: number | string; name?: string };
    tracker?: { id?: number | string; name?: string };
    project_id?: string;
    plan_id: string;
  }>;
};

export function createReqCreatePlanWorkItemHandler(client: ReqCreatePlanWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqCreatePlanWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePlanWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createPlanWorkItem(parsed);
    const result = mapCreatedPlanWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
