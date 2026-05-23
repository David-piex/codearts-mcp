import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
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
  getJobNotice: (input: { job_id: string }) => Promise<{
    job_id: string;
    raw: Record<string, unknown>;
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
    async getJobNotice(input) {
      const response = await _http.get(`/v1/job/${encodeURIComponent(input.job_id)}/notice`);
      const payload = readBuildPayload(response);

      return {
        job_id: input.job_id,
        raw: payload
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
