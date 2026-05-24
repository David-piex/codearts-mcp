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
          pre_condition: "SUCCESS",
          properties: {
            image: "nodejs20",
            command: "npm ci && npm run build",
            preCondition: "SUCCESS"
          }
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

  it("uses additional documented read endpoints", async () => {
    const gets: string[] = [];
    const posts: Array<{ path: string; body: unknown }> = [];
    const client = createBuildClient({
      get: async (path: string) => {
        gets.push(path);
        if (path.includes("/history")) {
          return { result: { history: [{ id: "h1" }], total: 1 } };
        }
        if (path.includes("/nexus")) {
          return { result: { endpoints: [{ id: "e1" }] } };
        }
        if (path.includes("/badge/branches")) {
          return { result: { branches: [{ id: "main", name: "main" }] } };
        }
        if (path.includes("/keystore/list")) {
          return { result: { files: [{ id: "ks1", name: "signing" }] } };
        }
        return { result: { ok: true } };
      },
      post: async (path: string, body: unknown) => {
        posts.push({ path, body });
        return { result: { ok: true, templates: [{ id: "tpl1" }] } };
      }
    } as never);

    await client.showPackageSpecCountdown({ body: { project_id: "project-1" } });
    await client.listJobUpdateHistory({ job_id: "job-1" });
    await client.getJobOutput({ job_id: "job-1", build_no: 3 });
    await client.getJobStepStatus({ job_id: "job-1" });
    await client.getJobPipelineInfo({ job_id: "job-1" });
    await client.listProjectEndpoints({ project_id: "project-1" });
    await client.showDomainsStatuses({ body: { domain_ids: ["domain-1"] } });
    await client.listJobBadgeBranches({ job_id: "job-1" });
    await client.getRunningStepLog({ query: { job_id: "job-1", build_no: 3 } });
    await client.getStageLogPage({ query: { record_id: "record-1", offset: 0 } });
    await client.downloadFullLog({ record_id: "record-1" });
    await client.downloadTaskLog({ record_id: "record-1" });
    await client.getTemplate({ uuid: "tpl-1" });
    await client.getYamlTemplate({ job_id: "job-1" });
    await client.listRecommendedOfficialTemplates({ body: { keyword: "node" } });
    await client.listKeystoreFiles({ query: { page: 1, page_size: 10 } });
    await client.getKeystorePermission({ keystore_id: "ks-1" });

    expect(posts).toEqual([
      { path: "/v2/resource/countdown", body: { project_id: "project-1" } },
      { path: "/v1/domain/domains-statuses", body: { domain_ids: ["domain-1"] } },
      { path: "/v1/template/recommend", body: { keyword: "node" } }
    ]);
    expect(gets).toEqual([
      "/v1/job/job-1/history",
      "/v1/job/job-1/3/output",
      "/v1/job/job-1/status",
      "/v1/job/job-1/pipeline-info",
      "/v1/job/project-1/nexus",
      "/v1/job/job-1/badge/branches",
      "/v1/log/task/step?job_id=job-1&build_no=3",
      "/v1/log/stage/page?record_id=record-1&offset=0",
      "/v1/log/record-1/download-log",
      "/v1/log/record-1/task-log",
      "/v1/template/tpl-1/custom",
      "/v1/template/job-1/default-template",
      "/v2/keystore/list?page=1&page_size=10",
      "/v2/keystore/permission/ks-1/query"
    ]);
  });
});
