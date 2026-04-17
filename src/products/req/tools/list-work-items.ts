import { asListResult } from "../../../contracts/tool-result.js";
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
  return asListResult(
    `${items.length} work items found`,
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

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
