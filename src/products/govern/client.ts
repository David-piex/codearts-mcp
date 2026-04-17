import type { ReturnTypeCreateHttpClient } from "../types.js";

type GovernTaskStatus = {
  id: string;
  status?: string;
};

type GovernTaskMutationResult = {
  id: string;
  result?: string;
};

type GovernReportStatus = {
  id: string;
  status?: string;
};

type GovernDownloadedReport = {
  body: Uint8Array;
  content_type?: string;
  file_name?: string;
};

type GovernSbcVulnMapItem = {
  name?: string;
  version?: string;
  vendor?: string;
  include_previous?: number;
  min_version?: string;
  cve_id?: string;
  is_affected?: string;
  update_time?: string;
};

type GovernVulnInfo = {
  hw_psirt_id?: string;
  cve_id?: string;
  cvss_ver?: string;
  cvss_value?: string;
  cvss_vector?: string;
  priority?: number;
  is_focussed?: string;
  official_publish_date?: string;
  vul_mod_date?: string;
  vul_title?: string;
  vul_description?: string;
  solution?: string;
  solution_list?: unknown[];
  link_list?: unknown[];
  vuln_source?: string;
  platform?: string;
};

type GovernUserInfo = {
  user_id?: string;
  white_list?: boolean;
};

type GovernCreateTaskPayload = string | { id?: string };

type GovernMultipartTaskInfo = {
  file_path?: string;
  file_name?: string;
  upload_id?: string;
  part_number?: number;
};

type GovernLicenseStats = {
  list?: Array<{ name?: string; num?: number }>;
};

type GovernOpenSourceSummary = {
  software: {
    component?: number;
    vuln?: number;
    no_version?: number;
  };
  vuln?: {
    critical?: number;
    high?: number;
    medium?: number;
    low?: number;
  };
  license?: GovernLicenseStats;
  report_url?: string;
  start_time?: string;
  end_time?: string;
};

type GovernOpenSourceReport = {
  id: string;
  status?: string;
  filename?: string;
  sha1?: string;
  report?: string;
  creator?: string;
  summary?: {
    vuln_detail?: {
      critical?: number;
      major?: number;
      minor?: number;
    };
    comp_detail?: {
      no_known_vuln_comp?: number;
      vulnerable_comp?: number;
    };
  };
  release_info?: {
    vuln_database_version?: string;
    plat_version?: string;
  };
  start_time?: string;
  end_time?: string;
  components?: Array<{
    name?: string;
    version?: string;
    vuln_num?: number;
    licenses?: string[];
  }>;
};

type GovernQuotaInfo = {
  package_quota?: number;
  concurrent_task?: number;
  valid?: boolean;
  resource_id?: string;
};

type GovernOsiStatistics = {
  Total?: {
    software?: number;
  };
};

type GovernOsiPagination = {
  page_num?: number;
  page_size?: number;
  total?: number;
};

type GovernOsiItemName = {
  software_name?: string;
  language?: string;
  description?: string;
  version_count?: number;
  provider?: string;
};

type GovernOsiItemVersion = {
  software_code?: string;
  software_name?: string;
  software_version?: string;
  language?: string;
  release_time?: string;
  license_list?: string[];
  level?: string;
  provider?: string;
  scorecard?: number;
  criticality?: number;
  vuln_amount?: number;
  scm?: string;
};

type GovernOsiItemDetail = {
  software_code?: string;
  software_name?: string;
  software_version?: string;
  release_time?: string;
  language?: string;
  scm?: string;
  homepage?: string;
  description?: string;
  provider?: string;
  level?: string;
  vuln_amount?: number;
  scorecard?: number;
  criticality?: number;
};

type GovernOsiItemVuln = {
  cve_id?: string;
  severity?: string;
  cvss_score?: string;
  publish_time?: string;
};

type GovernOsiItemDependency = {
  software_name?: string;
  software_version?: string;
  provider?: string;
  language?: string;
  relation?: string;
};

type GovernAlterQuotaProductInfo = {
  orderId?: string;
  jobId?: string;
  regionId?: string;
  chargingMode?: number;
  periodNum?: number;
  periodType?: number;
  subscriptionNum?: number;
  productId?: string;
  cloudServiceType?: string;
  resourceType?: string;
  resourceSpecCode?: string;
  resourceSize?: number;
  resouceSizeMeasureId?: number;
};

type GovernAlterQuotaPayload = {
  resourceId?: string;
  changeMode?: number;
  cloudServiceType?: string;
  periodType?: number;
  periodNum?: number;
  productInfo?: GovernAlterQuotaProductInfo[];
};

type GovernAlterQuotaResult = {
  orderId?: string;
};

type GovernInfoLeakSummary = {
  file_count?: number;
  start_time?: string;
  end_time?: string;
  items?: Array<{
    name?: string;
    result?: number;
  }>;
};

type GovernSecCompileSummary = {
  version?: string;
  all_file_nums?: number;
  items?: Array<{
    index?: string;
    name?: string;
    severity?: string;
    result?: unknown;
  }>;
};

type GovernSecConfigSummary = {
  version?: string;
  start_time?: string;
  end_time?: string;
  items?: Array<{
    index?: string;
    name?: string;
    severity?: string;
    result?: unknown;
    confirmation?: unknown;
  }>;
};

export type GovernClient = {
  createMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
  }>;
  notifyMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    upload_id: string;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
  }>;
  uploadMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    upload_id: string;
    part_number: number;
    part_size: number;
    file: File;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
    part_number: number;
  }>;
  createTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    file_size: number;
  }) => Promise<{
    id: string;
    file_path: string;
    file_name: string;
    file_size: number;
  }>;
  stopTask: (input: { project_id: string; task_id: string }) => Promise<GovernTaskMutationResult>;
  deleteTask: (input: { project_id: string; task_id: string }) => Promise<GovernTaskMutationResult>;
  createPdfReport: (input: { project_id: string; task_id: string }) => Promise<GovernTaskMutationResult>;
  getPdfReportStatus: (input: { project_id: string; task_id: string }) => Promise<GovernReportStatus>;
  downloadPdfReport: (input: { project_id: string; task_id: string }) => Promise<GovernDownloadedReport>;
  createExcelReport: (input: { project_id: string; task_id: string }) => Promise<GovernTaskMutationResult>;
  getExcelReportStatus: (input: { project_id: string; task_id: string }) => Promise<GovernReportStatus>;
  downloadExcelReport: (input: { project_id: string; task_id: string }) => Promise<GovernDownloadedReport>;
  listSbcVulnMap: (input: {
    project_id: string;
    start_time: string;
    end_time: string;
  }) => Promise<GovernSbcVulnMapItem[]>;
  getVulnInfo: (input: { project_id: string; cve_id: string }) => Promise<GovernVulnInfo>;
  getUserInfo: (input: { project_id: string; user_id: string }) => Promise<GovernUserInfo>;
  getTaskStatus: (input: { project_id: string; task_id: string }) => Promise<GovernTaskStatus>;
  getOpenSourceSummary: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<GovernOpenSourceSummary>;
  getInfoLeakSummary: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<GovernInfoLeakSummary>;
  getSecCompileSummary: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<GovernSecCompileSummary>;
  getSecConfigSummary: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<GovernSecConfigSummary>;
  getOpenSourceReport: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<GovernOpenSourceReport>;
  getQuotaInfo: (input: { project_id: string }) => Promise<GovernQuotaInfo>;
  getOsiStatistics: (input: { project_id: string }) => Promise<{
    total?: {
      software?: number;
    };
  }>;
  listOsiItemNames: (input: {
    project_id: string;
    page: number;
    page_size: number;
    software_name?: string;
    artifact_id?: string;
  }) => Promise<{
    items: GovernOsiItemName[];
    total?: number;
  }>;
  listOsiItemVersions: (input: {
    project_id: string;
    page: number;
    page_size: number;
    software_name?: string;
    artifact_id?: string;
  }) => Promise<{
    items: GovernOsiItemVersion[];
    total?: number;
  }>;
  getOsiItemDetail: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<GovernOsiItemDetail>;
  listOsiItemVulns: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<{
    items: GovernOsiItemVuln[];
  }>;
  listOsiItemDependency: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<{
    items: GovernOsiItemDependency[];
  }>;
  alterQuotaInfo: (input: {
    project_id: string;
    resource_id?: string;
    change_mode?: number;
    cloud_service_type?: string;
    period_type?: number;
    period_num?: number;
    product_info?: Array<{
      order_id?: string;
      job_id?: string;
      region_id?: string;
      charging_mode?: number;
      period_num?: number;
      period_type?: number;
      subscription_num?: number;
      product_id?: string;
      cloud_service_type?: string;
      resource_type?: string;
      resource_spec_code?: string;
      resource_size?: number;
      resource_size_measure_id?: number;
    }>;
  }) => Promise<{ order_id?: string }>;
};

function unwrapPayload<T>(response: T | { data?: T }): T {
  if (typeof response === "object" && response !== null && "data" in response) {
    return (response.data ?? {}) as T;
  }

  return response as T;
}

export function createGovernClient(_http: ReturnTypeCreateHttpClient): GovernClient {
  return {
    async createMultipartTask(input) {
      const response = (await _http.post(`/v1/${encodeURIComponent(input.project_id)}/sbc/task/multipart/create`, {
        file_path: input.file_path,
        file_name: input.file_name
      })) as GovernMultipartTaskInfo | { data?: GovernMultipartTaskInfo };
      const payload = unwrapPayload<GovernMultipartTaskInfo>(response);

      return {
        file_path: payload.file_path ?? input.file_path,
        file_name: payload.file_name ?? input.file_name,
        upload_id: payload.upload_id ?? ""
      };
    },
    async notifyMultipartTask(input) {
      const response = (await _http.post(`/v1/${encodeURIComponent(input.project_id)}/sbc/task/multipart/notify`, {
        file_path: input.file_path,
        file_name: input.file_name,
        upload_id: input.upload_id
      })) as GovernMultipartTaskInfo | { data?: GovernMultipartTaskInfo };
      const payload = unwrapPayload<GovernMultipartTaskInfo>(response);

      return {
        file_path: payload.file_path ?? input.file_path,
        file_name: payload.file_name ?? input.file_name,
        upload_id: payload.upload_id ?? input.upload_id
      };
    },
    async uploadMultipartTask(input) {
      const form = new FormData();
      form.append("upload_id", input.upload_id);
      form.append("file_path", input.file_path);
      form.append("file_name", input.file_name);
      form.append("part_number", String(input.part_number));
      form.append("part_size", String(input.part_size));
      form.append("file", input.file);

      const response = (await _http.postMultipart(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/multipart`,
        form
      )) as GovernMultipartTaskInfo | { data?: GovernMultipartTaskInfo };
      const payload = unwrapPayload<GovernMultipartTaskInfo>(response);

      return {
        file_path: payload.file_path ?? input.file_path,
        file_name: payload.file_name ?? input.file_name,
        upload_id: payload.upload_id ?? input.upload_id,
        part_number: payload.part_number ?? input.part_number
      };
    },
    async createTask(input) {
      const response = (await _http.post(`/v1/${encodeURIComponent(input.project_id)}/sbc/task/start`, {
        file_path: input.file_path,
        file_name: input.file_name,
        file_size: input.file_size
      })) as GovernCreateTaskPayload | { data?: GovernCreateTaskPayload };
      const payload = unwrapPayload<GovernCreateTaskPayload>(response);
      const id = typeof payload === "string" ? payload : payload?.id ?? "";

      return {
        id,
        file_path: input.file_path,
        file_name: input.file_name,
        file_size: input.file_size
      };
    },
    async stopTask(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/stop?id=${encodeURIComponent(input.task_id)}`
      )) as GovernTaskMutationResult | { data?: GovernTaskMutationResult };
      const payload = unwrapPayload<GovernTaskMutationResult>(response);

      return {
        id: payload.id ?? input.task_id,
        result: payload.result
      };
    },
    async deleteTask(input) {
      const response = (await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task?id=${encodeURIComponent(input.task_id)}`
      )) as GovernTaskMutationResult | { data?: GovernTaskMutationResult };
      const payload = unwrapPayload<GovernTaskMutationResult>(response);

      return {
        id: payload.id ?? input.task_id,
        result: payload.result
      };
    },
    async createPdfReport(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/pdf/create?id=${encodeURIComponent(input.task_id)}`
      )) as GovernTaskMutationResult | { data?: GovernTaskMutationResult };
      const payload = unwrapPayload<GovernTaskMutationResult>(response);

      return {
        id: payload.id ?? input.task_id,
        result: payload.result
      };
    },
    async getPdfReportStatus(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/pdf/status?id=${encodeURIComponent(input.task_id)}`
      )) as GovernReportStatus | { data?: GovernReportStatus };
      const payload = unwrapPayload<GovernReportStatus>(response);

      return {
        id: payload.id ?? input.task_id,
        status: payload.status
      };
    },
    async downloadPdfReport(input) {
      const response = await _http.getBinary(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/pdf?id=${encodeURIComponent(input.task_id)}`
      );

      return {
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async createExcelReport(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/excel/create?id=${encodeURIComponent(input.task_id)}`
      )) as GovernTaskMutationResult | { data?: GovernTaskMutationResult };
      const payload = unwrapPayload<GovernTaskMutationResult>(response);

      return {
        id: payload.id ?? input.task_id,
        result: payload.result
      };
    },
    async getExcelReportStatus(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/excel/status?id=${encodeURIComponent(input.task_id)}`
      )) as GovernReportStatus | { data?: GovernReportStatus };
      const payload = unwrapPayload<GovernReportStatus>(response);

      return {
        id: payload.id ?? input.task_id,
        status: payload.status
      };
    },
    async downloadExcelReport(input) {
      const response = await _http.getBinary(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/report/excel?id=${encodeURIComponent(input.task_id)}`
      );

      return {
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async listSbcVulnMap(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/vuln/map/list?start_time=${encodeURIComponent(input.start_time)}&end_time=${encodeURIComponent(input.end_time)}`
      )) as GovernSbcVulnMapItem[] | { data?: GovernSbcVulnMapItem[] };
      const payload = unwrapPayload<GovernSbcVulnMapItem[]>(response);

      return (payload ?? []).map((item) => ({
        name: item.name,
        version: item.version,
        vendor: item.vendor,
        include_previous: item.include_previous,
        min_version: item.min_version,
        cve_id: item.cve_id,
        is_affected: item.is_affected,
        update_time: item.update_time
      }));
    },
    async getVulnInfo(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/vuln/info?cve_id=${encodeURIComponent(input.cve_id)}`
      )) as GovernVulnInfo | { data?: GovernVulnInfo };
      const payload = unwrapPayload<GovernVulnInfo>(response);

      return {
        hw_psirt_id: payload.hw_psirt_id,
        cve_id: payload.cve_id ?? input.cve_id,
        cvss_ver: payload.cvss_ver,
        cvss_value: payload.cvss_value,
        cvss_vector: payload.cvss_vector,
        priority: payload.priority,
        is_focussed: payload.is_focussed,
        official_publish_date: payload.official_publish_date,
        vul_mod_date: payload.vul_mod_date,
        vul_title: payload.vul_title,
        vul_description: payload.vul_description,
        solution: payload.solution,
        solution_list: payload.solution_list ?? [],
        link_list: payload.link_list ?? [],
        vuln_source: payload.vuln_source,
        platform: payload.platform
      };
    },
    async getUserInfo(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/user/info?user_id=${encodeURIComponent(input.user_id)}`
      )) as GovernUserInfo | { data?: GovernUserInfo };
      const payload = unwrapPayload<GovernUserInfo>(response);

      return {
        user_id: payload.user_id ?? input.user_id,
        white_list: payload.white_list
      };
    },
    async getTaskStatus(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/status?id=${encodeURIComponent(input.task_id)}`
      )) as GovernTaskStatus | { data?: GovernTaskStatus };
      const payload = unwrapPayload<GovernTaskStatus>(response);

      return {
        id: payload.id ?? input.task_id,
        status: payload.status
      };
    },
    async getOpenSourceSummary(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/summary/opensource?id=${encodeURIComponent(input.task_id)}`
      )) as GovernOpenSourceSummary | { data?: GovernOpenSourceSummary };
      const payload = unwrapPayload<GovernOpenSourceSummary>(response);

      return {
        software: payload.software ?? {},
        vuln: payload.vuln,
        license: {
          list: (payload.license?.list ?? []).map((item) => ({
            name: item.name,
            num: item.num
          }))
        },
        report_url: payload.report_url,
        start_time: payload.start_time,
        end_time: payload.end_time
      };
    },
    async getInfoLeakSummary(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/summary/infoleak?id=${encodeURIComponent(input.task_id)}`
      )) as GovernInfoLeakSummary | { data?: GovernInfoLeakSummary };
      const payload = unwrapPayload<GovernInfoLeakSummary>(response);

      return {
        file_count: payload.file_count,
        start_time: payload.start_time,
        end_time: payload.end_time,
        items: (payload.items ?? []).map((item) => ({
          name: item.name,
          result: item.result
        }))
      };
    },
    async getSecCompileSummary(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/summary/seccompile?id=${encodeURIComponent(input.task_id)}`
      )) as GovernSecCompileSummary | { data?: GovernSecCompileSummary };
      const payload = unwrapPayload<GovernSecCompileSummary>(response);

      return {
        version: payload.version,
        all_file_nums: payload.all_file_nums,
        items: (payload.items ?? []).map((item) => ({
          index: item.index,
          name: item.name,
          severity: item.severity,
          result: item.result
        }))
      };
    },
    async getSecConfigSummary(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/summary/secconfig?id=${encodeURIComponent(input.task_id)}`
      )) as GovernSecConfigSummary | { data?: GovernSecConfigSummary };
      const payload = unwrapPayload<GovernSecConfigSummary>(response);

      return {
        version: payload.version,
        start_time: payload.start_time,
        end_time: payload.end_time,
        items: (payload.items ?? []).map((item) => ({
          index: item.index,
          name: item.name,
          severity: item.severity,
          result: item.result,
          confirmation: item.confirmation
        }))
      };
    },
    async getOpenSourceReport(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/task/report/opensource?id=${encodeURIComponent(input.task_id)}`
      )) as GovernOpenSourceReport | { data?: GovernOpenSourceReport };
      const payload = unwrapPayload<GovernOpenSourceReport>(response);

      return {
        id: payload.id ?? input.task_id,
        status: payload.status,
        filename: payload.filename,
        sha1: payload.sha1,
        report: payload.report,
        creator: payload.creator,
        summary: payload.summary,
        release_info: payload.release_info,
        start_time: payload.start_time,
        end_time: payload.end_time,
        components: (payload.components ?? []).map((item) => ({
          name: item.name,
          version: item.version,
          vuln_num: item.vuln_num,
          licenses: item.licenses ?? []
        }))
      };
    },
    async getQuotaInfo(input) {
      const response = (await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/quota/info`
      )) as GovernQuotaInfo | { data?: GovernQuotaInfo };
      const payload = unwrapPayload<GovernQuotaInfo>(response);

      return {
        package_quota: payload.package_quota,
        concurrent_task: payload.concurrent_task,
        valid: payload.valid,
        resource_id: payload.resource_id
      };
    },
    async getOsiStatistics(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/statistics`,
        {}
      )) as GovernOsiStatistics | { data?: GovernOsiStatistics };
      const payload = unwrapPayload<GovernOsiStatistics>(response);

      return {
        total: {
          software: payload.Total?.software
        }
      };
    },
    async listOsiItemNames(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/item/name/page?page_num=${encodeURIComponent(String(input.page))}&page_size=${encodeURIComponent(String(input.page_size))}`,
        {
          software_name: input.software_name,
          artifact_id: input.artifact_id
        }
      )) as {
        data?: GovernOsiItemName[];
        pagination?: GovernOsiPagination;
      };

      return {
        items: response.data ?? [],
        total: response.pagination?.total
      };
    },
    async listOsiItemVersions(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/item/version/page?page_num=${encodeURIComponent(String(input.page))}&page_size=${encodeURIComponent(String(input.page_size))}`,
        {
          software_name: input.software_name,
          artifact_id: input.artifact_id
        }
      )) as {
        data?: GovernOsiItemVersion[];
        pagination?: GovernOsiPagination;
      };

      return {
        items: response.data ?? [],
        total: response.pagination?.total
      };
    },
    async getOsiItemDetail(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/item/detail`,
        {
          software_name: input.software_name,
          software_version: input.software_version,
          artifact_id: input.artifact_id
        }
      )) as GovernOsiItemDetail | { data?: GovernOsiItemDetail };
      const payload = unwrapPayload<GovernOsiItemDetail>(response);

      return {
        software_code: payload.software_code,
        software_name: payload.software_name,
        software_version: payload.software_version,
        release_time: payload.release_time,
        language: payload.language,
        scm: payload.scm,
        homepage: payload.homepage,
        description: payload.description,
        provider: payload.provider,
        level: payload.level,
        vuln_amount: payload.vuln_amount,
        scorecard: payload.scorecard,
        criticality: payload.criticality
      };
    },
    async listOsiItemVulns(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/item/vuln`,
        {
          software_name: input.software_name,
          software_version: input.software_version,
          artifact_id: input.artifact_id
        }
      )) as GovernOsiItemVuln[] | { data?: GovernOsiItemVuln[] };
      const payload = unwrapPayload<GovernOsiItemVuln[]>(response);

      return {
        items: payload ?? []
      };
    },
    async listOsiItemDependency(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/osi/item/dependency`,
        {
          software_name: input.software_name,
          software_version: input.software_version,
          artifact_id: input.artifact_id
        }
      )) as GovernOsiItemDependency[] | { data?: GovernOsiItemDependency[] };
      const payload = unwrapPayload<GovernOsiItemDependency[]>(response);

      return {
        items: payload ?? []
      };
    },
    async alterQuotaInfo(input) {
      const body: GovernAlterQuotaPayload = {
        resourceId: input.resource_id,
        changeMode: input.change_mode,
        cloudServiceType: input.cloud_service_type,
        periodType: input.period_type,
        periodNum: input.period_num,
        productInfo: input.product_info?.map((item) => ({
          orderId: item.order_id,
          jobId: item.job_id,
          regionId: item.region_id,
          chargingMode: item.charging_mode,
          periodNum: item.period_num,
          periodType: item.period_type,
          subscriptionNum: item.subscription_num,
          productId: item.product_id,
          cloudServiceType: item.cloud_service_type,
          resourceType: item.resource_type,
          resourceSpecCode: item.resource_spec_code,
          resourceSize: item.resource_size,
          resouceSizeMeasureId: item.resource_size_measure_id
        }))
      };
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/sbc/quota/alter`,
        body
      )) as GovernAlterQuotaResult | { data?: GovernAlterQuotaResult };
      const payload = unwrapPayload<GovernAlterQuotaResult>(response);

      return {
        order_id: payload.orderId
      };
    }
  };
}
