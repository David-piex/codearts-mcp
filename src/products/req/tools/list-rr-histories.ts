import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListRrHistoriesInput } from "../schemas.js";
import { mapRequirementHistory, type ReqRequirementHistory } from "./program-mappers.js";

type ReqListRrHistoriesClient = {
  listRrHistories: (input: { rr_id: string; page: number; page_size: number }) => Promise<{
    histories: ReqRequirementHistory[];
    total?: number;
  }>;
};

export function createReqListRrHistoriesHandler(client: ReqListRrHistoriesClient) {
  return async (input: unknown) => {
    const parsed = reqListRrHistoriesInput.parse(input);
    const response = await client.listRrHistories(parsed);
    const result = asListResult(
      `${response.histories.length} RR history records found`,
      response.histories.map(mapRequirementHistory),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "field", get: (item) => (item as { fieldLabel?: string }).fieldLabel },
              { label: "old", get: (item) => (item as { oldValue?: string }).oldValue },
              { label: "new", get: (item) => (item as { newValue?: string }).newValue }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
