import { asListResult } from "../../../contracts/tool-result.js";
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

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
