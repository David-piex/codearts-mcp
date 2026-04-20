import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemsInput } from "../schemas.js";

export function mapReqWorkItems(
  items: Array<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined ? `${items.length} work items found in this page (total: ${total})` : `${items.length} work items found`;
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      status: item.status?.name,
      type: item.tracker_name
    })),
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
    }>;
    total?: number;
  }>;
};

export function createReqListWorkItemsHandler(client: ReqListWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemsInput.parse(input);
    const response = await client.listWorkItems(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "title", get: (item) => (item as { title?: string }).title },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "type", get: (item) => (item as { type?: string }).type }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
