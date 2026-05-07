import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoResourcePermissionUpdateResult } from "../client.js";
import { repoUpdateGroupResourcePermissionsInput } from "../schemas.js";
import {
  mapResourcePermissionUpdateResult,
  previewResourcePermissionMutation,
  type ResourcePermissionUpdateInput
} from "./resource-permission-result.js";

type RepoUpdateGroupResourcePermissionsClient = {
  updateGroupResourcePermissions: (input: {
    group_id: string;
    resource_id: string;
    data: ResourcePermissionUpdateInput[];
  }) => Promise<RepoResourcePermissionUpdateResult>;
};

export function createRepoUpdateGroupResourcePermissionsHandler(
  client: RepoUpdateGroupResourcePermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateGroupResourcePermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update group resource permissions",
        previewResourcePermissionMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateGroupResourcePermissions(parsed);
    const result = mapResourcePermissionUpdateResult("Updated group resource permissions", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
