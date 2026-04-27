import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListReleasePlansInput } from "../schemas.js";
import { toReleasePlanItem, type ReleasePlanItem } from "./release-plan-mappers.js";

export function mapReleasePlans(
  items: ReleasePlanItem[],
  page: number,
  pageSize: number,
  total?: number,
  meta?: {
    status?: string;
    message?: string | null;
  }
) {
  const summary =
    total !== undefined
      ? `${items.length} release plans found in this page (total: ${total})`
      : `${items.length} release plans found`;

  return asListResult(
    summary,
    items.map(toReleasePlanItem),
    toPageInfo(page, pageSize, total),
    meta
  );
}

type ReqListReleasePlansClient = {
  listReleasePlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    key_word?: string;
    updated_time_interval?: string;
  }) => Promise<{
    plans: ReleasePlanItem[];
    total?: number;
    page?: number;
    page_size?: number;
    status?: string;
    message?: string | null;
  }>;
};

export function createReqListReleasePlansHandler(client: ReqListReleasePlansClient) {
  return async (input: unknown) => {
    const parsed = reqListReleasePlansInput.parse(input);
    const response = await client.listReleasePlans(parsed);
    const result = mapReleasePlans(
      response.plans,
      response.page ?? parsed.page,
      response.page_size ?? parsed.page_size,
      response.total,
      {
        status: response.status,
        message: response.message
      }
    );
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "category", get: (item) => (item as { category?: string }).category },
            { label: "status", get: (item) => (item as { status?: string }).status }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "release plans",
          serviceLabel: "Req / planservice"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
