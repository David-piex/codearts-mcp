import { describe, expect, it } from "vitest";
import { createBuildGetRecordScriptHandler } from "../../../../src/products/build/tools/get-record-script.js";

describe("createBuildGetRecordScriptHandler", () => {
  it("maps build record script into MCP output", async () => {
    const handler = createBuildGetRecordScriptHandler({
      getRecordScript: async () => ({
        record_id: "record-1",
        script: "---\nversion: '2.0'\nstages:\n  stage1: {}",
        status: "success"
      })
    });

    const result = await handler({ record_id: "record-1" });

    expect(result.structuredContent.item).toEqual({
      id: "record-1",
      script: "---\nversion: '2.0'\nstages:\n  stage1: {}",
      status: "success"
    });
  });
});
