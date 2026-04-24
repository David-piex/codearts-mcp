import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUploadAttachmentInput } from "../schemas.js";

function detectAttachmentContentType(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".gif")) return "image/gif";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  if (normalized.endsWith(".bmp")) return "image/bmp";
  if (normalized.endsWith(".pdf")) return "application/pdf";
  if (normalized.endsWith(".json")) return "application/json";
  if (normalized.endsWith(".txt")) return "text/plain";

  return "application/octet-stream";
}

export function previewUploadAttachment(input: {
  project_id: string;
  work_item_id: string;
  file_path: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: upload attachment ${basename(input.file_path)}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    filePath: input.file_path,
    fileName: basename(input.file_path),
    executed: false
  });
}

export function mapUploadedAttachment(input: {
  project_id: string;
  work_item_id: string;
  attachment_id: string;
  disk_filename?: string;
  file_name?: string;
  size?: string;
}) {
  return asItemResult(`Uploaded attachment ${input.file_name ?? input.attachment_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    attachmentId: input.attachment_id,
    diskFileName: input.disk_filename,
    fileName: input.file_name,
    size: input.size,
    executed: true
  });
}

type ReqUploadAttachmentClient = {
  uploadAttachment: (input: {
    project_id: string;
    work_item_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    disk_filename?: string;
    file_name?: string;
    size?: string;
  }>;
};

export function createReqUploadAttachmentHandler(client: ReqUploadAttachmentClient) {
  return async (input: unknown) => {
    const parsed = reqUploadAttachmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUploadAttachment(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadAttachment({
      project_id: parsed.project_id,
      work_item_id: parsed.work_item_id,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectAttachmentContentType(fileName)
    });
    const result = mapUploadedAttachment(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
