import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteAttachmentInput } from "../schemas.js";

export function previewDeleteAttachment(input: {
  project_id: string;
  work_item_id: string;
  attachment_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete attachment ${input.attachment_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    attachmentId: input.attachment_id,
    deleted: false,
    executed: false
  });
}

export function mapDeletedAttachment(input: {
  project_id: string;
  work_item_id: string;
  attachment_id: string;
}) {
  return asItemResult(`Deleted attachment ${input.attachment_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    attachmentId: input.attachment_id,
    deleted: true,
    executed: true
  });
}

type ReqDeleteAttachmentClient = {
  deleteAttachment: (input: {
    project_id: string;
    work_item_id: string;
    attachment_id: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    deleted: true;
  }>;
};

export function createReqDeleteAttachmentHandler(client: ReqDeleteAttachmentClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteAttachmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteAttachment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteAttachment(parsed);
    const result = mapDeletedAttachment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
