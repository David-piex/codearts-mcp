import { asItemResult } from "../../../contracts/tool-result.js";
import { reqWatchWorkItemInput } from "../schemas.js";

function redactToken(token: string) {
  return token.length <= 8 ? "***" : `${token.slice(0, 4)}...${token.slice(-4)}`;
}

export function previewWatchWorkItem(input: {
  work_item_id: string;
  type: string;
  x_auth_token: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: watch CodeArts Req work item", {
    workItemId: input.work_item_id,
    type: input.type,
    xAuthToken: redactToken(input.x_auth_token),
    endpoint: "/v2/issues/watch",
    executed: false
  });
}

export function mapWatchedWorkItem(input: {
  work_item_id: string;
  type: string;
  status?: string;
  watcher?: {
    id?: number | string;
    watchable_type?: string;
    watchable_id?: number | string;
    user_id?: number | string;
    region?: string;
  };
  raw?: unknown;
}) {
  return asItemResult("Watched CodeArts Req work item", {
    workItemId: input.work_item_id,
    type: input.type,
    status: input.status,
    watcherId: typeof input.watcher?.id === "undefined" ? undefined : String(input.watcher.id),
    watchableType: input.watcher?.watchable_type,
    watchableId: typeof input.watcher?.watchable_id === "undefined" ? undefined : String(input.watcher.watchable_id),
    userId: typeof input.watcher?.user_id === "undefined" ? undefined : String(input.watcher.user_id),
    region: input.watcher?.region,
    executed: true
  }, input.raw);
}

type ReqWatchWorkItemClient = {
  watchWorkItem: (input: {
    work_item_id: string;
    type: string;
    x_auth_token: string;
  }) => Promise<{
    work_item_id: string;
    type: string;
    status?: string;
    watcher?: {
      id?: number | string;
      watchable_type?: string;
      watchable_id?: number | string;
      user_id?: number | string;
      region?: string;
    };
    raw?: unknown;
  }>;
};

export function createReqWatchWorkItemHandler(client: ReqWatchWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqWatchWorkItemInput.parse(input);

    if (parsed.dry_run) {
      const result = previewWatchWorkItem(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.watchWorkItem(parsed);
    const result = mapWatchedWorkItem(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
