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
});
