import { asItemResult } from "../../../contracts/tool-result.js";
import { deployUpdateHostGroupPermissionsInput } from "../schemas.js";
import { mapDeployPermissionRecord, type DeployPermissionRecord } from "./deploy-permissions.js";

type Input = {
  group_id: string;
  project_id: string;
  role_id: string;
  permission_name: "can_view" | "can_edit" | "can_delete" | "can_add_host" | "can_manage" | "can_copy";
  permission_value: boolean;
  dry_run: boolean;
};

export function previewUpdateHostGroupPermissions(input: Input) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update deploy host group permission ${input.permission_name}`, {
    groupId: input.group_id,
    projectId: input.project_id,
    roleId: input.role_id,
    permissionName: input.permission_name,
    permissionValue: input.permission_value,
    executed: !input.dry_run
  });
}

type Client = {
  updateHostGroupPermissions: (input: Omit<Input, "dry_run">) => Promise<{
    group_id: string;
    permission: DeployPermissionRecord;
    raw: unknown;
  }>;
};

export function createDeployUpdateHostGroupPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployUpdateHostGroupPermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateHostGroupPermissions(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateHostGroupPermissions(parsed);
    const result = asItemResult(`Updated deploy host group permission ${parsed.permission_name}`, {
      ...mapDeployPermissionRecord(response.permission),
      groupId: response.group_id,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
