import type { RepoCommitDiffEntry } from "../client.js";
import { repoShowCommitFileDiffInput } from "../schemas.js";
import { mapCommitFileDiff } from "./repository-navigation-result.js";

type RepoShowCommitFileDiffClient = {
  showCommitFileDiff: (input: {
    repository_id: string;
    sha: string;
    path: string;
    old_path?: string;
    ignore_whitespace_change?: boolean;
  }) => Promise<RepoCommitDiffEntry>;
};

export function createRepoShowCommitFileDiffHandler(client: RepoShowCommitFileDiffClient) {
  return async (input: unknown) => {
    const parsed = repoShowCommitFileDiffInput.parse(input);
    const response = await client.showCommitFileDiff(parsed);
    const result = mapCommitFileDiff(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
