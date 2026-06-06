import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createBuildClient } from "../products/build/client.js";
import {
  buildAddKeystorePermissionInput,
  buildAutoExecuteJobInput,
  buildBatchDeleteJobsInput,
  buildBatchSetAgencyInput,
  buildBatchUpdateJobPermissionsInput,
  buildAppendReleaseUploadStepInput,
  buildAppendJobStepInput,
  buildCheckWebhookUrlInput,
  buildClearRecyclingJobsInput,
  buildCopyJobInput,
  buildCreateTemplateInput,
  buildCreateTemplateV3Input,
  buildConfigureReleaseUploadStepInput,
  buildCreateJobGroupInput,
  buildCreateJobInput,
  buildDeleteJobGroupInput,
  buildDeleteJobInput,
  buildDisableJobInput,
  buildDisableJobNoticeInput,
  buildDisableJobV3Input,
  buildDeleteJobV3Input,
  buildDeleteKeystoreInput,
  buildDeleteKeystorePermissionInput,
  buildEditKeystorePermissionInput,
  buildDeleteRecyclingJobsInput,
  buildDeleteTemplateInput,
  buildPrepareDeployableNodeAppInput,
  buildDownloadBuildLogV4Input,
  buildDownloadKeystoreV2Input,
  buildDownloadKeystoreV3Input,
  buildGetErrorLogInput,
  buildGetFullStagesInput,
  buildGetHistoryDetailsInput,
  buildGetInfoRecordInput,
  buildGetJobCopyNameInput,
  buildGetJobDisableCheckInput,
  buildDownloadFullLogInput,
  buildDownloadLogByRecordIdV3Input,
  buildDownloadTaskLogInput,
  buildGetBuildDetailsInput,
  buildGetDomainChargeTypeInput,
  buildGetDomainFederationInput,
  buildGetDomainJobSummaryInput,
  buildGetDomainPackageQuotaInput,
  buildGetDomainStatusInput,
  buildGetDomainUserPermissionInput,
  buildGetDockerfileTemplateInput,
  buildGetJobBuildSuccessRatioInput,
  buildGetJobInfoInput,
  buildGetJobSuccessRatioV3Input,
  buildGetLastHistoryV3Input,
  buildListBuildInfoRecordsV3Input,
  buildListPeriodHistoryV3Input,
  buildGetJobBuildTimeInput,
  buildGetJobConfigDiffInput,
  buildGetCoverageMetricsInput,
  buildGetJobRunningStatusV3Input,
  buildGetJobOutputInput,
  buildGetJobPipelineInfoInput,
  buildGetJobStepStatusInput,
  buildGetJobNoticeInput,
  buildGetJobPermissionInput,
  buildGetJobPermissionInternalInput,
  buildGetJobRunningStatusInput,
  buildGetKeystorePermissionInput,
  buildGetOutputInfoV3Input,
  buildGetRecordInfoV4Input,
  buildGetRunningStepLogInput,
  buildGetStageLogPageInput,
  buildGetTemplateInput,
  buildGetTaskLogPageInput,
  buildGetYamlTemplateInput,
  buildDownloadTaskLogV4Input,
  buildGetProjectDefaultPermissionInput,
  buildGetReportSummaryInput,
  buildGetProjectRecordStatisticsInput,
  buildCheckJobNameExistsInput,
  buildCheckJobCountLimitInput,
  buildPrepareNodeRuntimeBundleInput,
  buildGetRecordFlowGraphInput,
  buildGetRecordInput,
  buildGetRecordScriptInput,
  buildGetRealTimeLogInput,
  buildGetJobInput,
  buildListBuildParametersInput,
  buildListBuildParameterTypesInput,
  buildListCodeTagsInput,
  buildListCustomTemplatesInput,
  buildListAllJobsInput,
  buildListBriefRecordsInput,
  buildListDefaultParametersInput,
  buildListDomainRelatedProjectsInput,
  buildListDomainRelatedProjectsPageInput,
  buildListGitCodeBranchesInput,
  buildListGitCodeRepositoriesInput,
  buildListImageTemplatesInput,
  buildListJunitCoverageSummariesInput,
  buildListJobBadgeBranchesInput,
  buildListJobGroupTreeInput,
  buildListJobHistoryV3Input,
  buildListJobConfigV3Input,
  buildListJobsInput,
  buildListJobNoticesV3Input,
  buildListJobPermissionRolesInput,
  buildListJobUpdateHistoryInput,
  buildListKeystoreFilesInput,
  buildListOfficialTemplatesInput,
  buildListPackageSpecStatusesInput,
  buildListProjectEndpointsInput,
  buildListProjectJobsV3Input,
  buildListProjectRecordsInput,
  buildListRecommendedOfficialTemplatesInput,
  buildListRecyclingJobsInput,
  buildListReportBranchesInput,
  buildListReportRepositoriesInput,
  buildListRecordsInput,
  buildListResourceSpecsInput,
  buildListSystemParametersInput,
  buildListTemplatesInput,
  buildListUsableKeystoreNamesInput,
  buildFollowCustomTemplateInput,
  buildFollowJobInput,
  buildFollowOfficialTemplateInput,
  buildRecoverJobV3Input,
  buildRestoreRecyclingJobsInput,
  buildSetKeepTimeInput,
  buildShowDomainsStatusesInput,
  buildShowFlowGraphV3Input,
  buildShowPackageSpecCountdownInput,
  buildRunJobInput,
  buildStopJobInput,
  buildUnfollowCustomTemplateInput,
  buildUnfollowJobInput,
  buildUnfollowOfficialTemplateInput,
  buildUpdateJobNoticeInput,
  buildUpdateJobRolePermissionInput,
  buildUpdateKeystoreInput,
  buildUploadJunitCoverageInput,
  buildUploadJunitReportInput,
  buildUploadKeystoreInput,
  buildMoveJobGroupInput,
  buildUpdateJobGroupInput,
  buildSaveTemplateUsedInfoInput,
  buildSwapJobGroupInput,
  buildUpdateJobStepInput
} from "../products/build/schemas.js";
import { createBuildGetErrorLogHandler } from "../products/build/tools/get-error-log.js";
import { createBuildAppendReleaseUploadStepHandler } from "../products/build/tools/append-release-upload-step.js";
import { createBuildAppendJobStepHandler } from "../products/build/tools/append-job-step.js";
import { createBuildConfigureReleaseUploadStepHandler } from "../products/build/tools/configure-release-upload-step.js";
import { createBuildPrepareDeployableNodeAppHandler } from "../products/build/tools/prepare-deployable-node-app.js";
import { createBuildPrepareNodeRuntimeBundleHandler } from "../products/build/tools/prepare-node-runtime-bundle.js";
import { createBuildGetFullStagesHandler } from "../products/build/tools/get-full-stages.js";
import { createBuildGetProjectRecordStatisticsHandler } from "../products/build/tools/get-project-record-statistics.js";
import { createBuildGetRecordFlowGraphHandler } from "../products/build/tools/get-record-flow-graph.js";
import { createBuildGetRecordHandler } from "../products/build/tools/get-record.js";
import { createBuildGetRecordScriptHandler } from "../products/build/tools/get-record-script.js";
import { createBuildGetHistoryDetailsHandler } from "../products/build/tools/get-history-details.js";
import { createBuildGetInfoRecordHandler } from "../products/build/tools/get-info-record.js";
import { createBuildGetRealTimeLogHandler } from "../products/build/tools/get-real-time-log.js";
import { createBuildGetJobHandler } from "../products/build/tools/get-job.js";
import { createBuildGetJobCopyNameHandler } from "../products/build/tools/get-job-copy-name.js";
import { createBuildGetJobDisableCheckHandler } from "../products/build/tools/get-job-disable-check.js";
import { createBuildGetJobNoticeHandler } from "../products/build/tools/get-job-notice.js";
import { createBuildGetJobRunningStatusHandler } from "../products/build/tools/get-job-running-status.js";
import {
  createBuildDownloadBuildLogV4Handler,
  createBuildDownloadKeystoreV2Handler,
  createBuildDownloadKeystoreV3Handler,
  createBuildDownloadFullLogHandler,
  createBuildDownloadLogByRecordIdV3Handler,
  createBuildDownloadTaskLogHandler,
  createBuildDownloadTaskLogV4Handler,
  createBuildGetBuildDetailsHandler,
  createBuildGetJobInfoHandler,
  createBuildGetJobOutputHandler,
  createBuildGetJobPipelineInfoHandler,
  createBuildGetJobRunningStatusV3Handler,
  createBuildGetJobStepStatusHandler,
  createBuildGetKeystorePermissionHandler,
  createBuildGetOutputInfoV3Handler,
  createBuildGetRecordInfoV4Handler,
  createBuildGetRunningStepLogHandler,
  createBuildGetStageLogPageHandler,
  createBuildGetTemplateHandler,
  createBuildGetTaskLogPageHandler,
  createBuildGetYamlTemplateHandler,
  createBuildListAllJobsHandler,
  createBuildListBriefRecordsHandler,
  createBuildListCustomTemplatesHandler,
  createBuildListJobBadgeBranchesHandler,
  createBuildListJobConfigV3Handler,
  createBuildListJobHistoryV3Handler,
  createBuildListJobNoticesV3Handler,
  createBuildListJobUpdateHistoryHandler,
  createBuildListKeystoreFilesHandler,
  createBuildListProjectEndpointsHandler,
  createBuildListRecommendedOfficialTemplatesHandler,
  createBuildListUsableKeystoreNamesHandler,
  createBuildShowDomainsStatusesHandler,
  createBuildShowFlowGraphV3Handler,
  createBuildShowPackageSpecCountdownHandler
} from "../products/build/tools/additional-read-tools.js";
import { createBuildGetDomainChargeTypeHandler } from "../products/build/tools/get-domain-charge-type.js";
import { createBuildGetDomainFederationHandler } from "../products/build/tools/get-domain-federation.js";
import { createBuildGetDomainJobSummaryHandler } from "../products/build/tools/get-domain-job-summary.js";
import { createBuildGetDomainPackageQuotaHandler } from "../products/build/tools/get-domain-package-quota.js";
import { createBuildGetDomainStatusHandler } from "../products/build/tools/get-domain-status.js";
import { createBuildGetDomainUserPermissionHandler } from "../products/build/tools/get-domain-user-permission.js";
import { createBuildGetDockerfileTemplateHandler } from "../products/build/tools/get-dockerfile-template.js";
import { createBuildGetCoverageMetricsHandler } from "../products/build/tools/get-coverage-metrics.js";
import { createBuildGetJobBuildTimeHandler } from "../products/build/tools/get-job-build-time.js";
import { createBuildGetJobBuildSuccessRatioHandler } from "../products/build/tools/get-job-build-success-ratio.js";
import { createBuildGetJobSuccessRatioV3Handler } from "../products/build/tools/get-job-success-ratio-v3.js";
import { createBuildGetLastHistoryV3Handler } from "../products/build/tools/get-last-history-v3.js";
import { createBuildListBuildInfoRecordsV3Handler } from "../products/build/tools/list-build-info-records-v3.js";
import { createBuildListPeriodHistoryV3Handler } from "../products/build/tools/list-period-history-v3.js";
import { createBuildGetJobConfigDiffHandler } from "../products/build/tools/get-job-config-diff.js";
import { createBuildGetJobPermissionHandler } from "../products/build/tools/get-job-permission.js";
import { createBuildGetJobPermissionInternalHandler } from "../products/build/tools/get-job-permission-internal.js";
import { createBuildGetProjectDefaultPermissionHandler } from "../products/build/tools/get-project-default-permission.js";
import { createBuildGetReportSummaryHandler } from "../products/build/tools/get-report-summary.js";
import { createBuildCheckJobNameExistsHandler } from "../products/build/tools/check-job-name-exists.js";
import { createBuildCheckJobCountLimitHandler } from "../products/build/tools/check-job-count-limit.js";
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
import { createBuildListBuildParameterTypesHandler } from "../products/build/tools/list-build-parameter-types.js";
import { createBuildListCodeTagsHandler } from "../products/build/tools/list-code-tags.js";
import { createBuildListDefaultParametersHandler } from "../products/build/tools/list-default-parameters.js";
import { createBuildListDomainRelatedProjectsHandler } from "../products/build/tools/list-domain-related-projects.js";
import { createBuildListDomainRelatedProjectsPageHandler } from "../products/build/tools/list-domain-related-projects-page.js";
import { createBuildListGitCodeBranchesHandler } from "../products/build/tools/list-git-code-branches.js";
import { createBuildListGitCodeRepositoriesHandler } from "../products/build/tools/list-git-code-repositories.js";
import { createBuildListImageTemplatesHandler } from "../products/build/tools/list-image-templates.js";
import { createBuildListJunitCoverageSummariesHandler } from "../products/build/tools/list-junit-coverage-summaries.js";
import { createBuildListJobGroupTreeHandler } from "../products/build/tools/list-job-group-tree.js";
import { createBuildListJobPermissionRolesHandler } from "../products/build/tools/list-job-permission-roles.js";
import { createBuildListJobsHandler } from "../products/build/tools/list-jobs.js";
import { createBuildListProjectJobsV3Handler } from "../products/build/tools/list-project-jobs-v3.js";
import { createBuildListOfficialTemplatesHandler } from "../products/build/tools/list-official-templates.js";
import { createBuildListPackageSpecStatusesHandler } from "../products/build/tools/list-package-spec-statuses.js";
import { createBuildListProjectRecordsHandler } from "../products/build/tools/list-project-records.js";
import { createBuildListRecyclingJobsHandler } from "../products/build/tools/list-recycling-jobs.js";
import { createBuildListReportBranchesHandler } from "../products/build/tools/list-report-branches.js";
import { createBuildListReportRepositoriesHandler } from "../products/build/tools/list-report-repositories.js";
import { createBuildListRecordsHandler } from "../products/build/tools/list-records.js";
import { createBuildListResourceSpecsHandler } from "../products/build/tools/list-resource-specs.js";
import { createBuildListSystemParametersHandler } from "../products/build/tools/list-system-parameters.js";
import { createBuildListTemplatesHandler } from "../products/build/tools/list-templates.js";
import { createBuildRunJobHandler } from "../products/build/tools/run-job.js";
import { createBuildStopJobHandler } from "../products/build/tools/stop-job.js";
import { createBuildUpdateJobStepHandler } from "../products/build/tools/update-job-step.js";
import {
  createBuildAddKeystorePermissionHandler,
  createBuildAutoExecuteJobHandler,
  createBuildBatchDeleteJobsHandler,
  createBuildBatchSetAgencyHandler,
  createBuildBatchUpdateJobPermissionsHandler,
  createBuildCheckWebhookUrlHandler,
  createBuildClearRecyclingJobsHandler,
  createBuildCopyJobHandler,
  createBuildCreateJobGroupHandler,
  createBuildCreateJobHandler,
  createBuildCreateTemplateHandler,
  createBuildCreateTemplateV3Handler,
  createBuildDeleteJobGroupHandler,
  createBuildDeleteJobHandler,
  createBuildDisableJobHandler,
  createBuildDisableJobNoticeHandler,
  createBuildDisableJobV3Handler,
  createBuildDeleteJobV3Handler,
  createBuildDeleteKeystoreHandler,
  createBuildDeleteKeystorePermissionHandler,
  createBuildEditKeystorePermissionHandler,
  createBuildDeleteRecyclingJobsHandler,
  createBuildDeleteTemplateHandler,
  createBuildFollowCustomTemplateHandler,
  createBuildFollowJobHandler,
  createBuildFollowOfficialTemplateHandler,
  createBuildMoveJobGroupHandler,
  createBuildUpdateJobGroupHandler,
  createBuildRecoverJobV3Handler,
  createBuildRestoreRecyclingJobsHandler,
  createBuildSaveTemplateUsedInfoHandler,
  createBuildSetKeepTimeHandler,
  createBuildSwapJobGroupHandler,
  createBuildUnfollowCustomTemplateHandler,
  createBuildUnfollowJobHandler,
  createBuildUnfollowOfficialTemplateHandler,
  createBuildUpdateJobNoticeHandler,
  createBuildUpdateKeystoreHandler,
  createBuildUploadJunitCoverageHandler,
  createBuildUploadJunitReportHandler,
  createBuildUploadKeystoreHandler,
  createBuildUpdateJobRolePermissionHandler
} from "../products/build/tools/additional-mutation-tools.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type BuildStdioClient = ReturnType<typeof createBuildClient>;

const buildToolDefinitions = {
  "build_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Build API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.buildClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "build_list_jobs": defineProductTool({
    description: "List CodeArts Build jobs",
    inputSchema: buildListJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobsHandler
  }),
  "build_list_project_jobs_v3": defineProductTool({
    description: "List CodeArts Build v3 project jobs",
    inputSchema: buildListProjectJobsV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListProjectJobsV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListProjectJobsV3Handler
  }),
  "build_list_project_records": defineProductTool({
    description: "List CodeArts Build project records",
    inputSchema: buildListProjectRecordsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListProjectRecordsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListProjectRecordsHandler
  }),
  "build_get_project_record_statistics": defineProductTool({
    description: "Get CodeArts Build project record statistics",
    inputSchema: buildGetProjectRecordStatisticsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetProjectRecordStatisticsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetProjectRecordStatisticsHandler
  }),
  "build_list_image_templates": defineProductTool({
    description: "List CodeArts Build image templates",
    inputSchema: buildListImageTemplatesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListImageTemplatesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListImageTemplatesHandler
  }),
  "build_get_record_flow_graph": defineProductTool({
    description: "Get CodeArts Build record flow graph",
    inputSchema: buildGetRecordFlowGraphInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordFlowGraphHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordFlowGraphHandler
  }),
  "build_list_code_tags": defineProductTool({
    description: "List CodeArts Build source code tags",
    inputSchema: buildListCodeTagsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListCodeTagsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListCodeTagsHandler
  }),
  "build_list_report_branches": defineProductTool({
    description: "List CodeArts Build report branches",
    inputSchema: buildListReportBranchesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListReportBranchesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListReportBranchesHandler
  }),
  "build_list_report_repositories": defineProductTool({
    description: "List CodeArts Build report repositories",
    inputSchema: buildListReportRepositoriesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListReportRepositoriesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListReportRepositoriesHandler
  }),
  "build_list_git_code_repositories": defineProductTool({
    description: "List CodeArts Build Git code repositories",
    inputSchema: buildListGitCodeRepositoriesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListGitCodeRepositoriesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListGitCodeRepositoriesHandler
  }),
  "build_list_git_code_branches": defineProductTool({
    description: "List CodeArts Build Git code branches",
    inputSchema: buildListGitCodeBranchesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListGitCodeBranchesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListGitCodeBranchesHandler
  }),
  "build_list_resource_specs": defineProductTool({
    description: "List CodeArts Build resource specifications",
    inputSchema: buildListResourceSpecsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListResourceSpecsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListResourceSpecsHandler
  }),
  "build_get_domain_user_permission": defineProductTool({
    description: "Get CodeArts Build domain user permission",
    inputSchema: buildGetDomainUserPermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainUserPermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainUserPermissionHandler
  }),
  "build_get_domain_package_quota": defineProductTool({
    description: "Get CodeArts Build domain package quota",
    inputSchema: buildGetDomainPackageQuotaInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainPackageQuotaHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainPackageQuotaHandler
  }),
  "build_get_domain_charge_type": defineProductTool({
    description: "Get CodeArts Build domain charge type",
    inputSchema: buildGetDomainChargeTypeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainChargeTypeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainChargeTypeHandler
  }),
  "build_get_domain_federation": defineProductTool({
    description: "Get CodeArts Build domain federation status",
    inputSchema: buildGetDomainFederationInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainFederationHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainFederationHandler
  }),
  "build_get_domain_status": defineProductTool({
    description: "Get CodeArts Build domain status",
    inputSchema: buildGetDomainStatusInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainStatusHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainStatusHandler
  }),
  "build_get_domain_job_summary": defineProductTool({
    description: "Get CodeArts Build domain job summary",
    inputSchema: buildGetDomainJobSummaryInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDomainJobSummaryHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDomainJobSummaryHandler
  }),
  "build_list_domain_related_projects": defineProductTool({
    description: "List CodeArts Build domain related projects",
    inputSchema: buildListDomainRelatedProjectsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListDomainRelatedProjectsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListDomainRelatedProjectsHandler
  }),
  "build_list_domain_related_projects_page": defineProductTool({
    description: "List paginated CodeArts Build domain related projects",
    inputSchema: buildListDomainRelatedProjectsPageInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListDomainRelatedProjectsPageHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListDomainRelatedProjectsPageHandler
  }),
  "build_list_package_spec_statuses": defineProductTool({
    description: "List CodeArts Build package specification statuses",
    inputSchema: buildListPackageSpecStatusesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListPackageSpecStatusesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListPackageSpecStatusesHandler
  }),
  "build_get_dockerfile_template": defineProductTool({
    description: "Get a CodeArts Build Dockerfile template",
    inputSchema: buildGetDockerfileTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetDockerfileTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetDockerfileTemplateHandler
  }),
  "build_check_job_name_exists": defineProductTool({
    description: "Check whether a CodeArts Build job name exists",
    inputSchema: buildCheckJobNameExistsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCheckJobNameExistsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCheckJobNameExistsHandler
  }),
  "build_get_job_build_success_ratio": defineProductTool({
    description: "Get CodeArts Build job success ratio",
    inputSchema: buildGetJobBuildSuccessRatioInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobBuildSuccessRatioHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobBuildSuccessRatioHandler
  }),
  "build_get_job_success_ratio_v3": defineProductTool({
    description: "Get CodeArts Build v3 job success ratio",
    inputSchema: buildGetJobSuccessRatioV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobSuccessRatioV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobSuccessRatioV3Handler
  }),
  "build_get_last_history_v3": defineProductTool({
    description: "Get CodeArts Build v3 last successful history for a repository",
    inputSchema: buildGetLastHistoryV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetLastHistoryV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetLastHistoryV3Handler
  }),
  "build_list_period_history_v3": defineProductTool({
    description: "List CodeArts Build v3 period history records",
    inputSchema: buildListPeriodHistoryV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListPeriodHistoryV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListPeriodHistoryV3Handler
  }),
  "build_list_build_info_records_v3": defineProductTool({
    description: "List CodeArts Build v3 build info records",
    inputSchema: buildListBuildInfoRecordsV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListBuildInfoRecordsV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListBuildInfoRecordsV3Handler
  }),
  "build_get_job_config_diff": defineProductTool({
    description: "Get CodeArts Build job configuration diff",
    inputSchema: buildGetJobConfigDiffInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobConfigDiffHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobConfigDiffHandler
  }),
  "build_list_recycling_jobs": defineProductTool({
    description: "List CodeArts Build recycling jobs",
    inputSchema: buildListRecyclingJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListRecyclingJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListRecyclingJobsHandler
  }),
  "build_check_job_count_limit": defineProductTool({
    description: "Check whether CodeArts Build job count is below the limit",
    inputSchema: buildCheckJobCountLimitInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCheckJobCountLimitHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCheckJobCountLimitHandler
  }),
  "build_get_report_summary": defineProductTool({
    description: "Get CodeArts Build report summary",
    inputSchema: buildGetReportSummaryInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetReportSummaryHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetReportSummaryHandler
  }),
  "build_get_job_build_time": defineProductTool({
    description: "Get CodeArts Build job build time statistics",
    inputSchema: buildGetJobBuildTimeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobBuildTimeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobBuildTimeHandler
  }),
  "build_list_junit_coverage_summaries": defineProductTool({
    description: "List CodeArts Build Junit coverage summaries",
    inputSchema: buildListJunitCoverageSummariesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJunitCoverageSummariesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJunitCoverageSummariesHandler
  }),
  "build_get_coverage_metrics": defineProductTool({
    description: "Get CodeArts Build coverage metrics",
    inputSchema: buildGetCoverageMetricsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetCoverageMetricsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetCoverageMetricsHandler
  }),
  "build_list_job_permission_roles": defineProductTool({
    description: "List CodeArts Build job permission roles",
    inputSchema: buildListJobPermissionRolesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobPermissionRolesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobPermissionRolesHandler
  }),
  "build_get_job_permission_internal": defineProductTool({
    description: "Get CodeArts Build internal job permission status",
    inputSchema: buildGetJobPermissionInternalInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobPermissionInternalHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobPermissionInternalHandler
  }),
  "build_get_job_permission": defineProductTool({
    description: "Get CodeArts Build job permission",
    inputSchema: buildGetJobPermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobPermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobPermissionHandler
  }),
  "build_get_job_info": defineProductTool({
    description: "Get CodeArts Build job build information",
    inputSchema: buildGetJobInfoInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobInfoHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobInfoHandler
  }),
  "build_get_build_details": defineProductTool({
    description: "Get CodeArts Build build status details",
    inputSchema: buildGetBuildDetailsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetBuildDetailsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetBuildDetailsHandler
  }),
  "build_get_output_info_v3": defineProductTool({
    description: "Get CodeArts Build v3 output info",
    inputSchema: buildGetOutputInfoV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetOutputInfoV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetOutputInfoV3Handler
  }),
  "build_get_record_info_v4": defineProductTool({
    description: "Get CodeArts Build v4 record info",
    inputSchema: buildGetRecordInfoV4Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordInfoV4Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordInfoV4Handler
  }),
  "build_get_project_default_permission": defineProductTool({
    description: "Get CodeArts Build project default permission",
    inputSchema: buildGetProjectDefaultPermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetProjectDefaultPermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetProjectDefaultPermissionHandler
  }),
  "build_list_official_templates": defineProductTool({
    description: "List CodeArts Build official templates",
    inputSchema: buildListOfficialTemplatesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListOfficialTemplatesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListOfficialTemplatesHandler
  }),
  "build_list_templates": defineProductTool({
    description: "List CodeArts Build templates",
    inputSchema: buildListTemplatesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListTemplatesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListTemplatesHandler
  }),
  "build_list_custom_templates": defineProductTool({
    description: "List CodeArts Build custom templates",
    inputSchema: buildListCustomTemplatesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListCustomTemplatesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListCustomTemplatesHandler
  }),
  "build_get_job_notice": defineProductTool({
    description: "Get CodeArts Build job notice settings",
    inputSchema: buildGetJobNoticeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobNoticeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobNoticeHandler
  }),
  "build_list_job_notices_v3": defineProductTool({
    description: "List CodeArts Build v3 job notices",
    inputSchema: buildListJobNoticesV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobNoticesV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobNoticesV3Handler
  }),
  "build_get_job_running_status": defineProductTool({
    description: "Get CodeArts Build job running status",
    inputSchema: buildGetJobRunningStatusInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobRunningStatusHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobRunningStatusHandler
  }),
  "build_get_job_running_status_v3": defineProductTool({
    description: "Get CodeArts Build v3 job running status",
    inputSchema: buildGetJobRunningStatusV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobRunningStatusV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobRunningStatusV3Handler
  }),
  "build_get_job_disable_check": defineProductTool({
    description: "Get CodeArts Build job disable check status",
    inputSchema: buildGetJobDisableCheckInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobDisableCheckHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobDisableCheckHandler
  }),
  "build_get_job_copy_name": defineProductTool({
    description: "Get CodeArts Build copied job name",
    inputSchema: buildGetJobCopyNameInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobCopyNameHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobCopyNameHandler
  }),
  "build_show_package_spec_countdown": defineProductTool({
    description: "Show CodeArts Build package specification countdown metadata",
    inputSchema: buildShowPackageSpecCountdownInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildShowPackageSpecCountdownHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildShowPackageSpecCountdownHandler
  }),
  "build_list_job_update_history": defineProductTool({
    description: "List CodeArts Build job update history",
    inputSchema: buildListJobUpdateHistoryInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobUpdateHistoryHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobUpdateHistoryHandler
  }),
  "build_list_all_jobs": defineProductTool({
    description: "List CodeArts Build jobs visible to the current user",
    inputSchema: buildListAllJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListAllJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListAllJobsHandler
  }),
  "build_list_brief_records": defineProductTool({
    description: "List CodeArts Build brief records by build project IDs",
    inputSchema: buildListBriefRecordsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListBriefRecordsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListBriefRecordsHandler
  }),
  "build_list_job_history_v3": defineProductTool({
    description: "List CodeArts Build v3 job history records",
    inputSchema: buildListJobHistoryV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobHistoryV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobHistoryV3Handler
  }),
  "build_list_job_config_v3": defineProductTool({
    description: "List CodeArts Build v3 job configuration via official query API",
    inputSchema: buildListJobConfigV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobConfigV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobConfigV3Handler
  }),
  "build_get_job_output": defineProductTool({
    description: "Get CodeArts Build job output",
    inputSchema: buildGetJobOutputInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobOutputHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobOutputHandler
  }),
  "build_get_job_step_status": defineProductTool({
    description: "Get CodeArts Build job step status",
    inputSchema: buildGetJobStepStatusInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobStepStatusHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobStepStatusHandler
  }),
  "build_get_job_pipeline_info": defineProductTool({
    description: "Get CodeArts Build job pipeline information",
    inputSchema: buildGetJobPipelineInfoInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobPipelineInfoHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobPipelineInfoHandler
  }),
  "build_list_project_endpoints": defineProductTool({
    description: "List CodeArts Build project endpoints",
    inputSchema: buildListProjectEndpointsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListProjectEndpointsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListProjectEndpointsHandler
  }),
  "build_show_domains_statuses": defineProductTool({
    description: "Show CodeArts Build domain statuses",
    inputSchema: buildShowDomainsStatusesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildShowDomainsStatusesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildShowDomainsStatusesHandler
  }),
  "build_show_flow_graph_v3": defineProductTool({
    description: "Show CodeArts Build v3 flow graph",
    inputSchema: buildShowFlowGraphV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildShowFlowGraphV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildShowFlowGraphV3Handler
  }),
  "build_list_job_badge_branches": defineProductTool({
    description: "List CodeArts Build job badge branches",
    inputSchema: buildListJobBadgeBranchesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobBadgeBranchesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobBadgeBranchesHandler
  }),
  "build_get_running_step_log": defineProductTool({
    description: "Get CodeArts Build running step log",
    inputSchema: buildGetRunningStepLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRunningStepLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRunningStepLogHandler
  }),
  "build_get_stage_log_page": defineProductTool({
    description: "Get CodeArts Build stage log page",
    inputSchema: buildGetStageLogPageInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetStageLogPageHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetStageLogPageHandler
  }),
  "build_get_task_log_page": defineProductTool({
    description: "Get CodeArts Build finished task step log page",
    inputSchema: buildGetTaskLogPageInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetTaskLogPageHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetTaskLogPageHandler
  }),
  "build_download_full_log": defineProductTool({
    description: "Get CodeArts Build full log download metadata",
    inputSchema: buildDownloadFullLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadFullLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadFullLogHandler
  }),
  "build_download_task_log": defineProductTool({
    description: "Get CodeArts Build task log download metadata",
    inputSchema: buildDownloadTaskLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadTaskLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadTaskLogHandler
  }),
  "build_download_build_log_v4": defineProductTool({
    description: "Download CodeArts Build v4 full log file",
    inputSchema: buildDownloadBuildLogV4Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadBuildLogV4Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadBuildLogV4Handler
  }),
  "build_download_log_by_record_id_v3": defineProductTool({
    description: "Download CodeArts Build v3 log by record ID",
    inputSchema: buildDownloadLogByRecordIdV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadLogByRecordIdV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadLogByRecordIdV3Handler
  }),
  "build_download_task_log_v4": defineProductTool({
    description: "Download CodeArts Build v4 task log file",
    inputSchema: buildDownloadTaskLogV4Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadTaskLogV4Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadTaskLogV4Handler
  }),
  "build_get_template": defineProductTool({
    description: "Get a CodeArts Build custom template",
    inputSchema: buildGetTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetTemplateHandler
  }),
  "build_get_yaml_template": defineProductTool({
    description: "Get a CodeArts Build YAML template",
    inputSchema: buildGetYamlTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetYamlTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetYamlTemplateHandler
  }),
  "build_list_recommended_official_templates": defineProductTool({
    description: "List CodeArts Build recommended official templates",
    inputSchema: buildListRecommendedOfficialTemplatesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListRecommendedOfficialTemplatesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListRecommendedOfficialTemplatesHandler
  }),
  "build_download_keystore_v2": defineProductTool({
    description: "Download CodeArts Build v2 keystore file",
    inputSchema: buildDownloadKeystoreV2Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadKeystoreV2Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadKeystoreV2Handler
  }),
  "build_download_keystore_v3": defineProductTool({
    description: "Download CodeArts Build v3 keystore file",
    inputSchema: buildDownloadKeystoreV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDownloadKeystoreV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDownloadKeystoreV3Handler
  }),
  "build_list_keystore_files": defineProductTool({
    description: "List CodeArts Build keystore file metadata",
    inputSchema: buildListKeystoreFilesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListKeystoreFilesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListKeystoreFilesHandler
  }),
  "build_list_usable_keystore_names": defineProductTool({
    description: "List CodeArts Build usable keystore names",
    inputSchema: buildListUsableKeystoreNamesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListUsableKeystoreNamesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListUsableKeystoreNamesHandler
  }),
  "build_get_keystore_permission": defineProductTool({
    description: "Get CodeArts Build keystore permission",
    inputSchema: buildGetKeystorePermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetKeystorePermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetKeystorePermissionHandler
  }),
  "build_list_job_group_tree": defineProductTool({
    description: "List CodeArts Build job group tree",
    inputSchema: buildListJobGroupTreeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListJobGroupTreeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListJobGroupTreeHandler
  }),
  "build_get_job": defineProductTool({
    description: "Get CodeArts Build job detail",
    inputSchema: buildGetJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobHandler
  }),
  "build_get_record": defineProductTool({
    description: "Get CodeArts Build record detail",
    inputSchema: buildGetRecordInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordHandler
  }),
  "build_list_default_parameters": defineProductTool({
    description: "List CodeArts Build default parameters",
    inputSchema: buildListDefaultParametersInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListDefaultParametersHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListDefaultParametersHandler
  }),
  "build_list_system_parameters": defineProductTool({
    description: "List CodeArts Build system parameters",
    inputSchema: buildListSystemParametersInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListSystemParametersHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListSystemParametersHandler
  }),
  "build_list_build_parameter_types": defineProductTool({
    description: "List CodeArts Build parameter types for job configuration",
    inputSchema: buildListBuildParameterTypesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListBuildParameterTypesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListBuildParameterTypesHandler
  }),
  "build_list_records": defineProductTool({
    description: "List CodeArts Build records",
    inputSchema: buildListRecordsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListRecordsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListRecordsHandler
  }),
  "build_run_job": defineProductTool({
    description: "Run CodeArts Build job",
    inputSchema: buildRunJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildRunJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildRunJobHandler
  }),
  "build_delete_job": defineProductTool({
    description: "Delete CodeArts Build job",
    inputSchema: buildDeleteJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteJobHandler
  }),
  "build_disable_job": defineProductTool({
    description: "Disable CodeArts Build job",
    inputSchema: buildDisableJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDisableJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDisableJobHandler
  }),
  "build_set_keep_time": defineProductTool({
    description: "Set CodeArts Build recycling keep time",
    inputSchema: buildSetKeepTimeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildSetKeepTimeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildSetKeepTimeHandler
  }),
  "build_delete_recycling_jobs": defineProductTool({
    description: "Delete CodeArts Build recycling jobs permanently",
    inputSchema: buildDeleteRecyclingJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteRecyclingJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteRecyclingJobsHandler
  }),
  "build_clear_recycling_jobs": defineProductTool({
    description: "Clear all CodeArts Build recycling jobs",
    inputSchema: buildClearRecyclingJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildClearRecyclingJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildClearRecyclingJobsHandler
  }),
  "build_restore_recycling_jobs": defineProductTool({
    description: "Restore CodeArts Build recycling jobs",
    inputSchema: buildRestoreRecyclingJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildRestoreRecyclingJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildRestoreRecyclingJobsHandler
  }),
  "build_follow_job": defineProductTool({
    description: "Follow CodeArts Build job",
    inputSchema: buildFollowJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildFollowJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildFollowJobHandler
  }),
  "build_unfollow_job": defineProductTool({
    description: "Unfollow CodeArts Build job",
    inputSchema: buildUnfollowJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUnfollowJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUnfollowJobHandler
  }),
  "build_delete_template": defineProductTool({
    description: "Delete CodeArts Build template",
    inputSchema: buildDeleteTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteTemplateHandler
  }),
  "build_save_template_used_info": defineProductTool({
    description: "Save CodeArts Build template usage record",
    inputSchema: buildSaveTemplateUsedInfoInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildSaveTemplateUsedInfoHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildSaveTemplateUsedInfoHandler
  }),
  "build_follow_custom_template": defineProductTool({
    description: "Follow CodeArts Build custom template",
    inputSchema: buildFollowCustomTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildFollowCustomTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildFollowCustomTemplateHandler
  }),
  "build_unfollow_custom_template": defineProductTool({
    description: "Unfollow CodeArts Build custom template",
    inputSchema: buildUnfollowCustomTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUnfollowCustomTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUnfollowCustomTemplateHandler
  }),
  "build_follow_official_template": defineProductTool({
    description: "Follow CodeArts Build official template",
    inputSchema: buildFollowOfficialTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildFollowOfficialTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildFollowOfficialTemplateHandler
  }),
  "build_unfollow_official_template": defineProductTool({
    description: "Unfollow CodeArts Build official template",
    inputSchema: buildUnfollowOfficialTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUnfollowOfficialTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUnfollowOfficialTemplateHandler
  }),
  "build_delete_keystore": defineProductTool({
    description: "Delete CodeArts Build keystore",
    inputSchema: buildDeleteKeystoreInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteKeystoreHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteKeystoreHandler
  }),
  "build_delete_keystore_permission": defineProductTool({
    description: "Delete CodeArts Build keystore permission",
    inputSchema: buildDeleteKeystorePermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteKeystorePermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteKeystorePermissionHandler
  }),
  "build_delete_job_v3": defineProductTool({
    description: "Delete CodeArts Build v3 job",
    inputSchema: buildDeleteJobV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteJobV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteJobV3Handler
  }),
  "build_recover_job_v3": defineProductTool({
    description: "Recover CodeArts Build v3 job",
    inputSchema: buildRecoverJobV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildRecoverJobV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildRecoverJobV3Handler
  }),
  "build_disable_job_v3": defineProductTool({
    description: "Disable CodeArts Build v3 job",
    inputSchema: buildDisableJobV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDisableJobV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDisableJobV3Handler
  }),
  "build_check_webhook_url": defineProductTool({
    description: "Check CodeArts Build webhook URL parameters",
    inputSchema: buildCheckWebhookUrlInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCheckWebhookUrlHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCheckWebhookUrlHandler
  }),
  "build_auto_execute_job": defineProductTool({
    description: "Auto-execute CodeArts Build job from source update event payload",
    inputSchema: buildAutoExecuteJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAutoExecuteJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAutoExecuteJobHandler
  }),
  "build_batch_update_job_permissions": defineProductTool({
    description: "Batch update CodeArts Build job permissions",
    inputSchema: buildBatchUpdateJobPermissionsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildBatchUpdateJobPermissionsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildBatchUpdateJobPermissionsHandler
  }),
  "build_batch_delete_jobs": defineProductTool({
    description: "Batch delete CodeArts Build jobs",
    inputSchema: buildBatchDeleteJobsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildBatchDeleteJobsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildBatchDeleteJobsHandler
  }),
  "build_batch_set_agency": defineProductTool({
    description: "Batch set CodeArts Build job agency",
    inputSchema: buildBatchSetAgencyInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildBatchSetAgencyHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildBatchSetAgencyHandler
  }),
  "build_update_job_role_permission": defineProductTool({
    description: "Update CodeArts Build job role permission",
    inputSchema: buildUpdateJobRolePermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateJobRolePermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateJobRolePermissionHandler
  }),
  "build_move_job_group": defineProductTool({
    description: "Move CodeArts Build jobs to a target group",
    inputSchema: buildMoveJobGroupInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildMoveJobGroupHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildMoveJobGroupHandler
  }),
  "build_update_job_group": defineProductTool({
    description: "Update CodeArts Build job group",
    inputSchema: buildUpdateJobGroupInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateJobGroupHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateJobGroupHandler
  }),
  "build_create_job": defineProductTool({
    description: "Create CodeArts Build job",
    inputSchema: buildCreateJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCreateJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCreateJobHandler
  }),
  "build_copy_job": defineProductTool({
    description: "Copy CodeArts Build job",
    inputSchema: buildCopyJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCopyJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCopyJobHandler
  }),
  "build_update_job_notice": defineProductTool({
    description: "Update CodeArts Build job notice",
    inputSchema: buildUpdateJobNoticeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateJobNoticeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateJobNoticeHandler
  }),
  "build_disable_job_notice": defineProductTool({
    description: "Disable CodeArts Build job notice",
    inputSchema: buildDisableJobNoticeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDisableJobNoticeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDisableJobNoticeHandler
  }),
  "build_create_job_group": defineProductTool({
    description: "Create CodeArts Build job group",
    inputSchema: buildCreateJobGroupInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCreateJobGroupHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCreateJobGroupHandler
  }),
  "build_create_template": defineProductTool({
    description: "Create CodeArts Build template through the official v1 template create endpoint",
    inputSchema: buildCreateTemplateInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCreateTemplateHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCreateTemplateHandler
  }),
  "build_create_template_v3": defineProductTool({
    description: "Create CodeArts Build template through the official v3 templates create endpoint",
    inputSchema: buildCreateTemplateV3Input,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildCreateTemplateV3Handler>[0] }) => clients.buildClient,
    createProductHandler: createBuildCreateTemplateV3Handler
  }),
  "build_update_keystore": defineProductTool({
    description: "Update CodeArts Build keystore metadata through the official token-only endpoint",
    inputSchema: buildUpdateKeystoreInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateKeystoreHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateKeystoreHandler
  }),
  "build_upload_junit_report": defineProductTool({
    description: "Upload CodeArts Build JUnit report files through the official upload endpoint",
    inputSchema: buildUploadJunitReportInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUploadJunitReportHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUploadJunitReportHandler
  }),
  "build_upload_junit_coverage": defineProductTool({
    description: "Upload CodeArts Build JUnit coverage files through the official upload endpoint",
    inputSchema: buildUploadJunitCoverageInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUploadJunitCoverageHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUploadJunitCoverageHandler
  }),
  "build_upload_keystore": defineProductTool({
    description: "Upload CodeArts Build keystore file",
    inputSchema: buildUploadKeystoreInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUploadKeystoreHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUploadKeystoreHandler
  }),
  "build_delete_job_group": defineProductTool({
    description: "Delete CodeArts Build job group",
    inputSchema: buildDeleteJobGroupInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildDeleteJobGroupHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildDeleteJobGroupHandler
  }),
  "build_swap_job_group": defineProductTool({
    description: "Swap CodeArts Build job group order",
    inputSchema: buildSwapJobGroupInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildSwapJobGroupHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildSwapJobGroupHandler
  }),
  "build_add_keystore_permission": defineProductTool({
    description: "Add CodeArts Build keystore permission",
    inputSchema: buildAddKeystorePermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAddKeystorePermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAddKeystorePermissionHandler
  }),
  "build_edit_keystore_permission": defineProductTool({
    description: "Edit CodeArts Build keystore permission via token-only official API",
    inputSchema: buildEditKeystorePermissionInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildEditKeystorePermissionHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildEditKeystorePermissionHandler
  }),
  "build_append_job_step": defineProductTool({
    description: "Append a new step to a CodeArts Build job",
    inputSchema: buildAppendJobStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAppendJobStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAppendJobStepHandler
  }),
  "build_append_release_upload_step": defineProductTool({
    description: "Append the official release repository upload step to a CodeArts Build job",
    inputSchema: buildAppendReleaseUploadStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildAppendReleaseUploadStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildAppendReleaseUploadStepHandler
  }),
  "build_configure_release_upload_step": defineProductTool({
    description: "Configure an existing release repository upload step in a CodeArts Build job",
    inputSchema: buildConfigureReleaseUploadStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildConfigureReleaseUploadStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildConfigureReleaseUploadStepHandler
  }),
  "build_prepare_node_runtime_bundle": defineProductTool({
    description: "Prepare a Node runtime bundle by appending packaging commands to a build step",
    inputSchema: buildPrepareNodeRuntimeBundleInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildPrepareNodeRuntimeBundleHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildPrepareNodeRuntimeBundleHandler
  }),
  "build_prepare_deployable_node_app": defineProductTool({
    description: "Prepare a single-file deployable Node app by appending bundling commands to a build step",
    inputSchema: buildPrepareDeployableNodeAppInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildPrepareDeployableNodeAppHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildPrepareDeployableNodeAppHandler
  }),
  "build_stop_job": defineProductTool({
    description: "Stop CodeArts Build job",
    inputSchema: buildStopJobInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildStopJobHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildStopJobHandler
  }),
  "build_update_job_step": defineProductTool({
    description: "Update CodeArts Build job step image or command",
    inputSchema: buildUpdateJobStepInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildUpdateJobStepHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildUpdateJobStepHandler
  }),
  "build_get_real_time_log": defineProductTool({
    description: "Get CodeArts Build real-time log",
    inputSchema: buildGetRealTimeLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRealTimeLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRealTimeLogHandler
  }),
  "build_get_history_details": defineProductTool({
    description: "Get CodeArts Build history details",
    inputSchema: buildGetHistoryDetailsInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetHistoryDetailsHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetHistoryDetailsHandler
  }),
  "build_get_error_log": defineProductTool({
    description: "Get CodeArts Build error log analysis",
    inputSchema: buildGetErrorLogInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetErrorLogHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetErrorLogHandler
  }),
  "build_get_info_record": defineProductTool({
    description: "Get CodeArts Build info record",
    inputSchema: buildGetInfoRecordInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetInfoRecordHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetInfoRecordHandler
  }),
  "build_get_record_script": defineProductTool({
    description: "Get CodeArts Build record script",
    inputSchema: buildGetRecordScriptInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetRecordScriptHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetRecordScriptHandler
  }),
  "build_get_full_stages": defineProductTool({
    description: "Get CodeArts Build full stages",
    inputSchema: buildGetFullStagesInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetFullStagesHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetFullStagesHandler
  }),
  "build_list_build_parameters": defineProductTool({
    description: "List CodeArts Build parameters",
    inputSchema: buildListBuildParametersInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildListBuildParametersHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildListBuildParametersHandler
  })
} as const;

export function registerBuildTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: BuildStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: buildToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
