import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoItemCommit,
  RepoProjectGeneralPolicy,
  RepoProjectMemberSetting,
  RepoProjectMemberSettingRoleSync,
  RepoProjectSettingsInheritCfg,
  RepoProjectSubgroupOrRepository,
  RepoWatermarkSetting
} from "../client.js";

export function mapWatermarkSetting(summary: string, item: RepoWatermarkSetting) {
  return asItemResult(summary, {
    watermark: item.watermark,
    canUpdate: item.can_update,
    viewWatermark: item.view_watermark
  });
}

export function previewProjectWatermarkMutation(input: {
  project_id: string;
  watermark: boolean;
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    watermark: input.watermark,
    executed: !input.dry_run
  };
}

export function mapProjectSubgroupOrRepository(item: RepoProjectSubgroupOrRepository) {
  return {
    id: item.id === undefined ? undefined : String(item.id),
    name: item.name,
    path: item.path,
    projectId: item.project_id,
    projectName: item.project_name,
    fullName: item.full_name,
    fullPath: item.full_path,
    descendantType: item.descendant_type,
    visibility: item.visibility,
    visibilityLevel: item.visibility_level,
    archived: item.archived,
    createdAt: item.created_at,
    updatedAtTimestamp: item.updated_at_timestamp,
    subgroupCount: item.subgroup_count,
    projectCount: item.project_count,
    httpUrlToRepo: item.http_url_to_repo,
    sshUrlToRepo: item.ssh_url_to_repo
  };
}

export function mapProjectSubgroupsAndRepositoriesList(
  summary: string,
  items: RepoProjectSubgroupOrRepository[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProjectSubgroupOrRepository),
    toPageInfo(page, pageSize, total)
  );
}

export function mapProjectSettingsInheritCfg(item: RepoProjectSettingsInheritCfg) {
  return {
    name: item.name,
    inheritMod: item.inherit_mod
  };
}

export function mapProjectSettingsInheritCfgList(
  summary: string,
  items: RepoProjectSettingsInheritCfg[],
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapProjectSettingsInheritCfg),
    toPageInfo(1, items.length || total || 0, total)
  );
}

export function previewProjectSettingsInheritCfgMutation(input: {
  project_id: string;
  data: RepoProjectSettingsInheritCfg[];
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    settingCount: input.data.length,
    settings: input.data.map(mapProjectSettingsInheritCfg),
    executed: !input.dry_run
  };
}

export function mapProjectMemberSettingRoleSync(item: RepoProjectMemberSettingRoleSync) {
  return {
    id: item.id === undefined ? undefined : String(item.id),
    roleId: item.role_id,
    roleSyncEnabled: item.role_sync_enabled,
    roleName: item.role_name,
    roleType: item.role_type,
    roleChineseName: item.role_chinese_name,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
}

export function mapProjectMemberSetting(summary: string, item: RepoProjectMemberSetting) {
  return asItemResult(summary, {
    productId: item.product_id,
    syncEnabled: item.sync_enabled,
    syncAllRoleEnabled: item.sync_all_role_enabled,
    roleSync: (item.role_sync ?? []).map(mapProjectMemberSettingRoleSync)
  });
}

export function mapProjectGeneralPolicy(summary: string, item: RepoProjectGeneralPolicy) {
  return asItemResult(summary, {
    disableFork: item.disable_fork,
    forbiddenDeveloperCreateBranch: item.forbidden_developer_create_branch,
    forbiddenDeveloperCreateTag: item.forbidden_developer_create_tag,
    forbiddenCommitterCreateBranch: item.forbidden_committer_create_branch,
    branchNameRegex: item.branch_name_regex,
    tagNameRegex: item.tag_name_regex,
    generatePreMergeRef: item.generate_pre_merge_ref,
    forbiddenGitlabAccess: item.forbidden_gitlab_access,
    rebaseDisableTriggerWebhook: item.rebase_disable_trigger_webhook,
    openGpgVerified: item.open_gpg_verified
  });
}

export function previewProjectGeneralPolicyMutation(input: {
  project_id: string;
  disable_fork?: boolean;
  branch_name_regex?: string;
  tag_name_regex?: string;
  generate_pre_merge_ref?: boolean;
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    disableFork: input.disable_fork,
    branchNameRegex: input.branch_name_regex,
    tagNameRegex: input.tag_name_regex,
    generatePreMergeRef: input.generate_pre_merge_ref,
    executed: !input.dry_run
  };
}

export function mapItemCommit(item: RepoItemCommit) {
  return {
    id: item.id,
    shortId: item.short_id,
    title: item.title,
    message: item.message,
    authorName: item.author_name,
    authorEmail: item.author_email,
    committedDate: item.committed_date,
    createdAt: item.created_at
  };
}

export function mapItemCommitsList(
  summary: string,
  items: RepoItemCommit[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    summary,
    items.map(mapItemCommit),
    toPageInfo(page, pageSize, total)
  );
}
