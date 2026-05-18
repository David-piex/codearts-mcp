import type { RepoRepositoryGeneralCommitRule } from "../client.js";
import { repoShowRepositoryGeneralCommitRuleInput } from "../schemas.js";
import { mapRepositoryGeneralCommitRule } from "./repository-settings-result.js";

type RepoShowRepositoryGeneralCommitRuleClient = {
  showRepositoryGeneralCommitRule: (input: { repository_id: string }) => Promise<RepoRepositoryGeneralCommitRule>;
};

export function createRepoShowRepositoryGeneralCommitRuleHandler(
  client: RepoShowRepositoryGeneralCommitRuleClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryGeneralCommitRuleInput.parse(input);
    const response = await client.showRepositoryGeneralCommitRule(parsed);
    const result = mapRepositoryGeneralCommitRule(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
