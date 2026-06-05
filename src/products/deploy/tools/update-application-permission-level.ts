import { asItemResult } from "../../../contracts/tool-result.js";
import { deployUpdateApplicationPermissionLevelInput } from "../schemas.js";

export function previewUpdateApplicationPermissionLevel(input: {
  project_id: string;
  application_ids: string[];
  permission_level: "project" | "instance";
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update deploy application permission level`, {
    projectId: input.project_id,
    applicationIds: input.application_ids,
    permissionLevel: input.permission_level,
    executed: !input.dry_run
  });
}

export function mapUpdatedApplicationPermissionLevel(input: {
  project_id: string;
  application_ids: string[];
  permission_level: "project" | "instance";
  status?: string;
}) {
  return asItemResult(`Updated deploy application permission level`, {
    projectId: input.project_id,
    applicationIds: input.application_ids,
    permissionLevel: input.permission_level,
    status: input.status,
    executed: true
  });
}

type DeployUpdateApplicationPermissionLevelClient = {
  updateApplicationPermissionLevel: (input: {
    project_id: string;
    application_ids: string[];
    permission_level: "project" | "instance";
  }) => Promise<{
    project_id?: string;
    application_ids?: string[];
    permission_level?: "project" | "instance";
    status?: string;
  }>;
};

export function createDeployUpdateApplicationPermissionLevelHandler(
  client: DeployUpdateApplicationPermissionLevelClient
) {
  return async (input: unknown) => {
    const parsed = deployUpdateApplicationPermissionLevelInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateApplicationPermissionLevel(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateApplicationPermissionLevel(parsed);
    const result = mapUpdatedApplicationPermissionLevel({
      project_id: response.project_id ?? parsed.project_id,
      application_ids: response.application_ids ?? parsed.application_ids,
      permission_level: response.permission_level ?? parsed.permission_level,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
