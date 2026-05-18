import { asItemResult } from "../../../contracts/tool-result.js";
import type {
  RepoNotificationSubscription,
  RepoRepositoryInheritSettingSource,
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

export function mapRepositoryInheritSettingSource(input: RepoRepositoryInheritSettingSource) {
  return asItemResult("Fetched repository inherit setting source", {
    sourceType: input.source_type,
    sourceId: input.source_id,
    upwardInheritEditable: input.upward_inherit_editable
  });
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
