import { describe, expect, it } from "vitest";
import { createDeployPassV4ManualCheckHandler } from "../../../../src/products/deploy/tools/pass-v4-manual-check.js";

describe("createDeployPassV4ManualCheckHandler", () => {
  it("previews by default", async () => {
    const handler = createDeployPassV4ManualCheckHandler({
      getV4DeployRecord: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111",
        raw: {}
      }),
      passV4ManualCheck: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111",
        status: "passed",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "11111111111111111111111111111111"
    });

    expect(result.structuredContent.summary).toContain("Dry run");
  });

  it("fails in dry-run mode when the record step does not exist", async () => {
    const handler = createDeployPassV4ManualCheckHandler({
      getV4DeployRecord: async () => {
        const error = new Error("step not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      passV4ManualCheck: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111",
        status: "passed",
        raw: {}
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("falls back to a local preview when record detail is sample-data-limited on the current tenant", async () => {
    const handler = createDeployPassV4ManualCheckHandler({
      getV4DeployRecord: async () => {
        const error = new Error("部署记录不存在") as Error & { status?: number; code?: string };
        error.status = 400;
        error.code = "Deploy.00021534";
        throw error;
      },
      passV4ManualCheck: async () => ({
        project_id: "project-1",
        record_id: "rec-1",
        step_id: "11111111111111111111111111111111",
        status: "passed",
        raw: {}
      })
    });

    const result = await handler({
      project_id: "project-1",
      record_id: "rec-1",
      step_id: "11111111111111111111111111111111"
    });

    expect(result.content[0]).toEqual(
      expect.objectContaining({
        text: expect.stringContaining("local preview only")
      })
    );
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      recordId: "rec-1",
      stepId: "11111111111111111111111111111111",
      executed: false,
      previewSource: "local_fallback",
      recordDetailAvailable: false,
      warning:
        "Deploy v4 record detail is not available on the current tenant/gateway; returning a local dry-run preview only."
    });
  });
});
