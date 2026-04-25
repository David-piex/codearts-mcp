import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4ClustersInput } from "../schemas.js";

type DeployListV4ClustersClient = {
  listV4Clusters: (input: {
    project_id: string;
    cluster_type: "host" | "container";
    limit?: number;
    offset?: number;
    keyword?: string;
    name?: string;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    cluster_type: "host" | "container";
    total?: number;
    clusters: Array<{
      cluster_id: string;
      name?: string;
      cluster_type?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4ClustersHandler(client: DeployListV4ClustersClient) {
  return async (input: unknown) => {
    const parsed = deployListV4ClustersInput.parse(input);
    const response = await client.listV4Clusters(parsed);
    const result = asListResult(
      `Loaded ${response.clusters.length} v4 clusters`,
      response.clusters.map((item) => ({
        id: item.cluster_id,
        projectId: response.project_id,
        name: item.name,
        clusterType: item.cluster_type ?? response.cluster_type,
        description: item.description
      })),
      {
        page: 1,
        pageSize: response.clusters.length,
        total: response.total
      },
      {
        projectId: response.project_id,
        clusterType: response.cluster_type,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
