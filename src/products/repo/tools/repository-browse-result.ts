import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoDefaultReviewCategories,
  RepoNoteRequiredAttributes,
  RepoReadmeFile,
  RepoReviewCategory,
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
