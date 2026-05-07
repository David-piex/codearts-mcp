import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoProjectTenantSettings,
  RepoTenantCMK,
  RepoTenantDevelopMode,
  RepoTenantEncryptedRepository,
  RepoTenantKmsGrant,
  RepoTenantRepository,
  RepoTenantRepoEncryptionSetting,
  RepoTenantTrustedIpAddress
} from "../client.js";

function toTenantPageInfo(offset: number, limit: number, total?: number) {
  const page = Math.floor(offset / limit) + 1;
  return toPageInfo(page, limit, total);
}

export function mapTenantRepository(item: RepoTenantRepository) {
  return {
    owner: item.owner,
    capacity: item.capacity,
    status: item.status,
    moderationResult: item.moderation_result,
    createTime: item.create_time,
    memberNumber: item.member_number,
    repositoryId: item.repository_id === undefined ? undefined : String(item.repository_id),
    repositoryName: item.repository_name,
    projectName: item.project_name,
    projectId: item.project_id,
    locked: item.locked
  };
}

export function mapTenantRepositoriesList(
  summary: string,
  items: RepoTenantRepository[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(summary, items.map(mapTenantRepository), toTenantPageInfo(offset, limit, total));
}

export function mapTenantDevelopMode(summary: string, item: RepoTenantDevelopMode) {
  return asItemResult(summary, {
    crEnable: item.cr_enable,
    repoEncryptionEnabled: item.repo_encryption_enabled
  });
}

export function mapTenantRepoEncryptionSetting(summary: string, item: RepoTenantRepoEncryptionSetting) {
  return asItemResult(summary, {
    id: item.id === undefined ? undefined : String(item.id),
    tenantId: item.tenant_id,
    encryptionType: item.encryption_type,
    defaultEncryptionEnabled: item.default_encryption_enabled,
    cmkKeyName: item.cmk_key_name,
    cmkKeyId: item.cmk_key_id,
    keyState: item.key_state,
    region: item.region,
    regionType: item.region_type
  });
}

export function mapTenantCMK(item: RepoTenantCMK) {
  return {
    cmkKeyName: item.cmk_key_name,
    cmkKeyId: item.cmk_key_id,
    keyState: item.key_state
  };
}

export function mapTenantCMKsList(summary: string, items: RepoTenantCMK[], offset: number, limit: number, total?: number) {
  return asListResult(summary, items.map(mapTenantCMK), toTenantPageInfo(offset, limit, total));
}

export function mapTenantEncryptedRepository(item: RepoTenantEncryptedRepository) {
  return {
    repoId: item.repo_id === undefined ? undefined : String(item.repo_id),
    repoName: item.repo_name,
    fullPath: item.full_path,
    projectId: item.project_id,
    projectName: item.project_name,
    ownerId: item.owner_id === undefined ? undefined : String(item.owner_id),
    ownerIamId: item.owner_iam_id,
    ownerTenantName: item.owner_tenant_name,
    ownerNickName: item.owner_nick_name,
    ownerName: item.owner_name
  };
}

export function mapTenantEncryptedRepositoriesList(
  summary: string,
  items: RepoTenantEncryptedRepository[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(summary, items.map(mapTenantEncryptedRepository), toTenantPageInfo(offset, limit, total));
}

export function mapTenantKmsGrant(summary: string, item: RepoTenantKmsGrant) {
  return asItemResult(summary, {
    tenantId: item.tenant_id,
    assumed: item.assumed
  });
}

export function mapProjectTenantSettings(summary: string, item: RepoProjectTenantSettings) {
  return asItemResult(summary, {
    defaultEncryptionEnabled: item.default_encryption_enabled,
    encryptionType: item.encryption_type,
    permitPublic: item.permit_public
  });
}

export function mapTenantTrustedIpAddress(item: RepoTenantTrustedIpAddress) {
  return {
    id: item.id === undefined ? undefined : String(item.id),
    userId: item.user_id === undefined ? undefined : String(item.user_id),
    domainId: item.domain_id,
    ipRange: item.ip_range,
    ipType: item.ip_type,
    ipStart: item.ip_start,
    ipEnd: item.ip_end,
    viewFlag: item.view_flag,
    downloadFlag: item.download_flag,
    uploadFlag: item.upload_flag,
    remark: item.remark,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    orderFlag: item.order_flag
  };
}

export function mapTenantTrustedIpAddressesList(
  summary: string,
  items: RepoTenantTrustedIpAddress[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(summary, items.map(mapTenantTrustedIpAddress), toTenantPageInfo(offset, limit, total));
}
