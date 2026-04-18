import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient provider error payloads", () => {
  it("throws when getInfoRecord returns provider error payload in a 200 response", async () => {
    const client = createBuildClient({
      get: async () => ({
        error_code: "DEV.CB.032011",
        error_msg: "任务id参数不合法"
      })
    } as never);

    await expect(
      client.getInfoRecord({
        job_id: "job-1",
        build_no: 5
      })
    ).rejects.toMatchObject({
      message: "任务id参数不合法",
      code: "DEV.CB.032011",
      status: 400
    });
  });
});
