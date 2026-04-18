import { describe, expect, it } from "vitest";
import { createDeployRollbackV4DeployRecordHandler } from "../../../../src/products/deploy/tools/rollback-v4-deploy-record.js";

describe("createDeployRollbackV4DeployRecordHandler", () => {
  it("previews by default", async () => {
    const handler = createDeployRollbackV4DeployRecordHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        raw: {}
      }),
      rollbackV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "rollback",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1"
    });

    expect(result.structuredContent.summary).toContain("Dry run");
  });

  it("fails in dry-run mode when the record does not exist", async () => {
    const handler = createDeployRollbackV4DeployRecordHandler({
      getV4DeployRecord: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      rollbackV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "rollback",
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
