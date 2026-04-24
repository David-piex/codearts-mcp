import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemTagsInput } from "../schemas.js";

type ReqWorkItemTag = {
  id?: number | string;
  name?: string;
  encode_name?: string;
  tag_count?: number;
};

export function mapReqWorkItemTags(
  items: ReqWorkItemTag[],
  total?: number,
  page = 1,
  pageSize = 10
) {
  return asListResult(
    `${items.length} work item tags found`,
    items.map((item) => ({
      id: String(item.id ?? ""),
      name: item.name,
      encodeName: item.encode_name,
      tagCount: item.tag_count
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListWorkItemTagsClient = {
  listWorkItemTags: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    tags: ReqWorkItemTag[];
    total?: number;
  }>;
};

export function createReqListWorkItemTagsHandler(client: ReqListWorkItemTagsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemTagsInput.parse(input);
    const response = await client.listWorkItemTags(parsed);
    const result = mapReqWorkItemTags(response.tags, response.total, parsed.page, parsed.page_size);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "name", get: (item) => (item as { name?: string }).name },
            { label: "tagCount", get: (item) => (item as { tagCount?: number }).tagCount }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work item tags",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
