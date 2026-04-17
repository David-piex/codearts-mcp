import { describe, expect, it } from "vitest";
import { createGovernCreateTaskMultipartFileHandler } from "../../../../src/products/govern/tools/create-task-multipart-file.js";

describe("createGovernCreateTaskMultipartFileHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernCreateTaskMultipartFileHandler({
      createMultipartTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      filePath: "/tmp/demo.bin",
      fileName: "demo.bin",
      executed: false
    });
  });

  it("maps created multipart task into MCP output", async () => {
    const handler = createGovernCreateTaskMultipartFileHandler({
      createMultipartTask: async () => ({
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1"
      })
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
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
