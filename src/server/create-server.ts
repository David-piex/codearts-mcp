import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createHuaweiAuthHeaders } from "../core/auth/huawei-auth.js";
import type { AppConfig, ServerMetadataConfig } from "../core/config/env.js";
import { AppError } from "../core/errors/app-error.js";
import { createHttpClient } from "../core/http/client.js";
import { createArtifactClient } from "../products/artifact/client.js";
import {
  artifactDeleteFileInput,
  artifactGetFileTreeInput,
  artifactGetFileInput,
  artifactGetDownloadUrlInput,
  artifactGetRepositoryInput,
  artifactListBuildArchivesInput,
  artifactListFilesInput,
  artifactListLatestVersionFilesInput,
  artifactListRepositoriesInput,
  artifactListVersionsInput,
  artifactSearchArtifactsInput,
  artifactShowAuditInput
} from "../products/artifact/schemas.js";
import { createArtifactDeleteFileHandler } from "../products/artifact/tools/delete-file.js";
import { createArtifactGetFileTreeHandler } from "../products/artifact/tools/get-file-tree.js";
import { createArtifactGetFileHandler } from "../products/artifact/tools/get-file.js";
import { createArtifactGetDownloadUrlHandler } from "../products/artifact/tools/get-download-url.js";
import { createArtifactGetRepositoryHandler } from "../products/artifact/tools/get-repository.js";
import { createArtifactListBuildArchivesHandler } from "../products/artifact/tools/list-build-archives.js";
import { createArtifactListFilesHandler } from "../products/artifact/tools/list-files.js";
import { createArtifactListLatestVersionFilesHandler } from "../products/artifact/tools/list-latest-version-files.js";
import { createArtifactListRepositoriesHandler } from "../products/artifact/tools/list-repositories.js";
import { createArtifactListVersionsHandler } from "../products/artifact/tools/list-versions.js";
import { createArtifactSearchArtifactsHandler } from "../products/artifact/tools/search-artifacts.js";
import { createArtifactShowAuditHandler } from "../products/artifact/tools/show-audit.js";
import { createBuildClient } from "../products/build/client.js";
import {
  buildGetErrorLogInput,
  buildGetFullStagesInput,
  buildGetHistoryDetailsInput,
  buildGetInfoRecordInput,
  buildGetProjectRecordStatisticsInput,
  buildGetRecordFlowGraphInput,
  buildGetRecordInput,
  buildGetRecordScriptInput,
  buildGetRealTimeLogInput,
  buildGetJobInput,
  buildListBuildParametersInput,
  buildListJobsInput,
  buildListProjectRecordsInput,
  buildListRecordsInput,
  buildRunJobInput,
  buildStopJobInput
} from "../products/build/schemas.js";
import { createBuildGetErrorLogHandler } from "../products/build/tools/get-error-log.js";
import { createBuildGetFullStagesHandler } from "../products/build/tools/get-full-stages.js";
import { createBuildGetProjectRecordStatisticsHandler } from "../products/build/tools/get-project-record-statistics.js";
import { createBuildGetRecordFlowGraphHandler } from "../products/build/tools/get-record-flow-graph.js";
import { createBuildGetRecordHandler } from "../products/build/tools/get-record.js";
import { createBuildGetRecordScriptHandler } from "../products/build/tools/get-record-script.js";
import { createBuildGetHistoryDetailsHandler } from "../products/build/tools/get-history-details.js";
import { createBuildGetInfoRecordHandler } from "../products/build/tools/get-info-record.js";
import { createBuildGetRealTimeLogHandler } from "../products/build/tools/get-real-time-log.js";
import { createBuildGetJobHandler } from "../products/build/tools/get-job.js";
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
import { createBuildListJobsHandler } from "../products/build/tools/list-jobs.js";
import { createBuildListProjectRecordsHandler } from "../products/build/tools/list-project-records.js";
import { createBuildListRecordsHandler } from "../products/build/tools/list-records.js";
import { createBuildRunJobHandler } from "../products/build/tools/run-job.js";
import { createBuildStopJobHandler } from "../products/build/tools/stop-job.js";
import { createCheckClient } from "../products/check/client.js";
import {
  checkCreateTaskInput,
  checkGetMetricsInput,
  checkGetTaskInput,
  checkListRulesetsInput,
  checkListTaskIssuesInput,
  checkListTasksInput,
  checkRunTaskInput,
  checkStopTaskInput
} from "../products/check/schemas.js";
import { createCheckCreateTaskHandler } from "../products/check/tools/create-task.js";
import { createCheckGetMetricsHandler } from "../products/check/tools/get-metrics.js";
import { createCheckGetTaskHandler } from "../products/check/tools/get-task.js";
import { createCheckListRulesetsHandler } from "../products/check/tools/list-rulesets.js";
import { createCheckListTaskIssuesHandler } from "../products/check/tools/list-task-issues.js";
import { createCheckListTasksHandler } from "../products/check/tools/list-tasks.js";
import { createCheckRunTaskHandler } from "../products/check/tools/run-task.js";
import { createCheckStopTaskHandler } from "../products/check/tools/stop-task.js";
import { createDeployClient } from "../products/deploy/client.js";
import {
  deployGetAppInput,
  deployGetTaskInput,
  deployListAppOperationsLogInput,
  deployGetAppLogInput,
  deployGetExecutionParamsInput,
  deployGetHistoryDetailInput,
  deployGetStatusInput,
  deployListAppsInput,
  deployListTasksInput,
  deployListHistoriesInput,
  deployRollbackAppInput,
  deployStartAppInput,
  deployStopAppInput
} from "../products/deploy/schemas.js";
import { createDeployGetAppHandler } from "../products/deploy/tools/get-app.js";
import { createDeployGetTaskHandler } from "../products/deploy/tools/get-task.js";
import { createDeployGetAppLogHandler } from "../products/deploy/tools/get-app-log.js";
import { createDeployGetExecutionParamsHandler } from "../products/deploy/tools/get-execution-params.js";
import { createDeployGetHistoryDetailHandler } from "../products/deploy/tools/get-history-detail.js";
import { createDeployGetStatusHandler } from "../products/deploy/tools/get-status.js";
import { createDeployListAppOperationsLogHandler } from "../products/deploy/tools/list-app-operations-log.js";
import { createDeployListAppsHandler } from "../products/deploy/tools/list-apps.js";
import { createDeployListTasksHandler } from "../products/deploy/tools/list-tasks.js";
import { createDeployListHistoriesHandler } from "../products/deploy/tools/list-histories.js";
import { createDeployRollbackAppHandler } from "../products/deploy/tools/rollback-app.js";
import { createDeployStartAppHandler } from "../products/deploy/tools/start-app.js";
import { createDeployStopAppHandler } from "../products/deploy/tools/stop-app.js";
import { createGovernClient } from "../products/govern/client.js";
import {
  governAlterQuotaInfoInput,
  governCreateExcelReportInput,
  governCreatePdfReportInput,
  governCreateTaskInput,
  governCreateTaskMultipartFileInput,
  governDeleteTaskInput,
  governDownloadExcelReportInput,
  governDownloadPdfReportInput,
  governGetExcelReportStatusInput,
  governGetInfoLeakSummaryInput,
  governGetOpenSourceReportInput,
  governGetOpenSourceSummaryInput,
  governGetOsiItemDetailInput,
  governGetOsiStatisticsInput,
  governGetPdfReportStatusInput,
  governGetQuotaInfoInput,
  governGetSecCompileSummaryInput,
  governGetSecConfigSummaryInput,
  governListOsiItemNamesInput,
  governListOsiItemDependencyInput,
  governListOsiItemVersionsInput,
  governListOsiItemVulnsInput,
  governGetUserInfoInput,
  governGetVulnInfoInput,
  governNotifyTaskMultipartFileInput,
  governStopTaskInput,
  governUploadTaskMultipartFileInput,
  governGetTaskStatusInput,
  governListSbcVulnMapInput
} from "../products/govern/schemas.js";
import { createGovernAlterQuotaInfoHandler } from "../products/govern/tools/alter-quota-info.js";
import { createGovernCreateExcelReportHandler } from "../products/govern/tools/create-excel-report.js";
import { createGovernCreatePdfReportHandler } from "../products/govern/tools/create-pdf-report.js";
import { createGovernCreateTaskMultipartFileHandler } from "../products/govern/tools/create-task-multipart-file.js";
import { createGovernCreateTaskHandler } from "../products/govern/tools/create-task.js";
import { createGovernDeleteTaskHandler } from "../products/govern/tools/delete-task.js";
import { createGovernDownloadExcelReportHandler } from "../products/govern/tools/download-excel-report.js";
import { createGovernDownloadPdfReportHandler } from "../products/govern/tools/download-pdf-report.js";
import { createGovernGetExcelReportStatusHandler } from "../products/govern/tools/get-excel-report-status.js";
import { createGovernGetInfoLeakSummaryHandler } from "../products/govern/tools/get-info-leak-summary.js";
import { createGovernGetOpenSourceReportHandler } from "../products/govern/tools/get-open-source-report.js";
import { createGovernGetOpenSourceSummaryHandler } from "../products/govern/tools/get-open-source-summary.js";
import { createGovernGetOsiItemDetailHandler } from "../products/govern/tools/get-osi-item-detail.js";
import { createGovernGetOsiStatisticsHandler } from "../products/govern/tools/get-osi-statistics.js";
import { createGovernGetPdfReportStatusHandler } from "../products/govern/tools/get-pdf-report-status.js";
import { createGovernGetQuotaInfoHandler } from "../products/govern/tools/get-quota-info.js";
import { createGovernGetSecCompileSummaryHandler } from "../products/govern/tools/get-sec-compile-summary.js";
import { createGovernGetSecConfigSummaryHandler } from "../products/govern/tools/get-sec-config-summary.js";
import { createGovernGetUserInfoHandler } from "../products/govern/tools/get-user-info.js";
import { createGovernGetVulnInfoHandler } from "../products/govern/tools/get-vuln-info.js";
import { createGovernListOsiItemNamesHandler } from "../products/govern/tools/list-osi-item-names.js";
import { createGovernListOsiItemDependencyHandler } from "../products/govern/tools/list-osi-item-dependency.js";
import { createGovernListOsiItemVersionsHandler } from "../products/govern/tools/list-osi-item-versions.js";
import { createGovernListOsiItemVulnsHandler } from "../products/govern/tools/list-osi-item-vulns.js";
import { createGovernListSbcVulnMapHandler } from "../products/govern/tools/list-sbc-vuln-map.js";
import { createGovernNotifyTaskMultipartFileHandler } from "../products/govern/tools/notify-task-multipart-file.js";
import { createGovernStopTaskHandler } from "../products/govern/tools/stop-task.js";
import { createGovernGetTaskStatusHandler } from "../products/govern/tools/get-task-status.js";
import { createGovernUploadTaskMultipartFileHandler } from "../products/govern/tools/upload-task-multipart-file.js";
import { createInspectorClient } from "../products/inspector/client.js";
import {
  inspectorCreateDomainInput,
  inspectorGetReportStatusInput,
  inspectorGetTaskInput,
  inspectorListBusinessRisksInput,
  inspectorListDomainsInput,
  inspectorListPortsInput,
  inspectorListResultsInput,
  inspectorListTaskHistoriesInput
} from "../products/inspector/schemas.js";
import { createInspectorCreateDomainHandler } from "../products/inspector/tools/create-domain.js";
import { createInspectorGetReportStatusHandler } from "../products/inspector/tools/get-report-status.js";
import { createInspectorGetTaskHandler } from "../products/inspector/tools/get-task.js";
import { createInspectorListBusinessRisksHandler } from "../products/inspector/tools/list-business-risks.js";
import { createInspectorListDomainsHandler } from "../products/inspector/tools/list-domains.js";
import { createInspectorListPortsHandler } from "../products/inspector/tools/list-ports.js";
import { createInspectorListResultsHandler } from "../products/inspector/tools/list-results.js";
import { createInspectorListTaskHistoriesHandler } from "../products/inspector/tools/list-task-histories.js";
import { createPerfTestClient } from "../products/perftest/client.js";
import {
  perftestGetProjectInput,
  perftestGetReportInput,
  perftestGetTaskInput,
  perftestListLatestRunsInput,
  perftestListOfflineReportsInput,
  perftestListProjectsInput,
  perftestListTaskCasesInput,
  perftestListTasksInput,
  perftestListVariablesInput
} from "../products/perftest/schemas.js";
import { createPerfTestGetProjectHandler } from "../products/perftest/tools/get-project.js";
import { createPerfTestGetReportHandler } from "../products/perftest/tools/get-report.js";
import { createPerfTestGetTaskHandler } from "../products/perftest/tools/get-task.js";
import { createPerfTestListLatestRunsHandler } from "../products/perftest/tools/list-latest-runs.js";
import { createPerfTestListOfflineReportsHandler } from "../products/perftest/tools/list-offline-reports.js";
import { createPerfTestListProjectsHandler } from "../products/perftest/tools/list-projects.js";
import { createPerfTestListTaskCasesHandler } from "../products/perftest/tools/list-task-cases.js";
import { createPerfTestListTasksHandler } from "../products/perftest/tools/list-tasks.js";
import { createPerfTestListVariablesHandler } from "../products/perftest/tools/list-variables.js";
import { createPipelineClient } from "../products/pipeline/client.js";
import {
  pipelineApproveRunInput,
  pipelineGetInput,
  pipelineListArtifactsInput,
  pipelineGetManualReviewContextInput,
  pipelineGetRunLogInput,
  pipelineGetRunParametersInput,
  pipelineGetStepOutputsInput,
  pipelineGetRunInput,
  pipelineGetRunDetailInput,
  pipelineRejectRunInput,
  pipelineRetryRunInput,
  pipelineListInput,
  pipelineListRunsInput,
  pipelineListTemplatesInput,
  pipelineRunInput,
  pipelineStopRunInput
} from "../products/pipeline/schemas.js";
import { createPipelineApproveRunHandler } from "../products/pipeline/tools/approve-run.js";
import { createPipelineGetManualReviewContextHandler } from "../products/pipeline/tools/get-manual-review-context.js";
import { createPipelineGetPipelineHandler } from "../products/pipeline/tools/get-pipeline.js";
import { createPipelineGetRunLogHandler } from "../products/pipeline/tools/get-run-log.js";
import { createPipelineGetRunParametersHandler } from "../products/pipeline/tools/get-run-parameters.js";
import { createPipelineGetRunHandler } from "../products/pipeline/tools/get-run.js";
import { createPipelineGetRunDetailHandler } from "../products/pipeline/tools/get-run-detail.js";
import { createPipelineGetStepOutputsHandler } from "../products/pipeline/tools/get-step-outputs.js";
import { createPipelineListArtifactsHandler } from "../products/pipeline/tools/list-artifacts.js";
import { createPipelineListPipelinesHandler } from "../products/pipeline/tools/list-pipelines.js";
import { createPipelineListRunsHandler } from "../products/pipeline/tools/list-runs.js";
import { createPipelineListTemplatesHandler } from "../products/pipeline/tools/list-templates.js";
import { createPipelineRejectRunHandler } from "../products/pipeline/tools/reject-run.js";
import { createPipelineRetryRunHandler } from "../products/pipeline/tools/retry-run.js";
import { createPipelineRunPipelineHandler } from "../products/pipeline/tools/run-pipeline.js";
import { createPipelineStopRunHandler } from "../products/pipeline/tools/stop-run.js";
import { createRepoClient } from "../products/repo/client.js";
import {
  repoCompareRefsInput,
  repoCloseMergeRequestInput,
  repoCreateMergeRequestDiscussionInput,
  repoCreateMergeRequestInput,
  repoGetBranchInput,
  repoGetCommitInput,
  repoGetFileInput,
  repoGetMergeRequestInput,
  repoGetRepositoryInput,
  repoGetTagInput,
  repoCreateTagInput,
  repoDeleteTagInput,
  repoListEventsInput,
  repoListTagsInput,
  repoListBranchesInput,
  repoListCommitsInput,
  repoListMergeRequestChangesInput,
  repoListMergeRequestDiscussionsInput,
  repoListProtectedBranchesInput,
  repoListRepositoryLabelsInput,
  repoListMergeRequestsInput,
  repoMergeMergeRequestInput,
  repoListRepositoriesInput,
  repoReviewMergeRequestInput
} from "../products/repo/schemas.js";
import { createRepoCloseMergeRequestHandler } from "../products/repo/tools/close-merge-request.js";
import { createRepoCompareRefsHandler } from "../products/repo/tools/compare-refs.js";
import { createRepoCreateMergeRequestDiscussionHandler } from "../products/repo/tools/create-merge-request-discussion.js";
import { createRepoCreateMergeRequestHandler } from "../products/repo/tools/create-merge-request.js";
import { createRepoGetBranchHandler } from "../products/repo/tools/get-branch.js";
import { createRepoGetCommitHandler } from "../products/repo/tools/get-commit.js";
import { createRepoGetFileHandler } from "../products/repo/tools/get-file.js";
import { createRepoGetMergeRequestHandler } from "../products/repo/tools/get-merge-request.js";
import { createRepoGetRepositoryHandler } from "../products/repo/tools/get-repository.js";
import { createRepoGetTagHandler } from "../products/repo/tools/get-tag.js";
import { createRepoListBranchesHandler } from "../products/repo/tools/list-branches.js";
import { createRepoListCommitsHandler } from "../products/repo/tools/list-commits.js";
import { createRepoListMergeRequestChangesHandler } from "../products/repo/tools/list-merge-request-changes.js";
import { createRepoListMergeRequestDiscussionsHandler } from "../products/repo/tools/list-merge-request-discussions.js";
import { createRepoListProtectedBranchesHandler } from "../products/repo/tools/list-protected-branches.js";
import { createRepoListRepositoryLabelsHandler } from "../products/repo/tools/list-repository-labels.js";
import { createRepoCreateTagHandler } from "../products/repo/tools/create-tag.js";
import { createRepoDeleteTagHandler } from "../products/repo/tools/delete-tag.js";
import { createRepoListEventsHandler } from "../products/repo/tools/list-events.js";
import { createRepoListTagsHandler } from "../products/repo/tools/list-tags.js";
import { createRepoListMergeRequestsHandler } from "../products/repo/tools/list-merge-requests.js";
import { createRepoListRepositoriesHandler } from "../products/repo/tools/list-repositories.js";
import { createRepoMergeMergeRequestHandler } from "../products/repo/tools/merge-merge-request.js";
import { createRepoReviewMergeRequestHandler } from "../products/repo/tools/review-merge-request.js";
import { createReqClient } from "../products/req/client.js";
import {
  reqCreateWorkItemInput,
  reqGetProjectInput,
  reqGetWorkItemInput,
  reqListIterationsInput,
  reqListProjectMembersInput,
  reqListProjectsInput,
  reqListWorkItemsInput,
  reqUpdateWorkItemInput
} from "../products/req/schemas.js";
import { createReqCreateWorkItemHandler } from "../products/req/tools/create-work-item.js";
import { createReqGetProjectHandler } from "../products/req/tools/get-project.js";
import { createReqGetWorkItemHandler } from "../products/req/tools/get-work-item.js";
import { createReqListIterationsHandler } from "../products/req/tools/list-iterations.js";
import { createReqListProjectMembersHandler } from "../products/req/tools/list-project-members.js";
import { createReqListProjectsHandler } from "../products/req/tools/list-projects.js";
import { createReqListWorkItemsHandler } from "../products/req/tools/list-work-items.js";
import { createReqUpdateWorkItemHandler } from "../products/req/tools/update-work-item.js";
import { createTestPlanClient } from "../products/testplan/client.js";
import {
  testPlanGetCaseInput,
  testPlanGetPlanInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListPlansInput,
  testPlanListRunsInput,
  testPlanRunCasesInput
} from "../products/testplan/schemas.js";
import { createTestPlanGetCaseHandler } from "../products/testplan/tools/get-case.js";
import { createTestPlanGetPlanHandler } from "../products/testplan/tools/get-plan.js";
import { createTestPlanListCasesHandler } from "../products/testplan/tools/list-cases.js";
import { createTestPlanListIssuesHandler } from "../products/testplan/tools/list-issues.js";
import { createTestPlanListPlansHandler } from "../products/testplan/tools/list-plans.js";
import { createTestPlanListRunsHandler } from "../products/testplan/tools/list-runs.js";
import { createTestPlanRunCasesHandler } from "../products/testplan/tools/run-cases.js";
import { collectToolNames, createServerInfo } from "./register-tools.js";
import type { SessionCredentialStore } from "./session-store.js";

const configureSessionInputSchema = z.object({
  access_key: z.string().min(1),
  secret_key: z.string().min(1),
  region: z.string().min(1),
  req_base_url: z.string().url(),
  repo_base_url: z.string().url(),
  pipeline_base_url: z.string().url(),
  check_base_url: z.string().url(),
  testplan_base_url: z.string().url(),
  deploy_base_url: z.string().url(),
  build_base_url: z.string().url(),
  artifact_base_url: z.string().url(),
  govern_base_url: z.string().url().optional()
  ,
  inspector_base_url: z.string().url().optional(),
  perftest_base_url: z.string().url().optional()
});

function requireSessionId(sessionId?: string): string {
  if (!sessionId) {
    throw new AppError("auth_error", "No MCP session is available for this request.");
  }

  return sessionId;
}

export function createConfigureSessionHandler(store: SessionCredentialStore) {
  return async (
    input: unknown,
    extra: {
      sessionId?: string;
    }
  ) => {
    const parsed = configureSessionInputSchema.parse(input);
    const sessionId = requireSessionId(extra.sessionId);

    store.set(sessionId, {
      ...parsed,
      updated_at: new Date().toISOString()
    });

    return {
      content: [{ type: "text" as const, text: `Session ${sessionId} configured for ${parsed.region}.` }],
      structuredContent: {
        session_id: sessionId,
        configured: true,
        region: parsed.region
      }
    };
  };
}

export function createClearSessionHandler(store: SessionCredentialStore) {
  return async (
    _input: unknown,
    extra: {
      sessionId?: string;
    }
  ) => {
    const sessionId = requireSessionId(extra.sessionId);
    store.clear(sessionId);

    return {
      content: [{ type: "text" as const, text: `Session ${sessionId} credentials cleared.` }],
      structuredContent: {
        session_id: sessionId,
        cleared: true
      }
    };
  };
}

type CreateServerOptions =
  | {
      mode: "stdio";
      config: AppConfig;
    }
  | {
      mode: "http";
      config: ServerMetadataConfig;
      sessionStore: SessionCredentialStore;
    };

function buildClientsFromCredentialConfig(config: {
  accessKey: string;
  secretKey: string;
  reqBaseUrl: string;
  repoBaseUrl: string;
  pipelineBaseUrl: string;
  checkBaseUrl: string;
  testPlanBaseUrl: string;
  deployBaseUrl: string;
  buildBaseUrl: string;
  artifactBaseUrl: string;
  governBaseUrl: string;
  inspectorBaseUrl: string;
  perfTestBaseUrl: string;
}) {
  const authHeaders = createHuaweiAuthHeaders(config.accessKey, config.secretKey);

  return {
    artifactClient: createArtifactClient(
      createHttpClient({ baseUrl: config.artifactBaseUrl, authHeaders })
    ),
    buildClient: createBuildClient(createHttpClient({ baseUrl: config.buildBaseUrl, authHeaders })),
    checkClient: createCheckClient(createHttpClient({ baseUrl: config.checkBaseUrl, authHeaders })),
    deployClient: createDeployClient(createHttpClient({ baseUrl: config.deployBaseUrl, authHeaders })),
    reqClient: createReqClient(createHttpClient({ baseUrl: config.reqBaseUrl, authHeaders })),
    repoClient: createRepoClient(createHttpClient({ baseUrl: config.repoBaseUrl, authHeaders })),
    pipelineClient: createPipelineClient(
      createHttpClient({ baseUrl: config.pipelineBaseUrl, authHeaders })
    ),
    governClient: createGovernClient(createHttpClient({ baseUrl: config.governBaseUrl, authHeaders })),
    inspectorClient: createInspectorClient(
      createHttpClient({ baseUrl: config.inspectorBaseUrl, authHeaders })
    ),
    perfTestClient: createPerfTestClient(
      createHttpClient({ baseUrl: config.perfTestBaseUrl, authHeaders })
    ),
    testPlanClient: createTestPlanClient(
      createHttpClient({ baseUrl: config.testPlanBaseUrl, authHeaders })
    )
  };
}

function buildClientsForSession(store: SessionCredentialStore, sessionId?: string) {
  if (!sessionId) {
    throw new AppError("auth_error", "This tool requires an MCP session.");
  }

  const sessionConfig = store.get(sessionId);

  if (!sessionConfig) {
    throw new AppError("auth_error", `No Huawei Cloud credentials configured for session ${sessionId}.`);
  }

  return buildClientsFromCredentialConfig({
    accessKey: sessionConfig.access_key,
    secretKey: sessionConfig.secret_key,
    reqBaseUrl: sessionConfig.req_base_url,
    repoBaseUrl: sessionConfig.repo_base_url,
    pipelineBaseUrl: sessionConfig.pipeline_base_url,
    checkBaseUrl: sessionConfig.check_base_url,
    testPlanBaseUrl: sessionConfig.testplan_base_url,
    deployBaseUrl: sessionConfig.deploy_base_url,
    buildBaseUrl: sessionConfig.build_base_url,
    artifactBaseUrl: sessionConfig.artifact_base_url,
    governBaseUrl:
      sessionConfig.govern_base_url ??
      `https://devsecurity.${sessionConfig.region}.myhuaweicloud.com`,
    inspectorBaseUrl: sessionConfig.inspector_base_url ?? "https://vss.myhuaweicloud.com",
    perfTestBaseUrl:
      sessionConfig.perftest_base_url ?? `https://cpts.${sessionConfig.region}.myhuaweicloud.com`
  });
}

type SessionToolExtra = {
  sessionId?: string;
};

export function createSessionAwareReqProjectsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListProjectsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqListProjectsHandler(reqClient)(input);
  };
}

export function createSessionAwareCheckListTasksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListTasksHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckListTasksHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckCreateTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckCreateTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckCreateTaskHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckGetTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckGetTaskHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckListRulesetsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListRulesetsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckListRulesetsHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckListTaskIssuesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckListTaskIssuesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckListTaskIssuesHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckGetMetricsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckGetMetricsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckGetMetricsHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckRunTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckRunTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckRunTaskHandler(checkClient)(input);
  };
}

export function createSessionAwareCheckStopTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createCheckStopTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const checkClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).checkClient;
    return createCheckStopTaskHandler(checkClient)(input);
  };
}

export function createSessionAwareDeployListAppsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListAppsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListTasksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListTasksHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListTasksHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetAppHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetAppHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetTaskHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListAppOperationsLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppOperationsLogHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListAppOperationsLogHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetAppLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetAppLogHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetAppLogHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetExecutionParamsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetExecutionParamsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetExecutionParamsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListHistoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHistoriesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListHistoriesHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetStatusHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetStatusHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployStartAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployStartAppHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployStartAppHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployStopAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployStopAppHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployStopAppHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployRollbackAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRollbackAppHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployRollbackAppHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetHistoryDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetHistoryDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetHistoryDetailHandler(deployClient)(input);
  };
}

export function createSessionAwareBuildListJobsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListJobsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildListJobsHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildListProjectRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListProjectRecordsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildListProjectRecordsHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetProjectRecordStatisticsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetProjectRecordStatisticsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetProjectRecordStatisticsHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetRecordFlowGraphHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordFlowGraphHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetRecordFlowGraphHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetJobHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetJobHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetRecordHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildListRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListRecordsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildListRecordsHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildRunJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildRunJobHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildRunJobHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildStopJobHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildStopJobHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildStopJobHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetRealTimeLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRealTimeLogHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetRealTimeLogHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetHistoryDetailsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetHistoryDetailsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetHistoryDetailsHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetErrorLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetErrorLogHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetErrorLogHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetInfoRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetInfoRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetInfoRecordHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetRecordScriptHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetRecordScriptHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetRecordScriptHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildGetFullStagesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildGetFullStagesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildGetFullStagesHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildListBuildParametersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildListBuildParametersHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildListBuildParametersHandler(buildClient)(input);
  };
}

export function createSessionAwareArtifactListRepositoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListRepositoriesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactListRepositoriesHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactListVersionsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListVersionsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactListVersionsHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactGetFileTreeHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetFileTreeHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactGetFileTreeHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactListLatestVersionFilesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListLatestVersionFilesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactListLatestVersionFilesHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactGetRepositoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetRepositoryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactGetRepositoryHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactListFilesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListFilesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactListFilesHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactGetFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactGetFileHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactGetDownloadUrlHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactGetDownloadUrlHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactGetDownloadUrlHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactDeleteFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactDeleteFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactDeleteFileHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactListBuildArchivesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactListBuildArchivesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactListBuildArchivesHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactSearchArtifactsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactSearchArtifactsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactSearchArtifactsHandler(artifactClient)(input);
  };
}

export function createSessionAwareArtifactShowAuditHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createArtifactShowAuditHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const artifactClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).artifactClient;
    return createArtifactShowAuditHandler(artifactClient)(input);
  };
}

export function createSessionAwareGovernCreateTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernCreateTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernCreateTaskHandler(governClient)(input);
  };
}

export function createSessionAwareGovernAlterQuotaInfoHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernAlterQuotaInfoHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernAlterQuotaInfoHandler(governClient)(input);
  };
}

export function createSessionAwareGovernCreatePdfReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernCreatePdfReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernCreatePdfReportHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetPdfReportStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetPdfReportStatusHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetPdfReportStatusHandler(governClient)(input);
  };
}

export function createSessionAwareGovernDownloadPdfReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernDownloadPdfReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernDownloadPdfReportHandler(governClient)(input);
  };
}

export function createSessionAwareGovernCreateExcelReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernCreateExcelReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernCreateExcelReportHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetExcelReportStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetExcelReportStatusHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetExcelReportStatusHandler(governClient)(input);
  };
}

export function createSessionAwareGovernDownloadExcelReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernDownloadExcelReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernDownloadExcelReportHandler(governClient)(input);
  };
}

export function createSessionAwareGovernCreateTaskMultipartFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernCreateTaskMultipartFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernCreateTaskMultipartFileHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetTaskStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetTaskStatusHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetTaskStatusHandler(governClient)(input);
  };
}

export function createSessionAwareGovernNotifyTaskMultipartFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernNotifyTaskMultipartFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernNotifyTaskMultipartFileHandler(governClient)(input);
  };
}

export function createSessionAwareGovernUploadTaskMultipartFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernUploadTaskMultipartFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernUploadTaskMultipartFileHandler(governClient)(input);
  };
}

export function createSessionAwareGovernStopTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernStopTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernStopTaskHandler(governClient)(input);
  };
}

export function createSessionAwareGovernDeleteTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernDeleteTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernDeleteTaskHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetOpenSourceSummaryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetOpenSourceSummaryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetOpenSourceSummaryHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetOsiStatisticsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetOsiStatisticsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetOsiStatisticsHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetOsiItemDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetOsiItemDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetOsiItemDetailHandler(governClient)(input);
  };
}

export function createSessionAwareGovernListOsiItemNamesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernListOsiItemNamesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernListOsiItemNamesHandler(governClient)(input);
  };
}

export function createSessionAwareGovernListOsiItemVersionsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernListOsiItemVersionsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernListOsiItemVersionsHandler(governClient)(input);
  };
}

export function createSessionAwareGovernListOsiItemVulnsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernListOsiItemVulnsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernListOsiItemVulnsHandler(governClient)(input);
  };
}

export function createSessionAwareGovernListOsiItemDependencyHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernListOsiItemDependencyHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernListOsiItemDependencyHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetInfoLeakSummaryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetInfoLeakSummaryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetInfoLeakSummaryHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetSecCompileSummaryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetSecCompileSummaryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetSecCompileSummaryHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetSecConfigSummaryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetSecConfigSummaryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetSecConfigSummaryHandler(governClient)(input);
  };
}

export function createSessionAwareGovernListSbcVulnMapHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernListSbcVulnMapHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernListSbcVulnMapHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetVulnInfoHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetVulnInfoHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetVulnInfoHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetUserInfoHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetUserInfoHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetUserInfoHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetOpenSourceReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetOpenSourceReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetOpenSourceReportHandler(governClient)(input);
  };
}

export function createSessionAwareGovernGetQuotaInfoHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createGovernGetQuotaInfoHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const governClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).governClient;
    return createGovernGetQuotaInfoHandler(governClient)(input);
  };
}

export function createSessionAwareInspectorListDomainsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorListDomainsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorListDomainsHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorCreateDomainHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorCreateDomainHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorCreateDomainHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorGetTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorGetTaskHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorListTaskHistoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorListTaskHistoriesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorListTaskHistoriesHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorListResultsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorListResultsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorListResultsHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorListPortsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorListPortsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorListPortsHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorListBusinessRisksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorListBusinessRisksHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorListBusinessRisksHandler(inspectorClient)(input);
  };
}

export function createSessionAwareInspectorGetReportStatusHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createInspectorGetReportStatusHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const inspectorClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).inspectorClient;
    return createInspectorGetReportStatusHandler(inspectorClient)(input);
  };
}

export function createSessionAwarePerfTestListProjectsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListProjectsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListProjectsHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestGetProjectHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestGetProjectHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestGetProjectHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestListTasksHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListTasksHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListTasksHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestGetTaskHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestGetTaskHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestGetTaskHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestListVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListVariablesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListVariablesHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestListTaskCasesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListTaskCasesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListTaskCasesHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestListLatestRunsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListLatestRunsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListLatestRunsHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestListOfflineReportsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestListOfflineReportsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestListOfflineReportsHandler(perfTestClient)(input);
  };
}

export function createSessionAwarePerfTestGetReportHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPerfTestGetReportHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const perfTestClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).perfTestClient;
    return createPerfTestGetReportHandler(perfTestClient)(input);
  };
}

export function createSessionAwareReqGetProjectHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqGetProjectHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqGetProjectHandler(reqClient)(input);
  };
}

export function createSessionAwareReqWorkItemsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListWorkItemsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqListWorkItemsHandler(reqClient)(input);
  };
}

export function createSessionAwareReqGetWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqGetWorkItemHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqGetWorkItemHandler(reqClient)(input);
  };
}

export function createSessionAwareReqListIterationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListIterationsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqListIterationsHandler(reqClient)(input);
  };
}

export function createSessionAwareReqCreateWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqCreateWorkItemHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqCreateWorkItemHandler(reqClient)(input);
  };
}

export function createSessionAwareReqUpdateWorkItemHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqUpdateWorkItemHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqUpdateWorkItemHandler(reqClient)(input);
  };
}

export function createSessionAwareReqListProjectMembersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createReqListProjectMembersHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const reqClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).reqClient;
    return createReqListProjectMembersHandler(reqClient)(input);
  };
}

export function createSessionAwareRepoRepositoriesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListRepositoriesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListRepositoriesHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetBranchHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetBranchHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetBranchHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoCompareRefsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCompareRefsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoCompareRefsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetTagHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetTagHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetRepositoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetRepositoryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetRepositoryHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoCreateMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateMergeRequestHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoCreateMergeRequestHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoCloseMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCloseMergeRequestHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoCloseMergeRequestHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoCreateMergeRequestDiscussionHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateMergeRequestDiscussionHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoCreateMergeRequestDiscussionHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListMergeRequestChangesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestChangesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListMergeRequestChangesHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListMergeRequestDiscussionsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestDiscussionsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListMergeRequestDiscussionsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListProtectedBranchesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListProtectedBranchesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListProtectedBranchesHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListRepositoryLabelsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListRepositoryLabelsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListRepositoryLabelsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoCreateTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoCreateTagHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoCreateTagHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoDeleteTagHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoDeleteTagHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoDeleteTagHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListTagsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListTagsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListTagsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListEventsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListEventsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListEventsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListMergeRequestsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListMergeRequestsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListMergeRequestsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetMergeRequestHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetMergeRequestHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoReviewMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoReviewMergeRequestHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoReviewMergeRequestHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoMergeMergeRequestHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoMergeMergeRequestHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoMergeMergeRequestHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListCommitsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListCommitsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListCommitsHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetFileHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetFileHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetFileHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoGetCommitHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoGetCommitHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoGetCommitHandler(repoClient)(input);
  };
}

export function createSessionAwareRepoListBranchesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createRepoListBranchesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const repoClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).repoClient;
    return createRepoListBranchesHandler(repoClient)(input);
  };
}

export function createSessionAwarePipelineRunsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListRunsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineListRunsHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineListHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListPipelinesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineListPipelinesHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetRunHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetRunDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetRunDetailHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetRunParametersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunParametersHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetRunParametersHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetRunLogHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetRunLogHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetRunLogHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetManualReviewContextHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetManualReviewContextHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetManualReviewContextHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetStepOutputsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetStepOutputsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetStepOutputsHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineGetPipelineHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineGetPipelineHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineGetPipelineHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineRunPipelineHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRunPipelineHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineRunPipelineHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineStopRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineStopRunHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineStopRunHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineRetryRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRetryRunHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineRetryRunHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineApproveRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineApproveRunHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineApproveRunHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineRejectRunHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineRejectRunHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineRejectRunHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineListArtifactsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListArtifactsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineListArtifactsHandler(pipelineClient)(input);
  };
}

export function createSessionAwarePipelineListTemplatesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createPipelineListTemplatesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const pipelineClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).pipelineClient;
    return createPipelineListTemplatesHandler(pipelineClient)(input);
  };
}

export function createSessionAwareTestPlanListPlansHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListPlansHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanListPlansHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanGetPlanHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanGetPlanHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanGetPlanHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanGetCaseHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanGetCaseHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanGetCaseHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanListCasesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListCasesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanListCasesHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanListIssuesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListIssuesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanListIssuesHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanListRunsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanListRunsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanListRunsHandler(testPlanClient)(input);
  };
}

export function createSessionAwareTestPlanRunCasesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createTestPlanRunCasesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const testPlanClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).testPlanClient;
    return createTestPlanRunCasesHandler(testPlanClient)(input);
  };
}

export function createServer(options: CreateServerOptions) {
  const server = new McpServer(createServerInfo(options.config), {
    capabilities: {
      tools: {}
    }
  });

  const stdioClients =
    options.mode === "stdio"
      ? buildClientsFromCredentialConfig({
          accessKey: options.config.accessKey,
          secretKey: options.config.secretKey,
          reqBaseUrl: options.config.reqBaseUrl,
          repoBaseUrl: options.config.repoBaseUrl,
          pipelineBaseUrl: options.config.pipelineBaseUrl,
          checkBaseUrl: options.config.checkBaseUrl,
          testPlanBaseUrl: options.config.testPlanBaseUrl,
          deployBaseUrl: options.config.deployBaseUrl,
          buildBaseUrl: options.config.buildBaseUrl,
          artifactBaseUrl: options.config.artifactBaseUrl,
          governBaseUrl: options.config.governBaseUrl,
          inspectorBaseUrl: options.config.inspectorBaseUrl,
          perfTestBaseUrl: options.config.perfTestBaseUrl
        })
      : undefined;

  if (options.mode === "http") {
    server.registerTool(
      "auth_configure_session",
      {
        title: "auth_configure_session",
        description: "Configure Huawei Cloud credentials for the current MCP session",
        inputSchema: {
          access_key: z.string().min(1),
          secret_key: z.string().min(1),
          region: z.string().min(1),
          req_base_url: z.string().url(),
          repo_base_url: z.string().url(),
          pipeline_base_url: z.string().url(),
          check_base_url: z.string().url(),
          testplan_base_url: z.string().url(),
          deploy_base_url: z.string().url(),
          build_base_url: z.string().url(),
          artifact_base_url: z.string().url(),
          govern_base_url: z.string().url().optional(),
          inspector_base_url: z.string().url().optional(),
          perftest_base_url: z.string().url().optional()
        }
      },
      createConfigureSessionHandler(options.sessionStore)
    );

    server.registerTool(
      "auth_clear_session",
      {
        title: "auth_clear_session",
        description: "Clear Huawei Cloud credentials for the current MCP session",
        inputSchema: {}
      },
      createClearSessionHandler(options.sessionStore)
    );
  }

  for (const toolName of collectToolNames()) {
    if (toolName === "artifact_list_repositories") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Artifact repositories",
          inputSchema: artifactListRepositoriesInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactListRepositoriesHandler(options.sessionStore)
          : createArtifactListRepositoriesHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_list_versions") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Artifact versions",
          inputSchema: artifactListVersionsInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactListVersionsHandler(options.sessionStore)
          : createArtifactListVersionsHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_get_file_tree") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Artifact file tree",
          inputSchema: artifactGetFileTreeInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactGetFileTreeHandler(options.sessionStore)
          : createArtifactGetFileTreeHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_list_latest_version_files") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Artifact latest version files",
          inputSchema: artifactListLatestVersionFilesInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactListLatestVersionFilesHandler(options.sessionStore)
          : createArtifactListLatestVersionFilesHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_get_repository") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Artifact repository detail",
          inputSchema: artifactGetRepositoryInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactGetRepositoryHandler(options.sessionStore)
          : createArtifactGetRepositoryHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_list_files") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Artifact files",
          inputSchema: artifactListFilesInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactListFilesHandler(options.sessionStore)
          : createArtifactListFilesHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_get_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Artifact file detail",
          inputSchema: artifactGetFileInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactGetFileHandler(options.sessionStore)
          : createArtifactGetFileHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_get_download_url") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Artifact file download URL",
          inputSchema: artifactGetDownloadUrlInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactGetDownloadUrlHandler(options.sessionStore)
          : createArtifactGetDownloadUrlHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_delete_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Delete CodeArts Artifact file",
          inputSchema: artifactDeleteFileInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactDeleteFileHandler(options.sessionStore)
          : createArtifactDeleteFileHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_list_build_archives") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Artifact build archives",
          inputSchema: artifactListBuildArchivesInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactListBuildArchivesHandler(options.sessionStore)
          : createArtifactListBuildArchivesHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_search_artifacts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Search CodeArts Artifact artifacts",
          inputSchema: artifactSearchArtifactsInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactSearchArtifactsHandler(options.sessionStore)
          : createArtifactSearchArtifactsHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "artifact_show_audit") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Show CodeArts Artifact audit logs",
          inputSchema: artifactShowAuditInput
        },
        options.mode === "http"
          ? createSessionAwareArtifactShowAuditHandler(options.sessionStore)
          : createArtifactShowAuditHandler(stdioClients!.artifactClient)
      );
      continue;
    }

    if (toolName === "govern_alter_quota_info") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Alter CodeArts Governance quota info",
          inputSchema: governAlterQuotaInfoInput
        },
        options.mode === "http"
          ? createSessionAwareGovernAlterQuotaInfoHandler(options.sessionStore)
          : createGovernAlterQuotaInfoHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_create_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Governance task",
          inputSchema: governCreateTaskInput
        },
        options.mode === "http"
          ? createSessionAwareGovernCreateTaskHandler(options.sessionStore)
          : createGovernCreateTaskHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_create_pdf_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Governance pdf report",
          inputSchema: governCreatePdfReportInput
        },
        options.mode === "http"
          ? createSessionAwareGovernCreatePdfReportHandler(options.sessionStore)
          : createGovernCreatePdfReportHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_pdf_report_status") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance pdf report status",
          inputSchema: governGetPdfReportStatusInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetPdfReportStatusHandler(options.sessionStore)
          : createGovernGetPdfReportStatusHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_download_pdf_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Download CodeArts Governance pdf report",
          inputSchema: governDownloadPdfReportInput
        },
        options.mode === "http"
          ? createSessionAwareGovernDownloadPdfReportHandler(options.sessionStore)
          : createGovernDownloadPdfReportHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_create_excel_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Governance excel report",
          inputSchema: governCreateExcelReportInput
        },
        options.mode === "http"
          ? createSessionAwareGovernCreateExcelReportHandler(options.sessionStore)
          : createGovernCreateExcelReportHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_excel_report_status") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance excel report status",
          inputSchema: governGetExcelReportStatusInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetExcelReportStatusHandler(options.sessionStore)
          : createGovernGetExcelReportStatusHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_download_excel_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Download CodeArts Governance excel report",
          inputSchema: governDownloadExcelReportInput
        },
        options.mode === "http"
          ? createSessionAwareGovernDownloadExcelReportHandler(options.sessionStore)
          : createGovernDownloadExcelReportHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_create_task_multipart_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Governance multipart upload task",
          inputSchema: governCreateTaskMultipartFileInput
        },
        options.mode === "http"
          ? createSessionAwareGovernCreateTaskMultipartFileHandler(options.sessionStore)
          : createGovernCreateTaskMultipartFileHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_task_status") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance task status",
          inputSchema: governGetTaskStatusInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetTaskStatusHandler(options.sessionStore)
          : createGovernGetTaskStatusHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_notify_task_multipart_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Notify CodeArts Governance multipart upload completion",
          inputSchema: governNotifyTaskMultipartFileInput
        },
        options.mode === "http"
          ? createSessionAwareGovernNotifyTaskMultipartFileHandler(options.sessionStore)
          : createGovernNotifyTaskMultipartFileHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_upload_task_multipart_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Upload CodeArts Governance multipart file chunk",
          inputSchema: governUploadTaskMultipartFileInput
        },
        options.mode === "http"
          ? createSessionAwareGovernUploadTaskMultipartFileHandler(options.sessionStore)
          : createGovernUploadTaskMultipartFileHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_stop_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Stop CodeArts Governance task",
          inputSchema: governStopTaskInput
        },
        options.mode === "http"
          ? createSessionAwareGovernStopTaskHandler(options.sessionStore)
          : createGovernStopTaskHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_delete_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Delete CodeArts Governance task",
          inputSchema: governDeleteTaskInput
        },
        options.mode === "http"
          ? createSessionAwareGovernDeleteTaskHandler(options.sessionStore)
          : createGovernDeleteTaskHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_open_source_summary") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance open source summary",
          inputSchema: governGetOpenSourceSummaryInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetOpenSourceSummaryHandler(options.sessionStore)
          : createGovernGetOpenSourceSummaryHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_osi_statistics") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance OSI statistics",
          inputSchema: governGetOsiStatisticsInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetOsiStatisticsHandler(options.sessionStore)
          : createGovernGetOsiStatisticsHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_osi_item_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance OSI item detail",
          inputSchema: governGetOsiItemDetailInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetOsiItemDetailHandler(options.sessionStore)
          : createGovernGetOsiItemDetailHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_list_osi_item_names") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Governance OSI item names",
          inputSchema: governListOsiItemNamesInput
        },
        options.mode === "http"
          ? createSessionAwareGovernListOsiItemNamesHandler(options.sessionStore)
          : createGovernListOsiItemNamesHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_list_osi_item_versions") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Governance OSI item versions",
          inputSchema: governListOsiItemVersionsInput
        },
        options.mode === "http"
          ? createSessionAwareGovernListOsiItemVersionsHandler(options.sessionStore)
          : createGovernListOsiItemVersionsHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_list_osi_item_vulns") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Governance OSI item vulns",
          inputSchema: governListOsiItemVulnsInput
        },
        options.mode === "http"
          ? createSessionAwareGovernListOsiItemVulnsHandler(options.sessionStore)
          : createGovernListOsiItemVulnsHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_list_osi_item_dependency") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Governance OSI item dependency",
          inputSchema: governListOsiItemDependencyInput
        },
        options.mode === "http"
          ? createSessionAwareGovernListOsiItemDependencyHandler(options.sessionStore)
          : createGovernListOsiItemDependencyHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_info_leak_summary") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance info leak summary",
          inputSchema: governGetInfoLeakSummaryInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetInfoLeakSummaryHandler(options.sessionStore)
          : createGovernGetInfoLeakSummaryHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_sec_compile_summary") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance sec compile summary",
          inputSchema: governGetSecCompileSummaryInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetSecCompileSummaryHandler(options.sessionStore)
          : createGovernGetSecCompileSummaryHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_sec_config_summary") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance sec config summary",
          inputSchema: governGetSecConfigSummaryInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetSecConfigSummaryHandler(options.sessionStore)
          : createGovernGetSecConfigSummaryHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_list_sbc_vuln_map") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Governance sbc vuln map",
          inputSchema: governListSbcVulnMapInput
        },
        options.mode === "http"
          ? createSessionAwareGovernListSbcVulnMapHandler(options.sessionStore)
          : createGovernListSbcVulnMapHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_vuln_info") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance vuln info",
          inputSchema: governGetVulnInfoInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetVulnInfoHandler(options.sessionStore)
          : createGovernGetVulnInfoHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_user_info") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance user info",
          inputSchema: governGetUserInfoInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetUserInfoHandler(options.sessionStore)
          : createGovernGetUserInfoHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_open_source_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance open source report",
          inputSchema: governGetOpenSourceReportInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetOpenSourceReportHandler(options.sessionStore)
          : createGovernGetOpenSourceReportHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "govern_get_quota_info") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Governance quota info",
          inputSchema: governGetQuotaInfoInput
        },
        options.mode === "http"
          ? createSessionAwareGovernGetQuotaInfoHandler(options.sessionStore)
          : createGovernGetQuotaInfoHandler(stdioClients!.governClient)
      );
      continue;
    }

    if (toolName === "inspector_list_domains") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Inspector domains",
          inputSchema: inspectorListDomainsInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorListDomainsHandler(options.sessionStore)
          : createInspectorListDomainsHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_create_domain") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Inspector domain",
          inputSchema: inspectorCreateDomainInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorCreateDomainHandler(options.sessionStore)
          : createInspectorCreateDomainHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_get_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Inspector task detail",
          inputSchema: inspectorGetTaskInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorGetTaskHandler(options.sessionStore)
          : createInspectorGetTaskHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_list_task_histories") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Inspector task histories",
          inputSchema: inspectorListTaskHistoriesInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorListTaskHistoriesHandler(options.sessionStore)
          : createInspectorListTaskHistoriesHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_list_results") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Inspector vulnerabilities",
          inputSchema: inspectorListResultsInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorListResultsHandler(options.sessionStore)
          : createInspectorListResultsHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_list_ports") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Inspector exposed ports",
          inputSchema: inspectorListPortsInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorListPortsHandler(options.sessionStore)
          : createInspectorListPortsHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_list_business_risks") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Inspector business risks",
          inputSchema: inspectorListBusinessRisksInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorListBusinessRisksHandler(options.sessionStore)
          : createInspectorListBusinessRisksHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "inspector_get_report_status") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Inspector report status",
          inputSchema: inspectorGetReportStatusInput
        },
        options.mode === "http"
          ? createSessionAwareInspectorGetReportStatusHandler(options.sessionStore)
          : createInspectorGetReportStatusHandler(stdioClients!.inspectorClient)
      );
      continue;
    }

    if (toolName === "perftest_list_projects") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest projects",
          inputSchema: perftestListProjectsInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListProjectsHandler(options.sessionStore)
          : createPerfTestListProjectsHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_get_project") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts PerfTest project detail",
          inputSchema: perftestGetProjectInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestGetProjectHandler(options.sessionStore)
          : createPerfTestGetProjectHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_list_tasks") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest tasks",
          inputSchema: perftestListTasksInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListTasksHandler(options.sessionStore)
          : createPerfTestListTasksHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_get_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts PerfTest task detail",
          inputSchema: perftestGetTaskInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestGetTaskHandler(options.sessionStore)
          : createPerfTestGetTaskHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_list_variables") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest variables",
          inputSchema: perftestListVariablesInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListVariablesHandler(options.sessionStore)
          : createPerfTestListVariablesHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_list_task_cases") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest task cases",
          inputSchema: perftestListTaskCasesInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListTaskCasesHandler(options.sessionStore)
          : createPerfTestListTaskCasesHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_list_latest_runs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest latest runs",
          inputSchema: perftestListLatestRunsInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListLatestRunsHandler(options.sessionStore)
          : createPerfTestListLatestRunsHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_list_offline_reports") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts PerfTest offline reports",
          inputSchema: perftestListOfflineReportsInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestListOfflineReportsHandler(options.sessionStore)
          : createPerfTestListOfflineReportsHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "perftest_get_report") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts PerfTest report detail",
          inputSchema: perftestGetReportInput
        },
        options.mode === "http"
          ? createSessionAwarePerfTestGetReportHandler(options.sessionStore)
          : createPerfTestGetReportHandler(stdioClients!.perfTestClient)
      );
      continue;
    }

    if (toolName === "build_list_jobs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Build jobs",
          inputSchema: buildListJobsInput
        },
        options.mode === "http"
          ? createSessionAwareBuildListJobsHandler(options.sessionStore)
          : createBuildListJobsHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_list_project_records") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Build project records",
          inputSchema: buildListProjectRecordsInput
        },
        options.mode === "http"
          ? createSessionAwareBuildListProjectRecordsHandler(options.sessionStore)
          : createBuildListProjectRecordsHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_project_record_statistics") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build project record statistics",
          inputSchema: buildGetProjectRecordStatisticsInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetProjectRecordStatisticsHandler(options.sessionStore)
          : createBuildGetProjectRecordStatisticsHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_record_flow_graph") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build record flow graph",
          inputSchema: buildGetRecordFlowGraphInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetRecordFlowGraphHandler(options.sessionStore)
          : createBuildGetRecordFlowGraphHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_job") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build job detail",
          inputSchema: buildGetJobInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetJobHandler(options.sessionStore)
          : createBuildGetJobHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build record detail",
          inputSchema: buildGetRecordInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetRecordHandler(options.sessionStore)
          : createBuildGetRecordHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_list_records") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Build records",
          inputSchema: buildListRecordsInput
        },
        options.mode === "http"
          ? createSessionAwareBuildListRecordsHandler(options.sessionStore)
          : createBuildListRecordsHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_run_job") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Run CodeArts Build job",
          inputSchema: buildRunJobInput
        },
        options.mode === "http"
          ? createSessionAwareBuildRunJobHandler(options.sessionStore)
          : createBuildRunJobHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_stop_job") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Stop CodeArts Build job",
          inputSchema: buildStopJobInput
        },
        options.mode === "http"
          ? createSessionAwareBuildStopJobHandler(options.sessionStore)
          : createBuildStopJobHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_real_time_log") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build real-time log",
          inputSchema: buildGetRealTimeLogInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetRealTimeLogHandler(options.sessionStore)
          : createBuildGetRealTimeLogHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_history_details") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build history details",
          inputSchema: buildGetHistoryDetailsInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetHistoryDetailsHandler(options.sessionStore)
          : createBuildGetHistoryDetailsHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_error_log") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build error log analysis",
          inputSchema: buildGetErrorLogInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetErrorLogHandler(options.sessionStore)
          : createBuildGetErrorLogHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_info_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build info record",
          inputSchema: buildGetInfoRecordInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetInfoRecordHandler(options.sessionStore)
          : createBuildGetInfoRecordHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_record_script") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build record script",
          inputSchema: buildGetRecordScriptInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetRecordScriptHandler(options.sessionStore)
          : createBuildGetRecordScriptHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_get_full_stages") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Build full stages",
          inputSchema: buildGetFullStagesInput
        },
        options.mode === "http"
          ? createSessionAwareBuildGetFullStagesHandler(options.sessionStore)
          : createBuildGetFullStagesHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_list_build_parameters") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Build parameters",
          inputSchema: buildListBuildParametersInput
        },
        options.mode === "http"
          ? createSessionAwareBuildListBuildParametersHandler(options.sessionStore)
          : createBuildListBuildParametersHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "check_list_tasks") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Check tasks",
          inputSchema: checkListTasksInput
        },
        options.mode === "http"
          ? createSessionAwareCheckListTasksHandler(options.sessionStore)
          : createCheckListTasksHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_create_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Check task",
          inputSchema: checkCreateTaskInput
        },
        options.mode === "http"
          ? createSessionAwareCheckCreateTaskHandler(options.sessionStore)
          : createCheckCreateTaskHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_get_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Check task detail",
          inputSchema: checkGetTaskInput
        },
        options.mode === "http"
          ? createSessionAwareCheckGetTaskHandler(options.sessionStore)
          : createCheckGetTaskHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_list_rulesets") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Check rulesets",
          inputSchema: checkListRulesetsInput
        },
        options.mode === "http"
          ? createSessionAwareCheckListRulesetsHandler(options.sessionStore)
          : createCheckListRulesetsHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_list_task_issues") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Check task issues",
          inputSchema: checkListTaskIssuesInput
        },
        options.mode === "http"
          ? createSessionAwareCheckListTaskIssuesHandler(options.sessionStore)
          : createCheckListTaskIssuesHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_get_metrics") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Check task metrics",
          inputSchema: checkGetMetricsInput
        },
        options.mode === "http"
          ? createSessionAwareCheckGetMetricsHandler(options.sessionStore)
          : createCheckGetMetricsHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_run_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Run CodeArts Check task",
          inputSchema: checkRunTaskInput
        },
        options.mode === "http"
          ? createSessionAwareCheckRunTaskHandler(options.sessionStore)
          : createCheckRunTaskHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "check_stop_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Stop CodeArts Check task",
          inputSchema: checkStopTaskInput
        },
        options.mode === "http"
          ? createSessionAwareCheckStopTaskHandler(options.sessionStore)
          : createCheckStopTaskHandler(stdioClients!.checkClient)
      );
      continue;
    }

    if (toolName === "deploy_list_apps") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy applications",
          inputSchema: deployListAppsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListAppsHandler(options.sessionStore)
          : createDeployListAppsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_tasks") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy tasks",
          inputSchema: deployListTasksInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListTasksHandler(options.sessionStore)
          : createDeployListTasksHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_app") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy application detail",
          inputSchema: deployGetAppInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetAppHandler(options.sessionStore)
          : createDeployGetAppHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_task") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy task detail",
          inputSchema: deployGetTaskInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetTaskHandler(options.sessionStore)
          : createDeployGetTaskHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_app_operations_log") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy application operation logs",
          inputSchema: deployListAppOperationsLogInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListAppOperationsLogHandler(options.sessionStore)
          : createDeployListAppOperationsLogHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_app_log") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy application log",
          inputSchema: deployGetAppLogInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetAppLogHandler(options.sessionStore)
          : createDeployGetAppLogHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_execution_params") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy execution params",
          inputSchema: deployGetExecutionParamsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetExecutionParamsHandler(options.sessionStore)
          : createDeployGetExecutionParamsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_histories") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy histories",
          inputSchema: deployListHistoriesInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListHistoriesHandler(options.sessionStore)
          : createDeployListHistoriesHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_status") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy task status",
          inputSchema: deployGetStatusInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetStatusHandler(options.sessionStore)
          : createDeployGetStatusHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_start_app") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Start CodeArts Deploy task",
          inputSchema: deployStartAppInput
        },
        options.mode === "http"
          ? createSessionAwareDeployStartAppHandler(options.sessionStore)
          : createDeployStartAppHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_stop_app") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Stop CodeArts Deploy task",
          inputSchema: deployStopAppInput
        },
        options.mode === "http"
          ? createSessionAwareDeployStopAppHandler(options.sessionStore)
          : createDeployStopAppHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_rollback_app") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Rollback CodeArts Deploy task",
          inputSchema: deployRollbackAppInput
        },
        options.mode === "http"
          ? createSessionAwareDeployRollbackAppHandler(options.sessionStore)
          : createDeployRollbackAppHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_history_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy history detail",
          inputSchema: deployGetHistoryDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetHistoryDetailHandler(options.sessionStore)
          : createDeployGetHistoryDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "req_list_projects") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Req projects",
          inputSchema: reqListProjectsInput
        },
        options.mode === "http"
          ? createSessionAwareReqProjectsHandler(options.sessionStore)
          : createReqListProjectsHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_get_project") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Req project detail",
          inputSchema: reqGetProjectInput
        },
        options.mode === "http"
          ? createSessionAwareReqGetProjectHandler(options.sessionStore)
          : createReqGetProjectHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_create_work_item") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Req work item",
          inputSchema: reqCreateWorkItemInput
        },
        options.mode === "http"
          ? createSessionAwareReqCreateWorkItemHandler(options.sessionStore)
          : createReqCreateWorkItemHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "repo_list_repositories") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo repositories",
          inputSchema: repoListRepositoriesInput
        },
        options.mode === "http"
          ? createSessionAwareRepoRepositoriesHandler(options.sessionStore)
          : createRepoListRepositoriesHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_get_repository") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo repository detail",
          inputSchema: repoGetRepositoryInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetRepositoryHandler(options.sessionStore)
          : createRepoGetRepositoryHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_create_merge_request") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Repo merge request",
          inputSchema: repoCreateMergeRequestInput
        },
        options.mode === "http"
          ? createSessionAwareRepoCreateMergeRequestHandler(options.sessionStore)
          : createRepoCreateMergeRequestHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_create_merge_request_discussion") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Repo merge request discussion",
          inputSchema: repoCreateMergeRequestDiscussionInput
        },
        options.mode === "http"
          ? createSessionAwareRepoCreateMergeRequestDiscussionHandler(options.sessionStore)
          : createRepoCreateMergeRequestDiscussionHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_close_merge_request") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Close CodeArts Repo merge request",
          inputSchema: repoCloseMergeRequestInput
        },
        options.mode === "http"
          ? createSessionAwareRepoCloseMergeRequestHandler(options.sessionStore)
          : createRepoCloseMergeRequestHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_merge_request_changes") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo merge request changes",
          inputSchema: repoListMergeRequestChangesInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListMergeRequestChangesHandler(options.sessionStore)
          : createRepoListMergeRequestChangesHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_merge_request_discussions") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo merge request discussions",
          inputSchema: repoListMergeRequestDiscussionsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListMergeRequestDiscussionsHandler(options.sessionStore)
          : createRepoListMergeRequestDiscussionsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_protected_branches") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo protected branches",
          inputSchema: repoListProtectedBranchesInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListProtectedBranchesHandler(options.sessionStore)
          : createRepoListProtectedBranchesHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_repository_labels") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo repository labels",
          inputSchema: repoListRepositoryLabelsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListRepositoryLabelsHandler(options.sessionStore)
          : createRepoListRepositoryLabelsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_create_tag") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Repo tag",
          inputSchema: repoCreateTagInput
        },
        options.mode === "http"
          ? createSessionAwareRepoCreateTagHandler(options.sessionStore)
          : createRepoCreateTagHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_delete_tag") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Delete CodeArts Repo tag",
          inputSchema: repoDeleteTagInput
        },
        options.mode === "http"
          ? createSessionAwareRepoDeleteTagHandler(options.sessionStore)
          : createRepoDeleteTagHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_tags") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo tags",
          inputSchema: repoListTagsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListTagsHandler(options.sessionStore)
          : createRepoListTagsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_events") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo events",
          inputSchema: repoListEventsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListEventsHandler(options.sessionStore)
          : createRepoListEventsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_merge_requests") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo merge requests",
          inputSchema: repoListMergeRequestsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListMergeRequestsHandler(options.sessionStore)
          : createRepoListMergeRequestsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_get_branch") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo branch detail",
          inputSchema: repoGetBranchInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetBranchHandler(options.sessionStore)
          : createRepoGetBranchHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_compare_refs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Compare CodeArts Repo refs",
          inputSchema: repoCompareRefsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoCompareRefsHandler(options.sessionStore)
          : createRepoCompareRefsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_get_tag") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo tag detail",
          inputSchema: repoGetTagInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetTagHandler(options.sessionStore)
          : createRepoGetTagHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_get_merge_request") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo merge request detail",
          inputSchema: repoGetMergeRequestInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetMergeRequestHandler(options.sessionStore)
          : createRepoGetMergeRequestHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_merge_merge_request") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Merge CodeArts Repo merge request",
          inputSchema: repoMergeMergeRequestInput
        },
        options.mode === "http"
          ? createSessionAwareRepoMergeMergeRequestHandler(options.sessionStore)
          : createRepoMergeMergeRequestHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_review_merge_request") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Review CodeArts Repo merge request",
          inputSchema: repoReviewMergeRequestInput
        },
        options.mode === "http"
          ? createSessionAwareRepoReviewMergeRequestHandler(options.sessionStore)
          : createRepoReviewMergeRequestHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "req_list_work_items") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Req work items",
          inputSchema: reqListWorkItemsInput
        },
        options.mode === "http"
          ? createSessionAwareReqWorkItemsHandler(options.sessionStore)
          : createReqListWorkItemsHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_get_work_item") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Req work item detail",
          inputSchema: reqGetWorkItemInput
        },
        options.mode === "http"
          ? createSessionAwareReqGetWorkItemHandler(options.sessionStore)
          : createReqGetWorkItemHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_list_iterations") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Req iterations",
          inputSchema: reqListIterationsInput
        },
        options.mode === "http"
          ? createSessionAwareReqListIterationsHandler(options.sessionStore)
          : createReqListIterationsHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_update_work_item") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Update CodeArts Req work item",
          inputSchema: reqUpdateWorkItemInput
        },
        options.mode === "http"
          ? createSessionAwareReqUpdateWorkItemHandler(options.sessionStore)
          : createReqUpdateWorkItemHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "req_list_project_members") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Req project members",
          inputSchema: reqListProjectMembersInput
        },
        options.mode === "http"
          ? createSessionAwareReqListProjectMembersHandler(options.sessionStore)
          : createReqListProjectMembersHandler(stdioClients!.reqClient)
      );
      continue;
    }

    if (toolName === "repo_get_file") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo file content",
          inputSchema: repoGetFileInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetFileHandler(options.sessionStore)
          : createRepoGetFileHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_commits") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo commits",
          inputSchema: repoListCommitsInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListCommitsHandler(options.sessionStore)
          : createRepoListCommitsHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_get_commit") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Repo commit detail",
          inputSchema: repoGetCommitInput
        },
        options.mode === "http"
          ? createSessionAwareRepoGetCommitHandler(options.sessionStore)
          : createRepoGetCommitHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "repo_list_branches") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Repo branches",
          inputSchema: repoListBranchesInput
        },
        options.mode === "http"
          ? createSessionAwareRepoListBranchesHandler(options.sessionStore)
          : createRepoListBranchesHandler(stdioClients!.repoClient)
      );
      continue;
    }

    if (toolName === "pipeline_list_pipelines") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Pipelines",
          inputSchema: pipelineListInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineListHandler(options.sessionStore)
          : createPipelineListPipelinesHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_run") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline run detail",
          inputSchema: pipelineGetRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetRunHandler(options.sessionStore)
          : createPipelineGetRunHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_list_artifacts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Pipeline artifacts",
          inputSchema: pipelineListArtifactsInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineListArtifactsHandler(options.sessionStore)
          : createPipelineListArtifactsHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_run_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline run detail",
          inputSchema: pipelineGetRunDetailInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetRunDetailHandler(options.sessionStore)
          : createPipelineGetRunDetailHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_run_parameters") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline run parameters",
          inputSchema: pipelineGetRunParametersInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetRunParametersHandler(options.sessionStore)
          : createPipelineGetRunParametersHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_run_log") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline run step log",
          inputSchema: pipelineGetRunLogInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetRunLogHandler(options.sessionStore)
          : createPipelineGetRunLogHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_manual_review_context") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline manual review context",
          inputSchema: pipelineGetManualReviewContextInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetManualReviewContextHandler(options.sessionStore)
          : createPipelineGetManualReviewContextHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_step_outputs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline step outputs",
          inputSchema: pipelineGetStepOutputsInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetStepOutputsHandler(options.sessionStore)
          : createPipelineGetStepOutputsHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_get_pipeline") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Pipeline detail",
          inputSchema: pipelineGetInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineGetPipelineHandler(options.sessionStore)
          : createPipelineGetPipelineHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_run_pipeline") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Run CodeArts Pipeline",
          inputSchema: pipelineRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineRunPipelineHandler(options.sessionStore)
          : createPipelineRunPipelineHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_stop_run") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Stop CodeArts Pipeline run",
          inputSchema: pipelineStopRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineStopRunHandler(options.sessionStore)
          : createPipelineStopRunHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_retry_run") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Retry CodeArts Pipeline run",
          inputSchema: pipelineRetryRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineRetryRunHandler(options.sessionStore)
          : createPipelineRetryRunHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_approve_run") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Approve CodeArts Pipeline manual review",
          inputSchema: pipelineApproveRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineApproveRunHandler(options.sessionStore)
          : createPipelineApproveRunHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_reject_run") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Reject CodeArts Pipeline manual review",
          inputSchema: pipelineRejectRunInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineRejectRunHandler(options.sessionStore)
          : createPipelineRejectRunHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_list_templates") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Pipeline templates",
          inputSchema: pipelineListTemplatesInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineListTemplatesHandler(options.sessionStore)
          : createPipelineListTemplatesHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "pipeline_list_runs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Pipeline runs",
          inputSchema: pipelineListRunsInput
        },
        options.mode === "http"
          ? createSessionAwarePipelineRunsHandler(options.sessionStore)
          : createPipelineListRunsHandler(stdioClients!.pipelineClient)
      );
      continue;
    }

    if (toolName === "testplan_list_plans") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts TestPlan plans",
          inputSchema: testPlanListPlansInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanListPlansHandler(options.sessionStore)
          : createTestPlanListPlansHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_get_plan") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts TestPlan plan detail",
          inputSchema: testPlanGetPlanInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanGetPlanHandler(options.sessionStore)
          : createTestPlanGetPlanHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_get_case") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts TestPlan case detail",
          inputSchema: testPlanGetCaseInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanGetCaseHandler(options.sessionStore)
          : createTestPlanGetCaseHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_list_cases") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts TestPlan cases",
          inputSchema: testPlanListCasesInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanListCasesHandler(options.sessionStore)
          : createTestPlanListCasesHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_list_issues") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts TestPlan requirement tree",
          inputSchema: testPlanListIssuesInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanListIssuesHandler(options.sessionStore)
          : createTestPlanListIssuesHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_list_runs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts TestPlan runs",
          inputSchema: testPlanListRunsInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanListRunsHandler(options.sessionStore)
          : createTestPlanListRunsHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    if (toolName === "testplan_run_cases") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Run CodeArts TestPlan cases",
          inputSchema: testPlanRunCasesInput
        },
        options.mode === "http"
          ? createSessionAwareTestPlanRunCasesHandler(options.sessionStore)
          : createTestPlanRunCasesHandler(stdioClients!.testPlanClient)
      );
      continue;
    }

    server.registerTool(
      toolName,
      {
        title: toolName,
        description: `CodeArts Phase 1 tool: ${toolName}`
      },
      async () => ({
        content: [
          {
            type: "text" as const,
            text: `${toolName} is scaffolded but not yet backed by live Huawei Cloud requests.`
          }
        ]
      })
    );
  }

  return server;
}
