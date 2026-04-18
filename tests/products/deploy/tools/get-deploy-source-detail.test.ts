import { describe, expect, it } from "vitest";
import { createDeployGetDeploySourceDetailHandler } from "../../../../src/products/deploy/tools/get-deploy-source-detail.js";

describe("createDeployGetDeploySourceDetailHandler", () => {
  it("maps deploy source detail into MCP output", async () => {
    const handler = createDeployGetDeploySourceDetailHandler({
      getDeploySourceDetail: async () => ({
        task_id: "task-1",
        trigger_source: "1",
        artifact_source_system: "Artifact",
        artifact_type: "generic"
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      taskId: "task-1",
      triggerSource: "1",
      artifactSourceSystem: "Artifact",
      artifactType: "generic"
    });
  });
});
