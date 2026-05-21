import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemsInput } from "../schemas.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

export function mapReqWorkItems(
  items: Array<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
    assigned_to?: ReqWorkItemAssignee;
    assigned_user?: ReqWorkItemAssignee;
    assigned_id?: string;
    assigned_to_id?: number | string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined ? `${items.length} work items found in this page (total: ${total})` : `${items.length} work items found`;
  return asListResult(
    summary,
    items.map((item) => {
      const assignee = mapReqWorkItemAssignee(item);

      return {
        id: String(item.id),
        title: item.subject,
        status: item.status?.name,
        type: item.tracker_name,
        assignee,
        assignedToName: assignee?.displayName
      };
    }),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListWorkItemsClient = {
  listWorkItems: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject: string;
      status?: { name?: string };
      tracker_name?: string;
      assigned_to?: ReqWorkItemAssignee;
      assigned_user?: ReqWorkItemAssignee;
      assigned_id?: string;
      assigned_to_id?: number | string;
    }>;
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
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName }
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
