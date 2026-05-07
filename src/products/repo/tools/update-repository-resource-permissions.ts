import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoResourcePermissionUpdateResult } from "../client.js";
import { repoUpdateRepositoryResourcePermissionsInput } from "../schemas.js";
import {
  mapResourcePermissionUpdateResult,
  previewResourcePermissionMutation,
  type ResourcePermissionUpdateInput
} from "./resource-permission-result.js";

type RepoUpdateRepositoryResourcePermissionsClient = {
  updateRepositoryResourcePermissions: (input: {
    repository_id: string;
    resource_name: string;
    data: ResourcePermissionUpdateInput[];
  }) => Promise<RepoResourcePermissionUpdateResult>;
};

export function createRepoUpdateRepositoryResourcePermissionsHandler(
  client: RepoUpdateRepositoryResourcePermissionsClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryResourcePermissionsInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository resource permissions",
        previewResourcePermissionMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryResourcePermissions(parsed);
    const result = mapResourcePermissionUpdateResult("Updated repository resource permissions", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
