import { describe, expect, it } from "vitest";
import { createDeployListSystemConfigsHandler } from "../../../../src/products/deploy/tools/list-system-configs.js";

describe("createDeployListSystemConfigsHandler", () => {
  it("maps deploy system configs into MCP output", async () => {
    const handler = createDeployListSystemConfigsHandler({
      listSystemConfigs: async () => ({
        configs: [
          {
            name: "CODEARTS_ARTIFACT_FILE",
            type: "text",
            description: "Artifact file path variable",
            static_status: false,
            pipeline_source: "Artifact",
            pipeline_source_type: "generic"
          }
        ]
      })
    });

    const result = await handler({});

    expect(result.structuredContent.items).toEqual([
      {
        id: "CODEARTS_ARTIFACT_FILE",
        name: "CODEARTS_ARTIFACT_FILE",
        type: "text",
        description: "Artifact file path variable",
        staticStatus: false,
        pipelineSource: "Artifact",
        pipelineSourceType: "generic"
      }
    ]);
  });
});
