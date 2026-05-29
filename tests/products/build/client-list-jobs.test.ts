import { describe, expect, it, vi } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

function createProjectPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

describe("createBuildClient listJobs", () => {
  it("uses zero-based page_index for the provider", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            total: 0,
            job_list: []
          }
        };
      }
    } as never);

    await client.listJobs(createProjectPageInput());

    expect(requestedPath).toContain("page_index=0");
  });

  it("maps real provider job_list responses", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: {
          total: 1,
          job_list: [
            {
              id: "job-1",
              name: "gateway-build",
              project_id: "project-1",
              build_project_id: "build-project-1",
              is_running: false,
              description: "demo"
            }
          ]
        }
      })
    } as never);

    const result = await client.listJobs(createProjectPageInput());

    expect(result).toEqual({
      jobs: [
        {
          job_id: "job-1",
          name: "gateway-build",
          project_id: "project-1",
          build_project_id: "build-project-1",
          is_running: false,
          description: "demo"
        }
      ],
      total: 1
    });
  });

  it("maps job_name from live provider payloads", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: {
          total: 1,
          job_list: [
            {
              id: "job-1",
              job_name: "gateway-build-live"
            }
          ]
        }
      })
    } as never);

    const result = await client.listJobs(createProjectPageInput());

    expect(result).toEqual({
      jobs: [
        {
          job_id: "job-1",
          name: "gateway-build-live",
          project_id: undefined,
          build_project_id: undefined,
          is_running: undefined,
          description: undefined
        }
      ],
      total: 1
    });
  });

  it("uses the v3 project jobs endpoint and preserves raw job fields", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 1,
          job_list: [
            {
              id: "job-1",
              job_name: "gateway-build",
              task_id: "#20250805.1",
              last_build_time: 1754360164000
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectJobsV3(createProjectPageInput({ page: 2, page_size: 10, keyword: "gateway" }));

    expect(requestedPath).toBe("/v3/project-1/jobs?page_index=1&page_size=10&search=gateway");
    expect(result).toEqual({
      jobs: [
        {
          id: "job-1",
          job_name: "gateway-build",
          task_id: "#20250805.1",
          last_build_time: 1754360164000
        }
      ],
      total: 1,
      raw: {
        total: 1,
        job_list: [
          {
            id: "job-1",
            job_name: "gateway-build",
            task_id: "#20250805.1",
            last_build_time: 1754360164000
          }
        ]
      }
    });
  });

  it("lists all user-visible jobs through the official v1 endpoint", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            total: 1,
            job_list: [{ id: "job-1", job_name: "gateway-build" }]
          }
        };
      }
    } as never);

    const result = await client.listAllJobs({
      page: 2,
      page_size: 10,
      keyword: "gateway",
      build_status: "success",
      creator_id: "user-1",
      sort_field: "update_time",
      sort_type: "desc"
    });

    expect(requestedPath).toBe(
      "/v1/job/list?page_index=1&page_size=10&search=gateway&build_status=success&creator_id=user-1&sort_field=update_time&sort_type=desc"
    );
    expect(result).toEqual({
      jobs: [{ id: "job-1", job_name: "gateway-build" }],
      total: 1,
      raw: {
        total: 1,
        job_list: [{ id: "job-1", job_name: "gateway-build" }]
      }
    });
  });

  it("lists brief records by build project ids", async () => {
    let requestedBody: unknown;
    const client = createBuildClient({
      post: async (path: string, body?: unknown) => {
        expect(path).toBe("/v1/record/brief");
        requestedBody = body;
        return {
          result: {
            total: 1,
            brief_build_record_dtos: [{ id: "record-1", job_id: "job-1" }]
          }
        };
      }
    } as never);

    const result = await client.listBriefRecords({
      build_project_ids: ["build-project-1"],
      body: { limit: 5 }
    });

    expect(requestedBody).toEqual({
      limit: 5,
      build_project_ids: ["build-project-1"]
    });
    expect(result.records).toEqual([{ id: "record-1", job_id: "job-1" }]);
    expect(result.total).toBe(1);
  });

  it("lists v3 job history and gets v3 running status", async () => {
    const requests: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/history")) {
          return {
            result: {
              total: 1,
              history_records: [{ id: "record-1", status: "success" }]
            }
          };
        }

        return { result: { is_running: true } };
      }
    } as never);

    await expect(
      client.listJobHistoryV3({
        job_id: "job-1",
        page: 2,
        page_size: 10,
        interval: 7
      })
    ).resolves.toMatchObject({
      records: [{ id: "record-1", status: "success" }],
      total: 1
    });
    await expect(client.getJobRunningStatusV3({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      value: true,
      raw: { is_running: true }
    });
    expect(requests).toEqual([
      "/v3/jobs/job-1/history?offset=1&limit=10&interval=7",
      "/v3/jobs/job-1/status"
    ]);
  });

  it("reuses a short-lived cache for repeated identical build job list calls", async () => {
    let now = 1_000;
    const get = vi.fn(async () => ({
      result: {
        total: 1,
        job_list: [
          {
            id: "job-1",
            name: "gateway-build"
          }
        ]
      }
    }));
    const client = createBuildClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listJobs(createProjectPageInput());
    now += 1_000;
    const second = await client.listJobs(createProjectPageInput());

    expect(second).toEqual(first);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refreshes the build job list cache after the short cache window expires", async () => {
    let now = 1_000;
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        result: {
          total: 1,
          job_list: [{ id: "job-1", name: "gateway-build-1" }]
        }
      })
      .mockResolvedValueOnce({
        result: {
          total: 1,
          job_list: [{ id: "job-2", name: "gateway-build-2" }]
        }
      });
    const client = createBuildClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listJobs(createProjectPageInput());
    now += 30_001;
    const second = await client.listJobs(createProjectPageInput());

    expect(first.jobs[0]?.job_id).toBe("job-1");
    expect(second.jobs[0]?.job_id).toBe("job-2");
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent listJobs calls for the same key", async () => {
    const get = vi.fn(async () => ({
      result: {
        total: 1,
        job_list: [
          {
            id: "job-1",
            name: "gateway-build"
          }
        ]
      }
    }));
    const client = createBuildClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    const [left, right] = await Promise.all([
      client.listJobs(createProjectPageInput()),
      client.listJobs(createProjectPageInput())
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refreshes the default build job list cache before the legacy 15 second window", async () => {
    let now = 1_000;
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        result: {
          total: 1,
          job_list: [{ id: "job-1", name: "gateway-build-1" }]
        }
      })
      .mockResolvedValueOnce({
        result: {
          total: 1,
          job_list: [{ id: "job-2", name: "gateway-build-2" }]
        }
      });
    const client = createBuildClient(
      {
        get
      } as never,
      {
        now: () => now
      }
    );

    await client.listJobs(createProjectPageInput());
    now += 6_000;
    await client.listJobs(createProjectPageInput());

    expect(get).toHaveBeenCalledTimes(2);
  });
});
