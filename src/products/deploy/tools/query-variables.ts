import { asListResult } from "../../../contracts/tool-result.js";
import { deployQueryVariablesInput } from "../schemas.js";

type DeployVariableItem = {
  name?: string;
  type?: string;
  value?: string;
  static_status?: number;
  is_dynamic?: boolean;
};

function mapVariable(item: DeployVariableItem) {
  return {
    id: item.name ?? "",
    name: item.name,
    type: item.type,
    value: item.value,
    staticStatus: item.static_status === undefined ? undefined : item.static_status === 1,
    dynamic: item.is_dynamic
  };
}

export function mapDeployQueriedVariables(items: DeployVariableItem[]) {
  return asListResult(
    `${items.length} deploy variables found`,
    items.map((item) => mapVariable(item))
  );
}

export function mapDeployQueriedVariablesWithScope(
  projectId: string,
  level: "app" | "env" | "app_env",
  appId: string | undefined,
  envId: string | undefined,
  items: DeployVariableItem[]
) {
  return asListResult(
    `${items.length} deploy variables found`,
    items.map((item) => ({
      projectId,
      level,
      appId,
      envId,
      ...mapVariable(item)
    }))
  );
}

type DeployQueryVariablesClient = {
  queryVariables: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    variables: DeployVariableItem[];
    raw: unknown;
  }>;
};

export function createDeployQueryVariablesHandler(client: DeployQueryVariablesClient) {
  return async (input: unknown) => {
    const parsed = deployQueryVariablesInput.parse(input);
    const response = await client.queryVariables(parsed);
    const result = mapDeployQueriedVariablesWithScope(
      response.project_id,
      response.level,
      response.app_id,
      response.env_id,
      response.variables
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        scope: {
          projectId: response.project_id,
          level: response.level,
          appId: response.app_id,
          envId: response.env_id
        },
        raw: response.raw
      }
    };
  };
}
