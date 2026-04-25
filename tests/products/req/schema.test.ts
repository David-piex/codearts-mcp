import { describe, expect, it } from "vitest";
import {
  reqAddProjectMemberInput,
  reqBatchAddProjectMembersInput,
  reqCreatePlanInput,
  reqCreateIpdWorkHourInput,
  reqGetIpdStatisticDashboardInput,
  reqCreateWorkItemTemplateInput,
  reqListChildWorkItemsInput,
  reqListIterationWorkItemsInput,
  reqListIpdProjectsInput,
  reqListIrChildrenInput,
  reqListPlansInput,
  reqListPlanWorkItemsInput,
  reqListAssociatedCommitsInput,
  reqListProgramsInput,
  reqListProgramFieldsInput,
  reqListProjectWorkHourTypesInput,
  reqListRrsInput,
  reqListWorkItemStatusDetailsInput,
  reqUpdateProjectMemberRoleInput,
  reqUpdateIterationInput,
  reqUpdateIterationStateInput,
  reqListWorkItemTreeInput
} from "../../../src/products/req/schemas.js";

describe("req schemas", () => {
  it("accepts custom IPD project model values", () => {
    const parsed = reqListIpdProjectsInput.parse({
      search: "demo",
      model: "20001"
    });

    expect(parsed).toEqual({
      search: "demo",
      model: "20001"
    });
  });

  it("accepts model_id as alias for custom IPD project model", () => {
    const parsed = reqListIpdProjectsInput.parse({
      model_id: "custom-model-x"
    });

    expect(parsed).toEqual({
      model_id: "custom-model-x"
    });
  });

  it("rejects setting model and model_id at the same time", () => {
    expect(() =>
      reqListIpdProjectsInput.parse({
        model: "20001",
        model_id: "custom-model-x"
      })
    ).toThrow(/model and model_id cannot both be set/i);
  });

  it("accepts custom IPD statistic classification values", () => {
    expect(
      reqGetIpdStatisticDashboardInput.parse({
        project_id: "ipd-1",
        classification: "security"
      })
    ).toEqual({
      project_id: "ipd-1",
      classification: "security"
    });
  });

  it("accepts custom program field and query type values", () => {
    expect(
      reqListProgramFieldsInput.parse({
        program_id: "program-1",
        field_type: "CUSTOM"
      })
    ).toEqual({
      program_id: "program-1",
      field_type: "CUSTOM"
    });

    expect(
      reqListIrChildrenInput.parse({
        program_id: "program-1",
        ir_id: "ir-1",
        query_type: "CUSTOM",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      program_id: "program-1",
      ir_id: "ir-1",
      query_type: "CUSTOM",
      page: 1,
      page_size: 20
    });

    expect(
      reqListRrsInput.parse({
        program_id: "program-1",
        query_type: "CUSTOM",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      program_id: "program-1",
      query_type: "CUSTOM",
      page: 1,
      page_size: 20
    });
  });

  it("accepts custom program sort keys", () => {
    expect(
      reqListProgramsInput.parse({
        page: 1,
        page_size: 20,
        sort_key: "updated_time",
        sort_dir: "desc"
      })
    ).toEqual({
      page: 1,
      page_size: 20,
      sort_key: "updated_time",
      sort_dir: "desc"
    });

    expect(() =>
      reqListProgramsInput.parse({
        page: 1,
        page_size: 20,
        sort_key: "",
        sort_dir: "desc"
      })
    ).toThrow();
  });

  it("accepts custom plan type values", () => {
    expect(
      reqCreatePlanInput.parse({
        project_id: "project-1",
        name: "Release Plan",
        type: "release"
      })
    ).toEqual({
      project_id: "project-1",
      name: "Release Plan",
      type: "release",
      dry_run: true
    });

    expect(
      reqListPlansInput.parse({
        project_id: "project-1",
        type: "release",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      type: "release",
      page: 1,
      page_size: 20
    });

    expect(() =>
      reqCreatePlanInput.parse({
        project_id: "project-1",
        name: "Release Plan",
        type: ""
      })
    ).toThrow();
  });

  it("accepts custom numeric and string IPD work hour types", () => {
    const baseInput = {
      project_id: "ipd-1",
      issue_id: "issue-1",
      work_date_begin: "2026-04-25",
      work_date_end: "2026-04-25",
      work_hours: 2,
      include_weekend: false
    };

    expect(
      reqCreateIpdWorkHourInput.parse({
        ...baseInput,
        work_hour_type: 3
      })
    ).toEqual({
      ...baseInput,
      work_hour_type: 3,
      dry_run: true
    });

    expect(
      reqCreateIpdWorkHourInput.parse({
        ...baseInput,
        work_hour_type: "custom-dev"
      })
    ).toEqual({
      ...baseInput,
      work_hour_type: "custom-dev",
      dry_run: true
    });

    expect(() =>
      reqCreateIpdWorkHourInput.parse({
        ...baseInput,
        work_hour_type: 0
      })
    ).toThrow();

    expect(() =>
      reqCreateIpdWorkHourInput.parse({
        ...baseInput,
        work_hour_type: ""
      })
    ).toThrow();
  });

  it("accepts custom associated commit type values", () => {
    expect(
      reqListAssociatedCommitsInput.parse({
        project_id: "project-1",
        work_item_id: "work-item-1",
        type: "merge_request",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      work_item_id: "work-item-1",
      type: "merge_request",
      page: 1,
      page_size: 20
    });

    expect(
      reqListAssociatedCommitsInput.parse({
        project_id: "project-1",
        work_item_id: "work-item-1",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      work_item_id: "work-item-1",
      type: "commit",
      page: 1,
      page_size: 20
    });

    expect(() =>
      reqListAssociatedCommitsInput.parse({
        project_id: "project-1",
        work_item_id: "work-item-1",
        type: "",
        page: 1,
        page_size: 20
      })
    ).toThrow();
  });

  it("keeps ALL as the default RR query type", () => {
    expect(
      reqListRrsInput.parse({
        program_id: "program-1",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      program_id: "program-1",
      query_type: "ALL",
      page: 1,
      page_size: 20
    });
  });

  it("accepts custom child work item query type values", () => {
    expect(
      reqListChildWorkItemsInput.parse({
        project_id: "project-1",
        parent_id: "work-item-1",
        query_type: "tenant-query",
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      parent_id: "work-item-1",
      query_type: "tenant-query",
      page: 1,
      page_size: 20
    });
  });

  it("accepts custom tracker IDs where project work item types can vary", () => {
    expect(
      reqListWorkItemTreeInput.parse({
        project_id: "project-1",
        tracker_ids: [42],
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      tracker_ids: [42],
      page: 1,
      page_size: 20
    });

    expect(
      reqListIterationWorkItemsInput.parse({
        project_id: "project-1",
        iteration_id: "iteration-1",
        tracker_id: 42,
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      iteration_id: "iteration-1",
      tracker_id: 42,
      page: 1,
      page_size: 20
    });

    expect(
      reqListPlanWorkItemsInput.parse({
        project_id: "project-1",
        plan_id: "plan-1",
        tracker_id: 42,
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      plan_id: "plan-1",
      tracker_id: 42,
      show_type: "list",
      page: 1,
      page_size: 20
    });

    expect(
      reqListWorkItemStatusDetailsInput.parse({
        project_id: "project-1",
        tracker_id: 42
      })
    ).toEqual({
      project_id: "project-1",
      tracker_id: 42
    });

    expect(
      reqCreateWorkItemTemplateInput.parse({
        project_id: "project-1",
        tracker_id: 42,
        description: "custom tracker template"
      })
    ).toEqual({
      project_id: "project-1",
      tracker_id: 42,
      description: "custom tracker template",
      dry_run: true
    });
  });

  it("accepts tenant-extended project member role IDs", () => {
    expect(
      reqAddProjectMemberInput.parse({
        project_id: "project-1",
        user_id: "user-1",
        domain_id: "domain-1",
        role_id: 12
      })
    ).toEqual({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 12,
      dry_run: true
    });

    expect(
      reqBatchAddProjectMembersInput.parse({
        project_id: "project-1",
        members: [{ user_id: "user-1", role_id: 12 }]
      })
    ).toEqual({
      project_id: "project-1",
      members: [{ user_id: "user-1", role_id: 12 }],
      dry_run: true
    });

    expect(
      reqUpdateProjectMemberRoleInput.parse({
        project_id: "project-1",
        user_id: "user-1",
        role_id: 12
      })
    ).toEqual({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 12,
      dry_run: true
    });
  });

  it("keeps -1 as the special project member role ID but rejects other negatives", () => {
    expect(
      reqUpdateProjectMemberRoleInput.parse({
        project_id: "project-1",
        user_id: "user-1",
        role_id: -1
      })
    ).toEqual({
      project_id: "project-1",
      user_id: "user-1",
      role_id: -1,
      dry_run: true
    });

    expect(() =>
      reqUpdateProjectMemberRoleInput.parse({
        project_id: "project-1",
        user_id: "user-1",
        role_id: -2
      })
    ).toThrow();
  });

  it("accepts extended project work hour type status values", () => {
    expect(
      reqListProjectWorkHourTypesInput.parse({
        project_id: "project-1",
        status: 3,
        page: 1,
        page_size: 20
      })
    ).toEqual({
      project_id: "project-1",
      status: 3,
      page: 1,
      page_size: 20
    });

    expect(() =>
      reqListProjectWorkHourTypesInput.parse({
        project_id: "project-1",
        status: 0,
        page: 1,
        page_size: 20
      })
    ).toThrow();
  });

  it("accepts custom iteration status values but rejects empty status", () => {
    expect(
      reqUpdateIterationInput.parse({
        project_id: "project-1",
        iteration_id: "iteration-1",
        name: "Sprint 3",
        status: "custom-status"
      })
    ).toEqual({
      project_id: "project-1",
      iteration_id: "iteration-1",
      name: "Sprint 3",
      status: "custom-status",
      dry_run: true
    });

    expect(
      reqUpdateIterationStateInput.parse({
        project_id: "project-1",
        iteration_id: "iteration-1",
        name: "Sprint 3",
        status: "custom-status"
      })
    ).toEqual({
      project_id: "project-1",
      iteration_id: "iteration-1",
      name: "Sprint 3",
      status: "custom-status",
      dry_run: true
    });

    expect(() =>
      reqUpdateIterationStateInput.parse({
        project_id: "project-1",
        iteration_id: "iteration-1",
        name: "Sprint 3",
        status: ""
      })
    ).toThrow();
  });
});
