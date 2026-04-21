import { describe, expect, it } from "vitest";
import { createArtifactListLatestVersionFilesHandler } from "../../../../src/products/artifact/tools/list-latest-version-files.js";

describe("createArtifactListLatestVersionFilesHandler", () => {
  it("maps latest version files into MCP output", async () => {
    const handler = createArtifactListLatestVersionFilesHandler({
      listLatestVersionFiles: async () => ({
        files: [
          {
            path: "/releases/a.jar",
            name: "a.jar",
            version: "1.2.0",
            repo_name: "release",
            size: "1024"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]?.path).toBe("/releases/a.jar");
    expect(result.structuredContent.items?.[0]?.projectId).toBe("project-1");
    expect(result.structuredContent.items?.[0]?.version).toBe("1.2.0");
  });

  it("adds a project-scoped hint when the latest version file list is empty", async () => {
    const handler = createArtifactListLatestVersionFilesHandler({
      listLatestVersionFiles: async () => ({
        files: [],
        total: 0
      })
    });

    const result = await handler({ project_id: "project-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 latest artifact version files found");
    expect(result.content[0]?.text).toContain("If you expected latest artifact version files here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
