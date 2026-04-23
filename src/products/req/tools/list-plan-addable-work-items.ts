import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListPlanAddableWorkItemsInput } from "../schemas.js";

export function mapReqPlanAddableWorkItems(
  items: Array<{
    id: number | string;
    subject?: string;
    tracker?: {
      id?: number | string;
      name?: string;
    };
    tracker_id?: number | string;
    tracker_name?: string;
    status?: {
      id?: number | string;
      name?: string;
    };
    status_id?: number | string;
    status_name?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary =
    total !== undefined
      ? `${items.length} addable plan work items found in this page (total: ${total})`
      : `${items.length} addable plan work items found`;
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      type: item.tracker?.name ?? item.tracker_name,
      typeId: item.tracker?.id ?? item.tracker_id,
      status: item.status?.name ?? item.status_name,
      statusId: item.status?.id ?? item.status_id
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListPlanAddableWorkItemsClient = {
  listPlanAddableWorkItems: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    subject?: string;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      tracker?: {
        id?: number | string;
        name?: string;
      };
      tracker_id?: number | string;
      tracker_name?: string;
      status?: {
        id?: number | string;
        name?: string;
      };
      status_id?: number | string;
      status_name?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListPlanAddableWorkItemsHandler(client: ReqListPlanAddableWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListPlanAddableWorkItemsInput.parse(input);
    const response = await client.listPlanAddableWorkItems(parsed);
    const result = mapReqPlanAddableWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.subject,
          projectId: parsed.project_id,
          resourceLabel: "addable plan work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
