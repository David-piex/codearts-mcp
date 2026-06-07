import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListCommitsInput } from "../schemas.js";

export function mapRepoCommits(
  items: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} commits found`,
    items.map((item) => ({
      id: item.id,
      shortId: item.short_id,
      title: item.title,
      authorName: item.author_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListCommitsClient = {
  listCommits: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    ref_name?: string;
    since?: string;
    until?: string;
    path?: string;
    message?: string;
    author?: string;
    order_by_date?: boolean;
    follow?: boolean;
    with_stats?: boolean;
  }) => Promise<{
    commits: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>;
    total?: number;
  }>;
};

export function createRepoListCommitsHandler(client: RepoListCommitsClient) {
  return async (input: unknown) => {
    const parsed = repoListCommitsInput.parse(input);
    const response = await client.listCommits(parsed);
    const result = mapRepoCommits(response.commits, parsed.page, parsed.page_size, response.total);
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
