import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListJobCacheBoardsInput } from "../schemas.js";

function toBoolean(value?: string | boolean) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return undefined;
}

export function mapReqJobCacheBoards(
  items: Array<{
    id?: string;
    header?: string;
    type?: string;
    show?: string | boolean;
  }>,
  cacheId?: number
) {
  return asListResult(
    `${items.length} board cache fields found`,
    items.map((item) => ({
      id: item.id,
      header: item.header,
      type: item.type,
      visible: toBoolean(item.show)
    })),
    undefined,
    cacheId ? { cacheId } : undefined
  );
}

type ReqListJobCacheBoardsClient = {
  listJobCacheBoards: (input: {
    project_id: string;
    type?: string;
    region?: string;
  }) => Promise<{
    cache_id?: number;
    fields: Array<{
      id?: string;
      header?: string;
      type?: string;
      show?: string | boolean;
    }>;
  }>;
};

export function createReqListJobCacheBoardsHandler(client: ReqListJobCacheBoardsClient) {
  return async (input: unknown) => {
    const parsed = reqListJobCacheBoardsInput.parse(input);
    const response = await client.listJobCacheBoards(parsed);
    const result = mapReqJobCacheBoards(response.fields, response.cache_id);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "header", get: (item) => (item as { header?: string }).header },
        { label: "type", get: (item) => (item as { type?: string }).type },
        { label: "visible", get: (item) => (item as { visible?: boolean }).visible }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
