import { describe, expect, it } from "vitest";
import { mapArtifactFileTree } from "../../../../src/products/artifact/tools/get-file-tree.js";

describe("mapArtifactFileTree", () => {
  it("returns normalized repository tree nodes", () => {
    const result = mapArtifactFileTree("tenant-1", "project-1", "release", "/", [
      { path: "/releases", name: "releases", type: "folder" }
    ]);

    expect(result.item?.tenantId).toBe("tenant-1");
    expect(result.item?.projectId).toBe("project-1");
    expect(result.item?.repoName).toBe("release");
    expect(result.item?.nodeCount).toBe(1);
  });
});
