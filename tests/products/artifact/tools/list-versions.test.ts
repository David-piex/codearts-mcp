import { describe, expect, it } from "vitest";
import { mapArtifactVersions } from "../../../../src/products/artifact/tools/list-versions.js";

describe("mapArtifactVersions", () => {
  it("returns normalized artifact versions", () => {
    const result = mapArtifactVersions("project-1", [
      {
        version: "1.2.0",
        repo_name: "release",
        artifact_name: "service-a",
        created_at: "2026-04-16T10:00:00Z",
        files_count: 1,
        category: "test"
      }
    ]);

    expect(result.items?.[0]?.version).toBe("1.2.0");
    expect(result.items?.[0]?.projectId).toBe("project-1");
    expect(result.items?.[0]?.repoName).toBe("release");
    expect(result.items?.[0]?.fileCount).toBe(1);
    expect(result.items?.[0]?.category).toBe("test");
  });
});
