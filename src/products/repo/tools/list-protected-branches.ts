import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListProtectedBranchesInput } from "../schemas.js";

export function mapProtectedBranches(
  items: Array<{
    id: number | string;
    name?: string;
    actions?: Array<{
      action?: string;
      enable?: boolean;
      users?: Array<{ id?: number | string }>;
      roles?: Array<{ id?: number | string }>;
    }>;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} protected branches found`,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      actionCount: item.actions?.length ?? 0,
      actions: (item.actions ?? []).map((action) => ({
        action: action.action,
        enable: action.enable,
        userCount: action.users?.length ?? 0,
        roleCount: action.roles?.length ?? 0
      }))
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListProtectedBranchesClient = {
  listProtectedBranches: (input: { repository_id: string }) => Promise<{
    branches: Array<{
      id: number | string;
      name?: string;
      actions?: Array<{
        action?: string;
        enable?: boolean;
        users?: Array<{ id?: number | string }>;
        roles?: Array<{ id?: number | string }>;
      }>;
    }>;
    total?: number;
  }>;
};

export function createRepoListProtectedBranchesHandler(client: RepoListProtectedBranchesClient) {
  return async (input: unknown) => {
    const parsed = repoListProtectedBranchesInput.parse(input);
    const response = await client.listProtectedBranches(parsed);
    const offset = (parsed.page - 1) * parsed.page_size;
    const pageItems = response.branches.slice(offset, offset + parsed.page_size);
    const result = mapProtectedBranches(
      pageItems,
      parsed.page,
      parsed.page_size,
      response.total ?? response.branches.length
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
