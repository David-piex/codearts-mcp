import { Buffer } from "node:buffer";
import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  reqGetIpdE2EGraphInput,
  reqGetIpdIssueInput,
  reqGetIpdProcessInstanceInput,
  reqGetIpdProjectFieldOptionUsedInput,
  reqGetIpdReviewFormInput,
  reqGetIpdTenantFieldOptionUsedInput,
  reqGetIpdTenantFieldUsedInput,
  reqGetIpdStatisticDashboardInput,
  reqGetIpdWorkItemFlowDetailInput,
  reqGroupIpdIssuesInput,
  reqDownloadIpdIssueAttachmentInput,
  reqDownloadIpdIssueImageInput,
  reqListIpdAttachedWikisInput,
  reqListIpdCategoryStatusesInput,
  reqListIpdChangeReviewIssueApproversInput,
  reqListIpdIssueAttachmentsInput,
  reqListIpdIssueTreeInput,
  reqListIpdProcessInstancesInput,
  reqListIpdReviewFormsInput,
  reqListIpdReviewRoleUsersInput,
  reqListIpdTenantIssuesInput,
  reqListIpdWorkHourCategoriesInput,
  reqListIpdWorkHoursInput,
  reqListIpdFeatureSetsInput,
  reqListIpdIssueFieldsInput,
  reqListIpdIssueRelationConfigInput,
  reqListIpdIssuesInput,
  reqListIpdLabelsInput,
  reqListIpdModulesInput,
  reqListIpdProjectFieldsInput,
  reqListIpdProjectUsersInput,
  reqListIpdProjectsInput,
  reqListIpdSnapshotFeaturesInput,
  reqListIpdSnapshotVersionsInput,
  reqListIpdStatusesInput,
  reqListIpdTenantFieldsInput,
  reqListIpdWorkflowFieldsInput,
  reqListIpdWorkflowTemplatesInput
} from "../schemas.js";
import {
  mapIpdIssue,
  mapIpdAttachment,
  mapIpdDashboardItem,
  mapIpdFieldUsage,
  mapIpdNamedItem,
  mapIpdWiki,
  mapIpdWorkHour,
  mapIpdProject,
  mapIpdReviewEntity,
  mapIpdUser,
  type ReqIpdAttachment,
  type ReqIpdDashboardItem,
  type ReqIpdFieldUsage,
  type ReqIpdIssue,
  type ReqIpdNamedItem,
  type ReqIpdProject,
  type ReqIpdReviewEntity,
  type ReqIpdUser,
  type ReqIpdWiki,
  type ReqIpdWorkHour
} from "./ipd-mappers.js";

type ReqIpdReadClient = {
  listIpdProjects: (input: { search?: string; model?: string; model_id?: string }) => Promise<{ projects: ReqIpdProject[] }>;
  listIpdProjectUsers: (input: { project_id: string }) => Promise<{ users: ReqIpdUser[] }>;
  getIpdIssue: (input: { project_id: string; issue_id: string; version: "v1" | "v2" }) => Promise<ReqIpdIssue>;
  listIpdChangeReviewIssueApprovers: (input: {
    project_id: string;
    issue_id: string;
  }) => Promise<{ users: ReqIpdUser[]; total?: number }>;
  listIpdIssues: (input: {
    project_id: string;
    issue_type: string;
    page: number;
    page_size: number;
    filter?: Array<Record<string, unknown>>;
    filter_mode: "OR_AND" | "AND_OR";
  }) => Promise<{ issues: ReqIpdIssue[]; total?: number }>;
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
  listIpdAttachedWikis: (input: {
    project_id: string;
    issue_id: string;
    category?: string;
  }) => Promise<{ wikis: ReqIpdWiki[]; total?: number }>;
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
  listIpdModules: (input: { project_id: string; page: number; page_size: number }) => Promise<{ modules: ReqIpdNamedItem[]; total?: number }>;
  listIpdStatuses: (input: { project_id: string; category_id?: string }) => Promise<{ statuses: ReqIpdNamedItem[] }>;
  listIpdIssueRelationConfig: (input: { project_id: string }) => Promise<{ relations: ReqIpdNamedItem[]; raw?: unknown }>;
  listIpdLabels: (input: { project_id: string; page: number; page_size: number }) => Promise<{ labels: ReqIpdNamedItem[]; total?: number }>;
  listIpdProjectFields: (input: { project_id: string; page: number; page_size: number }) => Promise<{ fields: ReqIpdNamedItem[]; total?: number }>;
  listIpdIssueFields: (input: { project_id: string; category_id: string }) => Promise<{ fields: ReqIpdNamedItem[] }>;
  listIpdTenantFields: (input: {
    page: number;
    page_size: number;
    search?: string;
    sort_info?: { field?: string; asc?: boolean };
  }) => Promise<{ fields: ReqIpdNamedItem[]; total?: number }>;
  getIpdTenantFieldUsed: (input: { field_id: string }) => Promise<{ usage: ReqIpdFieldUsage[] }>;
  getIpdTenantFieldOptionUsed: (input: { code: string }) => Promise<Record<string, number | string>>;
  getIpdProjectFieldOptionUsed: (input: { project_id: string; code: string }) => Promise<Record<string, number | string>>;
  listIpdWorkflowTemplates: (input: { project_id: string; category_id?: string }) => Promise<{ workflows: ReqIpdNamedItem[]; raw?: unknown }>;
  listIpdWorkflowFields: (input: { project_id: string; category_id: string }) => Promise<{ fields: ReqIpdNamedItem[] }>;
  listIpdSnapshotVersions: (input: { project_id: string }) => Promise<{ snapshots: ReqIpdNamedItem[] }>;
  listIpdFeatureSets: (input: { project_id: string; snapshot_version_id?: string }) => Promise<{ feature_sets: ReqIpdNamedItem[] }>;
  listIpdSnapshotFeatures: (input: {
    project_id: string;
    snapshot_version_id: string;
    feature_set_id: string;
    page: number;
    page_size: number;
  }) => Promise<{ issues: ReqIpdIssue[]; total?: number }>;
  getIpdE2EGraph: (input: { project_id: string; issue_id: string; category: string; is_src?: boolean }) => Promise<ReqIpdIssue>;
  listIpdCategoryStatuses: (input: { project_id: string; category_id: string }) => Promise<{ statuses: ReqIpdNamedItem[]; total?: number }>;
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
};

function listText(result: ReturnType<typeof asListResult>) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => (item as { id?: string | number }).id },
      { label: "name", get: (item) => (item as { name?: string; title?: string }).name ?? (item as { title?: string }).title },
      { label: "status", get: (item) => (item as { status?: string }).status }
    ]
  });
}

export function createReqListIpdProjectsHandler(client: Pick<ReqIpdReadClient, "listIpdProjects">) {
  return async (input: unknown) => {
    const parsed = reqListIpdProjectsInput.parse(input);
    const response = await client.listIpdProjects(parsed);
    const result = asListResult(`${response.projects.length} IPD projects found`, response.projects.map(mapIpdProject));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdProjectUsersHandler(client: Pick<ReqIpdReadClient, "listIpdProjectUsers">) {
  return async (input: unknown) => {
    const parsed = reqListIpdProjectUsersInput.parse(input);
    const response = await client.listIpdProjectUsers(parsed);
    const result = asListResult(`${response.users.length} IPD project users found`, response.users.map(mapIpdUser));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdIssueHandler(client: Pick<ReqIpdReadClient, "getIpdIssue">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdIssueInput.parse(input);
    const response = await client.getIpdIssue(parsed);
    const item = mapIpdIssue(response);
    const result = asItemResult(`Loaded IPD issue ${item.id ?? parsed.issue_id}`, item, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdChangeReviewIssueApproversHandler(
  client: Pick<ReqIpdReadClient, "listIpdChangeReviewIssueApprovers">
) {
  return async (input: unknown) => {
    const parsed = reqListIpdChangeReviewIssueApproversInput.parse(input);
    const response = await client.listIpdChangeReviewIssueApprovers(parsed);
    const result = asListResult(
      `${response.users.length} IPD change review issue approvers found`,
      response.users.map(mapIpdUser),
      response.total ? toPageInfo(1, response.users.length || response.total, response.total) : undefined,
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdIssuesHandler(client: Pick<ReqIpdReadClient, "listIpdIssues">) {
  return async (input: unknown) => {
    const parsed = reqListIpdIssuesInput.parse(input);
    const response = await client.listIpdIssues(parsed);
    const result = asListResult(`${response.issues.length} IPD issues found`, response.issues.map(mapIpdIssue), toPageInfo(parsed.page, parsed.page_size, response.total), response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdIssueTreeHandler(client: Pick<ReqIpdReadClient, "listIpdIssueTree">) {
  return async (input: unknown) => {
    const parsed = reqListIpdIssueTreeInput.parse(input);
    const response = await client.listIpdIssueTree(parsed);
    const result = asListResult(
      `${response.issues.length} IPD issue tree items found`,
      response.issues.map(mapIpdIssue),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdAttachedWikisHandler(client: Pick<ReqIpdReadClient, "listIpdAttachedWikis">) {
  return async (input: unknown) => {
    const parsed = reqListIpdAttachedWikisInput.parse(input);
    const response = await client.listIpdAttachedWikis(parsed);
    const result = asListResult(`${response.wikis.length} IPD attached wikis found`, response.wikis.map(mapIpdWiki), undefined, response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdReviewFormsHandler(client: Pick<ReqIpdReadClient, "listIpdReviewForms">) {
  return async (input: unknown) => {
    const parsed = reqListIpdReviewFormsInput.parse(input);
    const response = await client.listIpdReviewForms(parsed);
    const page = Math.floor(parsed.offset / parsed.limit) + 1;
    const result = asListResult(
      `${response.reviews.length} IPD review forms found`,
      response.reviews.map(mapIpdReviewEntity),
      toPageInfo(page, parsed.limit, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdReviewFormHandler(client: Pick<ReqIpdReadClient, "getIpdReviewForm">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdReviewFormInput.parse(input);
    const response = await client.getIpdReviewForm(parsed);
    const item = mapIpdReviewEntity(response);
    const result = asItemResult(`Loaded IPD review form ${item.id ?? parsed.id}`, item, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqGetIpdProcessInstanceHandler(client: Pick<ReqIpdReadClient, "getIpdProcessInstance">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdProcessInstanceInput.parse(input);
    const response = await client.getIpdProcessInstance(parsed);
    const item = mapIpdReviewEntity(response);
    const result = asItemResult(`Loaded IPD process instance ${item.id ?? parsed.id}`, item, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdProcessInstancesHandler(client: Pick<ReqIpdReadClient, "listIpdProcessInstances">) {
  return async (input: unknown) => {
    const parsed = reqListIpdProcessInstancesInput.parse(input);
    const response = await client.listIpdProcessInstances(parsed);
    const result = asListResult(
      `${response.process_instances.length} IPD process instances found`,
      response.process_instances.map(mapIpdReviewEntity),
      toPageInfo(parsed.page.page_no, parsed.page.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdReviewRoleUsersHandler(client: Pick<ReqIpdReadClient, "listIpdReviewRoleUsers">) {
  return async (input: unknown) => {
    const parsed = reqListIpdReviewRoleUsersInput.parse(input);
    const response = await client.listIpdReviewRoleUsers(parsed);
    const result = asListResult(`${response.users.length} IPD review role users found`, response.users.map(mapIpdUser), undefined, response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGroupIpdIssuesHandler(client: Pick<ReqIpdReadClient, "groupIpdIssues">) {
  return async (input: unknown) => {
    const parsed = reqGroupIpdIssuesInput.parse(input);
    const response = await client.groupIpdIssues(parsed);
    const result = asItemResult(
      `${response.data.length} IPD issue groups found`,
      {
        fieldInfo: response.field_info ? mapIpdNamedItem(response.field_info) : undefined,
        groups: response.data.map(mapIpdNamedItem),
        count: response.data.length
      },
      response.raw ?? response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdTenantIssuesHandler(client: Pick<ReqIpdReadClient, "listIpdTenantIssues">) {
  return async (input: unknown) => {
    const parsed = reqListIpdTenantIssuesInput.parse(input);
    const response = await client.listIpdTenantIssues(parsed);
    const result = asListResult(
      `${response.issues.length} IPD tenant issues found`,
      response.issues.map(mapIpdIssue),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdModulesHandler(client: Pick<ReqIpdReadClient, "listIpdModules">) {
  return async (input: unknown) => {
    const parsed = reqListIpdModulesInput.parse(input);
    const response = await client.listIpdModules(parsed);
    const result = asListResult(`${response.modules.length} IPD modules found`, response.modules.map(mapIpdNamedItem), toPageInfo(parsed.page, parsed.page_size, response.total), response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdStatusesHandler(client: Pick<ReqIpdReadClient, "listIpdStatuses">) {
  return async (input: unknown) => {
    const parsed = reqListIpdStatusesInput.parse(input);
    const response = await client.listIpdStatuses(parsed);
    const result = asListResult(`${response.statuses.length} IPD statuses found`, response.statuses.map(mapIpdNamedItem));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdIssueRelationConfigHandler(client: Pick<ReqIpdReadClient, "listIpdIssueRelationConfig">) {
  return async (input: unknown) => {
    const parsed = reqListIpdIssueRelationConfigInput.parse(input);
    const response = await client.listIpdIssueRelationConfig(parsed);
    const result = asListResult(`${response.relations.length} IPD issue relation configs found`, response.relations.map(mapIpdNamedItem), undefined, response.raw);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdLabelsHandler(client: Pick<ReqIpdReadClient, "listIpdLabels">) {
  return async (input: unknown) => {
    const parsed = reqListIpdLabelsInput.parse(input);
    const response = await client.listIpdLabels(parsed);
    const result = asListResult(`${response.labels.length} IPD labels found`, response.labels.map(mapIpdNamedItem), toPageInfo(parsed.page, parsed.page_size, response.total), response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdProjectFieldsHandler(client: Pick<ReqIpdReadClient, "listIpdProjectFields">) {
  return async (input: unknown) => {
    const parsed = reqListIpdProjectFieldsInput.parse(input);
    const response = await client.listIpdProjectFields(parsed);
    const result = asListResult(`${response.fields.length} IPD project fields found`, response.fields.map(mapIpdNamedItem), toPageInfo(parsed.page, parsed.page_size, response.total), response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdIssueFieldsHandler(client: Pick<ReqIpdReadClient, "listIpdIssueFields">) {
  return async (input: unknown) => {
    const parsed = reqListIpdIssueFieldsInput.parse(input);
    const response = await client.listIpdIssueFields(parsed);
    const result = asListResult(`${response.fields.length} IPD issue fields found`, response.fields.map(mapIpdNamedItem));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdTenantFieldsHandler(client: Pick<ReqIpdReadClient, "listIpdTenantFields">) {
  return async (input: unknown) => {
    const parsed = reqListIpdTenantFieldsInput.parse(input);
    const response = await client.listIpdTenantFields(parsed);
    const result = asListResult(
      `${response.fields.length} IPD tenant fields found`,
      response.fields.map(mapIpdNamedItem),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdTenantFieldUsedHandler(client: Pick<ReqIpdReadClient, "getIpdTenantFieldUsed">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdTenantFieldUsedInput.parse(input);
    const response = await client.getIpdTenantFieldUsed(parsed);
    const result = asListResult(
      `${response.usage.length} IPD tenant field usages found`,
      response.usage.map(mapIpdFieldUsage),
      undefined,
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdTenantFieldOptionUsedHandler(
  client: Pick<ReqIpdReadClient, "getIpdTenantFieldOptionUsed">
) {
  return async (input: unknown) => {
    const parsed = reqGetIpdTenantFieldOptionUsedInput.parse(input);
    const usage = await client.getIpdTenantFieldOptionUsed(parsed);
    const result = asItemResult(`${Object.keys(usage).length} IPD tenant field options used`, {
      code: parsed.code,
      usage
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqGetIpdProjectFieldOptionUsedHandler(
  client: Pick<ReqIpdReadClient, "getIpdProjectFieldOptionUsed">
) {
  return async (input: unknown) => {
    const parsed = reqGetIpdProjectFieldOptionUsedInput.parse(input);
    const usage = await client.getIpdProjectFieldOptionUsed(parsed);
    const result = asItemResult(`${Object.keys(usage).length} IPD project field options used`, {
      projectId: parsed.project_id,
      code: parsed.code,
      usage
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdWorkflowTemplatesHandler(client: Pick<ReqIpdReadClient, "listIpdWorkflowTemplates">) {
  return async (input: unknown) => {
    const parsed = reqListIpdWorkflowTemplatesInput.parse(input);
    const response = await client.listIpdWorkflowTemplates(parsed);
    const result = asListResult(`${response.workflows.length} IPD workflow templates found`, response.workflows.map(mapIpdNamedItem), undefined, response.raw);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdWorkflowFieldsHandler(client: Pick<ReqIpdReadClient, "listIpdWorkflowFields">) {
  return async (input: unknown) => {
    const parsed = reqListIpdWorkflowFieldsInput.parse(input);
    const response = await client.listIpdWorkflowFields(parsed);
    const result = asListResult(`${response.fields.length} IPD workflow fields found`, response.fields.map(mapIpdNamedItem));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdSnapshotVersionsHandler(client: Pick<ReqIpdReadClient, "listIpdSnapshotVersions">) {
  return async (input: unknown) => {
    const parsed = reqListIpdSnapshotVersionsInput.parse(input);
    const response = await client.listIpdSnapshotVersions(parsed);
    const result = asListResult(`${response.snapshots.length} IPD snapshot versions found`, response.snapshots.map(mapIpdNamedItem));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdFeatureSetsHandler(client: Pick<ReqIpdReadClient, "listIpdFeatureSets">) {
  return async (input: unknown) => {
    const parsed = reqListIpdFeatureSetsInput.parse(input);
    const response = await client.listIpdFeatureSets(parsed);
    const result = asListResult(`${response.feature_sets.length} IPD feature sets found`, response.feature_sets.map(mapIpdNamedItem));
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdSnapshotFeaturesHandler(client: Pick<ReqIpdReadClient, "listIpdSnapshotFeatures">) {
  return async (input: unknown) => {
    const parsed = reqListIpdSnapshotFeaturesInput.parse(input);
    const response = await client.listIpdSnapshotFeatures(parsed);
    const result = asListResult(
      `${response.issues.length} IPD snapshot features found`,
      response.issues.map(mapIpdIssue),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdE2EGraphHandler(client: Pick<ReqIpdReadClient, "getIpdE2EGraph">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdE2EGraphInput.parse(input);
    const response = await client.getIpdE2EGraph(parsed);
    const item = mapIpdIssue(response);
    const result = asItemResult(`Loaded IPD E2E graph for issue ${item.id ?? parsed.issue_id}`, item, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdCategoryStatusesHandler(client: Pick<ReqIpdReadClient, "listIpdCategoryStatuses">) {
  return async (input: unknown) => {
    const parsed = reqListIpdCategoryStatusesInput.parse(input);
    const response = await client.listIpdCategoryStatuses(parsed);
    const result = asListResult(`${response.statuses.length} IPD category statuses found`, response.statuses.map(mapIpdNamedItem), undefined, response);
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdStatisticDashboardHandler(client: Pick<ReqIpdReadClient, "getIpdStatisticDashboard">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdStatisticDashboardInput.parse(input);
    const response = await client.getIpdStatisticDashboard(parsed);
    const result = asListResult(
      `${response.items.length} IPD statistic dashboard rows found`,
      response.items.map(mapIpdDashboardItem),
      undefined,
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqGetIpdWorkItemFlowDetailHandler(client: Pick<ReqIpdReadClient, "getIpdWorkItemFlowDetail">) {
  return async (input: unknown) => {
    const parsed = reqGetIpdWorkItemFlowDetailInput.parse(input);
    const response = await client.getIpdWorkItemFlowDetail(parsed);
    const result = asItemResult(
      `Loaded IPD work item flow detail for issue ${parsed.issue_id}`,
      {
        issueId: parsed.issue_id,
        issueCategory: parsed.issue_category,
        nextFlowCount: response.next_flow?.length ?? 0
      },
      response.raw ?? response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdIssueAttachmentsHandler(client: Pick<ReqIpdReadClient, "listIpdIssueAttachments">) {
  return async (input: unknown) => {
    const parsed = reqListIpdIssueAttachmentsInput.parse(input);
    const response = await client.listIpdIssueAttachments(parsed);
    const result = asListResult(
      `${response.attachments.length} IPD issue attachments found`,
      response.attachments.map(mapIpdAttachment),
      undefined,
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqDownloadIpdIssueAttachmentHandler(
  client: Pick<ReqIpdReadClient, "downloadIpdIssueAttachment">
) {
  return async (input: unknown) => {
    const parsed = reqDownloadIpdIssueAttachmentInput.parse(input);
    const response = await client.downloadIpdIssueAttachment(parsed);
    const result = asItemResult(`Downloaded IPD attachment ${parsed.attachment_id}`, {
      projectId: response.project_id,
      attachmentId: response.attachment_id,
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDownloadIpdIssueImageHandler(client: Pick<ReqIpdReadClient, "downloadIpdIssueImage">) {
  return async (input: unknown) => {
    const parsed = reqDownloadIpdIssueImageInput.parse(input);
    const response = await client.downloadIpdIssueImage(parsed);
    const result = asItemResult(`Downloaded IPD issue image ${parsed.file_name}`, {
      projectId: response.project_id,
      issueId: response.issue_id,
      fileName: response.file_name,
      contentType: response.content_type,
      sizeBytes: response.body.byteLength,
      contentBase64: Buffer.from(response.body).toString("base64")
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqListIpdWorkHoursHandler(client: Pick<ReqIpdReadClient, "listIpdWorkHours">) {
  return async (input: unknown) => {
    const parsed = reqListIpdWorkHoursInput.parse(input);
    const response = await client.listIpdWorkHours(parsed);
    const result = asListResult(
      `${response.work_hours.length} IPD work hours found`,
      response.work_hours.map(mapIpdWorkHour),
      toPageInfo(parsed.page, parsed.page_size, response.total),
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}

export function createReqListIpdWorkHourCategoriesHandler(
  client: Pick<ReqIpdReadClient, "listIpdWorkHourCategories">
) {
  return async (input: unknown) => {
    const parsed = reqListIpdWorkHourCategoriesInput.parse(input);
    const response = await client.listIpdWorkHourCategories(parsed);
    const result = asListResult(
      `${response.categories.length} IPD work hour categories found`,
      response.categories.map(mapIpdNamedItem),
      undefined,
      response
    );
    return { content: [{ type: "text" as const, text: listText(result) }], structuredContent: result };
  };
}
