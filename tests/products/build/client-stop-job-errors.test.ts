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

  it("stops a build job through the official v1 endpoint", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          status: "success",
          result: true
        };
      }
    } as never);

    await expect(
      client.stopJobV1({
        job_id: "job-1",
        build_no: 3
      })
    ).resolves.toEqual({
      job_id: "job-1",
      build_no: 3,
      status: "success",
      result: true,
      raw: { value: true }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/job/job-1/stop",
        body: {
          build_no: 3
        }
      }
    ]);
  });
});
