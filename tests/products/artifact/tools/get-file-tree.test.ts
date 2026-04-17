import { describe, expect, it } from "vitest";
import { mapArtifactFileTree } from "../../../../src/products/artifact/tools/get-file-tree.js";

describe("mapArtifactFileTree", () => {
  it("returns normalized repository tree nodes", () => {
    const result = mapArtifactFileTree("release", "/", [
      { path: "/releases", name: "releases", type: "folder" }
    ]);

    expect(result.item?.repoName).toBe("release");
    expect(result.item?.nodeCount).toBe(1);
  });
});
