import { describe, expect, it, vi } from "vitest";
import { reqClearPlanWorkItemsInput as reqClearPlanWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqClearPlanWorkItemsInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqClearPlanWorkItemsHandler,
  mapClearedPlanWorkItems,
  previewClearPlanWorkItems
} from "../../../../src/products/req/tools/clear-plan-work-items.js";

describe("previewClearPlanWorkItems", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewClearPlanWorkItems({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: clear work items from plan plan-1");
    expect(result.item).toEqual({
      projectId: "project-1",
      planId: "plan-1",
      cleared: false,
      executed: false
    });
  });
});

describe("mapClearedPlanWorkItems", () => {
  it("returns normalized cleared plan work items data", () => {
    const result = mapClearedPlanWorkItems({
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      planId: "plan-1",
      cleared: true,
      executed: true
    });
  });
});

describe("reqClearPlanWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1"
    };

    expect(reqClearPlanWorkItemsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqClearPlanWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqClearPlanWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      clearPlanWorkItems: vi.fn()
    };
    const handler = createReqClearPlanWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(client.clearPlanWorkItems).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: clear work items from plan plan-1" }],
      structuredContent: {
        summary: "Dry run: clear work items from plan plan-1",
        item: {
          projectId: "project-1",
          planId: "plan-1",
          cleared: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed clears", async () => {
    const client = {
      clearPlanWorkItems: vi.fn(async () => ({
        project_id: "project-1",
        plan_id: "plan-1",
        cleared: true as const
      }))
    };
    const handler = createReqClearPlanWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: false
    });

    expect(client.clearPlanWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Cleared work items from plan plan-1" }],
      structuredContent: {
        summary: "Cleared work items from plan plan-1",
        item: {
          projectId: "project-1",
          planId: "plan-1",
          cleared: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
