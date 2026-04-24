import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListIrHistoriesInput } from "../schemas.js";
import { mapRequirementHistory, type ReqRequirementHistory } from "./program-mappers.js";

type ReqListIrHistoriesClient = {
  listIrHistories: (input: { ir_id: string; page: number; page_size: number }) => Promise<{
    histories: ReqRequirementHistory[];
    total?: number;
  }>;
};

export function createReqListIrHistoriesHandler(client: ReqListIrHistoriesClient) {
  return async (input: unknown) => {
    const parsed = reqListIrHistoriesInput.parse(input);
    const response = await client.listIrHistories(parsed);
    const result = asListResult(
      `${response.histories.length} IR history records found`,
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
