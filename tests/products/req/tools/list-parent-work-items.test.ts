import { describe, expect, it, vi } from "vitest";
import {
  createReqListParentWorkItemsHandler,
  mapReqParentWorkItems
} from "../../../../src/products/req/tools/list-parent-work-items.js";

describe("mapReqParentWorkItems", () => {
  it("returns normalized current and parent work items", () => {
    const result = mapReqParentWorkItems({
      issue: {
        id: 20,
        subject: "Child task",
        status: { name: "Doing" },
        tracker: { name: "Task" },
        assigned_to: { nick_name: "szh" }
      },
      parent_issues: [
        {
          id: 10,
          subject: "Parent story",
          status: { name: "New" },
          tracker: { name: "Story" }
        }
      ]
    });

    expect(result.items).toEqual([
      expect.objectContaining({
        id: "20",
        relation: "self",
        title: "Child task",
        assignedToName: "szh"
      }),
      expect.objectContaining({
        id: "10",
        relation: "parent",
        title: "Parent story"
      })
    ]);
    expect(result.raw).toEqual({
      issue: expect.objectContaining({ id: 20 }),
      parent_issues: [expect.objectContaining({ id: 10 })]
    });
  });
});

describe("createReqListParentWorkItemsHandler", () => {
  it("calls the client and returns readable output", async () => {
    const client = {
      listParentWorkItems: vi.fn(async () => ({
        issue: { id: 20, subject: "Child task" },
        parent_issues: [{ id: 10, subject: "Parent story" }]
      }))
    };
    const handler = createReqListParentWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "20"
    });

    expect(client.listParentWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "20"
    });
    expect(result.content[0]?.text).toContain("2 parent work item entries found");
    expect(result.structuredContent.items).toHaveLength(2);
  });
});
