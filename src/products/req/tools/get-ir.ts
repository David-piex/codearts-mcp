import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetIrInput } from "../schemas.js";
import { mapRequirementPoolItem, type ReqRequirementPoolItem } from "./program-mappers.js";

type ReqGetIrClient = {
  getIr: (input: { program_id: string; ir_id: string }) => Promise<ReqRequirementPoolItem>;
};

export function createReqGetIrHandler(client: ReqGetIrClient) {
  return async (input: unknown) => {
    const parsed = reqGetIrInput.parse(input);
    const response = await client.getIr(parsed);
    const item = mapRequirementPoolItem(response);
    const result = asItemResult(`Loaded IR ${item.id ?? parsed.ir_id}`, item, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
