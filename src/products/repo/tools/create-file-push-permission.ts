import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryFilePushPermission } from "../client.js";
import { repoCreateFilePushPermissionInput } from "../schemas.js";
import {
  mapFilePushPermissionItem,
  previewFilePushPermissionMutation,
  type FilePushPermissionActionInput
} from "./file-push-permission-result.js";

type RepoCreateFilePushPermissionClient = {
  createFilePushPermission: (input: {
    repository_id: string;
    path: string;
    actions?: FilePushPermissionActionInput[];
  }) => Promise<RepoRepositoryFilePushPermission>;
};

export function createRepoCreateFilePushPermissionHandler(client: RepoCreateFilePushPermissionClient) {
  return async (input: unknown) => {
    const parsed = repoCreateFilePushPermissionInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create repository file push permission", previewFilePushPermissionMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createFilePushPermission(parsed);
    const result = mapFilePushPermissionItem("Created repository file push permission", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
