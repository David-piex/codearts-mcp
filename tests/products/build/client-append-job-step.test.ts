import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient appendJobStep", () => {
  it("loads the current job config, inserts the new step after the requested step, and posts the merged payload", async () => {
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
                name: "Npm build",
                enable: true,
                module_id: "builder",
                version: "1.0.0",
                properties: {
                  image: "nodejs20.18.0",
                  command: "npm ci && npm run build",
                  preCondition: "SUCCESS"
                }
              },
              {
                name: "Archive",
                enable: true,
                module_id: "archive",
                version: "1.0.0",
                properties: {
                  command: "tar -czf dist.tgz dist"
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

    const result = await client.appendJobStep({
      job_id: "job-1",
      step_name: "Upload package to release repository",
      module_id: "official.release.upload",
      insert_after_step_name: "Npm build",
      version: "1.0.0",
      properties: {
        path: "dist/demo.zip",
        name: "demo",
        version: "1.0.${BUILD_NUMBER}"
      },
      pre_condition: "SUCCESS"
    });

    expect(result).toEqual({
      job_id: "job-1",
      name: "gateway-build",
      appended_step_name: "Upload package to release repository",
      inserted_after_step_name: "Npm build",
      module_id: "official.release.upload",
      step_count: 3,
      image: undefined,
      command: undefined,
      pre_condition: "SUCCESS",
      properties: {
        path: "dist/demo.zip",
        name: "demo",
        version: "1.0.${BUILD_NUMBER}",
        preCondition: "SUCCESS"
      }
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
              name: "Npm build",
              enable: true,
              module_id: "builder",
              version: "1.0.0",
              properties: {
                image: "nodejs20.18.0",
                command: "npm ci && npm run build",
                preCondition: "SUCCESS"
              }
            },
            {
              name: "Upload package to release repository",
              enable: true,
              module_id: "official.release.upload",
              version: "1.0.0",
              properties: {
                path: "dist/demo.zip",
                name: "demo",
                version: "1.0.${BUILD_NUMBER}",
                preCondition: "SUCCESS"
              }
            },
            {
              name: "Archive",
              enable: true,
              module_id: "archive",
              version: "1.0.0",
              properties: {
                command: "tar -czf dist.tgz dist"
              }
            }
          ]
        }
      }
    ]);
  });

  it("rejects duplicate step names before posting an update", async () => {
    const client = createBuildClient({
      get: async () => ({
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
              name: "Upload package to release repository",
              enable: true,
              module_id: "official.release.upload",
              properties: {}
            }
          ]
        }
      }),
      post: async () => {
        throw new Error("should not post");
      }
    } as never);

    await expect(
      client.appendJobStep({
        job_id: "job-1",
        step_name: "Upload package to release repository",
        module_id: "official.release.upload"
      })
    ).rejects.toMatchObject({
      status: 409
    });
  });
});
