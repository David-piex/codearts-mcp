import { asItemResult } from "../../../contracts/tool-result.js";

export type ReleasePlanItem = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  state?: string;
  status?: string;
  children?: ReleasePlanItem[];
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

export type ReleasePlanMutationResult = {
  project_id: string;
  status?: string;
  message?: string | null;
  plan: ReleasePlanItem;
};

export type ReleasePlanBatchResult = {
  project_id: string;
  plan_ids: string[];
  status?: string;
  message?: string | null;
  success_num?: number;
  fail_num?: number;
  success: Array<{ id?: string; modified_by?: string }>;
  failed: Array<{ id?: string; modified_by?: string }>;
};

export type MappedReleasePlanItem = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  state?: string;
  status?: string;
  createdBy?: string;
  modifiedBy?: string;
  planStartDate?: string | number;
  planEndDate?: string | number;
  createdDate?: number;
  parentId?: string;
  baseline?: string;
  workload?: string;
  owner?: string;
  children?: MappedReleasePlanItem[];
};

export function toReleasePlanItem(input: ReleasePlanItem): MappedReleasePlanItem {
  return {
    id: input.id,
    title: input.title,
    category: input.category,
    description: input.description,
    state: input.state,
    status: input.status,
    createdBy: input.created_by,
    modifiedBy: input.modified_by,
    planStartDate: input.plan_start_date,
    planEndDate: input.plan_end_date,
    createdDate: input.created_date,
    parentId: input.parent_id,
    baseline: input.baseline,
    workload: input.workload,
    owner: input.owner,
    children: input.children?.map(toReleasePlanItem)
  };
}

export function mapReleasePlanMutation(summary: string, input: ReleasePlanMutationResult) {
  return asItemResult(summary, {
    projectId: input.project_id,
    status: input.status,
    message: input.message,
    plan: toReleasePlanItem(input.plan),
    executed: true
  });
}

export function mapReleasePlanBatch(summary: string, input: ReleasePlanBatchResult) {
  return asItemResult(summary, {
    projectId: input.project_id,
    planIds: input.plan_ids,
    status: input.status,
    message: input.message,
    successNum: input.success_num,
    failNum: input.fail_num,
    success: input.success,
    failed: input.failed,
    executed: true
  });
}
