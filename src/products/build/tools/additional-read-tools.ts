import { Buffer } from "node:buffer";
import { type ToolResult } from "../../../contracts/tool-result.js";
import {
  buildDownloadBuildLogV4Input,
  buildDownloadKeystoreV2Input,
  buildDownloadKeystoreV3Input,
  buildDownloadFullLogInput,
  buildDownloadLogByRecordIdV3Input,
  buildDownloadTaskLogInput,
  buildDownloadTaskLogV4Input,
  buildGetBuildDetailsInput,
  buildGetJobRunningStatusV3Input,
  buildGetJobInfoInput,
  buildGetJobOutputInput,
  buildGetJobPipelineInfoInput,
  buildGetJobStepStatusInput,
  buildGetKeystorePermissionInput,
  buildGetRunningStepLogInput,
  buildGetOutputInfoV3Input,
  buildGetRecordInfoV4Input,
  buildGetStageLogPageInput,
  buildGetTemplateInput,
  buildGetTaskLogPageInput,
  buildGetYamlTemplateInput,
  buildListCustomTemplatesInput,
  buildListAllJobsInput,
  buildListBriefRecordsInput,
  buildListJobConfigV3Input,
  buildListJobNoticesV3Input,
  buildListJobBadgeBranchesInput,
  buildListJobHistoryV3Input,
  buildListJobUpdateHistoryInput,
  buildListKeystoreFilesInput,
  buildListProjectEndpointsInput,
  buildListRecommendedOfficialTemplatesInput,
  buildListUsableKeystoreNamesInput,
  buildShowDomainsStatusesInput,
  buildShowFlowGraphV3Input,
  buildShowPackageSpecCountdownInput
} from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordItem, mapBuildRecordList, mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  showPackageSpecCountdown: (input: { body?: Record<string, unknown> }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listJobUpdateHistory: (input: { job_id: string }) => Promise<{
    history: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listAllJobs: (input: {
    page: number;
    page_size: number;
    keyword?: string;
    build_status?: string;
    creator_id?: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listBriefRecords: (input: {
    build_project_ids: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listJobHistoryV3: (input: {
    job_id: string;
    page: number;
    page_size: number;
    interval?: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listJobConfigV3: (input: {
    job_id: string;
    get_all_params?: "true" | "false";
  }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getJobOutput: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getJobRunningStatusV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getJobInfo: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getBuildDetails: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getOutputInfoV3: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getRecordInfoV4: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getTaskLogPage: (input: {
    job_id: string;
    build_no: number;
    step_id: number;
    start_offset: number;
    end_offset: number;
    sort: "AES" | "DESC";
  }) => Promise<{
    job_id: string;
    build_no: number;
    step_id: number;
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
  downloadBuildLogV4: (input: {
    record_id: string;
    log_level: "INFO" | "DEBUG";
  }) => Promise<{
    record_id: string;
    log_level: "INFO" | "DEBUG";
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadLogByRecordIdV3: (input: {
    record_id: string;
  }) => Promise<{
    record_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadTaskLogV4: (input: {
    record_id: string;
    task_name: string;
    log_level: "INFO" | "DEBUG";
  }) => Promise<{
    record_id: string;
    task_name: string;
    log_level: "INFO" | "DEBUG";
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadKeystoreV2: (input: {
    name: string;
    domain_id: string;
    id: string;
  }) => Promise<{
    name: string;
    domain_id: string;
    id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadKeystoreV3: (input: {
    file_name: string;
    domain_id: string;
  }) => Promise<{
    file_name: string;
    domain_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name_from_header?: string;
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
  listCustomTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
    filter?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listKeystoreFiles: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listUsableKeystoreNames: () => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getKeystorePermission: (input: { keystore_id: string }) => Promise<{
    keystore_id: string;
    raw: Record<string, unknown>;
  }>;
  listJobNoticesV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    notices: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showFlowGraphV3: (input: { build_flow_record_id: string }) => Promise<{
    build_flow_record_id: string;
    nodes: Array<Record<string, unknown>>;
    edges: Array<Record<string, unknown>>;
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

export function createBuildListAllJobsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListAllJobsInput.parse(input);
    const response = await client.listAllJobs(parsed);
    return listResponse(
      mapBuildRecordList(response.jobs, response.total, "Build user jobs", "job", parsed.page, parsed.page_size)
    );
  };
}

export function createBuildListBriefRecordsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListBriefRecordsInput.parse(input);
    const response = await client.listBriefRecords(parsed);
    return listResponse(mapBuildRecordList(response.records, response.total, "Build brief records", "record"));
  };
}

export function createBuildListJobHistoryV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobHistoryV3Input.parse(input);
    const response = await client.listJobHistoryV3(parsed);
    return listResponse(
      mapBuildRecordList(response.records, response.total, "Build v3 job history records", "record", parsed.page, parsed.page_size)
    );
  };
}

export function createBuildListJobConfigV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobConfigV3Input.parse(input);
    const response = await client.listJobConfigV3(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build v3 job config", response.job_id, "jobConfig", response.raw));
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

export function createBuildGetJobRunningStatusV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobRunningStatusV3Input.parse(input);
    const response = await client.getJobRunningStatusV3(parsed);
    return itemResponse(mapBuildValueItem("Loaded Build v3 job running status", response.job_id, "status", response.value, response.raw));
  };
}

export function createBuildGetJobInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetJobInfoInput.parse(input);
    const response = await client.getJobInfo(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build job info", response.job_id, "jobInfo", response.raw));
  };
}

export function createBuildGetBuildDetailsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetBuildDetailsInput.parse(input);
    const response = await client.getBuildDetails(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build details", `${response.job_id}#${response.build_no}`, "details", response.raw, {
      jobId: response.job_id,
      buildNo: response.build_no
    }));
  };
}

export function createBuildGetOutputInfoV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetOutputInfoV3Input.parse(input);
    const response = await client.getOutputInfoV3(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build v3 output info", `${response.job_id}#${response.build_no}`, "outputInfo", response.raw, {
      jobId: response.job_id,
      buildNo: response.build_no
    }));
  };
}

export function createBuildGetRecordInfoV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetRecordInfoV4Input.parse(input);
    const response = await client.getRecordInfoV4(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build v4 record info", `${response.job_id}#${response.build_no}`, "recordInfo", response.raw, {
      jobId: response.job_id,
      buildNo: response.build_no
    }));
  };
}

export function createBuildGetTaskLogPageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetTaskLogPageInput.parse(input);
    const response = await client.getTaskLogPage(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build task log page", `${response.job_id}#${response.build_no}:${response.step_id}`, "log", response.raw, {
      jobId: response.job_id,
      buildNo: response.build_no,
      stepId: response.step_id
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

export function createBuildDownloadBuildLogV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadBuildLogV4Input.parse(input);
    const response = await client.downloadBuildLogV4(parsed);
    const result = mapBuildRecordItem("Downloaded Build v4 full log", response.record_id, "log", {
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    }, {
      recordId: response.record_id,
      logLevel: response.log_level
    });

    return itemResponse(result);
  };
}

export function createBuildDownloadLogByRecordIdV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadLogByRecordIdV3Input.parse(input);
    const response = await client.downloadLogByRecordIdV3(parsed);
    const result = mapBuildRecordItem("Downloaded Build v3 log by record id", response.record_id, "log", {
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    }, {
      recordId: response.record_id
    });

    return itemResponse(result);
  };
}

export function createBuildDownloadTaskLogV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadTaskLogV4Input.parse(input);
    const response = await client.downloadTaskLogV4(parsed);
    const result = mapBuildRecordItem("Downloaded Build v4 task log", `${response.record_id}:${response.task_name}`, "log", {
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    }, {
      recordId: response.record_id,
      taskName: response.task_name,
      logLevel: response.log_level
    });

    return itemResponse(result);
  };
}

export function createBuildDownloadKeystoreV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadKeystoreV2Input.parse(input);
    const response = await client.downloadKeystoreV2(parsed);
    const result = mapBuildRecordItem("Downloaded Build v2 keystore file", response.id, "keystore", {
      name: response.name,
      domainId: response.domain_id,
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    }, {
      keystoreId: response.id
    });

    return itemResponse(result);
  };
}

export function createBuildDownloadKeystoreV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildDownloadKeystoreV3Input.parse(input);
    const response = await client.downloadKeystoreV3(parsed);
    const result = mapBuildRecordItem("Downloaded Build v3 keystore file", response.file_name, "keystore", {
      domainId: response.domain_id,
      fileName: response.file_name_from_header ?? response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    }, {
      fileName: response.file_name
    });

    return itemResponse(result);
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

export function createBuildListCustomTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListCustomTemplatesInput.parse(input);
    const response = await client.listCustomTemplates(parsed);
    return listResponse(mapBuildRecordList(response.templates, response.total, "Build custom templates", "template", parsed.page, parsed.page_size));
  };
}

export function createBuildListKeystoreFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListKeystoreFilesInput.parse(input);
    const response = await client.listKeystoreFiles(parsed);
    return listResponse(mapBuildRecordList(response.files, response.total, "Build keystore files", "file"));
  };
}

export function createBuildListUsableKeystoreNamesHandler(client: Client) {
  return async (input: unknown) => {
    buildListUsableKeystoreNamesInput.parse(input);
    const response = await client.listUsableKeystoreNames();
    return listResponse(mapBuildRecordList(response.files, response.total, "Build usable keystore files", "file"));
  };
}

export function createBuildGetKeystorePermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetKeystorePermissionInput.parse(input);
    const response = await client.getKeystorePermission(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build keystore permission", response.keystore_id, "permission", response.raw));
  };
}

export function createBuildListJobNoticesV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListJobNoticesV3Input.parse(input);
    const response = await client.listJobNoticesV3(parsed);
    return listResponse(mapBuildRecordList(response.notices, response.total, "Build v3 job notices", "notice"));
  };
}

export function createBuildShowFlowGraphV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildShowFlowGraphV3Input.parse(input);
    const response = await client.showFlowGraphV3(parsed);
    return itemResponse(mapBuildRecordItem("Loaded Build v3 flow graph", response.build_flow_record_id, "flowGraph", response.raw, {
      buildFlowRecordId: response.build_flow_record_id,
      nodeCount: response.nodes.length,
      edgeCount: response.edges.length,
      nodes: response.nodes,
      edges: response.edges
    }));
  };
}
