import { describe, expect, it, vi } from "vitest";
import { reqCreatePlanInput as reqCreatePlanInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreatePlanInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqCreatePlanHandler,
  mapCreatedPlan,
  previewCreatePlan
} from "../../../../src/products/req/tools/create-plan.js";

describe("previewCreatePlan", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreatePlan({
      project_id: "project-1",
      name: "2026 Q3",
      type: "mind",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      name: "2026 Q3",
      type: "mind",
      executed: false
    });
  });
});

describe("mapCreatedPlan", () => {
  it("returns normalized created plan data", () => {
    const result = mapCreatedPlan({
      id: "plan-1",
      name: "2026 Q3",
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
      name: "2026 Q3",
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

describe("reqCreatePlanInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      name: "2026 Q3",
      type: "mind" as const
    };

    expect(reqCreatePlanInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreatePlanInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreatePlanHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createPlan: vi.fn()
    };
    const handler = createReqCreatePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "2026 Q3",
      type: "mind",
      dry_run: true
    });

    expect(client.createPlan).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: create plan 2026 Q3" }],
      structuredContent: {
        summary: "Dry run: create plan 2026 Q3",
        item: {
          projectId: "project-1",
          name: "2026 Q3",
          type: "mind",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed creates", async () => {
    const client = {
      createPlan: vi.fn(async () => ({
        id: "plan-1",
        name: "2026 Q3",
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
    const handler = createReqCreatePlanHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "2026 Q3",
      type: "mind",
      dry_run: false
    });

    expect(client.createPlan).toHaveBeenCalledWith({
      project_id: "project-1",
      name: "2026 Q3",
      type: "mind",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Created plan 2026 Q3" }],
      structuredContent: {
        summary: "Created plan 2026 Q3",
        item: {
          id: "plan-1",
          projectId: "project-1",
          name: "2026 Q3",
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
