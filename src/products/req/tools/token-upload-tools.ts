import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import {
  reqCreateWorkItemWithAttachmentV3Input,
  reqUploadAttachmentV3Input,
  reqUploadWorkItemImageV2Input
} from "../schemas.js";

function detectContentType(fileName: string) {
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

function previewTokenFileOperation(summary: string, input: { file_path: string }) {
  return asItemResult(summary, {
    filePath: input.file_path,
    fileName: basename(input.file_path),
    executed: false
  });
}

export function mapUploadedWorkItemImageV2(input: {
  project_id: string;
  file_name: string;
  img_id?: string | number;
  img_url?: string;
}) {
  return asItemResult(`Uploaded V2 work item image ${input.file_name}`, {
    projectId: input.project_id,
    fileName: input.file_name,
    imageId: typeof input.img_id === "undefined" ? undefined : String(input.img_id),
    imageUrl: input.img_url,
    executed: true
  });
}

export function mapUploadedAttachmentV3(input: {
  file_name: string;
  response: unknown;
}) {
  return asItemResult(`Uploaded V3 work item attachment ${input.file_name}`, {
    fileName: input.file_name,
    executed: true
  }, input.response);
}

export function mapCreatedWorkItemWithAttachmentV3(input: {
  response: unknown;
}) {
  return asItemResult("Created V3 work item with attachment payload", {
    executed: true
  }, input.response);
}

type ReqTokenUploadClient = {
  uploadIssueImageV2: (input: {
    project_id: string;
    file_name: string;
    file_content: Uint8Array;
    x_auth_token: string;
    content_type?: string;
  }) => Promise<{
    project_id: string;
    file_name: string;
    img_id?: string | number;
    img_url?: string;
  }>;
  uploadAttachmentV3: (input: {
    file_name: string;
    file_content: Uint8Array;
    tiny_form_datas: string;
    x_auth_token: string;
    content_type?: string;
  }) => Promise<{
    file_name: string;
    response: unknown;
  }>;
  createWorkItemWithAttachmentV3: (input: {
    issue_call_back_param: Record<string, unknown>;
    type: string;
    x_auth_token: string;
  }) => Promise<{
    response: unknown;
  }>;
};

export function createReqUploadWorkItemImageV2Handler(client: Pick<ReqTokenUploadClient, "uploadIssueImageV2">) {
  return async (input: unknown) => {
    const parsed = reqUploadWorkItemImageV2Input.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: upload V2 work item image ${basename(parsed.file_path)}`, {
        projectId: parsed.project_id,
        filePath: parsed.file_path,
        fileName: basename(parsed.file_path),
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadIssueImageV2({
      project_id: parsed.project_id,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      x_auth_token: parsed.x_auth_token,
      content_type: detectContentType(fileName)
    });
    const result = mapUploadedWorkItemImageV2(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createReqUploadAttachmentV3Handler(client: Pick<ReqTokenUploadClient, "uploadAttachmentV3">) {
  return async (input: unknown) => {
    const parsed = reqUploadAttachmentV3Input.parse(input);

    if (parsed.dry_run) {
      const result = previewTokenFileOperation(
        `Dry run: upload V3 work item attachment ${basename(parsed.file_path)}`,
        parsed
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadAttachmentV3({
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      tiny_form_datas: parsed.tiny_form_datas,
      x_auth_token: parsed.x_auth_token,
      content_type: detectContentType(fileName)
    });
    const result = mapUploadedAttachmentV3(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createReqCreateWorkItemWithAttachmentV3Handler(
  client: Pick<ReqTokenUploadClient, "createWorkItemWithAttachmentV3">
) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemWithAttachmentV3Input.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: create V3 work item with attachment payload", {
        type: parsed.type,
        issueCallBackParam: parsed.issue_call_back_param,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItemWithAttachmentV3(parsed);
    const result = mapCreatedWorkItemWithAttachmentV3(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
