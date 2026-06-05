import { repoAssociateGroupUserGroupInput } from "../schemas.js";
import type { RepoAssociateGroupUserGroupResult } from "../client.js";
import { mapAssociateGroupUserGroupResult, previewGroupMutation } from "./group-result.js";

type Client = {
  associateGroupUserGroup: (input: {
    project_id: string;
    group_id: string;
    user_group_id: string;
  }) => Promise<RepoAssociateGroupUserGroupResult>;
};

export function createRepoAssociateGroupUserGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoAssociateGroupUserGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGroupMutation("Dry run: associate group user group", {
        projectId: parsed.project_id,
        groupId: parsed.group_id,
        userGroupId: parsed.user_group_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.associateGroupUserGroup(parsed);
    const result = mapAssociateGroupUserGroupResult("Associated group user group", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
