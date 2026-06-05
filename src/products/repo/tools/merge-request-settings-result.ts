import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoApproverSettings,
  RepoMergeRequestSetting,
  RepoMergeRequestTemplate
} from "../client.js";

function mapTemplate(input: RepoMergeRequestTemplate) {
  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    name: input.template_name ?? input.name,
    title: input.merge_request_title ?? input.title,
    description: input.description,
    content: input.content,
    fileName: input.file_name,
    filePath: input.file_path,
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    groupId: input.group_id !== undefined ? String(input.group_id) : undefined,
    projectId: input.project_id,
    isDefault: input.is_default,
    isWip: input.is_wip,
    autoExtractMrTitle: input.auto_extract_mr_title,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    raw: input
  };
}

export function mapMergeRequestSetting(scope: "repository" | "group" | "project", input: RepoMergeRequestSetting) {
  return asItemResult(`Fetched ${scope} merge request setting`, input);
}

export function mapApproverSettings(scope: "repository" | "group" | "project", input: RepoApproverSettings) {
  return asItemResult(`Fetched ${scope} approver settings`, input);
}

export function mapMergeRequestTemplatesList(
  label: "merge request" | "discussion",
  input: RepoMergeRequestTemplate[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${input.length} ${label} templates found`,
    input.map(mapTemplate),
    toPageInfo(page, pageSize, total)
  );
}

export function mapMergeRequestTemplate(input: RepoMergeRequestTemplate) {
  return asItemResult("Fetched merge request template", mapTemplate(input));
}

export function previewApproverSettingsMutation(
  summary: string,
  input: Record<string, unknown>
) {
  return asItemResult(summary, {
    ...input,
    executed: false
  });
}

export function previewMergeRequestTemplateMutation(
  summary: string,
  input: Record<string, unknown>
) {
  return asItemResult(summary, {
    ...input,
    executed: false
  });
}
