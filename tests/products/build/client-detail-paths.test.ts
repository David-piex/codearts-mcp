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

  it("uses the documented build parameter type endpoint", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            build_parameters: [
              {
                name: "hudson.model.StringParameterDefinition",
                title: "String Parameters",
                params: [{ name: "name", title: "Parameter", type: "text" }]
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.listBuildParameterTypes();

    expect(requestedPath).toBe("/v1/job/build-params");
    expect(result).toEqual({
      parameterTypes: [
        {
          name: "hudson.model.StringParameterDefinition",
          title: "String Parameters",
          params: [{ name: "name", title: "Parameter", type: "text" }]
        }
      ],
      total: 1
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
      getBinary: async (path: string) => {
        gets.push(path);
        return {
          body: new Uint8Array([1, 2, 3]),
          contentType: "text/plain",
          fileName: "build.log"
        };
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
    await client.downloadBuildLogV4({ record_id: "record-1", log_level: "DEBUG" });
    await client.downloadLogByRecordIdV3({ record_id: "record-1" });
    await client.downloadTaskLogV4({ record_id: "record-1", task_name: "stage1", log_level: "INFO" });
    await client.downloadKeystoreV2({ name: "android.jks", domain_id: "domain-1", id: "ks-1" });
    await client.downloadKeystoreV3({ file_name: "android.jks", domain_id: "domain-1" });
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
      "/v4/record-1/download-log?log_level=DEBUG",
      "/v3/record-1/download-log",
      "/v4/record-1/task-log?task_name=stage1&log_level=INFO",
      "/v2/keystore/download?name=android.jks&domain_id=domain-1&id=ks-1",
      "/v3/keystore?file_name=android.jks&domain_id=domain-1",
      "/v1/template/tpl-1/custom",
      "/v1/template/job-1/default-template",
      "/v2/keystore/list?page=1&page_size=10",
      "/v2/keystore/permission/ks-1/query"
    ]);
  });

  it("uses official v3 job config and flow graph endpoints", async () => {
    const gets: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        gets.push(path);
        if (path.includes("/flow-graph")) {
          return {
            result: {
              nodes: [{ id: "node-1" }],
              edges: [{ source: "node-1", target: "node-2" }]
            }
          };
        }
        return {
          result: {
            job_id: "job-1",
            job_name: "build-main"
          }
        };
      }
    } as never);

    await expect(client.listJobConfigV3({
      job_id: "job-1",
      get_all_params: "true"
    })).resolves.toEqual({
      job_id: "job-1",
      raw: {
        job_id: "job-1",
        job_name: "build-main"
      }
    });
    await expect(client.showFlowGraphV3({
      build_flow_record_id: "flow-1"
    })).resolves.toEqual({
      build_flow_record_id: "flow-1",
      nodes: [{ id: "node-1" }],
      edges: [{ source: "node-1", target: "node-2" }],
      raw: {
        nodes: [{ id: "node-1" }],
        edges: [{ source: "node-1", target: "node-2" }]
      }
    });

    expect(gets).toEqual([
      "/v3/jobs/job-1/query?get_all_params=true",
      "/v3/flow-1/flow-graph"
    ]);
  });
});
