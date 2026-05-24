import {
  pipelineBatchGetPipelineStatusInput,
  pipelineCheckComponentInput,
  pipelineCheckProjectInput,
  pipelineDashboardQueryInput,
  pipelineGetChangeRequestInput,
  pipelineGetComponentInput,
  pipelineGetDevucAuthInput,
  pipelineGetNoticeMessagesInput,
  pipelineGetOauthAuthorizationUrlInput,
  pipelineGetPacActionInput,
  pipelineListChangeRequestsInput,
  pipelineListComponentsInput,
  pipelineListExecutionPlansInput,
  pipelineListPacActionsInput,
  pipelineListReusableJobsInput
} from "../schemas.js";
import { createPipelineRawItemHandler, createPipelineRawListHandler } from "./raw-query-tools.js";

type RawRecord = Record<string, unknown>;
type RawListResponse = { records: RawRecord[]; total?: number; raw: RawRecord };
type RawItemResponse = { item: RawRecord; raw: RawRecord };

export type PipelineProductQueryClient = {
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
  getChangeRequest: (input: {
    cloud_project_id: string;
    change_request_id: string;
  }) => Promise<RawItemResponse>;
  listComponents: (input: {
    cloud_project_id: string;
    offset: number;
    limit: number;
    keyword?: string;
    body?: RawRecord;
  }) => Promise<RawListResponse>;
  getComponent: (input: { cloud_project_id: string; component_id: string }) => Promise<RawItemResponse>;
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

export const createPipelineGetChangeRequestHandler = (client: PipelineProductQueryClient) =>
  createPipelineRawItemHandler({
    inputSchema: pipelineGetChangeRequestInput,
    call: (input) => client.getChangeRequest(input),
    summary: "Loaded pipeline change request",
    itemKey: "changeRequest",
    id: (input) => input.change_request_id
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
