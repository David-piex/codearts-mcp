import { describe, expect, it } from "vitest";
import { createDeployGetV4DeployRecordStepLogsHandler } from "../../../../src/products/deploy/tools/get-v4-deploy-record-step-logs.js";

describe("createDeployGetV4DeployRecordStepLogsHandler", () => {
  it("maps v4 deploy record step logs into MCP output", async () => {
    const handler = createDeployGetV4DeployRecordStepLogsHandler({
      getV4DeployRecordStepLogs: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "11111111111111111111111111111111",
      body: {}
    });

    expect(result.structuredContent.summary).toContain("rec-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      recordId: "rec-1",
      stepId: "11111111111111111111111111111111"
    });
  });
});
