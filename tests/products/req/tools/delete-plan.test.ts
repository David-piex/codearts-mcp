import { describe, expect, it, vi } from "vitest";
import { reqDeletePlanInput as reqDeletePlanInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeletePlanInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqDeletePlanHandler,
  mapDeletedPlan,
  previewDeletePlan
} from "../../../../src/products/req/tools/delete-plan.js";

describe("previewDeletePlan", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeletePlan({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "plan-1",
      projectId: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedPlan", () => {
  it("returns normalized deleted plan data", () => {
    const result = mapDeletedPlan({
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(result.item).toEqual({
      id: "plan-1",
      projectId: "project-1",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeletePlanInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1"
    };

    expect(reqDeletePlanInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeletePlanInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqDeletePlanHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deletePlan: vi.fn()
    };
    const handler = createReqDeletePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: true
    });

    expect(client.deletePlan).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: delete plan plan-1" }],
      structuredContent: {
        summary: "Dry run: delete plan plan-1",
        item: {
          id: "plan-1",
          projectId: "project-1",
          deleted: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      deletePlan: vi.fn(async () => ({
        project_id: "project-1",
        plan_id: "plan-1",
        deleted: true as const
      }))
    };
    const handler = createReqDeletePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: false
    });

    expect(client.deletePlan).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted plan plan-1" }],
      structuredContent: {
        summary: "Deleted plan plan-1",
        item: {
          id: "plan-1",
          projectId: "project-1",
          deleted: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
