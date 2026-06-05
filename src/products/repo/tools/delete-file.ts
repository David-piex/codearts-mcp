import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteFileInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoDeleteFileClient = {
  deleteFile: (input: {
    repository_id: string;
    file_path: string;
    branch: string;
    commit_message: string;
    author_name?: string;
    author_email?: string;
  }) => Promise<{
    repository_id: string;
    file_path: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteFileHandler(client: RepoDeleteFileClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: delete repository file", {
        repositoryId: parsed.repository_id,
        filePath: parsed.file_path,
        branch: parsed.branch,
        commitMessage: parsed.commit_message
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteFile(request);
    const result = asItemResult("Deleted repository file", {
      repositoryId: response.repository_id,
      filePath: response.file_path,
      deleted: response.deleted,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
