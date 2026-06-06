import { describe, expect, it } from "vitest";
import {
  createTestPlanBatchSendNotificationsHandler,
  createTestPlanCreateResourceUriV4Handler,
  createTestPlanDownloadClassesHandler,
  createTestPlanGetDesignDataHandler,
  createTestPlanGetTepRegisterCodeHandler,
  createTestPlanGetTestSuitesVarListForPipelineHandler,
  createTestPlanListIpdIssuesTreeHandler,
  createTestPlanListIssuesTreeHandler,
  createTestPlanListIteratorStageCountsHandler,
  createTestPlanListTepsHandler,
  createTestPlanQueryTesthubEtlDataHandler,
  createTestPlanSearchAutotaskHandler,
  createTestPlanUpdateTepShareHandler,
  createTestPlanUpdateUserInfosHandler
} from "../../../../src/products/testplan/tools/official-misc-tools.js";

describe("official TestPlan misc handlers", () => {
  it("returns dry-run previews for write tools by default", async () => {
    const notificationHandler = createTestPlanBatchSendNotificationsHandler({
      batchSendNotifications: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const resourceUriHandler = createTestPlanCreateResourceUriV4Handler({
      createResourceUriV4: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const updateUserHandler = createTestPlanUpdateUserInfosHandler({
      updateUserInfos: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const updateTepShareHandler = createTestPlanUpdateTepShareHandler({
      updateTepShare: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      notificationHandler({
        project_id: "project-1",
        type: "casecomment",
        receivers: ["user-1"],
        comment_id: "comment-1",
        inner_text: "hello"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: batch send TestPlan notifications",
        item: { id: "comment-1", receiverCount: 1, executed: false }
      }
    });
    await expect(resourceUriHandler({ project_id: "project-1" })).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create TestPlan v4 resource URI",
        item: { id: "project-1", executed: false }
      }
    });
    await expect(
      updateUserHandler({
        project_id: "project-1",
        old_user_num: "old-user",
        new_user_num: "new-user",
        update_business_type: "mindmap",
        update_resource_id: "mindmap-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update TestPlan user infos",
        item: { id: "mindmap-1", executed: false }
      }
    });
    await expect(
      updateTepShareHandler({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        isShare: true
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update TestPlan TEP share setting",
        item: { id: "tenant-1", isShare: true, executed: false }
      }
    });
  });

  it("maps read download metadata and executed write results", async () => {
    const downloadHandler = createTestPlanDownloadClassesHandler({
      downloadClasses: async () => ({
        value: "ok",
        raw: { status: "success", result: "ok" }
      })
    });
    const resourceUriHandler = createTestPlanCreateResourceUriV4Handler({
      createResourceUriV4: async () => ({
        value: "v902000109n477f8",
        raw: { value: "v902000109n477f8" }
      })
    });
    const updateTepShareHandler = createTestPlanUpdateTepShareHandler({
      updateTepShare: async () => ({
        value: "ok",
        raw: { status: "success", result: "ok" }
      })
    });
    const registerCodeHandler = createTestPlanGetTepRegisterCodeHandler({
      getTepRegisterCode: async () => ({
        raw: { code: "tep-register-code" }
      })
    });
    const listTepsHandler = createTestPlanListTepsHandler({
      listTeps: async () => ({
        teps: [{ id: "tep-1", name: "tep-one" }],
        total: 1,
        status: "success"
      })
    });
    const designDataHandler = createTestPlanGetDesignDataHandler({
      getDesignData: async () => ({
        raw: { variableGroupID: "group-1", testcaseId: "case-1" }
      })
    });
    const pipelineVarsHandler = createTestPlanGetTestSuitesVarListForPipelineHandler({
      getTestSuitesVarListForPipeline: async () => ({
        raw: { suiteVars: [{ id: "var-1", name: "base_url" }] }
      })
    });

    await expect(
      downloadHandler({ project_id: "project-1", testcase_ids: ["case-1"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan classes download metadata",
        item: { id: "case-1", value: "ok" }
      }
    });
    await expect(
      resourceUriHandler({ project_id: "project-1", dry_run: false })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Created TestPlan v4 resource URI v902000109n477f8",
        item: { id: "v902000109n477f8", value: "v902000109n477f8", executed: true }
      }
    });
    await expect(
      updateTepShareHandler({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        isShare: false,
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Updated TestPlan TEP share setting",
        item: { id: "tenant-1", value: "ok", executed: true }
      }
    });
    await expect(
      registerCodeHandler({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan TEP register code",
        item: { id: "tenant-1", userName: "alice" }
      }
    });
    await expect(
      listTepsHandler({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TEP executors found",
        items: [{ id: "tep-1", name: "tep-one" }]
      }
    });
    await expect(
      designDataHandler({
        project_id: "project-1",
        x_auth_token: "token-1",
        testcaseId: "case-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan design data",
        item: { id: "case-1", projectId: "project-1" }
      }
    });
    await expect(
      pipelineVarsHandler({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        body: { suiteIds: ["suite-1"] }
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan pipeline test suite variables",
        item: { id: "service-1", testServiceId: "service-1" }
      }
    });
  });

  it("maps official autotask, issues tree, stage count, and ETL handlers", async () => {
    const searchAutotaskHandler = createTestPlanSearchAutotaskHandler({
      searchAutotask: async () => ({
        tasks: [{ id: "task-1", name: "smoke task" }],
        total: 1,
        raw: { total: 1, value: [{ id: "task-1", name: "smoke task" }] }
      })
    });
    const issuesTreeHandler = createTestPlanListIssuesTreeHandler({
      listIssuesTree: async () => ({
        issues: [{ id: "issue-1", subject: "story tree" }],
        total: 1,
        raw: { total: 1, value: [{ id: "issue-1", subject: "story tree" }] }
      })
    });
    const ipdIssuesTreeHandler = createTestPlanListIpdIssuesTreeHandler({
      listIpdIssuesTree: async () => ({
        issues: [{ id: "ipd-1", subject: "ipd tree" }],
        total: 1,
        raw: { total: 1, value: [{ id: "ipd-1", subject: "ipd tree" }] }
      })
    });
    const iteratorStageCountsHandler = createTestPlanListIteratorStageCountsHandler({
      listIteratorStageCounts: async () => ({
        value: { todo: 2, doing: 1, done: 5 },
        raw: { value: { todo: 2, doing: 1, done: 5 } }
      })
    });
    const queryTesthubEtlDataHandler = createTestPlanQueryTesthubEtlDataHandler({
      queryTesthubEtlData: async () => ({
        rows: [{ id: "row-1", suite_name: "smoke" }],
        total: 1,
        raw: { total: 1, value: [{ id: "row-1", suite_name: "smoke" }] }
      })
    });

    await expect(
      searchAutotaskHandler({
        project_uuid: "project-1",
        versionUri: "version-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan autotasks found",
        items: [{ id: "task-1", name: "smoke task" }]
      }
    });
    await expect(
      issuesTreeHandler({
        project_id: "project-1",
        page_number: 1,
        page_size: 20
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan issues tree records found",
        items: [{ id: "issue-1", issue: { id: "issue-1", subject: "story tree" } }]
      }
    });
    await expect(
      ipdIssuesTreeHandler({
        project_id: "project-1",
        page_number: 1,
        page_size: 20
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan IPD issues tree records found",
        items: [{ id: "ipd-1", issue: { id: "ipd-1", subject: "ipd tree" } }]
      }
    });
    await expect(
      iteratorStageCountsHandler({
        project_uuid: "project-1",
        iterator_uri: "iterator-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan iterator stage counts",
        item: {
          id: "iterator-1",
          value: { todo: 2, doing: 1, done: 5 },
          stageCounts: { value: { todo: 2, doing: 1, done: 5 } },
          projectUuid: "project-1"
        }
      }
    });
    await expect(
      queryTesthubEtlDataHandler({
        offset: 0,
        limit: 20,
        table_name: "execute_case_result",
        start_time: "2026-06-01 00:00:00",
        end_time: "2026-06-06 23:59:59",
        filter_time_field: "create_time",
        schema_no: "schema-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestHub ETL rows found",
        items: [{ id: "row-1", row: { id: "row-1", suite_name: "smoke" } }]
      }
    });
  });
});
