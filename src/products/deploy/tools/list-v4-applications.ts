import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4ApplicationsInput } from "../schemas.js";

type DeployListV4ApplicationsClient = {
  listV4Applications: (input: {
    project_id: string;
    limit: number;
    offset: number;
    keyword?: string;
  }) => Promise<{
    project_id: string;
    total?: number;
    applications: Array<{
      app_id: string;
      name: string;
      project_id?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4ApplicationsHandler(client: DeployListV4ApplicationsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4ApplicationsInput.parse(input);
    const response = await client.listV4Applications(parsed);
    const result = asListResult(
      `${response.applications.length} deploy v4 applications found`,
      response.applications.map((item) => ({
        id: item.app_id,
        name: item.name,
        projectId: item.project_id ?? response.project_id,
        description: item.description
      })),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        total: response.total,
        raw: response.raw
      }
    };
  };
}
