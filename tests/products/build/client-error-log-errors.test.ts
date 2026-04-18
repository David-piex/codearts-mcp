import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient error payload variants", () => {
  it("throws when provider returns nested error object in a 200 response", async () => {
    const client = createBuildClient({
      get: async () => ({
        error: {
          code: "DEV.CB.032011",
          reason: "任务id参数不合法"
        },
        status: "error"
      })
    } as never);

    await expect(
      client.getErrorLog({
        job_id: "job-1",
        build_no: 3,
        page: 1,
        page_size: 20
      })
    ).rejects.toMatchObject({
      message: "任务id参数不合法",
      code: "DEV.CB.032011",
      status: 400
    });
  });
});
