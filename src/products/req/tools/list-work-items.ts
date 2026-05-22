import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemsInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqListWorkItem = {
  [key: string]: unknown;
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
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
};

export function mapReqWorkItems(
  items: ReqListWorkItem[],
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined ? `${items.length} work items found in this page (total: ${total})` : `${items.length} work items found`;
  return asListResult(
    summary,
    items.map((item) => {
      const assignee = mapReqWorkItemAssignee(item);
      const createdOn = item.created_on ?? item.created_time;
      const updatedOn = item.updated_on ?? item.updated_time;
      const startDate = item.start_date ?? item.begin_time;
      const dueDate = item.due_date ?? item.end_time;

      return {
        id: String(item.id),
        title: item.subject ?? item.name ?? "",
        status: item.status?.name,
        type: item.tracker_name ?? item.tracker?.name,
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
        rawWorkItem: item
      };
    }),
    toPageInfo(page, pageSize, total),
    { workItems: items }
  );
}

type ReqListWorkItemsClient = {
  listWorkItems: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemsHandler(client: ReqListWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemsInput.parse(input);
    const response = await client.listWorkItems(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "createdOn", get: (item) => (item as { createdOnText?: string; createdOn?: string }).createdOnText ?? (item as { createdOn?: string }).createdOn },
            { label: "updatedOn", get: (item) => (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ?? (item as { updatedOn?: string }).updatedOn }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
