import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetHostGroupInput } from "../schemas.js";

type DeployGetHostGroupClient = {
  getHostGroup: (input: { group_id: string }) => Promise<{
    group_id: string;
    name: string;
    os?: string;
    description?: string;
    nick_name?: string;
    is_proxy_mode?: number;
    created_time?: string;
    updated_time?: string;
  }>;
};

export function createDeployGetHostGroupHandler(client: DeployGetHostGroupClient) {
  return async (input: unknown) => {
    const parsed = deployGetHostGroupInput.parse(input);
    const item = await client.getHostGroup(parsed);
    const result = asItemResult(`Deploy host group ${item.name} loaded`, {
      id: item.group_id,
      name: item.name,
      os: item.os,
      description: item.description,
      ownerNickname: item.nick_name,
      proxyMode: item.is_proxy_mode === 1,
      createdTime: item.created_time,
      updatedTime: item.updated_time
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
