import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoUpdateRepositoryGeneralPolicyInput } from "../schemas.js";
import {
  mapProjectGeneralPolicy
} from "./project-settings-result.js";
import { previewRepositoryGeneralPolicyMutation } from "./repository-settings-result.js";

type RepoUpdateRepositoryGeneralPolicyClient = {
  updateRepositoryGeneralPolicy: (input: {
    repository_id: string;
    disable_fork?: boolean;
    branch_name_regex?: string;
    tag_name_regex?: string;
    generate_pre_merge_ref?: boolean;
    forbidden_developer_create_branch?: boolean;
    create_branch_whitelist_user_ids?: string;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoUpdateRepositoryGeneralPolicyHandler(
  client: RepoUpdateRepositoryGeneralPolicyClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryGeneralPolicyInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository general policy",
        previewRepositoryGeneralPolicyMutation(parsed)
      );
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Updated repository general policy", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
