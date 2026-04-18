import { describe, expect, it } from "vitest";
import { createDeployGetV4DeployRecordHandler } from "../../../../src/products/deploy/tools/get-v4-deploy-record.js";

describe("createDeployGetV4DeployRecordHandler", () => {
  it("maps v4 deploy record into MCP output", async () => {
    const handler = createDeployGetV4DeployRecordHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "step-1",
        raw: {
          id: "rec-1",
          state: "success",
          orchestration_id: "orch-1",
          start_time: "2026-04-18T10:00:00Z",
          end_time: "2026-04-18T10:10:00Z"
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "step-1"
    });

    expect(result.structuredContent.summary).toContain("rec-1");
    expect(result.structuredContent.item).toEqual({
      id: "rec-1",
      projectId: "project-1",
      recordId: "rec-1",
      stepId: "step-1",
      state: "success",
      orchestrationId: "orch-1",
      startTime: "2026-04-18T10:00:00Z",
      endTime: "2026-04-18T10:10:00Z"
    });
  });
});
