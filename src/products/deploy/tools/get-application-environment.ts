import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetApplicationEnvironmentInput } from "../schemas.js";

type DeployGetApplicationEnvironmentClient = {
  getApplicationEnvironment: (input: {
    application_id: string;
    environment_id: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    environment: {
      id?: string;
      name?: string;
      description?: string;
      os?: string;
      project_id?: string;
      nick_name?: string;
      deploy_type?: number;
      instance_count?: number;
      created_time?: string;
      created_by?: {
        user_id?: string;
        user_name?: string;
        nick_name?: string;
      };
      permission?: Record<string, unknown>;
    };
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetApplicationEnvironmentHandler(
  client: DeployGetApplicationEnvironmentClient
) {
  return async (input: unknown) => {
    const parsed = deployGetApplicationEnvironmentInput.parse(input);
    const response = await client.getApplicationEnvironment(parsed);
    const environmentId = response.environment.id ?? response.environment_id;
    const result = asItemResult(
      `Loaded deploy environment ${environmentId}`,
      {
        id: environmentId,
        applicationId: response.application_id,
        environmentId: response.environment_id,
        projectId: response.environment.project_id,
        name: response.environment.name,
        description: response.environment.description,
        os: response.environment.os,
        nickName: response.environment.nick_name,
        deployType: response.environment.deploy_type,
        instanceCount: response.environment.instance_count,
        createdTime: response.environment.created_time,
        createdBy: response.environment.created_by,
        permission: response.environment.permission,
        status: response.status
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
