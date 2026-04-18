import { describe, expect, it } from "vitest";
import { createBuildGetRecordHandler } from "../../../../src/products/build/tools/get-record.js";

describe("createBuildGetRecordHandler", () => {
  it("maps build record detail into MCP output", async () => {
    const handler = createBuildGetRecordHandler({
      getRecord: async () => ({
        record_id: "record-1",
        job_id: "job-1",
        status: "SCHEDULE_FAILURE",
        status_code: 7,
        trigger_type: "MANUAL",
        commit_id: "abc123",
        branch: "master",
        repository: "git@example.com:team/repo.git",
        execution_id: "-1",
        error_message: "",
        build_yml_path: ".cloudbuild/build.yml",
        daily_build_number: "20260417.3"
      })
    });

    const result = await handler({ record_id: "record-1" });

    expect(result.structuredContent.item).toEqual({
      id: "record-1",
      jobId: "job-1",
      status: "SCHEDULE_FAILURE",
      statusCode: 7,
      triggerType: "MANUAL",
      commitId: "abc123",
      branch: "master",
      repository: "git@example.com:team/repo.git",
      executionId: "-1",
      errorMessage: "",
      buildYmlPath: ".cloudbuild/build.yml",
      dailyBuildNumber: "20260417.3"
    });
  });
});
