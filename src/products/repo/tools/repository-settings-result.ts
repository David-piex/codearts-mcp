import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoNotificationSubscription,
  RepoNotificationSubscriptionsStatus,
  RepoLabelDetail,
  RepoPersonalRecentPushEvent,
  RepoProjectTemplateStatusRepository,
  RepoRelatedCommit,
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

export function mapRepositoryLabel(input: RepoLabelDetail) {
  return {
    id: input.id === undefined ? undefined : String(input.id),
    name: input.name,
    color: input.color,
    description: input.description,
    textColor: input.text_color,
    expiresAt: input.expires_at,
    expired: input.is_expired,
    openMergeRequestsCount: input.open_merge_requests_count,
    openChangeRequestCount: input.open_change_request_count,
    priority: input.priority,
    repositoryLabel: input.is_repository_label
  };
}

export function mapRepositoryLabelResult(summary: string, input: RepoLabelDetail) {
  return asItemResult(summary, mapRepositoryLabel(input));
}

export function mapRepositoryLabelsResult(summary: string, input: RepoLabelDetail[]) {
  return asListResult(
    summary,
    input.map(mapRepositoryLabel),
    toPageInfo(1, input.length || 0, input.length)
  );
}

export function previewRepositoryLabelMutation(
  summary: string,
  input: Record<string, unknown>
) {
  return asItemResult(summary, {
    ...input,
    executed: false
  });
}

export function previewRepositoryDeleteMutation(summary: string, input: {
  repositoryId: string;
  name: string;
}) {
  return asItemResult(summary, {
    repositoryId: input.repositoryId,
    name: input.name,
    executed: false
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

export function mapRepositoryCommitRuleResult(summary: string, input: RepoRepositoryCommitRule) {
  return asItemResult(summary, mapRepositoryCommitRule(input));
}

export function previewRepositoryGeneralPolicyMutation(input: {
  repository_id: string;
  disable_fork?: boolean;
  branch_name_regex?: string;
  tag_name_regex?: string;
  generate_pre_merge_ref?: boolean;
  forbidden_developer_create_branch?: boolean;
  create_branch_whitelist_user_ids?: string;
}) {
  return {
    repositoryId: input.repository_id,
    disableFork: input.disable_fork,
    branchNameRegex: input.branch_name_regex,
    tagNameRegex: input.tag_name_regex,
    generatePreMergeRef: input.generate_pre_merge_ref,
    forbiddenDeveloperCreateBranch: input.forbidden_developer_create_branch,
    createBranchWhitelistUserIds: input.create_branch_whitelist_user_ids,
    executed: false
  };
}

export function previewRepositoryGeneralCommitRuleMutation(input: {
  repository_id: string;
  reject_unsigned_commits?: boolean;
  reject_not_signed_by_gpg?: boolean;
  deny_delete_tag?: boolean;
  prevent_secrets?: boolean;
  deny_force_push?: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    rejectUnsignedCommits: input.reject_unsigned_commits,
    rejectNotSignedByGpg: input.reject_not_signed_by_gpg,
    denyDeleteTag: input.deny_delete_tag,
    preventSecrets: input.prevent_secrets,
    denyForcePush: input.deny_force_push,
    executed: false
  };
}

export function previewRepositoryCommitRuleMutation(input: Record<string, unknown>) {
  return {
    ...input,
    executed: false
  };
}

export function mapRepositoryWatermark(input: RepoWatermarkSetting) {
  return asItemResult("Fetched repository watermark setting", {
    watermark: input.watermark,
    viewWatermark: input.view_watermark,
    canUpdate: input.can_update
  });
}

export function previewNotificationSubscriptionMutation(input: {
  repository_id: string;
  enabled?: boolean;
  config_source?: string;
  waring_repo_usage_rate?: number;
  webhook_config?: {
    url?: string;
    token?: string;
    mention_users?: string;
    mention_phone?: string;
  };
  subscript_events?: Array<{
    resource_type: string;
    action: string;
    enabled: boolean;
    role_ids?: string[];
    role_names?: string[];
  }>;
}) {
  return {
    repositoryId: input.repository_id,
    enabled: input.enabled,
    configSource: input.config_source,
    warningRepoUsageRate: input.waring_repo_usage_rate,
    webhookConfig: input.webhook_config ? {
      url: input.webhook_config.url,
      hasToken: input.webhook_config.token !== undefined,
      mentionUsers: input.webhook_config.mention_users,
      mentionPhone: input.webhook_config.mention_phone
    } : undefined,
    subscriptEvents: input.subscript_events?.map((event) => ({
      resourceType: event.resource_type,
      action: event.action,
      enabled: event.enabled,
      roleIds: event.role_ids,
      roleNames: event.role_names
    })),
    executed: false
  };
}

export function previewRepositorySimpleMutation(summary: string, input: Record<string, unknown>) {
  return asItemResult(summary, {
    ...input,
    executed: false
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

function mapProjectTemplateStatusRepository(input: RepoProjectTemplateStatusRepository) {
  return {
    uuid: input.uuid,
    repositoryId: input.repo_id !== undefined ? String(input.repo_id) : undefined,
    repositoryName: input.repo_name,
    sshUrl: input.ssh_url,
    codeUrl: input.code_url,
    detailUrl: input.detail_url
  };
}

export function mapProjectTemplateStatusRepositoriesList(
  input: RepoProjectTemplateStatusRepository[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${input.length} project template status repositories found`,
    input.map(mapProjectTemplateStatusRepository),
    toPageInfo(page, pageSize, total)
  );
}

export function mapRepositoryTemplateStatusMutation(summary: string, input?: {
  result?: string | null;
  status?: string;
}) {
  return asItemResult(summary, {
    result: input?.result ?? null,
    status: input?.status,
    executed: true
  });
}

function firstDefined<T>(...values: Array<T | undefined>): T | undefined {
  for (const value of values) {
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function mapRelatedCommit(input: RepoRelatedCommit) {
  const raw = input as RepoRelatedCommit & Record<string, unknown>;

  return {
    id: input.id !== undefined ? String(input.id) : undefined,
    iamId: input.iamId,
    userId: input.userId !== undefined ? String(input.userId) : undefined,
    userName: input.userName,
    tenantName: input.tenantName,
    nickName: input.nickName,
    repositoryId: input.repoId !== undefined ? String(input.repoId) : undefined,
    branchName: input.branchName,
    commitId: input.commitId,
    commitShortId: input.commitShortId,
    commitMessage: input.commitMsg,
    commitUrl: input.commitUrl,
    relatedId: input.relatedId !== undefined ? String(input.relatedId) : undefined,
    relatedUrl: input.relatedUrl,
    result: input.result,
    createdAt: firstDefined(
      input.createdAt,
      input.createAt,
      raw.created_at as string | undefined,
      raw.create_at as string | undefined
    ),
    updatedAt: firstDefined(
      input.updatedAt,
      input.updateAt,
      raw.updated_at as string | undefined,
      raw.update_at as string | undefined
    )
  };
}

export function mapRepositoryRelatedCommitsList(
  input: RepoRelatedCommit[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${input.length} repository related commits found`,
    input.map(mapRelatedCommit),
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
