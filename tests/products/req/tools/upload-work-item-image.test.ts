import { describe, expect, it } from "vitest";
import { reqUploadWorkItemImageInput as reqUploadWorkItemImageInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUploadWorkItemImageInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqUploadWorkItemImageHandler,
  mapUploadedWorkItemImage,
  previewUploadWorkItemImage
} from "../../../../src/products/req/tools/upload-work-item-image.js";

describe("previewUploadWorkItemImage", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUploadWorkItemImage({
      project_id: "p-1",
      file_path: "D:/tmp/demo.png",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      filePath: "D:/tmp/demo.png",
      fileName: "demo.png",
      executed: false
    });
  });
});

describe("mapUploadedWorkItemImage", () => {
  it("returns normalized uploaded image data", () => {
    const result = mapUploadedWorkItemImage({
      project_id: "p-1",
      file_name: "demo.png",
      img_id: "1",
      img_url: "/v1/upload/demo/202604/demo.png"
    });

    expect(result.item).toEqual({
      projectId: "p-1",
      fileName: "demo.png",
      imageId: "1",
      imageUrl: "/v1/upload/demo/202604/demo.png",
      executed: true
    });
  });
});

describe("reqUploadWorkItemImageInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      file_path: "D:/tmp/demo.png"
    };

    expect(reqUploadWorkItemImageInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUploadWorkItemImageInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUploadWorkItemImageHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createReqUploadWorkItemImageHandler({
      uploadIssueImage: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "p-1",
      file_path: "D:/tmp/demo.png",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      filePath: "D:/tmp/demo.png",
      fileName: "demo.png",
      executed: false
    });
  });

  it("maps uploaded work item image into MCP output", async () => {
    const handler = createReqUploadWorkItemImageHandler({
      uploadIssueImage: async (input) => ({
        project_id: input.project_id,
        file_name: input.file_name,
        img_id: "1",
        img_url: "/v1/upload/demo/202604/demo.png"
      })
    });

    const result = await handler({
      project_id: "p-1",
      file_path: "D:/Code/codearts-mcp/tests/fixtures/req-upload-image.png",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "p-1",
      fileName: "req-upload-image.png",
      imageId: "1",
      imageUrl: "/v1/upload/demo/202604/demo.png",
      executed: true
    });
  });
});
