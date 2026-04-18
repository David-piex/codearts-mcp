import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4ClusterCountInput } from "../schemas.js";

type DeployGetV4ClusterCountClient = {
  getV4ClusterCount: (input: {
    project_id: string;
    cluster_type: "host" | "container";
  }) => Promise<{
    project_id: string;
    cluster_type: "host" | "container";
    counts: Record<string, number>;
    raw: unknown;
  }>;
};

export function createDeployGetV4ClusterCountHandler(client: DeployGetV4ClusterCountClient) {
  return async (input: unknown) => {
    const parsed = deployGetV4ClusterCountInput.parse(input);
    const response = await client.getV4ClusterCount(parsed);
    const counts = Object.fromEntries(
      Object.entries(response.counts).map(([key, value]) => [key === "third_party" ? "thirdParty" : key, value])
    );
    const result = asItemResult(
      `Loaded v4 cluster counts for ${response.cluster_type}`,
      {
        projectId: response.project_id,
        clusterType: response.cluster_type,
        counts
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
