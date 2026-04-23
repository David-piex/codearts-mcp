import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemCommentsInput } from "../schemas.js";

export function mapReqWorkItemComments(
  items: Array<{
    id: number | string;
    comment?: string;
    created_time?: string;
    timestamp?: number;
    user?: {
      nick_name?: string;
      user_name?: string;
      user_num_id?: number;
    };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} work item comments found`,
    items.map((item) => ({
      id: String(item.id),
      content: item.comment,
      createdTime: item.created_time,
      timestamp: item.timestamp,
      author: item.user
        ? {
            nickName: item.user.nick_name,
            userName: item.user.user_name,
            userNumId: item.user.user_num_id
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListWorkItemCommentsClient = {
  listWorkItemComments: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    comments: Array<{
      id: number | string;
      comment?: string;
      created_time?: string;
      timestamp?: number;
      user?: {
        nick_name?: string;
        user_name?: string;
        user_num_id?: number;
      };
    }>;
    total?: number;
  }>;
};

export function createReqListWorkItemCommentsHandler(client: ReqListWorkItemCommentsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemCommentsInput.parse(input);
    const response = await client.listWorkItemComments(parsed);
    const result = mapReqWorkItemComments(
      response.comments,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "content", get: (item) => (item as { content?: string }).content },
            {
              label: "author",
              get: (item) => {
                const author = (item as { author?: { userName?: string; nickName?: string } }).author;
                return author?.userName ?? author?.nickName;
              }
            }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work item comments",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
