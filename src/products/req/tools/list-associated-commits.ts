import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListAssociatedCommitsInput } from "../schemas.js";

export function mapReqAssociatedCommits(
  items: Array<{
    branch_name?: string;
    commit_id?: string;
    commit_msg?: string;
    commit_short_id?: string;
    commit_url?: string;
    create_date?: string;
    repository_id?: string;
    type?: string;
    update_date?: string;
    user?: {
      nick_name?: string;
      user_id?: string;
    };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} associated commits found`,
    items.map((item) => ({
      id: item.commit_id ?? item.commit_short_id ?? item.branch_name ?? "",
      branchName: item.branch_name,
      message: item.commit_msg,
      shortId: item.commit_short_id,
      url: item.commit_url,
      createDate: item.create_date,
      repositoryId: item.repository_id,
      type: item.type,
      updateDate: item.update_date,
      author: item.user
        ? {
            nickName: item.user.nick_name,
            userId: item.user.user_id
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListAssociatedCommitsClient = {
  listAssociatedCommits: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    type?: "commit" | "branch";
  }) => Promise<{
    commits: Array<{
      branch_name?: string;
      commit_id?: string;
      commit_msg?: string;
      commit_short_id?: string;
      commit_url?: string;
      create_date?: string;
      repository_id?: string;
      type?: string;
      update_date?: string;
      user?: {
        nick_name?: string;
        user_id?: string;
      };
    }>;
    total?: number;
  }>;
};

export function createReqListAssociatedCommitsHandler(client: ReqListAssociatedCommitsClient) {
  return async (input: unknown) => {
    const parsed = reqListAssociatedCommitsInput.parse(input);
    const response = await client.listAssociatedCommits(parsed);
    const result = mapReqAssociatedCommits(
      response.commits,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "message", get: (item) => (item as { message?: string }).message }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "associated commits",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
