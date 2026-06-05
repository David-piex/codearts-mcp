import { describe, expect, it } from "vitest";
import { createPipelineGetTemplateHandler, mapPipelineTemplate } from "../../../../src/products/pipeline/tools/get-template.js";
import { createPipelineGetWebhookInfoHandler } from "../../../../src/products/pipeline/tools/get-webhook-info.js";
import { createPipelineListPipelineVarsHandler } from "../../../../src/products/pipeline/tools/list-pipeline-vars.js";
import {
  createPipelineCheckVariableGroupRightsHandler,
  createPipelineGetChangeRequestHandler,
  createPipelineGetPackageUsageHandler,
  createPipelineGetRepositoryNumberHandler,
  createPipelineGetTenantPackageIsFreezeHandler,
  createPipelineGetComponentFollowStatusHandler,
  createPipelineGetDashboardConcurrencyHandler,
  createPipelineGetDevucAuthHandler,
  createPipelineGetOauthAuthorizationUrlHandler,
  createPipelineGetTenantVersionDetailHandler,
  createPipelineListCodeBranchesHandler,
  createPipelineListCodeRepositoriesHandler,
  createPipelineListChangeRequestCreatorsHandler,
  createPipelineListChangeRequestOperationLogsHandler,
  createPipelineListRelatedProjectsHandler,
  createPipelineListChangeRequestWorkItemsHandler,
  createPipelineListExecutionPlansHandler,
  createPipelineListReusableJobsHandler
} from "../../../../src/products/pipeline/tools/product-query-tools.js";

describe("Pipeline read detail tools", () => {
  it("maps pipeline template detail", () => {
    const result = mapPipelineTemplate({
      id: "tpl-1",
      name: "Node.js",
      manifest_version: "3.0",
      language: "nodejs",
      is_system: true,
      region: "cn-north-4",
      template: { id: "tpl-1", name: "Node.js" }
    });

    expect(result.item).toEqual({
      id: "tpl-1",
      name: "Node.js",
      icon: undefined,
      manifestVersion: "3.0",
      language: "nodejs",
      description: undefined,
      isSystem: true,
      region: "cn-north-4",
      template: { id: "tpl-1", name: "Node.js" }
    });
  });

  it("returns pipeline webhook info", async () => {
    const handler = createPipelineGetWebhookInfoHandler({
      getWebhookInfo: async () => ({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        webhook: { id: "webhook-1", name: "default webhook" }
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline webhook info pipe-1");
    expect(result.structuredContent.item?.webhook).toEqual({
      id: "webhook-1",
      name: "default webhook"
    });
    expect(result.structuredContent.projectId).toBe("project-1");
  });

  it("returns pipeline variables", async () => {
    const handler = createPipelineListPipelineVarsHandler({
      listPipelineVars: async () => ({
        project_id: "project-1",
        pipeline_id: "pipe-1",
        variables: [{ id: "var-1", name: "APP_ENV", value: "prod" }],
        total: 1,
        raw: { variables: [{ id: "var-1", name: "APP_ENV", value: "prod" }], total: 1 }
      })
    });

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline variables");
    expect(result.structuredContent.items?.[0]?.variable).toEqual({
      id: "var-1",
      name: "APP_ENV",
      value: "prod"
    });
    expect(result.structuredContent.pipelineId).toBe("pipe-1");
  });

  it("returns pipeline template detail from the handler", async () => {
    const handler = createPipelineGetTemplateHandler({
      getTemplate: async () => ({
        id: "tpl-1",
        name: "Node.js",
        manifest_version: "3.0",
        template: { id: "tpl-1", name: "Node.js" }
      })
    });

    const result = await handler({ tenant_id: "tenant-1", template_id: "tpl-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline template Node.js");
    expect(result.structuredContent.item?.id).toBe("tpl-1");
    expect(result.structuredContent.item?.template).toEqual({ id: "tpl-1", name: "Node.js" });
  });

  it("returns raw list query tool output", async () => {
    const handler = createPipelineListExecutionPlansHandler({
      listExecutionPlans: async () => ({
        records: [{ id: "plan-1", name: "Nightly" }],
        total: 1,
        raw: { records: [{ id: "plan-1", name: "Nightly" }], total: 1 }
      })
    } as never);

    const result = await handler({ project_id: "project-1", pipeline_id: "pipe-1" });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline execution plans");
    expect(result.structuredContent.items?.[0]?.executionPlan).toEqual({
      id: "plan-1",
      name: "Nightly"
    });
    expect((result.structuredContent as Record<string, unknown>).executionPlans).toEqual({
      records: [{ id: "plan-1", name: "Nightly" }],
      total: 1
    });
  });

  it("returns raw item query tool output", async () => {
    const handler = createPipelineGetChangeRequestHandler({
      getChangeRequest: async () => ({
        item: { id: "cr-1", name: "Release CR" },
        raw: { id: "cr-1", name: "Release CR" }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });

    expect(result.content[0]?.text).toContain("Loaded pipeline change request");
    expect(result.structuredContent.item?.changeRequest).toEqual({
      id: "cr-1",
      name: "Release CR"
    });
  });

  it("returns change request creators query output", async () => {
    const handler = createPipelineListChangeRequestCreatorsHandler({
      listChangeRequestCreators: async () => ({
        records: [{ creator_id: "user-1", creator_name: "yao" }],
        total: 1,
        raw: { result: [{ creator_id: "user-1", creator_name: "yao" }] }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline change request creators");
    expect(result.structuredContent.items?.[0]?.changeRequestCreator).toEqual({
      creator_id: "user-1",
      creator_name: "yao"
    });
  });

  it("returns component follow status query output", async () => {
    const handler = createPipelineGetComponentFollowStatusHandler({
      getComponentFollowStatus: async () => ({
        item: { component_id: "component-1", favorite: true },
        raw: { result: true }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    expect(result.content[0]?.text).toContain("Loaded pipeline component follow status");
    expect(result.structuredContent.item?.componentFollowStatus).toEqual({
      component_id: "component-1",
      favorite: true
    });
  });

  it("returns variable group rights query output", async () => {
    const handler = createPipelineCheckVariableGroupRightsHandler({
      checkVariableGroupRights: async () => ({
        records: [{ action: "read", verdict: "allow" }],
        total: 1,
        raw: { result: [{ action: "read", verdict: "allow" }] }
      })
    } as never);

    const result = await handler({
      project_id: "project-1"
    });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline variable group rights");
    expect(result.structuredContent.items?.[0]?.variableGroupRight).toEqual({
      action: "read",
      verdict: "allow"
    });
  });

  it("returns change request operation logs query output", async () => {
    const handler = createPipelineListChangeRequestOperationLogsHandler({
      listChangeRequestOperationLogs: async () => ({
        records: [{ id: "log-1", operate: "create", operator_name: "yao" }],
        total: 1,
        raw: { total: 1, data: [{ id: "log-1", operate: "create", operator_name: "yao" }] }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline change request operation logs");
    expect(result.structuredContent.items?.[0]?.changeRequestOperationLog).toEqual({
      id: "log-1",
      operate: "create",
      operator_name: "yao"
    });
    expect((result.structuredContent as Record<string, unknown>).changeRequestOperationLogs).toEqual({
      total: 1,
      data: [{ id: "log-1", operate: "create", operator_name: "yao" }]
    });
  });

  it("returns change request work items query output", async () => {
    const handler = createPipelineListChangeRequestWorkItemsHandler({
      listChangeRequestWorkItems: async () => ({
        records: [{ work_item_id: "70844211", title: "运营" }],
        total: 1,
        raw: { result: [{ work_item_id: "70844211", title: "运营" }] }
      })
    } as never);

    const result = await handler({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });

    expect(result.content[0]?.text).toContain("Loaded 1 pipeline change request work items");
    expect(result.structuredContent.items?.[0]?.changeRequestWorkItem).toEqual({
      work_item_id: "70844211",
      title: "运营"
    });
  });

  it("passes defaulted pagination to reusable job query tools", async () => {
    let received: unknown;
    const handler = createPipelineListReusableJobsHandler({
      listReusableJobs: async (input: unknown) => {
        received = input;
        return {
          records: [],
          total: 0,
          raw: { records: [], total: 0 }
        };
      }
    } as never);

    await handler({ project_id: "project-1" });

    expect(received).toEqual({
      project_id: "project-1",
      offset: 0,
      limit: 20
    });
  });

  it("returns dashboard item query tool output", async () => {
    const handler = createPipelineGetDashboardConcurrencyHandler({
      getDashboardConcurrency: async () => ({
        item: { running: 2 },
        raw: { running: 2 }
      })
    } as never);

    const result = await handler({ tenant_id: "tenant-1" });

    expect(result.content[0]?.text).toContain("Loaded pipeline dashboard concurrency");
    expect(result.structuredContent.item?.dashboardConcurrency).toEqual({ running: 2 });
  });

  it("returns related project and tenant version query outputs", async () => {
    const relatedProjects = createPipelineListRelatedProjectsHandler({
      listRelatedProjects: async () => ({
        records: [{ id: 1, identifier: "proj-1", name: "Mall", enable_create_pipeline: true }],
        total: 1,
        raw: { total: 1, project_info_list: [{ id: 1, identifier: "proj-1", name: "Mall", enable_create_pipeline: true }] }
      })
    } as never);
    const tenantVersion = createPipelineGetTenantVersionDetailHandler({
      getTenantVersionDetail: async () => ({
        item: { region: "cn-north-4", version: "3.0", domain_id: "tenant-1" },
        raw: { region: "cn-north-4", version: "3.0", domain_id: "tenant-1" }
      })
    } as never);

    const relatedProjectsResult = await relatedProjects({ tenant_id: "tenant-1" });
    const tenantVersionResult = await tenantVersion({ tenant_id: "tenant-1" });

    expect(relatedProjectsResult.content[0]?.text).toContain("Loaded 1 pipeline related projects");
    expect(relatedProjectsResult.structuredContent.items?.[0]?.relatedProject).toEqual({
      id: 1,
      identifier: "proj-1",
      name: "Mall",
      enable_create_pipeline: true
    });
    expect(tenantVersionResult.content[0]?.text).toContain("Loaded pipeline tenant version detail");
    expect(tenantVersionResult.structuredContent.item?.tenantVersionDetail).toEqual({
      region: "cn-north-4",
      version: "3.0",
      domain_id: "tenant-1"
    });
  });

  it("returns code repository, code branch, repository number, package freeze and usage outputs", async () => {
    const codeRepositories = createPipelineListCodeRepositoriesHandler({
      listCodeRepositories: async () => ({
        records: [{ id: "repo-1", name: "phoenix-sample", group_name: "demo" }],
        total: 1,
        raw: { data: [{ id: "repo-1", name: "phoenix-sample", group_name: "demo" }], total: 1 }
      })
    } as never);
    const codeBranches = createPipelineListCodeBranchesHandler({
      listCodeBranches: async () => ({
        records: [{ name: "master" }],
        total: 1,
        raw: { result: [{ name: "master" }] }
      })
    } as never);
    const repositoryNumber = createPipelineGetRepositoryNumberHandler({
      getRepositoryNumber: async () => ({
        item: { repository_number: 20 },
        raw: { repository_number: 20 }
      })
    } as never);
    const packageFreeze = createPipelineGetTenantPackageIsFreezeHandler({
      getTenantPackageIsFreeze: async () => ({
        item: { freeze: false, packageName: "free" },
        raw: { freeze: false, packageName: "free" }
      })
    } as never);
    const packageUsage = createPipelineGetPackageUsageHandler({
      getPackageUsage: async () => ({
        item: { domain_id: "tenant-1", usage: { execute_duration: "0.0000" } },
        raw: { domain_id: "tenant-1", usage: { execute_duration: "0.0000" } }
      })
    } as never);

    const codeRepositoriesResult = await codeRepositories({ cloud_project_id: "project-1" });
    const codeBranchesResult = await codeBranches({ cloud_project_id: "project-1", repoId: "repo-1" });
    const repositoryNumberResult = await repositoryNumber({
      tenant_id: "tenant-1",
      domain_id: "tenant-1",
      region: "cn-north-4"
    });
    const packageFreezeResult = await packageFreeze({ tenant_id: "tenant-1" });
    const packageUsageResult = await packageUsage({ tenant_id: "tenant-1" });

    expect(codeRepositoriesResult.content[0]?.text).toContain("Loaded 1 pipeline code repositories");
    expect(codeRepositoriesResult.structuredContent.items?.[0]?.codeRepository).toEqual({
      id: "repo-1",
      name: "phoenix-sample",
      group_name: "demo"
    });
    expect(codeBranchesResult.content[0]?.text).toContain("Loaded 1 pipeline code branches");
    expect(codeBranchesResult.structuredContent.items?.[0]?.codeBranch).toEqual({
      name: "master"
    });
    expect(repositoryNumberResult.structuredContent.item?.repositoryNumber).toEqual({
      repository_number: 20
    });
    expect(packageFreezeResult.structuredContent.item?.tenantPackageFreeze).toEqual({
      freeze: false,
      packageName: "free"
    });
    expect(packageUsageResult.structuredContent.item?.packageUsage).toEqual({
      domain_id: "tenant-1",
      usage: { execute_duration: "0.0000" }
    });
  });

  it("returns authorization helper query outputs", async () => {
    const oauth = createPipelineGetOauthAuthorizationUrlHandler({
      getOauthAuthorizationUrl: async () => ({
        item: { url: "https://auth.example.com" },
        raw: { url: "https://auth.example.com" }
      })
    } as never);
    const devuc = createPipelineGetDevucAuthHandler({
      getDevucAuth: async () => ({
        item: { authorized: true },
        raw: { authorized: true }
      })
    } as never);

    const oauthResult = await oauth({ query: { redirect_uri: "https://example.com/cb" } });
    const devucResult = await devuc({ cloud_project_id: "project-1" });

    expect(oauthResult.structuredContent.item?.authorizationUrl).toEqual({
      url: "https://auth.example.com"
    });
    expect(devucResult.structuredContent.item?.devucAuth).toEqual({
      authorized: true
    });
  });
});
