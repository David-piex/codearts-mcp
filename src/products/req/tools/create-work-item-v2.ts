import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateWorkItemV2Input } from "../schemas.js";

export function previewCreateWorkItemV2(input: {
  project_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id?: string;
  developer_id?: string;
  plan_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create work item V2 ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
    parentWorkItemId: input.parent_work_item_id,
    developerId: input.developer_id,
    planId: input.plan_id,
    endpoint: "/v2/issues/create",
    executed: false
  });
}

export function mapCreatedWorkItemV2(input: {
  id: number | string;
  name: string;
  number?: number | string;
  description?: string;
  status?: { id?: number | string; name?: string };
  tracker?: { id?: number | string; name?: string };
  project_id?: string;
  plan_id?: string;
}) {
  return asItemResult(`Created work item V2 ${input.name}`, {
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

type ReqCreateWorkItemV2Client = {
  createWorkItemV2: (input: {
    project_id: string;
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
    plan_id?: string;
  }) => Promise<{
    id: number | string;
    name: string;
    number?: number | string;
    description?: string;
    status?: { id?: number | string; name?: string };
    tracker?: { id?: number | string; name?: string };
    project_id?: string;
    plan_id?: string;
  }>;
};

export function createReqCreateWorkItemV2Handler(client: ReqCreateWorkItemV2Client) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemV2Input.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateWorkItemV2(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItemV2(parsed);
    const result = mapCreatedWorkItemV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
