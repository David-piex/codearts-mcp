import { asItemResult } from "../../../contracts/tool-result.js";
import { deployUpdateEnvironmentPermissionsInput } from "../schemas.js";
import { mapDeployPermissionRecord, type DeployPermissionRecord } from "./deploy-permissions.js";

type Input = {
  application_id: string;
  environment_id: string;
  role_id?: string;
  permission_name?: "can_view" | "can_edit" | "can_delete" | "can_deploy" | "can_manage";
  permission_value?: boolean;
  dry_run: boolean;
};

export function previewUpdateEnvironmentPermissions(input: Input) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update deploy environment permissions`, {
    applicationId: input.application_id,
    environmentId: input.environment_id,
    roleId: input.role_id,
    permissionName: input.permission_name,
    permissionValue: input.permission_value,
    executed: !input.dry_run
  });
}

type Client = {
  updateEnvironmentPermissions: (input: Omit<Input, "dry_run">) => Promise<{
    application_id: string;
    environment_id: string;
    permission: DeployPermissionRecord;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployUpdateEnvironmentPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployUpdateEnvironmentPermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateEnvironmentPermissions(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateEnvironmentPermissions(parsed);
    const result = asItemResult(`Updated deploy environment permissions`, {
      ...mapDeployPermissionRecord(response.permission),
      applicationId: response.application_id,
      environmentId: response.environment_id,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
