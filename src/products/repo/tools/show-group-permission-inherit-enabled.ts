import type { RepoRepositoryPermissionInheritSetting } from "../client.js";
import { repoShowGroupPermissionInheritEnabledInput } from "../schemas.js";
import { mapRepositoryPermissionInheritSetting } from "./resource-permission-result.js";

type Client = {
  showGroupPermissionInheritEnabled: (input: {
    group_id: string;
  }) => Promise<RepoRepositoryPermissionInheritSetting>;
};

export function createRepoShowGroupPermissionInheritEnabledHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupPermissionInheritEnabledInput.parse(input);
    const response = await client.showGroupPermissionInheritEnabled(parsed);
    const result = mapRepositoryPermissionInheritSetting(
      "Fetched group permission inherit setting",
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
