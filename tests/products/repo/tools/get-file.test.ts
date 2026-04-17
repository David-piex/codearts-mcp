import { describe, expect, it } from "vitest";
import { mapRepoFile } from "../../../../src/products/repo/tools/get-file.js";

describe("mapRepoFile", () => {
  it("returns normalized file content metadata", () => {
    const result = mapRepoFile({
      file_path: "src/index.ts",
      branch_name: "main",
      content: "console.log('ok');"
    });

    expect(result.item?.path).toBe("src/index.ts");
    expect(result.item?.branch).toBe("main");
  });
});
