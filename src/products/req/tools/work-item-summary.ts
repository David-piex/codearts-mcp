import { formatReqTimestampText } from "./time-format.js";
import { buildReqFullName } from "./user-name.js";
import { mapReqWorkItemAssignee, type ReqWorkItemAssignee } from "./work-item-assignee.js";

function toStringValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

function readRecord(value: unknown) {
  return typeof value === "object" && value !== null ? value as Record<string, unknown> : undefined;
}

export function normalizeReqRecord(value: unknown) {
  const record = readRecord(value);
  if (!record) {
    return undefined;
  }

  return Object.keys(record).length > 0 ? record : undefined;
}

export function pickReqNamedEntityId(value: unknown) {
  const record = normalizeReqRecord(value);
  return toStringValue(record?.id ?? record?.module_id ?? record?.tracker_id ?? record?.status_id ?? record?.version_id);
}

export function pickReqNamedEntityName(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  const record = normalizeReqRecord(value);
  return toStringValue(
    record?.name ??
    record?.title ??
    record?.subject ??
    record?.module_name ??
    record?.display_name ??
    record?.value
  );
}

export function mapReqNamedEntity(value: unknown) {
  if (typeof value === "undefined" || value === null) {
    return undefined;
  }

  const id = pickReqNamedEntityId(value);
  const name = pickReqNamedEntityName(value);
  if (!id && !name) {
    return undefined;
  }

  return {
    id,
    name
  };
}

export function mapReqUserEntity(value: unknown) {
  const record = normalizeReqRecord(value);
  if (!record) {
    return undefined;
  }

  const fullName = buildReqFullName(record.first_name ?? record.firstName, record.last_name ?? record.lastName);
  const userName = toStringValue(record.name ?? record.user_name ?? record.userName ?? record.identifier);
  const nickName = toStringValue(record.nick_name ?? record.nickName);
  const displayName = nickName ?? fullName ?? userName;

  if (!displayName && typeof record.id === "undefined") {
    return undefined;
  }

  return {
    id: toStringValue(record.id),
    userId: toStringValue(record.user_id ?? record.userId ?? record.identifier),
    userName,
    nickName,
    displayName
  };
}

export type ReqWorkItemSummarySource = {
  [key: string]: unknown;
  id: number | string;
  subject?: string;
  name?: string;
  status?: { id?: number | string; name?: string };
  status_id?: number | string;
  status_name?: string;
  tracker?: { id?: number | string; name?: string };
  tracker_id?: number | string;
  tracker_name?: string;
  description?: string;
  created_on?: string | number;
  created_time?: string | number;
  updated_on?: string | number;
  updated_time?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  begin_time?: string | number;
  end_time?: string | number;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
  priority?: unknown;
  severity?: unknown;
  module?: unknown;
  domain?: unknown;
  fixed_version?: unknown;
  story_point?: unknown;
  parent_issue?: unknown;
  children?: unknown[];
  author?: unknown;
  developer?: unknown;
  custom_fields?: unknown[];
  customFields?: unknown[];
  tagList?: unknown[];
  done_ratio?: number;
  expected_work_hours?: number;
  actual_work_hours?: number;
};

export function mapReqWorkItemSummaryFields(input: ReqWorkItemSummarySource) {
  const assignee = mapReqWorkItemAssignee(input);
  const createdOn = input.created_on ?? input.created_time;
  const updatedOn = input.updated_on ?? input.updated_time;
  const startDate = input.start_date ?? input.begin_time;
  const dueDate = input.due_date ?? input.end_time;
  const priority = mapReqNamedEntity(input.priority);
  const severity = mapReqNamedEntity(input.severity);
  const module = mapReqNamedEntity(input.module);
  const domain = mapReqNamedEntity(input.domain);
  const fixedVersion = mapReqNamedEntity(input.fixed_version);
  const storyPoint = mapReqNamedEntity(input.story_point);
  const parentIssue = mapReqNamedEntity(input.parent_issue);
  const author = mapReqUserEntity(input.author);
  const developer = mapReqUserEntity(input.developer);

  return {
    id: String(input.id),
    title: input.subject ?? input.name ?? "",
    status: input.status?.name ?? input.status_name,
    statusId: toStringValue(input.status?.id ?? input.status_id),
    type: input.tracker_name ?? input.tracker?.name,
    typeId: toStringValue(input.tracker?.id ?? input.tracker_id),
    description: input.description,
    createdOn,
    createdOnText: formatReqTimestampText(createdOn),
    updatedOn,
    updatedOnText: formatReqTimestampText(updatedOn),
    startDate,
    startDateText: formatReqTimestampText(startDate),
    dueDate,
    dueDateText: formatReqTimestampText(dueDate),
    assignee,
    assignedToName: assignee?.displayName,
    priority,
    priorityName: priority?.name,
    severity,
    severityName: severity?.name,
    module,
    moduleName: module?.name,
    domain,
    domainName: domain?.name,
    fixedVersion,
    fixedVersionName: fixedVersion?.name,
    storyPoint,
    storyPointName: storyPoint?.name,
    parentIssue,
    parentIssueName: parentIssue?.name,
    children: input.children ?? [],
    childrenCount: input.children?.length ?? 0,
    author,
    authorName: author?.displayName,
    developer,
    developerName: developer?.displayName,
    customFields: input.customFields ?? input.custom_fields ?? [],
    tagList: input.tagList ?? [],
    doneRatio: input.done_ratio,
    expectedWorkHours: input.expected_work_hours,
    actualWorkHours: input.actual_work_hours
  };
}
