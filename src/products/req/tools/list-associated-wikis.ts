import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListAssociatedWikisInput } from "../schemas.js";

export function mapReqAssociatedWikis(
  items: Array<{
    issue_id?: number | string;
    wiki_title?: string;
    wiki_author?: {
      user_num_id?: number;
      user_id?: string;
      user_name?: string;
      nick_name?: string;
    };
    project?: {
      project_id?: string;
      project_name?: string;
    };
    created_date?: string;
    wiki_id?: string;
    region?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} associated wikis found`,
    items.map((item) => ({
      issueId: typeof item.issue_id !== "undefined" ? String(item.issue_id) : undefined,
      wikiId: item.wiki_id,
      wikiTitle: item.wiki_title,
      createdDate: item.created_date,
      region: item.region,
      projectId: item.project?.project_id,
      projectName: item.project?.project_name,
      wikiAuthor: item.wiki_author
        ? {
            userId: item.wiki_author.user_id,
            userNumId: item.wiki_author.user_num_id,
            userName: item.wiki_author.user_name,
            nickName: item.wiki_author.nick_name
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListAssociatedWikisClient = {
  listAssociatedWikis: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    wikis: Array<{
      issue_id?: number | string;
      wiki_title?: string;
      wiki_author?: {
        user_num_id?: number;
        user_id?: string;
        user_name?: string;
        nick_name?: string;
      };
      project?: {
        project_id?: string;
        project_name?: string;
      };
      created_date?: string;
      wiki_id?: string;
      region?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListAssociatedWikisHandler(client: ReqListAssociatedWikisClient) {
  return async (input: unknown) => {
    const parsed = reqListAssociatedWikisInput.parse(input);
    const response = await client.listAssociatedWikis(parsed);
    const result = mapReqAssociatedWikis(response.wikis, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "wikiId", get: (item) => (item as { wikiId?: string }).wikiId },
            { label: "wikiTitle", get: (item) => (item as { wikiTitle?: string }).wikiTitle },
            { label: "projectName", get: (item) => (item as { projectName?: string }).projectName }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "associated wikis",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
