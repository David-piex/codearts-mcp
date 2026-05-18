import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoNotificationSubscription,
  RepoNotificationSubscriptionsStatus,
  RepoPersonalRecentPushEvent,
  RepoRepositoryCommitRule,
  RepoRepositoryGeneralCommitRule,
  RepoRepositoryInheritSettingSource,
  RepoRepositoryTemplate,
  RepoWatermarkSetting,
  RepoUserRefPermission
} from "../client.js";

export function mapNotificationSubscription(input: RepoNotificationSubscription) {
  return asItemResult("Fetched repository notification subscription", {
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    enabled: input.enabled,
    configSource: input.config_source,
    webhookConfig: input.webhook_config
      ? {
          url: input.webhook_config.url,
          mentionUsers: input.webhook_config.mention_users,
          mentionPhone: input.webhook_config.mention_phone,
          hasToken: input.webhook_config.has_token
        }
      : undefined,
    warningRepoUsageRate: input.waring_repo_usage_rate,
    subscriptEvents: (input.subscript_events ?? []).map((event) => ({
      resourceType: event.resource_type,
      action: event.action,
      enabled: event.enabled,
      roleIds: event.role_ids ?? undefined,
      roleNames: event.role_names ?? undefined
    }))
  });
}

function mapNotificationSubscriptionState(input?: { config_source?: string; enabled?: boolean }) {
  return input
    ? {
        configSource: input.config_source,
        enabled: input.enabled
      }
    : undefined;
}

export function mapNotificationSubscriptionsStatus(input: RepoNotificationSubscriptionsStatus) {
  return asItemResult("Fetched repository notification subscription status", {
    internalMessage: mapNotificationSubscriptionState(input.internal_message),
    email: mapNotificationSubscriptionState(input.email),
    qyweixin: mapNotificationSubscriptionState(input.qyweixin),
    feishu: mapNotificationSubscriptionState(input.feishu),
    dingding: mapNotificationSubscriptionState(input.dingding)
  });
}

export function mapRepositoryInheritSettingSource(input: RepoRepositoryInheritSettingSource) {
  return asItemResult("Fetched repository inherit setting source", {
    sourceType: input.source_type,
    sourceId: input.source_id,
    upwardInheritEditable: input.upward_inherit_editable
  });
}

export function mapRepositoryGeneralCommitRule(input: RepoRepositoryGeneralCommitRule) {
  return asItemResult("Fetched repository general commit rule", {
    rejectUnsignedCommits: input.reject_unsigned_commits,
    rejectNotSignedByGpg: input.reject_not_signed_by_gpg,
    denyDeleteTag: input.deny_delete_tag,
    preventSecrets: input.prevent_secrets,
    denyForcePush: input.deny_force_push
  });
}

function mapRepositoryCommitRule(input: RepoRepositoryCommitRule) {
  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    name: input.name,
    branchName: input.branch_name,
    commitMessageRegex: input.commit_message_regex,
    commitMessageNegativeRegex: input.commit_message_negative_regex,
    prohibitedFileNameRegex: input.prohibited_file_name_regex,
    authorEmailRegex: input.author_email_regex,
    authorRegex: input.author_regex,
    maxFileSize: input.max_file_size,
    allowedMaxFileSize: input.allowed_max_file_size,
    binaryGateEnabled: input.binary_gate_enabled,
    allowedModifyBinary: input.allowed_modify_binary,
    allowedBinaryFileNameRegex: input.allowed_binary_file_name_regex,
    effectiveDate: input.effective_date,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    skipRuleCheck: input.skip_rule_check,
    skipRuleEndDate: input.skip_rule_end_date,
    privilegedUsers: (input.privileged_users ?? []).map((user) => ({
      id: user.id !== undefined ? String(user.id) : undefined,
      name: user.name,
      username: user.username,
      state: user.state,
      serviceLicenseStatus: user.service_license_status,
      nameCn: user.name_cn,
      nickName: user.nick_name,
      tenantName: user.tenant_name
    }))
  };
}

export function mapRepositoryCommitRulesList(
  input: RepoRepositoryCommitRule[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${input.length} repository commit rules found`,
    input.map(mapRepositoryCommitRule),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryWatermark(input: RepoWatermarkSetting) {
  return asItemResult("Fetched repository watermark setting", {
    watermark: input.watermark,
    viewWatermark: input.view_watermark,
    canUpdate: input.can_update
  });
}

function mapPersonalRecentPushEvent(input: RepoPersonalRecentPushEvent) {
  return {
    author: input.author
      ? {
          id: input.author.id !== undefined ? String(input.author.id) : undefined,
          username: input.author.username
        }
      : undefined,
    repository: input.repository
      ? {
          id: input.repository.id !== undefined ? String(input.repository.id) : undefined,
          name: input.repository.name,
          description: input.repository.description,
          nameWithNamespace: input.repository.name_with_namespace,
          path: input.repository.path,
          pathWithNamespace: input.repository.path_with_namespace,
          createdAt: input.repository.created_at,
          updatedAt: input.repository.updated_at,
          archived: input.repository.archived,
          sshUrl: input.repository.ssh_url_to_repo,
          httpUrl: input.repository.http_url_to_repo,
          projectId: input.repository.project_id,
          projectName: input.repository.project_name,
          developMode: input.repository.develop_mode,
          moderationResult: input.repository.moderation_result
        }
      : undefined,
    pushData: input.push_data
      ? {
          commitCount: input.push_data.commit_count,
          action: input.push_data.action,
          refType: input.push_data.ref_type,
          commitFrom: input.push_data.commit_from,
          commitTo: input.push_data.commit_to,
          ref: input.push_data.ref,
          commitTitle: input.push_data.commit_title
        }
      : undefined,
    createdAt: input.created_at
  };
}

export function mapPersonalRecentPushEventsList(input: RepoPersonalRecentPushEvent[], total?: number) {
  return asListResult(
    `${input.length} personal recent push events found`,
    input.map(mapPersonalRecentPushEvent),
    toPageInfo(1, input.length || total || 0, total)
  );
}

function mapRepositoryTemplate(input: RepoRepositoryTemplate) {
  return {
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    name: input.name,
    system: input.system,
    tags: input.tags ?? [],
    description: input.description,
    language: input.language,
    repositoryName: input.repository_name,
    briefIntroduction: input.brief_introduction,
    createdAt: input.created_at,
    usedTimes: input.used_times,
    likedTimes: input.liked_times,
    creatorName: input.creator_name,
    httpsUrl: input.https_url
  };
}

export function mapRepositoryTemplatesList(
  input: RepoRepositoryTemplate[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${input.length} repository templates found`,
    input.map(mapRepositoryTemplate),
    toPageInfo(page, pageSize, total)
  );
}

function mapUserRefPermissionBasic(input: { has_permission?: boolean; is_protect?: boolean } | undefined) {
  return input
    ? {
        hasPermission: input.has_permission,
        protect: input.is_protect
      }
    : undefined;
}

export function mapUserRefPermission(input: RepoUserRefPermission) {
  return asItemResult("Fetched repository user ref permission", {
    read: mapUserRefPermissionBasic(input.read),
    review: mapUserRefPermissionBasic(input.review),
    approval: mapUserRefPermissionBasic(input.approval),
    createChange: mapUserRefPermissionBasic(input.create_change),
    merge: mapUserRefPermissionBasic(input.merge),
    createDelete: mapUserRefPermissionBasic(input.create_delete),
    push: mapUserRefPermissionBasic(input.push)
  });
}
