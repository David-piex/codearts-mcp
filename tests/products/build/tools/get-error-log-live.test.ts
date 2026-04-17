import { describe, expect, it } from "vitest";
import { createBuildGetErrorLogHandler } from "../../../../src/products/build/tools/get-error-log.js";

describe("createBuildGetErrorLogHandler", () => {
  it("maps build error analysis into MCP output", async () => {
    const handler = createBuildGetErrorLogHandler({
      getErrorLog: async () => ({
        job_name: "gateway-build",
        error_nodes: [
          {
            node_id: "114",
            step: "releasemanArtifactsUploader",
            analyzed_success: true,
            error_info: {
              error_code: "DEV.CB.0220021",
              error_message: "未找到文件,可能文件路径不对:build/*",
              faq: null
            }
          }
        ]
      })
    });

    const result = await handler({ job_id: "job-1", build_no: 5, page: 1, page_size: 10 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "114",
        step: "releasemanArtifactsUploader",
        analyzedSuccess: true,
        errorCode: "DEV.CB.0220021",
        errorMessage: "未找到文件,可能文件路径不对:build/*",
        faq: null
      }
    ]);
  });
});
