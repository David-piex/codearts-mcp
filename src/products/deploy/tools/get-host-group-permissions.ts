import { deployGetHostGroupPermissionsInput } from "../schemas.js";
import { mapDeployPermissions, type DeployPermissionRecord } from "./deploy-permissions.js";

type Client = {
  getHostGroupPermissions: (input: { group_id: string }) => Promise<{
    group_id: string;
    permissions: DeployPermissionRecord[];
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployGetHostGroupPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployGetHostGroupPermissionsInput.parse(input);
    const response = await client.getHostGroupPermissions(parsed);
    const result = mapDeployPermissions(
      `${response.permissions.length} deploy host group permissions found`,
      response.permissions
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        groupId: response.group_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
