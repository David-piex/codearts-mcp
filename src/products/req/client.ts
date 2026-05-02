import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { AppError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";

export type ReqClient = {
  getCurrentUserInfo: (input: {}) => Promise<{
    domain_id?: string;
    domain_name?: string;
    user_num_id?: number;
    user_id?: string;
    user_name?: string;
    nick_name?: string;
    created_time?: number;
    updated_time?: number;
    gender?: string;
    user_type?: string;
  }>;
  getCurrentUserRole: (input: { project_id: string }) => Promise<{
    project_id: string;
    user_role?: number;
  }>;
  listUserFeatures: (input: { project_id: string }) => Promise<{
    project_id: string;
    features: Array<{
      key?: string;
      control?: string;
    }>;
  }>;
  createProject: (input: {
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
    project_num_id?: number;
    project_type?: string;
  }>;
  createWorkItem: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id?: string;
    description?: string;
    priority_id?: number;
    iteration_id?: string;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    expected_work_hours?: number;
    start_date?: number;
    due_date?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
  getProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    name: string;
    project_num_id?: number;
    description?: string;
  }>;
  listProjectDemandStatistics: (input: { project_id: string }) => Promise<{
    project_id: string;
    demand_statistics: ReqDemandStatistic[];
  }>;
  getProjectSummary: (input: { project_id: string }) => Promise<{
    project_id: string;
    bug_statistics: ReqBugStatistic[];
    demand_statistics: ReqDemandStatistic[];
    issue_completion_rates: ReqIssueCompletionRate[];
  }>;
  getProjectBugDensity: (input: {
    project_id: string;
    date_range?: string;
    metric_type?: string;
    dividend?: ReqMetricCustomFieldFilter;
    divisor?: ReqMetricCustomFieldFilter;
  }) => Promise<{
    project_id: string;
    project_name?: string;
    metric_value?: string | number;
    metric_name?: string;
    dividend_value?: string | number;
    divisor_value?: string | number;
  }>;
  getProjectBugsPerDeveloper: (input: { project_id: string }) => Promise<{
    project_id: string;
    project_name?: string;
    metric_value?: string | number;
    metric_name?: string;
    dividend_value?: string | number;
    divisor_value?: string | number;
  }>;
  getProjectCompletionRate: (input: {
    project_id: string;
    date_range?: string;
    metric_type?: string;
    sprint_id?: string;
    dividend?: Record<string, string>;
    divisor?: Record<string, string>;
  }) => Promise<{
    project_id: string;
    project_name?: string;
    metric_value?: string | number;
    metric_name?: string;
    dividend_value?: string | number;
    divisor_value?: string | number;
  }>;
  listProjectBugStatistics: (input: { project_id: string }) => Promise<{
    project_id: string;
    bug_statistics: ReqBugStatistic[];
  }>;
  updateProject: (input: {
    project_id: string;
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
  }>;
  deleteProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    deleted: true;
  }>;
  addProjectMember: (input: {
    project_id: string;
    user_id: string;
    domain_id: string;
    domain_name?: string;
    role_id?: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    domain_id: string;
    domain_name?: string;
    role_id?: number;
    added: true;
  }>;
  batchAddProjectMembers: (input: {
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
  }) => Promise<{
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
    addedCount: number;
  }>;
  batchDeleteProjectMembers: (input: {
    project_id: string;
    user_ids: string[];
  }) => Promise<{
    project_id: string;
    user_ids: string[];
    removedCount: number;
  }>;
  updateProjectMemberRole: (input: {
    project_id: string;
    user_id: string;
    role_id: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    role_id: number;
    updated: true;
  }>;
  leaveProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    left: true;
  }>;
  checkProjectName: (input: { name: string }) => Promise<{
    exist: boolean;
  }>;
  listNotAddedProjects: (input: { page: number; page_size: number }) => Promise<{
    projects: Array<{
      project_id: string;
      project_name: string;
      project_num_id?: number;
      description?: string;
      project_type?: string;
    }>;
    total?: number;
  }>;
  listProjectModules: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    modules: Array<{
      module_id: number | string;
      module_name: string;
      description?: string;
      deepth?: number;
      is_parent?: boolean;
      parent_module_id?: number;
      owner?: {
        user_id?: string;
        user_name?: string;
        nick_name?: string;
        user_num_id?: number;
      };
      children?: Array<{
        module_id: number | string;
        module_name: string;
        description?: string;
        deepth?: number;
        is_parent?: boolean;
        parent_module_id?: number;
        owner?: {
          user_id?: string;
          user_name?: string;
          nick_name?: string;
          user_num_id?: number;
        };
      }>;
    }>;
    total?: number;
  }>;
  validateModuleName: (input: { project_id: string; module_name: string }) => Promise<{
    exist: boolean;
  }>;
  createProjectModule: (input: {
    project_id: string;
    module_name: string;
    owner_user_id: string;
    parent_module_id?: number;
    description?: string;
  }) => Promise<{
    module_id: number | string;
    module_name: string;
    description?: string;
    owner?: {
      user_id?: string;
      user_name?: string;
      nick_name?: string;
      user_num_id?: number;
    };
  }>;
  updateProjectModule: (input: {
    project_id: string;
    module_id: string;
    module_name: string;
    owner_user_id: string;
    description?: string;
  }) => Promise<{
    module_id: number | string;
    module_name: string;
    description?: string;
    owner?: {
      user_id?: string;
      user_name?: string;
      nick_name?: string;
      user_num_id?: number;
    };
  }>;
  deleteProjectModule: (input: {
    project_id: string;
    module_id: string;
  }) => Promise<{
    project_id: string;
    module_id: string;
    deleted: true;
  }>;
  updateWorkItem: (input: {
    project_id: string;
    work_item_id: string;
    title?: string;
    work_item_type?: string;
    description?: string;
    status_id?: number;
    priority_id?: number;
    iteration_id?: string;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    expected_work_hours?: number;
    start_date?: number;
    due_date?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
  deleteWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    project_id: string;
    work_item_id: string;
    deleted: true;
  }>;
  batchDeleteWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    deletedCount: number;
  }>;
  copyWorkItems: (input: {
    from_project_id: string;
    to_project_id: string;
    work_item_ids: string[];
    copy_comments?: boolean;
    copy_work_hours?: boolean;
  }) => Promise<{
    from_project_id: string;
    to_project_id: string;
    work_item_ids: string[];
    copy_comments?: boolean;
    copy_work_hours?: boolean;
    status?: string;
    success_work_items: Array<{
      id: string;
      tracker_id?: number;
      project_id?: string;
      project_uuid?: string;
      subject?: string;
      status_id?: number;
      assigned_to_id?: number;
      priority_id?: number;
      author?: number;
      created_on?: string;
      updated_on?: string;
      description?: string;
      severity_id?: number;
      expected_work_hours?: number;
      actual_work_hours?: number;
      story_point_id?: number;
      closed_flag?: number;
      is_archived?: boolean;
    }>;
    created_work_items: Array<{
      id: string;
      tracker_id?: number;
      project_id?: string;
      project_uuid?: string;
      subject?: string;
      status_id?: number;
      assigned_to_id?: number;
      priority_id?: number;
      author?: number;
      created_on?: string;
      updated_on?: string;
      description?: string;
      severity_id?: number;
      expected_work_hours?: number;
      actual_work_hours?: number;
      story_point_id?: number;
      closed_flag?: number;
      is_archived?: boolean;
    }>;
    error_work_items: Array<{
      id: string;
      tracker_id?: number;
      project_id?: string;
      project_uuid?: string;
      subject?: string;
      status_id?: number;
      assigned_to_id?: number;
      priority_id?: number;
      author?: number;
      created_on?: string;
      updated_on?: string;
      description?: string;
      severity_id?: number;
      expected_work_hours?: number;
      actual_work_hours?: number;
      story_point_id?: number;
      closed_flag?: number;
      is_archived?: boolean;
    }>;
  }>;
  batchUpdateWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    iteration_id?: string;
    module_id?: string;
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
    severity_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    iteration_id?: string;
    module_id?: string;
    updatedCount: number;
  }>;
  listIterations: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    iterations: Array<{
      id: number | string;
      name: string;
      status?: string;
      begin_time?: string;
      end_time?: string;
      description?: string;
      updated_time?: number;
      deleted?: boolean;
    }>;
    total?: number;
  }>;
  listIterationWorkItems: (input: {
    project_id: string;
    iteration_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    tracker_id?: number;
    status_id?: number;
  }) => Promise<{
    work_items: Array<ReqDetailedIssueListItem>;
    total?: number;
  }>;
  getIteration: (input: { iteration_id: string }) => Promise<{
    iteration_id: number | string;
    name: string;
    status?: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    progress?: string;
    total?: number;
    opened_total?: number;
    closed_total?: number;
    have_task?: boolean;
    charts?: Record<string, unknown>;
    created_time?: number;
    updated_time?: number;
  }>;
  listPlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    status_id?: number;
    plan_id?: string;
    search?: string;
    user_ids?: string[];
    sort?: string;
    type?: string;
  }) => Promise<{
    plans: Array<{
      id: number | string;
      name: string;
      type?: string;
      project_id?: string;
      img_url?: string;
      creator?:
        | string
        | {
            user_id?: string;
            domain_id?: string;
            nick_name?: string;
            first_name?: string;
          };
      updater?: string;
      created_on?: string;
      updated_on?: string;
    }>;
    total?: number;
    minds?: number;
    gantts?: number;
  }>;
  getPlan: (input: { project_id: string; plan_id: string }) => Promise<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    creator?: string;
    updater?: string;
    created_on?: string;
    updated_on?: string;
  }>;
  listReleasePlans: (input: {
    project_id: string;
    page: number;
    page_size: number;
    key_word?: string;
    updated_time_interval?: string;
  }) => Promise<{
    plans: ReqReleasePlan[];
    total?: number;
    page?: number;
    page_size?: number;
    status?: string;
    message?: string | null;
  }>;
  getReleasePlan: (input: { project_id: string; plan_id: string }) => Promise<ReqReleasePlanMutationResult>;
  listPlanAddableWorkItems: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    subject?: string;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      tracker?: {
        id?: number | string;
        name?: string;
      };
      tracker_id?: number | string;
      tracker_name?: string;
      status?: {
        id?: number | string;
        name?: string;
      };
      status_id?: number | string;
      status_name?: string;
    }>;
    total?: number;
  }>;
  listPlanWorkItems: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    subject?: string;
    show_type?: "list" | "tree";
    tracker_id?: number;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      tracker?: {
        id?: number | string;
        name?: string;
      };
      tracker_id?: number | string;
      tracker_name?: string;
      status?: {
        id?: number | string;
        name?: string;
      };
      status_id?: number | string;
      status_name?: string;
    }>;
    total?: number;
    milestone_cur_count?: number;
    issue_cur_count?: number;
    issues_count?: number;
  }>;
  createPlan: (input: {
    project_id: string;
    name: string;
    type: string;
  }) => Promise<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    img_url?: string;
    creator?: {
      user_id?: string;
      domain_id?: string;
      nick_name?: string;
      first_name?: string;
    };
  }>;
  updatePlan: (input: {
    project_id: string;
    plan_id: string;
    name: string;
  }) => Promise<{
    id: number | string;
    name: string;
    type?: string;
    project_id?: string;
    img_url?: string;
    creator?: {
      user_id?: string;
      domain_id?: string;
      nick_name?: string;
      first_name?: string;
    };
  }>;
  createReleasePlan: (input: ReqReleasePlanCreateInput) => Promise<ReqReleasePlanMutationResult>;
  updateReleasePlan: (input: ReqReleasePlanUpdateInput) => Promise<ReqReleasePlanMutationResult>;
  batchDeleteReleasePlans: (input: {
    project_id: string;
    plan_ids: string[];
  }) => Promise<ReqReleasePlanBatchResult>;
  batchUpdateReleasePlanBaseline: (input: {
    project_id: string;
    plan_ids: string[];
    baseline: string;
  }) => Promise<ReqReleasePlanBatchResult>;
  changeReleasePlanStatus: (input: {
    project_id: string;
    plan_id: string;
    operate: string;
    move_to_sprint_id?: string;
  }) => Promise<{
    project_id: string;
    plan_id: string;
    operate: string;
    move_to_sprint_id?: string;
    status?: string;
    message?: string;
    result?: unknown;
  }>;
  updatePlanImage: (input: {
    project_id: string;
    plan_id: string;
    img_url: string;
  }) => Promise<{
    id: number | string;
    name?: string;
    type?: string;
    project_id?: string;
    img_url?: string;
    creator?: {
      user_id?: string;
      domain_id?: string;
      nick_name?: string;
      first_name?: string;
    };
    updated: true;
  }>;
  deletePlan: (input: { project_id: string; plan_id: string }) => Promise<{
    project_id: string;
    plan_id: string;
    deleted: true;
  }>;
  addPlanWorkItems: (input: {
    project_id: string;
    plan_id: string;
    work_item_ids: string[];
  }) => Promise<{
    project_id: string;
    plan_id: string;
    work_item_ids: string[];
    addedCount: number;
  }>;
  clearPlanWorkItems: (input: {
    project_id: string;
    plan_id: string;
  }) => Promise<{
    project_id: string;
    plan_id: string;
    cleared: true;
  }>;
  createPlanWorkItem: (input: {
    project_id: string;
    plan_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id?: string;
    description?: string;
    iteration_id?: string;
    module_id?: string;
    priority_id?: number;
    severity_id?: number;
    status_id?: number;
    assigned_id?: string;
    developer_id?: string;
    done_ratio?: number;
    expected_work_hours?: number;
    start_date?: number;
    due_date?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    number?: number | string;
    description?: string;
    status?: { id?: number | string; name?: string };
    tracker?: { id?: number | string; name?: string };
    project_id?: string;
    plan_id: string;
  }>;
  createIteration: (input: {
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }) => Promise<{
    id: number | string;
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }>;
  updateIteration: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }>;
  deleteIteration: (input: { project_id: string; iteration_id: string }) => Promise<{
    project_id: string;
    iteration_id: string;
    deleted: true;
  }>;
  batchDeleteIterations: (input: {
    project_id: string;
    iteration_ids: string[];
  }) => Promise<{
    project_id: string;
    iteration_ids: string[];
    deletedCount: number;
  }>;
  updateIterationState: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    due_date?: string;
    start_date?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    due_date?: string;
    start_date?: string;
    result?: string;
    update_status?: string;
  }>;
  queryIterationImmovableIssues: (input: {
    project_id: string;
    version_id: string;
  }) => Promise<{
    items: Array<{
      number?: string;
      id: number | string;
      status_id?: number;
      status_name?: string;
    }>;
  }>;
  listIterationStatusStatistics: (input: {
    project_id: string;
    iteration_id: string;
    tracker_id?: number;
    status_id?: number;
  }) => Promise<{
    statistics: Array<{
      user?: {
        id?: number;
        name?: string;
        nick_name?: string;
        user_id?: string;
        user_num_id?: number;
        first_name?: string;
      };
      item_count?: number;
      data?: Record<string, number>;
    }>;
  }>;
  listProjectMembers: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    members: Array<{
      domain_id?: string;
      domain_name?: string;
      user_id: string;
      user_name?: string;
      user_num_id?: number;
      role_id?: number;
      nick_name?: string;
      role_name?: string;
      user_type?: string;
      forbidden?: number;
    }>;
    total?: number;
  }>;
  listProjectDomains: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    domains: Array<{
      domain_id?: string;
      domain_name?: string;
    }>;
    total?: number;
  }>;
  createProjectDomain: (input: { project_id: string; domain_name: string }) => Promise<{
    domain_id?: string;
    domain_name?: string;
  }>;
  updateProjectDomain: (input: {
    project_id: string;
    domain_id: string;
    domain_name: string;
  }) => Promise<{
    domain_id?: string;
    domain_name?: string;
  }>;
  cancelProjectDomain: (input: { project_id: string; domain_id: string }) => Promise<{
    project_id: string;
    domain_id: string;
    cancelled: true;
  }>;
  listProjects: (input: { page: number; page_size: number; keyword?: string }) => Promise<{
    projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
    total?: number;
  }>;
  listWorkItems: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject: string;
      status?: { name?: string };
      tracker_name?: string;
    }>;
    total?: number;
  }>;
  countWorkItemTree: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
  }) => Promise<{
    project_id: string;
    total_count: number;
    tracker_ids?: number[];
    page: number;
    page_size: number;
  }>;
  listWorkItemTree: (input: {
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
  }) => Promise<{
    project_id: string;
    page: number;
    page_size: number;
    tracker_ids?: number[];
    work_items: ReqChildWorkItem[];
    total?: number;
  }>;
  listBoardWorkItems: (input: {
    project_id: string;
    page: number;
    page_size: number;
    created_time_interval?: string;
  }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject?: string;
      sequence?: string;
      priority?: string;
      important?: string;
      severity?: string;
      status?: {
        id?: string;
        name?: string;
      };
    }>;
    total?: number;
  }>;
  listBoardWorkItemStatusRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      work_item_record_id?: string;
      work_item_id?: string;
      project_id?: string;
      work_item_statuses?: Array<{
        id?: string;
        status?: {
          id?: string;
          name?: string;
          type?: string;
          description?: string;
          parent_status_id?: string;
        };
      }>;
    }>;
    total?: number;
  }>;
  listBoardWorkItemWorkflowConfig: (input: {
    project_id: string;
    board_id: string;
  }) => Promise<{
    workflows: Array<{
      parent_name?: string;
      parent_type?: string;
      status_id?: string;
      name?: string;
      status_type?: string;
      direct_to?: Array<{
        parent_name?: string;
        parent_type?: string;
        status_id?: string;
        name?: string;
        status_type?: string;
        enabled?: boolean;
        parent_id?: string;
      }>;
      assign_to?: string;
      comment?: string;
      required_assign?: boolean;
      required_notes?: boolean;
      field_type?: boolean;
      parent_id?: string;
    }>;
  }>;
  listJobCacheBoards: (input: {
    project_id: string;
    type?: string;
    region?: string;
  }) => Promise<{
    cache_id?: number;
    fields: Array<{
      id?: string;
      header?: string;
      type?: string;
      show?: string | boolean;
    }>;
  }>;
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
    description?: string;
    start_date?: string | number;
    due_date?: string | number;
  }>;
  getWorkItemIssueDetails: (input: {
    project_id: string;
    work_item_id: string;
    include: string;
  }) => Promise<ReqWorkItemIssueDetails>;
  getWorkItemIndexCounts: (input: { project_id: string; work_item_id: string }) => Promise<{
    project_id: string;
    work_item_id: string;
    related_issue_count?: number;
    related_wiki_count?: number;
    related_test_case_count?: number;
    related_test_plan_count?: number;
    code_commit_count?: number;
    code_branch_count?: number;
    code_mergerequest_count?: number;
  }>;
  getWorkItemCompletionRate: (input: { project_id: string }) => Promise<{
    project_id: string;
    total?: number;
    issue_completion_rates: ReqIssueCompletionRate[];
  }>;
  getProjectDueDaysAfter: (input: { project_id: string }) => Promise<{
    project_id: string;
    date_after?: number;
  }>;
  getProjectWorkhourConfig: (input: { project_id: string }) => Promise<{
    project_id: string;
    workhour_type_required?: boolean;
    workhour_readonly_mode?: boolean;
  }>;
  listProjectWorkHourTypes: (input: {
    project_id: string;
    page: number;
    page_size: number;
    status?: number;
  }) => Promise<{
    total?: number;
    work_hours_types: Array<{
      id?: number;
      name?: string;
      status?: number;
    }>;
  }>;
  listWorkItemTags: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    tags: Array<{
      id?: number | string;
      name?: string;
      encode_name?: string;
      tag_count?: number;
    }>;
    total?: number;
  }>;
  listChildWorkItems: (input: {
    project_id: string;
    parent_id: string;
    page: number;
    page_size: number;
    subject?: string;
    query_type: string;
  }) => Promise<{
    work_items: ReqChildWorkItem[];
    total?: number;
  }>;
  listWorkItemRecords: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    journalized_type?: string;
  }) => Promise<{
    records: Array<{
      id: number | string;
      created_time?: string;
      user?: {
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
        nick_name?: string;
      };
      details?: Array<{
        id: number | string;
        name?: string;
        new_value?: string;
        old_value?: string;
        operation?: string;
        property?: string;
      }>;
    }>;
    total?: number;
  }>;
  listProjectWorkItemRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
    operated_time_interval?: string;
  }) => Promise<{
    records: ReqProjectIssueRecord[];
    total?: number;
  }>;
  listWorkItemComments: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    comments: Array<{
      id: number | string;
      comment?: string;
      created_time?: string;
      timestamp?: number;
      user?: {
        nick_name?: string;
        user_name?: string;
        user_num_id?: number;
      };
    }>;
    total?: number;
  }>;
  downloadImageFile: (input: {
    project_id: string;
    image_uri: string;
  }) => Promise<{
    image_uri: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  downloadAttachment: (input: {
    project_id: string;
    work_item_id: string;
    attachment_id: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  listWorkItemWorkHours: (input: {
    project_id: string;
    work_item_id: string;
  }) => Promise<{
    work_hours: Array<{
      id: number | string;
      issue_id?: number | string;
      user_id?: string;
      user_num_id?: number;
      user_name?: string;
      nick_name?: string;
      work_date?: string;
      work_date_timestamp?: string | number;
      work_hours?: string | number;
      region?: string;
    }>;
    total?: number;
  }>;
  listProjectWorkHours: (input: {
    page: number;
    page_size: number;
    project_ids: string[];
    begin_time?: string;
    end_time?: string;
    work_hours_dates?: string;
    work_hours_types?: string;
  }) => Promise<{
    work_hours: Array<{
      issue_id?: number | string;
      issue_type?: string;
      subject?: string;
      project_name?: string;
      user_id?: string;
      user_name?: string;
      nick_name?: string;
      work_date?: string;
      work_hours_num?: string | number;
      summary?: string;
    }>;
    total?: number;
  }>;
  listAssociatedIssues: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: Array<{
      id: number | string;
      subject?: string;
      status_id?: number;
      status_name?: string;
      new_status_name?: string;
      status_attribute_name?: string;
      project_name?: string;
      identifier?: string;
      assigned_to?: {
        assigned_user_id?: string;
        assigned_user_num_id?: number;
        assigned_nick_name?: string;
        name?: string;
      };
    }>;
    total?: number;
  }>;
  listAssociatedCommits: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    type?: string;
  }) => Promise<{
    commits: Array<{
      branch_name?: string;
      commit_id?: string;
      commit_msg?: string;
      commit_short_id?: string;
      commit_url?: string;
      create_date?: string;
      repository_id?: string;
      type?: string;
      update_date?: string;
      user?: {
        nick_name?: string;
        user_id?: string;
      };
    }>;
    total?: number;
  }>;
  listAssociatedTestCases: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    test_cases: Array<{
      case_id: number | string;
      case_level?: string;
      case_name?: string;
      case_num?: string;
      created_time?: number;
      creator?: {
        nick_name?: string;
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
      };
      owner?: {
        nick_name?: string;
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
      };
      project?: {
        project_id?: string;
        project_name?: string;
      };
      status?: {
        id?: string;
        name?: string;
      };
      type?: string;
    }>;
    total?: number;
  }>;
  listAssociatedWikis: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    wikis: Array<{
      issue_id?: number | string;
      wiki_title?: string;
      wiki_author?: {
        user_num_id?: number;
        user_id?: string;
        user_name?: string;
        nick_name?: string;
      };
      project?: {
        project_id?: string;
        project_name?: string;
      };
      created_date?: string;
      wiki_id?: string;
      region?: string;
    }>;
    total?: number;
  }>;
  listRelatedUsers: (input: { project_id: string }) => Promise<{
    project_id: string;
    related_author_list: Array<{
      user_name?: string;
      user_num_id?: number;
      user_id?: string;
      domain_id?: string;
      domain_name?: string;
      nick_name_py?: string;
    }>;
    related_assignee_list: Array<{
      user_name?: string;
      user_num_id?: number;
      user_id?: string;
      domain_id?: string;
      domain_name?: string;
      nick_name_py?: string;
      }>;
      related_developer_list: Array<{
        user_name?: string;
        user_num_id?: number;
        user_id?: string;
        domain_id?: string;
        domain_name?: string;
        nick_name_py?: string;
      }>;
    }>;
  listWorkItemStatusAttributes: (input: { project_id: string }) => Promise<{
    issue_status_attributes: Array<{
      name?: string;
      type?: string;
      project_id?: string;
    }>;
    total?: number;
  }>;
  listWorkItemStatuses: (input: { project_id: string }) => Promise<{
    issue_statuses: Array<{
      id?: string;
      status_id?: number;
      name?: string;
      tracker_ids?: number[];
      status_attribute?: {
        id?: number;
        name?: string;
      };
    }>;
    total?: number;
  }>;
  checkWorkItemStatusName: (input: {
    project_id: string;
    status_name: string;
  }) => Promise<{
    exist: boolean;
  }>;
  createProjectStatusConfig: (input: {
    project_id: string;
    defined_name: string;
    status_attribute: number;
    description?: string;
  }) => Promise<{
    status?: string;
    result?: {
      id?: string;
      statusId?: number;
      definedName?: string;
      position?: number;
      flag?: number;
      projectUUId?: string;
      description?: string;
      statusAttribute?: number;
    };
  }>;
  batchCreateTrackerConfig: (input: {
    project_id: string;
    tracker_id: number;
    status_config_ids: string[];
  }) => Promise<{
    status?: string;
    result?: {
      issueStatusConfigs?: Array<{
        trackerList?: number[];
        id?: string;
        statusId?: number;
        definedName?: string;
        description?: string;
        position?: number;
        flag?: number;
        is_closed?: boolean;
        is_initial?: boolean;
        statusAttribute?: number;
        statusAttributeName?: string;
        issueStatusAttribute?: {
          id?: number | string;
          name?: string;
          type?: string;
        };
        trackerId?: number;
      }>;
    };
  }>;
  updateTrackerConfig: (input: {
    project_id: string;
    tracker_id: number;
    status_config_id: string;
    new_position: number;
  }) => Promise<{
    status?: string;
  }>;
  listWorkItemStatusDetails: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    grouped_statuses: Record<
      string,
      Array<{
        id?: number;
        status_id?: string;
        name?: string;
        is_closed?: number;
        position?: number;
        default_done_ratio?: number;
        is_initial?: number;
        issue_field_configs?: Array<{
          custom?: boolean;
          default_option?: Array<{ id?: string; name?: string }>;
          default_options?: Array<{ id?: string; name?: string }>;
          default_value?: string;
          field?: string;
          field_type?: string;
          is_required?: number;
          is_visible?: boolean;
          last?: boolean;
          name?: string;
          option?: Array<{ id?: string; name?: string }>;
          options?: string;
          position?: number;
          project_id?: string;
          tracker_list?: number[];
          type_options?: string;
        }>;
        flag?: number;
        status_attribute?: number;
        issue_status_attribute?: {
          project_id?: string;
          name?: string;
          type?: string;
        };
      }>
    >;
    issue_statuses: Array<{
      id?: number;
      status_id?: string;
      name?: string;
      is_closed?: number;
      position?: number;
      default_done_ratio?: number;
      is_initial?: number;
      issue_field_configs?: Array<{
        custom?: boolean;
        default_option?: Array<{ id?: string; name?: string }>;
        default_options?: Array<{ id?: string; name?: string }>;
        default_value?: string;
        field?: string;
        field_type?: string;
        is_required?: number;
        is_visible?: boolean;
        last?: boolean;
        name?: string;
        option?: Array<{ id?: string; name?: string }>;
        options?: string;
        position?: number;
        project_id?: string;
        tracker_list?: number[];
        type_options?: string;
      }>;
      flag?: number;
      status_attribute?: number;
      issue_status_attribute?: {
        project_id?: string;
        name?: string;
        type?: string;
      };
    }>;
  }>;
  listWorkItemStatusConfigs: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    issue_statuses: Array<{
      trackerList?: number[];
      id?: string;
      statusId?: number;
      definedName?: string;
      description?: string;
      position?: number;
      flag?: number;
      is_closed?: boolean;
      is_initial?: boolean;
      statusAttribute?: number;
      statusAttributeName?: string;
      issueStatusAttribute?: {
        id?: number | string;
        name?: string;
        type?: string;
      };
      trackerId?: number;
    }>;
    workitem_readonly_mode?: boolean;
  }>;
  listOptionalWorkItemStatusConfigs: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    issue_statuses: Array<{
      trackerList?: number[];
      id?: string;
      statusId?: number;
      definedName?: string;
      description?: string;
      position?: number;
      flag?: number;
      is_closed?: boolean;
      is_initial?: boolean;
      statusAttribute?: number;
      statusAttributeName?: string;
      issueStatusAttribute?: {
        id?: number | string;
        name?: string;
        type?: string;
      };
      trackerId?: number;
    }>;
  }>;
  getProjectPublicConfig: (input: { project_id: string }) => Promise<{
    project_id: string;
    closed_workitem_readonly_mode?: boolean;
  }>;
  listWorkItemWorkflowConfig: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    workflows: Array<{
      id?: string;
      name?: string;
      status_id?: number;
      direct_to?: Array<{
        enabled?: boolean;
        id?: string;
        name?: string;
        status_id?: number;
      }>;
    }>;
  }>;
  listWorkItemTemplates: (input: {
    project_id: string;
    tracker_id?: number;
  }) => Promise<{
    templates: Array<{
      id?: number | string;
      project_id?: number | string;
      tracker_id?: number;
      description?: string;
      issue_field_config?: string;
    }>;
  }>;
  createWorkItemTemplate: (input: {
    project_id: string;
    tracker_id: number;
    description?: string;
    issue_field_configs?: Array<{
      field?: string;
      is_required?: number;
      default_value?: string;
      position?: number;
      is_visible?: boolean;
    }>;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    description?: string;
    issue_field_configs?: Array<{
      field?: string;
      is_required?: number;
      default_value?: string;
      position?: number;
      is_visible?: boolean;
    }>;
    status?: string;
  }>;
  deleteProjectTemplate: (input: {
    template_id: string;
    dry_run?: boolean;
  }) => Promise<{
    id?: number | string;
    name?: string;
    sourceId?: string;
    sourceName?: string;
    description?: string | null;
    identifier?: string;
    authorId?: number;
    domainId?: string;
    type?: string | null;
    isPublic?: number;
  }>;
  updateProjectTemplate: (input: {
    template_id: string;
    name?: string;
    description?: string;
    dry_run?: boolean;
  }) => Promise<{
    id: number | string;
    name?: string;
    type?: string | null;
  }>;
  getWorkItemTemplateConfig: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    templates: Array<{
      id?: number | string;
      name?: string;
      description?: string;
      issue_field_configs?: Array<{
        field?: string;
        name?: string;
        field_type?: string;
        type_options?: unknown;
        default_value?: unknown;
        is_visible?: boolean;
        is_required?: boolean;
        position?: number;
        tracker_list?: number[];
        option?: unknown;
        default_option?: unknown;
        default_options?: unknown[];
      }>;
    }>;
  }>;
  listWorkItemCustomFields: (input: {
    project_id: string;
    tracker_id?: number;
  }) => Promise<{
    custom_field: Array<{
      tracker_list?: string[];
      region?: string;
      id?: number | string;
      project_id?: number | string;
      tracker_id?: number;
      custom_field?: string;
      type?: string;
      name?: string;
      sort?: number;
      memo?: string;
      created?: string;
      modified?: string;
      is_delete?: boolean;
    }>;
  }>;
  getWorkItemStatusRuleFlag: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    status_rule_flag: {
      tracker_config_id?: string | number;
      issue_field_config?: boolean;
      code_commit?: boolean;
    };
  }>;
  listWorkItemTrackerHandlers: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<{
    tracker_handlers: Array<{
      handler_id?: number;
      handler_name?: string;
    }>;
  }>;
  listCacheData: (input: {
    project_id?: string;
    type?: string;
  }) => Promise<{
    project_id?: string;
    type?: string;
    fields: Array<{
      trackerList?: number[];
      name?: string;
      field?: string;
      isCustom?: boolean;
      option?: Array<{
        id?: string;
        name?: string;
      }>;
      option_source?: string;
      type?: string;
      required?: boolean | number;
      fieldGroup?: string;
      sortable?: boolean;
      priorityOption?: Array<{
        id?: string;
        name?: string;
      }>;
      severityOption?: Array<{
        id?: string;
        name?: string;
      }>;
      trackerOption?: Array<{
        id?: string;
        name?: string;
      }>;
      doneRatioOption?: Array<{
        id?: string;
        name?: string;
      }>;
    }>;
    visible_fields: Array<{
      trackerList?: number[];
      name?: string;
      field?: string;
      isCustom?: boolean;
      option?: Array<{
        id?: string;
        name?: string;
      }>;
      option_source?: string;
      type?: string;
      required?: boolean | number;
      fieldGroup?: string;
      sortable?: boolean;
      priorityOption?: Array<{
        id?: string;
        name?: string;
      }>;
      severityOption?: Array<{
        id?: string;
        name?: string;
      }>;
      trackerOption?: Array<{
        id?: string;
        name?: string;
      }>;
      doneRatioOption?: Array<{
        id?: string;
        name?: string;
      }>;
    }>;
  }>;
  updateCacheData: (input: {
    project_id: string;
    type?: string;
    region?: string;
    cache_id?: number;
    visible_fields?: string[];
    fields?: ReqCacheUpdateField[];
  }) => Promise<{
    project_id: string;
    type?: string;
    region?: string;
    cache_id?: number;
    updated_count?: number;
    fields: ReqCacheUpdateField[];
  }>;
  listPrograms: (input: {
    page: number;
    page_size: number;
    search?: string;
    sort_key?: string;
    sort_dir?: string;
    is_watched?: boolean;
  }) => Promise<{
    programs: ReqProgramItem[];
    total?: number;
  }>;
  listProgramFields: (input: { program_id: string; field_type: string }) => Promise<{
    fields: ReqProgramField[];
  }>;
  getIr: (input: { program_id: string; ir_id: string }) => Promise<ReqRequirementPoolItem>;
  listIrChildren: (input: {
    program_id: string;
    ir_id: string;
    query_type: string;
    page: number;
    page_size: number;
  }) => Promise<{
    items: ReqRequirementPoolItem[];
    total?: number;
  }>;
  listIrHistories: (input: { ir_id: string; page: number; page_size: number }) => Promise<{
    histories: ReqRequirementHistory[];
    total?: number;
  }>;
  listRrStatuses: (input: { program_id: string; rr_ids: string[] }) => Promise<{
    rr_status_list: ReqRrStatusItem[];
  }>;
  listRrs: (input: {
    program_id: string;
    query_type: string;
    include_deleted?: boolean;
    updated_time_interval?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    rrs: ReqRequirementPoolItem[];
    total?: number;
  }>;
  listRrHistories: (input: { rr_id: string; page: number; page_size: number }) => Promise<{
    histories: ReqRequirementHistory[];
    total?: number;
  }>;
  listIssueSeverities: (input: {}) => Promise<{
    severities: ReqIssueSeverity[];
  }>;
  listIpdProjects: (input: { search?: string; model?: string; model_id?: string }) => Promise<{
    projects: ReqIpdProject[];
  }>;
  listIpdProjectUsers: (input: { project_id: string }) => Promise<{
    users: ReqIpdUser[];
  }>;
  getIpdIssue: (input: { project_id: string; issue_id: string; version: "v1" | "v2" }) => Promise<ReqIpdIssue>;
  listIpdChangeReviewIssueApprovers: (input: { project_id: string; issue_id: string }) => Promise<{
    users: ReqIpdUser[];
    total?: number;
  }>;
  listIpdIssues: (input: {
    project_id: string;
    issue_type: string;
    page: number;
    page_size: number;
    filter?: Array<Record<string, unknown>>;
    filter_mode: "OR_AND" | "AND_OR";
  }) => Promise<{
    issues: ReqIpdIssue[];
    total?: number;
  }>;
  listIpdIssueTree: (input: {
    project_id: string;
    category: string;
    page: number;
    page_size: number;
    keyword?: string;
    number?: string[];
    plan?: Array<Record<string, unknown>>;
    modified_date?: Record<string, unknown>;
  }) => Promise<{ issues: ReqIpdIssue[]; total?: number }>;
  listIpdAttachedWikis: (input: { project_id: string; issue_id: string; category?: string }) => Promise<{
    wikis: ReqIpdWiki[];
    total?: number;
  }>;
  listIpdReviewForms: (input: {
    project_id: string;
    type: "CR" | "BR" | "GR";
    created_by?: string;
    keyword?: string;
    created_time?: Record<string, unknown>;
    plan_end_date?: Record<string, unknown>;
    plan_start_date?: Record<string, unknown>;
    closed_time?: Record<string, unknown>;
    approver?: string;
    reviewer?: string;
    offset: number;
    limit: number;
    sort?: Array<Record<string, unknown>>;
  }) => Promise<{ reviews: ReqIpdReviewEntity[]; total?: number }>;
  getIpdReviewForm: (input: { project_id: string; id: string; category: "CR" | "BR" | "GR" }) => Promise<ReqIpdReviewEntity>;
  getIpdProcessInstance: (input: { project_id: string; id: string }) => Promise<ReqIpdReviewEntity>;
  listIpdProcessInstances: (input: {
    project_id: string;
    filter: Array<Record<string, unknown>>;
    sort?: Array<Record<string, unknown>>;
    page: { page_no: number; page_size: number } & Record<string, unknown>;
  }) => Promise<{ process_instances: ReqIpdReviewEntity[]; total?: number }>;
  listIpdReviewRoleUsers: (input: {
    project_id: string;
    user_type: "approver" | "reviewer";
    target_project_id?: string;
    review_id?: string;
  }) => Promise<{ users: ReqIpdUser[] }>;
  groupIpdIssues: (input: {
    project_id: string;
    issue_type: string;
    group_field_id: string;
    page: number;
    page_size: number;
    is_project_group?: boolean;
    group_sort?: "asc" | "desc";
    filter?: Array<Record<string, unknown>>;
    filter_mode: "OR_AND" | "AND_OR";
    sort?: Array<Record<string, unknown>>;
  }) => Promise<{ field_info?: ReqIpdNamedItem; data: ReqIpdNamedItem[]; raw?: unknown }>;
  listIpdTenantIssues: (input: {
    project_id?: string | string[];
    issue_type: string;
    page: number;
    page_size: number;
    filter?: Array<Record<string, unknown>>;
    filter_mode: "OR_AND" | "AND_OR";
    sort?: Array<Record<string, unknown>>;
  }) => Promise<{ issues: ReqIpdIssue[]; total?: number }>;
  listIpdModules: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    modules: ReqIpdNamedItem[];
    total?: number;
  }>;
  listIpdStatuses: (input: { project_id: string; category_id?: string }) => Promise<{
    statuses: ReqIpdNamedItem[];
  }>;
  listIpdIssueRelationConfig: (input: { project_id: string }) => Promise<{
    relations: ReqIpdNamedItem[];
    raw?: unknown;
  }>;
  listIpdLabels: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    labels: ReqIpdNamedItem[];
    total?: number;
  }>;
  listIpdProjectFields: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    fields: ReqIpdNamedItem[];
    total?: number;
  }>;
  listIpdIssueFields: (input: { project_id: string; category_id: string }) => Promise<{
    fields: ReqIpdNamedItem[];
  }>;
  listIpdTenantFields: (input: {
    page: number;
    page_size: number;
    search?: string;
    sort_info?: { field?: string; asc?: boolean };
  }) => Promise<{
    fields: ReqIpdNamedItem[];
    total?: number;
  }>;
  getIpdTenantFieldUsed: (input: { field_id: string }) => Promise<{ usage: ReqIpdFieldUsage[] }>;
  getIpdTenantFieldOptionUsed: (input: { code: string }) => Promise<Record<string, string | number>>;
  getIpdProjectFieldOptionUsed: (input: { project_id: string; code: string }) => Promise<Record<string, string | number>>;
  listIpdWorkflowTemplates: (input: { project_id: string; category_id?: string }) => Promise<{
    workflows: ReqIpdNamedItem[];
    raw?: unknown;
  }>;
  listIpdWorkflowFields: (input: { project_id: string; category_id: string }) => Promise<{
    fields: ReqIpdNamedItem[];
  }>;
  listIpdSnapshotVersions: (input: { project_id: string }) => Promise<{
    snapshots: ReqIpdNamedItem[];
  }>;
  listIpdFeatureSets: (input: { project_id: string; snapshot_version_id?: string }) => Promise<{
    feature_sets: ReqIpdNamedItem[];
  }>;
  listIpdSnapshotFeatures: (input: {
    project_id: string;
    snapshot_version_id: string;
    feature_set_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    issues: ReqIpdIssue[];
    total?: number;
  }>;
  getIpdE2EGraph: (input: {
    project_id: string;
    issue_id: string;
    category: string;
    is_src?: boolean;
  }) => Promise<ReqIpdIssue>;
  listIpdCategoryStatuses: (input: { project_id: string; category_id: string }) => Promise<{
    statuses: ReqIpdNamedItem[];
    total?: number;
  }>;
  getIpdStatisticDashboard: (input: {
    project_id: string;
    classification: string;
    plan?: { plan_pi?: string; plan_iteration?: string };
    created_date?: Record<string, unknown>;
  }) => Promise<{ items: ReqIpdDashboardItem[] }>;
  getIpdWorkItemFlowDetail: (input: { project_id: string; issue_id: string; issue_category: string }) => Promise<{
    process_instance?: unknown;
    next_flow?: ReqIpdNamedItem[];
    raw?: unknown;
  }>;
  transferIpdWorkItemFlow: (input: {
    project_id: string;
    issue_id: string;
    issue_category: string;
    flow_code: string;
    process_context?: Record<string, unknown>;
  }) => Promise<unknown>;
  batchTransferIpdWorkItemFlow: (input: {
    project_id: string;
    issue_ids: string[];
    issue_category: string;
    flow_code: string;
    is_recover: boolean;
    process_context?: Record<string, unknown>;
  }) => Promise<unknown>;
  createIpdChangeReviewForm: (input: Record<string, unknown> & { project_id: string }) => Promise<ReqIpdReviewEntity>;
  updateIpdChangeReviewForm: (input: Record<string, unknown> & { project_id: string; id: string }) => Promise<ReqIpdReviewEntity>;
  deleteIpdChangeReviewForm: (input: { project_id: string; id: string; category: "CR" }) => Promise<unknown>;
  createIpdProcessInstance: (input: Record<string, unknown> & { project_id: string; domain_id?: string; operate_type?: string }) => Promise<ReqIpdReviewEntity>;
  updateIpdProcessInstance: (input: Record<string, unknown> & { project_id: string; id: string; domain_id?: string }) => Promise<ReqIpdReviewEntity>;
  deleteIpdProcessInstance: (input: { project_id: string; id: string }) => Promise<unknown>;
  createIpdIssue: (input: {
    project_id: string;
    title: string;
    description: string;
    category: string;
    assignee: string;
    status?: string;
    src_domain?: string;
    submitted_by?: string;
    domain_id?: string;
    recipient?: string[];
    expect_delivery_time?: number;
    priority?: string;
    assigned_cc?: string[];
    plan_pi?: string;
    plan_iteration?: string;
    plan_start_date?: number;
    plan_end_date?: number;
    workload_man_day?: number;
    business_domain?: string;
    need_break?: string;
    extra_fields?: Record<string, unknown>;
  }) => Promise<ReqIpdIssue[]>;
  batchCreateIpdIssues: (input: { project_id: string; issues: Array<Record<string, unknown>> }) => Promise<ReqIpdIssue[]>;
  batchUpdateIpdIssues: (input: {
    project_id: string;
    issue_ids: string[];
    attribute: Record<string, unknown>;
  }) => Promise<unknown>;
  batchDeleteIpdIssues: (input: {
    project_id: string;
    issue_ids: string[];
    is_permanent_delete?: boolean;
    src_project_id?: string;
  }) => Promise<unknown>;
  uploadIpdIssueAttachment: (input: {
    project_id: string;
    issue_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<ReqIpdAttachment[]>;
  listIpdIssueAttachments: (input: {
    project_id: string;
    issue_id: string;
    source_project_id?: string;
  }) => Promise<{ attachments: ReqIpdAttachment[] }>;
  downloadIpdIssueAttachment: (input: { project_id: string; attachment_id: string }) => Promise<{
    project_id: string;
    attachment_id: string;
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
  uploadIpdIssueImage: (input: {
    project_id: string;
    issue_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<ReqIpdIssue>;
  deleteIpdIssueImage: (input: { project_id: string; issue_id: string; file_name: string }) => Promise<ReqIpdIssue>;
  downloadIpdIssueImage: (input: {
    project_id: string;
    issue_id: string;
    file_name: string;
    field_code?: string;
  }) => Promise<{
    project_id: string;
    issue_id: string;
    file_name: string;
    body: Uint8Array;
    content_type?: string;
  }>;
  listIpdWorkHours: (input: {
    project_id: string;
    page: number;
    page_size: number;
    plan_pi?: string[];
    plan_iteration?: string[];
    workitem_id?: string[];
    created_by?: string[];
  }) => Promise<{ work_hours: ReqIpdWorkHour[]; total?: number }>;
  listIpdWorkHourCategories: (input: { project_id: string; display_value?: string }) => Promise<{
    categories: ReqIpdNamedItem[];
  }>;
  createIpdWorkHour: (input: {
    project_id: string;
    issue_id: string;
    work_date_begin: string;
    work_date_end: string;
    work_hours: string | number;
    work_hour_type: number | string;
    include_weekend: boolean;
    work_hour_category?: string;
    description?: string;
  }) => Promise<{ data: ReqIpdWorkHour[]; work_hours_total?: string | number }>;
  updateIpdWorkHour: (input: {
    project_id: string;
    issue_id: string;
    workhour_id: string;
    work_hours?: string | number;
    work_hour_category?: string;
    description?: string;
  }) => Promise<{ data: ReqIpdWorkHour[]; work_hours_total?: string | number }>;
  deleteIpdWorkHour: (input: {
    project_id: string;
    issue_id: string;
    workhour_id: string;
  }) => Promise<{ data: ReqIpdWorkHour[]; work_hours_total?: string | number }>;
  updateIpdTenantField: (input: Record<string, unknown> & { field_id: string }) => Promise<ReqIpdNamedItem>;
  updateIpdProjectField: (input: Record<string, unknown> & { project_id: string; field_id: string }) => Promise<ReqIpdNamedItem>;
  createIpdModule: (input: {
    project_id: string;
    display_value: string;
    parent_id: string;
    description?: string;
    assignee?: string;
  }) => Promise<ReqIpdNamedItem>;
  updateIpdModule: (input: {
    project_id: string;
    module_id: string;
    display_value: string;
    parent_id: string;
    description?: string;
    assignee?: string;
  }) => Promise<ReqIpdNamedItem>;
  deleteIpdModule: (input: { project_id: string; module_id: string }) => Promise<ReqIpdNamedItem>;
  createIpdLabel: (input: {
    project_id: string;
    label_type: string;
    color: string;
    title: string;
  }) => Promise<ReqIpdNamedItem>;
  updateIpdLabel: (input: {
    project_id: string;
    label_id: string;
    label_type: string;
    color?: string;
    title?: string;
  }) => Promise<ReqIpdNamedItem>;
  deleteIpdLabel: (input: { project_id: string; label_id: string }) => Promise<ReqIpdNamedItem>;
  createIpdFeatureSet: (input: { project_id: string; title: string; parent_id: string }) => Promise<ReqIpdNamedItem>;
  updateIpdFeatureSet: (input: {
    project_id: string;
    feature_set_id: string;
    parent_id: string;
    title?: string;
    position_float?: number;
  }) => Promise<ReqIpdNamedItem>;
  deleteIpdFeatureSet: (input: { project_id: string; feature_set_id: string }) => Promise<ReqIpdNamedItem>;
  addWorkItemComment: (input: {
    project_id: string;
    work_item_id: string;
    content: string;
  }) => Promise<{
    work_item_id: string;
    content: string;
  }>;
  uploadIssueImage: (input: {
    project_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    project_id: string;
    file_name: string;
    img_id?: string | number;
    img_url?: string;
  }>;
  uploadAttachment: (input: {
    project_id: string;
    work_item_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    disk_filename?: string;
    file_name?: string;
    size?: string;
  }>;
  addWorkItemWorkHour: (input: {
    project_id: string;
    work_item_id: string;
    work_hours: number;
    start_date?: string;
    due_date?: string;
    start_date_timestamp?: string | number;
    due_date_timestamp?: string | number;
    use_timestamp?: boolean;
    region?: string;
  }) => Promise<{
    id: number | string;
    work_item_id: string;
    user_id?: string;
    user_num_id?: number;
    user_name?: string;
    nick_name?: string;
    work_date?: string;
    work_date_timestamp?: string | number;
    work_hours?: string | number;
    region?: string;
  }>;
  updateWorkingHours: (input: {
    project_id: string;
    issue_id: string;
    work_hours_id: string;
    summary?: string;
    work_hours?: number;
    work_hour_type?: number;
  }) => Promise<{
    total?: number;
    work_hours: Array<{
      id?: string | number;
      issueId?: string | number;
      issue_id?: string | number;
      userId?: string;
      user_id?: string;
      userNumId?: string | number;
      user_num_id?: string | number;
      userName?: string;
      user_name?: string;
      nickName?: string;
      nick_name?: string;
      summary?: string;
      workDate?: string;
      work_date?: string;
      workDateTimestamp?: string | number;
      work_date_timestamp?: string | number;
      workHours?: string | number;
      work_hours?: string | number;
      status?: number;
      region?: string;
      workHourTypeId?: number;
      work_hour_type_id?: number;
      workHourTypeName?: string;
      work_hour_type_name?: string;
    }>;
  }>;
  deleteAttachment: (input: {
    project_id: string;
    work_item_id: string;
    attachment_id: string;
  }) => Promise<{
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    deleted: true;
  }>;
  updateWorkItemComment: (input: {
    project_id: string;
    work_item_id: string;
    comment_id: string;
    content: string;
  }) => Promise<{
    work_item_id: string;
    comment_id: string;
    content: string;
    status?: string;
  }>;
  updateWorkItemFlow: (input: {
    project_id: string;
    work_item_id: string;
    status_id: number;
  }) => Promise<{
    work_item_id: string;
    title?: string;
    status_id: number;
    status_name?: string;
    type_id?: number;
    type_name?: string;
    updated_on?: string;
  }>;
};

export {
  createReqClientSlices,
  resolveReqClientResourceGroup,
  type ReqClientResourceGroup,
  type ReqClientSlices
} from "./client-parts.js";

function toTrackerId(workItemType?: string): number | undefined {
  if (!workItemType) {
    return undefined;
  }

  const normalized = workItemType.trim().toLowerCase();

  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  const mapping: Record<string, number> = {
    task: 2,
    bug: 3,
    epic: 5,
    feature: 6,
    story: 7
  };

  return mapping[normalized];
}

function toPriorityId(priorityId?: number): number {
  return priorityId ?? 2;
}

function toOptionalNumericId(value?: string): number | string | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  return /^\d+$/.test(value) ? Number(value) : value;
}

function toReqWorkItemDate(value?: number): string | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  const date = new Date(value);
  const chinaOffsetMs = 8 * 60 * 60 * 1000;

  return new Date(date.getTime() + chinaOffsetMs).toISOString().slice(0, 10);
}

function assertReqMutationSucceeded(action: string, status?: string) {
  if (status?.toLowerCase() === "success") {
    return;
  }

  throw new Error(`${action} did not report success`);
}

function isNotFoundError(error: unknown) {
  if (error instanceof AppError) {
    return error.category === "not_found" || error.status === 404;
  }

  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    category?: unknown;
    status?: unknown;
  };

  return candidate.category === "not_found" || candidate.status === 404;
}

function unwrapReqPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapReqPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

  return input;
}

function mapReqCopyIssue(item: ReqCopyIssueResponse) {
  return {
    id: String(item.id ?? ""),
    tracker_id: item.tracker_id,
    project_id:
      typeof item.project_id === "undefined" ? undefined : String(item.project_id),
    project_uuid: item.projectUUId,
    subject: item.subject,
    status_id: item.status_id,
    assigned_to_id: item.assigned_to_id,
    priority_id: item.priority_id,
    author: item.author,
    created_on: item.created_on,
    updated_on:
      typeof item.updated_on === "undefined" ? undefined : String(item.updated_on),
    description: item.description,
    severity_id: item.severity_id,
    expected_work_hours: item.expected_work_hours,
    actual_work_hours: item.actual_work_hours,
    story_point_id: item.story_point_id,
    closed_flag: item.closed_flag,
    is_archived: item.is_archived
  };
}

function withoutKeys<T extends Record<string, unknown>>(input: T, keys: string[]) {
  return Object.fromEntries(Object.entries(input).filter(([key]) => !keys.includes(key)));
}

type ReqIssueListItem = {
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
};

type ReqReleasePlanCreateInput = {
  project_id: string;
  title: string;
  category: string;
  plan_start_date: string | number;
  plan_end_date: string | number;
  description?: string;
  parent_id?: string;
  workload?: string;
  owner?: string;
};

type ReqReleasePlanUpdateInput = {
  project_id: string;
  plan_id: string;
  title?: string;
  category?: string;
  description?: string;
  status?: string;
  plan_start_date?: string | number;
  plan_end_date?: string | number;
  created_date?: number;
  parent_id?: string;
  baseline?: string;
  workload?: string;
  owner?: string;
};

type ReqReleasePlan = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  state?: string;
  status?: string;
  children?: ReqReleasePlan[];
  created_by?: string;
  modified_by?: string;
  plan_start_date?: string | number;
  plan_end_date?: string | number;
  created_date?: number;
  parent_id?: string;
  baseline?: string;
  workload?: string;
  owner?: string;
};

type ReqReleasePlanMutationResult = {
  project_id: string;
  status?: string;
  message?: string | null;
  plan: ReqReleasePlan;
};

type ReqReleasePlanBatchResult = {
  project_id: string;
  plan_ids: string[];
  status?: string;
  message?: string | null;
  success_num?: number;
  fail_num?: number;
  success: Array<{ id?: string; modified_by?: string }>;
  failed: Array<{ id?: string; modified_by?: string }>;
};

type ReqCopyIssueResponse = {
  id?: number | string;
  tracker_id?: number;
  project_id?: number | string;
  projectUUId?: string;
  subject?: string;
  status_id?: number;
  assigned_to_id?: number;
  priority_id?: number;
  author?: number;
  created_on?: string;
  updated_on?: string | number;
  description?: string;
  severity_id?: number;
  expected_work_hours?: number;
  actual_work_hours?: number;
  story_point_id?: number;
  closed_flag?: number;
  is_archived?: boolean;
};

type ReqDetailedIssueListItem = {
  id: number | string;
  subject?: string;
  name?: string;
  tracker?: {
    id?: number | string;
    name?: string;
  };
  tracker_id?: number | string;
  tracker_name?: string;
  status?: {
    id?: number | string;
    name?: string;
  };
  status_id?: number | string;
  status_name?: string;
};

type ReqWorkItemIssueDetails = ReqDetailedIssueListItem & {
  description?: string;
  created_on?: string;
  updated_on?: string;
  start_date?: string;
  done_ratio?: number;
  expected_work_hours?: number;
  release_dev?: string;
  find_release_dev?: string;
  inner_text?: string;
  project?: Record<string, unknown>;
  priority?: Record<string, unknown>;
  severity?: Record<string, unknown>;
  module?: Record<string, unknown>;
  domain?: Record<string, unknown>;
  story_point?: Record<string, unknown>;
  parent_issue?: Record<string, unknown>;
  author?: Record<string, unknown>;
  assigned_to?: Record<string, unknown>;
  developer?: Record<string, unknown>;
  assigned_cc_user?: unknown[];
  custom_fields?: Array<Record<string, unknown>>;
  custom_value_new?: Record<string, unknown>;
  accessories_list?: Array<Record<string, unknown>>;
};

type ReqIssueStatusSummary = {
  new_num?: number;
  process_num?: number;
  solved_num?: number;
  test_num?: number;
  closed_num?: number;
  rejected_num?: number;
};

type ReqIssueCompletionRate = {
  tracker_id?: number;
  issue_status?: ReqIssueStatusSummary;
};

type ReqDemandStatistic = {
  module?: string;
  total?: number;
  new_num?: number;
  process_num?: number;
  solved_num?: number;
  test_num?: number;
  closed_num?: number;
  rejected_num?: number;
};

type ReqBugStatistic = {
  module?: string;
  total?: number;
  critical_num?: number;
  serious_num?: number;
  normal_num?: number;
  tip_num?: number;
  defect_index?: number;
};

type ReqProjectMetric = {
  project_id?: string;
  project_name?: string;
  metric_value?: string | number;
  metric_name?: string;
  dividend_value?: string | number;
  divisor_value?: string | number;
};

type ReqMetricCustomFieldFilter = {
  custom_fields?: Array<{
    name?: string;
    options?: string;
  }>;
};

type ReqProjectIssueRecord = {
  field_key?: string;
  field_name?: string;
  id: number | string;
  issue_id?: number | string;
  new_value?: string;
  old_value?: string;
  operated_time?: number;
  operation?: string;
  property?: string;
  operator?: {
    id?: number;
    name?: string;
    nick_name?: string;
    user_id?: string;
    user_num_id?: number;
    first_name?: string;
  };
};

type ReqIssueTag = {
  id?: number | string;
  name?: string;
  encode_name?: string;
  tag_count?: number;
};

type ReqChildWorkItem = ReqDetailedIssueListItem & {
  parent_issue?: {
    id?: number | string;
    subject?: string;
  };
  project?: {
    identifier?: string;
    name?: string;
    id?: number | string;
    type?: string;
  };
  done_ratio?: number;
  status_attribute?: {
    id?: number | string;
    name?: string;
  };
  severity?: {
    id?: number | string;
    name?: string;
  };
  assigned_to?: {
    id?: number | string;
    name?: string;
    assigned_nick_name?: string;
    assignedNickName?: string;
    first_name?: string;
    firstName?: string;
  };
  is_parent?: boolean;
  isParent?: boolean;
  author?: {
    id?: number | string;
    name?: string;
  };
  module?: Record<string, unknown>;
  expected_work_hours?: number;
  priority?: {
    id?: number | string;
    name?: string;
  };
  actual_work_hours?: number;
  deleted?: boolean;
  created_on?: string;
  updated_on?: string;
  developer?: Record<string, unknown>;
  parent_issue_id?: number | string;
};

type ReqCacheUpdateField = {
  id?: string;
  field?: string;
  header?: string;
  type?: string;
  visible?: boolean;
  order?: number;
};

type ReqProgramUser = {
  user_id?: string;
  user_name?: string;
  nick_name?: string;
  domain_id?: string;
  domain_name?: string;
};

type ReqProgramItem = {
  program_id?: string;
  name?: string;
  description?: string;
  created_time?: number;
  updated_time?: number;
  is_archived?: boolean;
  is_watched?: boolean;
  project_count?: number;
  owner?: ReqProgramUser;
  creator?: ReqProgramUser;
};

type ReqProgramField = {
  id?: string;
  name?: string;
  label?: string;
  icon?: string;
  field_type?: string;
  option_source?: string;
  default_value_can_update?: boolean;
  options?: Array<{
    id?: string;
    name?: string;
    label?: string;
  }>;
  config?: {
    default_value?: unknown[];
    field_id?: string;
  };
};

type ReqRequirementPoolItem = {
  id?: string;
  ir_id?: string;
  rr_id?: string;
  status?:
    | string
    | {
        id?: string;
        label?: string;
        name?: string;
        value?: unknown;
      };
  accept_status?: string;
  created_time?: number;
  updated_time?: number;
  created_on?: string;
  updated_on?: string;
  subject?: string;
  custom_fields?: Array<{
    field_id?: string;
    label?: string;
    name?: string;
    value?: unknown;
  }>;
  fields_map?: Record<
    string,
    {
      field_id?: string;
      label?: string;
      name?: string;
      value?: unknown;
    }
  >;
  src_program?: ReqProgramItem;
  dst_program?: ReqProgramItem;
  tags?: Array<{ tag_id?: string; name?: string }>;
  tag?: {
    field_id?: string;
    label?: string;
    name?: string;
    value?: unknown;
  };
  tracker_id?: number;
};

type ReqRequirementHistory = {
  id?: string | number;
  ir_id?: string;
  rr_id?: string;
  created_time?: number;
  field?: {
    field_id?: string;
    field_label?: string;
    old_value?: string;
    new_value?: string;
  };
  creator?: ReqProgramUser;
  operator?: ReqProgramUser;
};

type ReqRrStatusItem = {
  rr_id?: string;
  status?: {
    id?: string;
    label?: string;
    name?: string;
  };
};

type ReqIssueSeverity = {
  id?: number;
  name?: string;
  position?: number;
  isDefault?: boolean;
  type?: string;
  active?: boolean;
};

type ReqIpdProject = {
  id?: string;
  name?: string;
  project_type?: string;
  domain_id?: string;
  model_id?: string;
};

type ReqIpdUser = {
  user_id?: string;
  id?: string | number;
  user_name?: string;
  name?: string;
  nick_name?: string;
  domain_id?: string;
  domain_name?: string;
};

type ReqIpdIssue = {
  id?: string | number;
  number?: string;
  subject?: string;
  name?: string;
  title?: string;
  status?: string | { id?: string | number; name?: string; label?: string };
  category?: string | { id?: string | number; name?: string; label?: string };
  owner?: ReqIpdUser;
  assigned_to?: ReqIpdUser;
  assignee?: ReqIpdUser;
  created_time?: number | string;
  created_date?: number | string;
  updated_time?: number | string;
  modified_time?: number | string;
  modified_date?: number | string;
  children?: ReqIpdIssue[];
};

type ReqIpdReviewEntity = Record<string, unknown> & {
  id?: string | number;
  number?: string;
  title?: string;
  category?: string;
  state?: string;
  status?: string | { id?: string | number; name?: string; label?: string };
  created_by?: ReqIpdUser;
  modified_by?: ReqIpdUser;
  created_time?: string | number;
  modified_time?: string | number;
  plan_start_date?: string | number;
  plan_end_date?: string | number;
  close_time?: string | number;
  closed_time?: string | number;
  approver?: string;
  reviewer?: string;
};

type ReqIpdNamedItem = {
  id?: string | number;
  field_id?: string | number;
  code?: string;
  name?: string;
  number?: string;
  label?: string;
  title?: string;
  description?: string;
  display_name?: string;
  display_value?: string;
  value?: string;
  default_value?: string;
  field_type?: string;
  field_type_id?: string;
  field_type_name?: string;
  definition_type?: string;
  show?: boolean;
  show_on_card?: boolean;
  optional?: boolean;
  user_visibility?: boolean;
  has_update_privilege?: boolean;
  has_same_display_name?: boolean;
  color?: string;
  label_type?: string;
  parent_id?: string | number;
  position_float?: number;
  belonging?: string;
  created_date?: string;
  modified_date?: string;
  option?: ReqIpdNamedItem[];
  all_options?: ReqIpdNamedItem[];
  child_fs?: ReqIpdNamedItem[];
  children?: ReqIpdNamedItem[];
};

type ReqIpdFieldUsage = {
  domain_id?: string;
  project_name?: string;
  project_id?: string;
  model_id?: string;
  create_by?: string;
  category_codes?: string;
  categories?: ReqIpdNamedItem[];
};

type ReqIpdWiki = {
  wiki_id?: string;
  title?: string;
  issue_id?: string;
  type?: string;
  created_date?: string;
  region?: string;
  reigon?: string;
  identifier?: string;
  code?: string;
  sm_level_sequence?: string;
  project?: { project_id?: string; name?: string; project_type?: string };
  author?: { id?: string; name?: string };
};

type ReqIpdDashboardItem = {
  category?: string;
  category_name?: string;
  total?: number;
  processing?: number;
  completed?: number;
  expired?: number;
  remain_di?: number;
};

type ReqIpdAttachment = {
  id?: string | number;
  issue_id?: string | number;
  workitem_id?: string | number;
  file_name?: string;
  title?: string;
  store_filename?: string;
  file_size?: number | string;
  filesize?: number | string;
  attachment_type?: string;
  created_date?: string;
  status?: string;
};

type ReqIpdWorkHour = {
  id?: string | number;
  title?: string;
  operation_id?: string | number;
  description?: string | null;
  workitem_id?: string | number;
  workitem?: {
    id?: string | number;
    plan_pi?: string | null;
    plan_iteration?: string | null;
    sum_workload_man_day?: string | number | null;
    workload_man_day?: string | number | null;
    convolution_plan_hours?: string | number | null;
    convolution_actual_hours?: string | number | null;
  };
  work_date?: string | number;
  created_by?: ReqIpdUser | string;
  modified_by?: ReqIpdUser | string;
  work_hour_category?: string | ReqIpdNamedItem;
  work_hours?: string | number;
};

function withIpdExtraFields<T extends Record<string, unknown>>(body: T & { extra_fields?: Record<string, unknown> }) {
  const { extra_fields, ...rest } = body;
  return {
    ...rest,
    ...(extra_fields ?? {})
  };
}

function normalizeIpdWorkHourTotal(response: { result?: { data?: ReqIpdWorkHour[]; work_hours_total?: string | number } }) {
  return {
    data: response.result?.data ?? [],
    work_hours_total: response.result?.work_hours_total
  };
}

function toIpdFieldMutationBody(input: Record<string, unknown>) {
  const { project_id, field_id, dry_run, extra_fields, ...rest } = input;
  return {
    ...rest,
    ...(extra_fields && typeof extra_fields === "object" && !Array.isArray(extra_fields) ? extra_fields : {})
  };
}

type ReqClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

export function createReqClient(
  _http: ReturnTypeCreateHttpClient,
  options: ReqClientOptions = {}
): ReqClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.reqListProjectsMs;
  const now = options.now ?? Date.now;
  const listProjectsCache = createReadThroughCache<
    string,
    {
      projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });

  function buildListProjectsCacheKey(input: {
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
    async getCurrentUserInfo() {
      const response = (await _http.get("/v4/user")) as {
        domain_id?: string;
        domain_name?: string;
        user_num_id?: number | string;
        user_id?: string;
        user_name?: string;
        nick_name?: string;
        created_time?: number | string;
        updated_time?: number | string;
        gender?: string;
        user_type?: string;
      };

      return {
        domain_id: response.domain_id,
        domain_name: response.domain_name,
        user_num_id:
          typeof response.user_num_id === "string"
            ? Number(response.user_num_id)
            : response.user_num_id,
        user_id: response.user_id,
        user_name: response.user_name,
        nick_name: response.nick_name,
        created_time:
          typeof response.created_time === "string"
            ? Number(response.created_time)
            : response.created_time,
        updated_time:
          typeof response.updated_time === "string"
            ? Number(response.updated_time)
            : response.updated_time,
        gender: response.gender,
        user_type: response.user_type
      };
    },
    async getCurrentUserRole(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/user-role`
      )) as {
        user_role?: number;
      };

      return {
        project_id: input.project_id,
        user_role: response.user_role
      };
    },
    async listUserFeatures(input) {
      const response = (await _http.get(
        `/v1/projects/${encodeURIComponent(input.project_id)}/user/features`
      )) as Array<{
        key?: string;
        control?: string;
      }>;

      return {
        project_id: input.project_id,
        features: response ?? []
      };
    },
    async createProject(input) {
      const response = (await _http.post("/v4/project", {
        project_name: input.name,
        description: input.description,
        project_type: "scrum"
      })) as {
        project_id?: string;
        project_name?: string;
        description?: string;
        project_num_id?: number;
        project_type?: string;
      };

      return {
        project_id: response.project_id ?? "",
        project_name: response.project_name ?? input.name,
        description: response.description ?? input.description,
        project_num_id: response.project_num_id,
        project_type: response.project_type ?? "scrum"
      };
    },
    async createWorkItem(input) {
      const beginTime = toReqWorkItemDate(input.start_date);
      const endTime = toReqWorkItemDate(input.due_date);
      const response = (await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/issue`, {
        name: input.title,
        description: input.description,
        tracker_id: toTrackerId(input.work_item_type),
        priority_id: toPriorityId(input.priority_id),
        ...(input.parent_work_item_id ? { parent_issue_id: toOptionalNumericId(input.parent_work_item_id) } : {}),
        ...(input.iteration_id ? { iteration_id: input.iteration_id } : {}),
        ...(input.module_id ? { module_id: input.module_id } : {}),
        ...(typeof input.severity_id !== "undefined" ? { severity_id: input.severity_id } : {}),
        ...(input.assigned_id ? { assigned_id: input.assigned_id } : {}),
        ...(input.developer_id ? { developer_id: toOptionalNumericId(input.developer_id) } : {}),
        ...(typeof input.done_ratio !== "undefined" ? { done_ratio: input.done_ratio } : {}),
        ...(typeof input.expected_work_hours !== "undefined"
          ? { expected_work_hours: input.expected_work_hours }
          : {}),
        ...(beginTime ? { begin_time: beginTime } : {}),
        ...(endTime ? { end_time: endTime } : {})
      })) as {
        id?: number | string;
        name?: string;
        description?: string;
        status?: { id?: number; name?: string };
        tracker?: { id?: number; name?: string };
      };

      return {
        id: response.id ?? "",
        name: response.name ?? input.title,
        description: response.description,
        status: response.status,
        tracker: response.tracker
      };
    },
    async getProject(input) {
      const response = (await _http.get(`/v4/projects/${encodeURIComponent(input.project_id)}`)) as {
        project?: {
          project_id?: string;
          name?: string;
          project_num_id?: number;
          description?: string;
        };
        project_id?: string;
        name?: string;
        project_num_id?: number;
        description?: string;
      };
      const project = response.project ?? response;

      return {
        project_id: project.project_id ?? input.project_id,
        name: project.name ?? "",
        project_num_id: project.project_num_id,
        description: project.description
      };
    },
    async listProjectDemandStatistics(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/demand-statistic`
      )) as {
        demand_statistics?: ReqDemandStatistic[];
      };

      return {
        project_id: input.project_id,
        demand_statistics: response.demand_statistics ?? []
      };
    },
    async getProjectSummary(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/summary`
      )) as {
        project_id?: string;
        bug_statistics?: ReqBugStatistic[];
        demand_statistics?: ReqDemandStatistic[];
        issue_completion_rates?: ReqIssueCompletionRate[];
      };

      return {
        project_id: response.project_id ?? input.project_id,
        bug_statistics: response.bug_statistics ?? [],
        demand_statistics: response.demand_statistics ?? [],
        issue_completion_rates: response.issue_completion_rates ?? []
      };
    },
    async getProjectBugDensity(input) {
      const response = (await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/bug-density/query`,
        {
          ...(input.date_range ? { date_range: input.date_range } : {}),
          ...(input.metric_type ? { metric_type: input.metric_type } : {}),
          ...(input.dividend ? { dividend: input.dividend } : {}),
          ...(input.divisor ? { divisor: input.divisor } : {})
        }
      )) as ReqProjectMetric;

      return {
        project_id: response.project_id ?? input.project_id,
        project_name: response.project_name,
        metric_value: response.metric_value,
        metric_name: response.metric_name,
        dividend_value: response.dividend_value,
        divisor_value: response.divisor_value
      };
    },
    async getProjectBugsPerDeveloper(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/bugs-per-developer/query`,
        {}
      )) as ReqProjectMetric;

      return {
        project_id: response.project_id ?? input.project_id,
        project_name: response.project_name,
        metric_value: response.metric_value,
        metric_name: response.metric_name,
        dividend_value: response.dividend_value,
        divisor_value: response.divisor_value
      };
    },
    async getProjectCompletionRate(input) {
      const response = (await _http.post(
        `/v1/${encodeURIComponent(input.project_id)}/completion-rate/query`,
        {
          ...(input.date_range ? { date_range: input.date_range } : {}),
          ...(input.metric_type ? { metric_type: input.metric_type } : {}),
          ...(input.sprint_id ? { sprint_id: input.sprint_id } : {}),
          ...(input.dividend ? { dividend: input.dividend } : {}),
          ...(input.divisor ? { divisor: input.divisor } : {})
        }
      )) as ReqProjectMetric;

      return {
        project_id: response.project_id ?? input.project_id,
        project_name: response.project_name,
        metric_value: response.metric_value,
        metric_name: response.metric_name,
        dividend_value: response.dividend_value,
        divisor_value: response.divisor_value
      };
    },
    async listProjectBugStatistics(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/bug-statistic`
      )) as {
        bug_statistics?: ReqBugStatistic[];
      };

      return {
        project_id: input.project_id,
        bug_statistics: response.bug_statistics ?? []
      };
    },
    async updateProject(input) {
      await _http.put(`/v4/projects/${encodeURIComponent(input.project_id)}`, {
        project_name: input.name,
        description: input.description
      });

      return {
        project_id: input.project_id,
        project_name: input.name,
        description: input.description
      };
    },
    async deleteProject(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}`);

      return {
        project_id: input.project_id,
        deleted: true as const
      };
    },
    async addProjectMember(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/member`, {
        user_id: input.user_id,
        domain_id: input.domain_id,
        domain_name: input.domain_name,
        role_id: input.role_id
      });

      return {
        project_id: input.project_id,
        user_id: input.user_id,
        domain_id: input.domain_id,
        domain_name: input.domain_name,
        role_id: input.role_id,
        added: true as const
      };
    },
    async batchAddProjectMembers(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/members`, {
        users: input.members
      });

      return {
        project_id: input.project_id,
        members: input.members,
        addedCount: input.members.length
      };
    },
    async batchDeleteProjectMembers(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/members`, {
        user_ids: input.user_ids
      });

      return {
        project_id: input.project_id,
        user_ids: input.user_ids,
        removedCount: input.user_ids.length
      };
    },
    async updateProjectMemberRole(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/members/role`, {
        role_id: input.role_id,
        user_ids: [input.user_id]
      });

      return {
        project_id: input.project_id,
        user_id: input.user_id,
        role_id: input.role_id,
        updated: true as const
      };
    },
    async leaveProject(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/quit`);

      return {
        project_id: input.project_id,
        left: true as const
      };
    },
    async checkProjectName(input) {
      const response = (await _http.post("/v4/projects/check-name", {
        project_name: input.name
      })) as {
        exist?: boolean;
      };

      return {
        exist: response.exist ?? false
      };
    },
    async listNotAddedProjects(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(`/v4/projects/domain/not-added?${query.toString()}`)) as {
        projects?: Array<{
          project_id: string;
          project_name?: string;
          name?: string;
          project_num_id?: number;
          description?: string;
          project_type?: string;
        }>;
        total?: number;
      };

      return {
        projects: (response.projects ?? []).map((project) => ({
          project_id: project.project_id,
          project_name: project.project_name ?? project.name ?? "",
          project_num_id: project.project_num_id,
          description: project.description,
          project_type: project.project_type
        })),
        total: response.total
      };
    },
    async listProjectModules(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/modules?${query.toString()}`
      )) as {
        modules?: Array<{
          module_id: number | string;
          module_name: string;
          description?: string;
          deepth?: number;
          is_parent?: boolean;
          parent_module_id?: number;
          owner?: {
            user_id?: string;
            user_name?: string;
            nick_name?: string;
            user_num_id?: number;
          };
          children?: Array<{
            module_id: number | string;
            module_name: string;
            description?: string;
            deepth?: number;
            is_parent?: boolean;
            parent_module_id?: number;
            owner?: {
              user_id?: string;
              user_name?: string;
              nick_name?: string;
              user_num_id?: number;
            };
          }>;
        }>;
        total?: number;
      };

      return {
        modules: response.modules ?? [],
        total: response.total
      };
    },
    async validateModuleName(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        module_name: input.module_name
      });
      const response = (await _http.get(
        `/v2/module/module-name-validation?${query.toString()}`
      )) as {
        result?: {
          exist?: boolean;
        };
        exist?: boolean;
      };

      return {
        exist: response.result?.exist ?? response.exist ?? false
      };
    },
    async createProjectModule(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/module`,
        {
          module_name: input.module_name,
          description: input.description,
          parent_module_id: input.parent_module_id,
          owner: {
            user_id: input.owner_user_id
          }
        }
      )) as {
        module_id?: number | string;
        module_name?: string;
        description?: string;
        owner?: {
          user_id?: string;
          user_name?: string;
          nick_name?: string;
          user_num_id?: number;
        };
      };

      return {
        module_id: response.module_id ?? "",
        module_name: response.module_name ?? input.module_name,
        description: response.description,
        owner: response.owner
      };
    },
    async updateProjectModule(input) {
      const response = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/modules/${encodeURIComponent(input.module_id)}`,
        {
          module_name: input.module_name,
          description: input.description,
          owner: {
            user_id: input.owner_user_id
          }
        }
      )) as {
        module_id?: number | string;
        module_name?: string;
        description?: string;
        owner?: {
          user_id?: string;
          user_name?: string;
          nick_name?: string;
          user_num_id?: number;
        };
      };

      return {
        module_id: response.module_id ?? input.module_id,
        module_name: response.module_name ?? input.module_name,
        description: response.description,
        owner: response.owner
      };
    },
    async deleteProjectModule(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/modules/${encodeURIComponent(input.module_id)}`
      );

      return {
        project_id: input.project_id,
        module_id: input.module_id,
        deleted: true as const
      };
    },
    async listIterations(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations`
      )) as {
        iterations?: Array<{
          id: number | string;
          name: string;
          status?: string;
          begin_time?: string;
          end_time?: string;
          description?: string;
          updated_time?: number;
          deleted?: boolean;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        iterations: response.iterations ?? [],
        total: response.total ?? response.total_count
      };
    },
    async listIterationWorkItems(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      if (typeof input.tracker_id !== "undefined") {
        query.set("tracker_id", String(input.tracker_id));
      }

      if (typeof input.status_id !== "undefined") {
        query.set("status_id", String(input.status_id));
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations/${encodeURIComponent(input.iteration_id)}/issues?${query.toString()}`
      )) as {
        result?: {
          issues?: ReqDetailedIssueListItem[];
          work_items?: ReqDetailedIssueListItem[];
          total?: number;
          total_count?: number;
        };
        issues?: ReqDetailedIssueListItem[];
        work_items?: ReqDetailedIssueListItem[];
        total?: number;
        total_count?: number;
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;
      const items: ReqDetailedIssueListItem[] = result.issues ?? result.work_items ?? [];

      return {
        work_items: items,
        total: result.total ?? result.total_count
      };
    },
    async getIteration(input) {
      const response = (await _http.get(
        `/v4/iterations/${encodeURIComponent(input.iteration_id)}`
      )) as {
        iteration_id?: number | string;
        name?: string;
        status?: string;
        begin_time?: string;
        end_time?: string;
        description?: string;
        progress?: string;
        total?: number;
        opened_total?: number;
        closed_total?: number;
        have_task?: boolean;
        charts?: Record<string, unknown>;
        created_time?: number;
        updated_time?: number;
      };

      return {
        iteration_id: response.iteration_id ?? input.iteration_id,
        name: response.name ?? "",
        status: response.status,
        begin_time: response.begin_time,
        end_time: response.end_time,
        description: response.description,
        progress: response.progress,
        total: response.total,
        opened_total: response.opened_total,
        closed_total: response.closed_total,
        have_task: response.have_task,
        charts: response.charts,
        created_time: response.created_time,
        updated_time: response.updated_time
      };
    },
    async listPlans(input) {
      if (
        input.search ||
        (input.user_ids && input.user_ids.length > 0) ||
        input.sort ||
        input.type
      ) {
        const response = (await _http.post(
          `/v3/plan/${encodeURIComponent(input.project_id)}/managements`,
          {
            ...(typeof input.status_id !== "undefined" ? { status_id: input.status_id } : {}),
            ...(input.plan_id ? { plan_id: input.plan_id } : {}),
            ...(input.search ? { search: input.search } : {}),
            ...(input.user_ids && input.user_ids.length > 0 ? { user_ids: input.user_ids } : {}),
            ...(input.sort ? { sort: input.sort } : {}),
            ...(input.type ? { type: input.type } : {}),
            page_no: input.page,
            page_size: input.page_size
          }
        )) as {
          plans?: Array<{
            result?: {
              id?: number | string;
              name?: string;
              type?: string;
              project_id?: string;
              img_url?: string;
              creator?: {
                user_id?: string;
                domain_id?: string;
                nick_name?: string;
                first_name?: string;
              };
            };
            status?: string;
            id?: number | string;
            name?: string;
            type?: string;
            project_id?: string;
            img_url?: string;
            creator?: {
              user_id?: string;
              domain_id?: string;
              nick_name?: string;
              first_name?: string;
            };
          }>;
          total?: number;
          minds?: number;
          gantts?: number;
        };

        return {
          plans: (response.plans ?? []).map((item) => {
            const plan = item.result ?? item;

            return {
              id: plan.id ?? "",
              name: plan.name ?? "",
              type: plan.type,
              project_id: plan.project_id ?? input.project_id,
              img_url: plan.img_url,
              creator: plan.creator
            };
          }),
          total: response.total,
          minds: response.minds,
          gantts: response.gantts
        };
      }

      const query = new URLSearchParams({
        project_id: input.project_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      if (typeof input.status_id !== "undefined") {
        query.set("status_id", String(input.status_id));
      }

      if (input.plan_id) {
        query.set("plan_id", input.plan_id);
      }

      const response = (await _http.get(`/v2/workitem/plan?${query.toString()}`)) as {
        result?: {
          total?: number;
          total_count?: number;
          issues?: Array<{
            id: number | string;
            name?: string;
            type?: string;
            project_id?: string;
            creator?: string;
            updater?: string;
            created_on?: string;
            updated_on?: string;
          }>;
        };
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          creator?: string;
          updater?: string;
          created_on?: string;
          updated_on?: string;
        }>;
      };
      const result = (response.result ?? response) as {
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          creator?: string;
          updater?: string;
          created_on?: string;
          updated_on?: string;
        }>;
      };

      return {
        plans: (result.issues ?? []).map((item) => ({
          id: item.id,
          name: item.name ?? "",
          type: item.type,
          project_id: item.project_id,
          creator: item.creator,
          updater: item.updater,
          created_on: item.created_on,
          updated_on: item.updated_on
        })),
        total: result.total ?? result.total_count
      };
    },
    async getPlan(input) {
      const response = (await _http.get(
        `/v3/plan/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.plan_id)}/info`
      )) as {
        result?: {
          id?: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          creator?: string;
          updater?: string;
          created_on?: string;
          updated_on?: string;
        };
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        creator?: string;
        updater?: string;
        created_on?: string;
        updated_on?: string;
      };
      const result = (response.result ?? response) as {
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        creator?: string;
        updater?: string;
        created_on?: string;
        updated_on?: string;
      };

      return {
        id: result.id ?? input.plan_id,
        name: result.name ?? "",
        type: result.type,
        project_id: result.project_id ?? input.project_id,
        creator: result.creator,
        updater: result.updater,
        created_on: result.created_on,
        updated_on: result.updated_on
      };
    },
    async listPlanAddableWorkItems(input) {
      const response = (await _http.post(
        `/v3/plan/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.plan_id)}/addable-issues`,
        {
          ...(input.subject ? { subject: input.subject } : {}),
          page_no: input.page,
          page_size: input.page_size
        }
      )) as {
        result?: {
          total?: number;
          total_count?: number;
          issues?: Array<{
            id: number | string;
            subject?: string;
            tracker?: {
              id?: number | string;
              name?: string;
            };
            tracker_id?: number | string;
            tracker_name?: string;
            status?: {
              id?: number | string;
              name?: string;
            };
            status_id?: number | string;
            status_name?: string;
          }>;
        };
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          subject?: string;
          tracker?: {
            id?: number | string;
            name?: string;
          };
          tracker_id?: number | string;
          tracker_name?: string;
          status?: {
            id?: number | string;
            name?: string;
          };
          status_id?: number | string;
          status_name?: string;
        }>;
      };
      const result = (response.result ?? response) as {
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          subject?: string;
          tracker?: {
            id?: number | string;
            name?: string;
          };
          tracker_id?: number | string;
          tracker_name?: string;
          status?: {
            id?: number | string;
            name?: string;
          };
          status_id?: number | string;
          status_name?: string;
        }>;
      };

      return {
        work_items: result.issues ?? [],
        total: result.total ?? result.total_count
      };
    },
    async listPlanWorkItems(input) {
      const response = (await _http.post(
        `/v3/plan/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.plan_id)}/issues`,
        {
          show_type: input.show_type ?? "list",
          ...(input.subject ? { subject: input.subject } : {}),
          pageNo: input.page,
          pageSize: input.page_size,
          ...(typeof input.tracker_id !== "undefined" ? { tracker_id: input.tracker_id } : {})
        }
      )) as {
        result?: {
          milestone_cur_count?: number;
          issue_cur_count?: number;
          issues_count?: number;
          total?: number;
          total_count?: number;
          issues?: Array<{
            id: number | string;
            subject?: string;
            tracker?: {
              id?: number | string;
              name?: string;
            };
            tracker_id?: number | string;
            tracker_name?: string;
            status?: {
              id?: number | string;
              name?: string;
            };
            status_id?: number | string;
            status_name?: string;
          }>;
        };
        milestone_cur_count?: number;
        issue_cur_count?: number;
        issues_count?: number;
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          subject?: string;
          tracker?: {
            id?: number | string;
            name?: string;
          };
          tracker_id?: number | string;
          tracker_name?: string;
          status?: {
            id?: number | string;
            name?: string;
          };
          status_id?: number | string;
          status_name?: string;
        }>;
      };
      const result = (response.result ?? response) as {
        milestone_cur_count?: number;
        issue_cur_count?: number;
        issues_count?: number;
        total?: number;
        total_count?: number;
        issues?: Array<{
          id: number | string;
          subject?: string;
          tracker?: {
            id?: number | string;
            name?: string;
          };
          tracker_id?: number | string;
          tracker_name?: string;
          status?: {
            id?: number | string;
            name?: string;
          };
          status_id?: number | string;
          status_name?: string;
        }>;
      };

      return {
        work_items: result.issues ?? [],
        total: result.issues_count ?? result.total ?? result.total_count,
        milestone_cur_count: result.milestone_cur_count,
        issue_cur_count: result.issue_cur_count,
        issues_count: result.issues_count
      };
    },
    async listReleasePlans(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        size: String(input.page_size),
        key_word: input.key_word ?? "",
        updated_time_interval: input.updated_time_interval ?? ""
      });
      const response = (await _http.get(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/query?${query.toString()}`
      )) as {
        status?: string;
        message?: string | null;
        result?: ReqReleasePlan[];
        page?: {
          page?: number;
          size?: number;
          count?: number;
        };
      };

      return {
        plans: response.result ?? [],
        total: response.page?.count,
        page: response.page?.page,
        page_size: response.page?.size,
        status: response.status,
        message: response.message
      };
    },
    async getReleasePlan(input) {
      const response = (await _http.get(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}`
      )) as {
        status?: string;
        message?: string | null;
        result?: ReqReleasePlan;
      };

      return {
        project_id: input.project_id,
        status: response.status,
        message: response.message,
        plan: response.result ?? {
          id: input.plan_id
        }
      };
    },
    async createPlan(input) {
      const response = (await _http.post(
        `/v3/plan/${encodeURIComponent(input.project_id)}/management`,
        {
          name: input.name,
          type: input.type
        }
      )) as {
        result?: {
          id?: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          img_url?: string;
          creator?: {
            user_id?: string;
            domain_id?: string;
            nick_name?: string;
            first_name?: string;
          };
        };
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };
      const result = (response.result ?? response) as {
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };

      return {
        id: result.id ?? "",
        name: result.name ?? input.name,
        type: result.type ?? input.type,
        project_id: result.project_id ?? input.project_id,
        img_url: result.img_url,
        creator: result.creator
      };
    },
    async updatePlan(input) {
      const response = (await _http.put(
        `/v3/plan/${encodeURIComponent(input.project_id)}/management/${encodeURIComponent(input.plan_id)}`,
        {
          name: input.name
        }
      )) as {
        result?: {
          id?: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          img_url?: string;
          creator?: {
            user_id?: string;
            domain_id?: string;
            nick_name?: string;
            first_name?: string;
          };
        };
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };
      const result = (response.result ?? response) as {
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };

      return {
        id: result.id ?? input.plan_id,
        name: result.name ?? input.name,
        type: result.type,
        project_id: result.project_id ?? input.project_id,
        img_url: result.img_url,
        creator: result.creator
      };
    },
    async createReleasePlan(input) {
      const response = (await _http.post(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans`,
        {
          title: input.title,
          category: input.category,
          plan_start_date: input.plan_start_date,
          plan_end_date: input.plan_end_date,
          ...(typeof input.description !== "undefined" ? { description: input.description } : {}),
          ...(typeof input.parent_id !== "undefined" ? { parent_id: input.parent_id } : {}),
          ...(typeof input.workload !== "undefined" ? { workload: input.workload } : {}),
          ...(typeof input.owner !== "undefined" ? { owner: input.owner } : {})
        }
      )) as {
        status?: string;
        message?: string | null;
        result?: ReqReleasePlan;
      };

      assertReqMutationSucceeded("create release plan", response.status);

      return {
        project_id: input.project_id,
        status: response.status,
        message: response.message,
        plan: response.result ?? {
          title: input.title,
          category: input.category,
          plan_start_date: input.plan_start_date,
          plan_end_date: input.plan_end_date,
          description: input.description,
          parent_id: input.parent_id,
          workload: input.workload,
          owner: input.owner
        }
      };
    },
    async updateReleasePlan(input) {
      const response = (await _http.put(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}`,
        {
          id: input.plan_id,
          ...(typeof input.title !== "undefined" ? { title: input.title } : {}),
          ...(typeof input.category !== "undefined" ? { category: input.category } : {}),
          ...(typeof input.description !== "undefined" ? { description: input.description } : {}),
          ...(typeof input.status !== "undefined" ? { status: input.status } : {}),
          ...(typeof input.plan_start_date !== "undefined" ? { plan_start_date: input.plan_start_date } : {}),
          ...(typeof input.plan_end_date !== "undefined" ? { plan_end_date: input.plan_end_date } : {}),
          ...(typeof input.created_date !== "undefined" ? { created_date: input.created_date } : {}),
          ...(typeof input.parent_id !== "undefined" ? { parent_id: input.parent_id } : {}),
          ...(typeof input.baseline !== "undefined" ? { baseline: input.baseline } : {}),
          ...(typeof input.workload !== "undefined" ? { workload: input.workload } : {}),
          ...(typeof input.owner !== "undefined" ? { owner: input.owner } : {})
        }
      )) as {
        status?: string;
        message?: string | null;
        result?: ReqReleasePlan;
      };

      assertReqMutationSucceeded("update release plan", response.status);

      return {
        project_id: input.project_id,
        status: response.status,
        message: response.message,
        plan: response.result ?? {
          id: input.plan_id,
          title: input.title,
          category: input.category,
          description: input.description,
          status: input.status,
          plan_start_date: input.plan_start_date,
          plan_end_date: input.plan_end_date,
          created_date: input.created_date,
          parent_id: input.parent_id,
          baseline: input.baseline,
          workload: input.workload,
          owner: input.owner
        }
      };
    },
    async batchDeleteReleasePlans(input) {
      const response = (await _http.delete(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/batch-delete`,
        { ids: input.plan_ids }
      )) as {
        status?: string;
        message?: string | null;
        result?: {
          success_num?: number;
          fail_num?: number;
          success?: Array<{ id?: string; modified_by?: string }>;
          failed?: Array<{ id?: string; modified_by?: string }>;
        };
      };

      assertReqMutationSucceeded("batch delete release plans", response.status);

      return {
        project_id: input.project_id,
        plan_ids: input.plan_ids,
        status: response.status,
        message: response.message,
        success_num: response.result?.success_num,
        fail_num: response.result?.fail_num,
        success: response.result?.success ?? [],
        failed: response.result?.failed ?? []
      };
    },
    async batchUpdateReleasePlanBaseline(input) {
      const response = (await _http.put(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/batch-baseline`,
        {
          ids: input.plan_ids,
          attribute: {
            baseline: input.baseline
          }
        }
      )) as {
        status?: string;
        message?: string | null;
        result?: {
          success_num?: number;
          fail_num?: number;
          success?: Array<{ id?: string; modified_by?: string }>;
          failed?: Array<{ id?: string; modified_by?: string }>;
        };
      };

      assertReqMutationSucceeded("batch update release plan baseline", response.status);

      return {
        project_id: input.project_id,
        plan_ids: input.plan_ids,
        status: response.status,
        message: response.message,
        success_num: response.result?.success_num,
        fail_num: response.result?.fail_num,
        success: response.result?.success ?? [],
        failed: response.result?.failed ?? []
      };
    },
    async changeReleasePlanStatus(input) {
      const response = (await _http.put(
        `/v1/planservice/projects/${encodeURIComponent(input.project_id)}/plans/${encodeURIComponent(input.plan_id)}/status`,
        {
          operate: input.operate,
          ...(typeof input.move_to_sprint_id !== "undefined"
            ? { move_to_sprint_id: input.move_to_sprint_id }
            : {})
        }
      )) as {
        status?: string;
        message?: string;
        result?: unknown;
      };

      assertReqMutationSucceeded("change release plan status", response.status);

      return {
        project_id: input.project_id,
        plan_id: input.plan_id,
        operate: input.operate,
        move_to_sprint_id: input.move_to_sprint_id,
        status: response.status,
        message: response.message,
        result: response.result
      };
    },
    async updatePlanImage(input) {
      const response = (await _http.put(
        `/v3/plan/${encodeURIComponent(input.project_id)}/management/${encodeURIComponent(input.plan_id)}/img`,
        {
          img_url: input.img_url
        }
      )) as {
        status?: string;
        result?: {
          id?: number | string;
          name?: string;
          type?: string;
          project_id?: string;
          img_url?: string;
          creator?: {
            user_id?: string;
            domain_id?: string;
            nick_name?: string;
            first_name?: string;
          };
        };
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };
      assertReqMutationSucceeded("update plan image", response.status);
      const result = (response.result ?? response) as {
        id?: number | string;
        name?: string;
        type?: string;
        project_id?: string;
        img_url?: string;
        creator?: {
          user_id?: string;
          domain_id?: string;
          nick_name?: string;
          first_name?: string;
        };
      };

      return {
        id: result.id ?? input.plan_id,
        name: result.name,
        type: result.type,
        project_id: result.project_id ?? input.project_id,
        img_url: result.img_url ?? input.img_url,
        creator: result.creator,
        updated: true as const
      };
    },
    async deletePlan(input) {
      await _http.delete(`/v3/plan/${encodeURIComponent(input.project_id)}/management`, [input.plan_id]);

      return {
        project_id: input.project_id,
        plan_id: input.plan_id,
        deleted: true as const
      };
    },
    async addPlanWorkItems(input) {
      await _http.post(
        `/v3/plan/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.plan_id)}/issue`,
        input.work_item_ids
      );

      return {
        project_id: input.project_id,
        plan_id: input.plan_id,
        work_item_ids: input.work_item_ids,
        addedCount: input.work_item_ids.length
      };
    },
    async clearPlanWorkItems(input) {
      await _http.delete(`/v3/plan/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.plan_id)}/issue`);

      return {
        project_id: input.project_id,
        plan_id: input.plan_id,
        cleared: true as const
      };
    },
    async createPlanWorkItem(input) {
      const response = (await _http.post("/v2/issues/create", {
        projectUUId: input.project_id,
        tracker_id: toTrackerId(input.work_item_type),
        priority_id: input.priority_id,
        subject: input.title,
        ...(input.parent_work_item_id
          ? { parent_issue_id: toOptionalNumericId(input.parent_work_item_id) }
          : {}),
        ...(input.description ? { description: input.description } : {}),
        ...(typeof input.due_date !== "undefined" ? { due_date: input.due_date } : {}),
        ...(typeof input.start_date !== "undefined" ? { start_date: input.start_date } : {}),
        ...(typeof input.severity_id !== "undefined" ? { severity_id: input.severity_id } : {}),
        ...(typeof input.done_ratio !== "undefined" ? { done_ratio: input.done_ratio } : {}),
        ...(typeof input.status_id !== "undefined" ? { status_id: input.status_id } : {}),
        ...(typeof input.expected_work_hours !== "undefined"
          ? { expected_work_hours: input.expected_work_hours }
          : {}),
        ...(input.plan_id ? { plan_id: input.plan_id } : {}),
        ...(input.iteration_id ? { iteration_id: input.iteration_id } : {}),
        ...(input.module_id ? { module_id: input.module_id } : {}),
        ...(input.assigned_id ? { assigned_id: input.assigned_id } : {}),
        ...(input.developer_id ? { developer_id: toOptionalNumericId(input.developer_id) } : {})
      })) as {
        status?: string;
        result?: {
          issue?: {
            id?: number | string;
            issue_num?: number | string;
            subject?: string;
            description?: string;
            status?: { id?: number | string; name?: string };
            tracker?: { id?: number | string; name?: string };
            project?: { identifier?: string };
          };
        };
      };
      assertReqMutationSucceeded("create plan work item", response.status);
      const issue = response.result?.issue ?? {};

      return {
        id: issue.id ?? "",
        name: issue.subject ?? input.title,
        number: issue.issue_num,
        description: issue.description ?? input.description,
        status: issue.status,
        tracker: issue.tracker,
        project_id: issue.project?.identifier ?? input.project_id,
        plan_id: input.plan_id
      };
    },
    async createIteration(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iteration`,
        {
          name: input.name,
          begin_time: input.begin_time,
          end_time: input.end_time,
          description: input.description
        }
      )) as {
        id?: number | string;
      };

      return {
        id: response.id ?? "",
        project_id: input.project_id,
        name: input.name,
        begin_time: input.begin_time,
        end_time: input.end_time,
        description: input.description
      };
    },
    async updateIteration(input) {
      await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations/${encodeURIComponent(input.iteration_id)}`,
        {
          name: input.name,
          begin_time: input.begin_time,
          end_time: input.end_time,
          description: input.description,
          status: input.status,
          over_type: input.over_type
        }
      );

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        name: input.name,
        begin_time: input.begin_time,
        end_time: input.end_time,
        description: input.description,
        status: input.status,
        over_type: input.over_type
      };
    },
    async deleteIteration(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations/${encodeURIComponent(input.iteration_id)}`
      );

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        deleted: true as const
      };
    },
    async batchDeleteIterations(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/iterations`, {
        iteration_ids: input.iteration_ids
      });

      return {
        project_id: input.project_id,
        iteration_ids: input.iteration_ids,
        deletedCount: input.iteration_ids.length
      };
    },
    async updateIterationState(input) {
      const response = (await _http.post("/v2/version/state/update", {
        project_id: input.project_id,
        id: input.iteration_id,
        name: input.name,
        status: input.status,
        due_date: input.due_date,
        start_date: input.start_date
      })) as {
        result?: string;
        status?: string;
      };

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        name: input.name,
        status: input.status,
        due_date: input.due_date,
        start_date: input.start_date,
        result: response.result,
        update_status: response.status
      };
    },
    async queryIterationImmovableIssues(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        version_id: input.version_id
      });
      const response = (await _http.get(
        `/v2/version/query-immovable-issues?${query.toString()}`
      )) as {
        number?: string;
        id?: number | string;
        status_id?: number;
        status_name?: string;
      };

      return {
        items: response.id
          ? [
              {
                number: response.number,
                id: response.id,
                status_id: response.status_id,
                status_name: response.status_name
              }
            ]
          : []
      };
    },
    async listIterationStatusStatistics(input) {
      const query = new URLSearchParams({
        iteration_id: input.iteration_id
      });

      if (typeof input.tracker_id !== "undefined") {
        query.set("tracker_id", String(input.tracker_id));
      }

      if (typeof input.status_id !== "undefined") {
        query.set("status_id", String(input.status_id));
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/status-statistic?${query.toString()}`
      )) as Array<{
        user?: {
          id?: number;
          name?: string;
          nick_name?: string;
          user_id?: string;
          user_num_id?: number;
          first_name?: string;
        };
        item_count?: number;
        data?: Record<string, number>;
      }>;

      return {
        statistics: response ?? []
      };
    },
    async updateWorkItem(input) {
      const beginTime = toReqWorkItemDate(input.start_date);
      const endTime = toReqWorkItemDate(input.due_date);
      const response = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`,
        {
          name: input.title,
          description: input.description,
          status_id: input.status_id,
          tracker_id: toTrackerId(input.work_item_type),
          priority_id: toPriorityId(input.priority_id),
          ...(input.iteration_id ? { iteration_id: input.iteration_id } : {}),
          ...(input.module_id ? { module_id: input.module_id } : {}),
          ...(typeof input.severity_id !== "undefined" ? { severity_id: input.severity_id } : {}),
          ...(input.assigned_id ? { assigned_id: input.assigned_id } : {}),
          ...(input.developer_id ? { developer_id: toOptionalNumericId(input.developer_id) } : {}),
          ...(typeof input.done_ratio !== "undefined" ? { done_ratio: input.done_ratio } : {}),
          ...(typeof input.expected_work_hours !== "undefined"
            ? { expected_work_hours: input.expected_work_hours }
            : {}),
          ...(beginTime ? { begin_time: beginTime } : {}),
          ...(endTime ? { end_time: endTime } : {})
        }
      )) as {
        id?: number | string;
        name?: string;
        description?: string;
        status?: { id?: number; name?: string };
        tracker?: { id?: number; name?: string };
      };

      return {
        id: response.id ?? input.work_item_id,
        name: response.name ?? input.title ?? "",
        description: response.description,
        status: response.status,
        tracker: response.tracker
      };
    },
    async deleteWorkItem(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`
      );

      return {
        project_id: input.project_id,
        work_item_id: input.work_item_id,
        deleted: true as const
      };
    },
    async batchDeleteWorkItems(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/issues`, {
        issue_ids: input.work_item_ids
      });

      return {
        project_id: input.project_id,
        work_item_ids: input.work_item_ids,
        deletedCount: input.work_item_ids.length
      };
    },
    async copyWorkItems(input) {
      const response = (await _http.post("/v2/workitem/duplication", {
        fromProjectUUId: input.from_project_id,
        toProjectUUId: input.to_project_id,
        issueIds: input.work_item_ids.join(","),
        copyComments: input.copy_comments ?? false,
        copyWorkHours: input.copy_work_hours ?? false
      })) as {
        result?: {
          successIssues?: ReqCopyIssueResponse[];
          createIssues?: ReqCopyIssueResponse[];
          errorIssues?: ReqCopyIssueResponse[];
        };
        status?: string;
      };

      assertReqMutationSucceeded("copy work items", response.status);

      return {
        from_project_id: input.from_project_id,
        to_project_id: input.to_project_id,
        work_item_ids: input.work_item_ids,
        copy_comments: input.copy_comments ?? false,
        copy_work_hours: input.copy_work_hours ?? false,
        status: response.status,
        success_work_items: (response.result?.successIssues ?? []).map(mapReqCopyIssue),
        created_work_items: (response.result?.createIssues ?? []).map(mapReqCopyIssue),
        error_work_items: (response.result?.errorIssues ?? []).map(mapReqCopyIssue)
      };
    },
    async batchUpdateWorkItems(input) {
      const attribute: {
        status_id?: number;
        priority_id?: number;
        severity_id?: number;
        assigned_id?: string;
        developer_id?: number | string;
        done_ratio?: number;
        iteration_id?: string;
        module_id?: string;
      } = {};

      if (typeof input.status_id !== "undefined") {
        attribute.status_id = input.status_id;
      }

      if (typeof input.priority_id !== "undefined") {
        attribute.priority_id = input.priority_id;
      }

      if (typeof input.severity_id !== "undefined") {
        attribute.severity_id = input.severity_id;
      }

      if (typeof input.assigned_id !== "undefined") {
        attribute.assigned_id = input.assigned_id;
      }

      if (typeof input.developer_id !== "undefined") {
        attribute.developer_id = toOptionalNumericId(input.developer_id);
      }

      if (typeof input.done_ratio !== "undefined") {
        attribute.done_ratio = input.done_ratio;
      }

      if (typeof input.iteration_id !== "undefined") {
        attribute.iteration_id = input.iteration_id;
      }

      if (typeof input.module_id !== "undefined") {
        attribute.module_id = input.module_id;
      }

      await _http.put(`/v2/projects/${encodeURIComponent(input.project_id)}/issues/batch-update`, {
        id: input.work_item_ids,
        attribute
      });

      return {
        project_id: input.project_id,
        work_item_ids: input.work_item_ids,
        status_id: input.status_id,
        priority_id: input.priority_id,
        severity_id: input.severity_id,
        assigned_id: input.assigned_id,
        developer_id: input.developer_id,
        done_ratio: input.done_ratio,
        iteration_id: input.iteration_id,
        module_id: input.module_id,
        updatedCount: input.work_item_ids.length
      };
    },
    async listProjects(input) {
      const cacheKey = buildListProjectsCacheKey(input);
      const cached = await listProjectsCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const query = new URLSearchParams({
          offset: String(offset),
          limit: String(input.page_size)
        });

        if (input.keyword) {
          query.set("search", input.keyword);
        }

        const response = (await _http.get(`/v4/projects?${query.toString()}`)) as {
          projects?: Array<{
            project_id: string;
            name?: string;
            project_name?: string;
            project_num_id?: number;
          }>;
          total?: number;
        };

        return {
          projects: (response.projects ?? []).map((project) => ({
            project_id: project.project_id,
            name: project.name ?? project.project_name ?? "",
            project_num_id: project.project_num_id
          })),
          total: response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("req_list_projects");
      }

      return cached.value;
    },
    async listProjectMembers(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/members?${query.toString()}`
      )) as {
        members?: Array<{
          domain_id?: string;
          domain_name?: string;
          user_id: string;
          user_name?: string;
          user_num_id?: number;
          role_id?: number;
          nick_name?: string;
          role_name?: string;
          user_type?: string;
          forbidden?: number;
        }>;
        total?: number;
      };

      return {
        members: response.members ?? [],
        total: response.total
      };
    },
    async listProjectDomains(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domains?${query.toString()}`
      )) as {
        domains?: Array<{
          domain_id?: string;
          domain_name?: string;
        }>;
        total?: number;
      };

      return {
        domains: response.domains ?? [],
        total: response.total
      };
    },
    async createProjectDomain(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domain`,
        {
          domain_name: input.domain_name
        }
      )) as {
        domain_id?: string;
        domain_name?: string;
      };

      return {
        domain_id: response.domain_id,
        domain_name: response.domain_name ?? input.domain_name
      };
    },
    async updateProjectDomain(input) {
      const response = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domains/${encodeURIComponent(input.domain_id)}`,
        {
          domain_name: input.domain_name
        }
      )) as {
        domain_id?: string;
        domain_name?: string;
      };

      return {
        domain_id: response.domain_id ?? input.domain_id,
        domain_name: response.domain_name ?? input.domain_name
      };
    },
    async cancelProjectDomain(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/domains/${encodeURIComponent(input.domain_id)}`
      );

      return {
        project_id: input.project_id,
        domain_id: input.domain_id,
        cancelled: true as const
      };
    },
    async listWorkItems(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues?${query.toString()}`
      )) as {
        issues?: ReqIssueListItem[];
        work_items?: ReqIssueListItem[];
        total?: number;
      };
      const payload = unwrapReqPayload(response);
      const items: ReqIssueListItem[] = payload.issues ?? payload.work_items ?? [];

      return {
        work_items: items.map((item) => ({
          id: item.id,
          subject: item.subject ?? item.name ?? "",
          status: item.status,
          tracker_name: item.tracker_name ?? item.tracker?.name
        })),
        total: payload.total
      };
    },
    async countWorkItemTree(input) {
      const response = (await _http.post(
        `/v4/${encodeURIComponent(input.project_id)}/scrum-issue-tree-count`,
        {
          page_no: input.page,
          page_size: input.page_size,
          project_uuid: input.project_id,
          ...(input.tracker_ids?.length ? { tracker_id: input.tracker_ids.join(",") } : {})
        }
      )) as {
        result?: {
          total_count?: number;
        };
        total_count?: number;
        status?: string;
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;

      return {
        project_id: input.project_id,
        total_count: result.total_count ?? 0,
        tracker_ids: input.tracker_ids,
        page: input.page,
        page_size: input.page_size
      };
    },
    async listWorkItemTree(input) {
      const response = (await _http.post("/v5/scrum/issue-tree", {
        pageNo: input.page,
        pageSize: input.page_size,
        projectUUId: input.project_id,
        ...(input.tracker_ids?.length ? { tracker_id: input.tracker_ids.join(",") } : {})
      })) as {
        result?: {
          total_count?: number;
          issues?: ReqChildWorkItem[];
          work_items?: ReqChildWorkItem[];
        };
        total_count?: number;
        issues?: ReqChildWorkItem[];
        work_items?: ReqChildWorkItem[];
        status?: string;
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;

      return {
        project_id: input.project_id,
        page: input.page,
        page_size: input.page_size,
        tracker_ids: input.tracker_ids,
        work_items: result.issues ?? result.work_items ?? [],
        total: result.total_count
      };
    },
    async listBoardWorkItems(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.created_time_interval) {
        query.set("created_time_interval", input.created_time_interval);
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/work-items?${query.toString()}`
      )) as {
        work_items?: Array<{
          id: number | string;
          subject?: string;
          sequence?: string;
          priority?: string;
          important?: string;
          severity?: string;
          status?: {
            id?: string;
            name?: string;
          };
        }>;
        total?: number;
      };

      return {
        work_items: response.work_items ?? [],
        total: response.total
      };
    },
    async listBoardWorkItemStatusRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/work-items/status-records?${query.toString()}`
      )) as {
        records?: Array<{
          work_item_record_id?: string;
          work_item_id?: string;
          project_id?: string;
          work_item_statuses?: Array<{
            id?: string;
            status?: {
              id?: string;
              name?: string;
              type?: string;
              description?: string;
              parent_status_id?: string;
            };
          }>;
        }>;
        total?: number;
      };

      return {
        records: response.records ?? [],
        total: response.total
      };
    },
    async listBoardWorkItemWorkflowConfig(input) {
      const query = new URLSearchParams({
        board_id: input.board_id
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/work-items/workflow/config?${query.toString()}`
      )) as {
        workflows?: Array<{
          parent_name?: string;
          parent_type?: string;
          status_id?: string;
          name?: string;
          status_type?: string;
          direct_to?: Array<{
            parent_name?: string;
            parent_type?: string;
            status_id?: string;
            name?: string;
            status_type?: string;
            enabled?: boolean;
            parent_id?: string;
          }>;
          assign_to?: string;
          comment?: string;
          required_assign?: boolean;
          required_notes?: boolean;
          field_type?: boolean;
          parent_id?: string;
        }>;
      };

      return {
        workflows: response.workflows ?? []
      };
    },
    async listJobCacheBoards(input) {
      const query = new URLSearchParams({
        type: input.type ?? "board"
      });

      if (input.region) {
        query.set("region", input.region);
      }

      const response = (await _http.get(
        `/v3/projects/${encodeURIComponent(input.project_id)}/jobcache/board?${query.toString()}`
      )) as {
        result?: {
          id?: number;
          fields?: Array<{
            id?: string;
            header?: string;
            type?: string;
            show?: string | boolean;
          }>;
        };
      };
      const payload = response.result ?? {};

      return {
        cache_id: payload.id,
        fields: payload.fields ?? []
      };
    },
    async getWorkItem(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`
      )) as {
        id?: number | string;
        subject?: string;
        name?: string;
        status?: { name?: string };
        tracker?: { name?: string };
        tracker_name?: string;
        description?: string;
        start_date?: string | number;
        due_date?: string | number;
        begin_time?: string | number;
        end_time?: string | number;
      };

      return {
        id: response.id ?? input.work_item_id,
        subject: response.subject ?? response.name ?? "",
        status: response.status,
        tracker_name: response.tracker_name ?? response.tracker?.name,
        description: response.description,
        start_date: response.start_date ?? response.begin_time,
        due_date: response.due_date ?? response.end_time
      };
    },
    async getWorkItemIssueDetails(input) {
      const query = new URLSearchParams({
        issue_id: input.work_item_id,
        project_uuid: input.project_id,
        include: input.include
      });
      const response = (await _http.get(`/v2/issues/show?${query.toString()}`)) as {
        result?: {
          issue?: ReqWorkItemIssueDetails;
        };
        issue?: ReqWorkItemIssueDetails;
      };
      const issue = response.result?.issue ?? response.issue;
      const { developer: _developer, ...issueWithoutTransientDeveloper } = issue ?? {};

      return {
        ...issueWithoutTransientDeveloper,
        id: String(issue?.id ?? input.work_item_id)
      };
    },
    async getWorkItemIndexCounts(input) {
      const query = new URLSearchParams({
        issue_id: input.work_item_id,
        project_uuid: input.project_id
      });
      const response = (await _http.get(
        `/v3/workitem/scrum/index-count?${query.toString()}`
      )) as {
        result?: {
          related_issue_count?: number;
          related_wiki_count?: number;
          related_test_case_count?: number;
          related_test_plan_count?: number;
          code_commit_count?: number;
          code_branch_count?: number;
          code_mergerequest_count?: number;
        };
        status?: string;
      };
      const payload = unwrapReqPayload(response);
      const result = (payload.result ?? payload) as {
        related_issue_count?: number;
        related_wiki_count?: number;
        related_test_case_count?: number;
        related_test_plan_count?: number;
        code_commit_count?: number;
        code_branch_count?: number;
        code_mergerequest_count?: number;
      };

      return {
        project_id: input.project_id,
        work_item_id: input.work_item_id,
        related_issue_count: result.related_issue_count,
        related_wiki_count: result.related_wiki_count,
        related_test_case_count: result.related_test_case_count,
        related_test_plan_count: result.related_test_plan_count,
        code_commit_count: result.code_commit_count,
        code_branch_count: result.code_branch_count,
        code_mergerequest_count: result.code_mergerequest_count
      };
    },
    async getWorkItemCompletionRate(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue-completion-rate`
      )) as {
        issue_completion_rates?: ReqIssueCompletionRate[];
        total?: number;
      };

      return {
        project_id: input.project_id,
        total: response.total,
        issue_completion_rates: response.issue_completion_rates ?? []
      };
    },
    async getProjectDueDaysAfter(input) {
      const query = new URLSearchParams({
        project_id: input.project_id
      });
      const response = (await _http.get(
        `/v4/project/project-configs/after?${query.toString()}`
      )) as {
        date_after?: number;
      };

      return {
        project_id: input.project_id,
        date_after: response.date_after
      };
    },
    async getProjectWorkhourConfig(input) {
      const query = new URLSearchParams({
        project_id: input.project_id
      });
      const response = (await _http.get(
        `/v4/project/project-configs/workhour-config?${query.toString()}`
      )) as {
        workhour_type_required?: boolean;
        workhour_readonly_mode?: boolean;
      };

      return {
        project_id: input.project_id,
        workhour_type_required: response.workhour_type_required,
        workhour_readonly_mode: response.workhour_readonly_mode
      };
    },
    async listProjectWorkHourTypes(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        limit: String(input.page_size),
        offset: String(offset)
      });

      if (typeof input.status !== "undefined") {
        query.set("status", String(input.status));
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/work-hours-type?${query.toString()}`
      )) as {
        total?: number;
        work_hours_types?: Array<{
          id?: number;
          name?: string;
          status?: number;
        }>;
      };

      return {
        total: response.total,
        work_hours_types: response.work_hours_types ?? []
      };
    },
    async listWorkItemTags(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size),
        project_uuid: input.project_id
      });

      if (input.name) {
        query.set("name", input.name);
      }

      const response = (await _http.get(`/v2/issues/query-tags?${query.toString()}`)) as {
        result?: {
          tags?: ReqIssueTag[];
        };
        tags?: ReqIssueTag[];
        status?: string;
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;
      const tags = result.tags ?? [];

      return {
        tags,
        total: tags.length
      };
    },
    async listChildWorkItems(input) {
      const response = (await _http.post("/v2/issues/child-issue-list", {
        parent_id: toOptionalNumericId(input.parent_id),
        project_uuid: input.project_id,
        ...(typeof input.subject !== "undefined" ? { subject: input.subject } : {}),
        query_type: input.query_type,
        page_no: input.page,
        page_size: input.page_size
      })) as {
        result?: {
          total_count?: number;
          issues?: ReqChildWorkItem[];
          work_items?: ReqChildWorkItem[];
        };
        total_count?: number;
        issues?: ReqChildWorkItem[];
        work_items?: ReqChildWorkItem[];
        status?: string;
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;

      return {
        work_items: result.issues ?? result.work_items ?? [],
        total: result.total_count
      };
    },
    async listWorkItemRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size),
        journalizedType: input.journalized_type ?? "Issue"
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue/${encodeURIComponent(input.work_item_id)}/records?${query.toString()}`
      )) as {
        records?: Array<{
          id: number | string;
          created_time?: string;
          user?: {
            user_id?: string;
            user_name?: string;
            user_num_id?: number;
            nick_name?: string;
          };
          details?: Array<{
            id: number | string;
            name?: string;
            new_value?: string;
            old_value?: string;
            operation?: string;
            property?: string;
          }>;
        }>;
        total?: number;
      };

      return {
        records: response.records ?? [],
        total: response.total
      };
    },
    async listProjectWorkItemRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.operated_time_interval) {
        query.set("operated_time_interval", input.operated_time_interval);
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/records?${query.toString()}`
      )) as {
        records?: ReqProjectIssueRecord[];
        total?: number;
      };

      return {
        records: response.records ?? [],
        total: response.total
      };
    },
    async listWorkItemComments(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/comments?${query.toString()}`
      )) as {
        comments?: Array<{
          id: number | string;
          comment?: string;
          created_time?: string;
          timestamp?: number;
          user?: {
            nick_name?: string;
            user_name?: string;
            user_num_id?: number;
          };
        }>;
        total?: number;
      };

      return {
        comments: response.comments ?? [],
        total: response.total
      };
    },
    async downloadImageFile(input) {
      const query = new URLSearchParams({
        image_uri: input.image_uri
      });
      const response = await _http.getBinary(
        `/v4/projects/${encodeURIComponent(input.project_id)}/image-file?${query.toString()}`
      );

      return {
        image_uri: input.image_uri,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async downloadAttachment(input) {
      const response = await _http.getBinary(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/attachments/${encodeURIComponent(input.attachment_id)}`
      );

      return {
        project_id: input.project_id,
        work_item_id: input.work_item_id,
        attachment_id: input.attachment_id,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async listWorkItemWorkHours(input) {
      const response = (await _http.get(
        `/v3/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/work-hours`
      )) as {
        result?: {
          total?: number;
          data?: Array<{
            id: number | string;
            issue_id?: number | string;
            user_id?: string;
            user_num_id?: number;
            user_name?: string;
            nick_name?: string;
            work_date?: string;
            work_date_timestamp?: string | number;
            work_hours?: string | number;
            region?: string;
          }>;
        };
        total?: number;
        data?: Array<{
          id: number | string;
          issue_id?: number | string;
          user_id?: string;
          user_num_id?: number;
          user_name?: string;
          nick_name?: string;
          work_date?: string;
          work_date_timestamp?: string | number;
          work_hours?: string | number;
          region?: string;
        }>;
      };
      const result = (response.result ?? response) as {
        data?: Array<{
          id: number | string;
          issue_id?: number | string;
          user_id?: string;
          user_num_id?: number;
          user_name?: string;
          nick_name?: string;
          work_date?: string;
          work_date_timestamp?: string | number;
          work_hours?: string | number;
          region?: string;
        }>;
        total?: number;
      };

      return {
        work_hours: result.data ?? [],
        total: result.total
      };
    },
    async listProjectWorkHours(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post("/v4/projects/work-hours", {
        offset,
        limit: input.page_size,
        project_ids: input.project_ids,
        ...(input.begin_time ? { begin_time: input.begin_time } : {}),
        ...(input.end_time ? { end_time: input.end_time } : {}),
        ...(input.work_hours_dates ? { work_hours_dates: input.work_hours_dates } : {}),
        ...(input.work_hours_types ? { work_hours_types: input.work_hours_types } : {})
      })) as {
        result?: {
          total?: number;
          work_hours?: Array<{
            issue_id?: number | string;
            issue_type?: string;
            subject?: string;
            project_name?: string;
            user_id?: string;
            user_name?: string;
            nick_name?: string;
            work_date?: string;
            work_hours_num?: string | number;
            summary?: string;
          }>;
        };
        total?: number;
        work_hours?: Array<{
          issue_id?: number | string;
          issue_type?: string;
          subject?: string;
          project_name?: string;
          user_id?: string;
          user_name?: string;
          nick_name?: string;
          work_date?: string;
          work_hours_num?: string | number;
          summary?: string;
        }>;
      };
      const result = (response.result ?? response) as {
        work_hours?: Array<{
          issue_id?: number | string;
          issue_type?: string;
          subject?: string;
          project_name?: string;
          user_id?: string;
          user_name?: string;
          nick_name?: string;
          work_date?: string;
          work_hours_num?: string | number;
          summary?: string;
        }>;
        total?: number;
      };

      return {
        work_hours: result.work_hours ?? [],
        total: result.total
      };
    },
    async listAssociatedIssues(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        issue_id: input.work_item_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      const response = (await _http.get(`/v2/issues/inquire-associate?${query.toString()}`)) as {
        result?: {
          associateIssues?: {
            issues?: Array<{
              id: number | string;
              subject?: string;
              status_id?: number;
              status_name?: string;
              new_status_name?: string;
              status_attribute_name?: string;
              project_name?: string;
              identifier?: string;
              assigned_to?: {
                assigned_user_id?: string;
                assigned_user_num_id?: number;
                assigned_nick_name?: string;
                name?: string;
              };
            }>;
            total_count?: number;
          };
        };
      };
      const associatedIssues = response.result?.associateIssues;

      return {
        issues: associatedIssues?.issues ?? [],
        total: associatedIssues?.total_count
      };
    },
    async listAssociatedCommits(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        type: input.type ?? "commit",
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/associated-commits?${query.toString()}`
      )) as {
        commits?: Array<{
          branch_name?: string;
          commit_id?: string;
          commit_msg?: string;
          commit_short_id?: string;
          commit_url?: string;
          create_date?: string;
          repository_id?: string;
          type?: string;
          update_date?: string;
          user?: {
            nick_name?: string;
            user_id?: string;
          };
        }>;
        total?: number;
      };

      return {
        commits: response.commits ?? [],
        total: response.total
      };
    },
    async listAssociatedTestCases(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/associate-test-cases`
      )) as {
        test_cases?: Array<{
          case_id: number | string;
          case_level?: string;
          case_name?: string;
          case_num?: string;
          created_time?: number;
          creator?: {
            nick_name?: string;
            user_id?: string;
            user_name?: string;
            user_num_id?: number;
          };
          owner?: {
            nick_name?: string;
            user_id?: string;
            user_name?: string;
            user_num_id?: number;
          };
          project?: {
            project_id?: string;
            project_name?: string;
          };
          status?: {
            id?: string;
            name?: string;
          };
          type?: string;
        }>;
        total?: number;
      };
      const items = response.test_cases ?? [];
      const total = response.total ?? items.length;
      const offset = (input.page - 1) * input.page_size;

      return {
        test_cases: items.slice(offset, offset + input.page_size),
        total
      };
    },
    async listAssociatedWikis(input) {
      const query = new URLSearchParams({
        limit: String(input.page_size),
        offset: String((input.page - 1) * input.page_size)
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/associated-wikis?${query.toString()}`
      )) as {
        wikis?: Array<{
          issue_id?: number | string;
          wiki_title?: string;
          wiki_author?: {
            user_num_id?: number;
            user_id?: string;
            user_name?: string;
            nick_name?: string;
          };
          project?: {
            project_id?: string;
            project_name?: string;
          };
          created_date?: string;
          wiki_id?: string;
          region?: string;
        }>;
        total?: number | string;
      };

      return {
        wikis: response.wikis ?? [],
        total: typeof response.total === "number" ? response.total : response.wikis?.length
      };
    },
    async listRelatedUsers(input) {
      const primaryPath = `/v1/related-user/${encodeURIComponent(input.project_id)}/all`;
      const fallbackPath = `/v1/related_user/${encodeURIComponent(input.project_id)}/all`;
      let response:
        | {
            result?: {
              related_author_list?: Array<{
                user_name?: string;
                user_num_id?: number;
                user_id?: string;
                domain_id?: string;
                domain_name?: string;
                nick_name_py?: string;
              }>;
              related_assignee_list?: Array<{
                user_name?: string;
                user_num_id?: number;
                user_id?: string;
                domain_id?: string;
                domain_name?: string;
                nick_name_py?: string;
              }>;
              related_developer_list?: Array<{
                user_name?: string;
                user_num_id?: number;
                user_id?: string;
                domain_id?: string;
                domain_name?: string;
                nick_name_py?: string;
              }>;
            };
            related_author_list?: Array<{
              user_name?: string;
              user_num_id?: number;
              user_id?: string;
              domain_id?: string;
              domain_name?: string;
              nick_name_py?: string;
            }>;
            related_assignee_list?: Array<{
              user_name?: string;
              user_num_id?: number;
              user_id?: string;
              domain_id?: string;
              domain_name?: string;
              nick_name_py?: string;
            }>;
            related_developer_list?: Array<{
              user_name?: string;
              user_num_id?: number;
              user_id?: string;
              domain_id?: string;
              domain_name?: string;
              nick_name_py?: string;
            }>;
          }
        | undefined;

      try {
        response = (await _http.get(primaryPath)) as typeof response;
      } catch (error) {
        if (!isNotFoundError(error)) {
          throw error;
        }

        response = (await _http.get(fallbackPath)) as typeof response;
      }

      const payload = response?.result ?? response ?? {};

      return {
        project_id: input.project_id,
        related_author_list: payload.related_author_list ?? [],
        related_assignee_list: payload.related_assignee_list ?? [],
        related_developer_list: payload.related_developer_list ?? []
      };
    },
    async listWorkItemStatusAttributes(input) {
      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/issue-status-attributes`
      )) as {
        issue_status_attributes?: Array<{
          name?: string;
          type?: string;
          project_id?: string;
        }>;
        total?: number;
      };

      return {
        issue_status_attributes: response.issue_status_attributes ?? [],
        total: response.total
      };
    },
    async listWorkItemStatuses(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/statuses`
      )) as {
        issue_statuses?: Array<{
          id?: string;
          status_id?: number;
          name?: string;
          tracker_ids?: number[];
          status_attribute?: {
            id?: number;
            name?: string;
          };
        }>;
        total?: number;
      };

      return {
        issue_statuses: response.issue_statuses ?? [],
        total: response.total
      };
    },
    async checkWorkItemStatusName(input) {
      const response = (await _http.post("/v2/issue-status/check-name", {
        projectUUId: input.project_id,
        definedName: input.status_name
      })) as {
        result?: {
          exist?: boolean;
        };
        exist?: boolean;
      };

      return {
        exist: response.result?.exist ?? response.exist ?? false
      };
    },
    async createProjectStatusConfig(input) {
      return (await _http.post("/v2/issue-status/project-status-config", {
        projectUUId: input.project_id,
        definedName: input.defined_name,
        description: input.description,
        statusAttribute: input.status_attribute
      })) as {
        status?: string;
        result?: {
          id?: string;
          statusId?: number;
          definedName?: string;
          position?: number;
          flag?: number;
          projectUUId?: string;
          description?: string;
          statusAttribute?: number;
        };
      };
    },
    async batchCreateTrackerConfig(input) {
      return (await _http.post("/v2/issue-status/batch-tracker-config", {
        projectUUId: input.project_id,
        trackerId: String(input.tracker_id),
        ids: input.status_config_ids
      })) as {
        status?: string;
        result?: {
          issueStatusConfigs?: Array<{
            trackerList?: number[];
            id?: string;
            statusId?: number;
            definedName?: string;
            description?: string;
            position?: number;
            flag?: number;
            is_closed?: boolean;
            is_initial?: boolean;
            statusAttribute?: number;
            statusAttributeName?: string;
            issueStatusAttribute?: {
              id?: number | string;
              name?: string;
              type?: string;
            };
            trackerId?: number;
          }>;
        };
      };
    },
    async updateTrackerConfig(input) {
      return (await _http.post("/v2/issue-status/update-tracker-config", {
        trackerId: String(input.tracker_id),
        id: input.status_config_id,
        newPosition: input.new_position,
        projectUUId: input.project_id
      })) as {
        status?: string;
      };
    },
    async listWorkItemStatusDetails(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        tracker_id: String(input.tracker_id)
      });
      const response = (await _http.get(`/v2/issue-status/all?${query.toString()}`)) as {
        result?: {
          issue_statuses?: Array<{
            id?: number;
            status_id?: string;
            name?: string;
            is_closed?: number;
            position?: number;
            default_done_ratio?: number;
            is_initial?: number;
            issue_field_configs?: Array<{
              custom?: boolean;
              default_option?: Array<{ id?: string; name?: string }>;
              default_options?: Array<{ id?: string; name?: string }>;
              default_value?: string;
              field?: string;
              field_type?: string;
              is_required?: number;
              is_visible?: boolean;
              last?: boolean;
              name?: string;
              option?: Array<{ id?: string; name?: string }>;
              options?: string;
              position?: number;
              project_id?: string;
              tracker_list?: number[];
              type_options?: string;
            }>;
            flag?: number;
            status_attribute?: number;
            issue_status_attribute?: {
              project_id?: string;
              name?: string;
              type?: string;
            };
          }>;
          [key: string]:
            | Array<{
                id?: number;
                status_id?: string;
                name?: string;
                is_closed?: number;
                position?: number;
                default_done_ratio?: number;
                is_initial?: number;
                issue_field_configs?: Array<{
                  custom?: boolean;
                  default_option?: Array<{ id?: string; name?: string }>;
                  default_options?: Array<{ id?: string; name?: string }>;
                  default_value?: string;
                  field?: string;
                  field_type?: string;
                  is_required?: number;
                  is_visible?: boolean;
                  last?: boolean;
                  name?: string;
                  option?: Array<{ id?: string; name?: string }>;
                  options?: string;
                  position?: number;
                  project_id?: string;
                  tracker_list?: number[];
                  type_options?: string;
                }>;
                flag?: number;
                status_attribute?: number;
                issue_status_attribute?: {
                  project_id?: string;
                  name?: string;
                  type?: string;
                };
              }>
            | undefined;
        };
      };
      const payload = response.result ?? {};
      const groupedStatuses = Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => key !== "issue_statuses" && Array.isArray(value))
      ) as Record<
        string,
        Array<{
          id?: number;
          status_id?: string;
          name?: string;
          is_closed?: number;
          position?: number;
          default_done_ratio?: number;
          is_initial?: number;
          issue_field_configs?: Array<{
            custom?: boolean;
            default_option?: Array<{ id?: string; name?: string }>;
            default_options?: Array<{ id?: string; name?: string }>;
            default_value?: string;
            field?: string;
            field_type?: string;
            is_required?: number;
            is_visible?: boolean;
            last?: boolean;
            name?: string;
            option?: Array<{ id?: string; name?: string }>;
            options?: string;
            position?: number;
            project_id?: string;
            tracker_list?: number[];
            type_options?: string;
          }>;
          flag?: number;
          status_attribute?: number;
          issue_status_attribute?: {
            project_id?: string;
            name?: string;
            type?: string;
          };
        }>
      >;

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        grouped_statuses: groupedStatuses,
        issue_statuses: payload.issue_statuses ?? []
      };
    },
    async listWorkItemStatusConfigs(input) {
      const query = new URLSearchParams({
        projectUUId: input.project_id,
        trackerId: String(input.tracker_id)
      });
      const response = (await _http.get(
        `/v3/issue-status/issue-status-config?${query.toString()}`
      )) as {
        result?: {
          issueStatus?: Array<{
            trackerList?: number[];
            id?: string;
            statusId?: number;
            definedName?: string;
            description?: string;
            position?: number;
            flag?: number;
            is_closed?: boolean;
            is_initial?: boolean;
            statusAttribute?: number;
            statusAttributeName?: string;
            issueStatusAttribute?: {
              id?: number | string;
              name?: string;
              type?: string;
            };
            trackerId?: number;
          }>;
          workitem_readonly_mode?: boolean;
        };
      };
      const payload = response.result ?? {};

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        issue_statuses: payload.issueStatus ?? [],
        workitem_readonly_mode: payload.workitem_readonly_mode
      };
    },
    async listOptionalWorkItemStatusConfigs(input) {
      const query = new URLSearchParams({
        projectUUId: input.project_id,
        trackerId: String(input.tracker_id)
      });
      const response = (await _http.get(
        `/v2/issue-status/optional-status-config?${query.toString()}`
      )) as {
        result?: {
          issueStatus?: Array<{
            trackerList?: number[];
            id?: string;
            statusId?: number;
            definedName?: string;
            description?: string;
            position?: number;
            flag?: number;
            is_closed?: boolean;
            is_initial?: boolean;
            statusAttribute?: number;
            statusAttributeName?: string;
            issueStatusAttribute?: {
              id?: number | string;
              name?: string;
              type?: string;
            };
            trackerId?: number;
          }>;
        };
      };
      const payload = response.result ?? {};

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        issue_statuses: payload.issueStatus ?? []
      };
    },
    async getProjectPublicConfig(input) {
      const response = (await _http.get(
        `/v4/project/${encodeURIComponent(input.project_id)}/public-configs`
      )) as {
        closed_workitem_readonly_mode?: boolean;
      };

      return {
        project_id: input.project_id,
        closed_workitem_readonly_mode: response.closed_workitem_readonly_mode
      };
    },
    async listWorkItemWorkflowConfig(input) {
      const query = new URLSearchParams({
        tracker_id: String(input.tracker_id)
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/workflow/config?${query.toString()}`
      )) as {
        workflows?: Array<{
          id?: string;
          name?: string;
          status_id?: number;
          direct_to?: Array<{
            enabled?: boolean;
            id?: string;
            name?: string;
            status_id?: number;
          }>;
        }>;
      };

      return {
        workflows: response.workflows ?? []
      };
    },
    async listWorkItemTemplates(input) {
      const query = new URLSearchParams();

      if (typeof input.tracker_id !== "undefined") {
        query.set("tracker_id", String(input.tracker_id));
      }

      const suffix = query.size ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/templates${suffix}`
      )) as {
        templates?: Array<{
          id?: number | string;
          project_id?: number | string;
          tracker_id?: number;
          description?: string;
          issue_field_config?: string;
        }>;
      };

      return {
        templates: response.templates ?? []
      };
    },
    async createWorkItemTemplate(input) {
      const response = (await _http.post("/v2/project/templates", {
        projectUUId: input.project_id,
        trackerId: input.tracker_id,
        ...(typeof input.description !== "undefined" ? { description: input.description } : {}),
        ...(input.issue_field_configs ? { issueFieldConfigs: input.issue_field_configs } : {})
      })) as {
        result?: Record<string, unknown>;
        status?: string;
      };

      assertReqMutationSucceeded("create work item template", response.status);

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        description: input.description,
        issue_field_configs: input.issue_field_configs ?? [],
        status: response.status
      };
    },
    async deleteProjectTemplate(input) {
      return (await _http.delete(
        `/v4/projects/templates/${encodeURIComponent(input.template_id)}`
      )) as {
        id?: number | string;
        name?: string;
        sourceId?: string;
        sourceName?: string;
        description?: string | null;
        identifier?: string;
        authorId?: number;
        domainId?: string;
        type?: string | null;
        isPublic?: number;
      };
    },
    async updateProjectTemplate(input) {
      const body: {
        name?: string;
        description?: string;
      } = {};

      if (typeof input.name !== "undefined") {
        body.name = input.name;
      }

      if (typeof input.description !== "undefined") {
        body.description = input.description;
      }

      const response = (await _http.put(
        `/v4/projects/templates/${encodeURIComponent(input.template_id)}`,
        body
      )) as {
        project_template?: {
          id?: number | string;
          name?: string;
          type?: string | null;
        };
      };
      const projectTemplate = response.project_template ?? {};

      return {
        id: projectTemplate.id ?? input.template_id,
        name: projectTemplate.name,
        type: projectTemplate.type
      };
    },
    async getWorkItemTemplateConfig(input) {
      const query = new URLSearchParams({
        projectUUId: input.project_id,
        trackerId: String(input.tracker_id)
      });
      const response = (await _http.get(`/v2/template/config?${query.toString()}`)) as {
        result?: {
          templates?: Array<{
            id?: number | string;
            name?: string;
            description?: string;
            issue_field_configs?: Array<{
              field?: string;
              name?: string;
              field_type?: string;
              type_options?: unknown;
              default_value?: unknown;
              is_visible?: boolean;
              is_required?: boolean;
              position?: number;
              tracker_list?: number[];
              option?: unknown;
              default_option?: unknown;
              default_options?: unknown[];
            }>;
          }>;
        };
        templates?: Array<{
          id?: number | string;
          name?: string;
          description?: string;
          issue_field_configs?: Array<{
            field?: string;
            name?: string;
            field_type?: string;
            type_options?: unknown;
            default_value?: unknown;
            is_visible?: boolean;
            is_required?: boolean;
            position?: number;
            tracker_list?: number[];
            option?: unknown;
            default_option?: unknown;
            default_options?: unknown[];
          }>;
        }>;
      };
      const payload = response.result ?? response;

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        templates: payload.templates ?? []
      };
    },
    async listWorkItemCustomFields(input) {
      const query = new URLSearchParams({
        project_id: input.project_id
      });

      if (typeof input.tracker_id !== "undefined") {
        query.set("tracker_id", String(input.tracker_id));
      }

      const response = (await _http.get(
        `/v2/custom-field/query-custom-field?${query.toString()}`
      )) as {
        result?: {
          custom_field?: Array<{
            tracker_list?: string[];
            region?: string;
            id?: number | string;
            project_id?: number | string;
            tracker_id?: number;
            custom_field?: string;
            type?: string;
            name?: string;
            sort?: number;
            memo?: string;
            created?: string;
            modified?: string;
            is_delete?: boolean;
          }>;
        };
        custom_field?: Array<{
          tracker_list?: string[];
          region?: string;
          id?: number | string;
          project_id?: number | string;
          tracker_id?: number;
          custom_field?: string;
          type?: string;
          name?: string;
          sort?: number;
          memo?: string;
          created?: string;
          modified?: string;
          is_delete?: boolean;
        }>;
      };
      const payload = response.result ?? response;

      return {
        custom_field: payload.custom_field ?? []
      };
    },
    async getWorkItemStatusRuleFlag(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        tracker_id: String(input.tracker_id)
      });
      const response = (await _http.get(
        `/v2/issue-status/status-rule-flag?${query.toString()}`
      )) as {
        result?: {
          statusRuleFlag?: {
            tracker_config_id?: string | number;
            trackerConfigId?: string | number;
            issue_field_config?: boolean;
            issueFieldConfig?: boolean;
            code_commit?: boolean;
            codeCommit?: boolean;
          };
        };
        status_rule_flag?: {
          tracker_config_id?: string | number;
          trackerConfigId?: string | number;
          issue_field_config?: boolean;
          issueFieldConfig?: boolean;
          code_commit?: boolean;
          codeCommit?: boolean;
        };
      };
      const rawFlag: {
        tracker_config_id?: string | number;
        trackerConfigId?: string | number;
        issue_field_config?: boolean;
        issueFieldConfig?: boolean;
        code_commit?: boolean;
        codeCommit?: boolean;
      } = response.result?.statusRuleFlag ?? response.status_rule_flag ?? {};

      return {
        project_id: input.project_id,
        tracker_id: input.tracker_id,
        status_rule_flag: {
          tracker_config_id: rawFlag.tracker_config_id ?? rawFlag.trackerConfigId,
          issue_field_config: rawFlag.issue_field_config ?? rawFlag.issueFieldConfig,
          code_commit: rawFlag.code_commit ?? rawFlag.codeCommit
        }
      };
    },
    async listWorkItemTrackerHandlers(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        tracker_id: String(input.tracker_id)
      });
      const response = (await _http.get(
        `/v4/issue-status/tracker-handler-config?${query.toString()}`
      )) as {
        tracker_handlers?: Array<{
          handler_id?: number;
          handler_name?: string;
        }>;
      };

      return {
        tracker_handlers: response.tracker_handlers ?? []
      };
    },
    async listCacheData(input) {
      const response = (await _http.post("/v3/job-cache/list-cache", {
        ...(input.project_id ? { projectUUId: input.project_id } : {}),
        type: input.type ?? "backlog"
      })) as {
        result?: {
          fields?: Array<{
            trackerList?: number[];
            name?: string;
            field?: string;
            isCustom?: boolean;
            option?: Array<{
              id?: string;
              name?: string;
            }>;
            option_source?: string;
            type?: string;
            required?: boolean | number;
            fieldGroup?: string;
            sortable?: boolean;
            priorityOption?: Array<{
              id?: string;
              name?: string;
            }>;
            severityOption?: Array<{
              id?: string;
              name?: string;
            }>;
            trackerOption?: Array<{
              id?: string;
              name?: string;
            }>;
            doneRatioOption?: Array<{
              id?: string;
              name?: string;
            }>;
          }>;
          visibleFields?: Array<{
            trackerList?: number[];
            name?: string;
            field?: string;
            isCustom?: boolean;
            option?: Array<{
              id?: string;
              name?: string;
            }>;
            option_source?: string;
            type?: string;
            required?: boolean | number;
            fieldGroup?: string;
            sortable?: boolean;
            priorityOption?: Array<{
              id?: string;
              name?: string;
            }>;
            severityOption?: Array<{
              id?: string;
              name?: string;
            }>;
            trackerOption?: Array<{
              id?: string;
              name?: string;
            }>;
            doneRatioOption?: Array<{
              id?: string;
              name?: string;
            }>;
          }>;
        };
      };
      const payload = response.result ?? {};

      return {
        project_id: input.project_id,
        type: input.type ?? "backlog",
        fields: payload.fields ?? [],
        visible_fields: payload.visibleFields ?? []
      };
    },
    async updateCacheData(input) {
      const response = (await _http.post("/v3/job-cache/update-cache", {
        projectUUId: input.project_id,
        type: input.type ?? "backlog",
        ...(input.region ? { region: input.region } : {}),
        ...(typeof input.cache_id !== "undefined" ? { cacheId: input.cache_id } : {}),
        ...(input.visible_fields ? { visibleFields: input.visible_fields } : {}),
        ...(input.fields ? { fields: input.fields } : {})
      })) as {
        result?: {
          cache_id?: number;
          id?: number;
          updated_count?: number;
          fields?: ReqCacheUpdateField[];
        };
        cache_id?: number;
        id?: number;
        updated_count?: number;
        fields?: ReqCacheUpdateField[];
      };
      const payload = unwrapReqPayload(response);
      const result = payload.result ?? payload;

      return {
        project_id: input.project_id,
        type: input.type ?? "backlog",
        region: input.region,
        cache_id: result.cache_id ?? result.id ?? input.cache_id,
        updated_count: result.updated_count,
        fields: result.fields ?? []
      };
    },
    async listPrograms(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });

      if (input.search) {
        query.set("search", input.search);
      }
      if (input.sort_key) {
        query.set("sort_key", input.sort_key);
      }
      if (input.sort_dir) {
        query.set("sort_dir", input.sort_dir.toUpperCase());
      }
      if (typeof input.is_watched !== "undefined") {
        query.set("is_watched", String(input.is_watched));
      }

      const response = (await _http.get(`/v4/programs?${query.toString()}`)) as {
        programs?: ReqProgramItem[];
        total?: number;
      };

      return {
        programs: response.programs ?? [],
        total: response.total
      };
    },
    async listProgramFields(input) {
      const query = new URLSearchParams({
        field_type: input.field_type
      });
      const response = (await _http.get(
        `/v4/programs/${encodeURIComponent(input.program_id)}/fields?${query.toString()}`
      )) as {
        fields?: ReqProgramField[];
      };

      return {
        fields: response.fields ?? []
      };
    },
    async getIr(input) {
      return (await _http.get(
        `/v4/programs/${encodeURIComponent(input.program_id)}/irs/${encodeURIComponent(input.ir_id)}`
      )) as ReqRequirementPoolItem;
    },
    async listIrChildren(input) {
      const query = new URLSearchParams({
        query_type: input.query_type,
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/programs/${encodeURIComponent(input.program_id)}/irs/${encodeURIComponent(input.ir_id)}/children?${query.toString()}`
      )) as {
        irs?: ReqRequirementPoolItem[];
        items?: ReqRequirementPoolItem[];
        total?: number;
      };

      return {
        items: response.irs ?? response.items ?? [],
        total: response.total
      };
    },
    async listIrHistories(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/irs/${encodeURIComponent(input.ir_id)}/histories?${query.toString()}`
      )) as {
        histories?: ReqRequirementHistory[];
        total?: number;
      };

      return {
        histories: response.histories ?? [],
        total: response.total
      };
    },
    async listRrStatuses(input) {
      const response = (await _http.post(
        `/v4/programs/${encodeURIComponent(input.program_id)}/rr-status`,
        {
          rr_ids: input.rr_ids
        }
      )) as {
        rr_status_list?: ReqRrStatusItem[];
      };

      return {
        rr_status_list: response.rr_status_list ?? []
      };
    },
    async listRrs(input) {
      const query = new URLSearchParams({
        query_type: input.query_type,
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });

      if (typeof input.include_deleted !== "undefined") {
        query.set("include_deleted", String(input.include_deleted));
      }
      if (input.updated_time_interval) {
        query.set("updated_time_interval", input.updated_time_interval);
      }

      const response = (await _http.get(
        `/v4/programs/${encodeURIComponent(input.program_id)}/rrs?${query.toString()}`
      )) as {
        rrs?: ReqRequirementPoolItem[];
        total?: number;
      };

      return {
        rrs: response.rrs ?? [],
        total: response.total
      };
    },
    async listRrHistories(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v4/rrs/${encodeURIComponent(input.rr_id)}/histories?${query.toString()}`
      )) as {
        histories?: ReqRequirementHistory[];
        total?: number;
      };

      return {
        histories: response.histories ?? [],
        total: response.total
      };
    },
    async listIssueSeverities() {
      const response = (await _http.get("/v2/issue-severity/all")) as {
        result?: {
          severities?: ReqIssueSeverity[];
        };
        severities?: ReqIssueSeverity[];
      };

      return {
        severities: response.result?.severities ?? response.severities ?? []
      };
    },
    async listIpdProjects(input) {
      const query = new URLSearchParams();
      if (typeof input.search !== "undefined") {
        query.set("search", input.search);
      }
      const model = input.model ?? input.model_id;
      if (model) {
        query.set("model", model);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(`/v1/ipdprojectservice/projects/ipd${suffix}`)) as {
        result?: ReqIpdProject[];
      };

      return {
        projects: response.result ?? []
      };
    },
    async listIpdProjectUsers(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/users`
      )) as {
        result?: ReqIpdUser[];
        users?: ReqIpdUser[];
      };

      return {
        users: response.result ?? response.users ?? []
      };
    },
    async getIpdIssue(input) {
      const version = input.version === "v1" ? "v1" : "v2";
      const response = (await _http.get(
        `/${version}/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.issue_id)}`
      )) as {
        result?: ReqIpdIssue;
      } & ReqIpdIssue;

      return response.result ?? response;
    },
    async listIpdChangeReviewIssueApprovers(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/review/issues/${encodeURIComponent(input.issue_id)}/approvers`
      )) as {
        result?: { data?: ReqIpdUser[]; users?: ReqIpdUser[]; total?: number };
        data?: ReqIpdUser[];
        users?: ReqIpdUser[];
        total?: number;
      };
      const result = response.result ?? response;

      return {
        users: result.data ?? result.users ?? [],
        total: result.total
      };
    },
    async listIpdIssues(input) {
      const query = new URLSearchParams({
        issue_type: input.issue_type
      });
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/query?${query.toString()}`,
        {
          ...(input.filter ? { filter: input.filter } : {}),
          filter_mode: input.filter_mode,
          page: {
            page_num: input.page,
            page_size: input.page_size
          }
        }
      )) as {
        result?: {
          data?: ReqIpdIssue[];
          issues?: ReqIpdIssue[];
          total?: number;
        };
        data?: ReqIpdIssue[];
        issues?: ReqIpdIssue[];
        total?: number;
      };
      const result = (response.result ?? response) as {
        data?: ReqIpdIssue[];
        issues?: ReqIpdIssue[];
        total?: number;
      };

      return {
        issues: result.issues ?? result.data ?? [],
        total: result.total
      };
    },
    async listIpdIssueTree(input) {
      const query = new URLSearchParams({ category: input.category });
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/tree?${query.toString()}`,
        {
          ...(input.keyword ? { keyword: input.keyword } : {}),
          ...(input.number ? { number: input.number } : {}),
          ...(input.plan ? { plan: input.plan } : {}),
          ...(input.modified_date ? { modified_date: input.modified_date } : {}),
          offset: (input.page - 1) * input.page_size,
          limit: input.page_size
        }
      )) as {
        result?: { issues?: ReqIpdIssue[]; total?: number };
      };

      return {
        issues: response.result?.issues ?? [],
        total: response.result?.total
      };
    },
    async listIpdAttachedWikis(input) {
      const query = new URLSearchParams({ issue_id: input.issue_id });
      if (input.category) {
        query.set("category", input.category);
      }
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issue/get-attached-wikis?${query.toString()}`
      )) as {
        data?: ReqIpdWiki[];
        total?: number;
      };

      return {
        wikis: response.data ?? [],
        total: response.total
      };
    },
    async listIpdReviewForms(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/review/query`,
        {
          type: input.type,
          ...(input.created_by ? { created_by: input.created_by } : {}),
          ...(input.keyword ? { keyword: input.keyword } : {}),
          ...(input.created_time ? { created_time: input.created_time } : {}),
          ...(input.plan_end_date ? { plan_end_date: input.plan_end_date } : {}),
          ...(input.plan_start_date ? { plan_start_date: input.plan_start_date } : {}),
          ...(input.closed_time ? { closed_time: input.closed_time } : {}),
          ...(input.approver ? { approver: input.approver } : {}),
          ...(input.reviewer ? { reviewer: input.reviewer } : {}),
          offset: input.offset,
          limit: input.limit,
          ...(input.sort ? { sort: input.sort } : {})
        }
      )) as {
        result?: { data?: ReqIpdReviewEntity[]; reviews?: ReqIpdReviewEntity[]; total?: number };
        data?: ReqIpdReviewEntity[];
        reviews?: ReqIpdReviewEntity[];
        total?: number;
      };
      const result = response.result ?? response;

      return {
        reviews: result.data ?? result.reviews ?? [],
        total: result.total
      };
    },
    async getIpdReviewForm(input) {
      const query = new URLSearchParams({ category: input.category });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/review/${encodeURIComponent(input.id)}?${query.toString()}`
      )) as { result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      return response.result ?? response;
    },
    async getIpdProcessInstance(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/process-instances/${encodeURIComponent(input.id)}`
      )) as { result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      return response.result ?? response;
    },
    async listIpdProcessInstances(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/process-instances/query`,
        {
          filter: input.filter,
          ...(input.sort ? { sort: input.sort } : {}),
          page: input.page
        }
      )) as {
        result?: {
          process_instances?: ReqIpdReviewEntity[];
          data?: ReqIpdReviewEntity[];
          total?: number;
        };
        process_instances?: ReqIpdReviewEntity[];
        data?: ReqIpdReviewEntity[];
        total?: number;
      };
      const result = response.result ?? response;

      return {
        process_instances: result.process_instances ?? result.data ?? [],
        total: result.total
      };
    },
    async listIpdReviewRoleUsers(input) {
      const query = new URLSearchParams({ user_type: input.user_type });
      if (input.target_project_id) {
        query.set("target_project_id", input.target_project_id);
      }
      if (input.review_id) {
        query.set("review_id", input.review_id);
      }
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/user/role?${query.toString()}`
      )) as {
        result?: { users?: ReqIpdUser[] };
        users?: ReqIpdUser[];
      };

      return {
        users: response.result?.users ?? response.users ?? []
      };
    },
    async groupIpdIssues(input) {
      const query = new URLSearchParams({
        issue_type: input.issue_type,
        group_field_id: input.group_field_id
      });
      if (typeof input.is_project_group !== "undefined") {
        query.set("is_project_group", String(input.is_project_group));
      }
      if (input.group_sort) {
        query.set("group_sort", input.group_sort);
      }
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/group?${query.toString()}`,
        {
          ...(input.filter ? { filter: input.filter } : {}),
          filter_mode: input.filter_mode,
          page: { page_no: input.page, page_size: input.page_size },
          ...(input.sort ? { sort: input.sort } : {})
        }
      )) as {
        result?: { field_info?: ReqIpdNamedItem; data?: ReqIpdNamedItem[] };
      };

      return {
        field_info: response.result?.field_info,
        data: response.result?.data ?? [],
        raw: response
      };
    },
    async listIpdTenantIssues(input) {
      const query = new URLSearchParams({ issue_type: input.issue_type });
      if (input.project_id) {
        query.set("project_id", Array.isArray(input.project_id) ? input.project_id.join(",") : input.project_id);
      }
      const response = (await _http.post(`/v1/ipdprojectservice/projects/tenant/query?${query.toString()}`, {
        ...(input.filter ? { filter: input.filter } : {}),
        filter_mode: input.filter_mode,
        page: { page_no: input.page, page_size: input.page_size },
        ...(input.sort ? { sort: input.sort } : {})
      })) as {
        result?: { issues?: ReqIpdIssue[]; total?: number };
      };

      return {
        issues: response.result?.issues ?? [],
        total: response.result?.total
      };
    },
    async listIpdModules(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/modules/tree?${query.toString()}`
      )) as {
        result?: {
          data?: ReqIpdNamedItem[];
          modules?: ReqIpdNamedItem[];
          total?: number;
        };
        modules?: ReqIpdNamedItem[];
        total?: number;
      };
      const result = (response.result ?? response) as {
        modules?: ReqIpdNamedItem[];
        data?: ReqIpdNamedItem[];
        total?: number;
      };

      return {
        modules: result.modules ?? result.data ?? [],
        total: result.total
      };
    },
    async listIpdStatuses(input) {
      const query = new URLSearchParams();
      if (input.category_id) {
        query.set("category_id", input.category_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/status${suffix}`
      )) as {
        result?: ReqIpdNamedItem[] | { statuses?: ReqIpdNamedItem[] };
        statuses?: ReqIpdNamedItem[];
      };

      return {
        statuses: Array.isArray(response.result) ? response.result : response.result?.statuses ?? response.statuses ?? []
      };
    },
    async listIpdIssueRelationConfig(input) {
      const response = (await _http.get(
        `/v2/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issue-relation-config`
      )) as {
        result?: {
          relations?: ReqIpdNamedItem[];
          relation_config?: ReqIpdNamedItem[];
        };
        relations?: ReqIpdNamedItem[];
      };
      const result = (response.result ?? response) as {
        relations?: ReqIpdNamedItem[];
        relation_config?: ReqIpdNamedItem[];
      };

      return {
        relations: result.relations ?? result.relation_config ?? [],
        raw: response
      };
    },
    async listIpdLabels(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/tags?${query.toString()}`
      )) as {
        result?: {
          labels?: ReqIpdNamedItem[];
          data?: ReqIpdNamedItem[];
          total?: number;
        };
        labels?: ReqIpdNamedItem[];
        total?: number;
      };
      const result = (response.result ?? response) as {
        labels?: ReqIpdNamedItem[];
        data?: ReqIpdNamedItem[];
        total?: number;
      };

      return {
        labels: result.labels ?? result.data ?? [],
        total: result.total
      };
    },
    async listIpdProjectFields(input) {
      const query = new URLSearchParams({
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/fields?${query.toString()}`
      )) as {
        result?: {
          fields?: ReqIpdNamedItem[];
          data?: ReqIpdNamedItem[];
          total?: number;
        };
        fields?: ReqIpdNamedItem[];
        total?: number;
      };
      const result = (response.result ?? response) as {
        fields?: ReqIpdNamedItem[];
        data?: ReqIpdNamedItem[];
        total?: number;
      };

      return {
        fields: result.fields ?? result.data ?? [],
        total: result.total
      };
    },
    async listIpdIssueFields(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/categories/${encodeURIComponent(input.category_id)}/field/`
      )) as {
        result?: ReqIpdNamedItem[] | { fields?: ReqIpdNamedItem[] };
        fields?: ReqIpdNamedItem[];
      };

      return {
        fields: Array.isArray(response.result) ? response.result : response.result?.fields ?? response.fields ?? []
      };
    },
    async listIpdTenantFields(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        size: String(input.page_size)
      });
      const response = (await _http.post(
        `/v1/ipdprojectservice/tenant/fields/query?${query.toString()}`,
        {
          ...(typeof input.search !== "undefined" ? { search: input.search } : {}),
          ...(input.sort_info ? { sort_info: input.sort_info } : {})
        }
      )) as {
        result?: ReqIpdNamedItem[];
        page?: { count?: string | number };
      };

      return {
        fields: response.result ?? [],
        total: typeof response.page?.count === "undefined" ? undefined : Number(response.page.count)
      };
    },
    async getIpdTenantFieldUsed(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/tenant/fields/${encodeURIComponent(input.field_id)}/used`
      )) as ReqIpdFieldUsage[] | { result?: ReqIpdFieldUsage[] };

      return {
        usage: Array.isArray(response) ? response : response.result ?? []
      };
    },
    async getIpdTenantFieldOptionUsed(input) {
      return (await _http.get(
        `/v1/ipdprojectservice/tenant/field/options-used?code=${encodeURIComponent(input.code)}`
      )) as Record<string, string | number>;
    },
    async getIpdProjectFieldOptionUsed(input) {
      return (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/field/options-used?code=${encodeURIComponent(input.code)}`
      )) as Record<string, string | number>;
    },
    async listIpdWorkflowTemplates(input) {
      const query = new URLSearchParams();
      if (input.category_id) {
        query.set("category_id", input.category_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/workflow-template${suffix}`
      )) as {
        result?: {
          workflows?: ReqIpdNamedItem[];
          workflow_templates?: ReqIpdNamedItem[];
        };
        workflows?: ReqIpdNamedItem[];
      };
      const result = (response.result ?? response) as {
        workflows?: ReqIpdNamedItem[];
        workflow_templates?: ReqIpdNamedItem[];
      };

      return {
        workflows: result.workflows ?? result.workflow_templates ?? [],
        raw: response
      };
    },
    async listIpdWorkflowFields(input) {
      const query = new URLSearchParams({
        category_id: input.category_id
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/workflow-template/issue/fields?${query.toString()}`
      )) as {
        result?: ReqIpdNamedItem[] | { fields?: ReqIpdNamedItem[] };
        fields?: ReqIpdNamedItem[];
      };

      return {
        fields: Array.isArray(response.result) ? response.result : response.result?.fields ?? response.fields ?? []
      };
    },
    async listIpdSnapshotVersions(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/snapshots/version`
      )) as {
        result?: ReqIpdNamedItem[];
        snapshots?: ReqIpdNamedItem[];
      };

      return {
        snapshots: response.result ?? response.snapshots ?? []
      };
    },
    async listIpdFeatureSets(input) {
      const query = new URLSearchParams();
      if (input.snapshot_version_id) {
        query.set("snapshot_version_id", input.snapshot_version_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/feature-set/query${suffix}`
      )) as {
        result?: ReqIpdNamedItem[];
        feature_sets?: ReqIpdNamedItem[];
      };

      return {
        feature_sets: response.result ?? response.feature_sets ?? []
      };
    },
    async listIpdSnapshotFeatures(input) {
      const query = new URLSearchParams({
        snapshot_version_id: input.snapshot_version_id,
        feature_set_id: input.feature_set_id,
        offset: String((input.page - 1) * input.page_size),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/snapshots-feature/query?${query.toString()}`
      )) as {
        result?: {
          issues?: ReqIpdIssue[];
          total?: number;
        };
        issues?: ReqIpdIssue[];
        total?: number;
      };
      const result = response.result ?? response;

      return {
        issues: result.issues ?? [],
        total: result.total
      };
    },
    async getIpdE2EGraph(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id,
        category: input.category
      });
      if (typeof input.is_src !== "undefined") {
        query.set("is_src", String(input.is_src));
      }
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/e2e/graphs?${query.toString()}`
      )) as {
        result?: ReqIpdIssue;
      } & ReqIpdIssue;

      return response.result ?? response;
    },
    async listIpdCategoryStatuses(input) {
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/category/${encodeURIComponent(input.category_id)}/statuses`
      )) as {
        result?: ReqIpdNamedItem[];
        statuses?: ReqIpdNamedItem[];
        total?: number;
      };

      return {
        statuses: response.result ?? response.statuses ?? [],
        total: response.total
      };
    },
    async getIpdStatisticDashboard(input) {
      const query = new URLSearchParams({ classification: input.classification });
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/statistic/dashboard?${query.toString()}`,
        {
          ...(input.plan ? { plan: input.plan } : {}),
          ...(input.created_date ? { created_date: input.created_date } : {})
        }
      )) as {
        result?: ReqIpdDashboardItem[];
      };

      return {
        items: response.result ?? []
      };
    },
    async getIpdWorkItemFlowDetail(input) {
      const query = new URLSearchParams({
        issue_category: input.issue_category
      });
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-item/${encodeURIComponent(input.issue_id)}/flow/detail?${query.toString()}`
      )) as {
        result?: {
          process_instance?: unknown;
          next_flow?: ReqIpdNamedItem[];
        };
        process_instance?: unknown;
        next_flow?: ReqIpdNamedItem[];
      };
      const result = response.result ?? response;

      return {
        process_instance: result.process_instance,
        next_flow: result.next_flow ?? [],
        raw: response
      };
    },
    async transferIpdWorkItemFlow(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-item/flow/transfer`,
        {
          id: input.issue_id,
          issue_category: input.issue_category,
          flow_code: input.flow_code,
          ...(input.process_context ? { process_context: input.process_context } : {})
        }
      )) as {
        status?: string;
        result?: unknown;
      };

      assertReqMutationSucceeded("transfer IPD work item flow", response.status);

      return response.result ?? response;
    },
    async batchTransferIpdWorkItemFlow(input) {
      const query = new URLSearchParams({
        is_recover: String(input.is_recover)
      });
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-item/processes/transfer-batch?${query.toString()}`,
        {
          issue_ids: input.issue_ids,
          issue_category: input.issue_category,
          flow_code: input.flow_code,
          ...(input.process_context ? { process_context: input.process_context } : {})
        }
      )) as {
        status?: string;
        result?: unknown;
      };

      assertReqMutationSucceeded("batch transfer IPD work item flow", response.status);

      return response.result ?? response;
    },
    async createIpdChangeReviewForm(input) {
      const { project_id, extra_fields, ...rest } = input;
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(project_id)}/review`,
        {
          ...rest,
          ...(extra_fields && typeof extra_fields === "object" ? extra_fields : {})
        }
      )) as { status?: string; result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      if (response.status) {
        assertReqMutationSucceeded("create IPD change review form", response.status);
      }

      return response.result ?? response;
    },
    async updateIpdChangeReviewForm(input) {
      const { project_id, id, extra_fields, ...rest } = input;
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(project_id)}/review/${encodeURIComponent(id)}`,
        {
          ...rest,
          ...(extra_fields && typeof extra_fields === "object" ? extra_fields : {})
        }
      )) as { status?: string; result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      if (response.status) {
        assertReqMutationSucceeded("update IPD change review form", response.status);
      }

      return response.result ?? response;
    },
    async deleteIpdChangeReviewForm(input) {
      const query = new URLSearchParams({ category: input.category });
      return await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/review/${encodeURIComponent(input.id)}?${query.toString()}`
      );
    },
    async createIpdProcessInstance(input) {
      const query = new URLSearchParams();
      if (input.operate_type && typeof input.operate_type === "string") {
        query.set("operate_type", input.operate_type);
      }
      if (input.domain_id && typeof input.domain_id === "string") {
        query.set("domain_id", input.domain_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const { project_id, extra_fields, ...rest } = input;
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(project_id)}/process-instances${suffix}`,
        {
          ...withoutKeys(rest, ["operate_type", "domain_id"]),
          ...(extra_fields && typeof extra_fields === "object" ? extra_fields : {})
        }
      )) as { status?: string; result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      if (response.status) {
        assertReqMutationSucceeded("create IPD process instance", response.status);
      }

      return response.result ?? response;
    },
    async updateIpdProcessInstance(input) {
      const query = new URLSearchParams();
      if (input.domain_id && typeof input.domain_id === "string") {
        query.set("domain_id", input.domain_id);
      }
      const suffix = query.toString() ? `?${query.toString()}` : "";
      const { project_id, id, extra_fields, ...rest } = input;
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(project_id)}/process-instances/${encodeURIComponent(id)}${suffix}`,
        {
          ...withoutKeys(rest, ["domain_id"]),
          ...(extra_fields && typeof extra_fields === "object" ? extra_fields : {})
        }
      )) as { status?: string; result?: ReqIpdReviewEntity } & ReqIpdReviewEntity;

      if (response.status) {
        assertReqMutationSucceeded("update IPD process instance", response.status);
      }

      return response.result ?? response;
    },
    async deleteIpdProcessInstance(input) {
      const response = (await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/process-instances/${encodeURIComponent(input.id)}`
      )) as { status?: string; result?: unknown };

      if (response.status) {
        assertReqMutationSucceeded("delete IPD process instance", response.status);
      }

      return response.result ?? response;
    },
    async createIpdIssue(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues`,
        withIpdExtraFields({
          title: input.title,
          description: input.description,
          category: input.category,
          assignee: input.assignee,
          ...(input.status ? { status: input.status } : {}),
          ...(input.src_domain ? { src_domain: input.src_domain } : {}),
          ...(input.submitted_by ? { submitted_by: input.submitted_by } : {}),
          ...(input.domain_id ? { domain_id: input.domain_id } : {}),
          ...(input.recipient ? { recipient: input.recipient } : {}),
          ...(typeof input.expect_delivery_time !== "undefined" ? { expect_delivery_time: input.expect_delivery_time } : {}),
          ...(input.priority ? { priority: input.priority } : {}),
          ...(input.assigned_cc ? { assigned_cc: input.assigned_cc } : {}),
          ...(input.plan_pi ? { plan_pi: input.plan_pi } : {}),
          ...(input.plan_iteration ? { plan_iteration: input.plan_iteration } : {}),
          ...(typeof input.plan_start_date !== "undefined" ? { plan_start_date: input.plan_start_date } : {}),
          ...(typeof input.plan_end_date !== "undefined" ? { plan_end_date: input.plan_end_date } : {}),
          ...(typeof input.workload_man_day !== "undefined" ? { workload_man_day: input.workload_man_day } : {}),
          ...(input.business_domain ? { business_domain: input.business_domain } : {}),
          ...(input.need_break ? { need_break: input.need_break } : {}),
          ...(input.extra_fields ? { extra_fields: input.extra_fields } : {})
        })
      )) as {
        status?: string;
        result?: ReqIpdIssue[];
      };

      assertReqMutationSucceeded("create IPD issue", response.status);

      return response.result ?? [];
    },
    async batchCreateIpdIssues(input) {
      const response = (await _http.post(
        `/v2/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/batch`,
        input.issues.map((issue) => withIpdExtraFields(issue))
      )) as {
        status?: string;
        result?: ReqIpdIssue[];
      };

      assertReqMutationSucceeded("batch create IPD issues", response.status);

      return response.result ?? [];
    },
    async batchUpdateIpdIssues(input) {
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/batch`,
        {
          id: input.issue_ids,
          attribute: withIpdExtraFields(input.attribute)
        }
      )) as {
        status?: string;
        result?: unknown;
      };

      assertReqMutationSucceeded("batch update IPD issues", response.status);

      return response.result ?? response;
    },
    async batchDeleteIpdIssues(input) {
      const query = new URLSearchParams();
      if (typeof input.is_permanent_delete !== "undefined") {
        query.set("is_permanent_delete", String(input.is_permanent_delete));
      }
      if (input.src_project_id) {
        query.set("src_project_id", input.src_project_id);
      }
      const suffix = query.size > 0 ? `?${query.toString()}` : "";
      const response = (await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/batch${suffix}`,
        input.issue_ids
      )) as {
        status?: string;
        result?: unknown;
      };

      assertReqMutationSucceeded("batch delete IPD issues", response.status);

      return response.result ?? response;
    },
    async uploadIpdIssueAttachment(input) {
      const form = new FormData();
      form.append(
        "attachment",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = (await _http.postMultipart(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.issue_id)}/attachments/upload`,
        form
      )) as {
        status?: string;
        result?: ReqIpdAttachment[];
      };

      assertReqMutationSucceeded("upload IPD issue attachment", response.status);

      return response.result ?? [];
    },
    async listIpdIssueAttachments(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id
      });
      if (input.source_project_id) {
        query.set("source_project_id", input.source_project_id);
      }
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/attachments?${query.toString()}`
      )) as {
        result?: ReqIpdAttachment[];
        attachments?: ReqIpdAttachment[];
      };

      return {
        attachments: response.result ?? response.attachments ?? []
      };
    },
    async downloadIpdIssueAttachment(input) {
      const response = await _http.getBinary(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/attachments/download/${encodeURIComponent(input.attachment_id)}`
      );

      return {
        project_id: input.project_id,
        attachment_id: input.attachment_id,
        body: response.body,
        content_type: response.contentType,
        file_name: response.fileName
      };
    },
    async uploadIpdIssueImage(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id
      });
      const form = new FormData();
      form.append(
        "file",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = (await _http.postMultipart(
        `/v2/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/images?${query.toString()}`,
        form
      )) as {
        status?: string;
        result?: ReqIpdIssue;
      } & ReqIpdIssue;

      assertReqMutationSucceeded("upload IPD issue image", response.status);

      return response.result ?? response;
    },
    async deleteIpdIssueImage(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id,
        file_name: input.file_name
      });
      const response = (await _http.delete(
        `/v2/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/images?${query.toString()}`
      )) as {
        status?: string;
        result?: ReqIpdIssue;
      } & ReqIpdIssue;

      assertReqMutationSucceeded("delete IPD issue image", response.status);

      return response.result ?? response;
    },
    async downloadIpdIssueImage(input) {
      const query = new URLSearchParams({
        issue_id: input.issue_id,
        file_name: input.file_name
      });
      if (input.field_code) {
        query.set("field_code", input.field_code);
      }
      const response = await _http.getBinary(
        `/v2/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/images?${query.toString()}`
      );

      return {
        project_id: input.project_id,
        issue_id: input.issue_id,
        file_name: input.file_name,
        body: response.body,
        content_type: response.contentType
      };
    },
    async listIpdWorkHours(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-hour/query`,
        {
          params: {
            plan_pi: input.plan_pi ?? [],
            plan_iteration: input.plan_iteration ?? [],
            workitem_id: input.workitem_id ?? [],
            created_by: input.created_by ?? []
          },
          page_info: {
            offset,
            limit: input.page_size
          }
        }
      )) as {
        result?: ReqIpdWorkHour[];
        page?: { count?: string | number };
      };

      return {
        work_hours: response.result ?? [],
        total: typeof response.page?.count === "undefined" ? undefined : Number(response.page.count)
      };
    },
    async listIpdWorkHourCategories(input) {
      const query = new URLSearchParams();
      if (input.display_value) {
        query.set("display_value", input.display_value);
      }
      const suffix = query.size > 0 ? `?${query.toString()}` : "";
      const response = (await _http.get(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-hour/options${suffix}`
      )) as {
        result?: ReqIpdNamedItem[];
        categories?: ReqIpdNamedItem[];
      };

      return {
        categories: response.result ?? response.categories ?? []
      };
    },
    async createIpdWorkHour(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/work-items/${encodeURIComponent(input.issue_id)}/work-hour`,
        {
          ...(input.work_hour_category ? { work_hour_category: input.work_hour_category } : {}),
          work_date_begin: input.work_date_begin,
          work_date_end: input.work_date_end,
          work_hours: input.work_hours,
          work_hour_type: input.work_hour_type,
          include_weekend: input.include_weekend,
          ...(input.description ? { description: input.description } : {})
        }
      )) as {
        status?: string;
        result?: { data?: ReqIpdWorkHour[]; work_hours_total?: string | number };
      };

      assertReqMutationSucceeded("create IPD work hour", response.status);

      return normalizeIpdWorkHourTotal(response);
    },
    async updateIpdWorkHour(input) {
      const response = (await _http.put(
        `/v1/projects/${encodeURIComponent(input.project_id)}/work-items/${encodeURIComponent(input.issue_id)}/work-hour/${encodeURIComponent(input.workhour_id)}`,
        {
          ...(typeof input.work_hours !== "undefined" ? { work_hours: input.work_hours } : {}),
          ...(input.work_hour_category ? { work_hour_category: input.work_hour_category } : {}),
          ...(typeof input.description !== "undefined" ? { description: input.description } : {})
        }
      )) as {
        status?: string;
        result?: { data?: ReqIpdWorkHour[]; work_hours_total?: string | number };
      };

      assertReqMutationSucceeded("update IPD work hour", response.status);

      return normalizeIpdWorkHourTotal(response);
    },
    async deleteIpdWorkHour(input) {
      const response = (await _http.delete(
        `/v1/projects/${encodeURIComponent(input.project_id)}/work-items/${encodeURIComponent(input.issue_id)}/work-hour/${encodeURIComponent(input.workhour_id)}`
      )) as {
        status?: string;
        result?: { data?: ReqIpdWorkHour[]; work_hours_total?: string | number };
      };

      assertReqMutationSucceeded("delete IPD work hour", response.status);

      return normalizeIpdWorkHourTotal(response);
    },
    async updateIpdTenantField(input) {
      return (await _http.post(
        `/v1/ipdprojectservice/tenant/fields/${encodeURIComponent(input.field_id)}`,
        toIpdFieldMutationBody(input)
      )) as ReqIpdNamedItem;
    },
    async updateIpdProjectField(input) {
      return (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/meta/fields/${encodeURIComponent(input.field_id)}`,
        toIpdFieldMutationBody(input)
      )) as ReqIpdNamedItem;
    },
    async createIpdModule(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/modules`,
        {
          display_value: input.display_value,
          parent_id: input.parent_id,
          ...(input.description ? { description: input.description } : {}),
          ...(input.assignee ? { assignee: input.assignee } : {})
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("create IPD module", response.status);

      return response.result ?? response;
    },
    async updateIpdModule(input) {
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/modules/${encodeURIComponent(input.module_id)}`,
        {
          display_value: input.display_value,
          parent_id: input.parent_id,
          ...(input.description ? { description: input.description } : {}),
          ...(input.assignee ? { assignee: input.assignee } : {})
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("update IPD module", response.status);

      return response.result ?? response;
    },
    async deleteIpdModule(input) {
      const response = (await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/modules/${encodeURIComponent(input.module_id)}`
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("delete IPD module", response.status);

      return response.result ?? response;
    },
    async createIpdLabel(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/tags`,
        {
          label_type: input.label_type,
          color: input.color,
          title: input.title
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("create IPD label", response.status);

      return response.result ?? response;
    },
    async updateIpdLabel(input) {
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/tags/${encodeURIComponent(input.label_id)}`,
        {
          label_type: input.label_type,
          ...(input.color ? { color: input.color } : {}),
          ...(input.title ? { title: input.title } : {})
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("update IPD label", response.status);

      return response.result ?? response;
    },
    async deleteIpdLabel(input) {
      const response = (await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/tags/${encodeURIComponent(input.label_id)}`
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("delete IPD label", response.status);

      return response.result ?? response;
    },
    async createIpdFeatureSet(input) {
      const response = (await _http.post(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/feature-sets`,
        {
          title: input.title,
          parent_id: input.parent_id
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("create IPD feature set", response.status);

      return response.result ?? response;
    },
    async updateIpdFeatureSet(input) {
      const response = (await _http.put(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/feature-sets/${encodeURIComponent(input.feature_set_id)}`,
        {
          parent_id: input.parent_id,
          ...(input.title ? { title: input.title } : {}),
          ...(typeof input.position_float !== "undefined" ? { position_float: input.position_float } : {})
        }
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("update IPD feature set", response.status);

      return response.result ?? response;
    },
    async deleteIpdFeatureSet(input) {
      const response = (await _http.delete(
        `/v1/ipdprojectservice/projects/${encodeURIComponent(input.project_id)}/feature-sets/${encodeURIComponent(input.feature_set_id)}`
      )) as {
        status?: string;
        result?: ReqIpdNamedItem;
      } & ReqIpdNamedItem;

      assertReqMutationSucceeded("delete IPD feature set", response.status);

      return response.result ?? { id: input.feature_set_id };
    },
    async addWorkItemComment(input) {
      const response = (await _http.post("/v2/issues/update-issue-notes", {
        id: input.work_item_id,
        notes: input.content,
        project_uuid: input.project_id,
        type: "scrum"
      })) as {
        status?: string;
      };

      assertReqMutationSucceeded("add work item comment", response.status);

      return {
        work_item_id: input.work_item_id,
        content: input.content
      };
    },
    async uploadIssueImage(input) {
      const form = new FormData();
      form.append(
        "file",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = (await _http.postMultipart(
        `/v2/${encodeURIComponent(input.project_id)}/img`,
        form
      )) as {
        img_id?: string | number;
        img_url?: string;
      };

      return {
        project_id: input.project_id,
        file_name: input.file_name,
        img_id: response.img_id,
        img_url: response.img_url
      };
    },
    async uploadAttachment(input) {
      const form = new FormData();
      form.append(
        "attachment",
        new Blob([Buffer.from(input.file_content)], {
          type: input.content_type ?? "application/octet-stream"
        }),
        input.file_name
      );
      const response = (await _http.postMultipart(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/attachments/upload`,
        form
      )) as {
        disk_filename?: string;
        file_name?: string;
        id?: string | number;
        issue_id?: string | number;
        project_id?: string;
        size?: string;
      };

      return {
        project_id: response.project_id ?? input.project_id,
        work_item_id: String(response.issue_id ?? input.work_item_id),
        attachment_id: String(response.id ?? ""),
        disk_filename: response.disk_filename,
        file_name: response.file_name ?? input.file_name,
        size: response.size
      };
    },
    async addWorkItemWorkHour(input) {
      const response = (await _http.post(
        `/v3/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/work-hours`,
        {
          work_hours: input.work_hours,
          ...(typeof input.start_date !== "undefined" ? { start_date: input.start_date } : {}),
          ...(typeof input.due_date !== "undefined" ? { due_date: input.due_date } : {}),
          ...(typeof input.start_date_timestamp !== "undefined"
            ? { start_date_timestamp: input.start_date_timestamp }
            : {}),
          ...(typeof input.due_date_timestamp !== "undefined"
            ? { due_date_timestamp: input.due_date_timestamp }
            : {}),
          ...(typeof input.use_timestamp !== "undefined"
            ? { use_timestamp: input.use_timestamp }
            : {}),
          ...(input.region ? { region: input.region } : {})
        }
      )) as {
        result?: {
          data?: Array<{
            id: number | string;
            issue_id?: number | string;
            user_id?: string;
            user_num_id?: number;
            user_name?: string;
            nick_name?: string;
            work_date?: string;
            work_date_timestamp?: string | number;
            work_hours?: string | number;
            region?: string;
          }>;
          status?: string;
        };
        data?: Array<{
          id: number | string;
          issue_id?: number | string;
          user_id?: string;
          user_num_id?: number;
          user_name?: string;
          nick_name?: string;
          work_date?: string;
          work_date_timestamp?: string | number;
          work_hours?: string | number;
          region?: string;
        }>;
        status?: string;
      };
      const result = response.result ?? response;
      const status = response.result?.status ?? response.status;

      assertReqMutationSucceeded("add work item work hour", status);

      const record:
        | {
            id?: number | string;
            issue_id?: number | string;
            user_id?: string;
            user_num_id?: number;
            user_name?: string;
            nick_name?: string;
            work_date?: string;
            work_date_timestamp?: string | number;
            work_hours?: string | number;
            region?: string;
          }
        | undefined = result.data?.[0];

      return {
        id: record?.id ?? `${input.work_item_id}-work-hour`,
        work_item_id: String(record?.issue_id ?? input.work_item_id),
        user_id: record?.user_id,
        user_num_id: record?.user_num_id,
        user_name: record?.user_name,
        nick_name: record?.nick_name,
        work_date: record?.work_date,
        work_date_timestamp: record?.work_date_timestamp,
        work_hours: record?.work_hours,
        region: record?.region
      };
    },
    async updateWorkingHours(input) {
      const response = (await _http.put(
        `/v3/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.issue_id)}/work-hours/${encodeURIComponent(input.work_hours_id)}`,
        {
          ...(typeof input.summary !== "undefined" ? { summary: input.summary } : {}),
          ...(typeof input.work_hours !== "undefined" ? { work_hours: input.work_hours } : {}),
          ...(typeof input.work_hour_type !== "undefined" ? { work_hour_type: input.work_hour_type } : {})
        }
      )) as {
        result?: {
          total?: number;
          data?: Array<Record<string, unknown>>;
        };
        status?: string;
      };

      assertReqMutationSucceeded("update working hours", response.status);

      return {
        total: response.result?.total,
        work_hours: (response.result?.data ?? []) as Array<{
          id?: string | number;
          issueId?: string | number;
          issue_id?: string | number;
          userId?: string;
          user_id?: string;
          userNumId?: string | number;
          user_num_id?: string | number;
          userName?: string;
          user_name?: string;
          nickName?: string;
          nick_name?: string;
          summary?: string;
          workDate?: string;
          work_date?: string;
          workDateTimestamp?: string | number;
          work_date_timestamp?: string | number;
          workHours?: string | number;
          work_hours?: string | number;
          status?: number;
          region?: string;
          workHourTypeId?: number;
          work_hour_type_id?: number;
          workHourTypeName?: string;
          work_hour_type_name?: string;
        }>
      };
    },
    async deleteAttachment(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}/attachments/${encodeURIComponent(input.attachment_id)}`
      );

      return {
        project_id: input.project_id,
        work_item_id: input.work_item_id,
        attachment_id: input.attachment_id,
        deleted: true as const
      };
    },
    async updateWorkItemComment(input) {
      const response = (await _http.post("/v2/workitem/issue-note", {
        id: input.work_item_id,
        noteId: input.comment_id,
        notes: input.content,
        projectUUId: input.project_id,
        type: "scrum"
      })) as {
        result?: { status?: string };
        status?: string;
      };
      const status = response.result?.status ?? response.status;

      assertReqMutationSucceeded("update work item comment", status);

      return {
        work_item_id: input.work_item_id,
        comment_id: input.comment_id,
        content: input.content,
        status
      };
    },
    async updateWorkItemFlow(input) {
      const response = (await _http.post("/v2/workitem/issue-flowage", {
        status_id: input.status_id,
        projectUUId: input.project_id,
        id: input.work_item_id,
        type: "scrum"
      })) as {
        result?: {
          issue?: {
            id?: number | string;
            subject?: string;
            updated_on?: string;
            tracker?: {
              id?: number;
              name?: string;
            };
            status?: {
              id?: number;
              name?: string;
            };
          };
        };
        status?: string;
      };

      assertReqMutationSucceeded("update work item flow", response.status);

      const issue = response.result?.issue;

      return {
        work_item_id: String(issue?.id ?? input.work_item_id),
        title: issue?.subject,
        status_id: issue?.status?.id ?? input.status_id,
        status_name: issue?.status?.name,
        type_id: issue?.tracker?.id,
        type_name: issue?.tracker?.name,
        updated_on: issue?.updated_on
      };
    }
  };
}
