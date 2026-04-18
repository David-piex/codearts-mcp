import { asListResult } from "../../../contracts/tool-result.js";
import { deployGetRuntimeVariablesInput } from "../schemas.js";

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

export function mapDeployRuntimeVariables(items: DeployVariableItem[]) {
  return asListResult(
    `${items.length} deploy runtime variables found`,
    items.map((item) => mapVariable(item))
  );
}

export function mapDeployRuntimeVariablesWithScope(
  projectId: string,
  appId: string | undefined,
  items: DeployVariableItem[]
) {
  return asListResult(
    `${items.length} deploy runtime variables found`,
    items.map((item) => ({
      projectId,
      appId,
      ...mapVariable(item)
    }))
  );
}

type DeployGetRuntimeVariablesClient = {
  getRuntimeVariables: (input: { project_id: string; app_id?: string }) => Promise<{
    project_id: string;
    app_id?: string;
    variables: DeployVariableItem[];
    raw: unknown;
  }>;
};

export function createDeployGetRuntimeVariablesHandler(client: DeployGetRuntimeVariablesClient) {
  return async (input: unknown) => {
    const parsed = deployGetRuntimeVariablesInput.parse(input);
    const response = await client.getRuntimeVariables(parsed);
    const result = mapDeployRuntimeVariablesWithScope(
      response.project_id,
      response.app_id,
      response.variables
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        scope: {
          projectId: response.project_id,
          appId: response.app_id
        },
        raw: response.raw
      }
    };
  };
}
