import { describe, expect, it, vi } from "vitest";
import { reqUpdatePlanInput as reqUpdatePlanInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdatePlanInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqUpdatePlanHandler,
  mapUpdatedPlan,
  previewUpdatePlan
} from "../../../../src/products/req/tools/update-plan.js";

describe("previewUpdatePlan", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdatePlan({
      project_id: "project-1",
      plan_id: "plan-1",
      name: "2026 Q3 Updated",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3 Updated",
      executed: false
    });
  });
});

describe("mapUpdatedPlan", () => {
  it("returns normalized updated plan data", () => {
    const result = mapUpdatedPlan({
      id: "plan-1",
      name: "2026 Q3 Updated",
      type: "mind",
      project_id: "project-1",
      img_url: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      }
    });

    expect(result.item).toEqual({
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3 Updated",
      type: "mind",
      imageUrl: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      },
      executed: true
    });
  });
});

describe("reqUpdatePlanInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      name: "2026 Q3 Updated"
    };

    expect(reqUpdatePlanInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdatePlanInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdatePlanHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updatePlan: vi.fn()
    };
    const handler = createReqUpdatePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      name: "2026 Q3 Updated",
      dry_run: true
    });

    expect(client.updatePlan).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update plan plan-1" }],
      structuredContent: {
        summary: "Dry run: update plan plan-1",
        item: {
          id: "plan-1",
          projectId: "project-1",
          name: "2026 Q3 Updated",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updatePlan: vi.fn(async () => ({
        id: "plan-1",
        name: "2026 Q3 Updated",
        type: "mind",
        project_id: "project-1",
        img_url: "https://example.com/plan.png",
        creator: {
          user_id: "user-1",
          domain_id: "domain-1",
          nick_name: "Alice",
          first_name: "Alice"
        }
      }))
    };
    const handler = createReqUpdatePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      name: "2026 Q3 Updated",
      dry_run: false
    });

    expect(client.updatePlan).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      name: "2026 Q3 Updated",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated plan plan-1" }],
      structuredContent: {
        summary: "Updated plan plan-1",
        item: {
          id: "plan-1",
          projectId: "project-1",
          name: "2026 Q3 Updated",
          type: "mind",
          imageUrl: "https://example.com/plan.png",
          creator: {
            user_id: "user-1",
            domain_id: "domain-1",
            nick_name: "Alice",
            first_name: "Alice"
          },
          executed: true
        },
        raw: undefined
      }
    });
  });
});
