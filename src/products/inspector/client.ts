import type { ReturnTypeCreateHttpClient } from "../types.js";

export type InspectorClient = {
  createDomain: (input: {
    project_id: string;
    domain_name: string;
    alias?: string;
  }) => Promise<{
    domain_id: string;
    domain_name?: string;
    alias?: string;
    auth_status?: string;
    create_time?: string;
  }>;
  listDomains: (input: {
    project_id: string;
    page: number;
    page_size: number;
    domain_id?: string;
    auth_status?: "unauth" | "auth" | "invalid" | "manual" | "skip";
  }) => Promise<{
    total?: number;
    domains: Array<{
      domain_id: string;
      domain_name?: string;
      alias?: string;
      auth_status?: string;
      create_time?: string;
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    }>;
  }>;
  getTask: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    task_name?: string;
    url?: string;
    task_type?: string;
    domain_name?: string;
    create_time?: string;
    start_time?: string;
    end_time?: string;
    task_status?: string;
    schedule_status?: string;
    progress?: number;
    reason?: string;
    pack_num?: number;
    score?: number;
    safe_level?: string;
    statistics?: {
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    };
  }>;
  listTaskHistories: (input: {
    project_id: string;
    domain_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      task_id: string;
      task_name?: string;
      url?: string;
      task_type?: string;
      domain_name?: string;
      create_time?: string;
      start_time?: string;
      end_time?: string;
      task_status?: string;
      progress?: number;
      score?: number;
      safe_level?: string;
    }>;
  }>;
  listResults: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    statistics?: {
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    };
    data: Array<{
      vuln_id: string;
      domain_id?: string;
      url?: string;
      severity?: string;
      vuln_status?: string;
      vuln_class?: string;
      vuln_type?: string;
      description?: string;
      advice?: string;
      find_time?: string;
    }>;
  }>;
  listPorts: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      port?: number;
      service?: string;
      protocol?: string;
      status?: string;
    }>;
  }>;
  listBusinessRisks: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    data: Array<{
      risk_id: string;
      risk_url?: string;
      risk_type?: string;
      risk_content?: string;
      risk_status?: string;
      find_time?: string;
    }>;
  }>;
  getReportStatus: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    report_status?: string;
  }>;
};

export function createInspectorClient(_http: ReturnTypeCreateHttpClient): InspectorClient {
  return {
    async createDomain(input) {
      const response = (await _http.post(`/v3/${encodeURIComponent(input.project_id)}/webscan/domains`, {
        domain_name: input.domain_name,
        alias: input.alias
      })) as {
        domain_id?: string;
        domain_name?: string;
        alias?: string;
        auth_status?: string;
        create_time?: string;
      };

      return {
        domain_id: response.domain_id ?? "",
        domain_name: response.domain_name ?? input.domain_name,
        alias: response.alias ?? input.alias,
        auth_status: response.auth_status,
        create_time: response.create_time
      };
    },
    async listDomains(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.domain_id) {
        query.set("domain_id", input.domain_id);
      }

      if (input.auth_status) {
        query.set("auth_status", input.auth_status);
      }

      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/domains?${query.toString()}`
      )) as {
        total?: number;
        domains?: Array<{
          domain_id?: string;
          domain_name?: string;
          alias?: string;
          auth_status?: string;
          create_time?: string;
          high?: number;
          middle?: number;
          low?: number;
          hint?: number;
        }>;
      };

      return {
        total: response.total,
        domains: (response.domains ?? []).map((item) => ({
          domain_id: item.domain_id ?? "",
          domain_name: item.domain_name,
          alias: item.alias,
          auth_status: item.auth_status,
          create_time: item.create_time,
          high: item.high,
          middle: item.middle,
          low: item.low,
          hint: item.hint
        }))
      };
    },
    async getTask(input) {
      const query = new URLSearchParams({ task_id: input.task_id });
      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/tasks?${query.toString()}`
      )) as {
        task_id?: string;
        task_name?: string;
        url?: string;
        task_type?: string;
        domain_name?: string;
        create_time?: string;
        start_time?: string;
        end_time?: string;
        task_status?: string;
        schedule_status?: string;
        progress?: number;
        reason?: string;
        pack_num?: number;
        score?: number;
        safe_level?: string;
        statistics?: {
          high?: number;
          middle?: number;
          low?: number;
          hint?: number;
        };
      };

      return {
        task_id: response.task_id ?? input.task_id,
        task_name: response.task_name,
        url: response.url,
        task_type: response.task_type,
        domain_name: response.domain_name,
        create_time: response.create_time,
        start_time: response.start_time,
        end_time: response.end_time,
        task_status: response.task_status,
        schedule_status: response.schedule_status,
        progress: response.progress,
        reason: response.reason,
        pack_num: response.pack_num,
        score: response.score,
        safe_level: response.safe_level,
        statistics: response.statistics
      };
    },
    async listTaskHistories(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        domain_id: input.domain_id,
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/tasks/histories?${query.toString()}`
      )) as {
        total?: number;
        data?: Array<{
          task_id?: string;
          task_name?: string;
          url?: string;
          task_type?: string;
          domain_name?: string;
          create_time?: string;
          start_time?: string;
          end_time?: string;
          task_status?: string;
          progress?: number;
          score?: number;
          safe_level?: string;
        }>;
      };

      return {
        total: response.total,
        data: (response.data ?? []).map((item) => ({
          task_id: item.task_id ?? "",
          task_name: item.task_name,
          url: item.url,
          task_type: item.task_type,
          domain_name: item.domain_name,
          create_time: item.create_time,
          start_time: item.start_time,
          end_time: item.end_time,
          task_status: item.task_status,
          progress: item.progress,
          score: item.score,
          safe_level: item.safe_level
        }))
      };
    },
    async listResults(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        task_id: input.task_id,
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/results?${query.toString()}`
      )) as {
        total?: number;
        statistics?: {
          high?: number;
          middle?: number;
          low?: number;
          hint?: number;
        };
        data?: Array<{
          vuln_id?: string;
          domain_id?: string;
          url?: string;
          severity?: string;
          vuln_status?: string;
          vuln_class?: string;
          vuln_type?: string;
          description?: string;
          advice?: string;
          find_time?: string;
        }>;
      };

      return {
        total: response.total,
        statistics: response.statistics,
        data: (response.data ?? []).map((item) => ({
          vuln_id: item.vuln_id ?? "",
          domain_id: item.domain_id,
          url: item.url,
          severity: item.severity,
          vuln_status: item.vuln_status,
          vuln_class: item.vuln_class,
          vuln_type: item.vuln_type,
          description: item.description,
          advice: item.advice,
          find_time: item.find_time
        }))
      };
    },
    async listPorts(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        task_id: input.task_id,
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/results/ports?${query.toString()}`
      )) as {
        total?: number;
        data?: Array<{
          port?: number;
          service?: string;
          protocol?: string;
          status?: string;
        }>;
      };

      return {
        total: response.total,
        data: (response.data ?? []).map((item) => ({
          port: item.port,
          service: item.service,
          protocol: item.protocol,
          status: item.status
        }))
      };
    },
    async listBusinessRisks(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        task_id: input.task_id,
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/results/business-risk?${query.toString()}`
      )) as {
        total?: number;
        data?: Array<{
          risk_id?: string;
          risk_url?: string;
          risk_type?: string;
          risk_content?: string;
          risk_status?: string;
          find_time?: string;
        }>;
      };

      return {
        total: response.total,
        data: (response.data ?? []).map((item) => ({
          risk_id: item.risk_id ?? "",
          risk_url: item.risk_url,
          risk_type: item.risk_type,
          risk_content: item.risk_content,
          risk_status: item.risk_status,
          find_time: item.find_time
        }))
      };
    },
    async getReportStatus(input) {
      const query = new URLSearchParams({ task_id: input.task_id });
      const response = (await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/webscan/report/status?${query.toString()}`
      )) as {
        task_id?: string;
        report_status?: string;
      };

      return {
        task_id: response.task_id ?? input.task_id,
        report_status: response.report_status
      };
    }
  };
}
