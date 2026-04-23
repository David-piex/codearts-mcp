import { describe, expect, it, vi } from "vitest";
import { reqListBoardWorkItemStatusRecordsInput as reqListBoardWorkItemStatusRecordsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListBoardWorkItemStatusRecordsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListBoardWorkItemStatusRecordsHandler,
  mapReqBoardWorkItemStatusRecords
} from "../../../../src/products/req/tools/list-board-work-item-status-records.js";

describe("mapReqBoardWorkItemStatusRecords", () => {
  it("returns normalized board work item status records with pagination", () => {
    const result = mapReqBoardWorkItemStatusRecords(
      [
        {
          work_item_record_id: "record-1",
          work_item_id: "wi-1",
          project_id: "project-1",
          work_item_statuses: [
            {
              id: "status-record-1",
              status: {
                id: "status-1",
                name: "研发",
                type: "IN_PROGRESS",
                description: "demo",
                parent_status_id: "parent-1"
              }
            }
          ]
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "record-1",
        workItemId: "wi-1",
        projectId: "project-1",
        statuses: [
          {
            id: "status-record-1",
            status: {
              id: "status-1",
              name: "研发",
              type: "IN_PROGRESS",
              description: "demo",
              parentStatusId: "parent-1"
            }
          }
        ]
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListBoardWorkItemStatusRecordsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20
    };

    expect(reqListBoardWorkItemStatusRecordsInput.parse(input)).toEqual(input);
    expect(reqListBoardWorkItemStatusRecordsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListBoardWorkItemStatusRecordsHandler", () => {
  it("returns normalized board work item status records", async () => {
    const client = {
      listBoardWorkItemStatusRecords: vi.fn(async () => ({
        records: [
          {
            work_item_record_id: "record-1",
            work_item_id: "wi-1",
            project_id: "project-1",
            work_item_statuses: [
              {
                id: "status-record-1",
                status: {
                  id: "status-1",
                  name: "研发",
                  type: "IN_PROGRESS",
                  description: "demo",
                  parent_status_id: "parent-1"
                }
              }
            ]
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListBoardWorkItemStatusRecordsHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listBoardWorkItemStatusRecords).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 board work item status records found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "record-1",
        workItemId: "wi-1",
        projectId: "project-1",
        statuses: [
          {
            id: "status-record-1",
            status: {
              id: "status-1",
              name: "研发",
              type: "IN_PROGRESS",
              description: "demo",
              parentStatusId: "parent-1"
            }
          }
        ]
      }
    ]);
  });
});
