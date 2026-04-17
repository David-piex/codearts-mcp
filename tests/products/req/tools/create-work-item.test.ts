import { describe, expect, it } from "vitest";
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
