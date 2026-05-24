import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetHostGroupV2Input } from "../schemas.js";

type Client = {
  getHostGroupV2: (input: { group_id: string }) => Promise<{
    group_id: string;
    name?: string;
    raw: unknown;
  }>;
};

export function createDeployGetHostGroupV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetHostGroupV2Input.parse(input);
    const item = await client.getHostGroupV2(parsed);
    const result = asItemResult(`Deploy v2 host group ${item.group_id} loaded`, {
      id: item.group_id,
      name: item.name,
      raw: item.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
