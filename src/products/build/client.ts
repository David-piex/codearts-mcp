import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { Buffer } from "node:buffer";
import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";
import { normalizeProviderError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";

export type BuildClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  previewAppendJobStep: (input: {
    job_id: string;
    step_name: string;
    module_id: string;
    enable?: boolean;
    version?: string;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
    insert_after_step_name?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    appended_step_name: string;
    inserted_after_step_name?: string;
    module_id: string;
    step_count: number;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
  }>;
  appendJobStep: (input: {
    job_id: string;
    step_name: string;
    module_id: string;
    enable?: boolean;
    version?: string;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
    insert_after_step_name?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    appended_step_name: string;
    inserted_after_step_name?: string;
    module_id: string;
    step_count: number;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
  }>;
  previewConfigureReleaseUploadStep: (input: {
    job_id: string;
    step_name: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    configured_step_name: string;
    module_id: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }>;
  configureReleaseUploadStep: (input: {
    job_id: string;
    step_name: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    configured_step_name: string;
    module_id: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }>;
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
  showFlowGraphV3: (input: { build_flow_record_id: string }) => Promise<{
    build_flow_record_id: string;
    nodes: Array<Record<string, unknown>>;
    edges: Array<Record<string, unknown>>;
    raw: Record<string, unknown>;
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
  listImageTemplates: () => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDefaultParameters: () => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listSystemParameters: () => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listBuildParameterTypes: () => Promise<{
    parameterTypes: Array<Record<string, unknown>>;
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
  listCodeTags: (input: {
    scm_type: string;
    repo_id?: string;
    search?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tags: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listReportBranches: (input: {
    job_id: string;
    repository_name: string;
  }) => Promise<{
    branches: string[];
  }>;
  listReportRepositories: (input: { job_id: string }) => Promise<{
    latest?: string;
    repositories: string[];
    raw: Record<string, unknown>;
  }>;
  listGitCodeRepositories: (input: { endpoint_id: string }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listGitCodeBranches: (input: {
    endpoint_id: string;
    repository_name?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listResourceSpecs: (input: { project_id: string; arch: string }) => Promise<{
    specs: string[];
  }>;
  getDomainUserPermission: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getDomainPackageQuota: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getDomainChargeType: () => Promise<{ raw: Record<string, unknown> }>;
  getDomainFederation: () => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
  getDomainStatus: () => Promise<{ raw: Record<string, unknown> }>;
  getDomainJobSummary: () => Promise<{ raw: Record<string, unknown> }>;
  getDomainRelatedProjects: () => Promise<{
    projects: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDomainRelatedProjectsPage: (input: {
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    projects: Array<Record<string, unknown>>;
    total?: number;
    keep_time?: unknown;
  }>;
  listPackageSpecStatuses: (input: { project_id: string; status: string }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getDockerfileTemplate: (input: { image_id: string }) => Promise<{
    image_id: string;
    template: string;
  }>;
  checkJobNameExists: (input: { project_id: string; job_name: string }) => Promise<{
    project_id: string;
    job_name: string;
    exists?: boolean;
    raw: Record<string, unknown>;
  }>;
  getJobBuildSuccessRatio: (input: {
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
  }) => Promise<{
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
    raw: Record<string, unknown>;
  }>;
  getLastHistoryV3: (input: {
    project_id: string;
    repository_name: string;
  }) => Promise<{
    project_id: string;
    repository_name: string;
    raw: Record<string, unknown>;
  }>;
  getJobSuccessRatioV3: (input: {
    job_id: string;
    start_time: string;
    end_time: string;
  }) => Promise<{
    job_id: string;
    start_time: string;
    end_time: string;
    raw: Record<string, unknown>;
  }>;
  listPeriodHistoryV3: (input: {
    job_id: string;
    start_time: string;
    end_time: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listBuildInfoRecordsV3: (input: {
    job_id: string;
    start_time: string;
    end_time: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getJobConfigDiff: (input: {
    job_id: string;
    revisedl_no: number;
    original_no: number;
  }) => Promise<{
    job_id: string;
    revisedl_no: number;
    original_no: number;
    diff: string;
  }>;
  listRecyclingJobs: (input: {
    page: number;
    page_size: number;
    search?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    keep_time?: unknown;
  }>;
  checkJobCountLimit: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getReportSummary: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getJobBuildTime: (input: {
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
  }) => Promise<{
    job_id: string;
    repository_name: string;
    branch: string;
    interval: number;
    raw: Record<string, unknown>;
  }>;
  listJunitCoverageSummaries: (input: { job_id: string; build_no: number }) => Promise<{
    summaries: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getCoverageMetrics: (input: { job_id: string; build_no: number; root_id: string }) => Promise<{
    job_id: string;
    build_no: number;
    root_id: string;
    raw: Record<string, unknown>;
  }>;
  listJobPermissionRoles: (input: { job_id: string }) => Promise<{
    roles: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getJobPermissionInternal: () => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
  getJobPermission: (input: { project_id: string; job_id: string }) => Promise<{
    project_id: string;
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getJobInfo: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getBuildDetails: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getOutputInfoV3: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getRecordInfoV4: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getTaskLogPage: (input: {
    job_id: string;
    build_no: number;
    step_id: number;
    start_offset: number;
    end_offset: number;
    sort: "AES" | "DESC";
  }) => Promise<{
    job_id: string;
    build_no: number;
    step_id: number;
    raw: Record<string, unknown>;
  }>;
  getProjectDefaultPermission: (input: { project_id: string; job_id: string }) => Promise<{
    project_id: string;
    job_id: string;
    permissions: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listOfficialTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCustomTemplates: (input: {
    page: number;
    page_size: number;
    name?: string;
    filter?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showPackageSpecCountdown: (input: { body?: Record<string, unknown> }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listJobUpdateHistory: (input: { job_id: string }) => Promise<{
    history: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getJobOutput: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    raw: Record<string, unknown>;
  }>;
  getJobStepStatus: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  getJobPipelineInfo: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listProjectEndpoints: (input: { project_id: string }) => Promise<{
    endpoints: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showDomainsStatuses: (input: { body?: Record<string, unknown> }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listJobBadgeBranches: (input: { job_id: string }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getRunningStepLog: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getStageLogPage: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  downloadFullLog: (input: { record_id: string }) => Promise<{
    record_id: string;
    raw: Record<string, unknown>;
  }>;
  downloadTaskLog: (input: { record_id: string }) => Promise<{
    record_id: string;
    raw: Record<string, unknown>;
  }>;
  downloadBuildLogV4: (input: {
    record_id: string;
    log_level: "INFO" | "DEBUG";
  }) => Promise<{
    record_id: string;
    log_level: "INFO" | "DEBUG";
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadLogByRecordIdV3: (input: {
    record_id: string;
  }) => Promise<{
    record_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadTaskLogV4: (input: {
    record_id: string;
    task_name: string;
    log_level: "INFO" | "DEBUG";
  }) => Promise<{
    record_id: string;
    task_name: string;
    log_level: "INFO" | "DEBUG";
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  getTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    raw: Record<string, unknown>;
  }>;
  getYamlTemplate: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listRecommendedOfficialTemplates: (input: { body?: Record<string, unknown> }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  downloadKeystoreV2: (input: {
    name: string;
    domain_id: string;
    id: string;
  }) => Promise<{
    name: string;
    domain_id: string;
    id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadKeystoreV3: (input: {
    file_name: string;
    domain_id: string;
  }) => Promise<{
    file_name: string;
    domain_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name_from_header?: string;
  }>;
  listKeystoreFiles: (input: {
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listUsableKeystoreNames: () => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getKeystorePermission: (input: { keystore_id: string }) => Promise<{
    keystore_id: string;
    raw: Record<string, unknown>;
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
  listProjectJobsV3: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listAllJobs: (input: {
    page: number;
    page_size: number;
    keyword?: string;
    build_status?: string;
    creator_id?: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    jobs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listBriefRecords: (input: {
    build_project_ids: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listJobHistoryV3: (input: {
    job_id: string;
    page: number;
    page_size: number;
    interval?: number;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getJobRunningStatusV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getJobNotice: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
  }>;
  listJobNoticesV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    notices: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getJobRunningStatus: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getJobDisableCheck: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getJobCopyName: (input: { job_id: string }) => Promise<{
    job_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listJobGroupTree: (input: { project_id: string }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    project_id?: string;
    description?: string;
    flavor?: string;
    host_type?: string;
    build_environment_type?: string;
    step_count: number;
    primary_image?: string;
    scm_repositories: Array<{
      url?: string;
      branch?: string;
      repo_id?: string;
      repo_name?: string;
      scm_type?: string;
    }>;
    steps: Array<{
      name?: string;
      module_id?: string;
      enable?: boolean;
      image?: string;
      command?: string;
      pre_condition?: string;
      properties?: Record<string, unknown>;
    }>;
  }>;
  listJobConfigV3: (input: {
    job_id: string;
    get_all_params?: "true" | "false";
  }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
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
    build_no?: number;
    daily_build_number?: string;
    status?: string;
  }>;
  runJobV3: (input: {
    job_id: string;
    branch?: string;
    parameter?: Array<{ name: string; value: string }>;
    scm?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    job_id: string;
    record_id?: string;
    build_no?: number;
    daily_build_number?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getRecord: (input: { record_id: string }) => Promise<{
    record_id: string;
    job_id?: string;
    status?: string;
    status_code?: number;
    trigger_type?: string;
    commit_id?: string;
    branch?: string;
    repository?: string;
    execution_id?: string;
    error_message?: string;
    build_yml_path?: string;
    daily_build_number?: string;
  }>;
  stopJob: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    result?: boolean;
  }>;
  stopJobV1: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    status?: string;
    result?: boolean;
    raw: Record<string, unknown>;
  }>;
  deleteJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    project_id?: string;
    status?: string;
  }>;
  disableJob: (input: {
    job_id: string;
    disabled: boolean;
    reason?: string;
  }) => Promise<{
    job_id: string;
    disabled: boolean;
    reason?: string;
    status?: string;
  }>;
  setKeepTime: (input: { keep_time: number }) => Promise<{
    keep_time: number;
    status?: string;
  }>;
  deleteRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
  clearRecyclingJobs: () => Promise<{
    status?: string;
  }>;
  restoreRecyclingJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    status?: string;
  }>;
  followJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
  unfollowJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    favorite?: boolean;
    status?: string;
  }>;
  deleteTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    status?: string;
  }>;
  saveTemplateUsedInfo: (input: {
    job_id: string;
    template_id: string;
  }) => Promise<{
    job_id: string;
    template_id: string;
    status?: string;
    result?: string;
  }>;
  followCustomTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
  unfollowCustomTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
  followOfficialTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
  unfollowOfficialTemplate: (input: { uuid: string }) => Promise<{
    uuid: string;
    favorite?: boolean;
    status?: string;
  }>;
  deleteKeystore: (input: { keystore_id: string }) => Promise<{
    keystore_id: string;
    status?: string;
  }>;
  deleteKeystorePermission: (input: { permission_id: string }) => Promise<{
    permission_id: string;
    status?: string;
  }>;
  deleteJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    project_id?: string;
    status?: string;
  }>;
  recoverJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    status?: string;
  }>;
  disableJobV3: (input: { job_id: string }) => Promise<{
    job_id: string;
    status?: string;
  }>;
  checkWebhookUrl: (input: {
    job_id: string;
    notice_type: string;
    webhook_url: string;
  }) => Promise<{
    job_id: string;
    notice_type: string;
    webhook_url: string;
    status?: string;
    result?: string;
  }>;
  autoExecuteJob: (input: {
    job_id: string;
    event_type?: string;
    ref?: string;
    after?: string;
    before?: string;
    commits?: Array<Record<string, unknown>>;
    repository?: Record<string, unknown>;
  }) => Promise<{
    job_id: string;
    status?: string;
    result?: Record<string, unknown>;
  }>;
  batchUpdateJobPermissions: (input: {
    project_id: string;
    job_ids: string[];
    project_switch?: boolean;
    permissions: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    job_ids: string[];
    status?: string;
  }>;
  batchDeleteJobs: (input: { job_ids: string[] }) => Promise<{
    job_ids: string[];
    project_id?: string;
    deleted_job_id?: string;
    status?: string;
  }>;
  batchSetAgency: (input: { job_ids: string[]; agency_urn?: string }) => Promise<{
    job_ids: string[];
    agency_urn?: string;
    status?: string;
  }>;
  updateJobRolePermission: (input: {
    job_id: string;
    role_id: string;
    permission_name: string;
    permission_value: boolean;
  }) => Promise<{
    job_id: string;
    role_id: string;
    permission_name: string;
    permission_value: boolean;
    status?: string;
  }>;
  moveJobGroup: (input: {
    project_id: string;
    group_id: string;
    jobs: Array<{ job_id: string; job_name: string }>;
  }) => Promise<{
    project_id: string;
    group_id: string;
    jobs: Array<{ job_id?: string; group_path_id?: string }>;
    status?: string;
  }>;
  updateJobGroup: (input: {
    project_id: string;
    id: string;
    name: string;
    parent_id?: string;
    ordinal?: number;
    path_id?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    id: string;
    name: string;
    parent_id?: string;
    ordinal?: number;
    path_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  deleteJobGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    project_id: string;
    id: string;
    status?: string;
    result?: unknown;
  }>;
  swapJobGroup: (input: {
    project_id: string;
    source_group_id: string;
    target_group_id: string;
  }) => Promise<{
    project_id: string;
    source_group_id: string;
    target_group_id: string;
    status?: string;
  }>;
  addKeystorePermission: (input: {
    keystore_id: string;
    user_id: string;
    user_name: string;
    setting: boolean;
    delete: boolean;
    modify: boolean;
    usage: boolean;
    can_absent: boolean;
  }) => Promise<{
    keystore_id: string;
    user_id: string;
    user_name: string;
    status?: string;
  }>;
  editKeystorePermission: (input: {
    x_auth_token: string;
    id: string;
    keystore_id: string;
    user_name: string;
    modify: boolean;
    usage: boolean;
    delete: boolean;
    can_absent: boolean;
  }) => Promise<{
    id: string;
    keystore_id: string;
    user_name: string;
    status?: string;
    result?: string;
  }>;
  createJob: (input: {
    project_id: string;
    job_name: string;
    arch?: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    job_name: string;
    job_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  createJobV3: (input: {
    project_id: string;
    job_name: string;
    arch: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    host_type?: string;
    build_config_type?: string;
    description?: string;
    agency_urn?: string;
    source_code?: string;
    parameters?: Array<Record<string, unknown>>;
    scms?: Array<Record<string, unknown>>;
    steps?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    job_name: string;
    job_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  updateJobV3: (input: {
    project_id: string;
    job_id: string;
    job_name: string;
    arch?: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    host_type?: string;
    build_config_type?: string;
    description?: string;
    agency_urn?: string;
    source_code?: string;
    parameters?: Array<Record<string, unknown>>;
    scms?: Array<Record<string, unknown>>;
    steps?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    job_id: string;
    job_name: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  copyJob: (input: {
    project_id: string;
    copy_job_id: string;
    job_name: string;
    arch?: string;
    auto_update_sub_module?: boolean;
    flavor?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    copy_job_id: string;
    job_name: string;
    job_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  updateJobNotice: (input: {
    job_id: string;
    notice_type: string;
    enabled_event_type_names: string[];
    send_switch?: string;
    webhook_url?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    job_id: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  disableJobNotice: (input: {
    job_id: string;
    notice_type: string;
  }) => Promise<{
    job_id: string;
    notice_type: string;
    status?: string;
  }>;
  createJobGroup: (input: {
    project_id: string;
    name: string;
    parent_id?: string;
    id?: string;
    group_id?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    id?: string;
    group_id?: string;
    name: string;
    parent_id?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  uploadKeystore: (input: {
    file_name: string;
    file_content: Uint8Array;
    privacy?: boolean;
    description?: string;
    content_type?: string;
  }) => Promise<{
    file_name: string;
    privacy?: boolean;
    description?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  createTemplate: (input: {
    x_auth_token: string;
    name: string;
    description?: string;
    tool_type?: string;
    template: Record<string, unknown>;
    parameters?: Array<Record<string, unknown>>;
    resource_limit?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    name: string;
    uuid?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  createTemplateV3: (input: {
    x_auth_token: string;
    name: string;
    description?: string;
    tool_type?: string;
    template: Record<string, unknown>;
    parameters?: Array<Record<string, unknown>>;
    resource_limit?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    name: string;
    uuid?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  updateKeystore: (input: {
    x_auth_token: string;
    id: string;
    keystore_name: string;
    share?: number;
    description?: string;
  }) => Promise<{
    id: string;
    keystore_name: string;
    share?: number;
    description?: string;
    status?: string;
    result?: unknown;
  }>;
  uploadJunitReport: (input: {
    job_id: string;
    build_no: number;
    node_id: string;
    files: Array<{ file_name: string; file_content: Uint8Array; content_type?: string }>;
  }) => Promise<{
    job_id: string;
    build_no: number;
    node_id: string;
    file_names: string[];
    status?: string;
    result?: unknown;
  }>;
  uploadJunitCoverage: (input: {
    job_id: string;
    build_no: number;
    node_id: string;
    files: Array<{ file_name: string; file_content: Uint8Array; content_type?: string }>;
  }) => Promise<{
    job_id: string;
    build_no: number;
    node_id: string;
    file_names: string[];
    status?: string;
    result?: unknown;
  }>;
  updateJobStep: (input: {
    job_id: string;
    step_name: string;
    image?: string;
    command?: string;
    pre_condition?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    updated_step_name: string;
    image?: string;
    command?: string;
    pre_condition?: string;
  }>;
};

type RawBuildJobStepConfig = {
  name?: string;
  module_id?: string;
  enable?: boolean;
  version?: string | null;
  properties?: Record<string, unknown>;
  [key: string]: unknown;
};

type RawBuildJobConfig = {
  job_id?: string;
  job_name?: string;
  project_id?: string;
  arch?: string;
  host_type?: string;
  flavor?: string;
  group_id?: string;
  domain_id?: string;
  limit_time?: number;
  build_if_code_updated?: boolean;
  source_code?: unknown;
  actions?: unknown;
  parameters?: unknown[];
  scms?: unknown[];
  steps?: RawBuildJobStepConfig[];
};

type AppendJobStepInput = {
  job_id: string;
  step_name: string;
  module_id: string;
  enable?: boolean;
  version?: string;
  image?: string;
  command?: string;
  pre_condition?: string;
  properties?: Record<string, unknown>;
  insert_after_step_name?: string;
};

type AppendJobStepPlan = {
  config: RawBuildJobConfig;
  appendedStep: RawBuildJobStepConfig;
  updatedSteps: RawBuildJobStepConfig[];
};

type ConfigureReleaseUploadStepInput = {
  job_id: string;
  step_name: string;
  file: string;
  package_name?: string;
  build_version?: string;
  custom_upload_path?: string;
  upload_tool?: string;
  remain_origin_path?: string;
  pre_condition?: string;
};

type ConfigureReleaseUploadStepPlan = {
  config: RawBuildJobConfig;
  configuredStep: RawBuildJobStepConfig;
  updatedSteps: RawBuildJobStepConfig[];
};

function unwrapBuildPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapBuildPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

  if (
    input &&
    typeof input === "object" &&
    "error_msg" in input &&
    typeof (input as { error_msg?: unknown }).error_msg === "string"
  ) {
    throw normalizeProviderError({
      status: 400,
      message: String((input as { error_msg: string }).error_msg),
      code:
        "error_code" in input && typeof (input as { error_code?: unknown }).error_code === "string"
          ? String((input as { error_code: string }).error_code)
          : undefined
    });
  }

  if (
    input &&
    typeof input === "object" &&
    "error" in input &&
    (input as { error?: unknown }).error &&
    typeof (input as { error?: unknown }).error === "object"
  ) {
    const error = (input as { error: { code?: unknown; reason?: unknown } }).error;
    const message = typeof error.reason === "string" ? error.reason : undefined;
    const code = typeof error.code === "string" ? error.code : undefined;

    if (message || code) {
      throw normalizeProviderError({
        status: 400,
        message: message ?? "Provider request failed",
        code
      });
    }
  }

  if (
    input &&
    typeof input === "object" &&
    "success" in input &&
    (input as { success?: unknown }).success === false
  ) {
    const payload = input as { message?: unknown; errCode?: unknown };
    throw normalizeProviderError({
      status: 400,
      message: typeof payload.message === "string" ? payload.message : "Provider request failed",
      code: typeof payload.errCode === "string" ? payload.errCode : undefined
    });
  }

  return input;
}

function readBuildEnvelope(input: unknown) {
  return input && typeof input === "object" && !Array.isArray(input)
    ? (input as Record<string, unknown>)
    : undefined;
}

function readBuildPayloadValue(input: unknown) {
  const unwrapped = unwrapBuildPayload(input);
  const response = readBuildEnvelope(unwrapped);

  return response && "result" in response ? response.result : unwrapped;
}

function readBuildPayload(input: unknown) {
  const response = readBuildEnvelope(unwrapBuildPayload(input)) ?? {};
  return readBuildEnvelope(response.result) ?? response;
}

function readBuildRawRecord(input: unknown): Record<string, unknown> {
  return readBuildEnvelope(input) ?? { value: input };
}

function readBuildArray<T>(input: unknown): T[] {
  return Array.isArray(input) ? (input as T[]) : [];
}

function readBuildNumber(input: unknown) {
  return typeof input === "number" ? input : undefined;
}

function readBuildString(input: unknown) {
  return typeof input === "string" ? input : undefined;
}

function readBuildTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const envelope = readBuildEnvelope(response) ?? {};

  return (
    readBuildNumber(payload.total) ??
    readBuildNumber(payload.total_count) ??
    readBuildNumber(envelope.total) ??
    readBuildNumber(envelope.total_count) ??
    fallback
  );
}

function buildQueryString(input: Record<string, string | number | boolean> | undefined) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(input ?? {})) {
    query.set(key, String(value));
  }

  return query.toString();
}

function buildOptionalQuerySuffix(input: Record<string, string | number | boolean> | undefined) {
  const query = buildQueryString(input);
  return query ? `?${query}` : "";
}

function formatBuildQueryTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getRawBuildJobConfig(
  payload: {
    result?: RawBuildJobConfig;
  },
  jobId: string
) {
  const item = payload.result;

  if (!item) {
    throw normalizeProviderError({
      status: 500,
      message: `Build job ${jobId} returned an empty config payload`
    });
  }

  return item;
}

function buildJobUpdatePayload(config: RawBuildJobConfig, jobId: string, steps: RawBuildJobStepConfig[]) {
  return {
    job_id: config.job_id ?? jobId,
    job_name: config.job_name ?? "",
    project_id: config.project_id,
    arch: config.arch,
    host_type: config.host_type,
    flavor: config.flavor,
    parameters: config.parameters ?? [],
    scms: config.scms ?? [],
    steps,
    ...(config.group_id === undefined ? {} : { group_id: config.group_id }),
    ...(config.domain_id === undefined ? {} : { domain_id: config.domain_id }),
    ...(config.limit_time === undefined ? {} : { limit_time: config.limit_time }),
    ...(config.build_if_code_updated === undefined
      ? {}
      : { build_if_code_updated: config.build_if_code_updated }),
    ...(config.source_code === undefined ? {} : { source_code: config.source_code }),
    ...(config.actions === undefined ? {} : { actions: config.actions })
  };
}

function buildStepProperties(input: {
  image?: string;
  command?: string;
  pre_condition?: string;
  properties?: Record<string, unknown>;
}) {
  return {
    ...(input.properties ?? {}),
    ...(input.image === undefined ? {} : { image: input.image }),
    ...(input.command === undefined ? {} : { command: input.command }),
    ...(input.pre_condition === undefined ? {} : { preCondition: input.pre_condition })
  };
}

function planAppendJobStep(config: RawBuildJobConfig, input: AppendJobStepInput): AppendJobStepPlan {
  const steps = config.steps ?? [];

  if (steps.some((step) => step.name === input.step_name)) {
    throw normalizeProviderError({
      status: 409,
      message: `Build step ${input.step_name} already exists in job ${input.job_id}`
    });
  }

  const appendedStep: RawBuildJobStepConfig = {
    name: input.step_name,
    module_id: input.module_id,
    enable: input.enable ?? true,
    ...(input.version === undefined ? {} : { version: input.version }),
    properties: buildStepProperties(input)
  };

  if (!input.insert_after_step_name) {
    return {
      config,
      appendedStep,
      updatedSteps: [...steps, appendedStep]
    };
  }

  const insertIndex = steps.findIndex((step) => step.name === input.insert_after_step_name);

  if (insertIndex === -1) {
    throw normalizeProviderError({
      status: 404,
      message: `Build step ${input.insert_after_step_name} was not found in job ${input.job_id}`
    });
  }

  return {
    config,
    appendedStep,
    updatedSteps: [
      ...steps.slice(0, insertIndex + 1),
      appendedStep,
      ...steps.slice(insertIndex + 1)
    ]
  };
}

function mapAppendedJobStepResult(plan: AppendJobStepPlan, input: AppendJobStepInput) {
  return {
    job_id: plan.config.job_id ?? input.job_id,
    name: plan.config.job_name ?? "",
    appended_step_name: input.step_name,
    inserted_after_step_name: input.insert_after_step_name,
    module_id: input.module_id,
    step_count: plan.updatedSteps.length,
    image:
      typeof plan.appendedStep.properties?.image === "string"
        ? plan.appendedStep.properties.image
        : undefined,
    command:
      typeof plan.appendedStep.properties?.command === "string"
        ? plan.appendedStep.properties.command
        : undefined,
    pre_condition:
      typeof plan.appendedStep.properties?.preCondition === "string"
        ? plan.appendedStep.properties.preCondition
        : undefined,
    properties: plan.appendedStep.properties
  };
}

function planConfigureReleaseUploadStep(
  config: RawBuildJobConfig,
  input: ConfigureReleaseUploadStepInput
): ConfigureReleaseUploadStepPlan {
  const steps = config.steps ?? [];
  const targetStep = steps.find((step) => step.name === input.step_name);

  if (!targetStep) {
    throw normalizeProviderError({
      status: 404,
      message: `Build step ${input.step_name} was not found in job ${input.job_id}`
    });
  }

  const existingProperties = targetStep.properties ?? {};
  const configuredStep: RawBuildJobStepConfig = {
    ...targetStep,
    properties: {
      ...existingProperties,
      file: input.file,
      name:
        input.package_name ??
        (typeof existingProperties.name === "string" ? existingProperties.name : undefined),
      buildVersion:
        input.build_version ??
        (typeof existingProperties.buildVersion === "string"
          ? existingProperties.buildVersion
          : ""),
      customUploadPath:
        input.custom_upload_path ??
        (typeof existingProperties.customUploadPath === "string"
          ? existingProperties.customUploadPath
          : ""),
      uploadTool:
        input.upload_tool ??
        (typeof existingProperties.uploadTool === "string" ? existingProperties.uploadTool : "curl"),
      remainOriginPath:
        input.remain_origin_path ??
        (typeof existingProperties.remainOriginPath === "string"
          ? existingProperties.remainOriginPath
          : "FLAT"),
      preCondition:
        input.pre_condition ??
        (typeof existingProperties.preCondition === "string"
          ? existingProperties.preCondition
          : "SUCCESS")
    }
  };

  const updatedSteps = steps.map((step) => (step.name === input.step_name ? configuredStep : step));

  return {
    config,
    configuredStep,
    updatedSteps
  };
}

function mapConfiguredReleaseUploadStepResult(
  plan: ConfigureReleaseUploadStepPlan,
  input: ConfigureReleaseUploadStepInput
) {
  const properties = plan.configuredStep.properties ?? {};

  return {
    job_id: plan.config.job_id ?? input.job_id,
    name: plan.config.job_name ?? "",
    configured_step_name: input.step_name,
    module_id: plan.configuredStep.module_id ?? "",
    file: typeof properties.file === "string" ? properties.file : input.file,
    package_name: typeof properties.name === "string" ? properties.name : undefined,
    build_version:
      typeof properties.buildVersion === "string" ? properties.buildVersion : undefined,
    custom_upload_path:
      typeof properties.customUploadPath === "string" ? properties.customUploadPath : undefined,
    upload_tool:
      typeof properties.uploadTool === "string" ? properties.uploadTool : undefined,
    remain_origin_path:
      typeof properties.remainOriginPath === "string" ? properties.remainOriginPath : undefined,
    pre_condition:
      typeof properties.preCondition === "string" ? properties.preCondition : undefined
  };
}

type BuildClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

export function createBuildClient(
  _http: ReturnTypeCreateHttpClient,
  options: BuildClientOptions = {}
): BuildClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.buildListJobsMs;
  const now = options.now ?? Date.now;
  const listJobsCache = createReadThroughCache<
    string,
    {
      jobs: Array<{
        job_id: string;
        name: string;
        project_id?: string;
        build_project_id?: string;
        is_running?: boolean;
        description?: string;
      }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });

  function buildListJobsCacheKey(input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.project_id, input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
    ...createOfficialApiRequester({
      product: "Build",
      http: _http,
      allowedPrefixes: ["/v1/", "/v2/", "/v3/"]
    }),
    async previewAppendJobStep(input) {
      const response = (await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/config`)) as {
        result?: RawBuildJobConfig;
      };
      const config = getRawBuildJobConfig(unwrapBuildPayload(response), input.job_id);
      const plan = planAppendJobStep(config, input);

      return mapAppendedJobStepResult(plan, input);
    },
    async appendJobStep(input) {
      const response = (await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/config`)) as {
        result?: RawBuildJobConfig;
      };
      const config = getRawBuildJobConfig(unwrapBuildPayload(response), input.job_id);
      const plan = planAppendJobStep(config, input);

      await _http.post("/v1/job/update", buildJobUpdatePayload(config, input.job_id, plan.updatedSteps));

      return mapAppendedJobStepResult(plan, input);
    },
    async previewConfigureReleaseUploadStep(input) {
      const response = (await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/config`)) as {
        result?: RawBuildJobConfig;
      };
      const config = getRawBuildJobConfig(unwrapBuildPayload(response), input.job_id);
      const plan = planConfigureReleaseUploadStep(config, input);

      return mapConfiguredReleaseUploadStepResult(plan, input);
    },
    async configureReleaseUploadStep(input) {
      const response = (await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/config`)) as {
        result?: RawBuildJobConfig;
      };
      const config = getRawBuildJobConfig(unwrapBuildPayload(response), input.job_id);
      const plan = planConfigureReleaseUploadStep(config, input);

      await _http.post("/v1/job/update", buildJobUpdatePayload(config, input.job_id, plan.updatedSteps));

      return mapConfiguredReleaseUploadStepResult(plan, input);
    },
    async getRecordFlowGraph(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/flow-graph`
      )) as {
        nodes?: Array<{ id?: string; name?: string; status?: string; type?: string }>;
        edges?: Array<{ source?: string; target?: string }>;
        result?: {
          nodes?: Array<{ id?: string; name?: string; status?: string; type?: string }>;
          edges?: Array<{ source?: string; target?: string }>;
        };
      });
      const item = response.result ?? response;

      return {
        record_id: input.record_id,
        nodes: item.nodes ?? [],
        edges: item.edges ?? []
      };
    },
    async showFlowGraphV3(input) {
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.build_flow_record_id)}/flow-graph`
      );
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const rawRecord = readBuildRawRecord(raw);
      const nodes = readBuildArray<Record<string, unknown>>(
        rawRecord.nodes ?? payload.nodes ?? payload.vertexes ?? payload.items ?? []
      );
      const edges = readBuildArray<Record<string, unknown>>(
        rawRecord.edges ?? payload.edges ?? payload.lines ?? []
      );

      return {
        build_flow_record_id: input.build_flow_record_id,
        nodes,
        edges,
        raw: rawRecord
      };
    },
    async getProjectRecordStatistics(input) {
      const response = unwrapBuildPayload((await _http.get(
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
      });
      const item = response.result ?? response;

      return {
        total: item.total,
        success: item.success ?? item.success_count,
        failed: item.failed ?? item.failed_count,
        aborted: item.aborted ?? item.aborted_count,
        running: item.running ?? item.running_count
      };
    },
    async listImageTemplates() {
      const response = await _http.get("/v1/image/templates");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const templates = readBuildArray<Record<string, unknown>>(
        payload.image_templates ??
          payload.templates ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        templates,
        total: readBuildTotal(payload, response, templates.length)
      };
    },
    async listDefaultParameters() {
      const response = await _http.get("/v1/job/default-parameters");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const parameters = readBuildArray<Record<string, unknown>>(
        payload.parameters ??
          payload.default_parameters ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        parameters,
        total: readBuildTotal(payload, response, parameters.length)
      };
    },
    async listSystemParameters() {
      const response = await _http.get("/v1/job/system-parameters");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const parameters = readBuildArray<Record<string, unknown>>(
        payload.parameters ??
          payload.system_parameters ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        parameters,
        total: readBuildTotal(payload, response, parameters.length)
      };
    },
    async listBuildParameterTypes() {
      const response = await _http.get("/v1/job/build-params");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const parameterTypes = readBuildArray<Record<string, unknown>>(
        payload.build_parameters ??
          payload.parameters ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        parameterTypes,
        total: readBuildTotal(payload, response, parameterTypes.length)
      };
    },
    async listProjectRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = unwrapBuildPayload((await _http.get(
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
          data?: Array<{
            record_id?: string;
            id?: string;
            job_id?: string;
            job_name?: string;
            display_name?: string;
            status?: string;
            trigger_type?: string;
            branch?: string;
            commit_id?: string;
            revision?: string;
            executor?: string;
            trigger_name?: string;
            start_time?: number;
            create_time?: string;
          }>;
          total?: number;
          total_count?: number;
          pagination?: {
            total?: number;
          };
        };
      });
      const item = (response.result ?? response) as {
        records?: Array<{
          record_id?: string;
          id?: string;
          job_id?: string;
          job_name?: string;
          display_name?: string;
          status?: string;
          trigger_type?: string;
          branch?: string;
          commit_id?: string;
          revision?: string;
          executor?: string;
          trigger_name?: string;
          start_time?: number;
        }>;
        data?: Array<{
          record_id?: string;
          id?: string;
          job_id?: string;
          job_name?: string;
          display_name?: string;
          status?: string;
          trigger_type?: string;
          branch?: string;
          commit_id?: string;
          revision?: string;
          executor?: string;
          trigger_name?: string;
          start_time?: number;
        }>;
        total?: number;
        total_count?: number;
        pagination?: {
          total?: number;
        };
      };
      const records = item.records ?? item.data ?? [];

      return {
        records: records.map((record) => ({
          record_id: record.record_id ?? record.id ?? "",
          job_id: record.job_id,
          job_name: record.job_name ?? record.display_name,
          status: record.status,
          trigger_type: record.trigger_type,
          branch: record.branch,
          commit_id: record.commit_id ?? record.revision,
          executor: record.executor ?? record.trigger_name,
          start_time: record.start_time
        })),
        total: item.total ?? item.total_count ?? item.pagination?.total
      };
    },
    async getRecordScript(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/build-script`
      )) as {
        result?:
          | {
          script?: string;
          status?: string;
            }
          | string;
      });
      const item = typeof response.result === "string" ? { script: response.result } : response.result;

      return {
        record_id: input.record_id,
        script: item?.script,
        status: item?.status
      };
    },
    async getFullStages(input) {
      const query = new URLSearchParams({
        cascade: String(input.cascade)
      });
      const response = unwrapBuildPayload((await _http.get(
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
      });

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
      const response = unwrapBuildPayload((await _http.get(
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
      });

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
      const response = unwrapBuildPayload((await _http.get(
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
      });

      return response.result ?? {};
    },
    async getHistoryDetails(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/${input.build_number}/history-details`
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
      });

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
      const response = unwrapBuildPayload((await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/${input.build_no}/history-parameters`
      )) as {
        job_id?: string;
        build_no?: number;
        parameters?: Array<{ name?: string; value?: string }>;
        result?:
          | {
          job_id?: string;
          build_no?: number;
          parameters?: Array<{ name?: string; value?: string }>;
            }
          | Array<{ name?: string; value?: string }>;
      });

      const item = Array.isArray(response.result) ? { parameters: response.result } : (response.result ?? response);

      return {
        job_id: item.job_id ?? input.job_id,
        build_no: item.build_no ?? input.build_no,
        parameters: (item.parameters ?? []).map((parameter) => ({
          name: parameter.name ?? "",
          value: parameter.value
        }))
      };
    },
    async listCodeTags(input) {
      const query = new URLSearchParams({
        scm_type: input.scm_type,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.repo_id) query.set("repo_id", input.repo_id);
      if (input.search) query.set("search", input.search);

      const response = await _http.get(`/v1/code/tags?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const tags = readBuildArray<Record<string, unknown>>(
        payload.tags ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        tags,
        total: readBuildTotal(payload, response, tags.length)
      };
    },
    async listReportBranches(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        repository_name: input.repository_name
      });
      const response = await _http.get(`/v1/report/branches?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const branches = readBuildArray<string>(
        payload.branches ?? payload.value ?? payload.items ?? (Array.isArray(raw) ? raw : [])
      );

      return { branches };
    },
    async listReportRepositories(input) {
      const response = await _http.get(
        `/v1/report/${encodeURIComponent(input.job_id)}/repositories`
      );
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const repositories = readBuildArray<string>(
        payload.repositories ?? payload.value ?? payload.items ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        latest: typeof payload.latest === "string" ? payload.latest : undefined,
        repositories,
        raw: payload
      };
    },
    async listGitCodeRepositories(input) {
      const response = await _http.get(
        `/v1/code/git-code/${encodeURIComponent(input.endpoint_id)}/repositories`
      );
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const repositories = readBuildArray<Record<string, unknown>>(
        payload.repositories ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        repositories,
        total: readBuildTotal(payload, response, repositories.length)
      };
    },
    async listGitCodeBranches(input) {
      const query = new URLSearchParams();
      if (input.repository_name) query.set("repository_name", input.repository_name);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v1/code/git-code/${encodeURIComponent(input.endpoint_id)}/branches${suffix}`
      );
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const branches = readBuildArray<Record<string, unknown>>(
        payload.branches ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        branches,
        total: readBuildTotal(payload, response, branches.length)
      };
    },
    async listResourceSpecs(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        arch: input.arch
      });
      const response = await _http.get(`/v2/resource/spec?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const specs = readBuildArray<string>(
        payload.specs ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return { specs };
    },
    async getDomainUserPermission(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const response = await _http.get(`/v1/domain/user-permission?${query.toString()}`);
      const payload = readBuildPayload(response);

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async getDomainPackageQuota(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const response = await _http.get(`/v1/domain/package/quota?${query.toString()}`);
      const payload = readBuildPayload(response);

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async getDomainChargeType() {
      const response = await _http.get("/v1/domain/charge-type");
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async getDomainFederation() {
      const response = await _http.get("/v1/domain/federation");
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        value: envelope ? envelope.value ?? envelope.result : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getDomainStatus() {
      const response = await _http.get("/v1/domain/status");
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async getDomainJobSummary() {
      const response = await _http.get("/v1/domain/job-summary");
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async getDomainRelatedProjects() {
      const response = await _http.get("/v1/domain/project/related");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const projects = readBuildArray<Record<string, unknown>>(
        payload.projects ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        projects,
        total: readBuildTotal(payload, response, projects.length)
      };
    },
    async listDomainRelatedProjectsPage(input) {
      const query = new URLSearchParams({
        page_size: String(input.page_size),
        page_no: String(input.page)
      });
      if (input.search) {
        query.set("search", input.search);
      }
      const response = await _http.get(`/v1/domain/project/related-page?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const projects = readBuildArray<Record<string, unknown>>(
        payload.project_info_list ??
          payload.projects ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        projects,
        total: readBuildTotal(payload, response, projects.length),
        keep_time: payload.keep_time
      };
    },
    async listPackageSpecStatuses(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        status: input.status
      });
      const response = await _http.get(`/v2/resource/package-spec/status?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const statuses = readBuildArray<Record<string, unknown>>(
        payload.statuses ??
          payload.package_spec_statuses ??
          payload.resources ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        statuses,
        total: readBuildTotal(payload, response, statuses.length)
      };
    },
    async getDockerfileTemplate(input) {
      const query = new URLSearchParams({ image_id: input.image_id });
      const response = await _http.get(`/v1/image/dockerfile-template?${query.toString()}`);
      const payload = readBuildPayloadValue(response);
      const template = typeof payload === "string" ? payload : String(readBuildRawRecord(payload).value ?? "");

      return {
        image_id: input.image_id,
        template
      };
    },
    async checkJobNameExists(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        job_name: input.job_name
      });
      const response = await _http.get(`/v1/job/check/exist?${query.toString()}`);
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);
      const raw = readBuildRawRecord(payload);

      return {
        project_id: input.project_id,
        job_name: input.job_name,
        exists: typeof payload === "boolean"
          ? payload
          : typeof envelope?.result === "boolean"
            ? envelope.result
            : typeof envelope?.exists === "boolean"
              ? envelope.exists
              : undefined,
        raw
      };
    },
    async getJobBuildSuccessRatio(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        repository_name: input.repository_name,
        branch: input.branch,
        interval: String(input.interval)
      });
      const response = await _http.get(`/v1/report/ratio?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        repository_name: input.repository_name,
        branch: input.branch,
        interval: input.interval,
        raw: readBuildRawRecord(payload)
      };
    },
    async getLastHistoryV3(input) {
      const query = new URLSearchParams({
        repository_name: input.repository_name
      });
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.project_id)}/last-history?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        project_id: input.project_id,
        repository_name: input.repository_name,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobSuccessRatioV3(input) {
      const query = new URLSearchParams({
        start_time: input.start_time,
        end_time: input.end_time
      });
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.job_id)}/success-ratio?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        start_time: input.start_time,
        end_time: input.end_time,
        raw: readBuildRawRecord(payload)
      };
    },
    async listPeriodHistoryV3(input) {
      const query = new URLSearchParams({
        offset: String(Math.max(0, input.page - 1)),
        limit: String(input.page_size),
        start_time: input.start_time,
        end_time: input.end_time
      });
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.job_id)}/period-history?${query.toString()}`);
      const payload = readBuildPayload(response);
      const raw = readBuildRawRecord(payload);
      const records = readBuildArray<Record<string, unknown>>(
        payload.history_records ??
          payload.records ??
          payload.items ??
          payload.list
      );

      return {
        records,
        total: readBuildTotal(payload, response, records.length),
        raw
      };
    },
    async listBuildInfoRecordsV3(input) {
      const query = new URLSearchParams({
        start_time: input.start_time,
        end_time: input.end_time,
        page_index: String(Math.max(0, input.page - 1)),
        page_size: String(input.page_size)
      });
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.job_id)}/build-info-records?${query.toString()}`);
      const payload = readBuildPayload(response);
      const raw = readBuildRawRecord(payload);
      const records = readBuildArray<Record<string, unknown>>(
        payload.job_build_states ??
          payload.history_records ??
          payload.records ??
          payload.items ??
          payload.list
      );

      return {
        records,
        total: readBuildTotal(payload, response, records.length),
        raw
      };
    },
    async getJobConfigDiff(input) {
      const query = new URLSearchParams({
        revisedl_no: String(input.revisedl_no),
        original_no: String(input.original_no)
      });
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/diff?${query.toString()}`);
      const payload = readBuildPayloadValue(response);
      const raw = readBuildRawRecord(payload);
      const diff = typeof payload === "string"
        ? payload
        : String(raw.diff ?? raw.value ?? "");

      return {
        job_id: input.job_id,
        revisedl_no: input.revisedl_no,
        original_no: input.original_no,
        diff
      };
    },
    async listRecyclingJobs(input) {
      const query = new URLSearchParams({
        page_index: String(input.page - 1),
        page_size: String(input.page_size)
      });
      if (input.search) {
        query.set("search", input.search);
      }
      const response = await _http.get(`/v1/job/recycling-jobs?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const jobs = readBuildArray<Record<string, unknown>>(
        payload.job_list ?? payload.jobs ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        jobs,
        total: readBuildTotal(payload, response, jobs.length),
        keep_time: payload.keep_time
      };
    },
    async checkJobCountLimit() {
      const response = await _http.get("/v1/job/check/count");
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        value: envelope ? envelope.value ?? envelope.result : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getReportSummary(input) {
      const query = new URLSearchParams({ build_no: String(input.build_no) });
      const response = await _http.get(`/v1/report/${encodeURIComponent(input.job_id)}/summary?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobBuildTime(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        repository_name: input.repository_name,
        branch: input.branch,
        interval: String(input.interval)
      });
      const response = await _http.get(`/v1/report/time?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        repository_name: input.repository_name,
        branch: input.branch,
        interval: input.interval,
        raw: readBuildRawRecord(payload)
      };
    },
    async listJunitCoverageSummaries(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        build_no: String(input.build_no)
      });
      const response = await _http.get(`/v1/report/junit/coverage/list?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const summaries = readBuildArray<Record<string, unknown>>(
        payload.unit_summary_list ??
          payload.summaries ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        summaries,
        total: readBuildTotal(payload, response, summaries.length)
      };
    },
    async getCoverageMetrics(input) {
      const query = new URLSearchParams({ root_id: input.root_id });
      const response = await _http.get(
        `/v1/report/${encodeURIComponent(input.job_id)}/${input.build_no}/coverage/metrics?${query.toString()}`
      );
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        root_id: input.root_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async listJobPermissionRoles(input) {
      const query = new URLSearchParams({ job_id: input.job_id });
      const response = await _http.get(`/v1/job/permission/role?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const roles = readBuildArray<Record<string, unknown>>(
        payload.roles ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        roles,
        total: readBuildTotal(payload, response, roles.length)
      };
    },
    async getJobPermissionInternal() {
      const response = await _http.get("/v1/job/permission/internal");
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        value: envelope ? envelope.value ?? envelope.result : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobPermission(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        job_id: input.job_id
      });
      const response = await _http.get(`/v1/job/permission?${query.toString()}`);
      const payload = readBuildPayload(response);

      return {
        project_id: input.project_id,
        job_id: input.job_id,
        raw: payload
      };
    },
    async getJobInfo(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/info`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async getBuildDetails(input) {
      const response = await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/${input.build_no}/build-info`
      );
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        raw: readBuildRawRecord(payload)
      };
    },
    async getOutputInfoV3(input) {
      const response = await _http.get(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/${input.build_no}/output-info`
      );
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        raw: readBuildRawRecord(payload)
      };
    },
    async getRecordInfoV4(input) {
      const response = await _http.get(
        `/v4/jobs/${encodeURIComponent(input.job_id)}/${input.build_no}/record-info`
      );
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        raw: readBuildRawRecord(payload)
      };
    },
    async getTaskLogPage(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        build_no: String(input.build_no),
        step_id: String(input.step_id),
        start_offset: String(input.start_offset),
        end_offset: String(input.end_offset),
        sort: input.sort
      });
      const response = await _http.get(`/v1/log/task/page?${query.toString()}`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        step_id: input.step_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async getProjectDefaultPermission(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        job_id: input.job_id
      });
      const response = await _http.get(`/v1/job/project/default-permission?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const permissions = readBuildArray<Record<string, unknown>>(
        payload.permissions ??
          payload.roles ??
          payload.value ??
          payload.items ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        project_id: input.project_id,
        job_id: input.job_id,
        permissions,
        total: readBuildTotal(payload, response, permissions.length)
      };
    },
    async listOfficialTemplates(input) {
      const query = new URLSearchParams({
        page: String(input.page - 1),
        page_size: String(input.page_size)
      });
      if (input.name) {
        query.set("name", input.name);
      }
      const response = await _http.get(`/v1/template/officialtemplates?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const templates = readBuildArray<Record<string, unknown>>(
        payload.items ??
          payload.templates ??
          payload.value ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        templates,
        total: readBuildTotal(payload, response, templates.length)
      };
    },
    async listTemplates(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.name) {
        query.set("name", input.name);
      }
      const response = await _http.get(`/v3/templates/query?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const templates = readBuildArray<Record<string, unknown>>(
        payload.items ??
          payload.templates ??
          payload.value ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        templates,
        total: readBuildTotal(payload, response, templates.length)
      };
    },
    async listCustomTemplates(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.name) {
        query.set("name", input.name);
      }
      if (input.filter) {
        query.set("filter", input.filter);
      }
      const response = await _http.get(`/v1/template/custom?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const templates = readBuildArray<Record<string, unknown>>(
        payload.items ??
          payload.templates ??
          payload.value ??
          payload.list ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        templates,
        total: readBuildTotal(payload, response, templates.length)
      };
    },
    async showPackageSpecCountdown(input) {
      const response = await _http.post("/v2/resource/countdown", input.body ?? {});
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async listJobUpdateHistory(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/history`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const history = readBuildArray<Record<string, unknown>>(
        payload.history ?? payload.records ?? payload.items ?? payload.list ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        history,
        total: readBuildTotal(payload, response, history.length)
      };
    },
    async getJobOutput(input) {
      const response = await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/${input.build_no}/output`
      );
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobStepStatus(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/status`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobPipelineInfo(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/pipeline-info`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async listProjectEndpoints(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.project_id)}/nexus`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const endpoints = readBuildArray<Record<string, unknown>>(
        payload.endpoints ?? payload.nexus ?? payload.items ?? payload.list ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        endpoints,
        total: readBuildTotal(payload, response, endpoints.length)
      };
    },
    async showDomainsStatuses(input) {
      const response = await _http.post("/v1/domain/domains-statuses", input.body ?? {});
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async listJobBadgeBranches(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/badge/branches`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const branches = readBuildArray<Record<string, unknown>>(
        payload.branches ?? payload.items ?? payload.list ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        branches,
        total: readBuildTotal(payload, response, branches.length)
      };
    },
    async getRunningStepLog(input) {
      const response = await _http.get(`/v1/log/task/step${buildOptionalQuerySuffix(input.query)}`);
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async getStageLogPage(input) {
      const response = await _http.get(`/v1/log/stage/page${buildOptionalQuerySuffix(input.query)}`);
      const payload = readBuildPayloadValue(response);

      return { raw: readBuildRawRecord(payload) };
    },
    async downloadFullLog(input) {
      const response = await _http.get(`/v1/log/${encodeURIComponent(input.record_id)}/download-log`);
      const payload = readBuildPayloadValue(response);

      return {
        record_id: input.record_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async downloadTaskLog(input) {
      const response = await _http.get(`/v1/log/${encodeURIComponent(input.record_id)}/task-log`);
      const payload = readBuildPayloadValue(response);

      return {
        record_id: input.record_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async downloadBuildLogV4(input) {
      const response = await _http.getBinary(
        `/v4/${encodeURIComponent(input.record_id)}/download-log${buildOptionalQuerySuffix({
          log_level: input.log_level
        })}`
      );

      return {
        record_id: input.record_id,
        log_level: input.log_level,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async downloadLogByRecordIdV3(input) {
      const response = await _http.getBinary(
        `/v3/${encodeURIComponent(input.record_id)}/download-log`
      );

      return {
        record_id: input.record_id,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async downloadTaskLogV4(input) {
      const response = await _http.getBinary(
        `/v4/${encodeURIComponent(input.record_id)}/task-log${buildOptionalQuerySuffix({
          task_name: input.task_name,
          log_level: input.log_level
        })}`
      );

      return {
        record_id: input.record_id,
        task_name: input.task_name,
        log_level: input.log_level,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async getTemplate(input) {
      const response = await _http.get(`/v1/template/${encodeURIComponent(input.uuid)}/custom`);
      const payload = readBuildPayloadValue(response);

      return {
        uuid: input.uuid,
        raw: readBuildRawRecord(payload)
      };
    },
    async getYamlTemplate(input) {
      const response = await _http.get(`/v1/template/${encodeURIComponent(input.job_id)}/default-template`);
      const payload = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async listRecommendedOfficialTemplates(input) {
      const response = await _http.post("/v1/template/recommend", input.body ?? {});
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const templates = readBuildArray<Record<string, unknown>>(
        payload.templates ?? payload.items ?? payload.list ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        templates,
        total: readBuildTotal(payload, response, templates.length)
      };
    },
    async downloadKeystoreV2(input) {
      const query = new URLSearchParams({
        name: input.name,
        domain_id: input.domain_id,
        id: input.id
      });
      const response = await _http.getBinary(`/v2/keystore/download?${query.toString()}`);

      return {
        name: input.name,
        domain_id: input.domain_id,
        id: input.id,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async downloadKeystoreV3(input) {
      const query = new URLSearchParams({
        file_name: input.file_name,
        domain_id: input.domain_id
      });
      const response = await _http.getBinary(`/v3/keystore?${query.toString()}`);

      return {
        file_name: input.file_name,
        domain_id: input.domain_id,
        body: response.body,
        content_type: response.contentType,
        file_name_from_header: response.fileName
      };
    },
    async listKeystoreFiles(input) {
      const response = await _http.get(`/v2/keystore/list${buildOptionalQuerySuffix(input.query)}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const files = readBuildArray<Record<string, unknown>>(
        payload.files ?? payload.keystores ?? payload.items ?? payload.list ?? payload.value ?? (Array.isArray(raw) ? raw : [])
      );

      return {
        files,
        total: readBuildTotal(payload, response, files.length)
      };
    },
    async listUsableKeystoreNames() {
      const response = await _http.get("/v2/keystore/name");
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const files = readBuildArray<Record<string, unknown>>(
        payload.files ??
          payload.keystores ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        files,
        total: readBuildTotal(payload, response, files.length)
      };
    },
    async getKeystorePermission(input) {
      const response = await _http.get(
        `/v2/keystore/permission/${encodeURIComponent(input.keystore_id)}/query`
      );
      const payload = readBuildPayloadValue(response);

      return {
        keystore_id: input.keystore_id,
        raw: readBuildRawRecord(payload)
      };
    },
    async getRealTimeLog(input) {
      const query = new URLSearchParams({
        offset: String(input.offset)
      });
      const response = unwrapBuildPayload((await _http.get(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/${input.build_no}/real-time-log?${query.toString()}`
      )) as {
        result?: {
          has_more_data?: boolean;
          offset?: number;
          content?: string;
          current_offset?: number;
        };
        status?: string;
      });

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
      const cacheKey = buildListJobsCacheKey(input);
      const cached = await listJobsCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const query = new URLSearchParams({
          page_index: String(Math.max(0, input.page - 1)),
          page_size: String(input.page_size),
          offset: String(offset),
          limit: String(input.page_size)
        });

        if (input.keyword) {
          query.set("search", input.keyword);
        }

        const response = unwrapBuildPayload((await _http.get(
          `/v1/job/${encodeURIComponent(input.project_id)}/list?${query.toString()}`
        )) as {
          jobs?: Array<{
            id?: string;
            job_id?: string;
            name?: string;
            job_name?: string;
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
              job_name?: string;
              project_id?: string;
              build_project_id?: string;
              is_running?: boolean;
              description?: string;
            }>;
            job_list?: Array<{
              id?: string;
              job_id?: string;
              name?: string;
              job_name?: string;
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
        });

        const jobs = response.jobs ?? response.result?.jobs ?? response.result?.job_list ?? [];

        return {
          jobs: jobs.map((item) => ({
            job_id: item.job_id ?? item.id ?? "",
            name: item.name ?? item.job_name ?? "",
            project_id: item.project_id,
            build_project_id: item.build_project_id,
            is_running: item.is_running,
            description: item.description
          })),
          total:
            response.total ??
            response.total_count ??
            response.result?.total ??
            response.result?.total_count
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("build_list_jobs");
      }

      return cached.value;
    },
    async listProjectJobsV3(input) {
      const query = new URLSearchParams({
        page_index: String(Math.max(0, input.page - 1)),
        page_size: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = await _http.get(`/v3/${encodeURIComponent(input.project_id)}/jobs?${query.toString()}`);
      const payload = readBuildPayload(response);
      const raw = readBuildRawRecord(payload);
      const rawValue = readBuildPayloadValue(response);
      const value = readBuildRawRecord(rawValue);
      const jobs = readBuildArray<Record<string, unknown>>(
        value.jobs ??
          value.job_list ??
          raw.jobs ??
          raw.job_list
      );
      const total = readBuildTotal(value, raw, jobs.length);

      return {
        jobs,
        total,
        raw
      };
    },
    async listAllJobs(input) {
      const query = new URLSearchParams({
        page_index: String(Math.max(0, input.page - 1)),
        page_size: String(input.page_size)
      });
      if (input.keyword) {
        query.set("search", input.keyword);
      }
      if (input.build_status) {
        query.set("build_status", input.build_status);
      }
      if (input.creator_id) {
        query.set("creator_id", input.creator_id);
      }
      if (input.sort_field) {
        query.set("sort_field", input.sort_field);
      }
      if (input.sort_type) {
        query.set("sort_type", input.sort_type);
      }
      const response = await _http.get(`/v1/job/list?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const rawRecord = readBuildRawRecord(raw);
      const jobs = readBuildArray<Record<string, unknown>>(
        rawRecord.jobs ??
          rawRecord.job_list ??
          payload.jobs ??
          payload.job_list ??
          payload.items ??
          payload.list
      );

      return {
        jobs,
        total: readBuildTotal(rawRecord, payload, jobs.length),
        raw: rawRecord
      };
    },
    async listBriefRecords(input) {
      const body = {
        ...input.body,
        build_project_ids: input.build_project_ids
      };
      const response = await _http.post("/v1/record/brief", body);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const rawRecord = readBuildRawRecord(raw);
      const records = readBuildArray<Record<string, unknown>>(
        rawRecord.brief_build_record_dtos ??
          rawRecord.records ??
          rawRecord.items ??
          rawRecord.list ??
          payload.brief_build_record_dtos ??
          payload.records
      );

      return {
        records,
        total: readBuildTotal(rawRecord, payload, records.length),
        raw: rawRecord
      };
    },
    async listJobHistoryV3(input) {
      const query = new URLSearchParams({
        offset: String(Math.max(0, input.page - 1)),
        limit: String(input.page_size)
      });
      if (input.interval !== undefined) {
        query.set("interval", String(input.interval));
      }
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.job_id)}/history?${query.toString()}`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const rawRecord = readBuildRawRecord(raw);
      const records = readBuildArray<Record<string, unknown>>(
        rawRecord.history_records ??
          rawRecord.records ??
          rawRecord.items ??
          rawRecord.list ??
          payload.history_records ??
          payload.records
      );

      return {
        records,
        total: readBuildTotal(rawRecord, payload, records.length),
        raw: rawRecord
      };
    },
    async getJobRunningStatusV3(input) {
      const response = await _http.get(`/v3/jobs/${encodeURIComponent(input.job_id)}/status`);
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        job_id: input.job_id,
        value: envelope ? envelope.value ?? envelope.result ?? envelope.status ?? envelope.is_running : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobNotice(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/notice`);
      const payload = readBuildPayload(response);

      return {
        job_id: input.job_id,
        raw: payload
      };
    },
    async listJobNoticesV3(input) {
      const response = await _http.get(`/v3/jobs/notice/${encodeURIComponent(input.job_id)}/query`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const notices = readBuildArray<Record<string, unknown>>(
        payload.notices ??
          payload.notice_list ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        job_id: input.job_id,
        notices,
        total: readBuildTotal(payload, response, notices.length)
      };
    },
    async getJobRunningStatus(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/running-status`);
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        job_id: input.job_id,
        value: envelope ? envelope.value ?? envelope.result ?? envelope.status : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobDisableCheck(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/check/disable`);
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        job_id: input.job_id,
        value: envelope ? envelope.value ?? envelope.result ?? envelope.disabled : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async getJobCopyName(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/copy-name`);
      const payload = readBuildPayloadValue(response);
      const envelope = readBuildEnvelope(payload);

      return {
        job_id: input.job_id,
        value: envelope ? envelope.value ?? envelope.result ?? envelope.name : payload,
        raw: readBuildRawRecord(payload)
      };
    },
    async listJobGroupTree(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.project_id)}/group/tree`);
      const raw = readBuildPayloadValue(response);
      const payload = readBuildPayload(response);
      const groups = readBuildArray<Record<string, unknown>>(
        payload.groups ??
          payload.trees ??
          payload.items ??
          payload.list ??
          payload.value ??
          (Array.isArray(raw) ? raw : [])
      );

      return {
        groups,
        total: readBuildTotal(payload, response, groups.length)
      };
    },
    async getJob(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/config`
      )) as {
        id?: string;
        job_id?: string;
        name?: string;
        job_name?: string;
        project_id?: string;
        description?: string;
        flavor?: string;
        host_type?: string;
        build_environment_type?: string;
        scms?: Array<{
          url?: string;
          branch?: string;
          repo_id?: string;
          repo_name?: string;
          scm_type?: string;
        }>;
        steps?: Array<{
          name?: string;
          module_id?: string;
          enable?: boolean;
          properties?: {
            image?: string;
            command?: string;
            preCondition?: string;
            file?: string;
            name?: string;
            buildVersion?: string;
            customUploadPath?: string;
            remainOriginPath?: string;
            uploadTool?: string;
          };
        }>;
        result?: {
          id?: string;
          job_id?: string;
          name?: string;
          job_name?: string;
          project_id?: string;
          description?: string;
          flavor?: string;
          host_type?: string;
          build_environment_type?: string;
          scms?: Array<{
            url?: string;
            branch?: string;
            repo_id?: string;
            repo_name?: string;
            scm_type?: string;
          }>;
          steps?: Array<{
            name?: string;
            module_id?: string;
            enable?: boolean;
            properties?: {
              image?: string;
              command?: string;
              preCondition?: string;
              file?: string;
              name?: string;
              buildVersion?: string;
              customUploadPath?: string;
              remainOriginPath?: string;
              uploadTool?: string;
            };
          }>;
        };
      });

      const item = response.result ?? response;
      const steps = (item.steps ?? []).map((step) => ({
        name: step.name,
        module_id: step.module_id,
        enable: step.enable,
        image: step.properties?.image,
        command: step.properties?.command,
        pre_condition: step.properties?.preCondition,
        properties: step.properties
      }));
      const scmRepositories = (item.scms ?? []).map((scm) => ({
        url: scm.url,
        branch: scm.branch,
        repo_id: scm.repo_id,
        repo_name: scm.repo_name,
        scm_type: scm.scm_type
      }));

      return {
        job_id: item.job_id ?? item.id ?? input.job_id,
        name: item.name ?? item.job_name ?? "",
        project_id: item.project_id,
        description: item.description,
        flavor: item.flavor,
        host_type: item.host_type,
        build_environment_type: item.build_environment_type,
        step_count: steps.length,
        primary_image: steps[0]?.image,
        scm_repositories: scmRepositories,
        steps
      };
    },
    async listJobConfigV3(input) {
      const response = await _http.get(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/query${buildOptionalQuerySuffix({
          ...(input.get_all_params ? { get_all_params: input.get_all_params } : {})
        })}`
      );
      const raw = readBuildPayloadValue(response);

      return {
        job_id: input.job_id,
        raw: readBuildRawRecord(raw)
      };
    },
    async listRecords(input) {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 30 * 24 * 60 * 60 * 1000);
      const query = new URLSearchParams({
        page_index: String(Math.max(0, input.page - 1)),
        page_size: String(input.page_size),
        start_time: formatBuildQueryTime(startTime),
        end_time: formatBuildQueryTime(endTime)
      });
      const response = unwrapBuildPayload((await _http.get(
        `/v1/record/${encodeURIComponent(input.job_id)}/list?${query.toString()}`
      )) as {
        records?: Array<{
          record_id?: string;
          id?: string;
          job_id?: string;
          status?: string;
          trigger_type?: string;
        }>;
        result?: {
          total_record?: string | number;
          job_build_states?: Array<{
            number?: string | number;
            state?: string;
            trigger_type?: string;
            daily_build_number?: string;
          }>;
        };
        total?: number;
        total_count?: number;
      });
      const records =
        response.records ??
        response.result?.job_build_states?.map((item) => ({
          id:
            item.number === undefined
              ? ""
              : `${input.job_id}#${String(item.number)}`,
          build_no:
            item.number === undefined
              ? undefined
              : Number.isNaN(Number(item.number))
                ? undefined
                : Number(item.number),
          daily_build_number: item.daily_build_number,
          job_id: input.job_id,
          status: item.state,
          trigger_type: item.trigger_type
        })) ??
        [];

      return {
        records: records.map((item: {
          record_id?: string;
          id?: string;
          job_id?: string;
          build_no?: number | string;
          number?: number | string;
          daily_build_number?: string;
          status?: string;
          trigger_type?: string;
        }) => ({
          record_id: item.record_id ?? item.id ?? "",
          job_id: item.job_id,
          build_no:
            item.build_no === undefined
              ? item.number === undefined
                ? undefined
                : Number.isNaN(Number(item.number))
                  ? undefined
                  : Number(item.number)
              : Number.isNaN(Number(item.build_no))
                ? undefined
                : Number(item.build_no),
          daily_build_number: item.daily_build_number,
          status: item.status,
          trigger_type: item.trigger_type
        })),
        total:
          response.total ??
          response.total_count ??
          (response.result?.total_record === undefined ? undefined : Number(response.result.total_record))
      };
    },
    async runJob(input) {
      const config = unwrapBuildPayload((await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/config`
      )) as {
        result?: {
          scms?: Array<{
            branch?: string;
          }>;
        };
      });
      const configuredBranch = config.result?.scms?.[0]?.branch;
      const effectiveBranch = input.branch ?? configuredBranch;
      const response = unwrapBuildPayload((await _http.post("/v1/job/execute", {
        job_id: input.job_id,
        branch: effectiveBranch,
        scm:
          effectiveBranch === undefined
            ? undefined
            : {
                branch: effectiveBranch,
                build_type: "branch"
              }
      })) as {
        job_id?: string;
        record_id?: string;
        build_no?: number;
        actual_build_number?: string | number;
        daily_build_number?: string;
        status?: string;
        result?: {
          job_id?: string;
          record_id?: string;
          build_no?: number;
          actual_build_number?: string | number;
          daily_build_number?: string;
          status?: string;
        };
      });

      const item = response.result ?? response;
      const buildNo =
        item.build_no ??
        (item.actual_build_number === undefined ? undefined : Number(item.actual_build_number));

      return {
        job_id: item.job_id ?? input.job_id,
        record_id: item.record_id,
        build_no: Number.isNaN(buildNo) ? undefined : buildNo,
        daily_build_number: item.daily_build_number,
        status: item.status ?? "success"
      };
    },
    async runJobV3(input) {
      const effectiveScm =
        input.scm ??
        (input.branch === undefined
          ? undefined
          : {
              branch: input.branch,
              build_type: "branch"
            });
      const response = await _http.post("/v3/jobs/build", {
        ...input.body,
        job_id: input.job_id,
        ...(input.parameter === undefined ? {} : { parameter: input.parameter }),
        ...(effectiveScm === undefined ? {} : { scm: effectiveScm })
      });
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const item = readBuildPayload(response) as {
        job_id?: string;
        record_id?: string;
        build_no?: number;
        actual_build_number?: string | number;
        daily_build_number?: string;
        status?: string;
      };
      const buildNo =
        item.build_no ??
        (item.actual_build_number === undefined ? undefined : Number(item.actual_build_number));

      return {
        job_id: item.job_id ?? input.job_id,
        record_id: item.record_id,
        build_no: Number.isNaN(buildNo) ? undefined : buildNo,
        daily_build_number: item.daily_build_number,
        status: item.status,
        raw
      };
    },
    async getRecord(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v1/record/${encodeURIComponent(input.record_id)}/info`
      )) as {
        record_id?: string;
        id?: string;
        job_id?: string;
        status?: string;
        status_code?: number;
        trigger_type?: string;
        commit_id?: string;
        branch?: string;
        repository?: string;
        execution_id?: string | number;
        err_msg?: string;
        build_yml_path?: string;
        daily_build_number?: string;
        result?: {
          record_id?: string;
          id?: string;
          job_id?: string;
          status?: string;
          status_code?: number;
          trigger_type?: string;
          commit_id?: string;
          branch?: string;
          repository?: string;
          execution_id?: string | number;
          err_msg?: string;
          build_yml_path?: string;
          daily_build_number?: string;
        };
      });
      const item = (response.result ?? response) as {
        record_id?: string;
        id?: string;
        job_id?: string;
        status?: string;
        status_code?: number;
        trigger_type?: string;
        commit_id?: string;
        revision?: string;
        branch?: string;
        repository?: string;
        execution_id?: string | number;
        err_msg?: string;
        build_yml_path?: string;
        daily_build_number?: string;
      };

      return {
        record_id: item.record_id ?? item.id ?? input.record_id,
        job_id: item.job_id,
        status: item.status,
        status_code: item.status_code,
        trigger_type: item.trigger_type,
        commit_id: item.commit_id ?? item.revision,
        branch: item.branch,
        repository: item.repository,
        execution_id:
          item.execution_id === undefined ? undefined : String(item.execution_id),
        error_message: item.err_msg,
        build_yml_path: item.build_yml_path,
        daily_build_number: item.daily_build_number
      };
    },
    async stopJob(input) {
      const rawResponse = await _http.post("/v3/jobs/stop", {
        job_id: input.job_id,
        build_no: String(input.build_no)
      });
      if (
        rawResponse === null ||
        rawResponse === undefined ||
        (typeof rawResponse === "string" && rawResponse.trim() === "")
      ) {
        return {
          job_id: input.job_id,
          build_no: input.build_no,
          result: true
        };
      }
      const parsedResponse =
        typeof rawResponse === "string" && rawResponse.trim().startsWith("{")
          ? JSON.parse(rawResponse)
          : rawResponse;
      const response = unwrapBuildPayload(parsedResponse as {
        result?: boolean;
      });

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        result: response.result
      };
    },
    async stopJobV1(input) {
      const rawResponse = await _http.post(
        `/v1/job/${encodeURIComponent(input.job_id)}/stop`,
        { build_no: input.build_no }
      );
      if (
        rawResponse === null ||
        rawResponse === undefined ||
        (typeof rawResponse === "string" && rawResponse.trim() === "")
      ) {
        return {
          job_id: input.job_id,
          build_no: input.build_no,
          result: true,
          raw: {}
        };
      }
      const payload = readBuildPayload(rawResponse) as {
        status?: string;
        result?: boolean;
      };

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        status: payload.status,
        result: payload.result ?? payload.status === "success",
        raw: readBuildRawRecord(readBuildPayloadValue(rawResponse))
      };
    },
    async deleteJob(input) {
      const response = unwrapBuildPayload((await _http.delete(
        `/v1/job/${encodeURIComponent(input.job_id)}/delete`
      )) as {
        status?: string;
        result?: {
          job_id?: string;
          project_id?: string;
        };
      });
      const item = response.result ?? {};

      return {
        job_id: item.job_id ?? input.job_id,
        project_id: item.project_id,
        status: response.status
      };
    },
    async disableJob(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.job_id)}/disable`,
        {
          disabled: input.disabled,
          reason: input.reason ?? ""
        }
      )) as {
        status?: string;
      });

      return {
        job_id: input.job_id,
        disabled: input.disabled,
        reason: input.reason,
        status: response.status
      };
    },
    async setKeepTime(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/job/keep-time", {
        keep_time: input.keep_time
      })) as {
        status?: string;
        result?: {
          keep_time?: string | number;
        };
      });
      const value = response.result?.keep_time;

      return {
        keep_time:
          value === undefined || Number.isNaN(Number(value))
            ? input.keep_time
            : Number(value),
        status: response.status
      };
    },
    async deleteRecyclingJobs(input) {
      const response = unwrapBuildPayload((await _http.delete("/v1/job/recycling-deletion", {
        job_ids: input.job_ids
      })) as {
        status?: string;
      });

      return {
        job_ids: input.job_ids,
        status: response.status
      };
    },
    async clearRecyclingJobs() {
      const response = unwrapBuildPayload((await _http.delete("/v1/job/recycling-empty")) as {
        status?: string;
      });

      return {
        status: response.status
      };
    },
    async restoreRecyclingJobs(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/job/recycling-restoration", {
        job_ids: input.job_ids
      })) as {
        status?: string;
      });

      return {
        job_ids: input.job_ids,
        status: response.status
      };
    },
    async followJob(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.job_id)}/follow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        job_id: input.job_id,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async unfollowJob(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.job_id)}/unfollow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        job_id: input.job_id,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async deleteTemplate(input) {
      const response = unwrapBuildPayload((await _http.delete(
        `/v1/template/${encodeURIComponent(input.uuid)}/delete`
      )) as {
        status?: string;
      });

      return {
        uuid: input.uuid,
        status: response.status
      };
    },
    async saveTemplateUsedInfo(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/template/used-info", {
        job_id: input.job_id,
        template_id: input.template_id
      })) as {
        status?: string;
        result?: string;
      });

      return {
        job_id: input.job_id,
        template_id: input.template_id,
        status: response.status,
        result: response.result
      };
    },
    async followCustomTemplate(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/template/custom/${encodeURIComponent(input.uuid)}/follow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        uuid: input.uuid,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async unfollowCustomTemplate(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/template/custom/${encodeURIComponent(input.uuid)}/unfollow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        uuid: input.uuid,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async followOfficialTemplate(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/template/official/${encodeURIComponent(input.uuid)}/follow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        uuid: input.uuid,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async unfollowOfficialTemplate(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/template/official/${encodeURIComponent(input.uuid)}/unfollow`
      )) as {
        status?: string;
        result?: {
          favorite?: boolean;
        };
      });

      return {
        uuid: input.uuid,
        favorite: response.result?.favorite,
        status: response.status
      };
    },
    async deleteKeystore(input) {
      const response = unwrapBuildPayload((await _http.delete(
        `/v2/keystore/${encodeURIComponent(input.keystore_id)}/delete`
      )) as {
        status?: string;
      });

      return {
        keystore_id: input.keystore_id,
        status: response.status
      };
    },
    async deleteKeystorePermission(input) {
      const response = unwrapBuildPayload((await _http.delete(
        `/v2/keystore/permission/${encodeURIComponent(input.permission_id)}/delete`
      )) as {
        status?: string;
      });

      return {
        permission_id: input.permission_id,
        status: response.status
      };
    },
    async deleteJobV3(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/delete`
      )) as {
        status?: string;
        result?: {
          job_id?: string;
          project_id?: string;
        };
      });

      return {
        job_id: response.result?.job_id ?? input.job_id,
        project_id: response.result?.project_id,
        status: response.status
      };
    },
    async recoverJobV3(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/recover`
      )) as {
        status?: string;
      });

      return {
        job_id: input.job_id,
        status: response.status
      };
    },
    async disableJobV3(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v3/jobs/${encodeURIComponent(input.job_id)}/disable`
      )) as {
        status?: string;
      });

      return {
        job_id: input.job_id,
        status: response.status
      };
    },
    async checkWebhookUrl(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/job/check/webhook-url", {
        job_id: input.job_id,
        notice_type: input.notice_type,
        webhook_url: input.webhook_url
      })) as {
        status?: string;
        result?: string;
      });

      return {
        job_id: input.job_id,
        notice_type: input.notice_type,
        webhook_url: input.webhook_url,
        status: response.status,
        result: response.result
      };
    },
    async autoExecuteJob(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.job_id)}/auto-execute`,
        {
          ...(input.event_type === undefined ? {} : { event_type: input.event_type }),
          ...(input.ref === undefined ? {} : { ref: input.ref }),
          ...(input.after === undefined ? {} : { after: input.after }),
          ...(input.before === undefined ? {} : { before: input.before }),
          ...(input.commits === undefined ? {} : { commits: input.commits }),
          ...(input.repository === undefined ? {} : { repository: input.repository })
        }
      )) as {
        status?: string;
        result?: Record<string, unknown>;
      });

      return {
        job_id: input.job_id,
        status: response.status,
        result: response.result
      };
    },
    async batchUpdateJobPermissions(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/job/permissions/batch", {
        project_id: input.project_id,
        job_ids: input.job_ids,
        ...(input.project_switch === undefined ? {} : { project_switch: input.project_switch }),
        permissions: input.permissions
      })) as {
        status?: string;
      });

      return {
        project_id: input.project_id,
        job_ids: input.job_ids,
        status: response.status
      };
    },
    async batchDeleteJobs(input) {
      const response = unwrapBuildPayload((await _http.delete("/v1/job/batch-delete", {
        job_ids: input.job_ids
      })) as {
        status?: string;
        result?: {
          project_id?: string;
          job_id?: string;
        };
      });

      return {
        job_ids: input.job_ids,
        project_id: response.result?.project_id,
        deleted_job_id: response.result?.job_id,
        status: response.status
      };
    },
    async batchSetAgency(input) {
      const response = unwrapBuildPayload((await _http.post("/v1/job/batch-agency", {
        job_ids: input.job_ids,
        ...(input.agency_urn === undefined ? {} : { agency_urn: input.agency_urn })
      })) as {
        status?: string;
      });

      return {
        job_ids: input.job_ids,
        agency_urn: input.agency_urn,
        status: response.status
      };
    },
    async updateJobRolePermission(input) {
      const response = unwrapBuildPayload((await _http.put("/v1/job/role-permission", {
        job_id: input.job_id,
        role_id: input.role_id,
        permission_name: input.permission_name,
        permission_value: input.permission_value
      })) as {
        status?: string;
      });

      return {
        job_id: input.job_id,
        role_id: input.role_id,
        permission_name: input.permission_name,
        permission_value: input.permission_value,
        status: response.status
      };
    },
    async moveJobGroup(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.project_id)}/group/move`,
        {
          group_id: input.group_id,
          jobs: input.jobs
        }
      )) as {
        status?: string;
        result?: Array<{
          job_id?: string;
          group_path_id?: string;
        }>;
      });

      return {
        project_id: input.project_id,
        group_id: input.group_id,
        jobs: response.result ?? [],
        status: response.status
      };
    },
    async updateJobGroup(input) {
      const payload = {
        ...input.body,
        id: input.id,
        name: input.name,
        ...(input.parent_id ? { parent_id: input.parent_id } : {}),
        ...(input.ordinal === undefined ? {} : { ordinal: input.ordinal }),
        ...(input.path_id ? { path_id: input.path_id } : {})
      };
      const response = await _http.put(
        `/v1/job/${encodeURIComponent(input.project_id)}/group/update`,
        payload
      );
      const payloadRecord = readBuildPayload(response);

      return {
        project_id: input.project_id,
        id: input.id,
        name: input.name,
        parent_id: input.parent_id,
        ordinal: input.ordinal,
        path_id: input.path_id,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw: readBuildRawRecord(readBuildPayloadValue(response))
      };
    },
    async deleteJobGroup(input) {
      const query = new URLSearchParams({
        id: input.id
      });
      const response = unwrapBuildPayload((await _http.delete(
        `/v1/job/${encodeURIComponent(input.project_id)}/group/delete?${query.toString()}`
      )) as {
        status?: string;
        result?: unknown;
      });

      return {
        project_id: input.project_id,
        id: input.id,
        status: response.status,
        result: response.result
      };
    },
    async swapJobGroup(input) {
      const query = new URLSearchParams({
        source_group_id: input.source_group_id,
        target_group_id: input.target_group_id
      });
      const response = unwrapBuildPayload((await _http.post(
        `/v1/job/${encodeURIComponent(input.project_id)}/group/swap?${query.toString()}`
      )) as {
        status?: string;
      });

      return {
        project_id: input.project_id,
        source_group_id: input.source_group_id,
        target_group_id: input.target_group_id,
        status: response.status
      };
    },
    async addKeystorePermission(input) {
      const response = unwrapBuildPayload((await _http.post("/v2/keystore/permission/add", {
        keystore_id: input.keystore_id,
        user_id: input.user_id,
        user_name: input.user_name,
        setting: input.setting,
        delete: input.delete,
        modify: input.modify,
        usage: input.usage,
        can_absent: input.can_absent
      })) as {
        status?: string;
      });

      return {
        keystore_id: input.keystore_id,
        user_id: input.user_id,
        user_name: input.user_name,
        status: response.status
      };
    },
    async editKeystorePermission(input) {
      const response = unwrapBuildPayload((await _http.post(
        "/v2/keystore/permission/edit",
        {
          id: input.id,
          keystore_id: input.keystore_id,
          user_name: input.user_name,
          modify: input.modify,
          usage: input.usage,
          delete: input.delete,
          can_absent: input.can_absent
        },
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      )) as {
        status?: string;
        result?: string;
      });

      return {
        id: input.id,
        keystore_id: input.keystore_id,
        user_name: input.user_name,
        status: response.status,
        result: response.result
      };
    },
    async createJob(input) {
      const payload = {
        ...input.body,
        project_id: input.project_id,
        job_name: input.job_name,
        ...(input.arch ? { arch: input.arch } : {}),
        ...(typeof input.auto_update_sub_module === "boolean"
          ? { auto_update_sub_module: String(input.auto_update_sub_module) }
          : {}),
        ...(input.flavor ? { flavor: input.flavor } : {})
      };
      const response = await _http.post("/v1/job/create", payload);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const payloadRecord = readBuildPayload(response);

      return {
        project_id: input.project_id,
        job_name: String(payloadRecord.job_name ?? payloadRecord.name ?? input.job_name),
        job_id:
          typeof payloadRecord.job_id === "string"
            ? payloadRecord.job_id
            : typeof payloadRecord.id === "string"
              ? payloadRecord.id
              : undefined,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw
      };
    },
    async createJobV3(input) {
      const payload = {
        ...input.body,
        project_id: input.project_id,
        job_name: input.job_name,
        arch: input.arch,
        ...(typeof input.auto_update_sub_module === "boolean"
          ? { auto_update_sub_module: String(input.auto_update_sub_module) }
          : {}),
        ...(input.flavor ? { flavor: input.flavor } : {}),
        ...(input.host_type ? { host_type: input.host_type } : {}),
        ...(input.build_config_type ? { build_config_type: input.build_config_type } : {}),
        ...(input.description === undefined ? {} : { description: input.description }),
        ...(input.agency_urn ? { agency_urn: input.agency_urn } : {}),
        ...(input.source_code ? { source_code: input.source_code } : {}),
        ...(input.parameters === undefined ? {} : { parameters: input.parameters }),
        ...(input.scms === undefined ? {} : { scms: input.scms }),
        ...(input.steps === undefined ? {} : { steps: input.steps })
      };
      const response = await _http.post("/v3/jobs/create", payload);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const payloadRecord = readBuildPayload(response);

      return {
        project_id: input.project_id,
        job_name: String(payloadRecord.job_name ?? payloadRecord.name ?? input.job_name),
        job_id:
          typeof payloadRecord.job_id === "string"
            ? payloadRecord.job_id
            : typeof payloadRecord.id === "string"
              ? payloadRecord.id
              : undefined,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw
      };
    },
    async updateJobV3(input) {
      const payload = {
        ...input.body,
        project_id: input.project_id,
        job_id: input.job_id,
        job_name: input.job_name,
        ...(input.arch ? { arch: input.arch } : {}),
        ...(typeof input.auto_update_sub_module === "boolean"
          ? { auto_update_sub_module: String(input.auto_update_sub_module) }
          : {}),
        ...(input.flavor ? { flavor: input.flavor } : {}),
        ...(input.host_type ? { host_type: input.host_type } : {}),
        ...(input.build_config_type ? { build_config_type: input.build_config_type } : {}),
        ...(input.description === undefined ? {} : { description: input.description }),
        ...(input.agency_urn ? { agency_urn: input.agency_urn } : {}),
        ...(input.source_code ? { source_code: input.source_code } : {}),
        ...(input.parameters === undefined ? {} : { parameters: input.parameters }),
        ...(input.scms === undefined ? {} : { scms: input.scms }),
        ...(input.steps === undefined ? {} : { steps: input.steps })
      };
      const response = await _http.post("/v3/jobs/update", payload);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const payloadRecord = readBuildPayload(response);

      return {
        project_id: input.project_id,
        job_id:
          typeof payloadRecord.job_id === "string"
            ? payloadRecord.job_id
            : typeof payloadRecord.id === "string"
              ? payloadRecord.id
              : input.job_id,
        job_name: String(payloadRecord.job_name ?? payloadRecord.name ?? input.job_name),
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw
      };
    },
    async copyJob(input) {
      const payload = {
        ...input.body,
        project_id: input.project_id,
        copy_job_id: input.copy_job_id,
        job_name: input.job_name,
        ...(input.arch ? { arch: input.arch } : {}),
        ...(typeof input.auto_update_sub_module === "boolean"
          ? { auto_update_sub_module: String(input.auto_update_sub_module) }
          : {}),
        ...(input.flavor ? { flavor: input.flavor } : {})
      };
      const response = await _http.post("/v1/job/copy", payload);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const payloadRecord = readBuildPayload(response);

      return {
        project_id: input.project_id,
        copy_job_id: input.copy_job_id,
        job_name: String(payloadRecord.job_name ?? payloadRecord.name ?? input.job_name),
        job_id:
          typeof payloadRecord.job_id === "string"
            ? payloadRecord.job_id
            : typeof payloadRecord.id === "string"
              ? payloadRecord.id
              : undefined,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw
      };
    },
    async updateJobNotice(input) {
      const payload = {
        ...input.body,
        notice_type: input.notice_type,
        enabled_event_type_names: input.enabled_event_type_names,
        ...(input.send_switch ? { send_switch: input.send_switch } : {}),
        ...(input.webhook_url ? { webhook_url: input.webhook_url } : {})
      };
      const response = await _http.put(`/v1/job/${encodeURIComponent(input.job_id)}/notice`, payload);
      const payloadRecord = readBuildPayload(response);

      return {
        job_id: input.job_id,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw: readBuildRawRecord(readBuildPayloadValue(response))
      };
    },
    async disableJobNotice(input) {
      const query = new URLSearchParams({
        notice_type: input.notice_type.toLowerCase()
      });
      const response = unwrapBuildPayload((await _http.post(
        `/v3/jobs/notice/${encodeURIComponent(input.job_id)}/disable?${query.toString()}`
      )) as {
        status?: string;
      });

      return {
        job_id: input.job_id,
        notice_type: input.notice_type,
        status: response.status
      };
    },
    async createJobGroup(input) {
      const payload = {
        ...input.body,
        project_id: input.project_id,
        name: input.name,
        ...(input.parent_id ? { parent_id: input.parent_id } : {}),
        ...(input.id ? { id: input.id } : {}),
        ...(input.group_id ? { group_id: input.group_id } : {})
      };
      const response = await _http.post(
        `/v1/job/${encodeURIComponent(input.project_id)}/group/create`,
        payload
      );
      const rawValue = readBuildPayloadValue(response);
      const first =
        Array.isArray((rawValue as { result?: unknown }).result)
          ? ((rawValue as { result: Array<Record<string, unknown>> }).result[0] ?? {})
          : readBuildPayload(response);
      const record = readBuildEnvelope(first) ?? {};

      return {
        project_id: String(record.project_id ?? input.project_id),
        id: typeof record.id === "string" ? record.id : undefined,
        group_id: typeof record.group_id === "string" ? record.group_id : undefined,
        name: String(record.name ?? input.name),
        parent_id:
          typeof record.parent_id === "string"
            ? record.parent_id
            : input.parent_id,
        status:
          typeof (readBuildEnvelope(response) ?? {}).status === "string"
            ? String((readBuildEnvelope(response) ?? {}).status)
            : undefined,
        raw: readBuildRawRecord(rawValue)
      };
    },
    async uploadKeystore(input) {
      const form = new FormData();
      form.append(
        "file",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      form.append("privacy", String(input.privacy ?? true));
      if (input.description) {
        form.append("description", input.description);
      }

      const response = await _http.postMultipart("/v2/keystore/upload", form);
      const payloadRecord = readBuildPayload(response);

      return {
        file_name: input.file_name,
        privacy: input.privacy ?? true,
        description: input.description,
        status: typeof payloadRecord.status === "string" ? payloadRecord.status : undefined,
        raw: readBuildRawRecord(readBuildPayloadValue(response))
      };
    },
    async createTemplate(input) {
      const payload = {
        ...input.body,
        name: input.name,
        template: input.template,
        ...(input.description ? { description: input.description } : {}),
        ...(input.tool_type ? { tool_type: input.tool_type } : {}),
        ...(input.parameters ? { parameters: input.parameters } : {}),
        ...(input.resource_limit ? { resource_limit: input.resource_limit } : {})
      };
      const response = await _http.post("/v1/template/create", payload, {
        headers: { "X-Auth-Token": input.x_auth_token }
      });
      const payloadRecord = readBuildPayload(response);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const resultRecord = readBuildEnvelope(payloadRecord.result) ?? {};

      return {
        name: input.name,
        uuid: readBuildString(resultRecord.uuid) ?? readBuildString(payloadRecord.uuid),
        status: readBuildString(payloadRecord.status),
        raw
      };
    },
    async createTemplateV3(input) {
      const payload = {
        ...input.body,
        name: input.name,
        template: input.template,
        ...(input.description ? { description: input.description } : {}),
        ...(input.tool_type ? { tool_type: input.tool_type } : {}),
        ...(input.parameters ? { parameters: input.parameters } : {}),
        ...(input.resource_limit ? { resource_limit: input.resource_limit } : {})
      };
      const response = await _http.post("/v3/templates/create", payload, {
        headers: { "X-Auth-Token": input.x_auth_token }
      });
      const payloadRecord = readBuildPayload(response);
      const raw = readBuildRawRecord(readBuildPayloadValue(response));
      const resultRecord = readBuildEnvelope(payloadRecord.result) ?? {};

      return {
        name: input.name,
        uuid: readBuildString(resultRecord.uuid) ?? readBuildString(payloadRecord.uuid),
        status: readBuildString(payloadRecord.status),
        raw
      };
    },
    async updateKeystore(input) {
      const response = unwrapBuildPayload((await _http.post(
        `/v2/keystore/update/${encodeURIComponent(input.id)}`,
        {
          id: input.id,
          keystore_name: input.keystore_name,
          share: input.share ?? 0,
          ...(typeof input.description === "string" ? { description: input.description } : {})
        },
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      )) as {
        status?: string;
        result?: unknown;
      });

      return {
        id: input.id,
        keystore_name: input.keystore_name,
        share: input.share ?? 0,
        description: input.description,
        status: readBuildString(response.status),
        result: response.result
      };
    },
    async uploadJunitReport(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        build_no: String(input.build_no),
        node_id: input.node_id
      });
      const form = new FormData();
      for (const file of input.files) {
        form.append(
          "files",
          new Blob([Buffer.from(file.file_content)], {
            type: file.content_type ?? "application/octet-stream"
          }),
          file.file_name
        );
      }
      const response = await _http.postMultipart(`/v1/report/junit/report/upload?${query.toString()}`, form);
      const payloadRecord = readBuildPayload(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        node_id: input.node_id,
        file_names: input.files.map((file) => file.file_name),
        status: readBuildString(payloadRecord.status),
        result: payloadRecord.result
      };
    },
    async uploadJunitCoverage(input) {
      const query = new URLSearchParams({
        job_id: input.job_id,
        build_no: String(input.build_no),
        node_id: input.node_id
      });
      const form = new FormData();
      for (const file of input.files) {
        form.append(
          "files",
          new Blob([Buffer.from(file.file_content)], {
            type: file.content_type ?? "application/octet-stream"
          }),
          file.file_name
        );
      }
      const response = await _http.postMultipart(`/v1/report/junit/coverage/upload?${query.toString()}`, form);
      const payloadRecord = readBuildPayload(response);

      return {
        job_id: input.job_id,
        build_no: input.build_no,
        node_id: input.node_id,
        file_names: input.files.map((file) => file.file_name),
        status: readBuildString(payloadRecord.status),
        result: payloadRecord.result
      };
    },
    async updateJobStep(input) {
      const response = unwrapBuildPayload((await _http.get(
        `/v1/job/${encodeURIComponent(input.job_id)}/config`
      )) as {
        result?: RawBuildJobConfig;
      });
      const item = getRawBuildJobConfig(response, input.job_id);

      const targetStep = item.steps?.find((step) => step.name === input.step_name);

      if (!targetStep) {
        throw normalizeProviderError({
          status: 404,
          message: `Build step ${input.step_name} was not found in job ${input.job_id}`
        });
      }

      const updatedSteps = (item.steps ?? []).map((step) => {
        if (step.name !== input.step_name) {
          return step;
        }

        return {
          ...step,
          properties: {
            ...(step.properties ?? {}),
            ...(input.image === undefined ? {} : { image: input.image }),
            ...(input.command === undefined ? {} : { command: input.command }),
            ...(input.pre_condition === undefined
              ? {}
              : { preCondition: input.pre_condition })
          }
        };
      });

      await _http.post("/v1/job/update", buildJobUpdatePayload(item, input.job_id, updatedSteps));

      const updatedTargetStep = updatedSteps.find((step) => step.name === input.step_name);

      return {
        job_id: item.job_id ?? input.job_id,
        name: item.job_name ?? "",
        updated_step_name: input.step_name,
        image:
          typeof updatedTargetStep?.properties?.image === "string"
            ? updatedTargetStep.properties.image
            : undefined,
        command:
          typeof updatedTargetStep?.properties?.command === "string"
            ? updatedTargetStep.properties.command
            : undefined,
        pre_condition:
          typeof updatedTargetStep?.properties?.preCondition === "string"
            ? updatedTargetStep.properties.preCondition
            : undefined
      };
    }
  };
}
