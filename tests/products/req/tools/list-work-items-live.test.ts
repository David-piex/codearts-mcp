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
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "101",
      title: "Implement SSO",
      status: "Doing",
      type: "Story"
    });
  });
});
