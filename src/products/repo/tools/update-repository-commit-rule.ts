import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryCommitRule } from "../client.js";
import { repoUpdateRepositoryCommitRuleInput } from "../schemas.js";
import {
  mapRepositoryCommitRuleResult,
  previewRepositoryCommitRuleMutation
} from "./repository-settings-result.js";

type RepoUpdateRepositoryCommitRuleClient = {
  updateRepositoryCommitRule: (input: {
    repository_id: string;
    commit_rule_id: string;
    name?: string;
    branch_name?: string;
    commit_message_regex?: string;
    commit_message_negative_regex?: string;
    author_regex?: string;
    author_email_regex?: string;
    prohibited_file_name_regex?: string;
    max_file_size?: number;
    binary_gate_enabled?: boolean;
    allowed_modify_binary?: boolean;
    allowed_binary_file_name_regex?: string;
    privileged_user_ids?: number[];
    effective_date?: string;
    skip_rule_check?: boolean;
    skip_rule_end_date?: string;
  }) => Promise<RepoRepositoryCommitRule>;
};

export function createRepoUpdateRepositoryCommitRuleHandler(
  client: RepoUpdateRepositoryCommitRuleClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryCommitRuleInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository commit rule",
        previewRepositoryCommitRuleMutation({
          repositoryId: parsed.repository_id,
          commitRuleId: parsed.commit_rule_id,
          ...parsed
        })
      );
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryCommitRule(parsed);
    const result = mapRepositoryCommitRuleResult("Updated repository commit rule", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
