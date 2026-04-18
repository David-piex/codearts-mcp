import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient runJob", () => {
  it("forces branch checkout mode when executing a build job", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          result: {
            job_id: "job-1",
            scms: [
              {
                branch: "master",
                build_type: "tag"
              }
            ]
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
        result: {
          actual_build_number: "2",
          daily_build_number: "20260417.2",
          octopus_job_name: "job-1"
        }
        };
      }
    } as never);

    const result = await client.runJob({
      job_id: "job-1",
      branch: "master"
    });

    expect(result).toEqual({
      job_id: "job-1",
      build_no: 2,
      daily_build_number: "20260417.2",
      status: "success"
    });

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v1/job/job-1/config"
      },
      {
        method: "POST",
        path: "/v1/job/execute",
        body: {
          job_id: "job-1",
          branch: "master",
          scm: {
            branch: "master",
            build_type: "branch"
          }
        }
      }
    ]);
  });

  it("falls back to the configured scm branch when no branch override is provided", async () => {
    const client = createBuildClient({
      get: async () => ({
        result: {
          job_id: "job-1",
          scms: [
            {
              branch: "develop",
              build_type: "tag"
            }
          ]
        }
      }),
      post: async (_path: string, body?: unknown) => ({
        result: {
          ...(body as Record<string, unknown>),
          actual_build_number: "3",
          daily_build_number: "20260417.3"
        }
      })
    } as never);

    const result = await client.runJob({
      job_id: "job-1"
    });

    expect(result).toEqual({
      job_id: "job-1",
      build_no: 3,
      daily_build_number: "20260417.3",
      status: "success"
    });
  });
});
