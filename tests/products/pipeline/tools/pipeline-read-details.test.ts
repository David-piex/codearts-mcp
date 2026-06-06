import { describe, expect, it, vi } from "vitest";
import { createPipelineGetTemplateHandler, mapPipelineTemplate } from "../../../../src/products/pipeline/tools/get-template.js";
import { createPipelineGetWebhookInfoHandler } from "../../../../src/products/pipeline/tools/get-webhook-info.js";
import { createPipelineListPipelineVarsHandler } from "../../../../src/products/pipeline/tools/list-pipeline-vars.js";
import {
  createPipelineBatchShowPipelinesStatusHandler,
  createPipelineCheckVariableGroupRightsHandler,
  createPipelineGetChangeRequestHandler,
  createPipelineGetManifestVersionsHandler,
  createPipelineGetPackageUsageHandler,
  createPipelineGetRepositoryNumberHandler,
  createPipelineGetTenantPackageIsFreezeHandler,
  createPipelineGetComponentFollowStatusHandler,
  createPipelineGetDashboardConcurrencyHandler,
  createPipelineGetDevucAuthHandler,
  createPipelineGetOauthAuthorizationUrlHandler,
  createPipelineListArtifactVersionsHandler,
  createPipelineGetTenantVersionDetailHandler,
  createPipelineListCodeBranchesHandler,
  createPipelineListCodeRepositoriesHandler,
  createPipelineListChangeRequestCreatorsHandler,
  createPipelineListChangeRequestOperationLogsHandler,
  createPipelineListRelatedProjectsHandler,
  createPipelineListChangeRequestWorkItemsHandler,
  createPipelineListExecutionPlansHandler,
  createPipelineListPipelineBuildRecordsHandler,
  createPipelineListPipelineBuildResultsHandler,
  createPipelineListPipelinesV3Handler,
  createPipelineListPluginVersionNumbersHandler,
  createPipelineListReusableJobsHandler,
  createPipelineListTemplatesV3Handler,
  createPipelineQueryManifestVersionsHandler,
  createPipelineShowPipelineDetailV3Handler,
  createPipelineShowPipelineStatusHandler,
  createPipelineShowTemplateDetailV3Handler
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

  it("returns official Pipeline V3 read query outputs", async () => {
    const listArtifactVersions = vi.fn(async () => ({
      records: [{ id: "artifact-1", name: "release.zip" }],
      total: 1,
      raw: { data: [{ id: "artifact-1", name: "release.zip" }], total: 1 }
    }));
    const queryManifestVersions = vi.fn(async () => ({
      records: [{ pipelineId: "pipe-1", manifestVersion: "3.0" }],
      total: 1,
      raw: { pipelineId: { pipelineId: "pipe-1", manifestVersion: "3.0" } }
    }));
    const getManifestVersions = vi.fn(async () => ({
      records: [{ pipelineId: "pipe-2", manifestVersion: "3.0" }],
      total: 1,
      raw: { pipelineId: { pipelineId: "pipe-2", manifestVersion: "3.0" } }
    }));
    const listPluginVersionNumbers = vi.fn(async () => ({
      records: [{ value: "1.0.0" }],
      total: 1,
      raw: { data: ["1.0.0"], total: 1 }
    }));
    const listTemplatesV3 = vi.fn(async () => ({
      records: [{ template_id: "tpl-1", template_name: "Node.js" }],
      total: 1,
      raw: { content: [{ template_id: "tpl-1", template_name: "Node.js" }], total: 1 }
    }));
    const showTemplateDetailV3 = vi.fn(async () => ({
      item: { template_id: "tpl-1", template_name: "Node.js" },
      raw: { template_id: "tpl-1", template_name: "Node.js" }
    }));
    const batchShowPipelinesStatus = vi.fn(async () => ({
      records: [{ pipeline_id: "pipe-1", status: "completed" }],
      total: 1,
      raw: { data: [{ pipeline_id: "pipe-1", status: "completed" }] }
    }));
    const listPipelinesV3 = vi.fn(async () => ({
      records: [{ pipeline_id: "pipe-1", pipeline_name: "release-main" }],
      total: 1,
      raw: { result: [{ pipeline_id: "pipe-1", pipeline_name: "release-main" }], total: 1 }
    }));
    const showPipelineStatus = vi.fn(async () => ({
      item: { pipeline_id: "pipe-1", status: "running" },
      raw: { pipeline_id: "pipe-1", status: "running" }
    }));
    const listPipelineBuildResults = vi.fn(async () => ({
      records: [{ pipeline_id: "pipe-1", build_id: "build-1", status: "completed" }],
      total: 1,
      raw: {
        build_results: [{ pipeline_id: "pipe-1", build_id: "build-1", status: "completed" }],
        total: 1
      }
    }));
    const showPipelineDetailV3 = vi.fn(async () => ({
      item: { workflow: { pipeline_id: "pipe-1" }, states: [] },
      raw: { workflow: { pipeline_id: "pipe-1" }, states: [] }
    }));
    const listPipelineBuildRecords = vi.fn(async () => ({
      records: [{ pipeline_id: "pipe-1", build_id: "build-1", outcome: "success" }],
      total: 1,
      raw: {
        records: [{ pipeline_id: "pipe-1", build_id: "build-1", outcome: "success" }],
        total: 1
      }
    }));
    const artifactVersions = createPipelineListArtifactVersionsHandler({
      listArtifactVersions
    } as never);
    const queriedManifestVersions = createPipelineQueryManifestVersionsHandler({
      queryManifestVersions
    } as never);
    const manifestVersions = createPipelineGetManifestVersionsHandler({
      getManifestVersions
    } as never);
    const pluginVersionNumbers = createPipelineListPluginVersionNumbersHandler({
      listPluginVersionNumbers
    } as never);
    const templates = createPipelineListTemplatesV3Handler({
      listTemplatesV3
    } as never);
    const templateDetail = createPipelineShowTemplateDetailV3Handler({
      showTemplateDetailV3
    } as never);
    const pipelineStatuses = createPipelineBatchShowPipelinesStatusHandler({
      batchShowPipelinesStatus
    } as never);
    const pipelinesV3 = createPipelineListPipelinesV3Handler({
      listPipelinesV3
    } as never);
    const pipelineStatus = createPipelineShowPipelineStatusHandler({
      showPipelineStatus
    } as never);
    const buildResults = createPipelineListPipelineBuildResultsHandler({
      listPipelineBuildResults
    } as never);
    const pipelineDetail = createPipelineShowPipelineDetailV3Handler({
      showPipelineDetailV3
    } as never);
    const buildRecords = createPipelineListPipelineBuildRecordsHandler({
      listPipelineBuildRecords
    } as never);

    const artifactResult = await artifactVersions({ cloud_project_id: "project-1" });
    const queriedManifestResult = await queriedManifestVersions({
      project_id: "project-1",
      pipeline_ids: ["pipe-1"]
    });
    const manifestResult = await manifestVersions({ pipeline_ids: ["pipe-2"] });
    const pluginVersionResult = await pluginVersionNumbers({
      domain_id: "domain-1",
      plugin_name: "deploy"
    });
    const templatesResult = await templates({ template_type: "pipeline" });
    const templateDetailResult = await templateDetail({
      template_id: "tpl-1",
      template_type: "pipeline"
    });
    const pipelineStatusesResult = await pipelineStatuses({ pipeline_ids: ["pipe-1"] });
    const pipelinesV3Result = await pipelinesV3({ project_id: "project-1" });
    const pipelineStatusResult = await pipelineStatus({ pipeline_id: "pipe-1" });
    const buildResultsResult = await buildResults({
      project_id: "project-1",
      start_date: "2026-01-01",
      end_date: "2026-01-31"
    });
    const pipelineDetailResult = await pipelineDetail({ pipeline_id: "pipe-1" });
    const buildRecordsResult = await buildRecords({ pipeline_id: "pipe-1" });

    expect(artifactResult.content[0]?.text).toContain("Loaded 1 pipeline artifact versions");
    expect(artifactResult.structuredContent.items?.[0]?.artifactVersion).toEqual({
      id: "artifact-1",
      name: "release.zip"
    });
    expect(queriedManifestResult.structuredContent.items?.[0]?.manifestVersion).toEqual({
      pipelineId: "pipe-1",
      manifestVersion: "3.0"
    });
    expect(queriedManifestResult.structuredContent.items?.[0]?.id).toBe("pipe-1");
    expect(manifestResult.structuredContent.items?.[0]?.manifestVersion).toEqual({
      pipelineId: "pipe-2",
      manifestVersion: "3.0"
    });
    expect(manifestResult.structuredContent.items?.[0]?.id).toBe("pipe-2");
    expect(pluginVersionResult.structuredContent.items?.[0]?.pluginVersionNumber).toEqual({
      value: "1.0.0"
    });
    expect(templatesResult.structuredContent.items?.[0]?.template).toEqual({
      template_id: "tpl-1",
      template_name: "Node.js"
    });
    expect(templateDetailResult.structuredContent.item?.template).toEqual({
      template_id: "tpl-1",
      template_name: "Node.js"
    });
    expect(pipelineStatusesResult.structuredContent.items?.[0]?.pipelineStatus).toEqual({
      pipeline_id: "pipe-1",
      status: "completed"
    });
    expect(pipelinesV3Result.structuredContent.items?.[0]?.pipeline).toEqual({
      pipeline_id: "pipe-1",
      pipeline_name: "release-main"
    });
    expect(pipelineStatusResult.structuredContent.item?.pipelineStatus).toEqual({
      pipeline_id: "pipe-1",
      status: "running"
    });
    expect(buildResultsResult.structuredContent.items?.[0]?.buildResult).toEqual({
      pipeline_id: "pipe-1",
      build_id: "build-1",
      status: "completed"
    });
    expect(pipelineDetailResult.structuredContent.item?.pipelineDetail).toEqual({
      workflow: { pipeline_id: "pipe-1" },
      states: []
    });
    expect(buildRecordsResult.structuredContent.items?.[0]?.buildRecord).toEqual({
      pipeline_id: "pipe-1",
      build_id: "build-1",
      outcome: "success"
    });
    expect(listArtifactVersions).toHaveBeenCalledWith({
      cloud_project_id: "project-1",
      query: "",
      page_index: 1,
      page_size: 10,
      parent_id: "",
      metadata_type: "generic",
      name: "",
      repo_branch: ""
    });
    expect(queryManifestVersions).toHaveBeenCalledWith({
      project_id: "project-1",
      pipeline_ids: ["pipe-1"]
    });
    expect(getManifestVersions).toHaveBeenCalledWith({
      pipeline_ids: ["pipe-2"]
    });
    expect(listPluginVersionNumbers).toHaveBeenCalledWith({
      domain_id: "domain-1",
      plugin_name: "deploy",
      offset: 0,
      limit: 20
    });
    expect(listTemplatesV3).toHaveBeenCalledWith({
      template_type: "pipeline",
      is_build_in: false,
      offset: 0,
      limit: 20
    });
    expect(showTemplateDetailV3).toHaveBeenCalledWith({
      template_id: "tpl-1",
      template_type: "pipeline"
    });
    expect(batchShowPipelinesStatus).toHaveBeenCalledWith({
      pipeline_ids: ["pipe-1"]
    });
    expect(listPipelinesV3).toHaveBeenCalledWith({
      project_id: "project-1",
      offset: 0,
      limit: 10
    });
    expect(showPipelineStatus).toHaveBeenCalledWith({
      pipeline_id: "pipe-1"
    });
    expect(listPipelineBuildResults).toHaveBeenCalledWith({
      project_id: "project-1",
      start_date: "2026-01-01",
      end_date: "2026-01-31",
      offset: 0,
      limit: 20
    });
    expect(showPipelineDetailV3).toHaveBeenCalledWith({
      pipeline_id: "pipe-1"
    });
    expect(listPipelineBuildRecords).toHaveBeenCalledWith({
      pipeline_id: "pipe-1",
      offset: 0,
      limit: 20
    });
  });
});
