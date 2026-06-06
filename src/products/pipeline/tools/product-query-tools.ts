import {
  pipelineBatchGetPipelineStatusInput,
  pipelineBatchShowPipelinesStatusInput,
  pipelineCheckComponentInput,
  pipelineCheckProjectInput,
  pipelineDashboardQueryInput,
  pipelineGetChangeRequestInput,
  pipelineGetPackageUsageInput,
  pipelineGetRepositoryNumberInput,
  pipelineGetTenantPackageIsFreezeInput,
  pipelineGetTenantVersionDetailInput,
  pipelineGetComponentInput,
  pipelineGetComponentFollowStatusInput,
  pipelineGetDevucAuthInput,
  pipelineGetManifestVersionsInput,
  pipelineGetNoticeMessagesInput,
  pipelineGetOauthAuthorizationUrlInput,
  pipelineGetPacActionInput,
  pipelineListArtifactVersionsInput,
  pipelineCheckVariableGroupRightsInput,
  pipelineListPipelineBuildRecordsInput,
  pipelineListPipelineBuildResultsInput,
  pipelineListChangeRequestOperationLogsInput,
  pipelineListChangeRequestCreatorsInput,
  pipelineListChangeRequestWorkItemsInput,
  pipelineListChangeRequestsInput,
  pipelineListComponentsInput,
  pipelineListCodeBranchesInput,
  pipelineListCodeRepositoriesInput,
  pipelineListExecutionPlansInput,
  pipelineListRelatedProjectsInput,
  pipelineListPipelinesV3Input,
  pipelineListPluginVersionNumbersInput,
  pipelineListPacActionsInput,
  pipelineListReusableJobsInput,
  pipelineListTemplatesV3Input,
  pipelineQueryManifestVersionsInput,
  pipelineShowPipelineDetailV3Input,
  pipelineShowPipelineStatusInput,
  pipelineShowTemplateDetailV3Input
} from "../schemas.js";
import { createPipelineRawItemHandler, createPipelineRawListHandler } from "./raw-query-tools.js";

type RawRecord = Record<string, unknown>;
type RawListResponse = { records: RawRecord[]; total?: number; raw: RawRecord };
type RawItemResponse = { item: RawRecord; raw: RawRecord };

export type PipelineProductQueryClient = {
  listArtifactVersions: (input: {
    cloud_project_id: string;
    query?: string;
    page_index: number;
    page_size: number;
    parent_id?: string;
    metadata_type?: string;
    name?: string;
    repo_branch?: string;
  }) => Promise<RawListResponse>;
  queryManifestVersions: (input: {
    project_id: string;
    pipeline_ids: string[];
    body?: RawRecord[];
  }) => Promise<RawListResponse>;
  getManifestVersions: (input: {
    pipeline_ids: string[];
    body?: RawRecord[];
  }) => Promise<RawListResponse>;
  listPluginVersionNumbers: (input: {
    domain_id: string;
    plugin_name: string;
    offset: number;
    limit: number;
  }) => Promise<RawListResponse>;
  listTemplatesV3: (input: {
    template_type: string;
    is_build_in: boolean;
    offset: number;
    limit: number;
    name?: string;
    sort?: string;
    asc?: boolean;
  }) => Promise<RawListResponse>;
  showTemplateDetailV3: (input: {
    template_id: string;
    template_type: string;
    source?: string;
  }) => Promise<RawItemResponse>;
  batchShowPipelinesStatus: (input: {
    pipeline_ids: string[];
  }) => Promise<RawListResponse>;
  listPipelinesV3: (input: {
    project_id?: string;
    project_ids?: string[];
    pipeline_name?: string;
    creator_ids?: string[];
    executor_ids?: string[];
    status?: string;
    outcome?: string;
    sort_key?: string;
    sort_dir?: "asc" | "desc";
    git_url?: string;
    offset: number;
    limit: number;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  showPipelineStatus: (input: {
    pipeline_id: string;
    build_id?: string;
  }) => Promise<RawItemResponse>;
  listPipelineBuildResults: (input: {
    project_id: string;
    start_date: string;
    end_date: string;
    offset: number;
    limit: number;
  }) => Promise<RawListResponse>;
  showPipelineDetailV3: (input: {
    pipeline_id: string;
    build_id?: string;
  }) => Promise<RawItemResponse>;
  listPipelineBuildRecords: (input: {
    pipeline_id: string;
    start_date?: string;
    end_date?: string;
    offset: number;
    limit: number;
    status?: string;
    outcome?: string;
  }) => Promise<RawListResponse>;
  batchGetPipelineStatus: (input: {
    project_id: string;
    pipeline_ids?: string[];
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  getNoticeMessages: (input: { project_id: string; pipeline_id: string }) => Promise<RawListResponse>;
  checkProject: (input: { project_id: string; type: string }) => Promise<RawItemResponse>;
  checkComponent: (input: {
    project_id: string;
    component_id?: string;
    component_name?: string;
    query?: RawRecord;
  }) => Promise<RawItemResponse>;
  listExecutionPlans: (input: { project_id: string; pipeline_id: string }) => Promise<RawListResponse>;
  listReusableJobs: (input: {
    project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  listDashboardPipelineCounts: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: RawRecord;
  }) => Promise<RawListResponse>;
  getDashboardExecutionsOverview: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: RawRecord;
  }) => Promise<RawItemResponse>;
  getDashboardConcurrency: (input: {
    tenant_id: string;
    start_time?: string;
    end_time?: string;
    query?: RawRecord;
  }) => Promise<RawItemResponse>;
  listChangeRequests: (input: {
    cloud_project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  listChangeRequestCreators: (input: {
    cloud_project_id: string;
    component_id: string;
    name?: string;
  }) => Promise<RawListResponse>;
  getChangeRequest: (input: {
    cloud_project_id: string;
    change_request_id: string;
  }) => Promise<RawItemResponse>;
  listChangeRequestOperationLogs: (input: {
    cloud_project_id: string;
    change_request_id: string;
    offset: number;
    limit: number;
  }) => Promise<RawListResponse>;
  listChangeRequestWorkItems: (input: {
    cloud_project_id: string;
    change_request_id: string;
  }) => Promise<RawListResponse>;
  listComponents: (input: {
    cloud_project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  getComponent: (input: { cloud_project_id: string; component_id: string }) => Promise<RawItemResponse>;
  getComponentFollowStatus: (input: {
    cloud_project_id: string;
    component_id: string;
  }) => Promise<RawItemResponse>;
  checkVariableGroupRights: (input: {
    project_id: string;
  }) => Promise<RawListResponse>;
  listRelatedProjects: (input: {
    tenant_id: string;
    page_index: number;
    page_size: number;
    search?: string;
  }) => Promise<RawListResponse>;
  listCodeRepositories: (input: {
    cloud_project_id: string;
    repoType?: string;
    query?: string;
    workspace?: string;
    authEndpoint?: string;
    offset: number;
    limit: number;
  }) => Promise<RawListResponse>;
  listCodeBranches: (input: {
    cloud_project_id: string;
    repoUrl?: string;
    authEndpoint?: string;
    repoId?: string;
    pipelineId?: string;
    search?: string;
    offset: number;
    limit: number;
  }) => Promise<RawListResponse>;
  getRepositoryNumber: (input: {
    tenant_id: string;
    domain_id: string;
    region: string;
    project_id?: string;
  }) => Promise<RawItemResponse>;
  getTenantPackageIsFreeze: (input: {
    tenant_id: string;
    project_id?: string;
  }) => Promise<RawItemResponse>;
  getPackageUsage: (input: {
    tenant_id: string;
    project_id?: string;
  }) => Promise<RawItemResponse>;
  getTenantVersionDetail: (input: {
    tenant_id: string;
  }) => Promise<RawItemResponse>;
  listPacActions: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  getPacAction: (input: {
    domain_id: string;
    pipeline_id: string;
    pipeline_run_id: string;
  }) => Promise<RawItemResponse>;
  getOauthAuthorizationUrl: (input: { query?: RawRecord }) => Promise<RawItemResponse>;
  getDevucAuth: (input: {
    cloud_project_id: string;
    query?: RawRecord;
  }) => Promise<RawItemResponse>;
};

export const createPipelineListArtifactVersionsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListArtifactVersionsInput,
    call: (input) => client.listArtifactVersions(input),
    noun: "pipeline artifact versions",
    itemKey: "artifactVersion",
    rawKey: "artifactVersions"
  });

export const createPipelineQueryManifestVersionsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineQueryManifestVersionsInput,
    call: (input) => client.queryManifestVersions(input),
    noun: "pipeline manifest versions",
    itemKey: "manifestVersion",
    rawKey: "manifestVersions"
  });

export const createPipelineGetManifestVersionsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineGetManifestVersionsInput,
    call: (input) => client.getManifestVersions(input),
    noun: "pipeline manifest versions",
    itemKey: "manifestVersion",
    rawKey: "manifestVersions"
  });

export const createPipelineListPluginVersionNumbersHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListPluginVersionNumbersInput,
    call: (input) => client.listPluginVersionNumbers(input),
    noun: "pipeline plugin version numbers",
    itemKey: "pluginVersionNumber",
    rawKey: "pluginVersionNumbers"
  });

export const createPipelineListTemplatesV3Handler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListTemplatesV3Input,
    call: (input) => client.listTemplatesV3(input),
    noun: "Pipeline V3 templates",
    itemKey: "template",
    rawKey: "templates"
  });

export const createPipelineShowTemplateDetailV3Handler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineShowTemplateDetailV3Input,
    call: (input) => client.showTemplateDetailV3(input),
    summary: "Loaded Pipeline V3 template detail",
    itemKey: "template",
    id: (input) => input.template_id
  });

export const createPipelineBatchShowPipelinesStatusHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineBatchShowPipelinesStatusInput,
    call: (input) => client.batchShowPipelinesStatus(input),
    noun: "Pipeline V3 status records",
    itemKey: "pipelineStatus",
    rawKey: "pipelineStatuses"
  });

export const createPipelineListPipelinesV3Handler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListPipelinesV3Input,
    call: (input) => client.listPipelinesV3(input),
    noun: "Pipeline V3 pipelines",
    itemKey: "pipeline",
    rawKey: "pipelines"
  });

export const createPipelineShowPipelineStatusHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineShowPipelineStatusInput,
    call: (input) => client.showPipelineStatus(input),
    summary: "Loaded Pipeline V3 pipeline status",
    itemKey: "pipelineStatus",
    id: (input) => input.pipeline_id
  });

export const createPipelineListPipelineBuildResultsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListPipelineBuildResultsInput,
    call: (input) => client.listPipelineBuildResults(input),
    noun: "Pipeline V3 build results",
    itemKey: "buildResult",
    rawKey: "buildResults"
  });

export const createPipelineShowPipelineDetailV3Handler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineShowPipelineDetailV3Input,
    call: (input) => client.showPipelineDetailV3(input),
    summary: "Loaded Pipeline V3 pipeline detail",
    itemKey: "pipelineDetail",
    id: (input) => input.pipeline_id
  });

export const createPipelineListPipelineBuildRecordsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListPipelineBuildRecordsInput,
    call: (input) => client.listPipelineBuildRecords(input),
    noun: "Pipeline V3 build records",
    itemKey: "buildRecord",
    rawKey: "buildRecords"
  });

export const createPipelineBatchGetPipelineStatusHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineBatchGetPipelineStatusInput,
    call: (input) => client.batchGetPipelineStatus(input),
    noun: "pipeline status records",
    itemKey: "pipelineStatus",
    rawKey: "pipelineStatuses"
  });

export const createPipelineGetNoticeMessagesHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineGetNoticeMessagesInput,
    call: (input) => client.getNoticeMessages(input),
    noun: "pipeline notice messages",
    itemKey: "noticeMessage",
    rawKey: "noticeMessages"
  });

export const createPipelineCheckProjectHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineCheckProjectInput,
    call: (input) => client.checkProject(input),
    summary: "Checked pipeline project",
    itemKey: "projectCheck",
    id: (input) => input.project_id
  });

export const createPipelineCheckComponentHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineCheckComponentInput,
    call: (input) => client.checkComponent(input),
    summary: "Checked pipeline component",
    itemKey: "componentCheck",
    id: (input) => input.component_id ?? input.component_name ?? input.project_id
  });

export const createPipelineGetComponentFollowStatusHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetComponentFollowStatusInput,
    call: (input) => client.getComponentFollowStatus(input),
    summary: "Loaded pipeline component follow status",
    itemKey: "componentFollowStatus",
    id: (input) => input.component_id
  });

export const createPipelineListExecutionPlansHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListExecutionPlansInput,
    call: (input) => client.listExecutionPlans(input),
    noun: "pipeline execution plans",
    itemKey: "executionPlan",
    rawKey: "executionPlans"
  });

export const createPipelineListReusableJobsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListReusableJobsInput,
    call: (input) => client.listReusableJobs(input),
    noun: "pipeline reusable jobs",
    itemKey: "reusableJob",
    rawKey: "reusableJobs"
  });

export const createPipelineListDashboardPipelineCountsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineDashboardQueryInput,
    call: (input) => client.listDashboardPipelineCounts(input),
    noun: "pipeline dashboard count records",
    itemKey: "dashboardPipelineCount",
    rawKey: "dashboardPipelineCounts"
  });

export const createPipelineGetDashboardExecutionsOverviewHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineDashboardQueryInput,
    call: (input) => client.getDashboardExecutionsOverview(input),
    summary: "Loaded pipeline dashboard executions overview",
    itemKey: "dashboardExecutionsOverview",
    id: (input) => input.tenant_id
  });

export const createPipelineGetDashboardConcurrencyHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineDashboardQueryInput,
    call: (input) => client.getDashboardConcurrency(input),
    summary: "Loaded pipeline dashboard concurrency",
    itemKey: "dashboardConcurrency",
    id: (input) => input.tenant_id
  });

export const createPipelineListChangeRequestsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListChangeRequestsInput,
    call: (input) => client.listChangeRequests(input),
    noun: "pipeline change requests",
    itemKey: "changeRequest",
    rawKey: "changeRequests"
  });

export const createPipelineListChangeRequestCreatorsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListChangeRequestCreatorsInput,
    call: (input) => client.listChangeRequestCreators(input),
    noun: "pipeline change request creators",
    itemKey: "changeRequestCreator",
    rawKey: "changeRequestCreators"
  });

export const createPipelineGetChangeRequestHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetChangeRequestInput,
    call: (input) => client.getChangeRequest(input),
    summary: "Loaded pipeline change request",
    itemKey: "changeRequest",
    id: (input) => input.change_request_id
  });

export const createPipelineListChangeRequestOperationLogsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListChangeRequestOperationLogsInput,
    call: (input) => client.listChangeRequestOperationLogs(input),
    noun: "pipeline change request operation logs",
    itemKey: "changeRequestOperationLog",
    rawKey: "changeRequestOperationLogs"
  });

export const createPipelineListChangeRequestWorkItemsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListChangeRequestWorkItemsInput,
    call: (input) => client.listChangeRequestWorkItems(input),
    noun: "pipeline change request work items",
    itemKey: "changeRequestWorkItem",
    rawKey: "changeRequestWorkItems"
  });

export const createPipelineListComponentsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListComponentsInput,
    call: (input) => client.listComponents(input),
    noun: "pipeline components",
    itemKey: "component",
    rawKey: "components"
  });

export const createPipelineGetComponentHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetComponentInput,
    call: (input) => client.getComponent(input),
    summary: "Loaded pipeline component",
    itemKey: "component",
    id: (input) => input.component_id
  });

export const createPipelineCheckVariableGroupRightsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineCheckVariableGroupRightsInput,
    call: (input) => client.checkVariableGroupRights(input),
    noun: "pipeline variable group rights",
    itemKey: "variableGroupRight",
    rawKey: "variableGroupRights"
  });

export const createPipelineListRelatedProjectsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListRelatedProjectsInput,
    call: (input) => client.listRelatedProjects(input),
    noun: "pipeline related projects",
    itemKey: "relatedProject",
    rawKey: "relatedProjects"
  });

export const createPipelineListCodeRepositoriesHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListCodeRepositoriesInput,
    call: (input) => client.listCodeRepositories(input),
    noun: "pipeline code repositories",
    itemKey: "codeRepository",
    rawKey: "codeRepositories"
  });

export const createPipelineListCodeBranchesHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListCodeBranchesInput,
    call: (input) => client.listCodeBranches(input),
    noun: "pipeline code branches",
    itemKey: "codeBranch",
    rawKey: "codeBranches"
  });

export const createPipelineGetRepositoryNumberHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetRepositoryNumberInput,
    call: (input) => client.getRepositoryNumber(input),
    summary: "Loaded pipeline repository number",
    itemKey: "repositoryNumber",
    id: (input) => input.tenant_id
  });

export const createPipelineGetTenantPackageIsFreezeHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetTenantPackageIsFreezeInput,
    call: (input) => client.getTenantPackageIsFreeze(input),
    summary: "Loaded pipeline tenant package freeze status",
    itemKey: "tenantPackageFreeze",
    id: (input) => input.tenant_id
  });

export const createPipelineGetPackageUsageHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetPackageUsageInput,
    call: (input) => client.getPackageUsage(input),
    summary: "Loaded pipeline package usage",
    itemKey: "packageUsage",
    id: (input) => input.tenant_id
  });

export const createPipelineGetTenantVersionDetailHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetTenantVersionDetailInput,
    call: (input) => client.getTenantVersionDetail(input),
    summary: "Loaded pipeline tenant version detail",
    itemKey: "tenantVersionDetail",
    id: (input) => input.tenant_id
  });

export const createPipelineListPacActionsHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawListHandler({
    inputSchema: pipelineListPacActionsInput,
    call: (input) => client.listPacActions(input),
    noun: "pipeline PAC actions",
    itemKey: "pacAction",
    rawKey: "pacActions"
  });

export const createPipelineGetPacActionHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetPacActionInput,
    call: (input) => client.getPacAction(input),
    summary: "Loaded pipeline PAC action",
    itemKey: "pacAction",
    id: (input) => input.pipeline_run_id
  });

export const createPipelineGetOauthAuthorizationUrlHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetOauthAuthorizationUrlInput,
    call: (input) => client.getOauthAuthorizationUrl(input),
    summary: "Loaded pipeline OAuth authorization URL",
    itemKey: "authorizationUrl",
    id: () => "oauth-authorization-url"
  });

export const createPipelineGetDevucAuthHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetDevucAuthInput,
    call: (input) => client.getDevucAuth(input),
    summary: "Loaded pipeline DevUC auth",
    itemKey: "devucAuth",
    id: (input) => input.cloud_project_id
  });
