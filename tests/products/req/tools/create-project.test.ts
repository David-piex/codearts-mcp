import { describe, expect, it } from "vitest";
import { reqCreateProjectInput as reqCreateProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateProjectInput } from "../../../../src/products/req/schemas/project.js";
import {
  mapCreatedProject,
  previewCreateProject
} from "../../../../src/products/req/tools/create-project.js";

describe("previewCreateProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateProject({
      name: "Alpha",
      description: "Demo project",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      name: "Alpha",
      description: "Demo project",
      executed: false
    });
  });
});

describe("mapCreatedProject", () => {
  it("returns normalized created project data", () => {
    const result = mapCreatedProject({
      project_id: "project-1",
      project_name: "Alpha",
      description: "Demo project",
      project_num_id: 101,
      project_type: "scrum"
    });

    expect(result.item).toEqual({
      id: "project-1",
      name: "Alpha",
      description: "Demo project",
      numberId: 101,
      type: "scrum",
      executed: true
    });
  });
});

describe("reqCreateProjectInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      name: "Alpha",
      description: "Demo project"
    };

    expect(reqCreateProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
