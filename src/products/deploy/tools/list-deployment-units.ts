import { asListResult } from "../../../contracts/tool-result.js";
import { deployListDeploymentUnitsInput } from "../schemas.js";

type DeployListDeploymentUnitsClient = {
  listDeploymentUnits: (input: { project_id: string; app_id: string }) => Promise<{
    project_id: string;
    app_id: string;
    deployment_units: Array<{
      id?: string;
      environment_id?: string;
      environment_name?: string;
      cluster_id?: string;
      cluster_name?: string;
      namespace?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListDeploymentUnitsHandler(client: DeployListDeploymentUnitsClient) {
  return async (input: unknown) => {
    const parsed = deployListDeploymentUnitsInput.parse(input);
    const response = await client.listDeploymentUnits(parsed);
    const result = asListResult(
      `Loaded ${response.deployment_units.length} deployment units for app ${response.app_id}`,
      response.deployment_units.map((item) => ({
        id: item.id,
        projectId: response.project_id,
        appId: response.app_id,
        environmentId: item.environment_id,
        environmentName: item.environment_name,
        clusterId: item.cluster_id,
        clusterName: item.cluster_name,
        namespace: item.namespace
      })),
      {
        page: 1,
        pageSize: response.deployment_units.length,
        total: response.deployment_units.length
      },
      {
        projectId: response.project_id,
        appId: response.app_id,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
