import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { createHuaweiAuthHeaders } from "../core/auth/huawei-auth.js";
import type { AppConfig, ServerMetadataConfig } from "../core/config/env.js";
import { AppError } from "../core/errors/app-error.js";
import { createHttpClient } from "../core/http/client.js";
import { encryptSecretValue, decryptSecretValue } from "./auth-crypto.js";
import { createAuthToken } from "./auth-token.js";
import type { PersistedAuthRecord } from "./auth-repository.js";
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
  buildAppendReleaseUploadStepInput,
  buildAppendJobStepInput,
  buildConfigureReleaseUploadStepInput,
  buildPrepareDeployableNodeAppInput,
  buildGetErrorLogInput,
  buildGetFullStagesInput,
  buildGetHistoryDetailsInput,
  buildGetInfoRecordInput,
  buildGetProjectRecordStatisticsInput,
  buildPrepareNodeRuntimeBundleInput,
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
import { createBuildListBuildParametersHandler } from "../products/build/tools/list-build-parameters.js";
import { createBuildListJobsHandler } from "../products/build/tools/list-jobs.js";
import { createBuildListProjectRecordsHandler } from "../products/build/tools/list-project-records.js";
import { createBuildListRecordsHandler } from "../products/build/tools/list-records.js";
import { createBuildRunJobHandler } from "../products/build/tools/run-job.js";
import { createBuildStopJobHandler } from "../products/build/tools/stop-job.js";
import { createBuildUpdateJobStepHandler } from "../products/build/tools/update-job-step.js";
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
  deployCreateEnvironmentInput,
  deployCreateApplicationInput,
  deployModifyApplicationInput,
  deployCreateTaskByTemplateInput,
  deployGetAppInput,
  deployGetDeploySourceDetailInput,
  deployGetTemplateDetailInput,
  deployGetHostGroupInput,
  deployGetTaskInput,
  deployImportHostsToEnvironmentInput,
  deployListSystemConfigsInput,
  deployListAppOperationsLogInput,
  deployListAppHostGroupsInput,
  deployListEnvironmentsInput,
  deployListEnvironmentHostsInput,
  deployListV4ApplicationsInput,
  deployListV4ClustersInput,
  deployGetV4ClusterInput,
  deployDeleteV4ClusterHostsInput,
  deployGetV4ClusterCountInput,
  deployGetV4ClusterHostInput,
  deployListV4ClusterHostsInput,
  deployGetV4EnvironmentInput,
  deployGetV4EnvironmentResourceDetailInput,
  deployListV4EnvironmentHostsInput,
  deployAddV4EnvironmentHostsInput,
  deployDeleteV4EnvironmentHostsInput,
  deployListV4EnvironmentApplicationsInput,
  deployListV4EnvironmentsInput,
  deployListDeploymentUnitsInput,
  deployListV4OrchestrationsInput,
  deployListV4DeployRecordsInput,
  deployGetAppLogInput,
  deployGetExecutionParamsInput,
  deployGetRuntimeVariablesInput,
  deployGetHistoryDetailInput,
  deployGetLastRecordDetailInput,
  deployGetV4DeployRecordInput,
  deployGetV4DeployRecordStepDetailInput,
  deployGetV4DeployRecordStepLogsInput,
  deployCancelV4DeployRecordInput,
  deployRerunV4DeployRecordInput,
  deployRetryV4DeployRecordInput,
  deployRollbackV4DeployRecordInput,
  deployPassV4ManualCheckInput,
  deployRefuseV4ManualCheckInput,
  deployListVariableHistoryInput,
  deployListVariablesInput,
  deployListHostGroupEnvironmentsInput,
  deployListHostGroupHostsInput,
  deployListHostGroupsInput,
  deployGetStatusInput,
  deployListAppsInput,
  deployListTasksInput,
  deployListHistoriesInput,
  deployQueryVariablesInput,
  deployRollbackAppInput,
  deployStartAppInput,
  deployStopAppInput
} from "../products/deploy/schemas.js";
import { createDeployCreateEnvironmentHandler } from "../products/deploy/tools/create-environment.js";
import { createDeployCreateApplicationHandler } from "../products/deploy/tools/create-application.js";
import { createDeployModifyApplicationHandler } from "../products/deploy/tools/modify-application.js";
import { createDeployCreateTaskByTemplateHandler } from "../products/deploy/tools/create-task-by-template.js";
import { createDeployGetAppHandler } from "../products/deploy/tools/get-app.js";
import { createDeployGetDeploySourceDetailHandler } from "../products/deploy/tools/get-deploy-source-detail.js";
import { createDeployGetTemplateDetailHandler } from "../products/deploy/tools/get-template-detail.js";
import { createDeployGetHostGroupHandler } from "../products/deploy/tools/get-host-group.js";
import { createDeployGetTaskHandler } from "../products/deploy/tools/get-task.js";
import { createDeployImportHostsToEnvironmentHandler } from "../products/deploy/tools/import-hosts-to-environment.js";
import { createDeployGetAppLogHandler } from "../products/deploy/tools/get-app-log.js";
import { createDeployGetExecutionParamsHandler } from "../products/deploy/tools/get-execution-params.js";
import { createDeployGetHistoryDetailHandler } from "../products/deploy/tools/get-history-detail.js";
import { createDeployGetStatusHandler } from "../products/deploy/tools/get-status.js";
import { createDeployGetRuntimeVariablesHandler } from "../products/deploy/tools/get-runtime-variables.js";
import { createDeployListSystemConfigsHandler } from "../products/deploy/tools/list-system-configs.js";
import { createDeployListAppOperationsLogHandler } from "../products/deploy/tools/list-app-operations-log.js";
import { createDeployListAppHostGroupsHandler } from "../products/deploy/tools/list-app-host-groups.js";
import { createDeployListAppsHandler } from "../products/deploy/tools/list-apps.js";
import { createDeployListDeploymentUnitsHandler } from "../products/deploy/tools/list-deployment-units.js";
import { createDeployGetLastRecordDetailHandler } from "../products/deploy/tools/get-last-record-detail.js";
import { createDeployGetV4DeployRecordHandler } from "../products/deploy/tools/get-v4-deploy-record.js";
import { createDeployGetV4DeployRecordStepDetailHandler } from "../products/deploy/tools/get-v4-deploy-record-step-detail.js";
import { createDeployGetV4DeployRecordStepLogsHandler } from "../products/deploy/tools/get-v4-deploy-record-step-logs.js";
import { createDeployCancelV4DeployRecordHandler } from "../products/deploy/tools/cancel-v4-deploy-record.js";
import { createDeployListV4ApplicationsHandler } from "../products/deploy/tools/list-v4-applications.js";
import { createDeployListV4ClustersHandler } from "../products/deploy/tools/list-v4-clusters.js";
import { createDeployGetV4ClusterHandler } from "../products/deploy/tools/get-v4-cluster.js";
import { createDeployDeleteV4ClusterHostsHandler } from "../products/deploy/tools/delete-v4-cluster-hosts.js";
import { createDeployGetV4ClusterCountHandler } from "../products/deploy/tools/get-v4-cluster-count.js";
import { createDeployGetV4ClusterHostHandler } from "../products/deploy/tools/get-v4-cluster-host.js";
import { createDeployListV4ClusterHostsHandler } from "../products/deploy/tools/list-v4-cluster-hosts.js";
import { createDeployGetV4EnvironmentHandler } from "../products/deploy/tools/get-v4-environment.js";
import { createDeployGetV4EnvironmentResourceDetailHandler } from "../products/deploy/tools/get-v4-environment-resource-detail.js";
import { createDeployListV4EnvironmentHostsHandler } from "../products/deploy/tools/list-v4-environment-hosts.js";
import { createDeployAddV4EnvironmentHostsHandler } from "../products/deploy/tools/add-v4-environment-hosts.js";
import { createDeployDeleteV4EnvironmentHostsHandler } from "../products/deploy/tools/delete-v4-environment-hosts.js";
import { createDeployListV4DeployRecordsHandler } from "../products/deploy/tools/list-v4-deploy-records.js";
import { createDeployListV4EnvironmentApplicationsHandler } from "../products/deploy/tools/list-v4-environment-applications.js";
import { createDeployListV4EnvironmentsHandler } from "../products/deploy/tools/list-v4-environments.js";
import { createDeployListV4OrchestrationsHandler } from "../products/deploy/tools/list-v4-orchestrations.js";
import { createDeployListEnvironmentsHandler } from "../products/deploy/tools/list-environments.js";
import { createDeployListEnvironmentHostsHandler } from "../products/deploy/tools/list-environment-hosts.js";
import { createDeployListHostGroupEnvironmentsHandler } from "../products/deploy/tools/list-host-group-environments.js";
import { createDeployListHostGroupHostsHandler } from "../products/deploy/tools/list-host-group-hosts.js";
import { createDeployListHostGroupsHandler } from "../products/deploy/tools/list-host-groups.js";
import { createDeployListTasksHandler } from "../products/deploy/tools/list-tasks.js";
import { createDeployListHistoriesHandler } from "../products/deploy/tools/list-histories.js";
import { createDeployListVariableHistoryHandler } from "../products/deploy/tools/list-variable-history.js";
import { createDeployListVariablesHandler } from "../products/deploy/tools/list-variables.js";
import { createDeployPassV4ManualCheckHandler } from "../products/deploy/tools/pass-v4-manual-check.js";
import { createDeployQueryVariablesHandler } from "../products/deploy/tools/query-variables.js";
import { createDeployRefuseV4ManualCheckHandler } from "../products/deploy/tools/refuse-v4-manual-check.js";
import { createDeployRollbackAppHandler } from "../products/deploy/tools/rollback-app.js";
import { createDeployRollbackV4DeployRecordHandler } from "../products/deploy/tools/rollback-v4-deploy-record.js";
import { createDeployRerunV4DeployRecordHandler } from "../products/deploy/tools/rerun-v4-deploy-record.js";
import { createDeployRetryV4DeployRecordHandler } from "../products/deploy/tools/retry-v4-deploy-record.js";
import { createDeployStartAppHandler } from "../products/deploy/tools/start-app.js";
import { createDeployStopAppHandler } from "../products/deploy/tools/stop-app.js";
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
import {
  mergeSessionEndpointOverrides,
  resolveRegionDefaults
} from "./region-defaults.js";
import type { SessionCredentialStore } from "./session-store.js";

type AuthRepository = {
  upsert: (record: PersistedAuthRecord) => void;
  findByTokenHash: (tokenHash: string) => PersistedAuthRecord | undefined;
  findActiveByAuthId: (authId: string) => PersistedAuthRecord | undefined;
  revoke: (authId: string, revokedAt: string) => void;
};

type HttpAuthRuntimeConfig = {
  repository?: AuthRepository;
  masterKey?: string;
};

let httpAuthRuntimeConfig: HttpAuthRuntimeConfig = {};

const configureSessionInputSchema = z.object({
  access_key: z.string().min(1),
  secret_key: z.string().min(1),
  region: z.string().min(1),
  req_base_url: z.string().url().optional(),
  repo_base_url: z.string().url().optional(),
  pipeline_base_url: z.string().url().optional(),
  check_base_url: z.string().url().optional(),
  testplan_base_url: z.string().url().optional(),
  deploy_base_url: z.string().url().optional(),
  build_base_url: z.string().url().optional(),
  artifact_base_url: z.string().url().optional()
});

function requireSessionId(sessionId?: string): string {
  if (!sessionId) {
    throw new AppError("auth_error", "No MCP session is available for this request.");
  }

  return sessionId;
}

export function createConfigureSessionHandler(store: SessionCredentialStore) {
  return createConfigureSessionHandlerWithPersistence({
    sessionStore: store,
    repository: httpAuthRuntimeConfig.repository,
    masterKey: httpAuthRuntimeConfig.masterKey
  });
}

export function createClearSessionHandler(store: SessionCredentialStore) {
  return createClearSessionHandlerWithPersistence({
    sessionStore: store,
    repository: httpAuthRuntimeConfig.repository
  });
}

export function createConfigureSessionHandlerWithPersistence(options: {
  sessionStore: SessionCredentialStore;
  repository?: AuthRepository;
  masterKey?: string;
  createToken?: typeof createAuthToken;
  authTokenTtlSeconds?: number;
}) {
  return async (
    input: unknown,
    extra: {
      sessionId?: string;
    }
  ) => {
    const parsed = configureSessionInputSchema.parse(input);
    const sessionId = requireSessionId(extra.sessionId);
    const repository = options.repository;
    const masterKey = options.masterKey;

    if (!repository || !masterKey) {
      throw new AppError(
        "auth_error",
        "HTTP auth persistence is not configured for this server."
      );
    }

    const endpoints = mergeSessionEndpointOverrides(resolveRegionDefaults(parsed.region), {
      req_base_url: parsed.req_base_url,
      repo_base_url: parsed.repo_base_url,
      pipeline_base_url: parsed.pipeline_base_url,
      check_base_url: parsed.check_base_url,
      testplan_base_url: parsed.testplan_base_url,
      deploy_base_url: parsed.deploy_base_url,
      build_base_url: parsed.build_base_url,
      artifact_base_url: parsed.artifact_base_url
    });
    const now = new Date().toISOString();
    const token = (options.createToken ?? createAuthToken)();
    const authId = randomUUID();

    repository.upsert({
      auth_id: authId,
      token_hash: token.hash,
      encrypted_access_key: encryptSecretValue(parsed.access_key, masterKey),
      encrypted_secret_key: encryptSecretValue(parsed.secret_key, masterKey),
      region: parsed.region,
      ...endpoints,
      created_at: now,
      updated_at: now,
      last_used_at: now,
      expires_at: new Date(
        Date.now() + (options.authTokenTtlSeconds ?? 60 * 60 * 24 * 30) * 1000
      ).toISOString()
    });

    options.sessionStore.bind(sessionId, authId);

    return {
      content: [{ type: "text" as const, text: `Session ${sessionId} configured for ${parsed.region}.` }],
      structuredContent: {
        session_id: sessionId,
        auth_id: authId,
        configured: true,
        region: parsed.region,
        token_issued: true,
        token_preview: `${token.raw.slice(0, 6)}...`,
        cookie_expected: true
      },
      _httpAuthToken: token.raw
    };
  };
}

export function createClearSessionHandlerWithPersistence(options: {
  sessionStore: SessionCredentialStore;
  repository?: AuthRepository;
}) {
  return async (
    _input: unknown,
    extra: {
      sessionId?: string;
    }
  ) => {
    const sessionId = requireSessionId(extra.sessionId);
    const authId = options.sessionStore.getAuthId(sessionId);

    if (authId && options.repository) {
      options.repository.revoke(authId, new Date().toISOString());
    }

    options.sessionStore.clear(sessionId);

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
      authRepository?: AuthRepository;
      authMasterKey?: string;
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
    testPlanClient: createTestPlanClient(
      createHttpClient({ baseUrl: config.testPlanBaseUrl, authHeaders })
    )
  };
}

function buildClientsForSession(store: SessionCredentialStore, sessionId?: string) {
  if (!sessionId) {
    throw new AppError("auth_error", "This tool requires an MCP session.");
  }

  const authId = store.getAuthId(sessionId);

  if (!authId) {
    throw new AppError("auth_error", `No Huawei Cloud credentials configured for session ${sessionId}.`);
  }

  const repository = httpAuthRuntimeConfig.repository;
  const masterKey = httpAuthRuntimeConfig.masterKey;

  if (!repository || !masterKey) {
    throw new AppError("auth_error", "HTTP auth persistence is not configured for this server.");
  }

  const sessionConfig = repository.findActiveByAuthId(authId);

  if (!sessionConfig) {
    throw new AppError("auth_error", `No Huawei Cloud credentials configured for auth identity ${authId}.`);
  }

  return buildClientsFromCredentialConfig({
    accessKey: decryptSecretValue(sessionConfig.encrypted_access_key, masterKey),
    secretKey: decryptSecretValue(sessionConfig.encrypted_secret_key, masterKey),
    reqBaseUrl: sessionConfig.req_base_url,
    repoBaseUrl: sessionConfig.repo_base_url,
    pipelineBaseUrl: sessionConfig.pipeline_base_url,
    checkBaseUrl: sessionConfig.check_base_url,
    testPlanBaseUrl: sessionConfig.testplan_base_url,
    deployBaseUrl: sessionConfig.deploy_base_url,
    buildBaseUrl: sessionConfig.build_base_url,
    artifactBaseUrl: sessionConfig.artifact_base_url
  });
}

type SessionToolExtra = {
  sessionId?: string;
  authId?: string;
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

export function createSessionAwareDeployListV4ApplicationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ApplicationsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4ApplicationsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4ClustersHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ClustersHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4ClustersHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4ClusterHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4ClusterHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployDeleteV4ClusterHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployDeleteV4ClusterHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployDeleteV4ClusterHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4ClusterCountHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterCountHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4ClusterCountHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4ClusterHostHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4ClusterHostHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4ClusterHostHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4ClusterHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4ClusterHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4ClusterHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4EnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4EnvironmentHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4EnvironmentHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4EnvironmentResourceDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4EnvironmentResourceDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4EnvironmentResourceDetailHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4EnvironmentHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployAddV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployAddV4EnvironmentHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployAddV4EnvironmentHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployDeleteV4EnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployDeleteV4EnvironmentHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployDeleteV4EnvironmentHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4EnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4EnvironmentsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4EnvironmentApplicationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4EnvironmentApplicationsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4EnvironmentApplicationsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListDeploymentUnitsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListDeploymentUnitsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListDeploymentUnitsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4OrchestrationsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4OrchestrationsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4OrchestrationsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListV4DeployRecordsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListV4DeployRecordsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListV4DeployRecordsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetLastRecordDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetLastRecordDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetLastRecordDetailHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4DeployRecordHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4DeployRecordStepDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordStepDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4DeployRecordStepDetailHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetV4DeployRecordStepLogsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetV4DeployRecordStepLogsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetV4DeployRecordStepLogsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployCancelV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCancelV4DeployRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployCancelV4DeployRecordHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployRerunV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRerunV4DeployRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployRerunV4DeployRecordHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployRetryV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRetryV4DeployRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployRetryV4DeployRecordHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployRollbackV4DeployRecordHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRollbackV4DeployRecordHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployRollbackV4DeployRecordHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployPassV4ManualCheckHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployPassV4ManualCheckHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployPassV4ManualCheckHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployRefuseV4ManualCheckHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployRefuseV4ManualCheckHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployRefuseV4ManualCheckHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListAppHostGroupsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListAppHostGroupsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListAppHostGroupsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListHostGroupsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListHostGroupsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetHostGroupHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetHostGroupHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetHostGroupHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListHostGroupHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListHostGroupHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListHostGroupEnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListHostGroupEnvironmentsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListHostGroupEnvironmentsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployCreateEnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateEnvironmentHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployCreateEnvironmentHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployCreateApplicationHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateApplicationHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployCreateApplicationHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployModifyApplicationHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployModifyApplicationHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployModifyApplicationHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployCreateTaskByTemplateHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployCreateTaskByTemplateHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployCreateTaskByTemplateHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListEnvironmentHostsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListEnvironmentHostsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListEnvironmentHostsHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployImportHostsToEnvironmentHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployImportHostsToEnvironmentHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployImportHostsToEnvironmentHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListEnvironmentsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListEnvironmentsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListEnvironmentsHandler(deployClient)(input);
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

export function createSessionAwareDeployGetDeploySourceDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetDeploySourceDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetDeploySourceDetailHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployGetTemplateDetailHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetTemplateDetailHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetTemplateDetailHandler(deployClient)(input);
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

export function createSessionAwareDeployGetRuntimeVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployGetRuntimeVariablesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployGetRuntimeVariablesHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListVariablesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListVariablesHandler(deployClient)(input);
  };
}

export function createSessionAwareDeployListVariableHistoryHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListVariableHistoryHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListVariableHistoryHandler(deployClient)(input);
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

export function createSessionAwareDeployQueryVariablesHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployQueryVariablesHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployQueryVariablesHandler(deployClient)(input);
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

export function createSessionAwareDeployListSystemConfigsHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createDeployListSystemConfigsHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const deployClient =
      injectedClient ?? buildClientsForSession(store, extra.sessionId).deployClient;
    return createDeployListSystemConfigsHandler(deployClient)(input);
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

export function createSessionAwareBuildAppendJobStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildAppendJobStepHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildAppendJobStepHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildAppendReleaseUploadStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildAppendReleaseUploadStepHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildAppendReleaseUploadStepHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildConfigureReleaseUploadStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildConfigureReleaseUploadStepHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildConfigureReleaseUploadStepHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildPrepareNodeRuntimeBundleHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildPrepareNodeRuntimeBundleHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildPrepareNodeRuntimeBundleHandler(buildClient)(input);
  };
}

export function createSessionAwareBuildPrepareDeployableNodeAppHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildPrepareDeployableNodeAppHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;
    return createBuildPrepareDeployableNodeAppHandler(buildClient)(input);
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

export function createSessionAwareBuildUpdateJobStepHandler(
  store: SessionCredentialStore,
  injectedClient?: Parameters<typeof createBuildUpdateJobStepHandler>[0]
) {
  return async (input: unknown, extra: SessionToolExtra) => {
    const buildClient = injectedClient ?? buildClientsForSession(store, extra.sessionId).buildClient;

    return createBuildUpdateJobStepHandler(buildClient)(input);
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
  httpAuthRuntimeConfig =
    options.mode === "http"
      ? {
          repository: options.authRepository,
          masterKey: options.authMasterKey
        }
      : {};

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
          artifactBaseUrl: options.config.artifactBaseUrl
        })
      : undefined;

  if (options.mode === "http") {
    server.registerTool(
      "auth_configure_session",
      {
        title: "auth_configure_session",
        description:
          "Configure Huawei Cloud credentials for the current MCP session. Standard CodeArts regions only need access_key, secret_key, and region; *_base_url fields are optional overrides.",
        inputSchema: configureSessionInputSchema
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

    if (toolName === "build_append_job_step") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Append a new step to a CodeArts Build job",
          inputSchema: buildAppendJobStepInput
        },
        options.mode === "http"
          ? createSessionAwareBuildAppendJobStepHandler(options.sessionStore)
          : createBuildAppendJobStepHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_append_release_upload_step") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Append the official release repository upload step to a CodeArts Build job",
          inputSchema: buildAppendReleaseUploadStepInput
        },
        options.mode === "http"
          ? createSessionAwareBuildAppendReleaseUploadStepHandler(options.sessionStore)
          : createBuildAppendReleaseUploadStepHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_configure_release_upload_step") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Configure an existing release repository upload step in a CodeArts Build job",
          inputSchema: buildConfigureReleaseUploadStepInput
        },
        options.mode === "http"
          ? createSessionAwareBuildConfigureReleaseUploadStepHandler(options.sessionStore)
          : createBuildConfigureReleaseUploadStepHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_prepare_node_runtime_bundle") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Prepare a Node runtime bundle by appending packaging commands to a build step",
          inputSchema: buildPrepareNodeRuntimeBundleInput
        },
        options.mode === "http"
          ? createSessionAwareBuildPrepareNodeRuntimeBundleHandler(options.sessionStore)
          : createBuildPrepareNodeRuntimeBundleHandler(stdioClients!.buildClient)
      );
      continue;
    }

    if (toolName === "build_prepare_deployable_node_app") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Prepare a single-file deployable Node app by appending bundling commands to a build step",
          inputSchema: buildPrepareDeployableNodeAppInput
        },
        options.mode === "http"
          ? createSessionAwareBuildPrepareDeployableNodeAppHandler(options.sessionStore)
          : createBuildPrepareDeployableNodeAppHandler(stdioClients!.buildClient)
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

    if (toolName === "build_update_job_step") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Update CodeArts Build job step image or command",
          inputSchema: buildUpdateJobStepInput
        },
        options.mode === "http"
          ? createSessionAwareBuildUpdateJobStepHandler(options.sessionStore)
          : createBuildUpdateJobStepHandler(stdioClients!.buildClient)
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

    if (toolName === "deploy_list_v4_applications") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 applications",
          inputSchema: deployListV4ApplicationsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4ApplicationsHandler(options.sessionStore)
          : createDeployListV4ApplicationsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_clusters") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 clusters",
          inputSchema: deployListV4ClustersInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4ClustersHandler(options.sessionStore)
          : createDeployListV4ClustersHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_cluster_count") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 cluster counts",
          inputSchema: deployGetV4ClusterCountInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4ClusterCountHandler(options.sessionStore)
          : createDeployGetV4ClusterCountHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_cluster") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 cluster detail",
          inputSchema: deployGetV4ClusterInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4ClusterHandler(options.sessionStore)
          : createDeployGetV4ClusterHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_delete_v4_cluster_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Delete hosts from a CodeArts Deploy v4 cluster",
          inputSchema: deployDeleteV4ClusterHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployDeleteV4ClusterHostsHandler(options.sessionStore)
          : createDeployDeleteV4ClusterHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_cluster_host") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 cluster host detail",
          inputSchema: deployGetV4ClusterHostInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4ClusterHostHandler(options.sessionStore)
          : createDeployGetV4ClusterHostHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_cluster_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 cluster hosts",
          inputSchema: deployListV4ClusterHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4ClusterHostsHandler(options.sessionStore)
          : createDeployListV4ClusterHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_environment") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 environment detail",
          inputSchema: deployGetV4EnvironmentInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4EnvironmentHandler(options.sessionStore)
          : createDeployGetV4EnvironmentHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_environment_resource_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 environment resource detail",
          inputSchema: deployGetV4EnvironmentResourceDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4EnvironmentResourceDetailHandler(options.sessionStore)
          : createDeployGetV4EnvironmentResourceDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_environment_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 environment hosts",
          inputSchema: deployListV4EnvironmentHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4EnvironmentHostsHandler(options.sessionStore)
          : createDeployListV4EnvironmentHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_add_v4_environment_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Add hosts into a CodeArts Deploy v4 environment",
          inputSchema: deployAddV4EnvironmentHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployAddV4EnvironmentHostsHandler(options.sessionStore)
          : createDeployAddV4EnvironmentHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_delete_v4_environment_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Delete hosts from a CodeArts Deploy v4 environment",
          inputSchema: deployDeleteV4EnvironmentHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployDeleteV4EnvironmentHostsHandler(options.sessionStore)
          : createDeployDeleteV4EnvironmentHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_environments") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 environments",
          inputSchema: deployListV4EnvironmentsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4EnvironmentsHandler(options.sessionStore)
          : createDeployListV4EnvironmentsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_environment_applications") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 applications under an environment",
          inputSchema: deployListV4EnvironmentApplicationsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4EnvironmentApplicationsHandler(options.sessionStore)
          : createDeployListV4EnvironmentApplicationsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_deployment_units") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy deployment units for an application",
          inputSchema: deployListDeploymentUnitsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListDeploymentUnitsHandler(options.sessionStore)
          : createDeployListDeploymentUnitsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_orchestrations") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 orchestrations",
          inputSchema: deployListV4OrchestrationsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4OrchestrationsHandler(options.sessionStore)
          : createDeployListV4OrchestrationsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_v4_deploy_records") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy v4 deploy records",
          inputSchema: deployListV4DeployRecordsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListV4DeployRecordsHandler(options.sessionStore)
          : createDeployListV4DeployRecordsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_app_host_groups") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy host groups available to an application",
          inputSchema: deployListAppHostGroupsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListAppHostGroupsHandler(options.sessionStore)
          : createDeployListAppHostGroupsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_host_groups") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy host groups",
          inputSchema: deployListHostGroupsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListHostGroupsHandler(options.sessionStore)
          : createDeployListHostGroupsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_host_group") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy host group detail",
          inputSchema: deployGetHostGroupInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetHostGroupHandler(options.sessionStore)
          : createDeployGetHostGroupHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_host_group_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy hosts in a host group",
          inputSchema: deployListHostGroupHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListHostGroupHostsHandler(options.sessionStore)
          : createDeployListHostGroupHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_host_group_environments") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy environments linked to a host group",
          inputSchema: deployListHostGroupEnvironmentsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListHostGroupEnvironmentsHandler(options.sessionStore)
          : createDeployListHostGroupEnvironmentsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_create_environment") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Deploy environment",
          inputSchema: deployCreateEnvironmentInput
        },
        options.mode === "http"
          ? createSessionAwareDeployCreateEnvironmentHandler(options.sessionStore)
          : createDeployCreateEnvironmentHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_create_application") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Deploy application",
          inputSchema: deployCreateApplicationInput
        },
        options.mode === "http"
          ? createSessionAwareDeployCreateApplicationHandler(options.sessionStore)
          : createDeployCreateApplicationHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_modify_application") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Modify CodeArts Deploy application",
          inputSchema: deployModifyApplicationInput
        },
        options.mode === "http"
          ? createSessionAwareDeployModifyApplicationHandler(options.sessionStore)
          : createDeployModifyApplicationHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_create_task_by_template") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Create CodeArts Deploy task from template",
          inputSchema: deployCreateTaskByTemplateInput
        },
        options.mode === "http"
          ? createSessionAwareDeployCreateTaskByTemplateHandler(options.sessionStore)
          : createDeployCreateTaskByTemplateHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_environment_hosts") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy hosts in an environment",
          inputSchema: deployListEnvironmentHostsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListEnvironmentHostsHandler(options.sessionStore)
          : createDeployListEnvironmentHostsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_import_hosts_to_environment") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Import hosts into a CodeArts Deploy environment",
          inputSchema: deployImportHostsToEnvironmentInput
        },
        options.mode === "http"
          ? createSessionAwareDeployImportHostsToEnvironmentHandler(options.sessionStore)
          : createDeployImportHostsToEnvironmentHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_environments") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy application environments",
          inputSchema: deployListEnvironmentsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListEnvironmentsHandler(options.sessionStore)
          : createDeployListEnvironmentsHandler(stdioClients!.deployClient)
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

    if (toolName === "deploy_get_deploy_source_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy task source detail",
          inputSchema: deployGetDeploySourceDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetDeploySourceDetailHandler(options.sessionStore)
          : createDeployGetDeploySourceDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_template_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy template detail",
          inputSchema: deployGetTemplateDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetTemplateDetailHandler(options.sessionStore)
          : createDeployGetTemplateDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_last_record_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 orchestration last record detail",
          inputSchema: deployGetLastRecordDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetLastRecordDetailHandler(options.sessionStore)
          : createDeployGetLastRecordDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_deploy_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 deploy record detail",
          inputSchema: deployGetV4DeployRecordInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4DeployRecordHandler(options.sessionStore)
          : createDeployGetV4DeployRecordHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_deploy_record_step_detail") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 deploy record step detail",
          inputSchema: deployGetV4DeployRecordStepDetailInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4DeployRecordStepDetailHandler(options.sessionStore)
          : createDeployGetV4DeployRecordStepDetailHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_get_v4_deploy_record_step_logs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy v4 deploy record step logs",
          inputSchema: deployGetV4DeployRecordStepLogsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetV4DeployRecordStepLogsHandler(options.sessionStore)
          : createDeployGetV4DeployRecordStepLogsHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_cancel_v4_deploy_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Cancel CodeArts Deploy v4 deploy record",
          inputSchema: deployCancelV4DeployRecordInput
        },
        options.mode === "http"
          ? createSessionAwareDeployCancelV4DeployRecordHandler(options.sessionStore)
          : createDeployCancelV4DeployRecordHandler(stdioClients!.deployClient)
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

    if (toolName === "deploy_get_runtime_variables") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Get CodeArts Deploy runtime variables",
          inputSchema: deployGetRuntimeVariablesInput
        },
        options.mode === "http"
          ? createSessionAwareDeployGetRuntimeVariablesHandler(options.sessionStore)
          : createDeployGetRuntimeVariablesHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_variables") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy variables by scope",
          inputSchema: deployListVariablesInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListVariablesHandler(options.sessionStore)
          : createDeployListVariablesHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_list_variable_history") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy variable history by scope",
          inputSchema: deployListVariableHistoryInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListVariableHistoryHandler(options.sessionStore)
          : createDeployListVariableHistoryHandler(stdioClients!.deployClient)
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

    if (toolName === "deploy_query_variables") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Query CodeArts Deploy variables by scope",
          inputSchema: deployQueryVariablesInput
        },
        options.mode === "http"
          ? createSessionAwareDeployQueryVariablesHandler(options.sessionStore)
          : createDeployQueryVariablesHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_pass_v4_manual_check") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Pass CodeArts Deploy v4 manual check step",
          inputSchema: deployPassV4ManualCheckInput
        },
        options.mode === "http"
          ? createSessionAwareDeployPassV4ManualCheckHandler(options.sessionStore)
          : createDeployPassV4ManualCheckHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_refuse_v4_manual_check") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Refuse CodeArts Deploy v4 manual check step",
          inputSchema: deployRefuseV4ManualCheckInput
        },
        options.mode === "http"
          ? createSessionAwareDeployRefuseV4ManualCheckHandler(options.sessionStore)
          : createDeployRefuseV4ManualCheckHandler(stdioClients!.deployClient)
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

    if (toolName === "deploy_list_system_configs") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "List CodeArts Deploy system config keys",
          inputSchema: deployListSystemConfigsInput
        },
        options.mode === "http"
          ? createSessionAwareDeployListSystemConfigsHandler(options.sessionStore)
          : createDeployListSystemConfigsHandler(stdioClients!.deployClient)
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

    if (toolName === "deploy_rollback_v4_deploy_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Rollback CodeArts Deploy v4 deploy record",
          inputSchema: deployRollbackV4DeployRecordInput
        },
        options.mode === "http"
          ? createSessionAwareDeployRollbackV4DeployRecordHandler(options.sessionStore)
          : createDeployRollbackV4DeployRecordHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_rerun_v4_deploy_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Rerun CodeArts Deploy v4 deploy record",
          inputSchema: deployRerunV4DeployRecordInput
        },
        options.mode === "http"
          ? createSessionAwareDeployRerunV4DeployRecordHandler(options.sessionStore)
          : createDeployRerunV4DeployRecordHandler(stdioClients!.deployClient)
      );
      continue;
    }

    if (toolName === "deploy_retry_v4_deploy_record") {
      server.registerTool(
        toolName,
        {
          title: toolName,
          description: "Retry CodeArts Deploy v4 deploy record",
          inputSchema: deployRetryV4DeployRecordInput
        },
        options.mode === "http"
          ? createSessionAwareDeployRetryV4DeployRecordHandler(options.sessionStore)
          : createDeployRetryV4DeployRecordHandler(stdioClients!.deployClient)
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
