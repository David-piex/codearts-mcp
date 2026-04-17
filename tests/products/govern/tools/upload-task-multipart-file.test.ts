import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createGovernUploadTaskMultipartFileHandler } from "../../../../src/products/govern/tools/upload-task-multipart-file.js";

describe("createGovernUploadTaskMultipartFileHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernUploadTaskMultipartFileHandler({
      uploadMultipartTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      part_number: 1,
      part_size: 5,
      local_file: "D:/tmp/chunk.bin",
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      filePath: "/tmp/demo.bin",
      fileName: "demo.bin",
      uploadId: "upload-1",
      partNumber: 1,
      partSize: 5,
      localFile: "D:/tmp/chunk.bin",
      executed: false
    });
  });

  it("reads the local chunk file and maps upload output", async () => {
    const dir = mkdtempSync(join(tmpdir(), "govern-upload-"));
    const chunkPath = join(dir, "chunk.bin");
    writeFileSync(chunkPath, Buffer.from("hello"));

    const handler = createGovernUploadTaskMultipartFileHandler({
      uploadMultipartTask: async (input) => ({
        file_path: input.file_path,
        file_name: input.file_name,
        upload_id: input.upload_id,
        part_number: input.part_number
      })
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/tmp/demo.bin",
      file_name: "demo.bin",
      upload_id: "upload-1",
      part_number: 1,
      part_size: 5,
      local_file: chunkPath,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      filePath: "/tmp/demo.bin",
      fileName: "demo.bin",
      uploadId: "upload-1",
      partNumber: 1,
      executed: true
    });
  });
});
