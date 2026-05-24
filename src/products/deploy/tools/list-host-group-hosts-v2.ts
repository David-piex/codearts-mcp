import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHostGroupHostsV2Input } from "../schemas.js";

type Client = {
  listHostGroupHostsV2: (input: {
    group_id: string;
    page: number;
    page_size: number;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    group_id: string;
    hosts: Array<Record<string, unknown> & { host_id: string; host_name?: string; ip?: string }>;
    total?: number;
    raw: unknown;
  }>;
};

export function createDeployListHostGroupHostsV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployListHostGroupHostsV2Input.parse(input);
    const response = await client.listHostGroupHostsV2(parsed);
    const result = asListResult(
      `${response.hosts.length} deploy v2 host group hosts found`,
      response.hosts.map((item) => ({
        id: item.host_id,
        groupId: response.group_id,
        name: item.host_name,
        ip: item.ip,
        host: item
      })),
      toPageInfo(parsed.page, parsed.page_size, response.total)
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: { ...result, groupId: response.group_id, raw: response.raw }
    };
  };
}
