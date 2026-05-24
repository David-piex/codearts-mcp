import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetHostGroupHostV2Input } from "../schemas.js";

type Client = {
  getHostGroupHostV2: (input: { group_id: string; host_id: string }) => Promise<{
    group_id: string;
    host_id: string;
    host_name?: string;
    ip?: string;
    raw: unknown;
  }>;
};

export function createDeployGetHostGroupHostV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetHostGroupHostV2Input.parse(input);
    const item = await client.getHostGroupHostV2(parsed);
    const result = asItemResult(`Deploy v2 host group host ${item.host_id} loaded`, {
      id: item.host_id,
      groupId: item.group_id,
      name: item.host_name,
      ip: item.ip,
      raw: item.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
