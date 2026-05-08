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
