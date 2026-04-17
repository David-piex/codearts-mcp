import type { ReturnTypeCreateHttpClient } from "../types.js";
import { AppError } from "../../core/errors/app-error.js";

export type DeployClient = {
  getExecutionParams: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    params: Array<{ name?: string; type?: string; value?: string }>;
  }>;
  getAppLog: (input: {
    application_id: string;
    record_id: string;
    step_id?: string;
    offset: string;
    end_offset: string;
  }) => Promise<{
    application_id: string;
    record_id: string;
    status?: string;
    has_more?: boolean;
    text?: string;
    offset?: string;
    end_offset?: string;
  }>;
  rollbackApp: (input: {
    task_id: string;
    record_id: string;
  }) => Promise<{
    task_id: string;
    record_id: string;
    status?: string;
  }>;
  getHistoryDetail: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    state?: string;
    percentage?: number;
    operator_name?: string;
    start_time?: string;
    end_time?: string;
    step_states?: Array<{ step_name?: string; status?: string }>;
  }>;
  stopApp: (input: {
    task_id: string;
    record_id: string;
  }) => Promise<{
    task_id: string;
    record_id: string;
    status?: string;
  }>;
  listApps: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    applications: Array<{
      application_id: string;
      name: string;
      project_id?: string;
      deploy_type?: string;
      description?: string;
      arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
    }>;
    total?: number;
  }>;
  listTasks: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      application_id?: string;
      application_name?: string;
      project_id?: string;
      status?: string;
      deploy_type?: string;
    }>;
    total?: number;
  }>;
  getApp: (input: { application_id: string }) => Promise<{
    application_id: string;
    name: string;
    project_id?: string;
    deploy_type?: string;
    description?: string;
    arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
  }>;
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    application_id?: string;
    name: string;
    project_id?: string;
    status?: string;
    deploy_type?: string;
    description?: string;
  }>;
  listAppOperationsLog: (input: {
    app_id: string;
    page_size: number;
    page_index: number;
    start_date?: string;
    end_date?: string;
  }) => Promise<{
    logs: Array<{
      operator?: string;
      operator_id?: string;
      operation_type?: string;
      data_type?: string;
      operation_time?: string;
    }>;
    total?: number;
  }>;
  startApp: (input: {
    task_id: string;
  }) => Promise<{
    task_id: string;
    job_id?: string;
    status?: string;
  }>;
  listHistories: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
    start_date?: string;
    end_date?: string;
  }) => Promise<{
    histories: Array<{
      id: string;
      task_id?: string;
      operator_name?: string;
      status?: string;
    }>;
    total?: number;
  }>;
  getStatus: (input: { task_id: string; record_id?: string }) => Promise<{
    task_id: string;
    state?: string;
    percentage?: number;
    elapsed_time?: number;
    step_states?: Array<{ name?: string; status?: string }>;
  }>;
};

function asArray<T>(input: unknown): T[] {
  if (Array.isArray(input)) {
    return input as T[];
  }

  return [];
}

export function createDeployClient(_http: ReturnTypeCreateHttpClient): DeployClient {
  return {
    async getExecutionParams(input) {
      let params: Array<{ name?: string; type?: string; value?: string }>;

      try {
        const query = new URLSearchParams({
          record_id: input.record_id
        });
        const response = (await _http.get(
          `/v2/history/tasks/${encodeURIComponent(input.task_id)}/params?${query.toString()}`
        )) as
          | Array<{ name?: string; type?: string; value?: string }>
          | {
              params?: Array<{ name?: string; type?: string; value?: string }>;
              result?: Array<{ name?: string; type?: string; value?: string }>;
            };

        params = Array.isArray(response) ? response : response.params ?? response.result ?? [];
      } catch (error) {
        if (!(error instanceof AppError) || error.code !== "APIGW.0101") {
          throw error;
        }

        const response = (await _http.get(
          `/v1/tasks/${encodeURIComponent(input.task_id)}/records/${encodeURIComponent(input.record_id)}/execution-params`
        )) as
          | Array<{ name?: string; type?: string; value?: string }>
          | {
              params?: Array<{ name?: string; type?: string; value?: string }>;
              result?: Array<{ name?: string; type?: string; value?: string }>;
            };

        params = Array.isArray(response) ? response : response.params ?? response.result ?? [];
      }

      return {
        task_id: input.task_id,
        record_id: input.record_id,
        params
      };
    },
    async getAppLog(input) {
      const query = new URLSearchParams({
        offset: input.offset,
        end_offset: input.end_offset
      });
      if (input.step_id) {
        query.set("step_id", input.step_id);
      }
      const response = (await _http.get(
        `/v1/applications/${encodeURIComponent(input.application_id)}/records/${encodeURIComponent(input.record_id)}/logs?${query.toString()}`
      )) as {
        status?: string;
        has_more?: boolean;
        text?: string;
        offset?: string;
        end_offset?: string;
        result?: {
          status?: string;
          has_more?: boolean;
          text?: string;
          offset?: string;
          end_offset?: string;
        };
      };

      const item = response.result ?? response;

      return {
        application_id: input.application_id,
        record_id: input.record_id,
        status: item.status ?? response.status,
        has_more: item.has_more,
        text: item.text,
        offset: item.offset ?? input.offset,
        end_offset: item.end_offset ?? input.end_offset
      };
    },
    async rollbackApp(input) {
      const response = (await _http.put(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/records/${encodeURIComponent(input.record_id)}/rollback`
      )) as {
        task_id?: string;
        record_id?: string;
        status?: string;
        result?: {
          task_id?: string;
          record_id?: string;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? input.record_id,
        status: item.status
      };
    },
    async getHistoryDetail(input) {
      const query = new URLSearchParams({
        record_id: input.record_id,
        step_state: "true"
      });
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/state?${query.toString()}`
      )) as {
        task_id?: string;
        record_id?: string;
        state?: string;
        percentage?: number;
        operator_name?: string;
        start_time?: string;
        end_time?: string;
        step_states?: Array<{ step_name?: string; status?: string }>;
        result?: {
          task_id?: string;
          record_id?: string;
          state?: string;
          percentage?: number;
          operator_name?: string;
          start_time?: string;
          end_time?: string;
          step_states?: Array<{ step_name?: string; status?: string }>;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? input.record_id,
        state: item.state,
        percentage: item.percentage,
        operator_name: item.operator_name,
        start_time: item.start_time,
        end_time: item.end_time,
        step_states: item.step_states
      };
    },
    async stopApp(input) {
      const response = (await _http.put(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/records/${encodeURIComponent(input.record_id)}/stop`
      )) as {
        task_id?: string;
        record_id?: string;
        status?: string;
        result?: {
          task_id?: string;
          record_id?: string;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? input.record_id,
        status: item.status
      };
    },
    async listApps(input) {
      const response = (await _http.post("/v1/applications/list", {
        project_id: input.project_id,
        page: input.page,
        size: input.page_size,
        name: input.keyword
      })) as {
        applications?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
        total_num?: number;
      };

      const rawItems = asArray<{
        application_id?: string;
        id?: string;
        application_name?: string;
        name?: string;
        project_id?: string;
        deploy_type?: string;
        description?: string;
        arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
      }>(response.applications ?? response.result);

      return {
        applications: rawItems.map((item) => ({
          application_id: item.application_id ?? item.id ?? "",
          name: item.name ?? item.application_name ?? "",
          project_id: item.project_id,
          deploy_type: item.deploy_type,
          description: item.description,
          arrange_infos: item.arrange_infos
        })),
        total: response.total ?? response.total_count ?? response.total_num
      };
    },
    async listTasks(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        size: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/list?${query.toString()}`
      )) as {
        tasks?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
        total_num?: number;
      };

      const rawItems = asArray<{
        task_id?: string;
        id?: string;
        application_id?: string;
        application_name?: string;
        project_id?: string;
        status?: string;
        deploy_type?: string;
      }>(response.tasks ?? response.result);

      return {
        tasks: rawItems.map((item) => ({
          task_id: item.task_id ?? item.id ?? "",
          application_id: item.application_id,
          application_name: item.application_name,
          project_id: item.project_id ?? input.project_id,
          status: item.status,
          deploy_type: item.deploy_type
        })),
        total: response.total ?? response.total_count ?? response.total_num
      };
    },
    async getApp(input) {
      const response = (await _http.get(
        `/v1/applications/${encodeURIComponent(input.application_id)}/info`
      )) as {
        application_id?: string;
        id?: string;
        application_name?: string;
        name?: string;
        project_id?: string;
        deploy_type?: string;
        description?: string;
        arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
        result?: {
          application_id?: string;
          id?: string;
          application_name?: string;
          name?: string;
          project_id?: string;
          deploy_type?: string;
          description?: string;
          arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
        };
      };

      const item = response.result ?? response;

      return {
        application_id: item.application_id ?? item.id ?? input.application_id,
        name: item.name ?? item.application_name ?? "",
        project_id: item.project_id,
        deploy_type: item.deploy_type,
        description: item.description,
        arrange_infos: item.arrange_infos
      };
    },
    async getTask(input) {
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}`
      )) as {
        task_id?: string;
        id?: string;
        application_id?: string;
        application_name?: string;
        name?: string;
        project_id?: string;
        status?: string;
        deploy_type?: string;
        description?: string;
        result?: {
          task_id?: string;
          id?: string;
          application_id?: string;
          application_name?: string;
          name?: string;
          project_id?: string;
          status?: string;
          deploy_type?: string;
          description?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? item.id ?? input.task_id,
        application_id: item.application_id,
        name: item.name ?? item.application_name ?? "",
        project_id: item.project_id,
        status: item.status,
        deploy_type: item.deploy_type,
        description: item.description
      };
    },
    async listAppOperationsLog(input) {
      const response = (await _http.post(
        `/v1/applications/${encodeURIComponent(input.app_id)}/operations/log`,
        {
          operation_type: undefined,
          data_type: undefined,
          operator_id: undefined,
          start_time: input.start_date,
          end_time: input.end_date,
          sort_type: undefined,
          sort_by: undefined,
          page_size: input.page_size,
          page_index: input.page_index
        }
      )) as {
        logs?: unknown;
        result?: unknown;
        total?: number;
        total_num?: number;
      };

      const rawItems = asArray<{
        operator?: string;
        operator_id?: string;
        operation_type?: string;
        data_type?: string;
        operation_time?: string;
      }>(response.logs ?? response.result);

      return {
        logs: rawItems.map((item) => ({
          operator: item.operator,
          operator_id: item.operator_id,
          operation_type: item.operation_type,
          data_type: item.data_type,
          operation_time: item.operation_time
        })),
        total: response.total ?? response.total_num
      };
    },
    async startApp(input) {
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/start`
      )) as {
        task_id?: string;
        job_id?: string;
        status?: string;
        result?: {
          task_id?: string;
          job_id?: string;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        job_id: item.job_id,
        status: item.status
      };
    },
    async listHistories(input) {
      if (!input.start_date || !input.end_date) {
        throw new AppError(
          "validation_error",
          "Deploy history queries require both start_date and end_date."
        );
      }

      const query = new URLSearchParams({
        page: String(input.page),
        size: String(input.page_size),
        start_date: input.start_date,
        end_date: input.end_date
      });

      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/task/${encodeURIComponent(input.task_id)}/history?${query.toString()}`
      )) as {
        histories?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
        total_num?: number;
      };

      const rawItems = asArray<{
        id?: string | number;
        history_id?: string | number;
        task_id?: string;
        operator_name?: string;
        operator?: string;
        status?: string;
      }>(response.histories ?? response.result);

      return {
        histories: rawItems.map((item) => ({
          id: String(item.id ?? item.history_id ?? ""),
          task_id: item.task_id ?? input.task_id,
          operator_name: item.operator_name ?? item.operator,
          status: item.status
        })),
        total: response.total ?? response.total_count ?? response.total_num
      };
    },
    async getStatus(input) {
      const query = new URLSearchParams();
      if (input.record_id) {
        query.set("record_id", input.record_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/state${suffix}`
      )) as {
        task_id?: string;
        state?: string;
        percentage?: number;
        status?: string;
        elapsed_time?: number;
        step_state?: Array<{ name?: string; status?: string }>;
        result?: {
          task_id?: string;
          state?: string;
          percentage?: number;
          status?: string;
          elapsed_time?: number;
          step_state?: Array<{ name?: string; status?: string }>;
        };
      };
      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        state: item.state ?? item.status,
        percentage: item.percentage,
        elapsed_time: item.elapsed_time,
        step_states: item.step_state
      };
    }
  };
}
