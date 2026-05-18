import type { RepoUserRefPermission } from "../client.js";
import { repoShowUserRefPermissionInput } from "../schemas.js";
import { mapUserRefPermission } from "./repository-settings-result.js";

type RepoShowUserRefPermissionClient = {
  showUserRefPermission: (input: {
    repository_id: string;
    target_ref: string;
    action?: string;
    change_request_iid?: string | number;
  }) => Promise<RepoUserRefPermission>;
};

export function createRepoShowUserRefPermissionHandler(client: RepoShowUserRefPermissionClient) {
  return async (input: unknown) => {
    const parsed = repoShowUserRefPermissionInput.parse(input);
    const response = await client.showUserRefPermission(parsed);
    const result = mapUserRefPermission(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
