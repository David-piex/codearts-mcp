import { asItemResult } from "../../../contracts/tool-result.js";
import { reqAddWorkItemCommentInput } from "../schemas.js";

export function previewAddWorkItemComment(input: {
  project_id: string;
  work_item_id: string;
  content: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: add comment to work item ${input.work_item_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    content: input.content,
    executed: false
  });
}

export function mapAddedWorkItemComment(input: {
  work_item_id: string;
  content: string;
}) {
  return asItemResult(`Added comment to work item ${input.work_item_id}`, {
    workItemId: input.work_item_id,
    content: input.content,
    executed: true
  });
}

type ReqAddWorkItemCommentClient = {
  addWorkItemComment: (input: {
    project_id: string;
    work_item_id: string;
    content: string;
  }) => Promise<{
    work_item_id: string;
    content: string;
  }>;
};

export function createReqAddWorkItemCommentHandler(client: ReqAddWorkItemCommentClient) {
  return async (input: unknown) => {
    const parsed = reqAddWorkItemCommentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddWorkItemComment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addWorkItemComment(parsed);
    const result = mapAddedWorkItemComment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
