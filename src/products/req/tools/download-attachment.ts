import { Buffer } from "node:buffer";
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDownloadAttachmentInput } from "../schemas.js";

export function mapReqDownloadedAttachment(input: {
  project_id: string;
  work_item_id: string;
  attachment_id: string;
  body: Uint8Array;
  content_type?: string;
  file_name?: string;
}) {
  return asItemResult(`Downloaded attachment ${input.file_name ?? input.attachment_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    attachmentId: input.attachment_id,
    fileName: input.file_name,
    contentType: input.content_type,
    sizeBytes: input.body.byteLength,
    contentBase64: Buffer.from(input.body).toString("base64")
  });
}

type ReqDownloadAttachmentClient = {
  downloadAttachment: (input: {
    project_id: string;
    work_item_id: string;
    attachment_id: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
};

export function createReqDownloadAttachmentHandler(client: ReqDownloadAttachmentClient) {
  return async (input: unknown) => {
    const parsed = reqDownloadAttachmentInput.parse(input);
    const response = await client.downloadAttachment(parsed);
    const result = mapReqDownloadedAttachment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
