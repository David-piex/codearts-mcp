import { describe, expect, it } from "vitest";
import { createDeployRetryV4DeployRecordHandler } from "../../../../src/products/deploy/tools/retry-v4-deploy-record.js";

describe("createDeployRetryV4DeployRecordHandler", () => {
  it("previews by default", async () => {
    const handler = createDeployRetryV4DeployRecordHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        raw: {}
      }),
      retryV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "retry",
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
    const handler = createDeployRetryV4DeployRecordHandler({
      getV4DeployRecord: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      retryV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        status: "retry",
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
