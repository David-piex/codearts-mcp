import { describe, expect, it } from "vitest";
import {
  createTestPlanAssociateAttachmentsHandler
} from "../../../../src/products/testplan/tools/associate-attachments.js";

describe("testplan associate attachments handler", () => {
  it("returns dry-run preview by default", async () => {
    const handler = createTestPlanAssociateAttachmentsHandler({
      associateAttachments: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      resource_uri: "case-1",
      attachments: [{ file_name: "evidence.png", doc_id: "doc-1" }],
      resource_type: "TestCase",
      system_type: "docman",
      version_uri: "version-1"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      resourceUri: "case-1",
      attachmentCount: 1,
      fileNames: ["evidence.png"],
      executed: false
    });
  });

  it("executes association when dry_run is false", async () => {
    const handler = createTestPlanAssociateAttachmentsHandler({
      associateAttachments: async (input) => ({
        project_id: input.project_id,
        resource_uri: input.resource_uri,
        value: "success",
        raw: { status: "success", result: "success" }
      })
    });

    const result = await handler({
      project_id: "project-1",
      resource_uri: "case-1",
      attachments: [{ file_name: "evidence.png", doc_id: "doc-1" }],
      resource_type: "TestCase",
      system_type: "docman",
      version_uri: "version-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "case-1",
      resourceUri: "case-1",
      attachmentCount: 1,
      value: "success",
      executed: true
    });
  });
});
