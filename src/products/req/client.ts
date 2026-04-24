import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { AppError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";

export type ReqClient = {
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
    description?: string;
    priority_id?: number;
    iteration_id?: string;
    module_id?: string;
    severity_id?: number;
    assigned_id?: string;
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
  batchUpdateWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
    severity_id?: number;
    assigned_id?: string;
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
    tracker_id?: 2 | 3 | 5 | 6 | 7;
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
    type?: "gantt" | "mind";
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
    tracker_id?: 2 | 3 | 5 | 6 | 7;
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
    type: "gantt" | "mind";
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
  }>;
  getWorkItemCompletionRate: (input: { project_id: string }) => Promise<{
    project_id: string;
    total?: number;
    issue_completion_rates: ReqIssueCompletionRate[];
  }>;
  listChildWorkItems: (input: {
    project_id: string;
    parent_id: string;
    page: number;
    page_size: number;
    subject?: string;
    query_type: "basic" | "custom" | "query";
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
    type?: "commit" | "branch";
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
  listWorkItemStatusDetails: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
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
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
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
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
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
    tracker_id: 2 | 3 | 5 | 6 | 7;
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
    tracker_id?: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    templates: Array<{
      id?: number | string;
      project_id?: number | string;
      tracker_id?: number;
      description?: string;
      issue_field_config?: string;
    }>;
  }>;
  getWorkItemTemplateConfig: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
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
    tracker_id?: 2 | 3 | 5 | 6 | 7;
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
    tracker_id: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
    status_rule_flag: {
      tracker_config_id?: string | number;
      issue_field_config?: boolean;
      code_commit?: boolean;
    };
  }>;
  listWorkItemTrackerHandlers: (input: {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
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

type ReqIssueListItem = {
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
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
      const response = (await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/issue`, {
        name: input.title,
        description: input.description,
        tracker_id: toTrackerId(input.work_item_type),
        priority_id: toPriorityId(input.priority_id),
        ...(input.iteration_id ? { iteration_id: input.iteration_id } : {}),
        ...(input.module_id ? { module_id: input.module_id } : {}),
        ...(typeof input.severity_id !== "undefined" ? { severity_id: input.severity_id } : {}),
        ...(input.assigned_id ? { assigned_id: input.assigned_id } : {}),
        ...(typeof input.done_ratio !== "undefined" ? { done_ratio: input.done_ratio } : {}),
        ...(typeof input.expected_work_hours !== "undefined"
          ? { expected_work_hours: input.expected_work_hours }
          : {}),
        ...(typeof input.start_date !== "undefined" ? { start_date: input.start_date } : {}),
        ...(typeof input.due_date !== "undefined" ? { due_date: input.due_date } : {})
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
      const result = response.result ?? response;

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
      const result = response.result ?? response;

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
      const result = response.result ?? response;

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
      const result = response.result ?? response;

      return {
        work_items: result.issues ?? [],
        total: result.issues_count ?? result.total ?? result.total_count,
        milestone_cur_count: result.milestone_cur_count,
        issue_cur_count: result.issue_cur_count,
        issues_count: result.issues_count
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
      const result = response.result ?? response;

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
      const result = response.result ?? response;

      return {
        id: result.id ?? input.plan_id,
        name: result.name ?? input.name,
        type: result.type,
        project_id: result.project_id ?? input.project_id,
        img_url: result.img_url,
        creator: result.creator
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
      const result = response.result ?? response;

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
        ...(input.assigned_id ? { assigned_id: input.assigned_id } : {})
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
          ...(typeof input.done_ratio !== "undefined" ? { done_ratio: input.done_ratio } : {}),
          ...(typeof input.expected_work_hours !== "undefined"
            ? { expected_work_hours: input.expected_work_hours }
            : {}),
          ...(typeof input.start_date !== "undefined" ? { start_date: input.start_date } : {}),
          ...(typeof input.due_date !== "undefined" ? { due_date: input.due_date } : {})
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
    async batchUpdateWorkItems(input) {
      const attribute: {
        status_id?: number;
        priority_id?: number;
        severity_id?: number;
        assigned_id?: string;
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
      };

      return {
        id: response.id ?? input.work_item_id,
        subject: response.subject ?? response.name ?? "",
        status: response.status,
        tracker_name: response.tracker_name ?? response.tracker?.name,
        description: response.description
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
      const result = response.result ?? response;

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
      const result = response.result ?? response;

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
