import { asItemResult } from "../../../contracts/tool-result.js";
import { reqQuickCreateChildWorkItemInput } from "../schemas.js";

export function previewQuickCreateChildWorkItem(input: {
  project_id: string;
  title: string;
  parent_issue_id: number;
  tracker_id: number;
  assigned_to_id?: number;
  fixed_version_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: quick create child work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    parentIssueId: input.parent_issue_id,
    trackerId: input.tracker_id,
    assignedToId: input.assigned_to_id,
    fixedVersionId: input.fixed_version_id,
    executed: false
  });
}

export function mapQuickCreatedChildWorkItem(input: {
  id: number | string;
  subject: string;
  description?: string;
  status?: { id?: number | string; name?: string };
  tracker?: { id?: number | string; name?: string };
  project_id?: string;
  parent_issue_id: number;
  assigned_to_id?: number;
  fixed_version_id?: string;
  rawIssue?: Record<string, unknown>;
}) {
  return asItemResult(`Quick created child work item ${input.subject}`, {
    id: String(input.id),
    title: input.subject,
    description: input.description,
    status: input.status?.name,
    statusId: input.status?.id,
    type: input.tracker?.name,
    typeId: input.tracker?.id,
    projectId: input.project_id,
    parentIssueId: input.parent_issue_id,
    assignedToId: input.assigned_to_id,
    fixedVersionId: input.fixed_version_id,
    executed: true
  }, {
    rawIssue: input.rawIssue
  });
}

type ReqQuickCreateChildWorkItemClient = {
  quickCreateChildWorkItem: (input: {
    project_id: string;
    title: string;
    parent_issue_id: number;
    tracker_id: number;
    assigned_to_id?: number;
    fixed_version_id?: string;
  }) => Promise<{
    id: number | string;
    subject: string;
    description?: string;
    status?: { id?: number | string; name?: string };
    tracker?: { id?: number | string; name?: string };
    project_id?: string;
    parent_issue_id: number;
    assigned_to_id?: number;
    fixed_version_id?: string;
    rawIssue?: Record<string, unknown>;
  }>;
};

export function createReqQuickCreateChildWorkItemHandler(client: ReqQuickCreateChildWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqQuickCreateChildWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewQuickCreateChildWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.quickCreateChildWorkItem(parsed);
    const result = mapQuickCreatedChildWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
