import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemTrackerHandlersInput } from "../schemas.js";

export function mapReqWorkItemTrackerHandlers(
  items: Array<{
    handler_id?: number;
    handler_name?: string;
  }>
) {
  return asListResult(
    `${items.length} work item tracker handlers found`,
    items.map((item) => ({
      handlerId: item.handler_id,
      handlerName: item.handler_name
    }))
  );
}

type ReqListWorkItemTrackerHandlersClient = {
  listWorkItemTrackerHandlers: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    tracker_handlers: Array<{
      handler_id?: number;
      handler_name?: string;
    }>;
  }>;
};

export function createReqListWorkItemTrackerHandlersHandler(
  client: ReqListWorkItemTrackerHandlersClient
) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemTrackerHandlersInput.parse(input);
    const response = await client.listWorkItemTrackerHandlers(parsed);
    const result = mapReqWorkItemTrackerHandlers(response.tracker_handlers);
    const text = formatListToolText(result, {
      fields: [
        { label: "handlerId", get: (item) => (item as { handlerId?: number }).handlerId },
        { label: "handlerName", get: (item) => (item as { handlerName?: string }).handlerName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
