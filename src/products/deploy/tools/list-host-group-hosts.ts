import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListHostGroupHostsInput } from "../schemas.js";

export function mapDeployHostGroupHosts(
  groupId: string,
  items: Array<{
    host_id: string;
    host_name?: string;
    ip?: string;
    os?: string;
    port?: number;
    as_proxy?: boolean;
    connection_status?: string;
    connection_result?: string;
    env_count?: number;
    lastest_connection_time?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy hosts found in host group`,
    items.map((item) => ({
      id: item.host_id,
      groupId,
      name: item.host_name,
      ip: item.ip,
      os: item.os,
      port: item.port,
      asProxy: item.as_proxy,
      connectionStatus: item.connection_status,
      connectionResult: item.connection_result,
      environmentCount: item.env_count,
      latestConnectionTime: item.lastest_connection_time
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListHostGroupHostsClient = {
  listHostGroupHosts: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    hosts: Array<{
      host_id: string;
      host_name?: string;
      ip?: string;
      os?: string;
      port?: number;
      as_proxy?: boolean;
      connection_status?: string;
      connection_result?: string;
      env_count?: number;
      lastest_connection_time?: string;
    }>;
    total?: number;
  }>;
};

export function createDeployListHostGroupHostsHandler(client: DeployListHostGroupHostsClient) {
  return async (input: unknown) => {
    const parsed = deployListHostGroupHostsInput.parse(input);
    const response = await client.listHostGroupHosts(parsed);
    const result = mapDeployHostGroupHosts(
      parsed.group_id,
      response.hosts,
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
