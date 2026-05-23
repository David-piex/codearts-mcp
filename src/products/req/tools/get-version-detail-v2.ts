import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetVersionDetailV2Input } from "../schemas.js";
import type { ReqVersionDetailV2 } from "../client.js";
import { mapReqVersionDetailV2 } from "./version-mappers.js";

export function mapReqVersionDetailResult(item: ReqVersionDetailV2) {
  return asItemResult(`Loaded version ${item.id}`, mapReqVersionDetailV2(item));
}

type ReqGetVersionDetailV2Client = {
  getVersionDetailV2: (input: { version_id: string }) => Promise<ReqVersionDetailV2>;
};

export function createReqGetVersionDetailV2Handler(client: ReqGetVersionDetailV2Client) {
  return async (input: unknown) => {
    const parsed = reqGetVersionDetailV2Input.parse(input);
    const response = await client.getVersionDetailV2(parsed);
    const result = mapReqVersionDetailResult(response);
    const mapped = mapReqVersionDetailV2(response);
    const text = [
      result.summary,
      `id: ${mapped.id}`,
      mapped.name ? `name: ${mapped.name}` : undefined,
      mapped.status ? `status: ${mapped.status}` : undefined,
      mapped.startDateText ? `startDate: ${mapped.startDateText}` : undefined,
      mapped.dueDateText ? `dueDate: ${mapped.dueDateText}` : undefined,
      typeof mapped.total !== "undefined" ? `total: ${mapped.total}` : undefined
    ]
      .filter(Boolean)
      .join("\n");

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
