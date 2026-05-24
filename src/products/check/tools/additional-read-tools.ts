import { type ToolResult } from "../../../contracts/tool-result.js";
import {
  checkDownloadLogFileInput,
  checkExtractTaskAssistantSummaryInput,
  checkGetAsyncJobInput,
  checkGetAsyncJobV2Input,
  checkGetDefectFileContentInput,
  checkGetDefectMetricTrendInput,
  checkGetMeasureDuplicationInfoInput,
  checkGetSingleDefectInput,
  checkGetMeasureTotalInput,
  checkGetProjectConfigInput,
  checkGetPdfFileInput,
  checkGetTaskByIdInput,
  checkGetTaskIssueStatisticsInput,
  checkGetTaskMeasuresInput,
  checkGetIssueFilterInput,
  checkListMeasureFilesV2Input,
  checkListRelatedDuplicateBlocksV2Input,
  checkListIssuesByFilterInput,
  checkListRelatedDuplicateBlocksInput,
  checkListMeasureFilesInput,
  checkListConfigItemsInput,
  checkListDefectNextStatusesInput
} from "../schemas.js";
import { formatCheckRecordListText, mapCheckRecordItem, mapCheckRecordList } from "./generic-read-tools.js";

type RawRecord = Record<string, unknown>;

type Client = {
  getTaskById: (input: { task_id: string }) => Promise<{ task_id: string; raw: RawRecord }>;
  getTaskIssueStatistics: (input: { task_id: string }) => Promise<{ task_id: string; raw: RawRecord }>;
  getDefectMetricTrend: (input: {
    task_id: string;
    start_time?: string;
    end_time?: string;
    metric_type?: string;
    severity?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ task_id: string; raw: RawRecord }>;
  listDefectNextStatuses: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ statuses: RawRecord[]; total?: number; raw: RawRecord }>;
  getSingleDefect: (input: {
    defect_id?: string;
    issue_id?: string;
    task_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ defect_id?: string; raw: RawRecord }>;
  listIssuesByFilter: (input: {
    task_id: string;
    page: number;
    page_size: number;
    merge_id?: string;
    job_id?: string;
    languages?: string;
    rule_ids?: string;
    authors?: string;
    is_new?: string;
    status_ids?: string;
    severities?: string;
    delay_status?: string;
    file_names?: string;
    user_tags?: string[];
    cwes?: string[];
  }) => Promise<{ task_id: string; issues: RawRecord[]; total?: number; raw: RawRecord }>;
  getIssueFilter: (input: {
    task_id: string;
    facets: string;
    merge_id?: string;
    job_id?: string;
    languages?: string;
    rule_ids?: string;
    authors?: string;
    is_new?: string;
    status_ids?: string;
    severities?: string;
    delay_status?: string;
    file_names?: string;
    user_tags?: string[];
    cwes?: string[];
  }) => Promise<{ task_id: string; facets: RawRecord[]; total?: number; raw: RawRecord }>;
  getAsyncJobV2: (input: {
    task_id?: string;
    async_job_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ raw: RawRecord }>;
  getAsyncJob: (input: {
    task_id: string;
    async_job_id: string;
  }) => Promise<{ task_id: string; async_job_id: string; raw: RawRecord }>;
  getPdfFile: (input: {
    task_id: string;
    job_file: string;
  }) => Promise<{ task_id: string; job_file: string; raw: RawRecord | string }>;
  extractTaskAssistantSummary: (input: {
    project_id: string;
    task_id: string;
    merge_id?: string;
    job_id?: string;
  }) => Promise<{ task_id: string; summary?: string; raw: RawRecord }>;
  getTaskMeasures: (input: {
    task_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ task_id: string; raw: RawRecord }>;
  listMeasureFiles: (input: {
    task_id: string;
    page: number;
    page_size: number;
    job_id?: string;
  }) => Promise<{ task_id: string; files: RawRecord[]; total?: number; raw: RawRecord }>;
  listMeasureFilesV2: (input: {
    task_id: string;
    page: number;
    page_size: number;
    job_id?: string;
    filter_type?: string;
    sort_field?: string;
    sort_type?: string;
    search?: string;
  }) => Promise<{ task_id: string; files: RawRecord[]; total?: number; raw: RawRecord }>;
  listRelatedDuplicateBlocks: (input: {
    task_id: string;
    job_id?: string;
    file_path?: string;
    block_id?: string;
    duplication_type?: "duplication_code" | "duplication_file";
  }) => Promise<{ task_id: string; blocks: RawRecord[]; total?: number; raw: RawRecord }>;
  listRelatedDuplicateBlocksV2: (input: {
    task_id: string;
    job_id?: string;
    file_path?: string;
    block_id?: string;
    start_line?: number;
    duplication_type?: string;
  }) => Promise<{ task_id: string; blocks: RawRecord[]; total?: number; raw: RawRecord }>;
  getMeasureDuplicationInfo: (input: {
    task_id: string;
    file_path: string;
    job_id?: string;
    block_id?: string;
    start_line?: number;
    end_line?: number;
  }) => Promise<{ task_id: string; raw: RawRecord }>;
  getProjectConfig: (input: { id: string; operator?: string }) => Promise<{ id: string; raw: RawRecord }>;
  listConfigItems: (input: { ids: string[] }) => Promise<{ items: RawRecord[]; total?: number; raw: RawRecord }>;
  getMeasureTotal: (input: {
    task_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ task_id: string; raw: RawRecord }>;
  downloadLogFile: (input: {
    sub_job_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ sub_job_id?: string; raw: RawRecord | string }>;
  getDefectFileContent: (input: {
    task_id?: string;
    defect_id?: string;
    file_path?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{ raw: RawRecord | string }>;
};

function itemResponse<T>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: result.summary }],
    structuredContent: result
  };
}

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>, raw?: RawRecord) {
  return {
    content: [{ type: "text" as const, text: formatCheckRecordListText(result) }],
    structuredContent: raw ? { ...result, raw } : result
  };
}

function rawRecord(input: RawRecord | string): RawRecord {
  return typeof input === "string" ? { content: input } : input;
}

export function createCheckGetTaskByIdHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskByIdInput.parse(input);
    const response = await client.getTaskById(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check task by ID", response.task_id, "task", response.raw));
  };
}

export function createCheckGetTaskIssueStatisticsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskIssueStatisticsInput.parse(input);
    const response = await client.getTaskIssueStatistics(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check task issue statistics", response.task_id, "statistics", response.raw));
  };
}

export function createCheckGetDefectMetricTrendHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetDefectMetricTrendInput.parse(input);
    const response = await client.getDefectMetricTrend(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check defect metric trend", response.task_id, "trend", response.raw));
  };
}

export function createCheckListDefectNextStatusesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListDefectNextStatusesInput.parse(input);
    const response = await client.listDefectNextStatuses(parsed);
    return listResponse(mapCheckRecordList(response.statuses, response.total, "defect next statuses", "status"), response.raw);
  };
}

export function createCheckGetSingleDefectHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetSingleDefectInput.parse(input);
    const response = await client.getSingleDefect(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check single defect", response.defect_id ?? "defect", "defect", response.raw));
  };
}

export function createCheckListIssuesByFilterHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListIssuesByFilterInput.parse(input);
    const response = await client.listIssuesByFilter(parsed);
    return listResponse(
      mapCheckRecordList(response.issues, response.total, "issues by filter", "issue"),
      response.raw
    );
  };
}

export function createCheckGetIssueFilterHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetIssueFilterInput.parse(input);
    const response = await client.getIssueFilter(parsed);
    return listResponse(
      mapCheckRecordList(response.facets, response.total, "issue filter facets", "facet"),
      response.raw
    );
  };
}

export function createCheckGetAsyncJobV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetAsyncJobV2Input.parse(input);
    const response = await client.getAsyncJobV2(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check async job V2", parsed.async_job_id ?? parsed.task_id ?? "async-job", "job", response.raw));
  };
}

export function createCheckGetAsyncJobHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetAsyncJobInput.parse(input);
    const response = await client.getAsyncJob(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check async job", response.async_job_id, "job", response.raw, {
      taskId: response.task_id
    }));
  };
}

export function createCheckGetPdfFileHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetPdfFileInput.parse(input);
    const response = await client.getPdfFile(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check PDF file", response.task_id, "pdfFile", rawRecord(response.raw), {
      jobFile: response.job_file
    }));
  };
}

export function createCheckExtractTaskAssistantSummaryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkExtractTaskAssistantSummaryInput.parse(input);
    const response = await client.extractTaskAssistantSummary(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check task assistant summary", response.task_id, "summary", response.raw));
  };
}

export function createCheckGetTaskMeasuresHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTaskMeasuresInput.parse(input);
    const response = await client.getTaskMeasures(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check task measures", response.task_id, "measures", response.raw));
  };
}

export function createCheckListMeasureFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListMeasureFilesInput.parse(input);
    const response = await client.listMeasureFiles(parsed);
    return listResponse(
      mapCheckRecordList(response.files, response.total, "measure files", "measureFile"),
      response.raw
    );
  };
}

export function createCheckListMeasureFilesV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListMeasureFilesV2Input.parse(input);
    const response = await client.listMeasureFilesV2(parsed);
    return listResponse(
      mapCheckRecordList(response.files, response.total, "measure files V2", "measureFile"),
      response.raw
    );
  };
}

export function createCheckListRelatedDuplicateBlocksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListRelatedDuplicateBlocksInput.parse(input);
    const response = await client.listRelatedDuplicateBlocks(parsed);
    return listResponse(
      mapCheckRecordList(response.blocks, response.total, "related duplicate blocks", "duplicateBlock"),
      response.raw
    );
  };
}

export function createCheckListRelatedDuplicateBlocksV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListRelatedDuplicateBlocksV2Input.parse(input);
    const response = await client.listRelatedDuplicateBlocksV2(parsed);
    return listResponse(
      mapCheckRecordList(response.blocks, response.total, "related duplicate blocks V2", "duplicateBlock"),
      response.raw
    );
  };
}

export function createCheckGetMeasureDuplicationInfoHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetMeasureDuplicationInfoInput.parse(input);
    const response = await client.getMeasureDuplicationInfo(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check measure duplication info", response.task_id, "duplicationInfo", response.raw));
  };
}

export function createCheckGetProjectConfigHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetProjectConfigInput.parse(input);
    const response = await client.getProjectConfig(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check project config", response.id, "config", response.raw));
  };
}

export function createCheckListConfigItemsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkListConfigItemsInput.parse(input);
    const response = await client.listConfigItems(parsed);
    return listResponse(mapCheckRecordList(response.items, response.total, "config items", "configItem"), response.raw);
  };
}

export function createCheckGetMeasureTotalHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetMeasureTotalInput.parse(input);
    const response = await client.getMeasureTotal(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check measure total", response.task_id, "measures", response.raw));
  };
}

export function createCheckDownloadLogFileHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkDownloadLogFileInput.parse(input);
    const response = await client.downloadLogFile(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check log file", response.sub_job_id ?? "log-file", "log", rawRecord(response.raw)));
  };
}

export function createCheckGetDefectFileContentHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetDefectFileContentInput.parse(input);
    const response = await client.getDefectFileContent(parsed);
    return itemResponse(mapCheckRecordItem("Loaded Check defect file content", parsed.defect_id ?? parsed.task_id ?? parsed.file_path ?? "file-content", "fileContent", rawRecord(response.raw)));
  };
}
