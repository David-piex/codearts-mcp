import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListPlanWorkItemsInput } from "../schemas.js";

export function mapReqPlanWorkItems(
  items: Array<{
    id: number | string;
    subject?: string;
    tracker?: {
      id?: number | string;
      name?: string;
    };
    tracker_id?: number | string;
    tracker_name?: string;
    status?: {
      id?: number | string;
      name?: string;
    };
    status_id?: number | string;
    status_name?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number,
  counts?: {
    milestone_cur_count?: number;
    issue_cur_count?: number;
    issues_count?: number;
  }
) {
  const summary =
    total !== undefined
      ? `${items.length} plan work items found in this page (total: ${total})`
      : `${items.length} plan work items found`;
  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      type: item.tracker?.name ?? item.tracker_name,
      typeId: item.tracker?.id ?? item.tracker_id,
      status: item.status?.name ?? item.status_name,
      statusId: item.status?.id ?? item.status_id
    })),
    toPageInfo(page, pageSize, total),
    counts
      ? {
          milestoneCurCount: counts.milestone_cur_count,
          issueCurCount: counts.issue_cur_count,
          issuesCount: counts.issues_count
        }
      : undefined
  );
}

type ReqListPlanWorkItemsClient = {
  listPlanWorkItems: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    subject?: string;
    show_type?: "list" | "tree";
    tracker_id?: number;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      tracker?: {
        id?: number | string;
        name?: string;
      };
      tracker_id?: number | string;
      tracker_name?: string;
      status?: {
        id?: number | string;
        name?: string;
      };
      status_id?: number | string;
      status_name?: string;
    }>;
    total?: number;
    milestone_cur_count?: number;
    issue_cur_count?: number;
    issues_count?: number;
  }>;
};

export function createReqListPlanWorkItemsHandler(client: ReqListPlanWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListPlanWorkItemsInput.parse(input);
    const response = await client.listPlanWorkItems(parsed);
    const result = mapReqPlanWorkItems(response.work_items, parsed.page, parsed.page_size, response.total, {
      milestone_cur_count: response.milestone_cur_count,
      issue_cur_count: response.issue_cur_count,
      issues_count: response.issues_count
    });
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          keyword: parsed.subject,
          projectId: parsed.project_id,
          resourceLabel: "plan work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
