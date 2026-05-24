import { mapDeployPermissions, type DeployPermissionRecord } from "./deploy-permissions.js";
import { deployListApplicationPermissionsInput } from "../schemas.js";

type Client = {
  listApplicationPermissions: (input: { app_id?: string; project_id?: string }) => Promise<{
    app_id?: string;
    project_id?: string;
    permissions: DeployPermissionRecord[];
    status?: string;
    raw: unknown;
  }>;
};

export function mapDeployApplicationPermissions(items: DeployPermissionRecord[]) {
  return mapDeployPermissions(`${items.length} deploy application permissions found`, items);
}

export function createDeployListApplicationPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployListApplicationPermissionsInput.parse(input);
    const response = await client.listApplicationPermissions(parsed);
    const result = mapDeployApplicationPermissions(response.permissions);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        appId: response.app_id,
        projectId: response.project_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
