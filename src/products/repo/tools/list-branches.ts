import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListBranchesInput } from "../schemas.js";

export function mapRepoBranches(
  items: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} branches found`,
    items.map((item) => ({
      name: item.name,
      commitId: item.commit?.id,
      protected: item.protected ?? false
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListBranchesClient = {
  listBranches: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    branches: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
    total?: number;
  }>;
};

export function createRepoListBranchesHandler(client: RepoListBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoListBranchesInput.parse(input);
    const response = await client.listBranches(parsed);
    const result = mapRepoBranches(response.branches, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "commitId", get: (item) => (item as { commitId?: string }).commitId },
        { label: "protected", get: (item) => (item as { protected?: boolean }).protected }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
