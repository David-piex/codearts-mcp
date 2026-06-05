import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryGeneralCommitRule } from "../client.js";
import { repoUpdateRepositoryGeneralCommitRuleInput } from "../schemas.js";
import {
  mapRepositoryGeneralCommitRule,
  previewRepositoryGeneralCommitRuleMutation
} from "./repository-settings-result.js";

type RepoUpdateRepositoryGeneralCommitRuleClient = {
  updateRepositoryGeneralCommitRule: (input: {
    repository_id: string;
    reject_unsigned_commits?: boolean;
    reject_not_signed_by_gpg?: boolean;
    deny_delete_tag?: boolean;
    prevent_secrets?: boolean;
    deny_force_push?: boolean;
  }) => Promise<RepoRepositoryGeneralCommitRule>;
};

export function createRepoUpdateRepositoryGeneralCommitRuleHandler(
  client: RepoUpdateRepositoryGeneralCommitRuleClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryGeneralCommitRuleInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository general commit rule",
        previewRepositoryGeneralCommitRuleMutation(parsed)
      );
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryGeneralCommitRule(parsed);
    const result = mapRepositoryGeneralCommitRule(response);
    return {
      content: [{ type: "text" as const, text: "Updated repository general commit rule" }],
      structuredContent: {
        ...result,
        summary: "Updated repository general commit rule"
      }
    };
  };
}
