import { repoCreateCommitInput } from "../schemas.js";
import { mapRepoCommit } from "./get-commit.js";
import { previewRepositorySimpleMutation } from "./repository-settings-result.js";

type RepoCreateCommitClient = {
  createCommit: (input: {
    repository_id: string;
    branch: string;
    commit_message: string;
    actions: Array<{
      action: "create" | "create_dir" | "update" | "move" | "delete" | "chmod";
      file_path: string;
      previous_path?: string;
      content?: string;
      encoding?: "text" | "base64";
      last_commit_id?: string;
      execute_filemode?: boolean;
    }>;
    start_branch?: string;
    author_email?: string;
    author_name?: string;
    stats?: boolean;
    force?: boolean;
  }) => Promise<Parameters<typeof mapRepoCommit>[0]>;
};

export function createRepoCreateCommitHandler(client: RepoCreateCommitClient) {
  return async (input: unknown) => {
    const parsed = repoCreateCommitInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRepositorySimpleMutation("Dry run: create repository commit", {
        repositoryId: parsed.repository_id,
        branch: parsed.branch,
        commitMessage: parsed.commit_message,
        actions: parsed.actions,
        startBranch: parsed.start_branch,
        authorEmail: parsed.author_email,
        authorName: parsed.author_name,
        stats: parsed.stats,
        force: parsed.force
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createCommit(request);
    const result = mapRepoCommit(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
