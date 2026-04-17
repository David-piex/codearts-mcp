import { describe, expect, it } from "vitest";
import { mapReqProjects } from "../../../../src/products/req/tools/list-projects.js";

describe("mapReqProjects", () => {
  it("normalizes provider projects into MCP list results", () => {
    const result = mapReqProjects([{ id: "1", name: "Alpha", project_num_id: 7 }], 1, 20);

    expect(result.summary).toContain("1 projects");
    expect(result.items?.[0]).toEqual({ id: "1", name: "Alpha", numberId: 7 });
  });
});
