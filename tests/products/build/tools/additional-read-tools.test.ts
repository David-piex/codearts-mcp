import { describe, expect, it } from "vitest";
import {
  createBuildGetJobOutputHandler,
  createBuildListJobUpdateHistoryHandler,
  createBuildListKeystoreFilesHandler
} from "../../../../src/products/build/tools/additional-read-tools.js";

describe("Build additional read tool handlers", () => {
  it("maps job update history as a list result", async () => {
    const handler = createBuildListJobUpdateHistoryHandler({
      listJobUpdateHistory: async () => ({
        history: [{ id: "h1", name: "config changed" }],
        total: 1
      })
    } as never);

    const result = await handler({ job_id: "job-1" });

    expect(result.structuredContent.summary).toBe("1 Build job update history records found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "h1",
      name: "config changed"
    });
    expect(result.content[0]?.text).toContain("config changed");
  });

  it("maps job output as an item result", async () => {
    const handler = createBuildGetJobOutputHandler({
      getJobOutput: async () => ({
        job_id: "job-1",
        build_no: 2,
        raw: { output: "ok" }
      })
    } as never);

    const result = await handler({ job_id: "job-1", build_no: 2 });

    expect(result.structuredContent.item).toMatchObject({
      id: "job-1#2",
      jobId: "job-1",
      buildNo: 2,
      output: { output: "ok" }
    });
  });

  it("maps keystore file metadata without exposing file contents", async () => {
    const handler = createBuildListKeystoreFilesHandler({
      listKeystoreFiles: async () => ({
        files: [{ id: "ks1", name: "signing-key" }],
        total: 1
      })
    } as never);

    const result = await handler({ query: { page: 1 } });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "ks1",
      name: "signing-key",
      file: { id: "ks1", name: "signing-key" }
    });
  });
});
