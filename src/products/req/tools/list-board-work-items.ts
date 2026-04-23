import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListBoardWorkItemsInput } from "../schemas.js";

export function mapReqBoardWorkItems(
  items: Array<{
    id: number | string;
    subject?: string;
    sequence?: string;
    priority?: string;
    important?: string;
    severity?: string;
    status?: {
      id?: string;
      name?: string;
    };
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
      sequence: item.sequence,
      status: item.status?.name,
      statusId: item.status?.id,
      priority: item.priority,
      important: item.important,
      severity: item.severity
    })),
    toPageInfo(page, pageSize, total)
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
      sequence?: string;
      priority?: string;
      important?: string;
      severity?: string;
      status?: {
        id?: string;
        name?: string;
      };
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
