import { describe, expect, it, vi } from "vitest";
import { reqAddPlanWorkItemsInput as reqAddPlanWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqAddPlanWorkItemsInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqAddPlanWorkItemsHandler,
  mapAddedPlanWorkItems,
  previewAddPlanWorkItems
} from "../../../../src/products/req/tools/add-plan-work-items.js";

describe("previewAddPlanWorkItems", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewAddPlanWorkItems({
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      planId: "plan-1",
      workItemIds: ["wi-9", "wi-10"],
      addedCount: 0,
      executed: false
    });
  });
});

describe("mapAddedPlanWorkItems", () => {
  it("returns normalized added work item data", () => {
    const result = mapAddedPlanWorkItems({
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"],
      addedCount: 2
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      planId: "plan-1",
      workItemIds: ["wi-9", "wi-10"],
      addedCount: 2,
      executed: true
    });
  });
});

describe("reqAddPlanWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"]
    };

    expect(reqAddPlanWorkItemsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqAddPlanWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqAddPlanWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      addPlanWorkItems: vi.fn()
    };
    const handler = createReqAddPlanWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: true
    });

    expect(client.addPlanWorkItems).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: add 2 work items to plan plan-1" }],
      structuredContent: {
        summary: "Dry run: add 2 work items to plan plan-1",
        item: {
          projectId: "project-1",
          planId: "plan-1",
          workItemIds: ["wi-9", "wi-10"],
          addedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed adds", async () => {
    const client = {
      addPlanWorkItems: vi.fn(async () => ({
        project_id: "project-1",
        plan_id: "plan-1",
        work_item_ids: ["wi-9", "wi-10"],
        addedCount: 2
      }))
    };
    const handler = createReqAddPlanWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: false
    });

    expect(client.addPlanWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      work_item_ids: ["wi-9", "wi-10"],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Added 2 work items to plan plan-1" }],
      structuredContent: {
        summary: "Added 2 work items to plan plan-1",
        item: {
          projectId: "project-1",
          planId: "plan-1",
          workItemIds: ["wi-9", "wi-10"],
          addedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
