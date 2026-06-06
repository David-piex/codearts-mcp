import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListQueryIssuesInput, reqListWorkItemsInput, reqListWorkItemsV3Input, reqListWorkItemsV4Input } from "../schemas.js";
import {
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";
import {
  mapReqWorkItemSummaryFields,
  type ReqWorkItemSummarySource
} from "./work-item-summary.js";

export type ReqListWorkItem = ReqWorkItemSummarySource & {
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
};

export function mapReqWorkItems(
  items: ReqListWorkItem[],
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined ? `${items.length} work items found in this page (total: ${total})` : `${items.length} work items found`;
  return asListResult(
    summary,
    items.map((item) => ({
      ...mapReqWorkItemSummaryFields(item),
      rawWorkItem: item
    })),
    toPageInfo(page, pageSize, total),
    { workItems: items }
  );
}

export type ReqListWorkItemsClient = {
  listWorkItems: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemsHandler(client: ReqListWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemsInput.parse(input);
    const response = await client.listWorkItems(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "priority", get: (item) => (item as { priorityName?: string }).priorityName },
            { label: "severity", get: (item) => (item as { severityName?: string }).severityName },
            { label: "module", get: (item) => (item as { moduleName?: string }).moduleName },
            { label: "doneRatio", get: (item) => (item as { doneRatio?: number }).doneRatio },
            { label: "createdOn", get: (item) => (item as { createdOnText?: string; createdOn?: string }).createdOnText ?? (item as { createdOn?: string }).createdOn },
            { label: "updatedOn", get: (item) => (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ?? (item as { updatedOn?: string }).updatedOn }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export type ReqListWorkItemsV3Client = {
  listWorkItemsV3: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_id?: string;
  }) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemsV3Handler(client: ReqListWorkItemsV3Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemsV3Input.parse(input);
    const response = await client.listWorkItemsV3(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "priority", get: (item) => (item as { priorityName?: string }).priorityName },
            { label: "severity", get: (item) => (item as { severityName?: string }).severityName },
            { label: "module", get: (item) => (item as { moduleName?: string }).moduleName },
            { label: "doneRatio", get: (item) => (item as { doneRatio?: number }).doneRatio },
            { label: "updatedOn", get: (item) => (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ?? (item as { updatedOn?: string }).updatedOn }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "V3 work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export type ReqListWorkItemsV4Client = {
  listWorkItemsV4: (input: {
    project_id: string;
    page: number;
    page_size: number;
    subject?: string;
    tracker_id?: string;
    status_id?: string;
    assigned_id?: string;
    created_on?: string;
    updated_on?: string;
    due_date?: string;
    custom_fields?: Record<string, unknown>;
  }) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqListWorkItemsV4Handler(client: ReqListWorkItemsV4Client) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemsV4Input.parse(input);
    const response = await client.listWorkItemsV4(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "priority", get: (item) => (item as { priorityName?: string }).priorityName },
            { label: "severity", get: (item) => (item as { severityName?: string }).severityName },
            { label: "module", get: (item) => (item as { moduleName?: string }).moduleName },
            { label: "doneRatio", get: (item) => (item as { doneRatio?: number }).doneRatio },
            { label: "updatedOn", get: (item) => (item as { updatedOnText?: string; updatedOn?: string }).updatedOnText ?? (item as { updatedOn?: string }).updatedOn }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "V4 work items",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}

export type ReqListQueryIssuesClient = {
  listQueryIssues: (input: {
    project_id: string;
    page: number;
    page_size: number;
    show_type?: "kanban" | "simpleParam";
    filters?: Array<Record<string, unknown>>;
    sort?: Array<Record<string, unknown>>;
  }) => Promise<{
    work_items: ReqListWorkItem[];
    total?: number;
  }>;
};

export function createReqListQueryIssuesHandler(client: ReqListQueryIssuesClient) {
  return async (input: unknown) => {
    const parsed = reqListQueryIssuesInput.parse(input);
    const response = await client.listQueryIssues(parsed);
    const result = mapReqWorkItems(response.work_items, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "title", get: (item) => (item as { title?: string }).title },
            { label: "status", get: (item) => (item as { status?: string }).status },
            { label: "type", get: (item) => (item as { type?: string }).type },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName },
            { label: "priority", get: (item) => (item as { priorityName?: string }).priorityName },
            { label: "severity", get: (item) => (item as { severityName?: string }).severityName },
            { label: "module", get: (item) => (item as { moduleName?: string }).moduleName },
            { label: "doneRatio", get: (item) => (item as { doneRatio?: number }).doneRatio }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "query issues",
          serviceLabel: "Req / ProjectMan V2"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
