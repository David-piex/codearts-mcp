import { describe, expect, it } from "vitest";
import { reqUpdateIssueV3Input as reqUpdateIssueV3InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateIssueV3Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  mapUpdatedIssueV3,
  previewUpdateIssueV3
} from "../../../../src/products/req/tools/update-issue-v3.js";

describe("previewUpdateIssueV3", () => {
  it("returns a dry-run summary for the V3 token-header update endpoint", () => {
    const result = previewUpdateIssueV3({
      project_id: "p-1",
      work_item_id: "wi-9",
      type: "scrum",
      x_auth_token: "token-1234567890",
      title: "Refine login flow",
      work_item_type: "Story",
      status_id: 3,
      assigned_id: "user-2",
      due_date: 1839945600000,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      workItemId: "wi-9",
      type: "scrum",
      xAuthToken: "toke...7890",
      title: "Refine login flow",
      workItemType: "Story",
      description: undefined,
      statusId: 3,
      priorityId: undefined,
      iterationId: undefined,
      moduleId: undefined,
      severityId: undefined,
      assignedId: "user-2",
      doneRatio: undefined,
      expectedWorkHours: undefined,
      startDate: undefined,
      dueDate: 1839945600000,
      endpoint: "/v3/issues/update",
      executed: false
    });
  });
});

describe("mapUpdatedIssueV3", () => {
  it("normalizes the V3 update response", () => {
    const result = mapUpdatedIssueV3({
      project_id: "p-1",
      work_item_id: "9",
      type: "scrum",
      status: "success",
      issue: {
        id: 9,
        projectUUId: "p-1",
        subject: "Refine login flow",
        description: "Clarify edge cases",
        tracker_id: 7,
        status_id: 3,
        assigned_to_id: "user-2",
        lockVersion: 4,
        start_date: "1839340800000",
        due_date: "1839945600000"
      }
    });

    expect(result.item).toEqual({
      id: "9",
      projectId: "p-1",
      projectUuid: "p-1",
      type: "scrum",
      typeId: 7,
      title: "Refine login flow",
      description: "Clarify edge cases",
      status: undefined,
      statusId: 3,
      priorityId: undefined,
      severityId: undefined,
      assignedToId: "user-2",
      iterationId: undefined,
      moduleId: undefined,
      doneRatio: undefined,
      expectedWorkHours: undefined,
      startDate: "1839340800000",
      dueDate: "1839945600000",
      createdOn: undefined,
      updatedOn: undefined,
      lockVersion: "4",
      mutationStatus: "success",
      executed: true
    });
  });
});

describe("reqUpdateIssueV3Input exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      type: "scrum",
      x_auth_token: "token-1234567890",
      title: "Refine login flow"
    };

    expect(reqUpdateIssueV3Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateIssueV3InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
