import { describe, expect, it } from "vitest";
import { mapReqWorkItem } from "../../../../src/products/req/tools/get-work-item.js";

describe("mapReqWorkItem", () => {
  it("returns normalized work item detail data", () => {
    const result = mapReqWorkItem({
      id: 9,
      subject: "Refine login flow",
      status: { name: "Doing" },
      tracker_name: "Story",
      description: "Clarify edge cases"
    });

    expect(result.item).toEqual({
      id: "9",
      title: "Refine login flow",
      status: "Doing",
      type: "Story",
      description: "Clarify edge cases"
    });
  });
});
