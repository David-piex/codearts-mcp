import { describe, expect, it } from "vitest";
import { createRepoGetFileHandler } from "../../../../src/products/repo/tools/get-file.js";

describe("createRepoGetFileHandler", () => {
  it("maps file content responses into MCP output", async () => {
    const handler = createRepoGetFileHandler({
      getFile: async () => ({
        file_path: "src/index.ts",
        branch_name: "main",
        content: "console.log('ok');"
      })
    });

    const result = await handler({
      repository_id: "repo-1",
      file_path: "src/index.ts",
      branch: "main"
    });

    expect(result.structuredContent.item).toEqual({
      path: "src/index.ts",
      branch: "main",
      content: "console.log('ok');"
    });
  });
});
