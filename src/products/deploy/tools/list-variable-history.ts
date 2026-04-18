import { asListResult } from "../../../contracts/tool-result.js";
import { deployListVariableHistoryInput } from "../schemas.js";

type DeployListVariableHistoryClient = {
  listVariableHistory: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    histories: Array<{
      id?: string;
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
      created_at?: string;
      updated_at?: string;
    }>;
    raw: unknown;
  }>;
};

export function createDeployListVariableHistoryHandler(client: DeployListVariableHistoryClient) {
  return async (input: unknown) => {
    const parsed = deployListVariableHistoryInput.parse(input);
    const response = await client.listVariableHistory(parsed);
    const result = asListResult(
      `Loaded ${response.histories.length} deploy variable history records for ${response.level} scope`,
      response.histories.map((item) => ({
        id: item.id,
        projectId: response.project_id,
        level: response.level,
        appId: response.app_id,
        envId: response.env_id,
        name: item.name,
        type: item.type,
        value: item.value,
        staticStatus: item.static_status,
        isDynamic: item.is_dynamic,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      })),
      {
        page: 1,
        pageSize: response.histories.length,
        total: response.histories.length
      },
      {
        projectId: response.project_id,
        level: response.level,
        appId: response.app_id,
        envId: response.env_id,
        total: response.histories.length,
        raw: response.raw
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
