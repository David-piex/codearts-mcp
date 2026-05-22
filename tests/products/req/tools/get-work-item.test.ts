import { describe, expect, it, vi } from "vitest";
import {
  createReqGetWorkItemHandler,
  mapReqWorkItem
} from "../../../../src/products/req/tools/get-work-item.js";

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

describe("createReqGetWorkItemHandler", () => {
  it("includes work item details in text output", async () => {
    const client = {
      getWorkItem: vi.fn(async () => ({
        id: 9,
        subject: "Refine login flow",
        status: { name: "Doing" },
        tracker_name: "Story",
        description: "Clarify edge cases",
        created_on: "1779267066000",
        updated_on: "1779328509000",
        assigned_to: {
          id: 16666,
          identifier: "user-uuid-2",
          name: "tenant/bob",
          assigned_nick_name: "Bob"
        }
      }))
    };
    const handler = createReqGetWorkItemHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "9"
    });

    expect(client.getWorkItem).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "9"
    });
    expect(result.content[0]?.text).toContain("Loaded work item 9 (assignee: Bob)");
    expect(result.content[0]?.text).toContain("title: Refine login flow");
    expect(result.content[0]?.text).toContain("assignee: Bob");
    expect(result.content[0]?.text).toContain("description: Clarify edge cases");
    expect(result.structuredContent.item?.description).toBe("Clarify edge cases");
  });
});
