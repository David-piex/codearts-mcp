import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListRrStatusesInput } from "../schemas.js";

type ReqRrStatusItem = {
  rr_id?: string;
  status?: {
    id?: string;
    label?: string;
    name?: string;
  };
};

type ReqListRrStatusesClient = {
  listRrStatuses: (input: { program_id: string; rr_ids: string[] }) => Promise<{
    rr_status_list: ReqRrStatusItem[];
  }>;
};

export function createReqListRrStatusesHandler(client: ReqListRrStatusesClient) {
  return async (input: unknown) => {
    const parsed = reqListRrStatusesInput.parse(input);
    const response = await client.listRrStatuses(parsed);
    const result = asListResult(
      `${response.rr_status_list.length} RR statuses found`,
      response.rr_status_list.map((item) => ({
        id: item.rr_id,
        statusId: item.status?.id,
        statusLabel: item.status?.label,
        statusName: item.status?.name
      })),
      undefined,
      response
    );

    return {
      content: [
        {
          type: "text" as const,
          text: formatListToolText(result, {
            fields: [
              { label: "id", get: (item) => (item as { id?: string }).id },
              { label: "status", get: (item) => (item as { statusLabel?: string }).statusLabel }
            ]
          })
        }
      ],
      structuredContent: result
    };
  };
}
