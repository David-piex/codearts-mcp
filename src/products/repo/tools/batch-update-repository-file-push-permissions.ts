import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryFilePushPermission } from "../client.js";
import { repoBatchUpdateRepositoryFilePushPermissionsInput } from "../schemas.js";
import {
  mapFilePushPermissionList,
  previewFilePushPermissionMutation,
  type FilePushPermissionMutationInput
} from "./file-push-permission-result.js";

type RepoBatchUpdateRepositoryFilePushPermissionsClient = {
  batchUpdateRepositoryFilePushPermissions: (input: {
    repository_id: string;
    permissions: FilePushPermissionMutationInput[];
  }) => Promise<{
    permissions: RepoRepositoryFilePushPermission[];
    total?: number;
  }>;
};

export function createRepoBatchUpdateRepositoryFilePushPermissionsHandler(
  client: RepoBatchUpdateRepositoryFilePushPermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoBatchUpdateRepositoryFilePushPermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: batch update repository file push permissions",
        previewFilePushPermissionMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateRepositoryFilePushPermissions(parsed);
    const result = mapFilePushPermissionList(
      `Updated ${response.permissions.length} repository file push permissions`,
      response.permissions,
      1,
      response.permissions.length || parsed.permissions.length,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
