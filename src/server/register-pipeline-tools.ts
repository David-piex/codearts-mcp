import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createPipelineClient } from "../products/pipeline/client.js";
import {
  pipelineApproveRunInput,
  pipelineBatchRunResultInput,
  pipelineBatchDeleteInput,
  pipelineBatchGetPipelineStatusInput,
  pipelineBatchRunInput,
  pipelineCancelQueueInput,
  pipelineGetPluginPartsInput,
  pipelineGetPluginVersionInput,
  pipelineBindVariableGroupsToPipelineInput,
  pipelineCheckComponentInput,
  pipelineCheckProjectInput,
  pipelineCreateExtensionEndpointInput,
  pipelineCreateGroupInput,
  pipelineCreateByTemplateInput,
  pipelineCreateInput,
  pipelineCreateRuleInput,
  pipelineCreateTagInput,
  pipelineCreateVariableGroupInput,
  pipelineDeleteExtensionEndpointInput,
  pipelineDeleteTagInput,
  pipelineDeleteGroupInput,
  pipelineDeleteProjectStrategyInput,
  pipelineDeleteRuleInput,
  pipelineDeleteStrategyInput,
  pipelineDeleteVariableGroupInput,
  pipelineDeletePipelineInput,
  pipelineGetExtensionEndpointInput,
  pipelineGetExtensionModuleInput,
  pipelineGetInput,
  pipelineGetChangeRequestInput,
  pipelineGetComponentInput,
  pipelineGetDevucAuthInput,
  pipelineGetOauthAuthorizationUrlInput,
  pipelineGetPacActionInput,
  pipelineGetTemplateInput,
  pipelineGetWebhookInfoInput,
  pipelineGetNoticeMessagesInput,
  pipelineGetNoticeDetailInput,
  pipelineGetNoticeInput,
  pipelineGetPermissionInput,
  pipelineSwitchNoticeInput,
  pipelineSwitchPermissionInput,
  pipelineGetRunChangeRequestsInput,
  pipelineGetProjectStrategyDetailInput,
  pipelineGetProjectStrategyInput,
  pipelineGetProjectStrategyRelatedInfoInput,
  pipelineListArtifactsInput,
  pipelineDashboardQueryInput,
  pipelineListChangeRequestsInput,
  pipelineListComponentsInput,
  pipelineListExecutionPlansInput,
  pipelineListGroupsInput,
  pipelineListModifyHistoryInput,
  pipelineListProjectStrategiesInput,
  pipelineListQueueInput,
  pipelineListTagsInput,
  pipelineGetRuleInput,
  pipelineGetRuleRelatedInfoInput,
  pipelineGetStrategyInput,
  pipelineGetStrategyRelatedInfoInput,
  pipelineGetVariableGroupInput,
  pipelineGetManualReviewContextInput,
  pipelineGetRunLogInput,
  pipelineGetRunParametersInput,
  pipelineGetStepOutputsInput,
  pipelineGetRunInput,
  pipelineGetRunDetailInput,
  pipelineGetStepJumpLinkInput,
  pipelineListExtensionEndpointsInput,
  pipelineListExtensionModulesInput,
  pipelineListRuleTypesInput,
  pipelineListRulesInput,
  pipelineListPipelineVariableGroupsInput,
  pipelineMovePipelinesToGroupInput,
  pipelineRejectRunInput,
  pipelineRetryRunInput,
  pipelineListInput,
  pipelineListAvailablePublishersInput,
  pipelineListBasePluginsInput,
  pipelineListBasePluginsPagedInput,
  pipelineListPluginVersionsInput,
  pipelineListPluginsInput,
  pipelineListPublishersInput,
  pipelineListPacActionsInput,
  pipelineListReusableJobsInput,
  pipelineListRunsInput,
  pipelineListStagePluginsInput,
  pipelineListStrategiesInput,
  pipelineListStrategyChildrenInput,
  pipelineListPipelineVarsInput,
  pipelineListSystemVarsInput,
  pipelineListTriggerFailedRecordsInput,
  pipelineSetTagsForPipelinesInput,
  pipelineListVariableGroupsInput,
  pipelineListTemplatesInput,
  pipelineRunInput,
  pipelineInheritProjectStrategyInput,
  pipelineSwitchProjectStrategyInput,
  pipelineSwitchStrategyInput,
  pipelineStopRunInput,
  pipelineTogglePipelineInput,
  pipelineCreateProjectStrategyInput,
  pipelineUploadPublisherIconInput,
  pipelineUpdateExtensionEndpointInput,
  pipelineUpdateNoticeStatusInput,
  pipelineUpdateOfficialNoticeInput,
  pipelineUpdateRolePermissionInput,
  pipelineUpdateTagInput,
  pipelineUpdateThirdPartyNoticeInput,
  pipelineUpdatePipelineInfoInput,
  pipelineUpdateProjectStrategyInput,
  pipelineRollbackRunInput,
  pipelineUpdateRuleInput,
  pipelineCreateStrategyInput,
  pipelineUpdateStrategyInput,
  pipelineUpdateGroupInput,
  pipelineUpdateUserPermissionInput,
  pipelineUpdateVariableGroupInput
} from "../products/pipeline/schemas.js";
import { createPipelineApproveRunHandler } from "../products/pipeline/tools/approve-run.js";
import { createPipelineBindVariableGroupsToPipelineHandler } from "../products/pipeline/tools/bind-variable-groups-to-pipeline.js";
import { createPipelineCreateExtensionEndpointHandler } from "../products/pipeline/tools/create-extension-endpoint.js";
import { createPipelineCreateGroupHandler } from "../products/pipeline/tools/create-group.js";
import { createPipelineCreateProjectStrategyHandler } from "../products/pipeline/tools/create-project-strategy.js";
import { createPipelineCreateRuleHandler } from "../products/pipeline/tools/create-rule.js";
import { createPipelineCreateTagHandler } from "../products/pipeline/tools/create-tag.js";
import { createPipelineCreateVariableGroupHandler } from "../products/pipeline/tools/create-variable-group.js";
import {
  createPipelineBatchDeleteHandler,
  createPipelineBatchRunHandler,
  createPipelineCreateByTemplateHandler,
  createPipelineCreateHandler,
  createPipelineUpdateInfoHandler
} from "../products/pipeline/tools/manage-pipeline-core.js";
import {
  createPipelineSwitchNoticeHandler,
  createPipelineSwitchPermissionHandler,
  createPipelineUpdateNoticeStatusHandler,
  createPipelineUpdateOfficialNoticeHandler,
  createPipelineUpdateRolePermissionHandler,
  createPipelineUpdateThirdPartyNoticeHandler,
  createPipelineUpdateUserPermissionHandler
} from "../products/pipeline/tools/manage-pipeline-notice-permission.js";
import {
  createPipelineCancelQueueHandler,
  createPipelineGetBatchRunResultHandler,
  createPipelineGetRunChangeRequestsHandler,
  createPipelineGetStepJumpLinkHandler,
  createPipelineRollbackRunHandler
} from "../products/pipeline/tools/manage-run-advanced.js";
import { createPipelineDeleteExtensionEndpointHandler } from "../products/pipeline/tools/delete-extension-endpoint.js";
import { createPipelineDeleteGroupHandler } from "../products/pipeline/tools/delete-group.js";
import { createPipelineDeleteProjectStrategyHandler } from "../products/pipeline/tools/delete-project-strategy.js";
import { createPipelineDeleteRuleHandler } from "../products/pipeline/tools/delete-rule.js";
import { createPipelineDeleteStrategyHandler } from "../products/pipeline/tools/delete-strategy.js";
import { createPipelineDeleteTagHandler } from "../products/pipeline/tools/delete-tag.js";
import { createPipelineDeleteVariableGroupHandler } from "../products/pipeline/tools/delete-variable-group.js";
import { createPipelineDeletePipelineHandler } from "../products/pipeline/tools/delete-pipeline.js";
import { createPipelineDisablePipelineHandler } from "../products/pipeline/tools/disable-pipeline.js";
import { createPipelineEnablePipelineHandler } from "../products/pipeline/tools/enable-pipeline.js";
import { createPipelineGetExtensionEndpointHandler } from "../products/pipeline/tools/get-extension-endpoint.js";
import { createPipelineGetExtensionModuleHandler } from "../products/pipeline/tools/get-extension-module.js";
import { createPipelineGetManualReviewContextHandler } from "../products/pipeline/tools/get-manual-review-context.js";
import { createPipelineGetNoticeDetailHandler } from "../products/pipeline/tools/get-notice-detail.js";
import { createPipelineGetNoticeStatusHandler } from "../products/pipeline/tools/get-notice-status.js";
import { createPipelineGetOfficialNoticeHandler } from "../products/pipeline/tools/get-official-notice.js";
import { createPipelineGetPermissionSwitchHandler } from "../products/pipeline/tools/get-permission-switch.js";
import { createPipelineGetPipelineHandler } from "../products/pipeline/tools/get-pipeline.js";
import { createPipelineGetPluginInputsHandler } from "../products/pipeline/tools/get-plugin-inputs.js";
import { createPipelineGetPluginOutputsHandler } from "../products/pipeline/tools/get-plugin-outputs.js";
import { createPipelineGetPluginVersionHandler } from "../products/pipeline/tools/get-plugin-version.js";
import { createPipelineGetProjectStrategyDetailHandler } from "../products/pipeline/tools/get-project-strategy-detail.js";
import { createPipelineGetProjectStrategyHandler } from "../products/pipeline/tools/get-project-strategy.js";
import { createPipelineGetProjectStrategyRelatedInfoHandler } from "../products/pipeline/tools/get-project-strategy-related-info.js";
import { createPipelineGetRuleHandler } from "../products/pipeline/tools/get-rule.js";
import { createPipelineGetRuleRelatedInfoHandler } from "../products/pipeline/tools/get-rule-related-info.js";
import { createPipelineGetRolePermissionHandler } from "../products/pipeline/tools/get-role-permission.js";
import { createPipelineGetStrategyHandler } from "../products/pipeline/tools/get-strategy.js";
import { createPipelineGetStrategyRelatedInfoHandler } from "../products/pipeline/tools/get-strategy-related-info.js";
import { createPipelineGetTemplateHandler } from "../products/pipeline/tools/get-template.js";
import { createPipelineGetUserPermissionHandler } from "../products/pipeline/tools/get-user-permission.js";
import { createPipelineGetWebhookInfoHandler } from "../products/pipeline/tools/get-webhook-info.js";
import { createPipelineGetRunDetailHandler } from "../products/pipeline/tools/get-run-detail.js";
import { createPipelineGetRunLogHandler } from "../products/pipeline/tools/get-run-log.js";
import { createPipelineGetRunParametersHandler } from "../products/pipeline/tools/get-run-parameters.js";
import { createPipelineGetRunHandler } from "../products/pipeline/tools/get-run.js";
import { createPipelineGetStepOutputsHandler } from "../products/pipeline/tools/get-step-outputs.js";
import {
  createPipelineBatchGetPipelineStatusHandler,
  createPipelineCheckComponentHandler,
  createPipelineCheckProjectHandler,
  createPipelineGetChangeRequestHandler,
  createPipelineGetComponentHandler,
  createPipelineGetDashboardConcurrencyHandler,
  createPipelineGetDashboardExecutionsOverviewHandler,
  createPipelineGetDevucAuthHandler,
  createPipelineGetNoticeMessagesHandler,
  createPipelineGetOauthAuthorizationUrlHandler,
  createPipelineGetPacActionHandler,
  createPipelineListChangeRequestsHandler,
  createPipelineListComponentsHandler,
  createPipelineListDashboardPipelineCountsHandler,
  createPipelineListExecutionPlansHandler,
  createPipelineListPacActionsHandler,
  createPipelineListReusableJobsHandler
} from "../products/pipeline/tools/product-query-tools.js";
import { createPipelineListArtifactsHandler } from "../products/pipeline/tools/list-artifacts.js";
import { createPipelineListAvailablePublishersHandler } from "../products/pipeline/tools/list-available-publishers.js";
import { createPipelineListBasePluginsHandler } from "../products/pipeline/tools/list-base-plugins.js";
import { createPipelineListBasePluginsPagedHandler } from "../products/pipeline/tools/list-base-plugins-paged.js";
import { createPipelineListExtensionEndpointsHandler } from "../products/pipeline/tools/list-extension-endpoints.js";
import { createPipelineListExtensionModulesHandler } from "../products/pipeline/tools/list-extension-modules.js";
import { createPipelineListGroupsHandler } from "../products/pipeline/tools/list-groups.js";
import { createPipelineListModifyHistoryHandler } from "../products/pipeline/tools/list-modify-history.js";
import { createPipelineListProjectStrategiesHandler } from "../products/pipeline/tools/list-project-strategies.js";
import { createPipelineListPluginsHandler } from "../products/pipeline/tools/list-plugins.js";
import { createPipelineListPluginVersionsHandler } from "../products/pipeline/tools/list-plugin-versions.js";
import { createPipelineListPublishersHandler } from "../products/pipeline/tools/list-publishers.js";
import { createPipelineListQueueHandler } from "../products/pipeline/tools/list-queue.js";
import { createPipelineListTagsHandler } from "../products/pipeline/tools/list-tags.js";
import { createPipelineListStagePluginsHandler } from "../products/pipeline/tools/list-stage-plugins.js";
import { createPipelineListRuleTypesHandler } from "../products/pipeline/tools/list-rule-types.js";
import { createPipelineListRulesHandler } from "../products/pipeline/tools/list-rules.js";
import { createPipelineListStrategiesHandler } from "../products/pipeline/tools/list-strategies.js";
import { createPipelineListStrategyChildrenHandler } from "../products/pipeline/tools/list-strategy-children.js";
import { createPipelineGetVariableGroupHandler } from "../products/pipeline/tools/get-variable-group.js";
import { createPipelineListPipelinesHandler } from "../products/pipeline/tools/list-pipelines.js";
import {
  createPipelineListPipelineVariableGroupsHandler,
  createPipelineListVariableGroupsHandler
} from "../products/pipeline/tools/list-variable-groups.js";
import { createPipelineListRunsHandler } from "../products/pipeline/tools/list-runs.js";
import { createPipelineListPipelineVarsHandler } from "../products/pipeline/tools/list-pipeline-vars.js";
import { createPipelineListSystemVarsHandler } from "../products/pipeline/tools/list-system-vars.js";
import { createPipelineListTemplatesHandler } from "../products/pipeline/tools/list-templates.js";
import { createPipelineListTriggerFailedRecordsHandler } from "../products/pipeline/tools/list-trigger-failed-records.js";
import { createPipelineMovePipelinesToGroupHandler } from "../products/pipeline/tools/move-pipelines-to-group.js";
import { createPipelineRejectRunHandler } from "../products/pipeline/tools/reject-run.js";
import { createPipelineRetryRunHandler } from "../products/pipeline/tools/retry-run.js";
import { createPipelineRunPipelineHandler } from "../products/pipeline/tools/run-pipeline.js";
import { createPipelineSetTagsForPipelinesHandler } from "../products/pipeline/tools/set-tags-for-pipelines.js";
import { createPipelineStopRunHandler } from "../products/pipeline/tools/stop-run.js";
import { createPipelineInheritProjectStrategyHandler } from "../products/pipeline/tools/inherit-project-strategy.js";
import { createPipelineSwitchProjectStrategyHandler } from "../products/pipeline/tools/switch-project-strategy.js";
import { createPipelineSwitchStrategyHandler } from "../products/pipeline/tools/switch-strategy.js";
import { createPipelineUpdateExtensionEndpointHandler } from "../products/pipeline/tools/update-extension-endpoint.js";
import { createPipelineUpdateGroupHandler } from "../products/pipeline/tools/update-group.js";
import { createPipelineUpdateProjectStrategyHandler } from "../products/pipeline/tools/update-project-strategy.js";
import { createPipelineUpdateRuleHandler } from "../products/pipeline/tools/update-rule.js";
import { createPipelineCreateStrategyHandler } from "../products/pipeline/tools/create-strategy.js";
import { createPipelineUpdateStrategyHandler } from "../products/pipeline/tools/update-strategy.js";
import { createPipelineUpdateTagHandler } from "../products/pipeline/tools/update-tag.js";
import { createPipelineUpdateVariableGroupHandler } from "../products/pipeline/tools/update-variable-group.js";
import { createPipelineUploadPublisherIconHandler } from "../products/pipeline/tools/upload-publisher-icon.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type PipelineStdioClient = ReturnType<typeof createPipelineClient>;

const pipelineToolDefinitions = {
  "pipeline_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Pipeline API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "pipeline_list_publishers": defineProductTool({
    description: "List CodeArts Pipeline publishers",
    inputSchema: pipelineListPublishersInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPublishersHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPublishersHandler
  }),
  "pipeline_list_available_publishers": defineProductTool({
    description: "List CodeArts Pipeline available publishers",
    inputSchema: pipelineListAvailablePublishersInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListAvailablePublishersHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListAvailablePublishersHandler
  }),
  "pipeline_upload_publisher_icon": defineProductTool({
    description: "Upload a CodeArts Pipeline publisher icon",
    inputSchema: pipelineUploadPublisherIconInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUploadPublisherIconHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUploadPublisherIconHandler
  }),
  "pipeline_list_stage_plugins": defineProductTool({
    description: "List CodeArts Pipeline stage plugins",
    inputSchema: pipelineListStagePluginsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListStagePluginsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListStagePluginsHandler
  }),
  "pipeline_list_base_plugins": defineProductTool({
    description: "List CodeArts Pipeline base plugins",
    inputSchema: pipelineListBasePluginsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListBasePluginsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListBasePluginsHandler
  }),
  "pipeline_list_base_plugins_paged": defineProductTool({
    description: "List CodeArts Pipeline base plugins (paged)",
    inputSchema: pipelineListBasePluginsPagedInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListBasePluginsPagedHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListBasePluginsPagedHandler
  }),
  "pipeline_list_plugins": defineProductTool({
    description: "List CodeArts Pipeline plugins",
    inputSchema: pipelineListPluginsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPluginsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPluginsHandler
  }),
  "pipeline_get_plugin_inputs": defineProductTool({
    description: "Get CodeArts Pipeline plugin inputs",
    inputSchema: pipelineGetPluginPartsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPluginInputsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPluginInputsHandler
  }),
  "pipeline_get_plugin_outputs": defineProductTool({
    description: "Get CodeArts Pipeline plugin outputs",
    inputSchema: pipelineGetPluginPartsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPluginOutputsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPluginOutputsHandler
  }),
  "pipeline_list_plugin_versions": defineProductTool({
    description: "List CodeArts Pipeline plugin versions",
    inputSchema: pipelineListPluginVersionsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPluginVersionsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPluginVersionsHandler
  }),
  "pipeline_get_plugin_version": defineProductTool({
    description: "Get CodeArts Pipeline plugin version detail",
    inputSchema: pipelineGetPluginVersionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPluginVersionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPluginVersionHandler
  }),
  "pipeline_list_pipelines": defineProductTool({
    description: "List CodeArts Pipelines",
    inputSchema: pipelineListInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPipelinesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPipelinesHandler
  }),
  "pipeline_get_run": defineProductTool({
    description: "Get CodeArts Pipeline run detail",
    inputSchema: pipelineGetRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunHandler
  }),
  "pipeline_list_artifacts": defineProductTool({
    description: "List CodeArts Pipeline artifacts",
    inputSchema: pipelineListArtifactsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListArtifactsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListArtifactsHandler
  }),
  "pipeline_list_extension_modules": defineProductTool({
    description: "List CodeArts Pipeline extension modules",
    inputSchema: pipelineListExtensionModulesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListExtensionModulesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListExtensionModulesHandler
  }),
  "pipeline_list_extension_endpoints": defineProductTool({
    description: "List CodeArts Pipeline extension endpoints",
    inputSchema: pipelineListExtensionEndpointsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListExtensionEndpointsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListExtensionEndpointsHandler
  }),
  "pipeline_list_tags": defineProductTool({
    description: "List CodeArts Pipeline tags",
    inputSchema: pipelineListTagsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListTagsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListTagsHandler
  }),
  "pipeline_list_groups": defineProductTool({
    description: "List CodeArts Pipeline groups",
    inputSchema: pipelineListGroupsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListGroupsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListGroupsHandler
  }),
  "pipeline_get_run_detail": defineProductTool({
    description: "Get CodeArts Pipeline run detail",
    inputSchema: pipelineGetRunDetailInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunDetailHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunDetailHandler
  }),
  "pipeline_cancel_queue": defineProductTool({
    description: "Cancel a queued CodeArts Pipeline run record",
    inputSchema: pipelineCancelQueueInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCancelQueueHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCancelQueueHandler,
    rateLimitAction: "pipeline_cancel_queue"
  }),
  "pipeline_get_step_jump_link": defineProductTool({
    description: "Get a CodeArts Pipeline step jump link",
    inputSchema: pipelineGetStepJumpLinkInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetStepJumpLinkHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetStepJumpLinkHandler
  }),
  "pipeline_get_run_change_requests": defineProductTool({
    description: "Get CodeArts Pipeline run change requests",
    inputSchema: pipelineGetRunChangeRequestsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunChangeRequestsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunChangeRequestsHandler
  }),
  "pipeline_rollback_run": defineProductTool({
    description: "Rollback a CodeArts Pipeline run",
    inputSchema: pipelineRollbackRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRollbackRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRollbackRunHandler,
    rateLimitAction: "pipeline_rollback_run"
  }),
  "pipeline_get_batch_run_result": defineProductTool({
    description: "Get CodeArts Pipeline batch run results",
    inputSchema: pipelineBatchRunResultInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetBatchRunResultHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetBatchRunResultHandler
  }),
  "pipeline_get_run_parameters": defineProductTool({
    description: "Get CodeArts Pipeline run parameters",
    inputSchema: pipelineGetRunParametersInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunParametersHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunParametersHandler
  }),
  "pipeline_get_run_log": defineProductTool({
    description: "Get CodeArts Pipeline run step log",
    inputSchema: pipelineGetRunLogInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRunLogHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRunLogHandler
  }),
  "pipeline_get_manual_review_context": defineProductTool({
    description: "Get CodeArts Pipeline manual review context",
    inputSchema: pipelineGetManualReviewContextInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetManualReviewContextHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetManualReviewContextHandler
  }),
  "pipeline_get_official_notice": defineProductTool({
    description: "Get CodeArts Pipeline official notice",
    inputSchema: pipelineGetNoticeInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetOfficialNoticeHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetOfficialNoticeHandler
  }),
  "pipeline_update_official_notice": defineProductTool({
    description: "Update CodeArts Pipeline official notice",
    inputSchema: pipelineUpdateOfficialNoticeInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateOfficialNoticeHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateOfficialNoticeHandler
  }),
  "pipeline_get_notice_status": defineProductTool({
    description: "Get CodeArts Pipeline notice status",
    inputSchema: pipelineGetNoticeInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetNoticeStatusHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetNoticeStatusHandler
  }),
  "pipeline_get_notice_detail": defineProductTool({
    description: "Get CodeArts Pipeline notice detail",
    inputSchema: pipelineGetNoticeDetailInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetNoticeDetailHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetNoticeDetailHandler
  }),
  "pipeline_switch_notice": defineProductTool({
    description: "Switch CodeArts Pipeline notice",
    inputSchema: pipelineSwitchNoticeInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineSwitchNoticeHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineSwitchNoticeHandler
  }),
  "pipeline_update_third_party_notice": defineProductTool({
    description: "Update CodeArts Pipeline third-party notice",
    inputSchema: pipelineUpdateThirdPartyNoticeInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateThirdPartyNoticeHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateThirdPartyNoticeHandler
  }),
  "pipeline_update_notice_status": defineProductTool({
    description: "Update CodeArts Pipeline notice status",
    inputSchema: pipelineUpdateNoticeStatusInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateNoticeStatusHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateNoticeStatusHandler
  }),
  "pipeline_get_permission_switch": defineProductTool({
    description: "Get CodeArts Pipeline permission switch",
    inputSchema: pipelineGetPermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPermissionSwitchHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPermissionSwitchHandler
  }),
  "pipeline_update_role_permission": defineProductTool({
    description: "Update CodeArts Pipeline role permission",
    inputSchema: pipelineUpdateRolePermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateRolePermissionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateRolePermissionHandler
  }),
  "pipeline_get_role_permission": defineProductTool({
    description: "Get CodeArts Pipeline role permission",
    inputSchema: pipelineGetPermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRolePermissionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRolePermissionHandler
  }),
  "pipeline_update_user_permission": defineProductTool({
    description: "Update CodeArts Pipeline user permission",
    inputSchema: pipelineUpdateUserPermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateUserPermissionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateUserPermissionHandler
  }),
  "pipeline_get_user_permission": defineProductTool({
    description: "Get CodeArts Pipeline user permission",
    inputSchema: pipelineGetPermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetUserPermissionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetUserPermissionHandler
  }),
  "pipeline_switch_permission": defineProductTool({
    description: "Switch CodeArts Pipeline permission",
    inputSchema: pipelineSwitchPermissionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineSwitchPermissionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineSwitchPermissionHandler
  }),
  "pipeline_get_step_outputs": defineProductTool({
    description: "Get CodeArts Pipeline step outputs",
    inputSchema: pipelineGetStepOutputsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetStepOutputsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetStepOutputsHandler
  }),
  "pipeline_get_extension_module": defineProductTool({
    description: "Get CodeArts Pipeline extension module detail",
    inputSchema: pipelineGetExtensionModuleInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetExtensionModuleHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetExtensionModuleHandler
  }),
  "pipeline_get_extension_endpoint": defineProductTool({
    description: "Get CodeArts Pipeline extension endpoint detail",
    inputSchema: pipelineGetExtensionEndpointInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetExtensionEndpointHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetExtensionEndpointHandler
  }),
  "pipeline_get_pipeline": defineProductTool({
    description: "Get CodeArts Pipeline detail",
    inputSchema: pipelineGetInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPipelineHandler
  }),
  "pipeline_create_pipeline_by_template": defineProductTool({
    description: "Create a CodeArts Pipeline from a template",
    inputSchema: pipelineCreateByTemplateInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateByTemplateHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateByTemplateHandler
  }),
  "pipeline_create_pipeline": defineProductTool({
    description: "Create a CodeArts Pipeline",
    inputSchema: pipelineCreateInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateHandler
  }),
  "pipeline_update_pipeline_info": defineProductTool({
    description: "Update CodeArts Pipeline information",
    inputSchema: pipelineUpdatePipelineInfoInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateInfoHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateInfoHandler
  }),
  "pipeline_batch_delete_pipelines": defineProductTool({
    description: "Batch delete CodeArts Pipelines",
    inputSchema: pipelineBatchDeleteInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineBatchDeleteHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineBatchDeleteHandler
  }),
  "pipeline_batch_run_pipelines": defineProductTool({
    description: "Batch run CodeArts Pipelines",
    inputSchema: pipelineBatchRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineBatchRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineBatchRunHandler
  }),
  "pipeline_create_extension_endpoint": defineProductTool({
    description: "Create CodeArts Pipeline extension endpoint",
    inputSchema: pipelineCreateExtensionEndpointInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateExtensionEndpointHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateExtensionEndpointHandler,
    rateLimitAction: "pipeline_create_extension_endpoint"
  }),
  "pipeline_create_tag": defineProductTool({
    description: "Create CodeArts Pipeline tag",
    inputSchema: pipelineCreateTagInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateTagHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateTagHandler,
    rateLimitAction: "pipeline_create_tag"
  }),
  "pipeline_update_extension_endpoint": defineProductTool({
    description: "Update CodeArts Pipeline extension endpoint",
    inputSchema: pipelineUpdateExtensionEndpointInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateExtensionEndpointHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateExtensionEndpointHandler,
    rateLimitAction: "pipeline_update_extension_endpoint"
  }),
  "pipeline_update_tag": defineProductTool({
    description: "Update CodeArts Pipeline tag",
    inputSchema: pipelineUpdateTagInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateTagHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateTagHandler,
    rateLimitAction: "pipeline_update_tag"
  }),
  "pipeline_delete_extension_endpoint": defineProductTool({
    description: "Delete CodeArts Pipeline extension endpoint",
    inputSchema: pipelineDeleteExtensionEndpointInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteExtensionEndpointHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteExtensionEndpointHandler,
    rateLimitAction: "pipeline_delete_extension_endpoint"
  }),
  "pipeline_delete_tag": defineProductTool({
    description: "Delete CodeArts Pipeline tag",
    inputSchema: pipelineDeleteTagInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteTagHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteTagHandler,
    rateLimitAction: "pipeline_delete_tag"
  }),
  "pipeline_set_tags_for_pipelines": defineProductTool({
    description: "Set CodeArts Pipeline tags for pipelines",
    inputSchema: pipelineSetTagsForPipelinesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineSetTagsForPipelinesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineSetTagsForPipelinesHandler,
    rateLimitAction: "pipeline_set_tags_for_pipelines"
  }),
  "pipeline_delete_pipeline": defineProductTool({
    description: "Delete CodeArts Pipeline",
    inputSchema: pipelineDeletePipelineInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeletePipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeletePipelineHandler,
    rateLimitAction: "pipeline_delete_pipeline"
  }),
  "pipeline_disable_pipeline": defineProductTool({
    description: "Disable CodeArts Pipeline",
    inputSchema: pipelineTogglePipelineInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDisablePipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDisablePipelineHandler,
    rateLimitAction: "pipeline_disable_pipeline"
  }),
  "pipeline_enable_pipeline": defineProductTool({
    description: "Enable CodeArts Pipeline",
    inputSchema: pipelineTogglePipelineInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineEnablePipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineEnablePipelineHandler,
    rateLimitAction: "pipeline_enable_pipeline"
  }),
  "pipeline_create_group": defineProductTool({
    description: "Create CodeArts Pipeline group",
    inputSchema: pipelineCreateGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateGroupHandler,
    rateLimitAction: "pipeline_create_group"
  }),
  "pipeline_update_group": defineProductTool({
    description: "Update CodeArts Pipeline group",
    inputSchema: pipelineUpdateGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateGroupHandler,
    rateLimitAction: "pipeline_update_group"
  }),
  "pipeline_delete_group": defineProductTool({
    description: "Delete CodeArts Pipeline group",
    inputSchema: pipelineDeleteGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteGroupHandler,
    rateLimitAction: "pipeline_delete_group"
  }),
  "pipeline_move_pipelines_to_group": defineProductTool({
    description: "Move CodeArts Pipelines to group",
    inputSchema: pipelineMovePipelinesToGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineMovePipelinesToGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineMovePipelinesToGroupHandler,
    rateLimitAction: "pipeline_move_pipelines_to_group"
  }),
  "pipeline_create_variable_group": defineProductTool({
    description: "Create CodeArts Pipeline variable group",
    inputSchema: pipelineCreateVariableGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateVariableGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateVariableGroupHandler,
    rateLimitAction: "pipeline_create_variable_group"
  }),
  "pipeline_update_variable_group": defineProductTool({
    description: "Update CodeArts Pipeline variable group",
    inputSchema: pipelineUpdateVariableGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateVariableGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateVariableGroupHandler,
    rateLimitAction: "pipeline_update_variable_group"
  }),
  "pipeline_delete_variable_group": defineProductTool({
    description: "Delete CodeArts Pipeline variable group",
    inputSchema: pipelineDeleteVariableGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteVariableGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteVariableGroupHandler,
    rateLimitAction: "pipeline_delete_variable_group"
  }),
  "pipeline_bind_variable_groups_to_pipeline": defineProductTool({
    description: "Bind CodeArts Pipeline variable groups to pipeline",
    inputSchema: pipelineBindVariableGroupsToPipelineInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineBindVariableGroupsToPipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineBindVariableGroupsToPipelineHandler,
    rateLimitAction: "pipeline_bind_variable_groups_to_pipeline"
  }),
  "pipeline_get_variable_group": defineProductTool({
    description: "Get CodeArts Pipeline variable group detail",
    inputSchema: pipelineGetVariableGroupInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetVariableGroupHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetVariableGroupHandler
  }),
  "pipeline_list_pipeline_variable_groups": defineProductTool({
    description: "List CodeArts Pipeline variable groups for pipeline",
    inputSchema: pipelineListPipelineVariableGroupsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPipelineVariableGroupsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPipelineVariableGroupsHandler
  }),
  "pipeline_list_variable_groups": defineProductTool({
    description: "List CodeArts Pipeline variable groups",
    inputSchema: pipelineListVariableGroupsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListVariableGroupsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListVariableGroupsHandler
  }),
  "pipeline_get_rule": defineProductTool({
    description: "Get CodeArts Pipeline rule detail",
    inputSchema: pipelineGetRuleInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRuleHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRuleHandler
  }),
  "pipeline_list_rules": defineProductTool({
    description: "List CodeArts Pipeline rules",
    inputSchema: pipelineListRulesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListRulesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListRulesHandler
  }),
  "pipeline_create_rule": defineProductTool({
    description: "Create CodeArts Pipeline rule",
    inputSchema: pipelineCreateRuleInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateRuleHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateRuleHandler,
    rateLimitAction: "pipeline_create_rule"
  }),
  "pipeline_update_rule": defineProductTool({
    description: "Update CodeArts Pipeline rule",
    inputSchema: pipelineUpdateRuleInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateRuleHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateRuleHandler,
    rateLimitAction: "pipeline_update_rule"
  }),
  "pipeline_delete_rule": defineProductTool({
    description: "Delete CodeArts Pipeline rule",
    inputSchema: pipelineDeleteRuleInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteRuleHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteRuleHandler,
    rateLimitAction: "pipeline_delete_rule"
  }),
  "pipeline_get_rule_related_info": defineProductTool({
    description: "Get CodeArts Pipeline rule related info",
    inputSchema: pipelineGetRuleRelatedInfoInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetRuleRelatedInfoHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetRuleRelatedInfoHandler
  }),
  "pipeline_get_strategy": defineProductTool({
    description: "Get CodeArts Pipeline strategy detail",
    inputSchema: pipelineGetStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetStrategyHandler
  }),
  "pipeline_list_strategies": defineProductTool({
    description: "List CodeArts Pipeline strategies",
    inputSchema: pipelineListStrategiesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListStrategiesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListStrategiesHandler
  }),
  "pipeline_create_strategy": defineProductTool({
    description: "Create CodeArts Pipeline strategy",
    inputSchema: pipelineCreateStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateStrategyHandler,
    rateLimitAction: "pipeline_create_strategy"
  }),
  "pipeline_update_strategy": defineProductTool({
    description: "Update CodeArts Pipeline strategy",
    inputSchema: pipelineUpdateStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateStrategyHandler,
    rateLimitAction: "pipeline_update_strategy"
  }),
  "pipeline_delete_strategy": defineProductTool({
    description: "Delete CodeArts Pipeline strategy",
    inputSchema: pipelineDeleteStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteStrategyHandler,
    rateLimitAction: "pipeline_delete_strategy"
  }),
  "pipeline_switch_strategy": defineProductTool({
    description: "Switch CodeArts Pipeline strategy",
    inputSchema: pipelineSwitchStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineSwitchStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineSwitchStrategyHandler,
    rateLimitAction: "pipeline_switch_strategy"
  }),
  "pipeline_get_strategy_related_info": defineProductTool({
    description: "Get CodeArts Pipeline strategy related info",
    inputSchema: pipelineGetStrategyRelatedInfoInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetStrategyRelatedInfoHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetStrategyRelatedInfoHandler
  }),
  "pipeline_list_strategy_children": defineProductTool({
    description: "List CodeArts Pipeline strategy children",
    inputSchema: pipelineListStrategyChildrenInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListStrategyChildrenHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListStrategyChildrenHandler
  }),
  "pipeline_list_project_strategies": defineProductTool({
    description: "List CodeArts Pipeline project strategies",
    inputSchema: pipelineListProjectStrategiesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListProjectStrategiesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListProjectStrategiesHandler
  }),
  "pipeline_get_project_strategy": defineProductTool({
    description: "Get CodeArts Pipeline project strategy",
    inputSchema: pipelineGetProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetProjectStrategyHandler
  }),
  "pipeline_get_project_strategy_related_info": defineProductTool({
    description: "Get CodeArts Pipeline project strategy related info",
    inputSchema: pipelineGetProjectStrategyRelatedInfoInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetProjectStrategyRelatedInfoHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetProjectStrategyRelatedInfoHandler
  }),
  "pipeline_inherit_project_strategy": defineProductTool({
    description: "Inherit CodeArts Pipeline project strategy",
    inputSchema: pipelineInheritProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineInheritProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineInheritProjectStrategyHandler,
    rateLimitAction: "pipeline_inherit_project_strategy"
  }),
  "pipeline_switch_project_strategy": defineProductTool({
    description: "Switch CodeArts Pipeline project strategy",
    inputSchema: pipelineSwitchProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineSwitchProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineSwitchProjectStrategyHandler,
    rateLimitAction: "pipeline_switch_project_strategy"
  }),
  "pipeline_delete_project_strategy": defineProductTool({
    description: "Delete CodeArts Pipeline project strategy",
    inputSchema: pipelineDeleteProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineDeleteProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineDeleteProjectStrategyHandler,
    rateLimitAction: "pipeline_delete_project_strategy"
  }),
  "pipeline_get_project_strategy_detail": defineProductTool({
    description: "Get CodeArts Pipeline project strategy detail",
    inputSchema: pipelineGetProjectStrategyDetailInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetProjectStrategyDetailHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetProjectStrategyDetailHandler
  }),
  "pipeline_update_project_strategy": defineProductTool({
    description: "Update CodeArts Pipeline project strategy",
    inputSchema: pipelineUpdateProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineUpdateProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineUpdateProjectStrategyHandler,
    rateLimitAction: "pipeline_update_project_strategy"
  }),
  "pipeline_create_project_strategy": defineProductTool({
    description: "Create CodeArts Pipeline project strategy",
    inputSchema: pipelineCreateProjectStrategyInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCreateProjectStrategyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCreateProjectStrategyHandler,
    rateLimitAction: "pipeline_create_project_strategy"
  }),
  "pipeline_list_rule_types": defineProductTool({
    description: "List CodeArts Pipeline rule types",
    inputSchema: pipelineListRuleTypesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListRuleTypesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListRuleTypesHandler
  }),
  "pipeline_list_queue": defineProductTool({
    description: "List CodeArts Pipeline queued records",
    inputSchema: pipelineListQueueInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListQueueHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListQueueHandler
  }),
  "pipeline_list_system_vars": defineProductTool({
    description: "List CodeArts Pipeline system variables",
    inputSchema: pipelineListSystemVarsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListSystemVarsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListSystemVarsHandler
  }),
  "pipeline_get_webhook_info": defineProductTool({
    description: "Get CodeArts Pipeline webhook info",
    inputSchema: pipelineGetWebhookInfoInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetWebhookInfoHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetWebhookInfoHandler
  }),
  "pipeline_list_pipeline_vars": defineProductTool({
    description: "List CodeArts Pipeline variables",
    inputSchema: pipelineListPipelineVarsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPipelineVarsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPipelineVarsHandler
  }),
  "pipeline_list_trigger_failed_records": defineProductTool({
    description: "List CodeArts Pipeline trigger failed records",
    inputSchema: pipelineListTriggerFailedRecordsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListTriggerFailedRecordsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListTriggerFailedRecordsHandler
  }),
  "pipeline_batch_get_pipeline_status": defineProductTool({
    description: "Batch get CodeArts Pipeline status records",
    inputSchema: pipelineBatchGetPipelineStatusInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineBatchGetPipelineStatusHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineBatchGetPipelineStatusHandler
  }),
  "pipeline_get_notice_messages": defineProductTool({
    description: "Get CodeArts Pipeline notice messages",
    inputSchema: pipelineGetNoticeMessagesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetNoticeMessagesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetNoticeMessagesHandler
  }),
  "pipeline_check_project": defineProductTool({
    description: "Check CodeArts Pipeline project",
    inputSchema: pipelineCheckProjectInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCheckProjectHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCheckProjectHandler
  }),
  "pipeline_check_component": defineProductTool({
    description: "Check CodeArts Pipeline component",
    inputSchema: pipelineCheckComponentInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineCheckComponentHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineCheckComponentHandler
  }),
  "pipeline_list_execution_plans": defineProductTool({
    description: "List CodeArts Pipeline execution plans",
    inputSchema: pipelineListExecutionPlansInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListExecutionPlansHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListExecutionPlansHandler
  }),
  "pipeline_list_reusable_jobs": defineProductTool({
    description: "List CodeArts Pipeline reusable jobs",
    inputSchema: pipelineListReusableJobsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListReusableJobsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListReusableJobsHandler
  }),
  "pipeline_list_dashboard_pipeline_counts": defineProductTool({
    description: "List CodeArts Pipeline dashboard pipeline counts",
    inputSchema: pipelineDashboardQueryInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListDashboardPipelineCountsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListDashboardPipelineCountsHandler
  }),
  "pipeline_get_dashboard_executions_overview": defineProductTool({
    description: "Get CodeArts Pipeline dashboard executions overview",
    inputSchema: pipelineDashboardQueryInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetDashboardExecutionsOverviewHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetDashboardExecutionsOverviewHandler
  }),
  "pipeline_get_dashboard_concurrency": defineProductTool({
    description: "Get CodeArts Pipeline dashboard concurrency",
    inputSchema: pipelineDashboardQueryInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetDashboardConcurrencyHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetDashboardConcurrencyHandler
  }),
  "pipeline_list_change_requests": defineProductTool({
    description: "List CodeArts Pipeline change requests",
    inputSchema: pipelineListChangeRequestsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListChangeRequestsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListChangeRequestsHandler
  }),
  "pipeline_get_change_request": defineProductTool({
    description: "Get CodeArts Pipeline change request",
    inputSchema: pipelineGetChangeRequestInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetChangeRequestHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetChangeRequestHandler
  }),
  "pipeline_list_components": defineProductTool({
    description: "List CodeArts Pipeline components",
    inputSchema: pipelineListComponentsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListComponentsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListComponentsHandler
  }),
  "pipeline_get_component": defineProductTool({
    description: "Get CodeArts Pipeline component",
    inputSchema: pipelineGetComponentInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetComponentHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetComponentHandler
  }),
  "pipeline_list_pac_actions": defineProductTool({
    description: "List CodeArts Pipeline PAC actions",
    inputSchema: pipelineListPacActionsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListPacActionsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListPacActionsHandler
  }),
  "pipeline_get_pac_action": defineProductTool({
    description: "Get CodeArts Pipeline PAC action",
    inputSchema: pipelineGetPacActionInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetPacActionHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetPacActionHandler
  }),
  "pipeline_get_oauth_authorization_url": defineProductTool({
    description: "Get CodeArts Pipeline OAuth authorization URL",
    inputSchema: pipelineGetOauthAuthorizationUrlInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetOauthAuthorizationUrlHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetOauthAuthorizationUrlHandler
  }),
  "pipeline_get_devuc_auth": defineProductTool({
    description: "Get CodeArts Pipeline DevUC authorization status",
    inputSchema: pipelineGetDevucAuthInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetDevucAuthHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetDevucAuthHandler
  }),
  "pipeline_list_modify_history": defineProductTool({
    description: "List CodeArts Pipeline modify history records",
    inputSchema: pipelineListModifyHistoryInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListModifyHistoryHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListModifyHistoryHandler
  }),
  "pipeline_run_pipeline": defineProductTool({
    description: "Run CodeArts Pipeline",
    inputSchema: pipelineRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRunPipelineHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRunPipelineHandler,
    rateLimitAction: "pipeline_run_pipeline"
  }),
  "pipeline_stop_run": defineProductTool({
    description: "Stop CodeArts Pipeline run",
    inputSchema: pipelineStopRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineStopRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineStopRunHandler,
    rateLimitAction: "pipeline_stop_run"
  }),
  "pipeline_retry_run": defineProductTool({
    description: "Retry CodeArts Pipeline run",
    inputSchema: pipelineRetryRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRetryRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRetryRunHandler,
    rateLimitAction: "pipeline_retry_run"
  }),
  "pipeline_approve_run": defineProductTool({
    description: "Approve CodeArts Pipeline manual review",
    inputSchema: pipelineApproveRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineApproveRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineApproveRunHandler,
    rateLimitAction: "pipeline_approve_run"
  }),
  "pipeline_reject_run": defineProductTool({
    description: "Reject CodeArts Pipeline manual review",
    inputSchema: pipelineRejectRunInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineRejectRunHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineRejectRunHandler,
    rateLimitAction: "pipeline_reject_run"
  }),
  "pipeline_list_templates": defineProductTool({
    description: "List CodeArts Pipeline templates",
    inputSchema: pipelineListTemplatesInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListTemplatesHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListTemplatesHandler
  }),
  "pipeline_get_template": defineProductTool({
    description: "Get CodeArts Pipeline template detail",
    inputSchema: pipelineGetTemplateInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineGetTemplateHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineGetTemplateHandler
  }),
  "pipeline_list_runs": defineProductTool({
    description: "List CodeArts Pipeline runs",
    inputSchema: pipelineListRunsInput,
    selectHttpClient: (clients: { pipelineClient: Parameters<typeof createPipelineListRunsHandler>[0] }) => clients.pipelineClient,
    createProductHandler: createPipelineListRunsHandler
  })
} as const;

export function registerPipelineTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: PipelineStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: pipelineToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
