import { describe, expect, it } from "vitest";
import { createBuildListBuildParametersHandler } from "../../../../src/products/build/tools/list-build-parameters.js";

describe("createBuildListBuildParametersHandler", () => {
  it("maps build parameters into MCP output", async () => {
    const handler = createBuildListBuildParametersHandler({
      listBuildParameters: async () => ({
        job_id: "job-1",
        build_no: 5,
        parameters: [
          { name: "branch", value: "main" },
          { name: "profile", value: "prod" }
        ]
      })
    });

    const result = await handler({ job_id: "job-1", build_no: 5 });

    expect(result.structuredContent.items).toEqual([
      { id: "branch", name: "branch", value: "main" },
      { id: "profile", name: "profile", value: "prod" }
    ]);
  });

  it("adds a build-scoped hint when the parameter list is empty", async () => {
    const handler = createBuildListBuildParametersHandler({
      listBuildParameters: async () => ({
        job_id: "job-empty",
        build_no: 5,
        parameters: []
      })
    });

    const result = await handler({ job_id: "job-empty", build_no: 5 });

    expect(result.content[0]?.text).toContain("0 build parameters found");
    expect(result.content[0]?.text).toContain("If you expected build parameters here");
    expect(result.content[0]?.text).toContain("job-empty");
    expect(result.content[0]?.text).toContain("5");
  });
});
