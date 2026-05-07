import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createRepoClient } from "../products/repo/client.js";
import {
  repoAssociateRemoteMirrorInput,
  repoBatchCreateProtectedBranchesInput,
  repoBatchCreateProtectedTagsInput,
  repoBatchDeleteRepositoryFilePushPermissionsInput,
  repoBatchUpdateProtectedBranchesInput,
  repoBatchUpdateProtectedTagsInput,
  repoBatchUpdateRepositoryFilePushPermissionsInput,
  repoBulkDeleteProtectedBranchesInput,
  repoBulkDeleteProtectedTagsInput,
  repoCheckRepositoryDeployKeyInput,
  repoCompareRefsInput,
  repoCloseMergeRequestInput,
  repoCreateFilePushPermissionInput,
  repoCreateProjectProtectedBranchesInput,
  repoCreateProjectProtectedTagsInput,
  repoCreateMergeRequestDiscussionInput,
  repoCreateMergeRequestInput,
  repoCreateRepositoryInput,
  repoCreateRepositoryWebhookInput,
  repoImportRepositoryInput,
  repoDeleteProtectedBranchInput,
  repoGetBranchInput,
  repoGetCommitInput,
  repoGetFileInput,
  repoGetMergeRequestInput,
  repoGetProtectedBranchInput,
  repoGetRemoteMirrorInput,
  repoGetProtectedTagInput,
  repoGetRepositoryInput,
  repoGetRepositoryWebhookInput,
  repoGetRepositoryWebhookLogInput,
  repoGetTagInput,
  repoCreateTagInput,
  repoDeleteProtectedTagInput,
  repoDeleteRepositoryWebhookInput,
  repoDeleteTagInput,
  repoListEventsInput,
  repoListGroupProtectedBranchesInput,
  repoListGroupProtectedRefsUserGroupsInput,
  repoListImpersonationTokensInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoListProtectedTagsInput,
  repoListProjectSubgroupsAndRepositoriesInput,
  repoListRepositoryDeployKeysInput,
  repoListRepositoryWebhookLogsInput,
  repoListRepositoryWebhooksInput,
  repoListTagsInput,
  repoListBranchesInput,
  repoListCommitsInput,
  repoListMergeRequestChangesInput,
  repoListMergeRequestDiscussionsInput,
  repoListProjectProtectedBranchesInput,
  repoListProjectProtectedRefsUserGroupsInput,
  repoListProjectProtectedTagsInput,
  repoListProtectedBranchesInput,
  repoListRepositoryProtectedRefsUserGroupsInput,
  repoListRepositoryFilePushPermissionsInput,
  repoListRepositoryLabelsInput,
  repoListRepositoryResourcePermissionsInput,
  repoListMergeRequestsInput,
  repoMergeMergeRequestInput,
  repoListRepositoriesInput,
  repoRemoveRepositoryDeployKeyInput,
  repoReviewMergeRequestInput,
  repoShowProjectSettingsInheritCfgInput,
  repoShowProjectWatermarkInput,
  repoShowRepositoryPermissionInheritEnabledInput,
  repoShowResourcePermissionsInput,
  repoStartRemoteMirrorSynchronizationInput,
  repoUpdateGroupResourcePermissionsInput,
  repoUpdateProjectSettingsInheritCfgInput,
  repoUpdateProjectWatermarkInput,
  repoUpdateProtectedBranchInput,
  repoUpdateProtectedTagInput,
  repoUpdateRepositoryPermissionInheritEnabledInput,
  repoUpdateRepositoryResourcePermissionsInput,
  repoUpdateRepositoryWebhookInput,
  repoUpdateRemoteMirrorInput
} from "../products/repo/schemas.js";
import { createRepoAssociateRemoteMirrorHandler } from "../products/repo/tools/associate-remote-mirror.js";
import { createRepoCheckRepositoryDeployKeyHandler } from "../products/repo/tools/check-repository-deploy-key.js";
import { createRepoCloseMergeRequestHandler } from "../products/repo/tools/close-merge-request.js";
import { createRepoCompareRefsHandler } from "../products/repo/tools/compare-refs.js";
import { createRepoCreateProjectProtectedBranchesHandler } from "../products/repo/tools/create-project-protected-branches.js";
import { createRepoCreateProjectProtectedTagsHandler } from "../products/repo/tools/create-project-protected-tags.js";
import { createRepoCreateMergeRequestDiscussionHandler } from "../products/repo/tools/create-merge-request-discussion.js";
import { createRepoCreateMergeRequestHandler } from "../products/repo/tools/create-merge-request.js";
import { createRepoCreateRepositoryHandler } from "../products/repo/tools/create-repository.js";
import { createRepoCreateRepositoryWebhookHandler } from "../products/repo/tools/create-repository-webhook.js";
import { createRepoDeleteRepositoryWebhookHandler } from "../products/repo/tools/delete-repository-webhook.js";
import { createRepoImportRepositoryHandler } from "../products/repo/tools/import-repository.js";
import { createRepoGetBranchHandler } from "../products/repo/tools/get-branch.js";
import { createRepoGetCommitHandler } from "../products/repo/tools/get-commit.js";
import { createRepoGetFileHandler } from "../products/repo/tools/get-file.js";
import { createRepoGetMergeRequestHandler } from "../products/repo/tools/get-merge-request.js";
import { createRepoGetRemoteMirrorHandler } from "../products/repo/tools/get-remote-mirror.js";
import { createRepoGetRepositoryHandler } from "../products/repo/tools/get-repository.js";
import { createRepoGetRepositoryWebhookHandler } from "../products/repo/tools/get-repository-webhook.js";
import { createRepoGetRepositoryWebhookLogHandler } from "../products/repo/tools/get-repository-webhook-log.js";
import { createRepoGetTagHandler } from "../products/repo/tools/get-tag.js";
import { createRepoListBranchesHandler } from "../products/repo/tools/list-branches.js";
import { createRepoListCommitsHandler } from "../products/repo/tools/list-commits.js";
import { createRepoListEventsHandler } from "../products/repo/tools/list-events.js";
import { createRepoListGroupProtectedBranchesHandler } from "../products/repo/tools/list-group-protected-branches.js";
import { createRepoListGroupProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-group-protected-refs-user-groups.js";
import { createRepoListImpersonationTokensHandler } from "../products/repo/tools/list-impersonation-tokens.js";
import { createRepoListMergeRequestChangesHandler } from "../products/repo/tools/list-merge-request-changes.js";
import { createRepoListMergeRequestDiscussionsHandler } from "../products/repo/tools/list-merge-request-discussions.js";
import { createRepoListMergeRequestsHandler } from "../products/repo/tools/list-merge-requests.js";
import { createRepoListPersonalRepositoryImportRecordsHandler } from "../products/repo/tools/list-personal-repository-import-records.js";
import { createRepoListProjectProtectedBranchesHandler } from "../products/repo/tools/list-project-protected-branches.js";
import { createRepoListProjectProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-project-protected-refs-user-groups.js";
import { createRepoListProjectProtectedTagsHandler } from "../products/repo/tools/list-project-protected-tags.js";
import { createRepoListProjectSubgroupsAndRepositoriesHandler } from "../products/repo/tools/list-project-subgroups-and-repositories.js";
import { createRepoListProtectedBranchesHandler } from "../products/repo/tools/list-protected-branches.js";
import { createRepoListRepositoriesHandler } from "../products/repo/tools/list-repositories.js";
import { createRepoListRepositoryProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-repository-protected-refs-user-groups.js";
import { createRepoListRepositoryDeployKeysHandler } from "../products/repo/tools/list-repository-deploy-keys.js";
import { createRepoListRepositoryWebhookLogsHandler } from "../products/repo/tools/list-repository-webhook-logs.js";
import { createRepoListRepositoryWebhooksHandler } from "../products/repo/tools/list-repository-webhooks.js";
import { createRepoListRepositoryLabelsHandler } from "../products/repo/tools/list-repository-labels.js";
import { createRepoListRepositoryResourcePermissionsHandler } from "../products/repo/tools/list-repository-resource-permissions.js";
import { createRepoListTagsHandler } from "../products/repo/tools/list-tags.js";
import { createRepoMergeMergeRequestHandler } from "../products/repo/tools/merge-merge-request.js";
import { createRepoCreateTagHandler } from "../products/repo/tools/create-tag.js";
import { createRepoDeleteTagHandler } from "../products/repo/tools/delete-tag.js";
import { createRepoRemoveRepositoryDeployKeyHandler } from "../products/repo/tools/remove-repository-deploy-key.js";
import { createRepoReviewMergeRequestHandler } from "../products/repo/tools/review-merge-request.js";
import { createRepoShowProjectSettingsInheritCfgHandler } from "../products/repo/tools/show-project-settings-inherit-cfg.js";
import { createRepoShowProjectWatermarkHandler } from "../products/repo/tools/show-project-watermark.js";
import { createRepoShowRepositoryPermissionInheritEnabledHandler } from "../products/repo/tools/show-repository-permission-inherit-enabled.js";
import { createRepoShowResourcePermissionsHandler } from "../products/repo/tools/show-resource-permissions.js";
import { createRepoStartRemoteMirrorSynchronizationHandler } from "../products/repo/tools/start-remote-mirror-synchronization.js";
import { createRepoUpdateGroupResourcePermissionsHandler } from "../products/repo/tools/update-group-resource-permissions.js";
import { createRepoUpdateProjectSettingsInheritCfgHandler } from "../products/repo/tools/update-project-settings-inherit-cfg.js";
import { createRepoUpdateProjectWatermarkHandler } from "../products/repo/tools/update-project-watermark.js";
import { createRepoUpdateRepositoryPermissionInheritEnabledHandler } from "../products/repo/tools/update-repository-permission-inherit-enabled.js";
import { createRepoUpdateRepositoryResourcePermissionsHandler } from "../products/repo/tools/update-repository-resource-permissions.js";
import { createRepoUpdateRepositoryWebhookHandler } from "../products/repo/tools/update-repository-webhook.js";
import { createRepoUpdateRemoteMirrorHandler } from "../products/repo/tools/update-remote-mirror.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";
import { createRepoBatchDeleteRepositoryFilePushPermissionsHandler } from "../products/repo/tools/batch-delete-repository-file-push-permissions.js";
import { createRepoBatchCreateProtectedBranchesHandler } from "../products/repo/tools/batch-create-protected-branches.js";
import { createRepoBatchCreateProtectedTagsHandler } from "../products/repo/tools/batch-create-protected-tags.js";
import { createRepoBatchUpdateRepositoryFilePushPermissionsHandler } from "../products/repo/tools/batch-update-repository-file-push-permissions.js";
import { createRepoBatchUpdateProtectedBranchesHandler } from "../products/repo/tools/batch-update-protected-branches.js";
import { createRepoBatchUpdateProtectedTagsHandler } from "../products/repo/tools/batch-update-protected-tags.js";
import { createRepoBulkDeleteProtectedBranchesHandler } from "../products/repo/tools/bulk-delete-protected-branches.js";
import { createRepoBulkDeleteProtectedTagsHandler } from "../products/repo/tools/bulk-delete-protected-tags.js";
import { createRepoCreateFilePushPermissionHandler } from "../products/repo/tools/create-file-push-permission.js";
import { createRepoDeleteProtectedBranchHandler } from "../products/repo/tools/delete-protected-branch.js";
import { createRepoDeleteProtectedTagHandler } from "../products/repo/tools/delete-protected-tag.js";
import { createRepoGetProtectedBranchHandler } from "../products/repo/tools/get-protected-branch.js";
import { createRepoGetProtectedTagHandler } from "../products/repo/tools/get-protected-tag.js";
import { createRepoListProtectedTagsHandler } from "../products/repo/tools/list-protected-tags.js";
import { createRepoListRepositoryFilePushPermissionsHandler } from "../products/repo/tools/list-repository-file-push-permissions.js";
import { createRepoUpdateProtectedBranchHandler } from "../products/repo/tools/update-protected-branch.js";
import { createRepoUpdateProtectedTagHandler } from "../products/repo/tools/update-protected-tag.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type RepoStdioClient = ReturnType<typeof createRepoClient>;

const repoToolDefinitions = {
  "repo_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Repo API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { repoClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.repoClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "repo_list_repositories": defineProductTool({ description: "List CodeArts Repo repositories", inputSchema: repoListRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoriesHandler }),
  "repo_get_repository": defineProductTool({ description: "Get CodeArts Repo repository detail", inputSchema: repoGetRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryHandler }),
  "repo_create_repository": defineProductTool({ description: "Create CodeArts Repo repository", inputSchema: repoCreateRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryHandler }),
  "repo_import_repository": defineProductTool({ description: "Import external Git repository into CodeArts Repo", inputSchema: repoImportRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoImportRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoImportRepositoryHandler }),
  "repo_list_impersonation_tokens": defineProductTool({ description: "List CodeArts Repo personal access token metadata", inputSchema: repoListImpersonationTokensInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListImpersonationTokensHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListImpersonationTokensHandler }),
  "repo_list_personal_repository_import_records": defineProductTool({ description: "List personal CodeArts Repo repository import records", inputSchema: repoListPersonalRepositoryImportRecordsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPersonalRepositoryImportRecordsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPersonalRepositoryImportRecordsHandler }),
  "repo_associate_remote_mirror": defineProductTool({ description: "Associate CodeArts Repo remote mirror", inputSchema: repoAssociateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateRemoteMirrorHandler }),
  "repo_start_remote_mirror_synchronization": defineProductTool({ description: "Start CodeArts Repo remote mirror synchronization", inputSchema: repoStartRemoteMirrorSynchronizationInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoStartRemoteMirrorSynchronizationHandler>[0] }) => clients.repoClient, createProductHandler: createRepoStartRemoteMirrorSynchronizationHandler }),
  "repo_get_remote_mirror": defineProductTool({ description: "Get CodeArts Repo remote mirror detail", inputSchema: repoGetRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRemoteMirrorHandler }),
  "repo_update_remote_mirror": defineProductTool({ description: "Update CodeArts Repo remote mirror", inputSchema: repoUpdateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRemoteMirrorHandler }),
  "repo_list_repository_deploy_keys": defineProductTool({ description: "List CodeArts Repo repository deploy keys", inputSchema: repoListRepositoryDeployKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryDeployKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryDeployKeysHandler }),
  "repo_list_repository_file_push_permissions": defineProductTool({ description: "List CodeArts Repo repository file push permissions", inputSchema: repoListRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryFilePushPermissionsHandler }),
  "repo_create_file_push_permission": defineProductTool({ description: "Create CodeArts Repo repository file push permission", inputSchema: repoCreateFilePushPermissionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateFilePushPermissionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateFilePushPermissionHandler }),
  "repo_batch_update_repository_file_push_permissions": defineProductTool({ description: "Batch update CodeArts Repo repository file push permissions", inputSchema: repoBatchUpdateRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateRepositoryFilePushPermissionsHandler }),
  "repo_batch_delete_repository_file_push_permissions": defineProductTool({ description: "Batch delete CodeArts Repo repository file push permissions", inputSchema: repoBatchDeleteRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchDeleteRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchDeleteRepositoryFilePushPermissionsHandler }),
  "repo_show_project_watermark": defineProductTool({ description: "Show CodeArts Repo project watermark setting", inputSchema: repoShowProjectWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectWatermarkHandler }),
  "repo_update_project_watermark": defineProductTool({ description: "Update CodeArts Repo project watermark setting", inputSchema: repoUpdateProjectWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectWatermarkHandler }),
  "repo_list_project_subgroups_and_repositories": defineProductTool({ description: "List CodeArts Repo project subgroups and repositories", inputSchema: repoListProjectSubgroupsAndRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectSubgroupsAndRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectSubgroupsAndRepositoriesHandler }),
  "repo_list_repository_resource_permissions": defineProductTool({ description: "List CodeArts Repo repository resource permission matrix", inputSchema: repoListRepositoryResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryResourcePermissionsHandler }),
  "repo_update_repository_resource_permissions": defineProductTool({ description: "Update CodeArts Repo repository resource permission matrix", inputSchema: repoUpdateRepositoryResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryResourcePermissionsHandler }),
  "repo_update_group_resource_permissions": defineProductTool({ description: "Update CodeArts Repo group resource permission matrix", inputSchema: repoUpdateGroupResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupResourcePermissionsHandler }),
  "repo_show_resource_permissions": defineProductTool({ description: "Show CodeArts Repo group resource permission matrix", inputSchema: repoShowResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowResourcePermissionsHandler }),
  "repo_update_repository_permission_inherit_enabled": defineProductTool({ description: "Update CodeArts Repo repository permission inherit setting", inputSchema: repoUpdateRepositoryPermissionInheritEnabledInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryPermissionInheritEnabledHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryPermissionInheritEnabledHandler }),
  "repo_show_repository_permission_inherit_enabled": defineProductTool({ description: "Show CodeArts Repo repository permission inherit setting", inputSchema: repoShowRepositoryPermissionInheritEnabledInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryPermissionInheritEnabledHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryPermissionInheritEnabledHandler }),
  "repo_show_project_settings_inherit_cfg": defineProductTool({ description: "Show CodeArts Repo project inheritance settings", inputSchema: repoShowProjectSettingsInheritCfgInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectSettingsInheritCfgHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectSettingsInheritCfgHandler }),
  "repo_update_project_settings_inherit_cfg": defineProductTool({ description: "Update CodeArts Repo project inheritance settings", inputSchema: repoUpdateProjectSettingsInheritCfgInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectSettingsInheritCfgHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectSettingsInheritCfgHandler }),
  "repo_check_repository_deploy_key": defineProductTool({ description: "Check whether a CodeArts Repo repository deploy key already exists upstream", inputSchema: repoCheckRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCheckRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCheckRepositoryDeployKeyHandler }),
  "repo_remove_repository_deploy_key": defineProductTool({ description: "Remove a CodeArts Repo repository deploy key", inputSchema: repoRemoveRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRemoveRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRemoveRepositoryDeployKeyHandler }),
  "repo_list_repository_webhooks": defineProductTool({ description: "List CodeArts Repo repository webhooks", inputSchema: repoListRepositoryWebhooksInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryWebhooksHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryWebhooksHandler }),
  "repo_create_repository_webhook": defineProductTool({ description: "Create CodeArts Repo repository webhook", inputSchema: repoCreateRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryWebhookHandler }),
  "repo_get_repository_webhook": defineProductTool({ description: "Get CodeArts Repo repository webhook detail", inputSchema: repoGetRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookHandler }),
  "repo_update_repository_webhook": defineProductTool({ description: "Update CodeArts Repo repository webhook", inputSchema: repoUpdateRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryWebhookHandler }),
  "repo_delete_repository_webhook": defineProductTool({ description: "Delete CodeArts Repo repository webhook", inputSchema: repoDeleteRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryWebhookHandler }),
  "repo_list_repository_webhook_logs": defineProductTool({ description: "List CodeArts Repo repository webhook delivery logs", inputSchema: repoListRepositoryWebhookLogsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryWebhookLogsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryWebhookLogsHandler }),
  "repo_get_repository_webhook_log": defineProductTool({ description: "Get CodeArts Repo repository webhook delivery log detail", inputSchema: repoGetRepositoryWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookLogHandler }),
  "repo_create_merge_request": defineProductTool({ description: "Create CodeArts Repo merge request", inputSchema: repoCreateMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestHandler }),
  "repo_create_merge_request_discussion": defineProductTool({ description: "Create CodeArts Repo merge request discussion", inputSchema: repoCreateMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestDiscussionHandler }),
  "repo_close_merge_request": defineProductTool({ description: "Close CodeArts Repo merge request", inputSchema: repoCloseMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCloseMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCloseMergeRequestHandler }),
  "repo_list_merge_request_changes": defineProductTool({ description: "List CodeArts Repo merge request changes", inputSchema: repoListMergeRequestChangesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestChangesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestChangesHandler }),
  "repo_list_merge_request_discussions": defineProductTool({ description: "List CodeArts Repo merge request discussions", inputSchema: repoListMergeRequestDiscussionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestDiscussionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestDiscussionsHandler }),
  "repo_list_project_protected_branches": defineProductTool({ description: "List CodeArts Repo project protected branches", inputSchema: repoListProjectProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedBranchesHandler }),
  "repo_create_project_protected_branches": defineProductTool({ description: "Create CodeArts Repo project protected branch", inputSchema: repoCreateProjectProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectProtectedBranchesHandler }),
  "repo_list_group_protected_branches": defineProductTool({ description: "List CodeArts Repo group protected branches", inputSchema: repoListGroupProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupProtectedBranchesHandler }),
  "repo_list_protected_branches": defineProductTool({ description: "List CodeArts Repo protected branches", inputSchema: repoListProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProtectedBranchesHandler }),
  "repo_get_protected_branch": defineProductTool({ description: "Get CodeArts Repo protected branch detail", inputSchema: repoGetProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedBranchHandler }),
  "repo_batch_create_protected_branches": defineProductTool({ description: "Batch create CodeArts Repo protected branches", inputSchema: repoBatchCreateProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchCreateProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchCreateProtectedBranchesHandler }),
  "repo_batch_update_protected_branches": defineProductTool({ description: "Batch update CodeArts Repo protected branches", inputSchema: repoBatchUpdateProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateProtectedBranchesHandler }),
  "repo_bulk_delete_protected_branches": defineProductTool({ description: "Bulk delete CodeArts Repo protected branches", inputSchema: repoBulkDeleteProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedBranchesHandler }),
  "repo_update_protected_branch": defineProductTool({ description: "Update CodeArts Repo protected branch", inputSchema: repoUpdateProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProtectedBranchHandler }),
  "repo_delete_protected_branch": defineProductTool({ description: "Delete CodeArts Repo protected branch", inputSchema: repoDeleteProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProtectedBranchHandler }),
  "repo_list_protected_tags": defineProductTool({ description: "List CodeArts Repo protected tags", inputSchema: repoListProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProtectedTagsHandler }),
  "repo_get_protected_tag": defineProductTool({ description: "Get CodeArts Repo protected tag detail", inputSchema: repoGetProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedTagHandler }),
  "repo_batch_create_protected_tags": defineProductTool({ description: "Batch create CodeArts Repo protected tags", inputSchema: repoBatchCreateProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchCreateProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchCreateProtectedTagsHandler }),
  "repo_batch_update_protected_tags": defineProductTool({ description: "Batch update CodeArts Repo protected tags", inputSchema: repoBatchUpdateProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateProtectedTagsHandler }),
  "repo_bulk_delete_protected_tags": defineProductTool({ description: "Bulk delete CodeArts Repo protected tags", inputSchema: repoBulkDeleteProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedTagsHandler }),
  "repo_update_protected_tag": defineProductTool({ description: "Update CodeArts Repo protected tag", inputSchema: repoUpdateProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProtectedTagHandler }),
  "repo_delete_protected_tag": defineProductTool({ description: "Delete CodeArts Repo protected tag", inputSchema: repoDeleteProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProtectedTagHandler }),
  "repo_create_project_protected_tags": defineProductTool({ description: "Create CodeArts Repo project protected tag", inputSchema: repoCreateProjectProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectProtectedTagsHandler }),
  "repo_list_project_protected_tags": defineProductTool({ description: "List CodeArts Repo project protected tags", inputSchema: repoListProjectProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedTagsHandler }),
  "repo_list_repository_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo repository protected refs user groups", inputSchema: repoListRepositoryProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryProtectedRefsUserGroupsHandler }),
  "repo_list_group_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo group protected refs user groups", inputSchema: repoListGroupProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupProtectedRefsUserGroupsHandler }),
  "repo_list_project_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo project protected refs user groups", inputSchema: repoListProjectProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedRefsUserGroupsHandler }),
  "repo_list_repository_labels": defineProductTool({ description: "List CodeArts Repo repository labels", inputSchema: repoListRepositoryLabelsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLabelsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLabelsHandler }),
  "repo_create_tag": defineProductTool({ description: "Create CodeArts Repo tag", inputSchema: repoCreateTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateTagHandler }),
  "repo_delete_tag": defineProductTool({ description: "Delete CodeArts Repo tag", inputSchema: repoDeleteTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteTagHandler }),
  "repo_list_tags": defineProductTool({ description: "List CodeArts Repo tags", inputSchema: repoListTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTagsHandler }),
  "repo_list_events": defineProductTool({ description: "List CodeArts Repo events", inputSchema: repoListEventsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListEventsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListEventsHandler }),
  "repo_list_merge_requests": defineProductTool({ description: "List CodeArts Repo merge requests", inputSchema: repoListMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestsHandler }),
  "repo_get_branch": defineProductTool({ description: "Get CodeArts Repo branch detail", inputSchema: repoGetBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetBranchHandler }),
  "repo_compare_refs": defineProductTool({ description: "Compare CodeArts Repo refs", inputSchema: repoCompareRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCompareRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCompareRefsHandler }),
  "repo_get_tag": defineProductTool({ description: "Get CodeArts Repo tag detail", inputSchema: repoGetTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetTagHandler }),
  "repo_get_merge_request": defineProductTool({ description: "Get CodeArts Repo merge request detail", inputSchema: repoGetMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestHandler }),
  "repo_merge_merge_request": defineProductTool({ description: "Merge CodeArts Repo merge request", inputSchema: repoMergeMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoMergeMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoMergeMergeRequestHandler }),
  "repo_review_merge_request": defineProductTool({ description: "Review CodeArts Repo merge request", inputSchema: repoReviewMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoReviewMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoReviewMergeRequestHandler }),
  "repo_get_file": defineProductTool({ description: "Get CodeArts Repo file content", inputSchema: repoGetFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetFileHandler }),
  "repo_list_commits": defineProductTool({ description: "List CodeArts Repo commits", inputSchema: repoListCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitsHandler }),
  "repo_get_commit": defineProductTool({ description: "Get CodeArts Repo commit detail", inputSchema: repoGetCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetCommitHandler }),
  "repo_list_branches": defineProductTool({ description: "List CodeArts Repo branches", inputSchema: repoListBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListBranchesHandler })
} as const;

export function registerRepoTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: RepoStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: repoToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
