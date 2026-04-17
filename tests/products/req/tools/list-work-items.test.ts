import { describe, expect, it } from "vitest";
import { mapReqWorkItems } from "../../../../src/products/req/tools/list-work-items.js";

describe("mapReqWorkItems", () => {
  it("returns normalized work items with pagination", () => {
    const result = mapReqWorkItems(
      [{ id: 9, subject: "Refine login flow", status: { name: "Doing" }, tracker_name: "Story" }],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "9",
        title: "Refine login flow",
        status: "Doing",
        type: "Story"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
