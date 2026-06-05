import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoAssociateRepositoryUserGroupResult } from "../client.js";
import { repoAssociateRepositoryUserGroupInput } from "../schemas.js";
import {
  mapAssociateRepositoryUserGroupResult,
  previewAssociateRepositoryUserGroupMutation
} from "./user-settings-result.js";

type Client = {
  associateRepositoryUserGroup: (input: {
    project_id: string;
    repository_id: string;
    user_group_id: string;
  }) => Promise<RepoAssociateRepositoryUserGroupResult>;
};

export function createRepoAssociateRepositoryUserGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoAssociateRepositoryUserGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: associate repository user group",
        previewAssociateRepositoryUserGroupMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.associateRepositoryUserGroup(request);
    const result = mapAssociateRepositoryUserGroupResult("Associated repository user group", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
