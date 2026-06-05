import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateFileInput } from "../schemas.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoCreateFileClient = {
  createFile: (input: {
    repository_id: string;
    file_path: string;
    branch: string;
    commit_message: string;
    content: string;
    name?: string;
    author_email?: string;
    author_name?: string;
    encoding?: string;
  }) => Promise<{
    file_path?: string;
    branch?: string;
  }>;
};

export function createRepoCreateFileHandler(client: RepoCreateFileClient) {
  return async (input: unknown) => {
    const parsed = repoCreateFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: create repository file", {
        repositoryId: parsed.repository_id,
        filePath: parsed.file_path,
        branch: parsed.branch,
        commitMessage: parsed.commit_message,
        authorName: parsed.author_name,
        authorEmail: parsed.author_email,
        encoding: parsed.encoding
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createFile(request);
    const result = asItemResult("Created repository file", {
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
