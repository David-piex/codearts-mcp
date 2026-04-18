import { asListResult } from "../../../contracts/tool-result.js";
import { deployListV4OrchestrationsInput } from "../schemas.js";

type DeployListV4OrchestrationsClient = {
  listV4Orchestrations: (input: {
    project_id: string;
    app_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    app_id: string;
    total?: number;
    orchestrations: Array<{
      id?: string;
      name?: string;
      state?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListV4OrchestrationsHandler(client: DeployListV4OrchestrationsClient) {
  return async (input: unknown) => {
    const parsed = deployListV4OrchestrationsInput.parse(input);
    const response = await client.listV4Orchestrations(parsed);
    const result = asListResult(
      `Loaded ${response.orchestrations.length} v4 orchestrations`,
      response.orchestrations.map((item) => ({
        id: item.id,
        projectId: response.project_id,
        appId: response.app_id,
        name: item.name,
        state: item.state,
        description: item.description
      })),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
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
