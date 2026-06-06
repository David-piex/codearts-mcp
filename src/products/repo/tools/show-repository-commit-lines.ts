import type { RepoCommitLines } from "../client.js";
import { repoShowRepositoryCommitLinesInput } from "../schemas.js";
import { mapRepositoryCommitLines } from "./repository-statistics-result.js";

type RepoShowRepositoryCommitLinesClient = {
  showRepositoryCommitLines: (input: {
    repository_id: string;
    ref_name: string;
    begin_date: string;
    end_date: string;
  }) => Promise<RepoCommitLines>;
};

export function createRepoShowRepositoryCommitLinesHandler(client: RepoShowRepositoryCommitLinesClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryCommitLinesInput.parse(input);
    const response = await client.showRepositoryCommitLines(parsed);
    const result = mapRepositoryCommitLines(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
