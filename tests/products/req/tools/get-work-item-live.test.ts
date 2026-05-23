import { describe, expect, it } from "vitest";
import { createReqGetWorkItemHandler } from "../../../../src/products/req/tools/get-work-item.js";

describe("createReqGetWorkItemHandler", () => {
  it("maps provider work item detail into MCP output", async () => {
    const handler = createReqGetWorkItemHandler({
      getWorkItem: async () => ({
        id: 101,
        subject: "Implement SSO",
        status: { name: "Done" },
        tracker_name: "Story",
        description: "SSO delivery"
      })
    });

    const result = await handler({ project_id: "p-1", work_item_id: "101" });

    expect(result.structuredContent.item).toEqual({
      id: "101",
      title: "Implement SSO",
      status: "Done",
      type: "Story",
      description: "SSO delivery",
      createdOn: undefined,
      createdOnText: undefined,
      updatedOn: undefined,
      updatedOnText: undefined,
      startDate: undefined,
      startDateText: undefined,
      dueDate: undefined,
      dueDateText: undefined,
      assignee: undefined,
      assignedToName: undefined,
      rawWorkItem: {
        id: 101,
        subject: "Implement SSO",
        status: { name: "Done" },
        tracker_name: "Story",
        description: "SSO delivery"
      }
    });
  });
});
