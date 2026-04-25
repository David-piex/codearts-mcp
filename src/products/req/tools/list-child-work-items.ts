import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListChildWorkItemsInput } from "../schemas.js";

type ReqChildIssueUser = {
  name?: string;
  assigned_nick_name?: string;
  assignedNickName?: string;
  first_name?: string;
  firstName?: string;
};

type ReqChildWorkItem = {
  id: number | string;
  subject?: string;
  parent_issue?: {
    id?: number | string;
    subject?: string;
  };
  project?: {
    identifier?: string;
    name?: string;
  };
  tracker?: {
    id?: number | string;
    name?: string;
  };
  status?: {
    id?: number | string;
    name?: string;
  };
  status_attribute?: {
    id?: number | string;
    name?: string;
  };
  severity?: {
    id?: number | string;
    name?: string;
  };
  priority?: {
    id?: number | string;
    name?: string;
  };
  assigned_to?: ReqChildIssueUser;
  done_ratio?: number;
  is_parent?: boolean;
  isParent?: boolean;
};

function pickReqUserDisplayName(input?: ReqChildIssueUser) {
  return (
    input?.assigned_nick_name ??
    input?.assignedNickName ??
    input?.name ??
    input?.first_name ??
    input?.firstName
  );
}

export function mapReqChildWorkItems(
  items: ReqChildWorkItem[],
  page: number,
  pageSize: number,
  total?: number
) {
  const summary =
    total !== undefined
      ? `${items.length} child work items found in this page (total: ${total})`
      : `${items.length} child work items found`;

  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      parentIssueId:
        typeof item.parent_issue?.id !== "undefined" ? String(item.parent_issue.id) : undefined,
      parentIssueTitle: item.parent_issue?.subject,
      projectId: item.project?.identifier,
      projectName: item.project?.name,
      type: item.tracker?.name,
      typeId: item.tracker?.id,
      status: item.status?.name,
      statusId: item.status?.id,
      statusAttribute: item.status_attribute?.name,
      severity: item.severity?.name,
      priority: item.priority?.name,
      assignedTo: pickReqUserDisplayName(item.assigned_to),
      doneRatio: item.done_ratio,
      isParent: item.is_parent ?? item.isParent
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListChildWorkItemsClient = {
  listChildWorkItems: (input: {
    project_id: string;
    parent_id: string;
    page: number;
    page_size: number;
    subject?: string;
    query_type: string;
  }) => Promise<{
    work_items: ReqChildWorkItem[];
    total?: number;
  }>;
};

export function createReqListChildWorkItemsHandler(client: ReqListChildWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListChildWorkItemsInput.parse(input);
    const response = await client.listChildWorkItems(parsed);
    const result = mapReqChildWorkItems(
      response.work_items,
      parsed.page,
      parsed.page_size,
      response.total
    );
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
          resourceLabel: "child work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
