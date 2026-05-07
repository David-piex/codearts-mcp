import { formatListToolText } from "../../../contracts/tool-result-text.js";
import type { RepoItemCommit } from "../client.js";
import { repoListItemCommitsInput } from "../schemas.js";
import { mapItemCommitsList } from "./project-settings-result.js";

type RepoListItemCommitsClient = {
  listItemCommits: (input: {
    project_id: string;
    item_id: string;
    page: number;
    page_size: number;
    type?: "commit" | "branch" | "mergerequest";
  }) => Promise<{
    commits: RepoItemCommit[];
    total?: number;
  }>;
};

export function createRepoListItemCommitsHandler(client: RepoListItemCommitsClient) {
  return async (input: unknown) => {
    const parsed = repoListItemCommitsInput.parse(input);
    const response = await client.listItemCommits(parsed);
    const result = mapItemCommitsList(
      `${response.commits.length} item commits found`,
      response.commits,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "shortId", get: (item) => (item as { shortId?: string }).shortId },
        { label: "title", get: (item) => (item as { title?: string }).title },
        { label: "authorName", get: (item) => (item as { authorName?: string }).authorName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
