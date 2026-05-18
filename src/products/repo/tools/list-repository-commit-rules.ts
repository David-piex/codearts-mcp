import type { RepoRepositoryCommitRule } from "../client.js";
import { repoListRepositoryCommitRulesInput } from "../schemas.js";
import { mapRepositoryCommitRulesList } from "./repository-settings-result.js";

type RepoListRepositoryCommitRulesClient = {
  listRepositoryCommitRules: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    rules: RepoRepositoryCommitRule[];
    total?: number;
  }>;
};

export function createRepoListRepositoryCommitRulesHandler(client: RepoListRepositoryCommitRulesClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryCommitRulesInput.parse(input);
    const response = await client.listRepositoryCommitRules(parsed);
    const result = mapRepositoryCommitRulesList(response.rules, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
