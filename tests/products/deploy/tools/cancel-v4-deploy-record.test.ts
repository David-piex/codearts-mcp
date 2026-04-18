import { describe, expect, it } from "vitest";
import { createDeployCancelV4DeployRecordHandler } from "../../../../src/products/deploy/tools/cancel-v4-deploy-record.js";

describe("createDeployCancelV4DeployRecordHandler", () => {
  it("previews by default", async () => {
    const handler = createDeployCancelV4DeployRecordHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        raw: {}
      }),
      cancelV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "canceled",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1"
    });

    expect(result.structuredContent.summary).toContain("Dry run");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      recordId: "rec-1",
      executed: false
    });
  });

  it("fails in dry-run mode when the record does not exist", async () => {
    const handler = createDeployCancelV4DeployRecordHandler({
      getV4DeployRecord: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      cancelV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "canceled",
        raw: {}
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        record_id: "rec-1"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });
});
