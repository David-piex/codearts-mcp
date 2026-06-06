import { describe, expect, it } from "vitest";
import {
  testPlanAssociateAttachmentsInput,
  testPlanCreateProgressReportInput,
  testPlanAddProjectUsersInput,
  testPlanCheckResourceExistsInput,
  testPlanCreateCustomTemplateReportInput,
  testPlanCreateTesthubServiceInput,
  testPlanDeleteCustomTemplateReportInput,
  testPlanDeleteProgressReportInput,
  testPlanDeleteProjectUsersInput,
  testPlanDeleteProjectNoticeInput,
  testPlanDeleteDynamicGlobalVariableInput,
  testPlanDownloadTestDesignTemplateInput,
  testPlanGetDesignDataInput,
  testPlanGetTaskGroupDetailInput,
  testPlanGetTaskGroupHistoryInput,
  testPlanGetDynamicGlobalVariableInput,
  testPlanGetHomePageCaseOverviewInput,
  testPlanGetProjectDataDashboardInput,
  testPlanGetTepRegisterCodeInput,
  testPlanGetTestSuitesVarListForPipelineInput,
  testPlanListCasesInput,
  testPlanListIpdIssuesTreeInput,
  testPlanListIssuesTreeInput,
  testPlanListIteratorStageCountsInput,
  testPlanListIssuesInput,
  testPlanListDefaultTemplatesInput,
  testPlanListTepsInput,
  testPlanListDynamicGlobalVariablesInput,
  testPlanListScenesPageInput,
  testPlanListSystemConfigsInput,
  testPlanListTestcasesBatchInput,
  testPlanListTestcaseDefectStatisticsInput,
  testPlanListTestpointsPageInput,
  testPlanListVariableGroupNamesInput,
  testPlanListUserExecuteTestcaseStatisticsInput,
  testPlanQueryTesthubEtlDataInput,
  testPlanRefreshProgressReportInput,
  testPlanRunCasesInput,
  testPlanSearchAutotaskInput,
  testPlanStopCaseTaskInput,
  testPlanCreateRepositoryTestsuiteInput,
  testPlanCopyTaskRelationsInput,
  testPlanExecuteTaskGroupInput,
  testPlanUploadResourceAttachmentInput,
  testPlanUpdateCustomTemplateReportInput,
  testPlanDeleteWorkItemTestRelationInput,
  testPlanUpdateProgressReportInput,
  testPlanUpdateProjectIssueUpdateNotificationInput,
  testPlanUpdateProjectMessageNoticesInput,
  testPlanUpdateTepShareInput
} from "../../../src/products/testplan/schemas.js";

describe("testplan schemas", () => {
  it("accepts list case filter fields and query overrides", () => {
    const parsed = testPlanListCasesInput.parse({
      project_id: "project-1",
      plan_id: "plan-1",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      query: {
        custom_field: "value",
        include_deleted: false,
        labels: ["core", "smoke"]
      }
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      plan_id: "plan-1",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      query: {
        custom_field: "value",
        include_deleted: false,
        labels: ["core", "smoke"]
      },
      page: 1,
      page_size: 20
    });
  });

  it("accepts official TestPlan page and batch read inputs", () => {
    expect(
      testPlanListTestpointsPageInput.parse({
        project_id: "project-1",
        page: 2,
        page_size: 5,
        offset: 5,
        deleted: "0",
        mindmap_id: "mindmap-1",
        node_id: "node-1"
      })
    ).toMatchObject({
      project_id: "project-1",
      page: 2,
      page_size: 5,
      offset: 5,
      deleted: "0",
      mindmap_id: "mindmap-1",
      node_id: "node-1"
    });

    expect(
      testPlanListScenesPageInput.parse({
        project_id: "project-1",
        deleted: "0"
      })
    ).toMatchObject({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      deleted: "0"
    });

    expect(
      testPlanListDefaultTemplatesInput.parse({
        project_id: "project-1",
        name: ""
      })
    ).toMatchObject({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      name: ""
    });

    expect(
      testPlanListTestcasesBatchInput.parse({
        project_id: "project-1",
        page: 1,
        page_size: 10,
        keyword: "checkout",
        service_type: -1,
        exeplatforms: ["api"],
        own: true,
        queryByDisplayCfg: false,
        custom_field_info: [{ field: "priority", value: "P1" }],
        test_designs: [true, "design-1"]
      })
    ).toMatchObject({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      service_type: -1,
      exeplatforms: ["api"],
      own: true,
      queryByDisplayCfg: false,
      custom_field_info: [{ field: "priority", value: "P1" }],
      test_designs: [true, "design-1"]
    });

    expect(
      testPlanListSystemConfigsInput.parse({
        project_id: "project-1",
        params: { project_id: "project-1" },
        id: "config-1",
        key: 100,
        value: "enabled"
      })
    ).toMatchObject({
      project_id: "project-1",
      params: { project_id: "project-1" },
      id: "config-1",
      key: 100,
      value: "enabled"
    });

    expect(
      testPlanListVariableGroupNamesInput.parse({
        project_id: "project-1",
        query: "{\"pageNo\":1,\"pageSize\":10}",
        name: "Default"
      })
    ).toMatchObject({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      query: "{\"pageNo\":1,\"pageSize\":10}",
      name: "Default"
    });
  });

  it("accepts optional test design template download file name", () => {
    const parsed = testPlanDownloadTestDesignTemplateInput.parse({
      project_id: "project-1",
      file_name: "template.xlsx"
    });

    expect(parsed).toEqual({
      project_id: "project-1",
      file_name: "template.xlsx"
    });
  });

  it("accepts attachment association, upload, and relation-delete inputs", () => {
    expect(
      testPlanAssociateAttachmentsInput.parse({
        project_id: "project-1",
        resource_uri: "case-1",
        attachments: [
          {
            file_name: "evidence.png",
            related_type: "1",
            override: true,
            doc_id: "doc-1"
          }
        ],
        resource_type: "TestCase",
        system_type: "docman",
        version_uri: "version-1"
      })
    ).toMatchObject({
      project_id: "project-1",
      resource_uri: "case-1",
      resource_type: "TestCase",
      system_type: "docman",
      version_uri: "version-1",
      dry_run: true
    });

    expect(
      testPlanUploadResourceAttachmentInput.parse({
        project_id: "project-1",
        resource_uri: "case-1",
        resource_type: "TestCase",
        version_uri: "version-1",
        file_path: "D:/tmp/evidence.png"
      })
    ).toMatchObject({
      project_id: "project-1",
      resource_uri: "case-1",
      resource_type: "TestCase",
      version_uri: "version-1",
      file_path: "D:/tmp/evidence.png",
      dry_run: true
    });

    expect(
      testPlanDeleteWorkItemTestRelationInput.parse({
        work_item_id: "REQ-1",
        test_case_uris: ["case-1", "case-2"],
        project_uuid: "project-1",
        version_uri: "version-1",
        relate_type: "requirement"
      })
    ).toMatchObject({
      work_item_id: "REQ-1",
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement",
      dry_run: true
    });
  });

  it("accepts list issue paging fields", () => {
    const parsed = testPlanListIssuesInput.parse({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 2,
      page_size: 50
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 2,
      page_size: 50
    });
  });

  it("accepts project settings write inputs", () => {
    expect(
      testPlanAddProjectUsersInput.parse({
        project_id: "project-1",
        user_id_List: ["user-1", "user-2"]
      })
    ).toMatchObject({
      project_id: "project-1",
      user_id_List: ["user-1", "user-2"],
      dry_run: true
    });

    expect(
      testPlanDeleteProjectUsersInput.parse({
        project_id: "project-1",
        user_id_List: ["user-1"]
      })
    ).toMatchObject({
      project_id: "project-1",
      user_id_List: ["user-1"],
      dry_run: true
    });

    expect(
      testPlanUpdateProjectIssueUpdateNotificationInput.parse({
        project_id: "project-1",
        owner_id: "user-1",
        is_display: "1"
      })
    ).toMatchObject({
      project_id: "project-1",
      owner_id: "user-1",
      is_display: "1",
      dry_run: true
    });

    expect(
      testPlanUpdateProjectMessageNoticesInput.parse({
        project_id: "project-1",
        id: "notice-1",
        type: 1,
        send_email: true,
        send_message: false,
        notice_users: [{ id: "user-1", name: "alice" }]
      })
    ).toMatchObject({
      project_id: "project-1",
      id: "notice-1",
      type: 1,
      send_email: true,
      send_message: false,
      notice_users: [{ id: "user-1", name: "alice" }],
      dry_run: true
    });
  });

  it("accepts custom report and testhub service write inputs", () => {
    expect(
      testPlanCreateCustomTemplateReportInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        name: "custom-report",
        type: "custom",
        workpiece_type: "issue",
        template_config: { sections: ["summary"] },
        data: [{ issue_id: "70844211" }]
      })
    ).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      name: "custom-report",
      type: "custom",
      workpiece_type: "issue",
      dry_run: true
    });

    expect(
      testPlanUpdateCustomTemplateReportInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-report-1",
        name: "custom-report-updated",
        template_config: { sections: ["summary"] },
        data: [{ issue_id: "70844211" }]
      })
    ).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "custom-report-1",
      name: "custom-report-updated",
      dry_run: true
    });

    expect(
      testPlanDeleteCustomTemplateReportInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "custom-report-1"
      })
    ).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "custom-report-1",
      dry_run: true
    });

    expect(
      testPlanRefreshProgressReportInput.parse({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-report",
        analysis_dim_row: "owner",
        filter: {
          ownerIds: "user-1",
          featureUris: ["feature-1"]
        }
      })
    ).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      name: "progress-report",
      dry_run: true
    });

    expect(
      testPlanCreateProgressReportInput.parse({
        project_uuid: "project-1",
        version_uri: "version-1",
        name: "progress-created",
        type: "2",
        workpiece_type: "progress",
        analysis_dim_row: "progress",
        filter: {
          startTime: "2025-10-01 23:59:59",
          endTime: "2025-10-18 23:59:59",
          featureUris: ["feature-1"]
        }
      })
    ).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      name: "progress-created",
      type: "2",
      workpiece_type: "progress",
      analysis_dim_row: "progress",
      dry_run: true
    });

    expect(
      testPlanUpdateProgressReportInput.parse({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "report-1",
        name: "progress-report",
        filter: {
          ownerIds: "user-1",
          status: "open"
        }
      })
    ).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      name: "progress-report",
      dry_run: true
    });

    expect(
      testPlanDeleteProgressReportInput.parse({
        project_uuid: "project-1",
        version_uri: "version-1",
        report_uri: "report-1"
      })
    ).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      dry_run: true
    });

    expect(
      testPlanCreateTesthubServiceInput.parse({
        service_name: "manual",
        server_host: "https://example.com",
        server_type: 0
      })
    ).toMatchObject({
      service_name: "manual",
      server_host: "https://example.com",
      server_type: 0,
      dry_run: true
    });
  });

  it("accepts run case execution metadata and aliases", () => {
    const parsed = testPlanRunCasesInput.parse({
      project_id: "project-1",
      execute_list: [
        {
          testcase_id: "case-1",
          execute_id: "user-1",
          result_id: "0",
          start_time: "2020-06-22 18:11:54",
          end_time: "2020-06-23 18:11:54",
          duration: 120,
          description: "batch smoke"
        }
      ]
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      execute_list: [
        {
          testcase_id: "case-1",
          execute_id: "user-1",
          result_id: "0",
          start_time: "2020-06-22 18:11:54",
          end_time: "2020-06-23 18:11:54",
          duration: 120,
          description: "batch smoke"
        }
      ],
      dry_run: true
    });
  });

  it("accepts dynamic global variable inputs", () => {
    expect(
      testPlanListDynamicGlobalVariablesInput.parse({
        project_id: "project-1",
        task_id: "task-1"
      })
    ).toMatchObject({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(
      testPlanGetDynamicGlobalVariableInput.parse({
        project_id: "project-1",
        task_id: "task-1",
        key: "host"
      })
    ).toMatchObject({
      project_id: "project-1",
      task_id: "task-1",
      key: "host"
    });

    expect(
      testPlanDeleteDynamicGlobalVariableInput.parse({
        project_id: "project-1",
        task_id: "task-1",
        key: "host"
      })
    ).toMatchObject({
      project_id: "project-1",
      task_id: "task-1",
      key: "host",
      dry_run: true
    });
  });

  it("accepts home page overview filters", () => {
    const parsed = testPlanGetHomePageCaseOverviewInput.parse({
      project_id: "project-1",
      version_uri: "version-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      owner_id: "user-1",
      own: true,
      pi_filter: {
        all_pi: true,
        pi_sprints: [{ pi_id: "pi-1", sprints: ["sprint-1"] }]
      }
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      owner_id: "user-1",
      own: true
    });
  });

  it("accepts statistics query bodies with passthrough fields", () => {
    expect(
      testPlanListUserExecuteTestcaseStatisticsInput.parse({
        project_id: "project-1",
        offset: 10,
        limit: 50,
        execute_start_time: "2026-05-01T00:00:00+08:00",
        execute_end_time: "2026-05-23T00:00:00+08:00",
        service_type: 1
      })
    ).toMatchObject({
      project_id: "project-1",
      offset: 10,
      limit: 50,
      execute_start_time: "2026-05-01T00:00:00+08:00",
      execute_end_time: "2026-05-23T00:00:00+08:00",
      service_type: 1
    });

    expect(
      testPlanListTestcaseDefectStatisticsInput.parse({
        project_id: "project-1",
        create_testcase_start_time: "2026-05-01T00:00:00+08:00",
        create_testcase_end_time: "2026-05-23T00:00:00+08:00",
        branch_id: "branch-1",
        associate_defect_start_time: "2026-05-02T00:00:00+08:00",
        associate_defect_end_time: "2026-05-22T00:00:00+08:00"
      })
    ).toMatchObject({
      project_id: "project-1",
      offset: 0,
      limit: 20,
      branch_id: "branch-1"
    });
  });

  it("accepts project data dashboard filters", () => {
    const parsed = testPlanGetProjectDataDashboardInput.parse({
      project_id: "project-1",
      plan_id: "plan-1",
      branch_id: "branch-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      extra_filter: "value"
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      plan_id: "plan-1",
      branch_id: "branch-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      extra_filter: "value"
    });
  });

  it("accepts official resource existence payload variants", () => {
    expect(
      testPlanCheckResourceExistsInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        type: 3,
        resource_uri: "resource-1"
      })
    ).toMatchObject({
      resource_uri: "resource-1"
    });

    expect(
      testPlanCheckResourceExistsInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        type: 3,
        resource_uris: ["resource-1", "resource-2"]
      })
    ).toMatchObject({
      resource_uris: ["resource-1", "resource-2"]
    });

    expect(
      testPlanCheckResourceExistsInput.parse({
        project_id: "project-1",
        version_uri: "version-1",
        type: 3,
        body: ["resource-1"]
      })
    ).toMatchObject({
      body: ["resource-1"]
    });
  });

  it("accepts official autotask, issues tree, iterator stage count, and ETL query inputs", () => {
    expect(
      testPlanSearchAutotaskInput.parse({
        project_uuid: "project-1",
        versionUri: "version-1",
        ticcTaskId: "task-1",
        result: "success",
        condition: { key: "name", type: "like", value: "smoke" },
        order: "desc",
        by: "create_time",
        extra_flag: true
      })
    ).toMatchObject({
      project_uuid: "project-1",
      versionUri: "version-1",
      ticcTaskId: "task-1",
      result: "success",
      order: "desc",
      by: "create_time",
      page: 1,
      page_size: 20,
      extra_flag: true
    });

    expect(
      testPlanListIssuesTreeInput.parse({
        project_id: "project-1",
        service_type: 1,
        parent_id: "parent-1",
        page_number: 2,
        page_size: 50,
        tracker_id: "tracker-1",
        include_sub_issue: true,
        filter: {
          owner_ids: ["user-1"],
          pi_filter: {
            all_pi: true
          }
        }
      })
    ).toMatchObject({
      project_id: "project-1",
      service_type: 1,
      parent_id: "parent-1",
      page_number: 2,
      page_size: 50,
      tracker_id: "tracker-1",
      include_sub_issue: true
    });

    expect(
      testPlanListIpdIssuesTreeInput.parse({
        project_id: "project-1",
        page_number: 1,
        page_size: 20,
        tracker_id: 7,
        filter: {
          owner_ids: ["user-1"],
          keyword: "checkout"
        }
      })
    ).toMatchObject({
      project_id: "project-1",
      page_number: 1,
      page_size: 20,
      tracker_id: 7
    });

    expect(
      testPlanListIteratorStageCountsInput.parse({
        project_uuid: "project-1",
        iterator_uri: "iterator-1",
        branch_uri: "branch-1",
        owner_ids: ["user-1"],
        filter: {
          iterator_ids: ["iterator-1"]
        }
      })
    ).toMatchObject({
      project_uuid: "project-1",
      iterator_uri: "iterator-1",
      branch_uri: "branch-1",
      owner_ids: ["user-1"]
    });

    expect(
      testPlanQueryTesthubEtlDataInput.parse({
        offset: 0,
        limit: 100,
        table_name: "execute_case_result",
        start_time: "2026-06-01 00:00:00",
        end_time: "2026-06-06 23:59:59",
        filter_time_field: "create_time",
        sort_field: "create_time",
        schema_no: "schema-1",
        is_bak: false
      })
    ).toMatchObject({
      offset: 0,
      limit: 100,
      table_name: "execute_case_result",
      start_time: "2026-06-01 00:00:00",
      end_time: "2026-06-06 23:59:59",
      filter_time_field: "create_time",
      sort_field: "create_time",
      schema_no: "schema-1",
      is_bak: false
    });
  });

  it("accepts TEP and legacy official API inputs", () => {
    expect(
      testPlanUpdateTepShareInput.parse({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        isShare: true
      })
    ).toMatchObject({
      isShare: true,
      dry_run: true
    });

    expect(
      testPlanGetTepRegisterCodeInput.parse({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).toMatchObject({
      x_auth_tenantid: "tenant-1",
      x_user_name: "alice"
    });

    expect(
      testPlanListTepsInput.parse({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        where: [{ key: "name", type: "eq", value: "tep-1" }],
        option: { order_by: "name", order_limit: 20 }
      })
    ).toMatchObject({
      where: [{ key: "name", type: "eq", value: "tep-1" }]
    });

    expect(
      testPlanGetDesignDataInput.parse({
        project_id: "project-1",
        x_auth_token: "token-1",
        testcaseId: "case-1"
      })
    ).toMatchObject({
      testcaseId: "case-1"
    });

    expect(
      testPlanDeleteProjectNoticeInput.parse({
        testServiceId: "service-1",
        x_auth_token: "token-1"
      })
    ).toMatchObject({
      testServiceId: "service-1",
      dry_run: true
    });

    expect(
      testPlanStopCaseTaskInput.parse({
        testServiceId: "service-1",
        caseId: "case-1",
        x_auth_token: "token-1"
      })
    ).toMatchObject({
      caseId: "case-1",
      dry_run: true
    });

    expect(
      testPlanGetTestSuitesVarListForPipelineInput.parse({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        body: { suiteIds: ["suite-1"] }
      })
    ).toMatchObject({
      body: { suiteIds: ["suite-1"] }
    });

    expect(
      testPlanGetTaskGroupDetailInput.parse({
        task_id: "task-1",
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).toMatchObject({
      task_id: "task-1",
      x_auth_tenantid: "tenant-1"
    });

    expect(
      testPlanGetTaskGroupHistoryInput.parse({
        request_id: "req-1",
        taskGroupId: "group-1",
        testServiceId: "service-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        coldDataFlag: true
      })
    ).toMatchObject({
      request_id: "req-1",
      coldDataFlag: true
    });

    expect(
      testPlanExecuteTaskGroupInput.parse({
        x_auth_token: "token-1",
        x_auth_groups: "project-1",
        id: "group-1",
        testServiceId: "service-1",
        taskGroupName: "nightly",
        tasks: [{ id: "task-1" }]
      })
    ).toMatchObject({
      id: "group-1",
      taskGroupName: "nightly",
      dry_run: true
    });

    expect(
      testPlanCreateRepositoryTestsuiteInput.parse({
        project_id: "project-1",
        x_auth_token: "token-1",
        testsuite_name: "swaggerSuite",
        repository_id: "repo-1",
        repository_branch: "main",
        file_path: "api/swagger.yaml"
      })
    ).toMatchObject({
      testsuite_name: "swaggerSuite",
      dry_run: true
    });

    expect(
      testPlanCopyTaskRelationsInput.parse({
        project_id: "project-1",
        original_task_uri: "task-1",
        dest_task_uri: "task-2"
      })
    ).toMatchObject({
      original_task_uri: "task-1",
      dest_task_uri: "task-2",
      dry_run: true
    });
  });
});
