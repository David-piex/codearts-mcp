import { describe, expect, it, vi } from "vitest";
import { reqCreateEpicIssueInput as reqCreateEpicIssueInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateEpicIssueInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCreateEpicIssueHandler,
  mapCreatedEpicIssue,
  previewCreateEpicIssue
} from "../../../../src/products/req/tools/create-epic-issue.js";

const input = {
  project_id: "p-1",
  title: "Epic A",
  tracker_id: 5,
  priority_id: 3,
  parent_issue_id: 88,
  description: "Plan epic",
  severity_id: 11,
  start_date: 1839340800000,
  due_date: 1839945600000,
  status_id: 1,
  done_ratio: 10,
  expected_work_hours: 8,
  plan_id: "plan-1"
};

describe("create epic issue tool", () => {
  it("previews epic issue creation", () => {
    const result = previewCreateEpicIssue({ ...input, dry_run: true });

    expect(result.item).toEqual({
      projectId: "p-1",
      trackerId: 5,
      priorityId: 3,
      title: "Epic A",
      parentIssueId: 88,
      description: "Plan epic",
      dueDate: 1839945600000,
      startDate: 1839340800000,
      severityId: 11,
      doneRatio: 10,
      statusId: 1,
      expectedWorkHours: 8,
      planId: "plan-1",
      endpoint: "/v2/issues/create",
      executed: false
    });
  });

  it("maps executed epic issue creation", () => {
    const result = mapCreatedEpicIssue({
      id: 101,
      name: "Epic A",
      number: 1001,
      description: "Plan epic",
      status: { id: 1, name: "New" },
      tracker: { id: 5, name: "Epic" },
      project_id: "p-1",
      plan_id: "plan-1"
    });

    expect(result.item).toEqual({
      id: "101",
      number: "1001",
      title: "Epic A",
      description: "Plan epic",
      status: "New",
      statusId: 1,
      type: "Epic",
      typeId: 5,
      projectId: "p-1",
      planId: "plan-1",
      executed: true
    });
  });

  it("keeps the barrel export compatible", () => {
    expect(reqCreateEpicIssueInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateEpicIssueInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs", async () => {
    const client = { createEpicIssue: vi.fn() };
    const handler = createReqCreateEpicIssueHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.createEpicIssue).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create epic issue Epic A");
  });

  it("executes through client", async () => {
    const client = {
      createEpicIssue: vi.fn(async () => ({
        id: 101,
        name: "Epic A",
        number: 1001,
        plan_id: "plan-1"
      }))
    };
    const handler = createReqCreateEpicIssueHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.createEpicIssue).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "101",
      number: "1001",
      title: "Epic A",
      executed: true
    });
  });
});
