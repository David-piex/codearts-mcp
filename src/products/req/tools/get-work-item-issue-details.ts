import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemIssueDetailsInput } from "../schemas.js";
import { mapReqWorkItemAssignee, type ReqWorkItemAssignee } from "./work-item-assignee.js";

type ReqWorkItemIssueDetails = {
  id?: number | string;
  subject?: string;
  description?: string;
  created_on?: string | number;
  updated_on?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  status?: { id?: number | string; name?: string };
  tracker?: { id?: number | string; name?: string };
  project?: Record<string, unknown>;
  module?: Record<string, unknown>;
  parent_issue?: Record<string, unknown>;
  customFields?: Array<Record<string, unknown>>;
  custom_fields?: Array<Record<string, unknown>>;
  accessories_list?: Array<Record<string, unknown>>;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
  journals?: Array<{
    id?: number | string;
    notes?: string;
    created_on?: string;
    user?: {
      id?: number | string;
      name?: string;
      first_name?: string;
      last_name?: string;
      identifier?: string;
      user_num_id?: number;
    };
  }>;
};

function mapJournalAuthor(user?: {
  id?: number | string;
  name?: string;
  first_name?: string;
  last_name?: string;
  identifier?: string;
  user_num_id?: number;
}) {
  if (!user) {
    return undefined;
  }

  return {
    id: typeof user.id === "undefined" ? undefined : String(user.id),
    userName: user.name ?? user.identifier,
    nickName: [user.first_name, user.last_name].filter(Boolean).join(" ").trim() || undefined,
    userNumId: user.user_num_id
  };
}

export function mapReqWorkItemIssueDetails(input: ReqWorkItemIssueDetails) {
  const assignee = mapReqWorkItemAssignee(input);
  const comments = (input.journals ?? []).map((journal) => ({
    id: String(journal.id ?? ""),
    content: journal.notes,
    createdTime: journal.created_on,
    author: mapJournalAuthor(journal.user)
  }));
  const latestComment = comments.at(-1)?.content;
  const assigneeText = assignee?.displayName ? ` (assignee: ${assignee.displayName})` : "";

  return asItemResult(`Loaded work item issue details ${input.id ?? ""}${assigneeText}`, {
    id: String(input.id ?? ""),
    title: input.subject ?? "",
    description: input.description,
    createdOn: input.created_on,
    updatedOn: input.updated_on,
    startDate: input.start_date,
    dueDate: input.due_date,
    status: input.status,
    tracker: input.tracker,
    assignee,
    assignedToName: assignee?.displayName,
    project: input.project,
    module: input.module,
    parentIssue: input.parent_issue,
    customFields: input.customFields ?? input.custom_fields ?? [],
    attachments: input.accessories_list ?? [],
    latestComment,
    comments
  });
}

type ReqGetWorkItemIssueDetailsClient = {
  getWorkItemIssueDetails: (input: {
    project_id: string;
    work_item_id: string;
    include: string;
  }) => Promise<ReqWorkItemIssueDetails>;
};

export function createReqGetWorkItemIssueDetailsHandler(client: ReqGetWorkItemIssueDetailsClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemIssueDetailsInput.parse(input);
    const response = await client.getWorkItemIssueDetails(parsed);
    const result = mapReqWorkItemIssueDetails(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
