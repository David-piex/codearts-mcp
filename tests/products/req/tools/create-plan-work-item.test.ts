import { describe, expect, it, vi } from "vitest";
import { reqCreatePlanWorkItemInput as reqCreatePlanWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreatePlanWorkItemInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqCreatePlanWorkItemHandler,
  mapCreatedPlanWorkItem,
  previewCreatePlanWorkItem
} from "../../../../src/products/req/tools/create-plan-work-item.js";

describe("previewCreatePlanWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreatePlanWorkItem({
      project_id: "project-1",
      title: "Epic A",
      work_item_type: "Epic",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: create plan work item Epic A");
    expect(result.item).toEqual({
      projectId: "project-1",
      title: "Epic A",
      workItemType: "Epic",
      planId: "plan-1",
      executed: false
    });
  });
});

describe("mapCreatedPlanWorkItem", () => {
  it("returns normalized created plan work item data", () => {
    const result = mapCreatedPlanWorkItem({
      id: 101,
      name: "Epic A",
      description: "Plan item",
      status: { id: 1, name: "New" },
      tracker: { id: 5, name: "Epic" },
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(result.item).toEqual({
      id: "101",
      title: "Epic A",
      description: "Plan item",
      status: "New",
      statusId: 1,
      type: "Epic",
      typeId: 5,
      projectId: "project-1",
      planId: "plan-1",
      executed: true
    });
  });
});

describe("reqCreatePlanWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      title: "Epic A",
      work_item_type: "Epic"
    };

    expect(reqCreatePlanWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreatePlanWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreatePlanWorkItemHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createPlanWorkItem: vi.fn()
    };
    const handler = createReqCreatePlanWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      title: "Epic A",
      work_item_type: "Epic",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(client.createPlanWorkItem).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: create plan work item Epic A" }],
      structuredContent: {
        summary: "Dry run: create plan work item Epic A",
        item: {
          projectId: "project-1",
          title: "Epic A",
          workItemType: "Epic",
          planId: "plan-1",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed creates", async () => {
    const client = {
      createPlanWorkItem: vi.fn(async () => ({
        id: 101,
        name: "Epic A",
        description: "Plan item",
        status: { id: 1, name: "New" },
        tracker: { id: 5, name: "Epic" },
        project_id: "project-1",
        plan_id: "plan-1"
      }))
    };
    const handler = createReqCreatePlanWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      title: "Epic A",
      work_item_type: "Epic",
      plan_id: "plan-1",
      dry_run: false
    });

    expect(client.createPlanWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      title: "Epic A",
      work_item_type: "Epic",
      plan_id: "plan-1",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Created plan work item Epic A" }],
      structuredContent: {
        summary: "Created plan work item Epic A",
        item: {
          id: "101",
          title: "Epic A",
          description: "Plan item",
          status: "New",
          statusId: 1,
          type: "Epic",
          typeId: 5,
          projectId: "project-1",
          planId: "plan-1",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
