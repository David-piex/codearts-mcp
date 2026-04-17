import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListMergeRequestDiscussionsInput } from "../schemas.js";

export function mapMergeRequestDiscussions(
  items: Array<{
    discussion_id: string;
    body?: string;
    created_at?: string;
    author?: { name?: string; nick_name?: string };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request discussions found`,
    items.map((item) => ({
      id: item.discussion_id,
      body: item.body,
      createdAt: item.created_at,
      authorName: item.author?.name,
      authorNickName: item.author?.nick_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListMergeRequestDiscussionsClient = {
  listMergeRequestDiscussions: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    discussions: Array<{
      discussion_id: string;
      body?: string;
      created_at?: string;
      author?: { name?: string; nick_name?: string };
    }>;
    total?: number;
  }>;
};

export function createRepoListMergeRequestDiscussionsHandler(
  client: RepoListMergeRequestDiscussionsClient
) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestDiscussionsInput.parse(input);
    const response = await client.listMergeRequestDiscussions(parsed);
    const offset = (parsed.page - 1) * parsed.page_size;
    const pageItems = response.discussions.slice(offset, offset + parsed.page_size);
    const result = mapMergeRequestDiscussions(
      pageItems,
      parsed.page,
      parsed.page_size,
      response.total ?? response.discussions.length
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
