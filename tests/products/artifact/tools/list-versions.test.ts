import { describe, expect, it } from "vitest";
import { mapArtifactVersions } from "../../../../src/products/artifact/tools/list-versions.js";

describe("mapArtifactVersions", () => {
  it("returns normalized artifact versions", () => {
    const result = mapArtifactVersions([
      {
        version: "1.2.0",
        repo_name: "release",
        artifact_name: "service-a",
        created_at: "2026-04-16T10:00:00Z"
      }
    ]);

    expect(result.items?.[0]?.version).toBe("1.2.0");
    expect(result.items?.[0]?.repoName).toBe("release");
  });
});
