import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient record detail", () => {
  it("maps live record info payloads", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: {
          id: "record-1",
          job_id: "job-1",
          status: "SCHEDULE_FAILURE",
          status_code: 7,
          trigger_type: "MANUAL",
          revision: "",
          build_no: "3",
          branch: "master",
          repository: "git@example.com:team/repo.git",
          execution_id: "-1",
          err_msg: "",
          build_yml_path: ".cloudbuild/build.yml",
          daily_build_number: "20260417.3"
        }
      })
    } as never);

    const result = await client.getRecord({ record_id: "record-1" });

    expect(result).toEqual({
      record_id: "record-1",
      job_id: "job-1",
      status: "SCHEDULE_FAILURE",
      status_code: 7,
      trigger_type: "MANUAL",
      commit_id: "",
      branch: "master",
      repository: "git@example.com:team/repo.git",
      execution_id: "-1",
      error_message: "",
      build_yml_path: ".cloudbuild/build.yml",
      daily_build_number: "20260417.3"
    });
  });

  it("maps string record script payloads", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: ""
      })
    } as never);

    const result = await client.getRecordScript({ record_id: "record-1" });

    expect(result).toEqual({
      record_id: "record-1",
      script: "",
      status: undefined
    });
  });
});
