import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryPermissionInheritSetting } from "../client.js";
import { repoUpdateRepositoryPermissionInheritEnabledInput } from "../schemas.js";
import {
  mapRepositoryPermissionInheritSetting,
  previewRepositoryPermissionInheritMutation
} from "./resource-permission-result.js";

type RepoUpdateRepositoryPermissionInheritEnabledClient = {
  updateRepositoryPermissionInheritEnabled: (input: {
    repository_id: string;
    inherit_parent_permission: boolean;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
};

export function createRepoUpdateRepositoryPermissionInheritEnabledHandler(
  client: RepoUpdateRepositoryPermissionInheritEnabledClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryPermissionInheritEnabledInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository permission inherit setting",
        previewRepositoryPermissionInheritMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryPermissionInheritEnabled(parsed);
    const result = mapRepositoryPermissionInheritSetting(
      "Updated repository permission inherit setting",
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
