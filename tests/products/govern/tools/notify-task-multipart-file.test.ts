import { describe, expect, it } from "vitest";
import { createGovernNotifyTaskMultipartFileHandler } from "../../../../src/products/govern/tools/notify-task-multipart-file.js";

describe("createGovernNotifyTaskMultipartFileHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernNotifyTaskMultipartFileHandler({
      notifyMultipartTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      filePath: "/tmp/demo.bin",
      fileName: "demo.bin",
      uploadId: "upload-1",
      executed: false
    });
  });

  it("maps notify multipart task into MCP output", async () => {
    const handler = createGovernNotifyTaskMultipartFileHandler({
      notifyMultipartTask: async () => ({
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1"
      })
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      filePath: "/tmp/demo.bin",
      fileName: "demo.bin",
      uploadId: "upload-1",
      executed: true
    });
  });
});
