import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";

type TestPlanOverviewPiFilterInput = {
  all_pi?: boolean;
  pi_sprints?: Array<{
    pi_id?: string;
    sprints?: string[];
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

type TestPlanOverviewFilterInput = {
  project_id: string;
  version_uri: string;
  module_id?: string;
  fixed_version_id?: string;
  owner_id?: string;
  own?: boolean;
  pi_filter?: TestPlanOverviewPiFilterInput;
};

type TestPlanRequirementsOverviewInput = {
  project_id: string;
  version_uri: string;
  page: number;
  page_size: number;
  fixed_version_id?: string;
  module_id?: string;
  key_word?: string;
  pi_filter?: TestPlanOverviewPiFilterInput;
};

type TestPlanRecordBodyInput = {
  project_id: string;
  [key: string]: unknown;
};

type TestPlanFeatureChildrenInput = {
  feature_uri: string;
  project_uuid: string;
  owner?: string;
  stage?: string;
  activity?: string;
  version_uri?: string;
  task_uri?: string;
  service_type?: string;
  contain_total?: boolean;
  sort_type?: string;
  page_number?: number;
  page_size?: number;
};

type TestPlanTesthubTestcasesInput = {
  project_id: string;
  page: number;
  page_size: number;
  useOffset?: boolean;
  plan_id?: string;
  case_ids?: string[];
  owner_ids?: string[];
  status_ids?: string[];
  rank_ids?: string[];
  module_ids?: string[];
  issue_id?: string;
  creator_ids?: string[];
  result_ids?: string[];
  iteration_ids?: string[];
  start_time?: string;
  end_time?: string;
  associate_issue?: boolean;
  associated_defects?: boolean;
  show_children?: boolean;
  label_ids?: string[];
  execute_start_time?: string;
  execute_end_time?: string;
  executor_ids?: string[];
  is_keyword?: boolean;
  issue_tree_search?: boolean;
  service_id?: number;
  stage_type?: number;
  cata_id?: string;
  subject?: string;
  sort_field?: string;
  sort_type?: string;
  associate_issue_detail?: boolean;
};

type TestPlanTesthubTestcasesV5Input = {
  project_id: string;
  page: number;
  page_size: number;
  useOffset?: boolean;
  version_id?: string;
  execution_type_id?: number;
};

type TestPlanEtlQueryInput = {
  offset: number;
  limit: number;
  table_name: string;
  is_bak?: boolean | string;
  start_time: string;
  end_time: string;
  filter_time_field: string;
  sort_field?: string;
  schema_no: string;
  project_uuid?: string;
  query_fields?: string[];
  [key: string]: unknown;
};

type TestPlanTestcaseUrisInput = {
  project_id: string;
  page: number;
  page_size: number;
  keyword?: string;
  useOffset?: boolean;
  version_uri?: string;
  case_uris?: string[];
  owner_ids?: string[];
  status_codes?: number[];
  rank_ids?: string[];
  module_ids?: string[];
  issue_id?: string;
  creator_ids?: string[];
  result_codes?: number[];
  iteration_ids?: string[];
  create_start_time?: string;
  create_end_time?: string;
  associated_issue?: boolean;
  associated_defects?: boolean;
  include_sub_issue?: boolean;
  include_sub_feature?: boolean;
  label_ids?: string[];
  execute_start_time?: string;
  execute_end_time?: string;
  executor_ids?: string[];
  test_types?: number[];
  is_keyword?: boolean;
  issue_tree_search?: boolean;
  service_type?: number;
  service_types?: number[];
  stage_type?: number;
  feature_uri?: string;
  sort_field?: string;
  sort_type?: string;
  case_type?: number;
  custom_field_info?: Record<string, unknown>;
  task_uri?: string;
  associate_issue_detail?: boolean;
  not_assign_task?: boolean;
  test_designs?: string[];
  review_status?: number;
  just_return_id?: boolean;
};

type TestPlanTestcasesBatchInput = Omit<
  TestPlanTestcaseUrisInput,
  "custom_field_info" | "test_designs"
> & {
  exeplatforms?: string[];
  own?: boolean;
  queryByDisplayCfg?: boolean;
  custom_field_info?: Record<string, unknown> | Array<Record<string, unknown>>;
  test_designs?: Array<string | boolean>;
};

type TestPlanOfficialBatchBodyInput = {
  body?: Record<string, unknown>;
  [key: string]: unknown;
};

type TestPlanOfficialPageQueryInput = {
  project_id: string;
  page: number;
  page_size: number;
  offset?: number;
  deleted?: string;
  mindmap_id?: string;
  node_id?: string;
};

type TestPlanListDefaultTemplatesInput = {
  project_id: string;
  page: number;
  page_size: number;
  offset?: number;
  name?: string;
};

type TestPlanTokenUploadResult = {
  value?: unknown;
  raw: Record<string, unknown>;
};

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
  listPlansV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    current_stage?: string;
    fix_version_ids?: string;
    branch_uri?: string;
    query_all_version?: boolean;
  }) => Promise<{
    plans: Array<{
      plan_id: string;
      name: string;
      owner_name?: string;
      status?: string;
      description?: string;
      raw?: Record<string, unknown>;
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
  listPlanJournals: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    journals: Array<Record<string, unknown>>;
    total?: number;
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
  listTesthubTestcases: (input: TestPlanTesthubTestcasesInput) => Promise<{
    cases: Array<{
      case_id: string;
      name?: string;
      number?: string;
      status?: string;
      result?: string;
      test_type?: string;
      case: Record<string, unknown>;
    }>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTesthubTestcasesV5: (input: TestPlanTesthubTestcasesV5Input) => Promise<{
    cases: Array<{
      case_id: string;
      name?: string;
      number?: string;
      status?: string;
      result?: string;
      test_type?: string;
      case: Record<string, unknown>;
    }>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTestcaseUrisV4: (input: TestPlanTestcaseUrisInput) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTestcaseUriInfosV5: (input: TestPlanTestcaseUrisInput) => Promise<{
    cases: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTestcasesBatch: (input: TestPlanTestcasesBatchInput) => Promise<{
    cases: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  batchCreateTestcases: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    testcases?: Array<Record<string, unknown>>;
    testcase_list?: Array<Record<string, unknown>>;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id?: string;
    testcase_count: number;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchDeleteTestcasesV4: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    testcase_uris?: string[];
    case_uris?: string[];
  }) => Promise<{
    project_id?: string;
    testcase_uris: string[];
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchUpdateTestcasesV4: (input: TestPlanOfficialBatchBodyInput & {
    project_id: string;
    testcases?: Array<Record<string, unknown>>;
    testcase_list?: Array<Record<string, unknown>>;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    testcase_count: number;
    updated: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchCreateTestcaseReviews: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    testcase_uris?: string[];
    case_uris?: string[];
    reviewer_ids?: string[];
    review_title?: string;
  }) => Promise<{
    project_id?: string;
    review_count: number;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchCloseTestcaseReviews: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    review_ids?: string[];
    review_uris?: string[];
    testcase_uris?: string[];
    case_uris?: string[];
  }) => Promise<{
    project_id?: string;
    review_ids: string[];
    closed: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createApiTestcaseV4: (input: TestPlanOfficialBatchBodyInput & {
    project_id: string;
    name?: string;
    test_type?: string;
    testcase?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    testcase_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
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
  listAuthorizedTasks: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    service_type?: number;
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
  getTesthubTask: (input: {
    project_id: string;
    task_uri: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getApiTestTaskStatus: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getApiTestTaskStatusV2: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getTaskExecutionParam: (input: {
    task_uri: string;
    project_uuid?: string;
  }) => Promise<{
    task_uri: string;
    parameters: Record<string, unknown>;
  }>;
  listTaskParameterTemplates: (input: {
    project_id: string;
    serviceId: string;
    sort_by?: string;
    sort_direction?: string;
    name?: string;
  }) => Promise<{
    serviceId: string;
    templates: Array<Record<string, unknown>>;
    raw: Record<string, unknown>;
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
  createTestReport: (input: {
    project_id: string;
    version_uri: string;
    name: string;
    test_conclusion?: string;
    test_conclusion_details?: string;
    risk_analysis?: string;
    iterator_uris?: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateTestReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    name: string;
    test_conclusion?: string;
    test_conclusion_details?: string;
    risk_analysis?: string;
    iterator_uris?: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateTestReportQualityAttributes: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    body: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getServiceTypeOverview: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getQualityReportOverview: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getHomePageCaseOverview: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getHomePageDefectSeverityOverview: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getHomePageDefectStatusOverview: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getHomePageOverviewV5: (input: TestPlanOverviewFilterInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listUserExecuteTestcaseStatistics: (input: TestPlanRecordBodyInput) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTestcaseDefectStatistics: (input: TestPlanRecordBodyInput) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  checkTestcaseExists: (input: {
    project_uuid: string;
    case_uris: string[];
    version_uri?: string;
  }) => Promise<{
    project_uuid: string;
    existing_case_uris: string[];
    total?: number;
    raw: Record<string, unknown>;
  }>;
  searchTestcaseUrisUsedForAutomation: (input: {
    project_uuid: string;
    page: number;
    page_size: number;
    keyword?: string;
    exeplatforms?: string[];
    own?: boolean;
    conditions?: Array<Record<string, unknown>>;
    queryByDisplayCfg?: boolean;
    useOffset?: boolean;
    version_uri?: string;
    case_uris?: string[];
    owner_ids?: string[];
    status_codes?: string[];
    rank_ids?: string[];
    module_ids?: string[];
    issue_id?: string;
    creator_ids?: string[];
    [key: string]: unknown;
  }) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  searchAutotask: (input: {
    project_uuid: string;
    versionUri: string;
    page: number;
    page_size: number;
    ticcTaskId?: string;
    result?: string;
    condition?: Record<string, unknown>;
    order?: string;
    by?: string;
    offset?: number;
    limit?: number;
    [key: string]: unknown;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getProjectDataDashboard: (input: TestPlanRecordBodyInput) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listRequirementsOverview: (input: TestPlanRequirementsOverviewInput) => Promise<{
    requirements: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listRequirementsOverviewTestcases: (input: {
    project_id: string;
    version_uri: string;
    work_item_id: string;
    work_item_name?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    testcases: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listRequirementsOverviewDefects: (input: {
    project_id: string;
    version_uri: string;
    work_item_id: string;
    work_item_name?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
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
  listGt3kDefectIterators: (input: {
    project_id: string;
    defect_id: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDefectIterators: (input: {
    project_id: string;
    defect_id: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  createDefectAssociation: (input: {
    project_id: string;
    defect_id: string;
    iterator_uri: string;
  }) => Promise<{
    project_id: string;
    defect_id: string;
    iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateDefectAssociation: (input: {
    project_id: string;
    defect_id: string;
    old_iterator_uri: string;
    new_iterator_uri: string;
  }) => Promise<{
    project_id: string;
    defect_id: string;
    old_iterator_uri: string;
    new_iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteDefectAssociation: (input: {
    project_id: string;
    defect_id: string;
    iterator_uri: string;
  }) => Promise<{
    project_id: string;
    defect_id: string;
    iterator_uri: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
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
  listCustomTemplateReports: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    type?: string;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
  refreshCustomTemplateReport: (input: {
    project_id: string;
    version_uri: string;
    uri?: string;
    name: string;
    type?: string | number;
    workpiece_type?: string;
    template_config?: Record<string, unknown>;
    data?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createCustomTemplateReport: (input: {
    project_id: string;
    version_uri: string;
    uri?: string;
    name: string;
    type?: string | number;
    workpiece_type?: string;
    template_config?: Record<string, unknown>;
    data?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id?: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateCustomTemplateReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
    uri?: string;
    name?: string;
    type?: string | number;
    workpiece_type?: string;
    template_config?: Record<string, unknown>;
    data?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteCustomTemplateReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  refreshProgressReport: (input: {
    project_uuid: string;
    version_uri: string;
    name?: string;
    workpiece_type?: string;
    analysis_dim_row?: string;
    compare_dim_column?: string;
    filter?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_uuid: string;
    version_uri: string;
    operation_uri?: string;
    is_async_operate?: boolean;
    return_value?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createProgressReport: (input: {
    project_uuid: string;
    version_uri: string;
    name: string;
    type: string | number;
    workpiece_type: string;
    analysis_dim_row: string;
    compare_dim_column?: string;
    filter: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_uuid: string;
    version_uri: string;
    operation_uri?: string;
    is_async_operate?: boolean;
    return_value?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateProgressReport: (input: {
    project_uuid: string;
    version_uri: string;
    report_uri: string;
    name?: string;
    type?: string | number;
    workpiece_type?: string;
    analysis_dim_row?: string;
    compare_dim_column?: string;
    filter?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_uuid: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteProgressReport: (input: {
    project_uuid: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    project_uuid: string;
    version_uri: string;
    report_id: string;
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listTestReports: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    own?: boolean;
  }) => Promise<{
    reports: Array<Record<string, unknown>>;
    total?: number;
  }>;
  downloadTestReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchDeleteTestReports: (input: {
    project_id: string;
    report_uris: string[];
    body?: string[];
  }) => Promise<{
    project_id: string;
    report_ids: string[];
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getRuleCheckTaskReport: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
  }) => Promise<{
    report_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listRuleCheckTasks: (input: {
    project_id: string;
    version_uri: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getRuleCheckTaskSummary: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
    severity?: string;
    status?: number;
  }) => Promise<{
    task_uri: string;
    raw: Record<string, unknown>;
  }>;
  listRuleCheckViolationCases: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
    page: number;
    page_size: number;
    severity?: string | number;
    status?: string | number;
    body?: Record<string, unknown>;
  }) => Promise<{
    violations: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  updateRuleCheckViolation: (input: {
    project_id: string;
    version_uri: string;
    violation_uri: string;
    status: number;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    violation_id: string;
    status: number;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listBranchTestcaseDuplicateNumbers: (input: {
    project_id: string;
    version_uri: string;
    numbers?: string[];
    uri_to_number_list?: Array<{
      uri?: string;
      number?: string;
    }>;
  }) => Promise<{
    numbers: string[];
    total?: number;
    has_more?: boolean;
    reason?: string;
    raw: Record<string, unknown>;
  }>;
  getCaseTemplate: (input: {
    project_id: string;
    template_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getExcelErrorTestcases: (input: {
    project_id: string;
    error_id: string;
  }) => Promise<{
    error_id: string;
    raw: Record<string, unknown>;
  }>;
  listCaseTemplates: (input: {
    project_id: string;
    name?: string;
    is_default?: boolean;
    is_recommended?: boolean;
    industry_type?: string | number;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listSolutionTemplates: (input: {
    project_id: string;
    name?: string;
    is_recommended?: boolean;
    industry_type?: string | number;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
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
  getProjectTestcase: (input: {
    project_id: string;
    testcase_id: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getProjectTestcaseV4: (input: {
    project_id: string;
    testcase_uri: string;
    plan_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getProjectTestcaseByNumber: (input: {
    project_id: string;
    testcase_number: string;
    version_uri?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getTestDesignTestcase: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getMindmap: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    mindmap_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getMindmapRecycle: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    recycle_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getMindmapBackup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    backup_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getMindmapStatistics: (input: {
    project_id: string;
    mindmap_id: string;
  }) => Promise<{
    mindmap_id: string;
    raw: Record<string, unknown>;
  }>;
  listMindmapsV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    id_collection?: string[];
    folder_id_collection?: string[];
    folder_root_id?: string;
    creator_name_collection?: string[];
    updater_name_collection?: string[];
  }) => Promise<{
    mindmaps: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listMindmapsV3: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    id_collection?: string[];
    folder_id_collection?: string[];
    folder_root_id?: string;
    creator_name_collection?: string[];
    updater_name_collection?: string[];
    branch_uri?: string;
    iterator_uri?: string;
    is_master?: number;
    confidentiality_code_collection?: string[];
  }) => Promise<{
    mindmaps: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTestpointsPage: (input: TestPlanOfficialPageQueryInput) => Promise<{
    testpoints: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listScenesPage: (input: TestPlanOfficialPageQueryInput) => Promise<{
    scenes: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listDefaultTemplates: (input: TestPlanListDefaultTemplatesInput) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listMindmapRecycles: (input: {
    project_id: string;
    page: number;
    page_size: number;
    creator_num?: string;
    text?: string;
  }) => Promise<{
    recycles: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listMindmapBackups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    mindmap_id?: string;
    bak_name?: string;
    type?: string;
  }) => Promise<{
    backups: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  countMindmaps: (input: {
    project_id: string;
    parent_folder_id_collection?: string[];
    project_type?: string;
    folder_root_id?: string;
    branch_uri?: string;
    iterator_uri?: string;
    is_master?: number;
    upward_recursion?: boolean;
  }) => Promise<{
    counts: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  listAssets: (input: {
    project_id: string;
  }) => Promise<{
    assets: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listAssetTree: (input: {
    project_id: string;
    asset_id: string;
  }) => Promise<{
    nodes: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listFactorsByAsset: (input: {
    project_id: string;
    asset_id: string;
    page: number;
    page_size: number;
    type?: string;
    name?: string;
    parent_node_ids?: string[];
    creator_num?: string;
    mindmap_id?: string;
    testpoint_id?: string;
    mindmap_node_id?: string;
  }) => Promise<{
    factors: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getFactor: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    factor_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  deleteFactor: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    factor_id: string;
    raw: Record<string, unknown>;
  }>;
  batchDeleteFactors: (input: {
    project_id: string;
    factor_ids: string[];
  }) => Promise<{
    factor_ids: string[];
    raw: Record<string, unknown>;
  }>;
  deleteAsset: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    asset_id: string;
    raw: Record<string, unknown>;
  }>;
  getTestDesignTemplate: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  deleteTestDesignTemplate: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    template_id: string;
    raw: Record<string, unknown>;
  }>;
  downloadTestDesignTemplate: (input: {
    project_id: string;
    file_name?: string;
  }) => Promise<{
    template_id?: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  downloadAssetTemplate: (input: {
    project_id: string;
  }) => Promise<{
    template_id?: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  exportMindmap: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    mindmap_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  deleteMindmap: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    mindmap_id: string;
    raw: Record<string, unknown>;
  }>;
  deleteMindmapRecycle: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    recycle_id: string;
    raw: Record<string, unknown>;
  }>;
  deleteMindmapBackup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    backup_id: string;
    raw: Record<string, unknown>;
  }>;
  listTesthubServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
  createTesthubService: (input: {
    service_name: string;
    server_host: string;
    server_type?: number;
  }) => Promise<{
    service_id: string;
    service_name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  updateTesthubService: (input: {
    service_id: string | number;
    service_name: string;
    server_host: string;
    server_type?: number;
  }) => Promise<{
    service_id: string;
    service_name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  deleteTesthubService: (input: {
    service_id: string | number;
  }) => Promise<{
    service_id: string;
    deleted: boolean;
    raw: Record<string, unknown>;
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
  deleteAttachment: (input: {
    project_id: string;
    attachment_uri: string;
  }) => Promise<{
    attachment_uri: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  associateAttachments: (input: {
    project_id: string;
    resource_uri: string;
    attachments: Array<Record<string, unknown>>;
    resource_type: string;
    system_type: string;
    version_uri?: string;
  }) => Promise<{
    project_id: string;
    resource_uri: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listProjectFieldConfigs: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listV4ProjectFieldConfigs: (input: {
    project_id: string;
  }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectDefects: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    module_id?: string;
    iteration_ids?: string;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectIssues: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_id?: string;
    iteration_ids?: string;
    status_id?: string;
    module_id?: string;
    show_page_flag?: string;
    keyword?: string;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listIssuesTree: (input: {
    project_id: string;
    service_type?: number;
    service_types?: number[];
    parent_id?: string;
    page_number?: number;
    page_size?: number;
    filter?: Record<string, unknown>;
    tracker_id?: string;
    module_id?: string;
    task_uri?: string;
    include_sub_issue?: boolean;
    [key: string]: unknown;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listIpdIssuesTree: (input: {
    project_id: string;
    page_number?: number;
    page_size?: number;
    filter?: Record<string, unknown>;
    tracker_id?: string | number;
    [key: string]: unknown;
  }) => Promise<{
    issues: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listProjectUsers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
  }>;
  addProjectUsers: (input: {
    project_id: string;
    user_id_List: string[];
  }) => Promise<{
    project_id: string;
    user_id_List: string[];
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  deleteProjectUsers: (input: {
    project_id: string;
    user_id_List: string[];
  }) => Promise<{
    project_id: string;
    user_id_List: string[];
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getCurrentUserPackagePermission: (input: {
    project_id: string;
    package_type: string;
  }) => Promise<{
    project_id: string;
    package_type: string;
    raw: Record<string, unknown>;
  }>;
  getUserPackagePermission: (input: {
    project_id: string;
    user_id: string;
    package_type: string;
  }) => Promise<{
    user_id: string;
    package_type: string;
    raw: Record<string, unknown>;
  }>;
  getDomainUserCount: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listProjectTags: (input: {
    project_id: string;
    resource_type: string;
  }) => Promise<{
    tags: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getCustomizedColumns: (input: {
    project_id: string;
    service_type: number;
    stage_type: number;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getCustomizedColumnsV4: (input: {
    project_id: string;
    service_type: number;
    stage_type: number;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getProjectDomainDetailInfo: (input: {
    project_id: string;
    order_query_type?: string;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getProjectAdvancedFeatureTrial: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getProjectAdvancedFeatureTrusted: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getDomainFrozenInfo: (input: {
    project_uuid: string;
  }) => Promise<{
    project_uuid: string;
    raw: Record<string, unknown>;
  }>;
  getDomainNeedPopup: (input: {
    project_uuid?: string;
  }) => Promise<{
    project_uuid?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getUserDisclaimer: (input: {
    type: string;
  }) => Promise<{
    type: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getProjectMessageNotices: (input: {
    project_id: string;
  }) => Promise<{
    notices: Array<Record<string, unknown>>;
    total?: number;
  }>;
  updateProjectMessageNotices: (input: {
    project_id: string;
    id: string;
    name?: string;
    type: number;
    send_email: boolean;
    send_message: boolean;
    notice_users?: Array<{
      id?: string;
      name?: string;
    }>;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    id: string;
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getProjectIssueUpdateNotification: (input: {
    project_id: string;
    owner_id: string;
  }) => Promise<{
    project_id: string;
    owner_id: string;
    raw: Record<string, unknown>;
  }>;
  updateProjectIssueUpdateNotification: (input: {
    project_id: string;
    owner_id: string;
    is_display: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    owner_id: string;
    value?: unknown;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getProjectMasterVersion: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  checkUserInfo: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getMindmapCreatorName: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listDynamicGlobalVariables: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
    body: unknown;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    raw: Record<string, unknown>;
  }>;
  getMindmapPermission: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  checkUserExists: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getDomainDetailInfo: (input: {
    domain_id?: string;
    region?: string;
    order_query_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getFreeDeclaration: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getGt3kUserInfoDomain: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getUserInfoDomain: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listGt3kBranches: (input: {
    project_uuid: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listV4Branches: (input: {
    project_uuid: string;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listV1Branches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getGt3kDomainInfo: (input: {
    project_uuid?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getGt3kBackgroundInfo: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getBackgroundInfo: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listGt3kCurrentUserTestcases: (input: {
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
    keyword?: string;
  }) => Promise<{
    testcases: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCurrentUserTestcases: (input: {
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
    keyword?: string;
  }) => Promise<{
    testcases: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getGt3kTestcaseChangeStatistics: (input: {
    project_id: string;
    version_id: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getTestcaseChangeStatistics: (input: {
    project_id: string;
    version_uri: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listTestcaseComments: (input: {
    project_id: string;
    testcase_id: string;
    page: number;
    page_size: number;
    version_uri?: string;
  }) => Promise<{
    comments: Array<Record<string, unknown>>;
    total?: number;
  }>;
  checkResourceExists: (input: {
    project_id: string;
    version_uri: string;
    type: number;
    resource_uri?: string;
    resource_uris?: string[];
    body?: string[];
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateTepShare: (input: {
    x_auth_tenantid: string;
    x_auth_groups: string;
    x_user_name: string;
    x_auth_token: string;
    isShare: boolean;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getTepRegisterCode: (input: {
    x_auth_tenantid: string;
    x_auth_groups: string;
    x_user_name: string;
    x_auth_token: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listTeps: (input: {
    x_auth_tenantid: string;
    x_auth_groups: string;
    x_user_name: string;
    x_auth_token: string;
    where?: Array<Record<string, unknown>>;
    option?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    teps: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
  listTestcaseReviews: (input: {
    testcase_uri: string;
    project_uuid: string;
    version_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reviews: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listReleaseVersions: (input: {
    project_id: string;
    resource_type: string;
    version_uri?: string;
    limit?: number;
  }) => Promise<{
    versions: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getDomainAccessInfo: (input: {
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listRegisteredServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getImageCapacityWarning: (input: {
    project_id: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  checkUserDefinedConfigUsed: (input: {
    project_id: string;
    config_id: string;
    type: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listServiceOfferings: (input: { serviceNames?: string }) => Promise<{
    offerings: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listEnvironments: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    environments: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listIteratorInfos: (input: { project_id: string }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listIteratorStageCounts: (input: {
    project_uuid: string;
    name?: string;
    filter?: Record<string, unknown>;
    branch_uri?: string;
    iterator_uri?: string;
    owner_ids?: string[];
    [key: string]: unknown;
  }) => Promise<{
    value?: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  listVisibleServices: (input: { project_id: string }) => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getLicenseSpecification: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listResourceNumberRules: (input: { project_id: string }) => Promise<{
    rules: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getProjectTestcaseGlobalConfig: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getApiTestProjectInfo: (input: {
    project_id: string;
    group_id?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getDesignData: (input: {
    project_id: string;
    x_auth_token: string;
    variableGroupID?: string;
    testcaseId?: string;
    testcaseIds?: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getProjectLocalConfig: (input: {
    project_id: string;
    property: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getProjectSystemConfig: (input: {
    project_uuid: string;
    owner_id: string;
    feature_name: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listSystemConfigs: (input: {
    project_id: string;
    params?: Record<string, unknown>;
    id?: string;
    key?: unknown;
    value?: string;
    remark?: string;
    region_id?: string;
    update_time?: string;
    update_name?: string;
    update_num?: string;
  }) => Promise<{
    configs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  checkProjectMemberExists: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listTestReportCustomInfos: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    infos: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectServiceRepos: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    repos: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getProjectServiceRepo: (input: {
    project_id: string;
    service_id: string | number;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listTaskDefects: (input: {
    project_id: string;
    task_uri: string;
    page: number;
    page_size: number;
    version_uri?: string;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listResourcePools: (input: { project_id: string }) => Promise<{
    pools: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDomainUsageInfos: (input: { project_uuid: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getGt3kProgress: (input: {
    operation_uri: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getServiceConfig: (input: {
    service_id: string;
    key: string;
    type: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getProjectServiceConfig: (input: {
    project_id: string;
    key?: string;
    type?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listAlertTemplates: (input: {
    service_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
  checkAlertUserName: (input: {
    service_id: string;
    user_name: string;
    user_id?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  checkAlertTemplateName: (input: {
    service_id: string;
    name: string;
    id?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getDashboardRunPanel: (input: { service_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listDashboardStatisticBlocks: (input: {
    service_id: string;
    start_time: number;
    end_time: number;
    executor_type?: string;
    label: string;
    location_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    blocks: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDashboards: (input: {
    service_id: string;
    name?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    dashboards: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestPackageStatus: (input: { service_id: string }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getApiTestConcurrencyPackageStatus: (input: { test_type?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getFunctionalTestParallelSummary: () => Promise<{
    raw: Record<string, unknown>;
  }>;
  getFunctionalTestPackageStatus: () => Promise<{
    raw: Record<string, unknown>;
  }>;
  checkApiTestTaskName: (input: {
    service_id: string;
    task_name: string;
    task_id?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getApiTestPackageChargePopup: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listApiTestPackageUsage: (input: { project_id: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getApiTestPackageChargeMessage: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getSuiteInfoPageUrl: (input: {
    testServiceId: string;
    suiteId: string;
  }) => Promise<{
    page_url?: string;
    raw: Record<string, unknown>;
  }>;
  getApiTestDebugLog: (input: {
    project_id: string;
    case_id: string;
    task_id: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getCaseLogdataUploadUrl: (input: {
    project_id: string;
    task_id: string;
    file_type: string;
    case_id?: string;
    filename?: string;
    round?: string;
  }) => Promise<{
    task_id: string;
    raw: Record<string, unknown>;
  }>;
  getCaseLogdataArchive: (input: {
    project_id: string;
    case_id: string;
    task_id: string;
    round?: string;
  }) => Promise<{
    task_id: string;
    case_id: string;
    raw: Record<string, unknown>;
  }>;
  listApiTestcaseExecuteHistories: (input: {
    project_id: string;
    testcase_id: string;
    page: number;
    page_size: number;
    plan_id?: string;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestcaseHistory: (input: {
    project_id: string;
    plan_id?: string;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listCasesStatus: (input: {
    testServiceId: string;
    x_auth_token: string;
    cases: string[];
  }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
  listCasesStatusV3: (input: {
    testServiceId: string;
    x_auth_token: string;
    cases: string[];
  }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
  listCaseHistory: (input: {
    testServiceId: string;
    x_auth_token: string;
    case_id?: string;
    task_id?: string;
    page: number;
    page_size: number;
    body?: Record<string, unknown>;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
  listCasesByStid: (input: {
    testServiceId: string;
    x_auth_token: string;
    suiteid: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
    status?: string[];
    owner_ids?: string[];
    results?: string[];
    plan_id?: string;
    stage?: unknown;
    body?: Record<string, unknown>;
  }) => Promise<{
    cases: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
  }>;
  createCasesTask: (input: {
    testServiceId: string;
    x_auth_token: string;
    cases: string[];
    task_name: string;
    plan_id?: string;
    projectId?: string;
    projectUUId?: string;
    serviceType?: number;
    functionType?: string;
    releaseversion?: string;
    resourcePool?: string | Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    need_approve?: unknown;
    warn?: unknown[];
    package_type?: string;
    is_popup?: boolean;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  deleteProjectNotice: (input: {
    testServiceId: string;
    x_auth_token: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  stopCaseTask: (input: {
    testServiceId: string;
    caseId: string;
    x_auth_token: string;
  }) => Promise<{
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  getFreeTestTime: (input: { testServiceId: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getTestSuitesVarListForPipeline: (input: {
    testServiceId: string;
    x_auth_token: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getUserEtlDataTotal: (input: TestPlanEtlQueryInput & { project_uuid: string }) => Promise<{
    total?: number;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  queryUserEtlData: (input: TestPlanEtlQueryInput & { project_uuid: string }) => Promise<{
    rows: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getTesthubEtlDataTotal: (input: TestPlanEtlQueryInput & { project_uuid: string }) => Promise<{
    total?: number;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  queryTesthubEtlDataList: (input: TestPlanEtlQueryInput) => Promise<{
    rows: Array<Record<string, unknown>>;
    total?: number;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getTesthubEtlMaxRowSize: (input: {
    table_name: string;
    schema_no?: string;
    project_uuid?: string;
    query_fields?: string[];
    [key: string]: unknown;
  }) => Promise<{
    size?: number;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  queryTesthubEtlData: (input: TestPlanEtlQueryInput) => Promise<{
    rows: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getTaskGroupDetail: (input: {
    task_id: string;
    x_auth_tenantid: string;
    x_auth_groups: string;
    x_user_name: string;
    x_auth_token: string;
  }) => Promise<{
    task_id: string;
    tasks: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getTaskGroupHistory: (input: {
    request_id: string;
    taskGroupId: string;
    testServiceId: string;
    x_auth_groups: string;
    x_user_name: string;
    x_auth_token: string;
    coldDataFlag?: boolean;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_group_id: string;
    test_service_id: string;
    raw: Record<string, unknown>;
  }>;
  executeTaskGroup: (input: {
    x_auth_token: string;
    x_auth_groups?: string;
    branchId?: string;
    branchName?: string;
    versionId?: string;
    versionName?: string;
    id?: string;
    author?: string;
    analyser?: string;
    testServiceId?: string;
    userName?: string;
    taskGroupName?: string;
    scheduledTime?: string;
    intervalTime?: string;
    intervalTimeUnit?: string;
    taskPolicy?: number;
    taskGroupExeParam?: Record<string, unknown>;
    taskStrategy?: Record<string, unknown>;
    circle?: Record<string, unknown>;
    overTimeParam?: Record<string, unknown>;
    tmssInfo?: Record<string, unknown>;
    tasks?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_group_id?: string;
    status?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createRepositoryTestsuite: (input: {
    project_id: string;
    x_auth_token: string;
    testsuite_name: string;
    repository_id: string;
    repository_branch: string;
    file_path: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    testsuite_id?: string;
    testcase_ids: string[];
    raw: Record<string, unknown>;
  }>;
  copyTaskRelations: (input: {
    project_id: string;
    original_task_uri: string;
    dest_task_uri: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    project_id: string;
    original_task_uri: string;
    dest_task_uri: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listApiTestsuiteHistory: (input: {
    project_id: string;
    plan_id?: string;
  }) => Promise<{
    histories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getApiTestDnsMapping: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listApiTestGlobalParamNames: (input: { project_id: string }) => Promise<{
    params: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestVariables: (input: {
    project_id: string;
    group_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    variables: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getApiTestBasicAwV3: (input: {
    project_id: string;
    aw_id: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getApiTestBasicAwV4: (input: {
    project_id: string;
    aw_id: string;
    is_api?: boolean;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listApiTestBasicAwInfos: (input: {
    project_id: string;
    page: number;
    page_size: number;
    aw_name?: string;
    parent_id?: string;
  }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestBasicAwInfosV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    aw_name?: string;
    parent_id?: string;
  }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  searchApiTestBasicAwInfos: (input: {
    project_id: string;
    page: number;
    page_size: number;
    parent_id?: string;
    search_type?: string;
    search_value?: string;
  }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  batchSendNotifications: (input: {
    project_id: string;
    type?: string;
    receivers?: string[];
    comment_id?: string;
    inner_text?: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createResourceUriV4: (input: {
    project_id: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  importTasks: (input: {
    source_version_uri: string;
    dest_version_uri: string;
    source_task_uris: string[];
    project_uuid: string;
    is_copy?: boolean;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  uploadBackground: (input: {
    project_id: string;
    background_type: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<TestPlanTokenUploadResult>;
  createTestStepByCollection: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    branch_uri?: string;
    tmss_case_uri?: string;
    content_type?: string;
  }) => Promise<TestPlanTokenUploadResult>;
  uploadFileToGit: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    aw_ins_id?: string;
    case_id?: string;
    is_combined_aw?: boolean;
    content_type?: string;
  }) => Promise<TestPlanTokenUploadResult>;
  uploadFileV3: (input: {
    project_id: string;
    x_auth_token: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<TestPlanTokenUploadResult>;
  uploadResourceAttachment: (input: {
    project_id: string;
    resource_uri: string;
    resource_type: string;
    version_uri: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<TestPlanTokenUploadResult>;
  getExecutorElements: (input: {
    project_id: string;
    execute_mode?: string;
    testcase_infos?: Array<Record<string, unknown>>;
    body?: Record<string, unknown>;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  downloadClasses: (input: {
    project_id: string;
    testcase_ids?: string[];
    body?: Record<string, unknown>;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateUserInfos: (input: {
    project_id: string;
    old_user_num?: string;
    new_user_num?: string;
    update_business_type?: string;
    update_resource_id?: string;
    params?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listApiTestBasicAwsBatch: (input: {
    project_id: string;
    aw_ids: string[];
  }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestChildBasicAws: (input: {
    project_id: string;
    parent_id: string;
    aw_name?: string;
    source_type?: string | number;
  }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  updateAwCataFirst: (input: {
    project_id: string;
    cata_id: string;
    cata_name: string;
    parent_id?: string;
    source_type?: string | number;
  }) => Promise<{
    cata_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  createAwCataFirst: (input: {
    project_id: string;
    name?: string;
    desc?: string;
    parent_id?: string;
    aw_type?: string | number;
    body?: Record<string, unknown>;
  }) => Promise<{
    cata_id?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteAwCatas: (input: {
    project_id: string;
    items: Array<Record<string, unknown> & { id: string; is_folder?: boolean }>;
  }) => Promise<{
    ids: string[];
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteCustomAwFile: (input: {
    project_id: string;
    basic_aw_id: string;
    aw_lib_id: string;
  }) => Promise<{
    basic_aw_id: string;
    aw_lib_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateAwNameView: (input: {
    project_id: string;
    name_view?: string;
    source_type?: string | number;
    body?: string | Record<string, unknown>;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  updateTimeOutView: (input: {
    project_id: string;
    time_out?: string | number;
    source_type?: string | number;
    body?: string | Record<string, unknown>;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  saveAwRefreshToAll: (input: {
    project_id: string;
    aw_id: string;
    body: Record<string, unknown>;
  }) => Promise<{
    aw_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteBasicAwsV1: (input: {
    project_id: string;
    aw_ids: string[];
    is_api?: boolean;
  }) => Promise<{
    aw_ids: string[];
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteBasicAwsV2: (input: {
    project_id: string;
    aw_ids: string[];
    is_api?: boolean;
  }) => Promise<{
    aw_ids: string[];
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteIssueDynamicRecords: (input: {
    project_id: string;
    issue_id: string;
    owner_id: string;
  }) => Promise<{
    issue_id: string;
    owner_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteCustomizedFilter: (input: {
    project_id: string;
    filter_uri: string;
  }) => Promise<{
    filter_uri: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteVectors: (input: {
    project_uuid: string;
    case_uris: string[];
  }) => Promise<{
    project_uuid: string;
    case_uris: string[];
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteRecycleResource: (input: {
    project_uuid: string;
    resources: Array<{
      resource_type: string;
      resource_uris: string[];
    }>;
    is_async?: boolean;
  }) => Promise<{
    project_uuid: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  deleteTestcasesV3: (input: {
    project_id: string;
    testcases: Array<Record<string, unknown>>;
    delete_git_script?: boolean;
    iterator_uri?: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listApiTestAwNameViews: (input: { project_id: string }) => Promise<{
    views: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listApiTestBasicAwParamProperties: (input: {
    project_id: string;
    aw_id: string;
  }) => Promise<{
    properties: string[];
    total?: number;
  }>;
  listPublicAwLibAndAws: (input: { project_id: string }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getApiTestAvailableConfig: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getTestcaseScriptDetailV1: (input: {
    project_id: string;
    tmss_case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getTestcaseScriptDetailV3: (input: {
    project_id: string;
    tmss_case_uri: string;
    task_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  getTestcaseScriptDetailV4: (input: {
    project_id: string;
    tmss_case_uri: string;
    task_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  listVariableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listVariableGroupNames: (input: {
    project_id: string;
    page: number;
    page_size: number;
    query?: string;
    name?: string;
  }) => Promise<{
    groups: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listNoticeConfigs: (input: { project_id: string }) => Promise<{
    notices: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTimeoutSettings: (input: { project_id: string }) => Promise<{
    settings: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listVariablesV3: (input: {
    project_id: string;
    group_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    variables: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listVariablesByGroup: (input: {
    project_id: string;
    group_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    variables: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listVariablesByGroupWithSensitive: (input: {
    project_id: string;
    group_id?: string;
  }) => Promise<{
    variables: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showSensitivePropertyById: (input: {
    project_id: string;
    group_id: string;
    var_id: string;
  }) => Promise<{
    variable_id: string;
    value?: unknown;
    redacted: boolean;
    raw: Record<string, unknown>;
  }>;
  showVariablesDecrypt: (input: {
    project_id: string;
    variable_id: string;
  }) => Promise<{
    variable_id: string;
    value?: unknown;
    redacted: boolean;
    raw: Record<string, unknown>;
  }>;
  getVariableSynchronizationV2: (input: {
    project_id: string;
    variable_name: string;
    group_id?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getVariableSynchronization: (input: {
    project_id: string;
    variable_name: string;
    group_id?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getProgress: (input: { id: string; project_id?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getProjectProgress: (input: { project_id: string; operation_uri: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getTesthubProgress: (input: { project_uuid: string; operation_uri: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listGt3kProjectServiceRepos: (input: {
    project_uuid: string;
    page: number;
    page_size: number;
  }) => Promise<{
    repos: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listGt3kIteratorInfos: (input: { project_id: string }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listGt3kVisibleServices: (input: { project_id: string }) => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listGt3kDomainUsageInfos: (input: { project_uuid: string }) => Promise<{
    usages: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listGt3kTestcaseFields: (input: { project_id: string }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getGt3kFreeDeclaration: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  listV4TestcaseReviews: (input: {
    testcase_uri: string;
    project_uuid: string;
    version_uri: string;
    page: number;
    page_size: number;
  }) => Promise<{
    reviews: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getBranch: (input: {
    branch_uri: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  getGt3kBranch: (input: {
    branch_id: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listIteratorIssueIds: (input: {
    project_id: string;
    iterator_uri: string;
  }) => Promise<{
    issue_ids: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listFeatureDescendantUris: (input: {
    project_id: string;
    feature_uri: string;
  }) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
  }>;
  searchFeatures: (input: {
    project_uuid: string;
    version_uri: string;
    key_word: string;
    page: number;
    page_size: number;
    parent_uri?: string;
  }) => Promise<{
    features: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  searchFeaturesByCase: (input: {
    project_uuid: string;
    version_uri: string;
    case_uri: string;
    service_types: number[];
  }) => Promise<{
    feature?: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  listFeatureCaseCounts: (input: {
    project_uuid: string;
    version_uri: string;
    contain_root?: boolean;
    contain_child?: boolean;
    task_uri?: string;
    filter_child?: boolean;
    not_in_other_it?: boolean;
    condition_type?: string;
    condition_value?: string;
    test_case_conditions?: Array<Record<string, unknown>>;
    feature_uris?: string[];
    upward_recursion?: boolean;
  }) => Promise<{
    counts: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listFeatureChildren: (input: TestPlanFeatureChildrenInput) => Promise<{
    children: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listGt3kFeatureChildren: (input: TestPlanFeatureChildrenInput) => Promise<{
    children: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listFeatureChildrenV5: (input: TestPlanFeatureChildrenInput & { version_uri: string }) => Promise<{
    children: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listGt3kFeatureChildrenV5: (input: TestPlanFeatureChildrenInput) => Promise<{
    children: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  getTestcaseField: (input: {
    project_id: string;
    uri: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
  listTestexecutorResourcePools: (input: { project_id: string }) => Promise<{
    pools: Array<Record<string, unknown>>;
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
  listIteratorsV4WithStats: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    page: number;
    page_size: number;
    name?: string;
    current_stage?: string;
    branch_uri?: string;
    with_stats?: boolean;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTesthubIteratorsV5: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    current_stage?: string;
    branch_uri?: string;
    fix_version_ids?: string;
    query_all_version?: boolean;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getIterator: (input: {
    project_uuid: string;
    iterator_uri: string;
  }) => Promise<{
    iterator_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
  createTesthubIterator: (input: {
    project_id: string;
    name: string;
    assigned_id: string;
    service_id_list: number[];
    plan_cycle: {
      start_date: string;
      end_date: string;
    };
    branch_uri?: string;
  }) => Promise<{
    iterator_id: string;
    name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
  getGt3kIterator: (input: {
    project_uuid: string;
    iterator_id: string;
  }) => Promise<{
    iterator_id: string;
    name?: string;
    raw: Record<string, unknown>;
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
  listIteratorIssueCases: (input: {
    project_id: string;
    iterator_uri: string;
    workitem_list: Array<Record<string, unknown>>;
  }) => Promise<{
    case_ids: Array<Record<string, unknown>>;
    total?: number;
  }>;
  batchAddIteratorTestcases: (input: {
    project_id: string;
    iterator_uri: string;
    service_id: number;
    testcase_id_list: string[];
  }) => Promise<{
    iterator_uri: string;
    testcase_count: number;
    added: boolean;
    raw: Record<string, unknown>;
  }>;
  batchDeleteIteratorsV4: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    iterator_uris?: string[];
    iterator_ids?: string[];
  }) => Promise<{
    project_id?: string;
    iterator_uris: string[];
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchDeleteBranchesV4: (input: TestPlanOfficialBatchBodyInput & {
    project_id?: string;
    branch_uris?: string[];
    branch_ids?: string[];
    is_async?: boolean;
  }) => Promise<{
    project_id?: string;
    branch_uris: string[];
    deleted: boolean;
    value?: unknown;
    raw: Record<string, unknown>;
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
  createExecutionTaskV1: (input: TestPlanOfficialBatchBodyInput & {
    project_id: string;
    name?: string;
    uri?: string;
    description?: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
  batchUpdateTaskAttributes: (input: {
    project_id: string;
    task_uris: string[];
    tag_names: string[];
    version_uri: string;
    project_uuid?: string;
    is_async?: boolean;
    is_delete?: boolean;
  }) => Promise<{
    project_id: string;
    task_uris: string[];
    value?: unknown;
    raw: Record<string, unknown>;
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
  deleteWorkItemTestRelation: (input: {
    work_item_id: string;
    test_case_uris: string[];
    project_uuid: string;
    version_uri?: string;
    relate_type?: string;
  }) => Promise<{
    work_item_id: string;
    test_case_uris: string[];
    project_uuid: string;
    version_uri?: string;
    relate_type?: string;
    value?: unknown;
    deleted: boolean;
    raw: Record<string, unknown>;
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
  updateTaskExecutionInfo: (input: {
    project_id: string;
    task_uri: string;
    result_code?: number;
    status_code?: number;
    execute_latest_time?: string;
    execute_duration?: string;
    execute_times?: number;
    total_execute_times?: number;
    version_uri?: string;
    executor_id?: string;
    execute_status_code?: number;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    task_uri: string;
    value?: string;
    updated: boolean;
  }>;
  updateTaskExecutionStatus: (input: {
    project_id: string;
    task_uri: string;
    result_code?: number;
    status_code?: number;
    execute_latest_time?: string;
    execute_duration?: string;
    execute_times?: number;
    total_execute_times?: number;
    version_uri?: string;
    executor_id?: string;
    execute_status_code?: number;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    task_uri: string;
    value?: string;
    updated: boolean;
  }>;
  stopTaskExecutionByCase: (input: {
    project_id: string;
    task_uri: string;
    result_code?: number;
    status_code?: number;
    execute_latest_time?: string;
    execute_duration?: string;
    execute_times?: number;
    total_execute_times?: number;
    version_uri?: string;
    executor_id?: string;
    execute_status_code?: number;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    task_uri: string;
    value?: string;
    stopped: boolean;
  }>;
  batchUpdateTestcaseExecutionInfo: (input: {
    project_id: string;
    result_code?: number;
    status_code?: number;
    execute_latest_time?: string;
    execute_duration?: string;
    execute_times?: number;
    total_execute_times?: number;
    task_uri?: string;
    version_uri?: string;
    executor_id?: string;
    execute_status_code?: number;
    case_list?: Array<Record<string, unknown>>;
  }) => Promise<{
    project_id: string;
    value?: string;
    updated: boolean;
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
  listIssueTestcases: (input: {
    project_id: string;
    issue_id: string;
    page: number;
    page_size: number;
    version_uri?: string;
    relate_type?: string;
    key_word?: string;
    sort_field?: string;
    sort_type?: string;
    rank_ids?: string[];
    result_codes?: string[];
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
    raw: Record<string, unknown>;
  }>;
  listIssueCaseCounts: (input: {
    project_id: string;
    version_uri: string;
    issue_ids: string[];
    service_type?: number;
    service_types?: number[];
    parent_id?: string;
    task_uri?: string;
  }) => Promise<{
    counts: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listTestcaseRelations: (input: {
    project_id: string;
    test_case_uris: string[];
    page: number;
    page_size: number;
    version_uri?: string;
    tracker_id?: string;
    relate_type?: string;
    owner?: string[];
    severity?: string[];
    status?: string[];
    findReleaseDev?: string[];
    keyWord?: string;
    ownerContainEmpty?: boolean;
    severityContainEmpty?: boolean;
    statusContainEmpty?: boolean;
  }) => Promise<{
    relations: Array<Record<string, unknown>>;
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
  getTestcaseDatasetSample: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
  getTestcaseDataset: (input: {
    project_id: string;
    case_uri: string;
    group_id: string;
  }) => Promise<{
    case_uri: string;
    group_id: string;
    raw: Record<string, unknown>;
  }>;
  listResourceOperationRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
    resource_id?: string;
    resource_type?: string;
    operation_type?: string;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
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

function readNumberLike(input: unknown) {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string" && input.trim() !== "") {
    const parsed = Number(input);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function readOptionalString(input: unknown) {
  return typeof input === "string" ? input : undefined;
}

function readResultPayload(input: unknown) {
  const envelope = readEnvelope(input) ?? {};
  return readEnvelope(envelope.result) ?? envelope;
}

function readResultStatus(input: unknown, payload?: Record<string, unknown>) {
  const envelope = readEnvelope(input) ?? {};
  return readOptionalString(envelope.status) ?? readOptionalString(payload?.status);
}

function readResultValue(input: unknown, payload: Record<string, unknown>) {
  const envelope = readEnvelope(input) ?? {};
  return envelope.result ?? envelope.value ?? envelope.data ?? payload.result ?? payload.value ?? payload.data;
}

function readBodyOverride(input: TestPlanOfficialBatchBodyInput, fallback: Record<string, unknown>) {
  return input.body ?? fallback;
}

function readRecordCount(...inputs: unknown[]) {
  for (const input of inputs) {
    if (Array.isArray(input)) {
      return input.length;
    }
  }

  return 0;
}

function readTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const envelope = readEnvelope(response) ?? {};

  return (
    readOptionalNumber(payload.total) ??
    readOptionalNumber(payload.total_count) ??
    readOptionalNumber(payload.total_size) ??
    readOptionalNumber(envelope.total) ??
    readOptionalNumber(envelope.total_count) ??
    readOptionalNumber(envelope.total_size) ??
    fallback
  );
}

function readRowsFromPayload(payload: Record<string, unknown>) {
  const value = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;
  return readArray<unknown>(value.values ?? value.value ?? value.items ?? value.list).map((item) =>
    typeof item === "object" && item !== null ? (item as Record<string, unknown>) : { value: item }
  );
}

function readEtlStatus(response: unknown, payload: Record<string, unknown>) {
  const envelope = readEnvelope(response) ?? {};
  return readOptionalString(envelope.status) ?? readOptionalString(payload.status);
}

function readEtlTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const value = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;
  return readTotal(value, response, fallback);
}

function createOverviewBody(input: TestPlanOverviewFilterInput) {
  const body: Record<string, unknown> = {
    version_uri: input.version_uri
  };
  if (input.module_id !== undefined) {
    body.module_id = input.module_id;
  }
  if (input.fixed_version_id !== undefined) {
    body.fixed_version_id = input.fixed_version_id;
  }
  if (input.owner_id !== undefined) {
    body.owner_id = input.owner_id;
  }
  if (input.own !== undefined) {
    body.own = input.own;
  }
  if (input.pi_filter !== undefined) {
    body.pi_filter = input.pi_filter;
  }

  return body;
}

function createBodyWithoutProjectId(input: TestPlanRecordBodyInput) {
  const { project_id: _projectId, ...body } = input;
  return body;
}

function createFeatureChildrenBody(input: TestPlanFeatureChildrenInput) {
  const body: Record<string, unknown> = {
    project_uuid: input.project_uuid
  };
  if (input.owner !== undefined) {
    body.owner = input.owner;
  }
  if (input.stage !== undefined) {
    body.stage = input.stage;
  }
  if (input.activity !== undefined) {
    body.activity = input.activity;
  }
  if (input.version_uri !== undefined) {
    body.version_uri = input.version_uri;
  }
  if (input.task_uri !== undefined) {
    body.task_uri = input.task_uri;
  }
  if (input.service_type !== undefined) {
    body.service_type = input.service_type;
  }
  if (input.contain_total !== undefined) {
    body.contain_total = input.contain_total;
  }
  if (input.sort_type !== undefined) {
    body.sort_type = input.sort_type;
  }
  if (input.page_number !== undefined) {
    body.page_number = input.page_number;
  }
  if (input.page_size !== undefined) {
    body.page_size = input.page_size;
  }

  return body;
}

function createRequirementsOverviewDetailsBody(input: {
  work_item_id: string;
  work_item_name?: string;
  page: number;
  page_size: number;
}) {
  const body: Record<string, unknown> = {
    work_item_id: input.work_item_id,
    page_no: input.page,
    page_size: input.page_size
  };
  if (input.work_item_name !== undefined) {
    body.work_item_name = input.work_item_name;
  }
  return body;
}

function readPageItems(payload: Record<string, unknown>) {
  const data = readEnvelope(payload.data);
  const result = readEnvelope(payload.result);

  return readArray<Record<string, unknown>>(
    data?.page_list ??
      data?.items ??
      data?.list ??
      data?.value ??
      result?.page_list ??
      result?.items ??
      result?.list ??
      result?.value ??
      payload.page_list ??
      payload.items ??
      payload.list ??
      payload.value
  );
}

function readPageTotal(payload: Record<string, unknown>, response: unknown, fallback?: number) {
  const data = readEnvelope(payload.data);
  const result = readEnvelope(payload.result);

  return (
    readOptionalNumber(data?.total) ??
    readOptionalNumber(data?.total_count) ??
    readOptionalNumber(data?.total_size) ??
    readOptionalNumber(result?.total) ??
    readOptionalNumber(result?.total_count) ??
    readOptionalNumber(result?.total_size) ??
    readTotal(payload, response, fallback)
  );
}

function createTesthubTestcasesBody(input: TestPlanTesthubTestcasesInput) {
  const body: Record<string, unknown> = {
    page_number: input.page,
    page_size: input.page_size
  };
  for (const key of [
    "useOffset",
    "plan_id",
    "case_ids",
    "owner_ids",
    "status_ids",
    "rank_ids",
    "module_ids",
    "issue_id",
    "creator_ids",
    "result_ids",
    "iteration_ids",
    "start_time",
    "end_time",
    "associate_issue",
    "associated_defects",
    "show_children",
    "label_ids",
    "execute_start_time",
    "execute_end_time",
    "executor_ids",
    "is_keyword",
    "issue_tree_search",
    "service_id",
    "stage_type",
    "cata_id",
    "subject",
    "sort_field",
    "sort_type",
    "associate_issue_detail"
  ] as const) {
    const value = input[key];
    if (value !== undefined) {
      body[key] = value;
    }
  }
  return body;
}

function createTesthubTestcasesV5Body(input: TestPlanTesthubTestcasesV5Input) {
  const body: Record<string, unknown> = {
    offset: (input.page - 1) * input.page_size,
    limit: input.page_size,
    page_number: input.page,
    page_size: input.page_size
  };
  if (input.useOffset !== undefined) {
    body.useOffset = input.useOffset;
  }
  if (input.version_id !== undefined) {
    body.version_id = input.version_id;
  }
  if (input.execution_type_id !== undefined) {
    body.execution_type_id = input.execution_type_id;
  }
  return body;
}

function createTestcaseUrisBody(input: TestPlanTestcaseUrisInput) {
  const body: Record<string, unknown> = {
    page_no: input.page,
    page_size: input.page_size
  };
  for (const key of [
    "keyword",
    "useOffset",
    "version_uri",
    "case_uris",
    "owner_ids",
    "status_codes",
    "rank_ids",
    "module_ids",
    "issue_id",
    "creator_ids",
    "result_codes",
    "iteration_ids",
    "create_start_time",
    "create_end_time",
    "associated_issue",
    "associated_defects",
    "include_sub_issue",
    "include_sub_feature",
    "label_ids",
    "execute_start_time",
    "execute_end_time",
    "executor_ids",
    "test_types",
    "is_keyword",
    "issue_tree_search",
    "service_type",
    "service_types",
    "stage_type",
    "feature_uri",
    "sort_field",
    "sort_type",
    "case_type",
    "custom_field_info",
    "task_uri",
    "associate_issue_detail",
    "not_assign_task",
    "test_designs",
    "review_status",
    "just_return_id"
  ] as const) {
    const value = input[key];
    if (value !== undefined) {
      body[key] = value;
    }
  }
  return body;
}

function createTestcasesBatchBody(input: TestPlanTestcasesBatchInput) {
  const body: Record<string, unknown> = {
    page_no: input.page,
    page_size: input.page_size
  };
  for (const key of [
    "keyword",
    "useOffset",
    "version_uri",
    "case_uris",
    "owner_ids",
    "status_codes",
    "rank_ids",
    "module_ids",
    "issue_id",
    "creator_ids",
    "result_codes",
    "iteration_ids",
    "create_start_time",
    "create_end_time",
    "associated_issue",
    "associated_defects",
    "include_sub_issue",
    "include_sub_feature",
    "label_ids",
    "execute_start_time",
    "execute_end_time",
    "executor_ids",
    "test_types",
    "is_keyword",
    "issue_tree_search",
    "service_type",
    "service_types",
    "stage_type",
    "feature_uri",
    "sort_field",
    "sort_type",
    "case_type",
    "custom_field_info",
    "task_uri",
    "associate_issue_detail",
    "not_assign_task",
    "test_designs",
    "review_status",
    "just_return_id",
    "exeplatforms",
    "own",
    "queryByDisplayCfg"
  ] as const) {
    const value = input[key];
    if (value !== undefined) {
      body[key] = value;
    }
  }
  return body;
}

function createOfficialPageParams(input: TestPlanOfficialPageQueryInput) {
  const params: Record<string, unknown> = {
    offset: input.offset ?? input.page,
    limit: input.page_size
  };
  const deleted =
    input.deleted === "0" ? "no" : input.deleted === "1" ? "yes" : input.deleted;
  if (deleted !== undefined) {
    params.deleted = deleted;
  }
  for (const key of ["mindmap_id", "node_id"] as const) {
    const value = input[key];
    if (value !== undefined) {
      params[key] = value;
    }
  }
  return params;
}

function createDefaultTemplatesParams(input: TestPlanListDefaultTemplatesInput) {
  const params: Record<string, unknown> = {};
  if (input.name !== undefined) {
    params.name = input.name;
  }
  return params;
}

function createVariableGroupNamePagingBody(input: {
  page: number;
  page_size: number;
  query?: string;
  name?: string;
}) {
  if (input.query !== undefined) {
    try {
      const parsed = JSON.parse(input.query) as unknown;
      if (readEnvelope(parsed)?.ListVariableGroupNamePagingRequestBody !== undefined) {
        return parsed;
      }
      if (Array.isArray(parsed)) {
        return { ListVariableGroupNamePagingRequestBody: parsed };
      }
      return { ListVariableGroupNamePagingRequestBody: [parsed] };
    } catch {
      return { ListVariableGroupNamePagingRequestBody: [input.query] };
    }
  }

  if (input.name === undefined) {
    return { ListVariableGroupNamePagingRequestBody: [null] };
  }

  const query: Record<string, unknown> = {
    pageNo: input.page,
    pageSize: input.page_size
  };
  query.name = input.name;

  return { ListVariableGroupNamePagingRequestBody: [query] };
}

function createSystemConfigsParams(input: {
  project_id: string;
  params?: Record<string, unknown>;
  id?: string;
  key?: unknown;
  value?: string;
  remark?: string;
  region_id?: string;
  update_time?: string;
  update_name?: string;
  update_num?: string;
}) {
  const params: Record<string, unknown> = { project_id: input.project_id, ...(input.params ?? {}) };
  for (const key of [
    "id",
    "key",
    "value",
    "remark",
    "region_id",
    "update_time",
    "update_name",
    "update_num"
  ] as const) {
    const value = input[key];
    if (value !== undefined) {
      params[key] = value;
    }
  }
  return params;
}

function readNameFromObject(input: unknown) {
  const value = readEnvelope(input);
  return typeof value?.name === "string" ? value.name : undefined;
}

function mapExternalTestcase(item: Record<string, unknown>) {
  return {
    case_id: String(item.id ?? item.case_uri ?? item.uri ?? ""),
    name: typeof item.name === "string" ? item.name : undefined,
    number: typeof item.number === "string" ? item.number : undefined,
    status:
      typeof item.status === "string" ? item.status : readNameFromObject(item.status),
    result:
      typeof item.result === "string" ? item.result : readNameFromObject(item.result),
    test_type:
      typeof item.test_type === "string"
        ? item.test_type
        : readNameFromObject(item.test_type),
    case: item
  };
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

function toQueryString(values: Record<string, string | number | boolean | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    appendQueryValue(query, key, value);
  }

  return query.toString();
}

function redactSensitiveVariable(variable: Record<string, unknown>) {
  if (variable.isSensitiveInfo !== true) {
    return variable;
  }

  const redacted = { ...variable };
  for (const key of [
    "property",
    "functionParams",
    "value",
    "defaultValue",
    "paramValue",
    "sensitiveValue"
  ]) {
    if (key in redacted) {
      redacted[key] = "[REDACTED]";
    }
  }

  return redacted;
}

function redactedStringValue(input: unknown) {
  return typeof input === "string" && input !== "" ? "[REDACTED]" : input;
}

function redactStringResult(payload: Record<string, unknown>) {
  const result = redactedStringValue(payload.result);
  const redacted = result !== payload.result;

  return {
    value: result,
    redacted,
    raw: {
      ...payload,
      result
    }
  };
}

function redactSensitiveProjectInfoValue(key: string, value: unknown): unknown {
  const lowerKey = key.toLowerCase();
  const isSensitiveKey =
    lowerKey.includes("password") ||
    lowerKey.includes("private_key") ||
    lowerKey.includes("secret") ||
    lowerKey.includes("token") ||
    lowerKey.includes("credential");

  if (isSensitiveKey && value !== undefined && value !== null && value !== "") {
    return "[REDACTED]";
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        return redactSensitiveProjectInfo(item as Record<string, unknown>);
      }

      return item;
    });
  }

  if (value && typeof value === "object") {
    return redactSensitiveProjectInfo(value as Record<string, unknown>);
  }

  return value;
}

function redactSensitiveProjectInfo(projectInfo: Record<string, unknown>) {
  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(projectInfo)) {
    redacted[key] = redactSensitiveProjectInfoValue(key, value);
  }

  if (Array.isArray(redacted.variables)) {
    redacted.variables = redacted.variables.map((item) =>
      item && typeof item === "object" && !Array.isArray(item)
        ? redactSensitiveVariable(item as Record<string, unknown>)
        : item
    );
  }

  return redacted;
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
    async listPlansV2(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "name", input.keyword);
      appendQueryValue(query, "current_stage", input.current_stage);
      appendQueryValue(query, "fix_version_ids", input.fix_version_ids);
      appendQueryValue(query, "branch_uri", input.branch_uri);
      appendQueryValue(query, "query_all_version", input.query_all_version);

      const response = await _http.get(
        `/v2/projects/${encodeURIComponent(input.project_id)}/plans?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const plans = readArray<Record<string, unknown>>(
        Array.isArray(response)
          ? response
          : payload.plans ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        plans: plans.map((item) => {
          const owner = readEnvelope(item.owner);
          const ownerName =
            typeof item.owner_name === "string"
              ? item.owner_name
              : typeof owner?.name === "string"
                ? owner.name
                : typeof owner?.user_name === "string"
                  ? owner.user_name
                  : undefined;

          return {
            plan_id: String(item.plan_id ?? item.id ?? item.uri ?? ""),
            name: typeof item.name === "string" ? item.name : "",
            owner_name: ownerName,
            status:
              typeof item.status === "string"
                ? item.status
                : typeof item.current_stage === "string"
                  ? item.current_stage
                  : undefined,
            description: typeof item.description === "string" ? item.description : undefined,
            raw: item
          };
        }),
        total: readTotal(payload, response, plans.length)
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
    async listPlanJournals(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}/journals?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const journals = readArray<Record<string, unknown>>(
        payload.journals ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        journals,
        total: readTotal(payload, response, journals.length)
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
    async listTesthubTestcases(input) {
      const response = await _http.post(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/testcases/batch-query`,
        createTesthubTestcasesBody(input)
      );
      const payload = readResultPayload(response);
      const cases = readArray<Record<string, unknown>>(
        payload.data ?? payload.value ?? payload.items ?? payload.list
      ).map(mapExternalTestcase);

      return {
        cases,
        total: readTotal(payload, response, cases.length),
        raw: payload
      };
    },
    async listTesthubTestcasesV5(input) {
      const response = await _http.post(
        `/v5/testhub/projects/${encodeURIComponent(input.project_id)}/testcases/batch-query`,
        createTesthubTestcasesV5Body(input)
      );
      const payload = readResultPayload(response);
      const cases = readArray<Record<string, unknown>>(
        payload.values ?? payload.data ?? payload.value ?? payload.items ?? payload.list
      ).map(mapExternalTestcase);

      return {
        cases,
        total: readTotal(payload, response, cases.length),
        raw: payload
      };
    },
    async listTestcaseUrisV4(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/testcases/uris/batch-query`,
        createTestcaseUrisBody(input)
      );
      const payload = readResultPayload(response);
      const uris = readArray<string>(payload.value ?? payload.values ?? payload.items ?? payload.list).map(
        (value) => ({
          id: value,
          value
        })
      );

      return {
        uris,
        total: readTotal(payload, response, uris.length),
        raw: payload
      };
    },
    async listTestcaseUriInfosV5(input) {
      const response = await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/testcases/uris/batch-query`,
        createTestcaseUrisBody(input)
      );
      const payload = readResultPayload(response);
      const cases = readArray<Record<string, unknown>>(
        payload.value ?? payload.values ?? payload.items ?? payload.list
      );

      return {
        cases,
        total: readTotal(payload, response, cases.length),
        raw: payload
      };
    },
    async listTestcasesBatch(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/testcases/batch-list`,
        createTestcasesBatchBody(input)
      );
      const payload = readResultPayload(response);
      const cases = readArray<Record<string, unknown>>(
        payload.value ?? payload.values ?? payload.data ?? payload.items ?? payload.list ?? payload.testcases
      );

      return {
        cases,
        total: readTotal(payload, response, cases.length),
        raw: payload
      };
    },
    async batchCreateTestcases(input) {
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        testcases: input.testcases,
        testcase_list: input.testcase_list,
        case_list: input.case_list
      });
      const response = await _http.post("/v4/testcases/batch-add", body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        testcase_count: readRecordCount(input.testcases, input.testcase_list, input.case_list),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchDeleteTestcasesV4(input) {
      const testcaseUris = input.testcase_uris ?? input.case_uris ?? [];
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        testcase_uris: input.testcase_uris,
        case_uris: input.case_uris
      });
      const response = await _http.delete("/v4/testcases/batch-delete", body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        testcase_uris: testcaseUris,
        deleted: true,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchUpdateTestcasesV4(input) {
      const body = readBodyOverride(input, {
        testcases: input.testcases,
        testcase_list: input.testcase_list,
        case_list: input.case_list
      });
      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/testcases/batch-update`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        testcase_count: readRecordCount(input.testcases, input.testcase_list, input.case_list),
        updated: true,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchCreateTestcaseReviews(input) {
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        testcase_uris: input.testcase_uris,
        case_uris: input.case_uris,
        reviewer_ids: input.reviewer_ids,
        review_title: input.review_title
      });
      const response = await _http.post("/v4/testcases/batch-review", body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        review_count: readRecordCount(input.testcase_uris, input.case_uris),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchCloseTestcaseReviews(input) {
      const reviewIds = input.review_ids ?? input.review_uris ?? [];
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        review_ids: input.review_ids,
        review_uris: input.review_uris,
        testcase_uris: input.testcase_uris,
        case_uris: input.case_uris
      });
      const response = await _http.post("/v4/testcases/review/batch-close", body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        review_ids: reviewIds,
        closed: true,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async createApiTestcaseV4(input) {
      const body = readBodyOverride(input, {
        name: input.name,
        test_type: input.test_type,
        testcase: input.testcase
      });
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/automatic/testcases`,
        body
      );
      const payload = readResultPayload(response);
      const item = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        testcase_id: readOptionalString(item.uri) ?? readOptionalString(item.testcase_uri) ?? readOptionalString(item.id),
        name: readOptionalString(item.name) ?? input.name,
        value: readResultValue(response, payload),
        raw: payload
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
    async listAuthorizedTasks(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.keyword !== undefined) {
        body.keyword = input.keyword;
      }
      if (input.service_type !== undefined) {
        body.service_type = input.service_type;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/authorized-tasks/batch-query`,
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
      }>(payload.value ?? payload.tasks ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : []));

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
    async getTesthubTask(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "version_uri", input.version_uri);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}${suffix}`
      );
      const payload = readResultPayload(response);
      const task = readEnvelope(payload.value) ?? payload;

      return {
        task_id: String(task.uri ?? task.task_uri ?? task.id ?? input.task_uri),
        name: typeof task.name === "string" ? task.name : undefined,
        raw: task
      };
    },
    async getApiTestTaskStatus(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/task/${encodeURIComponent(input.task_id)}`
      );
      const payload = readResultPayload(response);
      const task = readEnvelope(payload.value) ?? payload;

      return {
        task_id: String(task.uri ?? task.task_uri ?? task.id ?? input.task_id),
        status: typeof task.status === "string" ? task.status : undefined,
        raw: task
      };
    },
    async getApiTestTaskStatusV2(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/task/${encodeURIComponent(input.task_id)}`
      );
      const payload = readResultPayload(response);
      const task = readEnvelope(payload.value) ?? payload;

      return {
        task_id: String(task.uri ?? task.task_uri ?? task.id ?? input.task_id),
        status: typeof task.status === "string" ? task.status : undefined,
        raw: task
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
    async listTaskParameterTemplates(input) {
      const query = toQueryString({
        serviceId: input.serviceId,
        sort_by: input.sort_by,
        sort_direction: input.sort_direction,
        name: input.name
      });
      const response = await _http.get(`/config/v2/systemconfig/tasktemplate?${query}`, {
        headers: {
          "x-auth-groups": input.project_id
        }
      });
      const payload = readResultPayload(response);
      const templates = readArray<Record<string, unknown>>(
        payload.value ?? payload.values ?? payload.items ?? payload.list ?? payload.result
      );

      return {
        serviceId: input.serviceId,
        templates,
        raw: payload
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
    async createTestReport(input) {
      const body: Record<string, unknown> = { name: input.name };
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.test_conclusion !== undefined) body.test_conclusion = input.test_conclusion;
        if (input.test_conclusion_details !== undefined) body.test_conclusion_details = input.test_conclusion_details;
        if (input.risk_analysis !== undefined) body.risk_analysis = input.risk_analysis;
        if (input.iterator_uris !== undefined) body.iterator_uris = input.iterator_uris;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports`,
        body
      );
      const payload = readResultPayload(response);
      const value = payload.value ?? payload.result;

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: typeof value === "string" ? value : undefined,
        name: input.name,
        value,
        raw: payload
      };
    },
    async updateTestReport(input) {
      const body: Record<string, unknown> = { name: input.name };
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.test_conclusion !== undefined) body.test_conclusion = input.test_conclusion;
        if (input.test_conclusion_details !== undefined) body.test_conclusion_details = input.test_conclusion_details;
        if (input.risk_analysis !== undefined) body.risk_analysis = input.risk_analysis;
        if (input.iterator_uris !== undefined) body.iterator_uris = input.iterator_uris;
      }

      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        name: input.name,
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async getServiceTypeOverview(input) {
      const response = await _http.post(
        `/v5/projects/${encodeURIComponent(input.project_id)}/service-types/overview`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async getQualityReportOverview(input) {
      const response = await _http.post(
        `/v5/projects/${encodeURIComponent(input.project_id)}/report/overview`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async getHomePageCaseOverview(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/home/overview/case`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async getHomePageDefectSeverityOverview(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/home/overview/defect/severity`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async getHomePageDefectStatusOverview(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/home/overview/defect/status`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async getHomePageOverviewV5(input) {
      const response = await _http.post(
        `/v5/projects/${encodeURIComponent(input.project_id)}/home/overview`,
        createOverviewBody(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async listUserExecuteTestcaseStatistics(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/testcases/execute-info/statistic-by-user`,
        createBodyWithoutProjectId(input)
      );
      const payload = readResultPayload(response);
      const statistics = readArray<Record<string, unknown>>(
        payload.values ?? payload.value ?? payload.statistics ?? payload.items ?? payload.list
      );
      return {
        statistics,
        total: readTotal(payload, response, statistics.length),
        raw: payload
      };
    },
    async listTestcaseDefectStatistics(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/testcases/defect-info/list-by-creation-time`,
        createBodyWithoutProjectId(input)
      );
      const payload = readResultPayload(response);
      const statistics = readArray<Record<string, unknown>>(
        payload.values ?? payload.value ?? payload.statistics ?? payload.items ?? payload.list
      );
      return {
        statistics,
        total: readTotal(payload, response, statistics.length),
        raw: payload
      };
    },
    async checkTestcaseExists(input) {
      const response = await _http.post("/v4/testcase/exists", {
        case_uris: input.case_uris,
        ...(input.version_uri === undefined ? {} : { version_uri: input.version_uri }),
        project_uuid: input.project_uuid
      });
      const payload = readResultPayload(response);
      const existingCaseUris = readArray<string>(
        payload.value ?? payload.values ?? payload.result ?? payload.items ?? payload.list
      );

      return {
        project_uuid: input.project_uuid,
        existing_case_uris: existingCaseUris,
        total: readTotal(payload, response, existingCaseUris.length),
        raw: payload
      };
    },
    async searchTestcaseUrisUsedForAutomation(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size,
        project_uuid: input.project_uuid
      };

      for (const [key, value] of Object.entries(input)) {
        if (["page", "page_size", "project_uuid"].includes(key) || value === undefined) {
          continue;
        }
        body[key] = value;
      }

      const response = await _http.post("/v4/testcase-uris/search/used-for-automation", body);
      const payload = readResultPayload(response);
      const uris = readArray<unknown>(payload.value ?? payload.values ?? payload.items ?? payload.list).map(
        (item) =>
          typeof item === "string"
            ? { id: item, value: item }
            : typeof item === "object" && item !== null
              ? (item as Record<string, unknown>)
              : { value: item }
      ) as Array<Record<string, unknown>>;

      return {
        uris,
        total: readTotal(payload, response, uris.length),
        raw: payload
      };
    },
    async searchAutotask(input) {
      const body: Record<string, unknown> = {
        versionUri: input.versionUri,
        pageNo: input.page,
        pageSize: input.page_size,
        project_uuid: input.project_uuid,
        offset: input.offset ?? pageToOffset(input.page, input.page_size),
        limit: input.limit ?? input.page_size
      };

      for (const [key, value] of Object.entries(input)) {
        if (["page", "page_size", "project_uuid", "versionUri", "offset", "limit"].includes(key) || value === undefined) {
          continue;
        }
        body[key] = value;
      }

      const response = await _http.post("/v4/testcase/autotask/search", body);
      const payload = readResultPayload(response);
      const tasks = readArray<unknown>(payload.value ?? payload.values ?? payload.items ?? payload.list).map((item) =>
        typeof item === "object" && item !== null ? (item as Record<string, unknown>) : { value: item }
      ) as Array<Record<string, unknown>>;

      return {
        tasks,
        total: readTotal(payload, response, tasks.length),
        raw: payload
      };
    },
    async getProjectDataDashboard(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/data-dashboard/overview`,
        createBodyWithoutProjectId(input)
      );
      const payload = readResultPayload(response);
      return {
        raw: payload
      };
    },
    async listRequirementsOverview(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.fixed_version_id !== undefined) {
        body.fixed_version_id = input.fixed_version_id;
      }
      if (input.module_id !== undefined) {
        body.module_id = input.module_id;
      }
      if (input.key_word !== undefined) {
        body.key_word = input.key_word;
      }
      if (input.pi_filter !== undefined) {
        body.pi_filter = input.pi_filter;
      }
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/requirements/overview`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;
      const requirements = readArray<Record<string, unknown>>(
        value.requirement_overview_list ?? value.requirements ?? value.items ?? value.list
      );

      return {
        requirements,
        total: readTotal(value, response, requirements.length),
        raw: value
      };
    },
    async listRequirementsOverviewTestcases(input) {
      const body = createRequirementsOverviewDetailsBody(input);
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/requirements/overview/testcase`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;
      const testcases = readArray<Record<string, unknown>>(
        value.testcase_list ?? value.testcases ?? value.items ?? value.list
      );

      return {
        testcases,
        total: readTotal(value, response, testcases.length),
        raw: value
      };
    },
    async listRequirementsOverviewDefects(input) {
      const body = createRequirementsOverviewDetailsBody(input);
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/requirements/overview/defect`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;
      const defects = readArray<Record<string, unknown>>(
        value.defect_list ?? value.defects ?? value.items ?? value.list
      );

      return {
        defects,
        total: readTotal(value, response, defects.length),
        raw: value
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
    async listGt3kDefectIterators(input) {
      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/defects/${encodeURIComponent(input.defect_id)}/iterators`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.value ?? payload.iterators ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async listDefectIterators(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/defects/${encodeURIComponent(input.defect_id)}/iterators`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.value ?? payload.iterators ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async createDefectAssociation(input) {
      const query = new URLSearchParams({
        iterator_uri: input.iterator_uri
      });
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/defects/${encodeURIComponent(input.defect_id)}/association?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        defect_id: input.defect_id,
        iterator_uri: input.iterator_uri,
        status: readResultStatus(response, payload),
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async updateDefectAssociation(input) {
      const query = new URLSearchParams({
        old_iterator_uri: input.old_iterator_uri,
        new_iterator_uri: input.new_iterator_uri
      });
      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/defects/${encodeURIComponent(input.defect_id)}/association?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        defect_id: input.defect_id,
        old_iterator_uri: input.old_iterator_uri,
        new_iterator_uri: input.new_iterator_uri,
        status: readResultStatus(response, payload),
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async deleteDefectAssociation(input) {
      const query = new URLSearchParams({
        iterator_uri: input.iterator_uri
      });
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_id)}/defects/${encodeURIComponent(input.defect_id)}/association?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        defect_id: input.defect_id,
        iterator_uri: input.iterator_uri,
        status: readResultStatus(response, payload),
        value: payload.value ?? payload.result,
        raw: payload
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
    async updateTestReportQualityAttributes(input) {
      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}/quality-attributes`,
        input.body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: payload.value ?? payload.result,
        raw: payload
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
    async listCustomTemplateReports(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "type", input.type);

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template-reports?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reports = readArray<Record<string, unknown>>(
        payload.value ?? payload.reports ?? payload.custom_template_reports ?? payload.items ?? payload.list
      );

      return {
        reports,
        total: readTotal(payload, response, reports.length)
      };
    },
    async createCustomTemplateReport(input) {
      const body: Record<string, unknown> = { name: input.name };
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.uri !== undefined) body.uri = input.uri;
        if (input.type !== undefined) body.type = input.type;
        if (input.workpiece_type !== undefined) body.workpiece_type = input.workpiece_type;
        if (input.template_config !== undefined) body.template_config = input.template_config;
        if (input.data !== undefined) body.data = input.data;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template-reports`,
        body
      );
      const payload = readResultPayload(response);
      const value = payload.value ?? payload.result;

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: typeof value === "string" ? value : undefined,
        name: input.name,
        value,
        raw: payload
      };
    },
    async updateCustomTemplateReport(input) {
      const body: Record<string, unknown> = {};
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.uri !== undefined) body.uri = input.uri;
        if (input.name !== undefined) body.name = input.name;
        if (input.type !== undefined) body.type = input.type;
        if (input.workpiece_type !== undefined) body.workpiece_type = input.workpiece_type;
        if (input.template_config !== undefined) body.template_config = input.template_config;
        if (input.data !== undefined) body.data = input.data;
      }

      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template-reports/${encodeURIComponent(input.report_uri)}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        name: input.name,
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async deleteCustomTemplateReport(input) {
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template-reports/${encodeURIComponent(input.report_uri)}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        deleted: true,
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async refreshCustomTemplateReport(input) {
      const body: Record<string, unknown> = { name: input.name };
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.uri !== undefined) body.uri = input.uri;
        if (input.type !== undefined) body.type = input.type;
        if (input.workpiece_type !== undefined) body.workpiece_type = input.workpiece_type;
        if (input.template_config !== undefined) body.template_config = input.template_config;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/custom-template-reports/refresh`,
        body
      );
      const payload = readResultPayload(response);
      const value = payload.value ?? payload.result;

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: typeof value === "string" ? value : undefined,
        name: input.name,
        value,
        raw: payload
      };
    },
    async refreshProgressReport(input) {
      const body: Record<string, unknown> = {};
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.name !== undefined) body.name = input.name;
        if (input.workpiece_type !== undefined) body.workpiece_type = input.workpiece_type;
        if (input.analysis_dim_row !== undefined) body.analysis_dim_row = input.analysis_dim_row;
        if (input.compare_dim_column !== undefined) body.compare_dim_column = input.compare_dim_column;
        if (input.filter !== undefined) body.filter = input.filter;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/progress-reports/refresh`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;

      return {
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        operation_uri:
          typeof value.async_uri === "string"
            ? value.async_uri
            : typeof value.operation_uri === "string"
              ? value.operation_uri
              : undefined,
        is_async_operate: typeof value.is_async_operate === "boolean" ? value.is_async_operate : undefined,
        return_value: typeof value.return_value === "string" ? value.return_value : undefined,
        value: payload.value ?? payload.result,
        raw: value
      };
    },
    async createProgressReport(input) {
      const body: Record<string, unknown> = {};
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        body.name = input.name;
        body.type = input.type;
        body.workpiece_type = input.workpiece_type;
        body.analysis_dim_row = input.analysis_dim_row;
        if (input.compare_dim_column !== undefined) body.compare_dim_column = input.compare_dim_column;
        body.filter = input.filter;
      }

      const response = await _http.post(
        `/v5/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/progress-reports`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;

      return {
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        operation_uri:
          typeof value.async_uri === "string"
            ? value.async_uri
            : typeof value.operation_uri === "string"
              ? value.operation_uri
              : undefined,
        is_async_operate: typeof value.is_async_operate === "boolean" ? value.is_async_operate : undefined,
        return_value: typeof value.return_value === "string" ? value.return_value : undefined,
        value: payload.value ?? payload.result,
        raw: value
      };
    },
    async updateProgressReport(input) {
      const body: Record<string, unknown> = {};
      if (input.body) {
        Object.assign(body, input.body);
      } else {
        if (input.name !== undefined) body.name = input.name;
        if (input.type !== undefined) body.type = input.type;
        if (input.workpiece_type !== undefined) body.workpiece_type = input.workpiece_type;
        if (input.analysis_dim_row !== undefined) body.analysis_dim_row = input.analysis_dim_row;
        if (input.compare_dim_column !== undefined) body.compare_dim_column = input.compare_dim_column;
        if (input.filter !== undefined) body.filter = input.filter;
      }

      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/progress-reports/${encodeURIComponent(input.report_uri)}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async deleteProgressReport(input) {
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_uuid)}/versions/${encodeURIComponent(input.version_uri)}/progress-reports/${encodeURIComponent(input.report_uri)}`
      );
      const payload = readResultPayload(response);

      return {
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        deleted: true,
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async listTestReports(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "key_word", input.keyword);
      appendQueryValue(query, "own", input.own);

      const response = await _http.get(
        `/testreport/v4/${encodeURIComponent(input.project_id)}/test-reports?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reports = readArray<Record<string, unknown>>(
        payload.value ?? payload.reports ?? payload.test_reports ?? payload.items ?? payload.list
      );

      return {
        reports,
        total: readTotal(payload, response, reports.length)
      };
    },
    async downloadTestReport(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/reports/${encodeURIComponent(input.report_uri)}/download`,
        {}
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchDeleteTestReports(input) {
      const body = input.body ?? input.report_uris;
      const response = await _http.delete(
        `/testreport/v4/${encodeURIComponent(input.project_id)}/test-reports/batch-delete`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        report_ids: input.report_uris,
        deleted: true,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async getRuleCheckTaskReport(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/rule-check/tasks/${encodeURIComponent(input.task_uri)}`
      );
      const payload = readResultPayload(response);
      const report = readEnvelope(payload.value) ?? payload;

      return {
        report_id: String(report.uri ?? report.id ?? input.task_uri),
        name: typeof report.name === "string" ? report.name : undefined,
        raw: report
      };
    },
    async listRuleCheckTasks(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.name !== undefined) {
        body.name = input.name;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/rule-check/tasks`,
        body
      );
      const payload = readResultPayload(response);
      const tasks = readArray<Record<string, unknown>>(
        payload.value ?? payload.tasks ?? payload.items ?? payload.list
      );

      return {
        tasks,
        total: readTotal(payload, response, tasks.length),
        raw: payload
      };
    },
    async getRuleCheckTaskSummary(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "severity", input.severity);
      appendQueryValue(query, "status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/rule-check/tasks/${encodeURIComponent(input.task_uri)}/summary${suffix}`
      );
      const payload = readResultPayload(response);
      const summary = readEnvelope(payload.value) ?? payload;

      return {
        task_uri: input.task_uri,
        raw: summary
      };
    },
    async listRuleCheckViolationCases(input) {
      const body: Record<string, unknown> = input.body
        ? { ...input.body }
        : {
            page_no: input.page,
            page_size: input.page_size
          };
      if (input.severity !== undefined) {
        body.severity = input.severity;
      }
      if (input.status !== undefined) {
        body.status = input.status;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/rule-check/tasks/${encodeURIComponent(input.task_uri)}/violation-cases`,
        body
      );
      const payload = readResultPayload(response);
      const violations = readArray<Record<string, unknown>>(
        payload.value ?? payload.violations ?? payload.items ?? payload.list
      );

      return {
        violations,
        total: readTotal(payload, response, violations.length),
        raw: payload
      };
    },
    async updateRuleCheckViolation(input) {
      const body: Record<string, unknown> = input.body ? { ...input.body } : {};
      body.status = input.status;

      const response = await _http.put(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/rule-check/violations/${encodeURIComponent(input.violation_uri)}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        version_uri: input.version_uri,
        violation_id: input.violation_uri,
        status: input.status,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async listBranchTestcaseDuplicateNumbers(input) {
      const body: Record<string, unknown> = {};
      if (input.numbers !== undefined) {
        body.numbers = input.numbers;
      }
      if (input.uri_to_number_list !== undefined) {
        body.uri_to_number_list = input.uri_to_number_list;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/testcases/duplicate-numbers`,
        body
      );
      const payload = readResultPayload(response);
      const numbers = readArray<string>(payload.value).filter(
        (value): value is string => typeof value === "string"
      );

      return {
        numbers,
        total: readTotal(payload, response, numbers.length),
        has_more: typeof payload.has_more === "boolean" ? payload.has_more : undefined,
        reason: typeof payload.reason === "string" ? payload.reason : undefined,
        raw: payload
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
    async getExcelErrorTestcases(input) {
      const query = new URLSearchParams({ error_id: input.error_id });
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/excel/error-testcases?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        error_id: input.error_id,
        raw: payload
      };
    },
    async listCaseTemplates(input) {
      const body: Record<string, unknown> = {};
      if (input.name !== undefined) {
        body.name = input.name;
      }
      if (input.is_default !== undefined) {
        body.is_default = input.is_default;
      }
      if (input.is_recommended !== undefined) {
        body.is_recommended = input.is_recommended;
      }
      if (input.industry_type !== undefined) {
        body.industry_type = input.industry_type;
      }
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/case-templates/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const templates = readArray<Record<string, unknown>>(
        payload.value ?? payload.templates ?? payload.items ?? payload.list
      );

      return {
        templates,
        total: readTotal(payload, response, templates.length)
      };
    },
    async listSolutionTemplates(input) {
      const body: Record<string, unknown> = {};
      if (input.name !== undefined) {
        body.name = input.name;
      }
      if (input.is_recommended !== undefined) {
        body.is_recommended = input.is_recommended;
      }
      if (input.industry_type !== undefined) {
        body.industry_type = input.industry_type;
      }
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/solution-templates/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const templates = readArray<Record<string, unknown>>(
        payload.value ?? payload.templates ?? payload.items ?? payload.list
      );

      return {
        templates,
        total: readTotal(payload, response, templates.length)
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
    async getProjectTestcase(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.testcase_id)}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(
          testcase.testcase_id ?? testcase.case_id ?? testcase.uri ?? testcase.id ?? input.testcase_id
        ),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getProjectTestcaseV4(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "plan_id", input.plan_id);
      const queryText = query.toString();
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.testcase_uri)}${
          queryText.length > 0 ? `?${queryText}` : ""
        }`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(
          testcase.id ??
            testcase.testcase_uri ??
            testcase.testcase_id ??
            testcase.case_id ??
            testcase.uri ??
            input.testcase_uri
        ),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getProjectTestcaseByNumber(input) {
      const query = new URLSearchParams({
        testcase_number: input.testcase_number
      });
      appendQueryValue(query, "version_uri", input.version_uri);

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/testcase?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(
          testcase.testcase_id ??
            testcase.id ??
            testcase.case_id ??
            testcase.uri ??
            input.testcase_number
        ),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getTestDesignTestcase(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(
          testcase.id ?? testcase.testcase_id ?? testcase.case_id ?? testcase.uri ?? input.id
        ),
        name:
          typeof testcase.case_name === "string"
            ? testcase.case_name
            : typeof testcase.name === "string"
              ? testcase.name
              : undefined,
        raw: testcase
      };
    },
    async getMindmap(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/mindmaps/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const mindmap = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        mindmap_id: String(mindmap.id ?? mindmap.uri ?? input.id),
        name: typeof mindmap.name === "string" ? mindmap.name : undefined,
        raw: mindmap
      };
    },
    async getMindmapRecycle(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/mindmap-recycles/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const recycle = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        recycle_id: String(recycle.id ?? recycle.uri ?? input.id),
        name:
          typeof recycle.name === "string"
            ? recycle.name
            : typeof recycle.mindmap_name === "string"
              ? recycle.mindmap_name
              : undefined,
        raw: recycle
      };
    },
    async getMindmapBackup(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/mindmap-backups/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const backup = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        backup_id: String(backup.id ?? backup.uri ?? input.id),
        name:
          typeof backup.bak_name === "string"
            ? backup.bak_name
            : typeof backup.name === "string"
              ? backup.name
              : undefined,
        raw: backup
      };
    },
    async getMindmapStatistics(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/statistics/${encodeURIComponent(input.mindmap_id)}`
      );
      const payload = readResultPayload(response);
      const statistics = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        mindmap_id: input.mindmap_id,
        raw: statistics
      };
    },
    async listMindmapsV2(input) {
      const params: Record<string, unknown> = {
        project_id: input.project_id,
        offset: input.page,
        limit: input.page_size
      };
      for (const key of [
        "name",
        "id_collection",
        "folder_id_collection",
        "folder_root_id",
        "creator_name_collection",
        "updater_name_collection"
      ] as const) {
        const value = input[key];
        if (value !== undefined) {
          params[key] = value;
        }
      }

      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/mindmaps/page`,
        { params }
      );
      const payload = readResultPayload(response);
      const mindmaps = readPageItems(payload);

      return {
        mindmaps,
        total: readPageTotal(payload, response, mindmaps.length),
        raw: payload
      };
    },
    async listTestpointsPage(input) {
      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/testpoints/page`,
        { params: createOfficialPageParams(input) }
      );
      const payload = readResultPayload(response);
      const testpoints = readPageItems(payload);

      return {
        testpoints,
        total: readPageTotal(payload, response, testpoints.length),
        raw: payload
      };
    },
    async listScenesPage(input) {
      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/scenes/page`,
        { params: createOfficialPageParams(input) }
      );
      const payload = readResultPayload(response);
      const scenes = readPageItems(payload);

      return {
        scenes,
        total: readPageTotal(payload, response, scenes.length),
        raw: payload
      };
    },
    async listDefaultTemplates(input) {
      const response = await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/templates/templates-default`,
        { params: createDefaultTemplatesParams(input) }
      );
      const payload = readResultPayload(response);
      const templates = readPageItems(payload);

      return {
        templates,
        total: readPageTotal(payload, response, templates.length),
        raw: payload
      };
    },
    async listMindmapsV3(input) {
      const params: Record<string, unknown> = {
        project_id: input.project_id,
        offset: input.page,
        limit: input.page_size
      };
      for (const key of [
        "name",
        "id_collection",
        "folder_id_collection",
        "folder_root_id",
        "creator_name_collection",
        "updater_name_collection",
        "branch_uri",
        "iterator_uri",
        "is_master",
        "confidentiality_code_collection"
      ] as const) {
        const value = input[key];
        if (value !== undefined) {
          params[key] = value;
        }
      }

      const response = await _http.post(
        `/v3/${encodeURIComponent(input.project_id)}/mindmaps/page`,
        { params }
      );
      const payload = readResultPayload(response);
      const mindmaps = readPageItems(payload);

      return {
        mindmaps,
        total: readPageTotal(payload, response, mindmaps.length),
        raw: payload
      };
    },
    async listMindmapRecycles(input) {
      const params: Record<string, unknown> = {
        project_id: input.project_id,
        offset: input.page,
        limit: input.page_size
      };
      if (input.creator_num !== undefined) {
        params.creator_num = input.creator_num;
      }
      if (input.text !== undefined) {
        params.text = input.text;
      }

      const response = await _http.post(
        `/v3/${encodeURIComponent(input.project_id)}/mindmap-recycles/page`,
        { params }
      );
      const payload = readResultPayload(response);
      const recycles = readPageItems(payload);

      return {
        recycles,
        total: readPageTotal(payload, response, recycles.length),
        raw: payload
      };
    },
    async listMindmapBackups(input) {
      const params: Record<string, unknown> = {
        offset: input.page,
        limit: input.page_size
      };
      for (const key of ["mindmap_id", "bak_name", "type"] as const) {
        const value = input[key];
        if (value !== undefined) {
          params[key] = value;
        }
      }

      const response = await _http.post(
        `/v3/${encodeURIComponent(input.project_id)}/mindmap-backups/page`,
        { params }
      );
      const payload = readResultPayload(response);
      const backups = readPageItems(payload);

      return {
        backups,
        total: readPageTotal(payload, response, backups.length),
        raw: payload
      };
    },
    async countMindmaps(input) {
      const params: Record<string, unknown> = {};
      for (const key of [
        "parent_folder_id_collection",
        "project_type",
        "folder_root_id",
        "branch_uri",
        "iterator_uri",
        "is_master",
        "upward_recursion"
      ] as const) {
        const value = input[key];
        if (value !== undefined) {
          params[key] = value;
        }
      }

      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/mindmaps/mindmap-total`,
        { params }
      );
      const payload = readResultPayload(response);
      const counts = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        counts,
        raw: payload
      };
    },
    async listAssets(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/asset`
      );
      const payload = readResultPayload(response);
      const assets = readArray<Record<string, unknown>>(
        payload.data ?? payload.value ?? payload.assets ?? payload.items ?? payload.list
      );

      return {
        assets,
        total: readTotal(payload, response, assets.length)
      };
    },
    async listAssetTree(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/asset-tree/${encodeURIComponent(input.asset_id)}`
      );
      const payload = readResultPayload(response);
      const nodes = readArray<Record<string, unknown>>(
        payload.data ?? payload.value ?? payload.nodes ?? payload.items ?? payload.list
      );

      return {
        nodes,
        total: readTotal(payload, response, nodes.length)
      };
    },
    async listFactorsByAsset(input) {
      const params: Record<string, unknown> = {
        offset: input.page,
        limit: input.page_size
      };
      for (const key of [
        "type",
        "name",
        "parent_node_ids",
        "creator_num",
        "mindmap_id",
        "testpoint_id",
        "mindmap_node_id"
      ] as const) {
        const value = input[key];
        if (value !== undefined) {
          params[key] = value;
        }
      }

      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/factor/${encodeURIComponent(input.asset_id)}`,
        { params }
      );
      const payload = readResultPayload(response);
      const factors = readPageItems(payload);

      return {
        factors,
        total: readPageTotal(payload, response, factors.length),
        raw: payload
      };
    },
    async getFactor(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/factor/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const factor = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        factor_id: String(factor.id ?? factor.uri ?? input.id),
        name: typeof factor.name === "string" ? factor.name : undefined,
        raw: factor
      };
    },
    async deleteFactor(input) {
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/factor/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        factor_id: input.id,
        raw: payload
      };
    },
    async batchDeleteFactors(input) {
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/factor`,
        { params: input.factor_ids }
      );
      const payload = readResultPayload(response);

      return {
        factor_ids: input.factor_ids,
        raw: payload
      };
    },
    async deleteAsset(input) {
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/asset/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        asset_id: input.id,
        raw: payload
      };
    },
    async getTestDesignTemplate(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/templates/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const template = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        template_id: String(template.id ?? template.uri ?? input.id),
        name: typeof template.name === "string" ? template.name : undefined,
        raw: template
      };
    },
    async deleteTestDesignTemplate(input) {
      const response = await _http.delete(
        `/v2/${encodeURIComponent(input.project_id)}/templates/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        template_id: input.id,
        raw: payload
      };
    },
    async downloadTestDesignTemplate(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "file_name", input.file_name);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/templates${suffix}`
      );
      const payload = readResultPayload(response);
      const template = readEnvelope(payload.result) ?? readEnvelope(payload.value) ?? payload;

      return {
        template_id:
          typeof template.id === "string" || typeof template.id === "number"
            ? String(template.id)
            : undefined,
        name: typeof template.name === "string" ? template.name : undefined,
        raw: template
      };
    },
    async downloadAssetTemplate(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/asset/template`
      );
      const payload = readResultPayload(response);
      const template = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        template_id:
          typeof template.id === "string" || typeof template.id === "number"
            ? String(template.id)
            : undefined,
        name: typeof template.name === "string" ? template.name : undefined,
        raw: template
      };
    },
    async exportMindmap(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/mindmaps/mindmap-export/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);
      const mindmap = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        mindmap_id: String(mindmap.id ?? mindmap.uri ?? input.id),
        name: typeof mindmap.name === "string" ? mindmap.name : undefined,
        raw: mindmap
      };
    },
    async deleteMindmap(input) {
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/mindmaps/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        mindmap_id: input.id,
        raw: payload
      };
    },
    async deleteMindmapRecycle(input) {
      const response = await _http.delete(
        `/v2/${encodeURIComponent(input.project_id)}/mindmap-recycles/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        recycle_id: input.id,
        raw: payload
      };
    },
    async deleteMindmapBackup(input) {
      const response = await _http.delete(
        `/v2/${encodeURIComponent(input.project_id)}/mindmap-backups/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        backup_id: input.id,
        raw: payload
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
    async createTesthubService(input) {
      const response = await _http.post("/v4/testhub/services", {
        service_name: input.service_name,
        server_host: input.server_host,
        server_type: input.server_type
      });
      const payload = readResultPayload(response);
      const service = readEnvelope(payload.result) ?? readEnvelope(payload.value) ?? payload;

      return {
        service_id: String(service.service_id ?? service.id ?? payload.value ?? input.service_name),
        service_name:
          typeof service.service_name === "string" ? service.service_name : input.service_name,
        status: readResultStatus(response, payload),
        raw: service
      };
    },
    async updateTesthubService(input) {
      const response = await _http.put(
        `/v4/testhub/services/${encodeURIComponent(String(input.service_id))}`,
        {
          service_name: input.service_name,
          server_host: input.server_host,
          server_type: input.server_type
        }
      );
      const payload = readResultPayload(response);
      const service = readEnvelope(payload.result) ?? readEnvelope(payload.value) ?? payload;

      return {
        service_id: String(service.service_id ?? input.service_id),
        service_name:
          typeof service.service_name === "string" ? service.service_name : input.service_name,
        status: readResultStatus(response, payload),
        raw: service
      };
    },
    async deleteTesthubService(input) {
      const response = await _http.delete(
        `/v4/testhub/services/${encodeURIComponent(String(input.service_id))}`
      );
      const payload = readResultPayload(response);

      return {
        service_id: String(input.service_id),
        deleted: true,
        raw: payload
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
    async deleteAttachment(input) {
      const response = await _http.delete(
        `/v4/${encodeURIComponent(input.project_id)}/attachments/${encodeURIComponent(input.attachment_uri)}`
      );
      const payload = readResultPayload(response);

      return {
        attachment_uri: input.attachment_uri,
        value: payload.value ?? payload.result ?? payload.data,
        raw: payload
      };
    },
    async associateAttachments(input) {
      const body: Record<string, unknown> = {
        attachments: input.attachments,
        resource_type: input.resource_type,
        system_type: input.system_type
      };
      if (input.version_uri !== undefined) {
        body.version_uri = input.version_uri;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/resources/${encodeURIComponent(input.resource_uri)}/attachments/association`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        resource_uri: input.resource_uri,
        value: readResultValue(response, payload),
        raw: payload
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
    async listV4ProjectFieldConfigs(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/field-configs`
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
    async listProjectDefects(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "key_word", input.keyword);
      appendQueryValue(query, "module_id", input.module_id);
      appendQueryValue(query, "iteration_ids", input.iteration_ids);

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/defects?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const defects = readArray<Record<string, unknown>>(
        payload.value ?? payload.defects ?? payload.issues ?? payload.items ?? payload.list
      );

      return {
        defects,
        total: readTotal(payload, response, defects.length)
      };
    },
    async listProjectIssues(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "tracker_id", input.tracker_id);
      appendQueryValue(query, "iteration_ids", input.iteration_ids);
      appendQueryValue(query, "status_id", input.status_id);
      appendQueryValue(query, "module_id", input.module_id);
      appendQueryValue(query, "show_page_flag", input.show_page_flag);
      appendQueryValue(query, "key_word", input.keyword);

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const issues = readArray<Record<string, unknown>>(
        payload.value ?? payload.issues ?? payload.items ?? payload.list
      );

      return {
        issues,
        total: readTotal(payload, response, issues.length)
      };
    },
    async listIssuesTree(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues-tree`,
        createBodyWithoutProjectId(input as TestPlanRecordBodyInput)
      );
      const payload = readResultPayload(response);
      const issues = readArray<Record<string, unknown>>(
        payload.value ?? payload.issues ?? payload.items ?? payload.list
      );

      return {
        issues,
        total: readTotal(payload, response, issues.length),
        raw: payload
      };
    },
    async listIpdIssuesTree(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/ipd/issues-tree`,
        createBodyWithoutProjectId(input as TestPlanRecordBodyInput)
      );
      const payload = readResultPayload(response);
      const issues = readArray<Record<string, unknown>>(
        payload.value ?? payload.issues ?? payload.items ?? payload.list
      );

      return {
        issues,
        total: readTotal(payload, response, issues.length),
        raw: payload
      };
    },
    async listProjectUsers(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "key_word", input.keyword);

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/users?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const users = readArray<Record<string, unknown>>(
        payload.value ?? payload.users ?? payload.items ?? payload.list
      );

      return {
        users,
        total: readTotal(payload, response, users.length)
      };
    },
    async addProjectUsers(input) {
      const response = await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/users`,
        { user_id_List: input.user_id_List }
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        user_id_List: input.user_id_List,
        value: payload.value ?? payload.result,
        status: readResultStatus(response, payload),
        raw: payload
      };
    },
    async deleteProjectUsers(input) {
      const response = await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/users`,
        { user_id_List: input.user_id_List }
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        user_id_List: input.user_id_List,
        value: payload.value ?? payload.result,
        status: readResultStatus(response, payload),
        raw: payload
      };
    },
    async getCurrentUserPackagePermission(input) {
      const query = new URLSearchParams({
        package_type: input.package_type
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/current-user/package-permission?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const permission = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        package_type: input.package_type,
        raw: permission
      };
    },
    async getUserPackagePermission(input) {
      const query = new URLSearchParams({
        package_type: input.package_type
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/users/${encodeURIComponent(input.user_id)}/package-permission?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const permission = readEnvelope(payload.value) ?? payload;

      return {
        user_id: input.user_id,
        package_type: input.package_type,
        raw: permission
      };
    },
    async getDomainUserCount(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domain-user-count`
      );
      const payload = readResultPayload(response);
      const value = payload.value ?? payload.count ?? payload.total;

      return {
        project_id: input.project_id,
        value,
        raw: payload
      };
    },
    async listProjectTags(input) {
      const query = new URLSearchParams({
        resource_type: input.resource_type
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/tags?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const tags = readArray<Record<string, unknown>>(
        payload.value ?? payload.tags ?? payload.items ?? payload.list
      );

      return {
        tags,
        total: readTotal(payload, response, tags.length)
      };
    },
    async getCustomizedColumns(input) {
      const query = new URLSearchParams({
        service_type: String(input.service_type),
        stage_type: String(input.stage_type)
      });

      const response = await _http.get(
        `/GT3KServer/v4/projects/${encodeURIComponent(input.project_id)}/customized-columns?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const columns = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        raw: columns
      };
    },
    async getCustomizedColumnsV4(input) {
      const query = new URLSearchParams({
        service_type: String(input.service_type),
        stage_type: String(input.stage_type)
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/customized-columns?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const columns = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        raw: columns
      };
    },
    async getProjectDomainDetailInfo(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "order_query_type", input.order_query_type);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domain/detail-info${suffix}`
      );
      const payload = readResultPayload(response);
      const detail = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        raw: detail
      };
    },
    async getProjectAdvancedFeatureTrial(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/advanced-feature/trial`
      );
      const payload = readResultPayload(response);
      const trial = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        raw: trial
      };
    },
    async getProjectAdvancedFeatureTrusted(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/advanced-feature/trusted`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        project_id: input.project_id,
        value,
        raw: payload
      };
    },
    async getDomainFrozenInfo(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(`/v4/domain/frozen/info?${query.toString()}`);
      const payload = readResultPayload(response);
      const frozenInfo = readEnvelope(payload.value) ?? payload;

      return {
        project_uuid: input.project_uuid,
        raw: frozenInfo
      };
    },
    async getDomainNeedPopup(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "project_uuid", input.project_uuid);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(`/v4/domain/need-popup${suffix}`);
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        project_uuid: input.project_uuid,
        value,
        raw: payload
      };
    },
    async getUserDisclaimer(input) {
      const query = new URLSearchParams({
        type: input.type
      });

      const response = await _http.get(`/v4/user/disclaimer?${query.toString()}`);
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        type: input.type,
        value,
        raw: payload
      };
    },
    async getProjectMessageNotices(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/message-notices`
      );
      const payload = readResultPayload(response);
      const notices = readArray<Record<string, unknown>>(
        payload.value ?? payload.notices ?? payload.items ?? payload.list
      );

      return {
        notices,
        total: readTotal(payload, response, notices.length)
      };
    },
    async updateProjectMessageNotices(input) {
      const body: Record<string, unknown> =
        input.body ?? {
          id: input.id,
          ...(input.name === undefined ? {} : { name: input.name }),
          type: input.type,
          send_email: input.send_email,
          send_message: input.send_message,
          project_id: input.project_id,
          ...(input.notice_users === undefined ? {} : { notice_users: input.notice_users })
        };

      const response = await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/message-notices`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        id: input.id,
        value: payload.value ?? payload.result,
        status: readResultStatus(response, payload),
        raw: payload
      };
    },
    async getProjectIssueUpdateNotification(input) {
      const query = new URLSearchParams({
        owner_id: input.owner_id
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue-update-notification?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const notification = readEnvelope(payload.value) ?? payload;

      return {
        project_id: input.project_id,
        owner_id: input.owner_id,
        raw: notification
      };
    },
    async updateProjectIssueUpdateNotification(input) {
      const body: Record<string, unknown> =
        input.body ?? {
          owner_id: input.owner_id,
          is_display: input.is_display
        };

      const response = await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue-update-notification`,
        body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        owner_id: input.owner_id,
        value: payload.value ?? payload.result,
        status: readResultStatus(response, payload),
        raw: payload
      };
    },
    async getProjectMasterVersion(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/master`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        project_id: input.project_id,
        value,
        raw: payload
      };
    },
    async checkUserInfo(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/user-info/check`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        value: payload.data ?? payload.value,
        raw: payload
      };
    },
    async getMindmapCreatorName(input) {
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/mindmap-creator-name`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        value: payload.data ?? payload.value,
        raw: payload
      };
    },
    async listDynamicGlobalVariables(input) {
      const response = await _http.get(
        `/dynamic-global-variable/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.task_id)}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        task_id: input.task_id,
        value: payload.data ?? payload.value,
        raw: payload
      };
    },
    async getDynamicGlobalVariable(input) {
      const response = await _http.get(
        `/dynamic-global-variable/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.task_id)}/${encodeURIComponent(input.key)}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        task_id: input.task_id,
        key: input.key,
        value: payload.data ?? payload.value ?? payload.result,
        raw: payload
      };
    },
    async updateDynamicGlobalVariable(input) {
      const response = await _http.put(
        `/dynamic-global-variable/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.task_id)}/${encodeURIComponent(input.key)}`,
        input.body
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        task_id: input.task_id,
        key: input.key,
        value: payload.data ?? payload.value ?? payload.result,
        raw: payload
      };
    },
    async deleteDynamicGlobalVariable(input) {
      const response = await _http.delete(
        `/dynamic-global-variable/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.task_id)}/${encodeURIComponent(input.key)}`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        task_id: input.task_id,
        key: input.key,
        raw: payload
      };
    },
    async getMindmapPermission(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/permission/${encodeURIComponent(input.id)}`
      );
      const payload = readResultPayload(response);

      return {
        id: input.id,
        value: payload.data ?? payload.value,
        raw: payload
      };
    },
    async checkUserExists() {
      const response = await _http.get("/v4/user/exist");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async getDomainDetailInfo(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "domain_id", input.domain_id);
      appendQueryValue(query, "region", input.region);
      appendQueryValue(query, "order_query_type", input.order_query_type);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(`/v4/domain/detail-info${suffix}`);
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async getFreeDeclaration() {
      const response = await _http.get("/v4/free-declaration");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async getGt3kUserInfoDomain() {
      const response = await _http.get("/GT3KServer/v4/user-info/domain");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async getUserInfoDomain() {
      const response = await _http.get("/v4/user-info/domain");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listGt3kBranches(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);

      const response = await _http.get(`/GT3KServer/v4/branches?${query.toString()}`);
      const payload = readResultPayload(response);
      const branches = readArray<Record<string, unknown>>(
        payload.value ?? payload.branches ?? payload.items ?? payload.list
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async listV4Branches(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);

      const response = await _http.get(`/v4/branches?${query.toString()}`);
      const payload = readResultPayload(response);
      const branches = readArray<Record<string, unknown>>(
        payload.value ?? payload.branches ?? payload.items ?? payload.list
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async listV1Branches(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);

      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/branches?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const branches = readArray<Record<string, unknown>>(
        payload.value ?? payload.branches ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        branches,
        total: readTotal(payload, response, branches.length)
      };
    },
    async getGt3kDomainInfo(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "project_uuid", input.project_uuid);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(`/GT3KServer/v4/domain/info${suffix}`);
      const payload = readResultPayload(response);
      const info = readEnvelope(payload.value) ?? payload;

      return {
        raw: info
      };
    },
    async getGt3kBackgroundInfo(input) {
      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/background`
      );
      const payload = readResultPayload(response);
      const info = readEnvelope(payload.value) ?? payload;

      return {
        raw: info
      };
    },
    async getBackgroundInfo(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/background`
      );
      const payload = readResultPayload(response);
      const info = readEnvelope(payload.value) ?? payload;

      return {
        raw: info
      };
    },
    async listGt3kCurrentUserTestcases(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);
      appendQueryValue(query, "keyword", input.keyword);

      const response = await _http.get(
        `/GT3KServer/v4/current-user/testcases?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const testcases = readArray<Record<string, unknown>>(
        payload.value ?? payload.testcases ?? payload.items ?? payload.list
      );

      return {
        testcases,
        total: readTotal(payload, response, testcases.length)
      };
    },
    async listCurrentUserTestcases(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "sort_field", input.sort_field);
      appendQueryValue(query, "sort_type", input.sort_type);
      appendQueryValue(query, "keyword", input.keyword);

      const response = await _http.get(`/v4/current-user/testcases?${query.toString()}`);
      const payload = readResultPayload(response);
      const testcases = readArray<Record<string, unknown>>(
        payload.value ?? payload.testcases ?? payload.items ?? payload.list
      );

      return {
        testcases,
        total: readTotal(payload, response, testcases.length)
      };
    },
    async getGt3kTestcaseChangeStatistics(input) {
      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_id)}/testcases/change-statistics`
      );
      const payload = readResultPayload(response);
      const statistics = readEnvelope(payload.value) ?? payload;

      return {
        raw: statistics
      };
    },
    async getTestcaseChangeStatistics(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/testcases/change-statistics`
      );
      const payload = readResultPayload(response);
      const statistics = readEnvelope(payload.value) ?? payload;

      return {
        raw: statistics
      };
    },
    async listTestcaseComments(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "version_uri", input.version_uri);

      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.testcase_id)}/comments?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const comments = readArray<Record<string, unknown>>(
        payload.value ?? payload.comments ?? payload.items ?? payload.list
      );

      return {
        comments,
        total: readTotal(payload, response, comments.length)
      };
    },
    async checkResourceExists(input) {
      const query = new URLSearchParams({
        version_uri: input.version_uri,
        type: String(input.type)
      });
      const body =
        input.body ??
        input.resource_uris ??
        (input.resource_uri !== undefined ? [input.resource_uri] : []);

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/resources/exist?${query.toString()}`,
        body
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async updateTepShare(input) {
      const query = new URLSearchParams({
        isShare: String(input.isShare)
      });
      const response = await _http.put(
        `/v3/hutaf-ticc/tm/tep/share?${query.toString()}`,
        undefined,
        {
          headers: {
            "x-auth-tenantid": input.x_auth_tenantid,
            "x-auth-groups": input.x_auth_groups,
            "x-user-name": input.x_user_name,
            "x-auth-token": input.x_auth_token
          }
        }
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async getTepRegisterCode(input) {
      const response = await _http.get("/v3/hutaf-ticc/tm/tep/register-code", {
        headers: {
          "x-auth-tenantid": input.x_auth_tenantid,
          "x-auth-groups": input.x_auth_groups,
          "x-user-name": input.x_user_name,
          "x-auth-token": input.x_auth_token
        }
      });
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        raw: result
      };
    },
    async listTeps(input) {
      const body =
        input.body ??
        {
          ...(input.where !== undefined ? { where: input.where } : {}),
          ...(input.option !== undefined ? { option: input.option } : {})
        };
      const response = await _http.post(
        "/v3/hutaf-ticc/tm/teps/action/query",
        body,
        {
          headers: {
            "x-auth-tenantid": input.x_auth_tenantid,
            "x-auth-groups": input.x_auth_groups,
            "x-user-name": input.x_user_name,
            "x-auth-token": input.x_auth_token
          }
        }
      );
      const payload = readResultPayload(response);
      const teps = readArray<Record<string, unknown>>(payload.result ?? payload.value ?? payload.items ?? payload.list);

      return {
        teps,
        total:
          typeof payload.total === "string"
            ? Number.parseInt(payload.total, 10)
            : readTotal(payload, response, teps.length),
        status: readResultStatus(response, payload)
      };
    },
    async getDesignData(input) {
      const body =
        input.body ??
        {
          ...(input.variableGroupID !== undefined ? { variableGroupID: input.variableGroupID } : {}),
          ...(input.testcaseId !== undefined ? { testcaseId: input.testcaseId } : {}),
          ...(input.testcaseIds !== undefined ? { testcaseIds: input.testcaseIds } : {})
        };
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/query/designData`,
        body,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        raw: result
      };
    },
    async listTestcaseReviews(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const response = await _http.get(
        `/GT3KServer/v4/testcases/${encodeURIComponent(input.testcase_uri)}/review?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reviews = readArray<Record<string, unknown>>(
        payload.value ?? payload.reviews ?? payload.items ?? payload.list
      );

      return {
        reviews,
        total: readTotal(payload, response, reviews.length)
      };
    },
    async listReleaseVersions(input) {
      const query = new URLSearchParams({
        resource_type: input.resource_type
      });
      appendQueryValue(query, "version_uri", input.version_uri);
      appendQueryValue(query, "limit", input.limit);

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/release-versions?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const rawVersions = readArray<unknown>(
        payload.value ?? payload.versions ?? payload.release_versions ?? payload.items ?? payload.list
      );
      const versions = rawVersions.map((item) =>
        readEnvelope(item) ?? { value: item }
      );

      return {
        versions,
        total: readTotal(payload, response, versions.length)
      };
    },
    async getDomainAccessInfo(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(`/v4/domain/access-info?${query.toString()}`);
      const payload = readResultPayload(response);
      const accessInfo = readEnvelope(payload.value) ?? payload;

      return {
        raw: accessInfo
      };
    },
    async listRegisteredServices() {
      const response = await _http.get("/v1/services");
      const payload = readResultPayload(response);
      const services = readArray<Record<string, unknown>>(
        payload.services ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        services,
        total: readTotal(payload, response, services.length)
      };
    },
    async getImageCapacityWarning(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/image/capacity/warning`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async checkUserDefinedConfigUsed(input) {
      const query = new URLSearchParams({
        type: input.type
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/user-defined-configs/${encodeURIComponent(input.config_id)}/used?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listServiceOfferings(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "serviceNames", input.serviceNames);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(`/v4/service/offering${suffix}`);
      const payload = readResultPayload(response);
      const offerings = readArray<Record<string, unknown>>(
        Array.isArray(response)
          ? response
          : payload.value ?? payload.offerings ?? payload.items ?? payload.list
      );

      return {
        offerings,
        total: readTotal(payload, response, offerings.length)
      };
    },
    async listEnvironments(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/environments?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const environments = readArray<Record<string, unknown>>(
        payload.environments ?? payload.value ?? payload.items ?? payload.list
      );

      return {
        environments,
        total: readTotal(payload, response, environments.length)
      };
    },
    async listIteratorInfos(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterator-infos`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.value ?? payload.iterators ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async listIteratorStageCounts(input) {
      const { project_uuid: _projectUuid, ...body } = input;
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_uuid)}/iterators/stage-count`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;

      return {
        value,
        raw: payload
      };
    },
    async listVisibleServices(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/visible-services`
      );
      const payload = readResultPayload(response);
      const services = readArray<Record<string, unknown>>(
        payload.value ?? payload.services ?? payload.items ?? payload.list
      );

      return {
        services,
        total: readTotal(payload, response, services.length)
      };
    },
    async getLicenseSpecification() {
      const response = await _http.get("/v4/license/specification");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listResourceNumberRules(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/resource-number-rule`
      );
      const payload = readResultPayload(response);
      const rules = readArray<Record<string, unknown>>(
        payload.value ?? payload.rules ?? payload.items ?? payload.list
      );

      return {
        rules,
        total: readTotal(payload, response, rules.length)
      };
    },
    async getProjectTestcaseGlobalConfig(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/testcase/global/config`
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload.value) ?? payload;

      return {
        raw: config
      };
    },
    async getApiTestProjectInfo(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "group_id", input.group_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v1/project/${encodeURIComponent(input.project_id)}${suffix}`
      );
      const payload = readResultPayload(response);
      const projectInfo = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        raw: redactSensitiveProjectInfo(projectInfo)
      };
    },
    async getProjectLocalConfig(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/local/${encodeURIComponent(input.property)}/config`
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload) ?? ({ value: payload } as Record<string, unknown>);

      return {
        raw: config
      };
    },
    async getProjectSystemConfig(input) {
      const query = new URLSearchParams({
        owner_id: input.owner_id,
        feature_name: input.feature_name
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_uuid)}/system-config?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listSystemConfigs(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/system-config/find-all`,
        { params: createSystemConfigsParams(input) }
      );
      const payload = readResultPayload(response);
      const configs = readArray<Record<string, unknown>>(
        payload.value ?? payload.values ?? payload.data ?? payload.items ?? payload.list ?? payload.configs
      );

      return {
        configs,
        total: readTotal(payload, response, configs.length),
        raw: payload
      };
    },
    async checkProjectMemberExists() {
      const response = await _http.get("/v4/projects/member/exist");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listTestReportCustomInfos(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/versions/${encodeURIComponent(input.version_uri)}/test-reports/${encodeURIComponent(input.report_uri)}/custom-infos`
      );
      const payload = readResultPayload(response);
      const infos = readArray<Record<string, unknown>>(
        payload.value ?? payload.infos ?? payload.items ?? payload.list
      );

      return {
        infos,
        total: readTotal(payload, response, infos.length)
      };
    },
    async listProjectServiceRepos(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/service-repos?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const repos = readArray<Record<string, unknown>>(
        payload.value ?? payload.repos ?? payload.items ?? payload.list
      );

      return {
        repos,
        total: readTotal(payload, response, repos.length)
      };
    },
    async getProjectServiceRepo(input) {
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/services/${encodeURIComponent(String(input.service_id))}/repo`
      );
      const payload = readResultPayload(response);
      const repo = readEnvelope(payload.value) ?? payload;

      return {
        raw: repo
      };
    },
    async listTaskDefects(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "version_uri", input.version_uri);

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/defects/batch-query?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const defects = readArray<Record<string, unknown>>(
        payload.value ?? payload.defects ?? payload.items ?? payload.list
      );

      return {
        defects,
        total: readTotal(payload, response, defects.length)
      };
    },
    async listResourcePools(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/resource-pools`
      );
      const payload = readResultPayload(response);
      const pools = readArray<Record<string, unknown>>(
        payload.value ?? payload.pools ?? payload.items ?? payload.list
      );

      return {
        pools,
        total: readTotal(payload, response, pools.length)
      };
    },
    async listDomainUsageInfos(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(`/v4/domain/usage?${query.toString()}`);
      const payload = readResultPayload(response);
      const usages = readArray<Record<string, unknown>>(
        payload.value ?? payload.usages ?? payload.items ?? payload.list
      );

      return {
        usages,
        total: readTotal(payload, response, usages.length)
      };
    },
    async getGt3kProgress(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });
      const response = await _http.get(
        `/GT3KServer/v4/progress/${encodeURIComponent(input.operation_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const progress = readEnvelope(payload.value) ?? payload;

      return {
        raw: progress
      };
    },
    async getServiceConfig(input) {
      const query = new URLSearchParams({
        key: input.key,
        type: input.type
      });

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/service/config?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload.value) ?? payload;

      return {
        raw: config
      };
    },
    async getProjectServiceConfig(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "key", input.key);
      appendQueryValue(query, "type", input.type);
      const suffix = query.size ? `?${query.toString()}` : "";

      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/service/config${suffix}`
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload.value) ?? payload;

      return {
        raw: config
      };
    },
    async listAlertTemplates(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "name", input.name);
      appendQueryValue(query, "page_num", input.page);
      appendQueryValue(query, "page_size", input.page_size);

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/alert-templates?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const templates = readArray<Record<string, unknown>>(
        payload.list ?? payload.value ?? payload.templates ?? payload.items
      );

      return {
        templates,
        total: readTotal(payload, response, templates.length)
      };
    },
    async checkAlertUserName(input) {
      const query = new URLSearchParams({
        user_name: input.user_name
      });
      appendQueryValue(query, "user_id", input.user_id);
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/alert/user/name?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async checkAlertTemplateName(input) {
      const query = new URLSearchParams({
        name: input.name
      });
      appendQueryValue(query, "id", input.id);
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/alert-templates/name?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async getDashboardRunPanel(input) {
      const response = await _http.get(
        `/v2/projects/${encodeURIComponent(input.service_id)}/dashboard/run-panel`
      );
      const payload = readResultPayload(response);
      const panel = readEnvelope(payload.value) ?? payload;

      return {
        raw: panel
      };
    },
    async listDashboardStatisticBlocks(input) {
      const query = new URLSearchParams({
        start_time: String(input.start_time),
        end_time: String(input.end_time),
        label: input.label,
        page_num: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "executor_type", input.executor_type);
      appendQueryValue(query, "location_id", input.location_id);

      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/dashboard/statistic/block?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const pagePayload = readEnvelope(payload.value) ?? payload;
      const blocks = readArray<Record<string, unknown>>(
        pagePayload.pageList ??
          pagePayload.page_list ??
          pagePayload.list ??
          pagePayload.items ??
          payload.value
      );

      return {
        blocks,
        total: readTotal(pagePayload, response, blocks.length)
      };
    },
    async listDashboards(input) {
      const query = new URLSearchParams({
        page_number: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "name", input.name);

      const response = await _http.get(
        `/v2/projects/${encodeURIComponent(input.service_id)}/dashboards?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const pagePayload = readEnvelope(payload.value) ?? payload;
      const dashboards = readArray<Record<string, unknown>>(
        pagePayload.page_list ??
          pagePayload.pageList ??
          pagePayload.dashboards ??
          pagePayload.items ??
          pagePayload.list ??
          payload.value
      );

      return {
        dashboards,
        total: readTotal(pagePayload, response, dashboards.length)
      };
    },
    async listApiTestPackageStatus(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.service_id)}/package/status`
      );
      const payload = readResultPayload(response);
      const statuses = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.statuses ?? payload.items ?? payload.list
      );

      return {
        statuses,
        total: readTotal(payload, response, statuses.length)
      };
    },
    async getApiTestConcurrencyPackageStatus(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "test_type", input.test_type);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(`/v1/echotest/concurrency/status${suffix}`);
      const payload = readResultPayload(response);
      const status = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        raw: status
      };
    },
    async getFunctionalTestParallelSummary() {
      const response = await _http.get("/attask/v1/system/parallel/summary");
      const payload = readResultPayload(response);
      const summary = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        raw: summary
      };
    },
    async getFunctionalTestPackageStatus() {
      const response = await _http.get("/v3/hutaf-ticc/package/status");
      const payload = readResultPayload(response);
      const status = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        raw: status
      };
    },
    async checkApiTestTaskName(input) {
      const query = new URLSearchParams({
        task_name: input.task_name
      });
      appendQueryValue(query, "task_id", input.task_id);
      const response = await _http.get(
        `/v4/projects/${encodeURIComponent(input.service_id)}/tasks/name?${query.toString()}`
      );
      if (!readEnvelope(response)) {
        return {
          value: response,
          raw: { value: response }
        };
      }
      const payload = readResultPayload(response);

      return {
        value: payload.value ?? payload.result,
        raw: payload
      };
    },
    async getApiTestPackageChargePopup(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/package-charge/popup`
      );
      const payload = readResultPayload(response);
      const popup = readEnvelope(payload.value) ?? payload;

      return {
        raw: popup
      };
    },
    async listApiTestPackageUsage(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/package-usage`
      );
      const payload = readResultPayload(response);
      const usages = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.usages ?? payload.items ?? payload.list
      );

      return {
        usages,
        total: readTotal(payload, response, usages.length)
      };
    },
    async getApiTestPackageChargeMessage(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/package-charge/message`
      );
      const payload = readResultPayload(response);
      const message = readEnvelope(payload.value) ?? payload;

      return {
        raw: message
      };
    },
    async getSuiteInfoPageUrl(input) {
      const response = await _http.get(
        `/v2/getSuiteInfoPageUrl/${encodeURIComponent(input.testServiceId)}/${encodeURIComponent(input.suiteId)}`
      );
      const payload = readResultPayload(response);
      const pageUrl = typeof payload.pageUrl === "string" ? payload.pageUrl : undefined;

      return {
        page_url: pageUrl,
        raw: payload
      };
    },
    async getApiTestDebugLog(input) {
      const response = await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/testcases/${encodeURIComponent(input.case_id)}/task/${encodeURIComponent(input.task_id)}/debug-log`
      );
      const payload = readResultPayload(response);
      const debugLog = readEnvelope(payload.value) ?? payload;

      return {
        raw: debugLog
      };
    },
    async getCaseLogdataUploadUrl(input) {
      const query = toQueryString({
        task_id: input.task_id,
        file_type: input.file_type,
        case_id: input.case_id,
        filename: input.filename,
        round: input.round
      });
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/logdata/upload-url?${query}`
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        raw: payload
      };
    },
    async getCaseLogdataArchive(input) {
      const query = toQueryString({
        task_id: input.task_id,
        case_id: input.case_id,
        round: input.round
      });
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/logdata/archive?${query}`
      );
      const payload = readResultPayload(response);

      return {
        task_id: input.task_id,
        case_id: input.case_id,
        raw: payload
      };
    },
    async listApiTestcaseExecuteHistories(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size) + 1),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "plan_id", input.plan_id);
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/api-testcases/${encodeURIComponent(input.testcase_id)}/execute-histories?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const histories = readArray<Record<string, unknown>>(
        payload.value ?? payload.histories ?? payload.execute_histories ?? payload.items ?? payload.list
      );

      return {
        histories,
        total: readTotal(payload, response, histories.length)
      };
    },
    async listApiTestcaseHistory(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "plan_id", input.plan_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v2/projects/${encodeURIComponent(input.project_id)}/testcase-history${suffix}`
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const histories = readArray<Record<string, unknown>>(
        result.testcase_execution_history ??
          result.testcase_history ??
          result.histories ??
          result.value ??
          result.items ??
          result.list
      );

      return {
        histories,
        total: readTotal(result, response, histories.length)
      };
    },
    async listCasesStatus(input) {
      const query = new URLSearchParams({
        testServiceId: input.testServiceId
      });
      const response = await _http.post(
        `/v2/querycasestatus?${query.toString()}`,
        {
          cases: input.cases
        },
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const statuses = readArray<Record<string, unknown>>(
        result.casesStatusJA ?? result.cases_status ?? result.statuses ?? result.items ?? result.list
      );

      return {
        statuses,
        total: readTotal(result, response, statuses.length),
        status: readResultStatus(response, payload)
      };
    },
    async listCasesStatusV3(input) {
      const query = new URLSearchParams({
        testServiceId: input.testServiceId
      });
      const response = await _http.post(
        `/v3/querycasestatus?${query.toString()}`,
        {
          cases: input.cases
        },
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const statuses = readArray<Record<string, unknown>>(
        result.casesStatusJA ?? result.cases_status ?? result.statuses ?? result.items ?? result.list
      );

      return {
        statuses,
        total: readTotal(result, response, statuses.length),
        status: readResultStatus(response, payload)
      };
    },
    async listCaseHistory(input) {
      const query = new URLSearchParams({
        testServiceId: input.testServiceId
      });
      appendQueryValue(query, "taskId", input.task_id);
      const body =
        input.body ??
        {
          ...(input.case_id !== undefined ? { caseId: input.case_id } : {}),
          testServiceId: input.testServiceId,
          pageNum: input.page,
          pageSize: input.page_size
        };
      const response = await _http.post(
        `/v2/casehistory?${query.toString()}`,
        body,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const histories = readArray<Record<string, unknown>>(
        result.caseResultList ?? result.histories ?? result.items ?? result.list
      );

      return {
        histories,
        total: readTotal(result, response, histories.length),
        status: readResultStatus(response, payload)
      };
    },
    async listCasesByStid(input) {
      const query = new URLSearchParams({
        testServiceId: input.testServiceId
      });
      const body =
        input.body ??
        {
          suiteid: input.suiteid,
          sortField: input.sort_field ?? "",
          sortType: input.sort_type ?? "",
          status: input.status ?? [],
          ownerIds: input.owner_ids ?? [],
          results: input.results ?? [],
          planId: input.plan_id ?? "",
          stage: input.stage ?? null,
          pageNo: input.page,
          pageSize: input.page_size
        };
      const response = await _http.post(
        `/v2/querycasesbystid?${query.toString()}`,
        body,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const cases = readArray<Record<string, unknown>>(
        result.casesArr ?? result.cases ?? result.items ?? result.list
      );

      return {
        cases,
        total: readTotal(result, response, cases.length),
        status: readResultStatus(response, payload)
      };
    },
    async createCasesTask(input) {
      const query = new URLSearchParams({
        testServiceId: input.testServiceId
      });
      const body =
        input.body ??
        {
          cases: input.cases,
          taskName: input.task_name,
          ...(input.plan_id !== undefined ? { planId: input.plan_id } : {}),
          ...(input.projectId !== undefined ? { projectId: input.projectId } : {}),
          ...(input.projectUUId !== undefined ? { projectUUId: input.projectUUId } : {}),
          ...(input.serviceType !== undefined ? { serviceType: input.serviceType } : {}),
          ...(input.functionType !== undefined ? { functionType: input.functionType } : {}),
          ...(input.releaseversion !== undefined ? { releaseversion: input.releaseversion } : {}),
          ...(input.resourcePool !== undefined ? { resourcePool: input.resourcePool } : {})
        };
      const response = await _http.post(
        `/v2/casestask?${query.toString()}`,
        body,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        task_id: String(result.taskId ?? result.task_id ?? ""),
        need_approve: result.needApprove,
        warn: readArray<unknown>(result.warn),
        package_type: readOptionalString(result.packageType),
        is_popup: typeof result.isPopup === "boolean" ? result.isPopup : undefined,
        status: readResultStatus(response, payload),
        raw: result
      };
    },
    async deleteProjectNotice(input) {
      const response = await _http.post(
        `/v2/delprojectnotice/${encodeURIComponent(input.testServiceId)}`,
        input.body ?? {},
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);

      return {
        status: readResultStatus(response, payload),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async stopCaseTask(input) {
      const response = await _http.delete(
        `/v2/stopCase/${encodeURIComponent(input.testServiceId)}/${encodeURIComponent(input.caseId)}`,
        undefined,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);

      return {
        status: readResultStatus(response, payload),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async getFreeTestTime(input) {
      const response = await _http.get(
        `/v2/queryFreeTestTime/${encodeURIComponent(input.testServiceId)}`
      );
      const payload = readResultPayload(response);
      const freeTime = readEnvelope(payload.value) ?? payload;

      return {
        raw: freeTime
      };
    },
    async getTestSuitesVarListForPipeline(input) {
      const response = await _http.post(
        `/v2/queryTestSuitesVarList4PL/${encodeURIComponent(input.testServiceId)}`,
        input.body ?? {},
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        raw: result
      };
    },
    async getUserEtlDataTotal(input) {
      const response = await _http.post("/testreport/v4/user/etl/query/data-total", input);
      const payload = readResultPayload(response);

      return {
        total: readEtlTotal(payload, response),
        status: readEtlStatus(response, payload),
        raw: payload
      };
    },
    async queryUserEtlData(input) {
      const response = await _http.post("/testreport/v4/user/etl/query/data-list", input);
      const payload = readResultPayload(response);
      const rows = readRowsFromPayload(payload);

      return {
        rows,
        total: readEtlTotal(payload, response, rows.length),
        status: readEtlStatus(response, payload),
        raw: payload
      };
    },
    async getTesthubEtlDataTotal(input) {
      const response = await _http.post("/testreport/v4/testhub/etl/query/data-total", input);
      const payload = readResultPayload(response);

      return {
        total: readEtlTotal(payload, response),
        status: readEtlStatus(response, payload),
        raw: payload
      };
    },
    async queryTesthubEtlDataList(input) {
      const response = await _http.post("/testreport/v4/testhub/etl/query/data-list", input);
      const payload = readResultPayload(response);
      const rows = readRowsFromPayload(payload);

      return {
        rows,
        total: readEtlTotal(payload, response, rows.length),
        status: readEtlStatus(response, payload),
        raw: payload
      };
    },
    async getTesthubEtlMaxRowSize(input) {
      const response = await _http.post("/testreport/v4/testhub/etl/query/max-row-size", input);
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? readEnvelope(payload.result) ?? payload;

      return {
        size:
          readNumberLike(value.size) ??
          readNumberLike(value.max_row_size) ??
          readNumberLike(value.maxRowSize) ??
          readNumberLike(value.total),
        status: readEtlStatus(response, payload),
        raw: payload
      };
    },
    async queryTesthubEtlData(input) {
      const response = await _http.post("/v4/testhub/etl/query-data", input);
      const payload = readResultPayload(response);
      const rows = readRowsFromPayload(payload);

      return {
        rows,
        total: readTotal(payload, response, rows.length),
        raw: payload
      };
    },
    async getTaskGroupDetail(input) {
      const response = await _http.get(
        `/v3/task-group/detail/${encodeURIComponent(input.task_id)}`,
        {
          headers: {
            "x-auth-tenantid": input.x_auth_tenantid,
            "x-auth-groups": input.x_auth_groups,
            "x-user-name": input.x_user_name,
            "x-auth-token": input.x_auth_token
          }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const tasks = readArray<Record<string, unknown>>(
        result.data ?? result.tasks ?? result.items ?? result.list ?? result.value
      );
      const pageInfo = readEnvelope(result.pageInfo);

      return {
        task_id: input.task_id,
        tasks,
        total: readOptionalNumber(pageInfo?.total) ?? readTotal(result, response, tasks.length),
        raw: result
      };
    },
    async getTaskGroupHistory(input) {
      const response = await _http.post(
        `/v3/task-group/detail/history`,
        input.body ?? {
          taskGroupId: input.taskGroupId,
          testServiceId: input.testServiceId,
          ...(input.coldDataFlag !== undefined ? { coldDataFlag: input.coldDataFlag } : {})
        },
        {
          headers: {
            "x-auth-groups": input.x_auth_groups,
            "x-user-name": input.x_user_name,
            "x-auth-token": input.x_auth_token,
            requestId: input.request_id
          }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        task_group_id: input.taskGroupId,
        test_service_id: input.testServiceId,
        raw: result
      };
    },
    async executeTaskGroup(input) {
      const body =
        input.body ??
        {
          ...(input.branchId !== undefined ? { branchId: input.branchId } : {}),
          ...(input.branchName !== undefined ? { branchName: input.branchName } : {}),
          ...(input.versionId !== undefined ? { versionId: input.versionId } : {}),
          ...(input.versionName !== undefined ? { versionName: input.versionName } : {}),
          ...(input.id !== undefined ? { id: input.id } : {}),
          ...(input.author !== undefined ? { author: input.author } : {}),
          ...(input.analyser !== undefined ? { analyser: input.analyser } : {}),
          ...(input.testServiceId !== undefined ? { testServiceId: input.testServiceId } : {}),
          ...(input.userName !== undefined ? { userName: input.userName } : {}),
          ...(input.taskGroupName !== undefined ? { taskGroupName: input.taskGroupName } : {}),
          ...(input.scheduledTime !== undefined ? { scheduledTime: input.scheduledTime } : {}),
          ...(input.intervalTime !== undefined ? { intervalTime: input.intervalTime } : {}),
          ...(input.intervalTimeUnit !== undefined ? { intervalTimeUnit: input.intervalTimeUnit } : {}),
          ...(input.taskPolicy !== undefined ? { taskPolicy: input.taskPolicy } : {}),
          ...(input.taskGroupExeParam !== undefined ? { taskGroupExeParam: input.taskGroupExeParam } : {}),
          ...(input.taskStrategy !== undefined ? { taskStrategy: input.taskStrategy } : {}),
          ...(input.circle !== undefined ? { circle: input.circle } : {}),
          ...(input.overTimeParam !== undefined ? { overTimeParam: input.overTimeParam } : {}),
          ...(input.tmssInfo !== undefined ? { tmssInfo: input.tmssInfo } : {}),
          ...(input.tasks !== undefined ? { tasks: input.tasks } : {})
        };
      const headers: Record<string, string> = {
        "X-Auth-Token": input.x_auth_token
      };
      if (input.x_auth_groups !== undefined) {
        headers["x-auth-groups"] = input.x_auth_groups;
      }
      const response = await _http.post(`/v3/task-group/execution`, body, {
        headers
      });
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        task_group_id: readOptionalString(result.id) ?? readOptionalString(result.taskGroupId),
        status: readResultStatus(response, payload),
        value: result.value ?? payload.value ?? payload.result,
        raw: result
      };
    },
    async createRepositoryTestsuite(input) {
      const response = await _http.post(
        `/v1/projects/${encodeURIComponent(input.project_id)}/repository/testsuites`,
        input.body ?? {
          testsuite_name: input.testsuite_name,
          repository_id: input.repository_id,
          repository_branch: input.repository_branch,
          file_path: input.file_path
        },
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;

      return {
        testsuite_id: readOptionalString(result.testsuite_id) ?? readOptionalString(result.testsuiteId),
        testcase_ids: readArray<string>(result.testcase_ids ?? result.testcaseIds ?? result.value),
        raw: result
      };
    },
    async copyTaskRelations(input) {
      const response = await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/task/relation-copy`,
        input.body ?? {
          original_task_uri: input.original_task_uri,
          dest_task_uri: input.dest_task_uri
        }
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        original_task_uri: input.original_task_uri,
        dest_task_uri: input.dest_task_uri,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async listApiTestsuiteHistory(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "plan_id", input.plan_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v2/projects/${encodeURIComponent(input.project_id)}/testsuite-history${suffix}`
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? payload;
      const histories = readArray<Record<string, unknown>>(
        result.suite_execution_history ??
          result.testsuite_history ??
          result.histories ??
          result.value ??
          result.items ??
          result.list
      );

      return {
        histories,
        total: readTotal(result, response, histories.length)
      };
    },
    async getApiTestDnsMapping(input) {
      const response = await _http.get(`/v1/${encodeURIComponent(input.project_id)}/dns-mapping`);
      const payload = readResultPayload(response);
      const mapping = readEnvelope(payload.value) ?? payload;

      return {
        raw: mapping
      };
    },
    async listApiTestGlobalParamNames(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/variables/getGlobalParamNameList`
      );
      const payload = readResultPayload(response);
      const params = readArray<Record<string, unknown>>(
        payload.paramNames ?? payload.value ?? payload.params ?? payload.items ?? payload.list
      );

      return {
        params,
        total: readTotal(payload, response, params.length)
      };
    },
    async listApiTestVariables(input) {
      const query = new URLSearchParams({
        group_id: input.group_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/variables?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const variables = readArray<Record<string, unknown>>(
        payload.value ?? payload.variables ?? payload.items ?? payload.list
      );

      return {
        variables,
        total: readTotal(payload, response, variables.length)
      };
    },
    async getApiTestBasicAwV3(input) {
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/basic-aw/${encodeURIComponent(input.aw_id)}`
      );
      const payload = readResultPayload(response);
      const aw = readEnvelope(payload.value) ?? payload;

      return {
        raw: aw
      };
    },
    async getApiTestBasicAwV4(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "is_api", input.is_api);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/basic-aw/${encodeURIComponent(input.aw_id)}${suffix}`
      );
      const payload = readResultPayload(response);
      const aw = readEnvelope(payload.result) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: aw
      };
    },
    async listApiTestBasicAwInfos(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "aw_name", input.aw_name);
      appendQueryValue(query, "parent_id", input.parent_id);
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/aw_cata/aw_info_list?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.page_list ?? payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async listApiTestBasicAwInfosV2(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "aw_name", input.aw_name);
      appendQueryValue(query, "parent_id", input.parent_id);
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/aw-cata/aw-info-list?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.page_list ?? payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async searchApiTestBasicAwInfos(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "parent_id", input.parent_id);
      const body: Record<string, unknown> = {};
      if (input.search_type !== undefined) {
        body.search_type = input.search_type;
      }
      if (input.search_value !== undefined) {
        body.search_value = input.search_value;
      }
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/aw-cata/aw-info-list?${query.toString()}`,
        body
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.page_list ?? payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async batchSendNotifications(input) {
      const body = {
        ...(input.body ?? {}),
        ...(input.type !== undefined ? { type: input.type } : {}),
        ...(input.receivers !== undefined ? { receivers: input.receivers } : {}),
        ...(input.comment_id !== undefined ? { comment_id: input.comment_id } : {}),
        ...(input.inner_text !== undefined ? { inner_text: input.inner_text } : {})
      };
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/notifications/batch-send`,
        body
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async createResourceUriV4(input) {
      const response = await _http.post(`/GT3KServer/v4/${encodeURIComponent(input.project_id)}/resource-uri`);
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async importTasks(input) {
      const body = {
        source_version_uri: input.source_version_uri,
        dest_version_uri: input.dest_version_uri,
        source_task_uris: input.source_task_uris,
        project_uuid: input.project_uuid,
        ...(input.is_copy !== undefined ? { is_copy: input.is_copy } : {})
      };
      const response = await _http.post("/v4/tasks/import", body);
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async uploadBackground(input) {
      const query = new URLSearchParams({ background_type: input.background_type });
      const form = new FormData();
      form.append(
        "param",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = await _http.postMultipart(
        `/v4/${encodeURIComponent(input.project_id)}/background/upload?${query.toString()}`,
        form
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async createTestStepByCollection(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "branch_uri", input.branch_uri);
      appendQueryValue(query, "tmss_case_uri", input.tmss_case_uri);
      const form = new FormData();
      form.append(
        "req",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = await _http.postMultipart(
        `/v1/${encodeURIComponent(input.project_id)}/postman-collection?${query.toString()}`,
        form,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async uploadFileToGit(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "aw_ins_id", input.aw_ins_id);
      appendQueryValue(query, "case_id", input.case_id);
      if (input.is_combined_aw !== undefined) {
        query.set("is_combined_aw", String(input.is_combined_aw));
      }
      const form = new FormData();
      form.append(
        "request",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = await _http.postMultipart(
        `/v1/${encodeURIComponent(input.project_id)}/uploadFile?${query.toString()}`,
        form,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async uploadFileV3(input) {
      const form = new FormData();
      form.append(
        "request",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = await _http.postMultipart(
        `/v3/${encodeURIComponent(input.project_id)}/files`,
        form,
        {
          headers: { "X-Auth-Token": input.x_auth_token }
        }
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async uploadResourceAttachment(input) {
      const form = new FormData();
      form.append(
        "file",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      form.append("version_uri", input.version_uri);
      form.append("resource_type", input.resource_type);
      form.append("resource_uri", input.resource_uri);
      const response = await _http.postMultipart(
        `/v4/${encodeURIComponent(input.project_id)}/resources/${encodeURIComponent(input.resource_uri)}/attachments/upload`,
        form
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async getExecutorElements(input) {
      const body =
        input.body ??
        {
          ...(input.execute_mode !== undefined ? { execute_mode: input.execute_mode } : {}),
          ...(input.testcase_infos !== undefined ? { testcase_infos: input.testcase_infos } : {})
        };
      const response = await _http.post(`/v1/${encodeURIComponent(input.project_id)}/executor/elements`, body);
      const payload = readResultPayload(response);

      return {
        raw: payload
      };
    },
    async downloadClasses(input) {
      const body =
        input.body ??
        (input.testcase_ids !== undefined
          ? {
              DownloadClassesRequestBody: input.testcase_ids
            }
          : {});
      const response = await _http.post(`/v1/${encodeURIComponent(input.project_id)}/scripts`, body);
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async updateUserInfos(input) {
      const params =
        input.params ??
        {
          ...(input.old_user_num !== undefined ? { old_user_num: input.old_user_num } : {}),
          ...(input.new_user_num !== undefined ? { new_user_num: input.new_user_num } : {}),
          ...(input.update_business_type !== undefined
            ? { update_business_type: input.update_business_type }
            : {}),
          ...(input.update_resource_id !== undefined ? { update_resource_id: input.update_resource_id } : {})
        };
      const body = input.body ?? { params };
      const response = await _http.put(`/v1/${encodeURIComponent(input.project_id)}/update-userinfo`, body);
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async listApiTestBasicAwsBatch(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/basic-aws`,
        input.aw_ids
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async listApiTestChildBasicAws(input) {
      const query = new URLSearchParams({
        parent_id: input.parent_id,
        is_contain_aw: "false"
      });
      appendQueryValue(query, "aw_name", input.aw_name);
      appendQueryValue(query, "source_type", input.source_type);
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/aw_cata/child_cata_data?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async updateAwCataFirst(input) {
      const query = new URLSearchParams({
        cata_id: input.cata_id,
        cata_name: input.cata_name
      });
      appendQueryValue(query, "parent_id", input.parent_id);
      appendQueryValue(query, "source_type", input.source_type);
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/aw_cata/update_aw_cata?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        cata_id: input.cata_id,
        value: payload.result ?? payload.value ?? payload.data,
        raw: payload
      };
    },
    async createAwCataFirst(input) {
      const body = {
        ...(input.body ?? {}),
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.desc !== undefined ? { desc: input.desc } : {}),
        ...(input.parent_id !== undefined ? { parent_id: input.parent_id } : {}),
        ...(input.aw_type !== undefined ? { aw_type: input.aw_type } : {})
      };
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/aw_cata/create_aw_cata`,
        body
      );
      const payload = readResultPayload(response);
      const value = readResultValue(response, payload);
      const result = readEnvelope(value);

      return {
        cata_id: String(result?.id ?? result?.cata_id ?? ""),
        value,
        raw: payload
      };
    },
    async deleteAwCatas(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/aw_cata/delete_aw_catas`,
        input.items
      );
      const payload = readResultPayload(response);

      return {
        ids: input.items.map((item) => item.id),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async deleteCustomAwFile(input) {
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/basic-aw-lib/${encodeURIComponent(input.basic_aw_id)}/${encodeURIComponent(input.aw_lib_id)}`
      );
      const payload = readResultPayload(response);

      return {
        basic_aw_id: input.basic_aw_id,
        aw_lib_id: input.aw_lib_id,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async updateAwNameView(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "source_type", input.source_type);
      const suffix = query.size ? `?${query.toString()}` : "";
      const body =
        input.body ??
        (input.name_view !== undefined
          ? {
              project_id: input.project_id,
              name_view: input.name_view
            }
          : {});
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/update_awName_view${suffix}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async updateTimeOutView(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "source_type", input.source_type);
      const suffix = query.size ? `?${query.toString()}` : "";
      const body =
        input.body ??
        (input.time_out !== undefined
          ? {
              project_id: input.project_id,
              time_out: input.time_out
            }
          : {});
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/update_timeOut_view${suffix}`,
        body
      );
      const payload = readResultPayload(response);

      return {
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async saveAwRefreshToAll(input) {
      const query = new URLSearchParams({
        aw_id: input.aw_id
      });
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/basic-aw/refresh-to-all/save?${query.toString()}`,
        input.body
      );
      const payload = readResultPayload(response);

      return {
        aw_id: input.aw_id,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async deleteBasicAwsV1(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "is_api", input.is_api);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.delete(
        `/v1/${encodeURIComponent(input.project_id)}/basic-aws${suffix}`,
        input.aw_ids
      );
      const payload = readResultPayload(response);

      return {
        aw_ids: input.aw_ids,
        value: payload.result ?? payload.value ?? payload.data,
        raw: payload
      };
    },
    async deleteBasicAwsV2(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "is_api", input.is_api);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.delete(
        `/v2/${encodeURIComponent(input.project_id)}/basic-aws${suffix}`,
        input.aw_ids
      );
      const payload = readResultPayload(response);

      return {
        aw_ids: input.aw_ids,
        value: payload.result ?? payload.value ?? payload.data,
        raw: payload
      };
    },
    async deleteIssueDynamicRecords(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id,
        owner_id: input.owner_id
      });
      const response = await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue-update-records?${query.toString()}`
      );
      const payload = readResultPayload(response);

      return {
        issue_id: input.issue_id,
        owner_id: input.owner_id,
        value: payload.value ?? payload.result ?? payload.data,
        raw: payload
      };
    },
    async deleteCustomizedFilter(input) {
      const response = await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/filters/${encodeURIComponent(input.filter_uri)}`
      );
      const payload = readResultPayload(response);

      return {
        filter_uri: input.filter_uri,
        value: payload.value ?? payload.result ?? payload.data,
        raw: payload
      };
    },
    async deleteVectors(input) {
      const response = await _http.delete("/v4/testcases/vector", {
        project_uuid: input.project_uuid,
        case_uris: input.case_uris
      });
      const payload = readResultPayload(response);

      return {
        project_uuid: input.project_uuid,
        case_uris: input.case_uris,
        value: payload.value ?? payload.result ?? payload.data,
        raw: payload
      };
    },
    async deleteRecycleResource(input) {
      const response = await _http.delete("/v4/recycle", {
        project_uuid: input.project_uuid,
        resources: input.resources,
        is_async: input.is_async
      });
      const payload = readResultPayload(response);

      return {
        project_uuid: input.project_uuid,
        value: payload.value ?? payload.result ?? payload.data,
        raw: payload
      };
    },
    async deleteTestcasesV3(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "delete_git_script", input.delete_git_script);
      appendQueryValue(query, "iterator_uri", input.iterator_uri);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.delete(
        `/v3/${encodeURIComponent(input.project_id)}/testcases${suffix}`,
        input.testcases
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        value: payload.result ?? payload.value ?? payload.data,
        raw: payload
      };
    },
    async listApiTestAwNameViews(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/get_awName_view`
      );
      const payload = readResultPayload(response);
      const views = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.views ?? payload.items ?? payload.list
      );

      return {
        views,
        total: readTotal(payload, response, views.length)
      };
    },
    async listApiTestBasicAwParamProperties(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/basic-aw/${encodeURIComponent(input.aw_id)}/param-property`
      );
      const payload = readResultPayload(response);
      const properties = readArray<string>(
        payload.value ?? payload.result ?? payload.properties ?? payload.items ?? payload.list
      );

      return {
        properties,
        total: readTotal(payload, response, properties.length)
      };
    },
    async listPublicAwLibAndAws(input) {
      const response = await _http.get(
        `/v1/project/${encodeURIComponent(input.project_id)}/public_aw_lib_and_aws`
      );
      const payload = readResultPayload(response);
      const aws = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.aws ?? payload.items ?? payload.list
      );

      return {
        aws,
        total: readTotal(payload, response, aws.length)
      };
    },
    async getApiTestAvailableConfig(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/available/config`
      );
      const payload = readResultPayload(response);
      const config = readEnvelope(payload.value) ?? payload;

      return {
        raw: config
      };
    },
    async getTestcaseScriptDetailV1(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/testcase/${encodeURIComponent(input.tmss_case_uri)}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.tmss_case_uri ?? testcase.uri ?? testcase.id ?? input.tmss_case_uri),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getTestcaseScriptDetailV3(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "task_id", input.task_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/testcase/${encodeURIComponent(input.tmss_case_uri)}${suffix}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.tmss_case_uri ?? testcase.uri ?? testcase.id ?? input.tmss_case_uri),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async getTestcaseScriptDetailV4(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "task_id", input.task_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/testcase/${encodeURIComponent(input.tmss_case_uri)}${suffix}`
      );
      const payload = readResultPayload(response);
      const testcase = readEnvelope(payload.value) ?? payload;

      return {
        case_id: String(testcase.tmss_case_uri ?? testcase.uri ?? testcase.id ?? input.tmss_case_uri),
        name: typeof testcase.name === "string" ? testcase.name : undefined,
        raw: testcase
      };
    },
    async listVariableGroups(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      const response = await _http.get(`/v1/variables/getVarGroupList?${query.toString()}`);
      const payload = readResultPayload(response);
      const groups = readArray<Record<string, unknown>>(
        payload.page_list ?? payload.value ?? payload.groups ?? payload.items ?? payload.list
      );

      return {
        groups,
        total: readTotal(payload, response, groups.length)
      };
    },
    async listVariableGroupNames(input) {
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/variables/variablegroup_namepaging`,
        createVariableGroupNamePagingBody(input)
      );
      const payload = readResultPayload(response);
      const envelope = readEnvelope(response) ?? {};
      const rawResult = envelope.result ?? payload.result;
      const result =
        readEnvelope(rawResult) ?? (Array.isArray(rawResult) ? { variableGroupName: rawResult } : payload);
      const groups = readArray<Record<string, unknown>>(
        result.variableGroupName ?? result.value ?? result.values ?? result.items ?? result.list
      );

      return {
        groups,
        total: readTotal(result, response, groups.length),
        raw: payload
      };
    },
    async listNoticeConfigs(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/notice_config/notice_config_list`
      );
      const payload = readResultPayload(response);
      const notices = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.notices ?? payload.items ?? payload.list
      );

      return {
        notices,
        total: readTotal(payload, response, notices.length)
      };
    },
    async listTimeoutSettings(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/get_timeOut_view`
      );
      const payload = readResultPayload(response);
      const settings = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.settings ?? payload.items ?? payload.list
      );

      return {
        settings,
        total: readTotal(payload, response, settings.length)
      };
    },
    async listVariablesV3(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "group_id", input.group_id);
      const response = await _http.get(
        `/v3/${encodeURIComponent(input.project_id)}/variables?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const variables = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.variables ?? payload.items ?? payload.list
      ).map(redactSensitiveVariable);

      return {
        variables,
        total: readTotal(payload, response, variables.length)
      };
    },
    async listVariablesByGroup(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      appendQueryValue(query, "group_id", input.group_id);
      const response = await _http.get(`/v1/variables/getVarbyGroup?${query.toString()}`);
      const payload = readResultPayload(response);
      const variables = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.variables ?? payload.items ?? payload.list
      ).map(redactSensitiveVariable);

      return {
        variables,
        total: readTotal(payload, response, variables.length)
      };
    },
    async listVariablesByGroupWithSensitive(input) {
      const query = new URLSearchParams({
        project_id: input.project_id
      });
      appendQueryValue(query, "group_id", input.group_id);
      const response = await _http.get(`/v1/variables/getVarbyGroupWithSensitive?${query.toString()}`);
      const payload = readResultPayload(response);
      const variables = readArray<Record<string, unknown>>(
        payload.value ?? payload.result ?? payload.variables ?? payload.items ?? payload.list
      ).map(redactSensitiveVariable);

      return {
        variables,
        total: readTotal(payload, response, variables.length)
      };
    },
    async showSensitivePropertyById(input) {
      const query = toQueryString({
        group_id: input.group_id,
        var_id: input.var_id
      });
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/variables/getSensitivePropertybyId?${query}`
      );
      const payload = readResultPayload(response);
      const redacted = redactStringResult(payload);

      return {
        variable_id: input.var_id,
        value: redacted.value,
        redacted: redacted.redacted,
        raw: redacted.raw
      };
    },
    async showVariablesDecrypt(input) {
      const query = toQueryString({
        variable_id: input.variable_id
      });
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/variables/decrypt?${query}`
      );
      const payload = readResultPayload(response);
      const redacted = redactStringResult(payload);

      return {
        variable_id: input.variable_id,
        value: redacted.value,
        redacted: redacted.redacted,
        raw: redacted.raw
      };
    },
    async getVariableSynchronizationV2(input) {
      const query = new URLSearchParams({
        variable_name: input.variable_name
      });
      appendQueryValue(query, "group_id", input.group_id);
      const response = await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/variable-synchronization?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const synchronization = readEnvelope(payload.value) ?? payload;

      return {
        raw: synchronization
      };
    },
    async getVariableSynchronization(input) {
      const query = new URLSearchParams({
        variable_name: input.variable_name
      });
      appendQueryValue(query, "group_id", input.group_id);
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/variable-synchronization?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const synchronization = readEnvelope(payload.value) ?? payload;

      return {
        raw: synchronization
      };
    },
    async getProgress(input) {
      const query = new URLSearchParams();
      appendQueryValue(query, "project_id", input.project_id);
      const suffix = query.size ? `?${query.toString()}` : "";
      const response = await _http.get(`/v1/progress/${encodeURIComponent(input.id)}${suffix}`);
      const payload = readResultPayload(response);
      const progress = readEnvelope(payload.value) ?? payload;

      return {
        raw: progress
      };
    },
    async getProjectProgress(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/progress/${encodeURIComponent(input.operation_uri)}`
      );
      const payload = readResultPayload(response);
      const progress = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: progress
      };
    },
    async getTesthubProgress(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });
      const response = await _http.get(
        `/v4/testhub/progress/${encodeURIComponent(input.operation_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const progress = readEnvelope(payload.data) ?? readEnvelope(payload.value) ?? payload;

      return {
        raw: progress
      };
    },
    async listGt3kProjectServiceRepos(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const response = await _http.get(
        `/GT3KServer/v4/projects/${encodeURIComponent(input.project_uuid)}/service-repos?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const repos = readArray<Record<string, unknown>>(
        payload.value ?? payload.repos ?? payload.items ?? payload.list
      );

      return {
        repos,
        total: readTotal(payload, response, repos.length)
      };
    },
    async listGt3kIteratorInfos(input) {
      const response = await _http.get(
        `/GT3KServer/v4/projects/${encodeURIComponent(input.project_id)}/iterator-infos`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.value ?? payload.iterators ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async listGt3kVisibleServices(input) {
      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/visible-services`
      );
      const payload = readResultPayload(response);
      const services = readArray<Record<string, unknown>>(
        payload.value ?? payload.services ?? payload.items ?? payload.list
      );

      return {
        services,
        total: readTotal(payload, response, services.length)
      };
    },
    async listGt3kDomainUsageInfos(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(`/GT3KServer/v4/domain/usage?${query.toString()}`);
      const payload = readResultPayload(response);
      const usages = readArray<Record<string, unknown>>(
        payload.value ?? payload.usages ?? payload.items ?? payload.list
      );

      return {
        usages,
        total: readTotal(payload, response, usages.length)
      };
    },
    async listGt3kTestcaseFields(input) {
      const response = await _http.get(
        `/GT3KServer/v4/${encodeURIComponent(input.project_id)}/testcase/field/batch-query`
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
    async getGt3kFreeDeclaration() {
      const response = await _http.get("/GT3KServer/v4/free-declaration");
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
      };
    },
    async listV4TestcaseReviews(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const response = await _http.get(
        `/v4/testcases/${encodeURIComponent(input.testcase_uri)}/review?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const reviews = readArray<Record<string, unknown>>(
        payload.value ?? payload.reviews ?? payload.items ?? payload.list
      );

      return {
        reviews,
        total: readTotal(payload, response, reviews.length)
      };
    },
    async getBranch(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(
        `/v4/branches/${encodeURIComponent(input.branch_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const branch = readEnvelope(payload.value) ?? payload;

      return {
        raw: branch
      };
    },
    async getGt3kBranch(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(
        `/GT3KServer/v4/branches/${encodeURIComponent(input.branch_id)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const branch = readEnvelope(payload.value) ?? payload;

      return {
        raw: branch
      };
    },
    async listIteratorIssueIds(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/iterators/${encodeURIComponent(input.iterator_uri)}/issue-ids`
      );
      const payload = readResultPayload(response);
      const rawIssueIds = readArray<unknown>(payload.value ?? payload.issue_ids ?? payload.items ?? payload.list);
      const issueIds = rawIssueIds.map((item) => readEnvelope(item) ?? { value: item });

      return {
        issue_ids: issueIds,
        total: readTotal(payload, response, issueIds.length)
      };
    },
    async listFeatureDescendantUris(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/features/${encodeURIComponent(input.feature_uri)}/descendant-uris`
      );
      const payload = readResultPayload(response);
      const rawUris = readArray<unknown>(payload.value ?? payload.uris ?? payload.items ?? payload.list);
      const uris = rawUris.map((item) => readEnvelope(item) ?? { value: item });

      return {
        uris,
        total: readTotal(payload, response, uris.length)
      };
    },
    async searchFeatures(input) {
      const body: Record<string, unknown> = {
        version_uri: input.version_uri,
        project_uuid: input.project_uuid,
        key_word: input.key_word,
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.parent_uri !== undefined) {
        body.parent_uri = input.parent_uri;
      }

      const response = await _http.post("/v4/features/search", body);
      const payload = readResultPayload(response);
      const features = readArray<Record<string, unknown>>(
        payload.value ?? payload.features ?? payload.items ?? payload.list
      );

      return {
        features,
        total: readTotal(payload, response, features.length),
        raw: payload
      };
    },
    async searchFeaturesByCase(input) {
      const response = await _http.post("/v4/features/search-by-case", {
        version_uri: input.version_uri,
        project_uuid: input.project_uuid,
        case_uri: input.case_uri,
        service_types: input.service_types
      });
      const payload = readResultPayload(response);
      const feature = readEnvelope(payload.value) ?? readEnvelope(payload);

      return {
        feature,
        raw: payload
      };
    },
    async listFeatureCaseCounts(input) {
      const body: Record<string, unknown> = {
        project_uuid: input.project_uuid
      };
      if (input.contain_root !== undefined) {
        body.contain_root = input.contain_root;
      }
      if (input.contain_child !== undefined) {
        body.contain_child = input.contain_child;
      }
      if (input.task_uri !== undefined) {
        body.task_uri = input.task_uri;
      }
      if (input.filter_child !== undefined) {
        body.filter_child = input.filter_child;
      }
      if (input.not_in_other_it !== undefined) {
        body.not_in_other_it = input.not_in_other_it;
      }
      if (input.condition_type !== undefined) {
        body.condition_type = input.condition_type;
      }
      if (input.condition_value !== undefined) {
        body.condition_value = input.condition_value;
      }
      if (input.test_case_conditions !== undefined) {
        body.test_case_conditions = input.test_case_conditions;
      }
      if (input.feature_uris !== undefined) {
        body.feature_uris = input.feature_uris;
      }
      if (input.upward_recursion !== undefined) {
        body.upward_recursion = input.upward_recursion;
      }

      const response = await _http.post(
        `/v4/versions/${encodeURIComponent(input.version_uri)}/features/case-total`,
        body
      );
      const payload = readResultPayload(response);
      const counts = readArray<Record<string, unknown>>(
        payload.value ?? payload.counts ?? payload.items ?? payload.list
      );

      return {
        counts,
        total: readTotal(payload, response, counts.length),
        raw: payload
      };
    },
    async listFeatureChildren(input) {
      const response = await _http.post(
        `/v4/features/${encodeURIComponent(input.feature_uri)}/children`,
        createFeatureChildrenBody(input)
      );
      const payload = readResultPayload(response);
      const children = readArray<Record<string, unknown>>(
        payload.value ?? payload.children ?? payload.items ?? payload.list
      );

      return {
        children,
        total: readTotal(payload, response, children.length),
        raw: payload
      };
    },
    async listGt3kFeatureChildren(input) {
      const response = await _http.post(
        `/GT3KServer/v4/features/${encodeURIComponent(input.feature_uri)}/children`,
        createFeatureChildrenBody(input)
      );
      const payload = readResultPayload(response);
      const children = readArray<Record<string, unknown>>(
        payload.value ?? payload.children ?? payload.items ?? payload.list
      );

      return {
        children,
        total: readTotal(payload, response, children.length),
        raw: payload
      };
    },
    async listFeatureChildrenV5(input) {
      const response = await _http.post(
        `/v5/features/${encodeURIComponent(input.feature_uri)}/children`,
        createFeatureChildrenBody(input)
      );
      const payload = readResultPayload(response);
      const children = readArray<Record<string, unknown>>(
        payload.value ?? payload.children ?? payload.items ?? payload.list
      );

      return {
        children,
        total: readTotal(payload, response, children.length),
        raw: payload
      };
    },
    async listGt3kFeatureChildrenV5(input) {
      const response = await _http.post(
        `/GT3KServer/v5/features/${encodeURIComponent(input.feature_uri)}/children`,
        createFeatureChildrenBody(input)
      );
      const payload = readResultPayload(response);
      const children = readArray<Record<string, unknown>>(
        payload.value ?? payload.children ?? payload.items ?? payload.list
      );

      return {
        children,
        total: readTotal(payload, response, children.length),
        raw: payload
      };
    },
    async getTestcaseField(input) {
      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/testcase/field/${encodeURIComponent(input.uri)}`
      );
      const payload = readResultPayload(response);
      const field = readEnvelope(payload.value) ?? payload;

      return {
        raw: field
      };
    },
    async listTestexecutorResourcePools(input) {
      const response = await _http.get(
        `/testexecutor/v4/${encodeURIComponent(input.project_id)}/resource-pools`
      );
      const payload = readResultPayload(response);
      const pools = readArray<Record<string, unknown>>(
        payload.value ?? payload.pools ?? payload.items ?? payload.list
      );

      return {
        pools,
        total: readTotal(payload, response, pools.length)
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
    async listIteratorsV4WithStats(input) {
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        page_no: input.page,
        page_size: input.page_size,
        offset: pageToOffset(input.page, input.page_size),
        limit: input.page_size,
        name: input.name,
        current_stage: input.current_stage,
        branch_uri: input.branch_uri,
        with_stats: input.with_stats
      });
      const response = await _http.post("/v4/iterators/batch-query", body);
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.iterators ?? payload.value ?? payload.values ?? payload.data ?? payload.items ?? payload.list
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length),
        raw: payload
      };
    },
    async listTesthubIteratorsV5(input) {
      const query = new URLSearchParams({
        offset: String(pageToOffset(input.page, input.page_size)),
        limit: String(input.page_size)
      });
      appendQueryValue(query, "name", input.name);
      appendQueryValue(query, "current_stage", input.current_stage);
      appendQueryValue(query, "branch_uri", input.branch_uri);
      appendQueryValue(query, "fix_version_ids", input.fix_version_ids);
      appendQueryValue(query, "query_all_version", input.query_all_version);

      const response = await _http.get(
        `/v5/testhub/projects/${encodeURIComponent(input.project_id)}/iterators?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const iterators = readArray<Record<string, unknown>>(
        payload.iterators ?? payload.value ?? payload.items ?? payload.list ?? (Array.isArray(response) ? response : [])
      );

      return {
        iterators,
        total: readTotal(payload, response, iterators.length)
      };
    },
    async getIterator(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(
        `/v4/iterators/${encodeURIComponent(input.iterator_uri)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const iterator = readEnvelope(payload.value) ?? payload;

      return {
        iterator_id: String(iterator.uri ?? iterator.plan_id ?? iterator.id ?? input.iterator_uri),
        name: typeof iterator.name === "string" ? iterator.name : undefined,
        raw: iterator
      };
    },
    async createTesthubIterator(input) {
      const response = await _http.post(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/iterators`,
        {
          name: input.name,
          assigned_id: input.assigned_id,
          service_id_list: input.service_id_list,
          plan_cycle: input.plan_cycle,
          branch_uri: input.branch_uri
        }
      );
      const payload = readResultPayload(response);
      const result = readEnvelope(payload.result) ?? readEnvelope(payload.value) ?? payload;

      return {
        iterator_id: String(result.plan_id ?? result.iterator_id ?? result.uri ?? ""),
        name: input.name,
        status: readResultStatus(response, payload),
        raw: result
      };
    },
    async getGt3kIterator(input) {
      const query = new URLSearchParams({
        project_uuid: input.project_uuid
      });

      const response = await _http.get(
        `/GT3KServer/v4/iterators/${encodeURIComponent(input.iterator_id)}?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const iterator = readEnvelope(payload.value) ?? payload;

      return {
        iterator_id: String(iterator.uri ?? iterator.id ?? input.iterator_id),
        name: typeof iterator.name === "string" ? iterator.name : undefined,
        raw: iterator
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
    async listIteratorIssueCases(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/iterators/${encodeURIComponent(input.iterator_uri)}/issues/cases/batch-query`,
        { workitem_list: input.workitem_list }
      );
      const payload = readResultPayload(response);
      const rawCaseIds = readArray<unknown>(payload.value ?? payload.case_ids ?? payload.items ?? payload.list);
      const caseIds = rawCaseIds.map((item) => readEnvelope(item) ?? { value: item });

      return {
        case_ids: caseIds,
        total: readTotal(payload, response, caseIds.length)
      };
    },
    async batchAddIteratorTestcases(input) {
      const response = await _http.post(
        `/v4/testhub/projects/${encodeURIComponent(input.project_id)}/iterator/${encodeURIComponent(input.iterator_uri)}/testcases/batch-add`,
        {
          service_id: input.service_id,
          testcase_id_list: input.testcase_id_list
        }
      );
      const payload = readResultPayload(response);

      return {
        iterator_uri: input.iterator_uri,
        testcase_count: input.testcase_id_list.length,
        added: true,
        raw: payload
      };
    },
    async batchDeleteIteratorsV4(input) {
      const iteratorUris = input.iterator_uris ?? input.iterator_ids ?? [];
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        iterator_uris: input.iterator_uris,
        iterator_ids: input.iterator_ids
      });
      const response = await _http.delete("/v4/iterators/batch-delete", body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        iterator_uris: iteratorUris,
        deleted: true,
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchDeleteBranchesV4(input) {
      const branchUris = input.branch_uris ?? input.branch_ids ?? [];
      const body = readBodyOverride(input, {
        project_id: input.project_id,
        branch_uris: input.branch_uris,
        branch_ids: input.branch_ids
      });
      const query = new URLSearchParams();
      appendQueryValue(query, "is_async", input.is_async);
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = await _http.delete(`/v4/branches/batch-delete${suffix}`, body);
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        branch_uris: branchUris,
        deleted: true,
        value: readResultValue(response, payload),
        raw: payload
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
    async createExecutionTaskV1(input) {
      const body = readBodyOverride(input, {
        uri: input.uri,
        name: input.name,
        description: input.description,
        version_uri: input.version_uri
      });
      const response = await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/tasks`,
        body
      );
      const payload = readResultPayload(response);
      const item = readEnvelope(payload.value) ?? payload;

      return {
        task_id: String(item.uri ?? item.task_uri ?? item.id ?? input.uri ?? ""),
        name: readOptionalString(item.name) ?? input.name,
        version_uri: readOptionalString(item.version_uri) ?? input.version_uri,
        status_code: readOptionalNumber(item.status_code),
        status_name: readOptionalString(item.status_name),
        value: readResultValue(response, payload),
        raw: payload
      };
    },
    async batchUpdateTaskAttributes(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/batch-update`,
        {
          task_uris: input.task_uris,
          tag_names: input.tag_names,
          version_uri: input.version_uri,
          project_uuid: input.project_uuid,
          is_async: input.is_async,
          is_delete: input.is_delete
        }
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        task_uris: input.task_uris,
        value: readResultValue(response, payload),
        raw: payload
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
    async deleteWorkItemTestRelation(input) {
      const body: Record<string, unknown> = {
        test_case_uris: input.test_case_uris,
        project_uuid: input.project_uuid
      };
      if (input.version_uri !== undefined) {
        body.version_uri = input.version_uri;
      }
      if (input.relate_type !== undefined) {
        body.relate_type = input.relate_type;
      }

      const response = await _http.delete(
        `/v4/workitems/${encodeURIComponent(input.work_item_id)}/relations/testrelation`,
        body
      );
      const payload = readResultPayload(response);

      return {
        work_item_id: input.work_item_id,
        test_case_uris: input.test_case_uris,
        project_uuid: input.project_uuid,
        version_uri: input.version_uri,
        relate_type: input.relate_type,
        value: readResultValue(response, payload),
        deleted: true,
        raw: payload
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
    async updateTaskExecutionInfo(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/testcases/execution-info`,
        {
          result_code: input.result_code,
          status_code: input.status_code,
          execute_latest_time: input.execute_latest_time,
          execute_duration: input.execute_duration,
          execute_times: input.execute_times,
          total_execute_times: input.total_execute_times,
          task_uri: input.task_uri,
          version_uri: input.version_uri,
          executor_id: input.executor_id,
          execute_status_code: input.execute_status_code,
          case_list: input.case_list
        }
      );
      const payload = readResultPayload(response);

      return {
        task_uri: input.task_uri,
        value: typeof payload.value === "string" ? payload.value : undefined,
        updated: true
      };
    },
    async updateTaskExecutionStatus(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/testcases/execution-status`,
        {
          result_code: input.result_code,
          status_code: input.status_code,
          execute_latest_time: input.execute_latest_time,
          execute_duration: input.execute_duration,
          execute_times: input.execute_times,
          total_execute_times: input.total_execute_times,
          task_uri: input.task_uri,
          version_uri: input.version_uri,
          executor_id: input.executor_id,
          execute_status_code: input.execute_status_code,
          case_list: input.case_list
        }
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;

      return {
        task_uri: input.task_uri,
        value:
          typeof value.value === "string"
            ? value.value
            : typeof payload.value === "string"
              ? payload.value
              : undefined,
        updated: true
      };
    },
    async stopTaskExecutionByCase(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_uri)}/testcases/execution-stop`,
        {
          result_code: input.result_code,
          status_code: input.status_code,
          execute_latest_time: input.execute_latest_time,
          execute_duration: input.execute_duration,
          execute_times: input.execute_times,
          total_execute_times: input.total_execute_times,
          task_uri: input.task_uri,
          version_uri: input.version_uri,
          executor_id: input.executor_id,
          execute_status_code: input.execute_status_code,
          case_list: input.case_list
        }
      );
      const payload = readResultPayload(response);

      return {
        task_uri: input.task_uri,
        value: typeof payload.value === "string" ? payload.value : undefined,
        stopped: true
      };
    },
    async batchUpdateTestcaseExecutionInfo(input) {
      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/testcases/execution-info/batch-update`,
        {
          result_code: input.result_code,
          status_code: input.status_code,
          execute_latest_time: input.execute_latest_time,
          execute_duration: input.execute_duration,
          execute_times: input.execute_times,
          total_execute_times: input.total_execute_times,
          task_uri: input.task_uri,
          version_uri: input.version_uri,
          executor_id: input.executor_id,
          execute_status_code: input.execute_status_code,
          case_list: input.case_list
        }
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        value: typeof payload.value === "string" ? payload.value : undefined,
        updated: true
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
    async listIssueTestcases(input) {
      const body: Record<string, unknown> = {
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.version_uri !== undefined) {
        body.version_uri = input.version_uri;
      }
      if (input.relate_type !== undefined) {
        body.relate_type = input.relate_type;
      }
      if (input.key_word !== undefined) {
        body.key_word = input.key_word;
      }
      if (input.sort_field !== undefined) {
        body.sort_field = input.sort_field;
      }
      if (input.sort_type !== undefined) {
        body.sort_type = input.sort_type;
      }
      if (input.rank_ids !== undefined) {
        body.rank_ids = input.rank_ids;
      }
      if (input.result_codes !== undefined) {
        body.result_codes = input.result_codes;
      }

      const response = await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.issue_id)}/testcases/batch-query`,
        body
      );
      const payload = readResultPayload(response);
      const value = readEnvelope(payload.value) ?? payload;
      const cases = readArray<{
        case_uri?: string;
        uri?: string;
        id?: string;
        number?: string;
        name?: string;
        status?: string;
        result?: string;
        executor_id?: string;
        executor_name?: string;
      }>(value.testcases ?? value.testcase_list ?? value.cases ?? value.items ?? value.list);

      return {
        cases: cases.map((item) => ({
          case_id: String(item.case_uri ?? item.uri ?? item.id ?? item.number ?? ""),
          name: item.name,
          status: item.status,
          result: item.result,
          executor_id: item.executor_id,
          executor_name: item.executor_name
        })),
        total: readTotal(value, response, cases.length),
        raw: value
      };
    },
    async listIssueCaseCounts(input) {
      const body: Record<string, unknown> = {
        project_uuid: input.project_id,
        version_uri: input.version_uri,
        issue_ids: input.issue_ids
      };
      if (input.service_type !== undefined) {
        body.service_type = input.service_type;
      }
      if (input.service_types !== undefined) {
        body.service_types = input.service_types;
      }
      if (input.parent_id !== undefined) {
        body.parent_id = input.parent_id;
      }
      if (input.task_uri !== undefined) {
        body.task_uri = input.task_uri;
      }

      const response = await _http.post("/v4/issues/case-total", body);
      const payload = readResultPayload(response);
      const counts = readArray<Record<string, unknown>>(
        payload.value ?? payload.counts ?? payload.items ?? payload.list
      );

      return {
        counts,
        total: readTotal(payload, response, counts.length)
      };
    },
    async listTestcaseRelations(input) {
      const body: Record<string, unknown> = {
        project_uuid: input.project_id,
        test_case_uris: input.test_case_uris,
        page_no: input.page,
        page_size: input.page_size
      };
      if (input.version_uri !== undefined) {
        body.version_uri = input.version_uri;
      }
      if (input.tracker_id !== undefined) {
        body.tracker_id = input.tracker_id;
      }
      if (input.relate_type !== undefined) {
        body.relate_type = input.relate_type;
      }
      if (input.owner !== undefined) {
        body.owner = input.owner;
      }
      if (input.severity !== undefined) {
        body.severity = input.severity;
      }
      if (input.status !== undefined) {
        body.status = input.status;
      }
      if (input.findReleaseDev !== undefined) {
        body.findReleaseDev = input.findReleaseDev;
      }
      if (input.keyWord !== undefined) {
        body.keyWord = input.keyWord;
      }
      if (input.ownerContainEmpty !== undefined) {
        body.ownerContainEmpty = input.ownerContainEmpty;
      }
      if (input.severityContainEmpty !== undefined) {
        body.severityContainEmpty = input.severityContainEmpty;
      }
      if (input.statusContainEmpty !== undefined) {
        body.statusContainEmpty = input.statusContainEmpty;
      }

      const response = await _http.post("/v4/testcases/relations/batch-query", body);
      const payload = readResultPayload(response);
      const relations = readArray<Record<string, unknown>>(
        payload.value ?? payload.relations ?? payload.items ?? payload.list
      );

      return {
        relations,
        total: readTotal(payload, response, relations.length)
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
    },
    async getTestcaseDatasetSample(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/testcase/dataset/simple`
      );
      const payload = readResultPayload(response);

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async getTestcaseDataset(input) {
      const response = await _http.get(
        `/v1/${encodeURIComponent(input.project_id)}/testcase/${encodeURIComponent(input.case_uri)}/dataset/${encodeURIComponent(input.group_id)}`
      );
      const payload = readResultPayload(response);

      return {
        case_uri: input.case_uri,
        group_id: input.group_id,
        raw: payload
      };
    },
    async listResourceOperationRecords(input) {
      const response = await _http.post(`/v1/${encodeURIComponent(input.project_id)}/operation-record`, {
        params: {
          offset: pageToOffset(input.page, input.page_size),
          limit: input.page_size,
          resource_id: input.resource_id,
          resource_type: input.resource_type,
          operation_type: input.operation_type
        }
      });
      const payload = readResultPayload(response);
      const data = readEnvelope(payload.data) ?? payload;
      const records = readArray<Record<string, unknown>>(
        data.list ?? data.records ?? data.items ?? payload.list ?? payload.records ?? payload.items
      );

      return {
        records,
        total: readTotal(data, response, records.length)
      };
    }
  };
}
