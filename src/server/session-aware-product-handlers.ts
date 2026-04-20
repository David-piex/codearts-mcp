import { createArtifactDeleteFileHandler } from "../products/artifact/tools/delete-file.js";
import { createArtifactGetDownloadUrlHandler } from "../products/artifact/tools/get-download-url.js";
import { createArtifactGetFileHandler } from "../products/artifact/tools/get-file.js";
import { createArtifactGetFileTreeHandler } from "../products/artifact/tools/get-file-tree.js";
import { createArtifactGetRepositoryHandler } from "../products/artifact/tools/get-repository.js";
import { createArtifactListBuildArchivesHandler } from "../products/artifact/tools/list-build-archives.js";
import { createArtifactListFilesHandler } from "../products/artifact/tools/list-files.js";
import { createArtifactListLatestVersionFilesHandler } from "../products/artifact/tools/list-latest-version-files.js";
import { createArtifactListRepositoriesHandler } from "../products/artifact/tools/list-repositories.js";
import { createArtifactListVersionsHandler } from "../products/artifact/tools/list-versions.js";
import { createArtifactSearchArtifactsHandler } from "../products/artifact/tools/search-artifacts.js";
import { createArtifactShowAuditHandler } from "../products/artifact/tools/show-audit.js";
import { createBuildAppendJobStepHandler } from "../products/build/tools/append-job-step.js";
import { createBuildAppendReleaseUploadStepHandler } from "../products/build/tools/append-release-upload-step.js";
import { createBuildConfigureReleaseUploadStepHandler } from "../products/build/tools/configure-release-upload-step.js";
import { createBuildGetErrorLogHandler } from "../products/build/tools/get-error-log.js";
import { createBuildGetFullStagesHandler } from "../products/build/tools/get-full-stages.js";
import { createBuildGetHistoryDetailsHandler } from "../products/build/tools/get-history-details.js";
import { createBuildGetInfoRecordHandler } from "../products/build/tools/get-info-record.js";
import { createBuildGetJobHandler } from "../products/build/tools/get-job.js";
import { createBuildGetProjectRecordStatisticsHandler } from "../products/build/tools/get-project-record-statistics.js";
import { createBuildGetRealTimeLogHandler } from "../products/build/tools/get-real-time-log.js";
import { createBuildGetRecordFlowGraphHandler } from "../products/build/tools/get-record-flow-graph.js";
import { createBuildGetRecordHandler } from "../products/build/tools/get-record.js";
import { createBuildGetRecordScriptHandler } from "../products/build/tools/get-record-script.js";
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
import { createBuildListJobsHandler } from "../products/build/tools/list-jobs.js";
import { createBuildListProjectRecordsHandler } from "../products/build/tools/list-project-records.js";
import { createBuildListRecordsHandler } from "../products/build/tools/list-records.js";
import { createBuildPrepareDeployableNodeAppHandler } from "../products/build/tools/prepare-deployable-node-app.js";
import { createBuildPrepareNodeRuntimeBundleHandler } from "../products/build/tools/prepare-node-runtime-bundle.js";
import { createBuildRunJobHandler } from "../products/build/tools/run-job.js";
import { createBuildStopJobHandler } from "../products/build/tools/stop-job.js";
import { createBuildUpdateJobStepHandler } from "../products/build/tools/update-job-step.js";
import { createCheckCreateTaskHandler } from "../products/check/tools/create-task.js";
import { createCheckGetMetricsHandler } from "../products/check/tools/get-metrics.js";
import { createCheckGetTaskHandler } from "../products/check/tools/get-task.js";
import { createCheckListRulesetsHandler } from "../products/check/tools/list-rulesets.js";
import { createCheckListTaskIssuesHandler } from "../products/check/tools/list-task-issues.js";
import { createCheckListTasksHandler } from "../products/check/tools/list-tasks.js";
import { createCheckRunTaskHandler } from "../products/check/tools/run-task.js";
import { createCheckStopTaskHandler } from "../products/check/tools/stop-task.js";
import { createDeployAddV4EnvironmentHostsHandler } from "../products/deploy/tools/add-v4-environment-hosts.js";
import { createDeployCancelV4DeployRecordHandler } from "../products/deploy/tools/cancel-v4-deploy-record.js";
import { createDeployCreateApplicationHandler } from "../products/deploy/tools/create-application.js";
import { createDeployCreateEnvironmentHandler } from "../products/deploy/tools/create-environment.js";
import { createDeployCreateTaskByTemplateHandler } from "../products/deploy/tools/create-task-by-template.js";
import { createDeployDeleteV4ClusterHostsHandler } from "../products/deploy/tools/delete-v4-cluster-hosts.js";
import { createDeployDeleteV4EnvironmentHostsHandler } from "../products/deploy/tools/delete-v4-environment-hosts.js";
import { createDeployGetAppHandler } from "../products/deploy/tools/get-app.js";
import { createDeployGetAppLogHandler } from "../products/deploy/tools/get-app-log.js";
import { createDeployGetDeploySourceDetailHandler } from "../products/deploy/tools/get-deploy-source-detail.js";
import { createDeployGetExecutionParamsHandler } from "../products/deploy/tools/get-execution-params.js";
import { createDeployGetHistoryDetailHandler } from "../products/deploy/tools/get-history-detail.js";
import { createDeployGetHostGroupHandler } from "../products/deploy/tools/get-host-group.js";
import { createDeployGetLastRecordDetailHandler } from "../products/deploy/tools/get-last-record-detail.js";
import { createDeployGetRuntimeVariablesHandler } from "../products/deploy/tools/get-runtime-variables.js";
import { createDeployGetStatusHandler } from "../products/deploy/tools/get-status.js";
import { createDeployGetTaskHandler } from "../products/deploy/tools/get-task.js";
import { createDeployGetTemplateDetailHandler } from "../products/deploy/tools/get-template-detail.js";
import { createDeployGetV4ClusterCountHandler } from "../products/deploy/tools/get-v4-cluster-count.js";
import { createDeployGetV4ClusterHandler } from "../products/deploy/tools/get-v4-cluster.js";
import { createDeployGetV4ClusterHostHandler } from "../products/deploy/tools/get-v4-cluster-host.js";
import { createDeployGetV4DeployRecordHandler } from "../products/deploy/tools/get-v4-deploy-record.js";
import { createDeployGetV4DeployRecordStepDetailHandler } from "../products/deploy/tools/get-v4-deploy-record-step-detail.js";
import { createDeployGetV4DeployRecordStepLogsHandler } from "../products/deploy/tools/get-v4-deploy-record-step-logs.js";
import { createDeployGetV4EnvironmentHandler } from "../products/deploy/tools/get-v4-environment.js";
import { createDeployGetV4EnvironmentResourceDetailHandler } from "../products/deploy/tools/get-v4-environment-resource-detail.js";
import { createDeployImportHostsToEnvironmentHandler } from "../products/deploy/tools/import-hosts-to-environment.js";
import { createDeployListAppHostGroupsHandler } from "../products/deploy/tools/list-app-host-groups.js";
import { createDeployListAppOperationsLogHandler } from "../products/deploy/tools/list-app-operations-log.js";
import { createDeployListAppsHandler } from "../products/deploy/tools/list-apps.js";
import { createDeployListDeploymentUnitsHandler } from "../products/deploy/tools/list-deployment-units.js";
import { createDeployListEnvironmentHostsHandler } from "../products/deploy/tools/list-environment-hosts.js";
import { createDeployListEnvironmentsHandler } from "../products/deploy/tools/list-environments.js";
import { createDeployListHistoriesHandler } from "../products/deploy/tools/list-histories.js";
import { createDeployListHostGroupEnvironmentsHandler } from "../products/deploy/tools/list-host-group-environments.js";
import { createDeployListHostGroupHostsHandler } from "../products/deploy/tools/list-host-group-hosts.js";
import { createDeployListHostGroupsHandler } from "../products/deploy/tools/list-host-groups.js";
import { createDeployListSystemConfigsHandler } from "../products/deploy/tools/list-system-configs.js";
import { createDeployListTasksHandler } from "../products/deploy/tools/list-tasks.js";
import { createDeployListV4ApplicationsHandler } from "../products/deploy/tools/list-v4-applications.js";
import { createDeployListV4ClusterHostsHandler } from "../products/deploy/tools/list-v4-cluster-hosts.js";
import { createDeployListV4ClustersHandler } from "../products/deploy/tools/list-v4-clusters.js";
import { createDeployListV4DeployRecordsHandler } from "../products/deploy/tools/list-v4-deploy-records.js";
import { createDeployListV4EnvironmentApplicationsHandler } from "../products/deploy/tools/list-v4-environment-applications.js";
import { createDeployListV4EnvironmentHostsHandler } from "../products/deploy/tools/list-v4-environment-hosts.js";
import { createDeployListV4EnvironmentsHandler } from "../products/deploy/tools/list-v4-environments.js";
import { createDeployListV4OrchestrationsHandler } from "../products/deploy/tools/list-v4-orchestrations.js";
import { createDeployListVariableHistoryHandler } from "../products/deploy/tools/list-variable-history.js";
import { createDeployListVariablesHandler } from "../products/deploy/tools/list-variables.js";
import { createDeployModifyApplicationHandler } from "../products/deploy/tools/modify-application.js";
import { createDeployPassV4ManualCheckHandler } from "../products/deploy/tools/pass-v4-manual-check.js";
import { createDeployQueryVariablesHandler } from "../products/deploy/tools/query-variables.js";
import { createDeployRefuseV4ManualCheckHandler } from "../products/deploy/tools/refuse-v4-manual-check.js";
import { createDeployRerunV4DeployRecordHandler } from "../products/deploy/tools/rerun-v4-deploy-record.js";
import { createDeployRetryV4DeployRecordHandler } from "../products/deploy/tools/retry-v4-deploy-record.js";
import { createDeployRollbackAppHandler } from "../products/deploy/tools/rollback-app.js";
import { createDeployRollbackV4DeployRecordHandler } from "../products/deploy/tools/rollback-v4-deploy-record.js";
import { createDeployStartAppHandler } from "../products/deploy/tools/start-app.js";
import { createDeployStopAppHandler } from "../products/deploy/tools/stop-app.js";
import { createPipelineApproveRunHandler } from "../products/pipeline/tools/approve-run.js";
import { createPipelineGetManualReviewContextHandler } from "../products/pipeline/tools/get-manual-review-context.js";
import { createPipelineGetPipelineHandler } from "../products/pipeline/tools/get-pipeline.js";
import { createPipelineGetRunDetailHandler } from "../products/pipeline/tools/get-run-detail.js";
import { createPipelineGetRunLogHandler } from "../products/pipeline/tools/get-run-log.js";
import { createPipelineGetRunParametersHandler } from "../products/pipeline/tools/get-run-parameters.js";
import { createPipelineGetRunHandler } from "../products/pipeline/tools/get-run.js";
import { createPipelineGetStepOutputsHandler } from "../products/pipeline/tools/get-step-outputs.js";
import { createPipelineListArtifactsHandler } from "../products/pipeline/tools/list-artifacts.js";
import { createPipelineListPipelinesHandler } from "../products/pipeline/tools/list-pipelines.js";
import { createPipelineListRunsHandler } from "../products/pipeline/tools/list-runs.js";
import { createPipelineListTemplatesHandler } from "../products/pipeline/tools/list-templates.js";
import { createPipelineRejectRunHandler } from "../products/pipeline/tools/reject-run.js";
import { createPipelineRetryRunHandler } from "../products/pipeline/tools/retry-run.js";
import { createPipelineRunPipelineHandler } from "../products/pipeline/tools/run-pipeline.js";
import { createPipelineStopRunHandler } from "../products/pipeline/tools/stop-run.js";
import { createRepoCloseMergeRequestHandler } from "../products/repo/tools/close-merge-request.js";
import { createRepoCompareRefsHandler } from "../products/repo/tools/compare-refs.js";
import { createRepoCreateMergeRequestDiscussionHandler } from "../products/repo/tools/create-merge-request-discussion.js";
import { createRepoCreateMergeRequestHandler } from "../products/repo/tools/create-merge-request.js";
import { createRepoCreateTagHandler } from "../products/repo/tools/create-tag.js";
import { createRepoDeleteTagHandler } from "../products/repo/tools/delete-tag.js";
import { createRepoGetBranchHandler } from "../products/repo/tools/get-branch.js";
import { createRepoGetCommitHandler } from "../products/repo/tools/get-commit.js";
import { createRepoGetFileHandler } from "../products/repo/tools/get-file.js";
import { createRepoGetMergeRequestHandler } from "../products/repo/tools/get-merge-request.js";
import { createRepoGetRepositoryHandler } from "../products/repo/tools/get-repository.js";
import { createRepoGetTagHandler } from "../products/repo/tools/get-tag.js";
import { createRepoListBranchesHandler } from "../products/repo/tools/list-branches.js";
import { createRepoListCommitsHandler } from "../products/repo/tools/list-commits.js";
import { createRepoListEventsHandler } from "../products/repo/tools/list-events.js";
import { createRepoListMergeRequestChangesHandler } from "../products/repo/tools/list-merge-request-changes.js";
import { createRepoListMergeRequestDiscussionsHandler } from "../products/repo/tools/list-merge-request-discussions.js";
import { createRepoListMergeRequestsHandler } from "../products/repo/tools/list-merge-requests.js";
import { createRepoListProtectedBranchesHandler } from "../products/repo/tools/list-protected-branches.js";
import { createRepoListRepositoriesHandler } from "../products/repo/tools/list-repositories.js";
import { createRepoListRepositoryLabelsHandler } from "../products/repo/tools/list-repository-labels.js";
import { createRepoListTagsHandler } from "../products/repo/tools/list-tags.js";
import { createRepoMergeMergeRequestHandler } from "../products/repo/tools/merge-merge-request.js";
import { createRepoReviewMergeRequestHandler } from "../products/repo/tools/review-merge-request.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqGetProjectHandler } from "../products/req/tools/get-project.js";
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqListIterationsHandler } from "../products/req/tools/list-iterations.js";
import { createReqListProjectMembersHandler } from "../products/req/tools/list-project-members.js";
import { createReqListProjectsHandler } from "../products/req/tools/list-projects.js";
import { createReqListWorkItemsHandler } from "../products/req/tools/list-work-items.js";
import { createReqUpdateWorkItemHandler } from "../products/req/tools/update-work-item.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanRunCasesHandler } from "../products/testplan/tools/run-cases.js";
import { createSessionAwareProductToolHandler } from "./session-aware-handler.js";
import type { SessionCredentialStore } from "./session-store.js";

function createSessionAwareReqToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.reqClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareCheckToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.checkClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareDeployToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.deployClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareBuildToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.buildClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareArtifactToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.artifactClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareRepoToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.repoClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwarePipelineToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.pipelineClient as Parameters<THandler>[0],
    createProductHandler
  });
}

function createSessionAwareTestPlanToolHandler<
  THandler extends (client: any) => (input: any) => any
>(
  store: SessionCredentialStore,
  injectedClient: Parameters<THandler>[0] | undefined,
  createProductHandler: THandler
) {
  return createSessionAwareProductToolHandler({
    store,
    injectedClient,
    selectClient: (clients) => clients.testPlanClient as Parameters<THandler>[0],
    createProductHandler
  });
}

export function createSessionAwareReqProjectsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListProjectsHandler>[0]
) {
  return createSessionAwareReqToolHandler(store, injectedClient, createReqListProjectsHandler);
}

export function createSessionAwareCheckListTasksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListTasksHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckListTasksHandler);
}

export function createSessionAwareCheckCreateTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckCreateTaskHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckCreateTaskHandler);
}

export function createSessionAwareCheckGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckGetTaskHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckGetTaskHandler);
}

export function createSessionAwareCheckListRulesetsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListRulesetsHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckListRulesetsHandler);
}

export function createSessionAwareCheckListTaskIssuesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListTaskIssuesHandler>[0]
) {
  return createSessionAwareCheckToolHandler(
    store,
    injectedClient,
    createCheckListTaskIssuesHandler
  );
}

export function createSessionAwareCheckGetMetricsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckGetMetricsHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckGetMetricsHandler);
}

export function createSessionAwareCheckRunTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckRunTaskHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckRunTaskHandler);
}

export function createSessionAwareCheckStopTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckStopTaskHandler>[0]
) {
  return createSessionAwareCheckToolHandler(store, injectedClient, createCheckStopTaskHandler);
}

export function createSessionAwareDeployListAppsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployListAppsHandler);
}

export function createSessionAwareDeployListV4ApplicationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ApplicationsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4ApplicationsHandler
  );
}

export function createSessionAwareDeployListV4ClustersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ClustersHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4ClustersHandler
  );
}

export function createSessionAwareDeployGetV4ClusterHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4ClusterHandler
  );
}

export function createSessionAwareDeployDeleteV4ClusterHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployDeleteV4ClusterHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployDeleteV4ClusterHostsHandler
  );
}

export function createSessionAwareDeployGetV4ClusterCountHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterCountHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4ClusterCountHandler
  );
}

export function createSessionAwareDeployGetV4ClusterHostHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterHostHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4ClusterHostHandler
  );
}

export function createSessionAwareDeployListV4ClusterHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ClusterHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4ClusterHostsHandler
  );
}

export function createSessionAwareDeployGetV4EnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4EnvironmentHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4EnvironmentHandler
  );
}

export function createSessionAwareDeployGetV4EnvironmentResourceDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4EnvironmentResourceDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4EnvironmentResourceDetailHandler
  );
}

export function createSessionAwareDeployListV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4EnvironmentHostsHandler
  );
}

export function createSessionAwareDeployAddV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployAddV4EnvironmentHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployAddV4EnvironmentHostsHandler
  );
}

export function createSessionAwareDeployDeleteV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployDeleteV4EnvironmentHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployDeleteV4EnvironmentHostsHandler
  );
}

export function createSessionAwareDeployListV4EnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4EnvironmentsHandler
  );
}

export function createSessionAwareDeployListV4EnvironmentApplicationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentApplicationsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4EnvironmentApplicationsHandler
  );
}

export function createSessionAwareDeployListDeploymentUnitsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListDeploymentUnitsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListDeploymentUnitsHandler
  );
}

export function createSessionAwareDeployListV4OrchestrationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4OrchestrationsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4OrchestrationsHandler
  );
}

export function createSessionAwareDeployListV4DeployRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4DeployRecordsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListV4DeployRecordsHandler
  );
}

export function createSessionAwareDeployGetLastRecordDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetLastRecordDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetLastRecordDetailHandler
  );
}

export function createSessionAwareDeployGetV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4DeployRecordHandler
  );
}

export function createSessionAwareDeployGetV4DeployRecordStepDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordStepDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4DeployRecordStepDetailHandler
  );
}

export function createSessionAwareDeployGetV4DeployRecordStepLogsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordStepLogsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetV4DeployRecordStepLogsHandler
  );
}

export function createSessionAwareDeployCancelV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCancelV4DeployRecordHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployCancelV4DeployRecordHandler
  );
}

export function createSessionAwareDeployRerunV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRerunV4DeployRecordHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployRerunV4DeployRecordHandler
  );
}

export function createSessionAwareDeployRetryV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRetryV4DeployRecordHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployRetryV4DeployRecordHandler
  );
}

export function createSessionAwareDeployRollbackV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRollbackV4DeployRecordHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployRollbackV4DeployRecordHandler
  );
}

export function createSessionAwareDeployPassV4ManualCheckHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployPassV4ManualCheckHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployPassV4ManualCheckHandler
  );
}

export function createSessionAwareDeployRefuseV4ManualCheckHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRefuseV4ManualCheckHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployRefuseV4ManualCheckHandler
  );
}

export function createSessionAwareDeployListAppHostGroupsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppHostGroupsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListAppHostGroupsHandler
  );
}

export function createSessionAwareDeployListHostGroupsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListHostGroupsHandler
  );
}

export function createSessionAwareDeployGetHostGroupHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetHostGroupHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetHostGroupHandler
  );
}

export function createSessionAwareDeployListHostGroupHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListHostGroupHostsHandler
  );
}

export function createSessionAwareDeployListHostGroupEnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupEnvironmentsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListHostGroupEnvironmentsHandler
  );
}

export function createSessionAwareDeployCreateEnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateEnvironmentHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployCreateEnvironmentHandler
  );
}

export function createSessionAwareDeployCreateApplicationHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateApplicationHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployCreateApplicationHandler
  );
}

export function createSessionAwareDeployModifyApplicationHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployModifyApplicationHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployModifyApplicationHandler
  );
}

export function createSessionAwareDeployCreateTaskByTemplateHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateTaskByTemplateHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployCreateTaskByTemplateHandler
  );
}

export function createSessionAwareDeployListEnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListEnvironmentHostsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListEnvironmentHostsHandler
  );
}

export function createSessionAwareDeployImportHostsToEnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployImportHostsToEnvironmentHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployImportHostsToEnvironmentHandler
  );
}

export function createSessionAwareDeployListEnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListEnvironmentsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListEnvironmentsHandler
  );
}

export function createSessionAwareDeployListTasksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListTasksHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployListTasksHandler);
}

export function createSessionAwareDeployGetAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetAppHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployGetAppHandler);
}

export function createSessionAwareDeployGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetTaskHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployGetTaskHandler);
}

export function createSessionAwareDeployGetDeploySourceDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetDeploySourceDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetDeploySourceDetailHandler
  );
}

export function createSessionAwareDeployGetTemplateDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetTemplateDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetTemplateDetailHandler
  );
}

export function createSessionAwareDeployListAppOperationsLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppOperationsLogHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListAppOperationsLogHandler
  );
}

export function createSessionAwareDeployGetAppLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetAppLogHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployGetAppLogHandler);
}

export function createSessionAwareDeployGetExecutionParamsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetExecutionParamsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetExecutionParamsHandler
  );
}

export function createSessionAwareDeployGetRuntimeVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetRuntimeVariablesHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetRuntimeVariablesHandler
  );
}

export function createSessionAwareDeployListVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListVariablesHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListVariablesHandler
  );
}

export function createSessionAwareDeployListVariableHistoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListVariableHistoryHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListVariableHistoryHandler
  );
}

export function createSessionAwareDeployListHistoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHistoriesHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListHistoriesHandler
  );
}

export function createSessionAwareDeployGetStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetStatusHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployGetStatusHandler);
}

export function createSessionAwareDeployQueryVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployQueryVariablesHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployQueryVariablesHandler
  );
}

export function createSessionAwareDeployStartAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployStartAppHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployStartAppHandler);
}

export function createSessionAwareDeployListSystemConfigsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListSystemConfigsHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployListSystemConfigsHandler
  );
}

export function createSessionAwareDeployStopAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployStopAppHandler>[0]
) {
  return createSessionAwareDeployToolHandler(store, injectedClient, createDeployStopAppHandler);
}

export function createSessionAwareDeployRollbackAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRollbackAppHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployRollbackAppHandler
  );
}

export function createSessionAwareDeployGetHistoryDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetHistoryDetailHandler>[0]
) {
  return createSessionAwareDeployToolHandler(
    store,
    injectedClient,
    createDeployGetHistoryDetailHandler
  );
}

export function createSessionAwareBuildListJobsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListJobsHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildListJobsHandler);
}

export function createSessionAwareBuildListProjectRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListProjectRecordsHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildListProjectRecordsHandler
  );
}

export function createSessionAwareBuildGetProjectRecordStatisticsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetProjectRecordStatisticsHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetProjectRecordStatisticsHandler
  );
}

export function createSessionAwareBuildGetRecordFlowGraphHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordFlowGraphHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetRecordFlowGraphHandler
  );
}

export function createSessionAwareBuildGetJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetJobHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildGetJobHandler);
}

export function createSessionAwareBuildGetRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildGetRecordHandler);
}

export function createSessionAwareBuildListRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListRecordsHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildListRecordsHandler);
}

export function createSessionAwareBuildRunJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildRunJobHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildRunJobHandler);
}

export function createSessionAwareBuildAppendJobStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildAppendJobStepHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildAppendJobStepHandler
  );
}

export function createSessionAwareBuildAppendReleaseUploadStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildAppendReleaseUploadStepHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildAppendReleaseUploadStepHandler
  );
}

export function createSessionAwareBuildConfigureReleaseUploadStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildConfigureReleaseUploadStepHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildConfigureReleaseUploadStepHandler
  );
}

export function createSessionAwareBuildPrepareNodeRuntimeBundleHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildPrepareNodeRuntimeBundleHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildPrepareNodeRuntimeBundleHandler
  );
}

export function createSessionAwareBuildPrepareDeployableNodeAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildPrepareDeployableNodeAppHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildPrepareDeployableNodeAppHandler
  );
}

export function createSessionAwareBuildStopJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildStopJobHandler>[0]
) {
  return createSessionAwareBuildToolHandler(store, injectedClient, createBuildStopJobHandler);
}

export function createSessionAwareBuildUpdateJobStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildUpdateJobStepHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildUpdateJobStepHandler
  );
}

export function createSessionAwareBuildGetRealTimeLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRealTimeLogHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetRealTimeLogHandler
  );
}

export function createSessionAwareBuildGetHistoryDetailsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetHistoryDetailsHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetHistoryDetailsHandler
  );
}

export function createSessionAwareBuildGetErrorLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetErrorLogHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetErrorLogHandler
  );
}

export function createSessionAwareBuildGetInfoRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetInfoRecordHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetInfoRecordHandler
  );
}

export function createSessionAwareBuildGetRecordScriptHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordScriptHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetRecordScriptHandler
  );
}

export function createSessionAwareBuildGetFullStagesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetFullStagesHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildGetFullStagesHandler
  );
}

export function createSessionAwareBuildListBuildParametersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListBuildParametersHandler>[0]
) {
  return createSessionAwareBuildToolHandler(
    store,
    injectedClient,
    createBuildListBuildParametersHandler
  );
}

export function createSessionAwareArtifactListRepositoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListRepositoriesHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactListRepositoriesHandler
  );
}

export function createSessionAwareArtifactListVersionsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListVersionsHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactListVersionsHandler
  );
}

export function createSessionAwareArtifactGetFileTreeHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetFileTreeHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactGetFileTreeHandler
  );
}

export function createSessionAwareArtifactListLatestVersionFilesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListLatestVersionFilesHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactListLatestVersionFilesHandler
  );
}

export function createSessionAwareArtifactGetRepositoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetRepositoryHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactGetRepositoryHandler
  );
}

export function createSessionAwareArtifactListFilesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListFilesHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactListFilesHandler
  );
}

export function createSessionAwareArtifactGetFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetFileHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactGetFileHandler
  );
}

export function createSessionAwareArtifactGetDownloadUrlHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetDownloadUrlHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactGetDownloadUrlHandler
  );
}

export function createSessionAwareArtifactDeleteFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactDeleteFileHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactDeleteFileHandler
  );
}

export function createSessionAwareArtifactListBuildArchivesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListBuildArchivesHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactListBuildArchivesHandler
  );
}

export function createSessionAwareArtifactSearchArtifactsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactSearchArtifactsHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactSearchArtifactsHandler
  );
}

export function createSessionAwareArtifactShowAuditHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactShowAuditHandler>[0]
) {
  return createSessionAwareArtifactToolHandler(
    store,
    injectedClient,
    createArtifactShowAuditHandler
  );
}

export function createSessionAwareReqGetProjectHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqGetProjectHandler>[0]
) {
  return createSessionAwareReqToolHandler(store, injectedClient, createReqGetProjectHandler);
}

export function createSessionAwareReqWorkItemsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListWorkItemsHandler>[0]
) {
  return createSessionAwareReqToolHandler(store, injectedClient, createReqListWorkItemsHandler);
}

export function createSessionAwareReqGetWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqGetWorkItemHandler>[0]
) {
  return createSessionAwareReqToolHandler(store, injectedClient, createReqGetWorkItemHandler);
}

export function createSessionAwareReqListIterationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListIterationsHandler>[0]
) {
  return createSessionAwareReqToolHandler(
    store,
    injectedClient,
    createReqListIterationsHandler
  );
}

export function createSessionAwareReqCreateWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqCreateWorkItemHandler>[0]
) {
  return createSessionAwareReqToolHandler(
    store,
    injectedClient,
    createReqCreateWorkItemHandler
  );
}

export function createSessionAwareReqUpdateWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqUpdateWorkItemHandler>[0]
) {
  return createSessionAwareReqToolHandler(
    store,
    injectedClient,
    createReqUpdateWorkItemHandler
  );
}

export function createSessionAwareReqListProjectMembersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListProjectMembersHandler>[0]
) {
  return createSessionAwareReqToolHandler(
    store,
    injectedClient,
    createReqListProjectMembersHandler
  );
}

export function createSessionAwareRepoRepositoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListRepositoriesHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListRepositoriesHandler
  );
}

export function createSessionAwareRepoGetBranchHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetBranchHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoGetBranchHandler);
}

export function createSessionAwareRepoCompareRefsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCompareRefsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoCompareRefsHandler);
}

export function createSessionAwareRepoGetTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetTagHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoGetTagHandler);
}

export function createSessionAwareRepoGetRepositoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetRepositoryHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoGetRepositoryHandler
  );
}

export function createSessionAwareRepoCreateMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateMergeRequestHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoCreateMergeRequestHandler
  );
}

export function createSessionAwareRepoCloseMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCloseMergeRequestHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoCloseMergeRequestHandler
  );
}

export function createSessionAwareRepoCreateMergeRequestDiscussionHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateMergeRequestDiscussionHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoCreateMergeRequestDiscussionHandler
  );
}

export function createSessionAwareRepoListMergeRequestChangesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestChangesHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListMergeRequestChangesHandler
  );
}

export function createSessionAwareRepoListMergeRequestDiscussionsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestDiscussionsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListMergeRequestDiscussionsHandler
  );
}

export function createSessionAwareRepoListProtectedBranchesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListProtectedBranchesHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListProtectedBranchesHandler
  );
}

export function createSessionAwareRepoListRepositoryLabelsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListRepositoryLabelsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListRepositoryLabelsHandler
  );
}

export function createSessionAwareRepoCreateTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateTagHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoCreateTagHandler);
}

export function createSessionAwareRepoDeleteTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoDeleteTagHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoDeleteTagHandler);
}

export function createSessionAwareRepoListTagsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListTagsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoListTagsHandler);
}

export function createSessionAwareRepoListEventsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListEventsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoListEventsHandler);
}

export function createSessionAwareRepoListMergeRequestsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoListMergeRequestsHandler
  );
}

export function createSessionAwareRepoGetMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetMergeRequestHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoGetMergeRequestHandler
  );
}

export function createSessionAwareRepoReviewMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoReviewMergeRequestHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoReviewMergeRequestHandler
  );
}

export function createSessionAwareRepoMergeMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoMergeMergeRequestHandler>[0]
) {
  return createSessionAwareRepoToolHandler(
    store,
    injectedClient,
    createRepoMergeMergeRequestHandler
  );
}

export function createSessionAwareRepoListCommitsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListCommitsHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoListCommitsHandler);
}

export function createSessionAwareRepoGetFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetFileHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoGetFileHandler);
}

export function createSessionAwareRepoGetCommitHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetCommitHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoGetCommitHandler);
}

export function createSessionAwareRepoListBranchesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListBranchesHandler>[0]
) {
  return createSessionAwareRepoToolHandler(store, injectedClient, createRepoListBranchesHandler);
}

export function createSessionAwarePipelineRunsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListRunsHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineListRunsHandler
  );
}

export function createSessionAwarePipelineListHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListPipelinesHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineListPipelinesHandler
  );
}

export function createSessionAwarePipelineGetRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetRunHandler
  );
}

export function createSessionAwarePipelineGetRunDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunDetailHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetRunDetailHandler
  );
}

export function createSessionAwarePipelineGetRunParametersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunParametersHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetRunParametersHandler
  );
}

export function createSessionAwarePipelineGetRunLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunLogHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetRunLogHandler
  );
}

export function createSessionAwarePipelineGetManualReviewContextHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetManualReviewContextHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetManualReviewContextHandler
  );
}

export function createSessionAwarePipelineGetStepOutputsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetStepOutputsHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetStepOutputsHandler
  );
}

export function createSessionAwarePipelineGetPipelineHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetPipelineHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineGetPipelineHandler
  );
}

export function createSessionAwarePipelineRunPipelineHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRunPipelineHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineRunPipelineHandler
  );
}

export function createSessionAwarePipelineStopRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineStopRunHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineStopRunHandler
  );
}

export function createSessionAwarePipelineRetryRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRetryRunHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineRetryRunHandler
  );
}

export function createSessionAwarePipelineApproveRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineApproveRunHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineApproveRunHandler
  );
}

export function createSessionAwarePipelineRejectRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRejectRunHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineRejectRunHandler
  );
}

export function createSessionAwarePipelineListArtifactsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListArtifactsHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineListArtifactsHandler
  );
}

export function createSessionAwarePipelineListTemplatesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListTemplatesHandler>[0]
) {
  return createSessionAwarePipelineToolHandler(
    store,
    injectedClient,
    createPipelineListTemplatesHandler
  );
}

export function createSessionAwareTestPlanListPlansHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListPlansHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanListPlansHandler
  );
}

export function createSessionAwareTestPlanGetPlanHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanGetPlanHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanGetPlanHandler
  );
}

export function createSessionAwareTestPlanGetCaseHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanGetCaseHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanGetCaseHandler
  );
}

export function createSessionAwareTestPlanListCasesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListCasesHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanListCasesHandler
  );
}

export function createSessionAwareTestPlanListIssuesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListIssuesHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanListIssuesHandler
  );
}

export function createSessionAwareTestPlanListRunsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListRunsHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanListRunsHandler
  );
}

export function createSessionAwareTestPlanRunCasesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanRunCasesHandler>[0]
) {
  return createSessionAwareTestPlanToolHandler(
    store,
    injectedClient,
    createTestPlanRunCasesHandler
  );
}
