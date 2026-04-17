import { describe, expect, it } from "vitest";
import { createDeployGetAppLogHandler } from "../../../../src/products/deploy/tools/get-app-log.js";

describe("createDeployGetAppLogHandler", () => {
  it("maps deploy app log into MCP output", async () => {
    const handler = createDeployGetAppLogHandler({
      getAppLog: async () => ({
        application_id: "app-1",
        record_id: "record-1",
        status: "success",
        has_more: true,
        text: "[INFO] deploy ok",
        offset: "0",
        end_offset: "3354"
      })
    });

    const result = await handler({
      application_id: "app-1",
      record_id: "record-1",
      offset: "0",
      end_offset: "0"
    });

    expect(result.structuredContent.item).toEqual({
      id: "record-1",
      applicationId: "app-1",
      status: "success",
      hasMore: true,
      text: "[INFO] deploy ok",
      offset: "0",
      endOffset: "3354"
    });
  });
});
