import { describe, expect, it } from "vitest";
import { createArtifactDeleteFileHandler } from "../../../../src/products/artifact/tools/delete-file.js";

describe("createArtifactDeleteFileHandler", () => {
  it("returns a real dry-run summary when requested", async () => {
    const handler = createArtifactDeleteFileHandler({
      getFile: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        name: "gateway-1.0.0.jar",
        download_uri: "https://example.com/file",
        size: "1024",
        md5: "abc123"
      }),
      deleteFile: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release",
      path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      format: "maven2",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      id: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      repositoryName: "libs-release",
      format: "maven2",
      fileName: "gateway-1.0.0.jar",
      size: "1024",
      executed: false
    });
  });

  it("fails in dry-run mode when the target file does not exist", async () => {
    const handler = createArtifactDeleteFileHandler({
      getFile: async () => {
        const error = new Error("file not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      deleteFile: async () => {
        throw new Error("should not run");
      }
    });

    await expect(
      handler({
        tenant_id: "tenant-1",
        project_id: "project-1",
        repo_name: "libs-release",
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        format: "maven2"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps deleted artifact file into MCP output", async () => {
    const handler = createArtifactDeleteFileHandler({
      getFile: async () => {
        throw new Error("should not preview");
      },
      deleteFile: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        deleted: true
      })
    });

    const result = await handler({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release",
      path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      format: "maven2",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
      repositoryName: "libs-release",
      format: "maven2",
      deleted: true,
      executed: true
    });
  });
});
