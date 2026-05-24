import { describe, expect, it } from "vitest";
import {
  artifactCreateRepositoryInput,
  artifactDeleteTrashRepositoriesInput,
  artifactGetFileTreeInput,
  artifactListRepositoriesInput,
  artifactRestoreTrashRepositoriesInput,
  artifactUpdateRepositoryInput
} from "../../../src/products/artifact/schemas.js";

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

  it("defaults repository mutation inputs to dry run", () => {
    expect(artifactCreateRepositoryInput.parse({
      format: "maven2",
      type: "hosted",
      repository_name: "libs-release",
      includes_pattern: "**/*"
    })).toEqual({
      format: "maven2",
      type: "hosted",
      repository_name: "libs-release",
      includes_pattern: "**/*",
      params: {},
      dry_run: true
    });

    expect(artifactUpdateRepositoryInput.parse({
      repo_name: "libs-release",
      format: "maven2",
      repository_ids: ["repo-1"],
      includes_pattern: "**/*"
    })).toEqual({
      repo_name: "libs-release",
      format: "maven2",
      repository_ids: ["repo-1"],
      includes_pattern: "**/*",
      params: {},
      dry_run: true
    });

    const trashItem = {
      id: "repo-1",
      format: "maven2",
      uri: "libs-release",
      status: "deleted"
    };

    expect(artifactRestoreTrashRepositoriesInput.parse({ items: [trashItem] })).toEqual({
      items: [trashItem],
      dry_run: true
    });
    expect(artifactDeleteTrashRepositoriesInput.parse({ items: [trashItem] })).toEqual({
      items: [trashItem],
      dry_run: true
    });
  });
});
