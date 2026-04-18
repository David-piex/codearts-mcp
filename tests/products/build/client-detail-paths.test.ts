import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient detail paths", () => {
  it("uses the config endpoint when loading a job", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            job_id: "job-1",
            job_name: "gateway-build",
            project_id: "project-1",
            flavor: "DEFAULT",
            host_type: "devcloud",
            build_environment_type: "docker",
            scms: [
              {
                url: "git@example.com:team/repo.git",
                branch: "master",
                repo_id: "repo-1",
                repo_name: "repo",
                scm_type: "codehub"
              }
            ],
            steps: [
              {
                name: "Npm构建",
                module_id: "builder",
                enable: true,
                properties: {
                  image: "nodejs20",
                  command: "npm ci && npm run build",
                  preCondition: "SUCCESS"
                }
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.getJob({ job_id: "job-1" });

    expect(requestedPath).toBe("/v1/job/job-1/config");
    expect(result).toEqual({
      job_id: "job-1",
      name: "gateway-build",
      project_id: "project-1",
      description: undefined,
      flavor: "DEFAULT",
      host_type: "devcloud",
      build_environment_type: "docker",
      step_count: 1,
      primary_image: "nodejs20",
      scm_repositories: [
        {
          url: "git@example.com:team/repo.git",
          branch: "master",
          repo_id: "repo-1",
          repo_name: "repo",
          scm_type: "codehub"
        }
      ],
      steps: [
        {
          name: "Npm构建",
          module_id: "builder",
          enable: true,
          image: "nodejs20",
          command: "npm ci && npm run build",
          pre_condition: "SUCCESS"
        }
      ]
    });
  });

  it("uses the v3 history details endpoint", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            job_id: "job-1",
            build_number: 5
          }
        };
      }
    } as never);

    await client.getHistoryDetails({ job_id: "job-1", build_number: 5 });

    expect(requestedPath).toBe("/v3/jobs/job-1/5/history-details");
  });

  it("uses history-parameters and maps result arrays", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            { name: "branch", value: "main" },
            { name: "profile", value: "prod" }
          ]
        };
      }
    } as never);

    const result = await client.listBuildParameters({
      job_id: "job-1",
      build_no: 5
    });

    expect(requestedPath).toBe("/v1/job/job-1/5/history-parameters");
    expect(result).toEqual({
      job_id: "job-1",
      build_no: 5,
      parameters: [
        { name: "branch", value: "main" },
        { name: "profile", value: "prod" }
      ]
    });
  });
});
