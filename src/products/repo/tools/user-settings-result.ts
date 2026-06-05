import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import type {
  RepoAddRepositoryMembersResult,
  RepoArchiveDownloadResult,
  RepoBatchValidateRepoNameItem,
  RepoAssociateRepositoryUserGroupResult,
  RepoGroupPermissionResource,
  RepoGroupPermissionResourcesResponse,
  RepoHttpsPasswordSetting,
  RepoHttpsPasswordSettingUpdateResult,
  RepoSubmoduleMutationResult,
  RepoTransferGroupResult
} from "../client.js";
import { mapGroupSummary } from "./group-result.js";

function mapGroupPermissionResource(item: RepoGroupPermissionResource) {
  return {
    id: item.id !== undefined ? String(item.id) : undefined,
    name: item.name,
    nameCn: item.name_cn,
    resourceNameDisplay: item.resource_name_display,
    resourceNameCnDisplay: item.resource_name_cn_display,
    path: item.path,
    scope: item.scope,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
}

export function mapGroupPermissionResources(summary: string, input: RepoGroupPermissionResourcesResponse) {
  return asListResult(summary, (input.resources ?? []).map(mapGroupPermissionResource), {
    page: 1,
    pageSize: (input.resources ?? []).length,
    total: (input.resources ?? []).length
  });
}

export function mapAssociateRepositoryUserGroupResult(
  summary: string,
  input: RepoAssociateRepositoryUserGroupResult
) {
  return asItemResult(summary, {
    status: input.status,
    errorCode: input.error_code,
    errorMessage: input.error_msg
  });
}

export function previewAssociateRepositoryUserGroupMutation(input: {
  project_id: string;
  repository_id: string;
  user_group_id: string;
  dry_run: boolean;
}) {
  return {
    projectId: input.project_id,
    repositoryId: input.repository_id,
    userGroupId: input.user_group_id,
    executed: !input.dry_run
  };
}

export function mapHttpsPasswordSetting(summary: string, input: RepoHttpsPasswordSetting) {
  return asItemResult(summary, {
    httpsCloneIamAuth: input.https_clone_iam_auth
  });
}

export function mapHttpsPasswordSettingUpdateResult(
  summary: string,
  input: RepoHttpsPasswordSettingUpdateResult
) {
  return asItemResult(summary, {
    status: input.status
  });
}

export function previewHttpsPasswordSettingMutation(input: {
  https_clone_iam_auth: boolean | string;
  dry_run: boolean;
}) {
  return {
    httpsCloneIamAuth:
      typeof input.https_clone_iam_auth === "string"
        ? input.https_clone_iam_auth === "true"
        : input.https_clone_iam_auth,
    executed: !input.dry_run
  };
}

export function mapBatchValidateRepoNamesResult(summary: string, items: RepoBatchValidateRepoNameItem[]) {
  return asListResult(
    summary,
    items.map((item) => ({
      name: item.name,
      projectId: item.project_id,
      groupId: item.group_id === null || item.group_id === undefined ? undefined : String(item.group_id),
      result: item.result,
      errorMessage: item.error_message
    })),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

export function previewBatchValidateRepoNamesMutation(input: {
  items: Array<{
    name: string;
    project_id: string;
    group_id?: string;
  }>;
  dry_run: boolean;
}) {
  return {
    items: input.items.map((item) => ({
      name: item.name,
      projectId: item.project_id,
      groupId: item.group_id
    })),
    executed: !input.dry_run
  };
}

export function mapTransferGroupResult(summary: string, input: RepoTransferGroupResult) {
  const base = mapGroupSummary(summary, input);
  return {
    ...base,
    myRole: input.my_role
      ? {
          id: input.my_role.id === undefined ? undefined : String(input.my_role.id),
          accessLevel: input.my_role.access_level,
          roleNameCn: input.my_role.role_namecn,
          roleName: input.my_role.role_namen,
          sourceId: input.my_role.source_id === undefined ? undefined : String(input.my_role.source_id),
          sourceType: input.my_role.source_type,
          userId: input.my_role.user_id === undefined ? undefined : String(input.my_role.user_id),
          notificationLevel: input.my_role.notification_level,
          createdAt: input.my_role.created_at,
          updatedAt: input.my_role.updated_at,
          limited: input.my_role.limited,
          isProjectAdmin: input.my_role.isProjectAdmin,
          isGroupCreator: input.my_role.isGroupCreator,
          isRepoCreator: input.my_role.isRepoCreator,
          roleShowFlag: input.my_role.roleShowFlag
        }
      : undefined
  };
}

export function previewTransferGroupMutation(input: {
  group_id: string;
  owner_id: string;
  dry_run: boolean;
}) {
  return {
    groupId: input.group_id,
    ownerId: input.owner_id,
    executed: !input.dry_run
  };
}

export function mapAddRepositoryMembersResult(summary: string, input: RepoAddRepositoryMembersResult) {
  return asItemResult(summary, {
    status: input.status,
    result: (input.result ?? []).map((item) => ({
      userIamId: item.user_iam_id,
      userName: item.user_name,
      userNickName: item.user_nick_name,
      tenantName: item.tenant_name,
      status: item.status,
      message: item.message
    }))
  });
}

export function previewAddRepositoryMembersMutation(input: {
  repository_id: string;
  users: Array<{
    user_iam_id?: string;
    user_name?: string;
    tenant_name?: string;
    tenant_id?: string;
    repository_role_Id?: string;
  }>;
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    users: input.users.map((user) => ({
      userIamId: user.user_iam_id,
      userName: user.user_name,
      tenantName: user.tenant_name,
      tenantId: user.tenant_id,
      repositoryRoleId: user.repository_role_Id
    })),
    executed: !input.dry_run
  };
}

export function mapArchiveDownloadResult(summary: string, input: RepoArchiveDownloadResult) {
  return asItemResult(summary, {
    fileName: input.file_name,
    contentType: input.content_type,
    sizeBytes: input.size_bytes
  });
}

export function mapSubmoduleMutationResult(summary: string, input: RepoSubmoduleMutationResult) {
  return asItemResult(summary, {
    result: input.result,
    status: input.status
  });
}

export function previewSubmoduleMutation(input: {
  repository_id: string;
  branch_name: string;
  file_path: string;
  subrepo_id: string;
  commit_message: string;
  subrepo_branch: string;
  dry_run: boolean;
}) {
  return {
    repositoryId: input.repository_id,
    branchName: input.branch_name,
    filePath: input.file_path,
    subrepoId: input.subrepo_id,
    commitMessage: input.commit_message,
    subrepoBranch: input.subrepo_branch,
    executed: !input.dry_run
  };
}

export function mapUserEmailOperationResult(summary: string, input: { result?: string }) {
  return asItemResult(summary, {
    result: input.result
  });
}

export function mapUserEmailsResult(summary: string, items: Array<{
  id?: number | string;
  email?: string;
  commit_email?: string;
  is_primary?: boolean;
  primary?: boolean;
  confirmed_at?: string;
  status?: string;
}>) {
  return asListResult(
    summary,
    items.map((item) => ({
      id: item.id === undefined ? undefined : String(item.id),
      email: item.email,
      commitEmail: item.commit_email,
      primary: item.is_primary ?? item.primary,
      confirmedAt: item.confirmed_at,
      status: item.status
    })),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

export function previewUserEmailMutation(input: Record<string, unknown>) {
  return {
    ...input,
    executed: false
  };
}
