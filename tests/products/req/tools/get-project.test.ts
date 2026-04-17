import { describe, expect, it } from "vitest";
import { mapReqProject } from "../../../../src/products/req/tools/get-project.js";

describe("mapReqProject", () => {
  it("returns normalized project detail data", () => {
    const result = mapReqProject({
      project_id: "project-1",
      name: "Demo",
      project_num_id: 101,
      description: "Demo project"
    });

    expect(result.item).toEqual({
      id: "project-1",
      name: "Demo",
      numberId: 101,
      description: "Demo project"
    });
  });
});
