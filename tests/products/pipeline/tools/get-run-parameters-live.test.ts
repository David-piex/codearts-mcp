import { describe, expect, it } from "vitest";
import { createPipelineGetRunParametersHandler } from "../../../../src/products/pipeline/tools/get-run-parameters.js";

describe("createPipelineGetRunParametersHandler", () => {
  it("maps runtime variables into MCP output", async () => {
    const handler = createPipelineGetRunParametersHandler({
      getRunParameters: async () => ({
        parameters: [{ name: "branch", value: "main", value_type: "string", is_runtime: true }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1"
    });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "branch",
      name: "branch",
      value: "main",
      type: "string",
      runtime: true
    });
  });
});
