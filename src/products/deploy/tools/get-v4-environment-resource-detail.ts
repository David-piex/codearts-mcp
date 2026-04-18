import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4EnvironmentResourceDetailInput } from "../schemas.js";

type DeployGetV4EnvironmentResourceDetailClient = {
  getV4EnvironmentResourceDetail: (input: {
    project_id: string;
    environment_id: string;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    raw: unknown;
  }>;
};

export function createDeployGetV4EnvironmentResourceDetailHandler(
  client: DeployGetV4EnvironmentResourceDetailClient
) {
  return async (input: unknown) => {
    const parsed = deployGetV4EnvironmentResourceDetailInput.parse(input);
    const response = await client.getV4EnvironmentResourceDetail(parsed);
    const raw =
      response.raw && typeof response.raw === "object" && !Array.isArray(response.raw)
        ? (response.raw as { host_num?: number; cluster_num?: number })
        : undefined;
    const result = asItemResult(
      `Loaded v4 environment resource detail for ${response.environment_id}`,
      {
        id: response.environment_id,
        projectId: response.project_id,
        environmentId: response.environment_id,
        hostCount: raw?.host_num,
        clusterCount: raw?.cluster_num
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
