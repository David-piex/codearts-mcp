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
    expect(result.structuredContent.items?.[0]?.version).toBe("1.2.0");
  });
});
