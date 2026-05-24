import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetHostGroupHostInput } from "../schemas.js";

type Client = {
  getHostGroupHost: (input: { group_id: string; host_id: string }) => Promise<{
    group_id: string;
    host_id: string;
    host_name?: string;
    ip?: string;
    raw: unknown;
  }>;
};

export function createDeployGetHostGroupHostHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetHostGroupHostInput.parse(input);
    const item = await client.getHostGroupHost(parsed);
    const result = asItemResult(`Deploy host group host ${item.host_id} loaded`, {
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
