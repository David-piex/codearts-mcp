import { describe, expect, it } from "vitest";
import { createArtifactGetDownloadUrlHandler } from "../../../../src/products/artifact/tools/get-download-url.js";

describe("createArtifactGetDownloadUrlHandler", () => {
  it("maps artifact file download url into MCP output", async () => {
    const handler = createArtifactGetDownloadUrlHandler({
      getDownloadUrl: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        name: "gateway-1.0.0.jar",
        download_url: "https://download.example.com/gateway.jar",
        expires_at: "2026-04-16T11:00:00Z"
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
      downloadUrl: "https://download.example.com/gateway.jar",
      expiresAt: "2026-04-16T11:00:00Z"
    });
  });
});
