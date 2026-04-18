import { describe, expect, it } from "vitest";
import { createDeployGetLastRecordDetailHandler } from "../../../../src/products/deploy/tools/get-last-record-detail.js";

describe("createDeployGetLastRecordDetailHandler", () => {
  it("maps last record detail into MCP output", async () => {
    const handler = createDeployGetLastRecordDetailHandler({
      getLastRecordDetail: async () => ({
        project_id: "project-1",
        orchestration_id: "orch-1",
        raw: {
          id: "rec-1",
          state: "success",
          start_time: "2026-04-18T10:00:00Z",
          end_time: "2026-04-18T10:10:00Z"
        }
      })
    });

    const result = await handler({
      project_id: "project-1",
      orchestration_id: "orch-1"
    });

    expect(result.structuredContent.summary).toContain("orch-1");
    expect(result.structuredContent.item).toEqual({
      id: "rec-1",
      projectId: "project-1",
      orchestrationId: "orch-1",
      recordId: "rec-1",
      state: "success",
      startTime: "2026-04-18T10:00:00Z",
      endTime: "2026-04-18T10:10:00Z"
    });
  });
});
