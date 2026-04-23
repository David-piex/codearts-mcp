import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createReqClient } from "../products/req/client.js";
import {
  reqAddWorkItemCommentInput,
  reqAddProjectMemberInput,
  reqBatchAddProjectMembersInput,
  reqBatchDeleteProjectMembersInput,
  reqBatchDeleteIterationsInput,
  reqCheckProjectNameInput,
  reqCreateIterationInput,
  reqCreateProjectInput,
  reqCreateProjectModuleInput,
  reqDeleteProjectInput,
  reqDeleteIterationInput,
  reqDeleteProjectModuleInput,
  reqDeleteWorkItemInput,
  reqCreateWorkItemInput,
  reqBatchUpdateWorkItemsInput,
  reqListBoardWorkItemStatusRecordsInput,
  reqListBoardWorkItemWorkflowConfigInput,
  reqListBoardWorkItemsInput,
  reqListCacheDataInput,
  reqGetProjectPublicConfigInput,
  reqGetIterationInput,
  reqGetProjectInput,
  reqListJobCacheBoardsInput,
  reqListOptionalWorkItemStatusConfigsInput,
  reqQueryIterationImmovableIssuesInput,
  reqGetWorkItemInput,
  reqLeaveProjectInput,
  reqListAssociatedCommitsInput,
  reqListAssociatedIssuesInput,
  reqListAssociatedTestCasesInput,
  reqListIterationsInput,
  reqListNotAddedProjectsInput,
  reqListProjectModulesInput,
  reqListProjectMembersInput,
  reqListProjectsInput,
  reqListRelatedUsersInput,
  reqListWorkItemCustomFieldsInput,
  reqListWorkItemCommentsInput,
  reqListWorkItemStatusAttributesInput,
  reqListWorkItemStatusConfigsInput,
  reqListWorkItemStatusDetailsInput,
  reqGetWorkItemStatusRuleFlagInput,
  reqListWorkItemStatusesInput,
  reqGetWorkItemTemplateConfigInput,
  reqListWorkItemTrackerHandlersInput,
  reqListWorkItemTemplatesInput,
  reqListWorkItemWorkflowConfigInput,
  reqListWorkItemRecordsInput,
  reqListWorkItemsInput,
  reqUpdateIterationInput,
  reqUpdateIterationStateInput,
  reqUpdateProjectModuleInput,
  reqUpdateProjectMemberRoleInput,
  reqUpdateProjectInput,
  reqUpdateWorkItemCommentInput,
  reqUpdateWorkItemFlowInput,
  reqUpdateWorkItemInput
} from "../products/req/schemas.js";
import { createReqAddWorkItemCommentHandler } from "../products/req/tools/add-work-item-comment.js";
import { createReqAddProjectMemberHandler } from "../products/req/tools/add-project-member.js";
import { createReqBatchAddProjectMembersHandler } from "../products/req/tools/batch-add-project-members.js";
import { createReqBatchDeleteProjectMembersHandler } from "../products/req/tools/batch-delete-project-members.js";
import { createReqBatchDeleteIterationsHandler } from "../products/req/tools/batch-delete-iterations.js";
import { createReqCheckProjectNameHandler } from "../products/req/tools/check-project-name.js";
import { createReqCreateIterationHandler } from "../products/req/tools/create-iteration.js";
import { createReqCreateProjectHandler } from "../products/req/tools/create-project.js";
import { createReqCreateProjectModuleHandler } from "../products/req/tools/create-project-module.js";
import { createReqDeleteProjectHandler } from "../products/req/tools/delete-project.js";
import { createReqDeleteIterationHandler } from "../products/req/tools/delete-iteration.js";
import { createReqDeleteProjectModuleHandler } from "../products/req/tools/delete-project-module.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqDeleteWorkItemHandler } from "../products/req/tools/delete-work-item.js";
import { createReqBatchUpdateWorkItemsHandler } from "../products/req/tools/batch-update-work-items.js";
import { createReqGetIterationHandler } from "../products/req/tools/get-iteration.js";
import { createReqGetProjectPublicConfigHandler } from "../products/req/tools/get-project-public-config.js";
import { createReqGetProjectHandler } from "../products/req/tools/get-project.js";
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqLeaveProjectHandler } from "../products/req/tools/leave-project.js";
import { createReqListAssociatedCommitsHandler } from "../products/req/tools/list-associated-commits.js";
import { createReqListAssociatedIssuesHandler } from "../products/req/tools/list-associated-issues.js";
import { createReqListAssociatedTestCasesHandler } from "../products/req/tools/list-associated-test-cases.js";
import { createReqListBoardWorkItemStatusRecordsHandler } from "../products/req/tools/list-board-work-item-status-records.js";
import { createReqListBoardWorkItemWorkflowConfigHandler } from "../products/req/tools/list-board-work-item-workflow-config.js";
import { createReqListBoardWorkItemsHandler } from "../products/req/tools/list-board-work-items.js";
import { createReqListCacheDataHandler } from "../products/req/tools/list-cache-data.js";
import { createReqListIterationsHandler } from "../products/req/tools/list-iterations.js";
import { createReqListJobCacheBoardsHandler } from "../products/req/tools/list-job-cache-boards.js";
import { createReqListOptionalWorkItemStatusConfigsHandler } from "../products/req/tools/list-optional-work-item-status-configs.js";
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
import { createReqGetWorkItemTemplateConfigHandler } from "../products/req/tools/get-work-item-template-config.js";
import { createReqListWorkItemTrackerHandlersHandler } from "../products/req/tools/list-work-item-tracker-handlers.js";
import { createReqListWorkItemTemplatesHandler } from "../products/req/tools/list-work-item-templates.js";
import { createReqListWorkItemWorkflowConfigHandler } from "../products/req/tools/list-work-item-workflow-config.js";
import { createReqListWorkItemRecordsHandler } from "../products/req/tools/list-work-item-records.js";
import { createReqListWorkItemsHandler } from "../products/req/tools/list-work-items.js";
import { createReqQueryIterationImmovableIssuesHandler } from "../products/req/tools/query-iteration-immovable-issues.js";
import { createReqUpdateIterationHandler } from "../products/req/tools/update-iteration.js";
import { createReqUpdateIterationStateHandler } from "../products/req/tools/update-iteration-state.js";
import { createReqUpdateProjectModuleHandler } from "../products/req/tools/update-project-module.js";
import { createReqUpdateProjectMemberRoleHandler } from "../products/req/tools/update-project-member-role.js";
import { createReqUpdateProjectHandler } from "../products/req/tools/update-project.js";
import { createReqUpdateWorkItemCommentHandler } from "../products/req/tools/update-work-item-comment.js";
import { createReqUpdateWorkItemFlowHandler } from "../products/req/tools/update-work-item-flow.js";
import { createReqUpdateWorkItemHandler } from "../products/req/tools/update-work-item.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type ReqStdioClient = ReturnType<typeof createReqClient>;

const reqToolDefinitions = {
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
  "req_create_project": defineProductTool({
    description: "Create CodeArts Req project",
    inputSchema: reqCreateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateProjectHandler,
    rateLimitAction: "req_create_project"
  }),
  "req_create_iteration": defineProductTool({
    description: "Create CodeArts Req iteration",
    inputSchema: reqCreateIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCreateIterationHandler,
    rateLimitAction: "req_create_iteration"
  }),
  "req_create_project_module": defineProductTool({
    description: "Create CodeArts Req project module",
    inputSchema: reqCreateProjectModuleInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCreateProjectModuleHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqCreateProjectModuleHandler,
    rateLimitAction: "req_create_project_module"
  }),
  "req_update_project": defineProductTool({
    description: "Update CodeArts Req project",
    inputSchema: reqUpdateProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqUpdateProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqUpdateProjectHandler,
    rateLimitAction: "req_update_project"
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
  "req_delete_project": defineProductTool({
    description: "Delete CodeArts Req project",
    inputSchema: reqDeleteProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqDeleteProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqDeleteProjectHandler,
    rateLimitAction: "req_delete_project"
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
  "req_check_project_name": defineProductTool({
    description: "Check whether a CodeArts Req project name exists",
    inputSchema: reqCheckProjectNameInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqCheckProjectNameHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqCheckProjectNameHandler
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
  "req_get_project": defineProductTool({
    description: "Get CodeArts Req project detail",
    inputSchema: reqGetProjectInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetProjectHandler
  }),
  "req_get_project_public_config": defineProductTool({
    description: "Get CodeArts Req project public config",
    inputSchema: reqGetProjectPublicConfigInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetProjectPublicConfigHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqGetProjectPublicConfigHandler
  }),
  "req_get_iteration": defineProductTool({
    description: "Get CodeArts Req iteration detail",
    inputSchema: reqGetIterationInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqGetIterationHandler>[0] }) => clients.reqClient,
    createProductHandler: createReqGetIterationHandler
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
  "req_list_work_item_comments": defineProductTool({
    description: "List CodeArts Req work item comments",
    inputSchema: reqListWorkItemCommentsInput,
    selectHttpClient: (clients: { reqClient: Parameters<typeof createReqListWorkItemCommentsHandler>[0] }) =>
      clients.reqClient,
    createProductHandler: createReqListWorkItemCommentsHandler
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
