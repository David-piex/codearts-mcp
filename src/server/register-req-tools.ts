import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createReqClient } from "../products/req/client.js";
import {
  reqAddIterationWorkItemsInput,
  reqAddPlanWorkItemsInput,
  reqAddWorkItemCommentInput,
  reqAddWorkItemWorkHourInput,
  reqAddProjectMemberInput,
  reqApplyJoinProjectForAgcInput,
  reqBatchAddProjectMembersInput,
  reqBatchCreateTrackerConfigInput,
  reqBatchDeleteReleasePlansInput,
  reqBatchCreateIpdIssuesInput,
  reqBatchDeleteIpdIssuesInput,
  reqBatchDeleteProjectMembersInput,
  reqBatchDeleteIterationsInput,
  reqBatchDeleteWorkItemsInput,
  reqBatchDeleteWorkItemsV2TokenInput,
  reqBatchTransferIpdWorkItemFlowInput,
  reqBatchUpdateChildUserNicknamesInput,
  reqBatchUpdateIpdIssuesInput,
  reqBatchUpdateWorkItemsV2TokenInput,
  reqBatchUpdateReleasePlanBaselineInput,
  reqChangeReleasePlanStatusInput,
  reqCopyWorkItemsInput,
  reqCheckProjectNameInput,
  reqCheckWorkItemStatusNameInput,
  reqClearPlanWorkItemsInput,
  reqCreateIpdChangeReviewFormInput,
  reqCreateIpdIssueInput,
  reqCreateIpdFeatureSetInput,
  reqCreateIpdLabelInput,
  reqCreateIpdModuleInput,
  reqCreateIpdProcessInstanceInput,
  reqCreateIpdWorkHourInput,
  reqCreateIterationWorkItemInput,
  reqCreatePlanWorkItemInput,
  reqCreatePlanInput,
  reqCreateReleasePlanInput,
  reqCreateIterationInput,
  reqCreateVersionV2Input,
  reqCreateProjectInput,
  reqCreateProjectDomainInput,
  reqCreateProjectModuleInput,
  reqCreateProjectStatusConfigInput,
  reqCreateWorkItemCustomFieldInput,
  reqCreateSystemWorkItemV4Input,
  reqCancelProjectDomainInput,
  reqCreateWorkItemWithAttachmentV3Input,
  reqDeletePlanInput,
  reqDeleteIpdChangeReviewFormInput,
  reqDeleteIpdFeatureSetInput,
  reqDeleteIpdIssueImageInput,
  reqDeleteIpdLabelInput,
  reqDeleteIpdModuleInput,
  reqDeleteIpdProcessInstanceInput,
  reqDeleteIpdWorkHourInput,
  reqDeleteProjectInput,
  reqDeleteIterationInput,
  reqDeleteProjectModuleInput,
  reqDeleteProjectTemplateInput,
  reqDeleteVersionV2Input,
  reqDeleteWorkItemInput,
  reqDeleteWorkItemV3Input,
  reqCreateWorkItemInput,
  reqCreateEpicIssueInput,
  reqCreateWorkItemV2Input,
  reqBatchUpdateWorkItemsInput,
  reqCountWorkItemTreeInput,
  reqCreateWorkItemTemplateInput,
  reqGetIpdIssueInput,
  reqGetIpdProcessInstanceInput,
  reqGetIpdProjectFieldOptionUsedInput,
  reqGetIpdReviewFormInput,
  reqGetIpdStatisticDashboardInput,
  reqGetIpdTenantFieldOptionUsedInput,
  reqGetIpdTenantFieldUsedInput,
  reqGetIpdWorkItemFlowDetailInput,
  reqGetCurrentUserInfoInput,
  reqGetCurrentUserRoleInput,
  reqGetIrInput,
  reqGetProjectBugDensityInput,
  reqGetProjectBugsPerDeveloperInput,
  reqGetProjectCompletionRateInput,
  reqGetProjectDueDaysAfterInput,
  reqListBoardWorkItemStatusRecordsInput,
  reqListBoardWorkItemWorkflowConfigInput,
  reqListBoardWorkItemsInput,
  reqListCacheDataInput,
  reqDeleteAttachmentInput,
  reqDownloadAttachmentInput,
  reqDownloadImageFileInput,
  reqUploadIssuesImgInput,
  reqDownloadIpdIssueAttachmentInput,
  reqDownloadIpdIssueImageInput,
  reqExportWorkItemsNewV2Input,
  reqGetProjectPublicConfigInput,
  reqGetProjectSummaryInput,
  reqGetProjectWorkhourConfigInput,
  reqGetWorkHourPermissionInput,
  reqGetIterationInput,
  reqGetVersionDetailV2Input,
  reqGetPlanInput,
  reqGetReleasePlanInput,
  reqGetProjectInput,
  reqGetWorkItemCompletionRateInput,
  reqGetWorkItemIssueDetailsInput,
  reqGetWorkItemIndexCountsInput,
  reqListJobCacheBoardsInput,
  reqListChildWorkItemsInput,
  reqListIterationWorkItemsInput,
  reqListIterationStatusStatisticsInput,
  reqGetIpdE2EGraphInput,
  reqListDevucProjectMembersInput,
  reqListIpdCategoryStatusesInput,
  reqListIpdChangeReviewIssueApproversInput,
  reqListIpdAttachedWikisInput,
  reqListIpdIssueAttachmentsInput,
  reqListIpdIssueTreeInput,
  reqListIpdProcessInstancesInput,
  reqListIpdReviewFormsInput,
  reqListIpdReviewRoleUsersInput,
  reqListIpdWorkHourCategoriesInput,
  reqListIpdWorkHoursInput,
  reqListIpdFeatureSetsInput,
  reqListIpdIssueFieldsInput,
  reqListIpdIssueRelationConfigInput,
  reqListIpdIssuesInput,
  reqListIpdLabelsInput,
  reqListIpdModulesInput,
  reqListIpdProjectFieldsInput,
  reqListIpdProjectUsersInput,
  reqListIpdProjectsInput,
  reqListIpdSnapshotFeaturesInput,
  reqListIpdSnapshotVersionsInput,
  reqListIpdStatusesInput,
  reqListIpdTenantFieldsInput,
  reqListIpdTenantIssuesInput,
  reqListIpdWorkflowFieldsInput,
  reqListIpdWorkflowTemplatesInput,
  reqGroupIpdIssuesInput,
  reqListIrChildrenInput,
  reqListIrHistoriesInput,
  reqListIssueSeveritiesInput,
  reqListOptionalWorkItemStatusConfigsInput,
  reqListPlanAddableWorkItemsInput,
  reqListPlanWorkItemsInput,
  reqListPlansInput,
  reqListParentWorkItemsInput,
  reqListReleasePlansInput,
  reqListProgramFieldsInput,
  reqListProgramsInput,
  reqListProjectBugStatisticsInput,
  reqListProjectDemandStatisticsInput,
  reqListProjectDomainsInput,
  reqListProjectDomainsV2Input,
  reqListUserFeaturesInput,
  reqListProjectVersionsInput,
  reqListProjectWorkHourTypesInput,
  reqListProjectWorkHourTypesV5Input,
  reqListProjectUserWorkHoursInput,
  reqListProjectWorkHoursInput,
  reqListProjectMemberWorkHoursInput,
  reqListProjectWorkItemRecordsInput,
  reqQueryIterationImmovableIssuesInput,
  reqQueryScrumVersionWorkItemsV2Input,
  reqGetWorkItemInput,
  reqLeaveProjectInput,
  reqListAssociatedCodeV2Input,
  reqListAssociatedCommitsInput,
  reqListAssociatedIssuesInput,
  reqListAssociatedIssuesV4Input,
  reqListAssociatedTestCasesInput,
  reqListAssociatedWikisInput,
  reqListAssociatedWikisV5Input,
  reqListChildWorkItemsDirectV4Input,
  reqListIterationsInput,
  reqListNotAddedProjectsInput,
  reqListProjectModulesInput,
  reqListModuleSettingsV2Input,
  reqListProjectMembersInput,
  reqListProjectsInput,
  reqListRelatedUsersInput,
  reqListWorkItemCustomFieldsInput,
  reqListWorkItemCustomFieldsV4Input,
  reqListWorkItemCommentsInput,
  reqListWorkItemCommentsV2Input,
  reqListWorkItemWorkHoursInput,
  reqListWorkItemAssignedStatusConfigsInput,
  reqListWorkItemStatusAttributesInput,
  reqListWorkItemStatusConfigsInput,
  reqListWorkItemStatusDetailsInput,
  reqGetWorkItemStatusRuleFlagInput,
  reqListWorkItemStatusesInput,
  reqListWorkItemTagsInput,
  reqListWorkItemTreeInput,
  reqListChildWorkItemsV4Input,
  reqGetWorkItemTemplateConfigInput,
  reqListWorkItemTrackerHandlersInput,
  reqListWorkItemTemplatesInput,
  reqListWorkItemQueriesInput,
  reqListWorkSettingTemplatesV2Input,
  reqListWorkItemWorkflowConfigInput,
  reqListWorkItemRecordsInput,
  reqListWorkItemRecordsV2Input,
  reqListWorkItemStayTimesInput,
  reqListQueryIssuesInput,
  reqListWorkItemsV3Input,
  reqListWorkItemsV4Input,
  reqListWorkItemsInput,
  reqQuickCreateChildWorkItemInput,
  reqFindIterationsInput,
  reqListRrHistoriesInput,
  reqListRrsInput,
  reqListRrStatusesInput,
  reqSearchMyWorkItemsInput,
  reqSearchTodoWorkItemsInput,
  reqUpdatePlanInput,
  reqUpdateReleasePlanInput,
  reqUpdateCurrentUserNicknameInput,
  reqUpdateIssueV3Input,
  reqUpdateIpdChangeReviewFormInput,
  reqUpdateIpdFeatureSetInput,
  reqUpdateIpdLabelInput,
  reqUpdateIpdModuleInput,
  reqUpdateIpdProcessInstanceInput,
  reqUpdateIpdProjectFieldInput,
  reqUpdateIpdTenantFieldInput,
  reqUpdateIpdWorkHourInput,
  reqUpdatePlanImageInput,
  reqUpdateIterationInput,
  reqUpdateIterationStateInput,
  reqUpdateVersionV2Input,
  reqUpdateCacheDataInput,
  reqUpdateCacheSettingInput,
  reqUpdateProjectModuleInput,
  reqUpdateProjectTemplateInput,
  reqUpdateProjectMemberRoleInput,
  reqUpdateProjectDomainInput,
  reqUpdateProjectInput,
  reqUpdateTrackerConfigInput,
  reqTransferIpdWorkItemFlowInput,
  reqUpdateWorkItemCommentInput,
  reqUpdateWorkItemFlowInput,
  reqUpdateWorkItemInput,
  reqUpdateWorkingHoursInput,
  reqUploadAttachmentV3Input,
  reqUploadAttachmentInput,
  reqUploadIpdIssueAttachmentInput,
  reqUploadIpdIssueImageInput,
  reqWatchWorkItemInput,
  reqUploadWorkItemImageV2Input,
  reqUploadWorkItemImageInput,
  reqValidateModuleNameInput,
  reqValidateProjectTemplateNameInput
} from "../products/req/schemas.js";
import { createReqAddIterationWorkItemsHandler } from "../products/req/tools/add-iteration-work-items.js";
import { createReqAddPlanWorkItemsHandler } from "../products/req/tools/add-plan-work-items.js";
import { createReqAddWorkItemCommentHandler } from "../products/req/tools/add-work-item-comment.js";
import { createReqAddWorkItemWorkHourHandler } from "../products/req/tools/add-work-item-work-hour.js";
import { createReqAddProjectMemberHandler } from "../products/req/tools/add-project-member.js";
import { createReqApplyJoinProjectForAgcHandler } from "../products/req/tools/apply-join-project-for-agc.js";
import { createReqBatchAddProjectMembersHandler } from "../products/req/tools/batch-add-project-members.js";
import { createReqBatchCreateTrackerConfigHandler } from "../products/req/tools/batch-create-tracker-config.js";
import { createReqBatchDeleteReleasePlansHandler } from "../products/req/tools/batch-delete-release-plans.js";
import { createReqBatchDeleteProjectMembersHandler } from "../products/req/tools/batch-delete-project-members.js";
import { createReqBatchDeleteIterationsHandler } from "../products/req/tools/batch-delete-iterations.js";
import { createReqBatchDeleteWorkItemsHandler } from "../products/req/tools/batch-delete-work-items.js";
import { createReqBatchDeleteWorkItemsV2TokenHandler } from "../products/req/tools/batch-delete-work-items-v2-token.js";
import { createReqBatchUpdateChildUserNicknamesHandler } from "../products/req/tools/batch-update-child-user-nicknames.js";
import { createReqBatchUpdateReleasePlanBaselineHandler } from "../products/req/tools/batch-update-release-plan-baseline.js";
import { createReqChangeReleasePlanStatusHandler } from "../products/req/tools/change-release-plan-status.js";
import { createReqCopyWorkItemsHandler } from "../products/req/tools/copy-work-items.js";
import { createReqCheckProjectNameHandler } from "../products/req/tools/check-project-name.js";
import { createReqCheckWorkItemStatusNameHandler } from "../products/req/tools/check-work-item-status-name.js";
import { createReqClearPlanWorkItemsHandler } from "../products/req/tools/clear-plan-work-items.js";
import { createReqCreatePlanHandler } from "../products/req/tools/create-plan.js";
import { createReqCreatePlanWorkItemHandler } from "../products/req/tools/create-plan-work-item.js";
import { createReqCreateReleasePlanHandler } from "../products/req/tools/create-release-plan.js";
import { createReqCreateIterationHandler } from "../products/req/tools/create-iteration.js";
import { createReqCreateIterationWorkItemHandler } from "../products/req/tools/create-iteration-work-item.js";
import { createReqCreateVersionV2Handler } from "../products/req/tools/create-version-v2.js";
import { createReqCreateProjectHandler } from "../products/req/tools/create-project.js";
import { createReqCreateProjectDomainHandler } from "../products/req/tools/create-project-domain.js";
import { createReqCreateProjectModuleHandler } from "../products/req/tools/create-project-module.js";
import { createReqCreateProjectStatusConfigHandler } from "../products/req/tools/create-project-status-config.js";
import { createReqCreateWorkItemCustomFieldHandler } from "../products/req/tools/create-work-item-custom-field.js";
import { createReqCreateSystemWorkItemV4Handler } from "../products/req/tools/create-system-work-item-v4.js";
import { createReqCancelProjectDomainHandler } from "../products/req/tools/cancel-project-domain.js";
import { createReqDeleteAttachmentHandler } from "../products/req/tools/delete-attachment.js";
import { createReqDeletePlanHandler } from "../products/req/tools/delete-plan.js";
import { createReqDeleteProjectHandler } from "../products/req/tools/delete-project.js";
import { createReqDeleteIterationHandler } from "../products/req/tools/delete-iteration.js";
import { createReqDeleteProjectModuleHandler } from "../products/req/tools/delete-project-module.js";
import { createReqDeleteProjectTemplateHandler } from "../products/req/tools/delete-project-template.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqCreateEpicIssueHandler } from "../products/req/tools/create-epic-issue.js";
import { createReqCreateWorkItemV2Handler } from "../products/req/tools/create-work-item-v2.js";
import { createReqDeleteWorkItemHandler } from "../products/req/tools/delete-work-item.js";
import { createReqDeleteWorkItemV3Handler } from "../products/req/tools/delete-work-item-v3.js";
import { createReqDownloadAttachmentHandler } from "../products/req/tools/download-attachment.js";
import { createReqDownloadImageFileHandler } from "../products/req/tools/download-image-file.js";
import { createReqExportWorkItemsNewV2Handler } from "../products/req/tools/export-work-items-new-v2.js";
import { createReqBatchUpdateWorkItemsHandler } from "../products/req/tools/batch-update-work-items.js";
import { createReqBatchUpdateWorkItemsV2TokenHandler } from "../products/req/tools/batch-update-work-items-v2-token.js";
import { createReqCountWorkItemTreeHandler } from "../products/req/tools/count-work-item-tree.js";
import { createReqCreateWorkItemTemplateHandler } from "../products/req/tools/create-work-item-template.js";
import { createReqGetCurrentUserInfoHandler } from "../products/req/tools/get-current-user-info.js";
import { createReqGetCurrentUserRoleHandler } from "../products/req/tools/get-current-user-role.js";
import { createReqGetIrHandler } from "../products/req/tools/get-ir.js";
import { createReqGetIterationHandler } from "../products/req/tools/get-iteration.js";
import { createReqGetPlanHandler } from "../products/req/tools/get-plan.js";
import { createReqGetReleasePlanHandler } from "../products/req/tools/get-release-plan.js";
import { createReqGetProjectBugDensityHandler } from "../products/req/tools/get-project-bug-density.js";
import { createReqGetProjectBugsPerDeveloperHandler } from "../products/req/tools/get-project-bugs-per-developer.js";
import { createReqGetProjectCompletionRateHandler } from "../products/req/tools/get-project-completion-rate.js";
import { createReqGetProjectDueDaysAfterHandler } from "../products/req/tools/get-project-due-days-after.js";
import { createReqGetProjectPublicConfigHandler } from "../products/req/tools/get-project-public-config.js";
import { createReqGetProjectHandler } from "../products/req/tools/get-project.js";
import { createReqGetProjectSummaryHandler } from "../products/req/tools/get-project-summary.js";
import { createReqGetProjectWorkhourConfigHandler } from "../products/req/tools/get-project-workhour-config.js";
import { createReqGetWorkHourPermissionHandler } from "../products/req/tools/get-work-hour-permission.js";
import { createReqGetVersionDetailV2Handler } from "../products/req/tools/get-version-detail-v2.js";
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqGetWorkItemCompletionRateHandler } from "../products/req/tools/get-work-item-completion-rate.js";
import { createReqGetWorkItemIssueDetailsHandler } from "../products/req/tools/get-work-item-issue-details.js";
import { createReqGetWorkItemIndexCountsHandler } from "../products/req/tools/get-work-item-index-counts.js";
import { createReqLeaveProjectHandler } from "../products/req/tools/leave-project.js";
import { createReqListAssociatedCommitsHandler } from "../products/req/tools/list-associated-commits.js";
import { createReqListAssociatedIssuesHandler, createReqListAssociatedIssuesV4Handler } from "../products/req/tools/list-associated-issues.js";
import { createReqListAssociatedTestCasesHandler } from "../products/req/tools/list-associated-test-cases.js";
import { createReqListAssociatedWikisHandler } from "../products/req/tools/list-associated-wikis.js";
import { createReqListBoardWorkItemStatusRecordsHandler } from "../products/req/tools/list-board-work-item-status-records.js";
import { createReqListBoardWorkItemWorkflowConfigHandler } from "../products/req/tools/list-board-work-item-workflow-config.js";
import { createReqListBoardWorkItemsHandler } from "../products/req/tools/list-board-work-items.js";
import { createReqListCacheDataHandler } from "../products/req/tools/list-cache-data.js";
import { createReqListChildWorkItemsHandler } from "../products/req/tools/list-child-work-items.js";
import { createReqListIterationsHandler } from "../products/req/tools/list-iterations.js";
import { createReqListIterationWorkItemsHandler } from "../products/req/tools/list-iteration-work-items.js";
import { createReqListIterationStatusStatisticsHandler } from "../products/req/tools/list-iteration-status-statistics.js";
import { createReqListIrChildrenHandler } from "../products/req/tools/list-ir-children.js";
import { createReqListIrHistoriesHandler } from "../products/req/tools/list-ir-histories.js";
import { createReqListIssueSeveritiesHandler } from "../products/req/tools/list-issue-severities.js";
import { createReqListJobCacheBoardsHandler } from "../products/req/tools/list-job-cache-boards.js";
import { createReqListOptionalWorkItemStatusConfigsHandler } from "../products/req/tools/list-optional-work-item-status-configs.js";
import { createReqListPlanAddableWorkItemsHandler } from "../products/req/tools/list-plan-addable-work-items.js";
import { createReqListPlanWorkItemsHandler } from "../products/req/tools/list-plan-work-items.js";
import { createReqListPlansHandler } from "../products/req/tools/list-plans.js";
import { createReqListParentWorkItemsHandler } from "../products/req/tools/list-parent-work-items.js";
import { createReqListReleasePlansHandler } from "../products/req/tools/list-release-plans.js";
import { createReqListProgramFieldsHandler } from "../products/req/tools/list-program-fields.js";
import { createReqListProgramsHandler } from "../products/req/tools/list-programs.js";
import { createReqListProjectBugStatisticsHandler } from "../products/req/tools/list-project-bug-statistics.js";
import { createReqListProjectDemandStatisticsHandler } from "../products/req/tools/list-project-demand-statistics.js";
import { createReqListProjectDomainsHandler } from "../products/req/tools/list-project-domains.js";
import { createReqListProjectVersionsHandler } from "../products/req/tools/list-project-versions.js";
import { createReqListUserFeaturesHandler } from "../products/req/tools/list-user-features.js";
import { createReqListProjectWorkHourTypesHandler } from "../products/req/tools/list-project-work-hour-types.js";
import { createReqListProjectUserWorkHoursHandler, createReqListProjectWorkHoursHandler } from "../products/req/tools/list-project-work-hours.js";
import { createReqListProjectMemberWorkHoursHandler } from "../products/req/tools/list-project-member-work-hours.js";
import { createReqListProjectWorkItemRecordsHandler } from "../products/req/tools/list-project-work-item-records.js";
import { createReqListNotAddedProjectsHandler } from "../products/req/tools/list-not-added-projects.js";
import { createReqListProjectModulesHandler } from "../products/req/tools/list-project-modules.js";
import { createReqListDevucProjectMembersHandler, createReqListProjectMembersHandler } from "../products/req/tools/list-project-members.js";
import { createReqListProjectsHandler } from "../products/req/tools/list-projects.js";
import { createReqListRelatedUsersHandler } from "../products/req/tools/list-related-users.js";
import { createReqListWorkItemCustomFieldsHandler } from "../products/req/tools/list-work-item-custom-fields.js";
import { createReqListWorkItemCommentsHandler } from "../products/req/tools/list-work-item-comments.js";
import { createReqListWorkItemStatusAttributesHandler } from "../products/req/tools/list-work-item-status-attributes.js";
import { createReqListWorkItemStatusConfigsHandler } from "../products/req/tools/list-work-item-status-configs.js";
import { createReqListWorkItemStatusDetailsHandler } from "../products/req/tools/list-work-item-status-details.js";
import { createReqGetWorkItemStatusRuleFlagHandler } from "../products/req/tools/get-work-item-status-rule-flag.js";
import { createReqListWorkItemStatusesHandler } from "../products/req/tools/list-work-item-statuses.js";
import { createReqListWorkItemTagsHandler } from "../products/req/tools/list-work-item-tags.js";
import { createReqListWorkItemTreeHandler } from "../products/req/tools/list-work-item-tree.js";
import { createReqGetWorkItemTemplateConfigHandler } from "../products/req/tools/get-work-item-template-config.js";
import { createReqListWorkItemTrackerHandlersHandler } from "../products/req/tools/list-work-item-tracker-handlers.js";
import { createReqListWorkItemTemplatesHandler } from "../products/req/tools/list-work-item-templates.js";
import { createReqListWorkItemWorkflowConfigHandler } from "../products/req/tools/list-work-item-workflow-config.js";
import { createReqListWorkItemRecordsHandler } from "../products/req/tools/list-work-item-records.js";
import { createReqListWorkItemStayTimesHandler } from "../products/req/tools/list-work-item-stay-times.js";
import { createReqListWorkItemWorkHoursHandler } from "../products/req/tools/list-work-item-work-hours.js";
import {
  createReqListAssociatedCodeV2Handler,
  createReqListAssociatedWikisV5Handler,
  createReqListChildWorkItemsDirectV4Handler,
  createReqListChildWorkItemsV4Handler,
  createReqListModuleSettingsV2Handler,
  createReqListProjectDomainsV2Handler,
  createReqListProjectWorkHourTypesV5Handler,
  createReqListWorkItemAssignedStatusConfigsHandler,
  createReqListWorkItemCommentsV2Handler,
  createReqListWorkItemCustomFieldsV4Handler,
  createReqListWorkItemQueriesHandler,
  createReqListWorkItemRecordsV2Handler,
  createReqQueryScrumVersionWorkItemsV2Handler,
  createReqListWorkSettingTemplatesV2Handler
} from "../products/req/tools/official-v2-read-tools.js";
import { createReqFindIterationsHandler } from "../products/req/tools/find-iterations.js";
import { createReqListQueryIssuesHandler, createReqListWorkItemsHandler, createReqListWorkItemsV3Handler, createReqListWorkItemsV4Handler } from "../products/req/tools/list-work-items.js";
import { createReqListRrHistoriesHandler } from "../products/req/tools/list-rr-histories.js";
import { createReqListRrStatusesHandler } from "../products/req/tools/list-rr-statuses.js";
import { createReqListRrsHandler } from "../products/req/tools/list-rrs.js";
import { createReqQueryIterationImmovableIssuesHandler } from "../products/req/tools/query-iteration-immovable-issues.js";
import { createReqSearchMyWorkItemsHandler } from "../products/req/tools/search-my-work-items.js";
import { createReqSearchTodoWorkItemsHandler } from "../products/req/tools/search-todo-work-items.js";
import { createReqUpdatePlanHandler } from "../products/req/tools/update-plan.js";
import { createReqUpdateCurrentUserNicknameHandler } from "../products/req/tools/update-current-user-nickname.js";
import { createReqUpdateIssueV3Handler } from "../products/req/tools/update-issue-v3.js";
import { createReqUpdatePlanImageHandler } from "../products/req/tools/update-plan-image.js";
import { createReqUpdateReleasePlanHandler } from "../products/req/tools/update-release-plan.js";
import { createReqUpdateIterationHandler } from "../products/req/tools/update-iteration.js";
import { createReqUpdateIterationStateHandler } from "../products/req/tools/update-iteration-state.js";
import { createReqUpdateCacheDataHandler } from "../products/req/tools/update-cache-data.js";
import { createReqUpdateCacheSettingHandler } from "../products/req/tools/update-cache-setting.js";
import { createReqUpdateProjectDomainHandler } from "../products/req/tools/update-project-domain.js";
import { createReqUpdateProjectModuleHandler } from "../products/req/tools/update-project-module.js";
import { createReqUpdateProjectTemplateHandler } from "../products/req/tools/update-project-template.js";
import { createReqUpdateProjectMemberRoleHandler } from "../products/req/tools/update-project-member-role.js";
import { createReqUpdateProjectHandler } from "../products/req/tools/update-project.js";
import { createReqUpdateTrackerConfigHandler } from "../products/req/tools/update-tracker-config.js";
import { createReqUpdateWorkItemCommentHandler } from "../products/req/tools/update-work-item-comment.js";
import { createReqUpdateWorkItemFlowHandler } from "../products/req/tools/update-work-item-flow.js";
import { createReqUpdateWorkItemHandler } from "../products/req/tools/update-work-item.js";
import { createReqUpdateWorkingHoursHandler } from "../products/req/tools/update-working-hours.js";
import { createReqWatchWorkItemHandler } from "../products/req/tools/watch-work-item.js";
import { createReqDeleteVersionV2Handler, createReqUpdateVersionV2Handler } from "../products/req/tools/version-v2-token-tools.js";
import {
  createReqCreateWorkItemWithAttachmentV3Handler,
  createReqUploadAttachmentV3Handler,
  createReqUploadWorkItemImageV2Handler
} from "../products/req/tools/token-upload-tools.js";
import { createReqUploadAttachmentHandler } from "../products/req/tools/upload-attachment.js";
import { createReqUploadIssuesImgHandler } from "../products/req/tools/upload-issues-img.js";
import { createReqUploadWorkItemImageHandler } from "../products/req/tools/upload-work-item-image.js";
import { createReqQuickCreateChildWorkItemHandler } from "../products/req/tools/quick-create-child-work-item.js";
import { createReqValidateModuleNameHandler } from "../products/req/tools/validate-module-name.js";
import { createReqValidateProjectTemplateNameHandler } from "../products/req/tools/validate-project-template-name.js";
import {
  createReqDownloadIpdIssueAttachmentHandler,
  createReqDownloadIpdIssueImageHandler,
  createReqGetIpdE2EGraphHandler,
  createReqGetIpdIssueHandler,
  createReqGetIpdProcessInstanceHandler,
  createReqGetIpdProjectFieldOptionUsedHandler,
  createReqGetIpdReviewFormHandler,
  createReqGetIpdStatisticDashboardHandler,
  createReqGetIpdTenantFieldOptionUsedHandler,
  createReqGetIpdTenantFieldUsedHandler,
  createReqGetIpdWorkItemFlowDetailHandler,
  createReqGroupIpdIssuesHandler,
  createReqListIpdAttachedWikisHandler,
  createReqListIpdCategoryStatusesHandler,
  createReqListIpdChangeReviewIssueApproversHandler,
  createReqListIpdFeatureSetsHandler,
  createReqListIpdIssueAttachmentsHandler,
  createReqListIpdIssueTreeHandler,
  createReqListIpdProcessInstancesHandler,
  createReqListIpdReviewFormsHandler,
  createReqListIpdReviewRoleUsersHandler,
  createReqListIpdWorkHourCategoriesHandler,
  createReqListIpdWorkHoursHandler,
  createReqListIpdIssueFieldsHandler,
  createReqListIpdIssueRelationConfigHandler,
  createReqListIpdIssuesHandler,
  createReqListIpdLabelsHandler,
  createReqListIpdModulesHandler,
  createReqListIpdProjectFieldsHandler,
  createReqListIpdProjectUsersHandler,
  createReqListIpdProjectsHandler,
  createReqListIpdSnapshotFeaturesHandler,
  createReqListIpdSnapshotVersionsHandler,
  createReqListIpdStatusesHandler,
  createReqListIpdTenantFieldsHandler,
  createReqListIpdTenantIssuesHandler,
  createReqListIpdWorkflowFieldsHandler,
  createReqListIpdWorkflowTemplatesHandler
} from "../products/req/tools/ipd-read-tools.js";
import {
  createReqBatchCreateIpdIssuesHandler,
  createReqBatchDeleteIpdIssuesHandler,
  createReqBatchTransferIpdWorkItemFlowHandler,
  createReqBatchUpdateIpdIssuesHandler,
  createReqCreateIpdChangeReviewFormHandler,
  createReqCreateIpdIssueHandler,
  createReqCreateIpdFeatureSetHandler,
  createReqCreateIpdLabelHandler,
  createReqCreateIpdModuleHandler,
  createReqCreateIpdProcessInstanceHandler,
  createReqCreateIpdWorkHourHandler,
  createReqDeleteIpdChangeReviewFormHandler,
  createReqDeleteIpdFeatureSetHandler,
  createReqDeleteIpdIssueImageHandler,
  createReqDeleteIpdLabelHandler,
  createReqDeleteIpdModuleHandler,
  createReqDeleteIpdProcessInstanceHandler,
  createReqDeleteIpdWorkHourHandler,
  createReqTransferIpdWorkItemFlowHandler,
  createReqUpdateIpdChangeReviewFormHandler,
  createReqUpdateIpdFeatureSetHandler,
  createReqUpdateIpdLabelHandler,
  createReqUpdateIpdModuleHandler,
  createReqUpdateIpdProcessInstanceHandler,
  createReqUpdateIpdProjectFieldHandler,
  createReqUpdateIpdTenantFieldHandler,
  createReqUpdateIpdWorkHourHandler,
  createReqUploadIpdIssueAttachmentHandler,
  createReqUploadIpdIssueImageHandler
} from "../products/req/tools/ipd-write-tools.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type ReqStdioClient = ReturnType<typeof createReqClient>;

const reqToolDefinitions = {
  "req_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Req API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.reqClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "req_add_iteration_work_items": defineProductTool({
    description: "Add work items to a CodeArts Req iteration",
    inputSchema: reqAddIterationWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddIterationWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqAddIterationWorkItemsHandler,
    rateLimitAction: "req_add_iteration_work_items"
  }),
  "req_add_plan_work_items": defineProductTool({
    description: "Add work items to a CodeArts Req plan",
    inputSchema: reqAddPlanWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddPlanWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqAddPlanWorkItemsHandler,
    rateLimitAction: "req_add_plan_work_items"
  }),
  "req_add_project_member": defineProductTool({
    description: "Add member to a CodeArts Req project",
    inputSchema: reqAddProjectMemberInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddProjectMemberHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqAddProjectMemberHandler,
    rateLimitAction: "req_add_project_member"
  }),
  "req_add_member_v4": defineProductTool({
    description: "Add member to a CodeArts Req project through the official V4 endpoint",
    inputSchema: reqAddProjectMemberInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddProjectMemberHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqAddProjectMemberHandler,
    rateLimitAction: "req_add_member_v4"
  }),
  "req_apply_join_project_for_agc": defineProductTool({
    description: "Apply to join a CodeArts Req project through the AGC token-header endpoint",
    inputSchema: reqApplyJoinProjectForAgcInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqApplyJoinProjectForAgcHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqApplyJoinProjectForAgcHandler,
    rateLimitAction: "req_apply_join_project_for_agc"
  }),
  "req_add_apply_join_project_for_agc": defineProductTool({
    description: "Apply to join a CodeArts Req project through the official AGC endpoint",
    inputSchema: reqApplyJoinProjectForAgcInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqApplyJoinProjectForAgcHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqApplyJoinProjectForAgcHandler,
    rateLimitAction: "req_add_apply_join_project_for_agc"
  }),
  "req_batch_add_project_members": defineProductTool({
    description: "Add multiple members to a CodeArts Req project",
    inputSchema: reqBatchAddProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchAddProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchAddProjectMembersHandler,
    rateLimitAction: "req_batch_add_project_members"
  }),
  "req_batch_add_members_v4": defineProductTool({
    description: "Add multiple members to a CodeArts Req project through the official V4 endpoint",
    inputSchema: reqBatchAddProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchAddProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchAddProjectMembersHandler,
    rateLimitAction: "req_batch_add_members_v4"
  }),
  "req_batch_create_tracker_config": defineProductTool({
    description: "Bind custom work item statuses to a CodeArts Req tracker",
    inputSchema: reqBatchCreateTrackerConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchCreateTrackerConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchCreateTrackerConfigHandler,
    rateLimitAction: "req_batch_create_tracker_config"
  }),
  "req_batch_delete_project_members": defineProductTool({
    description: "Remove multiple members from a CodeArts Req project",
    inputSchema: reqBatchDeleteProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteProjectMembersHandler,
    rateLimitAction: "req_batch_delete_project_members"
  }),
  "req_batch_delete_members_v4": defineProductTool({
    description: "Remove multiple members from a CodeArts Req project through the official V4 endpoint",
    inputSchema: reqBatchDeleteProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteProjectMembersHandler,
    rateLimitAction: "req_batch_delete_members_v4"
  }),
  "req_batch_delete_iterations": defineProductTool({
    description: "Delete multiple CodeArts Req iterations",
    inputSchema: reqBatchDeleteIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteIterationsHandler,
    rateLimitAction: "req_batch_delete_iterations"
  }),
  "req_batch_delete_iterations_v4": defineProductTool({
    description: "Delete multiple CodeArts Req iterations through the official V4 endpoint",
    inputSchema: reqBatchDeleteIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteIterationsHandler,
    rateLimitAction: "req_batch_delete_iterations_v4"
  }),
  "req_batch_delete_work_items": defineProductTool({
    description: "Delete multiple CodeArts Req work items",
    inputSchema: reqBatchDeleteWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchDeleteWorkItemsHandler,
    rateLimitAction: "req_batch_delete_work_items"
  }),
  "req_batch_delete_work_items_v2_token": defineProductTool({
    description: "Batch delete CodeArts Req work items through the official V2 token-header endpoint",
    inputSchema: reqBatchDeleteWorkItemsV2TokenInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqBatchDeleteWorkItemsV2TokenHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteWorkItemsV2TokenHandler,
    rateLimitAction: "req_batch_delete_work_items_v2_token"
  }),
  "req_batch_create_ipd_issues": defineProductTool({
    description: "Batch create CodeArts Req IPD issues",
    inputSchema: reqBatchCreateIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchCreateIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchCreateIpdIssuesHandler,
    rateLimitAction: "req_batch_create_ipd_issues"
  }),
  "req_batch_update_ipd_issues": defineProductTool({
    description: "Batch update CodeArts Req IPD issues",
    inputSchema: reqBatchUpdateIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchUpdateIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchUpdateIpdIssuesHandler,
    rateLimitAction: "req_batch_update_ipd_issues"
  }),
  "req_batch_update_child_user_nicknames": defineProductTool({
    description: "Batch update CodeArts Req child user nicknames from the official V4 domain endpoint",
    inputSchema: reqBatchUpdateChildUserNicknamesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqBatchUpdateChildUserNicknamesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateChildUserNicknamesHandler,
    rateLimitAction: "req_batch_update_child_user_nicknames"
  }),
  "req_batch_update_child_nick_names": defineProductTool({
    description: "Batch update CodeArts Req child nick names through the official endpoint",
    inputSchema: reqBatchUpdateChildUserNicknamesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqBatchUpdateChildUserNicknamesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateChildUserNicknamesHandler,
    rateLimitAction: "req_batch_update_child_nick_names"
  }),
  "req_batch_delete_ipd_issues": defineProductTool({
    description: "Batch delete CodeArts Req IPD issues",
    inputSchema: reqBatchDeleteIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchDeleteIpdIssuesHandler,
    rateLimitAction: "req_batch_delete_ipd_issues"
  }),
  "req_check_work_item_status_name": defineProductTool({
    description: "Check whether a CodeArts Req work item status name already exists",
    inputSchema: reqCheckWorkItemStatusNameInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCheckWorkItemStatusNameHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCheckWorkItemStatusNameHandler
  }),
  "req_delete_attachment": defineProductTool({
    description: "Delete a CodeArts Req work item attachment",
    inputSchema: reqDeleteAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteAttachmentHandler,
    rateLimitAction: "req_delete_attachment"
  }),
  "req_download_attachment": defineProductTool({
    description: "Download a CodeArts Req work item attachment",
    inputSchema: reqDownloadAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDownloadAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDownloadAttachmentHandler
  }),
  "req_export_work_items_new_v2": defineProductTool({
    description: "Export CodeArts Req work items through the official V2 export endpoint",
    inputSchema: reqExportWorkItemsNewV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqExportWorkItemsNewV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqExportWorkItemsNewV2Handler
  }),
  "req_create_project": defineProductTool({
    description: "Create CodeArts Req project",
    inputSchema: reqCreateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateProjectHandler,
    rateLimitAction: "req_create_project"
  }),
  "req_create_project_v4": defineProductTool({
    description: "Create CodeArts Req project through the official V4 endpoint",
    inputSchema: reqCreateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateProjectHandler,
    rateLimitAction: "req_create_project_v4"
  }),
  "req_create_plan": defineProductTool({
    description: "Create CodeArts Req plan",
    inputSchema: reqCreatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreatePlanHandler,
    rateLimitAction: "req_create_plan"
  }),
  "req_create_scrum_plan_to_project": defineProductTool({
    description: "Create a CodeArts Req scrum plan through the official CreateScrumPlanToProject endpoint",
    inputSchema: reqCreatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreatePlanHandler,
    rateLimitAction: "req_create_scrum_plan_to_project"
  }),
  "req_create_release_plan": defineProductTool({
    description: "Create CodeArts Req release or iteration plan",
    inputSchema: reqCreateReleasePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateReleasePlanHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateReleasePlanHandler,
    rateLimitAction: "req_create_release_plan"
  }),
  "req_create_plan_work_item": defineProductTool({
    description: "Create CodeArts Req plan work item",
    inputSchema: reqCreatePlanWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreatePlanWorkItemHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreatePlanWorkItemHandler,
    rateLimitAction: "req_create_plan_work_item"
  }),
  "req_create_iteration": defineProductTool({
    description: "Create CodeArts Req iteration",
    inputSchema: reqCreateIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateIterationHandler,
    rateLimitAction: "req_create_iteration"
  }),
  "req_create_iteration_v4": defineProductTool({
    description: "Create CodeArts Req iteration through the official V4 endpoint",
    inputSchema: reqCreateIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateIterationHandler,
    rateLimitAction: "req_create_iteration_v4"
  }),
  "req_create_version_v2": defineProductTool({
    description: "Create CodeArts Req V2 version from the official V2 endpoint",
    inputSchema: reqCreateVersionV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateVersionV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateVersionV2Handler,
    rateLimitAction: "req_create_version_v2"
  }),
  "req_update_version_v2": defineProductTool({
    description: "Update CodeArts Req V2 version from the token-header endpoint",
    inputSchema: reqUpdateVersionV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateVersionV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateVersionV2Handler,
    rateLimitAction: "req_update_version_v2"
  }),
  "req_create_iteration_work_item": defineProductTool({
    description: "Create CodeArts Req iteration work item",
    inputSchema: reqCreateIterationWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIterationWorkItemHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIterationWorkItemHandler,
    rateLimitAction: "req_create_iteration_work_item"
  }),
  "req_create_project_module": defineProductTool({
    description: "Create CodeArts Req project module",
    inputSchema: reqCreateProjectModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateProjectModuleHandler,
    rateLimitAction: "req_create_project_module"
  }),
  "req_create_project_domain": defineProductTool({
    description: "Create CodeArts Req project domain",
    inputSchema: reqCreateProjectDomainInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectDomainHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateProjectDomainHandler,
    rateLimitAction: "req_create_project_domain"
  }),
  "req_create_project_status_config": defineProductTool({
    description: "Create a CodeArts Req custom project status",
    inputSchema: reqCreateProjectStatusConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectStatusConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateProjectStatusConfigHandler,
    rateLimitAction: "req_create_project_status_config"
  }),
  "req_create_work_item_custom_field": defineProductTool({
    description: "Create CodeArts Req work item custom field",
    inputSchema: reqCreateWorkItemCustomFieldInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateWorkItemCustomFieldHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemCustomFieldHandler,
    rateLimitAction: "req_create_work_item_custom_field"
  }),
  "req_create_customfields": defineProductTool({
    description: "Create CodeArts Req custom fields through the official CreateCustomfields endpoint",
    inputSchema: reqCreateWorkItemCustomFieldInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateWorkItemCustomFieldHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemCustomFieldHandler,
    rateLimitAction: "req_create_customfields"
  }),
  "req_update_project": defineProductTool({
    description: "Update CodeArts Req project",
    inputSchema: reqUpdateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectHandler,
    rateLimitAction: "req_update_project"
  }),
  "req_update_project_v4": defineProductTool({
    description: "Update CodeArts Req project through the official V4 endpoint",
    inputSchema: reqUpdateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectHandler,
    rateLimitAction: "req_update_project_v4"
  }),
  "req_update_plan": defineProductTool({
    description: "Update CodeArts Req plan",
    inputSchema: reqUpdatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdatePlanHandler,
    rateLimitAction: "req_update_plan"
  }),
  "req_update_scrum_plan_in_project": defineProductTool({
    description: "Update a CodeArts Req scrum plan through the official UpdateScrumPlanInProject endpoint",
    inputSchema: reqUpdatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdatePlanHandler,
    rateLimitAction: "req_update_scrum_plan_in_project"
  }),
  "req_update_release_plan": defineProductTool({
    description: "Update CodeArts Req release or iteration plan",
    inputSchema: reqUpdateReleasePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateReleasePlanHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateReleasePlanHandler,
    rateLimitAction: "req_update_release_plan"
  }),
  "req_batch_delete_release_plans": defineProductTool({
    description: "Batch delete CodeArts Req release or iteration plans",
    inputSchema: reqBatchDeleteReleasePlansInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteReleasePlansHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchDeleteReleasePlansHandler,
    rateLimitAction: "req_batch_delete_release_plans"
  }),
  "req_batch_update_release_plan_baseline": defineProductTool({
    description: "Batch update CodeArts Req release or iteration plan baseline",
    inputSchema: reqBatchUpdateReleasePlanBaselineInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqBatchUpdateReleasePlanBaselineHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateReleasePlanBaselineHandler,
    rateLimitAction: "req_batch_update_release_plan_baseline"
  }),
  "req_change_release_plan_status": defineProductTool({
    description: "Change CodeArts Req release or iteration plan status",
    inputSchema: reqChangeReleasePlanStatusInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqChangeReleasePlanStatusHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqChangeReleasePlanStatusHandler,
    rateLimitAction: "req_change_release_plan_status"
  }),
  "req_update_plan_image": defineProductTool({
    description: "Update image for a CodeArts Req plan",
    inputSchema: reqUpdatePlanImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdatePlanImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdatePlanImageHandler,
    rateLimitAction: "req_update_plan_image"
  }),
  "req_update_iteration": defineProductTool({
    description: "Update CodeArts Req iteration",
    inputSchema: reqUpdateIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateIterationHandler,
    rateLimitAction: "req_update_iteration"
  }),
  "req_update_iteration_v4": defineProductTool({
    description: "Update CodeArts Req iteration through the official V4 endpoint",
    inputSchema: reqUpdateIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateIterationHandler,
    rateLimitAction: "req_update_iteration_v4"
  }),
  "req_update_current_user_nickname": defineProductTool({
    description: "Update the current CodeArts Req user nickname through the token-header endpoint",
    inputSchema: reqUpdateCurrentUserNicknameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateCurrentUserNicknameHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateCurrentUserNicknameHandler,
    rateLimitAction: "req_update_current_user_nickname"
  }),
  "req_update_nick_name_v4": defineProductTool({
    description: "Update the current CodeArts Req user nick name through the official V4 endpoint",
    inputSchema: reqUpdateCurrentUserNicknameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateCurrentUserNicknameHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateCurrentUserNicknameHandler,
    rateLimitAction: "req_update_nick_name_v4"
  }),
  "req_update_project_module": defineProductTool({
    description: "Update CodeArts Req project module",
    inputSchema: reqUpdateProjectModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateProjectModuleHandler,
    rateLimitAction: "req_update_project_module"
  }),
  "req_update_project_domain": defineProductTool({
    description: "Update CodeArts Req project domain",
    inputSchema: reqUpdateProjectDomainInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectDomainHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateProjectDomainHandler,
    rateLimitAction: "req_update_project_domain"
  }),
  "req_update_tracker_config": defineProductTool({
    description: "Update a CodeArts Req tracker status config position",
    inputSchema: reqUpdateTrackerConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateTrackerConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateTrackerConfigHandler,
    rateLimitAction: "req_update_tracker_config"
  }),
  "req_update_project_template": defineProductTool({
    description: "Update a CodeArts Req project template",
    inputSchema: reqUpdateProjectTemplateInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectTemplateHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateProjectTemplateHandler,
    rateLimitAction: "req_update_project_template"
  }),
  "req_delete_project": defineProductTool({
    description: "Delete CodeArts Req project",
    inputSchema: reqDeleteProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteProjectHandler,
    rateLimitAction: "req_delete_project"
  }),
  "req_delete_project_v4": defineProductTool({
    description: "Delete CodeArts Req project through the official V4 endpoint",
    inputSchema: reqDeleteProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteProjectHandler,
    rateLimitAction: "req_delete_project_v4"
  }),
  "req_delete_plan": defineProductTool({
    description: "Delete CodeArts Req plan",
    inputSchema: reqDeletePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeletePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeletePlanHandler,
    rateLimitAction: "req_delete_plan"
  }),
  "req_delete_scrum_plan_in_project": defineProductTool({
    description: "Delete a CodeArts Req scrum plan through the official DeleteScrumPlanInProject endpoint",
    inputSchema: reqDeletePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeletePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeletePlanHandler,
    rateLimitAction: "req_delete_scrum_plan_in_project"
  }),
  "req_delete_iteration": defineProductTool({
    description: "Delete CodeArts Req iteration",
    inputSchema: reqDeleteIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteIterationHandler,
    rateLimitAction: "req_delete_iteration"
  }),
  "req_delete_iteration_v4": defineProductTool({
    description: "Delete CodeArts Req iteration through the official V4 endpoint",
    inputSchema: reqDeleteIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteIterationHandler,
    rateLimitAction: "req_delete_iteration_v4"
  }),
  "req_delete_version_v2": defineProductTool({
    description: "Delete CodeArts Req V2 version from the token-header endpoint",
    inputSchema: reqDeleteVersionV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteVersionV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteVersionV2Handler,
    rateLimitAction: "req_delete_version_v2"
  }),
  "req_delete_project_module": defineProductTool({
    description: "Delete CodeArts Req project module",
    inputSchema: reqDeleteProjectModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteProjectModuleHandler,
    rateLimitAction: "req_delete_project_module"
  }),
  "req_cancel_project_domain": defineProductTool({
    description: "Cancel a CodeArts Req project domain association",
    inputSchema: reqCancelProjectDomainInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCancelProjectDomainHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCancelProjectDomainHandler,
    rateLimitAction: "req_cancel_project_domain"
  }),
  "req_delete_project_template": defineProductTool({
    description: "Delete a CodeArts Req project template",
    inputSchema: reqDeleteProjectTemplateInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectTemplateHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteProjectTemplateHandler,
    rateLimitAction: "req_delete_project_template"
  }),
  "req_check_project_name": defineProductTool({
    description: "Check whether a CodeArts Req project name exists",
    inputSchema: reqCheckProjectNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCheckProjectNameHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCheckProjectNameHandler
  }),
  "req_check_project_name_v4": defineProductTool({
    description: "Check whether a CodeArts Req project name exists through the official V4 endpoint",
    inputSchema: reqCheckProjectNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCheckProjectNameHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCheckProjectNameHandler
  }),
  "req_clear_plan_work_items": defineProductTool({
    description: "Clear work items from a CodeArts Req plan",
    inputSchema: reqClearPlanWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqClearPlanWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqClearPlanWorkItemsHandler,
    rateLimitAction: "req_clear_plan_work_items"
  }),
  "req_count_work_item_tree": defineProductTool({
    description: "Count CodeArts Req work items in tree mode",
    inputSchema: reqCountWorkItemTreeInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCountWorkItemTreeHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCountWorkItemTreeHandler
  }),
  "req_copy_work_items": defineProductTool({
    description: "Copy CodeArts Req work items between projects",
    inputSchema: reqCopyWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCopyWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCopyWorkItemsHandler,
    rateLimitAction: "req_copy_work_items"
  }),
  "req_create_work_item_template": defineProductTool({
    description: "Create or update a CodeArts Req work item template",
    inputSchema: reqCreateWorkItemTemplateInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateWorkItemTemplateHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemTemplateHandler,
    rateLimitAction: "req_create_work_item_template"
  }),
  "req_list_not_added_projects": defineProductTool({
    description: "List CodeArts Req projects not yet added to the current domain",
    inputSchema: reqListNotAddedProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListNotAddedProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListNotAddedProjectsHandler
  }),
  "req_list_domain_not_added_projects_v4": defineProductTool({
    description: "List CodeArts Req projects not yet added to the current domain through the official V4 endpoint",
    inputSchema: reqListNotAddedProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListNotAddedProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListNotAddedProjectsHandler
  }),
  "req_list_projects": defineProductTool({
    description: "List CodeArts Req projects",
    inputSchema: reqListProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectsHandler
  }),
  "req_list_projects_v4": defineProductTool({
    description: "List CodeArts Req projects through the official V4 endpoint",
    inputSchema: reqListProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectsHandler
  }),
  "req_get_current_user_info": defineProductTool({
    description: "Get current CodeArts Req user info",
    inputSchema: reqGetCurrentUserInfoInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetCurrentUserInfoHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetCurrentUserInfoHandler
  }),
  "req_show_cur_user_info": defineProductTool({
    description: "Show current CodeArts Req user info through the official endpoint",
    inputSchema: reqGetCurrentUserInfoInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetCurrentUserInfoHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetCurrentUserInfoHandler
  }),
  "req_get_current_user_role": defineProductTool({
    description: "Get current CodeArts Req user role in a project",
    inputSchema: reqGetCurrentUserRoleInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetCurrentUserRoleHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetCurrentUserRoleHandler
  }),
  "req_show_cur_user_role": defineProductTool({
    description: "Show current CodeArts Req user role in a project through the official endpoint",
    inputSchema: reqGetCurrentUserRoleInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetCurrentUserRoleHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetCurrentUserRoleHandler
  }),
  "req_get_ir": defineProductTool({
    description: "Get a CodeArts Req requirement pool IR detail",
    inputSchema: reqGetIrInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIrHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetIrHandler
  }),
  "req_get_ipd_issue": defineProductTool({
    description: "Get CodeArts Req IPD issue detail",
    inputSchema: reqGetIpdIssueInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdIssueHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdIssueHandler
  }),
  "req_get_project": defineProductTool({
    description: "Get CodeArts Req project detail",
    inputSchema: reqGetProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetProjectHandler
  }),
  "req_show_project_info_v4": defineProductTool({
    description: "Show CodeArts Req project detail through the official V4 endpoint",
    inputSchema: reqGetProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetProjectHandler
  }),
  "req_get_project_bug_density": defineProductTool({
    description: "Get CodeArts Req project bug density metric",
    inputSchema: reqGetProjectBugDensityInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectBugDensityHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectBugDensityHandler
  }),
  "req_show_bug_density_v2": defineProductTool({
    description: "Show CodeArts Req project bug density metric through the official V2 endpoint",
    inputSchema: reqGetProjectBugDensityInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectBugDensityHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectBugDensityHandler
  }),
  "req_get_project_bugs_per_developer": defineProductTool({
    description: "Get CodeArts Req project bugs per developer metric",
    inputSchema: reqGetProjectBugsPerDeveloperInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectBugsPerDeveloperHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectBugsPerDeveloperHandler
  }),
  "req_show_bugs_per_developer": defineProductTool({
    description: "Show CodeArts Req project bugs per developer metric through the official endpoint",
    inputSchema: reqGetProjectBugsPerDeveloperInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectBugsPerDeveloperHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectBugsPerDeveloperHandler
  }),
  "req_get_project_completion_rate": defineProductTool({
    description: "Get CodeArts Req project completion rate metric",
    inputSchema: reqGetProjectCompletionRateInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectCompletionRateHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectCompletionRateHandler
  }),
  "req_show_completion_rate": defineProductTool({
    description: "Show CodeArts Req project completion rate metric through the official endpoint",
    inputSchema: reqGetProjectCompletionRateInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectCompletionRateHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectCompletionRateHandler
  }),
  "req_get_project_due_days_after": defineProductTool({
    description: "Get CodeArts Req project due-days-after config",
    inputSchema: reqGetProjectDueDaysAfterInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectDueDaysAfterHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectDueDaysAfterHandler
  }),
  "req_list_project_demand_statistics": defineProductTool({
    description: "List CodeArts Req project demand statistics",
    inputSchema: reqListProjectDemandStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectDemandStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectDemandStatisticsHandler
  }),
  "req_list_project_demand_static_v4": defineProductTool({
    description: "List CodeArts Req project demand statistics through the official V4 endpoint",
    inputSchema: reqListProjectDemandStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectDemandStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectDemandStatisticsHandler
  }),
  "req_list_project_domains": defineProductTool({
    description: "List CodeArts Req project domains",
    inputSchema: reqListProjectDomainsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectDomainsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectDomainsHandler
  }),
  "req_list_project_domains_v2": defineProductTool({
    description: "List CodeArts Req project domain settings from the official V2 endpoint",
    inputSchema: reqListProjectDomainsV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectDomainsV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectDomainsV2Handler
  }),
  "req_list_programs": defineProductTool({
    description: "List CodeArts Req project spaces / programs",
    inputSchema: reqListProgramsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProgramsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProgramsHandler
  }),
  "req_list_program_fields": defineProductTool({
    description: "List CodeArts Req program IR or RR fields",
    inputSchema: reqListProgramFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProgramFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProgramFieldsHandler
  }),
  "req_list_issue_severities": defineProductTool({
    description: "List CodeArts Req issue severities",
    inputSchema: reqListIssueSeveritiesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIssueSeveritiesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIssueSeveritiesHandler
  }),
  "req_show_scrum_issue_severities": defineProductTool({
    description: "List CodeArts Req issue severities through the official ShowScrumIssueSeverities endpoint",
    inputSchema: reqListIssueSeveritiesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIssueSeveritiesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIssueSeveritiesHandler
  }),
  "req_list_ipd_projects": defineProductTool({
    description: "List CodeArts Req IPD projects",
    inputSchema: reqListIpdProjectsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdProjectsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdProjectsHandler
  }),
  "req_list_ipd_project_users": defineProductTool({
    description: "List CodeArts Req IPD project users",
    inputSchema: reqListIpdProjectUsersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdProjectUsersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdProjectUsersHandler
  }),
  "req_list_ipd_change_review_issue_approvers": defineProductTool({
    description: "List CodeArts Req IPD change review approvers for an issue",
    inputSchema: reqListIpdChangeReviewIssueApproversInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdChangeReviewIssueApproversHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdChangeReviewIssueApproversHandler
  }),
  "req_list_ipd_issues": defineProductTool({
    description: "List CodeArts Req IPD issues",
    inputSchema: reqListIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssuesHandler
  }),
  "req_list_ipd_project_issues": defineProductTool({
    description: "List CodeArts Req IPD project issues through the official ListIpdProjectIssues endpoint",
    inputSchema: reqListIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssuesHandler
  }),
  "req_list_ipd_issue_tree": defineProductTool({
    description: "List CodeArts Req IPD issue tree",
    inputSchema: reqListIpdIssueTreeInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueTreeHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueTreeHandler
  }),
  "req_list_ipd_attached_wikis": defineProductTool({
    description: "List CodeArts Req IPD issue attached wikis",
    inputSchema: reqListIpdAttachedWikisInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdAttachedWikisHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdAttachedWikisHandler
  }),
  "req_list_ipd_review_forms": defineProductTool({
    description: "List CodeArts Req IPD review forms",
    inputSchema: reqListIpdReviewFormsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdReviewFormsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdReviewFormsHandler
  }),
  "req_get_ipd_review_form": defineProductTool({
    description: "Get a CodeArts Req IPD review form",
    inputSchema: reqGetIpdReviewFormInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdReviewFormHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdReviewFormHandler
  }),
  "req_get_ipd_process_instance": defineProductTool({
    description: "Get a CodeArts Req IPD process instance",
    inputSchema: reqGetIpdProcessInstanceInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdProcessInstanceHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdProcessInstanceHandler
  }),
  "req_list_ipd_process_instances": defineProductTool({
    description: "List CodeArts Req IPD process instances",
    inputSchema: reqListIpdProcessInstancesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdProcessInstancesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdProcessInstancesHandler
  }),
  "req_list_ipd_review_role_users": defineProductTool({
    description: "List CodeArts Req IPD review approver or reviewer role users",
    inputSchema: reqListIpdReviewRoleUsersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdReviewRoleUsersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdReviewRoleUsersHandler
  }),
  "req_group_ipd_issues": defineProductTool({
    description: "Group CodeArts Req IPD issues",
    inputSchema: reqGroupIpdIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGroupIpdIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGroupIpdIssuesHandler
  }),
  "req_list_ipd_tenant_issues": defineProductTool({
    description: "List CodeArts Req IPD tenant issues",
    inputSchema: reqListIpdTenantIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdTenantIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdTenantIssuesHandler
  }),
  "req_list_ipd_modules": defineProductTool({
    description: "List CodeArts Req IPD modules",
    inputSchema: reqListIpdModulesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdModulesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdModulesHandler
  }),
  "req_list_ipd_statuses": defineProductTool({
    description: "List CodeArts Req IPD statuses",
    inputSchema: reqListIpdStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdStatusesHandler
  }),
  "req_list_ipd_issue_relation_config": defineProductTool({
    description: "List CodeArts Req IPD issue relation config",
    inputSchema: reqListIpdIssueRelationConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueRelationConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueRelationConfigHandler
  }),
  "req_list_ipd_labels": defineProductTool({
    description: "List CodeArts Req IPD labels",
    inputSchema: reqListIpdLabelsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdLabelsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdLabelsHandler
  }),
  "req_list_ipd_project_fields": defineProductTool({
    description: "List CodeArts Req IPD project fields",
    inputSchema: reqListIpdProjectFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdProjectFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdProjectFieldsHandler
  }),
  "req_list_ipd_issue_fields": defineProductTool({
    description: "List CodeArts Req IPD issue fields",
    inputSchema: reqListIpdIssueFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueFieldsHandler
  }),
  "req_list_issue_fields": defineProductTool({
    description: "List CodeArts Req issue fields through the official ListIssueFields endpoint",
    inputSchema: reqListIpdIssueFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueFieldsHandler
  }),
  "req_list_ipd_tenant_fields": defineProductTool({
    description: "List CodeArts Req IPD tenant fields",
    inputSchema: reqListIpdTenantFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdTenantFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdTenantFieldsHandler
  }),
  "req_get_ipd_tenant_field_used": defineProductTool({
    description: "Get CodeArts Req IPD tenant field usage",
    inputSchema: reqGetIpdTenantFieldUsedInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdTenantFieldUsedHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdTenantFieldUsedHandler
  }),
  "req_get_ipd_tenant_field_option_used": defineProductTool({
    description: "Get CodeArts Req IPD tenant field option usage",
    inputSchema: reqGetIpdTenantFieldOptionUsedInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdTenantFieldOptionUsedHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdTenantFieldOptionUsedHandler
  }),
  "req_get_ipd_project_field_option_used": defineProductTool({
    description: "Get CodeArts Req IPD project field option usage",
    inputSchema: reqGetIpdProjectFieldOptionUsedInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdProjectFieldOptionUsedHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdProjectFieldOptionUsedHandler
  }),
  "req_list_ipd_workflow_templates": defineProductTool({
    description: "List CodeArts Req IPD workflow templates",
    inputSchema: reqListIpdWorkflowTemplatesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdWorkflowTemplatesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdWorkflowTemplatesHandler
  }),
  "req_show_workflow_template": defineProductTool({
    description: "Show a CodeArts Req workflow template through the official ShowWorkflowTemplate endpoint",
    inputSchema: reqListIpdWorkflowTemplatesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdWorkflowTemplatesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdWorkflowTemplatesHandler
  }),
  "req_list_ipd_workflow_fields": defineProductTool({
    description: "List CodeArts Req IPD workflow fields",
    inputSchema: reqListIpdWorkflowFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdWorkflowFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdWorkflowFieldsHandler
  }),
  "req_list_ipd_snapshot_versions": defineProductTool({
    description: "List CodeArts Req IPD feature set snapshot versions",
    inputSchema: reqListIpdSnapshotVersionsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdSnapshotVersionsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdSnapshotVersionsHandler
  }),
  "req_list_ipd_feature_sets": defineProductTool({
    description: "List CodeArts Req IPD feature sets",
    inputSchema: reqListIpdFeatureSetsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdFeatureSetsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdFeatureSetsHandler
  }),
  "req_list_ipd_snapshot_features": defineProductTool({
    description: "List CodeArts Req IPD snapshot features",
    inputSchema: reqListIpdSnapshotFeaturesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdSnapshotFeaturesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdSnapshotFeaturesHandler
  }),
  "req_get_ipd_e2e_graph": defineProductTool({
    description: "Get CodeArts Req IPD E2E trace graph",
    inputSchema: reqGetIpdE2EGraphInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdE2EGraphHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdE2EGraphHandler
  }),
  "req_list_e2e_graphs_open_api": defineProductTool({
    description: "List CodeArts Req IPD E2E graphs through the official OpenAPI endpoint",
    inputSchema: reqGetIpdE2EGraphInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdE2EGraphHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdE2EGraphHandler
  }),
  "req_list_ipd_category_statuses": defineProductTool({
    description: "List CodeArts Req IPD category statuses",
    inputSchema: reqListIpdCategoryStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdCategoryStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdCategoryStatusesHandler
  }),
  "req_get_ipd_statistic_dashboard": defineProductTool({
    description: "Get CodeArts Req IPD statistic dashboard",
    inputSchema: reqGetIpdStatisticDashboardInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdStatisticDashboardHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdStatisticDashboardHandler
  }),
  "req_get_ipd_work_item_flow_detail": defineProductTool({
    description: "Get CodeArts Req IPD work item flow detail",
    inputSchema: reqGetIpdWorkItemFlowDetailInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIpdWorkItemFlowDetailHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetIpdWorkItemFlowDetailHandler
  }),
  "req_transfer_ipd_work_item_flow": defineProductTool({
    description: "Transfer CodeArts Req IPD work item flow",
    inputSchema: reqTransferIpdWorkItemFlowInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqTransferIpdWorkItemFlowHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqTransferIpdWorkItemFlowHandler,
    rateLimitAction: "req_transfer_ipd_work_item_flow"
  }),
  "req_transfer_work_item_flow": defineProductTool({
    description: "Transfer a CodeArts Req work item flow through the official TransferWorkItemFlow endpoint",
    inputSchema: reqTransferIpdWorkItemFlowInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqTransferIpdWorkItemFlowHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqTransferIpdWorkItemFlowHandler,
    rateLimitAction: "req_transfer_work_item_flow"
  }),
  "req_batch_transfer_ipd_work_item_flow": defineProductTool({
    description: "Batch transfer CodeArts Req IPD work item flow",
    inputSchema: reqBatchTransferIpdWorkItemFlowInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchTransferIpdWorkItemFlowHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchTransferIpdWorkItemFlowHandler,
    rateLimitAction: "req_batch_transfer_ipd_work_item_flow"
  }),
  "req_create_ipd_change_review_form": defineProductTool({
    description: "Create a CodeArts Req IPD change review form",
    inputSchema: reqCreateIpdChangeReviewFormInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdChangeReviewFormHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdChangeReviewFormHandler,
    rateLimitAction: "req_create_ipd_change_review_form"
  }),
  "req_update_ipd_change_review_form": defineProductTool({
    description: "Update a CodeArts Req IPD change review form",
    inputSchema: reqUpdateIpdChangeReviewFormInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdChangeReviewFormHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdChangeReviewFormHandler,
    rateLimitAction: "req_update_ipd_change_review_form"
  }),
  "req_delete_ipd_change_review_form": defineProductTool({
    description: "Delete a CodeArts Req IPD change review form",
    inputSchema: reqDeleteIpdChangeReviewFormInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdChangeReviewFormHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdChangeReviewFormHandler,
    rateLimitAction: "req_delete_ipd_change_review_form"
  }),
  "req_create_ipd_process_instance": defineProductTool({
    description: "Create a CodeArts Req IPD BR/GR process instance",
    inputSchema: reqCreateIpdProcessInstanceInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdProcessInstanceHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdProcessInstanceHandler,
    rateLimitAction: "req_create_ipd_process_instance"
  }),
  "req_update_ipd_process_instance": defineProductTool({
    description: "Update a CodeArts Req IPD BR/GR process instance",
    inputSchema: reqUpdateIpdProcessInstanceInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdProcessInstanceHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdProcessInstanceHandler,
    rateLimitAction: "req_update_ipd_process_instance"
  }),
  "req_delete_ipd_process_instance": defineProductTool({
    description: "Delete a CodeArts Req IPD BR/GR process instance",
    inputSchema: reqDeleteIpdProcessInstanceInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdProcessInstanceHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdProcessInstanceHandler,
    rateLimitAction: "req_delete_ipd_process_instance"
  }),
  "req_create_ipd_issue": defineProductTool({
    description: "Create CodeArts Req IPD issue",
    inputSchema: reqCreateIpdIssueInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdIssueHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdIssueHandler,
    rateLimitAction: "req_create_ipd_issue"
  }),
  "req_create_ipd_project_issue": defineProductTool({
    description: "Create a CodeArts Req IPD project issue through the official CreateIpdProjectIssue endpoint",
    inputSchema: reqCreateIpdIssueInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdIssueHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdIssueHandler,
    rateLimitAction: "req_create_ipd_project_issue"
  }),
  "req_upload_ipd_issue_attachment": defineProductTool({
    description: "Upload attachment to CodeArts Req IPD issue",
    inputSchema: reqUploadIpdIssueAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadIpdIssueAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadIpdIssueAttachmentHandler,
    rateLimitAction: "req_upload_ipd_issue_attachment"
  }),
  "req_create_ipd_project_issue_attachment": defineProductTool({
    description: "Create a CodeArts Req IPD project issue attachment through the official CreateIpdProjectIssueAttachment endpoint",
    inputSchema: reqUploadIpdIssueAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadIpdIssueAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadIpdIssueAttachmentHandler,
    rateLimitAction: "req_create_ipd_project_issue_attachment"
  }),
  "req_list_ipd_issue_attachments": defineProductTool({
    description: "List CodeArts Req IPD issue attachments",
    inputSchema: reqListIpdIssueAttachmentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueAttachmentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueAttachmentsHandler
  }),
  "req_show_ipd_attachment_by_work_item_id": defineProductTool({
    description: "Show CodeArts Req IPD attachments by work item id through the official ShowIpdAttachmentByWorkItemId endpoint",
    inputSchema: reqListIpdIssueAttachmentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdIssueAttachmentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdIssueAttachmentsHandler
  }),
  "req_download_ipd_issue_attachment": defineProductTool({
    description: "Download CodeArts Req IPD issue attachment",
    inputSchema: reqDownloadIpdIssueAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDownloadIpdIssueAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDownloadIpdIssueAttachmentHandler
  }),
  "req_upload_ipd_issue_image": defineProductTool({
    description: "Upload image to CodeArts Req IPD issue description",
    inputSchema: reqUploadIpdIssueImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadIpdIssueImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadIpdIssueImageHandler,
    rateLimitAction: "req_upload_ipd_issue_image"
  }),
  "req_delete_ipd_issue_image": defineProductTool({
    description: "Delete image from CodeArts Req IPD issue description",
    inputSchema: reqDeleteIpdIssueImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdIssueImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdIssueImageHandler,
    rateLimitAction: "req_delete_ipd_issue_image"
  }),
  "req_download_ipd_issue_image": defineProductTool({
    description: "Download image from CodeArts Req IPD issue description",
    inputSchema: reqDownloadIpdIssueImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDownloadIpdIssueImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDownloadIpdIssueImageHandler
  }),
  "req_list_ipd_work_hours": defineProductTool({
    description: "List CodeArts Req IPD work hour records",
    inputSchema: reqListIpdWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdWorkHoursHandler
  }),
  "req_list_ipd_work_hour_categories": defineProductTool({
    description: "List CodeArts Req IPD work hour categories",
    inputSchema: reqListIpdWorkHourCategoriesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIpdWorkHourCategoriesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIpdWorkHourCategoriesHandler
  }),
  "req_create_ipd_work_hour": defineProductTool({
    description: "Create CodeArts Req IPD work hour record",
    inputSchema: reqCreateIpdWorkHourInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdWorkHourHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdWorkHourHandler,
    rateLimitAction: "req_create_ipd_work_hour"
  }),
  "req_update_ipd_work_hour": defineProductTool({
    description: "Update CodeArts Req IPD work hour record",
    inputSchema: reqUpdateIpdWorkHourInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdWorkHourHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdWorkHourHandler,
    rateLimitAction: "req_update_ipd_work_hour"
  }),
  "req_delete_ipd_work_hour": defineProductTool({
    description: "Delete CodeArts Req IPD work hour record",
    inputSchema: reqDeleteIpdWorkHourInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdWorkHourHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdWorkHourHandler,
    rateLimitAction: "req_delete_ipd_work_hour"
  }),
  "req_update_ipd_tenant_field": defineProductTool({
    description: "Update CodeArts Req IPD tenant field",
    inputSchema: reqUpdateIpdTenantFieldInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdTenantFieldHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdTenantFieldHandler,
    rateLimitAction: "req_update_ipd_tenant_field"
  }),
  "req_update_ipd_project_field": defineProductTool({
    description: "Update CodeArts Req IPD project field",
    inputSchema: reqUpdateIpdProjectFieldInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdProjectFieldHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdProjectFieldHandler,
    rateLimitAction: "req_update_ipd_project_field"
  }),
  "req_create_ipd_module": defineProductTool({
    description: "Create CodeArts Req IPD module",
    inputSchema: reqCreateIpdModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdModuleHandler,
    rateLimitAction: "req_create_ipd_module"
  }),
  "req_update_ipd_module": defineProductTool({
    description: "Update CodeArts Req IPD module",
    inputSchema: reqUpdateIpdModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdModuleHandler,
    rateLimitAction: "req_update_ipd_module"
  }),
  "req_delete_ipd_module": defineProductTool({
    description: "Delete CodeArts Req IPD module",
    inputSchema: reqDeleteIpdModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdModuleHandler,
    rateLimitAction: "req_delete_ipd_module"
  }),
  "req_create_ipd_label": defineProductTool({
    description: "Create CodeArts Req IPD label",
    inputSchema: reqCreateIpdLabelInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdLabelHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdLabelHandler,
    rateLimitAction: "req_create_ipd_label"
  }),
  "req_update_ipd_label": defineProductTool({
    description: "Update CodeArts Req IPD label",
    inputSchema: reqUpdateIpdLabelInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdLabelHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdLabelHandler,
    rateLimitAction: "req_update_ipd_label"
  }),
  "req_delete_ipd_label": defineProductTool({
    description: "Delete CodeArts Req IPD label",
    inputSchema: reqDeleteIpdLabelInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdLabelHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdLabelHandler,
    rateLimitAction: "req_delete_ipd_label"
  }),
  "req_create_ipd_feature_set": defineProductTool({
    description: "Create CodeArts Req IPD feature set",
    inputSchema: reqCreateIpdFeatureSetInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIpdFeatureSetHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateIpdFeatureSetHandler,
    rateLimitAction: "req_create_ipd_feature_set"
  }),
  "req_update_ipd_feature_set": defineProductTool({
    description: "Update CodeArts Req IPD feature set",
    inputSchema: reqUpdateIpdFeatureSetInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIpdFeatureSetHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateIpdFeatureSetHandler,
    rateLimitAction: "req_update_ipd_feature_set"
  }),
  "req_delete_ipd_feature_set": defineProductTool({
    description: "Delete CodeArts Req IPD feature set",
    inputSchema: reqDeleteIpdFeatureSetInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIpdFeatureSetHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteIpdFeatureSetHandler,
    rateLimitAction: "req_delete_ipd_feature_set"
  }),
  "req_list_user_features": defineProductTool({
    description: "List CodeArts Req user features",
    inputSchema: reqListUserFeaturesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListUserFeaturesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListUserFeaturesHandler
  }),
  "req_list_project_bug_statistics": defineProductTool({
    description: "List CodeArts Req project bug statistics",
    inputSchema: reqListProjectBugStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectBugStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectBugStatisticsHandler
  }),
  "req_list_project_bug_statics_v4": defineProductTool({
    description: "List CodeArts Req project bug statistics through the official V4 endpoint",
    inputSchema: reqListProjectBugStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectBugStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectBugStatisticsHandler
  }),
  "req_get_project_summary": defineProductTool({
    description: "Get CodeArts Req project summary",
    inputSchema: reqGetProjectSummaryInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectSummaryHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectSummaryHandler
  }),
  "req_show_project_summary_v4": defineProductTool({
    description: "Show CodeArts Req project summary through the official V4 endpoint",
    inputSchema: reqGetProjectSummaryInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectSummaryHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectSummaryHandler
  }),
  "req_get_project_public_config": defineProductTool({
    description: "Get CodeArts Req project public config",
    inputSchema: reqGetProjectPublicConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectPublicConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetProjectPublicConfigHandler
  }),
  "req_get_project_workhour_config": defineProductTool({
    description: "Get CodeArts Req project workhour config",
    inputSchema: reqGetProjectWorkhourConfigInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetProjectWorkhourConfigHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetProjectWorkhourConfigHandler
  }),
  "req_download_image_file": defineProductTool({
    description: "Download a CodeArts Req image file",
    inputSchema: reqDownloadImageFileInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDownloadImageFileHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDownloadImageFileHandler
  }),
  "req_get_iteration": defineProductTool({
    description: "Get CodeArts Req iteration detail",
    inputSchema: reqGetIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetIterationHandler
  }),
  "req_show_iteration_v4": defineProductTool({
    description: "Show CodeArts Req iteration detail through the official V4 endpoint",
    inputSchema: reqGetIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetIterationHandler
  }),
  "req_get_version_detail_v2": defineProductTool({
    description: "Get CodeArts Req version detail from the official V2 endpoint",
    inputSchema: reqGetVersionDetailV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetVersionDetailV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetVersionDetailV2Handler
  }),
  "req_get_plan": defineProductTool({
    description: "Get CodeArts Req plan detail",
    inputSchema: reqGetPlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetPlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetPlanHandler
  }),
  "req_get_release_plan": defineProductTool({
    description: "Get CodeArts Req release or iteration plan",
    inputSchema: reqGetReleasePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetReleasePlanHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetReleasePlanHandler
  }),
  "req_list_project_modules": defineProductTool({
    description: "List CodeArts Req project modules",
    inputSchema: reqListProjectModulesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectModulesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectModulesHandler
  }),
  "req_list_module_settings_v2": defineProductTool({
    description: "List CodeArts Req module settings from the official V2 endpoint",
    inputSchema: reqListModuleSettingsV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListModuleSettingsV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListModuleSettingsV2Handler
  }),
  "req_list_work_item_queries": defineProductTool({
    description: "List CodeArts Req work item saved queries from the official V2 endpoint",
    inputSchema: reqListWorkItemQueriesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemQueriesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemQueriesHandler
  }),
  "req_leave_project": defineProductTool({
    description: "Leave a CodeArts Req project as the current member",
    inputSchema: reqLeaveProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqLeaveProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqLeaveProjectHandler,
    rateLimitAction: "req_leave_project"
  }),
  "req_remove_project": defineProductTool({
    description: "Remove the current member from a CodeArts Req project through the official endpoint",
    inputSchema: reqLeaveProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqLeaveProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqLeaveProjectHandler,
    rateLimitAction: "req_remove_project"
  }),
  "req_list_board_work_items": defineProductTool({
    description: "List CodeArts Req board work items",
    inputSchema: reqListBoardWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListBoardWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListBoardWorkItemsHandler
  }),
  "req_list_board_work_item_status_records": defineProductTool({
    description: "List CodeArts Req board work item status records",
    inputSchema: reqListBoardWorkItemStatusRecordsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListBoardWorkItemStatusRecordsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListBoardWorkItemStatusRecordsHandler
  }),
  "req_list_workitem_status_records_v4": defineProductTool({
    description: "List CodeArts Req work item status records through the official ListWorkitemStatusRecordsV4 endpoint",
    inputSchema: reqListBoardWorkItemStatusRecordsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListBoardWorkItemStatusRecordsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListBoardWorkItemStatusRecordsHandler
  }),
  "req_list_board_work_item_workflow_config": defineProductTool({
    description: "List CodeArts Req board work item workflow config",
    inputSchema: reqListBoardWorkItemWorkflowConfigInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListBoardWorkItemWorkflowConfigHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListBoardWorkItemWorkflowConfigHandler
  }),
  "req_list_job_cache_boards": defineProductTool({
    description: "List CodeArts Req board cache fields",
    inputSchema: reqListJobCacheBoardsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListJobCacheBoardsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListJobCacheBoardsHandler
  }),
  "req_list_cache_data": defineProductTool({
    description: "List CodeArts Req cache data",
    inputSchema: reqListCacheDataInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListCacheDataHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListCacheDataHandler
  }),
  "req_update_cache_data": defineProductTool({
    description: "Update CodeArts Req cache data",
    inputSchema: reqUpdateCacheDataInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateCacheDataHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateCacheDataHandler,
    rateLimitAction: "req_update_cache_data"
  }),
  "req_update_cache_setting": defineProductTool({
    description: "Update CodeArts Req cache setting from the official cache-setting endpoint",
    inputSchema: reqUpdateCacheSettingInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateCacheSettingHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateCacheSettingHandler,
    rateLimitAction: "req_update_cache_setting"
  }),
  "req_upload_work_item_image": defineProductTool({
    description: "Upload an image for CodeArts Req work items",
    inputSchema: reqUploadWorkItemImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadWorkItemImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadWorkItemImageHandler,
    rateLimitAction: "req_upload_work_item_image"
  }),
  "req_upload_issue_img": defineProductTool({
    description: "Upload an image through the official CodeArts Req UploadIssueImg endpoint",
    inputSchema: reqUploadWorkItemImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadWorkItemImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadWorkItemImageHandler,
    rateLimitAction: "req_upload_issue_img"
  }),
  "req_upload_issues_img": defineProductTool({
    description: "Download an uploaded issue image through the official CodeArts Req UploadIssuesImg endpoint",
    inputSchema: reqUploadIssuesImgInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadIssuesImgHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadIssuesImgHandler
  }),
  "req_upload_work_item_image_v2": defineProductTool({
    description: "Upload an image for CodeArts Req work item descriptions through the V2 token-header endpoint",
    inputSchema: reqUploadWorkItemImageV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadWorkItemImageV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadWorkItemImageV2Handler,
    rateLimitAction: "req_upload_work_item_image_v2"
  }),
  "req_img_upload": defineProductTool({
    description: "Upload a work item description image through the official CodeArts Req ImgUpload endpoint",
    inputSchema: reqUploadWorkItemImageV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadWorkItemImageV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadWorkItemImageV2Handler,
    rateLimitAction: "req_img_upload"
  }),
  "req_upload_attachment": defineProductTool({
    description: "Upload a CodeArts Req work item attachment",
    inputSchema: reqUploadAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadAttachmentHandler,
    rateLimitAction: "req_upload_attachment"
  }),
  "req_upload_attachments": defineProductTool({
    description: "Upload CodeArts Req work item attachments through the official UploadAttachments endpoint",
    inputSchema: reqUploadAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadAttachmentHandler,
    rateLimitAction: "req_upload_attachments"
  }),
  "req_upload_attachment_v3": defineProductTool({
    description: "Upload a CodeArts Req work item attachment through the V3 token-header endpoint",
    inputSchema: reqUploadAttachmentV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadAttachmentV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadAttachmentV3Handler,
    rateLimitAction: "req_upload_attachment_v3"
  }),
  "req_attachment_upload": defineProductTool({
    description: "Upload a work item attachment through the official CodeArts Req AttachmentUpload endpoint",
    inputSchema: reqUploadAttachmentV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadAttachmentV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadAttachmentV3Handler,
    rateLimitAction: "req_attachment_upload"
  }),
  "req_create_work_item": defineProductTool({
    description: "Create CodeArts Req work item",
    inputSchema: reqCreateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemHandler,
    rateLimitAction: "req_create_work_item"
  }),
  "req_create_issue_v4": defineProductTool({
    description: "Create CodeArts Req work item through the official V4 issue endpoint",
    inputSchema: reqCreateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemHandler,
    rateLimitAction: "req_create_issue_v4"
  }),
  "req_create_work_item_v2": defineProductTool({
    description: "Create CodeArts Req work item through the official V2 issues create endpoint",
    inputSchema: reqCreateWorkItemV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateWorkItemV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateWorkItemV2Handler,
    rateLimitAction: "req_create_work_item_v2"
  }),
  "req_create_epic_issue": defineProductTool({
    description: "Create a CodeArts Req epic issue through the official CreateEpicIssue endpoint",
    inputSchema: reqCreateEpicIssueInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateEpicIssueHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateEpicIssueHandler,
    rateLimitAction: "req_create_epic_issue"
  }),
  "req_create_system_work_item_v4": defineProductTool({
    description: "Create CodeArts Req work item through the official V4 system issue token-header endpoint",
    inputSchema: reqCreateSystemWorkItemV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateSystemWorkItemV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateSystemWorkItemV4Handler,
    rateLimitAction: "req_create_system_work_item_v4"
  }),
  "req_create_system_issue_v4": defineProductTool({
    description: "Create CodeArts Req work item through the official CreateSystemIssueV4 endpoint",
    inputSchema: reqCreateSystemWorkItemV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateSystemWorkItemV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateSystemWorkItemV4Handler,
    rateLimitAction: "req_create_system_issue_v4"
  }),
  "req_create_work_item_with_attachment_v3": defineProductTool({
    description: "Create a CodeArts Req work item through the V3 token-header attachment endpoint",
    inputSchema: reqCreateWorkItemWithAttachmentV3Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateWorkItemWithAttachmentV3Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemWithAttachmentV3Handler,
    rateLimitAction: "req_create_work_item_with_attachment_v3"
  }),
  "req_issue_upload_create": defineProductTool({
    description: "Create a work item through the official CodeArts Req IssueUploadCreate endpoint",
    inputSchema: reqCreateWorkItemWithAttachmentV3Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqCreateWorkItemWithAttachmentV3Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemWithAttachmentV3Handler,
    rateLimitAction: "req_issue_upload_create"
  }),
  "req_quick_create_child_work_item": defineProductTool({
    description: "Quick create a CodeArts Req child work item from the official V2 endpoint",
    inputSchema: reqQuickCreateChildWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqQuickCreateChildWorkItemHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqQuickCreateChildWorkItemHandler,
    rateLimitAction: "req_quick_create_child_work_item"
  }),
  "req_add_work_item_comment": defineProductTool({
    description: "Add comment to a CodeArts Req work item",
    inputSchema: reqAddWorkItemCommentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddWorkItemCommentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqAddWorkItemCommentHandler,
    rateLimitAction: "req_add_work_item_comment"
  }),
  "req_add_work_item_work_hour": defineProductTool({
    description: "Add a work hour record to a CodeArts Req work item",
    inputSchema: reqAddWorkItemWorkHourInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddWorkItemWorkHourHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqAddWorkItemWorkHourHandler,
    rateLimitAction: "req_add_work_item_work_hour"
  }),
  "req_add_issue_work_hours": defineProductTool({
    description: "Add a CodeArts Req work hour record through the official issue work-hours endpoint",
    inputSchema: reqAddWorkItemWorkHourInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqAddWorkItemWorkHourHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqAddWorkItemWorkHourHandler,
    rateLimitAction: "req_add_issue_work_hours"
  }),
  "req_update_working_hours": defineProductTool({
    description: "Update a CodeArts Req work item work hour record",
    inputSchema: reqUpdateWorkingHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkingHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateWorkingHoursHandler,
    rateLimitAction: "req_update_working_hours"
  }),
  "req_watch_work_item": defineProductTool({
    description: "Watch a CodeArts Req work item through the official V2 token-header endpoint",
    inputSchema: reqWatchWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqWatchWorkItemHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqWatchWorkItemHandler,
    rateLimitAction: "req_watch_work_item"
  }),
  "req_delete_work_item": defineProductTool({
    description: "Delete CodeArts Req work item",
    inputSchema: reqDeleteWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteWorkItemHandler,
    rateLimitAction: "req_delete_work_item"
  }),
  "req_delete_issue_v4": defineProductTool({
    description: "Delete CodeArts Req work item through the official V4 issue endpoint",
    inputSchema: reqDeleteWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteWorkItemHandler,
    rateLimitAction: "req_delete_issue_v4"
  }),
  "req_delete_work_item_v3": defineProductTool({
    description: "Delete CodeArts Req work item through the official V3 token-header endpoint",
    inputSchema: reqDeleteWorkItemV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteWorkItemV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteWorkItemV3Handler,
    rateLimitAction: "req_delete_work_item_v3"
  }),
  "req_delete_issue_upload": defineProductTool({
    description: "Delete a work item through the official CodeArts Req DeleteIssueUpload endpoint",
    inputSchema: reqDeleteWorkItemV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteWorkItemV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqDeleteWorkItemV3Handler,
    rateLimitAction: "req_delete_issue_upload"
  }),
  "req_batch_update_work_items": defineProductTool({
    description: "Batch update CodeArts Req work items",
    inputSchema: reqBatchUpdateWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchUpdateWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateWorkItemsHandler,
    rateLimitAction: "req_batch_update_work_items"
  }),
  "req_batch_update_work_items_v2_token": defineProductTool({
    description: "Batch update CodeArts Req work items through the official V2 token-header endpoint",
    inputSchema: reqBatchUpdateWorkItemsV2TokenInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqBatchUpdateWorkItemsV2TokenHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateWorkItemsV2TokenHandler,
    rateLimitAction: "req_batch_update_work_items_v2_token"
  }),
  "req_batch_delete_issues_v4": defineProductTool({
    description: "Batch delete CodeArts Req issues through the official BatchDeleteIssuesV4 endpoint",
    inputSchema: reqBatchDeleteWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteWorkItemsHandler,
    rateLimitAction: "req_batch_delete_issues_v4"
  }),
  "req_list_work_items": defineProductTool({
    description: "List CodeArts Req work items",
    inputSchema: reqListWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemsHandler
  }),
  "req_list_workitems": defineProductTool({
    description: "List CodeArts Req work items through the official ListWorkitems endpoint",
    inputSchema: reqListWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemsHandler
  }),
  "req_list_issues_sf_v4": defineProductTool({
    description: "List CodeArts Req project work items through the official V4 issues endpoint",
    inputSchema: reqListWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemsHandler
  }),
  "req_list_work_items_v3": defineProductTool({
    description: "List CodeArts Req work items from the official V3 issue-list endpoint",
    inputSchema: reqListWorkItemsV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemsV3Handler
  }),
  "req_issue_list": defineProductTool({
    description: "List CodeArts Req work items through the official V3 issue-list endpoint",
    inputSchema: reqListWorkItemsV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsV3Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemsV3Handler
  }),
  "req_list_work_items_v4": defineProductTool({
    description: "List CodeArts Req work items from the official V4 advanced query endpoint",
    inputSchema: reqListWorkItemsV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemsV4Handler
  }),
  "req_list_issues_v4": defineProductTool({
    description: "List CodeArts Req work items through the official ListIssuesV4 endpoint",
    inputSchema: reqListWorkItemsV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemsV4Handler
  }),
  "req_list_query_issues": defineProductTool({
    description: "List CodeArts Req issues with the official V2 temporary filter query endpoint",
    inputSchema: reqListQueryIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListQueryIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListQueryIssuesHandler
  }),
  "req_search_issues": defineProductTool({
    description: "Search CodeArts Req issues through the official SearchIssues endpoint",
    inputSchema: reqListQueryIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListQueryIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListQueryIssuesHandler
  }),
  "req_list_query_issue": defineProductTool({
    description: "List CodeArts Req issues through the official V2 query-issue endpoint",
    inputSchema: reqListQueryIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListQueryIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListQueryIssuesHandler
  }),
  "req_search_todo_work_items": defineProductTool({
    description: "Search CodeArts Req todo work items across projects",
    inputSchema: reqSearchTodoWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqSearchTodoWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqSearchTodoWorkItemsHandler
  }),
  "req_search_my_work_items": defineProductTool({
    description: "Search CodeArts Req personal workbench todo work items",
    inputSchema: reqSearchMyWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqSearchMyWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqSearchMyWorkItemsHandler
  }),
  "req_list_associated_issues": defineProductTool({
    description: "List CodeArts Req associated issues",
    inputSchema: reqListAssociatedIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedIssuesHandler
  }),
  "req_list_associated_issues_v4": defineProductTool({
    description: "List CodeArts Req associated issues from the official V4 endpoint",
    inputSchema: reqListAssociatedIssuesV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedIssuesV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedIssuesV4Handler
  }),
  "req_list_associated_commits": defineProductTool({
    description: "List CodeArts Req associated commits",
    inputSchema: reqListAssociatedCommitsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedCommitsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedCommitsHandler
  }),
  "req_list_issue_associated_commits": defineProductTool({
    description: "List CodeArts Req associated commits through the official ListIssueAssociatedCommits endpoint",
    inputSchema: reqListAssociatedCommitsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedCommitsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedCommitsHandler
  }),
  "req_list_associated_code_v2": defineProductTool({
    description: "List CodeArts Req associated code records from the official V2 endpoint",
    inputSchema: reqListAssociatedCodeV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedCodeV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedCodeV2Handler
  }),
  "req_get_commit_list_by_related_id": defineProductTool({
    description: "List CodeArts Req associated code through the official V2 related-id commit endpoint",
    inputSchema: reqListAssociatedCodeV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedCodeV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedCodeV2Handler
  }),
  "req_list_associated_test_cases": defineProductTool({
    description: "List CodeArts Req associated test cases",
    inputSchema: reqListAssociatedTestCasesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedTestCasesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedTestCasesHandler
  }),
  "req_list_associated_wikis": defineProductTool({
    description: "List CodeArts Req associated wikis",
    inputSchema: reqListAssociatedWikisInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedWikisHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedWikisHandler
  }),
  "req_list_associated_wikis_v5": defineProductTool({
    description: "List CodeArts Req associated wikis from the official V5 endpoint",
    inputSchema: reqListAssociatedWikisV5Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedWikisV5Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedWikisV5Handler
  }),
  "req_list_associate_wikis_v5": defineProductTool({
    description: "List CodeArts Req associated wikis through the official V5 attach-wiki endpoint",
    inputSchema: reqListAssociatedWikisV5Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedWikisV5Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedWikisV5Handler
  }),
  "req_list_related_users": defineProductTool({
    description: "List CodeArts Req related users",
    inputSchema: reqListRelatedUsersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListRelatedUsersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListRelatedUsersHandler
  }),
  "req_list_work_item_statuses": defineProductTool({
    description: "List CodeArts Req work item statuses",
    inputSchema: reqListWorkItemStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemStatusesHandler
  }),
  "req_list_scrum_project_statuses": defineProductTool({
    description: "List CodeArts Req scrum project statuses through the official ListScrumProjectStatuses endpoint",
    inputSchema: reqListWorkItemStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemStatusesHandler
  }),
  "req_list_issue_statues": defineProductTool({
    description: "List CodeArts Req issue statuses through the official ListIssueStatues endpoint",
    inputSchema: reqListWorkItemStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemStatusesHandler
  }),
  "req_list_work_item_status_attributes": defineProductTool({
    description: "List CodeArts Req work item status attributes",
    inputSchema: reqListWorkItemStatusAttributesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkItemStatusAttributesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkItemStatusAttributesHandler
  }),
  "req_list_issue_status_attributes": defineProductTool({
    description: "List CodeArts Req issue status attributes through the official V2 endpoint",
    inputSchema: reqListWorkItemStatusAttributesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkItemStatusAttributesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkItemStatusAttributesHandler
  }),
  "req_list_work_item_status_details": defineProductTool({
    description: "List CodeArts Req work item status details",
    inputSchema: reqListWorkItemStatusDetailsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkItemStatusDetailsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkItemStatusDetailsHandler
  }),
  "req_list_work_item_status_configs": defineProductTool({
    description: "List CodeArts Req work item status configs",
    inputSchema: reqListWorkItemStatusConfigsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkItemStatusConfigsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkItemStatusConfigsHandler
  }),
  "req_list_optional_work_item_status_configs": defineProductTool({
    description: "List CodeArts Req optional work item status configs",
    inputSchema: reqListOptionalWorkItemStatusConfigsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListOptionalWorkItemStatusConfigsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListOptionalWorkItemStatusConfigsHandler
  }),
  "req_get_work_item_status_rule_flag": defineProductTool({
    description: "Get CodeArts Req work item status rule flag",
    inputSchema: reqGetWorkItemStatusRuleFlagInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemStatusRuleFlagHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetWorkItemStatusRuleFlagHandler
  }),
  "req_list_work_item_workflow_config": defineProductTool({
    description: "List CodeArts Req work item workflow config",
    inputSchema: reqListWorkItemWorkflowConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemWorkflowConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemWorkflowConfigHandler
  }),
  "req_show_issues_wrok_flow_config": defineProductTool({
    description: "Show CodeArts Req issues workflow config through the official ShowIssuesWrokFlowConfig endpoint",
    inputSchema: reqListWorkItemWorkflowConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemWorkflowConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemWorkflowConfigHandler
  }),
  "req_show_work_item_wrokflow_config": defineProductTool({
    description: "Show CodeArts Req work item workflow config through the official ShowWorkItemWrokflowConfig endpoint",
    inputSchema: reqListWorkItemWorkflowConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemWorkflowConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemWorkflowConfigHandler
  }),
  "req_list_work_item_templates": defineProductTool({
    description: "List CodeArts Req work item templates",
    inputSchema: reqListWorkItemTemplatesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTemplatesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTemplatesHandler
  }),
  "req_list_templates": defineProductTool({
    description: "List CodeArts Req work item templates through the official ListTemplates endpoint",
    inputSchema: reqListWorkItemTemplatesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTemplatesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTemplatesHandler
  }),
  "req_list_work_setting_templates_v2": defineProductTool({
    description: "List CodeArts Req work setting templates from the official V2 endpoint",
    inputSchema: reqListWorkSettingTemplatesV2Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkSettingTemplatesV2Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkSettingTemplatesV2Handler
  }),
  "req_get_work_item_template_config": defineProductTool({
    description: "Get CodeArts Req work item template config",
    inputSchema: reqGetWorkItemTemplateConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemTemplateConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetWorkItemTemplateConfigHandler
  }),
  "req_list_work_item_custom_fields": defineProductTool({
    description: "List CodeArts Req work item custom fields",
    inputSchema: reqListWorkItemCustomFieldsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCustomFieldsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCustomFieldsHandler
  }),
  "req_list_work_item_custom_fields_v4": defineProductTool({
    description: "List CodeArts Req work item custom fields from the official V4 endpoint",
    inputSchema: reqListWorkItemCustomFieldsV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCustomFieldsV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCustomFieldsV4Handler
  }),
  "req_list_issue_custom_fields": defineProductTool({
    description: "List CodeArts Req work item custom fields through the official V4 issue custom-fields endpoint",
    inputSchema: reqListWorkItemCustomFieldsV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCustomFieldsV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCustomFieldsV4Handler
  }),
  "req_show_issue_config_fields": defineProductTool({
    description: "Show CodeArts Req issue config fields through the official ShowIssueConfigFields endpoint",
    inputSchema: reqListWorkItemCustomFieldsV4Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCustomFieldsV4Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCustomFieldsV4Handler
  }),
  "req_list_work_item_assigned_status_configs": defineProductTool({
    description: "List CodeArts Req work item assigned status configs from the official V3 endpoint",
    inputSchema: reqListWorkItemAssignedStatusConfigsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListWorkItemAssignedStatusConfigsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListWorkItemAssignedStatusConfigsHandler
  }),
  "req_list_work_item_tracker_handlers": defineProductTool({
    description: "List CodeArts Req work item tracker handlers",
    inputSchema: reqListWorkItemTrackerHandlersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTrackerHandlersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTrackerHandlersHandler
  }),
  "req_list_get_tracker_handlers": defineProductTool({
    description: "List CodeArts Req tracker handlers through the official tracker-handler-config endpoint",
    inputSchema: reqListWorkItemTrackerHandlersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTrackerHandlersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTrackerHandlersHandler
  }),
  "req_get_work_item": defineProductTool({
    description: "Get CodeArts Req work item detail including assignee information when available",
    inputSchema: reqGetWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemHandler
  }),
  "req_show_issue_v4": defineProductTool({
    description: "Show CodeArts Req work item detail through the official V4 issue endpoint",
    inputSchema: reqGetWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemHandler
  }),
  "req_get_work_item_completion_rate": defineProductTool({
    description: "Get CodeArts Req work item completion rates",
    inputSchema: reqGetWorkItemCompletionRateInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetWorkItemCompletionRateHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemCompletionRateHandler
  }),
  "req_show_issue_completion_rate": defineProductTool({
    description: "Show CodeArts Req work item completion rates through the official ShowIssueCompletionRate endpoint",
    inputSchema: reqGetWorkItemCompletionRateInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetWorkItemCompletionRateHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemCompletionRateHandler
  }),
  "req_get_work_item_issue_details": defineProductTool({
    description: "Get CodeArts Req work item issue details from the official V2 issue detail endpoint and map journals to comments",
    inputSchema: reqGetWorkItemIssueDetailsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemIssueDetailsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetWorkItemIssueDetailsHandler
  }),
  "req_show_issue_detail": defineProductTool({
    description: "Show CodeArts Req issue detail through the official ShowIssueDetail endpoint",
    inputSchema: reqGetWorkItemIssueDetailsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkItemIssueDetailsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetWorkItemIssueDetailsHandler
  }),
  "req_get_work_item_index_counts": defineProductTool({
    description: "Get CodeArts Req work item index counts",
    inputSchema: reqGetWorkItemIndexCountsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetWorkItemIndexCountsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemIndexCountsHandler
  }),
  "req_issue_index_count": defineProductTool({
    description: "Get CodeArts Req work item index counts through the official issue index-count endpoint",
    inputSchema: reqGetWorkItemIndexCountsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqGetWorkItemIndexCountsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqGetWorkItemIndexCountsHandler
  }),
  "req_get_work_hour_permission": defineProductTool({
    description: "Get CodeArts Req work hour operation permission for a work item",
    inputSchema: reqGetWorkHourPermissionInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetWorkHourPermissionHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetWorkHourPermissionHandler
  }),
  "req_list_work_item_comments": defineProductTool({
    description: "List CodeArts Req work item comments",
    inputSchema: reqListWorkItemCommentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCommentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCommentsHandler
  }),
  "req_list_issue_comments_v4": defineProductTool({
    description: "List CodeArts Req work item comments through the official V4 issue comments endpoint",
    inputSchema: reqListWorkItemCommentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCommentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCommentsHandler
  }),
  "req_list_work_item_comments_v2": defineProductTool({
    description: "List CodeArts Req work item comments from the official V2 endpoint",
    inputSchema: reqListWorkItemCommentsV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCommentsV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCommentsV2Handler
  }),
  "req_list_work_item_tags": defineProductTool({
    description: "List CodeArts Req work item tags",
    inputSchema: reqListWorkItemTagsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTagsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTagsHandler
  }),
  "req_list_parent_work_items": defineProductTool({
    description: "List a CodeArts Req work item and all parent work items",
    inputSchema: reqListParentWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListParentWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListParentWorkItemsHandler
  }),
  "req_list_work_item_tree": defineProductTool({
    description: "List CodeArts Req work items in tree mode",
    inputSchema: reqListWorkItemTreeInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTreeHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTreeHandler
  }),
  "req_list_child_work_items": defineProductTool({
    description: "List CodeArts Req child work items",
    inputSchema: reqListChildWorkItemsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListChildWorkItemsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListChildWorkItemsHandler
  }),
  "req_list_child_work_items_v4": defineProductTool({
    description: "List CodeArts Req child work items from the official V4 endpoint",
    inputSchema: reqListChildWorkItemsV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListChildWorkItemsV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListChildWorkItemsV4Handler
  }),
  "req_list_child_work_items_direct_v4": defineProductTool({
    description: "List CodeArts Req direct child work items from the official V4 endpoint",
    inputSchema: reqListChildWorkItemsDirectV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListChildWorkItemsDirectV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListChildWorkItemsDirectV4Handler
  }),
  "req_list_child_issue_v4": defineProductTool({
    description: "List CodeArts Req direct child work items through the official V4 child endpoint",
    inputSchema: reqListChildWorkItemsDirectV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListChildWorkItemsDirectV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListChildWorkItemsDirectV4Handler
  }),
  "req_list_child_issues_v4": defineProductTool({
    description: "List CodeArts Req child work items through the official ListChildIssuesV4 endpoint",
    inputSchema: reqListChildWorkItemsDirectV4Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListChildWorkItemsDirectV4Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListChildWorkItemsDirectV4Handler
  }),
  "req_list_work_item_work_hours": defineProductTool({
    description: "List CodeArts Req work hour records for a work item",
    inputSchema: reqListWorkItemWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemWorkHoursHandler
  }),
  "req_list_working_hour_v3": defineProductTool({
    description: "List CodeArts Req work hour records through the official V3 working-hour endpoint",
    inputSchema: reqListWorkItemWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemWorkHoursHandler
  }),
  "req_list_work_item_records": defineProductTool({
    description: "List CodeArts Req work item records",
    inputSchema: reqListWorkItemRecordsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemRecordsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemRecordsHandler
  }),
  "req_list_issue_records_v4": defineProductTool({
    description: "List CodeArts Req work item records through the official V4 issue records endpoint",
    inputSchema: reqListWorkItemRecordsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemRecordsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemRecordsHandler
  }),
  "req_list_work_item_records_v2": defineProductTool({
    description: "List CodeArts Req work item records from the official V2 endpoint",
    inputSchema: reqListWorkItemRecordsV2Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemRecordsV2Handler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemRecordsV2Handler
  }),
  "req_list_work_item_stay_times": defineProductTool({
    description: "List CodeArts Req work item stay time in the current status",
    inputSchema: reqListWorkItemStayTimesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemStayTimesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemStayTimesHandler
  }),
  "req_list_spec_issue_stay_times": defineProductTool({
    description: "List CodeArts Req work item stay time through the official ListSpecIssueStayTimes endpoint",
    inputSchema: reqListWorkItemStayTimesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemStayTimesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemStayTimesHandler
  }),
  "req_find_iterations": defineProductTool({
    description: "Find CodeArts Req iterations by update-time interval",
    inputSchema: reqFindIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqFindIterationsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqFindIterationsHandler
  }),
  "req_list_iterations": defineProductTool({
    description: "List CodeArts Req iterations",
    inputSchema: reqListIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListIterationsHandler
  }),
  "req_list_project_iterations_v4": defineProductTool({
    description: "List CodeArts Req iterations through the official ListProjectIterationsV4 endpoint",
    inputSchema: reqListIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListIterationsHandler
  }),
  "req_list_iteration_work_items": defineProductTool({
    description: "List CodeArts Req work items in an iteration",
    inputSchema: reqListIterationWorkItemsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListIterationWorkItemsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListIterationWorkItemsHandler
  }),
  "req_list_iteration_status_statistics": defineProductTool({
    description: "List CodeArts Req iteration status statistics",
    inputSchema: reqListIterationStatusStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListIterationStatusStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListIterationStatusStatisticsHandler
  }),
  "req_list_status_statistic": defineProductTool({
    description: "List CodeArts Req iteration status statistics through the official ListStatusStatistic endpoint",
    inputSchema: reqListIterationStatusStatisticsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListIterationStatusStatisticsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListIterationStatusStatisticsHandler
  }),
  "req_list_ir_children": defineProductTool({
    description: "List CodeArts Req requirement pool IR children",
    inputSchema: reqListIrChildrenInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIrChildrenHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIrChildrenHandler
  }),
  "req_list_ir_histories": defineProductTool({
    description: "List CodeArts Req requirement pool IR history records",
    inputSchema: reqListIrHistoriesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListIrHistoriesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListIrHistoriesHandler
  }),
  "req_list_rrs": defineProductTool({
    description: "List CodeArts Req requirement pool RRs",
    inputSchema: reqListRrsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListRrsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListRrsHandler
  }),
  "req_list_rr_statuses": defineProductTool({
    description: "List CodeArts Req requirement pool RR statuses",
    inputSchema: reqListRrStatusesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListRrStatusesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListRrStatusesHandler
  }),
  "req_list_rr_histories": defineProductTool({
    description: "List CodeArts Req requirement pool RR history records",
    inputSchema: reqListRrHistoriesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListRrHistoriesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListRrHistoriesHandler
  }),
  "req_list_plans": defineProductTool({
    description: "List CodeArts Req plans",
    inputSchema: reqListPlansInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListPlansHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListPlansHandler
  }),
  "req_show_scrum_plans_by_condition": defineProductTool({
    description: "Show CodeArts Req scrum plans by condition through the official ShowScrumPlansByCondition endpoint",
    inputSchema: reqListPlansInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListPlansHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListPlansHandler
  }),
  "req_list_release_plans": defineProductTool({
    description: "List CodeArts Req release or iteration plans",
    inputSchema: reqListReleasePlansInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListReleasePlansHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListReleasePlansHandler
  }),
  "req_list_project_work_hours": defineProductTool({
    description: "List CodeArts Req project work hour records",
    inputSchema: reqListProjectWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectWorkHoursHandler
  }),
  "req_list_project_user_work_hours": defineProductTool({
    description: "List CodeArts Req project work hour records by user from the official single-project endpoint",
    inputSchema: reqListProjectUserWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectUserWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectUserWorkHoursHandler
  }),
  "req_show_project_work_hours": defineProductTool({
    description: "Show CodeArts Req project work hour records through the official single-project endpoint",
    inputSchema: reqListProjectUserWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectUserWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectUserWorkHoursHandler
  }),
  "req_list_project_versions": defineProductTool({
    description: "List CodeArts Req project versions",
    inputSchema: reqListProjectVersionsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectVersionsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectVersionsHandler
  }),
  "req_list_project_member_work_hours": defineProductTool({
    description: "List CodeArts Req member work hour records",
    inputSchema: reqListProjectMemberWorkHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectMemberWorkHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectMemberWorkHoursHandler
  }),
  "req_list_project_work_hour_types": defineProductTool({
    description: "List CodeArts Req project work hour types",
    inputSchema: reqListProjectWorkHourTypesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkHourTypesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkHourTypesHandler
  }),
  "req_list_project_work_hours_type": defineProductTool({
    description: "List CodeArts Req project work hour types through the official V4 endpoint",
    inputSchema: reqListProjectWorkHourTypesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkHourTypesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkHourTypesHandler
  }),
  "req_list_project_work_hour_types_v5": defineProductTool({
    description: "List CodeArts Req project work hour types from the official V5 endpoint",
    inputSchema: reqListProjectWorkHourTypesV5Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkHourTypesV5Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkHourTypesV5Handler
  }),
  "req_list_project_work_item_records": defineProductTool({
    description: "List CodeArts Req project work item records",
    inputSchema: reqListProjectWorkItemRecordsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkItemRecordsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkItemRecordsHandler
  }),
  "req_list_project_issues_records_v4": defineProductTool({
    description: "List CodeArts Req project work item records through the official ListProjectIssuesRecordsV4 endpoint",
    inputSchema: reqListProjectWorkItemRecordsInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkItemRecordsHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkItemRecordsHandler
  }),
  "req_list_plan_addable_work_items": defineProductTool({
    description: "List addable work items for a CodeArts Req plan",
    inputSchema: reqListPlanAddableWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListPlanAddableWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListPlanAddableWorkItemsHandler
  }),
  "req_list_plan_work_items": defineProductTool({
    description: "List CodeArts Req work items in a plan",
    inputSchema: reqListPlanWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListPlanWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListPlanWorkItemsHandler
  }),
  "req_update_iteration_state": defineProductTool({
    description: "Update CodeArts Req iteration state",
    inputSchema: reqUpdateIterationStateInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIterationStateHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateIterationStateHandler,
    rateLimitAction: "req_update_iteration_state"
  }),
  "req_query_iteration_immovable_issues": defineProductTool({
    description: "Query CodeArts Req iteration immovable issues",
    inputSchema: reqQueryIterationImmovableIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqQueryIterationImmovableIssuesHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqQueryIterationImmovableIssuesHandler
  }),
  "req_query_scrum_version_work_items_v2": defineProductTool({
    description: "Query CodeArts Req scrum version work items from the official V2 endpoint",
    inputSchema: reqQueryScrumVersionWorkItemsV2Input,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqQueryScrumVersionWorkItemsV2Handler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqQueryScrumVersionWorkItemsV2Handler
  }),
  "req_update_work_item": defineProductTool({
    description: "Update CodeArts Req work item",
    inputSchema: reqUpdateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateWorkItemHandler,
    rateLimitAction: "req_update_work_item"
  }),
  "req_update_issue_v3": defineProductTool({
    description: "Update CodeArts Req work item through the official V3 token-header endpoint",
    inputSchema: reqUpdateIssueV3Input,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateIssueV3Handler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateIssueV3Handler,
    rateLimitAction: "req_update_issue_v3"
  }),
  "req_update_issue_v4": defineProductTool({
    description: "Update CodeArts Req work item through the official V4 issue endpoint",
    inputSchema: reqUpdateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateWorkItemHandler,
    rateLimitAction: "req_update_issue_v4"
  }),
  "req_update_work_item_comment": defineProductTool({
    description: "Update a CodeArts Req work item comment",
    inputSchema: reqUpdateWorkItemCommentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemCommentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateWorkItemCommentHandler,
    rateLimitAction: "req_update_work_item_comment"
  }),
  "req_update_work_item_flow": defineProductTool({
    description: "Update CodeArts Req work item flow",
    inputSchema: reqUpdateWorkItemFlowInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemFlowHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateWorkItemFlowHandler,
    rateLimitAction: "req_update_work_item_flow"
  }),
  "req_update_issue_flow": defineProductTool({
    description: "Update CodeArts Req work item flow through the official V2 issue-flowage endpoint",
    inputSchema: reqUpdateWorkItemFlowInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemFlowHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateWorkItemFlowHandler,
    rateLimitAction: "req_update_issue_flow"
  }),
  "req_update_project_member_role": defineProductTool({
    description: "Update a CodeArts Req project member role",
    inputSchema: reqUpdateProjectMemberRoleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectMemberRoleHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectMemberRoleHandler,
    rateLimitAction: "req_update_project_member_role"
  }),
  "req_update_members_role_v4": defineProductTool({
    description: "Update a CodeArts Req project member role through the official V4 endpoint",
    inputSchema: reqUpdateProjectMemberRoleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectMemberRoleHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectMemberRoleHandler,
    rateLimitAction: "req_update_members_role_v4"
  }),
  "req_update_membes_role_v4": defineProductTool({
    description: "Update a CodeArts Req project member role through the official UpdateMembesRoleV4 endpoint",
    inputSchema: reqUpdateProjectMemberRoleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectMemberRoleHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectMemberRoleHandler,
    rateLimitAction: "req_update_membes_role_v4"
  }),
  "req_list_project_members": defineProductTool({
    description: "List CodeArts Req project members",
    inputSchema: reqListProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectMembersHandler
  }),
  "req_list_project_members_v4": defineProductTool({
    description: "List CodeArts Req project members through the official V4 endpoint",
    inputSchema: reqListProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectMembersHandler
  }),
  "req_list_devuc_project_members": defineProductTool({
    description: "List CodeArts Req DevUC project members from the official V3 endpoint",
    inputSchema: reqListDevucProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListDevucProjectMembersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListDevucProjectMembersHandler
  }),
  "req_validate_module_name": defineProductTool({
    description: "Validate whether a CodeArts Req module name already exists",
    inputSchema: reqValidateModuleNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqValidateModuleNameHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqValidateModuleNameHandler
  }),
  "req_validate_project_template_name": defineProductTool({
    description: "Validate whether a CodeArts Req project template name already exists",
    inputSchema: reqValidateProjectTemplateNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqValidateProjectTemplateNameHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqValidateProjectTemplateNameHandler
  })
} as const;

export function registerReqTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: ReqStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: reqToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
