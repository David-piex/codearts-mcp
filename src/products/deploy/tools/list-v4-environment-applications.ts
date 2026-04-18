import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4EnvironmentApplicationsInput } from "../schemas.js";

type DeployListV4EnvironmentApplicationsClient = {
  listV4EnvironmentApplications: (input: {
    project_id: string;
    environment_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    total?: number;
    applications: Array<{
      app_id: string;
      name?: string;
      project_id?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4EnvironmentApplicationsHandler(
  client: DeployListV4EnvironmentApplicationsClient
) {
  return async (input: unknown) => {
    const parsed = deployListV4EnvironmentApplicationsInput.parse(input);
    const response = await client.listV4EnvironmentApplications(parsed);
    const result = asListResult(
      `Loaded ${response.applications.length} v4 environment applications`,
      response.applications.map((item) => ({
        id: item.app_id,
        environmentId: response.environment_id,
        name: item.name,
        projectId: item.project_id ?? response.project_id,
        description: item.description
      })),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
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
