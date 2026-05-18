import { asItemResult } from "../../../contracts/tool-result.js";
import { AppError } from "../../../core/errors/app-error.js";
import { reqGetWorkItemIssueDetailsInput } from "../schemas.js";

type ReqWorkItemIssueDetails = {
  id: number | string;
  subject?: string;
  description?: string;
  created_on?: string;
  updated_on?: string;
  status?: Record<string, unknown>;
  tracker?: Record<string, unknown>;
  project?: Record<string, unknown>;
  module?: Record<string, unknown>;
  parent_issue?: Record<string, unknown>;
  custom_fields?: Array<Record<string, unknown>>;
  accessories_list?: Array<Record<string, unknown>>;
  inner_text?: string;
};

export function mapReqWorkItemIssueDetails(input: ReqWorkItemIssueDetails) {
  return asItemResult(`Loaded work item issue details ${input.id}`, {
    id: String(input.id),
    title: input.subject,
    description: input.description,
    createdOn: input.created_on,
    updatedOn: input.updated_on,
    status: input.status,
    tracker: input.tracker,
    project: input.project,
    module: input.module,
    parentIssue: input.parent_issue,
    customFields: input.custom_fields ?? [],
    attachments: input.accessories_list ?? [],
    latestComment: input.inner_text
  });
}

export function mapReqWorkItemIssueDetailsFallback(input: {
  id: number | string;
  subject: string;
  status?: { id?: number | string; name?: string };
  tracker_name?: string;
  description?: string;
}) {
  return asItemResult(`Loaded work item issue details ${input.id} (fallback)`, {
    id: String(input.id),
    title: input.subject,
    description: input.description,
    status: input.status,
    tracker: input.tracker_name ? { name: input.tracker_name } : undefined,
    project: undefined,
    module: undefined,
    parentIssue: undefined,
    customFields: [],
    attachments: [],
    latestComment: undefined,
    fallbackUsed: true
  });
}

type ReqGetWorkItemIssueDetailsClient = {
  getWorkItemIssueDetails: (input: {
    project_id: string;
    work_item_id: string;
    include: string;
  }) => Promise<ReqWorkItemIssueDetails>;
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    id: number | string;
    subject: string;
    status?: { id?: number | string; name?: string };
    tracker_name?: string;
    description?: string;
  }>;
};

export function createReqGetWorkItemIssueDetailsHandler(client: ReqGetWorkItemIssueDetailsClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemIssueDetailsInput.parse(input);
    let result;

    try {
      const response = await client.getWorkItemIssueDetails(parsed);
      result = mapReqWorkItemIssueDetails(response);
    } catch (error) {
      if (!(error instanceof AppError) || error.category !== "provider_error") {
        throw error;
      }

      const fallback = await client.getWorkItem({
        project_id: parsed.project_id,
        work_item_id: parsed.work_item_id
      });
      result = mapReqWorkItemIssueDetailsFallback(fallback);
    }

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
