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
  getRuleCheckTaskReport: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
  }) => Promise<{
    report_id: string;
    name?: string;
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
  getCaseTemplate: (input: {
    project_id: string;
    template_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
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
  getFactor: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    factor_id: string;
    name?: string;
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
  listTesthubServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
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
  listProjectUsers: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
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
  getProjectIssueUpdateNotification: (input: {
    project_id: string;
    owner_id: string;
  }) => Promise<{
    project_id: string;
    owner_id: string;
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
    resource_uri: string;
    version_uri: string;
    type: number;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
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
  getFreeTestTime: (input: { testServiceId: string }) => Promise<{
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
    readOptionalNumber(payload.total_size) ??
    readOptionalNumber(envelope.total) ??
    readOptionalNumber(envelope.total_count) ??
    readOptionalNumber(envelope.total_size) ??
    fallback
  );
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

      const response = await _http.get(
        `/v4/${encodeURIComponent(input.project_id)}/resources/${encodeURIComponent(input.resource_uri)}/exist?${query.toString()}`
      );
      const payload = readResultPayload(response);
      const value = payload.value;

      return {
        value,
        raw: payload
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
