import { describe, expect, it } from "vitest";
import { createArtifactListBuildArchivesHandler } from "../../../../src/products/artifact/tools/list-build-archives.js";

describe("createArtifactListBuildArchivesHandler", () => {
  it("maps build archives into MCP output", async () => {
    const handler = createArtifactListBuildArchivesHandler({
      listBuildArchives: async () => ({
        archives: [
          {
            id: "archive-1",
            name: "gateway-1.0.0.zip",
            size: "2048",
            download_url: "https://download.example.com/gateway.zip",
            md5: "def456"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 build archives");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "archive-1",
      archiveId: "archive-1",
      name: "gateway-1.0.0.zip",
      size: "2048",
      downloadUrl: "https://download.example.com/gateway.zip",
      md5: "def456"
    });
  });
});
