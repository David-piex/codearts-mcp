import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListParentWorkItemsInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqParentWorkItem = {
  [key: string]: unknown;
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
  created_on?: string | number;
  updated_on?: string | number;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
};

function mapParentWorkItem(item: ReqParentWorkItem, relation: "self" | "parent") {
  const assignee = mapReqWorkItemAssignee(item);
  const createdOn = item.created_on;
  const updatedOn = item.updated_on;

  return {
    id: String(item.id),
    relation,
    title: item.subject ?? item.name ?? "",
    status: item.status?.name,
    type: item.tracker_name ?? item.tracker?.name,
    createdOn,
    createdOnText: formatReqTimestampText(createdOn),
    updatedOn,
    updatedOnText: formatReqTimestampText(updatedOn),
    assignee,
    assignedToName: assignee?.displayName,
    rawWorkItem: item
  };
}

export function mapReqParentWorkItems(input: {
  issue?: ReqParentWorkItem;
  parent_issues: ReqParentWorkItem[];
}) {
  const items = [
    ...(input.issue ? [mapParentWorkItem(input.issue, "self" as const)] : []),
    ...input.parent_issues.map((item) => mapParentWorkItem(item, "parent" as const))
  ];

  return asListResult(
    `${items.length} parent work item entries found`,
    items,
    undefined,
    {
      issue: input.issue,
      parent_issues: input.parent_issues
    }
  );
}

type ReqListParentWorkItemsClient = {
  listParentWorkItems: (input: {
    project_id: string;
    work_item_id: string;
  }) => Promise<{
    issue?: ReqParentWorkItem;
    parent_issues: ReqParentWorkItem[];
  }>;
};

export function createReqListParentWorkItemsHandler(client: ReqListParentWorkItemsClient) {
  return async (input: unknown) => {
    const parsed = reqListParentWorkItemsInput.parse(input);
    const response = await client.listParentWorkItems(parsed);
    const result = mapReqParentWorkItems(response);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "relation", get: (item) => (item as { relation?: string }).relation },
        { label: "title", get: (item) => (item as { title?: string }).title },
        { label: "status", get: (item) => (item as { status?: string }).status },
        { label: "type", get: (item) => (item as { type?: string }).type },
        { label: "assignee", get: (item) => (item as { assignedToName?: string }).assignedToName }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
