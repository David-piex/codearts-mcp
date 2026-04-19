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
      executed: false,
      previewSource: "record_detail",
      recordDetailAvailable: true,
      warning: undefined
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

  it("falls back to a local preview when record detail is sample-data-limited on the current tenant", async () => {
    const handler = createDeployCancelV4DeployRecordHandler({
      getV4DeployRecord: async () => {
        const error = new Error("部署记录不存在") as Error & { status?: number; code?: string };
        error.status = 400;
        error.code = "Deploy.00021534";
        throw error;
      },
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

    expect(result.content[0]).toEqual(
      expect.objectContaining({
        text: expect.stringContaining("local preview only")
      })
    );
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      recordId: "rec-1",
      executed: false,
      previewSource: "local_fallback",
      recordDetailAvailable: false,
      warning:
        "Deploy v4 record detail is not available on the current tenant/gateway; returning a local dry-run preview only."
    });
  });
});
