import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListBoardWorkItemsInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";

export function mapReqBoardWorkItems(
  items: Array<{
    id: number | string;
    subject?: string;
    description?: string;
    sequence?: string;
    priority?: string;
    important?: string;
    severity?: string;
    actual_work_hours?: number;
    expected_work_hours?: number;
    begin_time?: string;
    created_time?: string;
    end_time?: string;
    updated_time?: string;
    assigned_user?: {
      id?: string;
      name?: string;
      nick_name?: string;
    };
    author?: {
      id?: string;
      name?: string;
      nick_name?: string;
    };
    developer?: {
      id?: string;
      name?: string;
      nick_name?: string;
    };
    tags?: Array<{
      id?: string;
      name?: string;
    }>;
    status?: {
      id?: string;
      name?: string;
    };
    custom_fields?: unknown[];
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary =
    total !== undefined
      ? `${items.length} board work items found in this page (total: ${total})`
      : `${items.length} board work items found`;
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      description: item.description,
      sequence: item.sequence,
      status: item.status?.name,
      statusId: item.status?.id,
      priority: item.priority,
      important: item.important,
      severity: item.severity,
      actualWorkHours: item.actual_work_hours,
      expectedWorkHours: item.expected_work_hours,
      beginTime: item.begin_time,
      beginTimeText: formatReqTimestampText(item.begin_time),
      createdTime: item.created_time,
      createdTimeText: formatReqTimestampText(item.created_time),
      endTime: item.end_time,
      endTimeText: formatReqTimestampText(item.end_time),
      updatedTime: item.updated_time,
      updatedTimeText: formatReqTimestampText(item.updated_time),
      assignedToName: item.assigned_user?.nick_name ?? item.assigned_user?.name,
      authorName: item.author?.nick_name ?? item.author?.name,
      developerName: item.developer?.nick_name ?? item.developer?.name,
      tags: item.tags,
      customFields: item.custom_fields,
      rawWorkItem: item
    })),
    toPageInfo(page, pageSize, total),
    { work_items: items }
  );
}

type ReqListBoardWorkItemsClient = {
  listBoardWorkItems: (input: {
    project_id: string;
    page: number;
    page_size: number;
    created_time_interval?: string;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      description?: string;
      sequence?: string;
      priority?: string;
      important?: string;
      severity?: string;
      actual_work_hours?: number;
      expected_work_hours?: number;
      begin_time?: string;
      created_time?: string;
      end_time?: string;
      updated_time?: string;
      assigned_user?: {
        id?: string;
        name?: string;
        nick_name?: string;
      };
      author?: {
        id?: string;
        name?: string;
        nick_name?: string;
      };
      developer?: {
        id?: string;
        name?: string;
        nick_name?: string;
      };
      tags?: Array<{
        id?: string;
        name?: string;
      }>;
      status?: {
        id?: string;
        name?: string;
      };
      custom_fields?: unknown[];
    }>;
    total?: number;
  }>;
};

export function createReqListBoardWorkItemsHandler(client: ReqListBoardWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListBoardWorkItemsInput.parse(input);
    const response = await client.listBoardWorkItems(parsed);
    const result = mapReqBoardWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "priority", get: (item) => (item as { priority?: string }).priority }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "board work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
