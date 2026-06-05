import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";

export type CheckClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  createTask: (input: {
    project_id: string;
    task_name: string;
    git_url: string;
    git_branch: string;
    language: string;
    rule_set_id?: string;
    resource_pool_id?: string;
    resource_pool_type?: "default" | "custom";
    include_paths?: string;
    exclude_dir?: string;
    task_type?: string;
  }) => Promise<{
    task_id: string;
    task_name?: string;
    project_id?: string;
    git_url?: string;
    git_branch?: string;
    language?: string;
    status?: string;
  }>;
  createRuleset: (input: {
    project_id: string;
    template_name: string;
    language: string;
    is_default?: "0" | "1";
    rule_ids?: string;
    uncheck_ids?: string;
    template_id?: string;
    custom_attributes?: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    template_name?: string;
    language?: string;
    is_default?: string;
    raw: Record<string, unknown>;
  }>;
  deleteRuleset: (input: {
    project_id: string;
    ruleset_id: string;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    raw?: Record<string, unknown>;
  }>;
  runTask: (input: { task_id: string; ref?: string }) => Promise<{
    task_id: string;
    job_id?: string;
    exec_id?: string;
    status?: string;
  }>;
  stopTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    status?: string;
  }>;
  updateIssueStatus: (input: {
    task_id: string;
    status: "0" | "2" | "5";
    comment: string;
    merge_key: string;
    merge_id?: string;
    job_id?: string;
    operator?: string;
  }) => Promise<{
    task_id: string;
    merge_key: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  createPdfAsyncJob: (input: {
    task_id: string;
    project_name: string;
  }) => Promise<{
    task_id: string;
    async_job_id?: string | number;
    time_ask?: number;
    raw: Record<string, unknown>;
  }>;
  updateCodeGate: (input: {
    task_id: string;
    operator?: string;
    review_data: Array<{
      compare_type: string;
      is_check: 0 | 1;
      name: string;
      value: number;
    }>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  updateIgnoreFiles: (input: {
    task_id: string;
    nodes: Array<{
      name?: string;
      file_path?: string;
      is_leaf?: boolean;
      checkbox_status?: "unchecked" | "all";
    }>;
  }) => Promise<{
    task_id: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  updateCheckMode: (input: {
    task_id: string;
    mr_check_mode: 0 | 4 | 5;
    operator?: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  listTasks: (input: {
    page: number;
    page_size: number;
    project_id: string;
    keyword?: string;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      task_name: string;
      project_name?: string;
      repository_name?: string;
      branch_name?: string;
      language?: string;
      status?: string;
    }>;
    total?: number;
  }>;
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    task_name: string;
    project_name?: string;
    repository_name?: string;
    branch_name?: string;
    language?: string;
    status?: string;
    last_check_time?: string;
  }>;
  getTaskById: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getTaskResourcePool: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  updateTaskResourcePool: (input: {
    task_id: string;
    resource_pool_id?: string;
    resource_pool_type?: "default" | "custom";
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  listTaskJobs: (input: { task_id: string }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTaskLastJobs: (input: { task_id: string }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskPreCheckScript: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getTaskOwnerMatchingSwitch: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  updateTaskOwnerMatchingSwitch: (input: {
    task_id: string;
    enabled: boolean;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  getTaskCron: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  updatePipelineTask: (input: {
    task_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  listProjectTaskGroups: (input: { project_id: string }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTaskFiles: (input: { task_id: string }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTaskAllFiles: (input: {
    task_id: string;
    file_path?: string;
    get_son?: boolean;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  detectTaskLanguage: (input: { task_id: string; scan_file: boolean }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  listCodehubRepositories: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getDomainCheckersVersion: (input: { domain_id: string }) => Promise<{
    domain_id: string;
    raw: Record<string, unknown>;
  }>;
  listTaskCheckRecords: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
    start_time?: string;
    end_time?: string;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listRules: (input: {
    page: number;
    page_size: number;
    rule_languages?: string;
    rule_severity?: string;
    keyword?: string;
  }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDefaultRulesets: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  setDefaultRuleset: (input: {
    project_id: string;
    ruleset_id: string;
    language: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    ruleset_id: string;
    language: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  listSupportedLanguages: () => Promise<{
    languages: string[];
  }>;
  getTaskNotification: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getCodeSumMeasures: () => Promise<{
    raw: Record<string, unknown>;
  }>;
  listPlugins: (input: {
    id: string;
    name?: string;
    version?: string;
    publisher_name?: string;
  }) => Promise<{
    plugins: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskWebhookInfo: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  updateTaskWebhook: (input: {
    task_id: string;
    body: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  getCodeHealthSvg: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown> | string;
  }>;
  listTaskRepositoryBranches: (input: {
    task_id: string;
    page: number;
    page_size: number;
    is_uncreated_only?: boolean;
    search?: string;
    repo_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTransmissionNotification: (input: {
    is_check_project: 0 | 1;
    domain_id?: string;
    project_id?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getTenantPackageStatus: (input: { project_id?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listTemplateTasks: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listRulesetRules: (input: {
    project_id: string;
    ruleset_id: string;
    page: number;
    page_size: number;
    types?: string;
    languages?: string;
    tags?: string;
    keyword?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
  }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCriterionsetsByLanguage: (input: {
    project_id: string;
    language: string;
    page: number;
    page_size: number;
    search?: string;
    keyword?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
  }) => Promise<{
    criterionsets: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getCriterionRule: (input: { criterion_rule_id: string }) => Promise<{
    criterion_rule_id: string;
    raw: Record<string, unknown>;
  }>;
  listThirdTools: (input: { rule_type: 0 | 1 | 3; language?: string }) => Promise<{
    tools: string[];
  }>;
  getCriterionset: (input: { set_id: string; operator?: string }) => Promise<{
    set_id: string;
    raw: Record<string, unknown>;
  }>;
  getProjectConfig: (input: { id: string; operator?: string }) => Promise<{
    id: string;
    raw: Record<string, unknown>;
  }>;
  listConfigItems: (input: { ids: string[] }) => Promise<{
    items: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getMeasureTotal: (input: {
    task_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  modifyCriterionsetRelations: (input: {
    set_id: string;
    operator?: string;
    show_tool_versions?: string[];
    criterion_ids_list: Array<Record<string, unknown> & { id: string; status: "enable" | "disable" }>;
  }) => Promise<{
    set_id: string;
    raw: Record<string, unknown>;
  }>;
  listAllCriterionsets: (input: {
    page: number;
    page_size: number;
    languages?: string;
    search?: string;
    my_create?: boolean;
    project_id?: string;
    is_call_status?: boolean;
    keyword?: string;
    sort_by?: string;
    sort_field?: string;
    sort_order?: "up" | "down";
    operator?: string;
  }) => Promise<{
    criterionsets: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCriterionFilters: (input: {
    project_id: string;
    language: string;
    checker_name?: string;
    key?: string;
    operator: string;
  }) => Promise<{
    filters: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCriterions: (input: {
    page: number;
    page_size: number;
    languages?: string;
    search?: string;
    keyword?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
  }) => Promise<{
    criterions: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getDefectTaskStatistics: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getTaskIssueStatistics: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getDefectMetricTrend: (input: {
    task_id: string;
    start_time?: string;
    end_time?: string;
    metric_type?: string;
    severity?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  listDefectNextStatuses: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getSingleDefect: (input: {
    defect_id?: string;
    issue_id?: string;
    task_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    defect_id?: string;
    raw: Record<string, unknown>;
  }>;
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
  }) => Promise<{
    task_id: string;
    issues: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
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
  }) => Promise<{
    task_id: string;
    facets: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getAsyncJobV2: (input: {
    task_id?: string;
    async_job_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getAsyncJob: (input: {
    task_id: string;
    async_job_id: string;
  }) => Promise<{
    task_id: string;
    async_job_id: string;
    raw: Record<string, unknown>;
  }>;
  getPdfFile: (input: {
    task_id: string;
    job_file: string;
  }) => Promise<{
    task_id: string;
    job_file: string;
    raw: Record<string, unknown> | string;
  }>;
  extractTaskAssistantSummary: (input: {
    project_id: string;
    task_id: string;
    merge_id?: string;
    job_id?: string;
  }) => Promise<{
    task_id: string;
    summary?: string;
    raw: Record<string, unknown>;
  }>;
  getTaskMeasures: (input: {
    task_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  listMeasureFiles: (input: {
    task_id: string;
    page: number;
    page_size: number;
    job_id?: string;
  }) => Promise<{
    task_id: string;
    files: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listMeasureFilesV2: (input: {
    task_id: string;
    page: number;
    page_size: number;
    job_id?: string;
    filter_type?: string;
    sort_field?: string;
    sort_type?: string;
    search?: string;
  }) => Promise<{
    task_id: string;
    files: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listRelatedDuplicateBlocks: (input: {
    task_id: string;
    job_id?: string;
    file_path?: string;
    block_id?: string;
    duplication_type?: "duplication_code" | "duplication_file";
  }) => Promise<{
    task_id: string;
    blocks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listRelatedDuplicateBlocksV2: (input: {
    task_id: string;
    job_id?: string;
    file_path?: string;
    block_id?: string;
    start_line?: number;
    duplication_type?: string;
  }) => Promise<{
    task_id: string;
    blocks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getMeasureDuplicationInfo: (input: {
    task_id: string;
    file_path: string;
    job_id?: string;
    block_id?: string;
    start_line?: number;
    end_line?: number;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  downloadLogFile: (input: {
    sub_job_id?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    sub_job_id?: string;
    raw: Record<string, unknown> | string;
  }>;
  getDefectFileContent: (input: {
    task_id?: string;
    defect_id?: string;
    file_path?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown> | string;
  }>;
  getVpcepAuthorization: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  listTaskCheckList: (input: {
    task_id: string;
    check_type?: "branch" | "tag" | "cr" | "mr";
    page: number;
    page_size: number;
    search?: string;
    time_start?: string;
    time_end?: string;
  }) => Promise<{
    checks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getTaskProgress: (input: { task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getTaskLogDetail: (input: { project_id: string; task_id: string; execute_id?: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  listTaskPathTree: (input: {
    project_id: string;
    task_id: string;
    current_path?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    nodes: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getConsoleLog: (input: {
    job_id: string;
    start_offset?: number;
    end_offset?: number;
    size?: number;
    sort?: "asc" | "desc";
  }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listTaskRulesetsV2: (input: { project_id: string; task_id: string }) => Promise<{
    rulesets: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTaskRulesetsV3: (input: { project_id: string; task_id: string }) => Promise<{
    rulesets: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskRulesetCheckParametersV2: (input: {
    project_id: string;
    task_id: string;
    ruleset_id: string;
  }) => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskRulesetCheckParametersV3: (input: {
    project_id: string;
    task_id: string;
    ruleset_id: string;
  }) => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskSettings: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  updateTaskConfigParameters: (input: {
    project_id: string;
    task_id: string;
    body: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
  listTaskBranches: (input: { project_id: string; task_id: string }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTaskIssues: (input: {
    task_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    severity?: string;
    defect_level?: string;
    rule_id?: string;
    rule_name?: string;
    file_path?: string;
    status?: string;
    checker?: string;
    status_ids?: string;
    delay_status?: string;
  }) => Promise<{
    issues: Array<{
      issue_id: string;
      rule_name?: string;
      severity?: string;
      file_path?: string;
      line?: number;
    }>;
    total?: number;
  }>;
  getMetrics: (input: { task_id: string; project_id: string }) => Promise<{
    task_id: string;
    code_lines?: number;
    issues_count?: number;
    duplicated_lines?: number;
  }>;
  listRulesets: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
  }) => Promise<{
    rulesets: Array<{
      id: string;
      name: string;
      language?: string;
      is_system?: boolean;
    }>;
    total?: number;
  }>;
};

function readEnvelope(input: unknown) {
  return input && typeof input === "object" && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : undefined;
}

function readResultPayload(input: unknown) {
  const envelope = readEnvelope(input) ?? {};
  return readEnvelope(envelope.result) ?? envelope;
}

function readArray<T>(input: unknown): T[] {
  return Array.isArray(input) ? (input as T[]) : [];
}

function readOptionalNumber(input: unknown) {
  return typeof input === "number" ? input : undefined;
}

function readTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const envelope = readEnvelope(response) ?? {};

  return (
    readOptionalNumber(payload.total) ??
    readOptionalNumber(payload.total_count) ??
    readOptionalNumber(payload.totalSize) ??
    readOptionalNumber(envelope.total) ??
    readOptionalNumber(envelope.total_count) ??
    readOptionalNumber(envelope.totalSize) ??
    fallback
  );
}

function buildQuery(input: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

function issueFilterBody(input: {
  task_id: string;
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
}) {
  return {
    taskId: input.task_id,
    mergeId: input.merge_id,
    jobId: input.job_id,
    languages: input.languages,
    ruleIds: input.rule_ids,
    authors: input.authors,
    isNew: input.is_new,
    statusIds: input.status_ids,
    severities: input.severities,
    delayStatus: input.delay_status,
    fileNames: input.file_names,
    userTags: input.user_tags,
    cwes: input.cwes
  };
}

export function createCheckClient(_http: ReturnTypeCreateHttpClient): CheckClient {
  return {
    ...createOfficialApiRequester({
      product: "Check",
      http: _http,
      allowedPrefixes: ["/v1/","/v2/","/v3/","/v4/"]
    }),
    async createTask(input) {
      const taskType = input.task_type === "incremental" ? "inc" : input.task_type;
      const payloadBase = {
        task_name: input.task_name,
        git_url: input.git_url,
        git_branch: input.git_branch,
        check_type: ["source"],
        task_type: taskType,
        resource_pool_id: input.resource_pool_id,
        resource_pool_type: input.resource_pool_type,
        include_paths: input.include_paths,
        exclude_dir: input.exclude_dir
      };
      const payload = input.rule_set_id
        ? {
            ...payloadBase,
            rule_sets: [
              {
                language: input.language,
                ruleset_id: input.rule_set_id
              }
            ]
          }
        : {
            ...payloadBase,
            language: [input.language]
          };
      const response = (await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/task`,
        payload
      )) as {
        task_id?: string;
        task_name?: string;
        project_id?: string;
        git_url?: string;
        git_branch?: string;
        language?: string;
        status?: string | number;
        result?: {
          task_id?: string;
          task_name?: string;
        project_id?: string;
          git_url?: string;
          git_branch?: string;
          language?: string;
          status?: string | number;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? "",
        task_name: item.task_name ?? input.task_name,
        project_id: item.project_id ?? input.project_id,
        git_url: item.git_url ?? input.git_url,
        git_branch: item.git_branch ?? input.git_branch,
        language: item.language ?? input.language,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async createRuleset(input) {
      const response = await _http.post("/v2/ruleset", {
        project_id: input.project_id,
        template_name: input.template_name,
        language: input.language,
        is_default: input.is_default ?? "0",
        rule_ids: input.rule_ids,
        uncheck_ids: input.uncheck_ids,
        template_id: input.template_id,
        custom_attributes: input.custom_attributes
      });
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        ruleset_id: typeof result.template_id === "string" ? result.template_id : "",
        template_name:
          typeof result.template_name === "string"
            ? result.template_name
            : input.template_name,
        language: typeof result.language === "string" ? result.language : input.language,
        is_default:
          typeof result.is_default === "string"
            ? result.is_default
            : input.is_default ?? "0",
        raw: result
      };
    },
    async deleteRuleset(input) {
      const response = await _http.delete?.(
        `/v2/${encodeURIComponent(input.project_id)}/ruleset/${encodeURIComponent(input.ruleset_id)}`
      );

      if (response === null || response === undefined) {
        return {
          project_id: input.project_id,
          ruleset_id: input.ruleset_id,
          raw: undefined
        };
      }

      const payload = readResultPayload(response);
      const result = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        ruleset_id: input.ruleset_id,
        raw: result
      };
    },
    async runTask(input) {
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/run`,
        input.ref ? { ref: input.ref } : {}
      )) as {
        task_id?: string;
        job_id?: string;
        exec_id?: string;
        status?: string | number;
        result?: {
          task_id?: string;
          job_id?: string;
          exec_id?: string;
          status?: string | number;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        job_id: item.job_id ?? item.exec_id,
        exec_id: item.exec_id,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async stopTask(input) {
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/stop`,
        {}
      )) as
        | {
            task_id?: string;
            status?: string | number;
            result?: {
              task_id?: string;
              status?: string | number;
            };
          }
        | null;

      const item = response?.result ?? response ?? {};

      return {
        task_id: item.task_id ?? input.task_id,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async updateIssueStatus(input) {
      const response = await _http.post("/v1/defect/issue-status", {
        taskId: input.task_id,
        mergeId: input.merge_id,
        jobId: input.job_id,
        status: input.status,
        comment: input.comment,
        mergeKey: input.merge_key,
        operator: input.operator
      });
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        merge_key: input.merge_key,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async createPdfAsyncJob(input) {
      const response = await _http.put(`/v1/tasks/${encodeURIComponent(input.task_id)}/pdf-async-job${buildQuery({
        project_name: input.project_name
      })}`, {});
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        async_job_id: typeof payload.asyncJobId === "string" || typeof payload.asyncJobId === "number" ? payload.asyncJobId : undefined,
        time_ask: readOptionalNumber(payload.timeAsk),
        raw: payload
      };
    },
    async updateCodeGate(input) {
      const response = await _http.put("/v1/task/code-gate", {
        id: input.task_id,
        reviewData: input.review_data.map((item) => ({
          compareType: item.compare_type,
          isCheck: item.is_check,
          name: item.name,
          value: item.value
        }))
      }, input.operator ? { headers: { operator: input.operator } } : undefined);
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async updateIgnoreFiles(input) {
      const response = await _http.put(`/v4/task/${encodeURIComponent(input.task_id)}/ignore-files`, {
        nodes: input.nodes.map((item) => ({
          name: item.name,
          file_path: item.file_path,
          is_leaf: item.is_leaf,
          checkbox_status: item.checkbox_status
        }))
      });
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async updateCheckMode(input) {
      const response = await _http.put("/v1/task/check-mode", {
        id: input.task_id,
        mrCheckMode: input.mr_check_mode
      }, input.operator ? { headers: { operator: input.operator } } : undefined);
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async listTasks(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("task_name", input.keyword);
      }

      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks?${query.toString()}`
      )) as {
        tasks?: Array<{
          task_id?: string;
          taskId?: string;
          task_name?: string;
          name?: string;
          project_name?: string;
          projectName?: string;
          repo_name?: string;
          repository_name?: string;
          codeHubName?: string;
          git_url?: string;
          branch_name?: string;
          branch?: string;
          git_branch?: string;
          language?: string;
          status?: string | number;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        tasks: (response.tasks ?? []).map((item) => ({
          task_id: item.task_id ?? item.taskId ?? "",
          task_name: item.task_name ?? item.name ?? "",
          project_name: item.project_name ?? item.projectName,
          repository_name:
            item.repository_name ?? item.repo_name ?? item.codeHubName ?? item.git_url,
          branch_name: item.branch_name ?? item.branch ?? item.git_branch,
          language: item.language,
          status: item.status === undefined ? undefined : String(item.status)
        })),
        total: response.total ?? response.total_count
      };
    },
    async getTask(input) {
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/defects-summary`
      )) as {
        task_id?: string;
        task_name?: string;
        git_url?: string;
        git_branch?: string;
        branch_name?: string;
        language?: string;
        review_result?: string | number;
        status?: string | number;
        last_check_time?: string;
        result?: {
          info?: {
            taskId?: string;
            taskName?: string;
            projectName?: string;
            codeHubName?: string;
            branch?: string;
            language?: string;
            lastCheckTime?: string;
          };
          issue_summary?: {
            task_status?: string | number;
          };
        };
      };

      const info = response.result?.info;
      const summary = response.result?.issue_summary;

      return {
        task_id: response.task_id ?? info?.taskId ?? input.task_id,
        task_name: response.task_name ?? info?.taskName ?? info?.codeHubName ?? input.task_id,
        project_name: info?.projectName,
        repository_name: response.git_url ?? info?.codeHubName,
        branch_name: response.git_branch ?? response.branch_name ?? info?.branch,
        language: response.language ?? info?.language,
        status:
          response.review_result === undefined && response.status === undefined
            ? summary?.task_status === undefined
              ? undefined
              : String(summary.task_status)
            : String(response.review_result ?? response.status),
        last_check_time: response.last_check_time ?? info?.lastCheckTime
      };
    },
    async getTaskById(input) {
      const response = await _http.get(`/v3/task/${encodeURIComponent(input.task_id)}`);
      const payload = readResultPayload(response);
      const task = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: task
      };
    },
    async getTaskResourcePool(input) {
      const response = await _http.get(
        `/v1/tasks/${encodeURIComponent(input.task_id)}/resource-pool`
      );
      const payload = readResultPayload(response);
      const resourcePool = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: resourcePool
      };
    },
    async updateTaskResourcePool(input) {
      const response = await _http.put(
        `/v1/tasks/${encodeURIComponent(input.task_id)}/resource-pool`,
        {
          ...input.body,
          ...(input.resource_pool_id === undefined ? {} : { resource_pool_id: input.resource_pool_id }),
          ...(input.resource_pool_type === undefined ? {} : { resource_pool_type: input.resource_pool_type })
        }
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async listTaskJobs(input) {
      const response = await _http.get(`/v4/tasks/${encodeURIComponent(input.task_id)}/jobs`);
      const payload = readResultPayload(response);
      const jobs = readArray<Record<string, unknown>>(
        payload.jobs ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        jobs,
        total: readTotal(payload, response, jobs.length)
      };
    },
    async listTaskLastJobs(input) {
      const response = await _http.get(`/v4/tasks/${encodeURIComponent(input.task_id)}/last-jobs`);
      const payload = readResultPayload(response);
      const jobs = readArray<Record<string, unknown>>(
        payload.jobs ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        jobs,
        total: readTotal(payload, response, jobs.length)
      };
    },
    async getTaskPreCheckScript(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/pre-check-script`);
      const payload = readResultPayload(response);
      const script = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: script
      };
    },
    async getTaskOwnerMatchingSwitch(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/owner-matching-switch`);
      const payload = readResultPayload(response);
      const switchState = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: switchState
      };
    },
    async updateTaskOwnerMatchingSwitch(input) {
      const response = await _http.put(
        `/v1/tasks/${encodeURIComponent(input.task_id)}/owner-matching-switch`,
        input.body ?? { enabled: input.enabled }
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async getTaskCron(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/taskcron`);
      const payload = readResultPayload(response);
      const cron = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: cron
      };
    },
    async updatePipelineTask(input) {
      const response = await _http.put(
        `/v2/pipeline-task/${encodeURIComponent(input.task_id)}`,
        input.body ?? {}
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async listProjectTaskGroups(input) {
      const response = await _http.get(`/v4/projects/${encodeURIComponent(input.project_id)}/task-groups`);
      const payload = readResultPayload(response);
      const groups = readArray<Record<string, unknown>>(
        payload.groups ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        groups,
        total: readTotal(payload, response, groups.length)
      };
    },
    async listTaskFiles(input) {
      const response = await _http.get(`/v4/tasks/${encodeURIComponent(input.task_id)}/file-list`);
      const payload = readResultPayload(response);
      const files = readArray<Record<string, unknown>>(
        payload.files ?? payload.file_list ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        files,
        total: readTotal(payload, response, files.length)
      };
    },
    async listTaskAllFiles(input) {
      const query = new URLSearchParams();
      if (input.file_path) query.set("file_path", input.file_path);
      if (input.get_son !== undefined) query.set("get_son", String(input.get_son));
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(`/v4/tasks/${encodeURIComponent(input.task_id)}/all-files${suffix}`);
      const payload = readResultPayload(response);
      const files = readArray<Record<string, unknown>>(
        payload.files ?? payload.file_list ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        files,
        total: readTotal(payload, response, files.length)
      };
    },
    async detectTaskLanguage(input) {
      const query = new URLSearchParams({
        scan_file: String(input.scan_file)
      });
      const response = await _http.get(
        `/v1/tasks/${encodeURIComponent(input.task_id)}/detect-language?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const detection = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: detection
      };
    },
    async listCodehubRepositories(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.search) query.set("search", input.search);
      const response = await _http.get(`/v4/codehub/repo-list?${query.toString()}`);
      const payload = readResultPayload(response);
      const repositories = readArray<Record<string, unknown>>(
        payload.repositories ?? payload.repos ?? payload.repo_list ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        repositories,
        total: readTotal(payload, response, repositories.length)
      };
    },
    async getDomainCheckersVersion(input) {
      const response = await _http.get(`/v2/${encodeURIComponent(input.domain_id)}/checkers-version`);
      const payload = readResultPayload(response);
      const version = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        domain_id: input.domain_id,
        raw: version
      };
    },
    async listTaskCheckRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      if (input.start_time) query.set("start_time", input.start_time);
      if (input.end_time) query.set("end_time", input.end_time);
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/checkrecord?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const records = readArray<Record<string, unknown>>(
        payload.records ??
          payload.check_records ??
          payload.checkrecords ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(response) ? response : [])
      );

      return {
        records,
        total: readTotal(payload, response, records.length)
      };
    },
    async listRules(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      if (input.rule_languages) query.set("rule_languages", input.rule_languages);
      if (input.rule_severity) query.set("rule_severity", input.rule_severity);
      if (input.keyword) query.set("name", input.keyword);
      const response = await _http.get(`/v2/rules?${query.toString()}`);
      const payload = readResultPayload(response);
      const rules = readArray<Record<string, unknown>>(
        payload.rules ?? payload.checkers ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        rules,
        total: readTotal(payload, response, rules.length)
      };
    },
    async listDefaultRulesets(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const response = await _http.get(`/v1/criterionset/get-default-sets?${query.toString()}`);
      const payload = readResultPayload(response);
      const rulesets = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        raw: rulesets
      };
    },
    async setDefaultRuleset(input) {
      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/ruleset/${encodeURIComponent(input.ruleset_id)}/${encodeURIComponent(input.language)}/default`,
        input.body ?? {}
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        ruleset_id: input.ruleset_id,
        language: input.language,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async listSupportedLanguages() {
      const response = await _http.get("/v2/excute/language/all");
      const payload = readResultPayload(response);
      const rawLanguages = payload.result ?? payload.languages ?? payload.supportedLanguages ?? payload.value ?? response;
      const languages = Array.isArray(rawLanguages) ? rawLanguages.map(String) : [];

      return { languages };
    },
    async getTaskNotification(input) {
      const response = await _http.get(`/v1/task/notification/${encodeURIComponent(input.task_id)}`);
      const payload = readResultPayload(response);
      const notification = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: notification
      };
    },
    async getCodeSumMeasures() {
      const response = await _http.get("/v1/tasks/code-sum-measures");
      const payload = readResultPayload(response);
      const measures = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: measures
      };
    },
    async listPlugins(input) {
      const query = new URLSearchParams({
        id: input.id
      });
      if (input.name) query.set("name", input.name);
      if (input.version) query.set("version", input.version);
      if (input.publisher_name) query.set("publisher_name", input.publisher_name);
      const response = await _http.get(`/v2/plugins?${query.toString()}`);
      const payload = readResultPayload(response);
      const plugins = readArray<Record<string, unknown>>(
        payload.plugins ??
          payload.data ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(response) ? response : [])
      );

      return {
        plugins,
        total: readTotal(payload, response, plugins.length)
      };
    },
    async getTaskWebhookInfo(input) {
      const response = await _http.get(
        `/v4/tasks/${encodeURIComponent(input.task_id)}/task-webhook-info`
      );
      const payload = readResultPayload(response);
      const webhookInfo = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: webhookInfo
      };
    },
    async updateTaskWebhook(input) {
      const response = await _http.put(
        `/v4/tasks/${encodeURIComponent(input.task_id)}/webhook`,
        input.body
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async getCodeHealthSvg(input) {
      const response = await _http.get(
        `/v4/task/${encodeURIComponent(input.task_id)}/code-health-svg`
      );

      if (typeof response === "string") {
        return {
          task_id: input.task_id,
          raw: response
        };
      }

      const payload = readResultPayload(response);
      const svg = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: svg
      };
    },
    async listTaskRepositoryBranches(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.is_uncreated_only !== undefined) query.set("is_uncreated_only", String(input.is_uncreated_only));
      if (input.search) query.set("search", input.search);
      if (input.repo_type) query.set("repo_type", input.repo_type);
      const response = await _http.get(
        `/v4/tasks/${encodeURIComponent(input.task_id)}/branches?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const rawBranches =
        payload.branch_list ??
        payload.branches ??
        payload.data ??
        payload.value ??
        payload.items ??
        payload.list ??
        (Array.isArray(response) ? response : []);
      const branches = readArray<unknown>(rawBranches).map((item) =>
        typeof item === "string" ? { id: item, name: item, branch: item } : (item as Record<string, unknown>)
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async getTransmissionNotification(input) {
      const query = new URLSearchParams({
        is_check_project: String(input.is_check_project)
      });
      if (input.domain_id) query.set("domain_id", input.domain_id);
      if (input.project_id) query.set("project_id", input.project_id);
      const response = await _http.get(`/v2/transmission/notification?${query.toString()}`);
      const payload = readResultPayload(response);
      const notification = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: notification
      };
    },
    async getTenantPackageStatus(input) {
      const query = new URLSearchParams();
      if (input.project_id) query.set("project_id", input.project_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(`/v4/tenant/tenant-package-status${suffix}`);
      const payload = readResultPayload(response);
      const status = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: status
      };
    },
    async listTemplateTasks(input) {
      const query = new URLSearchParams({
        page: String(input.page - 1),
        page_size: String(input.page_size)
      });
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.search) query.set("search", input.search);
      const response = await _http.get(`/v4/template-tasks?${query.toString()}`);
      const payload = readResultPayload(response);
      const tasks = readArray<Record<string, unknown>>(
        payload.data ?? payload.tasks ?? payload.template_tasks ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        tasks,
        total: readTotal(payload, response, tasks.length)
      };
    },
    async listRulesetRules(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size),
        types: input.types ?? "1"
      });
      if (input.languages) query.set("languages", input.languages);
      if (input.tags) query.set("tags", input.tags);
      if (input.keyword) query.set("keyword", input.keyword);
      if (input.sort_by) query.set("sort_by", input.sort_by);
      if (input.sort_order) query.set("sort_order", input.sort_order);
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/ruleset/${encodeURIComponent(input.ruleset_id)}/rules?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const rules = readArray<Record<string, unknown>>(
        payload.info ?? payload.rules ?? payload.data ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        rules,
        total: readTotal(payload, response, rules.length)
      };
    },
    async listCriterionsetsByLanguage(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        language: input.language,
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.search) query.set("search", input.search);
      if (input.keyword) query.set("keyword", input.keyword);
      if (input.sort_by) query.set("sort_by", input.sort_by);
      if (input.sort_order) query.set("sort_order", input.sort_order);
      const response = await _http.get(`/v1/criterionsets/language?${query.toString()}`);
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const criterionsets = readArray<Record<string, unknown>>(
        listPayload.criterionSetList ?? listPayload.criterionsets ?? listPayload.data ?? listPayload.value ?? listPayload.items ?? listPayload.list ?? []
      );

      return {
        criterionsets,
        total: readTotal(listPayload, response, criterionsets.length)
      };
    },
    async getCriterionRule(input) {
      const response = await _http.get(
        `/v1/rule/criterion-rule/query/${encodeURIComponent(input.criterion_rule_id)}`
      );
      const payload = readResultPayload(response);
      const rule = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        criterion_rule_id: input.criterion_rule_id,
        raw: rule
      };
    },
    async listThirdTools(input) {
      const query = new URLSearchParams({
        rule_type: String(input.rule_type)
      });
      if (input.language) query.set("language", input.language);
      const response = await _http.get(`/v2/excute/all-thirdtools?${query.toString()}`);
      const payload = readResultPayload(response);
      const rawTools = payload.result ?? payload.tools ?? payload.data ?? payload.value ?? response;
      const tools = Array.isArray(rawTools) ? rawTools.map(String) : [];

      return { tools };
    },
    async getCriterionset(input) {
      const query = new URLSearchParams();
      if (input.operator) query.set("operator", input.operator);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(`/v1/criterionsets/${encodeURIComponent(input.set_id)}${suffix}`);
      const payload = readResultPayload(response);
      const criterionset = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        set_id: input.set_id,
        raw: criterionset
      };
    },
    async getProjectConfig(input) {
      const response = await _http.get(
        `/v1/simple-query/${encodeURIComponent(input.id)}`,
        input.operator ? { headers: { operator: input.operator } } : undefined
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        id: input.id,
        raw: config
      };
    },
    async listConfigItems(input) {
      const response = await _http.post("/v1/config-items", {
        ids: input.ids
      });
      const payload = readResultPayload(response);
      const items = readArray<Record<string, unknown>>(
        payload.items ?? payload.config_items ?? payload.data ?? payload.value ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        items,
        total: readTotal(payload, response, items.length),
        raw: payload
      };
    },
    async getMeasureTotal(input) {
      const response = await _http.post("/v1/measure/measure-total", {
        ...(input.query ?? {}),
        taskId: input.task_id
      });
      const payload = readResultPayload(response);
      const measures = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: measures
      };
    },
    async modifyCriterionsetRelations(input) {
      const response = await _http.post(
        "/v1/relations",
        {
          setId: input.set_id,
          ...(input.show_tool_versions ? { showToolVersions: input.show_tool_versions } : {}),
          criterionIdsList: input.criterion_ids_list.map((item) => {
            const { is_support_version, ...rest } = item;
            return {
              ...rest,
              ...(is_support_version ? { isSupportVersion: is_support_version } : {})
            };
          })
        },
        input.operator ? { headers: { operator: input.operator } } : undefined
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        set_id: input.set_id,
        raw: result
      };
    },
    async listAllCriterionsets(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.languages) query.set("languages", input.languages);
      const search = input.search ?? input.keyword;
      if (search) query.set("search", search);
      if (input.my_create !== undefined) query.set("my_create", String(input.my_create));
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.is_call_status !== undefined) query.set("is_call_status", String(input.is_call_status));
      const sortField = input.sort_field ?? input.sort_by;
      if (sortField) query.set("sort_field", sortField);
      if (input.sort_order) query.set("sort_order", input.sort_order);
      if (input.operator) query.set("operator", input.operator);
      const response = await _http.get(`/v2/all-criterionsets?${query.toString()}`);
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const criterionsets = readArray<Record<string, unknown>>(
        listPayload.criterionSetList ?? listPayload.criterionsets ?? listPayload.data ?? listPayload.value ?? listPayload.items ?? listPayload.list ?? []
      );

      return {
        criterionsets,
        total: readTotal(listPayload, response, criterionsets.length)
      };
    },
    async listCriterionFilters(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        language: input.language
      });
      if (input.checker_name) query.set("checker_name", input.checker_name);
      if (input.key) query.set("key", input.key);
      const response = await _http.get(
        `/v1/criterion-filters?${query.toString()}`,
        { headers: { operator: input.operator } }
      );
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const filters = readArray<Record<string, unknown>>(
        listPayload.filters ?? listPayload.criterionFilters ?? listPayload.data ?? listPayload.value ?? listPayload.items ?? listPayload.list ?? []
      );

      return {
        filters,
        total: readTotal(listPayload, response, filters.length)
      };
    },
    async listCriterions(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.languages) query.set("languages", input.languages);
      if (input.search) query.set("search", input.search);
      if (input.keyword) query.set("keyword", input.keyword);
      if (input.sort_by) query.set("sort_by", input.sort_by);
      if (input.sort_order) query.set("sort_order", input.sort_order);
      const response = await _http.get(`/v2/criterions?${query.toString()}`);
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const criterions = readArray<Record<string, unknown>>(
        listPayload.criterions ?? listPayload.criterionList ?? listPayload.data ?? listPayload.value ?? listPayload.items ?? listPayload.list ?? []
      );

      return {
        criterions,
        total: readTotal(listPayload, response, criterions.length)
      };
    },
    async getDefectTaskStatistics(input) {
      const response = await _http.get(`/v2/tasks/${encodeURIComponent(input.task_id)}/defects-statistic`);
      const payload = readResultPayload(response);
      const statistics = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: statistics
      };
    },
    async getTaskIssueStatistics(input) {
      const response = await _http.get(`/v1/defects/task-statistics${buildQuery({ task_id: input.task_id })}`);
      const payload = readResultPayload(response);
      const statistics = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: statistics
      };
    },
    async getDefectMetricTrend(input) {
      const response = await _http.get(`/v1/history/defect-metric-trend${buildQuery({
        ...(input.query ?? {}),
        task_id: input.task_id,
        start_time: input.start_time,
        end_time: input.end_time,
        metric_type: input.metric_type,
        severity: input.severity
      })}`);
      const payload = readResultPayload(response);
      const trend = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: trend
      };
    },
    async listDefectNextStatuses(input) {
      const response = await _http.get(`/v1/defects/next-status${buildQuery(input.query ?? {})}`);
      const payload = readResultPayload(response);
      const statuses = readArray<Record<string, unknown>>(
        payload.statuses ?? payload.next_statuses ?? payload.data ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        statuses,
        total: readTotal(payload, response, statuses.length),
        raw: payload
      };
    },
    async getSingleDefect(input) {
      const response = await _http.get(`/v1/defect${buildQuery({
        ...(input.query ?? {}),
        defect_id: input.defect_id,
        issue_id: input.issue_id,
        task_id: input.task_id
      })}`);
      const payload = readResultPayload(response);
      const defect = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        defect_id: input.defect_id ?? input.issue_id,
        raw: defect
      };
    },
    async listIssuesByFilter(input) {
      const response = await _http.post("/v1/defect/issue-list-by-filter", {
        ...issueFilterBody(input),
        page: input.page,
        pageSize: input.page_size
      });
      const payload = readResultPayload(response);
      const resultPayload = readEnvelope(payload.result) ?? payload;
      const issues = readArray<Record<string, unknown>>(
        resultPayload.info ??
          resultPayload.issues ??
          resultPayload.items ??
          resultPayload.list
      );

      return {
        task_id: input.task_id,
        issues,
        total: readTotal(resultPayload, response, issues.length),
        raw: resultPayload
      };
    },
    async getIssueFilter(input) {
      const response = await _http.post("/v1/defect/issue-filter", {
        ...issueFilterBody(input),
        facets: input.facets
      });
      const payload = readResultPayload(response);
      const resultPayload = readEnvelope(payload.result) ?? payload;
      const facets = readArray<Record<string, unknown>>(
        resultPayload.facets ??
          resultPayload.items ??
          resultPayload.list
      );

      return {
        task_id: input.task_id,
        facets,
        total: readTotal(resultPayload, response, facets.length),
        raw: resultPayload
      };
    },
    async getAsyncJobV2(input) {
      const response = await _http.get(`/v2/async-job${buildQuery({
        ...(input.query ?? {}),
        task_id: input.task_id,
        async_job_id: input.async_job_id
      })}`);
      const payload = readResultPayload(response);
      const job = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return { raw: job };
    },
    async getAsyncJob(input) {
      const response = await _http.get(
        `/v1/tasks/${encodeURIComponent(input.task_id)}/async-job/${encodeURIComponent(input.async_job_id)}`
      );
      const payload = readResultPayload(response);
      const job = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        async_job_id: input.async_job_id,
        raw: job
      };
    },
    async getPdfFile(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/pdf-file${buildQuery({
        job_file: input.job_file
      })}`);

      if (typeof response === "string") {
        return {
          task_id: input.task_id,
          job_file: input.job_file,
          raw: response
        };
      }

      const payload = readResultPayload(response);
      const file = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        job_file: input.job_file,
        raw: file
      };
    },
    async extractTaskAssistantSummary(input) {
      const response = await _http.post(`/v1/defects/assistant-analysis/task-summary${buildQuery({
        project_id: input.project_id
      })}`, {
        task_id: input.task_id,
        merge_id: input.merge_id,
        job_id: input.job_id
      });
      const payload = readResultPayload(response);
      const result = payload.result ?? payload.data ?? payload.value;
      const summary = typeof result === "string" ? result : undefined;
      const raw = summary ? { summary } : (readEnvelope(result) ?? payload);

      return {
        task_id: input.task_id,
        summary,
        raw
      };
    },
    async getTaskMeasures(input) {
      const response = await _http.get(`/v1/defects/task-measures${buildQuery({
        ...(input.query ?? {}),
        task_id: input.task_id
      })}`);
      const payload = readResultPayload(response);
      const measures = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: measures
      };
    },
    async listMeasureFiles(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/measure-list${buildQuery({
        job_id: input.job_id,
        page_num: input.page,
        page_size: input.page_size
      })}`);
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const files = readArray<Record<string, unknown>>(
        listPayload.measureProjectInfos ??
          listPayload.measure_project_infos ??
          listPayload.items ??
          listPayload.list
      );

      return {
        task_id: input.task_id,
        files,
        total: readTotal(listPayload, response, files.length),
        raw: listPayload
      };
    },
    async listMeasureFilesV2(input) {
      const response = await _http.post("/v2/measure/measure-list", {
        taskId: input.task_id,
        jobId: input.job_id,
        filterType: input.filter_type,
        sortField: input.sort_field,
        sortType: input.sort_type,
        search: input.search,
        page: input.page,
        pageSize: input.page_size
      });
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const files = readArray<Record<string, unknown>>(
        listPayload.measureProjectInfos ??
          listPayload.measure_project_infos ??
          listPayload.items ??
          listPayload.list
      );

      return {
        task_id: input.task_id,
        files,
        total: readTotal(listPayload, response, files.length),
        raw: listPayload
      };
    },
    async listRelatedDuplicateBlocks(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/related-duplicate-blocks${buildQuery({
        job_id: input.job_id,
        file_path: input.file_path,
        block_id: input.block_id,
        duplication_type: input.duplication_type
      })}`);
      const payload = readResultPayload(response);
      const resultPayload = readEnvelope(payload.result) ?? payload;
      const blocks = readArray<Record<string, unknown>>(
        payload.result ??
          resultPayload.blocks ??
          resultPayload.files ??
          resultPayload.items ??
          resultPayload.list
      );

      return {
        task_id: input.task_id,
        blocks,
        total: readTotal(resultPayload, response, blocks.length),
        raw: resultPayload
      };
    },
    async listRelatedDuplicateBlocksV2(input) {
      const response = await _http.post("/v2/related-duplicate-blocks", {
        taskId: input.task_id,
        jobId: input.job_id,
        filePath: input.file_path,
        blockId: input.block_id,
        startLine: input.start_line,
        duplicationType: input.duplication_type
      });
      const payload = readResultPayload(response);
      const resultPayload = readEnvelope(payload.result) ?? payload;
      const blocks = readArray<Record<string, unknown>>(
        payload.result ??
          resultPayload.blocks ??
          resultPayload.files ??
          resultPayload.items ??
          resultPayload.list
      );

      return {
        task_id: input.task_id,
        blocks,
        total: readTotal(resultPayload, response, blocks.length),
        raw: resultPayload
      };
    },
    async getMeasureDuplicationInfo(input) {
      const response = await _http.post("/v1/measure/measure-duplication-info", {
        taskId: input.task_id,
        filePath: input.file_path,
        jobId: input.job_id,
        blockId: input.block_id,
        startLine: input.start_line,
        endLine: input.end_line
      });
      const payload = readResultPayload(response);
      const resultPayload = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: resultPayload
      };
    },
    async downloadLogFile(input) {
      const response = await _http.get(`/v1/log-file${buildQuery({
        ...(input.query ?? {}),
        sub_job_id: input.sub_job_id
      })}`);

      if (typeof response === "string") {
        return {
          sub_job_id: input.sub_job_id,
          raw: response
        };
      }

      const payload = readResultPayload(response);
      const log = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        sub_job_id: input.sub_job_id,
        raw: log
      };
    },
    async getDefectFileContent(input) {
      const response = await _http.get(`/v1/defects/file-content${buildQuery({
        ...(input.query ?? {}),
        task_id: input.task_id,
        defect_id: input.defect_id,
        file_path: input.file_path
      })}`);

      if (typeof response === "string") {
        return { raw: response };
      }

      const payload = readResultPayload(response);
      const fileContent = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return { raw: fileContent };
    },
    async getVpcepAuthorization(input) {
      const query = new URLSearchParams({ task_id: input.task_id });
      const response = await _http.get(`/v1/vpcep-authorization?${query.toString()}`);
      const payload = readResultPayload(response);
      const authorization = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: authorization
      };
    },
    async listTaskCheckList(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.check_type) query.set("check_type", input.check_type);
      if (input.search) query.set("search", input.search);
      if (input.time_start) query.set("time_start", input.time_start);
      if (input.time_end) query.set("time_end", input.time_end);
      const response = await _http.get(`/v4/task/${encodeURIComponent(input.task_id)}/check-list?${query.toString()}`);
      const payload = readResultPayload(response);
      const listPayload = readEnvelope(payload.result) ?? payload;
      const checks = readArray<Record<string, unknown>>(
        listPayload.list ?? listPayload.checks ?? listPayload.data ?? listPayload.value ?? listPayload.items ?? []
      );

      return {
        checks,
        total: readTotal(listPayload, response, checks.length),
        raw: listPayload
      };
    },
    async getTaskProgress(input) {
      const response = await _http.get(`/v2/tasks/${encodeURIComponent(input.task_id)}/progress`);
      const payload = readResultPayload(response);
      const progress = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: progress
      };
    },
    async getTaskLogDetail(input) {
      const query = new URLSearchParams();
      if (input.execute_id) query.set("execute_id", input.execute_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/log-detail${suffix}`
      );
      const payload = readResultPayload(response);
      const detail = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: detail
      };
    },
    async listTaskPathTree(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      if (input.current_path) query.set("current_path", input.current_path);
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/listpathtree?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const nodes = readArray<Record<string, unknown>>(
        payload.info ?? payload.nodes ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        nodes,
        total: readTotal(payload, response, nodes.length)
      };
    },
    async getConsoleLog(input) {
      const query = new URLSearchParams({ job_id: input.job_id });
      if (input.start_offset !== undefined) query.set("start_offset", String(input.start_offset));
      if (input.end_offset !== undefined) query.set("end_offset", String(input.end_offset));
      if (input.size !== undefined) query.set("size", String(input.size));
      if (input.sort) query.set("sort", input.sort);
      const response = await _http.get(`/v1/console-log?${query.toString()}`);
      const payload = readResultPayload(response);
      const log = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        job_id: input.job_id,
        raw: log
      };
    },
    async listTaskRulesetsV2(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/rulesets`
      );
      const payload = readResultPayload(response);
      const rulesets = readArray<Record<string, unknown>>(
        payload.rulesets ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        rulesets,
        total: readTotal(payload, response, rulesets.length)
      };
    },
    async listTaskRulesetsV3(input) {
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/rulesets`
      );
      const payload = readResultPayload(response);
      const rulesets = readArray<Record<string, unknown>>(
        payload.rulesets ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        rulesets,
        total: readTotal(payload, response, rulesets.length)
      };
    },
    async getTaskRulesetCheckParametersV2(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/ruleset/${encodeURIComponent(input.ruleset_id)}/check-parameters`
      );
      const payload = readResultPayload(response);
      const parameters = readArray<Record<string, unknown>>(
        payload.parameters ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        parameters,
        total: readTotal(payload, response, parameters.length)
      };
    },
    async getTaskRulesetCheckParametersV3(input) {
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/ruleset/${encodeURIComponent(input.ruleset_id)}/check-parameters`
      );
      const payload = readResultPayload(response);
      const parameters = readArray<Record<string, unknown>>(
        payload.parameters ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        parameters,
        total: readTotal(payload, response, parameters.length)
      };
    },
    async getTaskSettings(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/settings`
      );
      const payload = readResultPayload(response);
      const settings = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: settings
      };
    },
    async updateTaskConfigParameters(input) {
      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/config-parameters`,
        input.body
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        status: typeof payload.status === "string" ? payload.status : undefined,
        result: typeof payload.result === "string" ? payload.result : undefined,
        raw: payload
      };
    },
    async listTaskBranches(input) {
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/branches`
      );
      const payload = readResultPayload(response);
      const branches = readArray<Record<string, unknown>>(
        payload.branches ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async listTaskIssues(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const defectLevel = input.defect_level ?? input.severity;
      if (defectLevel) {
        query.set("defect_level", defectLevel);
      }
      if (input.rule_id) {
        query.set("rule_id", input.rule_id);
      }
      if (input.rule_name ?? input.keyword) {
        query.set("rule_name", input.rule_name ?? input.keyword ?? "");
      }
      if (input.file_path) {
        query.set("file_path", input.file_path);
      }
      if (input.status) {
        query.set("status", input.status);
      }
      if (input.status_ids) {
        query.set("status_ids", input.status_ids);
      }
      if (input.delay_status) {
        query.set("delay_status", input.delay_status);
      }
      if (input.checker) {
        query.set("checker", input.checker);
      }
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/defects-detail?${query.toString()}`
      )) as {
        defects?: Array<{
          defect_id?: string;
          defectId?: string;
          issue_id?: string;
          issueId?: string;
          rule_name?: string;
          ruleName?: string;
          defect_level?: string | number;
          severity?: string;
          file_path?: string;
          filePath?: string;
          line?: number;
          line_num?: number;
          line_number?: string | number;
        }>;
        issues?: Array<{
          issue_id?: string;
          issueId?: string;
          rule_name?: string;
          ruleName?: string;
          severity?: string;
          defect_id?: string;
          defectId?: string;
          defect_level?: string | number;
          file_path?: string;
          filePath?: string;
          line?: number;
          line_num?: number;
          line_number?: string | number;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        issues: (response.defects ?? response.issues ?? []).map((item) => ({
          issue_id: item.issue_id ?? item.issueId ?? item.defect_id ?? item.defectId ?? "",
          rule_name: item.rule_name ?? item.ruleName,
          severity:
            item.severity ?? (item.defect_level === undefined ? undefined : String(item.defect_level)),
          file_path: item.file_path ?? item.filePath,
          line:
            item.line ??
            item.line_num ??
            (item.line_number === undefined ? undefined : Number(item.line_number))
        })),
        total: response.total ?? response.total_count
      };
    },
    async getMetrics(input: { task_id: string; project_id: string }) {
      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/metrics-summary`
      )) as {
        metric_info?: {
          code_size?: string | number;
          code_duplication_total?: string | number;
          issue_count?: string | number;
        };
        result?: {
          metrics?: {
            code_lines?: number;
            issues_count?: number;
            duplicated_lines?: number;
          };
          summary?: {
            code_lines?: number;
            issues_count?: number;
            duplicated_lines?: number;
          };
        };
      };

      const metrics = response.result?.metrics ?? response.result?.summary;
      const rawMetrics = response.metric_info;

      return {
        task_id: input.task_id,
        code_lines:
          metrics?.code_lines ??
          (rawMetrics?.code_size === undefined ? undefined : Number(rawMetrics.code_size)),
        issues_count:
          metrics?.issues_count ??
          (rawMetrics?.issue_count === undefined ? undefined : Number(rawMetrics.issue_count)),
        duplicated_lines:
          metrics?.duplicated_lines ??
          (rawMetrics?.code_duplication_total === undefined
            ? undefined
            : Number(rawMetrics.code_duplication_total))
      };
    },
    async listRulesets(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("name", input.keyword);
      }

      if (input.language) {
        query.set("language", input.language);
      }

      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rulesets?${query.toString()}`
      )) as {
        rulesets?: Array<{
          id?: string | number;
          ruleset_id?: string | number;
          name?: string;
          language?: string;
          is_system?: boolean;
        }>;
        info?: Array<{
          template_id?: string | number;
          id?: string | number;
          ruleset_id?: string | number;
          template_name?: string;
          name?: string;
          language?: string;
          is_system?: boolean;
          creator_id?: string;
        }>;
        total?: number;
        total_count?: number;
      };

      const rulesets: Array<{
        id?: string | number;
        ruleset_id?: string | number;
        template_id?: string | number;
        name?: string;
        template_name?: string;
        language?: string;
        is_system?: boolean;
        creator_id?: string;
      }> = response.rulesets ?? response.info ?? [];

      return {
        rulesets: rulesets.map((item) => ({
          id: String(item.id ?? item.ruleset_id ?? item.template_id ?? ""),
          name: item.name ?? item.template_name ?? "",
          language: item.language?.toLowerCase(),
          is_system: item.is_system ?? item.creator_id === "system"
        })),
        total: response.total ?? response.total_count ?? rulesets.length
      };
    }
  };
}
