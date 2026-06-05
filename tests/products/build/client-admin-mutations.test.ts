import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient admin mutations", () => {
  it("maps delete, keep-time, recycling, and follow mutation endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "DELETE", path, body });

        if (path.includes("/recycling-deletion")) {
          return { status: "success" };
        }

        if (path.includes("/recycling-empty")) {
          return { status: "success" };
        }

        return {
          status: "success",
          result: {
            project_id: "project-1",
            job_id: "job-1"
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });

        if (path.includes("/keep-time")) {
          return {
            status: "success",
            result: {
              keep_time: 29
            }
          };
        }

        if (path.includes("/recycling-restoration")) {
          return { status: "success" };
        }

        if (path.includes("/follow")) {
          return {
            status: "success",
            result: {
              favorite: true
            }
          };
        }

        return {
          status: "success",
          result: {
            favorite: false
          }
        };
      }
    } as never);

    await expect(client.deleteJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      project_id: "project-1",
      status: "success"
    });
    await expect(client.setKeepTime({ keep_time: 29 })).resolves.toEqual({
      keep_time: 29,
      status: "success"
    });
    await expect(client.deleteRecyclingJobs({ job_ids: ["job-a", "job-b"] })).resolves.toEqual({
      job_ids: ["job-a", "job-b"],
      status: "success"
    });
    await expect(client.clearRecyclingJobs()).resolves.toEqual({
      status: "success"
    });
    await expect(client.restoreRecyclingJobs({ job_ids: ["job-c"] })).resolves.toEqual({
      job_ids: ["job-c"],
      status: "success"
    });
    await expect(client.followJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      favorite: true,
      status: "success"
    });
    await expect(client.unfollowJob({ job_id: "job-1" })).resolves.toEqual({
      job_id: "job-1",
      favorite: false,
      status: "success"
    });

    expect(requests).toEqual([
      {
        method: "DELETE",
        path: "/v1/job/job-1/delete",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/keep-time",
        body: {
          keep_time: 29
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/recycling-deletion",
        body: {
          job_ids: ["job-a", "job-b"]
        }
      },
      {
        method: "DELETE",
        path: "/v1/job/recycling-empty",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/recycling-restoration",
        body: {
          job_ids: ["job-c"]
        }
      },
      {
        method: "POST",
        path: "/v1/job/job-1/follow",
        body: undefined
      },
      {
        method: "POST",
        path: "/v1/job/job-1/unfollow",
        body: undefined
      }
    ]);
  });
});
