import type { ReturnTypeCreateHttpClient } from "../types.js";

export type BuildClient = {
  getRecordFlowGraph: (input: { record_id: string }) => Promise<{
    record_id: string;
    nodes: Array<{
      id?: string;
      name?: string;
      status?: string;
      type?: string;
    }>;
    edges: Array<{
      source?: string;
      target?: string;
    }>;
  }>;
  getProjectRecordStatistics: (input: {
    project_id: string;
    build_project_id?: string;
  }) => Promise<{
    total?: number;
    success?: number;
    failed?: number;
    aborted?: number;
    running?: number;
  }>;
  listProjectRecords: (input: {
    project_id: string;
    build_project_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      record_id: string;
      job_id?: string;
      job_name?: string;
      status?: string;
      trigger_type?: string;
      branch?: string;
      commit_id?: string;
      executor?: string;
      start_time?: number;
    }>;
    total?: number;
  }>;
  getRecordScript: (input: { record_id: string }) => Promise<{
    record_id: string;
    script?: string;
    status?: string;
  }>;
  getFullStages: (input: { record_id: string; cascade: boolean }) => Promise<{
    record_id: string;
    build_stages: Record<
      string,
      {
        id?: string;
        status?: string;
        display_name?: string;
        execution_id?: string;
        sequence?: number;
        duration?: number;
      }
    >;
  }>;
  getErrorLog: (input: {
    job_id: string;
    build_no: number;
    page: number;
    page_size: number;
  }) => Promise<{
    job_name?: string;
    error_nodes: Array<{
      node_id?: string;
      step?: string;
      analyzed_success?: boolean;
      error_info?: {
        error_code?: string;
        error_message?: string;
        faq?: string | null;
      };
    }>;
  }>;
  getInfoRecord: (input: {
    job_id: string;
    build_no: number;
  }) => Promise<{
    number?: number;
    build_time?: number;
    start_time?: number;
    job_running_status?: string;
    state?: string;
    user_id?: string;
    executor?: string;
    daily_build_number?: string;
    trigger_type?: string;
    cost_time?: number;
    scm_type?: string;
    commit_detail_url?: string;
  }>;
  getHistoryDetails: (input: {
    job_id: string;
    build_number: number;
  }) => Promise<{
    job_id: string;
    build_number: number;
    job_name?: string;
    project_id?: string;
    project_name?: string;
    parameters?: Record<string, unknown>;
    build_steps?: Array<{ name?: string; status?: string; build_time?: number }>;
  }>;
  listBuildParameters: (input: {
    job_id: string;
    build_no: number;
  }) => Promise<{
    job_id: string;
    build_no: number;
    parameters: Array<{ name: string; value?: string }>;
  }>;
  getRealTimeLog: (input: {
    job_id: string;
    build_no: number;
    offset: number;
  }) => Promise<{
    job_id: string;
    build_no: number;
    content?: string;
    has_more_data?: boolean;
    offset?: number;
    current_offset?: number;
  }>;
  listJobs: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    jobs: Array<{
      job_id: string;
      name: string;
      project_id?: string;
      build_project_id?: string;
      is_running?: boolean;
      description?: string;
    }>;
    total?: number;
  }>;
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    project_id?: string;
    description?: string;
  }>;
  listRecords: (input: {
    job_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      record_id: string;
      job_id?: string;
      status?: string;
      trigger_type?: string;
    }>;
    total?: number;
  }>;
  runJob: (input: {
    job_id: string;
    branch?: string;
  }) => Promise<{
    job_id: string;
    record_id?: string;
    status?: string;
  }>;
  getRecord: (input: { record_id: string }) => Promise<{
    record_id: string;
    job_id?: string;
    status?: string;
    trigger_type?: string;
    commit_id?: string;
  }>;
  stopJob: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    result?: boolean;
  }>;
};

export function createBuildClient(_http: ReturnTypeCreateHttpClient): BuildClient {
  return {
    async getRecordFlowGraph(input) {
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/flow-graph`
      )) as {
        nodes?: Array<{ id?: string; name?: string; status?: string; type?: string }>;
        edges?: Array<{ source?: string; target?: string }>;
        result?: {
          nodes?: Array<{ id?: string; name?: string; status?: string; type?: string }>;
          edges?: Array<{ source?: string; target?: string }>;
        };
      };
      const item = response.result ?? response;

      return {
        record_id: input.record_id,
        nodes: item.nodes ?? [],
        edges: item.edges ?? []
      };
    },
    async getProjectRecordStatistics(input) {
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.build_project_id ?? input.project_id)}/statistics`
      )) as {
        total?: number;
        success?: number;
        failed?: number;
        aborted?: number;
        running?: number;
        success_count?: number;
        failed_count?: number;
        aborted_count?: number;
        running_count?: number;
        result?: {
          total?: number;
          success?: number;
          failed?: number;
          aborted?: number;
          running?: number;
          success_count?: number;
          failed_count?: number;
          aborted_count?: number;
          running_count?: number;
        };
      };
      const item = response.result ?? response;

      return {
        total: item.total,
        success: item.success ?? item.success_count,
        failed: item.failed ?? item.failed_count,
        aborted: item.aborted ?? item.aborted_count,
        running: item.running ?? item.running_count
      };
    },
    async listProjectRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.build_project_id ?? input.project_id)}/records?${query.toString()}`
      )) as {
        records?: Array<{
          record_id?: string;
          id?: string;
          job_id?: string;
          job_name?: string;
          status?: string;
          trigger_type?: string;
          branch?: string;
          commit_id?: string;
          executor?: string;
          start_time?: number;
        }>;
        total?: number;
        total_count?: number;
        result?: {
          records?: Array<{
            record_id?: string;
            id?: string;
            job_id?: string;
            job_name?: string;
            status?: string;
            trigger_type?: string;
            branch?: string;
            commit_id?: string;
            executor?: string;
            start_time?: number;
          }>;
          total?: number;
          total_count?: number;
        };
      };
      const item = response.result ?? response;
      const records = item.records ?? [];

      return {
        records: records.map((record) => ({
          record_id: record.record_id ?? record.id ?? "",
          job_id: record.job_id,
          job_name: record.job_name,
          status: record.status,
          trigger_type: record.trigger_type,
          branch: record.branch,
          commit_id: record.commit_id,
          executor: record.executor,
          start_time: record.start_time
        })),
        total: item.total ?? item.total_count
      };
    },
    async getRecordScript(input) {
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/build-script`
      )) as {
        result?: {
          script?: string;
          status?: string;
        };
      };

      return {
        record_id: input.record_id,
        script: response.result?.script,
        status: response.result?.status
      };
    },
    async getFullStages(input) {
      const query = new URLSearchParams({
        cascade: String(input.cascade)
      });
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/full-stages?${query.toString()}`
      )) as {
        result?: {
          build_stages?: Record<
            string,
            {
              id?: string;
              status?: string;
              display_name?: string;
              execution_id?: string;
              sequence?: number;
              duration?: number;
            }
          >;
        };
      };

      return {
        record_id: input.record_id,
        build_stages: response.result?.build_stages ?? {}
      };
    },
    async getErrorLog(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/log/${encodeURIComponent(input.job_id)}/${input.build_no}/analysis?${query.toString()}`
      )) as {
        result?: {
          job_name?: string;
          error_nodes?: Array<{
            node_id?: string | number;
            step?: string;
            analyzed_success?: boolean;
            error_info?: {
              error_code?: string;
              error_message?: string;
              faq?: string | null;
            };
          }>;
        };
      };

      return {
        job_name: response.result?.job_name,
        error_nodes: (response.result?.error_nodes ?? []).map((item) => ({
          node_id: item.node_id === undefined ? undefined : String(item.node_id),
          step: item.step,
          analyzed_success: item.analyzed_success,
          error_info: item.error_info
        }))
      };
    },
    async getInfoRecord(input) {
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.job_id)}/${input.build_no}/build-info-record`
      )) as {
        result?: {
          number?: number;
          build_time?: number;
          start_time?: number;
          job_running_status?: string;
          state?: string;
          user_id?: string;
          executor?: string;
          daily_build_number?: string;
          trigger_type?: string;
          cost_time?: number;
          scm_type?: string;
          commit_detail_url?: string;
        };
      };

      return response.result ?? {};
    },
    async getHistoryDetails(input) {
      const response = (await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/${input.build_number}/history-details`
      )) as {
        job_id?: string;
        build_number?: number;
        job_name?: string;
        project_id?: string;
        project_name?: string;
        parameters?: Record<string, unknown>;
        build_steps?: Array<{ name?: string; status?: string; build_time?: number }>;
        result?: {
          job_id?: string;
          build_number?: number;
          job_name?: string;
          project_id?: string;
          project_name?: string;
          parameters?: Record<string, unknown>;
          build_steps?: Array<{ name?: string; status?: string; build_time?: number }>;
        };
      };

      const item = response.result ?? response;

      return {
        job_id: item.job_id ?? input.job_id,
        build_number: item.build_number ?? input.build_number,
        job_name: item.job_name,
        project_id: item.project_id,
        project_name: item.project_name,
        parameters: item.parameters,
        build_steps: item.build_steps
      };
    },
    async listBuildParameters(input) {
      const response = (await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/${input.build_no}/parameters`
      )) as {
        job_id?: string;
        build_no?: number;
        parameters?: Array<{ name?: string; value?: string }>;
        result?: {
          job_id?: string;
          build_no?: number;
          parameters?: Array<{ name?: string; value?: string }>;
        };
      };

      const item = response.result ?? response;

      return {
        job_id: item.job_id ?? input.job_id,
        build_no: item.build_no ?? input.build_no,
        parameters: (item.parameters ?? []).map((parameter) => ({
          name: parameter.name ?? "",
          value: parameter.value
        }))
      };
    },
    async getRealTimeLog(input) {
      const query = new URLSearchParams({
        offset: String(input.offset)
      });
      const response = (await _http.get(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/${input.build_no}/real-time-log?${query.toString()}`
      )) as {
        result?: {
          has_more_data?: boolean;
          offset?: number;
          content?: string;
          current_offset?: number;
        };
        status?: string;
      };

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        content: response.result?.content,
        has_more_data: response.result?.has_more_data,
        offset: response.result?.offset,
        current_offset: response.result?.current_offset
      };
    },
    async listJobs(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size),
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v1/job/${encodeURIComponent(input.project_id)}/list?${query.toString()}`
      )) as {
        jobs?: Array<{
          id?: string;
          job_id?: string;
          name?: string;
          project_id?: string;
          build_project_id?: string;
          is_running?: boolean;
          description?: string;
        }>;
        result?: {
          jobs?: Array<{
            id?: string;
            job_id?: string;
            name?: string;
            project_id?: string;
            build_project_id?: string;
            is_running?: boolean;
            description?: string;
          }>;
          job_list?: Array<{
            id?: string;
            job_id?: string;
            name?: string;
            project_id?: string;
            build_project_id?: string;
            is_running?: boolean;
            description?: string;
          }>;
          total?: number;
          total_count?: number;
        };
        total?: number;
        total_count?: number;
      };

      const jobs = response.jobs ?? response.result?.jobs ?? response.result?.job_list ?? [];

      return {
        jobs: jobs.map((item) => ({
          job_id: item.job_id ?? item.id ?? "",
          name: item.name ?? "",
          project_id: item.project_id,
          build_project_id: item.build_project_id,
          is_running: item.is_running,
          description: item.description
        })),
        total: response.total ?? response.total_count ?? response.result?.total ?? response.result?.total_count
      };
    },
    async getJob(input) {
      const response = (await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/info`
      )) as {
        id?: string;
        job_id?: string;
        name?: string;
        project_id?: string;
        description?: string;
        result?: {
          id?: string;
          job_id?: string;
          name?: string;
          project_id?: string;
          description?: string;
        };
      };

      const item = response.result ?? response;

      return {
        job_id: item.job_id ?? item.id ?? input.job_id,
        name: item.name ?? "",
        project_id: item.project_id,
        description: item.description
      };
    },
    async listRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post("/v1/record/brief", {
        job_id: input.job_id,
        page_index: input.page,
        page_size: input.page_size,
        offset,
        limit: input.page_size
      })) as {
        records?: Array<{
          record_id?: string;
          id?: string;
          job_id?: string;
          status?: string;
          trigger_type?: string;
        }>;
        result?: {
          records?: Array<{
            record_id?: string;
            id?: string;
            job_id?: string;
            status?: string;
            trigger_type?: string;
          }>;
        };
        total?: number;
        total_count?: number;
      };

      const records = response.records ?? response.result?.records ?? [];

      return {
        records: records.map((item) => ({
          record_id: item.record_id ?? item.id ?? "",
          job_id: item.job_id,
          status: item.status,
          trigger_type: item.trigger_type
        })),
        total: response.total ?? response.total_count
      };
    },
    async runJob(input) {
      const response = (await _http.post("/v1/job/execute", {
        job_id: input.job_id,
        branch: input.branch
      })) as {
        job_id?: string;
        record_id?: string;
        status?: string;
        result?: {
          job_id?: string;
          record_id?: string;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        job_id: item.job_id ?? input.job_id,
        record_id: item.record_id,
        status: item.status
      };
    },
    async getRecord(input) {
      const response = (await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/info`
      )) as {
        record_id?: string;
        id?: string;
        job_id?: string;
        status?: string;
        trigger_type?: string;
        commit_id?: string;
        result?: {
          record_id?: string;
          id?: string;
          job_id?: string;
          status?: string;
          trigger_type?: string;
          commit_id?: string;
        };
      };
      const item = response.result ?? response;

      return {
        record_id: item.record_id ?? item.id ?? input.record_id,
        job_id: item.job_id,
        status: item.status,
        trigger_type: item.trigger_type,
        commit_id: item.commit_id
      };
    },
    async stopJob(input) {
      const response = (await _http.post("/v3/jobs/stop", {
        job_id: input.job_id,
        build_no: String(input.build_no)
      })) as {
        result?: boolean;
      };

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        result: response.result
      };
    }
  };
}
