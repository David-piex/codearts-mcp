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
  listTasks: (input: {
    page: number;
    page_size: number;
    project_id?: string;
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
  getTaskResourcePool: (input: { task_id: string }) => Promise<{
    task_id: string;
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
  getTaskCron: (input: { task_id: string }) => Promise<{
    task_id: string;
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
  listSupportedLanguages: () => Promise<{
    languages: string[];
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
  getMetrics: (input: { task_id: string; project_id?: string }) => Promise<{
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
    async listTasks(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("task_name", input.keyword);
      }

      const path = input.project_id
        ? `/v2/${encodeURIComponent(input.project_id)}/tasks?${query.toString()}`
        : `/v2/tasks?${query.toString()}`;

      const response = (await _http.get(path)) as {
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
    async getTaskCron(input) {
      const response = await _http.get(`/v1/tasks/${encodeURIComponent(input.task_id)}/taskcron`);
      const payload = readResultPayload(response);
      const cron = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        task_id: input.task_id,
        raw: cron
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
    async listSupportedLanguages() {
      const response = await _http.get("/v2/excute/language/all");
      const payload = readResultPayload(response);
      const rawLanguages = payload.result ?? payload.languages ?? payload.supportedLanguages ?? payload.value ?? response;
      const languages = Array.isArray(rawLanguages) ? rawLanguages.map(String) : [];

      return { languages };
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
    async getMetrics(input: { task_id: string; project_id?: string }) {
      const path = input.project_id
        ? `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/metrics-summary`
        : `/v2/tasks/${encodeURIComponent(input.task_id)}/metrics-summary`;
      const response = (await _http.get(path)) as {
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
