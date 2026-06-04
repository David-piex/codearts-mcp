import { describe, expect, it, vi } from "vitest";
import { reqCreateSystemWorkItemV4Input as reqCreateSystemWorkItemV4InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateSystemWorkItemV4Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCreateSystemWorkItemV4Handler,
  mapCreatedSystemWorkItemV4,
  previewCreateSystemWorkItemV4
} from "../../../../src/products/req/tools/create-system-work-item-v4.js";

const input = {
  project_id: "p-1",
  title: "Add login",
  work_item_type: "Story",
  parent_work_item_id: "9001",
  iteration_id: "iteration-1",
  module_id: "module-1",
  severity_id: 11,
  assigned_id: "user-2",
  developer_id: "4091",
  domain_id: 15,
  done_ratio: 20,
  expected_work_hours: 8,
  actual_work_hours: 2,
  start_date: 1839340800000,
  due_date: 1839945600000,
  x_auth_token: "token-123456"
};

describe("create system work item V4 tool", () => {
  it("previews token-header system issue creation without exposing the full token", () => {
    const result = previewCreateSystemWorkItemV4({ ...input, dry_run: true });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "p-1",
      title: "Add login",
      workItemType: "Story",
      parentWorkItemId: "9001",
      iterationId: "iteration-1",
      moduleId: "module-1",
      severityId: 11,
      assignedId: "user-2",
      developerId: "4091",
      domainId: 15,
      doneRatio: 20,
      expectedWorkHours: 8,
      actualWorkHours: 2,
      startDate: 1839340800000,
      dueDate: 1839945600000,
      xAuthToken: "toke...3456",
      endpoint: "/v4/projects/{project_id}/system/issue",
      executed: false
    });
  });

  it("maps executed system issue creation", () => {
    const response = { id: 1001, name: "Add login" };
    const result = mapCreatedSystemWorkItemV4({
      id: 1001,
      name: "Add login",
      description: "desc",
      status: { id: 1, name: "新建" },
      tracker: { id: 7, name: "Story" },
      raw: response
    });

    expect(result.item).toEqual({
      id: "1001",
      title: "Add login",
      description: "desc",
      status: "新建",
      statusId: 1,
      type: "Story",
      typeId: 7,
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqCreateSystemWorkItemV4Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateSystemWorkItemV4InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createSystemWorkItemV4: vi.fn()
    };
    const handler = createReqCreateSystemWorkItemV4Handler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.createSystemWorkItemV4).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create system work item Add login");
  });

  it("executes V4 system issue creation through the client", async () => {
    const client = {
      createSystemWorkItemV4: vi.fn(async () => ({
        id: 1001,
        name: "Add login",
        description: "desc",
        status: { id: 1, name: "新建" },
        tracker: { id: 7, name: "Story" },
        raw: { id: 1001 }
      }))
    };
    const handler = createReqCreateSystemWorkItemV4Handler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.createSystemWorkItemV4).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "1001",
      title: "Add login",
      executed: true
    });
  });
});
