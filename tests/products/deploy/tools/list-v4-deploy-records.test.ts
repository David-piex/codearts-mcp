import { describe, expect, it } from "vitest";
import { createDeployListV4DeployRecordsHandler } from "../../../../src/products/deploy/tools/list-v4-deploy-records.js";

describe("createDeployListV4DeployRecordsHandler", () => {
  it("maps v4 deploy records into MCP output", async () => {
    const handler = createDeployListV4DeployRecordsHandler({
      listV4DeployRecords: async () => ({
        project_id: "project-1",
        total: 1,
        records: [
          {
            id: "rec-1",
            state: "success",
            orchestration_id: "orch-1",
            start_time: "a",
            end_time: "b"
          }
        ],
        raw: { total: 1 }
      })
    });

    const result = await handler({
      project_id: "project-1",
      limit: 20,
      offset: 0
    });

    expect(result.structuredContent.summary).toContain("1 v4 deploy records");
    expect(result.structuredContent.items).toEqual([
      {
        id: "rec-1",
        projectId: "project-1",
        state: "success",
        orchestrationId: "orch-1",
        startTime: "a",
        endTime: "b"
      }
    ]);
  });
});
