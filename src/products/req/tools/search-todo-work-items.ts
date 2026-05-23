import { reqSearchTodoWorkItemsInput } from "../schemas.js";
import {
  mapReqWorkItems,
  type ReqListWorkItem
} from "./list-work-items.js";
import { formatSearchWorkItemsText } from "./work-item-search-text.js";

type ReqSearchWorkItemsInput = {
  page: number;
  page_size: number;
  subject?: string;
  created_on?: string;
  updated_on?: string;
  closed_on?: string;
  start_date?: string;
  due_date?: string;
  tracker_id?: string;
  status_id?: string;
  author_id?: string;
  developer_id?: string;
  priority_id?: string;
};

type ReqSearchTodoWorkItemsClient = {
  searchTodoWorkItems: (input: ReqSearchWorkItemsInput) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqSearchTodoWorkItemsHandler(client: ReqSearchTodoWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqSearchTodoWorkItemsInput.parse(input);
    const response = await client.searchTodoWorkItems(parsed);
    const result = mapReqWorkItems(
      response.work_items as ReqListWorkItem[],
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: formatSearchWorkItemsText(result) }],
      structuredContent: result
    };
  };
}
