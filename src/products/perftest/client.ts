import type { ReturnTypeCreateHttpClient } from "../types.js";

export type PerfTestClient = {
  listProjects: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    projects: Array<{
      id: number;
      name?: string;
      description?: string;
      source?: number;
      CreateTime?: string;
      UpdateTime?: string;
    }>;
  }>;
  getProject: (input: { project_id: string; test_suite_id: number }) => Promise<{
    id: number;
    name?: string;
    description?: string;
    group?: string;
    source?: number;
    create_time?: string;
    update_time?: string;
  }>;
  listTasks: (input: {
    project_id: string;
    test_suite_id: number;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    tasks: Array<{
      id: number;
      name?: string;
      description?: string;
      bench_concurrent?: number;
      operate_mode?: number;
      parallel?: boolean;
      update_time?: string;
      task_run_info?: {
        id?: number;
        run_type?: number;
      };
    }>;
  }>;
  getTask: (input: { project_id: string; task_id: number }) => Promise<{
    id: number;
    name?: string;
    description?: string;
    project_id?: number;
    create_time?: string;
    update_time?: string;
    operate_mode?: number;
    parallel?: boolean;
    run_status?: number;
    bench_concurrent?: number;
    case_list?: Array<{
      case_id?: number;
      case_name?: string;
      case_uri?: string;
      temp_id?: number;
    }>;
    related_temp_running_data?: Array<{
      task_run_info_id?: number;
      related_temp_running_id?: number;
    }>;
  }>;
  listVariables: (input: {
    project_id: string;
    test_suite_id: number;
    variable_type: number;
  }) => Promise<{
    variable_list: Array<{
      id: number;
      name?: string;
      variable_type?: number;
      variable_mode?: number;
      share_mode?: number;
      is_quoted?: boolean;
      file_size?: number;
      variable?: unknown[];
    }>;
  }>;
  listOfflineReports: (input: { project_id: string; task_id: number }) => Promise<{
    log_list: Array<{
      name?: string;
      run_id?: number;
      run_type?: number;
      start_time?: string;
      end_time?: string;
      continue_time?: number;
      temp_names?: Array<{ name?: string }>;
      parallel?: boolean;
    }>;
  }>;
  getReport: (input: {
    project_id: string;
    task_run_id: number;
    case_run_id: number;
    brokens_limit_count: number;
  }) => Promise<{
    detail?: {
      performance?: {
        caseUri?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
        maxConcurrentUsers?: number;
        totalCount?: number;
      };
      customTransactions?: Array<{
        awId?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
      }>;
      detailDatas?: Array<{
        awId?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
      }>;
    };
    err_message?: string;
  }>;
};

export function createPerfTestClient(_http: ReturnTypeCreateHttpClient): PerfTestClient {
  return {
    async listProjects(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/test-suites?${query.toString()}`
      )) as {
        projects?: Array<{
          id?: number;
          name?: string;
          description?: string;
          source?: number;
          CreateTime?: string;
          UpdateTime?: string;
        }>;
      };

      const projects = response.projects ?? [];

      return {
        total: projects.length,
        projects: projects.map((item) => ({
          id: item.id ?? 0,
          name: item.name,
          description: item.description,
          source: item.source,
          CreateTime: item.CreateTime,
          UpdateTime: item.UpdateTime
        }))
      };
    },
    async getProject(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/test-suites/${input.test_suite_id}`
      )) as {
        project?: {
          id?: number;
          name?: string;
          description?: string;
          group?: string;
          source?: number;
          create_time?: string;
          update_time?: string;
        };
      };

      const item = response.project ?? {};

      return {
        id: item.id ?? input.test_suite_id,
        name: item.name,
        description: item.description,
        group: item.group,
        source: item.source,
        create_time: item.create_time,
        update_time: item.update_time
      };
    },
    async listTasks(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/all-tasks/${input.test_suite_id}?${query.toString()}`
      )) as {
        tasks?: Array<{
          id?: number;
          name?: string;
          description?: string;
          bench_concurrent?: number;
          operate_mode?: number;
          parallel?: boolean;
          update_time?: string;
          task_run_info?: {
            id?: number;
            run_type?: number;
          };
        }>;
      };

      const tasks = response.tasks ?? [];

      return {
        total: tasks.length,
        tasks: tasks.map((item) => ({
          id: item.id ?? 0,
          name: item.name,
          description: item.description,
          bench_concurrent: item.bench_concurrent,
          operate_mode: item.operate_mode,
          parallel: item.parallel,
          update_time: item.update_time,
          task_run_info: item.task_run_info
        }))
      };
    },
    async getTask(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/tasks/${input.task_id}`
      )) as {
        taskInfo?: {
          id?: number;
          name?: string;
          description?: string;
          project_id?: number;
          create_time?: string;
          update_time?: string;
          operate_mode?: number;
          parallel?: boolean;
          run_status?: number;
          bench_concurrent?: number;
          case_list?: Array<{
            case_id?: number;
            case_name?: string;
            case_uri?: string;
            temp_id?: number;
          }>;
          related_temp_running_data?: Array<{
            task_run_info_id?: number;
            related_temp_running_id?: number;
          }>;
        };
      };

      const item = response.taskInfo ?? {};

      return {
        id: item.id ?? input.task_id,
        name: item.name,
        description: item.description,
        project_id: item.project_id,
        create_time: item.create_time,
        update_time: item.update_time,
        operate_mode: item.operate_mode,
        parallel: item.parallel,
        run_status: item.run_status,
        bench_concurrent: item.bench_concurrent,
        case_list: item.case_list ?? [],
        related_temp_running_data: item.related_temp_running_data ?? []
      };
    },
    async listVariables(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/variables/${input.variable_type}/test-suites/${input.test_suite_id}`
      )) as {
        variable_list?: Array<{
          id?: number;
          name?: string;
          variable_type?: number;
          variable_mode?: number;
          share_mode?: number;
          is_quoted?: boolean;
          file_size?: number;
          variable?: unknown[];
        }>;
      };

      return {
        variable_list: (response.variable_list ?? []).map((item) => ({
          id: item.id ?? 0,
          name: item.name,
          variable_type: item.variable_type,
          variable_mode: item.variable_mode,
          share_mode: item.share_mode,
          is_quoted: item.is_quoted,
          file_size: item.file_size,
          variable: item.variable ?? []
        }))
      };
    },
    async listOfflineReports(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/tasks/history-run-list/${input.task_id}`
      )) as {
        log_list?: Array<{
          name?: string;
          run_id?: number;
          run_type?: number;
          start_time?: string;
          end_time?: string;
          continue_time?: number;
          temp_names?: Array<{ name?: string }>;
          parallel?: boolean;
        }>;
      };

      return {
        log_list: response.log_list ?? []
      };
    },
    async getReport(input) {
      const query = new URLSearchParams({
        brokens_limit_count: String(input.brokens_limit_count)
      });

      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/task-run-infos/${input.task_run_id}/case-run-infos/${input.case_run_id}/reports?${query.toString()}`
      )) as {
        result?: {
          detail?: {
            performance?: {
              caseUri?: string;
              alias?: string;
              avgTps?: number;
              averageRespTime?: number;
              successRate?: number;
              maxConcurrentUsers?: number;
              totalCount?: number;
            };
            customTransactions?: Array<{
              awId?: string;
              alias?: string;
              avgTps?: number;
              averageRespTime?: number;
              successRate?: number;
            }>;
            detailDatas?: Array<{
              awId?: string;
              alias?: string;
              avgTps?: number;
              averageRespTime?: number;
              successRate?: number;
            }>;
          };
          err_message?: string;
        };
      };

      return {
        detail: response.result?.detail,
        err_message: response.result?.err_message
      };
    }
  };
}
