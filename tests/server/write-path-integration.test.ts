import { afterEach, describe, expect, it, vi } from "vitest";
import { resolve } from "node:path";
import {
  createSessionAwarePipelineApproveRunHandler,
  createSessionAwareDeployCreateApplicationHandler,
  createSessionAwarePipelineRejectRunHandler,
  createSessionAwarePipelineRetryRunHandler,
  createSessionAwarePipelineRunPipelineHandler,
  createSessionAwarePipelineStopRunHandler,
  createSessionAwareReqCreateWorkItemHandler
} from "../../src/server/create-server.js";
import {
  bootstrapHttpRuntime,
  createSessionAuthContext,
  expectSessionAwareWriteExecution,
  readRegisteredHandler,
  stubJsonFetch
} from "./http-test-helpers.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

type SessionStore = ReturnType<typeof createSessionCredentialStore>;

type WritePathCase = {
  name: string;
  createHandler: (store: SessionStore) => (
    input: unknown,
    extra: unknown
  ) => Promise<unknown>;
  input: Record<string, unknown>;
  responsePayload: unknown;
  responseInit?: ResponseInit;
  expectedItem: Record<string, unknown>;
  expectedRequest: {
    path: string;
    method?: string;
    bodyIncludes?: string[];
  };
};

type DryRunCase = {
  name: string;
  toolName: string;
  input: Record<string, unknown>;
  expectedItem: Record<string, unknown>;
};

const reqUploadImageFixturePath = resolve(process.cwd(), "tests/fixtures/req-upload-image.png");

function createReqCreateWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id: string;
  description: string;
  iteration_id: string;
  module_id: string;
  severity_id: number;
  assigned_id: string;
  developer_id: string;
  done_ratio: number;
  expected_work_hours: number;
  start_date: number;
  due_date: number;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    title: "Add login",
    work_item_type: "Story",
    parent_work_item_id: "9001",
    description: "Implement login flow",
    iteration_id: "iteration-1",
    module_id: "module-1",
    severity_id: 11,
    assigned_id: "user-2",
    developer_id: "4091",
    done_ratio: 20,
    expected_work_hours: 8,
    start_date: 1839340800000,
    due_date: 1839945600000,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id: string;
    description: string;
    iteration_id: string;
    module_id: string;
    severity_id: number;
    assigned_id: string;
    developer_id: string;
    done_ratio: number;
    expected_work_hours: number;
    start_date: number;
    due_date: number;
    dry_run: boolean;
  } & T;
}

function createReqQuickCreateChildWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  title: string;
  parent_issue_id: number;
  tracker_id: number;
  assigned_to_id: number;
  fixed_version_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    title: "Child Story",
    parent_issue_id: 70779173,
    tracker_id: 7,
    assigned_to_id: 101,
    fixed_version_id: "123.0",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    title: string;
    parent_issue_id: number;
    tracker_id: number;
    assigned_to_id: number;
    fixed_version_id: string;
    dry_run: boolean;
  } & T;
}

function createReqCreateProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  name: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    name: "Alpha",
    description: "Demo project",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    name: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createReqDeleteWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdateWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  title: string;
  work_item_type: string;
  description: string;
  status_id: number;
  priority_id: number;
  iteration_id: string;
  module_id: string;
  severity_id: number;
  assigned_id: string;
  developer_id: string;
  done_ratio: number;
  expected_work_hours: number;
  start_date: number;
  due_date: number;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    title: "Refine login flow",
    work_item_type: "Story",
    description: "Clarify edge cases",
    status_id: 3,
    priority_id: 1,
    iteration_id: "iteration-1",
    module_id: "module-1",
    severity_id: 11,
    assigned_id: "user-2",
    done_ratio: 60,
    expected_work_hours: 13,
    start_date: 1839340800000,
    due_date: 1839945600000,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id: string;
    description: string;
    status_id: number;
    priority_id: number;
    iteration_id: string;
    module_id: string;
    severity_id: number;
    assigned_id: string;
    developer_id: string;
    done_ratio: number;
    expected_work_hours: number;
    start_date: number;
    due_date: number;
    dry_run: boolean;
  } & T;
}

function createReqBatchUpdateWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_ids: string[];
  status_id: number;
  priority_id: number;
  severity_id: number;
  assigned_id: string;
  developer_id: string;
  done_ratio: number;
  iteration_id: string;
  module_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_ids: ["70779173", "70779174"],
    status_id: 3,
    priority_id: 2,
    severity_id: 11,
    assigned_id: "user-2",
    developer_id: "4091",
    done_ratio: 40,
    iteration_id: "iteration-1",
    module_id: "module-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_ids: string[];
    status_id: number;
    priority_id: number;
    severity_id: number;
    assigned_id: string;
    developer_id: string;
    done_ratio: number;
    iteration_id: string;
    module_id: string;
    dry_run: boolean;
  } & T;
}

function createReqBatchDeleteWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_ids: string[];
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_ids: ["70779173", "70779174"],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_ids: string[];
    dry_run: boolean;
  } & T;
}

function createReqUpdateCacheDataInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  type: string;
  region: string;
  visible_fields: string[];
  fields: Array<{
    field: string;
    visible: boolean;
    order: number;
  }>;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    type: "backlog",
    region: "cn-north-4",
    visible_fields: ["subject", "status"],
    fields: [
      {
        field: "subject",
        visible: true,
        order: 1
      }
    ],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    type: string;
    region: string;
    visible_fields: string[];
    fields: Array<{
      field: string;
      visible: boolean;
      order: number;
    }>;
    dry_run: boolean;
  } & T;
}

function createReqUpdateCacheSettingInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  type: string;
  fields: string[];
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    type: "backlog",
    fields: ["subject", "status"],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    type: string;
    fields: string[];
    dry_run: boolean;
  } & T;
}

function createReqAddWorkItemCommentInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  content: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    content: "First comment",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    content: string;
    dry_run: boolean;
  } & T;
}

function createReqUploadWorkItemImageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  file_path: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    file_path: reqUploadImageFixturePath,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    file_path: string;
    dry_run: boolean;
  } & T;
}

function createReqAddWorkItemWorkHourInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  work_hours: number;
  start_date: string;
  due_date: string;
  region: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    work_hours: 1,
    start_date: "2025-07-25",
    due_date: "2025-07-25",
    region: "example",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    work_hours: number;
    start_date: string;
    due_date: string;
    region: string;
    dry_run: boolean;
  } & T;
}

function createReqDeleteAttachmentInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  attachment_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    attachment_id: "72372",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    attachment_id: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdateWorkItemCommentInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  comment_id: string;
  content: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    comment_id: "comment-1",
    content: "Updated comment",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    comment_id: string;
    content: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdateWorkItemFlowInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  work_item_id: string;
  status_id: number;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    work_item_id: "70779173",
    status_id: 3,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    work_item_id: string;
    status_id: number;
    dry_run: boolean;
  } & T;
}

function createReqUpdateProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "Alpha 2",
    description: "Updated project",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createReqDeleteProjectInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    dry_run: boolean;
  } & T;
}

function createReqCreateIterationInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "Sprint 4",
    begin_time: "2026-04-15",
    end_time: "2026-04-28",
    description: "Close backlog",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description: string;
    dry_run: boolean;
  } & T;
}

function createReqCreateVersionV2Input<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  start_date: number;
  due_date: number;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "Sprint V2",
    start_date: 1779379200000,
    due_date: 1779984000000,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    start_date: number;
    due_date: number;
    dry_run: boolean;
  } & T;
}

function createReqCreatePlanInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  type: "gantt" | "mind";
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "2026 Q3",
    type: "mind",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    type: "gantt" | "mind";
    dry_run: boolean;
  } & T;
}

function createReqAddPlanWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  work_item_ids: string[];
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    work_item_ids: ["70779173", "70779174"],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    work_item_ids: string[];
    dry_run: boolean;
  } & T;
}

function createReqCreatePlanWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  title: string;
  work_item_type: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    title: "Epic A",
    work_item_type: "Epic",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    title: string;
    work_item_type: string;
    dry_run: boolean;
  } & T;
}

function createReqCreateWorkItemTemplateInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  tracker_id: 2 | 3 | 5 | 6 | 7;
  description: string;
  issue_field_configs: Array<{
    field: string;
    is_required: number;
    default_value: string;
    position: number;
  }>;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    tracker_id: 7,
    description: "<p>story template</p>",
    issue_field_configs: [
      {
        field: "status_id",
        is_required: 1,
        default_value: "新建",
        position: 1
      }
    ],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    tracker_id: 2 | 3 | 5 | 6 | 7;
    description: string;
    issue_field_configs: Array<{
      field: string;
      is_required: number;
      default_value: string;
      position: number;
    }>;
    dry_run: boolean;
  } & T;
}

function createReqCopyWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  from_project_id: string;
  to_project_id: string;
  work_item_ids: string[];
  copy_comments: boolean;
  copy_work_hours: boolean;
  dry_run: boolean;
} & T {
  return {
    from_project_id: "project-source",
    to_project_id: "project-target",
    work_item_ids: ["70779173", "70779174"],
    copy_comments: true,
    copy_work_hours: false,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    from_project_id: string;
    to_project_id: string;
    work_item_ids: string[];
    copy_comments: boolean;
    copy_work_hours: boolean;
    dry_run: boolean;
  } & T;
}

function createReqCreateIterationWorkItemInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_id: string;
  title: string;
  work_item_type: string;
  parent_work_item_id: string;
  description: string;
  module_id: string;
  severity_id: number;
  assigned_id: string;
  developer_id: string;
  done_ratio: number;
  expected_work_hours: number;
  start_date: number;
  due_date: number;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_id: "iteration-1",
    title: "Story A",
    work_item_type: "Story",
    parent_work_item_id: "9001",
    description: "Iteration scoped story",
    module_id: "module-1",
    severity_id: 11,
    assigned_id: "user-2",
    developer_id: "4091",
    done_ratio: 20,
    expected_work_hours: 8,
    start_date: 1839340800000,
    due_date: 1839945600000,
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_id: string;
    title: string;
    work_item_type: string;
    parent_work_item_id: string;
    description: string;
    module_id: string;
    severity_id: number;
    assigned_id: string;
    developer_id: string;
    done_ratio: number;
    expected_work_hours: number;
    start_date: number;
    due_date: number;
    dry_run: boolean;
  } & T;
}

function createReqAddIterationWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_id: string;
  work_item_ids: string[];
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_id: "iteration-1",
    work_item_ids: ["70779173", "70779174"],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_id: string;
    work_item_ids: string[];
    dry_run: boolean;
  } & T;
}

function createReqUpdateIterationInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_id: string;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  status: string;
  over_type: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_id: "301",
    name: "Sprint 4 Updated",
    begin_time: "2026-04-16",
    end_time: "2026-04-29",
    description: "Updated backlog",
    status: "2",
    over_type: "auto",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description: string;
    status: string;
    over_type: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdatePlanInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  name: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    name: "2026 Q3 Updated",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    name: string;
    dry_run: boolean;
  } & T;
}

function createReqUpdatePlanImageInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  img_url: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    img_url: "/v1/upload/demo/202604/abc123.png",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    img_url: string;
    dry_run: boolean;
  } & T;
}

function createReqClearPlanWorkItemsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    dry_run: boolean;
  } & T;
}

function createReqDeleteIterationInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_id: "301",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_id: string;
    dry_run: boolean;
  } & T;
}

function createReqDeletePlanInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  plan_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    plan_id: "plan-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
    dry_run: boolean;
  } & T;
}

function createReqBatchDeleteIterationsInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_ids: string[];
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_ids: ["301", "302"],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_ids: string[];
    dry_run: boolean;
  } & T;
}

function createReqUpdateIterationStateInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  iteration_id: string;
  name: string;
  status: string;
  start_date: string;
  due_date: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    iteration_id: "301",
    name: "Sprint 4",
    status: "2",
    start_date: "2026-04-15",
    due_date: "2026-04-28",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    start_date: string;
    due_date: string;
    dry_run: boolean;
  } & T;
}

function createDeployCreateApplicationInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  name: string;
  arrange_infos: Array<{
    template_id: string;
    operation_list: Array<{ name: string }>;
  }>;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    name: "App-20260420",
    arrange_infos: [
      {
        template_id: "template-1",
        operation_list: [{ name: "deploy" }]
      }
    ],
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    name: string;
    arrange_infos: Array<{
      template_id: string;
      operation_list: Array<{ name: string }>;
    }>;
    dry_run: boolean;
  } & T;
}

function createProjectPipelineRunInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipeline-1",
    run_id: "run-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    dry_run: boolean;
  } & T;
}

function createProjectPipelineReviewInput<T extends Record<string, unknown>>(
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
  dry_run: boolean;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipeline-1",
    run_id: "run-1",
    job_id: "job-1",
    step_id: "step-1",
    dry_run: false,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
    dry_run: boolean;
  } & T;
}

const writePathCases: WritePathCase[] = [
  {
    name: "executes req_add_project_member through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_project_member"),
    input: {
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      domain_name: "tenant-a",
      role_id: -1,
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      domainId: "domain-1",
      domainName: "tenant-a",
      roleId: -1,
      added: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/member",
      bodyIncludes: [
        "\"user_id\":\"user-1\"",
        "\"domain_id\":\"domain-1\"",
        "\"domain_name\":\"tenant-a\"",
        "\"role_id\":-1"
      ]
    }
  },
  {
    name: "executes req_batch_add_project_members through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_add_project_members"),
    input: {
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      members: [
        { userId: "user-1", roleId: 3 },
        { userId: "user-2", roleId: undefined }
      ],
      addedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members",
      bodyIncludes: ["\"users\":[", "\"user_id\":\"user-1\"", "\"user_id\":\"user-2\""]
    }
  },
  {
    name: "executes req_batch_delete_project_members through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_delete_project_members"),
    input: {
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      userIds: ["user-1", "user-2"],
      removedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members",
      method: "DELETE",
      bodyIncludes: ["\"user_ids\":[\"user-1\",\"user-2\"]"]
    }
  },
  {
    name: "executes req_batch_update_child_user_nicknames through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_update_child_user_nicknames"),
    input: {
      users: [
        { user_id: "user-1", nick_name: "Alice" },
        { user_id: "user-2", nick_name: "Bob" }
      ],
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      users: [
        { user_id: "user-1", nick_name: "Alice" },
        { user_id: "user-2", nick_name: "Bob" }
      ],
      updatedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/domain/child-users",
      method: "PUT",
      bodyIncludes: ["\"users\":[", "\"user_id\":\"user-1\"", "\"nick_name\":\"Bob\""]
    }
  },
  {
    name: "executes req_update_project_member_role through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_project_member_role"),
    input: {
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      roleId: 5,
      updated: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/members/role",
      bodyIncludes: ["\"role_id\":5", "\"user_ids\":[\"user-1\"]"]
    }
  },
  {
    name: "executes req_leave_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_leave_project"),
    input: {
      project_id: "project-1",
      dry_run: false
    },
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      left: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/quit",
      method: "DELETE"
    }
  },
  {
    name: "executes req_create_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_project"),
    input: createReqCreateProjectInput(),
    responsePayload: {
      project_id: "project-1",
      project_name: "Alpha",
      description: "Demo project",
      project_num_id: 101,
      project_type: "scrum"
    },
    expectedItem: {
      id: "project-1",
      name: "Alpha",
      description: "Demo project",
      numberId: 101,
      type: "scrum",
      executed: true
    },
    expectedRequest: {
      path: "/v4/project",
      bodyIncludes: ["\"project_name\":\"Alpha\"", "\"project_type\":\"scrum\""]
    }
  },
  {
    name: "executes req_update_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_project"),
    input: createReqUpdateProjectInput(),
    responsePayload: {},
    expectedItem: {
      id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1",
      method: "PUT",
      bodyIncludes: ["\"project_name\":\"Alpha 2\""]
    }
  },
  {
    name: "executes req_delete_project through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_project"),
    input: createReqDeleteProjectInput(),
    responsePayload: {},
    expectedItem: {
      id: "project-1",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1",
      method: "DELETE"
    }
  },
  {
    name: "executes req_add_plan_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_plan_work_items"),
    input: createReqAddPlanWorkItemsInput(),
    responsePayload: {
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      workItemIds: ["70779173", "70779174"],
      addedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/plan-1/issue",
      bodyIncludes: ["[\"70779173\",\"70779174\"]"]
    }
  },
  {
    name: "executes req_add_iteration_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_iteration_work_items"),
    input: createReqAddIterationWorkItemsInput(),
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      iterationId: "iteration-1",
      workItemIds: ["70779173", "70779174"],
      addedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v2/projects/project-1/issues/batch-update",
      method: "PUT",
      bodyIncludes: [
        "\"id\":[\"70779173\",\"70779174\"]",
        "\"attribute\":{",
        "\"iteration_id\":\"iteration-1\""
      ]
    }
  },
  {
    name: "executes req_create_plan through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_plan"),
    input: createReqCreatePlanInput(),
    responsePayload: {
      status: "success",
      result: {
        id: "plan-1",
        name: "2026 Q3",
        type: "mind",
        project_id: "project-1",
        img_url: "https://example.com/plan.png",
        creator: {
          user_id: "user-1",
          domain_id: "domain-1",
          nick_name: "Alice",
          first_name: "Alice"
        }
      }
    },
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3",
      type: "mind",
      imageUrl: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      },
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/management",
      bodyIncludes: ["\"name\":\"2026 Q3\"", "\"type\":\"mind\""]
    }
  },
  {
    name: "executes req_create_plan_work_item through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_plan_work_item"),
    input: createReqCreatePlanWorkItemInput(),
    responsePayload: {
      status: "success",
      result: {
        issue: {
          id: 101,
          subject: "Epic A",
          description: "Plan item",
          status: { id: 1, name: "New" },
          tracker: { id: 5, name: "Epic" },
          project: { identifier: "project-1" }
        }
      }
    },
    expectedItem: {
      id: "101",
      title: "Epic A",
      description: "Plan item",
      status: "New",
      statusId: 1,
      type: "Epic",
      typeId: 5,
      projectId: "project-1",
      planId: "plan-1",
      executed: true
    },
    expectedRequest: {
      path: "/v2/issues/create",
      bodyIncludes: [
        "\"projectUUId\":\"project-1\"",
        "\"subject\":\"Epic A\"",
        "\"plan_id\":\"plan-1\""
      ]
    }
  },
  {
    name: "executes req_create_work_item_template through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_work_item_template"),
    input: createReqCreateWorkItemTemplateInput(),
    responsePayload: {
      result: {},
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      status: "success",
      executed: true
    },
    expectedRequest: {
      path: "/v2/project/templates",
      bodyIncludes: [
        "\"projectUUId\":\"project-1\"",
        "\"trackerId\":7",
        "\"description\":\"<p>story template</p>\"",
        "\"issueFieldConfigs\":[{\"field\":\"status_id\",\"is_required\":1,\"default_value\":\"新建\",\"position\":1}]"
      ]
    }
  },
  {
    name: "executes req_copy_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_copy_work_items"),
    input: createReqCopyWorkItemsInput(),
    responsePayload: {
      result: {
        successIssues: [
          {
            id: 70779173,
            tracker_id: 7,
            project_id: 13281266,
            projectUUId: "project-source",
            subject: "Story A",
            status_id: 1
          }
        ],
        createIssues: [
          {
            id: 80880001,
            tracker_id: 7,
            project_id: 13290000,
            projectUUId: "project-target",
            subject: "Story A",
            status_id: 1
          }
        ],
        errorIssues: []
      },
      status: "success"
    },
    expectedItem: {
      fromProjectId: "project-source",
      toProjectId: "project-target",
      workItemIds: ["70779173", "70779174"],
      copyComments: true,
      copyWorkHours: false,
      status: "success",
      successWorkItems: [
        {
          id: "70779173",
          tracker_id: 7,
          project_id: "13281266",
          project_uuid: "project-source",
          subject: "Story A",
          status_id: 1
        }
      ],
      createdWorkItems: [
        {
          id: "80880001",
          tracker_id: 7,
          project_id: "13290000",
          project_uuid: "project-target",
          subject: "Story A",
          status_id: 1
        }
      ],
      errorWorkItems: [],
      executed: true
    },
    expectedRequest: {
      path: "/v2/workitem/duplication",
      bodyIncludes: [
        "\"fromProjectUUId\":\"project-source\"",
        "\"toProjectUUId\":\"project-target\"",
        "\"issueIds\":\"70779173,70779174\"",
        "\"copyComments\":true",
        "\"copyWorkHours\":false"
      ]
    }
  },
  {
    name: "executes req_create_iteration through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_iteration"),
    input: createReqCreateIterationInput(),
    responsePayload: {
      id: 302
    },
    expectedItem: {
      id: "302",
      projectId: "project-1",
      name: "Sprint 4",
      beginTime: "2026-04-15",
      endTime: "2026-04-28",
      description: "Close backlog",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/iteration",
      bodyIncludes: [
        "\"name\":\"Sprint 4\"",
        "\"begin_time\":\"2026-04-15\"",
        "\"end_time\":\"2026-04-28\""
      ]
    }
  },
  {
    name: "executes req_create_version_v2 through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_version_v2"),
    input: createReqCreateVersionV2Input(),
    responsePayload: {
      result: {
        version: {
          id: 401,
          project_id: "project-1",
          name: "Sprint V2",
          start_date: "1779379200000",
          due_date: "1779984000000",
          status: "0"
        }
      }
    },
    expectedItem: {
      id: "401",
      projectId: "project-1",
      name: "Sprint V2",
      startDate: "1779379200000",
      dueDate: "1779984000000",
      status: "0",
      executed: true
    },
    expectedRequest: {
      path: "/v2/version/create-version",
      method: "GET"
    }
  },
  {
    name: "executes req_update_plan through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_plan"),
    input: createReqUpdatePlanInput(),
    responsePayload: {
      status: "success",
      result: {
        id: "plan-1",
        name: "2026 Q3 Updated",
        type: "mind",
        project_id: "project-1",
        img_url: "https://example.com/plan.png",
        creator: {
          user_id: "user-1",
          domain_id: "domain-1",
          nick_name: "Alice",
          first_name: "Alice"
        }
      }
    },
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3 Updated",
      type: "mind",
      imageUrl: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      },
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/management/plan-1",
      method: "PUT",
      bodyIncludes: ["\"name\":\"2026 Q3 Updated\""]
    }
  },
  {
    name: "executes req_update_plan_image through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_plan_image"),
    input: createReqUpdatePlanImageInput(),
    responsePayload: {
      status: "success",
      result: {
        id: "plan-1",
        name: "2026 Q3 Updated",
        type: "mind",
        project_id: "project-1",
        img_url: "/v1/upload/demo/202604/abc123.png"
      }
    },
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3 Updated",
      type: "mind",
      imageUrl: "/v1/upload/demo/202604/abc123.png",
      updated: true,
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/management/plan-1/img",
      method: "PUT",
      bodyIncludes: ["\"img_url\":\"/v1/upload/demo/202604/abc123.png\""]
    }
  },
  {
    name: "executes req_update_iteration through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_iteration"),
    input: createReqUpdateIterationInput(),
    responsePayload: {},
    expectedItem: {
      id: "301",
      projectId: "project-1",
      name: "Sprint 4 Updated",
      beginTime: "2026-04-16",
      endTime: "2026-04-29",
      description: "Updated backlog",
      status: "2",
      overType: "auto",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/iterations/301",
      method: "PUT",
      bodyIncludes: ["\"name\":\"Sprint 4 Updated\"", "\"status\":\"2\"", "\"over_type\":\"auto\""]
    }
  },
  {
    name: "executes req_clear_plan_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_clear_plan_work_items"),
    input: createReqClearPlanWorkItemsInput(),
    responsePayload: {
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      cleared: true,
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/plan-1/issue",
      method: "DELETE"
    }
  },
  {
    name: "executes req_delete_plan through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_plan"),
    input: createReqDeletePlanInput(),
    responsePayload: {
      status: "success"
    },
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v3/plan/project-1/management",
      method: "DELETE",
      bodyIncludes: ["[\"plan-1\"]"]
    }
  },
  {
    name: "executes req_delete_iteration through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_iteration"),
    input: createReqDeleteIterationInput(),
    responsePayload: {},
    expectedItem: {
      id: "301",
      projectId: "project-1",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/iterations/301",
      method: "DELETE"
    }
  },
  {
    name: "executes req_batch_delete_iterations through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_delete_iterations"),
    input: createReqBatchDeleteIterationsInput(),
    responsePayload: null,
    expectedItem: {
      projectId: "project-1",
      iterationIds: ["301", "302"],
      deletedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/iterations",
      method: "DELETE",
      bodyIncludes: ["\"iteration_ids\":[\"301\",\"302\"]"]
    }
  },
  {
    name: "executes req_update_iteration_state through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_iteration_state"),
    input: createReqUpdateIterationStateInput(),
    responsePayload: {
      result: "",
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      iterationId: "301",
      name: "Sprint 4",
      status: "2",
      startDate: "2026-04-15",
      dueDate: "2026-04-28",
      result: "",
      updateStatus: "success",
      executed: true
    },
    expectedRequest: {
      path: "/v2/version/state/update",
      bodyIncludes: [
        "\"project_id\":\"project-1\"",
        "\"id\":\"301\"",
        "\"status\":\"2\""
      ]
    }
  },
  {
    name: "executes req_create_iteration_work_item through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_create_iteration_work_item"),
    input: createReqCreateIterationWorkItemInput(),
    responsePayload: {
      id: 102,
      name: "Story A",
      description: "Iteration scoped story",
      status: { id: 7, name: "New" },
      tracker: { id: 5, name: "Story" }
    },
    expectedItem: {
      id: "102",
      title: "Story A",
      description: "Iteration scoped story",
      status: "New",
      statusId: 7,
      type: "Story",
      typeId: 5,
      projectId: "project-1",
      iterationId: "iteration-1",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issue",
      bodyIncludes: [
        "\"name\":\"Story A\"",
        "\"iteration_id\":\"iteration-1\"",
        "\"module_id\":\"module-1\"",
        "\"severity_id\":11",
        "\"assigned_id\":\"user-2\"",
        "\"developer_id\":4091",
        "\"parent_issue_id\":9001",
        "\"done_ratio\":20",
        "\"expected_work_hours\":8",
        "\"begin_time\":\"2028-04-15\"",
        "\"end_time\":\"2028-04-22\""
      ]
    }
  },
  {
    name: "executes req_create_work_item through the session-aware runtime client",
    createHandler: createSessionAwareReqCreateWorkItemHandler,
    input: createReqCreateWorkItemInput(),
    responsePayload: {
      id: 101,
      name: "Add login",
      description: "Implement login flow",
      status: { id: 7, name: "New" },
      tracker: { id: 5, name: "Story" }
    },
    expectedItem: {
      id: "101",
      title: "Add login",
      status: "New",
      type: "Story",
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issue",
      bodyIncludes: [
        "\"name\":\"Add login\"",
        "\"iteration_id\":\"iteration-1\"",
        "\"module_id\":\"module-1\"",
        "\"severity_id\":11",
        "\"assigned_id\":\"user-2\"",
        "\"done_ratio\":20",
        "\"expected_work_hours\":8",
        "\"begin_time\":\"2028-04-15\"",
        "\"end_time\":\"2028-04-22\""
      ]
    }
  },
  {
    name: "executes req_quick_create_child_work_item through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_quick_create_child_work_item"),
    input: createReqQuickCreateChildWorkItemInput(),
    responsePayload: {
      status: "success",
      result: {
        issue: {
          id: 70800001,
          subject: "Child Story",
          description: "<p>created</p>",
          parent_issue_id: 70779173,
          assigned_to_id: 101,
          fixed_version_id: "123.0",
          projectUUId: "project-1",
          status: { id: 1, name: "New" },
          tracker: { id: 7, name: "Story" }
        }
      }
    },
    expectedItem: {
      id: "70800001",
      title: "Child Story",
      status: "New",
      type: "Story",
      projectId: "project-1",
      parentIssueId: 70779173,
      assignedToId: 101,
      fixedVersionId: "123.0",
      executed: true
    },
    expectedRequest: {
      path: "/v2/issues/quick-issue",
      bodyIncludes: [
        "\"projectUUId\":\"project-1\"",
        "\"subject\":\"Child Story\"",
        "\"parent_issue_id\":70779173",
        "\"tracker_id\":7",
        "\"assigned_to_id\":101",
        "\"fixed_version_id\":\"123.0\""
      ]
    }
  },
  {
    name: "executes req_delete_work_item through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_work_item"),
    input: createReqDeleteWorkItemInput(),
    responsePayload: null,
    expectedItem: {
      id: "70779173",
      projectId: "project-1",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issues/70779173",
      method: "DELETE"
    }
  },
  {
    name: "executes req_update_work_item through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_work_item"),
    input: createReqUpdateWorkItemInput(),
    responsePayload: {
      id: 70779173,
      name: "Refine login flow",
      description: "Clarify edge cases",
      status: { id: 3, name: "Doing" },
      tracker: { id: 7, name: "Story" }
    },
    expectedItem: {
      id: "70779173",
      title: "Refine login flow",
      description: "Clarify edge cases",
      status: "Doing",
      statusId: 3,
      type: "Story",
      typeId: 7,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issues/70779173",
      method: "PUT",
      bodyIncludes: [
        "\"name\":\"Refine login flow\"",
        "\"description\":\"Clarify edge cases\"",
        "\"status_id\":3",
        "\"tracker_id\":7",
        "\"priority_id\":1",
        "\"iteration_id\":\"iteration-1\"",
        "\"module_id\":\"module-1\"",
        "\"severity_id\":11",
        "\"assigned_id\":\"user-2\"",
        "\"done_ratio\":60",
        "\"expected_work_hours\":13",
        "\"begin_time\":\"2028-04-15\"",
        "\"end_time\":\"2028-04-22\""
      ]
    }
  },
  {
    name: "executes req_batch_update_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_update_work_items"),
    input: createReqBatchUpdateWorkItemsInput(),
    responsePayload: {},
    expectedItem: {
      projectId: "project-1",
      workItemIds: ["70779173", "70779174"],
      statusId: 3,
      priorityId: 2,
      severityId: 11,
      assignedId: "user-2",
      doneRatio: 40,
      iterationId: "iteration-1",
      moduleId: "module-1",
      updatedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v2/projects/project-1/issues/batch-update",
      method: "PUT",
      bodyIncludes: [
        "\"id\":[\"70779173\",\"70779174\"]",
        "\"attribute\":{",
        "\"status_id\":3",
        "\"priority_id\":2",
        "\"severity_id\":11",
        "\"assigned_id\":\"user-2\"",
        "\"developer_id\":4091",
        "\"done_ratio\":40",
        "\"iteration_id\":\"iteration-1\"",
        "\"module_id\":\"module-1\""
      ]
    }
  },
  {
    name: "executes req_batch_delete_work_items through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_batch_delete_work_items"),
    input: createReqBatchDeleteWorkItemsInput(),
    responsePayload: {},
    responseInit: { status: 204 },
    expectedItem: {
      projectId: "project-1",
      workItemIds: ["70779173", "70779174"],
      deletedCount: 2,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issues",
      method: "DELETE",
      bodyIncludes: ["\"issue_ids\":[\"70779173\",\"70779174\"]"]
    }
  },
  {
    name: "executes req_update_cache_data through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_cache_data"),
    input: createReqUpdateCacheDataInput(),
    responsePayload: {
      result: {
        cache_id: 1111,
        updated_count: 2,
        fields: [
          {
            id: "subject",
            field: "subject",
            header: "Subject",
            type: "text",
            visible: true,
            order: 1
          }
        ]
      },
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cacheId: 1111,
      updatedCount: 2,
      fields: [
        {
          id: "subject",
          field: "subject",
          header: "Subject",
          type: "text",
          visible: true,
          order: 1
        }
      ],
      executed: true
    },
    expectedRequest: {
      path: "/v3/job-cache/update-cache",
      bodyIncludes: [
        "\"projectUUId\":\"project-1\"",
        "\"type\":\"backlog\"",
        "\"region\":\"cn-north-4\"",
        "\"visibleFields\":[\"subject\",\"status\"]",
        "\"field\":\"subject\""
      ]
    }
  },
  {
    name: "executes req_update_cache_setting through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_cache_setting"),
    input: createReqUpdateCacheSettingInput(),
    responsePayload: {
      result: {
        fields: [{ field: "subject", name: "Subject", type: "text" }],
        visibleFields: [{ field: "status", name: "Status", type: "option" }]
      },
      status: "success"
    },
    expectedItem: {
      projectId: "project-1",
      type: "backlog",
      fields: [{ field: "subject", name: "Subject", type: "text" }],
      visibleFields: [{ field: "status", name: "Status", type: "option" }],
      executed: true
    },
    expectedRequest: {
      path: "/v3/job-cache/cache-setting",
      bodyIncludes: [
        "\"projectUUId\":\"project-1\"",
        "\"type\":\"backlog\"",
        "\"fields\":[\"subject\",\"status\"]"
      ]
    }
  },
  {
    name: "executes req_add_work_item_comment through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_work_item_comment"),
    input: createReqAddWorkItemCommentInput(),
    responsePayload: {
      result: {
        issue: {
          id: 70779173
        }
      },
      status: "success"
    },
    expectedItem: {
      workItemId: "70779173",
      content: "First comment",
      executed: true
    },
    expectedRequest: {
      path: "/v2/issues/update-issue-notes",
      bodyIncludes: [
        "\"id\":\"70779173\"",
        "\"notes\":\"First comment\"",
        "\"projectUUId\":\"project-1\"",
        "\"type\":\"scrum\""
      ]
    }
  },
  {
    name: "executes req_upload_work_item_image through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_upload_work_item_image"),
    input: createReqUploadWorkItemImageInput(),
    responsePayload: {
      img_id: "1",
      img_url: "/v1/upload/demo/202604/demo.png"
    },
    expectedItem: {
      projectId: "project-1",
      fileName: "req-upload-image.png",
      imageId: "1",
      imageUrl: "/v1/upload/demo/202604/demo.png",
      executed: true
    },
    expectedRequest: {
      path: "/v2/project-1/img"
    }
  },
  {
    name: "executes req_add_work_item_work_hour through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_add_work_item_work_hour"),
    input: createReqAddWorkItemWorkHourInput(),
    responsePayload: {
      result: {
        data: [
          {
            id: "wh-1",
            issue_id: 70779173,
            user_id: "user-1",
            user_num_id: 1001,
            user_name: "alice",
            nick_name: "Alice",
            work_date: "2025/07/25",
            work_date_timestamp: "1753372800000",
            work_hours: "1.0",
            region: "example"
          }
        ]
      },
      status: "success"
    },
    expectedItem: {
      id: "wh-1",
      workItemId: "70779173",
      workDate: "2025/07/25",
      workDateTimestamp: "1753372800000",
      workHours: "1.0",
      region: "example",
      author: {
        userId: "user-1",
        userNumId: 1001,
        userName: "alice",
        nickName: "Alice"
      },
      executed: true
    },
    expectedRequest: {
      path: "/v3/projects/project-1/issues/70779173/work-hours",
      bodyIncludes: [
        "\"work_hours\":1",
        "\"start_date\":\"2025-07-25\"",
        "\"due_date\":\"2025-07-25\"",
        "\"region\":\"example\""
      ]
    }
  },
  {
    name: "executes req_delete_attachment through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_delete_attachment"),
    input: createReqDeleteAttachmentInput(),
    responsePayload: null,
    responseInit: { status: 204 },
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      deleted: true,
      executed: true
    },
    expectedRequest: {
      path: "/v4/projects/project-1/issues/70779173/attachments/72372",
      method: "DELETE"
    }
  },
  {
    name: "executes req_update_work_item_comment through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_work_item_comment"),
    input: createReqUpdateWorkItemCommentInput(),
    responsePayload: {
      result: {
        status: "success"
      },
      status: "success"
    },
    expectedItem: {
      workItemId: "70779173",
      commentId: "comment-1",
      content: "Updated comment",
      status: "success",
      executed: true
    },
    expectedRequest: {
      path: "/v2/workitem/issue-note",
      bodyIncludes: [
        "\"id\":\"70779173\"",
        "\"noteId\":\"comment-1\"",
        "\"notes\":\"Updated comment\"",
        "\"projectUUId\":\"project-1\"",
        "\"type\":\"scrum\""
      ]
    }
  },
  {
    name: "executes req_update_work_item_flow through the registered session-aware runtime client",
    createHandler: (store: SessionStore) =>
      readRegisteredHandler(bootstrapHttpRuntime({ store }).server, "req_update_work_item_flow"),
    input: createReqUpdateWorkItemFlowInput(),
    responsePayload: {
      result: {
        issue: {
          id: 70779173,
          subject: "Align acceptance criteria",
          updated_on: "2026-04-23T10:00:00Z",
          tracker: {
            id: 7,
            name: "Story"
          },
          status: {
            id: 3,
            name: "Resolved"
          }
        }
      },
      status: "success"
    },
    expectedItem: {
      workItemId: "70779173",
      title: "Align acceptance criteria",
      statusId: 3,
      status: "Resolved",
      typeId: 7,
      type: "Story",
      updatedOn: "2026-04-23T10:00:00Z",
      executed: true
    },
    expectedRequest: {
      path: "/v2/workitem/issue-flowage",
      bodyIncludes: [
        "\"status_id\":3",
        "\"projectUUId\":\"project-1\"",
        "\"id\":\"70779173\"",
        "\"type\":\"scrum\""
      ]
    }
  },
  {
    name: "executes deploy_create_application through the session-aware runtime client",
    createHandler: createSessionAwareDeployCreateApplicationHandler,
    input: createDeployCreateApplicationInput(),
    responsePayload: {
      application_id: "app-1",
      name: "App-20260420",
      arrange_infos: [{ task_id: "task-1" }]
    },
    expectedItem: {
      id: "app-1",
      name: "App-20260420",
      taskId: "task-1",
      executed: true
    },
    expectedRequest: {
      path: "/v1/applications",
      bodyIncludes: ["\"name\":\"App-20260420\""]
    }
  },
  {
    name: "executes pipeline_run_pipeline through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRunPipelineHandler,
    input: createProjectPipelineRunInput({
      branch: "main",
      description: "manual trigger"
    }),
    responsePayload: {
      pipeline_run_id: "run-1"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      branch: "main",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/run",
      bodyIncludes: ["\"target_branch\":\"main\""]
    }
  },
  {
    name: "executes pipeline_stop_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineStopRunHandler,
    input: {
      pipeline_id: "pipeline-1",
      run_id: "run-1",
      dry_run: false
    },
    responsePayload: {
      pipeline_id: "pipeline-1",
      pipeline_name: "release-main"
    },
    expectedItem: {
      pipelineId: "pipeline-1",
      pipelineName: "release-main",
      pipelineRunId: "run-1",
      executed: true
    },
    expectedRequest: {
      path: "/v5/pipelines/pipeline-1/pipeline-runs/run-1/stop"
    }
  },
  {
    name: "executes pipeline_retry_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRetryRunHandler,
    input: createProjectPipelineRunInput(),
    responsePayload: {
      pipeline_run_id: "run-2"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      sourceRunId: "run-1",
      pipelineRunId: "run-2",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/retry"
    }
  },
  {
    name: "executes pipeline_approve_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineApproveRunHandler,
    input: createProjectPipelineReviewInput(),
    responsePayload: {
      pipeline_run_id: "run-1",
      job_run_id: "job-1",
      step_run_id: "step-1",
      status: "PASSED"
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      status: "PASSED",
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/pass",
      bodyIncludes: ["\"job_run_id\":\"job-1\"", "\"step_run_id\":\"step-1\""]
    }
  },
  {
    name: "executes pipeline_reject_run through the session-aware runtime client",
    createHandler: createSessionAwarePipelineRejectRunHandler,
    input: createProjectPipelineReviewInput(),
    responsePayload: {
      success: true
    },
    expectedItem: {
      projectId: "project-1",
      pipelineId: "pipeline-1",
      pipelineRunId: "run-1",
      jobId: "job-1",
      stepId: "step-1",
      success: true,
      executed: true
    },
    expectedRequest: {
      path: "/v5/project-1/api/pipelines/pipeline-1/pipeline-runs/run-1/reject",
      bodyIncludes: ["\"job_run_id\":\"job-1\"", "\"step_run_id\":\"step-1\""]
    }
  }
];

const dryRunCases: DryRunCase[] = [
  {
    name: "short-circuits req_add_project_member dry runs without HTTP or rate-limit consumption",
    toolName: "req_add_project_member",
    input: {
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      domain_name: "tenant-a",
      role_id: -1,
      dry_run: true
    },
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      domainId: "domain-1",
      domainName: "tenant-a",
      roleId: -1,
      added: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_add_project_members dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_add_project_members",
    input: {
      project_id: "project-1",
      members: [{ user_id: "user-1", role_id: -1 }],
      dry_run: true
    },
    expectedItem: {
      projectId: "project-1",
      members: [{ userId: "user-1", roleId: -1 }],
      addedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_delete_project_members dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_delete_project_members",
    input: {
      project_id: "project-1",
      user_ids: ["user-1"],
      dry_run: true
    },
    expectedItem: {
      projectId: "project-1",
      userIds: ["user-1"],
      removedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_update_child_user_nicknames dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_update_child_user_nicknames",
    input: {
      users: [{ user_id: "user-1", nick_name: "Alice" }],
      dry_run: true
    },
    expectedItem: {
      users: [{ user_id: "user-1", nick_name: "Alice" }],
      updatedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_project_member_role dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_project_member_role",
    input: {
      project_id: "project-1",
      user_id: "user-1",
      role_id: -1,
      dry_run: true
    },
    expectedItem: {
      projectId: "project-1",
      userId: "user-1",
      roleId: -1,
      updated: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_leave_project dry runs without HTTP or rate-limit consumption",
    toolName: "req_leave_project",
    input: {
      project_id: "project-1",
      dry_run: true
    },
    expectedItem: {
      projectId: "project-1",
      left: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_delete_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_delete_work_items",
    input: createReqBatchDeleteWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemIds: ["70779173", "70779174"],
      deletedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_add_iteration_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_add_iteration_work_items",
    input: createReqAddIterationWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      iterationId: "iteration-1",
      workItemIds: ["70779173", "70779174"],
      addedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_add_plan_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_add_plan_work_items",
    input: createReqAddPlanWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      workItemIds: ["70779173", "70779174"],
      addedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_create_plan dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_plan",
    input: createReqCreatePlanInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      name: "2026 Q3",
      type: "mind",
      executed: false
    }
  },
  {
    name: "short-circuits req_create_plan_work_item dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_plan_work_item",
    input: createReqCreatePlanWorkItemInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      title: "Epic A",
      workItemType: "Epic",
      executed: false
    }
  },
  {
    name: "short-circuits req_create_work_item_template dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_work_item_template",
    input: createReqCreateWorkItemTemplateInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      executed: false
    }
  },
  {
    name: "short-circuits req_quick_create_child_work_item dry runs without HTTP or rate-limit consumption",
    toolName: "req_quick_create_child_work_item",
    input: createReqQuickCreateChildWorkItemInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      title: "Child Story",
      parentIssueId: 70779173,
      trackerId: 7,
      assignedToId: 101,
      fixedVersionId: "123.0",
      executed: false
    }
  },
  {
    name: "short-circuits req_copy_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_copy_work_items",
    input: createReqCopyWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      fromProjectId: "project-source",
      toProjectId: "project-target",
      workItemIds: ["70779173", "70779174"],
      copyComments: true,
      copyWorkHours: false,
      successWorkItems: [],
      createdWorkItems: [],
      errorWorkItems: [],
      executed: false
    }
  },
  {
    name: "short-circuits req_create_iteration_work_item dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_iteration_work_item",
    input: createReqCreateIterationWorkItemInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      iterationId: "iteration-1",
      title: "Story A",
      workItemType: "Story",
      executed: false
    }
  },
  {
    name: "short-circuits req_create_iteration dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_iteration",
    input: createReqCreateIterationInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      name: "Sprint 4",
      beginTime: "2026-04-15",
      endTime: "2026-04-28",
      description: "Close backlog",
      executed: false
    }
  },
  {
    name: "short-circuits req_create_version_v2 dry runs without HTTP or rate-limit consumption",
    toolName: "req_create_version_v2",
    input: createReqCreateVersionV2Input({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      name: "Sprint V2",
      startDate: 1779379200000,
      dueDate: 1779984000000,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_plan dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_plan",
    input: createReqUpdatePlanInput({
      dry_run: true
    }),
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3 Updated",
      executed: false
    }
  },
  {
    name: "short-circuits req_update_plan_image dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_plan_image",
    input: createReqUpdatePlanImageInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      imageUrl: "/v1/upload/demo/202604/abc123.png",
      updated: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_iteration dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_iteration",
    input: createReqUpdateIterationInput({
      dry_run: true
    }),
    expectedItem: {
      id: "301",
      projectId: "project-1",
      name: "Sprint 4 Updated",
      beginTime: "2026-04-16",
      endTime: "2026-04-29",
      description: "Updated backlog",
      status: "2",
      overType: "auto",
      executed: false
    }
  },
  {
    name: "short-circuits req_clear_plan_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_clear_plan_work_items",
    input: createReqClearPlanWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      planId: "plan-1",
      cleared: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_delete_plan dry runs without HTTP or rate-limit consumption",
    toolName: "req_delete_plan",
    input: createReqDeletePlanInput({
      dry_run: true
    }),
    expectedItem: {
      id: "plan-1",
      projectId: "project-1",
      deleted: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_delete_iteration dry runs without HTTP or rate-limit consumption",
    toolName: "req_delete_iteration",
    input: createReqDeleteIterationInput({
      dry_run: true
    }),
    expectedItem: {
      id: "301",
      projectId: "project-1",
      deleted: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_delete_iterations dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_delete_iterations",
    input: createReqBatchDeleteIterationsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      iterationIds: ["301", "302"],
      deletedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_iteration_state dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_iteration_state",
    input: createReqUpdateIterationStateInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      iterationId: "301",
      name: "Sprint 4",
      status: "2",
      startDate: "2026-04-15",
      dueDate: "2026-04-28",
      executed: false
    }
  },
  {
    name: "short-circuits req_delete_work_item dry runs without HTTP or rate-limit consumption",
    toolName: "req_delete_work_item",
    input: createReqDeleteWorkItemInput({
      dry_run: true
    }),
    expectedItem: {
      id: "70779173",
      projectId: "project-1",
      deleted: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_cache_data dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_cache_data",
    input: createReqUpdateCacheDataInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cacheId: undefined,
      visibleFieldIds: ["subject", "status"],
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ],
      updatedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_cache_setting dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_cache_setting",
    input: createReqUpdateCacheSettingInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      type: "backlog",
      fieldIds: ["subject", "status"],
      fields: [],
      visibleFields: [],
      executed: false
    }
  },
  {
    name: "short-circuits req_update_work_item dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_work_item",
    input: createReqUpdateWorkItemInput({
      dry_run: true
    }),
    expectedItem: {
      id: "70779173",
      projectId: "project-1",
      title: "Refine login flow",
      iterationId: "iteration-1",
      moduleId: "module-1",
      severityId: 11,
      assignedId: "user-2",
      doneRatio: 60,
      expectedWorkHours: 13,
      startDate: 1839340800000,
      dueDate: 1839945600000,
      executed: false
    }
  },
  {
    name: "short-circuits req_batch_update_work_items dry runs without HTTP or rate-limit consumption",
    toolName: "req_batch_update_work_items",
    input: createReqBatchUpdateWorkItemsInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemIds: ["70779173", "70779174"],
      statusId: 3,
      priorityId: 2,
      severityId: 11,
      assignedId: "user-2",
      doneRatio: 40,
      iterationId: "iteration-1",
      moduleId: "module-1",
      updatedCount: 0,
      executed: false
    }
  },
  {
    name: "short-circuits req_add_work_item_comment dry runs without HTTP or rate-limit consumption",
    toolName: "req_add_work_item_comment",
    input: createReqAddWorkItemCommentInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      content: "First comment",
      executed: false
    }
  },
  {
    name: "short-circuits req_upload_work_item_image dry runs without HTTP or rate-limit consumption",
    toolName: "req_upload_work_item_image",
    input: createReqUploadWorkItemImageInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      filePath: reqUploadImageFixturePath,
      fileName: "req-upload-image.png",
      executed: false
    }
  },
  {
    name: "short-circuits req_add_work_item_work_hour dry runs without HTTP or rate-limit consumption",
    toolName: "req_add_work_item_work_hour",
    input: createReqAddWorkItemWorkHourInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      workHours: 1,
      startDate: "2025-07-25",
      dueDate: "2025-07-25",
      startDateTimestamp: undefined,
      dueDateTimestamp: undefined,
      region: "example",
      executed: false
    }
  },
  {
    name: "short-circuits req_delete_attachment dry runs without HTTP or rate-limit consumption",
    toolName: "req_delete_attachment",
    input: createReqDeleteAttachmentInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      attachmentId: "72372",
      deleted: false,
      executed: false
    }
  },
  {
    name: "short-circuits req_update_work_item_comment dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_work_item_comment",
    input: createReqUpdateWorkItemCommentInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      commentId: "comment-1",
      content: "Updated comment",
      executed: false
    }
  },
  {
    name: "short-circuits req_update_work_item_flow dry runs without HTTP or rate-limit consumption",
    toolName: "req_update_work_item_flow",
    input: createReqUpdateWorkItemFlowInput({
      dry_run: true
    }),
    expectedItem: {
      projectId: "project-1",
      workItemId: "70779173",
      statusId: 3,
      executed: false
    }
  }
];

describe("write path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each(writePathCases)("$name", async ({ createHandler, input, responsePayload, expectedItem, expectedRequest }) => {
    await expectSessionAwareWriteExecution({
      createHandler,
      input,
      responsePayload,
      responseInit: responsePayload === null ? { status: 204 } : undefined,
      expectedItem,
      expectedRequest
    });
  });

  it.each(dryRunCases)("$name", async ({ toolName, input, expectedItem }) => {
    const { server } = bootstrapHttpRuntime();
    const fetchMock = stubJsonFetch({}, { status: 204 });
    const handler = readRegisteredHandler(server, toolName);

    const result = await handler(input, createSessionAuthContext("session-write", "auth-1"));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      structuredContent: {
        item: expectedItem
      }
    });
  });

  it("short-circuits req_create_project dry runs before issuing an HTTP request", async () => {
    const { server } = bootstrapHttpRuntime();
    const fetchMock = stubJsonFetch({
      project_id: "project-1"
    });
    const handler = readRegisteredHandler(server, "req_create_project");

    const result = await handler(
      createReqCreateProjectInput({
        dry_run: true
      }),
      createSessionAuthContext("session-write", "auth-1")
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      structuredContent: {
        item: {
          name: "Alpha",
          executed: false
        }
      }
    });
  });
});
