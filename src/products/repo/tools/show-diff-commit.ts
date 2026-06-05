import { formatListToolText } from "../../../contracts/tool-result-text.js";
import type { RepoCommitDiffMetadata } from "../client.js";
import { repoShowDiffCommitInput } from "../schemas.js";
import { mapDiffCommit } from "./repository-navigation-result.js";

type RepoShowDiffCommitClient = {
  showDiffCommit: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
    ignore_whitespace_change?: boolean;
    not_statistic?: boolean;
  }) => Promise<RepoCommitDiffMetadata>;
};

export function createRepoShowDiffCommitHandler(client: RepoShowDiffCommitClient) {
  return async (input: unknown) => {
    const parsed = repoShowDiffCommitInput.parse(input);
    const response = await client.showDiffCommit(parsed);
    const result = mapDiffCommit(response, parsed.page, parsed.page_size);
    const text = formatListToolText(result, {
      fields: [
        { label: "oldPath", get: (item) => (item as { oldPath?: string }).oldPath },
        { label: "newPath", get: (item) => (item as { newPath?: string }).newPath },
        { label: "fileType", get: (item) => (item as { fileType?: string }).fileType },
        { label: "addedLines", get: (item) => (item as { addedLines?: number }).addedLines }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
