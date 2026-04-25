import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4ClusterHostsInput } from "../schemas.js";

type DeployListV4ClusterHostsClient = {
  listV4ClusterHosts: (input: {
    project_id: string;
    cluster_id: string;
    limit?: number;
    offset?: number;
    keyword?: string;
    name?: string;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    ip?: string;
    os?: string;
    connection_status?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    total?: number;
    hosts: Array<{
      host_id: string;
      name?: string;
      ip?: string;
      os?: string;
      connection_status?: string;
      status?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4ClusterHostsHandler(client: DeployListV4ClusterHostsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4ClusterHostsInput.parse(input);
    const response = await client.listV4ClusterHosts(parsed);
    const result = asListResult(
      `Loaded ${response.hosts.length} hosts in v4 cluster ${response.cluster_id}`,
      response.hosts.map((item) => ({
        id: item.host_id,
        projectId: response.project_id,
        clusterId: response.cluster_id,
        name: item.name,
        ip: item.ip,
        os: item.os,
        connectionStatus: item.connection_status,
        status: item.status
      })),
      {
        page: 1,
        pageSize: response.hosts.length,
        total: response.total
      },
      {
        projectId: response.project_id,
        clusterId: response.cluster_id,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
