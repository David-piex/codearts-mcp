import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetV4EnvironmentInput } from "../schemas.js";

type DeployGetV4EnvironmentClient = {
  getV4Environment: (input: {
    project_id: string;
    environment_id: string;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    environment: {
      environment_id: string;
      name?: string;
      description?: string;
    };
    raw: unknown;
  }>;
};

export function createDeployGetV4EnvironmentHandler(client: DeployGetV4EnvironmentClient) {
  return async (input: unknown) => {
    const parsed = deployGetV4EnvironmentInput.parse(input);
    const response = await client.getV4Environment(parsed);
    const result = asItemResult(
      `Loaded v4 environment ${response.environment.environment_id}`,
      {
        id: response.environment.environment_id,
        projectId: response.project_id,
        name: response.environment.name,
        description: response.environment.description
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
