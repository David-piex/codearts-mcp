import { describe, expect, it } from "vitest";
import { createArtifactGetFileHandler } from "../../../../src/products/artifact/tools/get-file.js";

describe("createArtifactGetFileHandler", () => {
  it("maps artifact file detail into MCP output", async () => {
    const handler = createArtifactGetFileHandler({
      getFile: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        name: "gateway-1.0.0.jar",
        download_uri: "https://download.example.com/gateway.jar",
        size: "1024",
        md5: "abc123"
      })
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release",
      path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      format: "maven2"
    });

    expect(result.structuredContent.item).toEqual({
      id: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      fileId: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      name: "gateway-1.0.0.jar",
      tenantId: "tenant-1",
      projectId: "project-1",
      repoName: "libs-release",
      format: "maven2",
      downloadUri: "https://download.example.com/gateway.jar",
      size: "1024",
      md5: "abc123"
    });
  });
});
