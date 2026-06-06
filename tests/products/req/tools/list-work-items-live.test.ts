import { describe, expect, it } from "vitest";
import { createReqListWorkItemsHandler } from "../../../../src/products/req/tools/list-work-items.js";

describe("createReqListWorkItemsHandler", () => {
  it("maps provider work items into MCP output", async () => {
    const handler = createReqListWorkItemsHandler({
      listWorkItems: async () => ({
        work_items: [
          {
            id: 101,
            subject: "Implement SSO",
            status: { name: "Doing" },
            tracker_name: "Story"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 work items");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "101",
      title: "Implement SSO",
      status: "Doing",
      type: "Story",
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
        status: { name: "Doing" },
        tracker_name: "Story"
      }
    });
    expect(result.structuredContent.items?.[0]?.customFields).toEqual([]);
    expect(result.structuredContent.items?.[0]?.tagList).toEqual([]);
    expect(result.structuredContent.items?.[0]?.children).toEqual([]);
    expect(result.content[0]?.text).toContain("id: 101");
    expect(result.content[0]?.text).toContain("title: Implement SSO");
    expect(result.content[0]?.text).toContain("type: Story");
  });
});
