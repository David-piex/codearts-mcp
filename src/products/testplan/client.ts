import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";

export type TestPlanClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  listIssues: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<{
      issue_id: string;
      subject?: string;
      tracker_name?: string;
      parent_issue_id?: string;
      owner_name?: string;
      status?: string;
      severity?: string;
      module?: string;
      iteration?: string;
      start_date?: string;
      end_date?: string;
      workitem_id?: string;
      region_id?: string;
    }>;
    total?: number;
  }>;
  listPlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    plans: Array<{
      plan_id: string;
      name: string;
      owner_name?: string;
      status?: string;
      description?: string;
    }>;
    total?: number;
  }>;
  getPlan: (input: { project_id: string; plan_id: string }) => Promise<{
    plan_id: string;
    name: string;
    owner_name?: string;
    status?: string;
    description?: string;
  }>;
  listCases: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    owner_id?: string;
    status?: string;
    priority?: string;
    module_id?: string;
    label_id?: string;
    test_case_type?: string;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    cases: Array<{
      case_id: string;
      name: string;
      result?: string;
      status?: string;
      test_type?: string;
    }>;
    total?: number;
  }>;
  listRuns: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    runs: Array<{
      run_id: string;
      name?: string;
      status?: string;
      executor_name?: string;
    }>;
    total?: number;
  }>;
  listTasks: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    status_codes?: number[];
    executor_ids?: string[];
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      name?: string;
      version_uri?: string;
      status_code?: number;
      status_name?: string;
      executor_id?: string;
      executor_name?: string;
    }>;
    total?: number;
  }>;
  getTask: (input: {
    project_id: string;
    task_uri: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
    executor_id?: string;
    executor_name?: string;
  }>;
  getTaskExecutionParam: (input: {
    task_uri: string;
    project_uuid?: string;
  }) => Promise<{
    task_uri: string;
    parameters: Record<string, unknown>;
  }>;
  getTaskResultDetail: (input: {
    project_id: string;
    task_uri: string;
    result_uri: string;
    page: number;
    page_size: number;
    result?: string;
  }) => Promise<{
    result_id: string;
    task_result?: Record<string, unknown>;
    test_results: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTestReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    report_id: string;
    name?: string;
    creator?: string;
    version_uri?: string;
    raw: Record<string, unknown>;
  }>;
  listTestReportIssues: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    completed?: boolean;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTestReportDefects: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    page: number;
    page_size: number;
    keyword?: string;
    resolved?: boolean;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTestReportQualityAttributes: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    attributes: Array<Record<string, unknown>>;
    total?: number;
    has_more?: boolean;
  }>;
  listCustomReports: (input: {
    project_id: string;
    version_uri: string;
    type: string;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getCustomTemplate: (input: {
    project_id: string;
    version_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listProgressReports: (input: {
    project_uuid: string;
    version_uri: string;
    type: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getCaseTemplate: (input: {
    project_id: string;
    template_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listTestcaseFields: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTestTypes: (input: {
    project_id: string;
  }) => Promise<{
    types: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTestcaseV4: (input: {
    project_uuid: string;
    version_uri: string;
    case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listTesthubServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTesthubCase: (input: {
    project_id: string;
    case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getTesthubCaseByNumber: (input: {
    project_id: string;
    testcase_number: string;
    version_uri?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listAttachments: (input: {
    project_id: string;
    resource_uri: string;
    resource_type: string;
  }) => Promise<{
    attachments: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectFieldConfigs: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTesthubBranches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTesthubIterators: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    current_stage?: string;
    branch_uri?: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listIteratorIssues: (input: {
    project_id: string;
    iterator_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listIteratorHistories: (input: {
    project_id: string;
    iterator_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getTaskSuccessTestCasesCount: (input: {
    project_uuid: string;
    version_uri: string;
    task_uri: string;
  }) => Promise<{
    task_uri: string;
    success_count?: number;
    value?: unknown;
  }>;
  createTask: (input: {
    project_id: string;
    name: string;
    uri?: string;
    description?: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
  }>;
  updateTask: (input: {
    project_id: string;
    task_uri: string;
    name: string;
    uri?: string;
    description?: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
  }>;
  batchDeleteTasks: (input: {
    project_id: string;
    task_uris: string[];
    version_uri?: string;
  }) => Promise<{
    deleted_count?: number;
    task_uris: string[];
  }>;
  createTaskRelations: (input: {
    project_id: string;
    name: string;
    uri?: string;
    stage?: string;
    number?: string;
    tags?: string;
    description?: string;
    region?: string;
    version_uri?: string;
    owner_id?: string;
    parent_uri?: string;
    test_case_condition?: string;
    service_type?: number;
    module_id?: string;
    module_name?: string;
    release_dev?: string;
    status_code?: number;
    ext_param?: string;
    execute_way?: number;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
  }>;
  initTaskExecution: (input: {
    project_id: string;
    task_uri: string;
    release_dev?: string;
    version_uri?: string;
    is_query?: boolean;
  }) => Promise<{
    result_id?: string;
    task_uri: string;
    total?: number;
    has_more?: boolean;
  }>;
  stopTaskExecution: (input: {
    project_id: string;
    task_uri: string;
    result_uri: string;
  }) => Promise<{
    result_uri: string;
    value?: string;
    stopped: boolean;
  }>;
  listTaskCases: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
    status?: string[];
    version_uri?: string;
  }) => Promise<{
    cases: Array<{
      case_id: string;
      name?: string;
      status?: string;
      result?: string;
      executor_id?: string;
      executor_name?: string;
    }>;
    total?: number;
  }>;
  listTaskCasesV4: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    results?: string[];
    status?: string[];
    version_uri?: string;
    owners?: string[];
    rank_ids?: string[];
  }) => Promise<{
    cases: Array<{
      case_id: string;
      name?: string;
      status?: string;
      result?: string;
      executor_id?: string;
      executor_name?: string;
    }>;
    total?: number;
  }>;
  listTaskResults: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    iterator_uri?: string;
  }) => Promise<{
    results: Array<{
      result_id: string;
      name?: string;
      task_uri?: string;
      version_uri?: string;
      executor_id?: string;
      executor_name?: string;
      status?: string;
    }>;
    total?: number;
  }>;
  runCases: (input: {
    project_id: string;
    execute_list: Array<{
      case_id?: string;
      testcase_id?: string;
      executor_id?: string;
      execute_id?: string;
      result_id?: string;
      start_time?: string;
      end_time?: string;
      duration?: number;
      description?: string;
      remark?: string;
    }>;
  }) => Promise<{
    run_id?: string;
    accepted_count?: number;
    status?: string;
  }>;
  getCase: (input: { project_id: string; case_id: string }) => Promise<{
    case_id: string;
    name: string;
    result?: string;
    status?: string;
    test_type?: string;
  }>;
};

function readArray<T>(input: unknown): T[] {
  return Array.isArray(input) ? (input as T[]) : [];
}

function readEnvelope(input: unknown) {
  if (input && typeof input === "object" && !Array.isArray(input)) {
    return input as Record<string, unknown>;
  }

  return undefined;
}

function readOptionalNumber(input: unknown) {
  return typeof input === "number" ? input : undefined;
}

function readResultPayload(input: unknown) {
  const envelope = readEnvelope(input) ?? {};
  return readEnvelope(envelope.result) ?? envelope;
}

function readTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const envelope = readEnvelope(response) ?? {};

  return (
    readOptionalNumber(payload.total) ??
    readOptionalNumber(payload.total_count) ??
    readOptionalNumber(envelope.total) ??
    readOptionalNumber(envelope.total_count) ??
    fallback
  );
}

function appendQueryValue(
  query: URLSearchParams,
  key: string,
  value: string | number | boolean | string[] | undefined
) {
  if (value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      query.append(key, item);
    }
    return;
  }

  query.set(key, String(value));
}

function pageToOffset(page: number, pageSize: number) {
  return (page - 1) * pageSize;
}

export function createTestPlanClient(_http: ReturnTypeCreateHttpClient): TestPlanClient {
  return {
    ...createOfficialApiRequester({
      product: "TestPlan",
      http: _http,
      allowedPrefixes: ["/v1/","/v2/","/v3/","/v4/","/GT3KServer/","/attask/","/dynamic-global-variable/","/testrelation/","/testreport/"]
    }),
    async listIssues(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}/issues?${query.toString()}`
      )) as
        | Array<{
            issue_id?: string | number;
            id?: string | number;
            subject?: string;
            tracker_name?: string;
            tracker?: string;
            parent_issue_id?: string | number;
            parent_id?: string | number;
            owner_name?: string;
            owner?: string;
            severity?: string;
            priority?: string;
            status?: string;
            module?: string;
            module_name?: string;
            iteration?: string;
            start_date?: string;
            end_date?: string;
            workitem_id?: string | number;
            region_id?: string | number;
          }>
        | {
            issues?: Array<{
              issue_id?: string | number;
              id?: string | number;
              subject?: string;
              tracker_name?: string;
              tracker?: string;
              parent_issue_id?: string | number;
              parent_id?: string | number;
              owner_name?: string;
              owner?: string;
              severity?: string;
              priority?: string;
              status?: string;
              module?: string;
              module_name?: string;
              iteration?: string;
              start_date?: string;
              end_date?: string;
              workitem_id?: string | number;
              region_id?: string | number;
            }>;
            total?: number;
          };

      const issues = Array.isArray(response) ? response : response.issues ?? [];

      return {
        issues: issues.map((item) => ({
          issue_id: String(item.issue_id ?? item.id ?? ""),
          subject: item.subject,
          tracker_name: item.tracker_name ?? item.tracker,
          parent_issue_id:
            item.parent_issue_id === undefined && item.parent_id === undefined
              ? undefined
              : String(item.parent_issue_id ?? item.parent_id),
          owner_name: item.owner_name ?? item.owner,
          status: item.status,
          severity: item.severity ?? item.priority,
          module: item.module ?? item.module_name,
          iteration: item.iteration,
          start_date: item.start_date,
          end_date: item.end_date,
          workitem_id:
            item.workitem_id === undefined ? undefined : String(item.workitem_id),
          region_id: item.region_id === undefined ? undefined : String(item.region_id)
        })),
        total: Array.isArray(response) ? response.length : response.total
      };
    },
    async listPlans(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("name", input.keyword);
      }

      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/plans?${query.toString()}`
      )) as
        | Array<{
            plan_id?: string;
            name?: string;
            owner_name?: string;
            owner?: string;
            current_stage?: string;
            status?: string;
            description?: string;
          }>
        | {
            plans?: Array<{
              plan_id?: string;
              name?: string;
              owner_name?: string;
              owner?: string;
              current_stage?: string;
              status?: string;
              description?: string;
            }>;
            total?: number;
          };

      const plans = Array.isArray(response) ? response : response.plans ?? [];
      const total = Array.isArray(response) ? response.length : response.total;

      return {
        plans: plans.map((item) => ({
          plan_id: item.plan_id ?? "",
          name: item.name ?? "",
          owner_name: item.owner_name ?? item.owner,
          status: item.status ?? item.current_stage,
          description: item.description
        })),
        total
      };
    },
    async getPlan(input) {
      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}`
      )) as {
        plan_id?: string;
        name?: string;
        owner_name?: string;
        owner?: string;
        current_stage?: string;
        status?: string;
        description?: string;
      };

      return {
        plan_id: response.plan_id ?? input.plan_id,
        name: response.name ?? "",
        owner_name: response.owner_name ?? response.owner,
        status: response.status ?? response.current_stage,
        description: response.description
      };
    },
    async listCases(input) {
      const offset = (input.page - 1) * input.page_size;
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size,
        offset,
        limit: input.page_size,
        keyword: input.keyword,
        iterator_uri: input.plan_id,
        version_uri: input.plan_id
      };

      if (input.owner_id) {
        body.owner_id = input.owner_id;
      }
      if (input.status) {
        body.status = input.status;
      }
      if (input.priority) {
        body.priority = input.priority;
      }
      if (input.module_id) {
        body.module_id = input.module_id;
      }
      if (input.label_id) {
        body.label_id = input.label_id;
      }
      if (input.test_case_type) {
        body.test_case_type = input.test_case_type;
      }
      if (input.query) {
        Object.assign(body, input.query);
      }

      const response = (await _http.post(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/testcases/batch-query`,
        body
      )) as {
        testcases?: Array<{
          case_uri?: string;
          uri?: string;
          name?: string;
          result?: string;
          status?: string;
          test_type?: string;
        }>;
        total?: number;
      };

      return {
        cases: (response.testcases ?? []).map((item) => ({
          case_id: item.case_uri ?? item.uri ?? "",
          name: item.name ?? "",
          result: item.result,
          status: item.status,
          test_type: item.test_type
        })),
        total: response.total
      };
    },
    async listRuns(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}/runs?offset=${offset}&limit=${input.page_size}`
      )) as {
        runs?: Array<{
          run_id?: string;
          id?: string;
          name?: string;
          status?: string;
          executor_name?: string;
        }>;
        total?: number;
      };

      return {
        runs: (response.runs ?? []).map((item) => ({
          run_id: item.run_id ?? item.id ?? "",
          name: item.name,
          status: item.status,
          executor_name: item.executor_name
        })),
        total: response.total
      };
    },
    async listTasks(input) {
      const body: Record<string, unknown> = {
        keyword: input.keyword,
        status_codes: input.status_codes,
        executor_ids: input.executor_ids,
        page_no: input.page,
        page_size: input.page_size
      };

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/tasks/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const tasks = readArray<{
        uri?: string;
        id?: string;
        task_uri?: string;
        name?: string;
        version_uri?: string;
        status_code?: number;
        status_name?: string;
        executor_id?: string;
        executor_name?: string;
      }>(payload.tasks ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : []));

      return {
        tasks: tasks.map((item) => ({
          task_id: String(item.uri ?? item.task_uri ?? item.id ?? ""),
          name: item.name,
          version_uri: item.version_uri,
          status_code: item.status_code,
          status_name: item.status_name,
          executor_id: item.executor_id,
          executor_name: item.executor_name
        })),
        total: readTotal(payload, response, Array.isArray(response) ? response.length : undefined)
      };
    },
    async getTask(input) {
      const query = new URLSearchParams();
      if (input.version_uri) {
        query.set("version_uri", input.version_uri);
      }

      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}${suffix}`
      );
      const item = readResultPayload(response) as {
        uri?: string;
        id?: string;
        task_uri?: string;
        name?: string;
        version_uri?: string;
        status_code?: number;
        status_name?: string;
        executor_id?: string;
        executor_name?: string;
      };

      return {
        task_id: String(item.uri ?? item.task_uri ?? item.id ?? input.task_uri),
        name: item.name,
        version_uri: item.version_uri,
        status_code: item.status_code,
        status_name: item.status_name,
        executor_id: item.executor_id,
        executor_name: item.executor_name
      };
    },
    async getTaskExecutionParam(input) {
      const query = new URLSearchParams();
      if (input.project_uuid) {
        query.set("project_uuid", input.project_uuid);
      }

      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/tasks/${encodeURIComponent(input.task_uri)}/execution-parameters${suffix}`
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;

      return {
        task_uri: input.task_uri,
        parameters: value
      };
    },
    async getTaskResultDetail(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.result) {
        query.set("result", input.result);
      }

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/results/${encodeURIComponent(input.result_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const taskResult =
        readEnvelope(payload.task_result) ??
        readEnvelope(payload.task_result_vo) ??
        readEnvelope(payload.result);
      const testResults = readArray<Record<string, unknown>>(
        payload.test_result_list ?? payload.test_results ?? payload.items ?? payload.list
      );

      return {
        result_id: input.result_uri,
        task_result: taskResult,
        test_results: testResults,
        total: readTotal(payload, response, testResults.length)
      };
    },
    async getTestReport(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}`
      );
      const payload = readResultPayload(response);
      const report = readEnvelope(payload.value) ?? payload;

      return {
        report_id: String(report.uri ?? report.report_uri ?? report.id ?? input.report_uri),
        name: typeof report.name === "string" ? report.name : undefined,
        creator: typeof report.creator === "string" ? report.creator : undefined,
        version_uri:
          typeof report.version_uri === "string" ? report.version_uri : input.version_uri,
        raw: report
      };
    },
    async listTestReportIssues(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "key_word", input.keyword);
      appendQueryValue(query, "completed", input.completed);
      if (input.query) {
        for (const [key, value] of Object.entries(input.query)) {
          appendQueryValue(query, key, value);
        }
      }

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}/issues?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const issues = readArray<Record<string, unknown>>(
        payload.value ?? payload.issues ?? payload.result ?? payload.items ?? payload.list
      );

      return {
        issues,
        total: readTotal(payload, response, issues.length)
      };
    },
    async listTestReportDefects(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "key_word", input.keyword);
      appendQueryValue(query, "resolved", input.resolved);
      if (input.query) {
        for (const [key, value] of Object.entries(input.query)) {
          appendQueryValue(query, key, value);
        }
      }

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}/defects?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const defects = readArray<Record<string, unknown>>(
        payload.result ?? payload.value ?? payload.defects ?? payload.items ?? payload.list
      );

      return {
        defects,
        total: readTotal(payload, response, defects.length)
      };
    },
    async listTestReportQualityAttributes(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}/quality-attributes`
      );
      const payload = readResultPayload(response);
      const attributes = readArray<Record<string, unknown>>(
        payload.value ?? payload.attributes ?? payload.items ?? payload.list
      );

      return {
        attributes,
        total: readTotal(payload, response, attributes.length),
        has_more: typeof payload.has_more === "boolean" ? payload.has_more : undefined
      };
    },
    async listCustomReports(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "type", input.type);

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-reports?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reports = readArray<Record<string, unknown>>(
        payload.value ?? payload.reports ?? payload.custom_reports ?? payload.items ?? payload.list
      );

      return {
        reports,
        total: readTotal(payload, response, reports.length)
      };
    },
    async getCustomTemplate(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template`
      );
      const payload = readResultPayload(response);
      const template = readEnvelope(payload.value) ?? payload;

      return {
        template_id: String(template.uri ?? template.template_uri ?? template.id ?? input.version_uri),
        name: typeof template.name === "string" ? template.name : undefined,
        raw: template
      };
    },
    async listProgressReports(input) {
      const query = new URLSearchParams({
        type: input.type,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const response = await _http.get(
        `/v5/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/progress-reports?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reports = readArray<Record<string, unknown>>(
        payload.value ?? payload.reports ?? payload.progress_reports ?? payload.items ?? payload.list
      );

      return {
        reports,
        total: readTotal(payload, response, reports.length)
      };
    },
    async getCaseTemplate(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/case-templates/${encodeURIComponent(input.template_uri)}`
      );
      const payload = readResultPayload(response);
      const template = readEnvelope(payload.value) ?? payload;

      return {
        template_id: String(template.uri ?? template.template_uri ?? template.id ?? input.template_uri),
        name: typeof template.name === "string" ? template.name : undefined,
        raw: template
      };
    },
    async listTestcaseFields(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/testcase/field/batch-query`
      );
      const payload = readResultPayload(response);
      const fields = readArray<Record<string, unknown>>(
        payload.value ?? payload.fields ?? payload.testcase_fields ?? payload.items ?? payload.list
      );

      return {
        fields,
        total: readTotal(payload, response, fields.length)
      };
    },
    async listTestTypes(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/test-types`
      );
      const payload = readResultPayload(response);
      const types = readArray<Record<string, unknown>>(
        payload.value ?? payload.types ?? payload.test_types ?? payload.items ?? payload.list
      );

      return {
        types,
        total: readTotal(payload, response, types.length)
      };
    },
    async getTestcaseV4(input) {
      const query = new URLSearchParams({
        version_uri: input.version_uri,
        project_uuid: input.project_uuid
      });

      const response = await _http.get(
        `/v4/testcases/${encodeURIComponent(input.case_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.uri ?? testcase.case_uri ?? testcase.id ?? input.case_uri),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async listTesthubServices() {
      const response = await _http.get("/v4/testhub/services");
      const payload = readResultPayload(response);
      const services = readArray<Record<string, unknown>>(
        payload.value ?? payload.services ?? payload.items ?? payload.list
      );

      return {
        services,
        total: readTotal(payload, response, services.length)
      };
    },
    async getTesthubCase(input) {
      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.case_uri)}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.uri ?? testcase.case_uri ?? testcase.testcase_id ?? testcase.id ?? input.case_uri),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getTesthubCaseByNumber(input) {
      const query = new URLSearchParams({
        testcase_number: input.testcase_number
      });
      appendQueryValue(query, "version_uri", input.version_uri);

      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/testcase?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.uri ?? testcase.case_uri ?? testcase.testcase_id ?? testcase.id ?? input.testcase_number),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async listAttachments(input) {
      const query = new URLSearchParams({
        resource_type: input.resource_type
      });

      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/resources/${encodeURIComponent(input.resource_uri)}/attachments?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const attachments = readArray<Record<string, unknown>>(
        payload.value ?? payload.attachments ?? payload.items ?? payload.list
      );

      return {
        attachments,
        total: readTotal(payload, response, attachments.length)
      };
    },
    async listProjectFieldConfigs(input) {
      const response = await _http.get(
        `/GT3KServer/v4/projects/${encodeURIComponent(input.project_id)}/field-configs`
      );
      const payload = readResultPayload(response);
      const fields = readArray<Record<string, unknown>>(
        payload.value ?? payload.fields ?? payload.field_configs ?? payload.items ?? payload.list
      );

      return {
        fields,
        total: readTotal(payload, response, fields.length)
      };
    },
    async listTesthubBranches(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);

      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/branches?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const branches = readArray<Record<string, unknown>>(
        payload.branches ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async listTesthubIterators(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "name", input.name);
      appendQueryValue(query, "current_stage", input.current_stage);
      appendQueryValue(query, "branch_uri", input.branch_uri);

      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/iterators?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.iterators ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async listIteratorIssues(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });

      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/iterators/${encodeURIComponent(input.iterator_uri)}/issues?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const issues = readArray<Record<string, unknown>>(
        payload.issues ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        issues,
        total: readTotal(payload, response, issues.length)
      };
    },
    async listIteratorHistories(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });

      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/iterators/${encodeURIComponent(input.iterator_uri)}/histories?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const histories = readArray<Record<string, unknown>>(
        payload.histories ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        histories,
        total: readTotal(payload, response, histories.length)
      };
    },
    async getTaskSuccessTestCasesCount(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/tasks/${encodeURIComponent(input.task_uri)}/testcases-count`
      );
      const payload = readResultPayload(response);
      const value = payload.value ?? payload.count ?? payload.success_count;

      return {
        task_uri: input.task_uri,
        success_count: readOptionalNumber(value),
        value
      };
    },
    async createTask(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks`,
        {
          uri: input.uri,
          name: input.name,
          description: input.description,
          version_uri: input.version_uri
        }
      );
      const item = readResultPayload(response) as {
        uri?: string;
        id?: string;
        task_uri?: string;
        name?: string;
        version_uri?: string;
        status_code?: number;
        status_name?: string;
      };

      return {
        task_id: String(item.uri ?? item.task_uri ?? item.id ?? input.uri ?? ""),
        name: item.name ?? input.name,
        version_uri: item.version_uri ?? input.version_uri,
        status_code: item.status_code,
        status_name: item.status_name
      };
    },
    async updateTask(input) {
      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}`,
        {
          uri: input.uri,
          name: input.name,
          description: input.description,
          version_uri: input.version_uri
        }
      );
      const item = readResultPayload(response) as {
        uri?: string;
        id?: string;
        task_uri?: string;
        name?: string;
        version_uri?: string;
        status_code?: number;
        status_name?: string;
      };

      return {
        task_id: String(item.uri ?? item.task_uri ?? item.id ?? input.task_uri),
        name: item.name ?? input.name,
        version_uri: item.version_uri ?? input.version_uri,
        status_code: item.status_code,
        status_name: item.status_name
      };
    },
    async batchDeleteTasks(input) {
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/batch-delete`,
        {
          version_uri: input.version_uri,
          task_uris: input.task_uris
        }
      );
      const payload = readResultPayload(response);

      return {
        deleted_count: readOptionalNumber(payload.deleted_count) ?? readOptionalNumber(payload.count),
        task_uris: input.task_uris
      };
    },
    async createTaskRelations(input) {
      const response = await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/tasks`,
        {
          uri: input.uri,
          name: input.name,
          stage: input.stage,
          number: input.number,
          tags: input.tags,
          description: input.description,
          region: input.region,
          version_uri: input.version_uri,
          owner_id: input.owner_id,
          parent_uri: input.parent_uri,
          test_case_condition: input.test_case_condition,
          service_type: input.service_type,
          module_id: input.module_id,
          module_name: input.module_name,
          release_dev: input.release_dev,
          status_code: input.status_code,
          ext_param: input.ext_param,
          execute_way: input.execute_way
        }
      );
      const item = readResultPayload(response) as {
        uri?: string;
        id?: string;
        task_uri?: string;
        name?: string;
        version_uri?: string;
        status_code?: number;
        status_name?: string;
      };

      return {
        task_id: String(item.uri ?? item.task_uri ?? item.id ?? input.uri ?? ""),
        name: item.name ?? input.name,
        version_uri: item.version_uri ?? input.version_uri,
        status_code: item.status_code,
        status_name: item.status_name
      };
    },
    async initTaskExecution(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/results/init`,
        {
          release_dev: input.release_dev,
          version_uri: input.version_uri,
          is_query: input.is_query
        }
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;
      const taskResult = readEnvelope(value.task_result_vo) ?? readEnvelope(value.task_result) ?? value;

      return {
        result_id:
          typeof taskResult.uri === "string"
            ? taskResult.uri
            : typeof value.uri === "string"
              ? value.uri
              : undefined,
        task_uri: input.task_uri,
        total: readTotal(payload, response),
        has_more: typeof payload.has_more === "boolean" ? payload.has_more : undefined
      };
    },
    async stopTaskExecution(input) {
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/results/${encodeURIComponent(input.result_uri)}`
      );
      const payload = readResultPayload(response);

      return {
        result_uri: input.result_uri,
        value: typeof payload.value === "string" ? payload.value : undefined,
        stopped: true
      };
    },
    async listTaskCases(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size,
        status: input.status,
        version_uri: input.version_uri
      };
      const response = await _http.post(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/testcases/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const cases = readArray<{
        case_uri?: string;
        uri?: string;
        id?: string;
        name?: string;
        status?: string;
        result?: string;
        executor_id?: string;
        executor_name?: string;
      }>(payload.testcases ?? payload.cases ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : []));

      return {
        cases: cases.map((item) => ({
          case_id: String(item.case_uri ?? item.uri ?? item.id ?? ""),
          name: item.name,
          status: item.status,
          result: item.result,
          executor_id: item.executor_id,
          executor_name: item.executor_name
        })),
        total: readTotal(payload, response, Array.isArray(response) ? response.length : undefined)
      };
    },
    async listTaskCasesV4(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size,
        results: input.results,
        status: input.status,
        version_uri: input.version_uri,
        owners: input.owners,
        rank_ids: input.rank_ids
      };
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/testcases/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const cases = readArray<{
        case_uri?: string;
        uri?: string;
        id?: string;
        name?: string;
        status?: string;
        result?: string;
        executor_id?: string;
        executor_name?: string;
      }>(payload.testcases ?? payload.cases ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : []));

      return {
        cases: cases.map((item) => ({
          case_id: String(item.case_uri ?? item.uri ?? item.id ?? ""),
          name: item.name,
          status: item.status,
          result: item.result,
          executor_id: item.executor_id,
          executor_name: item.executor_name
        })),
        total: readTotal(payload, response, Array.isArray(response) ? response.length : undefined)
      };
    },
    async listTaskResults(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.iterator_uri) {
        query.set("iterator_uri", input.iterator_uri);
      }

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/results?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const results = readArray<{
        uri?: string;
        id?: string;
        name?: string;
        task_uri?: string;
        version_uri?: string;
        executor_id?: string;
        executor_name?: string;
        status?: string;
        result?: string;
      }>(payload.results ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : []));

      return {
        results: results.map((item) => ({
          result_id: String(item.uri ?? item.id ?? ""),
          name: item.name,
          task_uri: item.task_uri,
          version_uri: item.version_uri,
          executor_id: item.executor_id,
          executor_name: item.executor_name,
          status: item.status ?? item.result
        })),
        total: readTotal(payload, response, Array.isArray(response) ? response.length : undefined)
      };
    },
    async runCases(input) {
      const response = (await _http.post(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/testcases/execute`,
        {
          execute_list: input.execute_list.map((item) => ({
            testcase_id: item.testcase_id ?? item.case_id ?? "",
            execute_id: item.execute_id ?? item.executor_id,
            result_id: item.result_id,
            start_time: item.start_time,
            end_time: item.end_time,
            duration: item.duration,
            description: item.description ?? item.remark
          }))
        }
      )) as {
        run_id?: string;
        accepted_count?: number;
        status?: string;
        result?: {
          run_id?: string;
          accepted_count?: number;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        run_id: item.run_id,
        accepted_count: item.accepted_count,
        status: item.status
      };
    },
    async getCase(input) {
      const response = (await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.case_id)}`
      )) as {
        case_uri?: string;
        uri?: string;
        name?: string;
        result?: string;
        status?: string;
        test_type?: string;
      };

      return {
        case_id: response.case_uri ?? response.uri ?? input.case_id,
        name: response.name ?? "",
        result: response.result,
        status: response.status,
        test_type: response.test_type
      };
    }
  };
}
