import { describe, expect, it } from "vitest";
import { mapArtifactLatestVersionFiles } from "../../../../src/products/artifact/tools/list-latest-version-files.js";

describe("mapArtifactLatestVersionFiles", () => {
  it("returns normalized latest version file data", () => {
    const result = mapArtifactLatestVersionFiles("project-1", [
      {
        path: "/releases/a.jar",
        name: "a.jar",
        version: "1.2.0",
        repo_name: "release",
        size: "1024"
      }
    ]);

    expect(result.items?.[0]?.path).toBe("/releases/a.jar");
    expect(result.items?.[0]?.projectId).toBe("project-1");
    expect(result.items?.[0]?.version).toBe("1.2.0");
  });
});
