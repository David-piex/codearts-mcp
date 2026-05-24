import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";
import { AppError } from "../../core/errors/app-error.js";

type DeployStepState = {
  id?: number;
  name?: string;
  step_name?: string;
  status?: string;
  region?: string;
  offset?: number;
  current_offset?: number;
  elapsed_time?: number;
  enable?: boolean;
  faq_url?: string;
};

type DeployV2OperationInput = Record<string, unknown> & {
  id?: string;
  name?: string;
  description?: string;
  code?: string;
  params?: string;
  entrance?: string;
  version?: string;
  module_id?: string;
};

type DeployApplicationArrangeInfoInput = Record<string, unknown> & {
  template_id: string;
  operation_list: DeployV2OperationInput[];
  id?: string;
  deploy_system?: string;
};

type DeployCreateApplicationInput = {
  project_id: string;
  name: string;
  description?: string;
  timeout?: number | null;
  trigger: {
    trigger_source: string;
    artifact_source_system: string;
    artifact_type: string;
  };
  slave_cluster_id?: string;
  slave_resource_type?: string;
  create_type?: string;
  is_draft?: boolean;
  group_id?: string;
  agency_urn?: string;
  arrange_infos: DeployApplicationArrangeInfoInput[];
};

type DeployModifyApplicationInput = {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  timeout?: number | null;
  trigger: {
    trigger_source: string;
    artifact_source_system: string;
    artifact_type: string;
  };
  slave_cluster_id?: string;
  slave_resource_type?: string;
  create_type?: string;
  is_draft?: boolean;
  group_id?: string;
  agency_urn?: string;
  arrange_infos: DeployApplicationArrangeInfoInput[];
};

type DeployV4ListBodyInput = {
  limit?: number;
  offset?: number;
  keyword?: string;
  name?: string;
  status?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  body?: Record<string, unknown>;
};

type DeployV4RecordActionBodyInput = {
  reason?: string;
  description?: string;
  operator?: string;
  body?: Record<string, unknown>;
};

type DeployV4StepLogBodyInput = {
  offset?: string | number;
  limit?: number;
  start_time?: string;
  end_time?: string;
  body?: Record<string, unknown>;
};

function buildDeployV4ListBody(input: DeployV4ListBodyInput) {
  return {
    ...(input.body ?? {}),
    ...(typeof input.limit !== "undefined" ? { limit: input.limit } : {}),
    ...(typeof input.offset !== "undefined" ? { offset: input.offset } : {}),
    ...(input.keyword ? { keyword: input.keyword } : {}),
    ...(input.name ? { name: input.name } : {}),
    ...(input.status ? { status: input.status } : {}),
    ...(input.sort_by ? { sort_by: input.sort_by } : {}),
    ...(input.sort_order ? { sort_order: input.sort_order } : {})
  };
}

function buildDeployV4RecordActionBody(input: DeployV4RecordActionBodyInput) {
  return {
    ...(input.body ?? {}),
    ...(input.reason ? { reason: input.reason } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.operator ? { operator: input.operator } : {})
  };
}

function buildDeployV4StepLogBody(input: DeployV4StepLogBodyInput) {
  return {
    ...(input.body ?? {}),
    ...(typeof input.offset !== "undefined" ? { offset: input.offset } : {}),
    ...(typeof input.limit !== "undefined" ? { limit: input.limit } : {}),
    ...(input.start_time ? { start_time: input.start_time } : {}),
    ...(input.end_time ? { end_time: input.end_time } : {})
  };
}

function buildDeployArrangeInfoPayload(input: DeployApplicationArrangeInfoInput) {
  const { template_id, operation_list, ...rest } = input;

  return {
    ...rest,
    template_id,
    operation_list
  };
}

function buildCreateApplicationPayload(input: DeployCreateApplicationInput) {
  const {
    project_id,
    name,
    description,
    timeout,
    trigger,
    slave_cluster_id,
    slave_resource_type,
    create_type,
    is_draft,
    group_id,
    agency_urn,
    arrange_infos
  } = input;

  return {
    project_id,
    name,
    description: description ?? "",
    timeout: timeout ?? null,
    trigger,
    slave_cluster_id: slave_cluster_id ?? "",
    slave_resource_type: slave_resource_type ?? "",
    create_type: create_type ?? "template",
    is_draft: is_draft ?? false,
    group_id: group_id ?? "",
    agency_urn: agency_urn ?? "",
    arrange_infos: arrange_infos.map(buildDeployArrangeInfoPayload)
  };
}

function buildModifyApplicationPayload(input: DeployModifyApplicationInput) {
  const {
    id,
    project_id,
    name,
    description,
    timeout,
    trigger,
    slave_cluster_id,
    slave_resource_type,
    create_type,
    is_draft,
    group_id,
    agency_urn,
    arrange_infos
  } = input;

  return {
    id,
    project_id,
    name,
    description: description ?? "",
    timeout: timeout ?? null,
    trigger,
    slave_cluster_id: slave_cluster_id ?? "",
    slave_resource_type: slave_resource_type ?? "",
    create_type: create_type ?? "template",
    is_draft: is_draft ?? false,
    group_id: group_id ?? "",
    agency_urn: agency_urn ?? "",
    arrange_infos: arrange_infos.map(buildDeployArrangeInfoPayload)
  };
}

function asObjectRecord<T extends Record<string, unknown>>(value: unknown): T | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  return value as T;
}

export type DeployClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  listAppHostGroups: (input: {
    application_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    host_groups: Array<{
      group_id: string;
      name: string;
      project_id?: string;
      os?: string;
      host_count?: number;
      env_count?: number;
      description?: string;
    }>;
    total?: number;
  }>;
  listHostGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    host_groups: Array<{
      group_id: string;
      name: string;
      project_id?: string;
      os?: string;
      host_count?: number;
      env_count?: number;
      description?: string;
      nick_name?: string;
      is_proxy_mode?: number;
    }>;
    total?: number;
  }>;
  listHostGroupsV2: (input: {
    project_id?: string;
    page: number;
    page_size: number;
    keyword?: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    host_groups: Array<Record<string, unknown> & {
      group_id: string;
      name?: string;
      project_id?: string;
    }>;
    total?: number;
    raw: unknown;
  }>;
  getHostGroup: (input: { group_id: string }) => Promise<{
    group_id: string;
    name: string;
    os?: string;
    description?: string;
    nick_name?: string;
    is_proxy_mode?: number;
    created_time?: string;
    updated_time?: string;
  }>;
  getHostGroupV2: (input: { group_id: string }) => Promise<{
    group_id: string;
    name?: string;
    raw: unknown;
  }>;
  listHostGroupHosts: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    hosts: Array<{
      host_id: string;
      host_name?: string;
      ip?: string;
      os?: string;
      port?: number;
      as_proxy?: boolean;
      connection_status?: string;
      connection_result?: string;
      env_count?: number;
      lastest_connection_time?: string;
    }>;
    total?: number;
  }>;
  listHostGroupHostsV2: (input: {
    group_id: string;
    page: number;
    page_size: number;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    group_id: string;
    hosts: Array<Record<string, unknown> & {
      host_id: string;
      host_name?: string;
      ip?: string;
    }>;
    total?: number;
    raw: unknown;
  }>;
  getHostGroupHostV2: (input: { group_id: string; host_id: string }) => Promise<{
    group_id: string;
    host_id: string;
    host_name?: string;
    ip?: string;
    raw: unknown;
  }>;
  getHostGroupHost: (input: { group_id: string; host_id: string }) => Promise<{
    group_id: string;
    host_id: string;
    host_name?: string;
    ip?: string;
    raw: unknown;
  }>;
  getHostGroupPermissions: (input: { group_id: string }) => Promise<{
    group_id: string;
    permissions: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
  listHostGroupEnvironments: (input: {
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<{
      environment_id: string;
      application_id?: string;
      application_name?: string;
      name?: string;
      os?: string;
      host_count?: number;
    }>;
    total?: number;
  }>;
  createEnvironment: (input: {
    application_id: string;
    project_id: string;
    name: string;
    os: string;
    deploy_type?: number;
    description?: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    name: string;
    project_id: string;
    os: string;
    deploy_type?: number;
    description?: string;
  }>;
  createApplication: (input: DeployCreateApplicationInput) => Promise<{
    application_id: string;
    name: string;
    task_id?: string;
  }>;
  modifyApplication: (input: DeployModifyApplicationInput) => Promise<{
    application_id: string;
    name: string;
    task_id?: string;
  }>;
  checkApplicationExists: (input: { project_id: string; name: string }) => Promise<{
    project_id: string;
    name: string;
    exists: boolean;
    status?: string;
    raw: unknown;
  }>;
  listApplicationPermissions: (input: { app_id?: string; project_id?: string }) => Promise<{
    app_id?: string;
    project_id?: string;
    permissions: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
  getApplicationMessages: (input: {
    project_id: string;
    app_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    app_id: string;
    messages: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
  listApplicationGroups: (input: { project_id: string }) => Promise<{
    project_id: string;
    groups: Array<Record<string, unknown> & { id?: string; name?: string }>;
    status?: string;
    raw: unknown;
  }>;
  getSuccessRateMetrics: (input: {
    project_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    metrics: Record<string, unknown>;
    status?: string;
    raw: unknown;
  }>;
  getTaskSuccessRateMetrics: (input: {
    project_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    metrics: Record<string, unknown>;
    status?: string;
    raw: unknown;
  }>;
  getEnvironmentPermissions: (input: {
    application_id: string;
    environment_id: string;
  }) => Promise<{
    application_id: string;
    environment_id: string;
    permissions: Array<Record<string, unknown>>;
    status?: string;
    raw: unknown;
  }>;
  checkApplicationCreatable: (input: { project_id: string }) => Promise<{
    project_id: string;
    creatable: boolean;
    status?: string;
    raw: unknown;
  }>;
  createTaskByTemplate: (input: {
    project_id: string;
    project_name: string;
    template_id: string;
    task_name: string;
    configs?: Array<{
      name: string;
      type?: string;
      description?: string;
      value?: string;
      static_status?: number;
      limits?: Array<{ name: string; value?: string }>;
    }>;
  }) => Promise<{
    task_name: string;
    task_id: string;
  }>;
  listEnvironmentHosts: (input: {
    application_id: string;
    environment_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    key_field?: string;
    as_proxy?: boolean;
  }) => Promise<{
    hosts: Array<{
      host_id: string;
      host_name?: string;
      ip?: string;
      os?: string;
      port?: number;
      connection_status?: string;
      connection_result?: string;
    }>;
    total?: number;
  }>;
  importHostsToEnvironment: (input: {
    application_id: string;
    environment_id: string;
    group_id: string;
    host_ids: string[];
  }) => Promise<{
    application_id: string;
    environment_id: string;
    group_id: string;
    host_ids: string[];
    imported: boolean;
  }>;
  listEnvironments: (input: {
    application_id: string;
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<{
      environment_id: string;
      name?: string;
      os_type?: string;
      category?: string;
      instance_count?: number;
    }>;
    total?: number;
  }>;
  getExecutionParams: (input: { task_id: string; record_id: string }) => Promise<{
    task_id: string;
    record_id: string;
    params: Array<{ name?: string; type?: string; value?: string }>;
  }>;
  getRuntimeVariables: (input: { project_id: string; app_id?: string }) => Promise<{
    project_id: string;
    app_id?: string;
    variables: Array<{
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
    }>;
    raw: unknown;
  }>;
  queryVariables: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    variables: Array<{
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
    }>;
    raw: unknown;
  }>;
  listVariables: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    variables: Array<{
      id?: string;
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
    }>;
    raw: unknown;
  }>;
  listVariableHistory: (input: {
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
  }) => Promise<{
    project_id: string;
    level: "app" | "env" | "app_env";
    app_id?: string;
    env_id?: string;
    histories: Array<{
      id?: string;
      name?: string;
      type?: string;
      value?: string;
      static_status?: number;
      is_dynamic?: boolean;
      created_at?: string;
      updated_at?: string;
    }>;
    raw: unknown;
  }>;
  listV4Environments: (input: {
    project_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    total?: number;
    environments: Array<{
      environment_id: string;
      name?: string;
      project_id?: string;
      os?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
  listV4EnvironmentApplications: (input: {
    project_id: string;
    environment_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    total?: number;
    applications: Array<{
      app_id: string;
      name?: string;
      project_id?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
  listDeploymentUnits: (input: {
    project_id: string;
    app_id: string;
  }) => Promise<{
    project_id: string;
    app_id: string;
    deployment_units: Array<{
      id?: string;
      environment_id?: string;
      environment_name?: string;
      cluster_id?: string;
      cluster_name?: string;
      namespace?: string;
    }>;
    raw: unknown;
  }>;
  listV4Orchestrations: (input: {
    project_id: string;
    app_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    app_id: string;
    total?: number;
    orchestrations: Array<{
      id?: string;
      name?: string;
      state?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
  listV4DeployRecords: (input: {
    project_id: string;
    limit: number;
    offset: number;
  }) => Promise<{
    project_id: string;
    total?: number;
    records: Array<{
      id?: string;
      state?: string;
      orchestration_id?: string;
      start_time?: string;
      end_time?: string;
    }>;
    raw: unknown;
  }>;
  getLastRecordDetail: (input: {
    project_id: string;
    orchestration_id: string;
  }) => Promise<{
    project_id: string;
    orchestration_id: string;
    raw: unknown;
  }>;
  getV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    step_id?: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id?: string;
    raw: unknown;
  }>;
  getV4DeployRecordStepDetail: (input: {
    project_id: string;
    record_id: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    raw: unknown;
  }>;
  getV4DeployRecordStepLogs: (input: {
    project_id: string;
    record_id: string;
    step_id: string;
    offset?: string | number;
    limit?: number;
    start_time?: string;
    end_time?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id: string;
    raw: unknown;
  }>;
  cancelV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    reason?: string;
    description?: string;
    operator?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    status?: string;
    raw: unknown;
  }>;
  rerunV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    reason?: string;
    description?: string;
    operator?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    status?: string;
    raw: unknown;
  }>;
  retryV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    reason?: string;
    description?: string;
    operator?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    status?: string;
    raw: unknown;
  }>;
  rollbackV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    reason?: string;
    description?: string;
    operator?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    record_id: string;
    status?: string;
    raw: unknown;
  }>;
  passV4ManualCheck: (input: {
    project_id: string;
    record_id: string;
    step_id: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id: string;
    status?: string;
    raw: unknown;
  }>;
  refuseV4ManualCheck: (input: {
    project_id: string;
    record_id: string;
    step_id: string;
  }) => Promise<{
    project_id: string;
    record_id: string;
    step_id: string;
    status?: string;
    raw: unknown;
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
    step_states?: DeployStepState[];
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
  listV4Applications: (input: {
    project_id: string;
    limit: number;
    offset: number;
    keyword?: string;
  }) => Promise<{
    project_id: string;
    total?: number;
    applications: Array<{
      app_id: string;
      name: string;
      project_id?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
  listV4Clusters: (input: {
    project_id: string;
    cluster_type: "host" | "container";
    limit?: number;
    offset?: number;
    keyword?: string;
    name?: string;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    cluster_type: "host" | "container";
    total?: number;
    clusters: Array<{
      cluster_id: string;
      name?: string;
      cluster_type?: string;
      description?: string;
    }>;
    raw: unknown;
  }>;
  getV4Cluster: (input: {
    project_id: string;
    cluster_id: string;
    cluster_type: "host" | "container";
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    cluster_type: "host" | "container";
    cluster: {
      cluster_id: string;
      name?: string;
      cluster_type?: string;
      description?: string;
    };
    raw: unknown;
  }>;
  getV4ClusterCount: (input: {
    project_id: string;
    cluster_type: "host" | "container";
  }) => Promise<{
    project_id: string;
    cluster_type: "host" | "container";
    counts: Record<string, number>;
    raw: unknown;
  }>;
  getV4ClusterHost: (input: {
    project_id: string;
    cluster_id: string;
    host_id: string;
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    host_id: string;
    host: {
      host_id: string;
      name?: string;
      ip?: string;
      os?: string;
      connection_status?: string;
      status?: string;
    };
    raw: unknown;
  }>;
  listV4ClusterHosts: (input: {
    project_id: string;
    cluster_id: string;
    limit?: number;
    offset?: number;
    keyword?: string;
    name?: string;
    status?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    ip?: string;
    os?: string;
    connection_status?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    total?: number;
    hosts: Array<{
      host_id: string;
      name?: string;
      ip?: string;
      os?: string;
      connection_status?: string;
      status?: string;
    }>;
    raw: unknown;
  }>;
  deleteV4ClusterHosts: (input: {
    project_id: string;
    cluster_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    cluster_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
  }>;
  getV4Environment: (input: {
    project_id: string;
    environment_id: string;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    environment: {
      environment_id: string;
      name?: string;
      description?: string;
    };
    raw: unknown;
  }>;
  getV4EnvironmentResourceDetail: (input: {
    project_id: string;
    environment_id: string;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    raw: unknown;
  }>;
  listV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    query?: Record<string, string | number | boolean>;
  }) => Promise<{
    project_id: string;
    environment_id: string;
    total?: number;
    hosts: Array<{
      host_id: string;
      name?: string;
      ip?: string;
      os?: string;
      connection_status?: string;
      status?: string;
    }>;
    raw: unknown;
  }>;
  addV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    cluster_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    environment_id: string;
    cluster_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
  }>;
  deleteV4EnvironmentHosts: (input: {
    project_id: string;
    environment_id: string;
    host_ids: string[];
  }) => Promise<{
    project_id: string;
    environment_id: string;
    host_ids: string[];
    status?: string;
    raw: unknown;
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
    create_type?: string;
    can_execute?: boolean;
    can_create_env?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    is_disable?: boolean;
    create_time?: string;
    update_time?: string;
    deploy_type?: string;
    description?: string;
    arrange_infos?: Array<{
      id?: string;
      state?: string;
      deploy_system?: string;
      release_id?: number;
      app_component_list?: Array<{
        task_id?: string;
        app_id?: string;
        app_name?: string;
        comp_id?: string;
        comp_name?: string;
        region?: string;
        state?: string;
      }>;
      can_execute?: boolean;
      can_create_env?: boolean;
      steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
    }>;
  }>;
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    application_id?: string;
    name: string;
    project_id?: string;
    state?: string;
    can_execute?: boolean;
    can_create_env?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    is_disable?: boolean;
    create_time?: string;
    update_time?: string;
    steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
    template_id?: string;
    release_id?: number;
    app_component_list?: Array<{
      task_id?: string;
      app_id?: string;
      app_name?: string;
      comp_id?: string;
      comp_name?: string;
      region?: string;
      state?: string;
    }>;
    status?: string;
    deploy_type?: string;
    description?: string;
  }>;
  getDeploySourceDetail: (input: { task_id: string }) => Promise<{
    task_id: string;
    trigger_source?: string;
    artifact_source_system?: string;
    artifact_type?: string;
  }>;
  getTemplateDetail: (input: { template_id: string; task_id?: string }) => Promise<{
    template_id: string;
    task_id?: string;
    name?: string;
    operation_list: unknown[];
    raw: unknown;
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
    trigger_source?: 0 | 1 | "0" | "1";
    params?: Array<{ name?: string; type?: string; value?: string }>;
  }) => Promise<{
    task_id: string;
    record_id?: string;
    job_name?: string;
    status?: string;
    app_component_list?: Array<{
      task_id?: string;
      app_id?: string;
      app_name?: string;
      comp_id?: string;
      comp_name?: string;
      region?: string;
      state?: string;
    }>;
  }>;
  listSystemConfigs: () => Promise<{
    configs: Array<{
      name: string;
      type?: string;
      description?: string;
      static_status?: boolean;
      pipeline_source?: string;
      pipeline_source_type?: string;
    }>;
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
    step_states?: DeployStepState[];
  }>;
};

function asArray<T>(input: unknown): T[] {
  if (Array.isArray(input)) {
    return input as T[];
  }

  return [];
}

function addQueryParams(
  query: URLSearchParams,
  params: Record<string, string | number | boolean> | undefined
) {
  for (const [key, value] of Object.entries(params ?? {})) {
    query.set(key, String(value));
  }
}

function getResultArray<T>(response: { result?: unknown; records?: unknown; total?: number; total_num?: number }) {
  return asArray<T>(response.result ?? response.records);
}

function getResultObject<T extends Record<string, unknown>>(response: { result?: unknown }) {
  return (asObjectRecord<T>(response.result) ?? asObjectRecord<T>(response) ?? {}) as T;
}

export function createDeployClient(_http: ReturnTypeCreateHttpClient): DeployClient {
  return {
    ...createOfficialApiRequester({
      product: "Deploy",
      http: _http,
      allowedPrefixes: ["/v1/", "/v2/", "/v3/", "/v4/"]
    }),
    async listAppHostGroups(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_id,
        page_index: String(input.page),
        page_size: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/applications/${encodeURIComponent(input.application_id)}/host-groups/base/infos?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        id?: string;
        group_id?: string;
        name?: string;
        project_id?: string;
        os?: string;
        host_count?: number;
        env_count?: number;
        description?: string;
      }>(response.result);

      return {
        host_groups: rawItems.map((item) => ({
          group_id: item.group_id ?? item.id ?? "",
          name: item.name ?? "",
          project_id: item.project_id,
          os: item.os,
          host_count: item.host_count,
          env_count: item.env_count,
          description: item.description
        })),
        total: response.total
      };
    },
    async listHostGroups(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        page_index: String(input.page),
        page_size: String(input.page_size)
      });

      if (input.keyword) {
        query.set("name", input.keyword);
      }

      const response = (await _http.get(
        `/v1/resources/host-groups?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        id?: string;
        group_id?: string;
        name?: string;
        project_id?: string;
        os?: string;
        host_count?: number;
        env_count?: number;
        description?: string;
        nick_name?: string;
        is_proxy_mode?: number;
      }>(response.result);

      return {
        host_groups: rawItems.map((item) => ({
          group_id: item.group_id ?? item.id ?? "",
          name: item.name ?? "",
          project_id: item.project_id,
          os: item.os,
          host_count: item.host_count,
          env_count: item.env_count,
          description: item.description,
          nick_name: item.nick_name,
          is_proxy_mode: item.is_proxy_mode
        })),
        total: response.total
      };
    },
    async listHostGroupsV2(input) {
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.keyword) query.set("name", input.keyword);
      addQueryParams(query, input.query);

      const response = (await _http.get(`/v2/host-groups?${query.toString()}`)) as {
        result?: unknown;
        records?: unknown;
        total?: number;
        total_num?: number;
      };
      const rawItems = getResultArray<Record<string, unknown> & {
        id?: string;
        group_id?: string;
        name?: string;
        project_id?: string;
      }>(response);

      return {
        host_groups: rawItems.map((item) => ({
          ...item,
          group_id: String(item.group_id ?? item.id ?? ""),
          name: item.name,
          project_id: item.project_id ?? input.project_id
        })),
        total: response.total ?? response.total_num,
        raw: response.result ?? response.records ?? response
      };
    },
    async getHostGroup(input) {
      const response = (await _http.get(
        `/v1/resources/host-groups/${encodeURIComponent(input.group_id)}`
      )) as {
        id?: string;
        group_id?: string;
        name?: string;
        os?: string;
        description?: string;
        nick_name?: string;
        is_proxy_mode?: number;
        created_time?: string;
        updated_time?: string;
        result?: {
          id?: string;
          group_id?: string;
          name?: string;
          os?: string;
          description?: string;
          nick_name?: string;
          is_proxy_mode?: number;
          created_time?: string;
          updated_time?: string;
        };
      };

      const item = (response.result ?? response) as {
        id?: string;
        group_id?: string;
        name?: string;
        os?: string;
        description?: string;
        nick_name?: string;
        is_proxy_mode?: number;
        created_time?: string;
        updated_time?: string;
      };

      return {
        group_id: item.group_id ?? item.id ?? input.group_id,
        name: item.name ?? "",
        os: item.os,
        description: item.description,
        nick_name: item.nick_name,
        is_proxy_mode: item.is_proxy_mode,
        created_time: item.created_time,
        updated_time: item.updated_time
      };
    },
    async getHostGroupV2(input) {
      const response = (await _http.get(
        `/v2/host-groups/${encodeURIComponent(input.group_id)}`
      )) as { result?: unknown };
      const item = getResultObject<Record<string, unknown> & {
        id?: string;
        group_id?: string;
        name?: string;
      }>(response);

      return {
        group_id: String(item.group_id ?? item.id ?? input.group_id),
        name: item.name,
        raw: response.result ?? response
      };
    },
    async listHostGroupHosts(input) {
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/resources/host-groups/${encodeURIComponent(input.group_id)}/hosts?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        uuid?: string;
        host_id?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        port?: number;
        as_proxy?: boolean;
        connection_status?: string;
        connection_result?: string;
        env_count?: number;
        lastest_connection_time?: string;
      }>(response.result);

      return {
        hosts: rawItems.map((item) => ({
          host_id: item.host_id ?? item.uuid ?? "",
          host_name: item.host_name,
          ip: item.ip,
          os: item.os,
          port: item.port,
          as_proxy: item.as_proxy,
          connection_status: item.connection_status,
          connection_result: item.connection_result,
          env_count: item.env_count,
          lastest_connection_time: item.lastest_connection_time
        })),
        total: response.total
      };
    },
    async listHostGroupHostsV2(input) {
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size)
      });
      addQueryParams(query, input.query);

      const response = (await _http.get(
        `/v2/host-groups/${encodeURIComponent(input.group_id)}/hosts?${query.toString()}`
      )) as {
        result?: unknown;
        records?: unknown;
        total?: number;
        total_num?: number;
      };
      const rawItems = getResultArray<Record<string, unknown> & {
        uuid?: string;
        id?: string;
        host_id?: string;
        host_name?: string;
        ip?: string;
      }>(response);

      return {
        group_id: input.group_id,
        hosts: rawItems.map((item) => ({
          ...item,
          host_id: String(item.host_id ?? item.uuid ?? item.id ?? ""),
          host_name: item.host_name,
          ip: item.ip
        })),
        total: response.total ?? response.total_num,
        raw: response.result ?? response.records ?? response
      };
    },
    async getHostGroupHostV2(input) {
      const response = (await _http.get(
        `/v2/host-groups/${encodeURIComponent(input.group_id)}/hosts/${encodeURIComponent(input.host_id)}`
      )) as { result?: unknown };
      const item = getResultObject<Record<string, unknown> & {
        uuid?: string;
        id?: string;
        host_id?: string;
        host_name?: string;
        ip?: string;
      }>(response);

      return {
        group_id: input.group_id,
        host_id: String(item.host_id ?? item.uuid ?? item.id ?? input.host_id),
        host_name: item.host_name,
        ip: item.ip,
        raw: response.result ?? response
      };
    },
    async getHostGroupHost(input) {
      const response = (await _http.get(
        `/v1/resources/host-groups/${encodeURIComponent(input.group_id)}/hosts/${encodeURIComponent(input.host_id)}`
      )) as { result?: unknown };
      const item = getResultObject<Record<string, unknown> & {
        uuid?: string;
        id?: string;
        host_id?: string;
        host_name?: string;
        ip?: string;
      }>(response);

      return {
        group_id: input.group_id,
        host_id: String(item.host_id ?? item.uuid ?? item.id ?? input.host_id),
        host_name: item.host_name,
        ip: item.ip,
        raw: response.result ?? response
      };
    },
    async getHostGroupPermissions(input) {
      const response = (await _http.get(
        `/v2/host-groups/${encodeURIComponent(input.group_id)}/permissions`
      )) as {
        status?: string;
        result?: unknown;
      };

      return {
        group_id: input.group_id,
        permissions: asArray<Record<string, unknown>>(response.result),
        status: response.status,
        raw: response.result
      };
    },
    async listHostGroupEnvironments(input) {
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/resources/host-groups/${encodeURIComponent(input.group_id)}/environments/infos?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        id?: string;
        environment_id?: string;
        application_id?: string;
        application_name?: string;
        name?: string;
        env_name?: string;
        os?: string;
        os_type?: string;
        host_count?: number;
      }>(response.result);

      return {
        environments: rawItems.map((item) => ({
          environment_id: item.environment_id ?? item.id ?? "",
          application_id: item.application_id,
          application_name: item.application_name,
          name: item.name ?? item.env_name,
          os: item.os ?? item.os_type,
          host_count: item.host_count
        })),
        total: response.total
      };
    },
    async createEnvironment(input) {
      const response = (await _http.post(
        `/v1/applications/${encodeURIComponent(input.application_id)}/environments`,
        {
          project_id: input.project_id,
          name: input.name,
          os: input.os,
          deploy_type: input.deploy_type ?? 0,
          description: input.description
        }
      )) as {
        id?: string;
        environment_id?: string;
        result?: {
          id?: string;
          environment_id?: string;
        };
      };

      const item = (response.result ?? response) as {
        id?: string;
        environment_id?: string;
      };

      return {
        application_id: input.application_id,
        environment_id: item.environment_id ?? item.id ?? "",
        name: input.name,
        project_id: input.project_id,
        os: input.os,
        deploy_type: input.deploy_type ?? 0,
        description: input.description
      };
    },
    async createApplication(input) {
      const response = (await _http.post(
        "/v1/applications",
        buildCreateApplicationPayload(input)
      )) as {
        id?: string;
        application_id?: string;
        name?: string;
        application_name?: string;
        arrange_infos?: Array<{ id?: string; task_id?: string }>;
        result?: {
          id?: string;
          application_id?: string;
          name?: string;
          application_name?: string;
          arrange_infos?: Array<{ id?: string; task_id?: string }>;
        };
      };

      const item = response.result ?? response;
      const firstTask = item.arrange_infos?.[0];

      return {
        application_id: item.application_id ?? item.id ?? "",
        name: item.name ?? item.application_name ?? input.name,
        task_id: firstTask?.task_id ?? firstTask?.id
      };
    },
    async modifyApplication(input) {
      const response = (await _http.put(
        "/v1/applications",
        buildModifyApplicationPayload(input)
      )) as {
        id?: string;
        application_id?: string;
        name?: string;
        application_name?: string;
        arrange_infos?: Array<{ id?: string; task_id?: string }>;
        result?: {
          id?: string;
          application_id?: string;
          name?: string;
          application_name?: string;
          arrange_infos?: Array<{ id?: string; task_id?: string }>;
        };
      };

      const item = response.result ?? response;
      const firstTask = item.arrange_infos?.[0];

      return {
        application_id: item.application_id ?? item.id ?? input.id,
        name: item.name ?? item.application_name ?? input.name,
        task_id: firstTask?.task_id ?? firstTask?.id
      };
    },
    async createTaskByTemplate(input) {
      const response = (await _http.post("/v2/tasks/template-task", {
        project_id: input.project_id,
        project_name: input.project_name,
        template_id: input.template_id,
        task_name: input.task_name,
        configs: input.configs ?? []
      })) as {
        task_name?: string;
        task_id?: string;
        id?: string;
        result?: {
          task_name?: string;
          task_id?: string;
          id?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_name: item.task_name ?? input.task_name,
        task_id: item.task_id ?? item.id ?? ""
      };
    },
    async listEnvironmentHosts(input) {
      const query = new URLSearchParams({
        page_index: String(input.page),
        page_size: String(input.page_size)
      });
      const keyField = input.key_field ?? input.keyword;
      if (keyField) {
        query.set("key_field", keyField);
      }
      if (typeof input.as_proxy !== "undefined") {
        query.set("as_proxy", String(input.as_proxy));
      }

      const response = (await _http.get(
        `/v1/applications/${encodeURIComponent(input.application_id)}/environments/${encodeURIComponent(input.environment_id)}/hosts?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        uuid?: string;
        host_id?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        port?: number;
        connection_status?: string;
        connection_result?: string;
      }>(response.result);

      return {
        hosts: rawItems.map((item) => ({
          host_id: item.host_id ?? item.uuid ?? "",
          host_name: item.host_name,
          ip: item.ip,
          os: item.os,
          port: item.port,
          connection_status: item.connection_status,
          connection_result: item.connection_result
        })),
        total: response.total
      };
    },
    async importHostsToEnvironment(input) {
      await _http.post(
        `/v1/applications/${encodeURIComponent(input.application_id)}/environments/${encodeURIComponent(input.environment_id)}/hosts/import`,
        {
          group_id: input.group_id,
          host_ids: input.host_ids
        }
      );

      return {
        application_id: input.application_id,
        environment_id: input.environment_id,
        group_id: input.group_id,
        host_ids: input.host_ids,
        imported: true
      };
    },
    async listEnvironments(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        page_index: String(input.page),
        page_size: String(input.page_size)
      });

      const response = (await _http.get(
        `/v1/applications/${encodeURIComponent(input.application_id)}/environments?${query.toString()}`
      )) as {
        result?: unknown;
        total?: number;
      };

      const rawItems = asArray<{
        id?: string;
        environment_id?: string;
        env_id?: string;
        name?: string;
        env_name?: string;
        os_type?: string;
        category?: string;
        instance_count?: number;
        host_count?: number;
      }>(response.result);

      return {
        environments: rawItems.map((item) => ({
          environment_id: item.environment_id ?? item.env_id ?? item.id ?? "",
          name: item.name ?? item.env_name,
          os_type: item.os_type,
          category: item.category,
          instance_count: item.instance_count ?? item.host_count
        })),
        total: response.total
      };
    },
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
    async getRuntimeVariables(input) {
      const query = new URLSearchParams();
      if (input.app_id) {
        query.set("app_id", input.app_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/runtime-variables${suffix}`
      )) as {
        variables?: Array<{
          name?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
        result?: Array<{
          name?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
      };
      const variables = asArray<{
        name?: string;
        type?: string;
        value?: string;
        static_status?: number;
        staticStatus?: number;
        is_dynamic?: boolean;
      }>(response.variables ?? response.result);

      return {
        project_id: input.project_id,
        app_id: input.app_id,
        variables: variables.map((item) => ({
          name: item.name,
          type: item.type,
          value: item.value,
          static_status: item.static_status ?? item.staticStatus,
          is_dynamic: item.is_dynamic
        })),
        raw: response
      };
    },
    async queryVariables(input) {
      const query = new URLSearchParams({
        level: input.level
      });
      if (input.app_id) {
        query.set("app_id", input.app_id);
      }
      if (input.env_id) {
        query.set("env_id", input.env_id);
      }
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/variables/query?${query.toString()}`
      )) as {
        variables?: Array<{
          name?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
        result?: Array<{
          name?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
      };
      const variables = asArray<{
        name?: string;
        type?: string;
        value?: string;
        static_status?: number;
        staticStatus?: number;
        is_dynamic?: boolean;
      }>(response.variables ?? response.result);

      return {
        project_id: input.project_id,
        level: input.level,
        app_id: input.app_id,
        env_id: input.env_id,
        variables: variables.map((item) => ({
          name: item.name,
          type: item.type,
          value: item.value,
          static_status: item.static_status ?? item.staticStatus,
          is_dynamic: item.is_dynamic
        })),
        raw: response
      };
    },
    async listVariables(input) {
      const query = new URLSearchParams({
        level: input.level
      });
      if (input.app_id) {
        query.set("app_id", input.app_id);
      }
      if (input.env_id) {
        query.set("env_id", input.env_id);
      }
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/variables?${query.toString()}`
      )) as {
        variables?: Array<{
          id?: string;
          variable_id?: string;
          name?: string;
          key?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
        result?: Array<{
          id?: string;
          variable_id?: string;
          name?: string;
          key?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
        }>;
      };
      const variables = asArray<{
        id?: string;
        variable_id?: string;
        name?: string;
        key?: string;
        type?: string;
        value?: string;
        static_status?: number;
        staticStatus?: number;
        is_dynamic?: boolean;
      }>(response.variables ?? response.result);

      return {
        project_id: input.project_id,
        level: input.level,
        app_id: input.app_id,
        env_id: input.env_id,
        variables: variables.map((item) => ({
          id: item.id ?? item.variable_id,
          name: item.name ?? item.key,
          type: item.type,
          value: item.value,
          static_status: item.static_status ?? item.staticStatus,
          is_dynamic: item.is_dynamic
        })),
        raw: response
      };
    },
    async listVariableHistory(input) {
      const query = new URLSearchParams({
        level: input.level
      });
      if (input.app_id) {
        query.set("app_id", input.app_id);
      }
      if (input.env_id) {
        query.set("env_id", input.env_id);
      }
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/variables/history?${query.toString()}`
      )) as {
        histories?: Array<{
          id?: string;
          variable_id?: string;
          name?: string;
          key?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
          created_at?: string;
          createdAt?: string;
          updated_at?: string;
          updatedAt?: string;
        }>;
        variables?: Array<{
          id?: string;
          variable_id?: string;
          name?: string;
          key?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
          created_at?: string;
          createdAt?: string;
          updated_at?: string;
          updatedAt?: string;
        }>;
        result?: Array<{
          id?: string;
          variable_id?: string;
          name?: string;
          key?: string;
          type?: string;
          value?: string;
          static_status?: number;
          staticStatus?: number;
          is_dynamic?: boolean;
          created_at?: string;
          createdAt?: string;
          updated_at?: string;
          updatedAt?: string;
        }>;
      };
      const histories = asArray<{
        id?: string;
        variable_id?: string;
        name?: string;
        key?: string;
        type?: string;
        value?: string;
        static_status?: number;
        staticStatus?: number;
        is_dynamic?: boolean;
        created_at?: string;
        createdAt?: string;
        updated_at?: string;
        updatedAt?: string;
      }>(response.histories ?? response.variables ?? response.result);

      return {
        project_id: input.project_id,
        level: input.level,
        app_id: input.app_id,
        env_id: input.env_id,
        histories: histories.map((item) => ({
          id: item.id ?? item.variable_id,
          name: item.name ?? item.key,
          type: item.type,
          value: item.value,
          static_status: item.static_status ?? item.staticStatus,
          is_dynamic: item.is_dynamic,
          created_at: item.created_at ?? item.createdAt,
          updated_at: item.updated_at ?? item.updatedAt
        })),
        raw: response
      };
    },
    async listV4Environments(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/list`,
        {
          limit: input.limit,
          offset: input.offset
        }
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        environment_id?: string;
        name?: string;
        project_id?: string;
        os?: string;
        description?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        total: response.total,
        environments: rawItems.map((item) => ({
          environment_id: item.environment_id ?? item.id ?? "",
          name: item.name,
          project_id: item.project_id,
          os: item.os,
          description: item.description
        })),
        raw: response
      };
    },
    async listV4EnvironmentApplications(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}/applications-list`,
        {
          limit: input.limit,
          offset: input.offset
        }
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        app_id?: string;
        name?: string;
        project_id?: string;
        description?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        total: response.total,
        applications: rawItems.map((item) => ({
          app_id: item.app_id ?? item.id ?? "",
          name: item.name,
          project_id: item.project_id,
          description: item.description
        })),
        raw: response
      };
    },
    async listDeploymentUnits(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/applications/${encodeURIComponent(input.app_id)}/deployment-units`
      )) as
        | Array<{
            id?: string;
            environment_id?: string;
            environment_name?: string;
            cluster_id?: string;
            cluster_name?: string;
            namespace?: string;
          }>
        | {
            resources?: Array<{
              id?: string;
              environment_id?: string;
              environment_name?: string;
              cluster_id?: string;
              cluster_name?: string;
              namespace?: string;
            }>;
            result?: Array<{
              id?: string;
              environment_id?: string;
              environment_name?: string;
              cluster_id?: string;
              cluster_name?: string;
              namespace?: string;
            }>;
          };

      const rawItems = asArray<{
        id?: string;
        environment_id?: string;
        environment_name?: string;
        cluster_id?: string;
        cluster_name?: string;
        namespace?: string;
      }>(Array.isArray(response) ? response : response.resources ?? response.result);

      return {
        project_id: input.project_id,
        app_id: input.app_id,
        deployment_units: rawItems.map((item) => ({
          id: item.id,
          environment_id: item.environment_id,
          environment_name: item.environment_name,
          cluster_id: item.cluster_id,
          cluster_name: item.cluster_name,
          namespace: item.namespace
        })),
        raw: response
      };
    },
    async listV4Orchestrations(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/orchestrations/list`,
        {
          app_id: input.app_id,
          limit: input.limit,
          offset: input.offset
        }
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        name?: string;
        state?: string;
        description?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        app_id: input.app_id,
        total: response.total,
        orchestrations: rawItems.map((item) => ({
          id: item.id,
          name: item.name,
          state: item.state,
          description: item.description
        })),
        raw: response
      };
    },
    async listV4DeployRecords(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records`,
        {
          limit: input.limit,
          offset: input.offset
        }
      )) as
        | {
            total?: number;
            resources?: unknown;
            result?: unknown;
          }
        | null;

      const rawItems = asArray<{
        id?: string;
        state?: string;
        orchestration_id?: string;
        start_time?: string;
        end_time?: string;
      }>(response?.resources ?? response?.result);

      return {
        project_id: input.project_id,
        total: response?.total,
        records: rawItems.map((item) => ({
          id: item.id,
          state: item.state,
          orchestration_id: item.orchestration_id,
          start_time: item.start_time,
          end_time: item.end_time
        })),
        raw: response
      };
    },
    async getLastRecordDetail(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/orchestrations/${encodeURIComponent(input.orchestration_id)}/last-record-detail`
      );

      return {
        project_id: input.project_id,
        orchestration_id: input.orchestration_id,
        raw: response
      };
    },
    async getV4DeployRecord(input) {
      const query = new URLSearchParams();
      if (input.step_id) {
        query.set("step_id", input.step_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}${suffix}`
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        step_id: input.step_id,
        raw: response
      };
    },
    async getV4DeployRecordStepDetail(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/step-detail`
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        raw: response
      };
    },
    async getV4DeployRecordStepLogs(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/step/${encodeURIComponent(input.step_id)}/logs`,
        buildDeployV4StepLogBody(input)
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        step_id: input.step_id,
        raw: response
      };
    },
    async cancelV4DeployRecord(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/cancel`,
        buildDeployV4RecordActionBody(input)
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        status: (response as { status?: string }).status,
        raw: response
      };
    },
    async rerunV4DeployRecord(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/rerun`,
        buildDeployV4RecordActionBody(input)
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        status: (response as { status?: string }).status,
        raw: response
      };
    },
    async retryV4DeployRecord(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/retry`,
        buildDeployV4RecordActionBody(input)
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        status: (response as { status?: string }).status,
        raw: response
      };
    },
    async rollbackV4DeployRecord(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/rollback`,
        buildDeployV4RecordActionBody(input)
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        status: (response as { status?: string }).status,
        raw: response
      };
    },
    async passV4ManualCheck(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/step/${encodeURIComponent(input.step_id)}/pass`,
        {}
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        step_id: input.step_id,
        status: (response as { status?: string }).status,
        raw: response
      };
    },
    async refuseV4ManualCheck(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/deploy-records/${encodeURIComponent(input.record_id)}/step/${encodeURIComponent(input.step_id)}/refuse`,
        {}
      );

      return {
        project_id: input.project_id,
        record_id: input.record_id,
        step_id: input.step_id,
        status: (response as { status?: string }).status,
        raw: response
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
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/start`,
        {
          record_id: input.record_id
        }
      )) as {
        task_id?: string;
        id?: string;
        record_id?: string;
        job_id?: string;
        status?: string;
        result?: {
          task_id?: string;
          id?: string;
          record_id?: string;
          job_id?: string;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? item.id ?? input.record_id,
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
        status?: string;
        percentage?: number;
        operator_name?: string;
        executor?: string;
        nick_name?: string;
        start_time?: string;
        end_time?: string;
        step_states?: DeployStepState[];
        step_state?: DeployStepState[];
        result?: {
          task_id?: string;
          record_id?: string;
          state?: string;
          status?: string;
          percentage?: number;
          operator_name?: string;
          executor?: string;
          nick_name?: string;
          start_time?: string;
          end_time?: string;
          step_states?: DeployStepState[];
          step_state?: DeployStepState[];
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? input.record_id,
        state: item.state ?? item.status,
        percentage: item.percentage,
        operator_name: item.operator_name ?? item.executor ?? item.nick_name,
        start_time: item.start_time,
        end_time: item.end_time,
        step_states: item.step_states ?? item.step_state
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
        size: input.page_size
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
        execution_state?: string;
        can_execute?: boolean;
        can_modify?: boolean;
        can_delete?: boolean;
        can_view?: boolean;
        can_manage?: boolean;
        can_create_env?: boolean;
        can_disable?: boolean;
        is_disable?: boolean;
        description?: string;
        arrange_infos?: Array<{ id?: string; state?: string; deploy_system?: string }>;
      }>(response.applications ?? response.result);

      return {
        applications: rawItems.map((item) => ({
          application_id: item.application_id ?? item.id ?? "",
          name: item.name ?? item.application_name ?? "",
          project_id: item.project_id,
          deploy_type: item.deploy_type,
          execution_state: item.execution_state,
          can_execute: item.can_execute,
          can_modify: item.can_modify,
          can_delete: item.can_delete,
          can_view: item.can_view,
          can_manage: item.can_manage,
          can_create_env: item.can_create_env,
          can_disable: item.can_disable,
          is_disable: item.is_disable,
          description: item.description,
          arrange_infos: item.arrange_infos
        })),
        total: response.total ?? response.total_count ?? response.total_num
      };
    },
    async listV4Applications(input) {
      const body: {
        project_id: string;
        limit: number;
        offset: number;
        keyword?: string;
      } = {
        project_id: input.project_id,
        limit: input.limit,
        offset: input.offset
      };

      if (input.keyword !== undefined) {
        body.keyword = input.keyword;
      }

      const response = (await _http.post("/v4/applications/list", body)) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        app_id?: string;
        name?: string;
        project_id?: string;
        description?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        total: response.total,
        applications: rawItems.map((item) => ({
          app_id: item.app_id ?? item.id ?? "",
          name: item.name ?? "",
          project_id: item.project_id,
          description: item.description
        })),
        raw: response
      };
    },
    async listV4Clusters(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/list`,
        {
          ...buildDeployV4ListBody(input),
          cluster_type: input.cluster_type
        }
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        cluster_id?: string;
        name?: string;
        cluster_type?: string;
        description?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        cluster_type: input.cluster_type,
        total: response.total,
        clusters: rawItems.map((item) => ({
          cluster_id: item.cluster_id ?? item.id ?? "",
          name: item.name,
          cluster_type: item.cluster_type,
          description: item.description
        })),
        raw: response
      };
    },
    async getV4Cluster(input) {
      const query = new URLSearchParams({
        cluster_type: input.cluster_type
      });

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/${encodeURIComponent(input.cluster_id)}?${query.toString()}`
      )) as {
        id?: string;
        cluster_id?: string;
        name?: string;
        cluster_type?: string;
        description?: string;
      } | null;

      const item = (response ?? {}) as {
        id?: string;
        cluster_id?: string;
        name?: string;
        cluster_type?: string;
        description?: string;
      };

      return {
        project_id: input.project_id,
        cluster_id: input.cluster_id,
        cluster_type: input.cluster_type,
        cluster: {
          cluster_id: item.cluster_id ?? item.id ?? input.cluster_id,
          name: item.name,
          cluster_type: item.cluster_type ?? input.cluster_type,
          description: item.description
        },
        raw: response
      };
    },
    async getV4ClusterCount(input) {
      const query = new URLSearchParams({
        cluster_type: input.cluster_type
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/count?${query.toString()}`
      )) as Record<string, number>;

      return {
        project_id: input.project_id,
        cluster_type: input.cluster_type,
        counts: response ?? {},
        raw: response
      };
    },
    async getV4ClusterHost(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/${encodeURIComponent(input.cluster_id)}/hosts/${encodeURIComponent(input.host_id)}`
      )) as {
        id?: string;
        host_id?: string;
        uuid?: string;
        name?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        connection_status?: string;
        status?: string;
      } | null;

      const item = (response ?? {}) as {
        id?: string;
        host_id?: string;
        uuid?: string;
        name?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        connection_status?: string;
        status?: string;
      };

      return {
        project_id: input.project_id,
        cluster_id: input.cluster_id,
        host_id: input.host_id,
        host: {
          host_id: item.host_id ?? item.id ?? item.uuid ?? input.host_id,
          name: item.name ?? item.host_name,
          ip: item.ip,
          os: item.os,
          connection_status: item.connection_status,
          status: item.status
        },
        raw: response
      };
    },
    async deleteV4ClusterHosts(input) {
      const response = (await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/${encodeURIComponent(input.cluster_id)}/hosts/batch-delete`,
        input.host_ids
      )) as {
        status?: string;
      } | null;

      return {
        project_id: input.project_id,
        cluster_id: input.cluster_id,
        host_ids: input.host_ids,
        status: response?.status,
        raw: response
      };
    },
    async listV4ClusterHosts(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/clusters/${encodeURIComponent(input.cluster_id)}/hosts/list`,
        {
          ...buildDeployV4ListBody(input),
          ...(input.ip ? { ip: input.ip } : {}),
          ...(input.os ? { os: input.os } : {}),
          ...(input.connection_status ? { connection_status: input.connection_status } : {})
        }
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        host_id?: string;
        uuid?: string;
        name?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        connection_status?: string;
        status?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        cluster_id: input.cluster_id,
        total: response.total,
        hosts: rawItems.map((item) => ({
          host_id: item.host_id ?? item.id ?? item.uuid ?? "",
          name: item.name ?? item.host_name,
          ip: item.ip,
          os: item.os,
          connection_status: item.connection_status,
          status: item.status
        })),
        raw: response
      };
    },
    async getV4Environment(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}`
      )) as {
        id?: string;
        environment_id?: string;
        name?: string;
        description?: string;
      } | null;

      const item = (response ?? {}) as {
        id?: string;
        environment_id?: string;
        name?: string;
        description?: string;
      };

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        environment: {
          environment_id: item.environment_id ?? item.id ?? input.environment_id,
          name: item.name,
          description: item.description
        },
        raw: response
      };
    },
    async getV4EnvironmentResourceDetail(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}/resource-detail`
      );

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        raw: response
      };
    },
    async listV4EnvironmentHosts(input) {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(input.query ?? {})) {
        query.set(key, String(value));
      }

      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}/hosts${suffix}`
      )) as {
        total?: number;
        resources?: unknown;
      };

      const rawItems = asArray<{
        id?: string;
        host_id?: string;
        uuid?: string;
        name?: string;
        host_name?: string;
        ip?: string;
        os?: string;
        connection_status?: string;
        status?: string;
      }>(response.resources);

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        total: response.total,
        hosts: rawItems.map((item) => ({
          host_id: item.host_id ?? item.id ?? item.uuid ?? "",
          name: item.name ?? item.host_name,
          ip: item.ip,
          os: item.os,
          connection_status: item.connection_status,
          status: item.status
        })),
        raw: response
      };
    },
    async addV4EnvironmentHosts(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}/hosts`,
        {
          cluster_id: input.cluster_id,
          host_ids: input.host_ids
        }
      )) as {
        status?: string;
      } | null;

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        cluster_id: input.cluster_id,
        host_ids: input.host_ids,
        status: response?.status,
        raw: response
      };
    },
    async deleteV4EnvironmentHosts(input) {
      const response = (await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/environments/${encodeURIComponent(input.environment_id)}/hosts`,
        input.host_ids
      )) as {
        status?: string;
      } | null;

      return {
        project_id: input.project_id,
        environment_id: input.environment_id,
        host_ids: input.host_ids,
        status: response?.status,
        raw: response
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
        name?: string;
        project_id?: string;
        status?: string;
        state?: string;
        deploy_type?: string;
        execution_state?: string;
        can_execute?: boolean;
        can_modify?: boolean;
        can_delete?: boolean;
        can_view?: boolean;
        can_manage?: boolean;
        can_disable?: boolean;
        is_disable?: boolean;
      }>(response.tasks ?? response.result);

      return {
        tasks: rawItems.map((item) => ({
          task_id: item.task_id ?? item.id ?? "",
          application_id: item.application_id,
          application_name: item.application_name ?? item.name,
          project_id: item.project_id ?? input.project_id,
          status: item.status ?? item.state,
          deploy_type: item.deploy_type,
          execution_state: item.execution_state,
          can_execute: item.can_execute,
          can_modify: item.can_modify,
          can_delete: item.can_delete,
          can_view: item.can_view,
          can_manage: item.can_manage,
          can_disable: item.can_disable,
          is_disable: item.is_disable
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
        create_type?: string;
        can_execute?: boolean;
        can_create_env?: boolean;
        can_modify?: boolean;
        can_delete?: boolean;
        can_view?: boolean;
        can_manage?: boolean;
        can_disable?: boolean;
        is_disable?: boolean;
        create_time?: string;
        update_time?: string;
        deploy_type?: string;
        description?: string;
        arrange_infos?: Array<{
          id?: string;
          state?: string;
          deploy_system?: string;
          template_id?: string;
          release_id?: number;
          app_component_list?: Array<{
            task_id?: string;
            app_id?: string;
            app_name?: string;
            comp_id?: string;
            comp_name?: string;
            region?: string;
            state?: string;
          }>;
          can_execute?: boolean;
          can_create_env?: boolean;
          steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
        }>;
        result?: {
          application_id?: string;
          id?: string;
          application_name?: string;
          name?: string;
          project_id?: string;
          create_type?: string;
          can_execute?: boolean;
          can_create_env?: boolean;
          can_modify?: boolean;
          can_delete?: boolean;
          can_view?: boolean;
          can_manage?: boolean;
          can_disable?: boolean;
          is_disable?: boolean;
          create_time?: string;
          update_time?: string;
          deploy_type?: string;
          description?: string;
          arrange_infos?: Array<{
            id?: string;
            state?: string;
            deploy_system?: string;
            template_id?: string;
            release_id?: number;
            app_component_list?: Array<{
              task_id?: string;
              app_id?: string;
              app_name?: string;
              comp_id?: string;
              comp_name?: string;
              region?: string;
              state?: string;
            }>;
            can_execute?: boolean;
            can_create_env?: boolean;
            steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
          }>;
        };
      };

      const item = response.result ?? response;

      return {
        application_id: item.application_id ?? item.id ?? input.application_id,
        name: item.name ?? item.application_name ?? "",
        project_id: item.project_id,
        create_type: item.create_type,
        can_execute: item.can_execute,
        can_create_env: item.can_create_env,
        can_modify: item.can_modify,
        can_delete: item.can_delete,
        can_view: item.can_view,
        can_manage: item.can_manage,
        can_disable: item.can_disable,
        is_disable: item.is_disable,
        create_time: item.create_time,
        update_time: item.update_time,
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
        state?: string;
        can_execute?: boolean;
        can_create_env?: boolean;
        can_modify?: boolean;
        can_delete?: boolean;
        can_view?: boolean;
        can_manage?: boolean;
        is_disable?: boolean;
        create_time?: string;
        update_time?: string;
        steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
        template_id?: string;
        release_id?: number;
        app_component_list?: Array<{
          task_id?: string;
          app_id?: string;
          app_name?: string;
          comp_id?: string;
          comp_name?: string;
          region?: string;
          state?: string;
        }>;
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
          state?: string;
          can_execute?: boolean;
          can_create_env?: boolean;
          can_modify?: boolean;
          can_delete?: boolean;
          can_view?: boolean;
          can_manage?: boolean;
          is_disable?: boolean;
          create_time?: string;
          update_time?: string;
          steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
          template_id?: string;
          release_id?: number;
          app_component_list?: Array<{
            task_id?: string;
            app_id?: string;
            app_name?: string;
            comp_id?: string;
            comp_name?: string;
            region?: string;
            state?: string;
          }>;
          status?: string;
          deploy_type?: string;
          description?: string;
        };
      };

      const responseObject = asObjectRecord<typeof response>(response);

      if (!responseObject) {
        throw new AppError(
          "provider_error",
          `Deploy task ${input.task_id} returned an empty or invalid response.`
        );
      }

      const item =
        asObjectRecord<NonNullable<typeof response.result>>(responseObject.result) ?? responseObject;
      let detailItem:
        | {
            task_id?: string;
            id?: string;
            application_id?: string;
            application_name?: string;
            name?: string;
            project_id?: string;
            state?: string;
            can_execute?: boolean;
            can_create_env?: boolean;
            can_modify?: boolean;
            can_delete?: boolean;
            can_view?: boolean;
            can_manage?: boolean;
            is_disable?: boolean;
            create_time?: string;
            update_time?: string;
            steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
            template_id?: string;
            release_id?: number;
            app_component_list?: Array<{
              task_id?: string;
              app_id?: string;
              app_name?: string;
              comp_id?: string;
              comp_name?: string;
              region?: string;
              state?: string;
            }>;
            status?: string;
            deploy_type?: string;
            description?: string;
          }
        | undefined;

      if (Object.keys(item.steps ?? {}).length === 0) {
        try {
          const detailResponse = (await _http.get(
            `/v2/task/detail/${encodeURIComponent(input.task_id)}`
          )) as {
            task_id?: string;
            id?: string;
            application_id?: string;
            application_name?: string;
            name?: string;
            project_id?: string;
            state?: string;
            can_execute?: boolean;
            can_create_env?: boolean;
            can_modify?: boolean;
            can_delete?: boolean;
            can_view?: boolean;
            can_manage?: boolean;
            is_disable?: boolean;
            create_time?: string;
            update_time?: string;
            steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
            template_id?: string;
            release_id?: number;
            app_component_list?: Array<{
              task_id?: string;
              app_id?: string;
              app_name?: string;
              comp_id?: string;
              comp_name?: string;
              region?: string;
              state?: string;
            }>;
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
              state?: string;
              can_execute?: boolean;
              can_create_env?: boolean;
              can_modify?: boolean;
              can_delete?: boolean;
              can_view?: boolean;
              can_manage?: boolean;
              is_disable?: boolean;
              create_time?: string;
              update_time?: string;
              steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
              template_id?: string;
              release_id?: number;
              app_component_list?: Array<{
                task_id?: string;
                app_id?: string;
                app_name?: string;
                comp_id?: string;
                comp_name?: string;
                region?: string;
                state?: string;
              }>;
              status?: string;
              deploy_type?: string;
              description?: string;
            };
          };
          const detailResponseObject = asObjectRecord<typeof detailResponse>(detailResponse);
          detailItem = detailResponseObject
            ? asObjectRecord<NonNullable<typeof detailResponse.result>>(
                detailResponseObject.result
              ) ?? detailResponseObject
            : undefined;
        } catch (error) {
          if (error instanceof AppError && error.category === "not_found") {
            detailItem = undefined;
          } else {
            detailItem = undefined;
          }
        }
      }

      return {
        task_id: item.task_id ?? detailItem?.task_id ?? item.id ?? detailItem?.id ?? input.task_id,
        application_id: item.application_id ?? detailItem?.application_id,
        name: item.name ?? item.application_name ?? detailItem?.name ?? detailItem?.application_name ?? "",
        project_id: item.project_id ?? detailItem?.project_id,
        state: item.state ?? detailItem?.state ?? item.status ?? detailItem?.status,
        can_execute: item.can_execute ?? detailItem?.can_execute,
        can_create_env: item.can_create_env ?? detailItem?.can_create_env,
        can_modify: item.can_modify ?? detailItem?.can_modify,
        can_delete: item.can_delete ?? detailItem?.can_delete,
        can_view: item.can_view ?? detailItem?.can_view,
        can_manage: item.can_manage ?? detailItem?.can_manage,
        is_disable: item.is_disable ?? detailItem?.is_disable,
        create_time: item.create_time ?? detailItem?.create_time,
        update_time: item.update_time ?? detailItem?.update_time,
        steps: Object.keys(item.steps ?? {}).length > 0 ? item.steps : detailItem?.steps ?? item.steps,
        template_id: detailItem?.template_id ?? item.template_id,
        release_id: detailItem?.release_id ?? item.release_id,
        app_component_list: detailItem?.app_component_list ?? item.app_component_list,
        status: item.status ?? detailItem?.status ?? item.state ?? detailItem?.state,
        deploy_type: detailItem?.deploy_type ?? item.deploy_type,
        description: detailItem?.description ?? item.description
      };
    },
    async getDeploySourceDetail(input) {
      const query = new URLSearchParams({
        task_id: input.task_id
      });
      const response = (await _http.get(
        `/v2/task/trigger/detail?${query.toString()}`
      )) as {
        trigger_source?: string | number;
        artifact_source_system?: string;
        artifact_type?: string;
        result?: {
          trigger_source?: string | number;
          artifact_source_system?: string;
          artifact_type?: string;
        };
      };
      const item = response.result ?? response;

      return {
        task_id: input.task_id,
        trigger_source:
          item.trigger_source === undefined ? undefined : String(item.trigger_source),
        artifact_source_system: item.artifact_source_system,
        artifact_type: item.artifact_type
      };
    },
    async getTemplateDetail(input) {
      const query = new URLSearchParams({
        taskId: input.task_id ?? ""
      });
      const response = (await _http.get(
        `/v1/deploytemplate/template/${encodeURIComponent(input.template_id)}/getTemplate?${query.toString()}`
      )) as {
        id?: string;
        template_id?: string;
        name?: string;
        template_name?: string;
        operation_list?: unknown;
        result?: {
          id?: string;
          template_id?: string;
          name?: string;
          template_name?: string;
          operation_list?: unknown;
        };
      };
      const item = response.result ?? response;

      return {
        template_id: item.template_id ?? item.id ?? input.template_id,
        task_id: input.task_id,
        name: item.name ?? item.template_name,
        operation_list: asArray(item.operation_list),
        raw: response
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
        `/v2/tasks/${encodeURIComponent(input.task_id)}/start`,
        {
          ...(input.trigger_source === undefined
            ? {}
            : { trigger_source: typeof input.trigger_source === "string" ? Number(input.trigger_source) : input.trigger_source }),
          ...(input.params?.length
            ? {
                params: input.params.map((item) => ({
                  key: item.name,
                  type: item.type,
                  value: item.value
                }))
              }
            : {})
        }
      )) as {
        task_id?: string;
        id?: string;
        record_id?: string;
        job_id?: string;
        job_name?: string;
        app_component_list?: Array<{
          task_id?: string;
          app_id?: string;
          app_name?: string;
          comp_id?: string;
          comp_name?: string;
          region?: string;
          state?: string;
        }>;
        status?: string;
        result?: {
          task_id?: string;
          id?: string;
          record_id?: string;
          job_id?: string;
          job_name?: string;
          app_component_list?: Array<{
            task_id?: string;
            app_id?: string;
            app_name?: string;
            comp_id?: string;
            comp_name?: string;
            region?: string;
            state?: string;
          }>;
          status?: string;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        record_id: item.record_id ?? item.id,
        job_name: item.job_name ?? item.job_id,
        status: item.status,
        app_component_list: item.app_component_list
      };
    },
    async listSystemConfigs() {
      const response = (await _http.get("/v3/system/configs")) as
        | Array<{
            name?: string;
            type?: string;
            description?: string;
            static_status?: boolean;
            pipeline_source?: string;
            pipeline_source_type?: string;
          }>
        | {
            result?: Array<{
              name?: string;
              type?: string;
              description?: string;
              static_status?: boolean;
              pipeline_source?: string;
              pipeline_source_type?: string;
            }>;
          };
      const items = Array.isArray(response) ? response : response.result ?? [];

      return {
        configs: items.map((item) => ({
          name: item.name ?? "",
          type: item.type,
          description: item.description,
          static_status: item.static_status,
          pipeline_source: item.pipeline_source,
          pipeline_source_type: item.pipeline_source_type
        }))
      };
    },
    async checkApplicationExists(input) {
      const query = new URLSearchParams({
        name: input.name,
        project_id: input.project_id
      });
      const response = (await _http.get(`/v1/applications/exist?${query.toString()}`)) as {
        status?: string;
        result?: boolean;
      };

      return {
        project_id: input.project_id,
        name: input.name,
        exists: Boolean(response.result),
        status: response.status,
        raw: response.result
      };
    },
    async listApplicationPermissions(input) {
      const query = new URLSearchParams();
      if (input.app_id) query.set("app_id", input.app_id);
      if (input.project_id) query.set("project_id", input.project_id);

      const response = (await _http.get(`/v3/applications/permissions?${query.toString()}`)) as {
        status?: string;
        result?: unknown;
        total?: number;
      };

      return {
        app_id: input.app_id,
        project_id: input.project_id,
        permissions: asArray<Record<string, unknown>>(response.result),
        status: response.status,
        raw: response.result
      };
    },
    async getApplicationMessages(input) {
      const query = new URLSearchParams();
      addQueryParams(query, input.query);
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.project_id)}/applications/${encodeURIComponent(input.app_id)}/messages${suffix}`
      )) as {
        status?: string;
        result?: unknown;
        records?: unknown;
      };

      return {
        project_id: input.project_id,
        app_id: input.app_id,
        messages: asArray<Record<string, unknown>>(response.result ?? response.records),
        status: response.status,
        raw: response.result ?? response.records
      };
    },
    async listApplicationGroups(input) {
      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/applications/groups`
      )) as {
        status?: string;
        result?: unknown;
      };

      return {
        project_id: input.project_id,
        groups: asArray<Record<string, unknown> & { id?: string; name?: string }>(response.result),
        status: response.status,
        raw: response.result
      };
    },
    async getSuccessRateMetrics(input) {
      const query = new URLSearchParams();
      addQueryParams(query, input.query);
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/metrics/success-rate${suffix}`
      )) as {
        status?: string;
        result?: unknown;
      };

      return {
        project_id: input.project_id,
        metrics: asObjectRecord<Record<string, unknown>>(response.result) ?? {},
        status: response.status,
        raw: response.result
      };
    },
    async getTaskSuccessRateMetrics(input) {
      const response = (await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/tasks/metrics/success-rate`,
        input.body ?? {}
      )) as {
        status?: string;
        result?: unknown;
      };

      return {
        project_id: input.project_id,
        metrics: asObjectRecord<Record<string, unknown>>(response.result) ?? {},
        status: response.status,
        raw: response.result
      };
    },
    async getEnvironmentPermissions(input) {
      const response = (await _http.get(
        `/v2/applications/${encodeURIComponent(input.application_id)}/environments/${encodeURIComponent(input.environment_id)}/permissions`
      )) as {
        status?: string;
        result?: unknown;
      };

      return {
        application_id: input.application_id,
        environment_id: input.environment_id,
        permissions: asArray<Record<string, unknown>>(response.result),
        status: response.status,
        raw: response.result
      };
    },
    async checkApplicationCreatable(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const response = (await _http.get(`/v1/applications/creatable?${query.toString()}`)) as {
        status?: string;
        result?: {
          creatable?: boolean;
        };
      };

      return {
        project_id: input.project_id,
        creatable: Boolean(response.result?.creatable),
        status: response.status,
        raw: response.result
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
        execution_id?: string | number;
        task_id?: string;
        operator_name?: string;
        operator?: string;
        status?: string;
        state?: string;
      }>(response.histories ?? response.result);

      return {
        histories: rawItems.map((item) => ({
          id: String(item.id ?? item.history_id ?? item.execution_id ?? ""),
          task_id: item.task_id ?? input.task_id,
          operator_name: item.operator_name ?? item.operator,
          status: item.status ?? item.state
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
        step_states?: DeployStepState[];
        step_state?: DeployStepState[];
        result?: {
          task_id?: string;
          state?: string;
          percentage?: number;
          status?: string;
          elapsed_time?: number;
          step_states?: DeployStepState[];
          step_state?: DeployStepState[];
        };
      };
      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        state: item.state ?? item.status,
        percentage: item.percentage,
        elapsed_time: item.elapsed_time,
        step_states: item.step_states ?? item.step_state
      };
    }
  };
}
