import { describe, expect, it, vi } from "vitest";
import { reqCreateWorkItemV2Input as reqCreateWorkItemV2InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateWorkItemV2Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCreateWorkItemV2Handler,
  mapCreatedWorkItemV2,
  previewCreateWorkItemV2
} from "../../../../src/products/req/tools/create-work-item-v2.js";

const input = {
  project_id: "p-1",
  title: "Epic A",
  work_item_type: "Epic",
  parent_work_item_id: "88",
  description: "Plan item",
  priority_id: 3,
  severity_id: 11,
  start_date: 1839340800000,
  due_date: 1839945600000,
  status_id: 1,
  done_ratio: 10,
  expected_work_hours: 8,
  plan_id: "plan-1"
};

describe("create work item V2 tool", () => {
  it("previews V2 work item creation", () => {
    const result = previewCreateWorkItemV2({ ...input, dry_run: true });

    expect(result.item).toEqual({
      projectId: "p-1",
      title: "Epic A",
      workItemType: "Epic",
      parentWorkItemId: "88",
      developerId: undefined,
      planId: "plan-1",
      endpoint: "/v2/issues/create",
      executed: false
    });
  });

  it("maps executed V2 work item creation", () => {
    const result = mapCreatedWorkItemV2({
      id: 101,
      name: "Epic A",
      number: 1001,
      description: "Plan item",
      status: { id: 1, name: "New" },
      tracker: { id: 5, name: "Epic" },
      project_id: "p-1",
      plan_id: "plan-1"
    });

    expect(result.item).toEqual({
      id: "101",
      number: "1001",
      title: "Epic A",
      description: "Plan item",
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
    expect(reqCreateWorkItemV2Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateWorkItemV2InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs", async () => {
    const client = { createWorkItemV2: vi.fn() };
    const handler = createReqCreateWorkItemV2Handler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.createWorkItemV2).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create work item V2 Epic A");
  });

  it("executes through client", async () => {
    const client = {
      createWorkItemV2: vi.fn(async () => ({
        id: 101,
        name: "Epic A",
        number: 1001,
        plan_id: "plan-1"
      }))
    };
    const handler = createReqCreateWorkItemV2Handler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.createWorkItemV2).toHaveBeenCalledWith({
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
