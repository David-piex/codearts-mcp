import { describe, expect, it } from "vitest";
import { mapReqWorkItem } from "../../../../src/products/req/tools/get-work-item.js";

describe("mapReqWorkItem", () => {
  it("returns normalized work item detail data", () => {
    const result = mapReqWorkItem({
      id: 9,
      subject: "Refine login flow",
      status: { name: "Doing" },
      tracker_name: "Story",
      description: "Clarify edge cases",
      assigned_to: {
        id: 16666,
        identifier: "user-uuid-2",
        name: "tenant/bob",
        assigned_nick_name: "Bob"
      }
    });

    expect(result.item).toEqual({
      id: "9",
      title: "Refine login flow",
      status: "Doing",
      type: "Story",
      description: "Clarify edge cases",
      assignee: {
        id: "16666",
        userId: "user-uuid-2",
        userNumId: undefined,
        nickName: "Bob",
        name: "tenant/bob",
        displayName: "Bob"
      },
      assignedToName: "Bob"
    });
  });
});
