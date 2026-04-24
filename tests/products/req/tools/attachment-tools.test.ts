import { describe, expect, it, vi } from "vitest";
import {
  reqDownloadAttachmentInput as reqDownloadAttachmentInputFromBarrel,
  reqUploadAttachmentInput as reqUploadAttachmentInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqDownloadAttachmentInput,
  reqUploadAttachmentInput
} from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqDownloadAttachmentHandler,
  mapReqDownloadedAttachment
} from "../../../../src/products/req/tools/download-attachment.js";
import {
  createReqUploadAttachmentHandler,
  mapUploadedAttachment,
  previewUploadAttachment
} from "../../../../src/products/req/tools/upload-attachment.js";

describe("req attachment schema exports", () => {
  it("keeps upload attachment schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "70779173",
      file_path: "C:/tmp/demo.txt"
    };

    expect(reqUploadAttachmentInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUploadAttachmentInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("keeps download attachment schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "70779173",
      attachment_id: "72372"
    };

    expect(reqDownloadAttachmentInput.parse(input)).toEqual(input);
    expect(reqDownloadAttachmentInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("previewUploadAttachment", () => {
  it("returns normalized dry-run data", () => {
    const result = previewUploadAttachment({
      project_id: "project-1",
      work_item_id: "70779173",
      file_path: "C:/tmp/demo.txt",
      dry_run: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      filePath: "C:/tmp/demo.txt",
      fileName: "demo.txt",
      executed: false
    });
  });
});

describe("mapUploadedAttachment", () => {
  it("returns normalized uploaded attachment data", () => {
    const result = mapUploadedAttachment({
      project_id: "project-1",
      work_item_id: "70779173",
      attachment_id: "72372",
      disk_filename: "disk-demo",
      file_name: "demo.txt",
      size: "4"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      diskFileName: "disk-demo",
      fileName: "demo.txt",
      size: "4",
      executed: true
    });
  });
});

describe("createReqUploadAttachmentHandler", () => {
  it("returns dry-run output when requested", async () => {
    const handler = createReqUploadAttachmentHandler({
      uploadAttachment: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      work_item_id: "70779173",
      file_path: "C:/tmp/demo.txt",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      filePath: "C:/tmp/demo.txt",
      fileName: "demo.txt",
      executed: false
    });
  });

  it("returns normalized uploaded attachment output", async () => {
    const handler = createReqUploadAttachmentHandler({
      uploadAttachment: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "70779173",
        attachment_id: "72372",
        disk_filename: "disk-demo",
        file_name: "req-upload-image.png",
        size: "4"
      }))
    });

    const result = await handler({
      project_id: "project-1",
      work_item_id: "70779173",
      file_path: "D:/Code/codearts-mcp/tests/fixtures/req-upload-image.png",
      dry_run: false
    });

    expect(result.content[0]?.text).toContain("Uploaded attachment req-upload-image.png");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      diskFileName: "disk-demo",
      fileName: "req-upload-image.png",
      size: "4",
      executed: true
    });
  });
});

describe("mapReqDownloadedAttachment", () => {
  it("returns normalized downloaded attachment data", () => {
    const result = mapReqDownloadedAttachment({
      project_id: "project-1",
      work_item_id: "70779173",
      attachment_id: "72372",
      body: new Uint8Array([1, 2, 3, 4]),
      content_type: "text/plain",
      file_name: "demo.txt"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      fileName: "demo.txt",
      contentType: "text/plain",
      sizeBytes: 4,
      contentBase64: "AQIDBA=="
    });
  });
});

describe("createReqDownloadAttachmentHandler", () => {
  it("returns normalized downloaded attachment output", async () => {
    const client = {
      downloadAttachment: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "70779173",
        attachment_id: "72372",
        body: new Uint8Array([1, 2, 3, 4]),
        content_type: "text/plain",
        file_name: "demo.txt"
      }))
    };
    const handler = createReqDownloadAttachmentHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "70779173",
      attachment_id: "72372"
    });

    expect(client.downloadAttachment).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "70779173",
      attachment_id: "72372"
    });
    expect(result.content[0]?.text).toContain("Downloaded attachment demo.txt");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      fileName: "demo.txt",
      contentType: "text/plain",
      sizeBytes: 4,
      contentBase64: "AQIDBA=="
    });
  });
});
