import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemIssueDetailsInput } from "../schemas.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqWorkItemSummary = {
  id: number | string;
  subject: string;
  status?: { id?: number | string; name?: string };
  tracker_name?: string;
  description?: string;
  start_date?: string | number;
  due_date?: string | number;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
};

type ReqWorkItemComment = {
  id: number | string;
  comment?: string;
  created_time?: string;
  timestamp?: number;
  user?: {
    nick_name?: string;
    user_name?: string;
    user_num_id?: number;
  };
};

export function mapReqWorkItemIssueDetails(input: {
  workItem: ReqWorkItemSummary;
  comments: ReqWorkItemComment[];
}) {
  const assignee = mapReqWorkItemAssignee(input.workItem);
  const latestComment = [...input.comments]
    .sort((left, right) => {
      const leftOrder = left.timestamp ?? 0;
      const rightOrder = right.timestamp ?? 0;
      return rightOrder - leftOrder;
    })[0];

  return asItemResult(`Loaded work item issue details ${input.workItem.id}`, {
    id: String(input.workItem.id),
    title: input.workItem.subject,
    description: input.workItem.description,
    createdOn: undefined,
    updatedOn: undefined,
    status: input.workItem.status,
    tracker: input.workItem.tracker_name ? { name: input.workItem.tracker_name } : undefined,
    assignee,
    assignedToName: assignee?.displayName,
    project: undefined,
    module: undefined,
    parentIssue: undefined,
    customFields: [],
    attachments: [],
    latestComment: latestComment?.comment,
    comments: input.comments.map((comment) => ({
      id: String(comment.id),
      content: comment.comment,
      createdTime: comment.created_time,
      timestamp: comment.timestamp,
      author: comment.user
        ? {
            nickName: comment.user.nick_name,
            userName: comment.user.user_name,
            userNumId: comment.user.user_num_id
          }
        : undefined
    }))
  });
}

type ReqGetWorkItemIssueDetailsClient = {
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<ReqWorkItemSummary>;
  listWorkItemComments: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    comments: ReqWorkItemComment[];
    total?: number;
  }>;
};

export function createReqGetWorkItemIssueDetailsHandler(client: ReqGetWorkItemIssueDetailsClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemIssueDetailsInput.parse(input);
    const [workItem, commentResponse] = await Promise.all([
      client.getWorkItem({
        project_id: parsed.project_id,
        work_item_id: parsed.work_item_id
      }),
      client.listWorkItemComments({
        project_id: parsed.project_id,
        work_item_id: parsed.work_item_id,
        page: 1,
        page_size: 100
      })
    ]);
    const result = mapReqWorkItemIssueDetails({
      workItem,
      comments: commentResponse.comments
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
