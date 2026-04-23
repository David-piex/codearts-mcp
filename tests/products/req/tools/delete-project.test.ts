import { describe, expect, it } from "vitest";
import { reqDeleteProjectInput as reqDeleteProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteProjectInput } from "../../../../src/products/req/schemas/project.js";
import {
  mapDeletedProject,
  previewDeleteProject
} from "../../../../src/products/req/tools/delete-project.js";

describe("previewDeleteProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeleteProject({
      project_id: "project-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedProject", () => {
  it("returns normalized deleted project data", () => {
    const result = mapDeletedProject({
      project_id: "project-1"
    });

    expect(result.item).toEqual({
      id: "project-1",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeleteProjectInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqDeleteProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
