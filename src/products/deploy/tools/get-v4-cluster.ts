import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4ClusterInput } from "../schemas.js";

type DeployGetV4ClusterClient = {
  getV4Cluster: (input: {
    project_id: string;
    cluster_id: string;
    cluster_type: "host" | "container";
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    cluster_type: "host" | "container";
    cluster: {
      cluster_id: string;
      name?: string;
      cluster_type?: string;
      description?: string;
    };
    raw: unknown;
  }>;
};

export function createDeployGetV4ClusterHandler(client: DeployGetV4ClusterClient) {
  return async (input: unknown) => {
    const parsed = deployGetV4ClusterInput.parse(input);
    const response = await client.getV4Cluster(parsed);
    const result = asItemResult(
      `Loaded v4 cluster ${response.cluster_id}`,
      {
        id: response.cluster.cluster_id,
        projectId: response.project_id,
        clusterType: response.cluster.cluster_type ?? response.cluster_type,
        name: response.cluster.name,
        description: response.cluster.description
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
