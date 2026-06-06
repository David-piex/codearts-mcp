import type { RepoRelatedCommit } from "../client.js";
import { repoListRepositoryRelatedCommitsInput } from "../schemas.js";
import { mapRepositoryRelatedCommitsList } from "./repository-settings-result.js";

type RepoListRepositoryRelatedCommitsClient = {
  listRepositoryRelatedCommits: (input: {
    x_auth_token: string;
    repository_uuid: string;
    type: number;
    search?: string;
    page: number;
    per_page: number;
  }) => Promise<{
    commits: RepoRelatedCommit[];
    total?: number;
  }>;
};

export function createRepoListRepositoryRelatedCommitsHandler(client: RepoListRepositoryRelatedCommitsClient) {
  return async (input: unknown) => {
    const parsed = repoListRepositoryRelatedCommitsInput.parse(input);
    const response = await client.listRepositoryRelatedCommits(parsed);
    const result = mapRepositoryRelatedCommitsList(response.commits, parsed.page, parsed.per_page, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
