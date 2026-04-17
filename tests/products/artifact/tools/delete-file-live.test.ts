import { describe, expect, it } from "vitest";
import { createArtifactDeleteFileHandler } from "../../../../src/products/artifact/tools/delete-file.js";

describe("createArtifactDeleteFileHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createArtifactDeleteFileHandler({
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
      executed: false
    });
  });

  it("maps deleted artifact file into MCP output", async () => {
    const handler = createArtifactDeleteFileHandler({
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
