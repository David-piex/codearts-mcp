import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient listJobs", () => {
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
});
