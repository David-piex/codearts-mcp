import { describe, expect, it } from "vitest";
import {
  createSessionAwareArtifactGetFileHandler,
  createSessionAwareArtifactGetDownloadUrlHandler,
  createSessionAwareArtifactGetRepositoryHandler,
  createSessionAwareArtifactListBuildArchivesHandler,
  createSessionAwareArtifactDeleteFileHandler,
  createSessionAwareArtifactListFilesHandler,
  createSessionAwareArtifactListRepositoriesHandler,
  createSessionAwareArtifactSearchArtifactsHandler,
  createSessionAwareArtifactShowAuditHandler,
  createSessionAwareBuildGetRecordHandler,
  createSessionAwareBuildGetRealTimeLogHandler,
  createSessionAwareBuildGetRecordScriptHandler,
  createSessionAwareBuildGetHistoryDetailsHandler,
  createSessionAwareBuildGetJobHandler,
  createSessionAwareBuildGetErrorLogHandler,
  createSessionAwareBuildGetFullStagesHandler,
  createSessionAwareBuildGetInfoRecordHandler,
  createSessionAwareBuildListBuildParametersHandler,
  createSessionAwareBuildListJobsHandler,
  createSessionAwareBuildListRecordsHandler,
  createSessionAwareBuildRunJobHandler,
  createSessionAwareBuildStopJobHandler,
  createSessionAwareCheckCreateTaskHandler,
  createSessionAwareCheckGetMetricsHandler,
  createSessionAwareCheckGetTaskHandler,
  createSessionAwareCheckListRulesetsHandler,
  createSessionAwareCheckListTaskIssuesHandler,
  createSessionAwareCheckListTasksHandler,
  createSessionAwareCheckRunTaskHandler,
  createSessionAwareCheckStopTaskHandler,
  createSessionAwareDeployGetAppHandler,
  createSessionAwareDeployGetTaskHandler,
  createSessionAwareDeployListAppOperationsLogHandler,
  createSessionAwareDeployGetAppLogHandler,
  createSessionAwareDeployGetExecutionParamsHandler,
  createSessionAwareDeployGetHistoryDetailHandler,
  createSessionAwareDeployGetStatusHandler,
  createSessionAwareDeployListAppsHandler,
  createSessionAwareDeployListTasksHandler,
  createSessionAwareDeployListHistoriesHandler,
  createSessionAwareDeployRollbackAppHandler,
  createSessionAwareDeployStopAppHandler,
  createSessionAwareDeployStartAppHandler,
  createSessionAwareGovernCreateTaskHandler,
  createSessionAwareGovernCreateTaskMultipartFileHandler,
  createSessionAwareGovernAlterQuotaInfoHandler,
  createSessionAwareGovernCreateExcelReportHandler,
  createSessionAwareGovernCreatePdfReportHandler,
  createSessionAwareGovernDeleteTaskHandler,
  createSessionAwareGovernDownloadExcelReportHandler,
  createSessionAwareGovernDownloadPdfReportHandler,
  createSessionAwareGovernGetExcelReportStatusHandler,
  createSessionAwareGovernGetInfoLeakSummaryHandler,
  createSessionAwareGovernGetOpenSourceReportHandler,
  createSessionAwareGovernGetOpenSourceSummaryHandler,
  createSessionAwareGovernGetOsiItemDetailHandler,
  createSessionAwareGovernGetOsiStatisticsHandler,
  createSessionAwareGovernGetPdfReportStatusHandler,
  createSessionAwareGovernGetQuotaInfoHandler,
  createSessionAwareGovernGetSecCompileSummaryHandler,
  createSessionAwareGovernGetSecConfigSummaryHandler,
  createSessionAwareGovernNotifyTaskMultipartFileHandler,
  createSessionAwareGovernStopTaskHandler,
  createSessionAwareGovernUploadTaskMultipartFileHandler,
  createSessionAwareGovernGetUserInfoHandler,
  createSessionAwareGovernGetVulnInfoHandler,
  createSessionAwareGovernListOsiItemNamesHandler,
  createSessionAwareGovernListOsiItemVersionsHandler,
  createSessionAwareGovernListOsiItemVulnsHandler,
  createSessionAwareGovernListSbcVulnMapHandler,
  createSessionAwareGovernGetTaskStatusHandler,
  createSessionAwareInspectorCreateDomainHandler,
  createSessionAwareInspectorGetReportStatusHandler,
  createSessionAwareInspectorGetTaskHandler,
  createSessionAwareInspectorListBusinessRisksHandler,
  createSessionAwareInspectorListDomainsHandler,
  createSessionAwareInspectorListPortsHandler,
  createSessionAwareInspectorListResultsHandler,
  createSessionAwareInspectorListTaskHistoriesHandler,
  createSessionAwarePerfTestGetProjectHandler,
  createSessionAwarePerfTestGetReportHandler,
  createSessionAwarePerfTestGetTaskHandler,
  createSessionAwarePerfTestListLatestRunsHandler,
  createSessionAwarePerfTestListOfflineReportsHandler,
  createSessionAwarePerfTestListProjectsHandler,
  createSessionAwarePerfTestListTaskCasesHandler,
  createSessionAwarePerfTestListTasksHandler,
  createSessionAwarePerfTestListVariablesHandler,
  createSessionAwarePipelineApproveRunHandler,
  createSessionAwarePipelineListArtifactsHandler,
  createSessionAwarePipelineListTemplatesHandler,
  createSessionAwarePipelineGetPipelineHandler,
  createSessionAwarePipelineGetRunHandler,
  createSessionAwarePipelineGetRunDetailHandler,
  createSessionAwarePipelineGetStepOutputsHandler,
  createSessionAwarePipelineListHandler,
  createSessionAwarePipelineRejectRunHandler,
  createSessionAwarePipelineRetryRunHandler,
  createSessionAwarePipelineRunPipelineHandler,
  createSessionAwarePipelineStopRunHandler,
  createSessionAwarePipelineRunsHandler,
  createSessionAwareRepoGetCommitHandler,
  createSessionAwareRepoCreateMergeRequestHandler,
  createSessionAwareRepoCloseMergeRequestHandler,
  createSessionAwareRepoCreateMergeRequestDiscussionHandler,
  createSessionAwareRepoGetFileHandler,
  createSessionAwareRepoGetMergeRequestHandler,
  createSessionAwareRepoGetRepositoryHandler,
  createSessionAwareRepoListMergeRequestsHandler,
  createSessionAwareRepoListMergeRequestChangesHandler,
  createSessionAwareRepoListMergeRequestDiscussionsHandler,
  createSessionAwareRepoMergeMergeRequestHandler,
  createSessionAwareRepoListProtectedBranchesHandler,
  createSessionAwareRepoListRepositoryLabelsHandler,
  createSessionAwareRepoCreateTagHandler,
  createSessionAwareRepoDeleteTagHandler,
  createSessionAwareRepoListTagsHandler,
  createSessionAwareRepoListEventsHandler,
  createSessionAwareRepoListCommitsHandler,
  createSessionAwareRepoListBranchesHandler,
  createSessionAwareRepoReviewMergeRequestHandler,
  createSessionAwareReqCreateWorkItemHandler,
  createSessionAwareReqGetProjectHandler,
  createSessionAwareRepoRepositoriesHandler,
  createSessionAwareReqGetWorkItemHandler,
  createSessionAwareReqListIterationsHandler,
  createSessionAwareReqListProjectMembersHandler,
  createSessionAwareReqUpdateWorkItemHandler,
  createSessionAwareReqWorkItemsHandler,
  createSessionAwareReqProjectsHandler,
  createSessionAwareTestPlanGetCaseHandler,
  createSessionAwareTestPlanGetPlanHandler,
  createSessionAwareTestPlanListCasesHandler,
  createSessionAwareTestPlanListIssuesHandler,
  createSessionAwareTestPlanListPlansHandler,
  createSessionAwareTestPlanListRunsHandler,
  createSessionAwareTestPlanRunCasesHandler
} from "../../src/server/create-server.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session-scoped live tools", () => {
  it("returns auth_error when req live tool has no configured session", async () => {
    const store = createSessionCredentialStore();
    const handler = createSessionAwareReqProjectsHandler(store);

    await expect(handler({ page: 1, page_size: 20 }, { sessionId: "session-a" })).rejects.toMatchObject({
      category: "auth_error"
    });
  });

  it("builds a repo handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoRepositoriesHandler(store, {
      listRepositories: async () => ({
        repositories: [{ id: 1, name: "repo-a" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].name).toBe("repo-a");
  });

  it("builds a repo file handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoGetFileHandler(store, {
      getFile: async () => ({
        file_path: "src/index.ts",
        branch_name: "main",
        content: "console.log('ok');"
      })
    });
    const result = await handler(
      { repository_id: "repo-1", file_path: "src/index.ts", branch: "main" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.path).toBe("src/index.ts");
  });

  it("builds a repo commits handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListCommitsHandler(store, {
      listCommits: async () => ({
        commits: [{ id: "abc123", short_id: "abc123", title: "feat", author_name: "Yao" }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "repo-1", page: 1, page_size: 20, ref_name: "main" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("abc123");
  });

  it("builds a repo get commit handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoGetCommitHandler(store, {
      getCommit: async () => ({
        id: "abc123",
        short_id: "abc123",
        title: "feat",
        author_name: "Yao",
        message: "feat"
      })
    });
    const result = await handler(
      { repository_id: "repo-1", commit_sha: "abc123" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("abc123");
  });

  it("builds a repo branches handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListBranchesHandler(store, {
      listBranches: async () => ({
        branches: [{ name: "main", commit: { id: "abc123" }, protected: true }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "repo-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].name).toBe("main");
  });

  it("builds a pipeline handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineRunsHandler(store, {
      listRuns: async () => ({
        records: [{ pipeline_run_id: "run-1", status: "RUNNING" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("run-1");
  });

  it("builds a req work items handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqWorkItemsHandler(store, {
      listWorkItems: async () => ({
        work_items: [{ id: 1, subject: "SSO", status: { name: "Doing" }, tracker_name: "Story" }],
        total: 1
      })
    });
    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].title).toBe("SSO");
  });

  it("builds a govern task status handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetTaskStatusHandler(store, {
      getTaskStatus: async () => ({
        id: "task-1",
        status: "R"
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1" });
  });

  it("builds a govern create task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernCreateTaskHandler(store, {
      createTask: async () => ({
        id: "task-1",
        file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
        file_name: "demo.bin",
        file_size: 100
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
        file_name: "demo.bin",
        file_size: 100,
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", executed: true });
  });

  it("builds a govern alter quota handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernAlterQuotaInfoHandler(store, {
      alterQuotaInfo: async () => ({ order_id: "order-1" })
    });
    const result = await handler(
      {
        project_id: "project-1",
        resource_id: "resource-1",
        change_mode: 1,
        product_info: [{ resource_size: 5, resource_size_measure_id: 17 }],
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ orderId: "order-1", executed: true });
  });

  it("builds a govern create multipart task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernCreateTaskMultipartFileHandler(store, {
      createMultipartTask: async () => ({
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ uploadId: "upload-1", executed: true });
  });

  it("builds a govern create pdf report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernCreatePdfReportHandler(store, {
      createPdfReport: async () => ({ id: "task-1", result: "success" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1", dry_run: false }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", executed: true });
  });

  it("builds a govern get pdf report status handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernGetPdfReportStatusHandler(store, {
      getPdfReportStatus: async () => ({ id: "task-1", status: "R" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1" }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", status: "R" });
  });

  it("builds a govern download pdf report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernDownloadPdfReportHandler(store, {
      downloadPdfReport: async () => ({ body: new Uint8Array([1]), content_type: "application/pdf", file_name: "report.pdf" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1", local_output: "D:/tmp/report.pdf", dry_run: true }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ localOutput: "D:/tmp/report.pdf", executed: false });
  });

  it("builds a govern create excel report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernCreateExcelReportHandler(store, {
      createExcelReport: async () => ({ id: "task-1", result: "success" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1", dry_run: false }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", executed: true });
  });

  it("builds a govern get excel report status handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernGetExcelReportStatusHandler(store, {
      getExcelReportStatus: async () => ({ id: "task-1", status: "R" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1" }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", status: "R" });
  });

  it("builds a govern download excel report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernDownloadExcelReportHandler(store, {
      downloadExcelReport: async () => ({ body: new Uint8Array([1]), content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", file_name: "report.xlsx" })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1", local_output: "D:/tmp/report.xlsx", dry_run: true }, { sessionId: "session-a" });
    expect(result.structuredContent.item).toMatchObject({ localOutput: "D:/tmp/report.xlsx", executed: false });
  });

  it("builds a govern info leak summary handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetInfoLeakSummaryHandler(store, {
      getInfoLeakSummary: async () => ({
        file_count: 5,
        items: [{ name: "硬编码密码", result: 2 }]
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ fileCount: 5 });
  });

  it("builds a govern osi statistics handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetOsiStatisticsHandler(store, {
      getOsiStatistics: async () => ({
        total: {
          software: 10089
        }
      })
    });
    const result = await handler(
      { project_id: "project-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "osi-statistics", totalSoftware: 10089 });
  });

  it("builds a govern osi item names handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernListOsiItemNamesHandler(store, {
      listOsiItemNames: async () => ({
        items: [{ software_name: "OpenSSL", version_count: 4 }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 5, software_name: "openssl" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "OpenSSL", versionCount: 4 });
  });

  it("builds a govern osi item versions handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernListOsiItemVersionsHandler(store, {
      listOsiItemVersions: async () => ({
        items: [{ software_code: "code-1", software_name: "OpenSSL", software_version: "openssl-3.0.19" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 5, software_name: "openssl" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "code-1", version: "openssl-3.0.19" });
  });

  it("builds a govern osi item detail handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetOsiItemDetailHandler(store, {
      getOsiItemDetail: async () => ({
        software_code: "code-1",
        software_name: "OpenSSL",
        software_version: "openssl-3.0.19"
      })
    });
    const result = await handler(
      { project_id: "project-1", software_name: "openssl", software_version: "openssl-3.0.19" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "code-1", version: "openssl-3.0.19" });
  });

  it("builds a govern osi item vulns handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernListOsiItemVulnsHandler(store, {
      listOsiItemVulns: async () => ({
        items: [{ cve_id: "CVE-2026-0001", severity: "high", cvss_score: "7.5" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", software_name: "openssl", software_version: "openssl-3.0.19" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "CVE-2026-0001", cvssScore: "7.5" });
  });

  it("builds a govern sec compile summary handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetSecCompileSummaryHandler(store, {
      getSecCompileSummary: async () => ({
        version: "v1.0",
        all_file_nums: 9,
        items: []
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ version: "v1.0", fileCount: 9 });
  });

  it("builds a govern sec config summary handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetSecConfigSummaryHandler(store, {
      getSecConfigSummary: async () => ({
        version: "v1.0",
        items: []
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ version: "v1.0" });
  });

  it("builds a govern vuln map list handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernListSbcVulnMapHandler(store, {
      listSbcVulnMap: async () => [{ name: "openEuler:vim", cve_id: "CVE-2023-4751" }]
    });
    const result = await handler(
      { project_id: "project-1", start_time: "2023-09-04 16:00:00", end_time: "2023-09-05 00:00:00" },
      { sessionId: "session-a" }
    );
    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "CVE-2023-4751" });
  });

  it("builds a govern vuln info handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernGetVulnInfoHandler(store, {
      getVulnInfo: async () => ({ cve_id: "CVE-xxxx-xxxx", cvss_value: "7.5" })
    });
    const result = await handler(
      { project_id: "project-1", cve_id: "CVE-xxxx-xxxx" },
      { sessionId: "session-a" }
    );
    expect(result.structuredContent.item).toMatchObject({ id: "CVE-xxxx-xxxx" });
  });

  it("builds a govern user info handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1", secret_key: "sk-1", region: "cn-north-4",
      req_base_url: "https://req.example.com", repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com", check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com", deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com", artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com", updated_at: "2026-04-15T07:00:00.000Z"
    });
    const handler = createSessionAwareGovernGetUserInfoHandler(store, {
      getUserInfo: async () => ({ user_id: "user-1", white_list: true })
    });
    const result = await handler(
      { project_id: "project-1", user_id: "user-1" },
      { sessionId: "session-a" }
    );
    expect(result.structuredContent.item).toMatchObject({ id: "user-1", whiteList: true });
  });

  it("builds a govern stop task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernStopTaskHandler(store, {
      stopTask: async () => ({
        id: "task-1",
        result: "success"
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", result: "success", executed: true });
  });

  it("builds a govern delete task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernDeleteTaskHandler(store, {
      deleteTask: async () => ({
        id: "task-1",
        result: "success"
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", result: "success", executed: true });
  });

  it("builds a govern notify multipart task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernNotifyTaskMultipartFileHandler(store, {
      notifyMultipartTask: async () => ({
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ uploadId: "upload-1", executed: true });
  });

  it("builds a govern upload multipart task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernUploadTaskMultipartFileHandler(store, {
      uploadMultipartTask: async () => ({
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1",
        part_number: 1
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        file_path: "/tmp/demo.bin",
        file_name: "demo.bin",
        upload_id: "upload-1",
        part_number: 1,
        part_size: 5,
        local_file: "D:/tmp/chunk.bin",
        dry_run: true
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ uploadId: "upload-1", executed: false });
  });

  it("builds a govern summary handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetOpenSourceSummaryHandler(store, {
      getOpenSourceSummary: async () => ({
        software: { component: 12, vuln: 3, no_version: 1 },
        report_url: "https://report.example.com/1"
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ componentCount: 12 });
  });

  it("builds a govern report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetOpenSourceReportHandler(store, {
      getOpenSourceReport: async () => ({
        id: "task-1",
        report: "https://report.example.com/1",
        components: [{ name: "cglib", version: "3.3.0", vuln_num: 1, licenses: ["Apache-2.0"] }]
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ componentCount: 1 });
  });

  it("builds a govern quota handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareGovernGetQuotaInfoHandler(store, {
      getQuotaInfo: async () => ({
        package_quota: 5000,
        concurrent_task: 3,
        valid: true,
        resource_id: "quota-1"
      })
    });
    const result = await handler({ project_id: "project-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "quota-1" });
  });

  it("builds an inspector domains handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorListDomainsHandler(store, {
      listDomains: async () => ({
        total: 1,
        domains: [{ domain_id: "domain-1", domain_name: "https://example.com", auth_status: "auth" }]
      })
    });
    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "domain-1" });
  });

  it("builds an inspector create domain handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorCreateDomainHandler(store, {
      createDomain: async () => ({
        domain_id: "domain-1",
        domain_name: "https://example.com",
        alias: "main-site",
        auth_status: "unauth"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        domain_name: "https://example.com",
        alias: "main-site"
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "domain-1", executed: true });
  });

  it("builds an inspector task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorGetTaskHandler(store, {
      getTask: async () => ({
        task_id: "task-1",
        task_name: "scan-main",
        task_status: "success"
      })
    });
    const result = await handler({ project_id: "project-1", task_id: "task-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "task-1" });
  });

  it("builds an inspector task histories handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorListTaskHistoriesHandler(store, {
      listTaskHistories: async () => ({
        total: 1,
        data: [{ task_id: "task-1", task_name: "scan-main", task_status: "success" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", domain_id: "domain-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "task-1" });
  });

  it("builds an inspector results handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorListResultsHandler(store, {
      listResults: async () => ({
        total: 1,
        statistics: { middle: 1 },
        data: [{ vuln_id: "vuln-1", severity: "middle", vuln_status: "repairing" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "vuln-1" });
  });

  it("builds an inspector ports handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorListPortsHandler(store, {
      listPorts: async () => ({
        total: 1,
        data: [{ port: 22, service: "ssh", protocol: "TCP", status: "open" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "22", protocol: "TCP" });
  });

  it("builds an inspector business risks handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorListBusinessRisksHandler(store, {
      listBusinessRisks: async () => ({
        total: 1,
        data: [
          {
            risk_id: "risk-1",
            risk_type: "dead_link",
            risk_status: "repairing"
          }
        ]
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "risk-1", type: "dead_link" });
  });

  it("builds an inspector report status handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareInspectorGetReportStatusHandler(store, {
      getReportStatus: async () => ({
        task_id: "task-1",
        report_status: "generated"
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", reportStatus: "generated" });
  });

  it("builds a perftest projects handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListProjectsHandler(store, {
      listProjects: async () => ({
        total: 1,
        projects: [{ id: 1, name: "demo" }]
      })
    });
    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "1" });
  });

  it("builds a perftest get project handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestGetProjectHandler(store, {
      getProject: async () => ({
        id: 1,
        name: "demo",
        group: "tenant-1"
      })
    });
    const result = await handler({ project_id: "project-1", test_suite_id: 1 }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "1", group: "tenant-1" });
  });

  it("builds a perftest list tasks handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListTasksHandler(store, {
      listTasks: async () => ({
        total: 1,
        tasks: [{ id: 11, name: "task-a", bench_concurrent: 100 }]
      })
    });
    const result = await handler(
      { project_id: "project-1", test_suite_id: 1, page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "11", benchConcurrent: 100 });
  });

  it("builds a perftest get task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestGetTaskHandler(store, {
      getTask: async () => ({
        id: 11,
        name: "task-a",
        run_status: 2,
        related_temp_running_data: []
      })
    });
    const result = await handler({ project_id: "project-1", task_id: 11 }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "11", runStatus: 2 });
  });

  it("builds a perftest list variables handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListVariablesHandler(store, {
      listVariables: async () => ({
        variable_list: [{ id: 21, name: "var1", variable_type: 2, variable: ["a"] }]
      })
    });
    const result = await handler(
      { project_id: "project-1", test_suite_id: 1, variable_type: 2 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "21", name: "var1" });
  });

  it("builds a perftest task cases handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListTaskCasesHandler(store, {
      getTask: async () => ({
        case_list: [{ case_id: 7, case_name: "login", case_uri: "/cases/7", temp_id: 1 }]
      })
    });
    const result = await handler({ project_id: "project-1", task_id: 11 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "7", name: "login" });
  });

  it("builds a perftest latest runs handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListLatestRunsHandler(store, {
      getTask: async () => ({
        related_temp_running_data: [{ task_run_info_id: 99, related_temp_running_id: 101 }]
      })
    });
    const result = await handler({ project_id: "project-1", task_id: 11 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "99", taskRunInfoId: 99 });
  });

  it("builds a perftest offline reports handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestListOfflineReportsHandler(store, {
      listOfflineReports: async () => ({
        log_list: [{ run_id: 101, name: "run-1", run_type: 0 }]
      })
    });
    const result = await handler({ project_id: "project-1", task_id: 11 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "101", name: "run-1" });
  });

  it("builds a perftest report handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      govern_base_url: "https://govern.example.com",
      inspector_base_url: "https://inspector.example.com",
      perftest_base_url: "https://perftest.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePerfTestGetReportHandler(store, {
      getReport: async () => ({
        detail: {
          performance: { caseUri: "/cases/7", alias: "login", avgTps: 10 },
          customTransactions: [{ awId: "tx-1", alias: "api-login", avgTps: 6 }],
          detailDatas: [{ awId: "aw-1", alias: "login-api", avgTps: 5 }]
        }
      })
    });
    const result = await handler(
      { project_id: "project-1", task_run_id: 101, case_run_id: 201, brokens_limit_count: 60 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({
      id: "/cases/7",
      customTransactionCount: 1,
      detailRowCount: 1
    });
  });

  it("builds a req get project handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqGetProjectHandler(store, {
      getProject: async () => ({
        project_id: "p-1",
        name: "Alpha",
        project_num_id: 7,
        description: "Core"
      })
    });
    const result = await handler({ project_id: "p-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("p-1");
  });

  it("builds a req get work item handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqGetWorkItemHandler(store, {
      getWorkItem: async () => ({
        id: 1,
        subject: "SSO",
        status: { name: "Done" },
        tracker_name: "Story",
        description: "done"
      })
    });
    const result = await handler({ project_id: "p-1", work_item_id: "1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.title).toBe("SSO");
  });

  it("builds a req list iterations handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqListIterationsHandler(store, {
      listIterations: async () => ({
        iterations: [{ id: 11, name: "Sprint 1", status: "1" }],
        total: 1
      })
    });
    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].name).toBe("Sprint 1");
  });

  it("builds a req create work item handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqCreateWorkItemHandler(store, {
      createWorkItem: async () => ({
        id: 123,
        name: "Add login",
        tracker: { id: 7, name: "story" }
      })
    });
    const result = await handler(
      { project_id: "p-1", title: "Add login", work_item_type: "story", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "123" });
  });

  it("builds a req update work item handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqUpdateWorkItemHandler(store, {
      updateWorkItem: async () => ({
        id: 123,
        name: "Rename story",
        status: { id: 2, name: "Doing" }
      })
    });
    const result = await handler(
      { project_id: "p-1", work_item_id: "123", title: "Rename story", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("123");
  });

  it("builds a check tasks handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckListTasksHandler(store, {
      listTasks: async () => ({
        tasks: [{ task_id: "task-1", task_name: "gateway-main" }],
        total: 1
      })
    });
    const result = await handler({ page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("task-1");
  });

  it("builds a check get task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckGetTaskHandler(store, {
      getTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-main"
      })
    });
    const result = await handler({ task_id: "task-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("task-1");
  });

  it("builds a check create task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckCreateTaskHandler(store, {
      createTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-main",
        project_id: "project-1",
        git_url: "https://codehub.example.com/gateway.git",
        git_branch: "main",
        language: "java",
        status: "created"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        task_name: "gateway-main",
        git_url: "https://codehub.example.com/gateway.git",
        git_branch: "main",
        language: "java",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1" });
  });

  it("builds a check list rulesets handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckListRulesetsHandler(store, {
      listRulesets: async () => ({
        rulesets: [{ id: "rule-1", name: "Java General", language: "java", is_system: true }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20, language: "java" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("rule-1");
  });

  it("builds a deploy list apps handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployListAppsHandler(store, {
      listApps: async () => ({
        applications: [{ application_id: "app-1", name: "gateway-prod" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("app-1");
  });

  it("builds a deploy get app handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetAppHandler(store, {
      getApp: async () => ({
        application_id: "app-1",
        name: "gateway-prod"
      })
    });
    const result = await handler({ application_id: "app-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("app-1");
  });

  it("builds a deploy list tasks handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployListTasksHandler(store, {
      listTasks: async () => ({
        tasks: [{ task_id: "task-1", application_id: "app-1", application_name: "gateway-prod" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "task-1", applicationId: "app-1" });
  });

  it("builds a deploy get task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetTaskHandler(store, {
      getTask: async () => ({
        task_id: "task-1",
        application_id: "app-1",
        name: "gateway-prod",
        status: "available"
      })
    });
    const result = await handler({ task_id: "task-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", applicationId: "app-1" });
  });

  it("builds a deploy list app operations log handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployListAppOperationsLogHandler(store, {
      listAppOperationsLog: async () => ({
        logs: [{ operator: "yao", operator_id: "user-1", operation_type: "modify" }],
        total: 1
      })
    });
    const result = await handler(
      { app_id: "app-1", page_size: 10, page_index: 1 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ operatorId: "user-1" });
  });

  it("builds a deploy histories handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployListHistoriesHandler(store, {
      listHistories: async () => ({
        histories: [{ id: "history-1", task_id: "task-1" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", task_id: "task-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("history-1");
  });

  it("builds a deploy status handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetStatusHandler(store, {
      getStatus: async () => ({
        task_id: "task-1",
        state: "RUNNING",
        percentage: 60
      })
    });
    const result = await handler({ task_id: "task-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("task-1");
  });

  it("builds a check issues handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckListTaskIssuesHandler(store, {
      listTaskIssues: async () => ({
        issues: [{ issue_id: "issue-1", rule_name: "NullPointer" }],
        total: 1
      })
    });
    const result = await handler({ task_id: "task-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("issue-1");
  });

  it("builds a check metrics handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckGetMetricsHandler(store, {
      getMetrics: async () => ({
        task_id: "task-1",
        issues_count: 18
      })
    });
    const result = await handler({ task_id: "task-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("task-1");
  });

  it("builds a check run task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckRunTaskHandler(store, {
      runTask: async () => ({
        task_id: "task-1",
        job_id: "job-1",
        status: "running"
      })
    });
    const result = await handler({ task_id: "task-1", dry_run: false }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", jobId: "job-1" });
  });

  it("builds a check stop task handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareCheckStopTaskHandler(store, {
      stopTask: async () => ({
        task_id: "task-1",
        status: "stopped"
      })
    });
    const result = await handler({ task_id: "task-1", dry_run: false }, { sessionId: "session-a" });

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", status: "stopped" });
  });

  it("builds a deploy start app handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployStartAppHandler(store, {
      startApp: async () => ({
        task_id: "task-1",
        job_id: "job-1",
        status: "RUNNING"
      })
    });
    const result = await handler({ task_id: "task-1", dry_run: false }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("task-1");
  });

  it("builds a deploy stop app handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployStopAppHandler(store, {
      stopApp: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        status: "STOPPED"
      })
    });
    const result = await handler(
      { task_id: "task-1", record_id: "record-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "task-1", recordId: "record-1" });
  });

  it("builds a build list jobs handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildListJobsHandler(store, {
      listJobs: async () => ({
        jobs: [{ job_id: "job-1", name: "gateway-build" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("job-1");
  });

  it("builds a build get job handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetJobHandler(store, {
      getJob: async () => ({
        job_id: "job-1",
        name: "gateway-build"
      })
    });
    const result = await handler({ job_id: "job-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("job-1");
  });

  it("builds a build get record handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetRecordHandler(store, {
      getRecord: async () => ({
        record_id: "record-1",
        job_id: "job-1"
      })
    });
    const result = await handler({ record_id: "record-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("record-1");
  });

  it("builds a build list records handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildListRecordsHandler(store, {
      listRecords: async () => ({
        records: [{ record_id: "record-1", job_id: "job-1" }],
        total: 1
      })
    });
    const result = await handler({ job_id: "job-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("record-1");
  });

  it("builds a build run job handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildRunJobHandler(store, {
      runJob: async () => ({
        job_id: "job-1",
        record_id: "record-1",
        status: "RUNNING"
      })
    });
    const result = await handler({ job_id: "job-1", dry_run: false }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("job-1");
  });

  it("builds a build stop job handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildStopJobHandler(store, {
      stopJob: async () => ({
        job_id: "job-1",
        build_no: 20,
        result: true
      })
    });
    const result = await handler(
      { job_id: "job-1", build_no: 20, dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ stopped: true });
  });

  it("builds a build real-time log handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetRealTimeLogHandler(store, {
      getRealTimeLog: async () => ({
        job_id: "job-1",
        build_no: 33,
        content: "[INFO] build success",
        has_more_data: true,
        offset: 126548,
        current_offset: 121768
      })
    });
    const result = await handler(
      { job_id: "job-1", build_no: 33, offset: 0 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ hasMoreData: true });
  });

  it("builds a build history details handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetHistoryDetailsHandler(store, {
      getHistoryDetails: async () => ({
        job_id: "job-1",
        build_number: 5,
        job_name: "gateway-build",
        project_id: "project-1",
        project_name: "gateway",
        parameters: { branch: "main" },
        build_steps: [{ name: "Code CheckOut", status: "success", build_time: 8366 }]
      })
    });
    const result = await handler(
      { job_id: "job-1", build_number: 5 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ stepCount: 1 });
  });

  it("builds a build parameters handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildListBuildParametersHandler(store, {
      listBuildParameters: async () => ({
        job_id: "job-1",
        build_no: 5,
        parameters: [{ name: "branch", value: "main" }]
      })
    });
    const result = await handler(
      { job_id: "job-1", build_no: 5 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "branch" });
  });

  it("builds a build error log handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetErrorLogHandler(store, {
      getErrorLog: async () => ({
        job_name: "gateway-build",
        error_nodes: [
          {
            node_id: "114",
            step: "releasemanArtifactsUploader",
            analyzed_success: true,
            error_info: {
              error_code: "DEV.CB.0220021",
              error_message: "未找到文件,可能文件路径不对:build/*"
            }
          }
        ]
      })
    });
    const result = await handler(
      { job_id: "job-1", build_no: 5, page: 1, page_size: 10 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ errorCode: "DEV.CB.0220021" });
  });

  it("builds a build info record handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetInfoRecordHandler(store, {
      getInfoRecord: async () => ({
        number: 5,
        job_running_status: "Finished",
        state: "FAILURE",
        executor: "readyrunning"
      })
    });
    const result = await handler(
      { job_id: "job-1", build_no: 5 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ state: "FAILURE" });
  });

  it("builds a build record script handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetRecordScriptHandler(store, {
      getRecordScript: async () => ({
        record_id: "record-1",
        script: "---\nversion: '2.0'\nstages:\n  stage1: {}",
        status: "success"
      })
    });
    const result = await handler(
      { record_id: "record-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "record-1" });
  });

  it("builds a build full stages handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareBuildGetFullStagesHandler(store, {
      getFullStages: async () => ({
        record_id: "record-1",
        build_stages: {
          stage1: {
            id: "stage-1",
            status: "SUCCESS",
            display_name: "Code CheckOut",
            execution_id: "exec-1",
            sequence: 0,
            duration: 10000
          }
        }
      })
    });
    const result = await handler(
      { record_id: "record-1", cascade: true },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "stage-1" });
  });

  it("builds an artifact repositories handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactListRepositoriesHandler(store, {
      listRepositories: async () => ({
        repositories: [{ id: "repo-1", name: "libs-release" }],
        total: 1
      })
    });
    const result = await handler(
      { tenant_id: "tenant-1", project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("repo-1");
  });

  it("builds an artifact repository handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactGetRepositoryHandler(store, {
      getRepository: async () => ({
        id: "repo-1",
        name: "libs-release"
      })
    });
    const result = await handler({ repository_id: "repo-1" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.id).toBe("repo-1");
  });

  it("builds an artifact files handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactListFilesHandler(store, {
      listFiles: async () => ({
        files: [{ path: "/a.jar", name: "a.jar" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", repo_name: "libs-release", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("/a.jar");
  });

  it("builds an artifact file handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactGetFileHandler(store, {
      getFile: async () => ({
        path: "/a.jar",
        name: "a.jar"
      })
    });
    const result = await handler(
      {
        tenant_id: "tenant-1",
        project_id: "project-1",
        repo_name: "libs-release",
        path: "/a.jar",
        format: "maven2"
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("/a.jar");
  });

  it("builds an artifact build archives handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactListBuildArchivesHandler(store, {
      listBuildArchives: async () => ({
        archives: [{ id: "archive-1", name: "gateway.zip" }],
        total: 1
      })
    });
    const result = await handler({ page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("archive-1");
  });

  it("builds a test plan list handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanListPlansHandler(store, {
      listPlans: async () => ({
        plans: [{ plan_id: "plan-1", name: "Regression" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("plan-1");
  });

  it("builds a test plan get handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanGetPlanHandler(store, {
      getPlan: async () => ({
        plan_id: "plan-1",
        name: "Regression"
      })
    });
    const result = await handler(
      { project_id: "project-1", plan_id: "plan-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("plan-1");
  });

  it("builds a test plan get case handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanGetCaseHandler(store, {
      getCase: async () => ({
        case_id: "case-1",
        name: "Login should succeed",
        status: "READY",
        test_type: "MANUAL"
      })
    });
    const result = await handler(
      { project_id: "project-1", case_id: "case-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("case-1");
  });

  it("builds a test plan cases handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanListCasesHandler(store, {
      listCases: async () => ({
        cases: [{ case_id: "case-1", name: "Login should succeed" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", plan_id: "plan-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("case-1");
  });

  it("builds a test plan runs handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanListRunsHandler(store, {
      listRuns: async () => ({
        runs: [{ run_id: "run-1", name: "Regression Run" }],
        total: 1
      })
    });
    const result = await handler(
      { project_id: "project-1", plan_id: "plan-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("run-1");
  });

  it("builds a test plan run cases handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanRunCasesHandler(store, {
      runCases: async () => ({
        run_id: "run-1",
        accepted_count: 2,
        status: "RUNNING"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        execute_list: [{ case_id: "case-1" }, { case_id: "case-2" }],
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "run-1" });
  });
  it("builds a req list project members handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareReqListProjectMembersHandler(store, {
      listProjectMembers: async () => ({
        members: [{ user_id: "u-1", user_name: "yao", role_name: "Developer" }],
        total: 1
      })
    });
    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("u-1");
  });

  it("builds a repo get repository handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoGetRepositoryHandler(store, {
      getRepository: async () => ({
        id: 1001,
        name: "demo-repo",
        default_branch: "main"
      })
    });
    const result = await handler({ repository_id: "1001" }, { sessionId: "session-a" });

    expect(result.structuredContent.item?.name).toBe("demo-repo");
  });

  it("builds a repo list merge requests handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListMergeRequestsHandler(store, {
      listMergeRequests: async () => ({
        merge_requests: [{ id: 1, iid: 7, title: "MR-1", state: "opened" }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].title).toBe("MR-1");
  });

  it("builds a repo get merge request handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoGetMergeRequestHandler(store, {
      getMergeRequest: async () => ({
        id: 1,
        iid: 7,
        title: "MR-1",
        state: "opened"
      })
    });
    const result = await handler(
      { repository_id: "1001", merge_request_iid: "7" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.title).toBe("MR-1");
  });

  it("builds a repo create merge request handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoCreateMergeRequestHandler(store, {
      createMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        source_branch: "feature/login",
        target_branch: "main",
        state: "opened"
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        source_branch: "feature/login",
        target_branch: "main",
        title: "Merge feature/login into main",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "47858" });
  });

  it("builds a repo create merge request discussion handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoCreateMergeRequestDiscussionHandler(store, {
      createMergeRequestDiscussion: async () => ({
        discussion_id: "d-1",
        body: "Please check this file rename."
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        merge_request_iid: "7",
        body: "Please check this file rename.",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "d-1" });
  });

  it("builds a repo close merge request handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoCloseMergeRequestHandler(store, {
      closeMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        state: "closed"
      })
    });
    const result = await handler(
      { repository_id: "1001", merge_request_iid: "7", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ state: "closed" });
  });

  it("builds a repo list merge request changes handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListMergeRequestChangesHandler(store, {
      listMergeRequestChanges: async () => ({
        changes: [{ old_path: "src/a.ts", new_path: "src/b.ts", renamed_file: true }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", merge_request_iid: "7", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "src/b.ts" });
  });

  it("builds a repo list merge request discussions handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListMergeRequestDiscussionsHandler(store, {
      listMergeRequestDiscussions: async () => ({
        discussions: [{ discussion_id: "d-1", body: "Please check this file rename." }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", merge_request_iid: "7", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "d-1" });
  });

  it("builds a repo list protected branches handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListProtectedBranchesHandler(store, {
      listProtectedBranches: async () => ({
        branches: [{ id: 2112012342, name: "main", actions: [] }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "2112012342" });
  });

  it("builds a repo list repository labels handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListRepositoryLabelsHandler(store, {
      listRepositoryLabels: async () => ({
        labels: [{ id: 198, name: "Critical", color: "#F21313" }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "198" });
  });

  it("builds a repo create tag handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoCreateTagHandler(store, {
      createTag: async () => ({
        tag_name: "v1.0.0",
        ref: "main",
        message: "first release"
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        tag_name: "v1.0.0",
        ref: "main",
        message: "first release",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "v1.0.0" });
  });

  it("builds a repo delete tag handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoDeleteTagHandler(store, {
      deleteTag: async () => ({
        tag_name: "v1.0.0",
        deleted: true
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        tag_name: "v1.0.0",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "v1.0.0" });
  });

  it("builds a repo list tags handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListTagsHandler(store, {
      listTags: async () => ({
        tags: [{ name: "v1.0.0", is_double_name: false }],
        total: 1
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        page: 1,
        page_size: 20
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "v1.0.0" });
  });

  it("builds a repo list events handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoListEventsHandler(store, {
      listEvents: async () => ({
        events: [{ id: "evt-1", action_name: "pushed to", author_name: "yao" }],
        total: 1
      })
    });
    const result = await handler(
      { repository_id: "1001", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "evt-1" });
  });

  it("builds a repo merge merge request handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoMergeMergeRequestHandler(store, {
      mergeMergeRequest: async () => ({
        id: 47858,
        iid: 7,
        repository_id: 2111983939,
        title: "Merge feature/login into main",
        state: "merged"
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        merge_request_iid: "7",
        squash: true,
        force_merge: false,
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ state: "merged" });
  });

  it("builds a repo review merge request handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareRepoReviewMergeRequestHandler(store, {
      reviewMergeRequest: async () => ({
        reviewers: [{ id: 10311, name: "dev1", state: "approve" }]
      })
    });
    const result = await handler(
      {
        repository_id: "1001",
        merge_request_iid: "7",
        action_type: "approve",
        approver_comment: "LGTM",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ reviewerCount: 1 });
  });

  it("builds a pipeline list handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineListHandler(store, {
      listPipelines: async () => ({
        records: [{ pipeline_id: "pipe-1", name: "release-main", creator_name: "yao" }],
        total: 1
      })
    });
    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 }, { sessionId: "session-a" });

    expect(result.structuredContent.items?.[0].id).toBe("pipe-1");
  });

  it("builds a pipeline get run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineGetRunHandler(store, {
      getRun: async () => ({
        pipeline_run_id: "run-1",
        status: "SUCCEEDED",
        executor_name: "yao",
        trigger_type: "MANUAL"
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("run-1");
  });

  it("builds a pipeline list artifacts handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineListArtifactsHandler(store, {
      listArtifacts: async () => ({
        artifacts: [{ name: "gateway.jar", artifact_uri: "/com/demo/gateway.jar" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "/com/demo/gateway.jar" });
  });

  it("builds a pipeline get run detail handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineGetRunDetailHandler(store, {
      getRunDetail: async () => ({
        id: "run-1",
        pipeline_id: "pipe-1",
        status: "RUNNING",
        stages: [{ id: "stage-1" }]
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "run-1", stageCount: 1 });
  });

  it("builds a pipeline get step outputs handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineGetStepOutputsHandler(store, {
      getStepOutputs: async () => ({
        step_outputs: [{ step_run_id: "step-1", output_result: [{ key: "a", value: "1" }] }]
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1", step_run_ids: ["step-1"] },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "step-1", outputCount: 1 });
  });

  it("builds a pipeline get pipeline handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineGetPipelineHandler(store, {
      getPipeline: async () => ({
        id: "pipe-1",
        name: "release-main",
        manifest_version: "3.0"
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item?.id).toBe("pipe-1");
  });

  it("builds a pipeline run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineRunPipelineHandler(store, {
      runPipeline: async () => ({
        pipeline_run_id: "run-1"
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", branch: "main", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ pipelineRunId: "run-1" });
  });

  it("builds a pipeline stop run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineStopRunHandler(store, {
      stopRun: async () => ({
        pipeline_id: "pipe-1",
        pipeline_name: "release-main"
      })
    });
    const result = await handler(
      { pipeline_id: "pipe-1", run_id: "run-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ pipelineId: "pipe-1" });
  });

  it("builds a pipeline retry run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineRetryRunHandler(store, {
      retryRun: async () => ({
        pipeline_run_id: "run-2"
      })
    });
    const result = await handler(
      { project_id: "project-1", pipeline_id: "pipe-1", run_id: "run-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ pipelineRunId: "run-2" });
  });

  it("builds a pipeline approve run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineApproveRunHandler(store, {
      approveRun: async () => ({
        pipeline_run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        status: "PASSED"
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ status: "PASSED" });
  });

  it("builds a pipeline reject run handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineRejectRunHandler(store, {
      rejectRun: async () => ({
        success: true
      })
    });
    const result = await handler(
      {
        project_id: "project-1",
        pipeline_id: "pipe-1",
        run_id: "run-1",
        job_id: "job-1",
        step_id: "step-1",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ success: true, executed: true });
  });

  it("builds a deploy rollback app handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployRollbackAppHandler(store, {
      rollbackApp: async () => ({
        task_id: "task-1",
        record_id: "record-2",
        status: "RUNNING"
      })
    });
    const result = await handler(
      { task_id: "task-1", record_id: "record-1", dry_run: false },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ recordId: "record-2" });
  });

  it("builds a deploy get history detail handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetHistoryDetailHandler(store, {
      getHistoryDetail: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        state: "SUCCEEDED",
        percentage: 100,
        step_states: [{ step_name: "deploy", status: "SUCCEEDED" }]
      })
    });
    const result = await handler(
      { task_id: "task-1", record_id: "record-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ stepCount: 1 });
  });

  it("builds a deploy get execution params handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetExecutionParamsHandler(store, {
      getExecutionParams: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        params: [{ name: "service_port", type: "text", value: "8080" }]
      })
    });
    const result = await handler(
      { task_id: "task-1", record_id: "record-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "service_port" });
  });

  it("builds a deploy get app log handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareDeployGetAppLogHandler(store, {
      getAppLog: async () => ({
        application_id: "app-1",
        record_id: "record-1",
        status: "success",
        has_more: false,
        text: "[INFO] done",
        offset: "0",
        end_offset: "11"
      })
    });
    const result = await handler(
      { application_id: "app-1", record_id: "record-1", offset: "0", end_offset: "0" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ id: "record-1", status: "success" });
  });

  it("builds an artifact delete file handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactDeleteFileHandler(store, {
      deleteFile: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        deleted: true
      })
    });
    const result = await handler(
      {
        tenant_id: "tenant-1",
        project_id: "project-1",
        repo_name: "libs-release",
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        format: "maven2",
        dry_run: false
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({ deleted: true });
  });

  it("builds an artifact get download url handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactGetDownloadUrlHandler(store, {
      getDownloadUrl: async () => ({
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        name: "gateway-1.0.0.jar",
        download_url: "https://download.example.com/gateway.jar"
      })
    });
    const result = await handler(
      {
        tenant_id: "tenant-1",
        project_id: "project-1",
        repo_name: "libs-release",
        path: "/com/demo/gateway/1.0.0/gateway-1.0.0.jar",
        format: "maven2"
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.item).toMatchObject({
      downloadUrl: "https://download.example.com/gateway.jar"
    });
  });

  it("builds an artifact search handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactSearchArtifactsHandler(store, {
      searchArtifacts: async () => ({
        artifacts: [
          {
            name: "gateway-1.0.0.jar",
            relative_path: "/com/demo/gateway/1.0.0",
            repo: "repo-1",
            repo_name: "libs-release"
          }
        ],
        total: 1
      })
    });
    const result = await handler(
      { artifact_name: "gateway", page: 1, page_size: 10 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({
      repositoryId: "repo-1",
      name: "gateway-1.0.0.jar"
    });
  });

  it("builds an artifact show audit handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareArtifactShowAuditHandler(store, {
      showAudit: async () => ({
        records: [{ id: "audit-1", operation: "deleteArtifactFile", user_id: "user-1" }],
        total: 1
      })
    });
    const result = await handler(
      {
        tenant_id: "tenant-1",
        project_id: "project-1",
        module: "file",
        repo: "libs-release",
        page: 1,
        page_size: 20
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "audit-1", userId: "user-1" });
  });

  it("builds a pipeline list templates handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwarePipelineListTemplatesHandler(store, {
      listTemplates: async () => ({
        templates: [{ id: "tpl-1", name: "Java Maven", language: "java" }],
        total: 1
      })
    });
    const result = await handler(
      { tenant_id: "tenant-1", page: 1, page_size: 20 },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0].id).toBe("tpl-1");
  });

  it("builds a testplan list issues handler that reads credentials from the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createSessionAwareTestPlanListIssuesHandler(store, {
      listIssues: async () => ({
        issues: [
          {
            issue_id: "req-1",
            subject: "用户登录",
            tracker_name: "Epic",
            parent_issue_id: undefined
          }
        ]
      })
    });
    const result = await handler(
      { project_id: "project-1", plan_id: "plan-1" },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "req-1" });
  });
});



