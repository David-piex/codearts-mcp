import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4EnvironmentHostsInput } from "../schemas.js";

type DeployListV4EnvironmentHostsClient = {
  listV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    environment_id: string;
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

export function createDeployListV4EnvironmentHostsHandler(client: DeployListV4EnvironmentHostsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4EnvironmentHostsInput.parse(input);
    const response = await client.listV4EnvironmentHosts(parsed);
    const result = asListResult(
      `Loaded ${response.hosts.length} hosts in v4 environment ${response.environment_id}`,
      response.hosts.map((item) => ({
        id: item.host_id,
        projectId: response.project_id,
        environmentId: response.environment_id,
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
        environmentId: response.environment_id,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
