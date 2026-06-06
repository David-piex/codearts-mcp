import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateIssueV3Input } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

function toOptionalString(value: unknown) {
  if (typeof value === "undefined" || value === null) {
    return undefined;
  }

  return String(value);
}

function toOptionalNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && /^\d+$/.test(value)) {
    return Number(value);
  }

  return undefined;
}

export function previewUpdateIssueV3(input: {
  project_id: string;
  work_item_id: string;
  type: string;
  x_auth_token: string;
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
  dry_run: boolean;
}) {
  return asItemResult("Dry run: update CodeArts Req work item through V3 token-header endpoint", {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    type: input.type,
    xAuthToken: redactToken(input.x_auth_token),
    title: input.title,
    workItemType: input.work_item_type,
    description: input.description,
    statusId: input.status_id,
    priorityId: input.priority_id,
    iterationId: input.iteration_id,
    moduleId: input.module_id,
    severityId: input.severity_id,
    assignedId: input.assigned_id,
    doneRatio: input.done_ratio,
    expectedWorkHours: input.expected_work_hours,
    startDate: input.start_date,
    dueDate: input.due_date,
    endpoint: "/v3/issues/update",
    executed: false
  });
}

export function mapUpdatedIssueV3(input: {
  project_id: string;
  work_item_id: string;
  type: string;
  status?: string;
  issue: Record<string, unknown>;
  raw?: unknown;
}) {
  const status = typeof input.issue.status === "object" && input.issue.status
    ? (input.issue.status as { name?: unknown; id?: unknown })
    : undefined;
  const tracker = typeof input.issue.tracker === "object" && input.issue.tracker
    ? (input.issue.tracker as { name?: unknown; id?: unknown })
    : undefined;

  return asItemResult("Updated CodeArts Req work item through V3 token-header endpoint", {
    id: toOptionalString(input.issue.id) ?? input.work_item_id,
    projectId: input.project_id,
    projectUuid: toOptionalString(input.issue.projectUUId),
    type: toOptionalString(tracker?.name) ?? input.type,
    typeId: toOptionalNumber(tracker?.id ?? input.issue.tracker_id),
    title: toOptionalString(input.issue.subject),
    description: toOptionalString(input.issue.description),
    status: toOptionalString(status?.name ?? input.issue.status_name),
    statusId: toOptionalNumber(status?.id ?? input.issue.status_id),
    priorityId: toOptionalNumber(input.issue.priority_id),
    severityId: toOptionalNumber(input.issue.severity_id),
    assignedToId: toOptionalString(input.issue.assigned_to_id),
    iterationId: toOptionalString(input.issue.iteration_id),
    moduleId: toOptionalString(input.issue.module_id),
    doneRatio: toOptionalNumber(input.issue.done_ratio),
    expectedWorkHours:
      typeof input.issue.expected_work_hours === "number"
        ? input.issue.expected_work_hours
        : toOptionalNumber(input.issue.expected_work_hours),
    startDate: toOptionalString(input.issue.start_date),
    dueDate: toOptionalString(input.issue.due_date),
    createdOn: toOptionalString(input.issue.created_on),
    updatedOn: toOptionalString(input.issue.updated_on),
    lockVersion: toOptionalString(input.issue.lockVersion),
    mutationStatus: input.status,
    executed: true
  }, input.raw);
}

type ReqUpdateIssueV3Client = {
  updateIssueV3: (input: {
    project_id: string;
    work_item_id: string;
    type: string;
    x_auth_token: string;
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
    project_id: string;
    work_item_id: string;
    type: string;
    status?: string;
    issue: Record<string, unknown>;
    raw?: unknown;
  }>;
};

export function createReqUpdateIssueV3Handler(client: ReqUpdateIssueV3Client) {
  return async (input: unknown) => {
    const parsed = reqUpdateIssueV3Input.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateIssueV3(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIssueV3(parsed);
    const result = mapUpdatedIssueV3(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
