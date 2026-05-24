import { describe, expect, it, vi } from "vitest";
import { reqListBoardWorkItemsInput as reqListBoardWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListBoardWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListBoardWorkItemsHandler,
  mapReqBoardWorkItems
} from "../../../../src/products/req/tools/list-board-work-items.js";

const boardWorkItem = {
  id: "4633454879781163008",
  subject: "Board card sample",
  description: "demo",
  sequence: "5500756",
  priority: "Low",
  important: "Normal",
  severity: "Minor",
  actual_work_hours: 10,
  expected_work_hours: 9,
  begin_time: "1590940800000",
  created_time: "1590940800000",
  end_time: "1590940800000",
  updated_time: "1595832054113",
  assigned_user: {
    id: "user-1",
    name: "demo_user_name",
    nick_name: "demo"
  },
  author: {
    id: "user-2",
    name: "author_name",
    nick_name: "Author"
  },
  developer: {
    id: "user-3",
    name: "developer_name",
    nick_name: "Developer"
  },
  tags: [{ id: "456", name: "tagdemo" }],
  custom_fields: [{ field_id: "custom-1", value: "custom-value" }],
  status: {
    id: "status-1",
    name: "New"
  }
};

const normalizedBoardWorkItem = {
  id: "4633454879781163008",
  title: "Board card sample",
  description: "demo",
  sequence: "5500756",
  status: "New",
  statusId: "status-1",
  priority: "Low",
  important: "Normal",
  severity: "Minor",
  actualWorkHours: 10,
  expectedWorkHours: 9,
  beginTime: "1590940800000",
  beginTimeText: "2020-06-01 00:00:00 Asia/Shanghai",
  createdTime: "1590940800000",
  createdTimeText: "2020-06-01 00:00:00 Asia/Shanghai",
  endTime: "1590940800000",
  endTimeText: "2020-06-01 00:00:00 Asia/Shanghai",
  updatedTime: "1595832054113",
  updatedTimeText: "2020-07-27 14:40:54 Asia/Shanghai",
  assignedToName: "demo",
  authorName: "Author",
  developerName: "Developer",
  tags: [{ id: "456", name: "tagdemo" }],
  customFields: [{ field_id: "custom-1", value: "custom-value" }],
  rawWorkItem: boardWorkItem
};

describe("mapReqBoardWorkItems", () => {
  it("returns normalized board work items with pagination and raw payload", () => {
    const result = mapReqBoardWorkItems([boardWorkItem], 1, 20, 1);

    expect(result.items).toEqual([normalizedBoardWorkItem]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
    expect(result.raw).toEqual({
      work_items: [boardWorkItem]
    });
  });
});

describe("reqListBoardWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20
    };

    expect(reqListBoardWorkItemsInput.parse(input)).toEqual(input);
    expect(reqListBoardWorkItemsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListBoardWorkItemsHandler", () => {
  it("returns normalized board work items", async () => {
    const client = {
      listBoardWorkItems: vi.fn(async () => ({
        work_items: [boardWorkItem],
        total: 1
      }))
    };
    const handler = createReqListBoardWorkItemsHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listBoardWorkItems).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 board work items found in this page");
    expect(result.structuredContent.items).toEqual([normalizedBoardWorkItem]);
  });
});
