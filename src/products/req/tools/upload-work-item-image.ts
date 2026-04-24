import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUploadWorkItemImageInput } from "../schemas.js";

function detectImageContentType(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.endsWith(".png")) {
    return "image/png";
  }
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) {
    return "image/jpeg";
  }
  if (normalized.endsWith(".gif")) {
    return "image/gif";
  }
  if (normalized.endsWith(".webp")) {
    return "image/webp";
  }
  if (normalized.endsWith(".svg")) {
    return "image/svg+xml";
  }
  if (normalized.endsWith(".bmp")) {
    return "image/bmp";
  }

  return "application/octet-stream";
}

export function previewUploadWorkItemImage(input: {
  project_id: string;
  file_path: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: upload work item image ${basename(input.file_path)}`, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: basename(input.file_path),
    executed: false
  });
}

export function mapUploadedWorkItemImage(input: {
  project_id: string;
  file_name: string;
  img_id?: string | number;
  img_url?: string;
}) {
  return asItemResult(`Uploaded work item image ${input.file_name}`, {
    projectId: input.project_id,
    fileName: input.file_name,
    imageId: typeof input.img_id !== "undefined" ? String(input.img_id) : undefined,
    imageUrl: input.img_url,
    executed: true
  });
}

type ReqUploadWorkItemImageClient = {
  uploadIssueImage: (input: {
    project_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    project_id: string;
    file_name: string;
    img_id?: string | number;
    img_url?: string;
  }>;
};

export function createReqUploadWorkItemImageHandler(client: ReqUploadWorkItemImageClient) {
  return async (input: unknown) => {
    const parsed = reqUploadWorkItemImageInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUploadWorkItemImage(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadIssueImage({
      project_id: parsed.project_id,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectImageContentType(fileName)
    });
    const result = mapUploadedWorkItemImage(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
