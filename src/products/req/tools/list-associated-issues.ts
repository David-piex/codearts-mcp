import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListAssociatedIssuesInput, reqListAssociatedIssuesV4Input } from "../schemas.js";

export function mapReqAssociatedIssues(
  items: Array<{
    id: number | string;
    subject?: string;
    status_id?: number;
    status_name?: string;
    new_status_name?: string;
    status_attribute_name?: string;
    project_name?: string;
    identifier?: string;
    assigned_to?: {
      assigned_user_id?: string;
      assigned_user_num_id?: number;
      assigned_nick_name?: string;
      name?: string;
    };
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} associated issues found`,
    items.map((item) => ({
      id: String(item.id),
      title: item.subject,
      statusId: item.status_id,
      status: item.status_name,
      newStatus: item.new_status_name,
      statusCategory: item.status_attribute_name,
      projectName: item.project_name,
      identifier: item.identifier,
      assignee: item.assigned_to
        ? {
            userId: item.assigned_to.assigned_user_id,
            userNumId: item.assigned_to.assigned_user_num_id,
            nickName: item.assigned_to.assigned_nick_name,
            name: item.assigned_to.name
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListAssociatedIssuesClient = {
  listAssociatedIssues: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<{
      id: number | string;
      subject?: string;
      status_id?: number;
      status_name?: string;
      new_status_name?: string;
      status_attribute_name?: string;
      project_name?: string;
      identifier?: string;
      assigned_to?: {
        assigned_user_id?: string;
        assigned_user_num_id?: number;
        assigned_nick_name?: string;
        name?: string;
      };
    }>;
    total?: number;
  }>;
};

export function createReqListAssociatedIssuesHandler(client: ReqListAssociatedIssuesClient) {
  return async (input: unknown) => {
    const parsed = reqListAssociatedIssuesInput.parse(input);
    const response = await client.listAssociatedIssues(parsed);
    const result = mapReqAssociatedIssues(response.issues, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "associated issues",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export function mapReqAssociatedIssuesV4(
  items: Array<{
    issue_id?: number | string;
    id?: number | string;
    subject?: string;
    status?: {
      id?: number | string;
      name?: string;
    };
    user?: {
      id?: number | string;
      name?: string;
      nick_name?: string;
      first_name?: string;
      last_name?: string;
    };
    project?: {
      project_id?: string;
      project_name?: string;
      name?: string;
    };
  } & Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number,
  raw?: unknown
) {
  return asListResult(
    `${items.length} associated issues found from V4`,
    items.map((item) => ({
      id: typeof item.issue_id !== "undefined" ? String(item.issue_id) : typeof item.id !== "undefined" ? String(item.id) : undefined,
      title: item.subject,
      statusId: item.status?.id,
      status: item.status?.name,
      projectId: item.project?.project_id,
      projectName: item.project?.project_name ?? item.project?.name,
      assignee: item.user
        ? {
            id: typeof item.user.id !== "undefined" ? String(item.user.id) : undefined,
            name: item.user.nick_name ?? item.user.name ?? item.user.first_name ?? item.user.last_name
          }
        : undefined,
      rawIssue: item
    })),
    toPageInfo(page, pageSize, total),
    raw
  );
}

type ReqListAssociatedIssuesV4Client = {
  listAssociatedIssuesV4: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<{
      issue_id?: number | string;
      id?: number | string;
      subject?: string;
      status?: {
        id?: number | string;
        name?: string;
      };
      user?: {
        id?: number | string;
        name?: string;
        nick_name?: string;
        first_name?: string;
        last_name?: string;
      };
      project?: {
        project_id?: string;
        project_name?: string;
        name?: string;
      };
    } & Record<string, unknown>>;
    total?: number;
    raw?: unknown;
  }>;
};

export function createReqListAssociatedIssuesV4Handler(client: ReqListAssociatedIssuesV4Client) {
  return async (input: unknown) => {
    const parsed = reqListAssociatedIssuesV4Input.parse(input);
    const response = await client.listAssociatedIssuesV4(parsed);
    const result = mapReqAssociatedIssuesV4(response.issues, parsed.page, parsed.page_size, response.total, response.raw);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "associated issues",
          serviceLabel: "Req / ProjectMan V4"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
