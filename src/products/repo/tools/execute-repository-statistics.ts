import { asItemResult } from "../../../contracts/tool-result.js";
import { repoExecuteRepositoryStatisticsInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoExecuteRepositoryStatisticsClient = {
  executeRepositoryStatistics: (input: {
    repository_id: string;
    branch_name?: string;
  }) => Promise<{
    repository_id: string;
    executed: boolean;
  }>;
};

export function createRepoExecuteRepositoryStatisticsHandler(
  client: RepoExecuteRepositoryStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = repoExecuteRepositoryStatisticsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: execute repository statistics", {
        repositoryId: parsed.repository_id,
        branchName: parsed.branch_name
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.executeRepositoryStatistics(parsed);
    const result = asItemResult("Executed repository statistics", {
      repositoryId: response.repository_id,
      executed: response.executed
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
