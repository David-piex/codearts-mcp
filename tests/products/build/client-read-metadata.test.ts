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
});
