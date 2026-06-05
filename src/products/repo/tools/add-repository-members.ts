import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoAddRepositoryMembersResult } from "../client.js";
import { repoAddRepositoryMembersInput } from "../schemas.js";
import {
  mapAddRepositoryMembersResult,
  previewAddRepositoryMembersMutation
} from "./user-settings-result.js";

type Client = {
  addRepositoryMembers: (input: {
    repository_id: string;
    users: Array<{
      user_iam_id?: string;
      user_name?: string;
      tenant_name?: string;
      tenant_id?: string;
      repository_role_Id?: string;
    }>;
  }) => Promise<RepoAddRepositoryMembersResult>;
};

export function createRepoAddRepositoryMembersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoAddRepositoryMembersInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: add repository members",
        previewAddRepositoryMembersMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.addRepositoryMembers(request);
    const result = mapAddRepositoryMembersResult("Added repository members", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
