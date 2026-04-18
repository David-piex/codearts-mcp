import { asListResult } from "../../../contracts/tool-result.js";
import { deployListVariablesInput } from "../schemas.js";

type DeployListVariablesClient = {
  listVariables: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    variables: Array<{
      id?: string;
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListVariablesHandler(client: DeployListVariablesClient) {
  return async (input: unknown) => {
    const parsed = deployListVariablesInput.parse(input);
    const response = await client.listVariables(parsed);
    const result = asListResult(
      `Loaded ${response.variables.length} deploy variables for ${response.level} scope`,
      response.variables.map((item) => ({
        id: item.id,
        projectId: response.project_id,
        level: response.level,
        appId: response.app_id,
        envId: response.env_id,
        name: item.name,
        type: item.type,
        value: item.value,
        staticStatus: item.static_status,
        isDynamic: item.is_dynamic
      })),
      {
        page: 1,
        pageSize: response.variables.length,
        total: response.variables.length
      },
      {
        projectId: response.project_id,
        level: response.level,
        appId: response.app_id,
        envId: response.env_id,
        total: response.variables.length,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
