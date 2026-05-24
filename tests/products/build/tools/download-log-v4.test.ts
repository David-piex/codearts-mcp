import { describe, expect, it } from "vitest";
import {
  createBuildDownloadBuildLogV4Handler,
  createBuildDownloadTaskLogV4Handler
} from "../../../../src/products/build/tools/additional-read-tools.js";

describe("Build v4 log download handlers", () => {
  it("maps a full log file response", async () => {
    const handler = createBuildDownloadBuildLogV4Handler({
      downloadBuildLogV4: async () => ({
        record_id: "record-1",
        log_level: "DEBUG",
        body: new Uint8Array([1, 2, 3]),
        content_type: "text/plain",
        file_name: "full.log"
      })
    } as never);

    const result = await handler({ record_id: "record-1", log_level: "DEBUG" });

    expect(result.content[0]?.text).toContain("Downloaded Build v4 full log");
    expect(result.structuredContent.item).toMatchObject({
      id: "record-1",
      recordId: "record-1",
      logLevel: "DEBUG",
      log: {
        fileName: "full.log",
        contentType: "text/plain",
        sizeBytes: 3,
        contentBase64: "AQID"
      }
    });
  });

  it("requires task_name and maps a task log file response", async () => {
    const handler = createBuildDownloadTaskLogV4Handler({
      downloadTaskLogV4: async () => ({
        record_id: "record-1",
        task_name: "stage1",
        log_level: "INFO",
        body: new Uint8Array([4, 5, 6]),
        content_type: "text/plain",
        file_name: "stage1.log"
      })
    } as never);

    const result = await handler({ record_id: "record-1", task_name: "stage1" });

    expect(result.content[0]?.text).toContain("Downloaded Build v4 task log");
    expect(result.structuredContent.item).toMatchObject({
      id: "record-1:stage1",
      recordId: "record-1",
      taskName: "stage1",
      logLevel: "INFO",
      log: {
        fileName: "stage1.log",
        contentType: "text/plain",
        sizeBytes: 3,
        contentBase64: "BAUG"
      }
    });
    await expect(handler({ record_id: "record-1" })).rejects.toThrow();
  });
});
