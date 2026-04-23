import { describe, expect, it, vi } from "vitest";
import { reqGetPlanInput as reqGetPlanInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetPlanInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqGetPlanHandler,
  mapReqPlan
} from "../../../../src/products/req/tools/get-plan.js";

describe("mapReqPlan", () => {
  it("returns normalized plan detail data", () => {
    const result = mapReqPlan({
      id: "plan-1",
      name: "2026 Q2",
      type: "release",
      project_id: "project-1",
      creator: "alice",
      updater: "bob",
      created_on: "2026-04-01T00:00:00Z",
      updated_on: "2026-04-20T00:00:00Z"
    });

    expect(result.item).toEqual({
      id: "plan-1",
      name: "2026 Q2",
      type: "release",
      projectId: "project-1",
      creator: "alice",
      updater: "bob",
      createdOn: "2026-04-01T00:00:00Z",
      updatedOn: "2026-04-20T00:00:00Z"
    });
  });
});

describe("reqGetPlanInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1"
    };

    expect(reqGetPlanInput.parse(input)).toEqual(input);
    expect(reqGetPlanInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetPlanHandler", () => {
  it("returns content and structured output for plan details", async () => {
    const client = {
      getPlan: vi.fn(async () => ({
        id: "plan-1",
        name: "2026 Q2",
        type: "release",
        project_id: "project-1"
      }))
    };
    const handler = createReqGetPlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(client.getPlan).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1"
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Loaded plan plan-1" }],
      structuredContent: {
        summary: "Loaded plan plan-1",
        item: {
          id: "plan-1",
          name: "2026 Q2",
          type: "release",
          projectId: "project-1",
          creator: undefined,
          updater: undefined,
          createdOn: undefined,
          updatedOn: undefined
        },
        raw: undefined
      }
    });
  });
});
