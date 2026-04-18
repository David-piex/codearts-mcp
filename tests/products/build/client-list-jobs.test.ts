import { describe, expect, it } from "vitest";
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
});
