import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient updateJobStep", () => {
  it("loads the current job config, updates the named step, and posts the merged payload", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createBuildClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          result: {
            job_id: "job-1",
            job_name: "gateway-build",
            project_id: "project-1",
            arch: "x86-64",
            host_type: "devcloud",
            flavor: "DEFAULT",
            parameters: [],
            scms: [],
            steps: [
              {
                name: "Npm构建",
                enable: true,
                module_id: "builder",
                properties: {
                  image: "nodejs12.7.0",
                  command: "npm install && npm run build",
                  preCondition: "SUCCESS"
                }
              }
            ]
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          result: {
            job_id: "job-1",
            job_name: "gateway-build"
          }
        };
      }
    } as never);

    const result = await client.updateJobStep({
      job_id: "job-1",
      step_name: "Npm构建",
      image: "nodejs20.18.0",
      command: "npm ci && npm run build"
    });

    expect(result).toEqual({
      job_id: "job-1",
      name: "gateway-build",
      updated_step_name: "Npm构建",
      image: "nodejs20.18.0",
      command: "npm ci && npm run build",
      pre_condition: "SUCCESS"
    });

    expect(requests).toEqual([
      { method: "GET", path: "/v1/job/job-1/config" },
      {
        method: "POST",
        path: "/v1/job/update",
        body: {
          job_id: "job-1",
          job_name: "gateway-build",
          project_id: "project-1",
          arch: "x86-64",
          host_type: "devcloud",
          flavor: "DEFAULT",
          parameters: [],
          scms: [],
          steps: [
            {
              name: "Npm构建",
              enable: true,
              module_id: "builder",
              properties: {
                image: "nodejs20.18.0",
                command: "npm ci && npm run build",
                preCondition: "SUCCESS"
              }
            }
          ]
        }
      }
    ]);
  });
});
