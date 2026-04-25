import { describe, expect, it } from "vitest";
import { artifactGetFileTreeInput, artifactListRepositoriesInput } from "../../../src/products/artifact/schemas.js";

describe("artifact schemas", () => {
  it("accepts repository list query fields from the official API", () => {
    const parsed = artifactListRepositoriesInput.parse({
      tenant_id: "tenant-1",
      project_id: "project-1",
      qname: "libs",
      type: "hosted",
      format: "maven2",
      format_list: ["maven2", "npm"],
      is_recycle_bin: false
    });

    expect(parsed).toMatchObject({
      qname: "libs",
      type: "hosted",
      format: "maven2",
      format_list: ["maven2", "npm"],
      is_recycle_bin: false,
      page: 1,
      page_size: 20
    });
  });

  it("defaults file tree path to repository root", () => {
    const parsed = artifactGetFileTreeInput.parse({
      tenant_id: "tenant-1",
      project_id: "project-1",
      repo_name: "libs-release"
    });

    expect(parsed.path).toBe("/");
  });
});
