import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemTreeInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqWorkItemTreeItem = {
  [key: string]: unknown;
  id: number | string;
  subject?: string;
  name?: string;
  status?: {
    id?: number | string;
    name?: string;
  };
  status_name?: string;
  tracker?: {
    id?: number | string;
    name?: string;
  };
  tracker_name?: string;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
  created_on?: string | number;
  created_time?: string | number;
  updated_on?: string | number;
  updated_time?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  begin_time?: string | number;
  end_time?: string | number;
  is_parent?: boolean;
  isParent?: boolean;
};

type ReqWorkItemTree = {
  project_id: string;
  page: number;
  page_size: number;
  tracker_ids?: number[];
  work_items: ReqWorkItemTreeItem[];
  total?: number;
};

export function mapReqWorkItemTree(input: ReqWorkItemTree) {
  return asListResult(
    `${input.work_items.length} work items found in tree mode`,
    input.work_items.map((item) => {
      const assignee = mapReqWorkItemAssignee(item);
      const createdOn = item.created_on ?? item.created_time;
      const updatedOn = item.updated_on ?? item.updated_time;
      const startDate = item.start_date ?? item.begin_time;
      const dueDate = item.due_date ?? item.end_time;

      return {
        id: String(item.id),
        subject: item.subject ?? item.name ?? "",
        statusName: item.status?.name ?? item.status_name,
        trackerName: item.tracker?.name ?? item.tracker_name,
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
        hasChildren: item.is_parent ?? item.isParent,
        rawWorkItem: item
      };
    }),
    toPageInfo(input.page, input.page_size, input.total),
    { workItems: input.work_items }
  );
}

type ReqListWorkItemTreeClient = {
  listWorkItemTree: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
  }) => Promise<ReqWorkItemTree>;
};

export function createReqListWorkItemTreeHandler(client: ReqListWorkItemTreeClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemTreeInput.parse(input);
    const response = await client.listWorkItemTree(parsed);
    const result = mapReqWorkItemTree(response);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "subject", get: (item) => (item as { subject?: string }).subject },
            { label: "status", get: (item) => (item as { statusName?: string }).statusName },
            { label: "tracker", get: (item) => (item as { trackerName?: string }).trackerName },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "updatedOn", get: (item) => (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ?? (item as { updatedOn?: string }).updatedOn }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work items in tree mode",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
