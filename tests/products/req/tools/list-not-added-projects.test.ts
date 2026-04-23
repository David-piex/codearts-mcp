import { describe, expect, it } from "vitest";
import { reqListNotAddedProjectsInput as reqListNotAddedProjectsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListNotAddedProjectsInput } from "../../../../src/products/req/schemas/project.js";
import { mapReqNotAddedProjects } from "../../../../src/products/req/tools/list-not-added-projects.js";

describe("mapReqNotAddedProjects", () => {
  it("returns normalized not-added projects with pagination", () => {
    const result = mapReqNotAddedProjects(
      [
        {
          project_id: "project-1",
          project_name: "Alpha",
          project_num_id: 101,
          description: "Demo project",
          project_type: "scrum"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "project-1",
        name: "Alpha",
        numberId: 101,
        description: "Demo project",
        type: "scrum"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});

describe("reqListNotAddedProjectsInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    expect(reqListNotAddedProjectsInput.parse({})).toEqual({
      page: 1,
      page_size: 20
    });
    expect(reqListNotAddedProjectsInputFromBarrel.parse({})).toEqual({
      page: 1,
      page_size: 20
    });
  });
});
