import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHostGroupsInput } from "../schemas.js";

export function mapDeployHostGroups(
  projectId: string,
  items: Array<{
    group_id: string;
    name: string;
    project_id?: string;
    os?: string;
    host_count?: number;
    env_count?: number;
    description?: string;
    nick_name?: string;
    is_proxy_mode?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy host groups found`,
    items.map((item) => ({
      id: item.group_id,
      name: item.name,
      projectId: item.project_id ?? projectId,
      os: item.os,
      hostCount: item.host_count,
      environmentCount: item.env_count,
      description: item.description,
      ownerNickname: item.nick_name,
      proxyMode: item.is_proxy_mode === 1
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListHostGroupsClient = {
  listHostGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    host_groups: Array<{
      group_id: string;
      name: string;
      project_id?: string;
      os?: string;
      host_count?: number;
      env_count?: number;
      description?: string;
      nick_name?: string;
      is_proxy_mode?: number;
    }>;
    total?: number;
  }>;
};

export function createDeployListHostGroupsHandler(client: DeployListHostGroupsClient) {
  return async (input: unknown) => {
    const parsed = deployListHostGroupsInput.parse(input);
    const response = await client.listHostGroups(parsed);
    const result = mapDeployHostGroups(
      parsed.project_id,
      response.host_groups,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
