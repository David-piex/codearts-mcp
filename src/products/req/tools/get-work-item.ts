import { asItemResult } from "../../../contracts/tool-result.js";
import { formatItemToolText } from "../../../contracts/tool-result-text.js";
import { reqGetWorkItemInput } from "../schemas.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

export function mapReqWorkItem(input: {
  id: number | string;
  subject: string;
  status?: { name?: string };
  tracker_name?: string;
  description?: string;
  created_on?: string | number;
  updated_on?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
}) {
  const assignee = mapReqWorkItemAssignee(input);
  const assigneeText = assignee?.displayName ? ` (assignee: ${assignee.displayName})` : "";

  return asItemResult(`Loaded work item ${input.id}${assigneeText}`, {
    id: String(input.id),
    title: input.subject,
    status: input.status?.name,
    type: input.tracker_name,
    description: input.description,
    createdOn: input.created_on,
    updatedOn: input.updated_on,
    startDate: input.start_date,
    dueDate: input.due_date,
    assignee,
    assignedToName: assignee?.displayName
  });
}

type ReqGetWorkItemClient = {
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
    description?: string;
    created_on?: string | number;
    updated_on?: string | number;
    start_date?: string | number;
    due_date?: string | number;
    assigned_to?: ReqWorkItemAssignee;
    assigned_user?: ReqWorkItemAssignee;
    assigned_id?: string;
    assigned_to_id?: number | string;
  }>;
};

export function createReqGetWorkItemHandler(client: ReqGetWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemInput.parse(input);
    const response = await client.getWorkItem(parsed);
    const result = mapReqWorkItem(response);
    const text = formatItemToolText(result, {
      fields: [
        { label: "id", get: (item) => item.id },
        { label: "title", get: (item) => item.title },
        { label: "status", get: (item) => item.status },
        { label: "type", get: (item) => item.type },
        { label: "assignee", get: (item) => item.assignedToName },
        { label: "description", get: (item) => item.description },
        { label: "createdOn", get: (item) => item.createdOn },
        { label: "updatedOn", get: (item) => item.updatedOn },
        { label: "startDate", get: (item) => item.startDate },
        { label: "dueDate", get: (item) => item.dueDate }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
