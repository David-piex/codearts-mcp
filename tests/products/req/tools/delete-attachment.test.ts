import { describe, expect, it } from "vitest";
import { reqDeleteAttachmentInput as reqDeleteAttachmentInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteAttachmentInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqDeleteAttachmentHandler,
  mapDeletedAttachment,
  previewDeleteAttachment
} from "../../../../src/products/req/tools/delete-attachment.js";

describe("previewDeleteAttachment", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeleteAttachment({
      project_id: "p-1",
      work_item_id: "wi-9",
      attachment_id: "72372",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      attachmentId: "72372",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedAttachment", () => {
  it("returns normalized deleted attachment data", () => {
    const result = mapDeletedAttachment({
      project_id: "p-1",
      work_item_id: "wi-9",
      attachment_id: "72372"
    });

    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      attachmentId: "72372",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeleteAttachmentInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      attachment_id: "72372"
    };

    expect(reqDeleteAttachmentInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteAttachmentInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqDeleteAttachmentHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqDeleteAttachmentHandler({
      deleteAttachment: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      attachment_id: "72372",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      attachmentId: "72372",
      deleted: false,
      executed: false
    });
  });

  it("maps deleted attachment into MCP output", async () => {
    const handler = createReqDeleteAttachmentHandler({
      deleteAttachment: async () => ({
        project_id: "p-1",
        work_item_id: "wi-9",
        attachment_id: "72372",
        deleted: true as const
      })
    });

    const result = await handler({
      project_id: "p-1",
      work_item_id: "wi-9",
      attachment_id: "72372",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      attachmentId: "72372",
      deleted: true,
      executed: true
    });
  });
});
