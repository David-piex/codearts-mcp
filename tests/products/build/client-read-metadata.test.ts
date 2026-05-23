import { describe, expect, it } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient metadata read paths", () => {
  it("lists code tags with documented query names", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            total: 1,
            tags: [{ id: "tag-1", name: "v1.0.0" }]
          }
        };
      }
    } as never);

    const result = await client.listCodeTags({
      scm_type: "codehub",
      repo_id: "repo-1",
      search: "v1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v1/code/tags?scm_type=codehub&page_no=2&page_size=10&repo_id=repo-1&search=v1");
    expect(result).toEqual({
      tags: [{ id: "tag-1", name: "v1.0.0" }],
      total: 1
    });
  });

  it("preserves raw array report branches", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: ["main", "release"] };
      }
    } as never);

    const result = await client.listReportBranches({
      job_id: "job-1",
      repository_name: "repo"
    });

    expect(requestedPath).toBe("/v1/report/branches?job_id=job-1&repository_name=repo");
    expect(result).toEqual({ branches: ["main", "release"] });
  });

  it("lists report repositories from object payloads", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            latest: "repo-a",
            repositories: ["repo-a", "repo-b"]
          }
        };
      }
    } as never);

    const result = await client.listReportRepositories({ job_id: "job-1" });

    expect(requestedPath).toBe("/v1/report/job-1/repositories");
    expect(result).toEqual({
      latest: "repo-a",
      repositories: ["repo-a", "repo-b"],
      raw: {
        latest: "repo-a",
        repositories: ["repo-a", "repo-b"]
      }
    });
  });

  it("lists git-code repositories and branches", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/repositories")) {
          return { result: [{ id: "repo-1", name: "repo" }] };
        }
        return { result: { total: 1, branches: [{ name: "main" }] } };
      }
    } as never);

    const repositories = await client.listGitCodeRepositories({ endpoint_id: "endpoint-1" });
    const branches = await client.listGitCodeBranches({
      endpoint_id: "endpoint-1",
      repository_name: "repo"
    });

    expect(paths).toEqual([
      "/v1/code/git-code/endpoint-1/repositories",
      "/v1/code/git-code/endpoint-1/branches?repository_name=repo"
    ]);
    expect(repositories).toEqual({
      repositories: [{ id: "repo-1", name: "repo" }],
      total: 1
    });
    expect(branches).toEqual({
      branches: [{ name: "main" }],
      total: 1
    });
  });

  it("lists resource specs from raw array payloads", async () => {
    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: ["2u8g", "4u8g"] };
      }
    } as never);

    const result = await client.listResourceSpecs({
      project_id: "project-1",
      arch: "x86-64"
    });

    expect(requestedPath).toBe("/v2/resource/spec?project_id=project-1&arch=x86-64");
    expect(result).toEqual({ specs: ["2u8g", "4u8g"] });
  });

  it("keeps primitive domain and internal permission values", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        return { result: path.includes("federation") };
      }
    } as never);

    const federation = await client.getDomainFederation();
    const internalPermission = await client.getJobPermissionInternal();

    expect(paths).toEqual([
      "/v1/domain/federation",
      "/v1/job/permission/internal"
    ]);
    expect(federation).toEqual({
      value: true,
      raw: { value: true }
    });
    expect(internalPermission).toEqual({
      value: false,
      raw: { value: false }
    });
  });

  it("loads domain and job permission metadata", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/domain/project/related")) {
          return { result: { total: 1, projects: [{ id: "project-1" }] } };
        }
        if (path.includes("/job/permission/role")) {
          return { result: { roles: [{ id: "role-1" }] } };
        }
        return { result: { allowed: true } };
      }
    } as never);

    await client.getDomainUserPermission({ project_id: "project-1" });
    await client.getDomainPackageQuota({ project_id: "project-1" });
    await client.getDomainChargeType();
    await client.getDomainStatus();
    const projects = await client.getDomainRelatedProjects();
    const roles = await client.listJobPermissionRoles({ job_id: "job-1" });
    await client.getJobPermission({ project_id: "project-1", job_id: "job-1" });

    expect(paths).toEqual([
      "/v1/domain/user-permission?project_id=project-1",
      "/v1/domain/package/quota?project_id=project-1",
      "/v1/domain/charge-type",
      "/v1/domain/status",
      "/v1/domain/project/related",
      "/v1/job/permission/role?job_id=job-1",
      "/v1/job/permission?project_id=project-1&job_id=job-1"
    ]);
    expect(projects).toEqual({
      projects: [{ id: "project-1" }],
      total: 1
    });
    expect(roles).toEqual({
      roles: [{ id: "role-1" }],
      total: 1
    });
  });

  it("loads additional domain, package, Dockerfile, and report metadata", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/job-summary")) {
          return { result: { job_total: 2 } };
        }
        if (path.includes("/package-spec/status")) {
          return { result: [{ resource_id: "res-1", resource_status: "normal" }] };
        }
        if (path.includes("/dockerfile-template")) {
          return "FROM node:20";
        }
        if (path.includes("/job/check/exist")) {
          return { result: true, status: "success" };
        }
        return {
          result: {
            job_id: "job-1",
            branch: "main",
            total_count: 4,
            total_success_count: 3
          }
        };
      }
    } as never);

    const summary = await client.getDomainJobSummary();
    const statuses = await client.listPackageSpecStatuses({
      project_id: "project-1",
      status: "normal"
    });
    const template = await client.getDockerfileTemplate({ image_id: "image-1" });
    const exists = await client.checkJobNameExists({
      project_id: "project-1",
      job_name: "build-main"
    });
    const ratio = await client.getJobBuildSuccessRatio({
      job_id: "job-1",
      repository_name: "repo",
      branch: "main",
      interval: 7
    });

    expect(paths).toEqual([
      "/v1/domain/job-summary",
      "/v2/resource/package-spec/status?project_id=project-1&status=normal",
      "/v1/image/dockerfile-template?image_id=image-1",
      "/v1/job/check/exist?project_id=project-1&job_name=build-main",
      "/v1/report/ratio?job_id=job-1&repository_name=repo&branch=main&interval=7"
    ]);
    expect(summary).toEqual({ raw: { job_total: 2 } });
    expect(statuses).toEqual({
      statuses: [{ resource_id: "res-1", resource_status: "normal" }],
      total: 1
    });
    expect(template).toEqual({ image_id: "image-1", template: "FROM node:20" });
    expect(exists).toEqual({
      project_id: "project-1",
      job_name: "build-main",
      exists: true,
      raw: { value: true }
    });
    expect(ratio).toEqual({
      job_id: "job-1",
      repository_name: "repo",
      branch: "main",
      interval: 7,
      raw: {
        job_id: "job-1",
        branch: "main",
        total_count: 4,
        total_success_count: 3
      }
    });
  });

  it("loads Junit coverage summaries and metrics", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/junit/coverage/list")) {
          return {
            result: {
              unit_summary_list: [
                {
                  job_id: "job-1",
                  build_no: 3,
                  root_id: "root-1",
                  stage_name: "stage3"
                }
              ]
            }
          };
        }
        return {
          result: {
            lines: 100,
            covered_lines: 80,
            coverage: "80%"
          }
        };
      }
    } as never);

    const summaries = await client.listJunitCoverageSummaries({
      job_id: "job-1",
      build_no: 3
    });
    const metrics = await client.getCoverageMetrics({
      job_id: "job-1",
      build_no: 3,
      root_id: "root-1"
    });

    expect(paths).toEqual([
      "/v1/report/junit/coverage/list?job_id=job-1&build_no=3",
      "/v1/report/job-1/3/coverage/metrics?root_id=root-1"
    ]);
    expect(summaries).toEqual({
      summaries: [
        {
          job_id: "job-1",
          build_no: 3,
          root_id: "root-1",
          stage_name: "stage3"
        }
      ],
      total: 1
    });
    expect(metrics).toEqual({
      job_id: "job-1",
      build_no: 3,
      root_id: "root-1",
      raw: {
        lines: 100,
        covered_lines: 80,
        coverage: "80%"
      }
    });
  });

  it("loads additional report, diff, recycling, and domain page metadata", async () => {
    const paths: string[] = [];
    const client = createBuildClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/related-page")) {
          return { result: { total: 1, project_info_list: [{ id: "project-1", name: "demo" }] } };
        }
        if (path.includes("/diff")) {
          return { result: "changed: step image" };
        }
        if (path.includes("/recycling-jobs")) {
          return { result: { keep_time: 30, total: 1, job_list: [{ job_id: "job-1", name: "old" }] } };
        }
        if (path.includes("/job/check/count")) {
          return { result: true };
        }
        if (path.includes("/summary")) {
          return { result: { summary: { success: 2 }, sub_summarys: [] } };
        }
        return {
          result: {
            job_id: "job-1",
            avg_build_time: 120,
            chart: []
          }
        };
      }
    } as never);

    const projects = await client.listDomainRelatedProjectsPage({
      page: 2,
      page_size: 10,
      search: "demo"
    });
    const diff = await client.getJobConfigDiff({
      job_id: "job-1",
      revisedl_no: 3,
      original_no: 1
    });
    const recyclingJobs = await client.listRecyclingJobs({
      page: 3,
      page_size: 20,
      search: "old"
    });
    const countLimit = await client.checkJobCountLimit();
    const reportSummary = await client.getReportSummary({
      job_id: "job-1",
      build_no: 8
    });
    const buildTime = await client.getJobBuildTime({
      job_id: "job-1",
      repository_name: "repo",
      branch: "main",
      interval: 7
    });

    expect(paths).toEqual([
      "/v1/domain/project/related-page?page_size=10&page_no=2&search=demo",
      "/v1/job/job-1/diff?revisedl_no=3&original_no=1",
      "/v1/job/recycling-jobs?page_index=2&page_size=20&search=old",
      "/v1/job/check/count",
      "/v1/report/job-1/summary?build_no=8",
      "/v1/report/time?job_id=job-1&repository_name=repo&branch=main&interval=7"
    ]);
    expect(projects).toEqual({
      projects: [{ id: "project-1", name: "demo" }],
      total: 1,
      keep_time: undefined
    });
    expect(diff).toEqual({
      job_id: "job-1",
      revisedl_no: 3,
      original_no: 1,
      diff: "changed: step image"
    });
    expect(recyclingJobs).toEqual({
      jobs: [{ job_id: "job-1", name: "old" }],
      total: 1,
      keep_time: 30
    });
    expect(countLimit).toEqual({
      value: true,
      raw: { value: true }
    });
    expect(reportSummary).toEqual({
      job_id: "job-1",
      build_no: 8,
      raw: { summary: { success: 2 }, sub_summarys: [] }
    });
    expect(buildTime).toEqual({
      job_id: "job-1",
      repository_name: "repo",
      branch: "main",
      interval: 7,
      raw: {
        job_id: "job-1",
        avg_build_time: 120,
        chart: []
      }
    });
  });
});
