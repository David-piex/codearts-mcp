import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { asItemResult } from "../../../contracts/tool-result.js";
import {
  reqBatchCreateIpdIssuesInput,
  reqBatchDeleteIpdIssuesInput,
  reqBatchTransferIpdWorkItemFlowInput,
  reqBatchUpdateIpdIssuesInput,
  reqCreateIpdIssueInput,
  reqCreateIpdFeatureSetInput,
  reqCreateIpdLabelInput,
  reqCreateIpdModuleInput,
  reqCreateIpdWorkHourInput,
  reqDeleteIpdFeatureSetInput,
  reqDeleteIpdIssueImageInput,
  reqDeleteIpdLabelInput,
  reqDeleteIpdModuleInput,
  reqDeleteIpdWorkHourInput,
  reqTransferIpdWorkItemFlowInput,
  reqUpdateIpdFeatureSetInput,
  reqUpdateIpdLabelInput,
  reqUpdateIpdModuleInput,
  reqUpdateIpdProjectFieldInput,
  reqUpdateIpdTenantFieldInput,
  reqUpdateIpdWorkHourInput,
  reqUploadIpdIssueAttachmentInput,
  reqUploadIpdIssueImageInput
} from "../schemas.js";
import {
  mapIpdAttachment,
  mapIpdIssue,
  mapIpdNamedItem,
  mapIpdWorkHour,
  type ReqIpdAttachment,
  type ReqIpdIssue,
  type ReqIpdNamedItem,
  type ReqIpdWorkHour
} from "./ipd-mappers.js";

type ReqIpdWriteClient = {
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
  uploadIpdIssueImage: (input: {
    project_id: string;
    issue_id: string;
    file_name: string;
    file_content: Uint8Array;
    content_type?: string;
  }) => Promise<ReqIpdIssue>;
  deleteIpdIssueImage: (input: { project_id: string; issue_id: string; file_name: string }) => Promise<ReqIpdIssue>;
  createIpdWorkHour: (input: {
    project_id: string;
    issue_id: string;
    work_date_begin: string;
    work_date_end: string;
    work_hours: string | number;
    work_hour_type: 1 | 2 | string;
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
  updateIpdTenantField: (input: Record<string, unknown> & { field_id: string }) => Promise<ReqIpdNamedItem>;
  updateIpdProjectField: (input: Record<string, unknown> & { project_id: string; field_id: string }) => Promise<ReqIpdNamedItem>;
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
};

function preview(summary: string, item: Record<string, unknown>) {
  return asItemResult(summary, {
    ...item,
    executed: false
  });
}

function detectContentType(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".gif")) return "image/gif";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".svg")) return "image/svg+xml";
  if (normalized.endsWith(".bmp")) return "image/bmp";
  if (normalized.endsWith(".tiff") || normalized.endsWith(".tif")) return "image/tiff";
  if (normalized.endsWith(".pdf")) return "application/pdf";
  if (normalized.endsWith(".json")) return "application/json";
  if (normalized.endsWith(".txt")) return "text/plain";

  return "application/octet-stream";
}

function issueListResponse(summary: string, issues: ReqIpdIssue[], raw?: unknown) {
  return asItemResult(
    summary,
    {
      count: issues.length,
      issues: issues.map(mapIpdIssue),
      executed: true
    },
    raw
  );
}

function attachmentListResponse(summary: string, attachments: ReqIpdAttachment[], raw?: unknown) {
  return asItemResult(
    summary,
    {
      count: attachments.length,
      attachments: attachments.map(mapIpdAttachment),
      executed: true
    },
    raw
  );
}

function workHourTotalResponse(
  summary: string,
  response: { data: ReqIpdWorkHour[]; work_hours_total?: string | number },
  raw?: unknown
) {
  return asItemResult(
    summary,
    {
      count: response.data.length,
      workHoursTotal: response.work_hours_total,
      workHours: response.data.map(mapIpdWorkHour),
      executed: true
    },
    raw
  );
}

function itemResponse(summary: string, item: ReqIpdNamedItem, raw?: unknown) {
  return asItemResult(summary, mapIpdNamedItem(item), raw);
}

function fieldPreviewItem(parsed: Record<string, unknown>) {
  const { dry_run, extra_fields, ...rest } = parsed;
  return {
    ...rest,
    ...(extra_fields && typeof extra_fields === "object" ? { extraFields: extra_fields } : {}),
    executed: false
  };
}

export function createReqCreateIpdIssueHandler(client: Pick<ReqIpdWriteClient, "createIpdIssue">) {
  return async (input: unknown) => {
    const parsed = reqCreateIpdIssueInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: create IPD issue ${parsed.title}`, {
        projectId: parsed.project_id,
        title: parsed.title,
        category: parsed.category,
        assignee: parsed.assignee,
        status: parsed.status,
        extraFields: parsed.extra_fields
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createIpdIssue(parsed);
    const result = issueListResponse(`Created ${response.length} IPD issues`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqBatchCreateIpdIssuesHandler(client: Pick<ReqIpdWriteClient, "batchCreateIpdIssues">) {
  return async (input: unknown) => {
    const parsed = reqBatchCreateIpdIssuesInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: batch create ${parsed.issues.length} IPD issues`, {
        projectId: parsed.project_id,
        count: parsed.issues.length,
        titles: parsed.issues.map((issue) => issue.title),
        categories: parsed.issues.map((issue) => issue.category)
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.batchCreateIpdIssues(parsed);
    const result = issueListResponse(`Batch created ${response.length} IPD issues`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqBatchUpdateIpdIssuesHandler(client: Pick<ReqIpdWriteClient, "batchUpdateIpdIssues">) {
  return async (input: unknown) => {
    const parsed = reqBatchUpdateIpdIssuesInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: batch update ${parsed.issue_ids.length} IPD issues`, {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        category: parsed.attribute.category,
        attribute: parsed.attribute
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.batchUpdateIpdIssues(parsed);
    const result = asItemResult(
      `Batch updated ${parsed.issue_ids.length} IPD issues`,
      {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        category: parsed.attribute.category,
        executed: true
      },
      response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqBatchDeleteIpdIssuesHandler(client: Pick<ReqIpdWriteClient, "batchDeleteIpdIssues">) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteIpdIssuesInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: batch delete ${parsed.issue_ids.length} IPD issues`, {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        isPermanentDelete: parsed.is_permanent_delete,
        srcProjectId: parsed.src_project_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.batchDeleteIpdIssues(parsed);
    const result = asItemResult(
      `Batch deleted ${parsed.issue_ids.length} IPD issues`,
      {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        isPermanentDelete: parsed.is_permanent_delete,
        srcProjectId: parsed.src_project_id,
        executed: true
      },
      response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUploadIpdIssueAttachmentHandler(client: Pick<ReqIpdWriteClient, "uploadIpdIssueAttachment">) {
  return async (input: unknown) => {
    const parsed = reqUploadIpdIssueAttachmentInput.parse(input);
    const fileName = basename(parsed.file_path);

    if (parsed.dry_run) {
      const result = preview(`Dry run: upload IPD attachment ${fileName}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        filePath: parsed.file_path,
        fileName
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadIpdIssueAttachment({
      project_id: parsed.project_id,
      issue_id: parsed.issue_id,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectContentType(fileName)
    });
    const result = attachmentListResponse(`Uploaded ${response.length} IPD attachments`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUploadIpdIssueImageHandler(client: Pick<ReqIpdWriteClient, "uploadIpdIssueImage">) {
  return async (input: unknown) => {
    const parsed = reqUploadIpdIssueImageInput.parse(input);
    const fileName = basename(parsed.file_path);

    if (parsed.dry_run) {
      const result = preview(`Dry run: upload IPD issue image ${fileName}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        filePath: parsed.file_path,
        fileName
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const fileContent = await readFile(parsed.file_path);
    const response = await client.uploadIpdIssueImage({
      project_id: parsed.project_id,
      issue_id: parsed.issue_id,
      file_name: fileName,
      file_content: new Uint8Array(fileContent),
      content_type: detectContentType(fileName)
    });
    const item = mapIpdIssue(response);
    const result = asItemResult(`Uploaded IPD issue image ${fileName}`, { ...item, executed: true }, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDeleteIpdIssueImageHandler(client: Pick<ReqIpdWriteClient, "deleteIpdIssueImage">) {
  return async (input: unknown) => {
    const parsed = reqDeleteIpdIssueImageInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: delete IPD issue image ${parsed.file_name}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        fileName: parsed.file_name
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteIpdIssueImage(parsed);
    const item = mapIpdIssue(response);
    const result = asItemResult(`Deleted IPD issue image ${parsed.file_name}`, { ...item, executed: true }, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqCreateIpdWorkHourHandler(client: Pick<ReqIpdWriteClient, "createIpdWorkHour">) {
  return async (input: unknown) => {
    const parsed = reqCreateIpdWorkHourInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: create IPD work hour for issue ${parsed.issue_id}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        workDateBegin: parsed.work_date_begin,
        workDateEnd: parsed.work_date_end,
        workHours: parsed.work_hours,
        workHourType: parsed.work_hour_type,
        includeWeekend: parsed.include_weekend,
        workHourCategory: parsed.work_hour_category,
        description: parsed.description
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createIpdWorkHour(parsed);
    const result = workHourTotalResponse(`Created ${response.data.length} IPD work hours`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdWorkHourHandler(client: Pick<ReqIpdWriteClient, "updateIpdWorkHour">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdWorkHourInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: update IPD work hour ${parsed.workhour_id}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        workhourId: parsed.workhour_id,
        workHours: parsed.work_hours,
        workHourCategory: parsed.work_hour_category,
        description: parsed.description
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdWorkHour(parsed);
    const result = workHourTotalResponse(`Updated IPD work hour ${parsed.workhour_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDeleteIpdWorkHourHandler(client: Pick<ReqIpdWriteClient, "deleteIpdWorkHour">) {
  return async (input: unknown) => {
    const parsed = reqDeleteIpdWorkHourInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: delete IPD work hour ${parsed.workhour_id}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        workhourId: parsed.workhour_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteIpdWorkHour(parsed);
    const result = workHourTotalResponse(`Deleted IPD work hour ${parsed.workhour_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqCreateIpdModuleHandler(client: Pick<ReqIpdWriteClient, "createIpdModule">) {
  return async (input: unknown) => {
    const parsed = reqCreateIpdModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: create IPD module ${parsed.display_value}`, {
        projectId: parsed.project_id,
        displayValue: parsed.display_value,
        parentId: parsed.parent_id,
        description: parsed.description,
        assignee: parsed.assignee
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createIpdModule(parsed);
    const result = itemResponse(`Created IPD module ${response.id ?? parsed.display_value}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdModuleHandler(client: Pick<ReqIpdWriteClient, "updateIpdModule">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: update IPD module ${parsed.module_id}`, {
        projectId: parsed.project_id,
        moduleId: parsed.module_id,
        displayValue: parsed.display_value,
        parentId: parsed.parent_id,
        description: parsed.description,
        assignee: parsed.assignee
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdModule(parsed);
    const result = itemResponse(`Updated IPD module ${response.id ?? parsed.module_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDeleteIpdModuleHandler(client: Pick<ReqIpdWriteClient, "deleteIpdModule">) {
  return async (input: unknown) => {
    const parsed = reqDeleteIpdModuleInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: delete IPD module ${parsed.module_id}`, {
        projectId: parsed.project_id,
        moduleId: parsed.module_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteIpdModule(parsed);
    const result = itemResponse(`Deleted IPD module ${response.id ?? parsed.module_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqCreateIpdLabelHandler(client: Pick<ReqIpdWriteClient, "createIpdLabel">) {
  return async (input: unknown) => {
    const parsed = reqCreateIpdLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: create IPD label ${parsed.title}`, {
        projectId: parsed.project_id,
        labelType: parsed.label_type,
        color: parsed.color,
        title: parsed.title
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createIpdLabel(parsed);
    const result = itemResponse(`Created IPD label ${response.id ?? parsed.title}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdLabelHandler(client: Pick<ReqIpdWriteClient, "updateIpdLabel">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: update IPD label ${parsed.label_id}`, {
        projectId: parsed.project_id,
        labelId: parsed.label_id,
        labelType: parsed.label_type,
        color: parsed.color,
        title: parsed.title
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdLabel(parsed);
    const result = itemResponse(`Updated IPD label ${response.id ?? parsed.label_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDeleteIpdLabelHandler(client: Pick<ReqIpdWriteClient, "deleteIpdLabel">) {
  return async (input: unknown) => {
    const parsed = reqDeleteIpdLabelInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: delete IPD label ${parsed.label_id}`, {
        projectId: parsed.project_id,
        labelId: parsed.label_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteIpdLabel(parsed);
    const result = itemResponse(`Deleted IPD label ${response.id ?? parsed.label_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqCreateIpdFeatureSetHandler(client: Pick<ReqIpdWriteClient, "createIpdFeatureSet">) {
  return async (input: unknown) => {
    const parsed = reqCreateIpdFeatureSetInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: create IPD feature set ${parsed.title}`, {
        projectId: parsed.project_id,
        title: parsed.title,
        parentId: parsed.parent_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createIpdFeatureSet(parsed);
    const result = itemResponse(`Created IPD feature set ${response.id ?? parsed.title}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdFeatureSetHandler(client: Pick<ReqIpdWriteClient, "updateIpdFeatureSet">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdFeatureSetInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: update IPD feature set ${parsed.feature_set_id}`, {
        projectId: parsed.project_id,
        featureSetId: parsed.feature_set_id,
        title: parsed.title,
        parentId: parsed.parent_id,
        positionFloat: parsed.position_float
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdFeatureSet(parsed);
    const result = itemResponse(`Updated IPD feature set ${response.id ?? parsed.feature_set_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqDeleteIpdFeatureSetHandler(client: Pick<ReqIpdWriteClient, "deleteIpdFeatureSet">) {
  return async (input: unknown) => {
    const parsed = reqDeleteIpdFeatureSetInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: delete IPD feature set ${parsed.feature_set_id}`, {
        projectId: parsed.project_id,
        featureSetId: parsed.feature_set_id
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteIpdFeatureSet(parsed);
    const result = itemResponse(`Deleted IPD feature set ${response.id ?? parsed.feature_set_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdTenantFieldHandler(client: Pick<ReqIpdWriteClient, "updateIpdTenantField">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdTenantFieldInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update IPD tenant field ${parsed.field_id}`, fieldPreviewItem(parsed));
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdTenantField(parsed);
    const result = itemResponse(`Updated IPD tenant field ${parsed.field_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqUpdateIpdProjectFieldHandler(client: Pick<ReqIpdWriteClient, "updateIpdProjectField">) {
  return async (input: unknown) => {
    const parsed = reqUpdateIpdProjectFieldInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update IPD project field ${parsed.field_id}`, fieldPreviewItem(parsed));
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateIpdProjectField(parsed);
    const result = itemResponse(`Updated IPD project field ${parsed.field_id}`, response, response);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqTransferIpdWorkItemFlowHandler(client: Pick<ReqIpdWriteClient, "transferIpdWorkItemFlow">) {
  return async (input: unknown) => {
    const parsed = reqTransferIpdWorkItemFlowInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: transfer IPD work item ${parsed.issue_id}`, {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        issueCategory: parsed.issue_category,
        flowCode: parsed.flow_code,
        processContext: parsed.process_context
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.transferIpdWorkItemFlow(parsed);
    const result = asItemResult(
      `Transferred IPD work item ${parsed.issue_id}`,
      {
        projectId: parsed.project_id,
        issueId: parsed.issue_id,
        issueCategory: parsed.issue_category,
        flowCode: parsed.flow_code,
        executed: true
      },
      response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createReqBatchTransferIpdWorkItemFlowHandler(
  client: Pick<ReqIpdWriteClient, "batchTransferIpdWorkItemFlow">
) {
  return async (input: unknown) => {
    const parsed = reqBatchTransferIpdWorkItemFlowInput.parse(input);

    if (parsed.dry_run) {
      const result = preview(`Dry run: batch transfer ${parsed.issue_ids.length} IPD work items`, {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        issueCategory: parsed.issue_category,
        flowCode: parsed.flow_code,
        isRecover: parsed.is_recover,
        processContext: parsed.process_context
      });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.batchTransferIpdWorkItemFlow(parsed);
    const result = asItemResult(
      `Batch transferred ${parsed.issue_ids.length} IPD work items`,
      {
        projectId: parsed.project_id,
        issueIds: parsed.issue_ids,
        issueCategory: parsed.issue_category,
        flowCode: parsed.flow_code,
        isRecover: parsed.is_recover,
        executed: true
      },
      response
    );
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
