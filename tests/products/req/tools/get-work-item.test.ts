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
      created_on: "1779267066000",
      updated_on: "1779328509000",
      start_date: "1779379200000",
      due_date: "1779984000000",
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
      createdOn: "1779267066000",
      updatedOn: "1779328509000",
      startDate: "1779379200000",
      dueDate: "1779984000000",
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
    expect(result.summary).toBe("Loaded work item 9 (assignee: Bob)");
  });
});
