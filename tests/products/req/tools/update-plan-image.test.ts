import { describe, expect, it, vi } from "vitest";
import { reqUpdatePlanImageInput as reqUpdatePlanImageInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdatePlanImageInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqUpdatePlanImageHandler,
  mapUpdatedPlanImage,
  previewUpdatePlanImage
} from "../../../../src/products/req/tools/update-plan-image.js";

describe("previewUpdatePlanImage", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdatePlanImage({
      project_id: "project-1",
      plan_id: "plan-1",
      img_url: "/v1/upload/demo/202604/abc123.png",
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: update image for plan plan-1");
    expect(result.item).toEqual({
      projectId: "project-1",
      planId: "plan-1",
      imageUrl: "/v1/upload/demo/202604/abc123.png",
      updated: false,
      executed: false
    });
  });
});

describe("mapUpdatedPlanImage", () => {
  it("returns normalized updated plan image data", () => {
    const result = mapUpdatedPlanImage({
      id: "plan-1",
      name: "2026 Q3",
      type: "mind",
      project_id: "project-1",
      img_url: "/v1/upload/demo/202604/abc123.png"
    });

    expect(result.item).toEqual({
      id: "plan-1",
      projectId: "project-1",
      name: "2026 Q3",
      type: "mind",
      imageUrl: "/v1/upload/demo/202604/abc123.png",
      updated: true,
      executed: true
    });
  });
});

describe("reqUpdatePlanImageInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      plan_id: "plan-1",
      img_url: "/v1/upload/demo/202604/abc123.png"
    };

    expect(reqUpdatePlanImageInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdatePlanImageInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdatePlanImageHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updatePlanImage: vi.fn()
    };
    const handler = createReqUpdatePlanImageHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      img_url: "/v1/upload/demo/202604/abc123.png",
      dry_run: true
    });

    expect(client.updatePlanImage).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update image for plan plan-1" }],
      structuredContent: {
        summary: "Dry run: update image for plan plan-1",
        item: {
          projectId: "project-1",
          planId: "plan-1",
          imageUrl: "/v1/upload/demo/202604/abc123.png",
          updated: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updatePlanImage: vi.fn(async () => ({
        id: "plan-1",
        name: "2026 Q3",
        type: "mind",
        project_id: "project-1",
        img_url: "/v1/upload/demo/202604/abc123.png"
      }))
    };
    const handler = createReqUpdatePlanImageHandler(client);

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      img_url: "/v1/upload/demo/202604/abc123.png",
      dry_run: false
    });

    expect(client.updatePlanImage).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1",
      img_url: "/v1/upload/demo/202604/abc123.png",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated image for plan 2026 Q3" }],
      structuredContent: {
        summary: "Updated image for plan 2026 Q3",
        item: {
          id: "plan-1",
          projectId: "project-1",
          name: "2026 Q3",
          type: "mind",
          imageUrl: "/v1/upload/demo/202604/abc123.png",
          updated: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
