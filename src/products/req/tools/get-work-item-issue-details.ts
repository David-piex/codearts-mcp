import { asItemResult } from "../../../contracts/tool-result.js";
import { formatItemToolText } from "../../../contracts/tool-result-text.js";
import { reqGetWorkItemIssueDetailsInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";
import { mapReqWorkItemAssignee, type ReqWorkItemAssignee } from "./work-item-assignee.js";

type ReqWorkItemIssueDetails = {
  [key: string]: unknown;
  id?: number | string;
  subject?: string;
  description?: string;
  created_on?: string | number;
  updated_on?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  done_ratio?: number;
  expected_work_hours?: number;
  actual_work_hours?: number;
  release_dev?: string;
  releaseDev?: string;
  find_release_dev?: string;
  findReleaseDev?: string;
  inner_text?: string;
  closed_flag?: number | boolean;
  is_archived?: boolean;
  deleted?: boolean;
  is_private?: boolean;
  is_watcher?: boolean;
  isContainDetailWorkingHours?: boolean;
  lockVersion?: number | string;
  order?: string | number;
  position?: string | number;
  root_id?: number | string;
  assignedImageId?: string;
  authorImageId?: string;
  projectAuthorDomainId?: string;
  status?: { id?: number | string; name?: string };
  status_attribute?: Record<string, unknown>;
  tracker?: { id?: number | string; name?: string };
  project?: Record<string, unknown>;
  priority?: Record<string, unknown>;
  severity?: Record<string, unknown>;
  module?: Record<string, unknown>;
  domain?: Record<string, unknown>;
  story_point?: Record<string, unknown>;
  fixed_version?: Record<string, unknown>;
  parent_issue?: Record<string, unknown>;
  children?: Array<Record<string, unknown>>;
  author?: Record<string, unknown>;
  developer?: Record<string, unknown>;
  closeder?: Record<string, unknown>;
  customFields?: Array<Record<string, unknown>>;
  custom_fields?: Array<Record<string, unknown>>;
  custom_value_new?: Record<string, unknown>;
  customValueNew?: Record<string, unknown>;
  tagList?: unknown[];
  accessories_list?: Array<Record<string, unknown>>;
  assigned_cc_user?: unknown[];
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
  journals_total?: number;
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
    createdOnText: formatReqTimestampText(input.created_on),
    updatedOn: input.updated_on,
    updatedOnText: formatReqTimestampText(input.updated_on),
    startDate: input.start_date,
    startDateText: formatReqTimestampText(input.start_date),
    dueDate: input.due_date,
    dueDateText: formatReqTimestampText(input.due_date),
    doneRatio: input.done_ratio,
    expectedWorkHours: input.expected_work_hours,
    actualWorkHours: input.actual_work_hours,
    releaseDev: input.release_dev ?? input.releaseDev,
    findReleaseDev: input.find_release_dev ?? input.findReleaseDev,
    innerText: input.inner_text,
    closedFlag: input.closed_flag,
    isArchived: input.is_archived,
    deleted: input.deleted,
    isPrivate: input.is_private,
    isWatcher: input.is_watcher,
    isContainDetailWorkingHours: input.isContainDetailWorkingHours,
    lockVersion: input.lockVersion,
    order: input.order,
    position: input.position,
    rootId: input.root_id,
    assignedImageId: input.assignedImageId,
    authorImageId: input.authorImageId,
    projectAuthorDomainId: input.projectAuthorDomainId,
    status: input.status,
    statusAttribute: input.status_attribute,
    tracker: input.tracker,
    priority: input.priority,
    severity: input.severity,
    assignee,
    assignedToName: assignee?.displayName,
    assignedCcUsers: input.assigned_cc_user ?? [],
    project: input.project,
    module: input.module,
    domain: input.domain,
    storyPoint: input.story_point,
    fixedVersion: input.fixed_version,
    parentIssue: input.parent_issue,
    children: input.children ?? [],
    author: input.author,
    developer: input.developer,
    closeder: input.closeder,
    customFields: input.customFields ?? input.custom_fields ?? [],
    customValueNew: input.custom_value_new ?? input.customValueNew,
    tagList: input.tagList ?? [],
    attachments: input.accessories_list ?? [],
    journals: input.journals ?? [],
    journalsTotal: input.journals_total,
    latestComment,
    comments,
    rawIssue: input
  }, input);
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
    const text = formatItemToolText(result, {
      fields: [
        { label: "id", get: (item) => item.id },
        { label: "title", get: (item) => item.title },
        { label: "status", get: (item) => item.status?.name },
        { label: "type", get: (item) => item.tracker?.name },
        { label: "assignee", get: (item) => item.assignedToName },
        { label: "description", get: (item) => item.description },
        { label: "createdOn", get: (item) => item.createdOnText ?? item.createdOn },
        { label: "updatedOn", get: (item) => item.updatedOnText ?? item.updatedOn },
        { label: "startDate", get: (item) => item.startDateText ?? item.startDate },
        { label: "dueDate", get: (item) => item.dueDateText ?? item.dueDate },
        { label: "doneRatio", get: (item) => item.doneRatio },
        { label: "expectedWorkHours", get: (item) => item.expectedWorkHours },
        { label: "actualWorkHours", get: (item) => item.actualWorkHours },
        { label: "latestComment", get: (item) => item.latestComment },
        { label: "journalsTotal", get: (item) => item.journalsTotal }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
