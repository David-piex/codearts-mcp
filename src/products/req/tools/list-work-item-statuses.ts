import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemStatusesInput } from "../schemas.js";

export function mapReqWorkItemStatuses(
  items: Array<{
    id?: string;
    status_id?: number;
    name?: string;
    tracker_ids?: number[];
    status_attribute?: {
      id?: number;
      name?: string;
    };
  }>
) {
  return asListResult(
    `${items.length} work item statuses found`,
    items.map((item) => ({
      id: item.id,
      statusId: item.status_id,
      name: item.name,
      trackerIds: item.tracker_ids,
      statusCategoryId: item.status_attribute?.id,
      statusCategory: item.status_attribute?.name
    }))
  );
}

type ReqListWorkItemStatusesClient = {
  listWorkItemStatuses: (input: { project_id: string }) => Promise<{
    issue_statuses: Array<{
      id?: string;
      status_id?: number;
      name?: string;
      tracker_ids?: number[];
      status_attribute?: {
        id?: number;
        name?: string;
      };
    }>;
    total?: number;
  }>;
};

export function createReqListWorkItemStatusesHandler(client: ReqListWorkItemStatusesClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemStatusesInput.parse(input);
    const response = await client.listWorkItemStatuses(parsed);
    const result = mapReqWorkItemStatuses(response.issue_statuses);
    const text = formatListToolText(result, {
      fields: [
        { label: "statusId", get: (item) => (item as { statusId?: number }).statusId },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "statusCategory", get: (item) => (item as { statusCategory?: string }).statusCategory }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
