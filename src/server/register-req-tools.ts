import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createReqClient } from "../products/req/client.js";
import {
  reqAddIterationWorkItemsInput,
  reqAddPlanWorkItemsInput,
  reqAddWorkItemCommentInput,
  reqAddWorkItemWorkHourInput,
  reqAddProjectMemberInput,
  reqBatchAddProjectMembersInput,
  reqBatchCreateTrackerConfigInput,
  reqBatchDeleteReleasePlansInput,
  reqBatchCreateIpdIssuesInput,
  reqBatchDeleteIpdIssuesInput,
  reqBatchDeleteProjectMembersInput,
  reqBatchDeleteIterationsInput,
  reqBatchDeleteWorkItemsInput,
  reqBatchTransferIpdWorkItemFlowInput,
  reqBatchUpdateIpdIssuesInput,
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
  reqCreateProjectInput,
  reqCreateProjectDomainInput,
  reqCreateProjectModuleInput,
  reqCreateProjectStatusConfigInput,
  reqCancelProjectDomainInput,
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
  reqDeleteWorkItemInput,
  reqCreateWorkItemInput,
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
  reqDownloadIpdIssueAttachmentInput,
  reqDownloadIpdIssueImageInput,
  reqGetProjectPublicConfigInput,
  reqGetProjectSummaryInput,
  reqGetProjectWorkhourConfigInput,
  reqGetIterationInput,
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
  reqListReleasePlansInput,
  reqListProgramFieldsInput,
  reqListProgramsInput,
  reqListProjectBugStatisticsInput,
  reqListProjectDemandStatisticsInput,
  reqListProjectDomainsInput,
  reqListUserFeaturesInput,
  reqListProjectWorkHourTypesInput,
  reqListProjectWorkHoursInput,
  reqListProjectWorkItemRecordsInput,
  reqQueryIterationImmovableIssuesInput,
  reqGetWorkItemInput,
  reqLeaveProjectInput,
  reqListAssociatedCommitsInput,
  reqListAssociatedIssuesInput,
  reqListAssociatedTestCasesInput,
  reqListAssociatedWikisInput,
  reqListIterationsInput,
  reqListNotAddedProjectsInput,
  reqListProjectModulesInput,
  reqListProjectMembersInput,
  reqListProjectsInput,
  reqListRelatedUsersInput,
  reqListWorkItemCustomFieldsInput,
  reqListWorkItemCommentsInput,
  reqListWorkItemWorkHoursInput,
  reqListWorkItemStatusAttributesInput,
  reqListWorkItemStatusConfigsInput,
  reqListWorkItemStatusDetailsInput,
  reqGetWorkItemStatusRuleFlagInput,
  reqListWorkItemStatusesInput,
  reqListWorkItemTagsInput,
  reqListWorkItemTreeInput,
  reqGetWorkItemTemplateConfigInput,
  reqListWorkItemTrackerHandlersInput,
  reqListWorkItemTemplatesInput,
  reqListWorkItemWorkflowConfigInput,
  reqListWorkItemRecordsInput,
  reqListWorkItemsInput,
  reqListRrHistoriesInput,
  reqListRrsInput,
  reqListRrStatusesInput,
  reqUpdatePlanInput,
  reqUpdateReleasePlanInput,
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
  reqUpdateCacheDataInput,
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
  reqUploadAttachmentInput,
  reqUploadIpdIssueAttachmentInput,
  reqUploadIpdIssueImageInput,
  reqUploadWorkItemImageInput,
  reqValidateModuleNameInput
} from "../products/req/schemas.js";
import { createReqAddIterationWorkItemsHandler } from "../products/req/tools/add-iteration-work-items.js";
import { createReqAddPlanWorkItemsHandler } from "../products/req/tools/add-plan-work-items.js";
import { createReqAddWorkItemCommentHandler } from "../products/req/tools/add-work-item-comment.js";
import { createReqAddWorkItemWorkHourHandler } from "../products/req/tools/add-work-item-work-hour.js";
import { createReqAddProjectMemberHandler } from "../products/req/tools/add-project-member.js";
import { createReqBatchAddProjectMembersHandler } from "../products/req/tools/batch-add-project-members.js";
import { createReqBatchCreateTrackerConfigHandler } from "../products/req/tools/batch-create-tracker-config.js";
import { createReqBatchDeleteReleasePlansHandler } from "../products/req/tools/batch-delete-release-plans.js";
import { createReqBatchDeleteProjectMembersHandler } from "../products/req/tools/batch-delete-project-members.js";
import { createReqBatchDeleteIterationsHandler } from "../products/req/tools/batch-delete-iterations.js";
import { createReqBatchDeleteWorkItemsHandler } from "../products/req/tools/batch-delete-work-items.js";
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
import { createReqCreateProjectHandler } from "../products/req/tools/create-project.js";
import { createReqCreateProjectDomainHandler } from "../products/req/tools/create-project-domain.js";
import { createReqCreateProjectModuleHandler } from "../products/req/tools/create-project-module.js";
import { createReqCreateProjectStatusConfigHandler } from "../products/req/tools/create-project-status-config.js";
import { createReqCancelProjectDomainHandler } from "../products/req/tools/cancel-project-domain.js";
import { createReqDeleteAttachmentHandler } from "../products/req/tools/delete-attachment.js";
import { createReqDeletePlanHandler } from "../products/req/tools/delete-plan.js";
import { createReqDeleteProjectHandler } from "../products/req/tools/delete-project.js";
import { createReqDeleteIterationHandler } from "../products/req/tools/delete-iteration.js";
import { createReqDeleteProjectModuleHandler } from "../products/req/tools/delete-project-module.js";
import { createReqDeleteProjectTemplateHandler } from "../products/req/tools/delete-project-template.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqDeleteWorkItemHandler } from "../products/req/tools/delete-work-item.js";
import { createReqDownloadAttachmentHandler } from "../products/req/tools/download-attachment.js";
import { createReqDownloadImageFileHandler } from "../products/req/tools/download-image-file.js";
import { createReqBatchUpdateWorkItemsHandler } from "../products/req/tools/batch-update-work-items.js";
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
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqGetWorkItemCompletionRateHandler } from "../products/req/tools/get-work-item-completion-rate.js";
import { createReqGetWorkItemIssueDetailsHandler } from "../products/req/tools/get-work-item-issue-details.js";
import { createReqGetWorkItemIndexCountsHandler } from "../products/req/tools/get-work-item-index-counts.js";
import { createReqLeaveProjectHandler } from "../products/req/tools/leave-project.js";
import { createReqListAssociatedCommitsHandler } from "../products/req/tools/list-associated-commits.js";
import { createReqListAssociatedIssuesHandler } from "../products/req/tools/list-associated-issues.js";
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
import { createReqListReleasePlansHandler } from "../products/req/tools/list-release-plans.js";
import { createReqListProgramFieldsHandler } from "../products/req/tools/list-program-fields.js";
import { createReqListProgramsHandler } from "../products/req/tools/list-programs.js";
import { createReqListProjectBugStatisticsHandler } from "../products/req/tools/list-project-bug-statistics.js";
import { createReqListProjectDemandStatisticsHandler } from "../products/req/tools/list-project-demand-statistics.js";
import { createReqListProjectDomainsHandler } from "../products/req/tools/list-project-domains.js";
import { createReqListUserFeaturesHandler } from "../products/req/tools/list-user-features.js";
import { createReqListProjectWorkHourTypesHandler } from "../products/req/tools/list-project-work-hour-types.js";
import { createReqListProjectWorkHoursHandler } from "../products/req/tools/list-project-work-hours.js";
import { createReqListProjectWorkItemRecordsHandler } from "../products/req/tools/list-project-work-item-records.js";
import { createReqListNotAddedProjectsHandler } from "../products/req/tools/list-not-added-projects.js";
import { createReqListProjectModulesHandler } from "../products/req/tools/list-project-modules.js";
import { createReqListProjectMembersHandler } from "../products/req/tools/list-project-members.js";
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
import { createReqListWorkItemWorkHoursHandler } from "../products/req/tools/list-work-item-work-hours.js";
import { createReqListWorkItemsHandler } from "../products/req/tools/list-work-items.js";
import { createReqListRrHistoriesHandler } from "../products/req/tools/list-rr-histories.js";
import { createReqListRrStatusesHandler } from "../products/req/tools/list-rr-statuses.js";
import { createReqListRrsHandler } from "../products/req/tools/list-rrs.js";
import { createReqQueryIterationImmovableIssuesHandler } from "../products/req/tools/query-iteration-immovable-issues.js";
import { createReqUpdatePlanHandler } from "../products/req/tools/update-plan.js";
import { createReqUpdatePlanImageHandler } from "../products/req/tools/update-plan-image.js";
import { createReqUpdateReleasePlanHandler } from "../products/req/tools/update-release-plan.js";
import { createReqUpdateIterationHandler } from "../products/req/tools/update-iteration.js";
import { createReqUpdateIterationStateHandler } from "../products/req/tools/update-iteration-state.js";
import { createReqUpdateCacheDataHandler } from "../products/req/tools/update-cache-data.js";
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
import { createReqUploadAttachmentHandler } from "../products/req/tools/upload-attachment.js";
import { createReqUploadWorkItemImageHandler } from "../products/req/tools/upload-work-item-image.js";
import { createReqValidateModuleNameHandler } from "../products/req/tools/validate-module-name.js";
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
  "req_batch_add_project_members": defineProductTool({
    description: "Add multiple members to a CodeArts Req project",
    inputSchema: reqBatchAddProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchAddProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchAddProjectMembersHandler,
    rateLimitAction: "req_batch_add_project_members"
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
  "req_batch_delete_iterations": defineProductTool({
    description: "Delete multiple CodeArts Req iterations",
    inputSchema: reqBatchDeleteIterationsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteIterationsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchDeleteIterationsHandler,
    rateLimitAction: "req_batch_delete_iterations"
  }),
  "req_batch_delete_work_items": defineProductTool({
    description: "Delete multiple CodeArts Req work items",
    inputSchema: reqBatchDeleteWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchDeleteWorkItemsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqBatchDeleteWorkItemsHandler,
    rateLimitAction: "req_batch_delete_work_items"
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
  "req_create_project": defineProductTool({
    description: "Create CodeArts Req project",
    inputSchema: reqCreateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateProjectHandler,
    rateLimitAction: "req_create_project"
  }),
  "req_create_plan": defineProductTool({
    description: "Create CodeArts Req plan",
    inputSchema: reqCreatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreatePlanHandler,
    rateLimitAction: "req_create_plan"
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
  "req_update_project": defineProductTool({
    description: "Update CodeArts Req project",
    inputSchema: reqUpdateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectHandler,
    rateLimitAction: "req_update_project"
  }),
  "req_update_plan": defineProductTool({
    description: "Update CodeArts Req plan",
    inputSchema: reqUpdatePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdatePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdatePlanHandler,
    rateLimitAction: "req_update_plan"
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
  "req_delete_plan": defineProductTool({
    description: "Delete CodeArts Req plan",
    inputSchema: reqDeletePlanInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeletePlanHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeletePlanHandler,
    rateLimitAction: "req_delete_plan"
  }),
  "req_delete_iteration": defineProductTool({
    description: "Delete CodeArts Req iteration",
    inputSchema: reqDeleteIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteIterationHandler,
    rateLimitAction: "req_delete_iteration"
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
  "req_list_projects": defineProductTool({
    description: "List CodeArts Req projects",
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
  "req_get_current_user_role": defineProductTool({
    description: "Get current CodeArts Req user role in a project",
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
  "req_get_project_bug_density": defineProductTool({
    description: "Get CodeArts Req project bug density metric",
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
  "req_get_project_completion_rate": defineProductTool({
    description: "Get CodeArts Req project completion rate metric",
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
  "req_list_project_domains": defineProductTool({
    description: "List CodeArts Req project domains",
    inputSchema: reqListProjectDomainsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectDomainsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListProjectDomainsHandler
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
  "req_upload_ipd_issue_attachment": defineProductTool({
    description: "Upload attachment to CodeArts Req IPD issue",
    inputSchema: reqUploadIpdIssueAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadIpdIssueAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadIpdIssueAttachmentHandler,
    rateLimitAction: "req_upload_ipd_issue_attachment"
  }),
  "req_list_ipd_issue_attachments": defineProductTool({
    description: "List CodeArts Req IPD issue attachments",
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
  "req_get_project_summary": defineProductTool({
    description: "Get CodeArts Req project summary",
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
  "req_leave_project": defineProductTool({
    description: "Leave a CodeArts Req project as the current member",
    inputSchema: reqLeaveProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqLeaveProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqLeaveProjectHandler,
    rateLimitAction: "req_leave_project"
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
  "req_upload_work_item_image": defineProductTool({
    description: "Upload an image for CodeArts Req work items",
    inputSchema: reqUploadWorkItemImageInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadWorkItemImageHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadWorkItemImageHandler,
    rateLimitAction: "req_upload_work_item_image"
  }),
  "req_upload_attachment": defineProductTool({
    description: "Upload a CodeArts Req work item attachment",
    inputSchema: reqUploadAttachmentInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUploadAttachmentHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUploadAttachmentHandler,
    rateLimitAction: "req_upload_attachment"
  }),
  "req_create_work_item": defineProductTool({
    description: "Create CodeArts Req work item",
    inputSchema: reqCreateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateWorkItemHandler,
    rateLimitAction: "req_create_work_item"
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
  "req_update_working_hours": defineProductTool({
    description: "Update a CodeArts Req work item work hour record",
    inputSchema: reqUpdateWorkingHoursInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkingHoursHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqUpdateWorkingHoursHandler,
    rateLimitAction: "req_update_working_hours"
  }),
  "req_delete_work_item": defineProductTool({
    description: "Delete CodeArts Req work item",
    inputSchema: reqDeleteWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteWorkItemHandler,
    rateLimitAction: "req_delete_work_item"
  }),
  "req_batch_update_work_items": defineProductTool({
    description: "Batch update CodeArts Req work items",
    inputSchema: reqBatchUpdateWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqBatchUpdateWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqBatchUpdateWorkItemsHandler,
    rateLimitAction: "req_batch_update_work_items"
  }),
  "req_list_work_items": defineProductTool({
    description: "List CodeArts Req work items",
    inputSchema: reqListWorkItemsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemsHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListWorkItemsHandler
  }),
  "req_list_associated_issues": defineProductTool({
    description: "List CodeArts Req associated issues",
    inputSchema: reqListAssociatedIssuesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedIssuesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedIssuesHandler
  }),
  "req_list_associated_commits": defineProductTool({
    description: "List CodeArts Req associated commits",
    inputSchema: reqListAssociatedCommitsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListAssociatedCommitsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListAssociatedCommitsHandler
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
  "req_list_work_item_status_attributes": defineProductTool({
    description: "List CodeArts Req work item status attributes",
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
  "req_list_work_item_templates": defineProductTool({
    description: "List CodeArts Req work item templates",
    inputSchema: reqListWorkItemTemplatesInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTemplatesHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTemplatesHandler
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
  "req_list_work_item_tracker_handlers": defineProductTool({
    description: "List CodeArts Req work item tracker handlers",
    inputSchema: reqListWorkItemTrackerHandlersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTrackerHandlersHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTrackerHandlersHandler
  }),
  "req_get_work_item": defineProductTool({
    description: "Get CodeArts Req work item detail",
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
  "req_get_work_item_issue_details": defineProductTool({
    description: "Get aggregated CodeArts Req work item details from stable work item and comment endpoints",
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
  "req_list_work_item_comments": defineProductTool({
    description: "List CodeArts Req work item comments",
    inputSchema: reqListWorkItemCommentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCommentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCommentsHandler
  }),
  "req_list_work_item_tags": defineProductTool({
    description: "List CodeArts Req work item tags",
    inputSchema: reqListWorkItemTagsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemTagsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemTagsHandler
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
  "req_list_work_item_work_hours": defineProductTool({
    description: "List CodeArts Req work hour records for a work item",
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
  "req_list_iterations": defineProductTool({
    description: "List CodeArts Req iterations",
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
  "req_list_project_work_hour_types": defineProductTool({
    description: "List CodeArts Req project work hour types",
    inputSchema: reqListProjectWorkHourTypesInput,
    selectHttpClient: (clients: {
      reqClient: Parameters<typeof createReqListProjectWorkHourTypesHandler>[0];
    }) => clients.reqClient,
    createProductHandler: createReqListProjectWorkHourTypesHandler
  }),
  "req_list_project_work_item_records": defineProductTool({
    description: "List CodeArts Req project work item records",
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
  "req_update_work_item": defineProductTool({
    description: "Update CodeArts Req work item",
    inputSchema: reqUpdateWorkItemInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateWorkItemHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateWorkItemHandler,
    rateLimitAction: "req_update_work_item"
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
  "req_update_project_member_role": defineProductTool({
    description: "Update a CodeArts Req project member role",
    inputSchema: reqUpdateProjectMemberRoleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectMemberRoleHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectMemberRoleHandler,
    rateLimitAction: "req_update_project_member_role"
  }),
  "req_list_project_members": defineProductTool({
    description: "List CodeArts Req project members",
    inputSchema: reqListProjectMembersInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListProjectMembersHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqListProjectMembersHandler
  }),
  "req_validate_module_name": defineProductTool({
    description: "Validate whether a CodeArts Req module name already exists",
    inputSchema: reqValidateModuleNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqValidateModuleNameHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqValidateModuleNameHandler
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
