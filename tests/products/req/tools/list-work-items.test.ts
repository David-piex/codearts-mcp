import { describe, expect, it } from "vitest";
import {
  createReqListWorkItemsHandler,
  createReqListWorkItemsV3Handler,
  mapReqWorkItems
} from "../../../../src/products/req/tools/list-work-items.js";

describe("mapReqWorkItems", () => {
  it("returns normalized work items with pagination", () => {
    const result = mapReqWorkItems(
      [
        {
          id: 9,
          subject: "Refine login flow",
          status: { name: "Doing" },
          tracker_name: "Story",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice"
          }
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "9",
        title: "Refine login flow",
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
        assignee: {
          id: undefined,
          userId: "user-1",
          userNumId: 101,
          nickName: "Alice",
          name: undefined,
          displayName: "Alice"
        },
        assignedToName: "Alice",
        rawWorkItem: {
          id: 9,
          subject: "Refine login flow",
          status: { name: "Doing" },
          tracker_name: "Story",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice"
          }
        }
      }
    ]);
    expect(result.raw).toEqual({
      workItems: [
        {
          id: 9,
          subject: "Refine login flow",
          status: { name: "Doing" },
          tracker_name: "Story",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice"
          }
        }
      ]
    });
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });

  it("adds a project-scoped hint when the work item list is empty", async () => {
    const handler = createReqListWorkItemsHandler({
      listWorkItems: async () => ({
        work_items: [],
        total: 0
      })
    });

    const result = await handler({
      project_id: "project-empty",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 work items found");
    expect(result.content[0]?.text).toContain("If you expected work items here");
    expect(result.content[0]?.text).toContain("project-empty");
  });

  it("includes assignees in text output", async () => {
    const handler = createReqListWorkItemsHandler({
      listWorkItems: async () => ({
        work_items: [
          {
            id: 9,
            subject: "Refine login flow",
            status: { name: "Doing" },
            tracker_name: "Story",
            assigned_to: { assigned_nick_name: "Alice" }
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("assignee: Alice");
  });

  it("returns normalized V3 work item output", async () => {
    const handler = createReqListWorkItemsV3Handler({
      listWorkItemsV3: async () => ({
        work_items: [
          {
            id: 10,
            subject: "V3 story",
            status: { name: "New" },
            tracker: { name: "Story" },
            assigned_to: { assigned_nick_name: "Alice" }
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      tracker_id: "7"
    });

    expect(result.structuredContent).toMatchObject({
      summary: "1 work items found in this page (total: 1)"
    });
    expect(result.content[0]?.text).toContain("V3 story");
    expect(result.content[0]?.text).toContain("assignee: Alice");
  });
});
