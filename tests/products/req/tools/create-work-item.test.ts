import { describe, expect, it } from "vitest";
import { reqCreateWorkItemInput as reqCreateWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import { previewCreateWorkItem } from "../../../../src/products/req/tools/create-work-item.js";

describe("previewCreateWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateWorkItem({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "Story",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item?.projectId).toBe("p-1");
  });
});

describe("reqCreateWorkItemInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "p-1",
      title: "Add login",
      work_item_type: "Story"
    };

    expect(reqCreateWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});
