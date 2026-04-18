import { describe, expect, it } from "vitest";
import { createDeployRerunV4DeployRecordHandler } from "../../../../src/products/deploy/tools/rerun-v4-deploy-record.js";

describe("createDeployRerunV4DeployRecordHandler", () => {
  it("previews by default", async () => {
    const handler = createDeployRerunV4DeployRecordHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        raw: {}
      }),
      rerunV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "rerun",
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
    const handler = createDeployRerunV4DeployRecordHandler({
      getV4DeployRecord: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      rerunV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "rerun",
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
