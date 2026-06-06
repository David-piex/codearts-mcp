import { describe, expect, it, vi } from "vitest";
import {
  createTestPlanUploadResourceAttachmentHandler
} from "../../../../src/products/testplan/tools/upload-resource-attachment.js";

describe("testplan upload resource attachment handler", () => {
  it("returns dry-run preview by default", async () => {
    const handler = createTestPlanUploadResourceAttachmentHandler({
      uploadResourceAttachment: vi.fn()
    });

    const result = await handler({
      project_id: "project-1",
      resource_uri: "case-1",
      resource_type: "TestCase",
      version_uri: "version-1",
      file_path: "demo.png"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      resourceUri: "case-1",
      fileName: "demo.png",
      executed: false
    });
  });

  it("uploads attachment when dry_run is false", async () => {
    const fixture = "D:/Code/codearts-mcp/tests/fixtures/req-upload-image.png";
    const handler = createTestPlanUploadResourceAttachmentHandler({
      uploadResourceAttachment: vi.fn(async () => ({
        value: { id: "attachment-1" },
        raw: { status: "success", result: { id: "attachment-1" } }
      }))
    });

    const result = await handler({
      project_id: "project-1",
      resource_uri: "case-1",
      resource_type: "TestCase",
      version_uri: "version-1",
      file_path: fixture,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "case-1",
      resourceUri: "case-1",
      fileName: "req-upload-image.png",
      value: { id: "attachment-1" },
      executed: true
    });
  });
});
