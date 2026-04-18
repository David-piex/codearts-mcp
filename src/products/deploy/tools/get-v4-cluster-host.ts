import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4ClusterHostInput } from "../schemas.js";

type DeployGetV4ClusterHostClient = {
  getV4ClusterHost: (input: {
    project_id: string;
    cluster_id: string;
    host_id: string;
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    host_id: string;
    host: {
      host_id: string;
      name?: string;
      ip?: string;
      os?: string;
      connection_status?: string;
      status?: string;
    };
    raw: unknown;
  }>;
};

export function createDeployGetV4ClusterHostHandler(client: DeployGetV4ClusterHostClient) {
  return async (input: unknown) => {
    const parsed = deployGetV4ClusterHostInput.parse(input);
    const response = await client.getV4ClusterHost(parsed);
    const result = asItemResult(
      `Loaded v4 cluster host ${response.host.host_id}`,
      {
        id: response.host.host_id,
        projectId: response.project_id,
        clusterId: response.cluster_id,
        name: response.host.name,
        ip: response.host.ip,
        os: response.host.os,
        connectionStatus: response.host.connection_status,
        status: response.host.status
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
