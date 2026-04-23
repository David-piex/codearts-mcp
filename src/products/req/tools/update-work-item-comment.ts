import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateWorkItemCommentInput } from "../schemas.js";

export function previewUpdateWorkItemComment(input: {
  project_id: string;
  work_item_id: string;
  comment_id: string;
  content: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update comment ${input.comment_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    commentId: input.comment_id,
    content: input.content,
    executed: false
  });
}

export function mapUpdatedWorkItemComment(input: {
  work_item_id: string;
  comment_id: string;
  content: string;
  status?: string;
}) {
  return asItemResult(`Updated comment ${input.comment_id}`, {
    workItemId: input.work_item_id,
    commentId: input.comment_id,
    content: input.content,
    status: input.status,
    executed: true
  });
}

type ReqUpdateWorkItemCommentClient = {
  updateWorkItemComment: (input: {
    project_id: string;
    work_item_id: string;
    comment_id: string;
    content: string;
  }) => Promise<{
    work_item_id: string;
    comment_id: string;
    content: string;
    status?: string;
  }>;
};

export function createReqUpdateWorkItemCommentHandler(client: ReqUpdateWorkItemCommentClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateWorkItemCommentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateWorkItemComment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateWorkItemComment(parsed);
    const result = mapUpdatedWorkItemComment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
