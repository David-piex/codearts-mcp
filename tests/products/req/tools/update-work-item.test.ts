import { describe, expect, it } from "vitest";
import { reqUpdateWorkItemInput as reqUpdateWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  mapUpdatedWorkItem,
  previewUpdateWorkItem
} from "../../../../src/products/req/tools/update-work-item.js";

describe("previewUpdateWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateWorkItem({
      project_id: "p-1",
      work_item_id: "wi-9",
      title: "Refine login flow",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "wi-9",
      projectId: "p-1",
      title: "Refine login flow",
      executed: false
    });
  });
});

describe("mapUpdatedWorkItem", () => {
  it("returns normalized updated work item data", () => {
    const result = mapUpdatedWorkItem({
      id: 9,
      name: "Refine login flow",
      description: "Clarify edge cases",
      status: { id: 3, name: "Doing" },
      tracker: { id: 7, name: "Story" }
    });

    expect(result.item).toEqual({
      id: "9",
      title: "Refine login flow",
      description: "Clarify edge cases",
      status: "Doing",
      statusId: 3,
      type: "Story",
      typeId: 7,
      executed: true
    });
  });
});

describe("reqUpdateWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      work_item_id: "wi-9",
      title: "Refine login flow"
    };

    expect(reqUpdateWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
