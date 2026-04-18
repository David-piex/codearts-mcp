import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient stopJob errors", () => {
  it("treats empty provider responses as a successful stop", async () => {
    const client = createBuildClient({
      post: async () => null
    } as never);

    await expect(
      client.stopJob({
        job_id: "job-1",
        build_no: 3
      })
    ).resolves.toEqual({
      job_id: "job-1",
      build_no: 3,
      result: true
    });
  });

  it("throws when provider returns stringified error JSON", async () => {
    const client = createBuildClient({
      post: async () =>
        JSON.stringify({
          error: {
            code: "DEV.CB.032302",
            reason: "任务状态已刷新,请刷新页面后重试"
          },
          status: "error"
        })
    } as never);

    await expect(
      client.stopJob({
        job_id: "job-1",
        build_no: 3
      })
    ).rejects.toMatchObject({
      message: "任务状态已刷新,请刷新页面后重试",
      code: "DEV.CB.032302",
      status: 400
    });
  });
});
