import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListMergeRequestsInput } from "../schemas.js";

export function mapMergeRequests(
  items: Array<{
    id: number | string;
    iid?: number;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    created_at?: string;
    updated_at?: string;
    author?: { name?: string; nick_name?: string };
    web_url?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge requests found`,
    items.map((item) => ({
      id: String(item.id),
      iid: item.iid,
      title: item.title,
      state: item.state,
      sourceBranch: item.source_branch,
      targetBranch: item.target_branch,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      authorName: item.author?.name,
      authorNickName: item.author?.nick_name,
      webUrl: item.web_url
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListMergeRequestsClient = {
  listMergeRequests: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    state?: string;
  }) => Promise<{
    merge_requests: Array<{
      id: number | string;
      iid?: number;
      title?: string;
      state?: string;
      source_branch?: string;
      target_branch?: string;
      created_at?: string;
      updated_at?: string;
      author?: { name?: string; nick_name?: string };
      web_url?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListMergeRequestsHandler(client: RepoListMergeRequestsClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestsInput.parse(input);
    const response = await client.listMergeRequests(parsed);
    const result = mapMergeRequests(
      response.merge_requests,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
