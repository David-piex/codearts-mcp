import { describe, expect, it, vi } from "vitest";
import { createReqSearchMyWorkItemsHandler } from "../../../../src/products/req/tools/search-my-work-items.js";
import { createReqSearchTodoWorkItemsHandler } from "../../../../src/products/req/tools/search-todo-work-items.js";

describe("createReqSearchTodoWorkItemsHandler", () => {
  it("returns normalized todo search results", async () => {
    const client = {
      searchTodoWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 7220820,
            subject: "demo_issue",
            status: { name: "New" },
            tracker: { name: "Story" },
            assigned_to: { nick_name: "szh" }
          }
        ],
        total: 1
      }))
    };
    const handler = createReqSearchTodoWorkItemsHandler(client);

    const result = await handler({
      page: 1,
      page_size: 15,
      status_id: "5"
    });

    expect(client.searchTodoWorkItems).toHaveBeenCalledWith({
      page: 1,
      page_size: 15,
      status_id: "5"
    });
    expect(result.content[0]?.text).toContain("1 work items found in this page");
    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        id: "7220820",
        title: "demo_issue",
        status: "New",
        type: "Story",
        assignedToName: "szh"
      })
    ]);
  });
});

describe("createReqSearchMyWorkItemsHandler", () => {
  it("returns normalized personal workbench results", async () => {
    const client = {
      searchMyWorkItems: vi.fn(async () => ({
        work_items: [
          {
            id: 69880891,
            subject: "St-001"
          }
        ],
        total: 7898
      }))
    };
    const handler = createReqSearchMyWorkItemsHandler(client);

    const result = await handler({
      page: 1,
      page_size: 15
    });

    expect(client.searchMyWorkItems).toHaveBeenCalledWith({
      page: 1,
      page_size: 15
    });
    expect(result.content[0]?.text).toContain("1 work items found in this page");
    expect(result.structuredContent.page_info).toEqual({
      page: 1,
      pageSize: 15,
      total: 7898
    });
  });
});
