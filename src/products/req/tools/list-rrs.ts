import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListRrsInput } from "../schemas.js";
import { mapRequirementPoolItem, type ReqRequirementPoolItem } from "./program-mappers.js";

type ReqListRrsClient = {
  listRrs: (input: {
    program_id: string;
    query_type: string;
    include_deleted?: boolean;
    updated_time_interval?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    rrs: ReqRequirementPoolItem[];
    total?: number;
  }>;
};

export function createReqListRrsHandler(client: ReqListRrsClient) {
  return async (input: unknown) => {
    const parsed = reqListRrsInput.parse(input);
    const response = await client.listRrs(parsed);
    const result = asListResult(
      `${response.rrs.length} RRs found`,
      response.rrs.map(mapRequirementPoolItem),
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
