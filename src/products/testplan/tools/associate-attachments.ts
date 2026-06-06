import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanAssociateAttachmentsInput } from "../schemas.js";

type AssociateAttachmentsInput = ReturnType<typeof testPlanAssociateAttachmentsInput.parse>;

export function previewAssociateAttachments(input: AssociateAttachmentsInput) {
  return asItemResult("Dry run: associate TestPlan attachments", {
    projectId: input.project_id,
    resourceUri: input.resource_uri,
    resourceType: input.resource_type,
    systemType: input.system_type,
    versionUri: input.version_uri,
    attachmentCount: input.attachments.length,
    fileNames: input.attachments.map((attachment) => attachment.file_name),
    executed: false
  });
}

export function mapAssociatedAttachments(input: {
  project_id: string;
  resource_uri: string;
  resource_type: string;
  system_type: string;
  version_uri?: string;
  attachments: Array<{ file_name: string }>;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult("Associated TestPlan attachments", {
    id: input.resource_uri,
    projectId: input.project_id,
    resourceUri: input.resource_uri,
    resourceType: input.resource_type,
    systemType: input.system_type,
    versionUri: input.version_uri,
    attachmentCount: input.attachments.length,
    fileNames: input.attachments.map((attachment) => attachment.file_name),
    value: input.value,
    executed: true
  }, input.raw);
}

export function createTestPlanAssociateAttachmentsHandler(client: {
  associateAttachments: (input: Omit<AssociateAttachmentsInput, "dry_run">) => Promise<{
    project_id: string;
    resource_uri: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanAssociateAttachmentsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAssociateAttachments(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.associateAttachments(parsed);
    const result = mapAssociatedAttachments({
      ...parsed,
      ...response
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
