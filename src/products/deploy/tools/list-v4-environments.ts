import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4EnvironmentsInput } from "../schemas.js";

type DeployListV4EnvironmentsClient = {
  listV4Environments: (input: {
    project_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    total?: number;
    environments: Array<{
      environment_id: string;
      name?: string;
      project_id?: string;
      os?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4EnvironmentsHandler(client: DeployListV4EnvironmentsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4EnvironmentsInput.parse(input);
    const response = await client.listV4Environments(parsed);
    const result = asListResult(
      `Loaded ${response.environments.length} v4 environments`,
      response.environments.map((item) => ({
        id: item.environment_id,
        name: item.name,
        projectId: item.project_id ?? response.project_id,
        os: item.os,
        description: item.description
      })),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
      },
      {
        projectId: response.project_id,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
