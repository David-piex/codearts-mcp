import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListPlansInput } from "../schemas.js";

export function mapReqPlans(
  items: Array<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    creator?: string;
    updater?: string;
    created_on?: string;
    updated_on?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  const summary =
    total !== undefined ? `${items.length} plans found in this page (total: ${total})` : `${items.length} plans found`;
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      name: item.name,
      type: item.type,
      projectId: item.project_id,
      creator: item.creator,
      updater: item.updater,
      createdOn: item.created_on,
      updatedOn: item.updated_on
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListPlansClient = {
  listPlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    status_id?: number;
    plan_id?: string;
  }) => Promise<{
    plans: Array<{
      id: number | string;
      name: string;
      type?: string;
      project_id?: string;
      creator?: string;
      updater?: string;
      created_on?: string;
      updated_on?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListPlansHandler(client: ReqListPlansClient) {
  return async (input: unknown) => {
    const parsed = reqListPlansInput.parse(input);
    const response = await client.listPlans(parsed);
    const result = mapReqPlans(response.plans, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "name", get: (item) => (item as { name?: string }).name },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "projectId", get: (item) => (item as { projectId?: string }).projectId }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "plans",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
