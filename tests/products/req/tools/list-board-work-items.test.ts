import { describe, expect, it, vi } from "vitest";
import { reqListBoardWorkItemsInput as reqListBoardWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListBoardWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListBoardWorkItemsHandler,
  mapReqBoardWorkItems
} from "../../../../src/products/req/tools/list-board-work-items.js";

describe("mapReqBoardWorkItems", () => {
  it("returns normalized board work items with pagination", () => {
    const result = mapReqBoardWorkItems(
      [
        {
          id: "4633454879781163008",
          subject: "看板卡片示例",
          sequence: "5500756",
          priority: "低",
          important: "提示",
          severity: "一般",
          status: {
            id: "status-1",
            name: "新建"
          }
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "4633454879781163008",
        title: "看板卡片示例",
        sequence: "5500756",
        status: "新建",
        statusId: "status-1",
        priority: "低",
        important: "提示",
        severity: "一般"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
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
        work_items: [
          {
            id: "4633454879781163008",
            subject: "看板卡片示例",
            sequence: "5500756",
            priority: "低",
            important: "提示",
            severity: "一般",
            status: {
              id: "status-1",
              name: "新建"
            }
          }
        ],
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
    expect(result.structuredContent.items).toEqual([
      {
        id: "4633454879781163008",
        title: "看板卡片示例",
        sequence: "5500756",
        status: "新建",
        statusId: "status-1",
        priority: "低",
        important: "提示",
        severity: "一般"
      }
    ]);
  });
});
