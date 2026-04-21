import { describe, expect, it, vi } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

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

    await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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

    const result = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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

    const result = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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

    const first = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    now += 1_000;
    const second = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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

    const first = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    now += 30_001;
    const second = await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

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
      client.listJobs({
        project_id: "project-1",
        page: 1,
        page_size: 20
      }),
      client.listJobs({
        project_id: "project-1",
        page: 1,
        page_size: 20
      })
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

    await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    now += 6_000;
    await client.listJobs({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(get).toHaveBeenCalledTimes(2);
  });
});
