import { type ToolResult } from "../../../contracts/tool-result.js";
import {
  buildDownloadFullLogInput,
  buildDownloadTaskLogInput,
  buildGetJobOutputInput,
  buildGetJobPipelineInfoInput,
  buildGetJobStepStatusInput,
  buildGetKeystorePermissionInput,
  buildGetRunningStepLogInput,
  buildGetStageLogPageInput,
  buildGetTemplateInput,
  buildGetYamlTemplateInput,
  buildListJobBadgeBranchesInput,
  buildListJobUpdateHistoryInput,
  buildListKeystoreFilesInput,
  buildListProjectEndpointsInput,
  buildListRecommendedOfficialTemplatesInput,
  buildShowDomainsStatusesInput,
  buildShowPackageSpecCountdownInput
} from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordItem, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  showPackageSpecCountdown: (input: { body?: Record<string, unknown> }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listJobUpdateHistory: (input: { job_id: string }) => Promise<{
    history: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getJobOutput: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getJobStepStatus: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getJobPipelineInfo: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listProjectEndpoints: (input: { project_id: string }) => Promise<{
    endpoints: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showDomainsStatuses: (input: { body?: Record<string, unknown> }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listJobBadgeBranches: (input: { job_id: string }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getRunningStepLog: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getStageLogPage: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  downloadFullLog: (input: { record_id: string }) => Promise<{
    record_id: string;
    raw: Record<string, unknown>;
  }>;
  downloadTaskLog: (input: { record_id: string }) => Promise<{
    record_id: string;
    raw: Record<string, unknown>;
  }>;
  getTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    raw: Record<string, unknown>;
  }>;
  getYamlTemplate: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listRecommendedOfficialTemplates: (input: { body?: Record<string, unknown> }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listKeystoreFiles: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getKeystorePermission: (input: { keystore_id: string }) => Promise<{
    keystore_id: string;
    raw: Record<string, unknown>;
  }>;
};

function itemResponse<T>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: result.summary }],
    structuredContent: result
  };
}

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
    structuredContent: result
  };
}

export function createBuildShowPackageSpecCountdownHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildShowPackageSpecCountdownInput.parse(input);
    return itemResponse(mapBuildRecordItem("Loaded Build package spec countdown", "package-spec-countdown", "countdown", (await client.showPackageSpecCountdown(parsed)).raw));
  };
}

export function createBuildListJobUpdateHistoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobUpdateHistoryInput.parse(input);
    const response = await client.listJobUpdateHistory(parsed);
    return listResponse(mapBuildRecordList(response.history, response.total, "Build job update history records", "history"));
  };
}

export function createBuildGetJobOutputHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobOutputInput.parse(input);
    const response = await client.getJobOutput(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build job output", `${response.job_id}#${response.build_no}`, "output", response.raw, {
      jobId: response.job_id,
      buildNo: response.build_no
    }));
  };
}

export function createBuildGetJobStepStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobStepStatusInput.parse(input);
    const response = await client.getJobStepStatus(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build job step status", response.job_id, "status", response.raw));
  };
}

export function createBuildGetJobPipelineInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobPipelineInfoInput.parse(input);
    const response = await client.getJobPipelineInfo(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build job pipeline info", response.job_id, "pipelineInfo", response.raw));
  };
}

export function createBuildListProjectEndpointsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListProjectEndpointsInput.parse(input);
    const response = await client.listProjectEndpoints(parsed);
    return listResponse(mapBuildRecordList(response.endpoints, response.total, "Build project endpoints", "endpoint"));
  };
}

export function createBuildShowDomainsStatusesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildShowDomainsStatusesInput.parse(input);
    return itemResponse(mapBuildRecordItem("Loaded Build domain statuses", "domain-statuses", "statuses", (await client.showDomainsStatuses(parsed)).raw));
  };
}

export function createBuildListJobBadgeBranchesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobBadgeBranchesInput.parse(input);
    const response = await client.listJobBadgeBranches(parsed);
    return listResponse(mapBuildRecordList(response.branches, response.total, "Build job badge branches", "branch"));
  };
}

export function createBuildGetRunningStepLogHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetRunningStepLogInput.parse(input);
    return itemResponse(mapBuildRecordItem("Loaded Build running step log", "running-step-log", "log", (await client.getRunningStepLog(parsed)).raw));
  };
}

export function createBuildGetStageLogPageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetStageLogPageInput.parse(input);
    return itemResponse(mapBuildRecordItem("Loaded Build stage log page", "stage-log-page", "log", (await client.getStageLogPage(parsed)).raw));
  };
}

export function createBuildDownloadFullLogHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadFullLogInput.parse(input);
    const response = await client.downloadFullLog(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build full log metadata", response.record_id, "log", response.raw));
  };
}

export function createBuildDownloadTaskLogHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadTaskLogInput.parse(input);
    const response = await client.downloadTaskLog(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build task log metadata", response.record_id, "log", response.raw));
  };
}

export function createBuildGetTemplateHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetTemplateInput.parse(input);
    const response = await client.getTemplate(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build template", response.uuid, "template", response.raw));
  };
}

export function createBuildGetYamlTemplateHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetYamlTemplateInput.parse(input);
    const response = await client.getYamlTemplate(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build YAML template", response.job_id, "template", response.raw));
  };
}

export function createBuildListRecommendedOfficialTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListRecommendedOfficialTemplatesInput.parse(input);
    const response = await client.listRecommendedOfficialTemplates(parsed);
    return listResponse(mapBuildRecordList(response.templates, response.total, "Build recommended official templates", "template"));
  };
}

export function createBuildListKeystoreFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListKeystoreFilesInput.parse(input);
    const response = await client.listKeystoreFiles(parsed);
    return listResponse(mapBuildRecordList(response.files, response.total, "Build keystore files", "file"));
  };
}

export function createBuildGetKeystorePermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetKeystorePermissionInput.parse(input);
    const response = await client.getKeystorePermission(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build keystore permission", response.keystore_id, "permission", response.raw));
  };
}
