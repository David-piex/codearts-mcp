import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateEpicIssueInput } from "../schemas.js";

export function previewCreateEpicIssue(input: {
  project_id: string;
  tracker_id?: number;
  priority_id?: number;
  title: string;
  parent_issue_id?: number;
  description?: string;
  due_date?: number;
  start_date?: number;
  severity_id?: number;
  done_ratio?: number;
  status_id?: number;
  expected_work_hours?: number;
  plan_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create epic issue ${input.title}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id ?? 5,
    priorityId: input.priority_id,
    title: input.title,
    parentIssueId: input.parent_issue_id,
    description: input.description,
    dueDate: input.due_date,
    startDate: input.start_date,
    severityId: input.severity_id,
    doneRatio: input.done_ratio,
    statusId: input.status_id,
    expectedWorkHours: input.expected_work_hours,
    planId: input.plan_id,
    endpoint: "/v2/issues/create",
    executed: false
  });
}

export function mapCreatedEpicIssue(input: {
  id: number | string;
  name: string;
  number?: number | string;
  description?: string;
  status?: { id?: number | string; name?: string };
  tracker?: { id?: number | string; name?: string };
  project_id?: string;
  plan_id?: string;
}) {
  return asItemResult(`Created epic issue ${input.name}`, {
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

type ReqCreateEpicIssueClient = {
  createEpicIssue: (input: {
    project_id: string;
    tracker_id?: number;
    priority_id?: number;
    title: string;
    parent_issue_id?: number;
    description?: string;
    due_date?: number;
    start_date?: number;
    severity_id?: number;
    done_ratio?: number;
    status_id?: number;
    expected_work_hours?: number;
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

export function createReqCreateEpicIssueHandler(client: ReqCreateEpicIssueClient) {
  return async (input: unknown) => {
    const parsed = reqCreateEpicIssueInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateEpicIssue(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createEpicIssue(parsed);
    const result = mapCreatedEpicIssue(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
