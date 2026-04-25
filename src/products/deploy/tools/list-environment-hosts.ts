import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { deployListEnvironmentHostsInput } from "../schemas.js";

export function mapDeployEnvironmentHosts(
  applicationId: string,
  environmentId: string,
  items: Array<{
    host_id: string;
    host_name?: string;
    ip?: string;
    os?: string;
    port?: number;
    connection_status?: string;
    connection_result?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} deploy hosts found in environment`,
    items.map((item) => ({
      id: item.host_id,
      applicationId,
      environmentId,
      name: item.host_name,
      ip: item.ip,
      os: item.os,
      port: item.port,
      connectionStatus: item.connection_status,
      connectionResult: item.connection_result
    })),
    toPageInfo(page, pageSize, total)
  );
}

type DeployListEnvironmentHostsClient = {
  listEnvironmentHosts: (input: {
    application_id: string;
    environment_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    key_field?: string;
    as_proxy?: boolean;
  }) => Promise<{
    hosts: Array<{
      host_id: string;
      host_name?: string;
      ip?: string;
      os?: string;
      port?: number;
      connection_status?: string;
      connection_result?: string;
    }>;
    total?: number;
  }>;
};

export function createDeployListEnvironmentHostsHandler(client: DeployListEnvironmentHostsClient) {
  return async (input: unknown) => {
    const parsed = deployListEnvironmentHostsInput.parse(input);
    const response = await client.listEnvironmentHosts(parsed);
    const result = mapDeployEnvironmentHosts(
      parsed.application_id,
      parsed.environment_id,
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
