import { deployGetEnvironmentPermissionsInput } from "../schemas.js";
import { mapDeployPermissions, type DeployPermissionRecord } from "./deploy-permissions.js";

type Client = {
  getEnvironmentPermissions: (input: { application_id: string; environment_id: string }) => Promise<{
    application_id: string;
    environment_id: string;
    permissions: DeployPermissionRecord[];
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetEnvironmentPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetEnvironmentPermissionsInput.parse(input);
    const response = await client.getEnvironmentPermissions(parsed);
    const result = mapDeployPermissions(
      `${response.permissions.length} deploy environment permissions found`,
      response.permissions
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        applicationId: response.application_id,
        environmentId: response.environment_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
