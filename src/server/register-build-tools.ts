import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createBuildClient } from "../products/build/client.js";
import {
  buildAppendReleaseUploadStepInput,
  buildAppendJobStepInput,
  buildConfigureReleaseUploadStepInput,
  buildPrepareDeployableNodeAppInput,
  buildGetErrorLogInput,
  buildGetFullStagesInput,
  buildGetHistoryDetailsInput,
  buildGetInfoRecordInput,
  buildGetJobCopyNameInput,
  buildGetJobDisableCheckInput,
  buildGetDomainChargeTypeInput,
  buildGetDomainFederationInput,
  buildGetDomainJobSummaryInput,
  buildGetDomainPackageQuotaInput,
  buildGetDomainStatusInput,
  buildGetDomainUserPermissionInput,
  buildGetDockerfileTemplateInput,
  buildGetJobBuildSuccessRatioInput,
  buildGetJobBuildTimeInput,
  buildGetJobConfigDiffInput,
  buildGetCoverageMetricsInput,
  buildGetJobNoticeInput,
  buildGetJobPermissionInput,
  buildGetJobPermissionInternalInput,
  buildGetJobRunningStatusInput,
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
  buildListCodeTagsInput,
  buildListDefaultParametersInput,
  buildListDomainRelatedProjectsInput,
  buildListDomainRelatedProjectsPageInput,
  buildListGitCodeBranchesInput,
  buildListGitCodeRepositoriesInput,
  buildListImageTemplatesInput,
  buildListJunitCoverageSummariesInput,
  buildListJobGroupTreeInput,
  buildListJobsInput,
  buildListJobPermissionRolesInput,
  buildListOfficialTemplatesInput,
  buildListPackageSpecStatusesInput,
  buildListProjectRecordsInput,
  buildListRecyclingJobsInput,
  buildListReportBranchesInput,
  buildListReportRepositoriesInput,
  buildListRecordsInput,
  buildListResourceSpecsInput,
  buildListSystemParametersInput,
  buildListTemplatesInput,
  buildRunJobInput,
  buildStopJobInput,
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
import { createBuildGetJobConfigDiffHandler } from "../products/build/tools/get-job-config-diff.js";
import { createBuildGetJobPermissionHandler } from "../products/build/tools/get-job-permission.js";
import { createBuildGetJobPermissionInternalHandler } from "../products/build/tools/get-job-permission-internal.js";
import { createBuildGetProjectDefaultPermissionHandler } from "../products/build/tools/get-project-default-permission.js";
import { createBuildGetReportSummaryHandler } from "../products/build/tools/get-report-summary.js";
import { createBuildCheckJobNameExistsHandler } from "../products/build/tools/check-job-name-exists.js";
import { createBuildCheckJobCountLimitHandler } from "../products/build/tools/check-job-count-limit.js";
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
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
  "build_get_job_notice": defineProductTool({
    description: "Get CodeArts Build job notice settings",
    inputSchema: buildGetJobNoticeInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobNoticeHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobNoticeHandler
  }),
  "build_get_job_running_status": defineProductTool({
    description: "Get CodeArts Build job running status",
    inputSchema: buildGetJobRunningStatusInput,
    selectHttpClient: (clients: { buildClient: Parameters<typeof createBuildGetJobRunningStatusHandler>[0] }) => clients.buildClient,
    createProductHandler: createBuildGetJobRunningStatusHandler
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
