import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoDefaultReviewCategories,
  RepoNoteRequiredAttributes,
  RepoReadmeFile,
  RepoReviewCategory,
  RepoRepositoryReview,
  RepoReviewUserBasic,
  RepoReviewSetting,
  RepoTreeObject
} from "../client.js";

function mapTreeObject(input: RepoTreeObject) {
  return {
    id: input.id,
    name: input.name,
    type: input.type,
    path: input.path,
    mode: input.mode,
    submoduleLink: input.submodule_link,
    submoduleBranch: input.submodule_branch,
    md5: input.md5
  };
}

function mapReviewCategory(input: RepoReviewCategory): unknown {
  return {
    key: input.key,
    nameZh: input.name_zh,
    nameEn: input.name_en,
    subCategories: (input.sub_categories ?? []).map(mapReviewCategory)
  };
}

function mapRequiredAttribute(input: NonNullable<RepoNoteRequiredAttributes["note_required_attributes"]>[number]) {
  return {
    name: input.name,
    required: input.is_required
  };
}

function mapReviewUser(input?: RepoReviewUserBasic | null) {
  return input
    ? {
        id: input.id !== undefined ? String(input.id) : undefined,
        name: input.name,
        username: input.username,
        state: input.state,
        serviceLicenseStatus: input.service_license_status,
        avatarUrl: input.avatar_url,
        avatarPath: input.avatar_path,
        email: input.email,
        nameCn: input.name_cn,
        webUrl: input.web_url,
        nickName: input.nick_name,
        tenantName: input.tenant_name,
        errorMessage: input.error_message
      }
    : undefined;
}

function mapRepositoryReview(input: RepoRepositoryReview) {
  return {
    id: input.id !== undefined ? String(input.id) : input.discussion_id,
    type: input.type,
    body: input.body ?? input.note,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    author: mapReviewUser(input.author),
    assignee: mapReviewUser(input.assignee),
    proposer: mapReviewUser(input.proposer),
    reviewer: mapReviewUser(input.reviewer),
    resolvedBy: mapReviewUser(input.resolved_by),
    system: input.system,
    noteableId: input.noteable_id !== undefined ? String(input.noteable_id) : undefined,
    noteableType: input.noteable_type,
    noteableIid: input.noteable_iid !== undefined ? String(input.noteable_iid) : undefined,
    commitId: input.commit_id,
    discussionId: input.discussion_id,
    repository: input.repository ?? input.repository_path,
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    diffFile: input.diff_file,
    diff: input.diff,
    archived: input.archived,
    reviewCategories: input.review_categories,
    reviewCategoriesCn: input.review_categories_cn,
    reviewCategoriesEn: input.review_categories_en,
    reviewModules: input.review_modules,
    severity: input.severity,
    severityCn: input.severity_cn,
    severityEn: input.severity_en,
    position: input.position
      ? {
          baseSha: input.position.base_sha,
          startSha: input.position.start_sha,
          headSha: input.position.head_sha,
          oldPath: input.position.old_path,
          newPath: input.position.new_path,
          positionType: input.position.position_type,
          oldLine: input.position.old_line,
          newLine: input.position.new_line
        }
      : undefined,
    resolved: input.resolved,
    resolvedAt: input.resolved_at,
    resolvable: input.resolvable,
    reply: input.is_reply,
    outdated: input.is_outdated,
    fromRobot: input.from_robot,
    link: input.link,
    mergeRequestId: input.merge_request_id !== undefined ? String(input.merge_request_id) : undefined,
    mergeRequestIid: input.merge_request_iid !== undefined ? String(input.merge_request_iid) : undefined,
    mergeRequestTitle: input.merge_request_title,
    mergeRequestState: input.merge_request_state,
    moderationResult: input.moderation_result,
    moderationTime: input.moderation_time,
    moderationStatus: input.moderation_status
  };
}

export function mapRepositoryTrees(items: RepoTreeObject[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} repository tree entries found`,
    items.map(mapTreeObject),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryFileList(items: string[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} repository files found`,
    items.map((item) => ({ id: item, path: item })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryReadmeFile(input: RepoReadmeFile) {
  return asItemResult("Fetched repository README file", {
    blobId: input.blob_id,
    content: input.content,
    encoding: input.encoding,
    fileName: input.file_name,
    filePath: input.file_path,
    fileType: input.file_type,
    size: input.size
  });
}

export function mapCommitAssociatedRefs(items: string[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} commit associated refs found`,
    items.map((item) => ({ id: item, name: item })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapReviewSetting(input: RepoReviewSetting) {
  return asItemResult("Fetched repository review setting", {
    categoriesAndModulesEnabled: input.categories_and_modules_enabled,
    secondaryCategoryEnabled: input.secondary_category_enabled,
    primaryCategories: (input.primary_categories ?? []).map(mapReviewCategory),
    reviewDefaultCategories: (input.review_default_categories ?? []).map(mapReviewCategory),
    reviewCustomizedCategories: (input.review_customized_categories ?? []).map(mapReviewCategory),
    reviewModules: (input.review_modules ?? []).map((item) => ({
      key: item.key,
      nameZh: item.name_zh,
      nameEn: item.name_en
    })),
    secondaryCategoryType: input.secondary_category_type,
    secondaryCategories: (input.secondary_categories ?? []).map(mapReviewCategory),
    noteRequiredAttributes: (input.note_required_attributes ?? []).map(mapRequiredAttribute),
    codehubDefaultCategories: (input.codehub_default_categories ?? []).map(mapReviewCategory),
    hicodeDefaultCategories: (input.hicode_default_categories ?? []).map(mapReviewCategory)
  });
}

export function mapNoteRequiredAttributes(input: RepoNoteRequiredAttributes) {
  const attributes = input.note_required_attributes ?? [];
  return asListResult(
    `${attributes.length} note required attributes found`,
    attributes.map(mapRequiredAttribute),
    toPageInfo(1, attributes.length, attributes.length)
  );
}

export function mapDefaultReviewCategories(input: RepoDefaultReviewCategories) {
  const codehub = input.codehub_default_categories ?? [];
  const hicode = input.hicode_default_categories ?? [];
  return asItemResult("Fetched default review categories", {
    codehubDefaultCategories: codehub.map(mapReviewCategory),
    hicodeDefaultCategories: hicode.map(mapReviewCategory)
  });
}

export function mapRepositoryReviews(items: RepoRepositoryReview[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} repository reviews found`,
    items.map(mapRepositoryReview),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryReviewAuthors(
  items: RepoReviewUserBasic[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} repository review authors found`,
    items.map((item) => ({
      ...mapReviewUser(item),
      id: item.id !== undefined ? String(item.id) : item.username
    })),
    toPageInfo(page, pageSize, total)
  );
}
