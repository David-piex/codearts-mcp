import { describe, expect, it } from "vitest";
import { reqCreateWorkItemInput as reqCreateWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import { previewCreateWorkItem } from "../../../../src/products/req/tools/create-work-item.js";

describe("previewCreateWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateWorkItem({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "Story",
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 20,
      expected_work_hours: 8,
      start_date: 1839340800000,
      due_date: 1839945600000,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      title: "Add login",
      workItemType: "Story",
      iterationId: "iteration-1",
      moduleId: "module-1",
      severityId: 11,
      assignedId: "user-2",
      doneRatio: 20,
      expectedWorkHours: 8,
      startDate: 1839340800000,
      dueDate: 1839945600000,
      executed: false
    });
  });
});

describe("reqCreateWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      title: "Add login",
      work_item_type: "Story",
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 20,
      expected_work_hours: 8,
      start_date: 1839340800000,
      due_date: 1839945600000
    };

    expect(reqCreateWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
