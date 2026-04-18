import { describe, expect, it } from "vitest";
import { createDeployGetV4DeployRecordStepDetailHandler } from "../../../../src/products/deploy/tools/get-v4-deploy-record-step-detail.js";

describe("createDeployGetV4DeployRecordStepDetailHandler", () => {
  it("maps v4 deploy record step detail into MCP output", async () => {
    const handler = createDeployGetV4DeployRecordStepDetailHandler({
      getV4DeployRecordStepDetail: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1"
    });

    expect(result.structuredContent.summary).toContain("rec-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      recordId: "rec-1"
    });
  });
});
