import { asItemResult } from "../../../contracts/tool-result.js";
import { repoRenameFileInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoRenameFileClient = {
  renameFile: (input: {
    repository_id: string;
    file_path: string;
    previous_path: string;
    branch_name: string;
    commit_message: string;
    start_branch?: string;
    author_email?: string;
    author_name?: string;
    infer_content?: boolean;
    content?: string;
    encoding?: string;
    last_commit_id?: string;
  }) => Promise<{
    file_path?: string;
    branch?: string;
  }>;
};

export function createRepoRenameFileHandler(client: RepoRenameFileClient) {
  return async (input: unknown) => {
    const parsed = repoRenameFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: rename repository file", {
        repositoryId: parsed.repository_id,
        previousPath: parsed.previous_path,
        filePath: parsed.file_path,
        branchName: parsed.branch_name,
        commitMessage: parsed.commit_message,
        inferContent: parsed.infer_content,
        encoding: parsed.encoding,
        lastCommitId: parsed.last_commit_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.renameFile(request);
    const result = asItemResult("Renamed repository file", {
      filePath: response.file_path ?? parsed.file_path,
      branch: response.branch ?? parsed.branch_name,
      previousPath: parsed.previous_path,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
