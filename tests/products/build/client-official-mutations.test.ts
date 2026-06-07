import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient official build mutation endpoints", () => {
  it("creates and updates build jobs through official v3 endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });

        if (path === "/v3/jobs/create") {
          return {
            result: {
              job_id: "job-new-1",
              job_name: "build-new",
              status: "success"
            }
          };
        }

        return {
          result: {
            job_id: "job-1",
            job_name: "build-renamed",
            status: "success"
          }
        };
      }
    } as never);

    await expect(client.createJobV3({
      project_id: "project-1",
      job_name: "build-new",
      arch: "x86-64",
      auto_update_sub_module: true,
      host_type: "devcloud",
      build_config_type: "YAML",
      parameters: [{ name: "env", value: "test" }],
      body: { custom: true }
    })).resolves.toEqual({
      project_id: "project-1",
      job_name: "build-new",
      job_id: "job-new-1",
      status: "success",
      raw: {
        job_id: "job-new-1",
        job_name: "build-new",
        status: "success"
      }
    });

    await expect(client.updateJobV3({
      project_id: "project-1",
      job_id: "job-1",
      job_name: "build-renamed",
      arch: "x86-64",
      auto_update_sub_module: false,
      source_code: "codehub",
      steps: [{ name: "Build" }],
      body: { custom: true }
    })).resolves.toEqual({
      project_id: "project-1",
      job_id: "job-1",
      job_name: "build-renamed",
      status: "success",
      raw: {
        job_id: "job-1",
        job_name: "build-renamed",
        status: "success"
      }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v3/jobs/create",
        body: {
          custom: true,
          project_id: "project-1",
          job_name: "build-new",
          arch: "x86-64",
          auto_update_sub_module: "true",
          host_type: "devcloud",
          build_config_type: "YAML",
          parameters: [{ name: "env", value: "test" }]
        }
      },
      {
        method: "POST",
        path: "/v3/jobs/update",
        body: {
          custom: true,
          project_id: "project-1",
          job_id: "job-1",
          job_name: "build-renamed",
          arch: "x86-64",
          auto_update_sub_module: "false",
          source_code: "codehub",
          steps: [{ name: "Build" }]
        }
      }
    ]);
  });
});
