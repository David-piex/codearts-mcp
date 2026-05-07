import type { RepoRepositoryPermissionInheritSetting } from "../client.js";
import { repoShowRepositoryPermissionInheritEnabledInput } from "../schemas.js";
import { mapRepositoryPermissionInheritSetting } from "./resource-permission-result.js";

type RepoShowRepositoryPermissionInheritEnabledClient = {
  showRepositoryPermissionInheritEnabled: (input: {
    repository_id: string;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
};

export function createRepoShowRepositoryPermissionInheritEnabledHandler(
  client: RepoShowRepositoryPermissionInheritEnabledClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryPermissionInheritEnabledInput.parse(input);
    const response = await client.showRepositoryPermissionInheritEnabled(parsed);
    const result = mapRepositoryPermissionInheritSetting(
      "Fetched repository permission inherit setting",
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
