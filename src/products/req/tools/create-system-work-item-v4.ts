import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateSystemWorkItemV4Input } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewCreateSystemWorkItemV4(input: {
  project_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id?: string;
  iteration_id?: string;
  module_id?: string;
  severity_id?: number;
  assigned_id?: string;
  developer_id?: string;
  domain_id?: number;
  done_ratio?: number;
  expected_work_hours?: number;
  actual_work_hours?: number;
  start_date?: number;
  due_date?: number;
  x_auth_token: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create system work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
    parentWorkItemId: input.parent_work_item_id,
    iterationId: input.iteration_id,
    moduleId: input.module_id,
    severityId: input.severity_id,
    assignedId: input.assigned_id,
    developerId: input.developer_id,
    domainId: input.domain_id,
    doneRatio: input.done_ratio,
    expectedWorkHours: input.expected_work_hours,
    actualWorkHours: input.actual_work_hours,
    startDate: input.start_date,
    dueDate: input.due_date,
    xAuthToken: redactToken(input.x_auth_token),
    endpoint: "/v4/projects/{project_id}/system/issue",
    executed: !input.dry_run
  });
}

export function mapCreatedSystemWorkItemV4(input: {
  id: number | string;
  name: string;
  description?: string;
  status?: { id?: number; name?: string };
  tracker?: { id?: number; name?: string };
  raw?: unknown;
}) {
  return asItemResult(`Created system work item ${input.name}`, {
    id: String(input.id),
    title: input.name,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    executed: true
  }, input.raw);
}

type ReqCreateSystemWorkItemV4Client = {
  createSystemWorkItemV4: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id?: string;
    description?: string;
    priority_id?: number;
    iteration_id?: string;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    domain_id?: number;
    done_ratio?: number;
    expected_work_hours?: number;
    actual_work_hours?: number;
    start_date?: number;
    due_date?: number;
    x_auth_token: string;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
    raw?: unknown;
  }>;
};

export function createReqCreateSystemWorkItemV4Handler(client: ReqCreateSystemWorkItemV4Client) {
  return async (input: unknown) => {
    const parsed = reqCreateSystemWorkItemV4Input.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateSystemWorkItemV4(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createSystemWorkItemV4(parsed);
    const result = mapCreatedSystemWorkItemV4(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
