import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemTreeInput } from "../schemas.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqWorkItemTreeItem = {
  id: number | string;
  subject?: string;
  name?: string;
  status?: {
    id?: number | string;
    name?: string;
  };
  status_name?: string;
  tracker?: {
    id?: number | string;
    name?: string;
  };
  tracker_name?: string;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
  is_parent?: boolean;
  isParent?: boolean;
};

type ReqWorkItemTree = {
  project_id: string;
  page: number;
  page_size: number;
  tracker_ids?: number[];
  work_items: ReqWorkItemTreeItem[];
  total?: number;
};

export function mapReqWorkItemTree(input: ReqWorkItemTree) {
  return asListResult(
    `${input.work_items.length} work items found in tree mode`,
    input.work_items.map((item) => {
      const assignee = mapReqWorkItemAssignee(item);

      return {
        id: String(item.id),
        subject: item.subject ?? item.name ?? "",
        statusName: item.status?.name ?? item.status_name,
        trackerName: item.tracker?.name ?? item.tracker_name,
        assignee,
        assignedToName: assignee?.displayName,
        hasChildren: item.is_parent ?? item.isParent
      };
    }),
    toPageInfo(input.page, input.page_size, input.total)
  );
}

type ReqListWorkItemTreeClient = {
  listWorkItemTree: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
  }) => Promise<ReqWorkItemTree>;
};

export function createReqListWorkItemTreeHandler(client: ReqListWorkItemTreeClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemTreeInput.parse(input);
    const response = await client.listWorkItemTree(parsed);
    const result = mapReqWorkItemTree(response);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "subject", get: (item) => (item as { subject?: string }).subject },
            { label: "status", get: (item) => (item as { statusName?: string }).statusName },
            { label: "tracker", get: (item) => (item as { trackerName?: string }).trackerName },
            { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work items in tree mode",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
