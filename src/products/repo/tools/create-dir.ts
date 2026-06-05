import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateDirInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoCreateDirClient = {
  createDir: (input: {
    repository_id: string;
    branch_name: string;
    file_path: string;
    commit_message: string;
  }) => Promise<{
    repository_id: string;
    branch_name: string;
    file_path: string;
    commit_message: string;
    commit_ids: string[];
  }>;
};

export function createRepoCreateDirHandler(client: RepoCreateDirClient) {
  return async (input: unknown) => {
    const parsed = repoCreateDirInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: create repository directory", {
        repositoryId: parsed.repository_id,
        branchName: parsed.branch_name,
        filePath: parsed.file_path,
        commitMessage: parsed.commit_message
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createDir(parsed);
    const result = asItemResult("Created repository directory", {
      repositoryId: response.repository_id,
      branchName: response.branch_name,
      filePath: response.file_path,
      commitMessage: response.commit_message,
      commitIds: response.commit_ids,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
