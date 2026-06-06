import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanUploadResourceAttachmentInput } from "../schemas.js";

function detectContentType(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".gif")) return "image/gif";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  if (normalized.endsWith(".bmp")) return "image/bmp";
  if (normalized.endsWith(".json")) return "application/json";
  if (normalized.endsWith(".yaml") || normalized.endsWith(".yml")) return "application/yaml";
  if (normalized.endsWith(".txt")) return "text/plain";

  return "application/octet-stream";
}

type UploadResourceAttachmentInput = ReturnType<typeof testPlanUploadResourceAttachmentInput.parse>;

export function previewUploadResourceAttachment(input: UploadResourceAttachmentInput) {
  return asItemResult("Dry run: upload TestPlan resource attachment", {
    projectId: input.project_id,
    resourceUri: input.resource_uri,
    resourceType: input.resource_type,
    versionUri: input.version_uri,
    filePath: input.file_path,
    fileName: basename(input.file_path),
    executed: false
  });
}

export function mapUploadedResourceAttachment(input: {
  project_id: string;
  resource_uri: string;
  resource_type: string;
  version_uri: string;
  file_name: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult("Uploaded TestPlan resource attachment", {
    id: input.resource_uri,
    projectId: input.project_id,
    resourceUri: input.resource_uri,
    resourceType: input.resource_type,
    versionUri: input.version_uri,
    fileName: input.file_name,
    value: input.value,
    executed: true
  }, input.raw);
}

export function createTestPlanUploadResourceAttachmentHandler(client: {
  uploadResourceAttachment: (input: {
    project_id: string;
    resource_uri: string;
    resource_type: string;
    version_uri: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUploadResourceAttachmentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUploadResourceAttachment(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileName = basename(parsed.file_path);
    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadResourceAttachment({
      project_id: parsed.project_id,
      resource_uri: parsed.resource_uri,
      resource_type: parsed.resource_type,
      version_uri: parsed.version_uri,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectContentType(fileName)
    });
    const result = mapUploadedResourceAttachment({
      ...parsed,
      file_name: fileName,
      ...response
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
