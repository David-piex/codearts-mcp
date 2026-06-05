import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateFileInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoUpdateFileClient = {
  updateFile: (input: {
    repository_id: string;
    file_path: string;
    branch: string;
    commit_message: string;
    content: string;
    name?: string;
    author_email?: string;
    author_name?: string;
    encoding?: string;
    last_commit_id?: string;
  }) => Promise<{
    file_path?: string;
    branch?: string;
  }>;
};

export function createRepoUpdateFileHandler(client: RepoUpdateFileClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: update repository file", {
        repositoryId: parsed.repository_id,
        filePath: parsed.file_path,
        branch: parsed.branch,
        commitMessage: parsed.commit_message,
        encoding: parsed.encoding,
        lastCommitId: parsed.last_commit_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateFile(request);
    const result = asItemResult("Updated repository file", {
      filePath: response.file_path ?? parsed.file_path,
      branch: response.branch ?? parsed.branch,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
