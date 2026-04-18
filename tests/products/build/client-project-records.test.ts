import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient project-level build APIs", () => {
  it("prefers build_project_id when listing project records", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          records: [],
          total: 0
        };
      }
    } as never);

    await client.listProjectRecords({
      project_id: "project-1",
      build_project_id: "build-project-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toBe("/v1/record/build-project-1/records?offset=0&limit=20");
  });

  it("maps live project record payloads with result.data", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: {
          pagination: {
            total: -1
          },
          data: [
            {
              id: "record-1",
              display_name: "gateway-build",
              status: "SCHEDULE_FAILURE",
              trigger_type: "MANUAL",
              branch: "master",
              revision: "abc123",
              trigger_name: "readyrunning",
              create_time: "2026-04-17T02:56:16.000+00:00"
            }
          ]
        }
      })
    } as never);

    const result = await client.listProjectRecords({
      project_id: "project-1",
      build_project_id: "build-project-1",
      page: 1,
      page_size: 20
    });

    expect(result.records).toEqual([
      {
        record_id: "record-1",
        job_id: undefined,
        job_name: "gateway-build",
        status: "SCHEDULE_FAILURE",
        trigger_type: "MANUAL",
        branch: "master",
        commit_id: "abc123",
        executor: "readyrunning",
        start_time: undefined
      }
    ]);
  });

  it("prefers build_project_id when loading project record statistics", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 0
        };
      }
    } as never);

    await client.getProjectRecordStatistics({
      project_id: "project-1",
      build_project_id: "build-project-1"
    });

    expect(requestedPath).toBe("/v1/record/build-project-1/statistics");
  });

  it("throws when project statistics returns provider error payload in a 200 response", async () => {
    const client = createBuildClient({
      get: async () => ({
        error_code: "DEV.CB.032000",
        error_msg: "[project_id] 参数错误"
      })
    } as never);

    await expect(
      client.getProjectRecordStatistics({
        project_id: "project-1"
      })
    ).rejects.toMatchObject({
      message: "[project_id] 参数错误",
      code: "DEV.CB.032000",
      status: 400
    });
  });

  it("throws when project records returns provider error payload in a 200 response", async () => {
    const client = createBuildClient({
      get: async () => ({
        error_code: "DEV.CB.032000",
        error_msg: "[project_id] 参数错误"
      })
    } as never);

    await expect(
      client.listProjectRecords({
        project_id: "project-1",
        page: 1,
        page_size: 20
      })
    ).rejects.toMatchObject({
      message: "[project_id] 参数错误",
      code: "DEV.CB.032000",
      status: 400
    });
  });
});
