import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListIrChildrenInput } from "../schemas.js";
import { mapRequirementPoolItem, type ReqRequirementPoolItem } from "./program-mappers.js";

type ReqListIrChildrenClient = {
  listIrChildren: (input: {
    program_id: string;
    ir_id: string;
    query_type: string;
    page: number;
    page_size: number;
  }) => Promise<{
    items: ReqRequirementPoolItem[];
    total?: number;
  }>;
};

export function createReqListIrChildrenHandler(client: ReqListIrChildrenClient) {
  return async (input: unknown) => {
    const parsed = reqListIrChildrenInput.parse(input);
    const response = await client.listIrChildren(parsed);
    const result = asListResult(
      `${response.items.length} IR child items found`,
      response.items.map(mapRequirementPoolItem),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => (item as { id?: string }).id },
              { label: "title", get: (item) => (item as { title?: string }).title },
              { label: "status", get: (item) => (item as { status?: string }).status }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
