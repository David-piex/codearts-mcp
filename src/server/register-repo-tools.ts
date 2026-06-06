import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createRepoClient } from "../products/repo/client.js";
import {
  repoAssociateBranchWorkItemsInput,
  repoAssociateRepositoryUserGroupInput,
  repoDownloadArchiveInput,
  repoAssociateRemoteMirrorInput,
  repoBatchValidateRepoNamesInput,
  repoBatchValidateUserGroupPermissionsInput,
  repoBatchDeleteBranchInput,
  repoAddSubmoduleInput,
  repoBatchCreateProtectedBranchesInput,
  repoBatchCreateProtectedTagsInput,
  repoBatchDeleteRepositoryFilePushPermissionsInput,
  repoBatchUpdateProtectedBranchesInput,
  repoBatchUpdateProtectedTagsInput,
  repoBatchUpdateRepositoryFilePushPermissionsInput,
  repoBulkDeleteProtectedBranchesInput,
  repoBulkDeleteProtectedTagsInput,
  repoCheckGroupDeployKeyInput,
  repoCheckRepositoryDeployKeyInput,
  repoCompareRefsInput,
  repoCloseMergeRequestInput,
  repoCreateCherryPickMergeRequestInput,
  repoCreateFilePushPermissionInput,
  repoCreateProjectProtectedBranchesInput,
  repoCreateProjectProtectedTagsInput,
  repoCreateRepositorySystemLabelsInput,
  repoCreateRepositoryLabelInput,
  repoCreateRepositoryCommitRuleInput,
  repoCreateBranchInput,
  repoCreateCommitInput,
  repoCreateCommitRevertInput,
  repoCreateFileInput,
  repoCreateReviewSettingInput,
  repoCreateDirInput,
  repoCreateGroupInput,
  repoCreateMergeRequestDiscussionResponseInput,
  repoCreateMergeRequestDiscussionInput,
  repoCreateMergeRequestInput,
  repoCreateRepositoryInput,
  repoForkRepositoryInput,
  repoCreateProjectWebhookInput,
  repoCreateGroupWebhookInput,
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
  repoGetGroupWebhookInput,
  repoGetGroupWebhookLogInput,
  repoGetProjectWebhookInput,
  repoGetProjectWebhookLogInput,
  repoGetRepositoryInput,
  repoGetRepositoryIdByNameInput,
  repoGetRepositoryWebhookInput,
  repoGetRepositoryWebhookLogInput,
  repoGetTagInput,
  repoCreateTagInput,
  repoDeleteProtectedTagInput,
  repoDeleteProjectWebhookInput,
  repoDeleteGroupWebhookInput,
  repoDeleteRepositoryWebhookInput,
  repoDeleteRepositoryLabelInput,
  repoDeleteGroupInput,
  repoDeleteRepositoryInput,
  repoDeleteBranchInput,
  repoDeleteFileInput,
  repoDeleteTagInput,
  repoDownloadBlobsRawInput,
  repoExecuteRepositoryStatisticsInput,
  repoLockRepositoryInput,
  repoListSubmodulesInput,
  repoShowCommitStatisticsInput,
  repoListEventsInput,
  repoListBranchRelatedWorkItemsInput,
  repoListCurrentUserRepositoriesInput,
  repoListGroupAddableMembersInput,
  repoListGroupAddableUserGroupsInput,
  repoListGroupDeployKeysInput,
  repoListGroupsInput,
  repoListManageableGroupsInput,
  repoListGroupMembersInput,
  repoListGroupPermissionResourcesInput,
  repoListMembersInput,
  repoListGroupProtectedBranchesInput,
  repoListGroupProtectedRefsUserGroupsInput,
  repoListGroupRepositoriesInput,
  repoListGroupSubgroupsAndRepositoriesInput,
  repoListGroupUserGroupsInput,
  repoAssociateGroupUserGroupInput,
  repoListImpersonationTokensInput,
  repoListItemCommitsInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoListPersonalRecentPushEventsInput,
  repoListProtectedTagsInput,
  repoListProjectSubgroupsAndRepositoriesInput,
  repoListRepositoryCommitRulesInput,
  repoListRepositoryDeployKeysInput,
  repoListGroupWebhookLogsInput,
  repoListGroupWebhooksInput,
  repoListProjectWebhookLogsInput,
  repoListProjectWebhooksInput,
  repoListProjectTemplateStatusRepositoriesInput,
  repoListRepositoryWebhookLogsInput,
  repoListRepositoryWebhooksInput,
  repoListTagsInput,
  repoListBranchesInput,
  repoListCommitsInput,
  repoListMergeRequestChangesInput,
  repoListMergeRequestChangesTreesInput,
  repoListMergeRequestConflictFilesInput,
  repoListMergeRequestCommitsInput,
  repoListMergeRequestEvaluationsInput,
  repoListCommitAssociatedMergeRequestsInput,
  repoListCommitDiscussionsInput,
  repoListMergeRequestDiscussionsInput,
  repoListMergeRequestSystemNotesInput,
  repoListMergeRequestParticipantsInput,
  repoListProjectProtectedBranchesInput,
  repoListProjectProtectedRefsUserGroupsInput,
  repoListProjectProtectedTagsInput,
  repoListProjectDeployKeysInput,
  repoListProjectMembersInput,
  repoListProductPermissionResourcesGrantedUsersInput,
  repoListLatestPipelineJobsInput,
  repoListPipelineJobsInput,
  repoListProtectedBranchesInput,
  repoListCommitAssociatedRefsInput,
  repoListDefaultReviewCategoriesInput,
  repoListFileUpperTreeEntriesInput,
  repoListRefsInput,
  repoListRepositoryProtectedRefsUserGroupsInput,
  repoListRepositoryContributorsInput,
  repoListRepositoryFilePushPermissionsInput,
  repoListRepositoryFileListInput,
  repoListBranchSubFilesInput,
  repoListRepositoryForksInput,
  repoListRepositoryLanguagesInput,
  repoListRepositoryLabelsInput,
  repoListRepositoryLogsTreeInput,
  repoListRepositoryMembersInput,
  repoListRepositoryNavigationReferencesInput,
  repoListRepositoryResourcePermissionsInput,
  repoListRepositoryReviewAuthorsInput,
  repoListRepositoryReviewsInput,
  repoListRepositoryRelatedCommitsInput,
  repoListRepositoryTemplatesInput,
  repoListRepositoryTreesInput,
  repoListRepositoryUserGroupsInput,
  repoListRepositoryWorkItemsInput,
  repoListMergeRequestsInput,
  repoListMergeRequestApproversInput,
  repoImportMergeRequestInput,
  repoListPersonalMergeRequestsInput,
  repoListProjectMergeRequestsInput,
  repoListMergeRequestReviewersInput,
  repoListMergeRequestVersionsInput,
  repoListMergeRequestValidAssignedCandidatesInput,
  repoMergeMergeRequestInput,
  repoListRepositoriesInput,
  repoListProjectRepositoriesInput,
  repoListGroupMergeRequestCanBeAssignedReviewersInput,
  repoListGroupMergeRequestValidAssignedCandidatesInput,
  repoListProjectMergeRequestCanBeAssignedReviewersInput,
  repoListProjectMergeRequestCanBeAssignedUsersInput,
  repoAddRepositoryDeployKeyInput,
  repoRemoveDeployKeyFromSubmodulesInput,
  repoRemoveRepositoryDeployKeyInput,
  repoReviewMergeRequestInput,
  repoRebaseMergeRequestForOpenApiInput,
  repoResolveMergeRequestConflictsInput,
  repoShowNotificationSubscriptionInput,
  repoShowNotificationSubscriptionsStatusInput,
  repoShowBlobsInput,
  repoShowDiffLinesInput,
  repoShowGroupE2eSettingInput,
  repoShowGroupInheritSettingInput,
  repoShowGroupApproverSettingsInput,
  repoShowGroupGeneralPolicyInput,
  repoShowGroupInput,
  repoShowGroupSettingsInheritCfgInput,
  repoShowGroupsGeneralPolicyInput,
  repoShowGroupReviewSettingsInput,
  repoShowGroupMergeRequestSettingInput,
  repoShowGroupNoteRequiredAttributesInput,
  repoShowGroupPermissionInheritEnabledInput,
  repoShowGroupWatermarkInput,
  repoShowHttpsPasswordSettingInput,
  repoValidateHttpsInfoInput,
  repoShowActualHeadPipelineInput,
  repoShowAverageEvaluationInput,
  repoShowBranchConflictInput,
  repoShowCommitDiffMetadataInput,
  repoShowCommitFileDiffInput,
  repoShowCommitCommentsByLineInput,
  repoShowBranchFileInput,
  repoShowFileInput,
  repoShowFileRawInput,
  repoShowLastPushEventInRepositoryInput,
  repoShowMergeableStateOuterInput,
  repoShowMergeRequestDiscussionInput,
  repoShowMergeRequestCommentsByLineInput,
  repoShowMergeRequestStatisticInput,
  repoShowMergeRequestVotesInput,
  repoListProjectNoteRequiredAttributesInput,
  repoShowNoteRequiredAttributesInput,
  repoShowProjectE2eSettingInput,
  repoShowProjectApproverSettingsInput,
  repoShowProjectReviewSettingsInput,
  repoShowReviewSettingInput,
  repoShowTenantDevelopModeInput,
  repoShowTenantRepoEncryptionSettingInput,
  repoListTenantRepositoriesInput,
  repoListTenantCMKsInput,
  repoListTenantEncryptedRepositoriesInput,
  repoShowTenantKMSGrantInput,
  repoShowProjectTenantSettingsInput,
  repoListTenantTrustedIpAddressesInput,
  repoListTrustedIpAddressesInput,
  repoListUserGpgKeysInput,
  repoListUserSshKeysInput,
  repoCreateUserSshKeyInput,
  repoDeleteUserSshKeyInput,
  repoExportTenantRepositoriesInput,
  repoUpdateTenantRepoEncryptionSettingInput,
  repoCreateTenantKMSGrantInput,
  repoAddTenantTrustedIpAddressInput,
  repoAddTrustedIpAddressInput,
  repoUpdateTenantTrustedIpAddressInput,
  repoUpdateTrustedIpAddressInput,
  repoDeleteTenantTrustedIpAddressInput,
  repoDeleteTrustedIpAddressInput,
  repoShowProjectGeneralPolicyInput,
  repoShowProjectMergeRequestSettingInput,
  repoShowProjectMemberSettingInput,
  repoListProjectMergeRequestApproverSettingsInput,
  repoCreateProjectMergeRequestApproverSettingInput,
  repoUpdateProjectMergeRequestApproverSettingInput,
  repoDeleteProjectMergeRequestApproverSettingInput,
  repoShowProjectSettingsInheritCfgInput,
  repoShowProjectWatermarkInput,
  repoShowProjectsGeneralPolicyInput,
  repoShowRepoLastStatisticsInput,
  repoShowRepoStatisticsSummaryInput,
  repoShowRepositoryCommitLinesInput,
  repoShowRepositoryE2eSettingInput,
  repoShowRepositoryApproverSettingsInput,
  repoShowRepositoryGeneralCommitRuleInput,
  repoShowRepositoryGeneralPolicyInput,
  repoShowRepositoryInheritSettingInput,
  repoShowRepositoryInheritSettingSourceInput,
  repoShowRepositoryNavigationLanguageInput,
  repoShowRepositoryNavigationOutlineInput,
  repoShowRepositoryNavigationSchemaInput,
  repoShowRepositoryPermissionInheritEnabledInput,
  repoShowRepositoryReadmeFileInput,
  repoShowRepositoryMasterInput,
  repoShowRepositoryStatusInput,
  repoShowRepositoryStatisticDataInput,
  repoShowRepositoryStatisticsStatusInput,
  repoShowRepositoryStatisticsSummaryInput,
  repoShowRepositoryWatermarkInput,
  repoShowRepositoryMergeRequestSettingInput,
  repoUpdateMergeRequestDiscussionInfoInput,
  repoUpdateMergeRequestDiscussionInput,
  repoUpdateMergeRequestSettingInput,
  repoUpdateMergeRequestApproversInput,
  repoUpdateMergeRequestReviewersInput,
  repoGetRepositoryBlameInput,
  repoGetMergeRequestTemplateInput,
  repoGetRepositoryFileContentV4Input,
  repoListDiscussionTemplatesInput,
  repoListMergeRequestTemplatesInput,
  repoCreateMergeRequestApproverSettingInput,
  repoUpdateMergeRequestApproverSettingInput,
  repoDeleteMergeRequestApproverSettingInput,
  repoCreateMergeRequestTemplateInput,
  repoUpdateMergeRequestTemplateInput,
  repoDeleteMergeRequestTemplateInput,
  repoListGroupMergeRequestApproverSettingsInput,
  repoCreateGroupMergeRequestApproverSettingInput,
  repoUpdateGroupMergeRequestApproverSettingInput,
  repoDeleteGroupMergeRequestApproverSettingInput,
  repoListGroupMergeRequestTemplatesInput,
  repoCreateGroupMergeRequestTemplateInput,
  repoUpdateGroupMergeRequestTemplateInput,
  repoDeleteGroupMergeRequestTemplateInput,
  repoListProjectMergeRequestTemplatesInput,
  repoCreateProjectMergeRequestTemplateInput,
  repoUpdateProjectMergeRequestTemplateInput,
  repoDeleteProjectMergeRequestTemplateInput,
  repoShowResourcePermissionsInput,
  repoShowUserRefPermissionInput,
  repoStartRemoteMirrorSynchronizationInput,
  repoStartHouseKeepingInput,
  repoTransferRepositoryInput,
  repoRebuildRepositoryNavigationInput,
  repoSyncDeployKeyToSubmodulesInput,
  repoUnlockRepositoryInput,
  repoUpdateGroupResourcePermissionsInput,
  repoUpdateGroupGeneralPolicyInput,
  repoUpdateGroupNoteRequiredAttributesInput,
  repoUpdateGroupReviewSettingsInput,
  repoUpdateGroupWatermarkInput,
  repoUpdateHttpsPasswordSettingInput,
  repoUpdateNotificationSubscriptionInput,
  repoUpdateBranchNameInput,
  repoUpdateFileInput,
  repoRenameFileInput,
  repoShowDiffCommitInput,
  repoTransferGroupInput,
  repoAddRepositoryMembersInput,
  repoDeleteRepositoryMemberInput,
  repoUpdateRepositoryMemberInput,
  repoSendUserEmailVerifyCodeInput,
  repoUpdateUserEmailsInput,
  repoShowUserEmailsInput,
  repoUpdateProjectGeneralPolicyInput,
  repoUpdateProjectNoteRequiredAttributesInput,
  repoUpdateProjectReviewSettingsInput,
  repoUpdateProjectSettingsInheritCfgInput,
  repoUpdateProjectWatermarkInput,
  repoUpdateRepositoryGeneralPolicyInput,
  repoUpdateNoteRequiredAttributesInput,
  repoUpdateRepositoryGeneralCommitRuleInput,
  repoUpdateRepositoryCommitRuleInput,
  repoUpdateRepositoryInheritSettingInput,
  repoUpdateRepositoryPipelineInput,
  repoUpdateRepositoryTemplateStatusInput,
  repoUpdateRepositoryWatermarkInput,
  repoUpdateRepositoryLabelInput,
  repoUpdateProtectedBranchInput,
  repoUpdateProtectedTagInput,
  repoUpdateMergeRequestVoteInput,
  repoDeleteMergeRequestVoteInput,
  repoDeleteMergeRequestDiscussionInput,
  repoUpdateMergeRequestInput,
  repoUpdateRepositoryPermissionInheritEnabledInput,
  repoUpdateRepositoryResourcePermissionsInput,
  repoUpdateProjectWebhookInput,
  repoUpdateGroupWebhookInput,
  repoUpdateRepositoryWebhookInput,
  repoUpdateRemoteMirrorInput,
  repoVerifyUserSshPrivateKeyInput,
  repoValidateProjectRepositoryNameInput
} from "../products/repo/schemas.js";
import { createRepoAssociateBranchWorkItemsHandler } from "../products/repo/tools/associate-branch-work-items.js";
import { createRepoAssociateRepositoryUserGroupHandler } from "../products/repo/tools/associate-repository-user-group.js";
import { createRepoAssociateRemoteMirrorHandler } from "../products/repo/tools/associate-remote-mirror.js";
import { createRepoBatchValidateRepoNamesHandler } from "../products/repo/tools/batch-validate-repo-names.js";
import { createRepoBatchValidateUserGroupPermissionsHandler } from "../products/repo/tools/batch-validate-user-group-permissions.js";
import { createRepoAddRepositoryMembersHandler } from "../products/repo/tools/add-repository-members.js";
import { createRepoUpdateRepositoryMemberHandler } from "../products/repo/tools/update-repository-member.js";
import { createRepoDownloadArchiveHandler } from "../products/repo/tools/download-archive.js";
import { createRepoAddSubmoduleHandler } from "../products/repo/tools/add-submodule.js";
import { createRepoCheckGroupDeployKeyHandler } from "../products/repo/tools/check-group-deploy-key.js";
import { createRepoCheckRepositoryDeployKeyHandler } from "../products/repo/tools/check-repository-deploy-key.js";
import { createRepoCloseMergeRequestHandler } from "../products/repo/tools/close-merge-request.js";
import { createRepoCompareRefsHandler } from "../products/repo/tools/compare-refs.js";
import { createRepoCreateProjectProtectedBranchesHandler } from "../products/repo/tools/create-project-protected-branches.js";
import { createRepoCreateProjectProtectedTagsHandler } from "../products/repo/tools/create-project-protected-tags.js";
import { createRepoCreateRepositorySystemLabelsHandler } from "../products/repo/tools/create-repository-system-labels.js";
import { createRepoCreateRepositoryLabelHandler } from "../products/repo/tools/create-repository-label.js";
import { createRepoCreateRepositoryCommitRuleHandler } from "../products/repo/tools/create-repository-commit-rule.js";
import { createRepoCreateBranchHandler } from "../products/repo/tools/create-branch.js";
import { createRepoCreateCommitHandler } from "../products/repo/tools/create-commit.js";
import { createRepoCreateCommitRevertHandler } from "../products/repo/tools/create-commit-revert.js";
import { createRepoCreateFileHandler } from "../products/repo/tools/create-file.js";
import { createRepoCreateReviewSettingHandler } from "../products/repo/tools/create-review-setting.js";
import { createRepoCreateDirHandler } from "../products/repo/tools/create-dir.js";
import { createRepoCreateGroupHandler } from "../products/repo/tools/create-group.js";
import { createRepoCreateCherryPickMergeRequestHandler } from "../products/repo/tools/create-cherry-pick-merge-request.js";
import { createRepoCreateMergeRequestDiscussionResponseHandler } from "../products/repo/tools/create-merge-request-discussion-response.js";
import { createRepoCreateMergeRequestDiscussionHandler } from "../products/repo/tools/create-merge-request-discussion.js";
import { createRepoCreateMergeRequestHandler } from "../products/repo/tools/create-merge-request.js";
import { createRepoCreateRepositoryHandler } from "../products/repo/tools/create-repository.js";
import { createRepoForkRepositoryHandler } from "../products/repo/tools/fork-repository.js";
import { createRepoCreateProjectWebhookHandler } from "../products/repo/tools/create-project-webhook.js";
import { createRepoCreateGroupWebhookHandler } from "../products/repo/tools/create-group-webhook.js";
import { createRepoCreateRepositoryWebhookHandler } from "../products/repo/tools/create-repository-webhook.js";
import { createRepoDeleteProjectWebhookHandler } from "../products/repo/tools/delete-project-webhook.js";
import { createRepoDeleteGroupWebhookHandler } from "../products/repo/tools/delete-group-webhook.js";
import { createRepoDeleteRepositoryWebhookHandler } from "../products/repo/tools/delete-repository-webhook.js";
import { createRepoDeleteRepositoryLabelHandler } from "../products/repo/tools/delete-repository-label.js";
import { createRepoDeleteGroupHandler } from "../products/repo/tools/delete-group.js";
import { createRepoDeleteRepositoryHandler } from "../products/repo/tools/delete-repository.js";
import { createRepoDeleteBranchHandler } from "../products/repo/tools/delete-branch.js";
import { createRepoDeleteFileHandler } from "../products/repo/tools/delete-file.js";
import { createRepoDownloadBlobsRawHandler } from "../products/repo/tools/download-blobs-raw.js";
import { createRepoImportRepositoryHandler } from "../products/repo/tools/import-repository.js";
import { createRepoGetBranchHandler } from "../products/repo/tools/get-branch.js";
import { createRepoGetCommitHandler } from "../products/repo/tools/get-commit.js";
import { createRepoGetFileHandler } from "../products/repo/tools/get-file.js";
import { createRepoGetGroupWebhookHandler } from "../products/repo/tools/get-group-webhook.js";
import { createRepoGetGroupWebhookLogHandler } from "../products/repo/tools/get-group-webhook-log.js";
import { createRepoGetMergeRequestHandler } from "../products/repo/tools/get-merge-request.js";
import { createRepoGetMergeRequestTemplateHandler } from "../products/repo/tools/get-merge-request-template.js";
import { createRepoGetProjectWebhookHandler } from "../products/repo/tools/get-project-webhook.js";
import { createRepoGetProjectWebhookLogHandler } from "../products/repo/tools/get-project-webhook-log.js";
import { createRepoGetRemoteMirrorHandler } from "../products/repo/tools/get-remote-mirror.js";
import { createRepoGetRepositoryIdByNameHandler } from "../products/repo/tools/get-repository-id-by-name.js";
import { createRepoGetRepositoryHandler } from "../products/repo/tools/get-repository.js";
import { createRepoGetRepositoryBlameHandler } from "../products/repo/tools/get-repository-blame.js";
import { createRepoGetRepositoryFileContentV4Handler } from "../products/repo/tools/get-repository-file-content-v4.js";
import { createRepoGetRepositoryWebhookHandler } from "../products/repo/tools/get-repository-webhook.js";
import { createRepoGetRepositoryWebhookLogHandler } from "../products/repo/tools/get-repository-webhook-log.js";
import { createRepoGetTagHandler } from "../products/repo/tools/get-tag.js";
import { createRepoBatchDeleteBranchHandler } from "../products/repo/tools/batch-delete-branch.js";
import { createRepoListBranchesHandler } from "../products/repo/tools/list-branches.js";
import { createRepoListCommitAssociatedRefsHandler } from "../products/repo/tools/list-commit-associated-refs.js";
import { createRepoListCommitsHandler } from "../products/repo/tools/list-commits.js";
import { createRepoListDefaultReviewCategoriesHandler } from "../products/repo/tools/list-default-review-categories.js";
import { createRepoListDiscussionTemplatesHandler } from "../products/repo/tools/list-discussion-templates.js";
import { createRepoListEventsHandler } from "../products/repo/tools/list-events.js";
import { createRepoListFileUpperTreeEntriesHandler } from "../products/repo/tools/list-file-upper-tree-entries.js";
import { createRepoListBranchRelatedWorkItemsHandler } from "../products/repo/tools/list-branch-related-work-items.js";
import { createRepoListCurrentUserRepositoriesHandler } from "../products/repo/tools/list-current-user-repositories.js";
import { createRepoListGroupAddableMembersHandler } from "../products/repo/tools/list-group-addable-members.js";
import { createRepoListGroupAddableUserGroupsHandler } from "../products/repo/tools/list-group-addable-user-groups.js";
import { createRepoListGroupDeployKeysHandler } from "../products/repo/tools/list-group-deploy-keys.js";
import { createRepoListGroupsHandler } from "../products/repo/tools/list-groups.js";
import { createRepoListGroupPermissionResourcesHandler } from "../products/repo/tools/list-group-permission-resources.js";
import { createRepoListMembersHandler } from "../products/repo/tools/list-members.js";
import { createRepoListManageableGroupsHandler } from "../products/repo/tools/list-manageable-groups.js";
import { createRepoListGroupMembersHandler } from "../products/repo/tools/list-group-members.js";
import { createRepoListGroupProtectedBranchesHandler } from "../products/repo/tools/list-group-protected-branches.js";
import { createRepoListGroupProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-group-protected-refs-user-groups.js";
import { createRepoListGroupRepositoriesHandler } from "../products/repo/tools/list-group-repositories.js";
import { createRepoListGroupSubgroupsAndRepositoriesHandler } from "../products/repo/tools/list-group-subgroups-and-repositories.js";
import { createRepoListGroupUserGroupsHandler } from "../products/repo/tools/list-group-user-groups.js";
import { createRepoAssociateGroupUserGroupHandler } from "../products/repo/tools/associate-group-user-group.js";
import { createRepoListGroupWebhookLogsHandler } from "../products/repo/tools/list-group-webhook-logs.js";
import { createRepoListGroupWebhooksHandler } from "../products/repo/tools/list-group-webhooks.js";
import { createRepoListImpersonationTokensHandler } from "../products/repo/tools/list-impersonation-tokens.js";
import { createRepoListItemCommitsHandler } from "../products/repo/tools/list-item-commits.js";
import { createRepoSendUserEmailVerifyCodeHandler } from "../products/repo/tools/send-user-email-verify-code.js";
import { createRepoUpdateUserEmailsHandler } from "../products/repo/tools/update-user-emails.js";
import { createRepoShowUserEmailsHandler } from "../products/repo/tools/show-user-emails.js";
import { createRepoListMergeRequestChangesHandler } from "../products/repo/tools/list-merge-request-changes.js";
import { createRepoListMergeRequestChangesTreesHandler } from "../products/repo/tools/list-merge-request-changes-trees.js";
import { createRepoListMergeRequestConflictFilesHandler } from "../products/repo/tools/list-merge-request-conflict-files.js";
import { createRepoListMergeRequestCommitsHandler } from "../products/repo/tools/list-merge-request-commits.js";
import { createRepoListMergeRequestEvaluationsHandler } from "../products/repo/tools/list-merge-request-evaluations.js";
import { createRepoListMergeRequestApproversHandler } from "../products/repo/tools/list-merge-request-approvers.js";
import { createRepoListCommitAssociatedMergeRequestsHandler } from "../products/repo/tools/list-commit-associated-merge-requests.js";
import { createRepoListCommitDiscussionsHandler } from "../products/repo/tools/list-commit-discussions.js";
import { createRepoListMergeRequestDiscussionsHandler } from "../products/repo/tools/list-merge-request-discussions.js";
import { createRepoListMergeRequestSystemNotesHandler } from "../products/repo/tools/list-merge-request-system-notes.js";
import { createRepoListMergeRequestParticipantsHandler } from "../products/repo/tools/list-merge-request-participants.js";
import { createRepoListMergeRequestReviewersHandler } from "../products/repo/tools/list-merge-request-reviewers.js";
import { createRepoListMergeRequestVersionsHandler } from "../products/repo/tools/list-merge-request-versions.js";
import { createRepoListMergeRequestTemplatesHandler } from "../products/repo/tools/list-merge-request-templates.js";
import { createRepoListMergeRequestValidAssignedCandidatesHandler } from "../products/repo/tools/list-merge-request-valid-assigned-candidates.js";
import { createRepoListGroupMergeRequestCanBeAssignedReviewersHandler } from "../products/repo/tools/list-group-merge-request-can-be-assigned-reviewers.js";
import { createRepoListGroupMergeRequestValidAssignedCandidatesHandler } from "../products/repo/tools/list-group-merge-request-valid-assigned-candidates.js";
import { createRepoListGroupMergeRequestTemplatesHandler } from "../products/repo/tools/list-group-merge-request-templates.js";
import { createRepoListProjectMergeRequestCanBeAssignedReviewersHandler } from "../products/repo/tools/list-project-merge-request-can-be-assigned-reviewers.js";
import { createRepoListProjectMergeRequestCanBeAssignedUsersHandler } from "../products/repo/tools/list-project-merge-request-can-be-assigned-users.js";
import { createRepoListProjectMergeRequestTemplatesHandler } from "../products/repo/tools/list-project-merge-request-templates.js";
import { createRepoListMergeRequestsHandler } from "../products/repo/tools/list-merge-requests.js";
import { createRepoListPersonalMergeRequestsHandler } from "../products/repo/tools/list-personal-merge-requests.js";
import { createRepoListPersonalRepositoryImportRecordsHandler } from "../products/repo/tools/list-personal-repository-import-records.js";
import { createRepoListPersonalRecentPushEventsHandler } from "../products/repo/tools/list-personal-recent-push-events.js";
import { createRepoListProjectProtectedBranchesHandler } from "../products/repo/tools/list-project-protected-branches.js";
import { createRepoListProjectProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-project-protected-refs-user-groups.js";
import { createRepoListProjectProtectedTagsHandler } from "../products/repo/tools/list-project-protected-tags.js";
import { createRepoListProjectDeployKeysHandler } from "../products/repo/tools/list-project-deploy-keys.js";
import { createRepoListProjectMembersHandler } from "../products/repo/tools/list-project-members.js";
import { createRepoListProductPermissionResourcesGrantedUsersHandler } from "../products/repo/tools/list-product-permission-resources-granted-users.js";
import { createRepoListLatestPipelineJobsHandler } from "../products/repo/tools/list-latest-pipeline-jobs.js";
import { createRepoListPipelineJobsHandler } from "../products/repo/tools/list-pipeline-jobs.js";
import { createRepoListProjectSubgroupsAndRepositoriesHandler } from "../products/repo/tools/list-project-subgroups-and-repositories.js";
import { createRepoListProjectWebhookLogsHandler } from "../products/repo/tools/list-project-webhook-logs.js";
import { createRepoListProjectWebhooksHandler } from "../products/repo/tools/list-project-webhooks.js";
import { createRepoListProjectTemplateStatusRepositoriesHandler } from "../products/repo/tools/list-project-template-status-repositories.js";
import { createRepoListProjectRepositoriesHandler } from "../products/repo/tools/list-project-repositories.js";
import { createRepoListProtectedBranchesHandler } from "../products/repo/tools/list-protected-branches.js";
import { createRepoListRefsHandler } from "../products/repo/tools/list-refs.js";
import { createRepoListRepositoriesHandler } from "../products/repo/tools/list-repositories.js";
import { createRepoImportMergeRequestHandler } from "../products/repo/tools/import-merge-request.js";
import { createRepoListRepositoryCommitRulesHandler } from "../products/repo/tools/list-repository-commit-rules.js";
import { createRepoListRepositoryContributorsHandler } from "../products/repo/tools/list-repository-contributors.js";
import { createRepoListBranchSubFilesHandler } from "../products/repo/tools/list-branch-sub-files.js";
import { createRepoListRepositoryFileListHandler } from "../products/repo/tools/list-repository-file-list.js";
import { createRepoListRepositoryForksHandler } from "../products/repo/tools/list-repository-forks.js";
import { createRepoListRepositoryLanguagesHandler } from "../products/repo/tools/list-repository-languages.js";
import { createRepoListRepositoryLogsTreeHandler } from "../products/repo/tools/list-repository-logs-tree.js";
import { createRepoListRepositoryMembersHandler } from "../products/repo/tools/list-repository-members.js";
import { createRepoListRepositoryNavigationReferencesHandler } from "../products/repo/tools/list-repository-navigation-references.js";
import { createRepoListRepositoryProtectedRefsUserGroupsHandler } from "../products/repo/tools/list-repository-protected-refs-user-groups.js";
import { createRepoListRepositoryReviewAuthorsHandler } from "../products/repo/tools/list-repository-review-authors.js";
import { createRepoListRepositoryReviewsHandler } from "../products/repo/tools/list-repository-reviews.js";
import { createRepoListRepositoryRelatedCommitsHandler } from "../products/repo/tools/list-repository-related-commits.js";
import { createRepoListRepositoryDeployKeysHandler } from "../products/repo/tools/list-repository-deploy-keys.js";
import { createRepoListRepositoryWebhookLogsHandler } from "../products/repo/tools/list-repository-webhook-logs.js";
import { createRepoListRepositoryWebhooksHandler } from "../products/repo/tools/list-repository-webhooks.js";
import { createRepoListRepositoryLabelsHandler } from "../products/repo/tools/list-repository-labels.js";
import { createRepoListRepositoryResourcePermissionsHandler } from "../products/repo/tools/list-repository-resource-permissions.js";
import { createRepoListRepositoryTemplatesHandler } from "../products/repo/tools/list-repository-templates.js";
import { createRepoListRepositoryTreesHandler } from "../products/repo/tools/list-repository-trees.js";
import { createRepoListRepositoryUserGroupsHandler } from "../products/repo/tools/list-repository-user-groups.js";
import { createRepoListRepositoryWorkItemsHandler } from "../products/repo/tools/list-repository-work-items.js";
import { createRepoListTagsHandler } from "../products/repo/tools/list-tags.js";
import { createRepoListSubmodulesHandler } from "../products/repo/tools/list-submodules.js";
import { createRepoLockRepositoryHandler } from "../products/repo/tools/lock-repository.js";
import { createRepoMergeMergeRequestHandler } from "../products/repo/tools/merge-merge-request.js";
import { createRepoRebaseMergeRequestForOpenApiHandler } from "../products/repo/tools/rebase-merge-request-for-open-api.js";
import { createRepoRemoveDeployKeyFromSubmodulesHandler } from "../products/repo/tools/remove-deploy-key-from-submodules.js";
import { createRepoResolveMergeRequestConflictsHandler } from "../products/repo/tools/resolve-merge-request-conflicts.js";
import { createRepoShowBlobsHandler } from "../products/repo/tools/show-blobs.js";
import { createRepoShowCommitStatisticsHandler } from "../products/repo/tools/show-commit-statistics.js";
import { createRepoShowDiffLinesHandler } from "../products/repo/tools/show-diff-lines.js";
import { createRepoShowActualHeadPipelineHandler } from "../products/repo/tools/show-actual-head-pipeline.js";
import { createRepoShowAverageEvaluationHandler } from "../products/repo/tools/show-average-evaluation.js";
import { createRepoShowBranchConflictHandler } from "../products/repo/tools/show-branch-conflict.js";
import { createRepoShowCommitDiffMetadataHandler } from "../products/repo/tools/show-commit-diff-metadata.js";
import { createRepoShowCommitFileDiffHandler } from "../products/repo/tools/show-commit-file-diff.js";
import { createRepoShowCommitCommentsByLineHandler } from "../products/repo/tools/show-commit-comments-by-line.js";
import { createRepoShowBranchFileHandler } from "../products/repo/tools/show-branch-file.js";
import { createRepoShowDiffCommitHandler } from "../products/repo/tools/show-diff-commit.js";
import { createRepoShowFileHandler } from "../products/repo/tools/show-file.js";
import { createRepoShowFileRawHandler } from "../products/repo/tools/show-file-raw.js";
import { createRepoShowLastPushEventInRepositoryHandler } from "../products/repo/tools/show-last-push-event-in-repository.js";
import { createRepoShowMergeableStateOuterHandler } from "../products/repo/tools/show-mergeable-state-outer.js";
import { createRepoShowMergeRequestDiscussionHandler } from "../products/repo/tools/show-merge-request-discussion.js";
import { createRepoShowMergeRequestCommentsByLineHandler } from "../products/repo/tools/show-merge-request-comments-by-line.js";
import { createRepoShowMergeRequestStatisticHandler } from "../products/repo/tools/show-merge-request-statistic.js";
import { createRepoShowMergeRequestVotesHandler } from "../products/repo/tools/show-merge-request-votes.js";
import { createRepoShowGroupGeneralPolicyHandler } from "../products/repo/tools/show-group-general-policy.js";
import { createRepoShowGroupHandler } from "../products/repo/tools/show-group.js";
import { createRepoShowGroupSettingsInheritCfgHandler } from "../products/repo/tools/show-group-settings-inherit-cfg.js";
import { createRepoShowGroupsGeneralPolicyHandler } from "../products/repo/tools/show-groups-general-policy.js";
import { createRepoShowGroupNoteRequiredAttributesHandler } from "../products/repo/tools/show-group-note-required-attributes.js";
import { createRepoShowNoteRequiredAttributesHandler } from "../products/repo/tools/show-note-required-attributes.js";
import { createRepoShowNotificationSubscriptionHandler } from "../products/repo/tools/show-notification-subscription.js";
import { createRepoShowNotificationSubscriptionsStatusHandler } from "../products/repo/tools/show-notification-subscriptions-status.js";
import { createRepoShowProjectReviewSettingsHandler } from "../products/repo/tools/show-project-review-settings.js";
import { createRepoShowReviewSettingHandler } from "../products/repo/tools/show-review-setting.js";
import { createRepoShowRepoLastStatisticsHandler } from "../products/repo/tools/show-repo-last-statistics.js";
import { createRepoShowRepoStatisticsSummaryHandler } from "../products/repo/tools/show-repo-statistics-summary.js";
import { createRepoShowRepositoryCommitLinesHandler } from "../products/repo/tools/show-repository-commit-lines.js";
import { createRepoShowRepositoryGeneralCommitRuleHandler } from "../products/repo/tools/show-repository-general-commit-rule.js";
import { createRepoShowRepositoryGeneralPolicyHandler } from "../products/repo/tools/show-repository-general-policy.js";
import { createRepoShowRepositoryInheritSettingHandler } from "../products/repo/tools/show-repository-inherit-setting.js";
import { createRepoShowRepositoryInheritSettingSourceHandler } from "../products/repo/tools/show-repository-inherit-setting-source.js";
import { createRepoShowRepositoryMasterHandler } from "../products/repo/tools/show-repository-master.js";
import { createRepoShowRepositoryStatusHandler } from "../products/repo/tools/show-repository-status.js";
import { createRepoShowRepositoryNavigationLanguageHandler } from "../products/repo/tools/show-repository-navigation-language.js";
import { createRepoShowRepositoryNavigationOutlineHandler } from "../products/repo/tools/show-repository-navigation-outline.js";
import { createRepoShowRepositoryNavigationSchemaHandler } from "../products/repo/tools/show-repository-navigation-schema.js";
import { createRepoShowRepositoryReadmeFileHandler } from "../products/repo/tools/show-repository-readme-file.js";
import { createRepoShowRepositoryStatisticDataHandler } from "../products/repo/tools/show-repository-statistic-data.js";
import { createRepoShowRepositoryStatisticsStatusHandler } from "../products/repo/tools/show-repository-statistics-status.js";
import { createRepoShowRepositoryStatisticsSummaryHandler } from "../products/repo/tools/show-repository-statistics-summary.js";
import { createRepoShowRepositoryWatermarkHandler } from "../products/repo/tools/show-repository-watermark.js";
import { createRepoCreateTagHandler } from "../products/repo/tools/create-tag.js";
import { createRepoDeleteTagHandler } from "../products/repo/tools/delete-tag.js";
import { createRepoAddRepositoryDeployKeyHandler } from "../products/repo/tools/add-repository-deploy-key.js";
import { createRepoRemoveRepositoryDeployKeyHandler } from "../products/repo/tools/remove-repository-deploy-key.js";
import { createRepoReviewMergeRequestHandler } from "../products/repo/tools/review-merge-request.js";
import { createRepoShowGroupE2eSettingHandler } from "../products/repo/tools/show-group-e2e-setting.js";
import { createRepoShowGroupApproverSettingsHandler } from "../products/repo/tools/show-group-approver-settings.js";
import { createRepoShowGroupInheritSettingHandler } from "../products/repo/tools/show-group-inherit-setting.js";
import { createRepoShowGroupMergeRequestSettingHandler } from "../products/repo/tools/show-group-merge-request-setting.js";
import { createRepoShowGroupReviewSettingsHandler } from "../products/repo/tools/show-group-review-settings.js";
import { createRepoShowGroupPermissionInheritEnabledHandler } from "../products/repo/tools/show-group-permission-inherit-enabled.js";
import { createRepoShowGroupWatermarkHandler } from "../products/repo/tools/show-group-watermark.js";
import { createRepoShowHttpsPasswordSettingHandler } from "../products/repo/tools/show-https-password-setting.js";
import { createRepoValidateHttpsInfoHandler } from "../products/repo/tools/validate-https-info.js";
import { createRepoShowProjectE2eSettingHandler } from "../products/repo/tools/show-project-e2e-setting.js";
import { createRepoShowProjectApproverSettingsHandler } from "../products/repo/tools/show-project-approver-settings.js";
import { createRepoShowProjectMergeRequestSettingHandler } from "../products/repo/tools/show-project-merge-request-setting.js";
import { createRepoShowTenantDevelopModeHandler } from "../products/repo/tools/show-tenant-develop-mode.js";
import { createRepoShowTenantRepoEncryptionSettingHandler } from "../products/repo/tools/show-tenant-repo-encryption-setting.js";
import { createRepoListTenantRepositoriesHandler } from "../products/repo/tools/list-tenant-repositories.js";
import { createRepoListTenantCMKsHandler } from "../products/repo/tools/list-tenant-cmks.js";
import { createRepoListTenantEncryptedRepositoriesHandler } from "../products/repo/tools/list-tenant-encrypted-repositories.js";
import { createRepoShowTenantKmsGrantHandler } from "../products/repo/tools/show-tenant-kms-grant.js";
import { createRepoShowProjectTenantSettingsHandler } from "../products/repo/tools/show-project-tenant-settings.js";
import { createRepoListTenantTrustedIpAddressesHandler } from "../products/repo/tools/list-tenant-trusted-ip-addresses.js";
import { createRepoListTrustedIpAddressesHandler } from "../products/repo/tools/list-trusted-ip-addresses.js";
import { createRepoListUserGpgKeysHandler } from "../products/repo/tools/list-user-gpg-keys.js";
import { createRepoListUserSshKeysHandler } from "../products/repo/tools/list-user-ssh-keys.js";
import { createRepoVerifyUserSshPrivateKeyHandler } from "../products/repo/tools/verify-user-ssh-private-key.js";
import { createRepoCreateUserSshKeyHandler } from "../products/repo/tools/create-user-ssh-key.js";
import { createRepoDeleteUserSshKeyHandler } from "../products/repo/tools/delete-user-ssh-key.js";
import { createRepoExportTenantRepositoriesHandler } from "../products/repo/tools/export-tenant-repositories.js";
import { createRepoUpdateTenantRepoEncryptionSettingHandler } from "../products/repo/tools/update-tenant-repo-encryption-setting.js";
import { createRepoCreateTenantKmsGrantHandler } from "../products/repo/tools/create-tenant-kms-grant.js";
import { createRepoAddTenantTrustedIpAddressHandler } from "../products/repo/tools/add-tenant-trusted-ip-address.js";
import { createRepoAddTrustedIpAddressHandler } from "../products/repo/tools/add-trusted-ip-address.js";
import { createRepoUpdateTenantTrustedIpAddressHandler } from "../products/repo/tools/update-tenant-trusted-ip-address.js";
import { createRepoUpdateTrustedIpAddressHandler } from "../products/repo/tools/update-trusted-ip-address.js";
import { createRepoDeleteTenantTrustedIpAddressHandler } from "../products/repo/tools/delete-tenant-trusted-ip-address.js";
import { createRepoDeleteTrustedIpAddressHandler } from "../products/repo/tools/delete-trusted-ip-address.js";
import { createRepoShowProjectGeneralPolicyHandler } from "../products/repo/tools/show-project-general-policy.js";
import { createRepoListProjectNoteRequiredAttributesHandler } from "../products/repo/tools/list-project-note-required-attributes.js";
import { createRepoShowProjectMemberSettingHandler } from "../products/repo/tools/show-project-member-setting.js";
import { createRepoShowProjectSettingsInheritCfgHandler } from "../products/repo/tools/show-project-settings-inherit-cfg.js";
import { createRepoShowProjectWatermarkHandler } from "../products/repo/tools/show-project-watermark.js";
import { createRepoShowProjectsGeneralPolicyHandler } from "../products/repo/tools/show-projects-general-policy.js";
import { createRepoShowRepositoryE2eSettingHandler } from "../products/repo/tools/show-repository-e2e-setting.js";
import { createRepoShowRepositoryApproverSettingsHandler } from "../products/repo/tools/show-repository-approver-settings.js";
import { createRepoShowRepositoryMergeRequestSettingHandler } from "../products/repo/tools/show-repository-merge-request-setting.js";
import { createRepoShowRepositoryPermissionInheritEnabledHandler } from "../products/repo/tools/show-repository-permission-inherit-enabled.js";
import { createRepoShowResourcePermissionsHandler } from "../products/repo/tools/show-resource-permissions.js";
import { createRepoShowUserRefPermissionHandler } from "../products/repo/tools/show-user-ref-permission.js";
import { createRepoStartRemoteMirrorSynchronizationHandler } from "../products/repo/tools/start-remote-mirror-synchronization.js";
import { createRepoStartHouseKeepingHandler } from "../products/repo/tools/start-house-keeping.js";
import { createRepoTransferRepositoryHandler } from "../products/repo/tools/transfer-repository.js";
import { createRepoRebuildRepositoryNavigationHandler } from "../products/repo/tools/rebuild-repository-navigation.js";
import { createRepoSyncDeployKeyToSubmodulesHandler } from "../products/repo/tools/sync-deploy-key-to-submodules.js";
import { createRepoUnlockRepositoryHandler } from "../products/repo/tools/unlock-repository.js";
import { createRepoExecuteRepositoryStatisticsHandler } from "../products/repo/tools/execute-repository-statistics.js";
import { createRepoDeleteRepositoryMemberHandler } from "../products/repo/tools/delete-repository-member.js";
import { createRepoValidateProjectRepositoryNameHandler } from "../products/repo/tools/validate-project-repository-name.js";
import { createRepoUpdateGroupResourcePermissionsHandler } from "../products/repo/tools/update-group-resource-permissions.js";
import { createRepoUpdateGroupGeneralPolicyHandler } from "../products/repo/tools/update-group-general-policy.js";
import { createRepoUpdateGroupNoteRequiredAttributesHandler } from "../products/repo/tools/update-group-note-required-attributes.js";
import { createRepoUpdateGroupReviewSettingsHandler } from "../products/repo/tools/update-group-review-settings.js";
import { createRepoUpdateGroupWatermarkHandler } from "../products/repo/tools/update-group-watermark.js";
import { createRepoUpdateHttpsPasswordSettingHandler } from "../products/repo/tools/update-https-password-setting.js";
import { createRepoUpdateBranchNameHandler } from "../products/repo/tools/update-branch-name.js";
import { createRepoUpdateFileHandler } from "../products/repo/tools/update-file.js";
import { createRepoRenameFileHandler } from "../products/repo/tools/rename-file.js";
import { createRepoUpdateNotificationSubscriptionHandler } from "../products/repo/tools/update-notification-subscription.js";
import { createRepoTransferGroupHandler } from "../products/repo/tools/transfer-group.js";
import { createRepoUpdateProjectGeneralPolicyHandler } from "../products/repo/tools/update-project-general-policy.js";
import { createRepoUpdateProjectNoteRequiredAttributesHandler } from "../products/repo/tools/update-project-note-required-attributes.js";
import { createRepoCreateProjectMergeRequestApproverSettingHandler } from "../products/repo/tools/create-project-merge-request-approver-setting.js";
import { createRepoUpdateProjectReviewSettingsHandler } from "../products/repo/tools/update-project-review-settings.js";
import { createRepoUpdateProjectMergeRequestApproverSettingHandler } from "../products/repo/tools/update-project-merge-request-approver-setting.js";
import { createRepoDeleteProjectMergeRequestApproverSettingHandler } from "../products/repo/tools/delete-project-merge-request-approver-setting.js";
import { createRepoCreateProjectMergeRequestTemplateHandler } from "../products/repo/tools/create-project-merge-request-template.js";
import { createRepoUpdateProjectMergeRequestTemplateHandler } from "../products/repo/tools/update-project-merge-request-template.js";
import { createRepoDeleteProjectMergeRequestTemplateHandler } from "../products/repo/tools/delete-project-merge-request-template.js";
import { createRepoUpdateProjectSettingsInheritCfgHandler } from "../products/repo/tools/update-project-settings-inherit-cfg.js";
import { createRepoUpdateProjectWatermarkHandler } from "../products/repo/tools/update-project-watermark.js";
import { createRepoCreateMergeRequestApproverSettingHandler } from "../products/repo/tools/create-merge-request-approver-setting.js";
import { createRepoUpdateMergeRequestApproverSettingHandler } from "../products/repo/tools/update-merge-request-approver-setting.js";
import { createRepoDeleteMergeRequestApproverSettingHandler } from "../products/repo/tools/delete-merge-request-approver-setting.js";
import { createRepoUpdateMergeRequestDiscussionInfoHandler } from "../products/repo/tools/update-merge-request-discussion-info.js";
import { createRepoUpdateMergeRequestDiscussionHandler } from "../products/repo/tools/update-merge-request-discussion.js";
import { createRepoUpdateMergeRequestSettingHandler } from "../products/repo/tools/update-merge-request-setting.js";
import { createRepoUpdateMergeRequestApproversHandler } from "../products/repo/tools/update-merge-request-approvers.js";
import { createRepoUpdateMergeRequestReviewersHandler } from "../products/repo/tools/update-merge-request-reviewers.js";
import { createRepoCreateMergeRequestTemplateHandler } from "../products/repo/tools/create-merge-request-template.js";
import { createRepoUpdateMergeRequestTemplateHandler } from "../products/repo/tools/update-merge-request-template.js";
import { createRepoDeleteMergeRequestTemplateHandler } from "../products/repo/tools/delete-merge-request-template.js";
import { createRepoUpdateRepositoryGeneralPolicyHandler } from "../products/repo/tools/update-repository-general-policy.js";
import { createRepoUpdateRepositoryGeneralCommitRuleHandler } from "../products/repo/tools/update-repository-general-commit-rule.js";
import { createRepoUpdateNoteRequiredAttributesHandler } from "../products/repo/tools/update-note-required-attributes.js";
import { createRepoUpdateRepositoryCommitRuleHandler } from "../products/repo/tools/update-repository-commit-rule.js";
import { createRepoUpdateRepositoryInheritSettingHandler } from "../products/repo/tools/update-repository-inherit-setting.js";
import { createRepoUpdateRepositoryPipelineHandler } from "../products/repo/tools/update-repository-pipeline.js";
import { createRepoUpdateRepositoryTemplateStatusHandler } from "../products/repo/tools/update-repository-template-status.js";
import { createRepoUpdateRepositoryWatermarkHandler } from "../products/repo/tools/update-repository-watermark.js";
import { createRepoUpdateRepositoryLabelHandler } from "../products/repo/tools/update-repository-label.js";
import { createRepoUpdateProjectWebhookHandler } from "../products/repo/tools/update-project-webhook.js";
import { createRepoCreateGroupMergeRequestApproverSettingHandler } from "../products/repo/tools/create-group-merge-request-approver-setting.js";
import { createRepoUpdateGroupMergeRequestApproverSettingHandler } from "../products/repo/tools/update-group-merge-request-approver-setting.js";
import { createRepoDeleteGroupMergeRequestApproverSettingHandler } from "../products/repo/tools/delete-group-merge-request-approver-setting.js";
import { createRepoCreateGroupMergeRequestTemplateHandler } from "../products/repo/tools/create-group-merge-request-template.js";
import { createRepoUpdateGroupMergeRequestTemplateHandler } from "../products/repo/tools/update-group-merge-request-template.js";
import { createRepoDeleteGroupMergeRequestTemplateHandler } from "../products/repo/tools/delete-group-merge-request-template.js";
import { createRepoUpdateGroupWebhookHandler } from "../products/repo/tools/update-group-webhook.js";
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
import { createRepoUpdateMergeRequestVoteHandler } from "../products/repo/tools/update-merge-request-vote.js";
import { createRepoDeleteMergeRequestVoteHandler } from "../products/repo/tools/delete-merge-request-vote.js";
import { createRepoDeleteMergeRequestDiscussionHandler } from "../products/repo/tools/delete-merge-request-discussion.js";
import { createRepoUpdateMergeRequestHandler } from "../products/repo/tools/update-merge-request.js";
import { createRepoListProjectMergeRequestsHandler } from "../products/repo/tools/list-project-merge-requests.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type RepoStdioClient = ReturnType<typeof createRepoClient>;

const repoToolDefinitions = {
  "repo_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Repo API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { repoClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.repoClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "repo_batch_validate_repo_names": defineProductTool({ description: "Batch validate CodeArts Repo repository names through the official BatchValidateRepoNames endpoint", inputSchema: repoBatchValidateRepoNamesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchValidateRepoNamesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchValidateRepoNamesHandler }),
  "repo_batch_validate_user_group_permissions": defineProductTool({ description: "Batch validate CodeArts Repo user group permissions through the official BatchValidateUserGroupPermissions endpoint", inputSchema: repoBatchValidateUserGroupPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchValidateUserGroupPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchValidateUserGroupPermissionsHandler }),
  "repo_download_archive": defineProductTool({ description: "Download a CodeArts Repo repository archive through the official DownloadArchive endpoint", inputSchema: repoDownloadArchiveInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDownloadArchiveHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDownloadArchiveHandler }),
  "repo_batch_delete_branch": defineProductTool({ description: "Batch delete CodeArts Repo branches through the official BatchDeleteBranch endpoint", inputSchema: repoBatchDeleteBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchDeleteBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchDeleteBranchHandler }),
  "repo_associate_repository_user_group": defineProductTool({ description: "Associate a CodeArts Repo repository with a user group through the official AssociateRepositoryUserGroup endpoint", inputSchema: repoAssociateRepositoryUserGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateRepositoryUserGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateRepositoryUserGroupHandler }),
  "repo_list_repositories": defineProductTool({ description: "List CodeArts Repo repositories", inputSchema: repoListRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoriesHandler }),
  "repo_list_project_repositories": defineProductTool({ description: "List CodeArts Repo project repositories through the official ListProjectRepositories endpoint", inputSchema: repoListProjectRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectRepositoriesHandler }),
  "repo_get_repository_id_by_name": defineProductTool({ description: "Get CodeArts Repo repository id by group and repository name through the official GetRepositoryIdByName endpoint", inputSchema: repoGetRepositoryIdByNameInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryIdByNameHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryIdByNameHandler }),
  "repo_get_repository": defineProductTool({ description: "Get CodeArts Repo repository detail", inputSchema: repoGetRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryHandler }),
  "repo_show_repository": defineProductTool({ description: "Show CodeArts Repo repository detail through the official ShowRepository endpoint", inputSchema: repoGetRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryHandler }),
  "repo_create_repository": defineProductTool({ description: "Create CodeArts Repo repository", inputSchema: repoCreateRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryHandler }),
  "repo_fork_repository": defineProductTool({ description: "Fork a CodeArts Repo repository through the official ForkRepository endpoint", inputSchema: repoForkRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoForkRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoForkRepositoryHandler }),
  "repo_import_repository": defineProductTool({ description: "Import external Git repository into CodeArts Repo", inputSchema: repoImportRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoImportRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoImportRepositoryHandler }),
  "repo_list_impersonation_tokens": defineProductTool({ description: "List CodeArts Repo personal access token metadata", inputSchema: repoListImpersonationTokensInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListImpersonationTokensHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListImpersonationTokensHandler }),
  "repo_list_personal_repository_import_records": defineProductTool({ description: "List personal CodeArts Repo repository import records", inputSchema: repoListPersonalRepositoryImportRecordsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPersonalRepositoryImportRecordsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPersonalRepositoryImportRecordsHandler }),
  "repo_list_current_user_repositories": defineProductTool({ description: "List CodeArts Repo repositories visible to the current user", inputSchema: repoListCurrentUserRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCurrentUserRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCurrentUserRepositoriesHandler }),
  "repo_list_groups": defineProductTool({ description: "List CodeArts Repo groups visible to the current user", inputSchema: repoListGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupsHandler }),
  "repo_create_group": defineProductTool({ description: "Create a CodeArts Repo group through the official CreateGroup endpoint", inputSchema: repoCreateGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateGroupHandler }),
  "repo_list_manageable_groups": defineProductTool({ description: "List CodeArts Repo manageable groups for a project", inputSchema: repoListManageableGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListManageableGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListManageableGroupsHandler }),
  "repo_show_group": defineProductTool({ description: "Show a CodeArts Repo group through the official ShowGroup endpoint", inputSchema: repoShowGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupHandler }),
  "repo_delete_group": defineProductTool({ description: "Delete a CodeArts Repo group through the official DeleteGroup endpoint", inputSchema: repoDeleteGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteGroupHandler }),
  "repo_delete_repository": defineProductTool({ description: "Delete a CodeArts Repo repository through the official DeleteRepository endpoint", inputSchema: repoDeleteRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryHandler }),
  "repo_transfer_group": defineProductTool({ description: "Transfer a CodeArts Repo group through the official TransferGroup endpoint", inputSchema: repoTransferGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoTransferGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoTransferGroupHandler }),
  "repo_transfer_repository": defineProductTool({ description: "Transfer a CodeArts Repo repository through the official TransferRepository endpoint", inputSchema: repoTransferRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoTransferRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoTransferRepositoryHandler }),
  "repo_list_group_permission_resources": defineProductTool({ description: "List CodeArts Repo group permission resources through the official ListGroupPermissionResources endpoint", inputSchema: repoListGroupPermissionResourcesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupPermissionResourcesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupPermissionResourcesHandler }),
  "repo_list_group_repositories": defineProductTool({ description: "List CodeArts Repo repositories in a group", inputSchema: repoListGroupRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupRepositoriesHandler }),
  "repo_list_group_members": defineProductTool({ description: "List CodeArts Repo group members", inputSchema: repoListGroupMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupMembersHandler }),
  "repo_list_members": defineProductTool({ description: "List CodeArts Repo repository members through the official ListMembers endpoint", inputSchema: repoListMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMembersHandler }),
  "repo_list_group_addable_members": defineProductTool({ description: "List CodeArts Repo members addable to a group", inputSchema: repoListGroupAddableMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupAddableMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupAddableMembersHandler }),
  "repo_list_group_user_groups": defineProductTool({ description: "List CodeArts Repo group user groups", inputSchema: repoListGroupUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupUserGroupsHandler }),
  "repo_list_group_addable_user_groups": defineProductTool({ description: "List CodeArts Repo user groups addable to a group", inputSchema: repoListGroupAddableUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupAddableUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupAddableUserGroupsHandler }),
  "repo_list_group_subgroups_and_repositories": defineProductTool({ description: "List CodeArts Repo subgroups and repositories in a group", inputSchema: repoListGroupSubgroupsAndRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupSubgroupsAndRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupSubgroupsAndRepositoriesHandler }),
  "repo_associate_group_user_group": defineProductTool({ description: "Associate a CodeArts Repo user group to a group through the official AssociateGroupUserGroup endpoint", inputSchema: repoAssociateGroupUserGroupInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateGroupUserGroupHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateGroupUserGroupHandler }),
  "repo_show_group_inherit_setting": defineProductTool({ description: "Show CodeArts Repo group inherit setting", inputSchema: repoShowGroupInheritSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupInheritSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupInheritSettingHandler }),
  "repo_show_groups_inherit": defineProductTool({ description: "Show CodeArts Repo groups inherit through the official ShowGroupsInherit endpoint", inputSchema: repoShowGroupInheritSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupInheritSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupInheritSettingHandler }),
  "repo_show_group_settings_inherit_cfg": defineProductTool({ description: "Show CodeArts Repo group settings inherit configuration through the official ShowGroupSettingsInheritCfg endpoint", inputSchema: repoShowGroupSettingsInheritCfgInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupSettingsInheritCfgHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupSettingsInheritCfgHandler }),
  "repo_show_groups_general_policy": defineProductTool({ description: "Show CodeArts Repo groups general policy through the official ShowGroupsGeneralPolicy endpoint", inputSchema: repoShowGroupsGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupsGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupsGeneralPolicyHandler }),
  "repo_show_repository_merge_request_setting": defineProductTool({ description: "Show CodeArts Repo repository merge request setting", inputSchema: repoShowRepositoryMergeRequestSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryMergeRequestSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryMergeRequestSettingHandler }),
  "repo_show_merge_request_setting": defineProductTool({ description: "Show CodeArts Repo repository merge request setting through the official ShowMergeRequestSetting endpoint", inputSchema: repoShowRepositoryMergeRequestSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryMergeRequestSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryMergeRequestSettingHandler }),
  "repo_show_group_merge_request_setting": defineProductTool({ description: "Show CodeArts Repo group merge request setting", inputSchema: repoShowGroupMergeRequestSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupMergeRequestSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupMergeRequestSettingHandler }),
  "repo_show_project_merge_request_setting": defineProductTool({ description: "Show CodeArts Repo project merge request setting", inputSchema: repoShowProjectMergeRequestSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectMergeRequestSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectMergeRequestSettingHandler }),
  "repo_show_repository_approver_settings": defineProductTool({ description: "Show CodeArts Repo repository approver settings", inputSchema: repoShowRepositoryApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryApproverSettingsHandler }),
  "repo_list_merge_request_approver_settings": defineProductTool({ description: "List CodeArts Repo repository approver settings through the official ListMergeRequestApproverSettings endpoint", inputSchema: repoShowRepositoryApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryApproverSettingsHandler }),
  "repo_show_group_approver_settings": defineProductTool({ description: "Show CodeArts Repo group approver settings", inputSchema: repoShowGroupApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupApproverSettingsHandler }),
  "repo_list_group_merge_request_approver_settings": defineProductTool({ description: "List CodeArts Repo group approver settings through the official ListGroupMergeRequestApproverSettings endpoint", inputSchema: repoListGroupMergeRequestApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupApproverSettingsHandler }),
  "repo_show_group_review_settings": defineProductTool({ description: "Show CodeArts Repo group review settings through the official ShowGroupReviewSettings endpoint", inputSchema: repoShowGroupReviewSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupReviewSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupReviewSettingsHandler }),
  "repo_update_group_review_settings": defineProductTool({ description: "Create or update CodeArts Repo group review settings through the official UpdateGroupReviewSettings endpoint", inputSchema: repoUpdateGroupReviewSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupReviewSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupReviewSettingsHandler }),
  "repo_show_project_approver_settings": defineProductTool({ description: "Show CodeArts Repo project approver settings", inputSchema: repoShowProjectApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectApproverSettingsHandler }),
  "repo_list_project_merge_request_approver_settings": defineProductTool({ description: "List CodeArts Repo project approver settings through the official ListProjectMergeRequestApproverSettings endpoint", inputSchema: repoListProjectMergeRequestApproverSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectApproverSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectApproverSettingsHandler }),
  "repo_show_project_review_settings": defineProductTool({ description: "Show CodeArts Repo project review settings through the official ShowProjectReviewSettings endpoint", inputSchema: repoShowProjectReviewSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectReviewSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectReviewSettingsHandler }),
  "repo_update_project_review_settings": defineProductTool({ description: "Create or update CodeArts Repo project review settings through the official UpdateProjectReviewSettings endpoint", inputSchema: repoUpdateProjectReviewSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectReviewSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectReviewSettingsHandler }),
  "repo_list_merge_request_templates": defineProductTool({ description: "List CodeArts Repo merge request templates", inputSchema: repoListMergeRequestTemplatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestTemplatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestTemplatesHandler }),
  "repo_create_merge_request_approver_setting": defineProductTool({ description: "Create a CodeArts Repo merge request approver setting", inputSchema: repoCreateMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestApproverSettingHandler }),
  "repo_update_merge_request_approver_setting": defineProductTool({ description: "Update a CodeArts Repo merge request approver setting", inputSchema: repoUpdateMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestApproverSettingHandler }),
  "repo_delete_merge_request_approver_setting": defineProductTool({ description: "Delete a CodeArts Repo merge request approver setting", inputSchema: repoDeleteMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteMergeRequestApproverSettingHandler }),
  "repo_create_group_merge_request_approver_setting": defineProductTool({ description: "Create a CodeArts Repo group merge request approver setting", inputSchema: repoCreateGroupMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateGroupMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateGroupMergeRequestApproverSettingHandler }),
  "repo_update_group_merge_request_approver_setting": defineProductTool({ description: "Update a CodeArts Repo group merge request approver setting", inputSchema: repoUpdateGroupMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupMergeRequestApproverSettingHandler }),
  "repo_delete_group_merge_request_approver_setting": defineProductTool({ description: "Delete a CodeArts Repo group merge request approver setting", inputSchema: repoDeleteGroupMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteGroupMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteGroupMergeRequestApproverSettingHandler }),
  "repo_create_project_merge_request_approver_setting": defineProductTool({ description: "Create a CodeArts Repo project merge request approver setting", inputSchema: repoCreateProjectMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectMergeRequestApproverSettingHandler }),
  "repo_update_project_merge_request_approver_setting": defineProductTool({ description: "Update a CodeArts Repo project merge request approver setting", inputSchema: repoUpdateProjectMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectMergeRequestApproverSettingHandler }),
  "repo_delete_project_merge_request_approver_setting": defineProductTool({ description: "Delete a CodeArts Repo project merge request approver setting", inputSchema: repoDeleteProjectMergeRequestApproverSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProjectMergeRequestApproverSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProjectMergeRequestApproverSettingHandler }),
  "repo_update_merge_request_setting": defineProductTool({ description: "Update CodeArts Repo repository merge request setting", inputSchema: repoUpdateMergeRequestSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestSettingHandler }),
  "repo_list_discussion_templates": defineProductTool({ description: "List CodeArts Repo discussion templates", inputSchema: repoListDiscussionTemplatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListDiscussionTemplatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListDiscussionTemplatesHandler }),
  "repo_get_merge_request_template": defineProductTool({ description: "Get CodeArts Repo merge request template", inputSchema: repoGetMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestTemplateHandler }),
  "repo_show_merge_request_template": defineProductTool({ description: "Show CodeArts Repo merge request template through the official ShowMergeRequestTemplate endpoint", inputSchema: repoGetMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestTemplateHandler }),
  "repo_create_merge_request_template": defineProductTool({ description: "Create a CodeArts Repo merge request template", inputSchema: repoCreateMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestTemplateHandler }),
  "repo_update_merge_request_template": defineProductTool({ description: "Update a CodeArts Repo merge request template", inputSchema: repoUpdateMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestTemplateHandler }),
  "repo_delete_merge_request_template": defineProductTool({ description: "Delete a CodeArts Repo merge request template", inputSchema: repoDeleteMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteMergeRequestTemplateHandler }),
  "repo_list_group_merge_request_templates": defineProductTool({ description: "List CodeArts Repo group merge request templates", inputSchema: repoListGroupMergeRequestTemplatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupMergeRequestTemplatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupMergeRequestTemplatesHandler }),
  "repo_create_group_merge_request_template": defineProductTool({ description: "Create a CodeArts Repo group merge request template", inputSchema: repoCreateGroupMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateGroupMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateGroupMergeRequestTemplateHandler }),
  "repo_update_group_merge_request_template": defineProductTool({ description: "Update a CodeArts Repo group merge request template", inputSchema: repoUpdateGroupMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupMergeRequestTemplateHandler }),
  "repo_delete_group_merge_request_template": defineProductTool({ description: "Delete a CodeArts Repo group merge request template", inputSchema: repoDeleteGroupMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteGroupMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteGroupMergeRequestTemplateHandler }),
  "repo_list_project_merge_request_templates": defineProductTool({ description: "List CodeArts Repo project merge request templates", inputSchema: repoListProjectMergeRequestTemplatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectMergeRequestTemplatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectMergeRequestTemplatesHandler }),
  "repo_create_project_merge_request_template": defineProductTool({ description: "Create a CodeArts Repo project merge request template", inputSchema: repoCreateProjectMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectMergeRequestTemplateHandler }),
  "repo_update_project_merge_request_template": defineProductTool({ description: "Update a CodeArts Repo project merge request template", inputSchema: repoUpdateProjectMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectMergeRequestTemplateHandler }),
  "repo_delete_project_merge_request_template": defineProductTool({ description: "Delete a CodeArts Repo project merge request template", inputSchema: repoDeleteProjectMergeRequestTemplateInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProjectMergeRequestTemplateHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProjectMergeRequestTemplateHandler }),
  "repo_associate_remote_mirror": defineProductTool({ description: "Associate CodeArts Repo remote mirror", inputSchema: repoAssociateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateRemoteMirrorHandler }),
  "repo_start_remote_mirror_synchronization": defineProductTool({ description: "Start CodeArts Repo remote mirror synchronization", inputSchema: repoStartRemoteMirrorSynchronizationInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoStartRemoteMirrorSynchronizationHandler>[0] }) => clients.repoClient, createProductHandler: createRepoStartRemoteMirrorSynchronizationHandler }),
  "repo_get_remote_mirror": defineProductTool({ description: "Get CodeArts Repo remote mirror detail", inputSchema: repoGetRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRemoteMirrorHandler }),
  "repo_show_remote_mirror": defineProductTool({ description: "Show CodeArts Repo remote mirror detail through the official ShowRemoteMirror endpoint", inputSchema: repoGetRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRemoteMirrorHandler }),
  "repo_update_remote_mirror": defineProductTool({ description: "Update CodeArts Repo remote mirror", inputSchema: repoUpdateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRemoteMirrorHandler }),
  "repo_update_repository_remote_mirror": defineProductTool({ description: "Update CodeArts Repo repository remote mirror through the official UpdateRepositoryRemoteMirror endpoint", inputSchema: repoUpdateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRemoteMirrorHandler }),
  "repo_list_repository_deploy_keys": defineProductTool({ description: "List CodeArts Repo repository deploy keys", inputSchema: repoListRepositoryDeployKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryDeployKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryDeployKeysHandler }),
  "repo_list_group_deploy_keys": defineProductTool({ description: "List CodeArts Repo group deploy keys", inputSchema: repoListGroupDeployKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupDeployKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupDeployKeysHandler }),
  "repo_list_project_deploy_keys": defineProductTool({ description: "List CodeArts Repo project deploy keys", inputSchema: repoListProjectDeployKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectDeployKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectDeployKeysHandler }),
  "repo_list_repository_file_push_permissions": defineProductTool({ description: "List CodeArts Repo repository file push permissions", inputSchema: repoListRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryFilePushPermissionsHandler }),
  "repo_create_file_push_permission": defineProductTool({ description: "Create CodeArts Repo repository file push permission", inputSchema: repoCreateFilePushPermissionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateFilePushPermissionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateFilePushPermissionHandler }),
  "repo_batch_update_repository_file_push_permissions": defineProductTool({ description: "Batch update CodeArts Repo repository file push permissions", inputSchema: repoBatchUpdateRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateRepositoryFilePushPermissionsHandler }),
  "repo_batch_delete_repository_file_push_permissions": defineProductTool({ description: "Batch delete CodeArts Repo repository file push permissions", inputSchema: repoBatchDeleteRepositoryFilePushPermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchDeleteRepositoryFilePushPermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchDeleteRepositoryFilePushPermissionsHandler }),
  "repo_show_group_watermark": defineProductTool({ description: "Show CodeArts Repo group watermark setting", inputSchema: repoShowGroupWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupWatermarkHandler }),
  "repo_show_https_password_setting": defineProductTool({ description: "Show CodeArts Repo HTTPS password setting through the official ShowHttpsPasswordSetting endpoint", inputSchema: repoShowHttpsPasswordSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowHttpsPasswordSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowHttpsPasswordSettingHandler }),
  "repo_validate_https_info": defineProductTool({ description: "Validate CodeArts Repo HTTPS credentials through the official ValidateHttpsInfo endpoint", inputSchema: repoValidateHttpsInfoInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoValidateHttpsInfoHandler>[0] }) => clients.repoClient, createProductHandler: createRepoValidateHttpsInfoHandler }),
  "repo_update_group_watermark": defineProductTool({ description: "Update CodeArts Repo group watermark setting through the official UpdateGroupWatermark endpoint", inputSchema: repoUpdateGroupWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupWatermarkHandler }),
  "repo_update_https_password_setting": defineProductTool({ description: "Update CodeArts Repo HTTPS password setting through the official UpdateHttpsPasswordSetting endpoint", inputSchema: repoUpdateHttpsPasswordSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateHttpsPasswordSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateHttpsPasswordSettingHandler }),
  "repo_show_project_watermark": defineProductTool({ description: "Show CodeArts Repo project watermark setting", inputSchema: repoShowProjectWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectWatermarkHandler }),
  "repo_update_project_watermark": defineProductTool({ description: "Update CodeArts Repo project watermark setting", inputSchema: repoUpdateProjectWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectWatermarkHandler }),
  "repo_update_repository_watermark": defineProductTool({ description: "Update CodeArts Repo repository watermark setting through the official UpdateRepositoryWatermark endpoint", inputSchema: repoUpdateRepositoryWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryWatermarkHandler }),
  "repo_update_repository_template_status": defineProductTool({ description: "Update CodeArts Repo repository template status through the official UpdateRepositoryTemplateStatus endpoint", inputSchema: repoUpdateRepositoryTemplateStatusInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryTemplateStatusHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryTemplateStatusHandler }),
  "repo_update_repository_pipeline": defineProductTool({ description: "Update a CodeArts Repo repository pipeline state through the official UpdateRepositoryPipeline endpoint", inputSchema: repoUpdateRepositoryPipelineInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryPipelineHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryPipelineHandler }),
  "repo_list_project_subgroups_and_repositories": defineProductTool({ description: "List CodeArts Repo project subgroups and repositories", inputSchema: repoListProjectSubgroupsAndRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectSubgroupsAndRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectSubgroupsAndRepositoriesHandler }),
  "repo_list_repository_resource_permissions": defineProductTool({ description: "List CodeArts Repo repository resource permission matrix", inputSchema: repoListRepositoryResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryResourcePermissionsHandler }),
  "repo_update_repository_resource_permissions": defineProductTool({ description: "Update CodeArts Repo repository resource permission matrix", inputSchema: repoUpdateRepositoryResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryResourcePermissionsHandler }),
  "repo_update_group_resource_permissions": defineProductTool({ description: "Update CodeArts Repo group resource permission matrix", inputSchema: repoUpdateGroupResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupResourcePermissionsHandler }),
  "repo_update_group_general_policy": defineProductTool({ description: "Update CodeArts Repo group general policy through the official UpdateGroupGeneralPolicy endpoint", inputSchema: repoUpdateGroupGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupGeneralPolicyHandler }),
  "repo_show_resource_permissions": defineProductTool({ description: "Show CodeArts Repo group resource permission matrix", inputSchema: repoShowResourcePermissionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowResourcePermissionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowResourcePermissionsHandler }),
  "repo_update_repository_permission_inherit_enabled": defineProductTool({ description: "Update CodeArts Repo repository permission inherit setting", inputSchema: repoUpdateRepositoryPermissionInheritEnabledInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryPermissionInheritEnabledHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryPermissionInheritEnabledHandler }),
  "repo_show_repository_permission_inherit_enabled": defineProductTool({ description: "Show CodeArts Repo repository permission inherit setting", inputSchema: repoShowRepositoryPermissionInheritEnabledInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryPermissionInheritEnabledHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryPermissionInheritEnabledHandler }),
  "repo_show_group_permission_inherit_enabled": defineProductTool({ description: "Show CodeArts Repo group permission inherit setting", inputSchema: repoShowGroupPermissionInheritEnabledInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupPermissionInheritEnabledHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupPermissionInheritEnabledHandler }),
  "repo_show_project_settings_inherit_cfg": defineProductTool({ description: "Show CodeArts Repo project inheritance settings", inputSchema: repoShowProjectSettingsInheritCfgInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectSettingsInheritCfgHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectSettingsInheritCfgHandler }),
  "repo_update_project_settings_inherit_cfg": defineProductTool({ description: "Update CodeArts Repo project inheritance settings", inputSchema: repoUpdateProjectSettingsInheritCfgInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectSettingsInheritCfgHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectSettingsInheritCfgHandler }),
  "repo_show_project_member_setting": defineProductTool({ description: "Show CodeArts Repo project member synchronization setting", inputSchema: repoShowProjectMemberSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectMemberSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectMemberSettingHandler }),
  "repo_show_project_general_policy": defineProductTool({ description: "Show CodeArts Repo project general policy from policies/general", inputSchema: repoShowProjectGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectGeneralPolicyHandler }),
  "repo_show_projects_general_policy": defineProductTool({ description: "Show CodeArts Repo project general policy from general-policy", inputSchema: repoShowProjectsGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectsGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectsGeneralPolicyHandler }),
  "repo_update_project_general_policy": defineProductTool({ description: "Update CodeArts Repo project general policy", inputSchema: repoUpdateProjectGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectGeneralPolicyHandler }),
  "repo_list_item_commits": defineProductTool({ description: "List CodeArts Repo project item commits", inputSchema: repoListItemCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListItemCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListItemCommitsHandler }),
  "repo_check_repository_deploy_key": defineProductTool({ description: "Check whether a CodeArts Repo repository deploy key already exists upstream", inputSchema: repoCheckRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCheckRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCheckRepositoryDeployKeyHandler }),
  "repo_check_group_deploy_key": defineProductTool({ description: "Check whether a CodeArts Repo group deploy key already exists upstream", inputSchema: repoCheckGroupDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCheckGroupDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCheckGroupDeployKeyHandler }),
  "repo_add_repository_deploy_key": defineProductTool({ description: "Add a CodeArts Repo repository deploy key", inputSchema: repoAddRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAddRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAddRepositoryDeployKeyHandler }),
  "repo_lock_repository": defineProductTool({ description: "Lock a CodeArts Repo repository", inputSchema: repoLockRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoLockRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoLockRepositoryHandler }),
  "repo_unlock_repository": defineProductTool({ description: "Unlock a CodeArts Repo repository", inputSchema: repoUnlockRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUnlockRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUnlockRepositoryHandler }),
  "repo_remove_repository_deploy_key": defineProductTool({ description: "Remove a CodeArts Repo repository deploy key", inputSchema: repoRemoveRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRemoveRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRemoveRepositoryDeployKeyHandler }),
  "repo_remove_deploy_key_from_submodules": defineProductTool({ description: "Remove a CodeArts Repo deploy key from all submodules", inputSchema: repoRemoveDeployKeyFromSubmodulesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRemoveDeployKeyFromSubmodulesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRemoveDeployKeyFromSubmodulesHandler }),
  "repo_remove_deploy_key": defineProductTool({ description: "Remove a CodeArts Repo deploy key through the official RemoveDeployKey endpoint", inputSchema: repoRemoveRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRemoveRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRemoveRepositoryDeployKeyHandler }),
  "repo_check_deploy_key": defineProductTool({ description: "Check a CodeArts Repo deploy key through the official CheckDeployKey endpoint", inputSchema: repoCheckRepositoryDeployKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCheckRepositoryDeployKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCheckRepositoryDeployKeyHandler }),
  "repo_associate_branch_work_items": defineProductTool({ description: "Associate CodeArts Repo branch with work items", inputSchema: repoAssociateBranchWorkItemsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateBranchWorkItemsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateBranchWorkItemsHandler }),
  "repo_list_branch_related_work_items": defineProductTool({ description: "List CodeArts Repo branch related work items", inputSchema: repoListBranchRelatedWorkItemsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListBranchRelatedWorkItemsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListBranchRelatedWorkItemsHandler }),
  "repo_list_repository_work_items": defineProductTool({ description: "List CodeArts Repo repository work items", inputSchema: repoListRepositoryWorkItemsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryWorkItemsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryWorkItemsHandler }),
  "repo_show_repository_e2e_setting": defineProductTool({ description: "Show CodeArts Repo repository E2E setting", inputSchema: repoShowRepositoryE2eSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryE2eSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryE2eSettingHandler }),
  "repo_show_group_e2e_setting": defineProductTool({ description: "Show CodeArts Repo group E2E setting", inputSchema: repoShowGroupE2eSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupE2eSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupE2eSettingHandler }),
  "repo_show_project_e2e_setting": defineProductTool({ description: "Show CodeArts Repo project E2E setting", inputSchema: repoShowProjectE2eSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectE2eSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectE2eSettingHandler }),
  "repo_list_tenant_repositories": defineProductTool({ description: "List CodeArts Repo tenant repositories", inputSchema: repoListTenantRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTenantRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTenantRepositoriesHandler }),
  "repo_show_tenant_develop_mode": defineProductTool({ description: "Show CodeArts Repo tenant develop mode status", inputSchema: repoShowTenantDevelopModeInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowTenantDevelopModeHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowTenantDevelopModeHandler }),
  "repo_show_tenant_repo_encryption_setting": defineProductTool({ description: "Show CodeArts Repo tenant repo encryption setting", inputSchema: repoShowTenantRepoEncryptionSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowTenantRepoEncryptionSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowTenantRepoEncryptionSettingHandler }),
  "repo_list_tenant_cmks": defineProductTool({ description: "List CodeArts Repo tenant KMS CMKs", inputSchema: repoListTenantCMKsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTenantCMKsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTenantCMKsHandler }),
  "repo_list_tenant_encrypted_repositories": defineProductTool({ description: "List CodeArts Repo tenant encrypted repositories", inputSchema: repoListTenantEncryptedRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTenantEncryptedRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTenantEncryptedRepositoriesHandler }),
  "repo_show_tenant_kms_grant": defineProductTool({ description: "Show CodeArts Repo tenant KMS grant status", inputSchema: repoShowTenantKMSGrantInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowTenantKmsGrantHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowTenantKmsGrantHandler }),
  "repo_show_project_tenant_settings": defineProductTool({ description: "Show CodeArts Repo tenant settings", inputSchema: repoShowProjectTenantSettingsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowProjectTenantSettingsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowProjectTenantSettingsHandler }),
  "repo_list_tenant_trusted_ip_addresses": defineProductTool({ description: "List CodeArts Repo tenant trusted IP addresses", inputSchema: repoListTenantTrustedIpAddressesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTenantTrustedIpAddressesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTenantTrustedIpAddressesHandler }),
  "repo_list_trusted_ip_addresses": defineProductTool({ description: "List CodeArts Repo trusted IP addresses through the official ListTrustedIpAddresses endpoint", inputSchema: repoListTrustedIpAddressesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTrustedIpAddressesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTrustedIpAddressesHandler }),
  "repo_list_user_gpg_keys": defineProductTool({ description: "List CodeArts Repo current user GPG keys", inputSchema: repoListUserGpgKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListUserGpgKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListUserGpgKeysHandler }),
  "repo_list_user_ssh_keys": defineProductTool({ description: "List CodeArts Repo current user SSH keys", inputSchema: repoListUserSshKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListUserSshKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListUserSshKeysHandler }),
  "repo_list_user_keys": defineProductTool({ description: "List CodeArts Repo current user SSH keys through the official ListUserKeys endpoint", inputSchema: repoListUserSshKeysInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListUserSshKeysHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListUserSshKeysHandler }),
  "repo_verify_user_ssh_private_key": defineProductTool({ description: "Verify a CodeArts Repo current user SSH private key through the official VerifyUserSshPrivateKey endpoint", inputSchema: repoVerifyUserSshPrivateKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoVerifyUserSshPrivateKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoVerifyUserSshPrivateKeyHandler }),
  "repo_create_user_ssh_key": defineProductTool({ description: "Create CodeArts Repo current user SSH key", inputSchema: repoCreateUserSshKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateUserSshKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateUserSshKeyHandler }),
  "repo_add_ssh_key": defineProductTool({ description: "Add a CodeArts Repo SSH key through the official AddSshKey endpoint", inputSchema: repoCreateUserSshKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateUserSshKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateUserSshKeyHandler }),
  "repo_delete_user_ssh_key": defineProductTool({ description: "Delete CodeArts Repo current user SSH key", inputSchema: repoDeleteUserSshKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteUserSshKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteUserSshKeyHandler }),
  "repo_delete_ssh_key": defineProductTool({ description: "Delete a CodeArts Repo SSH key through the official DeleteSshKey endpoint", inputSchema: repoDeleteUserSshKeyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteUserSshKeyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteUserSshKeyHandler }),
  "repo_export_tenant_repositories": defineProductTool({ description: "Export CodeArts Repo tenant repositories", inputSchema: repoExportTenantRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoExportTenantRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoExportTenantRepositoriesHandler }),
  "repo_update_tenant_repo_encryption_setting": defineProductTool({ description: "Update CodeArts Repo tenant repo encryption setting", inputSchema: repoUpdateTenantRepoEncryptionSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateTenantRepoEncryptionSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateTenantRepoEncryptionSettingHandler }),
  "repo_create_tenant_kms_grant": defineProductTool({ description: "Create CodeArts Repo tenant KMS grant", inputSchema: repoCreateTenantKMSGrantInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateTenantKmsGrantHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateTenantKmsGrantHandler }),
  "repo_add_tenant_trusted_ip_address": defineProductTool({ description: "Add CodeArts Repo tenant trusted IP address", inputSchema: repoAddTenantTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAddTenantTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAddTenantTrustedIpAddressHandler }),
  "repo_add_trusted_ip_address": defineProductTool({ description: "Add a CodeArts Repo trusted IP address through the official AddTrustedIpAddress endpoint", inputSchema: repoAddTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAddTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAddTrustedIpAddressHandler }),
  "repo_update_tenant_trusted_ip_address": defineProductTool({ description: "Update CodeArts Repo tenant trusted IP address", inputSchema: repoUpdateTenantTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateTenantTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateTenantTrustedIpAddressHandler }),
  "repo_update_trusted_ip_address": defineProductTool({ description: "Update a CodeArts Repo trusted IP address through the official UpdateTrustedIpAddress endpoint", inputSchema: repoUpdateTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateTrustedIpAddressHandler }),
  "repo_delete_tenant_trusted_ip_address": defineProductTool({ description: "Delete CodeArts Repo tenant trusted IP address", inputSchema: repoDeleteTenantTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteTenantTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteTenantTrustedIpAddressHandler }),
  "repo_delete_trusted_ip_address": defineProductTool({ description: "Delete a CodeArts Repo trusted IP address through the official DeleteTrustedIpAddress endpoint", inputSchema: repoDeleteTrustedIpAddressInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteTrustedIpAddressHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteTrustedIpAddressHandler }),
  "repo_list_repository_webhooks": defineProductTool({ description: "List CodeArts Repo repository webhooks", inputSchema: repoListRepositoryWebhooksInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryWebhooksHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryWebhooksHandler }),
  "repo_list_project_webhooks": defineProductTool({ description: "List CodeArts Repo project webhooks", inputSchema: repoListProjectWebhooksInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectWebhooksHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectWebhooksHandler }),
  "repo_list_project_template_status_repositories": defineProductTool({ description: "List CodeArts Repo project template status repositories through the official ListProjectTemplateStatusRepositories endpoint", inputSchema: repoListProjectTemplateStatusRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectTemplateStatusRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectTemplateStatusRepositoriesHandler }),
  "repo_list_group_webhooks": defineProductTool({ description: "List CodeArts Repo group webhooks", inputSchema: repoListGroupWebhooksInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupWebhooksHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupWebhooksHandler }),
  "repo_create_repository_webhook": defineProductTool({ description: "Create CodeArts Repo repository webhook", inputSchema: repoCreateRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryWebhookHandler }),
  "repo_add_project_webhook": defineProductTool({ description: "Add a CodeArts Repo project webhook through the official AddProjectWebhook endpoint", inputSchema: repoCreateProjectWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectWebhookHandler }),
  "repo_add_group_webhook": defineProductTool({ description: "Add a CodeArts Repo group webhook through the official AddGroupWebhook endpoint", inputSchema: repoCreateGroupWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateGroupWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateGroupWebhookHandler }),
  "repo_add_repository_webhook": defineProductTool({ description: "Add a CodeArts Repo repository webhook through the official AddRepositoryWebhook endpoint", inputSchema: repoCreateRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryWebhookHandler }),
  "repo_get_repository_webhook": defineProductTool({ description: "Get CodeArts Repo repository webhook detail", inputSchema: repoGetRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookHandler }),
  "repo_show_repository_webhook": defineProductTool({ description: "Show a CodeArts Repo repository webhook through the official ShowRepositoryWebhook endpoint", inputSchema: repoGetRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookHandler }),
  "repo_get_project_webhook": defineProductTool({ description: "Get CodeArts Repo project webhook detail", inputSchema: repoGetProjectWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProjectWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProjectWebhookHandler }),
  "repo_show_project_webhook": defineProductTool({ description: "Show a CodeArts Repo project webhook through the official ShowProjectWebhook endpoint", inputSchema: repoGetProjectWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProjectWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProjectWebhookHandler }),
  "repo_get_group_webhook": defineProductTool({ description: "Get CodeArts Repo group webhook detail", inputSchema: repoGetGroupWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetGroupWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetGroupWebhookHandler }),
  "repo_show_group_webhook": defineProductTool({ description: "Show a CodeArts Repo group webhook through the official ShowGroupWebhook endpoint", inputSchema: repoGetGroupWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetGroupWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetGroupWebhookHandler }),
  "repo_update_repository_webhook": defineProductTool({ description: "Update CodeArts Repo repository webhook", inputSchema: repoUpdateRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryWebhookHandler }),
  "repo_update_project_webhook": defineProductTool({ description: "Update a CodeArts Repo project webhook through the official UpdateProjectWebhook endpoint", inputSchema: repoUpdateProjectWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectWebhookHandler }),
  "repo_update_group_webhook": defineProductTool({ description: "Update a CodeArts Repo group webhook through the official UpdateGroupWebhook endpoint", inputSchema: repoUpdateGroupWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupWebhookHandler }),
  "repo_delete_repository_webhook": defineProductTool({ description: "Delete CodeArts Repo repository webhook", inputSchema: repoDeleteRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryWebhookHandler }),
  "repo_remove_project_webhook": defineProductTool({ description: "Remove a CodeArts Repo project webhook through the official RemoveProjectWebhook endpoint", inputSchema: repoDeleteProjectWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProjectWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProjectWebhookHandler }),
  "repo_remove_group_webhook": defineProductTool({ description: "Remove a CodeArts Repo group webhook through the official RemoveGroupWebhook endpoint", inputSchema: repoDeleteGroupWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteGroupWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteGroupWebhookHandler }),
  "repo_remove_repository_webhook": defineProductTool({ description: "Remove a CodeArts Repo repository webhook through the official RemoveRepositoryWebhook endpoint", inputSchema: repoDeleteRepositoryWebhookInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryWebhookHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryWebhookHandler }),
  "repo_list_repository_webhook_logs": defineProductTool({ description: "List CodeArts Repo repository webhook delivery logs", inputSchema: repoListRepositoryWebhookLogsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryWebhookLogsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryWebhookLogsHandler }),
  "repo_list_project_webhook_logs": defineProductTool({ description: "List CodeArts Repo project webhook delivery logs", inputSchema: repoListProjectWebhookLogsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectWebhookLogsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectWebhookLogsHandler }),
  "repo_list_group_webhook_logs": defineProductTool({ description: "List CodeArts Repo group webhook delivery logs", inputSchema: repoListGroupWebhookLogsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupWebhookLogsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupWebhookLogsHandler }),
  "repo_get_repository_webhook_log": defineProductTool({ description: "Get CodeArts Repo repository webhook delivery log detail", inputSchema: repoGetRepositoryWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookLogHandler }),
  "repo_show_repository_webhook_log": defineProductTool({ description: "Show a CodeArts Repo repository webhook log through the official ShowRepositoryWebhookLog endpoint", inputSchema: repoGetRepositoryWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryWebhookLogHandler }),
  "repo_get_project_webhook_log": defineProductTool({ description: "Get CodeArts Repo project webhook delivery log detail", inputSchema: repoGetProjectWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProjectWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProjectWebhookLogHandler }),
  "repo_show_project_webhook_log": defineProductTool({ description: "Show a CodeArts Repo project webhook log through the official ShowProjectWebhookLog endpoint", inputSchema: repoGetProjectWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProjectWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProjectWebhookLogHandler }),
  "repo_get_group_webhook_log": defineProductTool({ description: "Get CodeArts Repo group webhook delivery log detail", inputSchema: repoGetGroupWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetGroupWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetGroupWebhookLogHandler }),
  "repo_show_group_webhook_log": defineProductTool({ description: "Show a CodeArts Repo group webhook log through the official ShowGroupWebhookLog endpoint", inputSchema: repoGetGroupWebhookLogInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetGroupWebhookLogHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetGroupWebhookLogHandler }),
  "repo_create_merge_request": defineProductTool({ description: "Create CodeArts Repo merge request", inputSchema: repoCreateMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestHandler }),
  "repo_update_merge_request": defineProductTool({ description: "Update CodeArts Repo merge request", inputSchema: repoUpdateMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestHandler }),
  "repo_update_branch_name": defineProductTool({ description: "Rename a CodeArts Repo branch through the official UpdateBranchName endpoint", inputSchema: repoUpdateBranchNameInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateBranchNameHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateBranchNameHandler }),
  "repo_create_merge_request_discussion": defineProductTool({ description: "Create CodeArts Repo merge request discussion", inputSchema: repoCreateMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestDiscussionHandler }),
  "repo_create_cherry_pick_merge_request": defineProductTool({ description: "Create a cherry-pick merge request through the official CreateCherryPickMergeRequest endpoint", inputSchema: repoCreateCherryPickMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateCherryPickMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateCherryPickMergeRequestHandler }),
  "repo_close_merge_request": defineProductTool({ description: "Close CodeArts Repo merge request", inputSchema: repoCloseMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCloseMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCloseMergeRequestHandler }),
  "repo_list_merge_request_changes": defineProductTool({ description: "List CodeArts Repo merge request changes", inputSchema: repoListMergeRequestChangesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestChangesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestChangesHandler }),
  "repo_list_merge_request_changes_trees": defineProductTool({ description: "List CodeArts Repo merge request change trees through the official ListMergeRequestChangesTrees endpoint", inputSchema: repoListMergeRequestChangesTreesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestChangesTreesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestChangesTreesHandler }),
  "repo_list_merge_request_commits": defineProductTool({ description: "List CodeArts Repo merge request commits", inputSchema: repoListMergeRequestCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestCommitsHandler }),
  "repo_show_average_evaluation": defineProductTool({ description: "Show CodeArts Repo merge request average evaluation through the official ShowAverageEvaluation endpoint", inputSchema: repoShowAverageEvaluationInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowAverageEvaluationHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowAverageEvaluationHandler }),
  "repo_list_merge_request_evaluations": defineProductTool({ description: "List CodeArts Repo merge request evaluations through the official ListMergeRequestEvaluations endpoint", inputSchema: repoListMergeRequestEvaluationsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestEvaluationsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestEvaluationsHandler }),
  "repo_show_merge_request_votes": defineProductTool({ description: "Show CodeArts Repo merge request votes", inputSchema: repoShowMergeRequestVotesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestVotesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestVotesHandler }),
  "repo_show_merge_request_votes_detail": defineProductTool({ description: "Show CodeArts Repo merge request votes detail through the official ShowMergeRequestVotesDetail endpoint", inputSchema: repoShowMergeRequestVotesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestVotesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestVotesHandler }),
  "repo_update_merge_request_vote": defineProductTool({ description: "Update a CodeArts Repo merge request vote through the official UpdateMergeRequestVote endpoint", inputSchema: repoUpdateMergeRequestVoteInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestVoteHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestVoteHandler }),
  "repo_delete_merge_request_vote": defineProductTool({ description: "Delete a CodeArts Repo merge request vote through the official DeleteMergeRequestVote endpoint", inputSchema: repoDeleteMergeRequestVoteInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteMergeRequestVoteHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteMergeRequestVoteHandler }),
  "repo_delete_merge_request_discussion": defineProductTool({ description: "Delete a CodeArts Repo merge request discussion note through the official DeleteMergeRequestDiscussion endpoint", inputSchema: repoDeleteMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteMergeRequestDiscussionHandler }),
  "repo_show_merge_request_statistic": defineProductTool({ description: "Show CodeArts Repo merge request statistic", inputSchema: repoShowMergeRequestStatisticInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestStatisticHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestStatisticHandler }),
  "repo_show_repository_merge_requests_statistic": defineProductTool({ description: "Show CodeArts Repo repository merge request statistic through the official ShowRepositoryMergeRequestsStatistic endpoint", inputSchema: repoShowMergeRequestStatisticInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestStatisticHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestStatisticHandler }),
  "repo_list_merge_request_discussions": defineProductTool({ description: "List CodeArts Repo merge request discussions", inputSchema: repoListMergeRequestDiscussionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestDiscussionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestDiscussionsHandler }),
  "repo_show_merge_request_discussion": defineProductTool({ description: "Show a merge request discussion through the official ShowMergeRequestDiscussion endpoint", inputSchema: repoShowMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestDiscussionHandler }),
  "repo_update_merge_request_discussion_info": defineProductTool({ description: "Update merge request discussion metadata through the official UpdateMergeRequestDiscussionInfo endpoint", inputSchema: repoUpdateMergeRequestDiscussionInfoInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestDiscussionInfoHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestDiscussionInfoHandler }),
  "repo_list_merge_request_system_notes": defineProductTool({ description: "List merge request system notes through the official ListMergeRequestSystemNotes endpoint", inputSchema: repoListMergeRequestSystemNotesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestSystemNotesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestSystemNotesHandler }),
  "repo_list_commit_discussions": defineProductTool({ description: "List commit discussions through the official ListCommitDiscussions endpoint", inputSchema: repoListCommitDiscussionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitDiscussionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitDiscussionsHandler }),
  "repo_create_merge_request_discussion_response": defineProductTool({ description: "Reply to a merge request discussion through the official CreateMergeRequestDiscussionResponse endpoint", inputSchema: repoCreateMergeRequestDiscussionResponseInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestDiscussionResponseHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestDiscussionResponseHandler }),
  "repo_update_merge_request_discussion": defineProductTool({ description: "Update a merge request discussion note through the official UpdateMergeRequestDiscussion endpoint", inputSchema: repoUpdateMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestDiscussionHandler }),
  "repo_show_merge_request_comments_by_line": defineProductTool({ description: "Show CodeArts Repo merge request comments by line through the official ShowMergeRequestCommentsByLine endpoint", inputSchema: repoShowMergeRequestCommentsByLineInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeRequestCommentsByLineHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeRequestCommentsByLineHandler }),
  "repo_show_commit_comments_by_line": defineProductTool({ description: "Show CodeArts Repo commit comments by line through the official ShowCommitCommentsByLine endpoint", inputSchema: repoShowCommitCommentsByLineInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowCommitCommentsByLineHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowCommitCommentsByLineHandler }),
  "repo_list_merge_request_versions": defineProductTool({ description: "List CodeArts Repo merge request versions through the official ListMergeRequestVersions endpoint", inputSchema: repoListMergeRequestVersionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestVersionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestVersionsHandler }),
  "repo_show_actual_head_pipeline": defineProductTool({ description: "Show CodeArts Repo merge request actual head pipeline through the official ShowActualHeadPipeline endpoint", inputSchema: repoShowActualHeadPipelineInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowActualHeadPipelineHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowActualHeadPipelineHandler }),
  "repo_list_latest_pipeline_jobs": defineProductTool({ description: "List CodeArts Repo latest pipeline jobs through the official ListLatestPipelineJobs endpoint", inputSchema: repoListLatestPipelineJobsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListLatestPipelineJobsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListLatestPipelineJobsHandler }),
  "repo_list_pipeline_jobs": defineProductTool({ description: "List CodeArts Repo pipeline jobs through the official ListPipelineJobs endpoint", inputSchema: repoListPipelineJobsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPipelineJobsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPipelineJobsHandler }),
  "repo_list_project_protected_branches": defineProductTool({ description: "List CodeArts Repo project protected branches", inputSchema: repoListProjectProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedBranchesHandler }),
  "repo_create_project_protected_branches": defineProductTool({ description: "Create CodeArts Repo project protected branch", inputSchema: repoCreateProjectProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectProtectedBranchesHandler }),
  "repo_list_group_protected_branches": defineProductTool({ description: "List CodeArts Repo group protected branches", inputSchema: repoListGroupProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupProtectedBranchesHandler }),
  "repo_list_protected_branches": defineProductTool({ description: "List CodeArts Repo protected branches", inputSchema: repoListProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProtectedBranchesHandler }),
  "repo_list_refs": defineProductTool({ description: "List CodeArts Repo branch or tag refs", inputSchema: repoListRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRefsHandler }),
  "repo_list_refs_list": defineProductTool({ description: "List CodeArts Repo branch or tag refs through the official ListRefsList endpoint", inputSchema: repoListRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRefsHandler }),
  "repo_get_protected_branch": defineProductTool({ description: "Get CodeArts Repo protected branch detail", inputSchema: repoGetProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedBranchHandler }),
  "repo_show_protected_branch": defineProductTool({ description: "Show a CodeArts Repo protected branch through the official ShowProtectedBranch endpoint", inputSchema: repoGetProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedBranchHandler }),
  "repo_batch_create_protected_branches": defineProductTool({ description: "Batch create CodeArts Repo protected branches", inputSchema: repoBatchCreateProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchCreateProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchCreateProtectedBranchesHandler }),
  "repo_batch_create_protected_branch": defineProductTool({ description: "Batch create CodeArts Repo protected branch through the official BatchCreateProtectedBranch endpoint", inputSchema: repoBatchCreateProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchCreateProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchCreateProtectedBranchesHandler }),
  "repo_batch_update_protected_branches": defineProductTool({ description: "Batch update CodeArts Repo protected branches", inputSchema: repoBatchUpdateProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateProtectedBranchesHandler }),
  "repo_bulk_delete_protected_branches": defineProductTool({ description: "Bulk delete CodeArts Repo protected branches", inputSchema: repoBulkDeleteProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedBranchesHandler }),
  "repo_batch_delete_protected_branches": defineProductTool({ description: "Batch delete CodeArts Repo protected branches through the official BatchDeleteProtectedBranches endpoint", inputSchema: repoBulkDeleteProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedBranchesHandler }),
  "repo_update_protected_branch": defineProductTool({ description: "Update CodeArts Repo protected branch", inputSchema: repoUpdateProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProtectedBranchHandler }),
  "repo_delete_protected_branch": defineProductTool({ description: "Delete CodeArts Repo protected branch", inputSchema: repoDeleteProtectedBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProtectedBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProtectedBranchHandler }),
  "repo_list_protected_tags": defineProductTool({ description: "List CodeArts Repo protected tags", inputSchema: repoListProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProtectedTagsHandler }),
  "repo_get_protected_tag": defineProductTool({ description: "Get CodeArts Repo protected tag detail", inputSchema: repoGetProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedTagHandler }),
  "repo_show_protected_tag": defineProductTool({ description: "Show a CodeArts Repo protected tag through the official ShowProtectedTag endpoint", inputSchema: repoGetProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetProtectedTagHandler }),
  "repo_batch_create_protected_tags": defineProductTool({ description: "Batch create CodeArts Repo protected tags", inputSchema: repoBatchCreateProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchCreateProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchCreateProtectedTagsHandler }),
  "repo_batch_update_protected_tags": defineProductTool({ description: "Batch update CodeArts Repo protected tags", inputSchema: repoBatchUpdateProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBatchUpdateProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBatchUpdateProtectedTagsHandler }),
  "repo_bulk_delete_protected_tags": defineProductTool({ description: "Bulk delete CodeArts Repo protected tags", inputSchema: repoBulkDeleteProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedTagsHandler }),
  "repo_batch_delete_protected_tags": defineProductTool({ description: "Batch delete CodeArts Repo protected tags through the official BatchDeleteProtectedTags endpoint", inputSchema: repoBulkDeleteProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoBulkDeleteProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoBulkDeleteProtectedTagsHandler }),
  "repo_update_protected_tag": defineProductTool({ description: "Update CodeArts Repo protected tag", inputSchema: repoUpdateProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProtectedTagHandler }),
  "repo_delete_protected_tag": defineProductTool({ description: "Delete CodeArts Repo protected tag", inputSchema: repoDeleteProtectedTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteProtectedTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteProtectedTagHandler }),
  "repo_create_project_protected_tags": defineProductTool({ description: "Create CodeArts Repo project protected tag", inputSchema: repoCreateProjectProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateProjectProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateProjectProtectedTagsHandler }),
  "repo_create_repository_system_labels": defineProductTool({ description: "Create CodeArts Repo repository system labels", inputSchema: repoCreateRepositorySystemLabelsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositorySystemLabelsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositorySystemLabelsHandler }),
  "repo_list_project_protected_tags": defineProductTool({ description: "List CodeArts Repo project protected tags", inputSchema: repoListProjectProtectedTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedTagsHandler }),
  "repo_list_repository_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo repository protected refs user groups", inputSchema: repoListRepositoryProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryProtectedRefsUserGroupsHandler }),
  "repo_list_group_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo group protected refs user groups", inputSchema: repoListGroupProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupProtectedRefsUserGroupsHandler }),
  "repo_list_project_protected_refs_user_groups": defineProductTool({ description: "List CodeArts Repo project protected refs user groups", inputSchema: repoListProjectProtectedRefsUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectProtectedRefsUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectProtectedRefsUserGroupsHandler }),
  "repo_list_project_members": defineProductTool({ description: "List CodeArts Repo project members", inputSchema: repoListProjectMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectMembersHandler }),
  "repo_list_product_permission_resources_granted_users": defineProductTool({ description: "List CodeArts Repo product permission resource granted users through the official ListProductPermissionResourcesGrantedUsers endpoint", inputSchema: repoListProductPermissionResourcesGrantedUsersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProductPermissionResourcesGrantedUsersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProductPermissionResourcesGrantedUsersHandler }),
  "repo_list_repository_labels": defineProductTool({ description: "List CodeArts Repo repository labels", inputSchema: repoListRepositoryLabelsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLabelsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLabelsHandler }),
  "repo_create_repository_label": defineProductTool({ description: "Create CodeArts Repo repository label", inputSchema: repoCreateRepositoryLabelInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryLabelHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryLabelHandler }),
  "repo_update_repository_label": defineProductTool({ description: "Update CodeArts Repo repository label", inputSchema: repoUpdateRepositoryLabelInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryLabelHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryLabelHandler }),
  "repo_delete_repository_label": defineProductTool({ description: "Delete CodeArts Repo repository label", inputSchema: repoDeleteRepositoryLabelInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryLabelHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryLabelHandler }),
  "repo_create_branch": defineProductTool({ description: "Create CodeArts Repo branch through the official CreateBranch endpoint", inputSchema: repoCreateBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateBranchHandler }),
  "repo_create_commit": defineProductTool({ description: "Create a CodeArts Repo commit through the official CreateCommit endpoint", inputSchema: repoCreateCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateCommitHandler }),
  "repo_create_commit_revert": defineProductTool({ description: "Revert a CodeArts Repo commit through the official CreateCommitRevert endpoint", inputSchema: repoCreateCommitRevertInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateCommitRevertHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateCommitRevertHandler }),
  "repo_create_file": defineProductTool({ description: "Create a file in a CodeArts Repo repository branch through the official CreateFile endpoint", inputSchema: repoCreateFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateFileHandler }),
  "repo_create_dir": defineProductTool({ description: "Create a directory in a CodeArts Repo repository branch", inputSchema: repoCreateDirInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateDirHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateDirHandler }),
  "repo_add_submodule": defineProductTool({ description: "Add a CodeArts Repo repository submodule through the official AddSubmodule endpoint", inputSchema: repoAddSubmoduleInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAddSubmoduleHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAddSubmoduleHandler }),
  "repo_create_tag": defineProductTool({ description: "Create CodeArts Repo tag", inputSchema: repoCreateTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateTagHandler }),
  "repo_delete_branch": defineProductTool({ description: "Delete CodeArts Repo branch through the official DeleteBranch endpoint", inputSchema: repoDeleteBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteBranchHandler }),
  "repo_delete_file": defineProductTool({ description: "Delete a file in a CodeArts Repo repository branch through the official DeleteFile endpoint", inputSchema: repoDeleteFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteFileHandler }),
  "repo_delete_tag": defineProductTool({ description: "Delete CodeArts Repo tag", inputSchema: repoDeleteTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteTagHandler }),
  "repo_list_tags": defineProductTool({ description: "List CodeArts Repo tags", inputSchema: repoListTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTagsHandler }),
  "repo_show_tag": defineProductTool({ description: "Show a CodeArts Repo tag through the official ShowTag endpoint", inputSchema: repoGetTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetTagHandler }),
  "repo_list_events": defineProductTool({ description: "List CodeArts Repo events", inputSchema: repoListEventsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListEventsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListEventsHandler }),
  "repo_list_repository_events": defineProductTool({ description: "List CodeArts Repo repository events through the official ListRepositoryEvents endpoint", inputSchema: repoListEventsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListEventsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListEventsHandler }),
  "repo_add_repository_members": defineProductTool({ description: "Add CodeArts Repo repository members through the official AddRepositoryMembers endpoint", inputSchema: repoAddRepositoryMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAddRepositoryMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAddRepositoryMembersHandler }),
  "repo_delete_repository_member": defineProductTool({ description: "Delete a CodeArts Repo repository member through the official DeleteRepositoryMember endpoint", inputSchema: repoDeleteRepositoryMemberInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteRepositoryMemberHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteRepositoryMemberHandler }),
  "repo_update_repository_member": defineProductTool({ description: "Update a CodeArts Repo repository member role through the official UpdateRepositoryMember endpoint", inputSchema: repoUpdateRepositoryMemberInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryMemberHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryMemberHandler }),
  "repo_send_user_email_verify_code": defineProductTool({ description: "Send a CodeArts Repo user email verification code through the official SendUserEmailVerifyCode endpoint", inputSchema: repoSendUserEmailVerifyCodeInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoSendUserEmailVerifyCodeHandler>[0] }) => clients.repoClient, createProductHandler: createRepoSendUserEmailVerifyCodeHandler }),
  "repo_update_user_emails": defineProductTool({ description: "Update CodeArts Repo user email settings through the official UpdateUserEmails endpoint", inputSchema: repoUpdateUserEmailsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateUserEmailsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateUserEmailsHandler }),
  "repo_show_user_emails": defineProductTool({ description: "Show CodeArts Repo user email information through the official ShowUserEmails endpoint", inputSchema: repoShowUserEmailsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowUserEmailsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowUserEmailsHandler }),
  "repo_validate_project_repository_name": defineProductTool({ description: "Validate a CodeArts Repo repository name in a project through the official ValidateProjectRepositoryName endpoint", inputSchema: repoValidateProjectRepositoryNameInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoValidateProjectRepositoryNameHandler>[0] }) => clients.repoClient, createProductHandler: createRepoValidateProjectRepositoryNameHandler }),
  "repo_list_submodules": defineProductTool({ description: "List CodeArts Repo repository submodules", inputSchema: repoListSubmodulesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListSubmodulesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListSubmodulesHandler }),
  "repo_show_commit_statistics": defineProductTool({ description: "Show CodeArts Repo repository branch commit statistics", inputSchema: repoShowCommitStatisticsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowCommitStatisticsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowCommitStatisticsHandler }),
  "repo_show_commit_diff_metadata": defineProductTool({ description: "Show CodeArts Repo commit diff metadata through the official ShowCommitDiffMetadata endpoint", inputSchema: repoShowCommitDiffMetadataInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowCommitDiffMetadataHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowCommitDiffMetadataHandler }),
  "repo_show_commit_file_diff": defineProductTool({ description: "Show CodeArts Repo commit file diff through the official ShowCommitFileDiff endpoint", inputSchema: repoShowCommitFileDiffInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowCommitFileDiffHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowCommitFileDiffHandler }),
  "repo_show_diff_commit": defineProductTool({ description: "Show CodeArts Repo commit diffs through the official ShowDiffCommit endpoint", inputSchema: repoShowDiffCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowDiffCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowDiffCommitHandler }),
  "repo_list_repository_languages": defineProductTool({ description: "List CodeArts Repo repository language statistics", inputSchema: repoListRepositoryLanguagesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLanguagesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLanguagesHandler }),
  "repo_list_repository_contributors": defineProductTool({ description: "List CodeArts Repo repository contributors", inputSchema: repoListRepositoryContributorsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryContributorsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryContributorsHandler }),
  "repo_list_repository_forks": defineProductTool({ description: "List CodeArts Repo repository forks", inputSchema: repoListRepositoryForksInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryForksHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryForksHandler }),
  "repo_list_repository_members": defineProductTool({ description: "List CodeArts Repo repository members", inputSchema: repoListRepositoryMembersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryMembersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryMembersHandler }),
  "repo_list_repository_trees": defineProductTool({ description: "List CodeArts Repo repository tree entries", inputSchema: repoListRepositoryTreesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryTreesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryTreesHandler }),
  "repo_list_trees": defineProductTool({ description: "List CodeArts Repo trees through the official ListTrees endpoint", inputSchema: repoListRepositoryTreesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryTreesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryTreesHandler }),
  "repo_list_repository_logs_tree": defineProductTool({ description: "List CodeArts Repo repository log tree entries", inputSchema: repoListRepositoryLogsTreeInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLogsTreeHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLogsTreeHandler }),
  "repo_list_logs_tree": defineProductTool({ description: "List CodeArts Repo logs tree through the official ListLogsTree endpoint", inputSchema: repoListRepositoryLogsTreeInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLogsTreeHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLogsTreeHandler }),
  "repo_list_repository_file_list": defineProductTool({ description: "List CodeArts Repo repository files", inputSchema: repoListRepositoryFileListInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryFileListHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryFileListHandler }),
  "repo_list_files": defineProductTool({ description: "List CodeArts Repo files through the official ListFiles endpoint", inputSchema: repoListRepositoryFileListInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryFileListHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryFileListHandler }),
  "repo_list_branch_sub_files": defineProductTool({ description: "List CodeArts Repo branch sub files through the official ListBranchSubFiles endpoint", inputSchema: repoListBranchSubFilesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListBranchSubFilesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListBranchSubFilesHandler }),
  "repo_list_file_upper_tree_entries": defineProductTool({ description: "List CodeArts Repo upper tree entries for a file path through the official ListFileUpperTreeEntries endpoint", inputSchema: repoListFileUpperTreeEntriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListFileUpperTreeEntriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListFileUpperTreeEntriesHandler }),
  "repo_get_repository_file_content_v4": defineProductTool({ description: "Get CodeArts Repo v4 file content", inputSchema: repoGetRepositoryFileContentV4Input, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryFileContentV4Handler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryFileContentV4Handler }),
  "repo_show_file_content": defineProductTool({ description: "Show CodeArts Repo file content through the official ShowFileContent endpoint", inputSchema: repoGetRepositoryFileContentV4Input, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryFileContentV4Handler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryFileContentV4Handler }),
  "repo_show_file": defineProductTool({ description: "Show CodeArts Repo file detail through the official ShowFile endpoint", inputSchema: repoShowFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowFileHandler }),
  "repo_show_branch_file": defineProductTool({ description: "Show a CodeArts Repo branch file through the official ShowBranchFile endpoint", inputSchema: repoShowBranchFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowBranchFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowBranchFileHandler }),
  "repo_show_file_raw": defineProductTool({ description: "Show CodeArts Repo raw file content through the official ShowFileRaw endpoint", inputSchema: repoShowFileRawInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowFileRawHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowFileRawHandler }),
  "repo_download_blobs_raw": defineProductTool({ description: "Download CodeArts Repo raw blob content through the official DownloadBlobsRaw endpoint", inputSchema: repoDownloadBlobsRawInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDownloadBlobsRawHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDownloadBlobsRawHandler }),
  "repo_get_repository_blame": defineProductTool({ description: "Get CodeArts Repo file blame information", inputSchema: repoGetRepositoryBlameInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryBlameHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryBlameHandler }),
  "repo_list_file_blame_lines": defineProductTool({ description: "List CodeArts Repo file blame lines through the official ListFileBlameLines endpoint", inputSchema: repoGetRepositoryBlameInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryBlameHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryBlameHandler }),
  "repo_show_repository_readme_file": defineProductTool({ description: "Show CodeArts Repo repository README file", inputSchema: repoShowRepositoryReadmeFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryReadmeFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryReadmeFileHandler }),
  "repo_show_readme_file": defineProductTool({ description: "Show CodeArts Repo repository README file through the official ShowReadmeFile endpoint", inputSchema: repoShowRepositoryReadmeFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryReadmeFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryReadmeFileHandler }),
  "repo_list_commit_associated_refs": defineProductTool({ description: "List CodeArts Repo commit associated refs", inputSchema: repoListCommitAssociatedRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitAssociatedRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitAssociatedRefsHandler }),
  "repo_show_review_setting": defineProductTool({ description: "Show CodeArts Repo repository review setting", inputSchema: repoShowReviewSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowReviewSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowReviewSettingHandler }),
  "repo_create_review_setting": defineProductTool({ description: "Create or update CodeArts Repo repository review setting through the official CreateReviewSetting endpoint", inputSchema: repoCreateReviewSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateReviewSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateReviewSettingHandler }),
  "repo_show_note_required_attributes": defineProductTool({ description: "Show CodeArts Repo repository note required attributes", inputSchema: repoShowNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowNoteRequiredAttributesHandler }),
  "repo_update_note_required_attributes": defineProductTool({ description: "Create or update CodeArts Repo repository note required attributes through the official UpdateNoteRequiredAttributes endpoint", inputSchema: repoUpdateNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateNoteRequiredAttributesHandler }),
  "repo_show_group_note_required_attributes": defineProductTool({ description: "Show CodeArts Repo group note required attributes through the official ShowGroupNoteRequiredAttributes endpoint", inputSchema: repoShowGroupNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupNoteRequiredAttributesHandler }),
  "repo_update_group_note_required_attributes": defineProductTool({ description: "Create or update CodeArts Repo group note required attributes through the official UpdateGroupNoteRequiredAttributes endpoint", inputSchema: repoUpdateGroupNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateGroupNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateGroupNoteRequiredAttributesHandler }),
  "repo_show_group_general_policy": defineProductTool({ description: "Show CodeArts Repo group general policy through the official ShowGroupGeneralPolicy endpoint", inputSchema: repoShowGroupGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowGroupGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowGroupGeneralPolicyHandler }),
  "repo_list_project_note_required_attributes": defineProductTool({ description: "List CodeArts Repo project note required attributes through the official ListProjectNoteRequiredAttributes endpoint", inputSchema: repoListProjectNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectNoteRequiredAttributesHandler }),
  "repo_update_project_note_required_attributes": defineProductTool({ description: "Create or update CodeArts Repo project note required attributes through the official UpdateProjectNoteRequiredAttributes endpoint", inputSchema: repoUpdateProjectNoteRequiredAttributesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateProjectNoteRequiredAttributesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateProjectNoteRequiredAttributesHandler }),
  "repo_list_default_review_categories": defineProductTool({ description: "List CodeArts Repo default review categories", inputSchema: repoListDefaultReviewCategoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListDefaultReviewCategoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListDefaultReviewCategoriesHandler }),
  "repo_show_blobs": defineProductTool({ description: "Show CodeArts Repo blob content", inputSchema: repoShowBlobsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowBlobsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowBlobsHandler }),
  "repo_show_diff_lines": defineProductTool({ description: "Show CodeArts Repo file lines at a commit", inputSchema: repoShowDiffLinesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowDiffLinesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowDiffLinesHandler }),
  "repo_list_repository_navigation_references": defineProductTool({ description: "List CodeArts Repo code navigation references", inputSchema: repoListRepositoryNavigationReferencesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryNavigationReferencesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryNavigationReferencesHandler }),
  "repo_list_repository_review_authors": defineProductTool({ description: "List CodeArts Repo repository review authors", inputSchema: repoListRepositoryReviewAuthorsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryReviewAuthorsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryReviewAuthorsHandler }),
  "repo_list_repository_reviews": defineProductTool({ description: "List CodeArts Repo repository reviews", inputSchema: repoListRepositoryReviewsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryReviewsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryReviewsHandler }),
  "repo_list_repository_related_commits": defineProductTool({ description: "List CodeArts Repo repository related commits through the official ListRepositoryRelatedCommits endpoint", inputSchema: repoListRepositoryRelatedCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryRelatedCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryRelatedCommitsHandler }),
  "repo_show_repository_navigation_outline": defineProductTool({ description: "Show CodeArts Repo code navigation outline", inputSchema: repoShowRepositoryNavigationOutlineInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryNavigationOutlineHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryNavigationOutlineHandler }),
  "repo_show_repository_navigation_schema": defineProductTool({ description: "Show CodeArts Repo code navigation schema", inputSchema: repoShowRepositoryNavigationSchemaInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryNavigationSchemaHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryNavigationSchemaHandler }),
  "repo_show_repository_navigation_language": defineProductTool({ description: "Show CodeArts Repo code navigation languages", inputSchema: repoShowRepositoryNavigationLanguageInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryNavigationLanguageHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryNavigationLanguageHandler }),
  "repo_list_repository_user_groups": defineProductTool({ description: "List CodeArts Repo repository user groups", inputSchema: repoListRepositoryUserGroupsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryUserGroupsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryUserGroupsHandler }),
  "repo_list_personal_recent_push_events": defineProductTool({ description: "List CodeArts Repo personal recent push events", inputSchema: repoListPersonalRecentPushEventsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPersonalRecentPushEventsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPersonalRecentPushEventsHandler }),
  "repo_list_repository_commit_rules": defineProductTool({ description: "List CodeArts Repo repository commit rules", inputSchema: repoListRepositoryCommitRulesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryCommitRulesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryCommitRulesHandler }),
  "repo_list_repository_templates": defineProductTool({ description: "List CodeArts Repo repository templates", inputSchema: repoListRepositoryTemplatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryTemplatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryTemplatesHandler }),
  "repo_show_repository_statistics_status": defineProductTool({ description: "Show CodeArts Repo repository statistics task status", inputSchema: repoShowRepositoryStatisticsStatusInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryStatisticsStatusHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryStatisticsStatusHandler }),
  "repo_execute_repository_statistics": defineProductTool({ description: "Execute CodeArts Repo repository statistics task", inputSchema: repoExecuteRepositoryStatisticsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoExecuteRepositoryStatisticsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoExecuteRepositoryStatisticsHandler }),
  "repo_show_last_push_event_in_repository": defineProductTool({ description: "Show CodeArts Repo repository last push event", inputSchema: repoShowLastPushEventInRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowLastPushEventInRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowLastPushEventInRepositoryHandler }),
  "repo_show_repository_statistics_summary": defineProductTool({ description: "Show CodeArts Repo repository statistics summary", inputSchema: repoShowRepositoryStatisticsSummaryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryStatisticsSummaryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryStatisticsSummaryHandler }),
  "repo_show_repo_statistics_summary": defineProductTool({ description: "Show CodeArts Repo repository statistics overview", inputSchema: repoShowRepoStatisticsSummaryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepoStatisticsSummaryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepoStatisticsSummaryHandler }),
  "repo_show_repo_last_statistics": defineProductTool({ description: "Show CodeArts Repo repository last commit statistics", inputSchema: repoShowRepoLastStatisticsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepoLastStatisticsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepoLastStatisticsHandler }),
  "repo_show_repository_statistic_data": defineProductTool({ description: "Show CodeArts Repo repository statistic data through the official ShowRepositoryStatisticData endpoint", inputSchema: repoShowRepositoryStatisticDataInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryStatisticDataHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryStatisticDataHandler }),
  "repo_show_repository_master": defineProductTool({ description: "Show CodeArts Repo repository master flag through the official ShowRepositoryMaster endpoint", inputSchema: repoShowRepositoryMasterInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryMasterHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryMasterHandler }),
  "repo_show_repository_status": defineProductTool({ description: "Show a CodeArts Repo repository status through the official ShowRepositoryStatus endpoint", inputSchema: repoShowRepositoryStatusInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryStatusHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryStatusHandler }),
  "repo_show_repository_commit_lines": defineProductTool({ description: "Show CodeArts Repo repository commit line statistics through the official ShowRepositoryCommitLines endpoint", inputSchema: repoShowRepositoryCommitLinesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryCommitLinesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryCommitLinesHandler }),
  "repo_show_notification_subscription": defineProductTool({ description: "Show CodeArts Repo repository notification subscription", inputSchema: repoShowNotificationSubscriptionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowNotificationSubscriptionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowNotificationSubscriptionHandler }),
  "repo_show_notification_subscriptions_status": defineProductTool({ description: "Show CodeArts Repo repository notification subscription status", inputSchema: repoShowNotificationSubscriptionsStatusInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowNotificationSubscriptionsStatusHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowNotificationSubscriptionsStatusHandler }),
  "repo_update_notification_subscription": defineProductTool({ description: "Update CodeArts Repo repository notification subscription", inputSchema: repoUpdateNotificationSubscriptionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateNotificationSubscriptionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateNotificationSubscriptionHandler }),
  "repo_update_file": defineProductTool({ description: "Update a file in a CodeArts Repo repository branch through the official UpdateFile endpoint", inputSchema: repoUpdateFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateFileHandler }),
  "repo_rename_file": defineProductTool({ description: "Rename a file in a CodeArts Repo repository branch through the official RenameFile endpoint", inputSchema: repoRenameFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRenameFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRenameFileHandler }),
  "repo_show_repository_inherit_setting_source": defineProductTool({ description: "Show CodeArts Repo repository inherit setting source", inputSchema: repoShowRepositoryInheritSettingSourceInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryInheritSettingSourceHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryInheritSettingSourceHandler }),
  "repo_show_repository_inherit_setting": defineProductTool({ description: "Show CodeArts Repo repository inherit settings", inputSchema: repoShowRepositoryInheritSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryInheritSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryInheritSettingHandler }),
  "repo_update_repository_inherit_setting": defineProductTool({ description: "Update CodeArts Repo repository inheritance settings", inputSchema: repoUpdateRepositoryInheritSettingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryInheritSettingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryInheritSettingHandler }),
  "repo_show_repository_general_commit_rule": defineProductTool({ description: "Show CodeArts Repo repository general commit rule", inputSchema: repoShowRepositoryGeneralCommitRuleInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryGeneralCommitRuleHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryGeneralCommitRuleHandler }),
  "repo_show_repository_general_policy": defineProductTool({ description: "Show CodeArts Repo repository general policy", inputSchema: repoShowRepositoryGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryGeneralPolicyHandler }),
  "repo_update_repository_general_policy": defineProductTool({ description: "Update CodeArts Repo repository general policy", inputSchema: repoUpdateRepositoryGeneralPolicyInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryGeneralPolicyHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryGeneralPolicyHandler }),
  "repo_update_repository_general_commit_rule": defineProductTool({ description: "Update CodeArts Repo repository general commit rule", inputSchema: repoUpdateRepositoryGeneralCommitRuleInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryGeneralCommitRuleHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryGeneralCommitRuleHandler }),
  "repo_create_repository_commit_rule": defineProductTool({ description: "Create CodeArts Repo repository commit rule", inputSchema: repoCreateRepositoryCommitRuleInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryCommitRuleHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryCommitRuleHandler }),
  "repo_update_repository_commit_rule": defineProductTool({ description: "Update CodeArts Repo repository commit rule", inputSchema: repoUpdateRepositoryCommitRuleInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRepositoryCommitRuleHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRepositoryCommitRuleHandler }),
  "repo_show_repository_watermark": defineProductTool({ description: "Show CodeArts Repo repository watermark setting", inputSchema: repoShowRepositoryWatermarkInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowRepositoryWatermarkHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowRepositoryWatermarkHandler }),
  "repo_start_house_keeping": defineProductTool({ description: "Start CodeArts Repo repository house keeping", inputSchema: repoStartHouseKeepingInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoStartHouseKeepingHandler>[0] }) => clients.repoClient, createProductHandler: createRepoStartHouseKeepingHandler }),
  "repo_rebuild_repository_navigation": defineProductTool({ description: "Rebuild CodeArts Repo repository navigation through the official RebuildRepositoryNavigation endpoint", inputSchema: repoRebuildRepositoryNavigationInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRebuildRepositoryNavigationHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRebuildRepositoryNavigationHandler }),
  "repo_sync_deploy_key_to_submodules": defineProductTool({ description: "Sync a CodeArts Repo deploy key to all submodules", inputSchema: repoSyncDeployKeyToSubmodulesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoSyncDeployKeyToSubmodulesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoSyncDeployKeyToSubmodulesHandler }),
  "repo_show_user_ref_permission": defineProductTool({ description: "Show CodeArts Repo repository user ref permission", inputSchema: repoShowUserRefPermissionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowUserRefPermissionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowUserRefPermissionHandler }),
  "repo_list_merge_requests": defineProductTool({ description: "List CodeArts Repo merge requests", inputSchema: repoListMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestsHandler }),
  "repo_list_repository_merge_requests": defineProductTool({ description: "List CodeArts Repo repository merge requests through the official ListRepositoryMergeRequests endpoint", inputSchema: repoListMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestsHandler }),
  "repo_list_personal_merge_requests": defineProductTool({ description: "List personal CodeArts Repo merge requests through the official ListPersonalMergeRequests endpoint", inputSchema: repoListPersonalMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPersonalMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPersonalMergeRequestsHandler }),
  "repo_list_project_merge_requests": defineProductTool({ description: "List CodeArts Repo project merge requests through the official ListProjectMergeRequests endpoint", inputSchema: repoListProjectMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectMergeRequestsHandler }),
  "repo_list_commit_associated_merge_requests": defineProductTool({ description: "List CodeArts Repo merge requests associated with a commit through the official ListCommitAssociatedMergeRequests endpoint", inputSchema: repoListCommitAssociatedMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitAssociatedMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitAssociatedMergeRequestsHandler }),
  "repo_list_merge_request_participants": defineProductTool({ description: "List CodeArts Repo merge request participants through the official ListMergeRequestParticipants endpoint", inputSchema: repoListMergeRequestParticipantsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestParticipantsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestParticipantsHandler }),
  "repo_show_mergeable_state_outer": defineProductTool({ description: "Show CodeArts Repo merge request mergeable state through the official ShowMergeableStateOuter endpoint", inputSchema: repoShowMergeableStateOuterInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowMergeableStateOuterHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowMergeableStateOuterHandler }),
  "repo_list_merge_request_valid_assigned_candidates": defineProductTool({ description: "List CodeArts Repo repository merge request assignee candidates through the official ListMergeRequestValidAssignedCandidates endpoint", inputSchema: repoListMergeRequestValidAssignedCandidatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestValidAssignedCandidatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestValidAssignedCandidatesHandler }),
  "repo_list_group_merge_request_valid_assigned_candidates": defineProductTool({ description: "List CodeArts Repo group merge request assignee candidates through the official ListGroupMergeRequestValidAssignedCandidates endpoint", inputSchema: repoListGroupMergeRequestValidAssignedCandidatesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupMergeRequestValidAssignedCandidatesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupMergeRequestValidAssignedCandidatesHandler }),
  "repo_list_project_merge_request_can_be_assigned_users": defineProductTool({ description: "List CodeArts Repo project merge request assignee candidates through the official ListProjectMergeRequestCanBeAssignedUsers endpoint", inputSchema: repoListProjectMergeRequestCanBeAssignedUsersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectMergeRequestCanBeAssignedUsersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectMergeRequestCanBeAssignedUsersHandler }),
  "repo_list_group_merge_request_can_be_assigned_reviewers": defineProductTool({ description: "List CodeArts Repo group merge request reviewer candidates through the official ListGroupMergeRequestCanBeAssignedReviewers endpoint", inputSchema: repoListGroupMergeRequestCanBeAssignedReviewersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListGroupMergeRequestCanBeAssignedReviewersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListGroupMergeRequestCanBeAssignedReviewersHandler }),
  "repo_list_project_merge_request_can_be_assigned_reviewers": defineProductTool({ description: "List CodeArts Repo project merge request reviewer candidates through the official ListProjectMergeRequestCanBeAssignedReviewers endpoint", inputSchema: repoListProjectMergeRequestCanBeAssignedReviewersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProjectMergeRequestCanBeAssignedReviewersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProjectMergeRequestCanBeAssignedReviewersHandler }),
  "repo_list_merge_request_approvers": defineProductTool({ description: "List CodeArts Repo merge request approver candidates through the official ListMergeRequestApprovers endpoint", inputSchema: repoListMergeRequestApproversInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestApproversHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestApproversHandler }),
  "repo_list_merge_request_reviewers": defineProductTool({ description: "List CodeArts Repo merge request reviewer candidates through the official ListMergeRequestReviewers endpoint", inputSchema: repoListMergeRequestReviewersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestReviewersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestReviewersHandler }),
  "repo_import_merge_request": defineProductTool({ description: "Import a CodeArts Repo merge request through the official ImportMergeRequest endpoint", inputSchema: repoImportMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoImportMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoImportMergeRequestHandler }),
  "repo_rebase_merge_request_for_open_api": defineProductTool({ description: "Rebase a CodeArts Repo merge request through the official RebaseMergeRequestForOpenApi endpoint", inputSchema: repoRebaseMergeRequestForOpenApiInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoRebaseMergeRequestForOpenApiHandler>[0] }) => clients.repoClient, createProductHandler: createRepoRebaseMergeRequestForOpenApiHandler }),
  "repo_resolve_merge_request_conflicts": defineProductTool({ description: "Resolve CodeArts Repo merge request conflicts through the official ResolveMergeRequestConflicts endpoint", inputSchema: repoResolveMergeRequestConflictsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoResolveMergeRequestConflictsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoResolveMergeRequestConflictsHandler }),
  "repo_list_merge_request_conflict_files": defineProductTool({ description: "List CodeArts Repo merge request conflict files through the official ListMergeRequestConflictFiles endpoint", inputSchema: repoListMergeRequestConflictFilesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestConflictFilesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestConflictFilesHandler }),
  "repo_get_branch": defineProductTool({ description: "Get CodeArts Repo branch detail", inputSchema: repoGetBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetBranchHandler }),
  "repo_show_branch": defineProductTool({ description: "Show a CodeArts Repo branch through the official ShowBranch endpoint", inputSchema: repoGetBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetBranchHandler }),
  "repo_compare_refs": defineProductTool({ description: "Compare CodeArts Repo refs", inputSchema: repoCompareRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCompareRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCompareRefsHandler }),
  "repo_show_ref_compare": defineProductTool({ description: "Show CodeArts Repo ref compare through the official ShowRefCompare endpoint", inputSchema: repoCompareRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCompareRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCompareRefsHandler }),
  "repo_show_branch_conflict": defineProductTool({ description: "Show CodeArts Repo branch conflict state through the official ShowBranchConflict endpoint", inputSchema: repoShowBranchConflictInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoShowBranchConflictHandler>[0] }) => clients.repoClient, createProductHandler: createRepoShowBranchConflictHandler }),
  "repo_get_tag": defineProductTool({ description: "Get CodeArts Repo tag detail", inputSchema: repoGetTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetTagHandler }),
  "repo_get_merge_request": defineProductTool({ description: "Get CodeArts Repo merge request detail", inputSchema: repoGetMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestHandler }),
  "repo_show_merge_request_detail": defineProductTool({ description: "Show CodeArts Repo merge request detail through the official ShowMergeRequestDetail endpoint", inputSchema: repoGetMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestHandler }),
  "repo_merge_merge_request": defineProductTool({ description: "Merge CodeArts Repo merge request", inputSchema: repoMergeMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoMergeMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoMergeMergeRequestHandler }),
  "repo_review_merge_request": defineProductTool({ description: "Review CodeArts Repo merge request", inputSchema: repoReviewMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoReviewMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoReviewMergeRequestHandler }),
  "repo_approval_merge_request": defineProductTool({ description: "Approve a CodeArts Repo merge request through the official ApprovalMergeRequest endpoint", inputSchema: repoReviewMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoReviewMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoReviewMergeRequestHandler }),
  "repo_update_merge_request_approvers": defineProductTool({ description: "Update CodeArts Repo merge request approvers through the official UpdateMergeRequestApprovers endpoint", inputSchema: repoUpdateMergeRequestApproversInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestApproversHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestApproversHandler }),
  "repo_update_merge_request_reviewers": defineProductTool({ description: "Update CodeArts Repo merge request reviewers through the official UpdateMergeRequestReviewers endpoint", inputSchema: repoUpdateMergeRequestReviewersInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateMergeRequestReviewersHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateMergeRequestReviewersHandler }),
  "repo_get_file": defineProductTool({ description: "Get CodeArts Repo file content", inputSchema: repoGetFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetFileHandler }),
  "repo_list_commits": defineProductTool({ description: "List CodeArts Repo commits", inputSchema: repoListCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitsHandler }),
  "repo_get_commit": defineProductTool({ description: "Get CodeArts Repo commit detail", inputSchema: repoGetCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetCommitHandler }),
  "repo_show_commit": defineProductTool({ description: "Show CodeArts Repo commit detail through the official ShowCommit endpoint", inputSchema: repoGetCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetCommitHandler }),
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
