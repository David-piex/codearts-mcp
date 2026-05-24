import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHostGroupsV2Input } from "../schemas.js";

type Client = {
  listHostGroupsV2: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    keyword?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    host_groups: Array<Record<string, unknown> & { group_id: string; name?: string; project_id?: string }>;
    total?: number;
    raw: unknown;
  }>;
};

export function createDeployListHostGroupsV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployListHostGroupsV2Input.parse(input);
    const response = await client.listHostGroupsV2(parsed);
    const result = asListResult(
      `${response.host_groups.length} deploy v2 host groups found`,
      response.host_groups.map((item) => ({
        id: item.group_id,
        name: item.name,
        projectId: item.project_id,
        hostGroup: item
      })),
      toPageInfo(parsed.page, parsed.page_size, response.total)
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: { ...result, raw: response.raw }
    };
  };
}
