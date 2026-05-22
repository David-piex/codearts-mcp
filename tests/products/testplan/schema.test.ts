import { describe, expect, it } from "vitest";
import {
  testPlanDeleteDynamicGlobalVariableInput,
  testPlanDownloadTestDesignTemplateInput,
  testPlanGetDynamicGlobalVariableInput,
  testPlanListCasesInput,
  testPlanListIssuesInput,
  testPlanListDynamicGlobalVariablesInput,
  testPlanRunCasesInput
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
});
